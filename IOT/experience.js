/* Shared study-room behavior. The existing subject loaders and practice engines remain the source of truth. */
const studyPreferences = safeParse(localStorage.getItem('prep_preferences'), {}) || {};
const pathRoute = typeof location !== 'undefined' && location.pathname ? location.pathname.replace(/^\/IOT/, '').replace(/\/$/, '') : '';
const pathSearch = typeof location !== 'undefined' && location.search ? location.search.replace(/^\?/, '') : '';
const initialStudyRoute = (typeof location !== 'undefined' && location.hash) || (pathRoute === '/plan' ? ('#view=plan' + (pathSearch ? '&' + pathSearch : '')) : (pathRoute === '/boost' ? ('#view=boost' + (pathSearch ? '&' + pathSearch : '')) : (pathRoute === '/analytics' ? ('#view=analytics' + (pathSearch ? '&' + pathSearch : '')) : '')));
let studyView = 'home';
let studyNavigationVersion = 0;
let searchVersion = 0;
let searchResults = [];
let searchCursor = -1;
let routeRestoring = false;
let firstExperienceSync = true;
let timedStudyQuiz = safeParse(localStorage.getItem('prep_timed_quiz'), null);
let timedStudyClock = null;

function saveStudyPreferences() {
  try { localStorage.setItem('prep_preferences', JSON.stringify(studyPreferences)); } catch (_) { announceStudy('Your browser could not save these settings.'); }
}

