// ============================================================
//  JAVA ENGINE — Piston API integration & code wrapping
//  Consumed by app.js: executeJavaProblem(), wrapJavaCode()
// ============================================================

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';
const DEFAULT_JAVA_EXECUTION_API_URL = '/api/execute';
const JAVA_VERSION = '15.0.2';
const PISTON_TIMEOUT_MS = 15000; // 15s client-side timeout
const TEST_MARKER_START = '##JTEST_';
const TEST_MARKER_END = '_JTEND##';

/**
 * Load Piston custom settings from localStorage
 */
function getPistonSettings() {
  const deployConfig = window.JAVA_EXECUTION_CONFIG || {};
  let settings = {
    apiUrl: deployConfig.apiUrl || DEFAULT_JAVA_EXECUTION_API_URL,
    apiKey: deployConfig.apiKey || '',
    fallbackApiUrls: Array.isArray(deployConfig.fallbackApiUrls) ? deployConfig.fallbackApiUrls : [PISTON_API_URL]
  };

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    settings.fallbackApiUrls = [
      'http://localhost:5005/execute',
      ...settings.fallbackApiUrls
    ];
  }

  try {
    const saved = localStorage.getItem('prep_piston_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      settings = {
        ...settings,
        ...parsed,
        fallbackApiUrls: Array.isArray(parsed.fallbackApiUrls) ? parsed.fallbackApiUrls : settings.fallbackApiUrls
      };
    }
  } catch (e) {
    console.error("Error loading Piston settings", e);
  }

  return settings;
}

function getJavaExecutionEndpointCandidates(settings) {
  const deployConfig = window.JAVA_EXECUTION_CONFIG || {};
  const candidates = [
    settings.apiUrl || DEFAULT_JAVA_EXECUTION_API_URL,
    deployConfig.apiUrl,
    ...(settings.fallbackApiUrls || [])
  ];
  const seen = new Set();

  return candidates
    .map(url => typeof url === 'string' ? url.trim() : '')
    .filter(url => {
      if (!url || seen.has(url)) return false;
      seen.add(url);
      return true;
    });
}

function buildJavaExecutionHeaders(settings, apiUrl) {
  const headers = { 'Content-Type': 'application/json' };

  // Never attach a private/custom key to the public Piston fallback.
  if (settings.apiKey && apiUrl !== PISTON_API_URL) {
    headers['Authorization'] = `Bearer ${settings.apiKey}`;
    headers['X-Piston-Key'] = settings.apiKey;
    headers['X-API-Key'] = settings.apiKey;
  }

  return headers;
}

/**
 * Count lines in a string (for compiler error line mapping)
 */
function countLines(str) {
  return (str.match(/\n/g) || []).length + 1;
}

/**
 * Strip 'public' from 'public class Solution' to avoid Java single-public-class rule.
 * The combined file is Main.java, so only Main can be public.
 */
function stripPublicFromSolution(code) {
  return code.replace(/public\s+class\s+Solution/g, 'class Solution');
}

/**
 * Build a linked list from an int array in Java source code
 */
function buildListJava(varName, values) {
  if (!values || values.length === 0) return `Solution.Node ${varName} = null;`;
  return `Solution.Node ${varName} = __buildList(new int[]{${values.join(',')}});`;
}

/**
 * Build a binary tree from a level-order array (with nulls) in Java source code
 */
function buildTreeJava(varName, values) {
  if (!values || values.length === 0) return `Solution.Node ${varName} = null;`;
  const javaArray = values.map(v => v === null ? 'null' : String(v)).join(',');
  return `Solution.Node ${varName} = __buildTree(new Integer[]{${javaArray}});`;
}

/**
 * Generate the Main.java test runner wrapper for a given problem and its test cases.
 * Returns { wrappedCode, wrapperLineCount } so we can map compiler errors.
 */
