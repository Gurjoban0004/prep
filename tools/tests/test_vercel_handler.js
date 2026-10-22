const assert = require('assert');

function createReq() {
  return {
    method: 'POST',
    body: {
      language: 'java',
      version: '15.0.2',
      files: [
        {
          name: 'Main.java',
          content: 'public class Main { public static void main(String[] args) { System.out.println("Hello"); } }'
        }
      ]
    }
  };
}

function createRes() {
  return {
    statusCode: 200,
    body: null,
    headers: {},
    setHeader(key, val) {
      this.headers[key] = val;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
    end() {
      return this;
    }
  };
}

async function withFreshHandler(handlerPath, env, testFn) {
  const oldEnv = { ...process.env };
  Object.keys(process.env).forEach(key => {
    if (key.startsWith('JUDGE_') || key === 'NODE_ENV') delete process.env[key];
  });
  Object.assign(process.env, env);
  delete require.cache[require.resolve(handlerPath)];

  try {
    await testFn(require(handlerPath));
  } finally {
    process.env = oldEnv;
    delete require.cache[require.resolve(handlerPath)];
  }
}

async function testDoesNotDoubleAppendExecutePath(handlerPath) {
  const calls = [];
  await withFreshHandler(
    handlerPath,
    {
      NODE_ENV: 'production',
      JUDGE_SERVICE_URL: 'https://java-judge.up.railway.app/execute',
      JUDGE_API_KEY: 'railway-secret'
    },
    async handler => {
      global.fetch = async (url, options) => {
        calls.push({ url, options });
        return {
          ok: true,
          status: 200,
          async json() {
            return {
              compile: { stdout: '', stderr: '', code: 0 },
              run: { stdout: 'Hello\n', stderr: '', code: 0 }
            };
          }
        };
      };

      const res = createRes();
      await handler(createReq(), res);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(calls[0].url, 'https://java-judge.up.railway.app/execute');
      assert.strictEqual(calls[0].options.headers['X-API-Key'], 'railway-secret');
    }
  );
}

async function testProductionRequiresHostedJudgeUrl(handlerPath) {
  await withFreshHandler(handlerPath, { NODE_ENV: 'production' }, async handler => {
    let fetchCalled = false;
    global.fetch = async () => {
      fetchCalled = true;
      throw new Error('should not call localhost in production');
    };

    const res = createRes();
    await handler(createReq(), res);

    assert.strictEqual(fetchCalled, false);
    assert.strictEqual(res.statusCode, 503);
    assert.match(res.body.error, /JUDGE_SERVICE_URL/);
  });
}

async function testUpstreamUnauthorizedIsProxyAuthFailure(handlerPath) {
  await withFreshHandler(
    handlerPath,
    {
      NODE_ENV: 'production',
      JUDGE_SERVICE_URL: 'https://java-judge.up.railway.app',
      JUDGE_API_KEY: 'wrong-secret'
    },
    async handler => {
      global.fetch = async () => ({
        ok: false,
        status: 401,
        async text() {
          return JSON.stringify({ error: 'Unauthorized: Invalid API Key' });
        }
      });

      const res = createRes();
      await handler(createReq(), res);

      assert.strictEqual(res.statusCode, 502);
      assert.strictEqual(res.body.code, 'JUDGE_PROXY_AUTH_FAILED');
      assert.match(res.body.error, /JUDGE_API_KEY/);
    }
  );
}

async function testAnalyticsHandler() {
  const analyticsHandler = require('../../api/analytics');
  
  // Test GET
  const getRes = createRes();
  await analyticsHandler({ method: 'GET' }, getRes);
  assert.strictEqual(getRes.statusCode, 200);
  assert.strictEqual(getRes.body.ok, true);
  assert.strictEqual(getRes.body.service, 'prep-visitor-analytics');

  // Test POST with valid payload
  const postRes = createRes();
  await analyticsHandler({
    method: 'POST',
    body: {
      visitorId: 'vis_test_123',
      alias: 'Guest-Sage-42',
      sessionNumber: 1,
      startTime: Date.now(),
      endTime: Date.now(),
      durationSeconds: 120,
      topicsViewed: 2,
      quizzesAnswered: 5,
      quizCorrect: 4,
      subjects: ['sysdesign'],
      device: 'Desktop'
    }
  }, postRes);
  assert.strictEqual(postRes.statusCode, 200);
  assert.strictEqual(postRes.body.ok, true);
  assert.strictEqual(postRes.body.received, true);

  // Test POST with missing/invalid visitorId
  const invalidRes = createRes();
  await analyticsHandler({ method: 'POST', body: { visitorId: 'invalid' } }, invalidRes);
  assert.strictEqual(invalidRes.statusCode, 400);

  // Test unsupported method (PUT)
  const methodRes = createRes();
  await analyticsHandler({ method: 'PUT' }, methodRes);
  assert.strictEqual(methodRes.statusCode, 405);
}

async function main() {
  for (const handlerPath of ['../../api/execute']) {
    await testDoesNotDoubleAppendExecutePath(handlerPath);
    await testProductionRequiresHostedJudgeUrl(handlerPath);
    await testUpstreamUnauthorizedIsProxyAuthFailure(handlerPath);
  }
  await testAnalyticsHandler();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

