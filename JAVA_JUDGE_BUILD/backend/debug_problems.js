const axios = require('axios');
const TEST_TOKEN = process.env.TEST_TOKEN;
const BACKEND_URL = 'http://localhost:5002';

async function debug() {
    try {
        const res = await axios.get(`${BACKEND_URL}/api/problems`, {
            headers: { Authorization: `Bearer ${TEST_TOKEN}` }
        });
        console.log('Status:', res.status);
        console.log('Data type:', typeof res.data);
        console.log('Is Array:', Array.isArray(res.data));
        console.log('Data:', JSON.stringify(res.data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
    }
}

debug();
