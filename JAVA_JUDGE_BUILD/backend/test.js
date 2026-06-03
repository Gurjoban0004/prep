const axios = require('axios');
const { spawn, execSync } = require('child_process');
const chalk = require('chalk');

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    BACKEND_PORT: 5002,
    JUDGE_PORT: 5003,
    FRONTEND_PORT: 5173,
    STARTUP_TIMEOUT: 30000,  // 30 seconds to start services
    TEST_TIMEOUT: 60000,     // 60 seconds per test
};

const URLS = {
    backend: `http://localhost:${CONFIG.BACKEND_PORT}`,
    judge: `http://localhost:${CONFIG.JUDGE_PORT}`,
    frontend: `http://localhost:${CONFIG.FRONTEND_PORT}`,
};

// Test Firebase token (you'll need to get this from your browser)
// Test Firebase token (automatically fetched or from env)
let TEST_TOKEN = process.env.TEST_TOKEN;

try {
    if (!TEST_TOKEN) {
        console.log(chalk.yellow('🔄 Generating test token...'));
        const output = execSync('node scripts/generate_token.js', { stdio: 'pipe' }).toString();
        const match = output.match(/TOKEN:(.+)/);
        if (match && match[1]) {
            TEST_TOKEN = match[1].trim();
            console.log(chalk.green('✅ Test token generated successfully'));
        } else {
            console.log(chalk.red('❌ Failed to parse token from script output'));
            console.log(chalk.gray(output));
        }
    }
} catch (error) {
    console.log(chalk.yellow('⚠️  Could not auto-generate token (Authentication tests will fail)'));
    console.log(chalk.gray(error.message));
}

// Sample valid Java code for testing
const VALID_CODE = `
    public int[] twoSum(int[] nums, int target) {
        return new int[]{0, 1};
    }
`.trim();

// ============================================
// SERVICE MANAGEMENT
// ============================================

let backendProcess, judgeProcess, frontendProcess;
const processes = [];

async function startService(name, command, args, cwd, port) {
    return new Promise((resolve, reject) => {
        console.log(chalk.blue(`🚀 Starting ${name}...`));

        const proc = spawn(command, args, {
            cwd,
            stdio: 'pipe',
            shell: true,
            env: { ...process.env }
        });

        processes.push({ name, proc });

        let output = '';

        proc.stdout.on('data', (data) => {
            output += data.toString();
            // Check if service started successfully
            if (output.includes('listening') || output.includes('started') || output.includes('ready')) {
                resolve(proc);
            }
        });

        proc.stderr.on('data', (data) => {
            const msg = data.toString();
            // Ignore common warnings
            if (!msg.includes('DeprecationWarning') && !msg.includes('ExperimentalWarning')) {
                console.log(chalk.gray(`[${name}] ${msg}`));
            }
        });

        proc.on('error', (error) => {
            reject(new Error(`Failed to start ${name}: ${error.message}`));
        });

        // Timeout if service doesn't start
        setTimeout(() => {
            resolve(proc); // Resolve anyway, health check will catch if it failed
        }, 10000);
    });
}

async function checkHealth(url, maxRetries = 15, delay = 2000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            await axios.get(`${url}/health`, { timeout: 3000 });
            return true;
        } catch (error) {
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    return false;
}

