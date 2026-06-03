/**
 * Code Submission Route
 * 
 * Handles user code submissions and forwards them to the judge service.
 * 
 * Features:
 * - Rate limiting per user
 * - Concurrency limiting via p-limit (max 5 parallel judge calls)
 * - In-memory caching for problem details and test cases (5-min TTL)
 * - Queue overflow protection (503 if >100 submissions pending)
 */
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { codeValidatorMiddleware } = require('../middleware/codeValidator');
const { rateLimitSubmissions, getRateLimitStatus, resetRateLimit } = require('../middleware/rateLimiter');
const axios = require('axios');
const pLimit = require('p-limit');
const { admin, db } = require('../config/firebase');
const { getProblemById, getAllTestCases, createSubmission } = require('../services/firestoreService');

// Judge service URL
const JUDGE_SERVICE_URL = process.env.JUDGE_SERVICE_URL || 'http://localhost:5001';

// ============================================
// CONCURRENCY & CACHING CONFIGURATION
// ============================================
const CONFIG = {
    maxConcurrentJudge: 5,       // Max parallel Java processes
    maxQueueSize: 100,           // Reject if more than 100 waiting
    cacheTTL: 5 * 60 * 1000,    // Cache for 5 minutes
    judgeTimeoutMs: 30000,       // 30 second timeout per submission
};

// Concurrency limiter — only N judge calls execute at a time, rest wait in memory
const judgeLimit = pLimit(CONFIG.maxConcurrentJudge);

// Track pending submissions for overflow protection
let pendingCount = 0;

// In-memory caches to reduce Firestore reads
const problemCache = new Map();
const testCaseCache = new Map();

/**
 * Get problem by ID with caching
 */
async function getProblemCached(questionId) {
    const cached = problemCache.get(questionId);
    if (cached && Date.now() - cached.timestamp < CONFIG.cacheTTL) {
        return cached.data;
    }

    const problem = await getProblemById(questionId);
    if (problem) {
        problemCache.set(questionId, { data: problem, timestamp: Date.now() });
    }
    return problem;
}

/**
 * Get all test cases with caching
 */
async function getTestCasesCached(questionId) {
    const cached = testCaseCache.get(questionId);
    if (cached && Date.now() - cached.timestamp < CONFIG.cacheTTL) {
        return cached.data;
    }

    const testCases = await getAllTestCases(questionId);
    if (testCases) {
        testCaseCache.set(questionId, { data: testCases, timestamp: Date.now() });
    }
    return testCases;
}

/**
 * GET /rate-limit/status
 * Get current rate limit status for the authenticated user
 */
router.get('/rate-limit/status', verifyToken, getRateLimitStatus);

/**
 * POST /rate-limit/reset/:userId
 * Reset rate limit for a specific user (admin only)
 */
router.post('/rate-limit/reset/:userId', verifyToken, resetRateLimit);

/**
 * POST /submit
 * Submit code for practice judging
 * Body: { questionId, code, dryRun? }
 */
router.post('/submit',
    verifyToken,                    // First: Verify user identity
    rateLimitSubmissions,            // Second: Apply rate limit based on user ID
    codeValidatorMiddleware,         // Third: Validate code safety
    async (req, res) => {
        // Queue overflow protection
        if (pendingCount >= CONFIG.maxQueueSize) {
            return res.status(503).json({
                error: 'Server is at capacity. Please wait 30 seconds and try again.',
                retryAfter: 30
            });
        }

        pendingCount++;

        try {
            const { questionId, code, dryRun } = req.body;
            const studentId = req.user.uid;

            // Validate input
            if (!questionId || !code) {
                return res.status(400).json({ error: 'questionId and code are required' });
            }

            // Get problem details (cached)
            const problem = await getProblemCached(questionId);
            if (!problem) {
                return res.status(404).json({ error: 'Problem not found' });
            }

            // Get all test cases including hidden ones (cached)
            const testCases = await getTestCasesCached(questionId);

            if (!testCases || testCases.length === 0) {
                return res.status(400).json({ error: 'No test cases found for this problem' });
            }

            // Prepare request for Judge Service
            const judgeRequest = {
                questionId: parseInt(questionId),
                userCode: code,
                javaMethodSignature: problem.java_method_signature,
                testCases: testCases.map(tc => ({
                    input: tc.input,
                    expected_output: tc.expected_output,
                    is_hidden: tc.is_hidden
                })),
                timeLimitMs: problem.time_limit_ms || 1000,
                memoryLimitMb: problem.memory_limit_mb || 256
            };

            // Send to Judge Service with concurrency limiting
            let judgeResponse;
            try {
                judgeResponse = await judgeLimit(() =>
                    axios.post(`${JUDGE_SERVICE_URL}/judge/execute`, judgeRequest, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-Key': process.env.JUDGE_API_KEY
                        },
                        timeout: CONFIG.judgeTimeoutMs
                    })
                );
            } catch (axiosError) {
                if (axiosError.code === 'ECONNREFUSED') {
                    return res.status(503).json({
                        success: false,
                        error: 'Judge service is currently unavailable. Please try again in a moment.'
                    });
                }
                if (axiosError.code === 'ETIMEDOUT' || axiosError.code === 'ECONNABORTED') {
                    return res.status(504).json({
                        success: false,
                        error: 'Code execution timed out. Your code may have an infinite loop.'
                    });
                }
                throw axiosError;
            }

            // Validate judge response
            if (!judgeResponse || !judgeResponse.data) {
                throw new Error('Invalid response from judge service');
            }

            const responseData = {
                success: true,
                verdict: judgeResponse.data.verdict,
                executionTime: judgeResponse.data.executionTime,
                passedTests: judgeResponse.data.passedTests,
                failedTests: judgeResponse.data.failedTests,
                hiddenTestsFailed: judgeResponse.data.hiddenTestsFailed,
                error: judgeResponse.data.error || null
            };

            // Save submission first, then respond (F1 fix: prevent silent data loss)
            if (!dryRun) {
                const submissionData = {
                    questionId,
                    studentId,
                    code,
                    verdict: judgeResponse.data.verdict,
                    executionTimeMs: judgeResponse.data.executionTime,
                    passedTests: judgeResponse.data.passedTests,
                    failedTests: judgeResponse.data.failedTests,
                    submittedAt: new Date().toISOString()
                };
                try {
                    const saved = await createSubmission(submissionData);
                    responseData.submissionId = saved.id;
                } catch (saveErr) {
                    console.error('⚠️  Failed to save submission:', saveErr.message);
                    // Still return result but warn about save failure
                    responseData.warning = 'Submission result received but failed to save record.';
                }
            }

            res.json(responseData);

        } catch (error) {
            console.error('Submission error:', error.message);

            if (error.code === 'ECONNREFUSED') {
                return res.status(503).json({
                    error: 'Judge service unavailable',
                    message: 'Please try again later'
                });
            }

            if (error.response) {
                return res.status(500).json({
                    error: 'Execution failed',
                    message: 'Code execution encountered an error'
                });
            }

            res.status(500).json({
                error: 'Submission failed',
                message: 'An unexpected error occurred'
            });
        } finally {
            pendingCount--;
        }
    }
);

module.exports = router;
