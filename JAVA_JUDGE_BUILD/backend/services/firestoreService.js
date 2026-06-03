const { db } = require('../config/firebase');

// In-memory storage fallback if Firebase is not configured
let inMemoryQuestions = [];
let inMemoryTestCases = [];

/**
 * Helper to split array into chunks
 */
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Upload questions to Firestore or in-memory storage
 */
async function uploadQuestions(questions) {
    if (db) {
        // Use Firestore with batching (limit 500 ops per batch)
        const chunks = chunkArray(questions, 400); // Use 400 to be safe
        let totalUploaded = 0;

        for (const chunk of chunks) {
            const batch = db.batch();
            chunk.forEach((question) => {
                const docRef = db.collection('questions').doc(question.id.toString());
                batch.set(docRef, question);
            });
            await batch.commit();
            totalUploaded += chunk.length;
            console.log(`✅ Uploaded batch of ${chunk.length} questions`);
        }
        console.log(`✅ Uploaded total ${totalUploaded} questions to Firestore`);
    } else {
        // Use in-memory storage
        inMemoryQuestions = questions;
        console.log(`✅ Stored ${questions.length} questions in memory`);
    }
}

/**
 * Upload reference solutions to Firestore or in-memory storage
 */
async function uploadReferenceSolutions(solutions) {
    if (db) {
        // Use Firestore with batching
        const chunks = chunkArray(solutions, 400);
        let totalUploaded = 0;

        for (const chunk of chunks) {
            const batch = db.batch();
            chunk.forEach((sol) => {
                const docRef = db.collection('reference_solutions').doc(sol.question_id.toString());
                batch.set(docRef, { ...sol, updatedAt: new Date() });
            });
            await batch.commit();
            totalUploaded += chunk.length;
        }
        console.log(`✅ Uploaded ${totalUploaded} reference solutions to Firestore`);
    } else {
        // Use in-memory storage (mock implementation)
        console.log(`✅ Stored ${solutions.length} reference solutions in memory (mock)`);
    }
}

/**
 * Get all reference solutions
 */
async function getAllReferenceSolutions() {
    if (db) {
        const snapshot = await db.collection('reference_solutions').get();
        const solutions = [];
        snapshot.forEach(doc => solutions.push(doc.data()));
        return solutions;
    }
    return []; // Mock
}

/**
 * Upload test cases to Firestore or in-memory storage
 */
async function uploadTestCases(testCases) {
    if (db) {
        // Use Firestore with batching
        const chunks = chunkArray(testCases, 400);
        let totalUploaded = 0;

        for (const chunk of chunks) {
            const batch = db.batch();
            chunk.forEach((testCase) => {
                const docRef = db.collection('testCases').doc(testCase.test_id.toString());
                batch.set(docRef, testCase);
            });
            await batch.commit();
            totalUploaded += chunk.length;
        }
        console.log(`✅ Uploaded ${totalUploaded} test cases to Firestore`);
    } else {
        // Use in-memory storage
        inMemoryTestCases = testCases;
        console.log(`✅ Stored ${testCases.length} test cases in memory`);
    }
}

/**
 * Get all problems with optional filters
 */
async function getProblems(filters = {}) {
    if (db) {
        let query = db.collection('questions');

        // Apply filters
        if (filters.difficulty) {
            query = query.where('difficulty', '==', filters.difficulty);
        }
        if (filters.topic) {
            query = query.where('topic', '==', filters.topic);
        }

        const snapshot = await query.get();
        const problems = [];
        snapshot.forEach(doc => {
            problems.push(doc.data());
        });

        // Apply search filter (client-side since Firestore doesn't support LIKE)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            return problems.filter(p =>
                p.title.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            );
        }

        return problems;
    } else {
        // Use in-memory storage
        let problems = [...inMemoryQuestions];

        if (filters.difficulty) {
            problems = problems.filter(p => p.difficulty === filters.difficulty);
        }
        if (filters.topic) {
            problems = problems.filter(p => p.topic === filters.topic);
        }
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            problems = problems.filter(p =>
                p.title.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            );
        }

        return problems;
    }
}

/**
 * Get a single problem by ID (with visible test cases only)
 */
async function getProblemById(id) {
    if (db) {
        const doc = await db.collection('questions').doc(id.toString()).get();
        if (!doc.exists) {
            throw new Error('Problem not found');
        }

        // Get visible test cases only
        const testCasesSnapshot = await db.collection('testCases')
            .where('question_id', '==', parseInt(id))
            .where('is_hidden', '==', false)
            .get();

        const visibleTestCases = [];
        testCasesSnapshot.forEach(doc => {
            visibleTestCases.push(doc.data());
        });

        return {
            ...doc.data(),
            visible_test_cases: visibleTestCases
        };
    } else {
        // Use in-memory storage
        const problem = inMemoryQuestions.find(q => q.id === parseInt(id));
        if (!problem) {
            throw new Error('Problem not found');
        }

        const visibleTestCases = inMemoryTestCases.filter(
            tc => tc.question_id === parseInt(id) && !tc.is_hidden
        );

        return {
            ...problem,
            visible_test_cases: visibleTestCases
        };
    }
}