function reducedStudyMotion() {
  return studyPreferences.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollBehavior() { return reducedStudyMotion() ? 'instant' : 'smooth'; }

function announceStudy(message) {
  const status = document.getElementById('study-status');
  if (status) status.textContent = message;
}

function subjectProgress(subject) {
  const cfg = CONFIG.subjects[subject];
  let total = 0, done = 0;
  cfg.tabs.forEach(tab => {
    const topics = cfg.data?.[tab.id];
    if (!Array.isArray(topics) || tabKind(tab.id) !== 'notes') return;
    total += topics.length;
    done += new Set((state.mastered[subject]?.[tab.id] || []).filter(i => Number.isInteger(i) && i >= 0 && i < topics.length)).size;
  });
  const activity = safeParse(localStorage.getItem('prep_study_activity'), {})?.[subject];
  if (!total && !hydratedSubjects[subject] && activity) return { total: activity.total || 0, done: activity.mastered || 0, percent: activity.total ? Math.min(100, Math.round(activity.mastered / activity.total * 100)) : 0 };
  return { total, done, percent: total ? Math.round(done / total * 100) : 0 };
}

function applyStudyPreferences() {
  const theme = studyPreferences.theme || localStorage.getItem('theme') || 'light';
  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.body.classList.remove('dark-theme', 'warm-theme', 'pastel-theme', 'forest-theme');
  if (dark) {
    document.body.classList.add('dark-theme');
  } else if (theme === 'warm') {
    document.body.classList.add('warm-theme');
  } else if (theme === 'pastel') {
    document.body.classList.add('pastel-theme');
  } else if (theme === 'forest') {
    document.body.classList.add('forest-theme');
  }
  document.body.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch (_) {}
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  const metaColors = {
    dark: '#202329',
    warm: '#F9F6F0',
    pastel: '#FAF6FD',
    forest: '#F4F7F4',
    light: '#FAFAF8'
  };
  const metaColor = dark ? metaColors.dark : (metaColors[theme] || metaColors.light);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', metaColor);
  document.body.classList.toggle('reduce-motion', reducedStudyMotion());
  document.body.dataset.scroll = studyPreferences.scroll || 'gentle';
  document.documentElement.style.setProperty('--reading-scale', String(studyPreferences.fontScale || 1));
}

function setReadingScale(value) {
  studyPreferences.fontScale = Math.max(0.9, Math.min(1.5, Math.round(value * 10) / 10));
  saveStudyPreferences();
  applyStudyPreferences();
}

function syncExperience(view) {
  studyView = view;
  const landing = !['study', 'subject'].includes(view);
  if (landing) document.body.classList.remove('focus-mode');
  document.body.classList.toggle('hub-view', landing);
  document.body.classList.remove('memory-open');
  const appRail = document.getElementById('app-rail');
  if (appRail) appRail.innerHTML = renderDeskNav(landing ? view : 'subjects');
  const subjectSelect = document.getElementById('shell-subject');
  if (subjectSelect) subjectSelect.value = landing ? '' : state.activeSubject;
  const isAdmin = typeof isCurrentUserAdmin === 'function' ? isCurrentUserAdmin() : false;
  const dockItems = [
    ['home', 'Home'],
    ['subjects', 'Learn'],
    ['plan', 'Plan'],
    ['boost', 'Boost'],
    ...(isAdmin ? [['analytics', 'Traffic']] : []),
    ['saved', 'Saved']
  ];
  const mobileDock = document.getElementById('mobile-dock');
  if (mobileDock) mobileDock.innerHTML = dockItems.map(([id, label]) => `<button type="button" data-nav="${id}"${(landing ? view : 'subjects') === id ? ' aria-current="page"' : ''}>${svgIcon(ICON[id], 19)}<span>${label}</span></button>`).join('') + `<button type="button" data-settings-open>${svgIcon(ICON.settings, 19)}<span>Settings</span></button>`;
  document.querySelectorAll('[data-memory-open]').forEach(b => b.hidden = view !== 'study' || isMcqSection() || isBashSection() || isJavaSection() || isPlaygroundSection());
  const headerFocusToggle = document.querySelector('header [data-focus-toggle]');
  if (headerFocusToggle) headerFocusToggle.hidden = view !== 'study';
  const desktopSidebarToggle = document.getElementById('desktop-sidebar-toggle');
  if (desktopSidebarToggle) desktopSidebarToggle.hidden = view !== 'study';
  const focusExit = document.getElementById('focus-exit');
  if (focusExit) focusExit.hidden = !document.body.classList.contains('focus-mode');
  const scrim = document.querySelector('.sidebar-scrim');
  if (scrim) scrim.hidden = true;
  if (elements?.menuToggleBtn?.setAttribute) elements.menuToggleBtn.setAttribute('aria-expanded', 'false');
  const query = new URLSearchParams({ view });
  if (!landing) query.set('subject', state.activeSubject);
  if (view === 'study') { query.set('section', state.activeSection); query.set('topic', state.activeTopicIndex); }
  const hash = '#' + query;
  if (location.hash !== hash) {
    if (typeof history !== 'undefined') {
      if (routeRestoring || (firstExperienceSync && !initialStudyRoute)) history.replaceState(null, '', hash);
      else if (!firstExperienceSync) history.pushState(null, '', hash);
    }
  }
  firstExperienceSync = false;
}

async function restoreStudyRoute(hash) {
  document.querySelectorAll('.study-dialog[open]').forEach(d => d.close());
  const version = ++studyNavigationVersion;
  const raw = (hash || '').replace(/^#/, '');
  const p = new URLSearchParams(raw);
  const view = p.get('view') || (raw.startsWith('view=') ? p.get('view') : raw) || 'home';
  const cleanView = view.replace(/^\//, '');
  routeRestoring = true;
  try {
    if (cleanView === 'plan' || cleanView === 'boost' || cleanView === 'analytics') {
      const subject = p.get('subject');
      if (subject && CONFIG.subjects[subject]) state.activeSubject = subject;
      renderLandingPage(cleanView);
      return;
    }
    if ((cleanView === 'subject' || cleanView === 'study') && CONFIG.subjects[p.get('subject')]) {
      await setActiveSubject(p.get('subject'));
      if (version !== studyNavigationVersion) return;
      if (cleanView === 'study' && CONFIG.subjects[state.activeSubject].tabs.some(t => t.id === p.get('section'))) {
        setActiveSection(p.get('section'));
        const index = Number(p.get('topic'));
        const count = currentSectionCount();
        if (Number.isInteger(index) && index >= 0 && index < count) selectTopic(index);
        restoreReadingPosition();
      }
    } else renderLandingPage(HUB_PAGES[cleanView] ? cleanView : 'home');
  } finally { if (version === studyNavigationVersion) routeRestoring = false; }
}

function currentSectionCount() {
  if (isMcqSection()) return getActiveMcqBank().length;
  if (isBashSection()) return getActiveBashProblems().length;
  if (isJavaSection()) return getActiveJavaProblems().length;
  return CONFIG.subjects[state.activeSubject]?.data?.[state.activeSection]?.length || 0;
}

function renderSubjectGallery() {
  const group = (label, keys) => keys.length ? `<section class="gallery-group"><h2 class="hub-h2">${label}<span class="hub-count">${keys.length}</span></h2><div class="subject-gallery">${keys.map(key => {
    const s = CONFIG.subjects[key], p = subjectProgress(key);
    return `<button type="button" class="gallery-subject fam-${DESK_FAMILIES[key] || 'blue'}" data-subject="${key}"><span class="gallery-code">${escapeHtml(s.code || s.shortLabel)}</span><h3>${escapeHtml(s.label)}</h3><p>${escapeHtml(s.tagline)}</p><div class="gallery-art" aria-hidden="true">${deskDiagram(key)}</div><div class="gallery-foot"><span>${p.total ? `${p.done} of ${p.total} topics complete` : `${s.tabs.length} study sections`}</span>${svgIcon(ICON.chevron, 17)}</div></button>`;
  }).join('')}</div></section>` : '';
  const keys = Object.keys(CONFIG.subjects);
  return group('This semester', keys.filter(k => CONFIG.subjects[k].semester && !CONFIG.subjects[k].pending)) + group('More to explore', keys.filter(k => !CONFIG.subjects[k].semester && !CONFIG.subjects[k].pending)) + group('Syllabus previews', keys.filter(k => CONFIG.subjects[k].pending));
}

function renderProgressHub() {
  const activity = safeParse(localStorage.getItem('prep_study_activity'), {}) || {};
  const keys = Object.keys(CONFIG.subjects).filter(k => activity[k] || Object.values(state.mastered[k] || {}).some(v => v.length));
  if (!keys.length) return `<section class="study-empty fam-mint">${svgIcon(ICON.progress, 32)}<h2>It starts with one topic.</h2><p>Finish a topic or try a few questions. Your progress will find its home here.</p><button class="desk-btn-primary" data-nav="subjects" type="button">Find your subject</button></section>`;
  return `<div class="progress-courses">${keys.map(key => {
    const s = CONFIG.subjects[key], p = subjectProgress(key);
    const answers = Object.keys(state.practiceAnswers[key] || {}).length;
    return `<section class="progress-course fam-${DESK_FAMILIES[key] || 'blue'}"><div class="progress-course-top"><span>${svgIcon(ICON.subjects)}${escapeHtml(s.shortLabel)}</span><strong>${p.percent}%</strong></div><h2>${escapeHtml(s.label)}</h2><div class="progress-course-bar" role="progressbar" aria-label="${escapeHtml(s.shortLabel)} topics complete" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p.percent}"><span style="width:${p.percent}%"></span></div><p>${p.done} topics completed${p.total ? ` of ${p.total}` : ''} · ${answers} questions answered</p><button class="desk-panel-link" type="button" data-subject="${key}">Open study room ${svgIcon(ICON.chevron, 15)}</button></section>`;
  }).join('')}</div>`;
}

function studyDialog(id, title, body) {
  return `<dialog class="study-dialog" id="${id}" aria-labelledby="${id}-title"><header class="study-dialog-head"><h2 id="${id}-title">${title}</h2><button class="icon-btn" type="button" data-dialog-close aria-label="Close ${title.toLowerCase()}">${svgIcon(SAVED_ICON.close)}</button></header>${body}</dialog>`;
}

function openStudyPlan(subjectId) {
  const subj = (subjectId === 'aiml' || subjectId === 'sysdesign') ? subjectId : (state.activeSubject === 'aiml' ? 'aiml' : 'sysdesign');
  const d = document.getElementById('study-plan');
  if (!d) return;
  const content = document.getElementById('study-plan-content');
  if (content) content.innerHTML = renderStudyPlanContent(subj);
  if (!d.open) d.showModal();
}

function openExamBoost(subjectId, activeTab = 'cheats') {
  const subj = (subjectId === 'aiml' || subjectId === 'sysdesign') ? subjectId : (state.activeSubject === 'aiml' ? 'aiml' : 'sysdesign');
  const d = document.getElementById('study-boost');
  if (!d) return;
  const content = document.getElementById('study-boost-content');
  if (content) content.innerHTML = renderExamBoostContent(subj, activeTab);
  if (!d.open) d.showModal();
}

function openStudySettings() {
  const dialog = document.getElementById('study-settings');
  dialog.querySelector('#pref-theme').value = studyPreferences.theme || localStorage.getItem('theme') || 'light';
  dialog.querySelector('#pref-size').value = studyPreferences.fontScale || 1;
  dialog.querySelector('#pref-motion').value = studyPreferences.motion || 'system';
  dialog.querySelector('#pref-scroll').value = studyPreferences.scroll || 'gentle';
  const modeSel = dialog.querySelector('#pref-reading-mode');
  if (modeSel && typeof getActiveReadingMode === 'function') {
    modeSel.value = getActiveReadingMode();
  }
  dialog.querySelector('#exam-subject').value = CONFIG.subjects[state.activeSubject] ? state.activeSubject : Object.keys(CONFIG.subjects)[0];
  loadExamField();
  if (window.matchMedia('(max-width: 700px)').matches) {
    document.getElementById('settings-account').appendChild(document.getElementById('auth-container'));
  }
  if (!dialog.open) dialog.showModal();
}

function loadExamField() {
  const key = document.getElementById('exam-subject').value;
  const time = CONFIG.subjects[key].examTime;
  const date = time ? new Date(time) : null;
  document.getElementById('exam-date').value = date ? `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}` : '';
}

function initExperience() {
  Object.entries(studyPreferences.examDates || {}).forEach(([id, time]) => { if (CONFIG.subjects[id] && (time === null || Number.isFinite(time))) CONFIG.subjects[id].examTime = time; });
  applyStudyPreferences();
  const options = Object.entries(CONFIG.subjects).map(([id, s]) => `<option value="${id}">${escapeHtml(s.label)}</option>`).join('');
  document.getElementById('shell-subject').insertAdjacentHTML('beforeend', options);
  document.getElementById('shell-subject').addEventListener('change', e => e.target.value ? setActiveSubject(e.target.value) : renderLandingPage());
  document.body.insertAdjacentHTML('beforeend',
    studyDialog('study-settings', 'Make yourself comfortable', `<div class="settings-body"><p class="settings-intro">A study room that works the way you do.</p><div class="settings-row"><label for="pref-theme">Appearance<span>A softer light, warm paper, or a quieter dark.</span></label><select id="pref-theme"><option value="light">Light</option><option value="warm">Warm paper</option><option value="pastel">Pastel lavender</option><option value="forest">Forest sage</option><option value="dark">Dark</option><option value="system">Use device setting</option></select></div><div class="settings-row"><label for="pref-reading-mode">Reading depth<span>Choose default note depth. Both are always a click away.</span></label><select id="pref-reading-mode"><option value="foundations">Foundations (Gentle &amp; Intuitive)</option><option value="deepdive">Deep Dive (Technical &amp; Formulas)</option></select></div><div class="settings-row"><label for="pref-size">Reading size<span>Adjust the notes, keep the layout.</span></label><select id="pref-size">${[0.9,1,1.1,1.2,1.3,1.4,1.5].map(v => `<option value="${v}">${Math.round(v*100)}%${v === 1 ? ' · Default' : ''}</option>`).join('')}</select></div><div class="settings-row"><label for="pref-motion">Motion<span>Device reduced-motion is always respected.</span></label><select id="pref-motion"><option value="system">Gentle transitions</option><option value="reduced">Reduce motion</option></select></div><div class="settings-row"><label for="pref-scroll">Reading scroll<span>Gently smooth mouse-wheel steps.</span></label><select id="pref-scroll"><option value="gentle">Gentle</option><option value="native">Native</option></select></div><form id="exam-form" class="exam-form"><h3>Your next exam</h3><p>Dates stay on this device. Clear the date to remove a countdown.</p><label for="exam-subject">Subject</label><select id="exam-subject">${options}</select><label for="exam-date">Exam date</label><input id="exam-date" type="date" name="examDate"><button class="desk-btn-primary fam-lavender" type="submit">Save exam date</button><span id="exam-save-status" role="status"></span></form></div>`) +
    studyDialog('study-search', 'Find your next thought', `<div class="search-field">${svgIcon(SAVED_ICON.search, 21)}<input id="global-search" type="search" name="studySearch" autocomplete="off" placeholder="Try streams, subnetting, or Linux…" aria-label="Search subjects and study material"><kbd>Esc</kbd></div><p id="search-summary" class="search-summary" role="status">Search all subjects, notes and question banks.</p><div id="search-results" class="search-results"></div><footer class="search-foot"><span>↑ ↓ to browse</span><span>Enter to open</span></footer>`) +
    studyDialog('study-memory', 'Study memory', '<div id="memory-sheet-content"></div>') +
    studyDialog('study-plan', 'Syllabus &amp; Study Roadmap', '<div id="study-plan-content" class="study-dialog-scroll"></div>') +
    studyDialog('study-boost', 'High-Yield Exam Boost', '<div id="study-boost-content" class="study-dialog-scroll"></div>') +
    `<button type="button" id="focus-exit" class="focus-exit" data-focus-toggle hidden>${svgIcon(ICON.home, 16)}Leave focus</button>`);
  document.getElementById('study-plan')?.classList.add('study-dialog-wide');
  document.getElementById('study-boost')?.classList.add('study-dialog-wide');
  document.querySelectorAll('.study-dialog').forEach(d => {
    d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-dialog-close]')) d.close(); });
  });
  document.querySelector('#study-settings .settings-intro').insertAdjacentHTML('afterend', '<div id="settings-account"></div>');
  document.getElementById('settings-account').addEventListener('click', e => {
    if (e.target.closest('#auth-profile-btn')) document.getElementById('study-settings').close();
  });
  document.getElementById('study-memory').addEventListener('close', () => {
    const rail = document.getElementById('memory-rail');
    if (rail) elements.readingPane.appendChild(rail);
  });
  document.getElementById('study-settings').addEventListener('close', () => {
    document.querySelector('body > header .header-right').appendChild(document.getElementById('auth-container'));
  });
  document.getElementById('study-settings').addEventListener('change', e => {
    const fields = { 'pref-theme': 'theme', 'pref-size': 'fontScale', 'pref-motion': 'motion', 'pref-scroll': 'scroll' };
    if (e.target.id === 'exam-subject') return loadExamField();
    if (e.target.id === 'pref-reading-mode') {
      if (typeof setReadingMode === 'function') setReadingMode(e.target.value);
      return;
    }
    if (!fields[e.target.id]) return;
    studyPreferences[fields[e.target.id]] = e.target.id === 'pref-size' ? Number(e.target.value) : e.target.value;
    saveStudyPreferences(); applyStudyPreferences();
  });
  document.getElementById('exam-form').addEventListener('submit', e => {
    e.preventDefault();
    const subject = document.getElementById('exam-subject').value;
    const value = document.getElementById('exam-date').value;
    const time = value ? new Date(value + 'T09:30:00').getTime() : null;
    if (time !== null && !Number.isFinite(time)) return;
    (studyPreferences.examDates ||= {})[subject] = time;
    CONFIG.subjects[subject].examTime = time;
    saveStudyPreferences();
    document.getElementById('exam-save-status').textContent = value ? 'Exam date saved.' : 'Countdown removed.';
    if (studyView === 'home') renderLandingPage();
    else if (studyView === 'subject') renderSubjectOverview(state.activeSubject);
  });
  document.addEventListener('change', e => {
    const check = e.target.closest('[data-plan-check]');
    if (check) {
      const subj = check.dataset.planCheck;
      const day = check.dataset.planDay;
      const allChecks = safeParse(localStorage.getItem('prep_plan_checklist'), {}) || {};
      allChecks[subj] = allChecks[subj] || {};
      allChecks[subj][day] = check.checked;
      try { localStorage.setItem('prep_plan_checklist', JSON.stringify(allChecks)); } catch (_) {}
      const item = check.closest('.plan-schedule-item');
      if (item) item.classList.toggle('is-done', check.checked);
      const counter = check.closest('.plan-section')?.querySelector('#plan-schedule-count');
      const plan = getSyllabusPlan(subj);
      if (counter && plan) {
        const done = Object.values(allChecks[subj]).filter(Boolean).length;
        counter.textContent = `${done} / ${(plan.schedule14Days || []).length} days completed`;
        announceStudy(`Day revision marked ${check.checked ? 'completed' : 'incomplete'}. ${done} of ${(plan.schedule14Days || []).length} days completed.`);
      }
    }
  });
  document.addEventListener('click', e => {
    if (e.target.closest('[data-timed-start]')) return startTimedStudyQuiz();
    if (e.target.closest('[data-timed-finish]')) return finishTimedStudyQuiz();
    if (e.target.closest('[data-settings-open]')) return openStudySettings();
    if (e.target.closest('[data-search-open]')) return openStudySearch();
    if (e.target.closest('[data-saved-open]')) return toggleSmartNotesPanel(true);
    const modeBtn = e.target.closest('[data-mode]');
    if (modeBtn) {
      if (typeof setReadingMode === 'function') setReadingMode(modeBtn.dataset.mode);
      return;
    }
    const planTrigger = e.target.closest('[data-plan-open]');
    if (planTrigger) {
      const subj = planTrigger.dataset.subject || state.activeSubject || 'sysdesign';
      return openStudyPlan(subj);
    }
    const boostTrigger = e.target.closest('[data-boost-open]');
    if (boostTrigger) {
      const subj = boostTrigger.dataset.subject || state.activeSubject || 'sysdesign';
      return openExamBoost(subj);
    }
    const planSubjBtn = e.target.closest('[data-plan-subject]');
    if (planSubjBtn) {
      const subj = planSubjBtn.dataset.planSubject;
      if (CONFIG.subjects[subj]) state.activeSubject = subj;
      const container = planSubjBtn.closest('.plan-container');
      if (container) {
        const parent = container.parentElement;
        parent.innerHTML = renderStudyPlanContent(subj);
        if (studyView === 'plan') {
          history.replaceState(null, '', `#view=plan&subject=${subj}`);
        }
      }
      return;
    }
    const boostSubjBtn = e.target.closest('[data-boost-subject]');
    if (boostSubjBtn) {
      const subj = boostSubjBtn.dataset.boostSubject;
      if (CONFIG.subjects[subj]) state.activeSubject = subj;
      const boostContainer = boostSubjBtn.closest('.boost-container');
      const currentTab = boostContainer?.dataset.activeTab || 'cheats';
      if (boostContainer) {
        const parent = boostContainer.parentElement;
        parent.innerHTML = renderExamBoostContent(subj, currentTab);
        if (studyView === 'boost') {
          history.replaceState(null, '', `#view=boost&subject=${subj}`);
        }
      }
      return;
    }
    const boostTabBtn = e.target.closest('[data-boost-tab]');
    if (boostTabBtn) {
      const tab = boostTabBtn.dataset.boostTab;
      const boostContainer = boostTabBtn.closest('.boost-container');
      const currentSubj = boostContainer?.dataset.activeSubject || state.activeSubject || 'sysdesign';
      if (boostContainer) {
        state.activeBoostTab = tab;
        const parent = boostContainer.parentElement;
        parent.innerHTML = renderExamBoostContent(currentSubj, tab);
        if (studyView === 'boost') {
          history.replaceState(null, '', `#view=boost&subject=${currentSubj}&tab=${tab}`);
        }
      }
      return;
    }
    const quizOptBtn = e.target.closest('[data-quiz-opt]');
    if (quizOptBtn) {
      const subj = quizOptBtn.dataset.quizSubj;
      const qid = quizOptBtn.dataset.quizQid;
      const optIdx = Number(quizOptBtn.dataset.quizOpt);
      const savedQuiz = safeParse(localStorage.getItem(`prep_boost_quiz_${subj}`), {}) || {};
      savedQuiz[qid] = optIdx;
      try { localStorage.setItem(`prep_boost_quiz_${subj}`, JSON.stringify(savedQuiz)); } catch (_) {}
      
      const boost = getExamBoost(subj);
      const questionObj = (boost?.quiz || []).find((q, idx) => (q.id || `${subj}_q${idx + 1}`) === qid);
      if (questionObj) {
        const correctIdx = typeof questionObj.answer === 'number' ? questionObj.answer : questionObj.correct;
        const explanation = questionObj.explanation || questionObj.why || '';
        const isCorrect = optIdx === correctIdx;
        announceStudy(isCorrect ? `Correct! ${explanation}` : `Incorrect. Option ${String.fromCharCode(65 + correctIdx)} is correct. ${explanation}`);
        if (typeof trackAnalyticsQuizAnswer === 'function') {
          trackAnalyticsQuizAnswer(subj, qid, isCorrect);
        }
      }

      const boostContainer = quizOptBtn.closest('.boost-container');
      if (boostContainer) {
        const scrollParent = boostContainer.closest('.study-dialog-scroll') || document.querySelector('.welcome-screen') || document.documentElement;
        const prevScroll = scrollParent.scrollTop;
        const parent = boostContainer.parentElement;
        parent.innerHTML = renderExamBoostContent(subj, 'quiz');
        if (scrollParent && typeof prevScroll === 'number') {
          scrollParent.scrollTop = prevScroll;
        }
      }
      return;
    }
    const adminLoginBtn = e.target.closest('[data-admin-login]');
    if (adminLoginBtn) {
      if (typeof window.signInWithGoogle === 'function') {
        window.signInWithGoogle();
      } else {
        document.getElementById('auth-login-btn')?.click();
      }
      return;
    }
    const copyIdBtn = e.target.closest('[data-analytics-copy-id]');
    if (copyIdBtn) {
      const vid = typeof getAnalyticsVisitorId === 'function' ? getAnalyticsVisitorId() : 'vis_anonymous';
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(vid).then(() => {
          const old = copyIdBtn.textContent;
          copyIdBtn.textContent = 'Copied!';
          setTimeout(() => { if (copyIdBtn.isConnected) copyIdBtn.textContent = old; }, 1600);
        }).catch(() => announceStudy(`Visitor ID: ${vid}`));
      } else {
        announceStudy(`Visitor ID: ${vid}`);
      }
      return;
    }
    const exportBtn = e.target.closest('[data-analytics-export]');
    if (exportBtn) {
      if (typeof exportAnalyticsData === 'function') exportAnalyticsData();
      announceStudy('Analytics exported as JSON.');
      return;
    }
    const importBtn = e.target.closest('[data-analytics-import]');
    if (importBtn) {
      if (typeof document !== 'undefined') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.style.display = 'none';
        input.addEventListener('change', () => {
          const file = input.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = ev => {
            try {
              const parsed = JSON.parse(ev.target?.result || '{}');
              if (typeof importAnalyticsData === 'function' && importAnalyticsData(parsed)) {
                renderLandingPage('analytics');
                announceStudy('Analytics data imported and merged.');
              } else {
                announceStudy('Could not parse imported analytics file.');
              }
            } catch (_) {
              announceStudy('Invalid JSON format in analytics file.');
            }
          };
          reader.readAsText(file);
        });
        document.body.appendChild(input);
        input.click();
        setTimeout(() => input.remove(), 1000);
      }
      return;
    }
    const seedBtn = e.target.closest('[data-analytics-seed]');
    if (seedBtn) {
      if (typeof seedCohortVisitorData === 'function') seedCohortVisitorData();
      renderLandingPage('analytics');
      announceStudy('Simulated cohort visitor traffic loaded.');
      return;
    }
    const resetBtn = e.target.closest('[data-analytics-reset]');
    if (resetBtn) {
      if (typeof confirm === 'function' && !confirm('Reset local visitor analytics and session history on this device?')) return;
      if (typeof resetAnalyticsData === 'function') resetAnalyticsData();
      renderLandingPage('analytics');
      announceStudy('Visitor analytics reset.');
      return;
    }
    const filterBtn = e.target.closest('[data-analytics-filter]');
    if (filterBtn) {
      const filter = filterBtn.dataset.analyticsFilter;
      const wrap = document.getElementById('analytics-sessions-table-wrap');
      if (wrap && typeof renderVisitorSessionTable === 'function' && typeof getAnalyticsSessions === 'function') {
        wrap.innerHTML = renderVisitorSessionTable(getAnalyticsSessions(), filter);
        filterBtn.closest('.analytics-filter-tabs')?.querySelectorAll('.analytics-filter-tab').forEach(b => b.classList.toggle('active', b === filterBtn));
      }
      return;
    }
    const quizResetBtn = e.target.closest('[data-quiz-reset]');
    if (quizResetBtn) {
      const subj = quizResetBtn.dataset.quizReset;
      try { localStorage.removeItem(`prep_boost_quiz_${subj}`); } catch (_) {}
      announceStudy('Quiz answers reset.');
      const boostContainer = quizResetBtn.closest('.boost-container');
      if (boostContainer) {
        const scrollParent = boostContainer.closest('.study-dialog-scroll') || document.querySelector('.welcome-screen') || document.documentElement;
        const prevScroll = scrollParent.scrollTop;
        const parent = boostContainer.parentElement;
        parent.innerHTML = renderExamBoostContent(subj, 'quiz');
        if (scrollParent && typeof prevScroll === 'number') {
          scrollParent.scrollTop = prevScroll;
        }
      }
      return;
    }
    if (e.target.closest('[data-focus-toggle]')) {
      const active = document.body.classList.toggle('focus-mode');
      document.querySelectorAll('[data-focus-toggle]').forEach(b => b.setAttribute('aria-pressed', String(active)));
      document.getElementById('focus-exit').hidden = !active;
      return;
    }
    if (e.target.closest('[data-memory-open]')) {
      document.getElementById('memory-sheet-content').appendChild(document.getElementById('memory-rail'));
      document.getElementById('study-memory').showModal();
      return;
    }
    const nav = e.target.closest('#app-rail [data-nav], #mobile-dock [data-nav]');
    if (nav) {
      closeMobileSidebar();
      if (nav.dataset.nav === 'saved') toggleSmartNotesPanel(true);
      else renderLandingPage(nav.dataset.nav);
    }
    if (e.target.closest('.sidebar-scrim')) closeMobileSidebar();
    const copy = e.target.closest('[data-code-copy]');
    if (copy) navigator.clipboard.writeText(copy.parentElement.querySelector('code')?.textContent || '').then(() => { copy.textContent = 'Copied'; setTimeout(() => { if (copy.isConnected) copy.textContent = 'Copy'; }, 1600); }).catch(() => announceStudy('Select the code and copy it with your keyboard.'));
  });
  elements.menuToggleBtn.addEventListener('click', () => {
    if (studyView !== 'study') return renderLandingPage('subjects');
    const open = elements.sidebar.classList.contains('mobile-open');
    document.querySelector('.sidebar-scrim').hidden = !open;
    elements.menuToggleBtn.setAttribute('aria-expanded', String(open));
    if (open) elements.searchInput.focus();
  });
  elements.sidebar.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !elements.sidebar.classList.contains('mobile-open')) return;
    const controls = [...elements.sidebar.querySelectorAll('button, input, select')].filter(el => el.getClientRects().length);
    if (e.shiftKey && document.activeElement === controls[0]) { e.preventDefault(); controls.at(-1)?.focus(); }
    if (!e.shiftKey && document.activeElement === controls.at(-1)) { e.preventDefault(); controls[0]?.focus(); }
  });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openStudySearch(); }
    if (e.key === 'Escape') {
      closeMobileSidebar();
      if (document.body.classList.contains('focus-mode') && !document.querySelector('dialog[open]')) document.getElementById('focus-exit').click();
    }
  });
  document.getElementById('global-search').addEventListener('input', debounce(runStudySearch, 180));
  document.getElementById('study-search').addEventListener('keydown', e => {
    if (!['ArrowDown','ArrowUp','Enter'].includes(e.key) || !searchResults.length) return;
    e.preventDefault();
    if (e.key === 'Enter') return openSearchResult(Math.max(0, searchCursor));
    searchCursor = (searchCursor + (e.key === 'ArrowDown' ? 1 : -1) + searchResults.length) % searchResults.length;
    document.querySelectorAll('.search-result').forEach((b, i) => { b.classList.toggle('selected', i === searchCursor); if (i === searchCursor) { b.focus({ preventScroll: true }); b.scrollIntoView({ block: 'nearest' }); } });
  });
  document.getElementById('search-results').addEventListener('click', e => {
    const b = e.target.closest('[data-search-index]'); if (b) openSearchResult(Number(b.dataset.searchIndex));
  });
  window.addEventListener('popstate', () => restoreStudyRoute(location.hash));
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyStudyPreferences);
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', applyStudyPreferences);
  window.addEventListener('prep:auth-changed', () => {
    if (studyView === 'analytics' || studyView === 'home') {
      renderLandingPage(studyView);
    } else {
      syncExperience(studyView);
    }
  });
  initGentleScroll();
  if (initialStudyRoute) queueMicrotask(() => restoreStudyRoute(initialStudyRoute));
}

