const fs = require('fs');
const csv = require('csv-parser');

// CANONICAL SCHEMA: Required columns for questions.csv
const REQUIRED_QUESTION_COLUMNS = [
    'id', 'title', 'difficulty', 'topic', 'description',
    'input_format', 'output_format', 'constraints',
    'sample_input', 'sample_output',
    'logical_signature',      // UI display only
    'java_method_signature',  // Judge execution only
    'solution_hint', 'time_limit_ms', 'memory_limit_mb'
];

// Expected columns for test_cases.csv
const TEST_CASE_COLUMNS = [
    'test_id', 'question_id', 'input', 'expected_output', 'is_hidden'
];

/**
 * Validate java_method_signature format
 */
function validateJavaMethodSignature(signature, rowNum) {
    if (!signature || signature.trim() === '') {
        return `Row ${rowNum}: java_method_signature cannot be empty`;
    }

    const trimmed = signature.trim();

    // Must start with 'public'
    if (!trimmed.startsWith('public')) {
        return `Row ${rowNum}: java_method_signature must start with 'public' (found: "${trimmed.substring(0, 20)}...")`;
    }

    // Must contain 'solve('
    if (!trimmed.includes('solve(')) {
        return `Row ${rowNum}: java_method_signature must include method name 'solve(' (found: "${trimmed}")`;
    }

    return null; // Valid
}

/**
 * Parse questions.csv and validate schema
 */
function parseQuestionsCSV(filePath) {
    return new Promise((resolve, reject) => {
        const questions = [];
        const errors = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const rowNum = questions.length + 1;

                // Validate all REQUIRED columns exist
                const missingColumns = REQUIRED_QUESTION_COLUMNS.filter(col => !(col in row));

                if (missingColumns.length > 0) {
                    errors.push(`Row ${rowNum}: Missing required columns: ${missingColumns.join(', ')}`);
                    return;
                }

                // Validate numeric fields
                if (isNaN(row.id) || isNaN(row.time_limit_ms) || isNaN(row.memory_limit_mb)) {
                    errors.push(`Row ${rowNum}: id, time_limit_ms, and memory_limit_mb must be numbers`);
                    return;
                }

                // Validate logical_signature (UI display)
                if (!row.logical_signature || row.logical_signature.trim() === '') {
                    errors.push(`Row ${rowNum}: logical_signature cannot be empty`);
                    return;
                }

                // Validate java_method_signature (Judge execution)
                const sigError = validateJavaMethodSignature(row.java_method_signature, rowNum);
                if (sigError) {
                    errors.push(sigError);
                    return;
                }

                // Parse and store (ignore unknown columns)
                questions.push({
                    id: parseInt(row.id),
                    title: row.title,
                    difficulty: row.difficulty,
                    topic: row.topic,
                    description: row.description,
                    input_format: row.input_format,
                    output_format: row.output_format,
                    constraints: row.constraints,
                    sample_input: row.sample_input,
                    sample_output: row.sample_output,
                    logical_signature: row.logical_signature.trim(),
                    java_method_signature: row.java_method_signature.trim(),
                    solution_hint: row.solution_hint,
                    time_limit_ms: parseInt(row.time_limit_ms),
                    memory_limit_mb: parseInt(row.memory_limit_mb)
                });
            })
            .on('end', () => {
                if (errors.length > 0) {
                    reject(new Error(`CSV validation errors:\n${errors.join('\n')}`));
                } else {
                    console.log(`✅ Parsed ${questions.length} questions from CSV`);
                    resolve(questions);
                }
            })
            .on('error', (error) => {
                reject(new Error(`CSV parsing error: ${error.message}`));
            });
    });
}

/**
 * Parse test_cases.csv and validate schema
 */
function parseTestCasesCSV(filePath) {
    return new Promise((resolve, reject) => {
        const testCases = [];
        const errors = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Skip empty rows
                if (!row.test_id || row.test_id.trim() === '') {
                    return;
                }

                // Validate all required columns exist
                const missingColumns = TEST_CASE_COLUMNS.filter(col => !(col in row));

                if (missingColumns.length > 0) {
                    errors.push(`Row ${testCases.length + 1}: Missing columns: ${missingColumns.join(', ')}`);
                    return;
                }

                // Validate numeric fields
                if (isNaN(row.test_id) || isNaN(row.question_id)) {
                    errors.push(`Row ${testCases.length + 1}: test_id and question_id must be numbers`);
                    return;
                }

                // Validate JSON in input field
                try {
                    // The CSV may have escaped quotes with backslashes (\\")
                    // We need to convert them to actual quotes for valid JSON
                    const cleanedInput = row.input.replace(/\\\"/g, '"');
                    const parsedInput = JSON.parse(cleanedInput);

                    // Verify it's an array
                    if (!Array.isArray(parsedInput)) {
                        errors.push(`Row ${testCases.length + 1}: input must be a JSON array`);
                        return;
                    }

                    // Store the cleaned version
                    row.input = cleanedInput;
                } catch (e) {
                    errors.push(`Row ${testCases.length + 1}: input field must be valid JSON - ${e.message}`);
                    return;
                }

                // Validate is_hidden is boolean
                if (!row.is_hidden || typeof row.is_hidden !== 'string') {
                    errors.push(`Row ${testCases.length + 1}: is_hidden is required and must be 'true' or 'false'`);
                    return;
                }
                const isHidden = row.is_hidden.toLowerCase();
                if (isHidden !== 'true' && isHidden !== 'false') {
                    errors.push(`Row ${testCases.length + 1}: is_hidden must be true or false`);
                    return;
                }

                // Parse and store
                testCases.push({
                    test_id: parseInt(row.test_id),
                    question_id: parseInt(row.question_id),
                    input: row.input, // Keep as JSON string
                    expected_output: row.expected_output,
                    is_hidden: isHidden === 'true'
                });
            })
            .on('end', () => {
                if (errors.length > 0) {
                    reject(new Error(`CSV validation errors:\n${errors.join('\n')}`));
                } else {
                    console.log(`✅ Parsed ${testCases.length} test cases from CSV`);
                    resolve(testCases);
                }
            })
            .on('error', (error) => {
                reject(new Error(`CSV parsing error: ${error.message}`));
            });
    });
}

/**
 * Parse reference_solutions.csv and validate schema
 */
function parseReferenceSolutionsCSV(filePath) {
    return new Promise((resolve, reject) => {
        const solutions = [];
        const errors = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const rowNum = solutions.length + 1;

                // Validate required columns
                if (!row.question_id || !row.java_solution) {
                    errors.push(`Row ${rowNum}: Missing required columns: question_id, java_solution`);
                    return;
                }

                // Validate question_id is a number
                if (isNaN(row.question_id)) {
                    errors.push(`Row ${rowNum}: question_id must be a number`);
                    return;
                }

                // Validate java_solution is not empty
                if (row.java_solution.trim() === '') {
                    errors.push(`Row ${rowNum}: java_solution cannot be empty`);
                    return;
                }

                // Parse and store
                solutions.push({
                    question_id: parseInt(row.question_id),
                    java_solution: row.java_solution.trim()
                });
            })
            .on('end', () => {
                if (errors.length > 0) {
                    reject(new Error(`CSV validation errors:\n${errors.join('\n')}`));
                } else {
                    console.log(`✅ Parsed ${solutions.length} reference solutions from CSV`);
                    resolve(solutions);
                }
            })
            .on('error', (error) => {
                reject(new Error(`CSV parsing error: ${error.message}`));
            });
    });
}

module.exports = {
    parseQuestionsCSV,
    parseTestCasesCSV,
    parseReferenceSolutionsCSV
};
