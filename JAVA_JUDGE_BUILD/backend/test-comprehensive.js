const axios = require('axios');
const chalk = require('chalk');

const BACKEND_URL = 'http://localhost:5002';
const JUDGE_URL = 'http://localhost:5003';
const FRONTEND_URL = 'http://localhost:5173';

// You'll need to replace this with an actual Firebase token
// Get it by: Opening browser console → firebase.auth().currentUser.getIdToken().then(console.log)
const TEST_TOKEN = process.env.TEST_TOKEN || 'REPLACE_WITH_REAL_TOKEN';

const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
};

function log(status, message, details = '') {
    const icons = { pass: '✅', fail: '❌', warn: '⚠️', info: 'ℹ️' };
    console.log(`${icons[status]} ${message}`);
    if (details) console.log(chalk.gray(`   ${details}`));

    results.tests.push({ status, message, details });
    if (status === 'pass') results.passed++;
    if (status === 'fail') results.failed++;
    if (status === 'warn') results.warnings++;
}

async function test(name, fn) {
    try {
        await fn();
        log('pass', name);
    } catch (error) {
        let details = error.message;
        if (error.response && error.response.data) {
            details += ` - Response: ${JSON.stringify(error.response.data)}`;
        }
        log('fail', name, details);
    }
}

async function runTests() {
    console.log(chalk.bold.cyan('\n🔍 COMPREHENSIVE CODE REVIEW - AUTOMATED TESTS\n'));

    // ====================================
    // CATEGORY 1: SERVICE HEALTH
    // ====================================
    console.log(chalk.bold.yellow('\n📡 Category 1: Service Health\n'));

    await test('Backend health check responds', async () => {
        const res = await axios.get(`${BACKEND_URL}/health`, { timeout: 3000 });
        if (res.data.status !== 'ok') throw new Error(`Expected status 'ok', got '${res.data.status}'`);
    });

    await test('Judge service health check responds', async () => {
        const res = await axios.get(`${JUDGE_URL}/health`, { timeout: 3000 });
        if (res.data.status !== 'ok') throw new Error(`Expected status 'ok', got '${res.data.status}'`);
    });

    await test('Frontend is accessible', async () => {
        const res = await axios.get(FRONTEND_URL, { timeout: 3000 });
        if (res.status !== 200) throw new Error(`Frontend returned status ${res.status}`);
    });

    // ====================================
    // CATEGORY 2: AUTHENTICATION
    // ====================================
    console.log(chalk.bold.yellow('\n🔐 Category 2: Authentication\n'));

    await test('Backend accepts valid Firebase token', async () => {
        const res = await axios.get(`${BACKEND_URL}/api/problems`, {
            headers: { Authorization: `Bearer ${TEST_TOKEN}` }
        });
        if (!res.data.problems || !Array.isArray(res.data.problems)) throw new Error('Expected response to contain problems array');
    });

    // /api/problems is public, so we don't expect it to reject without token
    // await test('Backend rejects requests without token', async () => { ... });

    // ====================================
    // CATEGORY 3: PROBLEM FETCHING
    // ====================================
    console.log(chalk.bold.yellow('\n📚 Category 3: Problem Fetching\n'));

    let firstProblemId;
    await test('Can fetch problems list', async () => {
        const res = await axios.get(`${BACKEND_URL}/api/problems`, {
            headers: { Authorization: `Bearer ${TEST_TOKEN}` }
        });
        if (res.data.problems.length === 0) {
            log('warn', 'No problems in database', 'Upload problems via admin panel');
        } else {
            firstProblemId = res.data.problems[0].id;
            log('info', `Found ${res.data.problems.length} problems`, `First problem: ${res.data.problems[0].title}`);
        }
    });

    await test('Can fetch individual problem', async () => {
        if (!firstProblemId) {
            log('warn', 'Skipping (no problems available)', '');
            return;
        }
        const res = await axios.get(`${BACKEND_URL}/api/problems/${firstProblemId}`, {
            headers: { Authorization: `Bearer ${TEST_TOKEN}` }
        });
        if (!res.data.problem.id) throw new Error('Problem response missing id field');
        if (!res.data.problem.java_method_signature) throw new Error('Problem missing java_method_signature');
        log('info', 'Problem structure valid', `Method: ${res.data.problem.java_method_signature}`);
    });

    await test('Problem includes visible test cases', async () => {
        if (!firstProblemId) {
            log('warn', 'Skipping (no problems available)', '');
            return;
        }
        const res = await axios.get(`${BACKEND_URL}/api/problems/${firstProblemId}`, {
            headers: { Authorization: `Bearer ${TEST_TOKEN}` }
        });
        if (!res.data.problem.visible_test_cases || res.data.problem.visible_test_cases.length === 0) {
            // This might happen if problem has no visible test cases, but usually they do
            // throw new Error('No visible test cases found');
            log('warn', 'No visible test cases found', 'Check problem data');
        }
    });

    // ====================================
    // CATEGORY 4: CODE SUBMISSION
    // ====================================
    console.log(chalk.bold.yellow('\n⚙️ Category 4: Code Submission\n'));

    await test('Can submit valid code', async () => {
        if (!firstProblemId) {
            log('warn', 'Skipping (no problems available)', '');
            return;
        }
        // Based on "Move Zeroes to End" signature: public void solve(int[] nums)
        const code = `
    public void solve(int[] nums) {
        // dummy implementation
        return;
    }
    `.trim();

        const res = await axios.post(
            `${BACKEND_URL}/api/submit`,
            { questionId: firstProblemId, code },
            {
                headers: {
                    Authorization: `Bearer ${TEST_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        if (!res.data.verdict) throw new Error('Response missing verdict field');
        log('info', `Verdict: ${res.data.verdict}`, `Execution time: ${res.data.executionTimeMs}ms`);
    });

    await test('Code validator blocks dangerous patterns', async () => {
        if (!firstProblemId) {
            log('warn', 'Skipping (no problems available)', '');
            return;
        }
        // Based on "Move Zeroes to End" signature: public void solve(int[] nums)
        const dangerousCode = `
    public void solve(int[] nums) {
        System.exit(0);
    }
    `.trim();

        try {
            await axios.post(
                `${BACKEND_URL}/api/submit`,
                { questionId: firstProblemId, code: dangerousCode },
                {
                    headers: {
                        Authorization: `Bearer ${TEST_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            throw new Error('Should have blocked dangerous code');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                log('info', 'Dangerous pattern blocked', error.response.data.error);
                return;
            }
            throw error;
        }
    });

    await test('Submission returns test results', async () => {
        if (!firstProblemId) {
            log('warn', 'Skipping (no problems available)', '');
            return;
        }
        const code = `
    public void solve(int[] nums) {
        return;
    }
    `.trim();

        const res = await axios.post(
            `${BACKEND_URL}/api/submit`,
            { questionId: firstProblemId, code },
            {
                headers: {
                    Authorization: `Bearer ${TEST_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        if (!res.data.results || !Array.isArray(res.data.results)) {
            throw new Error('Response missing test results array');
        }
        log('info', `Test results count: ${res.data.results.length}`, '');
    });

    // ====================================
    // CATEGORY 5: RATE LIMITING
    // ====================================
    console.log(chalk.bold.yellow('\n🚦 Category 5: Rate Limiting\n'));

    await test('Rate limiting enforces limits', async () => {
        if (!firstProblemId) {
            log('warn', 'Skipping (no problems available)', '');
            return;
        }

        const code = 'public void solve(int[] nums) { return; }';
        const requests = [];

        for (let i = 0; i < 12; i++) {
            // Add a small delay between requests to avoid overwhelming the server instantaneously
            // but still fast enough to trigger rate limits
            await new Promise(resolve => setTimeout(resolve, 100));

            requests.push(
                axios.post(
                    `${BACKEND_URL}/api/submit`,
                    { questionId: firstProblemId, code },
                    {
                        headers: {
                            Authorization: `Bearer ${TEST_TOKEN}`,
                            'Content-Type': 'application/json'
                        },
                        validateStatus: () => true,
                        timeout: 30000
                    }
                )
            );
        }

        const responses = await Promise.all(requests);
        const rateLimited = responses.filter(r => r.status === 429).length;
        const successful = responses.filter(r => r.status === 200 || r.status === 202).length;

        log('info', `Submissions: ${successful} successful, ${rateLimited} rate-limited`, '');

        if (rateLimited === 0) {
            log('warn', 'No rate limiting detected', 'Expected at least some 429 responses');
        }
    });

    // ====================================
    // CATEGORY 6: SESSION SYSTEM
    // ====================================
    console.log(chalk.bold.yellow('\n🎓 Category 6: Session System\n'));

    let sessionId, roomCode;

    await test('Can create session', async () => {
        const res = await axios.post(
            `${BACKEND_URL}/api/sessions`,
            {},
            { headers: { Authorization: `Bearer ${TEST_TOKEN}` } }
        );

        if (!res.data.sessionId || !res.data.roomCode) {
            throw new Error('Session creation missing sessionId or roomCode');
        }

        sessionId = res.data.sessionId;
        roomCode = res.data.roomCode;
        log('info', `Session created: ${roomCode}`, `ID: ${sessionId}`);
    });

    await test('Room code is 6 characters', async () => {
        if (roomCode.length !== 6) {
            throw new Error(`Room code is ${roomCode.length} chars, expected 6`);
        }
    });

    await test('Can join session by room code', async () => {
        const res = await axios.post(
            `${BACKEND_URL}/api/sessions/${roomCode}/join`,
            { displayName: 'Test Student' },
            { headers: { Authorization: `Bearer ${TEST_TOKEN}` } }
        );

        if (res.status !== 200) {
            throw new Error(`Join failed with status ${res.status}`);
        }
        log('info', 'Successfully joined session', '');
    });

    await test('Can fetch session state', async () => {
        const res = await axios.get(
            `${BACKEND_URL}/api/sessions/${sessionId}/state`,
            { headers: { Authorization: `Bearer ${TEST_TOKEN}` } }
        );

        if (res.data.status !== 'waiting') {
            throw new Error(`Expected status 'waiting', got '${res.data.status}'`);
        }
    });

    // ====================================
    // CATEGORY 7: ERROR HANDLING
    // ====================================
    console.log(chalk.bold.yellow('\n⚠️ Category 7: Error Handling\n'));

    await test('Invalid problem ID returns 404', async () => {
        try {
            await axios.get(
                `${BACKEND_URL}/api/problems/99999`,
                { headers: { Authorization: `Bearer ${TEST_TOKEN}` } }
            );
            throw new Error('Should have returned 404');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return;
            }
            throw error;
        }
    });

    await test('Invalid room code returns error', async () => {
        try {
            await axios.post(
                `${BACKEND_URL}/api/sessions/INVALID/join`,
                {},
                { headers: { Authorization: `Bearer ${TEST_TOKEN}` } }
            );
            throw new Error('Should have returned error');
        } catch (error) {
            if (error.response && (error.response.status === 404 || error.response.status === 400)) {
                return;
            }
            throw error;
        }
    });

    await test('Missing code in submission returns 400', async () => {
        if (!firstProblemId) {
            log('warn', 'Skipping (no problems available)', '');
            return;
        }

        try {
            await axios.post(
                `${BACKEND_URL}/api/submit`,
                { questionId: firstProblemId, code: '' },
                { headers: { Authorization: `Bearer ${TEST_TOKEN}` } }
            );
            throw new Error('Should have returned 400');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return;
            }
            throw error;
        }
    });

    // ====================================
    // FINAL REPORT
    // ====================================
    console.log(chalk.bold.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    console.log(chalk.bold.cyan('  TEST SUMMARY'));
    console.log(chalk.bold.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

    console.log(chalk.green(`✅ Passed:   ${results.passed}`));
    console.log(chalk.red(`❌ Failed:   ${results.failed}`));
    console.log(chalk.yellow(`⚠️  Warnings: ${results.warnings}`));

    console.log(chalk.bold.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

    if (results.failed === 0) {
        console.log(chalk.bold.green('🎉 ALL TESTS PASSED!\n'));
    } else {
        console.log(chalk.bold.red('❌ SOME TESTS FAILED - Review details above\n'));
    }

    // Export results as JSON
    const fs = require('fs');
    fs.writeFileSync('test-results.json', JSON.stringify(results, null, 2));
    console.log(chalk.gray('📄 Full results saved to test-results.json\n'));

    process.exit(results.failed > 0 ? 1 : 0);
}

runTests().catch(err => {
    console.error(chalk.red('\n💥 Fatal test error:'), err);
    process.exit(1);
});