function openStudySearch() {
  const d = document.getElementById('study-search');
  if (!d.open) d.showModal();
  document.getElementById('global-search').focus();
  runStudySearch();
}

function textFromStudyHtml(html) {
  const el = document.createElement('div'); el.innerHTML = html || ''; return (el.textContent || '').replace(/\s+/g, ' ').trim();
}

function collectStudySearch(query) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = [], seen = new Set();
  const add = entry => {
    const text = `${entry.title} ${entry.subtitle} ${entry.text || ''}`.toLowerCase();
    if (!tokens.every(t => text.includes(t))) return;
    const key = `${entry.subject}:${entry.section || ''}:${entry.title}`;
    if (seen.has(key)) return;
    seen.add(key);
    entry.rank = tokens.reduce((n, t) => n + (entry.title.toLowerCase().includes(t) ? 3 : 0), 0);
    results.push(entry);
  };
  Object.entries(CONFIG.subjects).forEach(([subject, s]) => {
    add({ subject, title: s.label, subtitle: s.tagline, kind: 'Subject' });
    s.tabs.forEach(tab => {
      const subtitle = `${s.shortLabel} · ${tab.label}`;
      if (tabKind(tab.id) === 'notes' || (s.data?.[tab.id]?.length && tab.id !== 'practice')) (s.data?.[tab.id] || []).forEach((t, index) => {
        if (t.title) add({ subject, section: tab.id, index, title: t.title, subtitle, kind: tabKind(tab.id) === 'lab' ? 'Lab' : 'Note', text: textFromStudyHtml(t.html) });
      });
    });
    const section = questionSectionId(subject);
    if (section) (s.mcqs || []).forEach((unit, index) => (unit.questions || []).forEach(q => add({ subject, section, index, questionId: q.id, title: textFromStudyHtml(q.question), subtitle: `${s.shortLabel} · ${unit.unitName}`, kind: 'Question' })));
    const labSection = subject === 'java' ? 'javaFA' : 'bashPractice';
    (subject === 'java' ? s.javaProblems : s.bashProblems)?.forEach((p, index) => add({ subject, section: labSection, index, title: p.title, subtitle: `${s.shortLabel} · Coding lab`, kind: 'Lab' }));
  });
  if (typeof COURSE_SYLLABUS_DATA !== 'undefined') {
    Object.entries(COURSE_SYLLABUS_DATA).forEach(([subject, plan]) => {
      const s = CONFIG.subjects[subject] || { shortLabel: subject, label: plan.title };
      add({
        subject,
        title: `${s.shortLabel} Official Syllabus & Roadmap`,
        subtitle: `${s.shortLabel} · ${plan.code}`,
        kind: 'Plan',
        text: `${plan.title} ${plan.code} ${plan.department} ${plan.prereqs} ${(plan.clos || []).map(c => c.desc).join(' ')} ${(plan.milestones || []).map(m => m.title + ' ' + (m.units || []).map(u => u.title + ' ' + u.topics.join(' ')).join(' ')).join(' ')}`
      });
    });
  }
  if (typeof EXAM_BOOST_DATA !== 'undefined') {
    Object.entries(EXAM_BOOST_DATA).forEach(([subject, boost]) => {
      const s = CONFIG.subjects[subject] || { shortLabel: subject, label: boost.title };
      (boost.cheats || []).forEach(c => {
        add({
          subject,
          title: `${c.title} (Cheat)`,
          subtitle: `${s.shortLabel} · High-Yield Boost`,
          kind: 'Boost',
          tab: 'cheats',
          text: textFromStudyHtml(c.body)
        });
      });
      (boost.traps || []).forEach(t => {
        add({
          subject,
          title: `Exam Trap: ${t.trap}`,
          subtitle: `${s.shortLabel} · Common Pitfalls`,
          kind: 'Boost',
          tab: 'traps',
          text: t.correction
        });
      });
      (boost.quiz || []).forEach(q => {
        const qText = q.question || q.q || '';
        const qExp = q.explanation || q.why || '';
        add({
          subject,
          title: `Sprint Q: ${textFromStudyHtml(qText)}`,
          subtitle: `${s.shortLabel} · Rapid Quiz`,
          kind: 'Boost',
          tab: 'quiz',
          text: `${(q.options || []).join(' ')} ${qExp}`
        });
      });
    });
  }
  if (typeof isCurrentUserAdmin === 'function' && isCurrentUserAdmin()) {
    add({
      subject: 'analytics',
      title: 'Visitor Analytics & Traffic Ledger',
      subtitle: 'Site Traffic · Study Time · Anonymous Sessions',
      kind: 'Analytics',
      text: 'analytics visitor traffic sessions study time page views duration dates engagement'
    });
  }
  return results.sort((a, b) => b.rank - a.rank).slice(0, 35);
}