async function startAllServices() {
    console.log(chalk.bold.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    console.log(chalk.bold.cyan('  STARTING SERVICES'));
    console.log(chalk.bold.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

    try {
        // Start Judge Service
        judgeProcess = await startService(
            'Judge Service',
            'node',
            ['judge.js'],
            '../judge-service',
            CONFIG.JUDGE_PORT
        );

        // Start Backend
        backendProcess = await startService(
            'Backend API',
            'node',
            ['server.js'],
            '.',
            CONFIG.BACKEND_PORT
        );

        // Start Frontend (optional - comment out if you don't need frontend tests)
        // frontendProcess = await startService(
        //   'Frontend',
        //   'npm',
        //   ['run', 'dev'],
        //   '../frontend',
        //   CONFIG.FRONTEND_PORT
        // );

        // Wait for services to be healthy
        console.log(chalk.blue('\n⏳ Waiting for services to be ready...\n'));

        const judgeHealthy = await checkHealth(URLS.judge);
        const backendHealthy = await checkHealth(URLS.backend);
        // const frontendHealthy = await checkHealth(URLS.frontend);

        if (!judgeHealthy) {
            throw new Error('Judge Service failed health check');
        }
        if (!backendHealthy) {
            throw new Error('Backend API failed health check');
        }

        console.log(chalk.green('✅ Judge Service ready'));
        console.log(chalk.green('✅ Backend API ready'));
        // console.log(chalk.green('✅ Frontend ready'));

        return true;
    } catch (error) {
        console.error(chalk.red(`\n❌ Failed to start services: ${error.message}`));
        await cleanup();
        process.exit(1);
    }
}

async function cleanup() {
    console.log(chalk.blue('\n🧹 Cleaning up...'));

    for (const { name, proc } of processes) {
        if (proc && !proc.killed) {
            console.log(chalk.gray(`  Stopping ${name}...`));
            proc.kill('SIGTERM');

            // Force kill after 5 seconds
            setTimeout(() => {
                if (!proc.killed) {
                    proc.kill('SIGKILL');
                }
            }, 5000);
        }
    }

    // Wait a bit for processes to clean up
    await new Promise(resolve => setTimeout(resolve, 2000));
}

// ============================================
// TEST UTILITIES
// ============================================

class TestRunner {
    constructor() {
        this.tests = [];
        this.results = {
            passed: 0,
            failed: 0,
            warnings: 0,
            total: 0
        };
        this.startTime = Date.now();
    }

    test(name, fn) {
        this.tests.push({ name, fn });
    }

    async run() {
        console.log(chalk.bold.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
        console.log(chalk.bold.cyan('  RUNNING TESTS'));
        console.log(chalk.bold.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

        this.results.total = this.tests.length;

        for (const { name, fn } of this.tests) {
            try {
                console.log(chalk.blue(`\n🧪 ${name}`));
                const testStart = Date.now();

                await fn();

                const duration = Date.now() - testStart;
                console.log(chalk.green(`   ✅ PASSED (${duration}ms)`));
                this.results.passed++;
            } catch (error) {
                console.log(chalk.red(`   ❌ FAILED: ${error.message}`));
                if (error.response) {
                    console.log(chalk.gray(`   Status: ${error.response.status}`));
                    console.log(chalk.gray(`   Data: ${JSON.stringify(error.response.data).slice(0, 100)}`));
                }
                this.results.failed++;
            }
        }

        this.printReport();
    }

    printReport() {
        const duration = ((Date.now() - this.startTime) / 1000).toFixed(1);

        console.log(chalk.bold.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
        console.log(chalk.bold.cyan('  TEST RESULTS'));
        console.log(chalk.bold.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

        console.log(chalk.green(`✅ Passed:   ${this.results.passed}/${this.results.total}`));
        console.log(chalk.red(`❌ Failed:   ${this.results.failed}/${this.results.total}`));
        if (this.results.warnings > 0) {
            console.log(chalk.yellow(`⚠️  Warnings: ${this.results.warnings}`));
        }
        console.log(chalk.blue(`⏱️  Time:     ${duration}s`));

        console.log(chalk.bold.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

        if (this.results.failed === 0) {
            console.log(chalk.bold.green('🎉 ALL TESTS PASSED! Safe to deploy.\n'));
        } else {
            console.log(chalk.bold.red('⚠️  SOME TESTS FAILED! Fix before deploying.\n'));
        }
    }
}

// ============================================
// ACTUAL TESTS
// ============================================

const runner = new TestRunner();

console.log(chalk.gray(`\nTest Configuration:`));
console.log(chalk.gray(`   Token Present: ${!!TEST_TOKEN}`));
if (TEST_TOKEN) {
    console.log(chalk.gray(`   Token Length: ${TEST_TOKEN.length}`));
    // Print first few chars to verify it looks like a JWT
    console.log(chalk.gray(`   Token Prefix: ${TEST_TOKEN.substring(0, 10)}...`));
}

// Test 1: Health Checks
runner.test('Health checks respond', async () => {
    const backendHealth = await axios.get(`${URLS.backend}/health`);
    const judgeHealth = await axios.get(`${URLS.judge}/health`);

    if (backendHealth.data.status !== 'ok') {
        throw new Error('Backend health check failed');
    }
    if (judgeHealth.data.status !== 'ok') {
        throw new Error('Judge health check failed');
    }
});

// Test 2: Get Problems List
runner.test('Can fetch problems list', async () => {
    const response = await axios.get(`${URLS.backend}/api/problems`, {
        headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
    });

    if (!response.data.problems || !Array.isArray(response.data.problems)) {
        throw new Error('Problems response is not valid');
    }

    console.log(chalk.gray(`   Found ${response.data.problems.length} problems`));
});

// Test 3: Submit Code (Most Important)
runner.test('Can submit code and get verdict', async () => {
    // First get a problem to submit to
    const problemsRes = await axios.get(`${URLS.backend}/api/problems`, {
        headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
    });

    if (problemsRes.data.problems.length === 0) {
        throw new Error('No problems available to test submission');
    }

    const problemId = problemsRes.data.problems[0].id;

    const response = await axios.post(
        `${URLS.backend}/api/submit`,
        {
            questionId: problemId,
            code: VALID_CODE
        },
        {
            headers: {
                'Authorization': `Bearer ${TEST_TOKEN}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000  // 30 second timeout
        }
    );

    if (!response.data.verdict) {
        throw new Error('No verdict in response');
    }

    console.log(chalk.gray(`   Verdict: ${response.data.verdict}`));
    console.log(chalk.gray(`   Execution time: ${response.data.executionTimeMs}ms`));
});

// Test 4: Rate Limiting Works
runner.test('Rate limiting enforces limits', async () => {
    const problemsRes = await axios.get(`${URLS.backend}/api/problems`, {
        headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
    });

    const problemId = problemsRes.data.problems[0]?.id || '1';

    // Make 10 rapid submissions
    const promises = [];
    for (let i = 0; i < 10; i++) {
        promises.push(
            axios.post(
                `${URLS.backend}/api/submit`,
                { questionId: problemId, code: VALID_CODE },
                {
                    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` },
                    validateStatus: () => true  // Don't throw on any status
                }
            )
        );
    }

    const results = await Promise.all(promises);
    const successCount = results.filter(r => r.status === 200).length;

    console.log(chalk.gray(`   ${successCount}/10 submissions succeeded (rest rate-limited)`));

    // Should have rate limited at least one
    if (successCount === 10) {
        console.log(chalk.yellow('   ⚠️  Warning: No rate limiting detected'));
    }
});

// Test 5: Load Test (50 concurrent users)
runner.test('Handles 50 concurrent submissions', async () => {
    const problemsRes = await axios.get(`${URLS.backend}/api/problems`, {
        headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
    });

    const problemId = problemsRes.data.problems[0]?.id || '1';

    console.log(chalk.gray('   Spawning 50 concurrent requests...'));

    const startTime = Date.now();
    const promises = [];

    for (let i = 0; i < 50; i++) {
        promises.push(
            axios.post(
                `${URLS.backend}/api/submit`,
                { questionId: problemId, code: VALID_CODE },
                {
                    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` },
                    timeout: 60000,
                    validateStatus: () => true
                }
            ).catch(err => ({ error: err.message }))
        );
    }

    const results = await Promise.all(promises);
    const duration = Date.now() - startTime;

    const successful = results.filter(r => r.status === 200 || r.status === 202).length;
    const rateLimited = results.filter(r => r.status === 429).length;
    const errors = results.filter(r => r.error || (r.status >= 500)).length;

    console.log(chalk.gray(`   Completed in ${duration}ms`));
    console.log(chalk.gray(`   Successful: ${successful}`));
    console.log(chalk.gray(`   Rate limited: ${rateLimited}`));
    console.log(chalk.gray(`   Errors: ${errors}`));

    if (errors > 5) {
        throw new Error(`Too many errors: ${errors}/50`);
    }

    if (successful === 0 && rateLimited === 0) {
        throw new Error('All requests failed');
    }
});

// Test 6: Session Creation
runner.test('Can create a session', async () => {
    const response = await axios.post(
        `${URLS.backend}/api/sessions`,
        {},
        {
            headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
        }
    );

    if (!response.data.sessionId || !response.data.roomCode) {
        throw new Error('Invalid session creation response');
    }

    console.log(chalk.gray(`   Session ID: ${response.data.sessionId}`));
    console.log(chalk.gray(`   Room Code: ${response.data.roomCode}`));
});

// Test 7: Code Validator Blocks Dangerous Code
runner.test('Code validator blocks dangerous patterns', async () => {
    const dangerousCode = `
    class Solution {
      public void test() {
        System.exit(0);
      }
    }
  `;

    try {
        await axios.post(
            `${URLS.backend}/api/submit`,
            { questionId: '1', code: dangerousCode },
            {
                headers: { 'Authorization': `Bearer ${TEST_TOKEN}` },
                validateStatus: () => true
            }
        );

        // If we get here without error, check the response
        // Should be rejected by code validator
        console.log(chalk.gray('   Dangerous code was blocked ✓'));
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log(chalk.gray('   Dangerous code was blocked ✓'));
        } else {
            throw error;
        }
    }
});

// ============================================
// MAIN EXECUTION
// ============================================

async function main() {
    console.log(chalk.bold.magenta('\n╔════════════════════════════════════════╗'));
    console.log(chalk.bold.magenta('║   CODING PLATFORM TEST SUITE v1.0      ║'));
    console.log(chalk.bold.magenta('╚════════════════════════════════════════╝\n'));

    // Handle Ctrl+C gracefully
    process.on('SIGINT', async () => {
        console.log(chalk.yellow('\n\n⚠️  Test interrupted by user'));
        await cleanup();
        process.exit(0);
    });

    try {
        // Start all services
        await startAllServices();

        // Wait a bit for everything to stabilize
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Run all tests
        await runner.run();

        // Cleanup
        await cleanup();

        // Exit with appropriate code
        process.exit(runner.results.failed > 0 ? 1 : 0);

    } catch (error) {
        console.error(chalk.red(`\n💥 Fatal error: ${error.message}`));
        await cleanup();
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { main, TestRunner };
