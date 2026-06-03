const axios = require('axios');
const { getProblems, getAllTestCases, getAllReferenceSolutions } = require('../services/firestoreService');

// Use local judge service URL
const JUDGE_SERVICE_URL = 'http://localhost:3001/judge/execute';

async function verifyAllQuestions() {
    console.log('🚀 Starting Reference Solutions Verification...\n');

    try {
        // 1. Fetch all data
        console.log('📦 Fetching data...');
        const questions = await getProblems();
        const referenceSolutions = await getAllReferenceSolutions();

        console.log(`Found ${questions.length} questions and ${referenceSolutions.length} reference solutions.\n`);

        let passedCount = 0;
        let failedCount = 0;
        let skippedCount = 0;

        // 2. Iterate through each question
        for (const question of questions) {
            const solution = referenceSolutions.find(s => s.question_id === question.id);

            if (!solution) {
                console.log(`⚠️  Question #${question.id} (${question.title}): No reference solution found - SKIPPED`);
                skippedCount++;
                continue;
            }

            const testCases = await getAllTestCases(question.id);
            if (testCases.length === 0) {
                console.log(`⚠️  Question #${question.id}: No test cases found - SKIPPED`);
                skippedCount++;
                continue;
            }

            // 3. Execute against Judge Service
            process.stdout.write(`Testing #${question.id} ${question.title}... `);

            try {
                const response = await axios.post(JUDGE_SERVICE_URL, {
                    questionId: question.id,
                    userCode: solution.java_solution,
                    javaMethodSignature: question.java_method_signature,
                    testCases: testCases,
                    timeLimitMs: question.time_limit_ms,
                    memoryLimitMb: question.memory_limit_mb
                });

                const result = response.data;

                if (result.verdict === 'Accepted') {
                    console.log('✅ PASSED');
                    passedCount++;
                } else {
                    console.log(`❌ FAILED (${result.verdict})`);
                    console.error(`   Error: ${result.error || 'Unknown error'}`);
                    console.error(`   Failed Tests: ${result.failedTests}/${testCases.length}`);
                    failedCount++;
                }

            } catch (err) {
                console.log('❌ SYSTEM ERROR');
                if (err.response) {
                    console.error(`   Status: ${err.response.status}`);
                    console.error(`   Data: ${JSON.stringify(err.response.data)}`);
                } else {
                    console.error(`   Judge request failed: ${err.message}`);
                }
                failedCount++;
            }
        }

        // 4. Summary
        console.log('\n⸻  VERIFICATION SUMMARY  ⸻');
        console.log(`Total Scanned: ${questions.length}`);
        console.log(`✅ Passed:     ${passedCount}`);
        console.log(`❌ Failed:     ${failedCount}`);
        console.log(`⚠️  Skipped:    ${skippedCount}`);
        console.log('⸻⸻⸻⸻⸻⸻⸻⸻');

        if (failedCount > 0) {
            process.exit(1); // Fail the command if any tests failed
        } else {
            process.exit(0);
        }

    } catch (error) {
        console.error('🔥 CRITICAL ERROR:', error);
        process.exit(1);
    }
}

// execute
verifyAllQuestions();