/**
 * Get all test cases for a question
 */
async function getAllTestCases(questionId) {
    try {
        // Check if database is available
        if (!db) {
            // Fallback to memory storage
            return inMemoryTestCases.filter(tc => tc.question_id === parseInt(questionId));
        }

        const snapshot = await db.collection('testCases') // Changed to 'testCases' to match existing code
            .where('question_id', '==', parseInt(questionId)) // Changed to parseInt(questionId) to match existing code
            .get();

        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
    } catch (error) {
        console.error('Error fetching test cases:', error);
        throw error;
    }
}

// ===== SESSION-RELATED FUNCTIONS =====

/**
 * Create a session document
 */
async function createSessionDoc(data) {
    if (db) {
        await db.collection('sessions').doc(data.sessionId).set(data);
    }
    return data;
}

/**
 * Get a session document by ID
 */
async function getSessionDoc(sessionId) {
    if (db) {
        const doc = await db.collection('sessions').doc(sessionId).get();
        return doc.exists ? doc.data() : null;
    }
    return null;
}

/**
 * Get session by room code
 */
async function getSessionByRoomCode(roomCode) {
    if (db) {
        try {
            // Add timeout to prevent hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Firestore query timeout')), 5000)
            );

            const queryPromise = db.collection('sessions')
                .where('roomCode', '==', roomCode)
                .limit(1)
                .get();

            const snapshot = await Promise.race([queryPromise, timeoutPromise]);

            if (snapshot.empty) {
                return null;
            }

            return snapshot.docs[0].data();
        } catch (error) {
            console.error('Error querying session by room code:', error.message);
            return null; // Treat as not found on error
        }
    }
    return null;
}

/**
 * Update a session document
 */
async function updateSessionDoc(sessionId, updates) {
    if (db) {
        await db.collection('sessions').doc(sessionId).update(updates);
    }
}

/**
 * Create a session question
 */
async function createSessionQuestion(data) {
    try {
        if (db) {
            const docRef = await db.collection('session_questions').add(data);
            return { id: docRef.id, ...data };
        }
        return data;
    } catch (error) {
        console.error('Error creating session question:', error);
        throw new Error(`Failed to create session question: ${error.message}`);
    }
}

/**
 * Get all questions for a session
 */
async function getSessionQuestions(sessionId, orderIndex = null) {
    try {
        if (db) {
            let query = db.collection('session_questions').where('sessionId', '==', sessionId);

            if (orderIndex !== null) {
                query = query.where('orderIndex', '==', orderIndex).limit(1);
            } else {
                query = query.orderBy('orderIndex', 'asc');
            }

            const snapshot = await query.get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching session questions:', error);
        throw new Error(`Failed to fetch session questions: ${error.message}`);
    }
}

/**
 * Create session test cases
 */
async function createSessionTestCase(data) {
    try {
        if (db) {
            const docRef = await db.collection('session_testcases').add(data);
            return { id: docRef.id, ...data };
        }
        return data;
    } catch (error) {
        console.error('Error creating session test case:', error);
        throw new Error(`Failed to create test case: ${error.message}`);
    }
}

/**
 * Get test cases for a session question
 */
async function getSessionTestCases(sessionQuestionId) {
    try {
        if (db) {
            const snapshot = await db.collection('session_testcases')
                .where('sessionQuestionId', '==', sessionQuestionId)
                .orderBy('orderIndex', 'asc')
                .get();

            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching session test cases:', error);
        throw new Error(`Failed to fetch test cases: ${error.message}`);
    }
}

/**
 * Create a session participant
 */
async function createSessionParticipant(data) {
    try {
        if (db) {
            await db.collection('session_participants').doc(data.id).set(data);
        }
        return data;
    } catch (error) {
        console.error('Error creating session participant:', error);
        throw new Error(`Failed to create participant: ${error.message}`);
    }
}

/**
 * Get a participant by ID (simple lookup, no index needed)
 */
async function getParticipantById(participantId) {
    if (db) {
        try {
            const doc = await db.collection('session_participants').doc(participantId).get();
            if (doc.exists) {
                return doc.data();
            }
        } catch (error) {
            console.error('Error fetching participant:', error.message);
        }
    }
    return null;
}

/**
 * Get all participants for a session
 */
async function getSessionParticipants(sessionId) {
    if (db) {
        const snapshot = await db.collection('session_participants')
            .where('sessionId', '==', sessionId)
            .get();

        const participants = snapshot.docs.map(doc => doc.data());

        // Sort in memory: by score desc, then by joinedAt asc
        participants.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return new Date(a.joinedAt) - new Date(b.joinedAt);
        });

        return participants;
    }
    return [];
}

