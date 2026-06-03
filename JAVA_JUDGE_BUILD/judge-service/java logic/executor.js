/**
 * Code Executor
 * 
 * Core execution logic for compiling and running Java code in isolation.
 * 
 * Responsibilities:
 * - Generate Java wrapper code from user submission
 * - Write files to temporary directory
 * - Compile Java code using javac
 * - Execute with java runtime (with timeout enforcement)
 * - Parse output and determine verdict
 * - Clean up temporary files
 * 
 * Security: Each submission runs in isolated temp directory with process timeout.
 */
const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const { generateJavaWrapper } = require('./templates/javaWrapper');

/**
 * Execute user code with test cases
 */
async function executeCode({
    userCode,
    javaMethodSignature,  // NEW SCHEMA - complete method signature
    testCases,
    timeLimitMs,
    memoryLimitMb
}) {
    const workDir = path.join(__dirname, 'temp', uuidv4());

    try {
        // Create work directory
        await fs.ensureDir(workDir);

        // Generate wrapped Java code
        const wrappedCode = generateJavaWrapper(userCode, javaMethodSignature);

        // Write to Main.java
        const javaFilePath = path.join(workDir, 'Main.java');
        await fs.writeFile(javaFilePath, wrappedCode);

        // Step 1: Compile
        const compileResult = await compile(workDir);
        if (!compileResult.success) {
            return {
                verdict: 'Compilation Error',
                error: compileResult.error,
                executionTime: 0,
                passedTests: 0,
                failedTests: testCases.length,
                hiddenTestsFailed: testCases.filter(tc => tc.is_hidden).length
            };
        }

        // Step 2: Execute with visible test cases first
        const visibleTests = testCases.filter(tc => !tc.is_hidden);
        const hiddenTests = testCases.filter(tc => tc.is_hidden);

        let allPassed = true;
        let totalExecutionTime = 0;
        let passedCount = 0;
        let failedCount = 0;
        let hiddenFailedCount = 0;
        let firstError = null;

        // Execute visible tests
        if (visibleTests.length > 0) {
            const visibleResult = await execute(workDir, visibleTests, timeLimitMs, memoryLimitMb);
            totalExecutionTime += visibleResult.executionTime;

            if (visibleResult.verdict !== 'Accepted') {
                return {
                    verdict: visibleResult.verdict,
                    error: visibleResult.error,
                    executionTime: visibleResult.executionTime,
                    passedTests: visibleResult.passedTests,
                    failedTests: visibleResult.failedTests,
                    hiddenTestsFailed: hiddenTests.length // Didn't run hidden tests
                };
            }

            passedCount += visibleResult.passedTests;
        }

        // Execute hidden tests (only if visible tests passed)
        if (hiddenTests.length > 0) {
            const hiddenResult = await execute(workDir, hiddenTests, timeLimitMs, memoryLimitMb);
            totalExecutionTime += hiddenResult.executionTime;

            if (hiddenResult.verdict !== 'Accepted') {
                return {
                    verdict: 'Wrong Answer',
                    error: 'Some hidden test cases failed',
                    executionTime: totalExecutionTime,
                    passedTests: passedCount + hiddenResult.passedTests,
                    failedTests: hiddenResult.failedTests,
                    hiddenTestsFailed: hiddenResult.failedTests
                };
            }

            passedCount += hiddenResult.passedTests;
        }

        // All tests passed
        return {
            verdict: 'Accepted',
            error: null,
            executionTime: totalExecutionTime,
            passedTests: passedCount,
            failedTests: 0,
            hiddenTestsFailed: 0
        };

    } catch (error) {
        console.error('Execution error:', error);
        return {
            verdict: 'Runtime Error',
            error: error.message,
            executionTime: 0,
            passedTests: 0,
            failedTests: testCases.length,
            hiddenTestsFailed: testCases.filter(tc => tc.is_hidden).length
        };
    } finally {
        // Cleanup
        try {
            await fs.remove(workDir);
        } catch (cleanupError) {
            console.error('Cleanup error:', cleanupError.message);
        }
    }
}

/**
 * Compile Java code
 */
