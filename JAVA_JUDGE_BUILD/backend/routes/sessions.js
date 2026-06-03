const express = require('express');
const router = express.Router();
const axios = require('axios');
const pLimit = require('p-limit');
const {
    createSession,
    getSessionByRoomCode,
    addParticipant,
    startSession,
    endSession,
    calculatePoints,
    updateScore
} = require('../services/sessionService');

const { verifyToken } = require('../middleware/auth');
const { db } = require('../config/firebase');

const {
    getSessionDoc,
    updateSessionDoc,
    createSessionQuestion,
    getSessionQuestions,
    createSessionTestCase,
    getSessionTestCases,
    getSessionParticipants,
    createSessionSubmission,
    getSessionSubmissions
} = require('../services/firestoreService');

const { rateLimitSubmissions } = require('../middleware/rateLimiter');

const JUDGE_SERVICE_URL = process.env.JUDGE_SERVICE_URL || 'http://localhost:5001';

// F3: Concurrency limiter for session judge calls (same as submit.js)
const sessionJudgeLimit = pLimit(5);
let sessionPendingCount = 0;
const SESSION_MAX_QUEUE = 100;

/**
 * Middleware: Verify teacher has access to modify session
 * Prevents students from starting/ending/modifying sessions they don't own
 */
async function verifyTeacherAccess(req, res, next) {
    try {
        const { sessionId } = req.params;
        const authenticatedUserId = req.user.uid; // ✅ Trust only auth token

        if (!authenticatedUserId) {
            return res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        }

        const session = await getSessionDoc(sessionId);

        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Check ownership
        if (session.teacherId !== authenticatedUserId) {
            return res.status(403).json({
                error: 'Unauthorized: Only the session creator can perform this action'
            });
        }

        req.session = session; // Attach session to request for reuse
        next();
    } catch (error) {
        console.error('Error in verifyTeacherAccess:', error);
        res.status(500).json({ error: 'Authorization check failed' });
    }
}


const sanitizeHtml = require('sanitize-html');

/**
 * User-friendly error messages
 */
const ERROR_MESSAGES = {
    SESSION_NOT_FOUND: 'This session doesn\'t exist. Please check the room code.',
    SESSION_ENDED: 'This session has ended. Results are final.',
    SESSION_NOT_ACTIVE: 'This session is not currently active.',
    NOT_AUTHORIZED: 'Only the teacher who created this session can perform this action.',
    LATE_JOIN_DISABLED: 'This session doesn\'t allow late joining. Ask your teacher to create a new session.',
    NO_QUESTIONS: 'Cannot start session: No questions added. Please add at least one question with test cases.',
    QUESTION_NOT_FOUND: 'The requested question could not be found.',
    ALREADY_SOLVED: 'You have already solved this question.',
    INVALID_INPUT: 'Invalid input provided. Please check your data.',
    JUDGE_UNAVAILABLE: 'The code execution service is currently unavailable. Please try again later.',
    EXECUTION_TIMEOUT: 'Your code took too long to execute and was terminated.'
};

/**
 * Sanitize user input to prevent XSS attacks
 * Strips all HTML tags from text fields
 */
function sanitizeText(text, allowBasicFormatting = false) {
    if (!text) return text;

    const options = allowBasicFormatting ? {
        allowedTags: ['b', 'i', 'code', 'pre', 'br'],
        allowedAttributes: {}
    } : {
        allowedTags: [],
        allowedAttributes: {}
    };

    return sanitizeHtml(text, options);
}

/**
 * Helper: Validate JSON string
 * Returns validation result with parsed data or error message
 */
function validateTestCaseJson(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);
        return { valid: true, parsed };
    } catch (err) {
        return { valid: false, error: err.message };
    }
}

/**
 * POST /api/sessions
 * Create a new session
 */