/**
 * Update participant score atomically using Firestore transaction
 * Prevents lost updates from concurrent submissions
 */
async function updateParticipantScore(participantId, pointsToAdd) {
    if (db) {
        const docRef = db.collection('session_participants').doc(participantId);

        try {
            await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(docRef);

                if (doc.exists) {
                    const currentData = doc.data();
                    const newScore = (currentData.score || 0) + pointsToAdd;
                    const newSolvedCount = (currentData.solvedCount || 0) + (pointsToAdd > 0 ? 1 : 0);

                    transaction.update(docRef, {
                        score: newScore,
                        solvedCount: newSolvedCount
                    });
                }
            });
        } catch (error) {
            console.error('Error updating participant score:', error);
            throw new Error(`Failed to update score: ${error.message}`);
        }
    }
}

/**
 * Create a session submission
 */
async function createSessionSubmission(data) {
    try {
        if (db) {
            const docRef = await db.collection('session_submissions').add(data);
            return { id: docRef.id, ...data };
        }
        return data;
    } catch (error) {
        console.error('Error creating session submission:', error);
        throw new Error(`Failed to save submission: ${error.message}`);
    }
}

/**
 * Get submissions for a session question by student
 */
async function getSessionSubmissions(sessionId, sessionQuestionId, studentId) {
    if (db) {
        const snapshot = await db.collection('session_submissions')
            .where('sessionId', '==', sessionId)
            .where('sessionQuestionId', '==', sessionQuestionId)
            .where('studentId', '==', studentId)
            .get();

        const submissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort in memory by submittedAt descending
        submissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

        return submissions;
    }
    return [];
}

/**
 * Get ALL submissions for a session (used by report generation)
 * F6: Replaces raw db.collection() calls in reportService
 */
async function getAllSessionSubmissions(sessionId) {
    if (db) {
        const snapshot = await db.collection('session_submissions')
            .where('sessionId', '==', sessionId)
            .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    return [];
}


/**
 * Create a general submission (for practice problems)
 */
async function createSubmission(data) {
    try {
        if (db) {
            const docRef = await db.collection('submissions').add(data);
            return { id: docRef.id, ...data };
        }
        return data;
    } catch (error) {
        console.error('Error creating submission:', error);
        throw new Error(`Failed to save submission: ${error.message}`);
    }
}

/**
 * Clear all question-related data (Questions, Test Cases, Reference Solutions)
 * WARNING: This is a destructive operation.
 */
async function clearAllQuestionData() {
    if (db) {
        const collections = ['questions', 'testCases', 'reference_solutions'];

        for (const colName of collections) {
            const collectionRef = db.collection(colName);
            const snapshot = await collectionRef.get();

            if (snapshot.size === 0) continue;

            // Firestore batch limit is 500. We'll delete in chunks of 400 to be safe.
            const BATCH_SIZE = 400;
            const docs = snapshot.docs;

            for (let i = 0; i < docs.length; i += BATCH_SIZE) {
                const batch = db.batch();
                const chunk = docs.slice(i, i + BATCH_SIZE);
                chunk.forEach(doc => batch.delete(doc.ref));
                await batch.commit();
            }
            console.log(`✅ Cleared collection: ${colName}`);
        }
    }

    // Always clear in-memory fallbacks as well
    inMemoryQuestions = [];
    inMemoryTestCases = [];
    console.log('✅ Cleared key in-memory data');
}

/**
 * Create/Update a session report
 */
async function createSessionReport(sessionId, markdown) {
    if (db) {
        await db.collection('session_reports').doc(sessionId).set({
            sessionId,
            markdown,
            createdAt: new Date().toISOString()
        });
    }
}

/**
 * Get a session report
 */
async function getSessionReport(sessionId) {
    if (db) {
        const doc = await db.collection('session_reports').doc(sessionId).get();
        return doc.exists ? doc.data() : null;
    }
    return null;
}

module.exports = {
    uploadQuestions,
    uploadTestCases,
    getProblems,
    getProblemById,
    getAllTestCases,
    uploadReferenceSolutions,
    getAllReferenceSolutions,
    clearAllQuestionData,
    // Session functions
    createSessionDoc,
    getSessionDoc,
    getSessionByRoomCode,
    updateSessionDoc,
    createSessionQuestion,
    getSessionQuestions,
    createSessionTestCase,
    getSessionTestCases,
    createSessionParticipant,
    getParticipantById,
    getSessionParticipants,
    createSessionSubmission,
    getSessionSubmissions,
    getAllSessionSubmissions,
    createSubmission,
    createSessionReport,
    getSessionReport
};
