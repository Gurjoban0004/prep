const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

function elementStub() {
  return {
    style: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {},
    querySelectorAll() { return []; },
    querySelector() { return null; },
    setAttribute() {},
    appendChild() {},
    scrollIntoView() {},
    innerHTML: '',
    textContent: '',
    value: ''
  };
}

function loadSandbox() {
  const sandbox = {
    console,
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    document: {
      getElementById() { return elementStub(); },
      querySelector() { return elementStub(); },
      querySelectorAll() { return []; },
      createElement() { return elementStub(); },
      addEventListener() {},
      documentElement: { style: { setProperty() {} } }
    },
    window: { addEventListener() {} },
    setInterval() {},
    confirm() { return false; }
  };
  vm.createContext(sandbox);
  const dataSource = fs.readFileSync(path.join(__dirname, '../../IOT/linux-data.js'), 'utf8')
    .replace('const LINUX_MCQ_BANK', 'var LINUX_MCQ_BANK')
    .replace('const LINUX_BASH_PROBLEMS', 'var LINUX_BASH_PROBLEMS');
  vm.runInContext(dataSource, sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../../IOT/bash-engine.js'), 'utf8'), sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../../IOT/app.js'), 'utf8'), sandbox);
  return sandbox;
}

const sandbox = loadSandbox();
const problems = sandbox.LINUX_BASH_PROBLEMS;
const appSource = fs.readFileSync(path.join(__dirname, '../../IOT/app.js'), 'utf8');
const styleSource = fs.readFileSync(path.join(__dirname, '../../IOT/style.css'), 'utf8');
const indexSource = fs.readFileSync(path.join(__dirname, '../../IOT/index.html'), 'utf8');

assert(appSource.includes('renderLandingPage'), 'App should render a distinctive landing page before subject study.');
assert(appSource.includes('bash-reset-btn'), 'Bash practice should include a reset editor button.');
assert(styleSource.includes('resize: horizontal'), 'Bash question panel should be horizontally resizable to expand editor space.');
assert(styleSource.includes('.landing-page'), 'Landing page styles should be present.');
assert(!indexSource.includes('renderMathInElement(document.body'), 'Startup should not KaTeX-render the entire document body.');
[
  'data.js',
  'cn-data-st1.js',
  'linux-data.js',
  'java-data.js',
  'new-java-data.js',
  'bash-engine.js',
  'java-engine.js'
].forEach(src => {
  assert(!indexSource.includes(`src="${src}`), `${src} should be lazy-loaded instead of parsed on startup.`);
});
assert(appSource.includes('scheduleBashProgressSave'), 'Bash editor draft saves should be debounced.');
assert(appSource.includes('scheduleJavaProgressSave'), 'Java editor draft saves should be debounced.');
assert(styleSource.includes('.editor-highlight-ready .bash-code-editor'), 'Editor should only hide native textarea text after syntax highlighting is ready.');
assert(!/(^|\n)\.bash-code-editor\s*\{[^}]*color:\s*transparent\s*!important;/.test(styleSource), 'Textarea text should stay native-visible while typing.');
assert(appSource.includes('markEditorHighlightPending'), 'Typing should immediately fall back to native textarea rendering before delayed syntax highlighting.');
assert(!appSource.includes("editor.value.split('\\n').length"), 'Editor line counting should avoid allocating a full split array on the typing path.');

const mcqCount = sandbox.LINUX_MCQ_BANK.flatMap(unit => unit.questions).length;
assert.strictEqual(mcqCount, 90, 'Linux MCQs should include all 90 organized prep + practice test questions.');
assert(problems.length >= 62, 'Linux Bash Practice should include all 62 bash problems.');

const questionText = sandbox.LINUX_MCQ_BANK
  .flatMap(unit => unit.questions)
  .map(question => question.question);
[
  'Which command mounts a file system at a specified mount point?',
  'Which sysctl parameter controls the maximum number of open file descriptors system-wide?',
  'Which command enables a service to start automatically at boot time?'
].forEach(requiredQuestion => {
  assert(questionText.includes(requiredQuestion), `Missing organized prep MCQ: ${requiredQuestion}`);
});

const problemTitles = problems.map(problem => problem.title);
[
  'Multiplication Table',
  'Multi-User Setup',
  'Directory Structure',
  'Rectangle Perimeter',
  'FizzBuzz Logic',
  'Star Patterns',
  'Substring Extraction',
  'LVM Management',
  'Network Traffic Monitor',
  'Secure Backup',
  'Remote Network Safety',
  'SSH Security Setup',
  'System Troubleshooting',
  'Log Analysis',
  'String Reversal Function',
  'System Memory and Process Snapshot',
  'Text Processing (Sorting Employees)',
  'Advanced Archiving and Cleanup'
].forEach(requiredTitle => {
  assert(problemTitles.includes(requiredTitle), `Missing organized prep bash problem: ${requiredTitle}`);
});