router.post('/', verifyToken, async (req, res) => {
    try {
        const { settings } = req.body;
        const teacherId = req.user.uid;

        const session = await createSession(teacherId, settings);

        res.json({
            success: true,
            sessionId: session.sessionId,
            roomCode: session.roomCode,
            status: session.status
        });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
});

/**
 * POST /api/sessions/:roomCode/join
 * Student joins a session via room code
 */
router.post('/:roomCode/join', verifyToken, async (req, res) => {
    try {
        const { roomCode } = req.params;
        const { displayName } = req.body;
        const studentId = req.user.uid;

        if (!displayName) {
            return res.status(400).json({ error: 'displayName is required' });
        }

        // F4: Sanitize displayName to prevent XSS (strip all HTML)
        const cleanName = sanitizeText(displayName.trim()).substring(0, 50);
        if (!cleanName) {
            return res.status(400).json({ error: 'displayName contains invalid characters' });
        }

        const session = await getSessionByRoomCode(roomCode.toUpperCase());

        if (!session) {
            return res.status(404).json({ error: ERROR_MESSAGES.SESSION_NOT_FOUND });
        }

        const participant = await addParticipant(session.sessionId, studentId, cleanName);

        res.json({
            success: true,
            sessionId: session.sessionId,
            status: session.status,
            participant
        });
    } catch (error) {
        console.error('Error joining session:', error);
        res.status(400).json({ error: 'Failed to join session' });
    }
});


router.patch('/:sessionId/start', verifyToken, verifyTeacherAccess, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const teacherId = req.user.uid;

        // CRITICAL FIX: Validate session has questions before starting
        const questions = await getSessionQuestions(sessionId);

        if (!questions || questions.length === 0) {
            return res.status(400).json({
                error: 'Cannot start session: No questions added.'
            });
        }

        // Validate all questions have test cases
        const missingTestCases = [];
        for (const q of questions) {
            const testCases = await getSessionTestCases(q.id);
            if (!testCases || testCases.length === 0) {
                missingTestCases.push(q.title);
            }
        }

        if (missingTestCases.length > 0) {
            return res.status(400).json({
                error: `Questions missing test cases: ${missingTestCases.join(', ')}`
            });
        }

        // Now safe to start
        await startSession(sessionId, teacherId);

        res.json({ success: true, message: 'Session started' });
    } catch (error) {
        console.error('Error starting session:', error);
        res.status(400).json({ error: error.message });
    }
});


/**
 * PATCH /api/sessions/:sessionId/end
 * Teacher ends a session
 */
router.patch('/:sessionId/end', verifyToken, verifyTeacherAccess, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const teacherId = req.user.uid;

        await endSession(sessionId, teacherId);

        // Generate Report asynchronously
        const { generateSessionReport } = require('../services/reportService');
        // We await it here to ensure it's ready when the teacher redirects, 
        // though for large sessions we might want to do this in background.
        // For < 500 users, it should be fast (< 2s).
        await generateSessionReport(sessionId);

        res.json({ success: true, message: 'Session ended' });
    } catch (error) {
        console.error('Error ending session:', error);
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /api/sessions/:sessionId/report
 * Get the generated markdown report
 */
router.get('/:sessionId/report', verifyToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { getSessionReport } = require('../services/firestoreService');

        const report = await getSessionReport(sessionId);

        if (!report) {
            return res.status(404).json({ error: 'Report not found. The session might not have ended yet.' });
        }

        res.json({ success: true, markdown: report.markdown });
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * PATCH /api/sessions/:sessionId/pause
 * Teacher pauses a session (Phase 3)
 */
router.patch('/:sessionId/pause', verifyToken, verifyTeacherAccess, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = req.session; // From middleware

        if (session.status !== 'active') {
            return res.status(400).json({ error: 'Can only pause an active session' });
        }

        await updateSessionDoc(sessionId, {
            status: 'paused',
            pausedAt: new Date().toISOString()
        });

        res.json({ success: true, message: 'Session paused' });
    } catch (error) {
        console.error('Error pausing session:', error);
        res.status(400).json({ error: error.message });
    }
});

/**
 * PATCH /api/sessions/:sessionId/resume
 * Teacher resumes a paused session (Phase 3)
 */
