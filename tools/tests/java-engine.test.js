const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

async function loadJavaEngineSandbox(fetchImpl, extraWindow = {}, savedSettings = null) {
  const sandbox = {
    console,
    fetch: fetchImpl,
    AbortController,
    setTimeout,
    clearTimeout,
    localStorage: {
      getItem(key) { return key === 'prep_piston_settings' ? savedSettings : null; },
      setItem() {},
      removeItem() {}
    },
    window: {
      location: { hostname: 'prep.example.com' },
      ...extraWindow
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../../IOT/java-engine.js'), 'utf8'), sandbox);
  return sandbox;
}

function response(ok, status, body) {
  return {
    ok,
    status,
    async json() { return body; },
    async text() { return typeof body === 'string' ? body : JSON.stringify(body); }
  };
}

async function testFallsBackWhenSameOriginProxyIsMissing() {
  const calls = [];
  const sandbox = await loadJavaEngineSandbox(async (url) => {
    calls.push(url);
    if (url === '/api/execute') {
      return response(false, 404, 'Not Found');
    }
    return response(true, 200, {
      compile: { stdout: '', stderr: '', code: 0 },
      run: {
        stdout: '##JTEST_0\n42\n_JTEND##0\n',
        stderr: '',
        code: 0
      }
    });
  });

  const problem = {
    type: 'array_return',
    methodName: 'answer',
    returnType: 'int',
    testCases: [
      { visible: true, input: { args: [] }, expected: '42' }
    ]
  };

  const result = await sandbox.executeJavaProblem(
    problem,
    'class Solution { static int answer() { return 42; } }',
    'run'
  );

  assert.deepStrictEqual(calls, ['/api/execute', 'https://emkc.org/api/v2/piston/execute']);
  assert.strictEqual(result.networkError, null);
  assert.strictEqual(result.results.length, 1);
  assert.strictEqual(result.results[0].passed, true);
}

async function testDeployConfigIsTriedWhenSavedSettingsAreStale() {
  const calls = [];
  const renderUrl = 'https://java-judge.example.com/execute';
  const sandbox = await loadJavaEngineSandbox(
    async (url) => {
      calls.push(url);
      if (url === renderUrl) {
        return response(true, 200, {
          compile: { stdout: '', stderr: '', code: 0 },
          run: { stdout: '##JTEST_0\nok\n_JTEND##0\n', stderr: '', code: 0 }
        });
      }
      return response(false, 404, 'Not Found');
    },
    { JAVA_EXECUTION_CONFIG: { apiUrl: renderUrl, fallbackApiUrls: [] } },
    JSON.stringify({ apiUrl: '/api/execute', apiKey: '' })
  );

  const problem = {
    type: 'string_return',
    methodName: 'answer',
    returnType: 'String',
    testCases: [
      { visible: true, input: { string: '' }, expected: 'ok' }
    ]
  };

  const result = await sandbox.executeJavaProblem(
    problem,
    'class Solution { static String answer(String s) { return "ok"; } }',
    'run'
  );

  assert.deepStrictEqual(calls, ['/api/execute', renderUrl]);
  assert.strictEqual(result.networkError, null);
  assert.strictEqual(result.results[0].passed, true);
}

async function testFallsBackWhenSameOriginProxyFailsServerSide() {
  const calls = [];
  const sandbox = await loadJavaEngineSandbox(async (url) => {
    calls.push(url);
    if (url === '/api/execute') {
      return response(false, 502, {
        error: 'Judge proxy could not reach the Railway judge service',
        code: 'JUDGE_PROXY_UPSTREAM_UNAVAILABLE'
      });
    }
    return response(true, 200, {
      compile: { stdout: '', stderr: '', code: 0 },
      run: { stdout: '##JTEST_0\n7\n_JTEND##0\n', stderr: '', code: 0 }
    });
  });

  const problem = {
    type: 'array_return',
    methodName: 'answer',
    returnType: 'int',
    testCases: [
      { visible: true, input: { args: [] }, expected: '7' }
    ]
  };

  const result = await sandbox.executeJavaProblem(
    problem,
    'class Solution { static int answer() { return 7; } }',
    'run'
  );

  assert.deepStrictEqual(calls, ['/api/execute', 'https://emkc.org/api/v2/piston/execute']);
  assert.strictEqual(result.networkError, null);
  assert.strictEqual(result.results[0].passed, true);
}

async function testQueueAndVoidFeatures() {
  const sandbox = await loadJavaEngineSandbox(async (url) => {
    return response(true, 200, {
      compile: { stdout: '', stderr: '', code: 0 },
      run: { stdout: '##JTEST_0\n1 2 3 3 2 1\n_JTEND##0\n##JTEST_1\n10\n_JTEND##1\n', stderr: '', code: 0 }
    });
  });

  // Test 1: Queue parameter and return
  const problemQueue = {
    type: 'queue',
    methodName: 'mirrorQueue',
    returnType: 'Queue',
    testCases: [
      { visible: true, input: { array: [1, 2, 3] }, expected: '1 2 3 3 2 1' }
    ]
  };

  const codeQueue = `
    class Solution {
        static java.util.Queue<Integer> mirrorQueue(java.util.Queue<Integer> q) {
            return q;
        }
    }
  `;

  const wrapResultQueue = sandbox.wrapJavaCode(codeQueue, problemQueue, 'run');
  assert.ok(wrapResultQueue.wrappedCode.includes('__buildQueue'));
  assert.ok(wrapResultQueue.wrappedCode.includes('__printQueue'));
  assert.ok(wrapResultQueue.wrappedCode.includes('Solution.mirrorQueue'));

  // Test 2: Void return type
  const problemVoid = {
    type: 'string_return',
    methodName: 'printHello',
    returnType: 'void',
    testCases: [
      { visible: true, input: { string: 'hello' }, expected: '10' }
    ]
  };

  const codeVoid = `
    class Solution {
        static void printHello(String s) {
            System.out.println(10);
        }
    }
  `;

  const wrapResultVoid = sandbox.wrapJavaCode(codeVoid, problemVoid, 'run');
  assert.ok(wrapResultVoid.wrappedCode.includes('Solution.printHello("hello");'));
  assert.ok(!wrapResultVoid.wrappedCode.includes('System.out.println(Solution.printHello'));

  console.log('✓ testQueueAndVoidFeatures passed successfully!');
}

async function main() {
  await testFallsBackWhenSameOriginProxyIsMissing();
  await testDeployConfigIsTriedWhenSavedSettingsAreStale();
  await testFallsBackWhenSameOriginProxyFailsServerSide();
  await testQueueAndVoidFeatures();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
