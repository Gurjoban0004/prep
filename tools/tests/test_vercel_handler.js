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
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
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

async function main() {
  for (const handlerPath of ['../../api/execute']) {
    await testDoesNotDoubleAppendExecutePath(handlerPath);
    await testProductionRequiresHostedJudgeUrl(handlerPath);
    await testUpstreamUnauthorizedIsProxyAuthFailure(handlerPath);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
