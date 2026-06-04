const DEFAULT_LOCAL_JUDGE_SERVICE_URL = 'http://localhost:5005';
const EXECUTION_TIMEOUT_MS = 15000;

function isProduction() {
  return process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
}

function getJudgeServiceUrl() {
  const configuredUrl = process.env.JUDGE_SERVICE_URL ||
    process.env.RAILWAY_JUDGE_URL ||
    process.env.JAVA_JUDGE_URL ||
    process.env.JUDGE_URL;

  if (configuredUrl && configuredUrl.trim()) {
    return configuredUrl.trim();
  }

  return isProduction() ? '' : DEFAULT_LOCAL_JUDGE_SERVICE_URL;
}

function getJudgeApiKey() {
  return process.env.JUDGE_API_KEY ||
    process.env.RAILWAY_JUDGE_API_KEY ||
    process.env.JAVA_JUDGE_API_KEY ||
    process.env.JUDGE_KEY ||
    (isProduction() ? '' : 'dsa_judge_secret_123');
}

function buildJudgeExecuteUrl(rawUrl) {
  const trimmedUrl = rawUrl.trim().replace(/\/+$/, '');

  if (!trimmedUrl) return '';
  if (trimmedUrl.endsWith('/execute')) return trimmedUrl;
  if (trimmedUrl.endsWith('/judge/execute')) {
    return `${trimmedUrl.slice(0, -'/judge/execute'.length)}/execute`;
  }

  return `${trimmedUrl}/execute`;
}

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { language, version, files, compile_timeout, run_timeout } = req.body;
    const judgeServiceUrl = getJudgeServiceUrl();
    const judgeApiKey = getJudgeApiKey();

    if (language !== 'java') {
      return res.status(400).json({ error: 'Unsupported language. The custom judge engine only supports Java.' });
    }

    if (!judgeServiceUrl) {
      return res.status(503).json({
        error: 'JUDGE_SERVICE_URL is not configured. Set it to your Railway judge URL, for example https://your-service.up.railway.app',
        code: 'JUDGE_PROXY_NOT_CONFIGURED'
      });
    }

    if (!judgeApiKey) {
      return res.status(503).json({
        error: 'JUDGE_API_KEY is not configured. Set it to the same value used by your Railway judge service.',
        code: 'JUDGE_PROXY_KEY_NOT_CONFIGURED'
      });
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': judgeApiKey
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), EXECUTION_TIMEOUT_MS);

    // Call the custom hosted judge service
    const targetUrl = buildJudgeExecuteUrl(judgeServiceUrl);

    const apiResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: headers,
      signal: controller.signal,
      body: JSON.stringify({
        language,
        version,
        files,
        compile_timeout: compile_timeout || 10000,
        run_timeout: run_timeout || 5000
      })
    });

    clearTimeout(timeoutId);

    // If the judge service returns an error, pass it back
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      if (apiResponse.status === 401 || apiResponse.status === 403) {
        return res.status(502).json({
          error: 'Railway judge rejected the proxy API key. Set JUDGE_API_KEY on the frontend host to the exact same value as JUDGE_API_KEY on the Railway judge service.',
          code: 'JUDGE_PROXY_AUTH_FAILED',
          details: errorText,
          upstreamUrl: targetUrl
        });
      }

      const status = apiResponse.status >= 500 ? 502 : apiResponse.status;
      return res.status(status).json({
        error: `Judge service error: HTTP ${apiResponse.status}`,
        details: errorText,
        upstreamUrl: targetUrl
      });
    }

    const data = await apiResponse.json();
    return res.status(200).json(data);

  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Judge service request timed out.' });
    }
    return res.status(502).json({
      error: `Judge proxy could not reach the Railway judge service: ${err.message}`,
      code: 'JUDGE_PROXY_UPSTREAM_UNAVAILABLE'
    });
  }
}

module.exports._private = {
  buildJudgeExecuteUrl,
  getJudgeServiceUrl,
  getJudgeApiKey
};