function wrapJavaCode(studentCode, problem, mode) {
  const tests = mode === 'run'
    ? problem.testCases.filter(t => t.visible)
    : problem.testCases;

  // --- Header: imports + sanitised student code ---
  const sanitisedCode = stripPublicFromSolution(studentCode);
  const header = `import java.util.*;\nimport java.util.stream.*;\n\n${sanitisedCode}\n\n`;
  const headerLineCount = countLines(header);

  // --- Helpers based on problem type ---
  let helpers = '';

  if (problem.type === 'singly_linked_list' || problem.type === 'two_singly_linked_lists') {
    helpers += `
    static Solution.Node __buildList(int[] arr) {
        if (arr == null || arr.length == 0) return null;
        Solution.Node head = new Solution.Node(arr[0]);
        Solution.Node curr = head;
        for (int i = 1; i < arr.length; i++) {
            curr.next = new Solution.Node(arr[i]);
            curr = curr.next;
        }
        return head;
    }
    static String __printList(Solution.Node head) {
        StringBuilder sb = new StringBuilder();
        int safety = 0;
        while (head != null && safety < 10000) {
            if (sb.length() > 0) sb.append(" ");
            sb.append(head.data);
            head = head.next;
            safety++;
        }
        return sb.toString();
    }
`;
  }

  if (problem.type === 'binary_tree') {
    helpers += `
    static Solution.Node __buildTree(Integer[] arr) {
        if (arr == null || arr.length == 0 || arr[0] == null) return null;
        Solution.Node root = new Solution.Node(arr[0]);
        Queue<Solution.Node> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            Solution.Node curr = q.poll();
            if (i < arr.length && arr[i] != null) {
                curr.left = new Solution.Node(arr[i]);
                q.add(curr.left);
            }
            i++;
            if (i < arr.length && arr[i] != null) {
                curr.right = new Solution.Node(arr[i]);
                q.add(curr.right);
            }
            i++;
        }
        return root;
    }
`;
  }

  // --- Generate test case execution code ---
  let testCode = '';
  tests.forEach((tc, idx) => {
    testCode += `        // Test ${idx}\n`;
    testCode += `        System.out.println("${TEST_MARKER_START}${idx}");\n`;
    testCode += `        try {\n`;
    testCode += generateTestCall(problem, tc, idx);
    testCode += `        } catch (Exception __e) {\n`;
    testCode += `            System.out.println("RUNTIME_ERROR: " + __e.getClass().getSimpleName() + ": " + __e.getMessage());\n`;
    testCode += `        }\n`;
    testCode += `        System.out.println("${TEST_MARKER_END}${idx}");\n\n`;
  });

  // --- Assemble Main class ---
  const mainClass = `public class Main {
${helpers}
    public static void main(String[] args) {
${testCode}    }
}
`;

  const wrappedCode = header + mainClass;
  return { wrappedCode, wrapperLineCount: headerLineCount };
}

/**
 * Generate the Java code to call the student's method for a single test case.
 */
function generateTestCall(problem, tc, idx) {
  const type = problem.type;
  const method = problem.methodName;
  let code = '';

  if (type === 'singly_linked_list') {
    // Build list, call method with optional extra args
    code += `            Solution.Node __h${idx} = __buildList(new int[]{${(tc.input.list || []).join(',')}});\n`;
    const extraArgs = (tc.input.args || []).map(a => String(a)).join(', ');
    const allArgs = `__h${idx}` + (extraArgs ? ', ' + extraArgs : '');

    if (problem.returnType === 'Node') {
      code += `            Solution.Node __r${idx} = Solution.${method}(${allArgs});\n`;
      code += `            System.out.println(__printList(__r${idx}));\n`;
    } else {
      code += `            System.out.println(Solution.${method}(${allArgs}));\n`;
    }
  } else if (type === 'two_singly_linked_lists') {
    code += `            Solution.Node __h1_${idx} = __buildList(new int[]{${(tc.input.list || []).join(',')}});\n`;
    code += `            Solution.Node __h2_${idx} = __buildList(new int[]{${(tc.input.list2 || []).join(',')}});\n`;
    const extraArgs = (tc.input.args || []).map(a => String(a)).join(', ');
    const allArgs = `__h1_${idx}, __h2_${idx}` + (extraArgs ? ', ' + extraArgs : '');

    if (problem.returnType === 'Node') {
      code += `            Solution.Node __r${idx} = Solution.${method}(${allArgs});\n`;
      code += `            System.out.println(__printList(__r${idx}));\n`;
    } else {
      code += `            System.out.println(Solution.${method}(${allArgs}));\n`;
    }
  } else if (type === 'binary_tree') {
    const treeValues = (tc.input.tree || []).map(v => v === null ? 'null' : String(v)).join(',');
    code += `            Solution.Node __t${idx} = __buildTree(new Integer[]{${treeValues}});\n`;
    const extraArgs = (tc.input.args || []).map(a => String(a)).join(', ');
    const allArgs = `__t${idx}` + (extraArgs ? ', ' + extraArgs : '');
    code += `            System.out.println(Solution.${method}(${allArgs}));\n`;
  } else if (type === 'array_return') {
    // For problems that take an int[] array and/or direct args
    const arr = tc.input.array || [];
    const args = tc.input.args || [];

    if (arr.length > 0 && args.length > 0) {
      code += `            int[] __a${idx} = new int[]{${arr.join(',')}};\n`;
      code += `            System.out.println(Solution.${method}(__a${idx}, ${args.join(', ')}));\n`;
    } else if (arr.length > 0) {
      code += `            int[] __a${idx} = new int[]{${arr.join(',')}};\n`;
      code += `            System.out.println(Solution.${method}(__a${idx}));\n`;
    } else if (args.length > 0) {
      // Direct numeric args (e.g., power(2, 10))
      code += `            System.out.println(Solution.${method}(${args.join(', ')}));\n`;
    }
  } else if (type === 'string_return') {
    const str = tc.input.string || '';
    const args = tc.input.args || [];
    const escapedStr = str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

    if (args.length > 0) {
      code += `            System.out.println(Solution.${method}("${escapedStr}", ${args.join(', ')}));\n`;
    } else {
      code += `            System.out.println(Solution.${method}("${escapedStr}"));\n`;
    }
  }

  return code;
}