const headResult = sandbox.simulateBash('head -n 3 /etc/passwd\n', '');
assert(
  headResult.output.startsWith('root:x:0:0:root') && headResult.output.split('\n').filter(Boolean).length === 3,
  'Terminal simulator should execute head against the virtual filesystem.'
);

const pipelineResult = sandbox.simulateBash('cat /etc/passwd | grep root | wc -l\n', '');
assert.strictEqual(pipelineResult.output.trim(), '1', 'Terminal simulator should support simple pipes.');

const redirectionResult = sandbox.simulateBash('grep error /var/log/server.log > errors.txt\ncat errors.txt\n', '');
assert(redirectionResult.output.includes('error: database unavailable'), 'Terminal simulator should support output redirection into the virtual filesystem.');

const terminalProblemTitles = [
  'Network Monitor Command',
  'Backup Script Command',
  'Log Filtering Command',
  'Enable Service At Boot',
  'File Archiving',
  'Directory Structure',
  'Permission Management',
  'File Ownership',
  'File Search & Filter',
  'Count Elements',
  'Advanced Filtering',
  'Error Capturing',
  'LVM Management',
  'Network Traffic Monitor',
  'Secure Backup',
  'Remote Network Safety',
  'SSH Security Setup',
  'System Troubleshooting',
  'Log Analysis',
  'System Memory and Process Snapshot',
  'Text Processing (Sorting Employees)',
  'Advanced Archiving and Cleanup',
  'Piping, Cut and Sort',
  'Streams and Redirection',
  'Automation with Cron',
  'System Monitoring Logging',
  'Firewall Automation (UFW)',
  'File Permissions and Ownership',
  'LVM Automation Script'
];

for (const problem of problems) {
  assert(problem.solutionCode, `${problem.id} needs a reveal-only solutionCode.`);
  assert(!problem.starterCode.includes('echo "'), `${problem.id} starterCode must not reveal the answer.`);
  assert(problem.tests.filter(test => test.visible).length >= 2, `${problem.id} needs at least two visible tests.`);
  assert(problem.tests.some(test => !test.visible), `${problem.id} needs at least one hidden test.`);

  if (terminalProblemTitles.includes(problem.title)) {
    assert.strictEqual(problem.kind, 'terminal', `${problem.id} should be marked as a terminal lab problem.`);
    if (problem.id !== 'bash-040') {
      assert(!/\becho\b|\bprintf\b/.test(problem.solutionCode), `${problem.id} terminal solution should use real commands, not echo.`);
    }
  } else {
    assert(problem.solutionCode.includes('read'), `${problem.id} script problem should read input.`);
  }

  const solutionResults = sandbox.evaluateBashProblem(problem, problem.solutionCode, 'submit');
  assert(
    solutionResults.every(result => result.passed),
    `${problem.id} reveal-only solution must pass every submit test.`
  );

  const constantScript = `#!/usr/bin/env bash\necho "${problem.examples[0].expectedOutput.trim()}"\n`;
  const constantResults = sandbox.evaluateBashProblem(problem, constantScript, 'submit');
  assert(
    constantResults.some(result => !result.passed),
    `${problem.id} should not pass all tests with a constant echo of the sample answer.`
  );

  if (problem.kind === 'terminal') {
    const echoCommandResults = sandbox.evaluateBashProblem(problem, `echo "${problem.solutionCode.trim()}"\n`, 'submit');
    assert(
      echoCommandResults.every(result => !result.passed),
      `${problem.id} should reject echoing the right command instead of executing it.`
    );
  }
}

const hiddenFailureHtml = sandbox.renderBashResults([{
  name: 'hidden',
  visible: false,
  input: '42\n',
  expectedOutput: 'secret expected\n',
  actualOutput: 'wrong\n',
  error: '',
  passed: false
}]);
assert(!hiddenFailureHtml.includes('secret expected'), 'Hidden failed tests must not reveal expected output.');
assert(!hiddenFailureHtml.includes('42'), 'Hidden failed tests must not reveal input.');

const correctLetters = sandbox.LINUX_MCQ_BANK
  .flatMap(unit => unit.questions)
  .map(question => question.correct);
const distribution = correctLetters.reduce((acc, letter) => {
  acc[letter] = (acc[letter] || 0) + 1;
  return acc;
}, {});
assert(Object.keys(distribution).length >= 4, 'Linux MCQ answers should be distributed across A, B, C, and D.');

