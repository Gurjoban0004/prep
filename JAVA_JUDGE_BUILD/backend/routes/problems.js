/**
 * Problems API Routes
 * 
 * Provides public endpoints for browsing and viewing coding problems.
 * 
 * Endpoints:
 * - GET /api/problems - List all problems (with filters: difficulty, topic, search)
 * - GET /api/problems/:id - Get full problem details with visible test cases
 */
const express = require('express');
const { getProblems, getProblemById } = require('../services/firestoreService');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/problems
 * Get list of all problems with optional filters
 * Query params: difficulty, topic, search
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const filters = {
            difficulty: req.query.difficulty,
            topic: req.query.topic,
            search: req.query.search
        };

        // Remove undefined filters
        Object.keys(filters).forEach(key => {
            if (filters[key] === undefined) {
                delete filters[key];
            }
        });

        const problems = await getProblems(filters);

        // Return only necessary fields for list view
        const problemList = problems.map(p => ({
            id: p.id,
            title: p.title,
            difficulty: p.difficulty,
            topic: p.topic
        }));

        res.json({
            success: true,
            problems: problemList,
            count: problemList.length
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch problems',
            message: error.message
        });
    }
});

/**
 * GET /api/problems/:id
 * Get full details of a specific problem (with visible test cases only)
 */
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const problem = await getProblemById(req.params.id);

        res.json({
            success: true,
            problem
        });
    } catch (error) {
        const status = error.message === 'Problem not found' ? 404 : 500;
        res.status(status).json({
            error: 'Failed to fetch problem',
            message: error.message
        });
    }
});

module.exports = router;
