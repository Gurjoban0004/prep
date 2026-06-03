/**
 * Judge Service
 * 
 * Independent service that compiles and executes Java code submissions.
 * Runs on separate port from the main backend for isolation.
 * 
 * Endpoint:
 * - POST /judge/execute - Compiles and runs Java code against test cases
 * 
 * Flow:
 * 1. Receives user code + java method signature + test cases
 * 2. Wraps code in Main class template (javaWrapper.js)
 * 3. Compiles with javac
 * 4. Executes with java (enforcing time/memory limits)
 * 5. Returns verdict: Compilation Error, Runtime Error, Wrong Answer, or Accepted
 * 
 * Port: Configurable via PORT env var (default: 3001)
 */
require('dotenv').config();

const express = require('express');
const { executeCode } = require('./executor');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json({ limit: '10mb' })); // Allow larger payloads for test cases

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'judge-service' });
});

/**
 * POST /judge/execute
 * Execute user code with test cases
 * Body: {
 *   questionId, userCode, functionSignature, returnType,
 *   testCases, timeLimitMs, memoryLimitMb
 * }
 */
app.post('/judge/execute', async (req, res) => {
    try {
        const {
            questionId,
            userCode,
            javaMethodSignature,  // NEW SCHEMA
            testCases,
            timeLimitMs,
            memoryLimitMb
        } = req.body;

        // Validate required fields
        if (!questionId || !userCode || !javaMethodSignature || !testCases) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'questionId, userCode, javaMethodSignature, and testCases are required'
            });
        }

        if (!Array.isArray(testCases) || testCases.length === 0) {
            return res.status(400).json({
                error: 'Invalid test cases',
                message: 'testCases must be a non-empty array'
            });
        }

        console.log(`\n🔍 Executing submission for question ${questionId}`);
        console.log(`   Test cases: ${testCases.length} total`);

        // Execute the code
        const result = await executeCode({
            userCode,
            javaMethodSignature,  // Pass new schema to executor
            testCases,
            timeLimitMs: timeLimitMs || 1000,
            memoryLimitMb: memoryLimitMb || 256
        });

        console.log(`✅ Verdict: ${result.verdict}`);

        res.json(result);

    } catch (error) {
        console.error('Judge execution error:', error);

        res.status(500).json({
            error: 'Execution failed',
            message: error.message,
            verdict: 'Internal Error'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Judge service error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`⚖️  Judge Service running on port ${PORT}`);
    console.log(`   Ready to compile and execute Java code`);
});