function compile(workDir) {
    return new Promise((resolve) => {
        const javac = spawn('javac', ['Main.java'], {
            cwd: workDir,
            timeout: 10000 // 10 seconds compile timeout
        });

        let stderr = '';

        javac.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        javac.on('close', (code) => {
            if (code === 0) {
                resolve({ success: true });
            } else {
                // Parse error to remove line numbers referencing template code
                const cleanError = cleanCompilationError(stderr);
                resolve({ success: false, error: cleanError });
            }
        });

        javac.on('error', (error) => {
            resolve({ success: false, error: `Compilation failed: ${error.message}` });
        });
    });
}

/**
 * Execute compiled Java code with test cases
 */
function execute(workDir, testCases, timeLimitMs, memoryLimitMb) {
    return new Promise((resolve) => {
        const startTime = Date.now();

        // Prepare test cases JSON for environment variable
        const testCasesJson = JSON.stringify(testCases);

        const java = spawn('java', [`-Xmx${memoryLimitMb}M`, 'Main'], {
            cwd: workDir,
            timeout: timeLimitMs * testCases.length, // Total timeout for all test cases
            env: {
                ...process.env,
                TEST_CASES: testCasesJson
            }
        });

        let stdout = '';
        let stderr = '';
        let timedOut = false;
        let timeout = null;  // Track timeout to prevent memory leak

        java.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        java.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        // Set timeout
        timeout = setTimeout(() => {
            timedOut = true;
            java.kill('SIGKILL');
        }, timeLimitMs * testCases.length);

        java.on('close', (code) => {
            if (timeout) clearTimeout(timeout);  // Clear timeout to prevent memory leak
            const executionTime = Date.now() - startTime;

            if (timedOut) {
                resolve({
                    verdict: 'Time Limit Exceeded',
                    error: `Execution exceeded ${timeLimitMs}ms per test case`,
                    executionTime,
                    passedTests: 0,
                    failedTests: testCases.length
                });
                return;
            }

            if (code !== 0 && code !== null) {
                // Runtime error
                const errorMessage = stderr || 'Unknown runtime error';
                resolve({
                    verdict: 'Runtime Error',
                    error: cleanRuntimeError(errorMessage),
                    executionTime,
                    passedTests: 0,
                    failedTests: testCases.length
                });
                return;
            }

            // Parse output
            const result = parseExecutionOutput(stdout, testCases);
            resolve({
                verdict: result.allPassed ? 'Accepted' : 'Wrong Answer',
                error: result.error,
                executionTime,
                passedTests: result.passedTests,
                failedTests: result.failedTests
            });
        });

        java.on('error', (error) => {
            if (timeout) clearTimeout(timeout);  // Clear timeout here too
            resolve({
                verdict: 'Runtime Error',
                error: error.message,
                executionTime: Date.now() - startTime,
                passedTests: 0,
                failedTests: testCases.length
            });
        });
    });
}

/**
 * Parse execution output to determine pass/fail status
 */
function parseExecutionOutput(output, testCases) {
    const lines = output.split('\n').map(l => l.trim()).filter(l => l);

    let passedTests = 0;
    let failedTests = 0;
    let firstError = null;

    for (const line of lines) {
        if (line.startsWith('PASS')) {
            passedTests++;
        } else if (line.startsWith('FAIL')) {
            failedTests++;
            if (!firstError) {
                firstError = line;
            }
        } else if (line.startsWith('ERROR')) {
            failedTests++;
            if (!firstError) {
                firstError = line;
            }
        }
    }

    return {
        allPassed: passedTests === testCases.length && failedTests === 0,
        passedTests,
        failedTests,
        error: failedTests > 0 ? firstError : null
    };
}

/**
 * Clean compilation error to hide template line numbers
 */
function cleanCompilationError(error) {
    // Remove file paths and focus on error message
    const lines = error.split('\n');
    const relevantLines = lines.filter(line =>
        !line.includes('Main.java:') || line.includes('error:')
    );

    return relevantLines.join('\n').substring(0, 500); // Limit error length
}

/**
 * Clean runtime error to avoid exposing internal details
 */
function cleanRuntimeError(error) {
    // Remove stack traces that might contain test case data
    const lines = error.split('\n');
    const errorLines = lines.filter(line =>
        line.includes('Exception') || line.includes('Error') || line.startsWith('FATAL')
    );

    return errorLines.join('\n').substring(0, 300);
}

module.exports = {
    executeCode
};