const canonicalStudentScripts = {
  'bash-004': `#!/usr/bin/env bash
read year
if [ $((year % 400)) -eq 0 ] || { [ $((year % 4)) -eq 0 ] && [ $((year % 100)) -ne 0 ]; }; then
  echo "Leap year"
else
  echo "Not a leap year"
fi
`,
  'bash-013': `#!/usr/bin/env bash
read n
for ((i=1; i<=10; i++)); do
  echo "$n x $i = $((n * i))"
done
`,
  'bash-023': `#!/usr/bin/env bash
read n
for ((i=1; i<=n; i++)); do
  if [ $((i % 15)) -eq 0 ]; then echo FizzBuzz
  elif [ $((i % 3)) -eq 0 ]; then echo Fizz
  elif [ $((i % 5)) -eq 0 ]; then echo Buzz
  else echo $i
  fi
done
`,
  'bash-024': `#!/usr/bin/env bash
read n
for ((row=1; row<=n; row++)); do
  stars=""
  for ((col=1; col<=row; col++)); do
    stars="\${stars}*"
  done
  echo "$stars"
done
`,
  'bash-025': `#!/usr/bin/env bash
read n
sum=0
temp=$n
while [ $temp -gt 0 ]; do
  sum=$((sum + temp % 10))
  temp=$((temp / 10))
done
rev=0
temp=$n
while [ $temp -gt 0 ]; do
  rev=$((rev * 10 + temp % 10))
  temp=$((temp / 10))
done
fact=1
i=1
while [ $i -le $sum ]; do
  fact=$((fact * i))
  i=$((i + 1))
done
echo "Sum = $sum"
echo "Reverse = $rev"
echo "Factorial = $fact"
`,
  'bash-026': `#!/usr/bin/env bash
read n
a=0
b=1
series="0"
if [ $n -ge 2 ]; then series="$series 1"; fi
for ((i=3; i<=n; i++)); do
  c=$((a + b))
  a=$b
  b=$c
  series="$series $b"
done
echo "$series"
`,
  'bash-028': `#!/usr/bin/env bash
read a b c
if [ "$a" -gt "$b" ]; then t=$a; a=$b; b=$t; fi
if [ "$a" -gt "$c" ]; then t=$a; a=$c; c=$t; fi
if [ "$b" -gt "$c" ]; then t=$b; b=$c; c=$t; fi
echo "$a $b $c"
`,
  'bash-029': `#!/usr/bin/env bash
read str pos len
echo "\${str:pos:len}"
`
};

for (const [problemId, script] of Object.entries(canonicalStudentScripts)) {
  const problem = problems.find(item => item.id === problemId);
  assert(problem, `Missing canonical script target problem: ${problemId}`);
  const results = sandbox.evaluateBashProblem(problem, script, 'submit');
  assert(
    results.every(result => result.passed),
    `${problemId} canonical student script must pass every submit test.`
  );
}

// ── Playground State & Shell Simulator Checks ──
const playState = {
  cwd: '/home/student',
  vars: { '0': 'bash' },
  fs: { ...sandbox.VIRTUAL_FS },
  directories: new Set(['/etc', '/var', '/var/log', '/home', '/home/student', '/tmp']),
  arrays: {},
  functions: {},
  archives: {},
  users: ['student'],
  groups: ['student'],
  services: {},
  firewallRules: [],
  lastStatus: 0,
  lvm: { pvs: [], vgs: {}, lvs: {} }
};

// 1. Verify stateful cd directory changes update prompt / cwd
sandbox.simulateBash('cd /tmp', '', playState);
assert.strictEqual(playState.cwd, '/tmp', 'Cwd state should update to /tmp after cd');

// 2. Verify stateful file creation persists
sandbox.simulateBash('echo "hello playground" > play.txt', '', playState);
assert.strictEqual(playState.fs['/tmp/play.txt'], 'hello playground\n', 'File should be created in the resolved path /tmp/play.txt');

// 3. Verify stateful mkdir updates directories Set
sandbox.simulateBash('mkdir -p newfolder/subfolder', '', playState);
assert(playState.directories.has('/tmp/newfolder/subfolder'), 'Directories Set should contain /tmp/newfolder/subfolder');

// 4. Verify stateful LVM pvcreate and vgcreate
sandbox.simulateBash('pvcreate /dev/sda1', '', playState);
assert(playState.lvm.pvs.includes('/dev/sda1'), 'PV list should contain /dev/sda1');

sandbox.simulateBash('vgcreate vg_test /dev/sda1', '', playState);
assert(playState.lvm.vgs['vg_test'], 'vg_test Volume Group should be created');
assert(playState.lvm.vgs['vg_test'].pvs.includes('/dev/sda1'), 'vg_test should map to PV /dev/sda1');

console.log('linux behavior checks passed');
