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
const { executeCode, executeGeneric } = require('./executor');

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(express.json({ limit: '2mb' })); // Reasonable limit for test case payloads

// CORS Middleware for direct local testing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, X-Piston-Key, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'judge-service' });
});

// API Key Authentication Middleware
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || 
                   req.headers['x-piston-key'] || 
                   (req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : null);
    const validApiKey = process.env.JUDGE_API_KEY;

    if (!validApiKey) {
        console.error('❌ JUDGE_API_KEY not set in environment variables');
        return res.status(500).json({ error: 'Server misconfiguration' });
    }

    if (!apiKey || apiKey !== validApiKey) {
        console.warn(`⚠️  Unauthorized access attempt from ${req.ip}`);
        return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
    }
    next();
};

/**
 * POST /judge/execute
 * Execute user code with test cases
 * Body: {
 *   questionId, userCode, functionSignature, returnType,
 *   testCases, timeLimitMs, memoryLimitMb
 * }
 */
app.post('/judge/execute', authenticate, async (req, res) => {
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

/**
 * POST /execute
 * Generic code execution matching Piston's API signature for drop-in replacement.
 * Body: {
 *   language: 'java',
 *   version: '...',
 *   files: [{ name: 'Main.java', content: '...' }],
 *   compile_timeout: 10000,
 *   run_timeout: 5000
 * }
 */
app.post('/execute', authenticate, async (req, res) => {
    try {
        const { language, files, compile_timeout, run_timeout } = req.body;

        if (language !== 'java') {
            return res.status(400).json({ error: 'Unsupported language. Only java is supported.' });
        }

        if (!files || !Array.isArray(files) || files.length === 0) {
            return res.status(400).json({ error: 'Missing files' });
        }

        const mainFile = files.find(f => f.name === 'Main.java');
        if (!mainFile) {
            return res.status(400).json({ error: 'Main.java file is required' });
        }

        const runTimeout = run_timeout || 5000;
        
        console.log(`\n🔍 Executing generic Main.java submission (timeout: ${runTimeout}ms)`);
        
        const result = await executeGeneric(mainFile.content, runTimeout);
        res.json(result);

    } catch (error) {
        console.error('Generic execution error:', error);
        res.status(500).json({
            error: 'Execution failed',
            message: error.message
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