async function runStudySearch() {
  const version = ++searchVersion;
  const query = document.getElementById('global-search').value.trim();
  const summary = document.getElementById('search-summary');
  if (!query) {
    searchResults = Object.entries(CONFIG.subjects).filter(([,s]) => !s.pending).map(([subject,s]) => ({ subject, title:s.label, subtitle:s.tagline, kind:'Subject' }));
    summary.textContent = 'Your subjects. Type to look inside notes and question banks.';
  } else {
    summary.textContent = 'Looking through your study material…';
    const loads = await Promise.allSettled(Object.keys(CONFIG.subjects).filter(k => !CONFIG.subjects[k].pending).map(ensureSubjectDataLoaded));
    if (version !== searchVersion || !document.getElementById('study-search').open) return;
    searchResults = collectStudySearch(query);
    const failed = loads.filter(r => r.status === 'rejected').length;
    summary.textContent = `${searchResults.length}${searchResults.length === 35 ? '+' : ''} results${failed ? ` · ${failed} subjects could not load; check your connection and try again.` : ''}`;
  }
  searchCursor = -1;
  document.getElementById('search-results').innerHTML = searchResults.length ? searchResults.map((r,i) => `<button type="button" class="search-result fam-${DESK_FAMILIES[r.subject] || 'blue'}" data-search-index="${i}"><span class="search-result-icon">${svgIcon(r.kind === 'Question' ? ICON.tests : (r.kind === 'Plan' ? ICON.plan : (r.kind === 'Boost' ? ICON.boost : (r.kind === 'Analytics' ? ICON.analytics : ICON.notes))))}</span><span><strong>${escapeHtml(r.title)}</strong><small>${escapeHtml(r.subtitle)}</small></span><em>${r.kind}</em>${svgIcon(ICON.chevron, 15)}</button>`).join('') : '<div class="search-empty"><h3>No match yet.</h3><p>Try a shorter phrase, a subject name, or another concept.</p></div>';
}

