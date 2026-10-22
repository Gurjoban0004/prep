/**
 * Serverless Telemetry Endpoint for prep Study Hub
 * Collects anonymous visitor metrics completely decoupled from Google Sign-In / user auth.
 */

// In-memory ring buffer for recent anonymous visitor sessions (per lambda lifecycle)
const recentSessions = [];
const MAX_SESSIONS = 100;

module.exports = async function handler(req, res) {
  if (typeof res.setHeader === 'function') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    return typeof res.end === 'function' ? res.status(204).end() : res.status(204).json({});
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      service: 'prep-visitor-analytics',
      timestamp: Date.now()
    });
  }

  if (req.method === 'POST') {
    try {
      const payload = req.body || {};
      const {
        visitorId,
        alias,
        sessionNumber,
        startTime,
        endTime,
        durationSeconds,
        topicsViewed,
        quizzesAnswered,
        quizCorrect,
        subjects,
        device
      } = payload;

      // Ensure valid anonymous visitor ID
      if (!visitorId || typeof visitorId !== 'string' || !visitorId.startsWith('vis_')) {
        return res.status(400).json({ error: 'Invalid or missing anonymous visitorId' });
      }

      // Record sanitized session record
      const sessionRecord = {
        id: payload.id || `ses_${Date.now().toString(36)}`,
        visitorId: String(visitorId).slice(0, 32),
        alias: String(alias || 'Guest-Scholar').slice(0, 32),
        sessionNumber: Number(sessionNumber) || 1,
        startTime: Number(startTime) || Date.now(),
        endTime: Number(endTime) || Date.now(),
        durationSeconds: Math.max(0, Number(durationSeconds) || 0),
        topicsViewed: Math.max(0, Number(topicsViewed) || 0),
        quizzesAnswered: Math.max(0, Number(quizzesAnswered) || 0),
        quizCorrect: Math.max(0, Number(quizCorrect) || 0),
        subjects: Array.isArray(subjects) ? subjects.slice(0, 10).map(s => String(s).slice(0, 20)) : [],
        device: device === 'Mobile' ? 'Mobile' : 'Desktop',
        receivedAt: Date.now()
      };

      recentSessions.unshift(sessionRecord);
      if (recentSessions.length > MAX_SESSIONS) {
        recentSessions.length = MAX_SESSIONS;
      }

      return res.status(200).json({
        ok: true,
        received: true,
        sessionCount: recentSessions.length,
        timestamp: Date.now()
      });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to process telemetry payload', message: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
