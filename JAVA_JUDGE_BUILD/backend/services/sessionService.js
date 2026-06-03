const { v4: uuidv4 } = require('uuid');
const {
    createSessionDoc,
    getSessionDoc,
    updateSessionDoc,
    createSessionParticipant,
    getParticipantById,
    getSessionParticipants,
    updateParticipantScore,
    getSessionByRoomCode: getSessionByCode
} = require('./firestoreService');

/**
 * Generate a unique 6-character room code
 * Uses non-ambiguous characters (no 0/O, 1/I, etc.)
 */
async function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code;
    let attempts = 0;
    const maxAttempts = 10;

    do {
        code = '';
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        attempts++;

        // Check if code already exists
        const existing = await getSessionByCode(code);
        if (!existing) {
            return code;
        }

        if (attempts >= maxAttempts) {
            throw new Error('Failed to generate unique room code after multiple attempts');
        }
    } while (true);
}

/**
 * Create a new session
 * @param {string} teacherId - Teacher's user ID
 * @param {object} settings - Optional session settings
 * @returns {object} - Created session with sessionId and roomCode
 */
async function createSession(teacherId, settings = {}) {
    const sessionId = uuidv4();
    const roomCode = await generateRoomCode();

    const sessionData = {
        sessionId,
        teacherId,
        roomCode,
        status: 'waiting',
        currentQuestionIndex: 0,
        totalQuestions: 0,
        createdAt: new Date().toISOString(),
        startedAt: null,
        endedAt: null,
        settings: {
            allowLateJoin: settings.allowLateJoin ?? false,
            showLeaderboardDuringSession: settings.showLeaderboardDuringSession ?? true,
            ...settings
        }
    };

    await createSessionDoc(sessionData);

    return {
        sessionId,
        roomCode,
        status: 'waiting'
    };
}

/**
 * Get session by room code
 * @param {string} roomCode - 6-character room code
 * @returns {object|null} - Session data or null if not found
 */
async function getSessionByRoomCode(roomCode) {
    return await getSessionByCode(roomCode);
}

/**
 * Add a participant to a session
 * @param {string} sessionId - Session ID
 * @param {string} studentId - Student's user ID
 * @param {string} displayName - Student's display name
 * @returns {object} - Participant data
 */
async function addParticipant(sessionId, studentId, displayName) {
    // Check if session exists and is joinable
    const session = await getSessionDoc(sessionId);

    if (!session) {
        throw new Error('Session not found');
    }

    if (session.status === 'ended') {
        throw new Error('Cannot join an ended session');
    }

    if (session.status === 'active' && !session.settings.allowLateJoin) {
        throw new Error('Session has already started and late join is disabled');
    }

    // Check if student already joined - use direct ID lookup to avoid composite index
    const participantId = `${sessionId}_${studentId}`;
    const existing = await getParticipantById(participantId);

    if (existing) {
        return existing;
    }

    const participantData = {
        id: `${sessionId}_${studentId}`,
        sessionId,
        studentId,
        displayName,
        joinedAt: new Date().toISOString(),
        score: 0,
        solvedCount: 0,
        currentQuestionIndex: 0
    };

    await createSessionParticipant(participantData);

    return participantData;
}

/**
 * Start a session (change status to active)
 * @param {string} sessionId - Session ID
 * @param {string} teacherId - Teacher ID (for authorization)
 */
async function startSession(sessionId, teacherId) {
    const session = await getSessionDoc(sessionId);

    if (!session) {
        throw new Error('Session not found');
    }

    if (session.teacherId !== teacherId) {
        throw new Error('Only the session creator can start the session');
    }

    if (session.status !== 'waiting') {
        throw new Error('Session has already been started or ended');
    }

    if (session.totalQuestions === 0) {
        throw new Error('Cannot start session without questions');
    }

    await updateSessionDoc(sessionId, {
        status: 'active',
        startedAt: new Date().toISOString()
    });

    return { success: true };
}

/**
 * End a session (change status to ended)
 * @param {string} sessionId - Session ID
 * @param {string} teacherId - Teacher ID (for authorization)
 */
async function endSession(sessionId, teacherId) {
    const session = await getSessionDoc(sessionId);

    if (!session) {
        throw new Error('Session not found');
    }

    if (session.teacherId !== teacherId) {
        throw new Error('Only the session creator can end the session');
    }

    if (session.status === 'ended') {
        throw new Error('Session has already ended');
    }

    await updateSessionDoc(sessionId, {
        status: 'ended',
        endedAt: new Date().toISOString()
    });

    return { success: true };
}

/**
 * Calculate points based on submission time
 * @param {Date|string} submittedAt - Submission timestamp
 * @param {Date|string} sessionStartedAt - Session start timestamp
 * @returns {number} - Points awarded (10-100)
 */
function calculatePoints(submittedAt, sessionStartedAt) {
    const submitted = new Date(submittedAt);
    const started = new Date(sessionStartedAt);

    const elapsedSeconds = (submitted - started) / 1000;

    // Base 100 points, lose 1 point per second, minimum 10 points
    const points = Math.max(10, 100 - Math.floor(elapsedSeconds / 10));

    return points;
}

/**
 * Update participant score after successful submission
 * @param {string} sessionId - Session ID
 * @param {string} studentId - Student ID
 * @param {number} pointsToAdd - Points to add
 */
/**
 * Update participant score atomically using Firestore transaction
 * CRITICAL FIX: Prevents race condition when multiple submissions complete simultaneously
 * @param {string} sessionId - The session ID
 * @param {string} studentId - The student ID
 * @param {number} pointsToAdd - Points to add to the score
 */
async function updateScore(sessionId, studentId, pointsToAdd) {
    const { db } = require('../config/firebase');

    try {
        // Find participant document
        const participantSnapshot = await db.collection('session_participants')
            .where('sessionId', '==', sessionId)
            .where('studentId', '==', studentId)
            .limit(1)
            .get();

        if (participantSnapshot.empty) {
            console.error(`Participant not found: sessionId=${sessionId}, studentId=${studentId}`);
            throw new Error('Participant not found for score update');
        }

        const participantRef = participantSnapshot.docs[0].ref;

        // Use transaction for atomic score update
        await db.runTransaction(async (transaction) => {
            const participantDoc = await transaction.get(participantRef);

            if (!participantDoc.exists) {
                throw new Error('Participant disappeared during transaction');
            }

            const currentData = participantDoc.data();
            const currentScore = currentData.score || 0;
            const currentSolved = currentData.solvedCount || 0;

            // Atomic update within transaction
            transaction.update(participantRef, {
                score: currentScore + pointsToAdd,
                solvedCount: currentSolved + 1,
                lastSubmissionAt: new Date().toISOString()
            });
        });

        console.log(`✅ Score updated atomically for ${studentId}: +${pointsToAdd} points`);
    } catch (error) {
        console.error('Error in score update transaction:', error);
        throw error;
    }
}

module.exports = {
    generateRoomCode,
    createSession,
    getSessionByRoomCode,
    addParticipant,
    startSession,
    endSession,
    calculatePoints,
    updateScore
};