async function openSearchResult(index) {
  const result = searchResults[index];
  if (!result) return;
  document.getElementById('study-search').close();
  if (result.kind === 'Analytics') return renderLandingPage('analytics');
  if (result.kind === 'Plan') return openStudyPlan(result.subject);
  if (result.kind === 'Boost') return openExamBoost(result.subject, result.tab || 'cheats');
  await resumeTo(result.subject, result.section, result.index);
  if (result.questionId && state.activeSubject === result.subject) setQuizCursor(result.questionId, true);
}

function enhanceReadingContent() {
  elements.contentArea.querySelectorAll('pre').forEach(pre => {
    if (!pre.querySelector('code')) return;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'code-copy'; b.dataset.codeCopy = ''; b.textContent = 'Copy'; b.setAttribute('aria-label', 'Copy code block'); pre.appendChild(b);
  });
  const pane = document.getElementById('main-content-pane');
  if (!reducedStudyMotion() && pane.animate) pane.animate([{ opacity: 0.65 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' });
}

function isTimedStudyQuiz() {
  return timedStudyQuiz && timedStudyQuiz.subject === state.activeSubject && timedStudyQuiz.section === state.activeSection && timedStudyQuiz.unit === state.quizUnitIndex;
}

function renderTimedStudyControls() {
  if (isTimedStudyQuiz()) return `<section class="timed-study-bar"><span>${svgIcon(ICON.tests, 17)}Exam practice <strong id="timed-study-clock"></strong></span><p>Answers stay hidden until you finish.</p><button class="desk-btn-primary fam-lavender" type="button" data-timed-finish>Finish & review</button></section>`;
  return `<div class="timed-study-intro"><span>Want to try without seeing the answers?</span><button class="quiz-ghost-btn" type="button" data-timed-start>Start timed practice</button></div>`;
}

function startTimedStudyQuiz() {
  if (timedStudyQuiz) {
    if (!confirm('Finish your existing timed practice and start this quiz?')) return;
    finishTimedStudyQuiz(false);
  }
  const unit = quizUnit();
  if (!unit?.questions?.length) return;
  timedStudyQuiz = { subject: state.activeSubject, section: state.activeSection, unit: state.quizUnitIndex, ends: Date.now() + unit.questions.length * 60000, answers: {} };
  try { localStorage.setItem('prep_timed_quiz', JSON.stringify(timedStudyQuiz)); } catch (_) {}
  state.quizFilter = 'all';
  renderPracticeUnit(state.quizUnitIndex);
  announceStudy('Timed practice started. One minute per question.');
}

function renderTimedStudyRail(questions) {
  const count = questions.filter(q => timedStudyQuiz.answers[q.id]).length;
  return `<section class="quiz-card"><h3 class="quiz-card-title">Your practice session</h3><p class="quiz-card-foot">${count} of ${questions.length} answered</p><div class="qmap">${questions.map((q,i) => `<button type="button" class="qmap-cell${timedStudyQuiz.answers[q.id] ? ' timed-answered' : ''}" data-quiz-jump="${q.id}" aria-label="Question ${i+1}${timedStudyQuiz.answers[q.id] ? ', answered' : ', unanswered'}">${i+1}</button>`).join('')}</div><p class="quiz-card-foot">You can change any answer before finishing.</p></section>`;
}

function updateTimedStudyClock() {
  clearInterval(timedStudyClock);
  if (!timedStudyQuiz) return;
  const tick = () => {
    const seconds = Math.max(0, Math.ceil((timedStudyQuiz.ends - Date.now()) / 1000));
    const clock = document.getElementById('timed-study-clock');
    if (clock && isTimedStudyQuiz()) clock.textContent = `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
    if (!seconds) finishTimedStudyQuiz();
  };
  timedStudyClock = setInterval(tick, 1000);
  tick();
}

function finishTimedStudyQuiz(render = true) {
  if (!timedStudyQuiz) return;
  const { subject, section, unit, answers } = timedStudyQuiz;
  const current = isTimedStudyQuiz() && studyView === 'study';
  const target = state.practiceAnswers[subject] || (state.practiceAnswers[subject] = {});
  Object.assign(target, answers);
  try {
    localStorage.setItem(CONFIG.subjects[subject].storageKeyPractice, JSON.stringify(target));
    localStorage.removeItem('prep_timed_quiz');
  } catch (_) { announceStudy('Your browser could not save these practice results.'); }
  if (typeof window.triggerCloudSync === 'function') window.triggerCloudSync();
  timedStudyQuiz = null;
  clearInterval(timedStudyClock);
  if (render && current && state.activeSection === section) { renderPracticeUnit(unit); renderSidebar(); updateProgressBar(); }
  announceStudy('Timed practice finished. Your answers are ready to review.');
}

function initGentleScroll() {
  const pane = document.getElementById('main-content-pane');
  if (!pane) return;
  pane.addEventListener('scroll', debounce(() => {
    if (studyView !== 'study' || isMcqSection() || isBashSection() || isJavaSection() || isPlaygroundSection()) return;
    try {
      const positions = safeParse(localStorage.getItem('prep_reading_positions'), {}) || {};
      positions[`${state.activeSubject}/${state.activeSection}/${state.activeTopicIndex}`] = pane.scrollTop;
      localStorage.setItem('prep_reading_positions', JSON.stringify(Object.fromEntries(Object.entries(positions).slice(-80))));
    } catch (_) {}
  }, 220), { passive: true });
}

function restoreReadingPosition() {
  if (studyView !== 'study' || isMcqSection() || isBashSection() || isJavaSection() || isPlaygroundSection()) return;
  const value = safeParse(localStorage.getItem('prep_reading_positions'), {})?.[`${state.activeSubject}/${state.activeSection}/${state.activeTopicIndex}`];
  if (Number.isFinite(value)) requestAnimationFrame(() => { document.getElementById('main-content-pane').scrollTop = value; });
}