/**
 * Execute Java code via the Piston API.
 * Returns { stdout, stderr, exitCode, timedOut, error }
 */
async function callPistonAPI(wrappedCode) {
  const settings = getPistonSettings();
  const endpoints = getJavaExecutionEndpointCandidates(settings);
  const requestBody = JSON.stringify({
    language: 'java',
    version: JAVA_VERSION,
    files: [{ name: 'Main.java', content: wrappedCode }],
    compile_timeout: 10000,
    run_timeout: 5000,
    compile_memory_limit: -1,
    run_memory_limit: -1
  });
  const attempted = [];

  for (const apiUrl of endpoints) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PISTON_TIMEOUT_MS);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: buildJavaExecutionHeaders(settings, apiUrl),
        signal: controller.signal,
        body: requestBody
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        attempted.push(`${apiUrl} (HTTP ${response.status})`);

        // A 404 commonly means the static frontend host has no serverless proxy.
        // Try the next compatible endpoint before surfacing the connection error.
        if (response.status === 404 && endpoints.length > attempted.length) {
          continue;
        }

        return {
          stdout: '',
          stderr: '',
          exitCode: -1,
          timedOut: false,
          error: `API error: HTTP ${response.status} at ${apiUrl}`
        };
      }

      const data = await response.json();

      // Compile error
      if (data.compile && data.compile.stderr) {
        return {
          stdout: data.compile.stdout || '',
          stderr: data.compile.stderr,
          exitCode: data.compile.code || 1,
          timedOut: false,
          error: null,
          phase: 'compile'
        };
      }

      // Run result
      const run = data.run || {};
      const timedOut = run.signal === 'SIGKILL' || (run.stderr && run.stderr.includes('timed out'));

      return {
        stdout: run.stdout || '',
        stderr: run.stderr || '',
        exitCode: run.code || 0,
        timedOut,
        error: null,
        phase: 'run'
      };
    } catch (err) {
      clearTimeout(timeoutId);
      attempted.push(`${apiUrl} (${err.name === 'AbortError' ? 'timeout' : err.message})`);

      if (endpoints.length > attempted.length) {
        continue;
      }

      if (err.name === 'AbortError') {
        return { stdout: '', stderr: '', exitCode: -1, timedOut: true, error: `Request timed out. Tried: ${attempted.join(', ')}` };
      }
      return { stdout: '', stderr: '', exitCode: -1, timedOut: false, error: `Network error: ${err.message}. Tried: ${attempted.join(', ')}` };
    }
  }

  return { stdout: '', stderr: '', exitCode: -1, timedOut: false, error: `No Java execution endpoints configured. Tried: ${attempted.join(', ')}` };
}

/**
 * Parse Piston stdout into per-test results using our markers.
 */