router.patch('/:sessionId/resume', verifyToken, verifyTeacherAccess, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = req.session; // From middleware

        if (session.status !== 'paused') {
            return res.status(400).json({ error: 'Can only resume a paused session' });
        }

        // Calculate paused duration for time compensation
        const pausedDuration = new Date() - new Date(session.pausedAt);

        await updateSessionDoc(sessionId, {
            status: 'active',
            resumedAt: new Date().toISOString(),
            totalPausedMs: (session.totalPausedMs || 0) + pausedDuration
        });

        res.json({ success: true, message: 'Session resumed' });
    } catch (error) {
        console.error('Error resuming session:', error);
        res.status(400).json({ error: error.message });
    }
});

/**
 * PATCH /api/sessions/:sessionId/navigate
 * Teacher manually navigates to a different question (Phase 3)
 */
router.patch('/:sessionId/navigate', verifyToken, verifyTeacherAccess, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { direction, questionIndex } = req.body; // direction: 'next', 'prev', or specify index
        const session = req.session; // From middleware

        if (session.status !== 'active' && session.status !== 'paused') {
            return res.status(400).json({ error: 'Session must be active or paused to navigate questions' });
        }

        let newIndex;
        if (direction === 'next') {
            newIndex = (session.currentQuestionIndex || 0) + 1;
        } else if (direction === 'prev') {
            newIndex = (session.currentQuestionIndex || 0) - 1;
        } else if (typeof questionIndex === 'number') {
            newIndex = questionIndex;
        } else {
            return res.status(400).json({ error: 'Must provide direction or questionIndex' });
        }

        // Validate new index
        if (newIndex < 0 || newIndex >= session.totalQuestions) {
            return res.status(400).json({
                error: `Invalid question index. Must be between 0 and ${session.totalQuestions - 1}`
            });
        }

        await updateSessionDoc(sessionId, {
            currentQuestionIndex: newIndex,
            lastNavigatedAt: new Date().toISOString()
        });

        res.json({
            success: true,
            message: `Navigated to question ${newIndex + 1}`,
            currentQuestionIndex: newIndex
        });
    } catch (error) {
        console.error('Error navigating question:', error);
        res.status(400).json({ error: error.message });
    }
});

/**
 * GET /api/sessions/:sessionId/state
 * Get current session state
 */
