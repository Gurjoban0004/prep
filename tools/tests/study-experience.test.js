const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const store = new Map();
const element = () => ({
  style: {}, dataset: {}, classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
  addEventListener() {}, setAttribute() {}, appendChild() {}, querySelectorAll() { return []; },
  set innerHTML(value) { this.textContent = value.replace(/<[^>]+>/g, ' '); }, textContent: ''
});
const context = vm.createContext({
  console, URLSearchParams, location: { hash: '' }, setTimeout, clearTimeout, setInterval() {}, clearInterval() {},
  localStorage: { getItem: key => store.get(key) || null, setItem: (key,value) => store.set(key,value), removeItem: key => store.delete(key) },
  window: { addEventListener() {}, matchMedia: () => ({ matches: false }) },
  document: {
    getElementById: element, querySelector: () => null, querySelectorAll: () => [], createElement: element,
    documentElement: { style: { setProperty() {} } }, body: element(),
    addEventListener() {}
  }
});
for (const file of ['app.js','experience.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../../IOT', file), 'utf8'), context);
const evaluate = code => vm.runInContext(code, context);

evaluate(`CONFIG.subjects.algo.data = {st1:[{title:'Stable sorting',html:'<p>Merge sort preserves equal keys.</p>'},{title:'Complexity',html:'<p>Measure growth.</p>'}],lab:[{title:'Lab',html:''}]}; hydratedSubjects.algo=true; state.mastered.algo.st1=[0,0,999,-1]; state.mastered.algo.lab=[0];`);
assert.deepStrictEqual(JSON.parse(JSON.stringify(evaluate('subjectProgress("algo")'))), { total: 2, done: 1, percent: 50 }, 'Progress must count valid unique note completions, excluding labs.');
assert(evaluate('collectStudySearch("merge sort").some(r=>r.title==="Stable sorting")'), 'Search must find content inside notes.');
assert.strictEqual(evaluate('collectStudySearch("unknown-unmatchable").length'), 0, 'Missing terms must produce an empty result.');
assert.strictEqual(evaluate('collectStudySearch("merge impossible").length'), 0, 'Every search word must match.');
evaluate('setReadingScale(99)');
assert.strictEqual(evaluate('studyPreferences.fontScale'), 1.5);
evaluate('setReadingScale(-99)');
assert.strictEqual(evaluate('studyPreferences.fontScale'), 0.9);
evaluate('studyPreferences.motion="reduced"');
assert.strictEqual(evaluate('scrollBehavior()'), 'instant');
evaluate(`timedStudyQuiz={subject:'algo',section:'practice',unit:0,ends:Date.now()+60000,answers:{'101':'b'}}; state.activeSubject='algo'; state.activeSection='practice'; state.quizUnitIndex=0;`);
assert(evaluate('isTimedStudyQuiz()'), 'Timed mode must match the active subject, section, and quiz.');
assert(evaluate('renderTimedStudyControls().includes("Answers stay hidden")'));
evaluate('finishTimedStudyQuiz(false)');
assert.strictEqual(evaluate('state.practiceAnswers.algo[101]'), 'b', 'Finishing timed practice must persist the chosen answers.');
assert.strictEqual(evaluate('timedStudyQuiz'), null, 'Finished sessions must release timed mode.');
assert(store.has('algo_mcq_answers'), 'Timed practice must reuse the existing subject progress key.');
const app = fs.readFileSync(path.join(__dirname,'../../IOT/app.js'),'utf8');
assert(!app.includes('setupSecurity'), 'Browser shortcuts and context menus must remain available.');
assert(app.includes('delete subjectLoadPromises[subjectId]'), 'A failed subject load must permit retry.');
assert(app.includes('navigationId !== subjectNavigationId'), 'An old subject request must not overwrite new navigation.');
assert(app.includes("localStorage.getItem('prep_outline_expanded')"), 'Outline density must persist per browser.');
assert(app.includes('Math.abs(index - state.activeTopicIndex) > 1'), 'A compact outline must retain the current topic and its neighbours.');
console.log('Study experience checks passed');
