const JUDGE_SERVICE_URL = process.env.JUDGE_SERVICE_URL || 'http://localhost:5005';
const JUDGE_API_KEY = process.env.JUDGE_API_KEY || 'dsa_judge_secret_123';
const EXECUTION_TIMEOUT_MS = 15000;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { language, version, files, compile_timeout, run_timeout } = req.body;

    if (language !== 'java') {
      return res.status(400).json({ error: 'Unsupported language. The custom judge engine only supports Java.' });
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': JUDGE_API_KEY
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), EXECUTION_TIMEOUT_MS);

    // Call the custom hosted judge service
    const targetUrl = `${JUDGE_SERVICE_URL}/execute`;

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
      return res.status(apiResponse.status).json({
        error: `Judge service error: HTTP ${apiResponse.status}`,
        details: errorText
      });
    }

    const data = await apiResponse.json();
    return res.status(200).json(data);

  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Judge service request timed out.' });
    }
    return res.status(500).json({ error: `Server proxy error: ${err.message}` });
  }
}

