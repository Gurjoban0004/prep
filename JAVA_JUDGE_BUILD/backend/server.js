/**
 * Backend API Server
 * 
 * Entry point for the Java coding platform backend.
 * Configures Express app with routes for:
 * - Admin CSV upload (/admin)
 * - Problems API (/api/problems)
 * - Code submission (/api/submit)
 * 
 * Environment: Connects to Firebase Firestore or uses in-memory storage
 * Port: Configurable via PORT env var (default: 3000)
 */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Import routes
const adminRoutes = require('./routes/admin');
const problemsRoutes = require('./routes/problems');
const submitRoutes = require('./routes/submit');
const sessionRoutes = require('./routes/sessions');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers (Fix #15)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Monaco editor needs these
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://*.firebaseio.com", "https://*.googleapis.com"]
    }
  }
}));

// CORS (Fix #16) - strict with allowlist
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const { rateLimitAPI } = require('./middleware/rateLimiter');

// Apply API rate limiter to all /api routes
app.use('/api/', rateLimitAPI);
// Apply API rate limiter to admin routes too (Fix #18)
app.use('/admin/', rateLimitAPI);

// Routes
app.use('/admin', adminRoutes);
app.use('/api/problems', problemsRoutes);
app.use('/api', submitRoutes);
app.use('/api/sessions', sessionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend-api' });
});

// Error handling middleware (Fix #17) - sanitize errors in production
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const isDev = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    error: isDev ? err.message : 'Internal server error',
    code: err.code || 'UNKNOWN_ERROR',
    ...(isDev && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend API server running on port ${PORT}`);
});