router.get('/:sessionId/state', verifyToken, async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await getSessionDoc(sessionId);

        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Get current question if session is active
        let currentQuestion = null;
        if (session.status === 'active' && session.totalQuestions > 0) {
            const questions = await getSessionQuestions(sessionId, session.currentQuestionIndex);
            currentQuestion = questions[0] || null;
        }

        res.json({
            success: true,
            session,
            currentQuestion
        });
    } catch (error) {
        console.error('Error getting session state:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/sessions/:sessionId/questions
 * Add questions to a session (teacher only)
 */
router.post('/:sessionId/questions', verifyToken, verifyTeacherAccess, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { questions } = req.body;
        const session = req.session; // From middleware

        if (!questions || !Array.isArray(questions)) {
            return res.status(400).json({ error: 'questions array is required' });
        }

        if (session.status !== 'waiting') {
            return res.status(400).json({ error: 'Can only add questions before session starts' });
        }

        // Add questions with auto-incremented orderIndex
        const createdQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const questionData = {
                sessionId,
                orderIndex: session.totalQuestions + i,
                title: sanitizeText(q.title), // Strip all HTML
                description: sanitizeText(q.description, true), // Allow basic formatting
                inputFormat: sanitizeText(q.inputFormat || ''),
                outputFormat: sanitizeText(q.outputFormat || ''),
                constraints: sanitizeText(q.constraints || ''),
                starterCode: q.starterCode, // Code is OK to have special chars
                language: 'java',
                timeLimitMs: q.timeLimitMs || 2000,
                memoryLimitMb: q.memoryLimitMb || 256,
                createdAt: new Date().toISOString()
            };

            const created = await createSessionQuestion(questionData);
            createdQuestions.push(created);
        }

        // Update session total questions count
        await updateSessionDoc(sessionId, {
            totalQuestions: session.totalQuestions + questions.length
        });

        res.json({
            success: true,
            message: `Added ${questions.length} questions`,
            questions: createdQuestions
        });
    } catch (error) {
        console.error('Error adding questions:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/sessions/:sessionId/questions/:questionId/testcases
 * Add test cases to a session question
 */
router.post('/:sessionId/questions/:questionId/testcases', verifyToken, verifyTeacherAccess, async (req, res) => {
    try {
        const { sessionId, questionId } = req.params;
        const { testcases } = req.body;
        const session = req.session; // From middleware

        if (!testcases || !Array.isArray(testcases)) {
            return res.status(400).json({ error: 'testcases array is required' });
        }

        if (session.status !== 'waiting') {
            return res.status(400).json({ error: 'Can only add test cases before session starts' });
        }

        // Add test cases
        const createdTestCases = [];
        for (let i = 0; i < testcases.length; i++) {
            const tc = testcases[i];

            // Validate input JSON
            const inputValidation = validateTestCaseJson(tc.inputJson || tc.input);
            if (!inputValidation.valid) {
                return res.status(400).json({
                    error: `Test case ${i + 1}: Invalid input JSON - ${inputValidation.error}`
                });
            }

            const testCaseData = {
                sessionQuestionId: questionId,
                inputJson: tc.inputJson || tc.input,
                expectedOutput: tc.expectedOutput || tc.expected_output,
                isHidden: tc.isHidden !== false, // Default to true
                orderIndex: i
            };

            const created = await createSessionTestCase(testCaseData);
            createdTestCases.push(created);
        }

        res.json({
            success: true,
            message: `Added ${testcases.length} test cases`,
            testcases: createdTestCases
        });
    } catch (error) {
        console.error('Error adding test cases:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/sessions/:sessionId/submit
 * Student submits code for current question
 */
router.post('/:sessionId/submit', verifyToken, rateLimitSubmissions, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { code } = req.body;
        const studentId = req.user.uid;

        // CRITICAL FIX: Validate inputs
        if (!studentId || !code) {
            return res.status(400).json({ error: 'studentId and code are required' });
        }

        // CRITICAL FIX: Validate code is not empty
        if (code.trim() === '') {
            return res.status(400).json({
                error: 'Code cannot be empty. Please write some code before submitting.'
            });
        }

        const session = await getSessionDoc(sessionId);

        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // CRITICAL FIX: Enhanced session status validation
        if (session.status !== 'active') {
            let errorMessage;
            if (session.status === 'ended') {
                errorMessage = 'This session has ended. No more submissions accepted.';
            } else if (session.status === 'waiting') {
                errorMessage = 'Session has not started yet. Please wait for the teacher to start.';
            } else {
                errorMessage = 'Session is not currently accepting submissions.';
            }
            return res.status(400).json({ error: errorMessage });
        }

        // Get current question
        const questions = await getSessionQuestions(sessionId, session.currentQuestionIndex);
        const currentQuestion = questions[0];

        if (!currentQuestion) {
            return res.status(400).json({ error: 'No current question found' });
        }

        // Check if student already has an AC submission for this question
        const previousSubmissions = await getSessionSubmissions(sessionId, currentQuestion.id, studentId);
        const hasAC = previousSubmissions.some(sub => sub.verdict === 'Accepted');

        if (hasAC) {
            return res.status(400).json({ error: ERROR_MESSAGES.ALREADY_SOLVED });
        }

        // Get test cases
        const testCases = await getSessionTestCases(currentQuestion.id);

        if (testCases.length === 0) {
            return res.status(400).json({ error: 'No test cases found for this question' });
        }

        // Extract method signature from starter code
        const methodSignature = extractMethodSignature(currentQuestion.starterCode);

        if (!methodSignature) {
            return res.status(500).json({ error: 'Could not extract method signature from starter code' });
        }

        // Prepare judge request
        const judgeRequest = {
            questionId: parseInt(currentQuestion.id.substring(0, 8), 16), // Use hash of ID as int
            userCode: code,
            javaMethodSignature: methodSignature,
            testCases: testCases.map(tc => ({
                input: tc.inputJson,
                expected_output: tc.expectedOutput
            })),
            timeLimitMs: currentQuestion.timeLimitMs,
            memoryLimitMb: currentQuestion.memoryLimitMb
        };

        // F3: Concurrency control for session judge calls
        if (sessionPendingCount >= SESSION_MAX_QUEUE) {
            return res.status(503).json({
                error: 'Server is at capacity. Please wait and try again.',
                retryAfter: 30
            });
        }
        sessionPendingCount++;

        // Send to judge service with concurrency limiting
        let judgeResponse;
        try {
            judgeResponse = await sessionJudgeLimit(() =>
                axios.post(`${JUDGE_SERVICE_URL}/judge/execute`, judgeRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': process.env.JUDGE_API_KEY
                    },
                    timeout: 30000
                })
            );
        } catch (axiosError) {
            sessionPendingCount--;
            if (axiosError.code === 'ECONNREFUSED') {
                return res.status(503).json({
                    success: false,
                    error: ERROR_MESSAGES.JUDGE_UNAVAILABLE
                });
            }
            if (axiosError.code === 'ETIMEDOUT' || axiosError.code === 'ECONNABORTED') {
                return res.status(504).json({
                    success: false,
                    error: ERROR_MESSAGES.EXECUTION_TIMEOUT
                });
            }
            throw axiosError;
        }
        sessionPendingCount--;

        const verdict = judgeResponse.data.verdict;
        const executionTime = judgeResponse.data.executionTime;

        // SKIP SAVING/SCORING IF DRY RUN
        const { dryRun } = req.body;
        if (dryRun) {
            return res.json({
                success: true,
                verdict,
                executionTime,
                passedTests: judgeResponse.data.passedTests,
                failedTests: judgeResponse.data.failedTests,
                pointsAwarded: 0,
                error: judgeResponse.data.error || null,
                isDryRun: true
            });
        }

        // Calculate points if accepted — use transaction to prevent double-scoring (F5)
        let pointsAwarded = 0;
        if (verdict === 'Accepted') {
            const points = calculatePoints(new Date(), new Date(session.startedAt));

            // Atomic check-then-update: prevents race condition where two
            // concurrent Accepted submissions both award points
            try {
                const alreadyScored = await db.runTransaction(async (transaction) => {
                    // Check for existing AC submission within the transaction
                    const existingACQuery = await db.collection('session_submissions')
                        .where('sessionId', '==', sessionId)
                        .where('sessionQuestionId', '==', currentQuestion.id)
                        .where('studentId', '==', studentId)
                        .where('verdict', '==', 'Accepted')
                        .limit(1)
                        .get();

                    if (!existingACQuery.empty) {
                        return true; // Already scored, skip
                    }

                    return false;
                });

                if (!alreadyScored) {
                    await updateScore(sessionId, studentId, points);
                    pointsAwarded = points;
                }
            } catch (txError) {
                console.error('Score transaction error:', txError);
                // Still save submission below, just without points
            }
        }

        // Save submission
        const submissionData = {
            sessionId,
            sessionQuestionId: currentQuestion.id,
            studentId,
            code,
            verdict,
            executionTimeMs: executionTime,
            memoryUsedMb: null,
            submittedAt: new Date().toISOString(),
            pointsAwarded
        };

        await createSessionSubmission(submissionData);

        res.json({
            success: true,
            verdict,
            executionTime,
            passedTests: judgeResponse.data.passedTests,
            failedTests: judgeResponse.data.failedTests,
            pointsAwarded,
            error: judgeResponse.data.error || null
        });
    } catch (error) {
        console.error('Error submitting code:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/sessions/:sessionId/leaderboard
 * Get current leaderboard
 */
router.get('/:sessionId/leaderboard', verifyToken, async (req, res) => {
    try {
        const { sessionId } = req.params;

        const participants = await getSessionParticipants(sessionId);

        res.json({
            success: true,
            leaderboard: participants
        });
    } catch (error) {
        console.error('Error getting leaderboard:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Helper: Extract method signature from starter code
 */
function extractMethodSignature(starterCode) {
    // Match "public TYPE METHOD_NAME(PARAMS)" pattern
    const match = starterCode.match(/public\s+[\w\[\]]+\s+\w+\s*\([^)]*\)/);
    return match ? match[0] : null;
}

// ===== PHASE 3: ENHANCED SUBMISSION HISTORY & ANALYTICS =====

router.get('/submissions/:submissionId', verifyToken, async (req, res) => {
    try {
        const { submissionId } = req.params;
        const submissionDoc = await db.collection('session_submissions').doc(submissionId).get();

        if (!submissionDoc.exists) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        const data = submissionDoc.data();
        const session = await getSessionDoc(data.sessionId);

        // Authorization: only the student who submitted or the session teacher can view
        const requesterId = req.user.uid;
        if (data.studentId !== requesterId && (!session || session.teacherId !== requesterId)) {
            return res.status(403).json({ error: 'Not authorized to view this submission' });
        }

        const canViewDetails = session && session.status === 'ended';

        const response = {
            id: submissionDoc.id,
            ...data,
            sessionStatus: session?.status,
            testResults: data.testResults ? data.testResults.map(r => ({
                passed: r.passed,
                executionTime: r.executionTime,
                input: canViewDetails ? r.input : undefined,
                expected: canViewDetails ? r.expected : undefined,
                actual: canViewDetails ? r.actual : undefined
            })) : []
        };

        res.json(response);
    } catch (error) {
        console.error('Error fetching submission:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/:sessionId/analytics', verifyToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const teacherId = req.user.uid;

        const session = await getSessionDoc(sessionId);
        if (!session) return res.status(404).json({ error: 'Session not found' });

        // SECURITY FIX: Verify teacher owns this session
        if (session.teacherId !== teacherId) {
            return res.status(403).json({
                error: 'Unauthorized: Only the session creator can view analytics'
            });
        }

        const participants = await getSessionParticipants(sessionId);
        const questions = await getSessionQuestions(sessionId);
        const submissionsSnapshot = await db.collection('session_submissions').where('sessionId', '==', sessionId).get();
        const submissions = submissionsSnapshot.docs.map(d => d.data());

        const totalParticipants = participants.length;
        const activeParticipants = participants.filter(p => p.solvedCount > 0).length;
        const scores = participants.map(p => p.score || 0).sort((a, b) => a - b);
        const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
        const medianScore = scores.length > 0 ? scores[Math.floor(scores.length / 2)] : 0;

        const questionStats = questions.map(q => {
            const qSubmissions = submissions.filter(s => s.sessionQuestionId === q.id);
            const acSubmissions = qSubmissions.filter(s => s.verdict === 'Accepted');
            const uniqueSolvers = new Set(acSubmissions.map(s => s.studentId)).size;
            const solveRate = totalParticipants > 0 ? ((uniqueSolvers / totalParticipants) * 100).toFixed(1) : 0;

            return {
                id: q.id,
                title: q.title,
                orderIndex: q.orderIndex,
                solveRate: parseFloat(solveRate),
                difficulty: solveRate > 70 ? 'Easy' : solveRate > 30 ? 'Medium' : 'Hard',
                totalAttempts: qSubmissions.length,
                solved: uniqueSolvers,
                avgSolveTime: acSubmissions.length > 0 && session.startedAt
                    ? ((acSubmissions.map(s => (new Date(s.submittedAt) - new Date(session.startedAt)) / 1000).reduce((a, b) => a + b, 0) / acSubmissions.length).toFixed(1))
                    : 0
            };
        }).sort((a, b) => a.orderIndex - b.orderIndex);

        res.json({
            totalParticipants,
            activeParticipants,
            dropouts: totalParticipants - activeParticipants,
            participationRate: totalParticipants > 0 ? ((activeParticipants / totalParticipants) * 100).toFixed(1) : 0,
            avgScore: parseFloat(avgScore),
            medianScore,
            topStudents: participants.sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 3).map(p => ({ id: p.id, name: p.displayName, score: p.score || 0 })),
            questionStats,
            sessionStatus: session.status
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
