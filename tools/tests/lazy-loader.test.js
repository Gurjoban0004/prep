const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

function elementStub() {
  return {
    style: {},
    dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {},
    appendChild() {},
    querySelectorAll() { return []; },
    querySelector() { return null; },
    setAttribute() {},
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
    setInterval() {},
    setTimeout(fn) { fn(); return 1; },
    clearTimeout() {},
    confirm() { return false; },
    window: { addEventListener() {} }
  };

  sandbox.document = {
    body: {
      appendChild(script) {
        const file = script.src.split('?')[0];
        const source = fs.readFileSync(path.join(__dirname, '../../IOT/', file), 'utf8');
        vm.runInContext(source, sandbox);
        if (typeof script.onload === 'function') script.onload();
      }
    },
    documentElement: { style: { setProperty() {} } },
    getElementById() { return elementStub(); },
    querySelector(selector) {
      if (String(selector).startsWith('script[data-lazy-src=')) return null;
      return elementStub();
    },
    querySelectorAll() { return []; },
    createElement() { return elementStub(); },
    addEventListener() {}
  };

  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../../IOT/app.js'), 'utf8'), sandbox);
  return sandbox;
}

async function main() {
  const sandbox = loadSandbox();

  assert.strictEqual(
    vm.runInContext('CONFIG.subjects.linux.bashProblems', sandbox),
    null,
    'Linux data should not be present before lazy load.'
  );

  await vm.runInContext('ensureSubjectDataLoaded("linux")', sandbox);
  assert(
    vm.runInContext('CONFIG.subjects.linux.bashProblems.length', sandbox) > 0,
    'Linux data should hydrate after lazy load.'
  );

  await vm.runInContext('ensureSubjectDataLoaded("java")', sandbox);
  assert(
    vm.runInContext('CONFIG.subjects.java.javaProblems.length', sandbox) > 0,
    'Java data should hydrate after lazy load.'
  );

  await vm.runInContext('ensureSubjectDataLoaded("cn")', sandbox);
  assert(
    vm.runInContext('CONFIG.subjects.cn.mcqs.length', sandbox) > 0,
    'CN data should hydrate after lazy load.'
  );

  await vm.runInContext('ensureSubjectDataLoaded("java_abstractions")', sandbox);
  assert(
    vm.runInContext('CONFIG.subjects.java_abstractions.mcqs.length', sandbox) > 0,
    'Java Abstractions data should hydrate after lazy load.'
  );
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
