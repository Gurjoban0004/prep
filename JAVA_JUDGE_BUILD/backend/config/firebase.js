const admin = require('firebase-admin');

let db;

function initializeFirebase() {
    try {
        // Use environment variables for configuration
        if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
            console.log('🔒 Using Firebase credentials from environment variables');

            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
                })
            });

            db = admin.firestore();
            console.log('✅ Firebase initialized successfully');
            console.log(`   Project: ${process.env.FIREBASE_PROJECT_ID}\n`);
            return db;
        }

        // Fallback: Try to load service account key (for local dev without .env full setup if needed, but discouraged)
        let serviceAccount;
        try {
            serviceAccount = require('./serviceAccountKey.json');
        } catch (error) {
            // Service account key not found
            console.warn('⚠️  Firebase credentials not found in environment or serviceAccountKey.json');
            console.warn('   Please configure .env with FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY');
            return null;
        }

        // Initialize with file if env vars missing
        console.warn('⚠️  Using serviceAccountKey.json (Deprecated: Move to .env)');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        db = admin.firestore();
        console.log('✅ Firebase initialized successfully');
        console.log(`   Project: ${serviceAccount.project_id}\n`);
        return db;

    } catch (error) {
        console.error('❌ Firebase initialization error:', error.message);
        return null;
    }
}

// Initialize on module load
db = initializeFirebase();

module.exports = {
    admin,
    db,
    initializeFirebase
};
