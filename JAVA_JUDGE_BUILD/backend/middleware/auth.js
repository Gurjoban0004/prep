const { admin } = require('../config/firebase');

/**
 * Middleware: Verify Firebase ID Token
 * 
 * Extracts the token from the Authorization header (Bearer <token>)
 * and verifies it using the Firebase Admin SDK.
 * 
 * If valid:
 * - Attaches decoded token to req.user
 * - req.user.uid contains the Firebase UID
 * - req.user.email contains the user's email
 * 
 * If invalid:
 * - Returns 401 Unauthorized
 */
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'No token provided'
            });
        }

        const token = authHeader.split('Bearer ')[1];

        // Verify the ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Attach user info to request
        req.user = decodedToken;

        next();
    } catch (error) {
        console.error('Error verifying auth token:', error.code, error.message);

        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Token expired'
            });
        }

        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid token'
        });
    }
};

/**
 * Middleware: Verify Admin Role
 * 
 * Checks if the authenticated user has the 'admin' custom claim.
 * Must be used AFTER verifyToken.
 */
const verifyAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.uid) {
            return res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        }

        // Fetch latest user record to check custom claims
        // (ID token might be stale, so we check against Auth service directly for critical admin actions)
        const userRecord = await admin.auth().getUser(req.user.uid);

        if (userRecord.customClaims && userRecord.customClaims.admin === true) {
            req.user.isAdmin = true; // Convenience flag
            next();
        } else {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Admin access required'
            });
        }
    } catch (error) {
        console.error('Error verifying admin role:', error);
        return res.status(500).json({ error: 'Internal server error during auth check' });
    }
};

module.exports = { verifyToken, verifyAdmin };
