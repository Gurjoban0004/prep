/**
 * Security validator for user-submitted Java code
 * Blocks dangerous patterns that could compromise the system
 */

const DANGEROUS_PATTERNS = [
    {
        pattern: /System\s*\.\s*exit/i,
        message: 'System.exit is not allowed'
    },
    {
        pattern: /Runtime\s*\.\s*getRuntime/i,
        message: 'Runtime.getRuntime is not allowed'
    },
    {
        pattern: /ProcessBuilder/i,
        message: 'ProcessBuilder is not allowed'
    },
    {
        pattern: /java\s*\.\s*io\s*\.\s*File/i,
        message: 'File system access is not allowed'
    },
    {
        pattern: /java\s*\.\s*net/i,
        message: 'Network access is not allowed'
    },
    {
        pattern: /java\s*\.\s*lang\s*\.\s*reflect/i,
        message: 'Reflection is not allowed'
    },
    {
        pattern: /class\s+\w+/,
        message: 'Class declarations are not allowed - submit only the solve method'
    },
    {
        pattern: /public\s+static\s+void\s+main/,
        message: 'main method is not allowed - submit only the solve method'
    },
    {
        pattern: /import\s+/,
        message: 'Import statements are not allowed - common imports are already included'
    },
    // Additional security patterns
    {
        pattern: /Class\s*\.\s*forName/i,
        message: 'Dynamic class loading is not allowed'
    },
    {
        pattern: /ClassLoader/i,
        message: 'ClassLoader access is not allowed'
    },
    {
        pattern: /new\s+Thread/i,
        message: 'Thread creation is not allowed'
    },
    {
        pattern: /\.start\s*\(\s*\)/,
        message: 'Starting threads is not allowed'
    },
    {
        pattern: /Unsafe/i,
        message: 'sun.misc.Unsafe is not allowed'
    },
    {
        pattern: /\.exec\s*\(/i,
        message: 'Process execution is not allowed'
    },
    {
        pattern: /new\s+(URL|Socket|ServerSocket|HttpURLConnection)/i,
        message: 'Network connections are not allowed'
    },
    {
        pattern: /new\s+Scanner\s*\(\s*System\s*\.\s*in/i,
        message: 'Reading from System.in is not allowed'
    },
    {
        pattern: /FileWriter|FileReader|FileOutputStream|FileInputStream|RandomAccessFile/i,
        message: 'Direct file I/O is not allowed'
    }
];

/**
 * Validate user code for security and submission rules
 * @param {string} code - User submitted code
 * @returns {Object} - { valid: boolean, error: string | null }
 */
function validateCode(code) {
    if (!code || code.trim().length === 0) {
        return { valid: false, error: 'Code cannot be empty' };
    }

    // Check for dangerous patterns
    for (const { pattern, message } of DANGEROUS_PATTERNS) {
        if (pattern.test(code)) {
            return { valid: false, error: message };
        }
    }

    return { valid: true, error: null };
}

/**
 * Express middleware for code validation
 */
function codeValidatorMiddleware(req, res, next) {
    const { code } = req.body;

    const validation = validateCode(code);

    if (!validation.valid) {
        return res.status(400).json({
            error: 'Code validation failed',
            message: validation.error
        });
    }

    next();
}

module.exports = {
    validateCode,
    codeValidatorMiddleware
};
