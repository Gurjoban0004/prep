const { RateLimiterMemory } = require('rate-limiter-flexible');

// ============================================
// RATE LIMITER CONFIGURATIONS
// ============================================

// Practice mode: More generous for learning
const practiceLimiter = new RateLimiterMemory({
    keyPrefix: 'practice',
    points: 10,          // 10 submissions
    duration: 60,        // per 60 seconds (1 minute)
    blockDuration: 30,   // Block for 30 seconds when limit exceeded
});

// Session mode: Balanced for exams
const sessionLimiter = new RateLimiterMemory({
    keyPrefix: 'session',
    points: 5,           // 5 submissions
    duration: 60,        // per 60 seconds
    blockDuration: 20,   // Block for 20 seconds
});

// Global safety limit (prevents total system overload)
const globalLimiter = new RateLimiterMemory({
    keyPrefix: 'global',
    points: 500,         // 500 total submissions
    duration: 60,        // per 60 seconds (across ALL users)
    blockDuration: 60,   // Block for 60 seconds if somehow exceeded
});

// Admin/Teacher: Very generous limits
const adminLimiter = new RateLimiterMemory({
    keyPrefix: 'admin',
    points: 100,         // 100 requests
    duration: 60,        // per 60 seconds
    blockDuration: 10,   // Block for 10 seconds
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get the appropriate limiter based on request context
 */
function getLimiter(req) {
    // Check if this is a session submission
    if (req.path.includes('/sessions/') && req.path.includes('/submit')) {
        return sessionLimiter;
    }

    // Check if user is admin/teacher
    if (req.user && req.user.customClaims && req.user.customClaims.admin) {
        return adminLimiter;
    }

    // Default to practice limiter
    return practiceLimiter;
}

/**
 * Generate rate limit key based on user identity
 */
function getRateLimitKey(req) {
    // Prefer user ID if authenticated
    if (req.user && req.user.uid) {
        return req.user.uid;
    }

    // Fallback to IP address for unauthenticated requests
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    return `ip_${ip}`;
}

/**
 * Format remaining time in human-readable format
 */
function formatRetryAfter(msBeforeNext) {
    const seconds = Math.round(msBeforeNext / 1000);
    if (seconds < 60) {
        return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
}

// ============================================
// MIDDLEWARE FUNCTIONS
// ============================================

/**
 * Main rate limiting middleware for submissions
 */
const rateLimitSubmissions = async (req, res, next) => {
    try {
        const limiter = getLimiter(req);
        const key = getRateLimitKey(req);

        // Also check global limit
        const globalKey = 'all_users';

        // Consume 1 point from user's limit
        try {
            await limiter.consume(key, 1);
        } catch (rateLimiterRes) {
            // User-specific limit exceeded
            const retryAfter = Math.round(rateLimiterRes.msBeforeNext / 1000) || 30;
            const retryAfterText = formatRetryAfter(rateLimiterRes.msBeforeNext || 30000);

            return res.status(429).json({
                error: 'Too many submissions. Please slow down.',
                message: `You have exceeded the rate limit. Please wait ${retryAfterText} before trying again.`,
                retryAfter: retryAfter,
                limit: limiter.points,
                period: `${limiter.duration} seconds`,
                remaining: rateLimiterRes.remainingPoints || 0
            });
        }

        // Check global limit - block if system is overloaded
        try {
            await globalLimiter.consume(globalKey, 1);
        } catch (globalRateLimiterRes) {
            console.warn('⚠️ Global rate limit reached - system under heavy load');
            return res.status(503).json({
                error: 'System is under heavy load. Please try again in a moment.',
                retryAfter: Math.round(globalRateLimiterRes.msBeforeNext / 1000) || 60
            });
        }

        // Get remaining points for headers
        const limiterStatus = await limiter.get(key);
        if (limiterStatus) {
            res.set({
                'X-RateLimit-Limit': limiter.points,
                'X-RateLimit-Remaining': limiterStatus.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + limiterStatus.msBeforeNext).toISOString()
            });
        }

        next();
    } catch (error) {
        console.error('Rate limiter error:', error);
        // Don't block requests if rate limiter fails
        next();
    }
};

/**
 * General API rate limiting (for all other endpoints)
 */
const apiLimiter = new RateLimiterMemory({
    keyPrefix: 'api',
    points: 100,        // 100 requests
    duration: 900,      // per 15 minutes
    blockDuration: 60,  // Block for 60 seconds
});

const rateLimitAPI = async (req, res, next) => {
    try {
        const key = getRateLimitKey(req);

        await apiLimiter.consume(key, 1);

        next();
    } catch (rateLimiterRes) {
        const retryAfter = Math.round(rateLimiterRes.msBeforeNext / 1000) || 60;

        return res.status(429).json({
            error: 'Too many requests.',
            message: 'API rate limit exceeded. Please try again later.',
            retryAfter: retryAfter
        });
    }
};

/**
 * Get current rate limit status for a user (useful for frontend)
 */
const getRateLimitStatus = async (req, res) => {
    try {
        const limiter = getLimiter(req);
        const key = getRateLimitKey(req);

        const status = await limiter.get(key);

        if (!status) {
            return res.json({
                limit: limiter.points,
                remaining: limiter.points,
                resetAt: new Date(Date.now() + limiter.duration * 1000).toISOString(),
                period: `${limiter.duration} seconds`
            });
        }

        return res.json({
            limit: limiter.points,
            remaining: status.remainingPoints,
            resetAt: new Date(Date.now() + status.msBeforeNext).toISOString(),
            period: `${limiter.duration} seconds`,
            consumed: status.consumedPoints
        });
    } catch (error) {
        console.error('Error getting rate limit status:', error);
        return res.status(500).json({ error: 'Failed to get rate limit status' });
    }
};

/**
 * Reset rate limit for a specific user (admin only)
 */
const resetRateLimit = async (req, res) => {
    try {
        const { userId } = req.params;

        // Verify admin
        if (!req.user || !req.user.customClaims || !req.user.customClaims.admin) {
            return res.status(403).json({ error: 'Admin access required' });
        }

        // Reset for all limiter types
        await practiceLimiter.delete(userId);
        await sessionLimiter.delete(userId);

        console.log(`✅ Rate limit reset for user: ${userId}`);

        return res.json({
            success: true,
            message: `Rate limit reset for user ${userId}`
        });
    } catch (error) {
        console.error('Error resetting rate limit:', error);
        return res.status(500).json({ error: 'Failed to reset rate limit' });
    }
};

// ============================================
// MEMORY CLEANUP (Prevents memory leaks)
// ============================================

// Clean up old rate limit entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    const cleanupThreshold = 15 * 60 * 1000; // 15 minutes

    // Note: rate-limiter-flexible auto-cleans expired entries
    // This is just for logging/monitoring
    console.log('🧹 Rate limiter cleanup check completed');
}, 5 * 60 * 1000);

// ============================================
// EXPORTS
// ============================================

module.exports = {
    rateLimitSubmissions,
    rateLimitAPI,
    getRateLimitStatus,
    resetRateLimit
};
