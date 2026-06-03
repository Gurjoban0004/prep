const axios = require('axios');

async function testRateLimit() {
    const API_URL = 'http://localhost:5002';
    const TOKEN = process.env.TEST_TOKEN; // Optional: Pass token to test auth routes

    console.log('🚀 Starting Rate Limit Test...');
    console.log(`Target: ${API_URL}`);

    // 1. Test General API Rate Limit (Public)
    console.log('\n--- Testing General API Rate Limit (Public) ---');
    console.log('Sending requests to /api/problems...');

    let successCount = 0;
    let blockedCount = 0;

    // We need > 100 requests to trigger limit
    // But that takes time. Let's send 5 requests to verify connectivity.
    // To truly test limit, we'd need to hammer it.

    for (let i = 1; i <= 5; i++) {
        try {
            const response = await axios.get(`${API_URL}/api/problems`);
            console.log(`✅ Request ${i}: ${response.status} OK`);
            successCount++;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.log(`❌ Request ${i}: Rate Limited! (Expected if limit reached)`);
                blockedCount++;
            } else {
                console.log(`❌ Request ${i}: Error ${error.message}`);
            }
        }
        // minimal delay
        await new Promise(r => setTimeout(r, 50));
    }

    console.log(`Summary: ${successCount} successful, ${blockedCount} blocked.`);

    // 2. Test Submission Rate Limit (Needs Token)
    if (TOKEN) {
        console.log('\n--- Testing Submission Rate Limit (Authenticated) ---');
        console.log('Sending 12 submissions (Limit is 10/min for practice)...');

        for (let i = 1; i <= 12; i++) {
            try {
                const response = await axios.post(
                    `${API_URL}/api/submit`,
                    {
                        questionId: '1', // Ensure this exists or mock it
                        code: 'public class Solution { public void test() {} }',
                        language: 'java',
                        dryRun: true // Use dryRun to avoid polluting DB too much
                    },
                    {
                        headers: { 'Authorization': `Bearer ${TOKEN}` }
                    }
                );
                console.log(`✅ Submission ${i}: ${response.status} OK`);
                if (response.headers['x-ratelimit-remaining']) {
                    console.log(`   Remaining: ${response.headers['x-ratelimit-remaining']}`);
                }
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.log(`🛑 Submission ${i}: RATE LIMITED! (Expected)`);
                    console.log(`   Retry After: ${error.response.data.retryAfter}s`);
                } else {
                    console.log(`❌ Submission ${i}: Error ${error.message} - ${error.response?.data?.error || ''}`);
                }
            }
            await new Promise(r => setTimeout(r, 200));
        }
    } else {
        console.log('\n⚠️  Skipping Authenticated Submission Test (No TEST_TOKEN provided)');
        console.log('To test submissions: export TEST_TOKEN="your_firebase_token" && node backend/test-rate-limit.js');
    }

    // 3. Test Unauthenticated Submission (Should be 401, not 429 yet)
    console.log('\n--- Testing Unauthenticated Submission ---');
    try {
        await axios.post(`${API_URL}/api/submit`, {});
        console.log('❌ Unexpected Success (Should be 401)');
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('✅ Request blocked as Unauthorized (401) - Auth middleware working before Rate Limit');
        } else {
            console.log(`❓ Response: ${error.response?.status}`);
        }
    }
}

testRateLimit();
