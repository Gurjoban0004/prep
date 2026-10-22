const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const store = new Map();
const element = () => {
  let _html = '';
  return {
    style: {}, dataset: {}, classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {}, setAttribute() {}, appendChild() {}, querySelectorAll() { return []; },
    get innerHTML() { return _html; },
    set innerHTML(value) { _html = value; this.textContent = value.replace(/<[^>]+>/g, ' '); }, textContent: ''
  };
};
const context = vm.createContext({
  console, URLSearchParams, location: { hash: '' }, history: { pushState() {}, replaceState() {} }, setTimeout, clearTimeout, setInterval() {}, clearInterval() {},
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
// Verification for Syllabus Plan & Exam Boost
const sdPlan = evaluate("getSyllabusPlan('sysdesign')");
assert.strictEqual(sdPlan.code, '24CSE0318', 'System design code must be 24CSE0318');
assert.strictEqual(sdPlan.credits, 3, 'System design must have 3 credits');
assert.strictEqual(sdPlan.clos.length, 5, 'System design must define 5 CLOs');
assert.strictEqual(sdPlan.schedule14Days.length, 7, 'System design must define 14-day schedule items');
assert(sdPlan.milestones.some(m => m.id === 'st1'), 'System design must include ST-1 milestone');
assert(sdPlan.milestones.some(m => m.id === 'st2'), 'System design must include ST-2 milestone');
assert(sdPlan.milestones.some(m => m.id === 'endTerm'), 'System design must include End Term milestone');
assert(sdPlan.milestones.some(m => m.id === 'lab'), 'System design must include Lab curriculum');

const aimlPlan = evaluate("getSyllabusPlan('aiml')");
assert.strictEqual(aimlPlan.code, '24CSE0316', 'AIML code must be 24CSE0316');
assert.strictEqual(aimlPlan.credits, 3, 'AIML must have 3 credits');
assert.strictEqual(aimlPlan.clos.length, 6, 'AIML must define 6 CLOs');
assert.strictEqual(aimlPlan.schedule14Days.length, 7, 'AIML must define 14-day schedule items');
assert(aimlPlan.milestones.some(m => m.id === 'st1'), 'AIML must include ST-1 milestone');

const sdBoost = evaluate("getExamBoost('sysdesign')");
assert.strictEqual(sdBoost.cheats.length, 8, 'System design boost must have 8 cheats');
assert.strictEqual(sdBoost.traps.length, 5, 'System design boost must have 5 traps');
assert.strictEqual(sdBoost.quiz.length, 10, 'System design boost must have 10 quiz questions');

const aimlBoost = evaluate("getExamBoost('aiml')");
assert.strictEqual(aimlBoost.cheats.length, 8, 'AIML boost must have 8 cheats');
assert.strictEqual(aimlBoost.traps.length, 5, 'AIML boost must have 5 traps');
assert.strictEqual(aimlBoost.quiz.length, 10, 'AIML boost must have 10 quiz questions');

const sdPlanHtml = evaluate("renderStudyPlanContent('sysdesign')");
assert(sdPlanHtml.includes('24CSE0318'), 'Plan HTML must contain course code');
assert(sdPlanHtml.includes('Course Learning Outcomes'), 'Plan HTML must contain CLO section');
assert(sdPlanHtml.includes('14-Day Exam Revision Roadmap'), 'Plan HTML must contain roadmap section');

const aimlBoostHtml = evaluate("renderExamBoostContent('aiml', 'quiz')");
assert(aimlBoostHtml.includes('10-Minute Rapid Concept Sprint'), 'Boost quiz HTML must contain quiz title');
assert(aimlBoostHtml.includes('data-quiz-opt'), 'Boost quiz HTML must contain quiz option buttons');

// Deep Verification of Quiz Data Integrity & Rendering
[sdBoost, aimlBoost].forEach((boost, bIdx) => {
  const subjName = bIdx === 0 ? 'sysdesign' : 'aiml';
  boost.quiz.forEach((q, idx) => {
    assert(q.id && typeof q.id === 'string' && q.id.startsWith(subjName === 'sysdesign' ? 'sd_q' : 'aiml_q'), `Question ${idx + 1} in ${subjName} must have a valid id`);
    assert(q.question && typeof q.question === 'string' && q.question.length > 5, `Question ${q.id} must have question text`);
    assert(Array.isArray(q.options) && q.options.length >= 4, `Question ${q.id} must have at least 4 options`);
    assert(typeof q.answer === 'number' && q.answer >= 0 && q.answer < q.options.length, `Question ${q.id} must have valid answer index`);
    assert(q.explanation && typeof q.explanation === 'string' && q.explanation.length > 10, `Question ${q.id} must have explanation`);
  });
});

const sdQuizHtml = evaluate("renderExamBoostContent('sysdesign', 'quiz')");
assert(!sdQuizHtml.includes('undefined'), 'System Design quiz HTML must not contain undefined');
assert(sdQuizHtml.includes('data-quiz-qid="sd_q1"'), 'System Design quiz must render valid question IDs');

const aimlQuizHtml = evaluate("renderExamBoostContent('aiml', 'quiz')");
assert(!aimlQuizHtml.includes('undefined'), 'AIML quiz HTML must not contain undefined');
assert(aimlQuizHtml.includes('data-quiz-qid="aiml_q1"'), 'AIML quiz must render valid question IDs');

// Verify quiz scoring & localStorage state evaluation
evaluate(`
  localStorage.setItem('prep_boost_quiz_aiml', JSON.stringify({
    aiml_q1: EXAM_BOOST_DATA.aiml.quiz[0].answer,
    aiml_q2: (EXAM_BOOST_DATA.aiml.quiz[1].answer + 1) % 4
  }));
`);
const aimlScoredHtml = evaluate("renderExamBoostContent('aiml', 'quiz')");
assert(aimlScoredHtml.includes('Rapid Boost Quiz (2/10)'), 'Must display answered count in tab');
assert(aimlScoredHtml.includes('1 / 10'), 'Must display correct score count');
assert(aimlScoredHtml.includes('is-correct'), 'Must highlight correct answer');
assert(aimlScoredHtml.includes('is-incorrect'), 'Must highlight chosen incorrect answer');
assert(aimlScoredHtml.includes('✓ Correct!'), 'Must display correct feedback badge');
assert(aimlScoredHtml.includes('✗ Not quite.'), 'Must display incorrect feedback badge');

// Verify search indexing and Boost tab deep linking
assert(evaluate('collectStudySearch("consistent hashing").some(r => r.kind === "Boost" || r.kind === "Plan")'), 'Search must index system design plan/boost content.');
assert(evaluate('collectStudySearch("bias-variance").some(r => r.kind === "Boost" || r.kind === "Plan")'), 'Search must index AIML plan/boost content.');
assert(evaluate('collectStudySearch("24CSE0318").some(r => r.kind === "Plan")'), 'Search must find syllabus by course code.');

const sprintSearchResult = evaluate('collectStudySearch("Sprint Q")').find(r => r.kind === 'Boost' && r.tab === 'quiz');
assert(sprintSearchResult, 'Boost quiz sprint questions must attach tab: "quiz"');

const trapSearchResult = evaluate('collectStudySearch("Exam Trap")').find(r => r.kind === 'Boost' && r.tab === 'traps');
assert(trapSearchResult, 'Boost traps must attach tab: "traps"');

// Verify dialog closing on route restore
let dialogClosed = false;
const mockDialog = {
  open: true,
  close() { dialogClosed = true; this.open = false; }
};
context.document.querySelectorAll = selector => {
  if (selector === '.study-dialog[open]') return mockDialog.open ? [mockDialog] : [];
  return [];
};
evaluate("restoreStudyRoute('view=home')");
assert(dialogClosed, 'restoreStudyRoute must close any open study dialogs');

// Verification for Two-Mode Notes (Foundations vs Deep Dive)
assert.strictEqual(evaluate('getActiveReadingMode()'), 'foundations', 'Default reading mode must be foundations');
evaluate('setReadingMode("deepdive")');
assert.strictEqual(evaluate('getActiveReadingMode()'), 'deepdive', 'Reading mode must switch to deepdive');
evaluate('setReadingMode("foundations")');
assert.strictEqual(evaluate('getActiveReadingMode()'), 'foundations', 'Reading mode must switch back to foundations');

// Verify note content rendering based on mode
const sampleTopic = {
  title: 'Test Topic',
  html: '<p>Exhaustive technical formula E=mc^2</p>',
  foundationsHtml: '<div class="foundations-banner">🌱 Foundations</div><p>Gentle analogy about mass and energy</p>'
};
evaluate(`
  state.readingMode = 'foundations';
  renderTopicNoteContent(${JSON.stringify(sampleTopic)});
`);
assert(evaluate('elements.contentArea.innerHTML.includes("Gentle analogy")'), 'Foundations mode must render foundationsHtml');

evaluate(`
  state.readingMode = 'deepdive';
  renderTopicNoteContent(${JSON.stringify(sampleTopic)});
`);
assert(evaluate('elements.contentArea.innerHTML.includes("Exhaustive technical formula")'), 'Deep Dive mode must render technical html');

// Verify fallback for topics without foundationsHtml
const legacyTopic = {
  title: 'Legacy Topic',
  html: '<p>Legacy technical note content</p>'
};
evaluate(`
  state.readingMode = 'foundations';
  renderTopicNoteContent(${JSON.stringify(legacyTopic)});
`);
assert(evaluate('elements.contentArea.innerHTML.includes("Foundations · Gentle Start")'), 'Fallback must prepend gentle foundations banner');

// Verify AIML and System Design data integrity for foundations
const aimlRaw = fs.readFileSync(path.join(__dirname, '../../IOT/aiml-data.js'), 'utf8');
const sdRaw = fs.readFileSync(path.join(__dirname, '../../IOT/sysdesign-data.js'), 'utf8');
let aimlData = null, sdData = null;
eval(aimlRaw + '; aimlData = AIML_STUDY_DATA;');
eval(sdRaw + '; sdData = SYSDESIGN_STUDY_DATA;');
assert.strictEqual(aimlData.st1.length, 13, 'AIML must have 13 ST-1 topics');
assert.strictEqual(aimlData.st1.filter(t => t.foundationsHtml && t.foundationsHtml.includes('Foundations')).length, 13, 'All 13 AIML ST-1 topics must have Foundations HTML');
assert.strictEqual(sdData.st1.length, 13, 'System Design must have 13 ST-1 topics');
assert.strictEqual(sdData.st1.filter(t => t.foundationsHtml && t.foundationsHtml.includes('Foundations')).length, 13, 'All 13 System Design ST-1 topics must have Foundations HTML');

// Verify Theme Application
const activeThemes = [];
context.document.body.classList.add = c => activeThemes.push(c);
context.document.body.classList.remove = (...classes) => {
  classes.forEach(c => {
    const idx = activeThemes.indexOf(c);
    if (idx > -1) activeThemes.splice(idx, 1);
  });
};
['warm', 'pastel', 'forest', 'dark'].forEach(theme => {
  evaluate(`studyPreferences.theme = "${theme}"; applyStudyPreferences();`);
  assert.strictEqual(evaluate('document.body.dataset.theme'), theme, `Body theme dataset must be ${theme}`);
  assert(activeThemes.includes(`${theme}-theme`), `Body classList must include ${theme}-theme`);
});

// Verification for Anonymous Visitor Analytics Engine & Traffic Ledger
const vid = evaluate('getAnalyticsVisitorId()');
assert(typeof vid === 'string' && vid.startsWith('vis_'), 'Visitor ID must start with vis_');
assert.strictEqual(evaluate("localStorage.getItem('prep_visitor_id')"), vid, 'Visitor ID must persist in localStorage');

const initialSummary = evaluate('getAnalyticsSummary()');
assert(Number.isInteger(initialSummary.totalVisits) && initialSummary.totalVisits >= 1, 'Initial visits count must be at least 1');
assert(typeof initialSummary.totalSecondsStudied === 'number', 'Total seconds studied must be a number');

// Track topic view and verify state
evaluate("trackAnalyticsTopicView('sysdesign', 'st1', 0, 'Consistent Hashing');");
const summaryAfterTopic = evaluate('getAnalyticsSummary()');
assert(summaryAfterTopic.topicsReadCount >= 1, 'Topic view must increment topicsReadCount');

// Track quiz answer and verify state
evaluate("trackAnalyticsQuizAnswer('sysdesign', 'sd_q1', true);");
evaluate("trackAnalyticsQuizAnswer('sysdesign', 'sd_q2', false);");
const summaryAfterQuiz = evaluate('getAnalyticsSummary()');
assert(summaryAfterQuiz.quizzesAnsweredCount >= 2, 'Quiz answers must increment quizzesAnsweredCount');
assert(summaryAfterQuiz.quizzesCorrectCount >= 1, 'Correct answer must increment quizzesCorrectCount');

// Add study time
evaluate('addAnalyticsStudySeconds(150);');
assert(evaluate('getAnalyticsSummary().totalSecondsStudied') >= 150, 'addAnalyticsStudySeconds must accumulate study time');

// Verify that by default (unauthenticated), analytics is locked to non-admins
assert.strictEqual(evaluate('isCurrentUserAdmin()'), false, 'Default user must not be admin');
const lockedHtml = evaluate('renderAnalyticsHub()');
assert(lockedHtml.includes('Restricted Access · Administrator Only'), 'Unauthenticated user must see admin access gate');
assert(lockedHtml.includes('gurjobanpanjeta@gmail.com'), 'Admin gate must mention authorized admin email');
assert.strictEqual(evaluate('renderDeskAnalyticsCard()'), '', 'Desk analytics card must be hidden for non-admin');
assert(!evaluate('collectStudySearch("traffic").some(r => r.kind === "Analytics")'), 'Non-admin search must not index analytics');

// Verify that a different logged-in user is also denied
context.window.getCurrentUser = () => ({ email: 'otherstudent@gmail.com', displayName: 'Other' });
assert.strictEqual(evaluate('isCurrentUserAdmin()'), false, 'Non-admin email must not be admin');
const deniedHtml = evaluate('renderAnalyticsHub()');
assert(deniedHtml.includes('Access Denied'), 'Non-admin email must see Access Denied');
assert(deniedHtml.includes('otherstudent@gmail.com'), 'Must display the non-admin email');

// Now simulate admin login with gurjobanpanjeta@gmail.com
context.window.getCurrentUser = () => ({ email: 'gurjobanpanjeta@gmail.com', displayName: 'Gurjoban' });
assert.strictEqual(evaluate('isCurrentUserAdmin()'), true, 'Admin email must be authorized');

// Verify renderAnalyticsHub output integrity for admin
const analyticsHtml = evaluate('renderAnalyticsHub()');
assert(!analyticsHtml.includes('undefined'), 'renderAnalyticsHub HTML must not contain undefined');
assert(!analyticsHtml.includes('NaN'), 'renderAnalyticsHub HTML must not contain NaN');
assert(analyticsHtml.includes('Visitor Traffic &amp; Study Engagement Ledger'), 'Must render analytics hero title');
assert(analyticsHtml.includes('100% Privacy-Preserving · No Google Sign-In Required'), 'Must render privacy badge');
assert(analyticsHtml.includes(vid), 'Must render the current visitor ID');
assert(analyticsHtml.includes('14-Day Study Activity Timeline'), 'Must render activity timeline section');
assert(analyticsHtml.includes('Subject Focus Distribution'), 'Must render subject focus distribution');
assert(analyticsHtml.includes('Visitor Traffic &amp; Session History'), 'Must render traffic and session history');

// Verify Study Desk analytics card for admin
const deskAnalyticsCard = evaluate('renderDeskAnalyticsCard()');
assert(deskAnalyticsCard.includes('Visitor Traffic'), 'Desk analytics card must display Visitor Traffic title');
assert(deskAnalyticsCard.includes('data-nav="analytics"'), 'Desk analytics card must link to analytics view');

// Verify search indexing for admin
assert(evaluate('collectStudySearch("traffic").some(r => r.kind === "Analytics")'), 'Search must index visitor analytics by traffic keyword');
assert(evaluate('collectStudySearch("analytics").some(r => r.kind === "Analytics")'), 'Search must index visitor analytics by analytics keyword');

// Verify cohort data seeding
evaluate('seedCohortVisitorData();');
const seededSessions = evaluate('getAnalyticsSessions()');
assert(seededSessions.length >= 4, 'Seeding cohort data must populate at least 4 visitor sessions');
assert(seededSessions.some(s => s.alias && s.alias.includes('Guest-')), 'Seeded sessions must have guest aliases');
const seededHtml = evaluate('renderAnalyticsHub()');
assert(seededHtml.includes('Guest-Sage-42'), 'Seeded sessions must appear in rendered traffic ledger');

// Verify session table filter
const allSessionsHtml = evaluate("renderVisitorSessionTable(getAnalyticsSessions(), 'all')");
assert(allSessionsHtml.includes('Guest-Sage-42'), 'All filter must display all sessions');

// Verify route restoration for analytics view
evaluate("restoreStudyRoute('view=analytics')");
assert.strictEqual(evaluate('studyView'), 'analytics', 'Route restoration must switch studyView to analytics');

// Verify reset functionality
evaluate('resetAnalyticsData();');
const resetSummary = evaluate('getAnalyticsSummary()');
assert.strictEqual(resetSummary.totalSecondsStudied, 0, 'Reset must zero totalSecondsStudied');
assert.strictEqual(resetSummary.topicsReadCount, 0, 'Reset must zero topicsReadCount');

// Verify fresh visit session calculation (must be Visit #1 and totalVisits === 1)
store.clear();
evaluate(`
  analyticsInitialized = false;
  initVisitorAnalytics();
`);
const freshSummary = evaluate('getAnalyticsSummary()');
assert.strictEqual(freshSummary.totalVisits, 1, 'First visit must record totalVisits === 1');
const freshSessions = evaluate('getAnalyticsSessions()');
assert.strictEqual(freshSessions.length, 1, 'First visit must create exactly 1 active session');
assert.strictEqual(freshSessions[0].sessionNumber, 1, 'First session must be sessionNumber 1');

// Verify cohort seeding idempotency
evaluate('seedCohortVisitorData();');
const secondsAfterFirstSeed = evaluate('getAnalyticsSummary().totalSecondsStudied');
assert(secondsAfterFirstSeed > 0, 'First seed must populate study seconds');
evaluate('seedCohortVisitorData();');
evaluate('seedCohortVisitorData();');
const secondsAfterThirdSeed = evaluate('getAnalyticsSummary().totalSecondsStudied');
assert.strictEqual(secondsAfterThirdSeed, secondsAfterFirstSeed, 'Multiple seed calls must be idempotent and not multiply study seconds');

// Verify unique visitors metric
const uniqueLearners = evaluate('getAnalyticsSummary().uniqueVisitors');
assert(uniqueLearners >= 4, 'Unique visitors metric must count distinct guest sessions');

// Verify analytics import functionality
evaluate(`
  const importedData = {
    totalSecondsStudied: 3600,
    totalTopicsViewed: 3,
    quizzesAnsweredCount: 10,
    quizzesCorrectCount: 8,
    daily: { '2026-10-20': { visits: 1, studySeconds: 3600, topicsViewed: 3, quizzesAnswered: 10, quizCorrect: 8 } },
    sessions: [
      {
        id: 'ses_imported_99',
        visitorId: 'vis_external_peer',
        alias: 'Guest-Falcon-77',
        sessionNumber: 1,
        startTime: Date.now() - 86400000,
        endTime: Date.now() - 86400000 + 3600000,
        durationSeconds: 3600,
        topicsViewed: 3,
        quizzesAnswered: 10,
        quizCorrect: 8,
        subjects: ['linux'],
        device: 'Desktop',
        active: false
      }
    ]
  };
  importAnalyticsData(importedData);
`);
const sessionsAfterImport = evaluate('getAnalyticsSessions()');
assert(sessionsAfterImport.some(s => s.id === 'ses_imported_99'), 'Imported session must appear in sessions list');
assert(evaluate('renderAnalyticsHub()').includes('Guest-Falcon-77'), 'Rendered hub must reflect imported session');

// Verify Boost Hub deep-link tab preservation
evaluate("restoreStudyRoute('view=boost&subject=sysdesign&tab=quiz');");
assert.strictEqual(evaluate('studyView'), 'boost', 'studyView must be boost');
const boostHubHtml = evaluate('renderBoostHub()');
assert(boostHubHtml.includes('Rapid Boost Quiz'), 'renderBoostHub must render quiz tab when specified in route');

// Verify initChapterRail safe handling when wrap is missing
evaluate(`
  document.getElementById = id => {
    if (id === 'atlas-rail') return { clientWidth: 400, closest: () => null, addEventListener: () => {} };
    return element();
  };
  initChapterRail();
`);

console.log('Study experience checks passed');


