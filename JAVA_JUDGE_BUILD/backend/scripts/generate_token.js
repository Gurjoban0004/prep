const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const axios = require('axios');
const { admin, initializeFirebase } = require('../config/firebase');

// Configure API Key (from frontend/.env or hardcoded for now since we found it)
// In a real production setup, this would be in env, but for this local test script it's fine.
const API_KEY = process.env.FIREBASE_API_KEY || 'AIzaSyBI8MU-QULO9AgDnA59RYpkUNgci7URs3w';

async function generateToken() {
    try {
        // Ensure Firebase is initialized
        if (!admin.apps.length) {
            initializeFirebase();
        }

        const uid = 'test-user-123';

        // 1. Generate Custom Token via Admin SDK
        const customToken = await admin.auth().createCustomToken(uid);

        // 2. Exchange Custom Token for ID Token via Google Identity API
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`,
            {
                token: customToken,
                returnSecureToken: true
            }
        );

        const idToken = response.data.idToken;

        // Output ONLY the token so it can be captured by other scripts
        console.log(`TOKEN:${idToken}`);
        process.exit(0);
    } catch (error) {
        console.error('Error generating token:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

generateToken();