function parseTestResults(stdout, tests, problem) {
  const results = [];

  tests.forEach((tc, idx) => {
    const startMarker = `${TEST_MARKER_START}${idx}`;
    const endMarker = `${TEST_MARKER_END}${idx}`;
    const startIdx = stdout.indexOf(startMarker);
    const endIdx = stdout.indexOf(endMarker);

    let actualOutput = '';
    let error = null;

    if (startIdx !== -1 && endIdx !== -1) {
      actualOutput = stdout.substring(startIdx + startMarker.length, endIdx).trim();

      // Check for runtime error marker
      if (actualOutput.startsWith('RUNTIME_ERROR:')) {
        error = actualOutput;
        actualOutput = '';
      }
    } else {
      error = 'Test case did not produce output (possible crash or timeout).';
    }

    const expected = tc.expected.trim();
    const passed = !error && actualOutput === expected;

    results.push({
      name: `Test ${idx + 1}${tc.visible ? '' : ' (Hidden)'}`,
      visible: tc.visible,
      input: formatTestInput(tc, problem),
      expectedOutput: expected,
      actualOutput: actualOutput || '(empty)',
      error,
      passed
    });
  });

  return results;
}

/**
 * Format test case input for display in results panel.
 */
function formatTestInput(tc, problem) {
  const parts = [];
  if (tc.input.list !== undefined) parts.push(`list = [${tc.input.list.join(', ')}]`);
  if (tc.input.list2 !== undefined) parts.push(`list2 = [${tc.input.list2.join(', ')}]`);
  if (tc.input.tree !== undefined) parts.push(`tree = [${tc.input.tree.map(v => v === null ? 'null' : v).join(', ')}]`);
  if (tc.input.array !== undefined && tc.input.array.length > 0) parts.push(`arr = [${tc.input.array.join(', ')}]`);
  if (tc.input.string !== undefined) parts.push(`s = "${tc.input.string}"`);
  if (tc.input.args !== undefined && tc.input.args.length > 0) parts.push(`args = (${tc.input.args.join(', ')})`);
  return parts.join(', ');
}

/**
 * Map compiler error line numbers from the wrapped file back to the student's editor lines.
 */
function mapCompilerErrors(stderr, wrapperLineCount) {
  // Java compiler errors look like: Main.java:12: error: ';' expected
  return stderr.replace(/Main\.java:(\d+)/g, (match, lineStr) => {
    const originalLine = parseInt(lineStr);
    // Subtract the wrapper header lines (imports + blank lines before student code)
    // The student code starts after: import java.util.*;\nimport java.util.stream.*;\n\n
    // That's 3 lines of header before the student code
    const studentLine = originalLine - 3;
    if (studentLine > 0) {
      return `Line ${studentLine}`;
    }
    return match;
  });
}

/**
 * Main entry point: evaluate a Java problem.
 * Called by the UI when Run/Submit is clicked.
 * Returns a Promise resolving to { results, compileError, networkError, timedOut, executionTime }.
 */
async function executeJavaProblem(problem, studentCode, mode) {
  const startTime = Date.now();

  // Wrap the code
  const { wrappedCode, wrapperLineCount } = wrapJavaCode(studentCode, problem, mode);

  // Call the API
  const apiResult = await callPistonAPI(wrappedCode);
  const executionTime = Date.now() - startTime;

  // Network / timeout error
  if (apiResult.error) {
    return {
      results: [],
      compileError: null,
      networkError: apiResult.error,
      timedOut: apiResult.timedOut,
      executionTime
    };
  }

  // Compile error
  if (apiResult.phase === 'compile') {
    const mappedError = mapCompilerErrors(apiResult.stderr, wrapperLineCount);
    return {
      results: [],
      compileError: mappedError,
      networkError: null,
      timedOut: false,
      executionTime
    };
  }

  // TLE
  if (apiResult.timedOut) {
    return {
      results: [],
      compileError: null,
      networkError: null,
      timedOut: true,
      executionTime
    };
  }

  // Parse test results from stdout
  const tests = mode === 'run'
    ? problem.testCases.filter(t => t.visible)
    : problem.testCases;

  const results = parseTestResults(apiResult.stdout, tests, problem);

  // If there's stderr but not a compile error, it might be a runtime error or warning
  if (apiResult.stderr && results.length > 0) {
    results.forEach(r => {
      if (!r.passed) {
        const cleanStderr = mapCompilerErrors(apiResult.stderr, wrapperLineCount);
        if (!r.error || r.error.includes('did not produce output')) {
          r.error = cleanStderr;
        } else {
          r.error += '\n' + cleanStderr;
        }
      }
    });
  }

  return {
    results,
    compileError: null,
    networkError: null,
    timedOut: false,
    executionTime
  };
}
