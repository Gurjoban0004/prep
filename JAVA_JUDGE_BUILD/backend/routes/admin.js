/**
 * Admin Upload Routes
 * 
 * Provides admin-only endpoints for uploading questions and test cases via CSV files.
 * 
 * Endpoints:
 * - POST /admin/upload/questions - Upload questions.csv
 * - POST /admin/upload/testcases - Upload test_cases.csv
 * 
 * Uses multer for file upload handling and csvParser for validation.
 */
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { parseQuestionsCSV, parseTestCasesCSV } = require('../services/csvParser');
const { uploadQuestions, uploadTestCases, clearAllQuestionData } = require('../services/firestoreService');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads with 5MB limit
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Apply authentication and ADMIN CHECK to all admin routes
router.use(verifyToken, verifyAdmin);

/**
 * POST /admin/upload/questions
 * Upload questions.csv
 */
router.post('/upload/questions', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Check file extension
        if (path.extname(req.file.originalname).toLowerCase() !== '.csv') {
            // Clean up uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'File must be a CSV' });
        }

        // Parse CSV
        const questions = await parseQuestionsCSV(req.file.path);

        // Upload to Firestore
        await uploadQuestions(questions);

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            message: `Successfully uploaded ${questions.length} questions`,
            count: questions.length
        });
    } catch (error) {
        // Clean up file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            error: 'Failed to upload questions',
            message: error.message
        });
    }
});

/**
 * POST /admin/upload/testcases
 * Upload test_cases.csv
 */
router.post('/upload/testcases', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Check file extension
        if (path.extname(req.file.originalname).toLowerCase() !== '.csv') {
            // Clean up uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'File must be a CSV' });
        }

        // Parse CSV
        const testCases = await parseTestCasesCSV(req.file.path);

        // Upload to Firestore
        await uploadTestCases(testCases);

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            message: `Successfully uploaded ${testCases.length} test cases`,
            count: testCases.length
        });
    } catch (error) {
        // Clean up file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            error: 'Failed to upload test cases',
            message: error.message
        });
    }
});

/**
 * POST /admin/upload/reference-solutions
 * Upload reference_solutions.csv (Admin only)
 */
router.post('/upload/reference-solutions', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Check file extension
        if (path.extname(req.file.originalname).toLowerCase() !== '.csv') {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'File must be a CSV' });
        }

        // Parse CSV
        const { parseReferenceSolutionsCSV } = require('../services/csvParser');
        const solutions = await parseReferenceSolutionsCSV(req.file.path);

        // Upload to Firestore
        const { uploadReferenceSolutions } = require('../services/firestoreService');
        await uploadReferenceSolutions(solutions);

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            message: `Successfully uploaded ${solutions.length} reference solutions`,
            count: solutions.length
        });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            error: 'Failed to upload reference solutions',
            message: error.message
        });
    }
});

/**
 * DELETE /admin/reset
 * Clear all question-related data (Questions, Test Cases, Reference Solutions)
 */
router.delete('/reset', async (req, res) => {
    try {
        await clearAllQuestionData();
        res.json({
            success: true,
            message: 'Successfully cleared all platform data (Questions, Test Cases, Reference Solutions)'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to reset platform data',
            message: error.message
        });
    }
});

module.exports = router;
