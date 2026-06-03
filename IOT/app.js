// prep — Supports ES & IoT, Computer Networks, and Linux

// ============================================================
//  CONFIGURATION
// ============================================================
const CONFIG = {
  subjects: {
    iot: {
      label: "ES & IoT",
      examTime: new Date("2026-05-29T09:30:00+05:30").getTime(),
      storageKey: "es_iot_mastered_topics",
      storageKeyPractice: "es_iot_practice_answers",
      data: null, // populated on init → STUDY_DATA
      mcqs: null, // populated on init → IOT_MCQ_BANK
      themeColors: {
        st1: '#E07A5F',       // Peach
        st2: '#81B29A',       // Sage
        endTerm: '#B58A3D',   // Ochre
        cheatSheet: '#3D405B', // Navy
        practice: '#8C4735'   // Terracotta
      },
      sectionNames: {
        st1: 'ST-1 (Units 1-2)',
        st2: 'ST-2 (Units 3-4)',
        endTerm: 'End Term (Unit 5)',
        cheatSheet: 'Cheat Sheet',
        practice: 'Topic-Wise Practice Quiz'
      },
      tabs: [
        { id: 'st1', label: 'ST-1' },
        { id: 'st2', label: 'ST-2' },
        { id: 'endTerm', label: 'End Term' },
        { id: 'cheatSheet', label: 'Cheat Sheet' },
        { id: 'practice', label: 'MCQs' }
      ]
    },
    cn: {
      label: "Computer Networks",
      examTime: new Date("2026-06-02T09:30:00+05:30").getTime(),
      storageKey: "cn_mastered_topics",
      storageKeyPractice: "cn_practice_answers",
      data: null, // populated on init → CN_STUDY_DATA
      mcqs: null, // populated on init → CN_MCQ_BANK
      themeColors: {
        unit1_2: '#5F7AE0',   // Cornflower Blue
        unit3_4: '#7A9FBF',   // Steel Blue
        unit5_6: '#5F9E8A',   // Teal
        unit7_8: '#8A5F9E',   // Purple
        unit9: '#9E5F5F',     // Dusty Rose
        notes: '#B58A3D',     // Ochre
        cheatSheet: '#3D405B', // Navy
        practice: '#8C4735'   // Terracotta
      },
      sectionNames: {
        unit1_2: 'Units 1-2 — Foundations & Topologies',
        unit3_4: 'Units 3-4 — OSI & Physical Layer',
        unit5_6: 'Units 5-6 — Devices & Ethernet',
        unit7_8: 'Units 7-8 — Error Detection & MAC',
        unit9: 'Unit 9 — ARQ Protocols & Summary',
        notes: 'Complete Revision Notes',
        cheatSheet: 'Formula Cheat Sheet',
        practice: 'Topic-Wise Practice Quiz'
      },
      tabs: [
        { id: 'unit1_2', label: 'U1-2' },
        { id: 'unit3_4', label: 'U3-4' },
        { id: 'unit5_6', label: 'U5-6' },
        { id: 'unit7_8', label: 'U7-8' },
        { id: 'unit9', label: 'U9' },
        { id: 'notes', label: 'Notes' },
        { id: 'cheatSheet', label: 'Cheat Sheet' },
        { id: 'practice', label: 'MCQs' }
      ]
    },
    linux: {
      label: "Linux",
      examTime: new Date("2026-06-06T09:30:00+05:30").getTime(),
      storageKey: "linux_mastered_topics",
      storageKeyPractice: "linux_mcq_answers",
      storageKeyBash: "linux_bash_progress",
      data: {},
      mcqs: null,
      bashProblems: null,
      themeColors: {
        notes: '#3A8F65',
        cheatSheet: '#2F6F5E',
        linuxMcq: '#3A8F65',
        bashPractice: '#2F6F5E',
        linuxPlayground: '#358F66',
        practiceTest1: '#8A5F9E'
      },
      sectionNames: {
        notes: 'Linux Notes',
        cheatSheet: 'Linux Cheat Sheet',
        linuxMcq: 'Linux MCQs',
        bashPractice: 'Bash Practice',
        linuxPlayground: 'Terminal Playground',
        practiceTest1: 'PT1'
      },
      tabs: [
        { id: 'notes', label: 'Notes' },
        { id: 'cheatSheet', label: 'Cheat Sheet' },
        { id: 'linuxMcq', label: 'MCQs' },
        { id: 'bashPractice', label: 'Bash' },
        { id: 'linuxPlayground', label: 'Playground' },
        { id: 'practiceTest1', label: 'PT1' }
      ]
    },
    java: {
      label: "Java DSA",
      examTime: null,
      storageKey: "java_mastered_topics",
      storageKeyPractice: "java_practice_answers",
      storageKeyJava: "java_dsa_progress",
      data: {},
      mcqs: null,
      javaProblems: null,
      themeColors: {
        javaPractice: '#E07A5F',
      },
      sectionNames: {
        javaPractice: 'Java DSA Practice',
      },
      tabs: [
        { id: 'javaPractice', label: 'Practice' },
      ]
    }
  }
};

// ============================================================
//  STATE
// ============================================================
let state = {
  activeSubject: 'iot',
  activeSection: 'st1',
  activeTopicIndex: 0,
  searchQuery: '',
  mastered: {
    iot: { st1: [], st2: [], endTerm: [], cheatSheet: [], practice: [] },
    cn:  { unit1_2: [], unit3_4: [], unit5_6: [], unit7_8: [], unit9: [], notes: [], cheatSheet: [], practice: [] },
    linux: { notes: [], cheatSheet: [], linuxMcq: [], bashPractice: [], linuxPlayground: [], practiceTest1: [] },
    java: { javaPractice: [] }
  },
  practiceAnswers: {
    iot: {},
    cn: {},
    linux: {},
    java: {}
  },
  bashProgress: {
    linux: {}
  },
  javaProgress: {
    java: {}
  },
  smartNotes: [],
  starredMcqs: {
    iot: [],
    cn: [],
    linux: [],
    java: []
  },
  notesFilterSubject: 'all',
  showStarredOnly: false,
  playgroundShell: {
    cwd: '/home/student',
    vars: { '0': 'bash' },
    fs: null,
    directories: null,
    arrays: {},
    functions: {},
    archives: {},
    users: [],
    groups: [],
    services: {},
    firewallRules: [],
    lastStatus: 0,
    terminalHistory: [],
    historyIndex: -1,
    lvm: {
      pvs: [],
      vgs: {},
      lvs: {}
    }
  }
};

// ============================================================
//  DOM ELEMENTS
// ============================================================
const elements = {
  topNavBar: document.getElementById('top-nav-bar'),
  timerText: document.getElementById('timer-text'),
  mobileTimerText: document.getElementById('mobile-timer-text'),
  sidebar: document.getElementById('sidebar-pane'),
  menuToggleBtn: document.getElementById('menu-toggle-btn'),
  desktopSidebarToggle: document.getElementById('desktop-sidebar-toggle'),
  searchInput: document.getElementById('search-input'),
  topicList: document.getElementById('topic-list-container'),
  progressPercent: document.getElementById('progress-percentage'),
  progressBar: document.getElementById('progress-fill-bar'),
  welcomeScreen: document.getElementById('welcome-screen'),
  readingPane: document.getElementById('reading-pane'),
  sectionBadge: document.getElementById('topic-section-badge'),
  mainTitle: document.getElementById('topic-main-title'),
  contentArea: document.getElementById('reading-content-area'),
  prevBtn: document.getElementById('prev-topic-btn'),
  nextBtn: document.getElementById('next-topic-btn'),
  subjectBtns: document.querySelectorAll('.subject-btn'),
  mobileBrandTitle: document.getElementById('mobile-brand-title'),
  mobileSectionNav: document.getElementById('mobile-section-nav')
};

// ============================================================
//  INITIALISATION
// ============================================================
function init() {
  // Link data objects
  CONFIG.subjects.iot.data = typeof STUDY_DATA !== 'undefined' ? STUDY_DATA : {};
  CONFIG.subjects.cn.data = typeof CN_STUDY_DATA !== 'undefined' ? CN_STUDY_DATA : {};
  CONFIG.subjects.iot.mcqs = typeof IOT_MCQ_BANK !== 'undefined' ? IOT_MCQ_BANK : [];
  CONFIG.subjects.cn.mcqs = typeof CN_MCQ_BANK !== 'undefined' ? CN_MCQ_BANK : [];
  CONFIG.subjects.linux.mcqs = typeof LINUX_MCQ_BANK !== 'undefined' ? LINUX_MCQ_BANK : [];
  CONFIG.subjects.linux.bashProblems = typeof LINUX_BASH_PROBLEMS !== 'undefined' ? LINUX_BASH_PROBLEMS : [];
  CONFIG.subjects.linux.data = {
    notes: typeof LINUX_NOTES !== 'undefined' ? LINUX_NOTES : [],
    cheatSheet: typeof LINUX_CHEATSHEET !== 'undefined' ? LINUX_CHEATSHEET : [],
    practiceTest1: typeof LINUX_PRACTICE_TEST_1 !== 'undefined' ? LINUX_PRACTICE_TEST_1 : []
  };

  // Java data
  CONFIG.subjects.java.javaProblems = typeof JAVA_DSA_PROBLEMS !== 'undefined' ? JAVA_DSA_PROBLEMS : [];

  loadAllProgress();
  loadSmartNotes();
  loadStarredMcqs();
  setupEventListeners();
  updateTimer();
  setInterval(updateTimer, 60000);

  // Security Measures
  setupSecurity();

  renderLandingPage();
  initSmartNotesUI();
  
  if (typeof initThemeToggle === 'function') {
    initThemeToggle();
  }
}

function setupSecurity() {
  // Disable right click
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Disable specific key combos
  document.addEventListener('keydown', e => {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+H
    if (e.ctrlKey && (e.shiftKey && (e.keyCode === 73 || e.keyCode === 74) || e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 72)) {
      e.preventDefault();
      return false;
    }
    // Command+Option+I (Mac)
    if (e.metaKey && e.altKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
  });

  // Simple "Anti-Tamper" check - reduced sensitivity
  const check = () => {
    const start = Date.now();
    // debugger; // Removed to prevent potential layout issues in some browsers during init
    if (Date.now() - start > 100) {
      // document.body.innerHTML = ... // Disabled for now to ensure layout fix visibility
    }
  };
  setInterval(check, 2000);
}

// ============================================================
//  LOCAL STORAGE PROGRESS
// ============================================================
function loadAllProgress() {
  // Load IoT progress
  const iotSaved = localStorage.getItem(CONFIG.subjects.iot.storageKey);
  if (iotSaved) {
    try {
      const parsed = JSON.parse(iotSaved);
      Object.keys(state.mastered.iot).forEach(k => {
        if (parsed[k]) state.mastered.iot[k] = parsed[k];
      });
    } catch (e) { console.error("Error loading IoT progress", e); }
  }
  // Load CN progress
  const cnSaved = localStorage.getItem(CONFIG.subjects.cn.storageKey);
  if (cnSaved) {
    try {
      const parsed = JSON.parse(cnSaved);
      Object.keys(state.mastered.cn).forEach(k => {
        if (parsed[k]) state.mastered.cn[k] = parsed[k];
      });
    } catch (e) { console.error("Error loading CN progress", e); }
  }

  // Load practice progress
  const iotPracticeSaved = localStorage.getItem(CONFIG.subjects.iot.storageKeyPractice);
  if (iotPracticeSaved) {
    try {
      state.practiceAnswers.iot = JSON.parse(iotPracticeSaved) || {};
    } catch (e) { console.error("Error loading IoT practice progress", e); }
  }
  const cnPracticeSaved = localStorage.getItem(CONFIG.subjects.cn.storageKeyPractice);
  if (cnPracticeSaved) {
    try {
      state.practiceAnswers.cn = JSON.parse(cnPracticeSaved) || {};
    } catch (e) { console.error("Error loading CN practice progress", e); }
  }
  const linuxPracticeSaved = localStorage.getItem(CONFIG.subjects.linux.storageKeyPractice);
  if (linuxPracticeSaved) {
    try {
      state.practiceAnswers.linux = JSON.parse(linuxPracticeSaved) || {};
    } catch (e) { console.error("Error loading Linux MCQ progress", e); }
  }

  const linuxSaved = localStorage.getItem(CONFIG.subjects.linux.storageKey);
  if (linuxSaved) {
    try {
      const parsed = JSON.parse(linuxSaved);
      Object.keys(state.mastered.linux).forEach(k => {
        if (parsed[k]) state.mastered.linux[k] = parsed[k];
      });
    } catch (e) { console.error("Error loading Linux progress", e); }
  }

  const linuxBashSaved = localStorage.getItem(CONFIG.subjects.linux.storageKeyBash);
  if (linuxBashSaved) {
    try {
      state.bashProgress.linux = JSON.parse(linuxBashSaved) || {};
    } catch (e) { console.error("Error loading Linux Bash progress", e); }
  }

  // Load Java DSA progress
  const javaDsaSaved = localStorage.getItem(CONFIG.subjects.java.storageKeyJava);
  if (javaDsaSaved) {
    try {
      state.javaProgress.java = JSON.parse(javaDsaSaved) || {};
    } catch (e) { console.error("Error loading Java DSA progress", e); }
  }

  const javaSaved = localStorage.getItem(CONFIG.subjects.java.storageKey);
  if (javaSaved) {
    try {
      const parsed = JSON.parse(javaSaved);
      Object.keys(state.mastered.java).forEach(k => {
        if (parsed[k]) state.mastered.java[k] = parsed[k];
      });
    } catch (e) { console.error("Error loading Java general progress", e); }
  }
}

function saveProgress() {
  const subjectKey = CONFIG.subjects[state.activeSubject].storageKey;
  localStorage.setItem(subjectKey, JSON.stringify(state.mastered[state.activeSubject]));
}

function savePracticeProgress() {
  const subjectKeyPractice = CONFIG.subjects[state.activeSubject].storageKeyPractice;
  localStorage.setItem(subjectKeyPractice, JSON.stringify(state.practiceAnswers[state.activeSubject]));
}

function saveBashProgress() {
  const subjectConfig = CONFIG.subjects[state.activeSubject];
  if (!subjectConfig.storageKeyBash) return;
  localStorage.setItem(subjectConfig.storageKeyBash, JSON.stringify(state.bashProgress[state.activeSubject] || {}));
}

function saveJavaProgress() {
  const subjectConfig = CONFIG.subjects[state.activeSubject];
  if (!subjectConfig.storageKeyJava) return;
  localStorage.setItem(subjectConfig.storageKeyJava, JSON.stringify(state.javaProgress[state.activeSubject] || {}));
}

// Smart Notes persistence
function loadSmartNotes() {
  try {
    const saved = localStorage.getItem('prep_smart_notes');
    if (saved) {
      state.smartNotes = JSON.parse(saved) || [];
    }
  } catch (e) {
    // TODO(security): Log only non-sensitive error context
    state.smartNotes = [];
  }
}

function saveSmartNotes() {
  try {
    localStorage.setItem('prep_smart_notes', JSON.stringify(state.smartNotes));
  } catch (e) {
    // localStorage may be full — silently fail
  }
}

// Starred MCQs persistence
function loadStarredMcqs() {
  try {
    const saved = localStorage.getItem('prep_starred_mcqs');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.iot) state.starredMcqs.iot = parsed.iot;
      if (parsed.cn) state.starredMcqs.cn = parsed.cn;
      if (parsed.linux) state.starredMcqs.linux = parsed.linux;
    }
  } catch (e) {
    // TODO(security): Log only non-sensitive error context
  }
}

function saveStarredMcqs() {
  try {
    localStorage.setItem('prep_starred_mcqs', JSON.stringify(state.starredMcqs));
  } catch (e) {
    // localStorage may be full — silently fail
  }
}

function resetPracticeProgress() {
  state.practiceAnswers[state.activeSubject] = {};
  const subjectKeyPractice = CONFIG.subjects[state.activeSubject].storageKeyPractice;
  localStorage.removeItem(subjectKeyPractice);
  
  // Refresh UI
  renderPracticeUnit(state.activeTopicIndex);
  updateProgressBar();
  renderSidebar();
}

// ============================================================
//  EVENT LISTENERS
// ============================================================
function setupEventListeners() {
  // Subject switcher buttons
  elements.subjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subject = btn.getAttribute('data-subject');
      setActiveSubject(subject);
      closeMobileSidebar();
    });
  });

  // Mobile menu toggle
  elements.menuToggleBtn.addEventListener('click', () => {
    elements.sidebar.classList.toggle('mobile-open');
  });

  // Desktop sidebar toggle
  if (elements.desktopSidebarToggle) {
    elements.desktopSidebarToggle.addEventListener('click', () => {
      document.querySelector('.container').classList.toggle('sidebar-collapsed');
    });
  }

  // Search filter
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderSidebar();
  });

  // Prev navigation
  elements.prevBtn.addEventListener('click', () => {
    if (state.activeTopicIndex > 0) {
      selectTopic(state.activeTopicIndex - 1);
    }
  });

  // Next navigation — also marks current topic as mastered (in study sections)
  elements.nextBtn.addEventListener('click', () => {
    if (isMcqSection()) {
      const mcqBank = getActiveMcqBank();
      const totalUnits = mcqBank.length;
      if (state.activeTopicIndex < totalUnits - 1) {
        selectTopic(state.activeTopicIndex + 1);
      }
      return;
    }

    if (isBashSection()) {
      const bashProblems = getActiveBashProblems();
      if (state.activeTopicIndex < bashProblems.length - 1) {
        selectTopic(state.activeTopicIndex + 1);
      }
      return;
    }

    if (isJavaSection()) {
      const javaProblems = getActiveJavaProblems();
      if (state.activeTopicIndex < javaProblems.length - 1) {
        selectTopic(state.activeTopicIndex + 1);
      }
      return;
    }

    const subjectData = CONFIG.subjects[state.activeSubject].data;
    const totalTopics = subjectData[state.activeSection]?.length || 0;

    // Mark current topic as mastered
    const masteredList = state.mastered[state.activeSubject][state.activeSection];
    if (masteredList && !masteredList.includes(state.activeTopicIndex)) {
      toggleTopicMastery(state.activeSection, state.activeTopicIndex);
    }

    // Advance to next topic
    if (state.activeTopicIndex < totalTopics - 1) {
      selectTopic(state.activeTopicIndex + 1);
    } else {
      updateNextButtonState();
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    const isTyping = activeTag === 'input' || activeTag === 'textarea' || (document.activeElement && document.activeElement.isContentEditable);
    if (elements.searchInput === document.activeElement || isTyping) return;

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (state.activeTopicIndex > 0) selectTopic(state.activeTopicIndex - 1);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (isMcqSection()) {
        const mcqBank = getActiveMcqBank();
        const totalUnits = mcqBank.length;
        if (state.activeTopicIndex < totalUnits - 1) selectTopic(state.activeTopicIndex + 1);
      } else if (isBashSection()) {
        const bashProblems = getActiveBashProblems();
        if (state.activeTopicIndex < bashProblems.length - 1) selectTopic(state.activeTopicIndex + 1);
      } else if (isJavaSection()) {
        const javaProblems = getActiveJavaProblems();
        if (state.activeTopicIndex < javaProblems.length - 1) selectTopic(state.activeTopicIndex + 1);
      } else {
        const subjectData = CONFIG.subjects[state.activeSubject].data;
        const totalTopics = subjectData[state.activeSection]?.length || 0;
        if (state.activeTopicIndex < totalTopics - 1) selectTopic(state.activeTopicIndex + 1);
      }
    } else if (e.key === ' ' || e.key.toLowerCase() === 'm') {
      if (!isMcqSection() && !isBashSection() && !isJavaSection()) {
        toggleTopicMastery(state.activeSection, state.activeTopicIndex);
        e.preventDefault();
      }
    } else if (e.key.toLowerCase() === 'n') {
      toggleSmartNotesPanel();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      const panel = document.getElementById('smart-notes-panel');
      if (panel && panel.classList.contains('open')) {
        toggleSmartNotesPanel();
        e.preventDefault();
      }
    }
  });

  // MCQ interactive click handler (Quiz mode: Click-to-reveal)
  elements.contentArea.addEventListener('click', (e) => {
    const solveBtn = e.target.closest('.mcq-solve-btn');
    if (solveBtn) {
      const qId = parseInt(solveBtn.getAttribute('data-qid'));
      if (typeof openSolver === 'function') {
        openSolver(qId);
      }
      return;
    }

    const option = e.target.closest('.mcq-option');
    if (!option) return;

    const optionsContainer = option.closest('.mcq-options');
    if (!optionsContainer) return;

    // Lock options to prevent clicking after selection
    if (optionsContainer.classList.contains('answered')) return;

    const selectedOpt = option.getAttribute('data-option');
    const correctOpt = optionsContainer.getAttribute('data-correct');

    const allOptions = optionsContainer.querySelectorAll('.mcq-option');
    allOptions.forEach(opt => {
      const optLetter = opt.getAttribute('data-option');
      if (optLetter === correctOpt) {
        opt.classList.add('correct');
        if (!opt.querySelector('.correct-badge')) {
          const badge = document.createElement('span');
          badge.className = 'correct-badge';
          badge.textContent = 'Correct ✓';
          opt.appendChild(badge);
        }
      } else if (optLetter === selectedOpt) {
        opt.classList.add('incorrect');
        if (!opt.querySelector('.incorrect-badge')) {
          const badge = document.createElement('span');
          badge.className = 'incorrect-badge';
          badge.textContent = 'Incorrect ✗';
          opt.appendChild(badge);
        }
      }
    });

    optionsContainer.classList.add('answered');

    // Reveal explanation if present
    const card = option.closest('.mcq-card');
    if (card) {
      const exp = card.querySelector('.mcq-explanation');
      if (exp) {
        exp.style.display = 'block';
      }
    }

    // Special practice mode handling
    if (isMcqSection()) {
      const card = option.closest('.mcq-card');
      if (card) {
        const qId = parseInt(card.getAttribute('data-question-id'));
        state.practiceAnswers[state.activeSubject][qId] = selectedOpt;
        savePracticeProgress();
        updateQuizDashboardStats();
        renderSidebar(); // refresh sidebar to update checkboxes / fractions
        updateProgressBar(); // refresh sidebar progress bar
      }
    }
  });

  elements.welcomeScreen.addEventListener('click', (e) => {
    const subjectCard = e.target.closest('.landing-subject-card');
    if (!subjectCard) return;
    const subject = subjectCard.getAttribute('data-subject');
    if (subject) setActiveSubject(subject);
  });
}

function renderLandingPage() {
  document.body.classList.add('landing-mode');
  document.title = 'prep';
  elements.welcomeScreen.style.display = 'flex';
  elements.readingPane.style.display = 'none';
  const pgContainer = document.getElementById('playground-workspace-container');
  if (pgContainer) {
    pgContainer.style.display = 'none';
  }
  elements.topNavBar.innerHTML = '';
  if (elements.mobileSectionNav) elements.mobileSectionNav.innerHTML = '';
  elements.topicList.innerHTML = '';
  elements.progressPercent.textContent = 'Choose a desk';
  elements.progressBar.style.width = '0%';
  if (elements.mobileBrandTitle) elements.mobileBrandTitle.textContent = 'prep';

  elements.subjectBtns.forEach(btn => btn.classList.remove('active'));
  document.documentElement.style.setProperty('--active-accent', '#2F6F5E');

  elements.welcomeScreen.innerHTML = `
    <section class="landing-page" aria-label="prep landing page">
      <div class="landing-hero">
        <div class="landing-copy">
          <p class="landing-console-line">student@prep:~$ choose-your-battle</p>
          <h2>One study room. Four desks. Zero wandering.</h2>
          <p>prep keeps your notes, MCQs, progress, Linux terminal drills, and Java coding practice in one quiet workspace built for the last stretch before the paper.</p>
          <div class="landing-actions">
            <button class="landing-subject-card primary" data-subject="linux">
              <span class="landing-card-icon">&gt;_</span>
              <span>
                <strong>Linux Lab</strong>
                <small>MCQs plus a virtual Bash terminal</small>
              </span>
            </button>
            <button class="landing-subject-card" data-subject="iot">
              <span class="landing-card-icon">◎</span>
              <span>
                <strong>ES & IoT</strong>
                <small>Exam notes, cheat sheet, practice</small>
              </span>
            </button>
            <button class="landing-subject-card" data-subject="cn">
              <span class="landing-card-icon">▦</span>
              <span>
                <strong>Computer Networks</strong>
                <small>Layered units and quiz practice</small>
              </span>
            </button>
            <button class="landing-subject-card" data-subject="java">
              <span class="landing-card-icon">&lt;/&gt;</span>
              <span>
                <strong>Java DSA</strong>
                <small>LeetCode-style coding practice</small>
              </span>
            </button>
          </div>
        </div>
        <div class="landing-desk" aria-hidden="true">
          <div class="landing-window top">
            <div class="landing-window-bar"><span></span><span></span><span></span></div>
            <pre>mcq --mode exam
linux --lab bash
notes --focus st2</pre>
          </div>
          <div class="landing-window bottom">
            <div class="landing-meter"><span style="width: 65%;"></span></div>
            <div class="landing-check-row"><b></b><span>progress saved locally</span></div>
            <div class="landing-check-row"><b></b><span>answers hidden until asked</span></div>
            <div class="landing-check-row"><b></b><span>practice built from your syllabus</span></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
//  SUBJECT SWITCHING
// ============================================================
function setActiveSubject(subjectId) {
  document.body.classList.remove('landing-mode');
  document.body.classList.remove('subject-iot', 'subject-cn', 'subject-linux', 'subject-java');
  document.body.classList.add('subject-' + subjectId);
  state.activeSubject = subjectId;
  const subjectConfig = CONFIG.subjects[subjectId];

  // Update document title
  document.title = `${subjectConfig.label} — prep`;

  // Update subject buttons
  elements.subjectBtns.forEach(btn => {
    if (btn.getAttribute('data-subject') === subjectId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update mobile header title dynamically
  if (elements.mobileBrandTitle) {
    elements.mobileBrandTitle.textContent = subjectConfig.label + " Prep";
  }

  // Re-render top nav tabs for this subject
  renderTopNav(subjectId);

  // Update timer instantly
  updateTimer();

  // Set default section to first tab of this subject
  const firstTab = subjectConfig.tabs[0].id;
  setActiveSection(firstTab);
}

function renderTopNav(subjectId) {
  const tabs = CONFIG.subjects[subjectId].tabs;
  elements.topNavBar.innerHTML = '';
  if (elements.mobileSectionNav) elements.mobileSectionNav.innerHTML = '';

  tabs.forEach((tab, i) => {
    // Desktop Button
    const btn = document.createElement('button');
    btn.setAttribute('data-section', tab.id);
    btn.textContent = tab.label;
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      setActiveSection(tab.id);
      closeMobileSidebar();
    });
    elements.topNavBar.appendChild(btn);

    // Mobile Button
    if (elements.mobileSectionNav) {
      const mobBtn = document.createElement('button');
      mobBtn.setAttribute('data-section', tab.id);
      mobBtn.textContent = tab.label;
      if (i === 0) mobBtn.classList.add('active');
      mobBtn.addEventListener('click', () => {
        setActiveSection(tab.id);
        closeMobileSidebar();
      });
      elements.mobileSectionNav.appendChild(mobBtn);
    }
  });
}

// ============================================================
//  SECTION SWITCHING
// ============================================================
function isMcqSection(sectionId = state.activeSection) {
  if (sectionId === 'practice' || sectionId === 'linuxMcq') return true;
  if (sectionId === 'practiceTest1' && state.activeSection === 'practiceTest1' && state.activeTopicIndex === 0) return true;
  return false;
}

function isBashSection(sectionId = state.activeSection) {
  if (sectionId === 'bashPractice') return true;
  if (sectionId === 'practiceTest1' && state.activeSection === 'practiceTest1' && state.activeTopicIndex >= 2) return true;
  return false;
}

function isPlaygroundSection(sectionId = state.activeSection) {
  return sectionId === 'linuxPlayground';
}

function isJavaSection(sectionId = state.activeSection) {
  return sectionId === 'javaPractice';
}

function getActiveMcqBank() {
  return CONFIG.subjects[state.activeSubject].mcqs || [];
}

function getActiveBashProblems() {
  return CONFIG.subjects[state.activeSubject].bashProblems || [];
}

function getActiveJavaProblems() {
  return CONFIG.subjects[state.activeSubject].javaProblems || [];
}

function setActiveSection(sectionId) {
  state.activeSection = sectionId;
  state.activeTopicIndex = 0;
  state.searchQuery = '';
  elements.searchInput.value = '';

  const pgContainer = document.getElementById('playground-workspace-container');
  if (pgContainer) {
    pgContainer.style.display = isPlaygroundSection(sectionId) ? 'flex' : 'none';
  }

  if (isPlaygroundSection(sectionId)) {
    elements.searchInput.placeholder = "Search files...";
  } else {
    elements.searchInput.placeholder = "Search topics...";
  }

  // Handle Bash/Practice/Playground section layout
  const mainContentPane = document.getElementById('main-content-pane');
  const container = document.querySelector('.container');
  if (isPlaygroundSection(sectionId)) {
    mainContentPane.classList.add('bash-mode', 'playground-mode');
    mainContentPane.classList.remove('practice-mode', 'java-mode');
    container.classList.add('practice-active');
  } else if (isJavaSection(sectionId)) {
    mainContentPane.classList.add('bash-mode', 'java-mode');
    mainContentPane.classList.remove('practice-mode', 'playground-mode');
    container.classList.add('practice-active');
  } else if (isBashSection(sectionId)) {
    mainContentPane.classList.add('bash-mode');
    mainContentPane.classList.remove('practice-mode', 'playground-mode', 'java-mode');
    container.classList.add('practice-active');
  } else if (isMcqSection(sectionId)) {
    mainContentPane.classList.add('practice-mode');
    mainContentPane.classList.remove('bash-mode', 'playground-mode', 'java-mode');
    container.classList.add('practice-active');
  } else {
    mainContentPane.classList.remove('bash-mode', 'practice-mode', 'playground-mode', 'java-mode');
    container.classList.remove('practice-active');
  }

  // Set accent color for this section
  const color = CONFIG.subjects[state.activeSubject].themeColors[sectionId] || '#B58A3D';
  document.documentElement.style.setProperty('--active-accent', color);

  // Highlight desktop nav tab
  const navBtns = elements.topNavBar.querySelectorAll('button');
  navBtns.forEach(btn => {
    if (btn.getAttribute('data-section') === sectionId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Highlight mobile nav tab
  if (elements.mobileSectionNav) {
    const mobBtns = elements.mobileSectionNav.querySelectorAll('button');
    mobBtns.forEach(btn => {
      if (btn.getAttribute('data-section') === sectionId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  updateProgressBar();
  renderSidebar();

  if (isPlaygroundSection()) {
    selectTopic(0);
    return;
  }

  if (isMcqSection()) {
    const mcqBank = getActiveMcqBank();
    if (mcqBank.length > 0) {
      selectTopic(0);
    } else {
      elements.welcomeScreen.style.display = 'flex';
      elements.readingPane.style.display = 'none';
    }
    return;
  }

  if (isBashSection()) {
    const bashProblems = getActiveBashProblems();
    if (bashProblems.length > 0) {
      selectTopic(0);
    } else {
      elements.welcomeScreen.style.display = 'flex';
      elements.readingPane.style.display = 'none';
    }
    return;
  }

  if (isJavaSection()) {
    const javaProblems = getActiveJavaProblems();
    if (javaProblems.length > 0) {
      selectTopic(0);
    } else {
      elements.welcomeScreen.style.display = 'flex';
      elements.readingPane.style.display = 'none';
    }
    return;
  }

  const subjectData = CONFIG.subjects[state.activeSubject].data;
  if (subjectData[sectionId] && subjectData[sectionId].length > 0) {
    selectTopic(0);
  } else {
    elements.welcomeScreen.style.display = 'flex';
    elements.readingPane.style.display = 'none';
  }
}

// ============================================================
//  SIDEBAR RENDERING
// ============================================================
function renderSidebar() {
  if (isPlaygroundSection()) {
    renderPlaygroundSidebar();
    return;
  }

  elements.topicList.innerHTML = '';

  // Helper: extract subtitle from title like "Part C1 — Some Description"
  function extractSubtitle(title) {
    const sep = title.indexOf(' \u2014 ');
    return sep !== -1 ? title.slice(sep + 3) : title;
  }

  if (state.activeSection !== 'practiceTest1') {

    // ── Bash Practice: number badge + title ─────────────────────────────
    if (isBashSection()) {
      const problems = getActiveBashProblems();
      problems.forEach((problem, index) => {
        const searchText = `${problem.title} ${problem.tags.join(' ')}`.toLowerCase();
        if (!searchText.includes(state.searchQuery)) return;

        const progress = state.bashProgress[state.activeSubject][problem.id] || {};
        const isSolved = progress.solved === true;
        const isActive = index === state.activeTopicIndex;

        const button = document.createElement('button');
        button.className = `topic-item topic-item--rich ${isActive ? 'active' : ''} ${isSolved ? 'mastered' : ''}`;
        button.setAttribute('data-index', index);

        // Number badge (replaces checkbox — changes colour on solve/active)
        const badge = document.createElement('span');
        badge.className = 'topic-num-badge';
        badge.textContent = index + 1;
        button.appendChild(badge);

        // Text block
        const inner = document.createElement('div');
        inner.className = 'topic-item-inner';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'topic-title-text';
        titleSpan.textContent = problem.title;
        inner.appendChild(titleSpan);

        // Subtitle: first tag gives context
        if (problem.tags && problem.tags.length > 0) {
          const sub = document.createElement('span');
          sub.className = 'topic-subtitle';
          sub.textContent = problem.tags.slice(0, 3).join(' · ');
          inner.appendChild(sub);
        }

        button.appendChild(inner);
        button.addEventListener('click', () => { selectTopic(index); closeMobileSidebar(); });
        elements.topicList.appendChild(button);
      });
      return;
    }

    // ── Java DSA Practice: grouped by section, difficulty badges ─────────
    if (isJavaSection()) {
      const problems = getActiveJavaProblems();
      const sections = typeof JAVA_SECTIONS !== 'undefined' ? JAVA_SECTIONS : [];
      let lastSection = null;

      problems.forEach((problem, index) => {
        const searchText = `${problem.title} ${problem.section} ${problem.tags.join(' ')}`.toLowerCase();
        if (!searchText.includes(state.searchQuery)) return;

        // Section group divider
        if (problem.section !== lastSection) {
          lastSection = problem.section;
          const sectionMeta = sections.find(s => s.id === problem.section);
          const divider = document.createElement('div');
          divider.className = 'sidebar-group-label';
          divider.textContent = (sectionMeta ? sectionMeta.icon + ' ' : '') + problem.section;
          elements.topicList.appendChild(divider);
        }

        const progress = state.javaProgress[state.activeSubject]?.[problem.id] || {};
        const isSolved = progress.solved === true;
        const isActive = index === state.activeTopicIndex;

        const button = document.createElement('button');
        button.className = `topic-item topic-item--rich ${isActive ? 'active' : ''} ${isSolved ? 'mastered' : ''}`;
        button.setAttribute('data-index', index);

        // Number badge
        const badge = document.createElement('span');
        badge.className = 'topic-num-badge';
        badge.textContent = index + 1;
        button.appendChild(badge);

        // Text block
        const inner = document.createElement('div');
        inner.className = 'topic-item-inner';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'topic-title-text';
        titleSpan.textContent = problem.title;
        inner.appendChild(titleSpan);

        // Subtitle: difficulty + first tag
        const sub = document.createElement('span');
        sub.className = 'topic-subtitle';
        sub.textContent = problem.difficulty + ' · ' + problem.tags.slice(0, 2).join(' · ');
        inner.appendChild(sub);

        button.appendChild(inner);
        button.addEventListener('click', () => { selectTopic(index); closeMobileSidebar(); });
        elements.topicList.appendChild(button);
      });
      return;
    }

    // ── MCQ Sections: keep existing checkbox style but add question count subtitle ──
    if (isMcqSection()) {
      const mcqBank = getActiveMcqBank();
      mcqBank.forEach((unitObj, index) => {
        const titleLower = unitObj.unitName.toLowerCase();
        if (!titleLower.includes(state.searchQuery)) return;

        const isActive = index === state.activeTopicIndex;
        const unitQuestions = unitObj.questions || [];
        const answeredCount = unitQuestions.filter(q =>
          state.practiceAnswers[state.activeSubject][q.id] !== undefined
        ).length;
        const isCompleted = answeredCount === unitQuestions.length && unitQuestions.length > 0;

        const button = document.createElement('button');
        button.className = `topic-item topic-item--rich ${isActive ? 'active' : ''} ${isCompleted ? 'mastered' : ''}`;
        button.setAttribute('data-index', index);

        // Checkbox circle (kept for MCQ since mastery is answer-based)
        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox-circle';
        checkbox.style.marginTop = '0.1rem';
        if (isCompleted) {
          checkbox.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        } else if (answeredCount > 0) {
          checkbox.style.borderColor = 'var(--active-accent)';
          checkbox.innerHTML = `<span style="font-size: 8px; font-weight: 700; color: var(--active-accent);">${answeredCount}</span>`;
        }
        button.appendChild(checkbox);

        const inner = document.createElement('div');
        inner.className = 'topic-item-inner';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'topic-title-text';
        titleSpan.textContent = unitObj.unitName;
        inner.appendChild(titleSpan);

        const sub = document.createElement('span');
        sub.className = 'topic-subtitle';
        sub.textContent = `${answeredCount} / ${unitQuestions.length} answered`;
        inner.appendChild(sub);

        button.appendChild(inner);
        button.addEventListener('click', () => { selectTopic(index); closeMobileSidebar(); });
        elements.topicList.appendChild(button);
      });
      return;
    }

  }  // end: if (state.activeSection !== 'practiceTest1')

  // ── PT1 Section: type badge + label + subtitle ───────────────────────
  if (state.activeSubject === 'linux' && state.activeSection === 'practiceTest1') {
    const pt1Topics = CONFIG.subjects['linux'].data['practiceTest1'] || [];
    const typeIcon = { mcq: '◉', subjective: '✎', coding: '⌨' };
    let lastType = null;
    pt1Topics.forEach((topic, index) => {
      const displayLabel = topic.sidebarLabel || topic.title;
      if (!displayLabel.toLowerCase().includes(state.searchQuery)) return;

      // "Coding" group divider
      if (topic.type === 'coding' && lastType !== 'coding') {
        const divider = document.createElement('div');
        divider.className = 'sidebar-group-label';
        divider.textContent = 'Coding Drills';
        elements.topicList.appendChild(divider);
      }
      lastType = topic.type;

      const isActive = index === state.activeTopicIndex;
      const button = document.createElement('button');
      button.className = `topic-item topic-item--rich ${isActive ? 'active' : ''}`;
      button.setAttribute('data-index', index);

      const badge = document.createElement('span');
      badge.className = `pt1-type-badge pt1-type-${topic.type}`;
      badge.textContent = typeIcon[topic.type] || '·';
      button.appendChild(badge);

      const inner = document.createElement('div');
      inner.className = 'topic-item-inner';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'topic-title-text';
      titleSpan.textContent = displayLabel;
      inner.appendChild(titleSpan);

      // Subtitle: extract the description part after " — "
      if (topic.type === 'coding' || topic.type === 'subjective') {
        const desc = extractSubtitle(topic.title);
        if (desc && desc !== displayLabel) {
          const sub = document.createElement('span');
          sub.className = 'topic-subtitle';
          sub.textContent = desc;
          inner.appendChild(sub);
        }
      } else if (topic.type === 'mcq') {
        const sub = document.createElement('span');
        sub.className = 'topic-subtitle';
        sub.textContent = '25 multiple-choice questions';
        inner.appendChild(sub);
      }

      button.appendChild(inner);
      button.addEventListener('click', () => { selectTopic(index); closeMobileSidebar(); });
      elements.topicList.appendChild(button);
    });
    return;
  }

  // ── Generic Reading Topics (IoT / CN): number badge + title + section hint ──
  const subjectData = CONFIG.subjects[state.activeSubject].data;
  const topics = subjectData[state.activeSection] || [];

  topics.forEach((topic, index) => {
    const titleLower = topic.title.toLowerCase();
    if (!titleLower.includes(state.searchQuery)) return;

    const isMastered = state.mastered[state.activeSubject][state.activeSection].includes(index);
    const isActive = index === state.activeTopicIndex;

    const button = document.createElement('button');
    button.className = `topic-item topic-item--rich ${isActive ? 'active' : ''} ${isMastered ? 'mastered' : ''}`;
    button.setAttribute('data-index', index);

    // Number badge
    const badge = document.createElement('span');
    badge.className = 'topic-num-badge';
    badge.textContent = index + 1;
    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTopicMastery(state.activeSection, index);
    });
    button.appendChild(badge);

    const inner = document.createElement('div');
    inner.className = 'topic-item-inner';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'topic-title-text';
    titleSpan.textContent = topic.title;
    inner.appendChild(titleSpan);

    // Subtitle: topic type hint if available, otherwise first line of html (skip)
    if (topic.subtitle) {
      const sub = document.createElement('span');
      sub.className = 'topic-subtitle';
      sub.textContent = topic.subtitle;
      inner.appendChild(sub);
    }

    button.appendChild(inner);
    button.addEventListener('click', () => { selectTopic(index); closeMobileSidebar(); });
    elements.topicList.appendChild(button);
  });
}


// ============================================================
//  TOPIC SELECTION
// ============================================================
function selectTopic(index) {
  state.activeTopicIndex = index;

  const pgContainer = document.getElementById('playground-workspace-container');
  if (pgContainer) {
    pgContainer.style.display = isPlaygroundSection() ? 'flex' : 'none';
  }

  if (isPlaygroundSection()) {
    renderPlayground();
    return;
  }

  if (state.activeSubject === 'linux' && state.activeSection === 'practiceTest1') {
    renderPracticeTest1Item(index);
    return;
  }

  if (isBashSection()) {
    renderBashProblem(index);
    return;
  }

  if (isJavaSection()) {
    renderJavaProblem(index);
    return;
  }

  if (isMcqSection()) {
    renderPracticeUnit(index);
    return;
  }

  const subjectData = CONFIG.subjects[state.activeSubject].data;
  const topics = subjectData[state.activeSection];

  if (!topics || topics.length === 0 || !topics[index]) return;

  const topic = topics[index];

  elements.welcomeScreen.style.display = 'none';
  elements.readingPane.style.display = 'block';

  const sectionName = CONFIG.subjects[state.activeSubject].sectionNames[state.activeSection] || state.activeSection;
  elements.sectionBadge.textContent = sectionName;
  elements.mainTitle.textContent = topic.title;
  elements.contentArea.innerHTML = topic.html;

  // Restore scroll behavior for reading
  elements.contentArea.style.overflowY = 'auto';
  elements.contentArea.style.padding = '3rem 4.5rem'; 
  elements.contentArea.style.display = 'block';
  // Re-run KaTeX auto-render on the content area
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(elements.contentArea, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError: false
    });
  }

  // Shuffle MCQs if any are embedded in the HTML
  shuffleMcqOptions(elements.contentArea);

  // Update sidebar active state
  const sidebarButtons = elements.topicList.querySelectorAll('.topic-item');
  sidebarButtons.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-index'));
    btn.classList.toggle('active', idx === index);
  });

  elements.prevBtn.disabled = index === 0;
  elements.prevBtn.style.opacity = index === 0 ? '0.5' : '1';

  updateNextButtonState();

  elements.readingPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('main-content-pane').scrollTop = 0;
}

// ============================================================
//  MASTERY TRACKING
// ============================================================
function toggleTopicMastery(sectionId, index) {
  const masteredList = state.mastered[state.activeSubject][sectionId];
  const listIndex = masteredList.indexOf(index);
  let isMastered = false;

  if (listIndex > -1) {
    masteredList.splice(listIndex, 1);
  } else {
    masteredList.push(index);
    isMastered = true;
  }

  saveProgress();
  updateProgressBar();
  updateNextButtonState();

  // Update sidebar item without full redraw
  const sidebarButtons = elements.topicList.querySelectorAll('.topic-item');
  sidebarButtons.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-index'));
    if (idx === index) {
      const checkbox = btn.querySelector('.checkbox-circle');
      if (isMastered) {
        btn.classList.add('mastered');
        checkbox.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      } else {
        btn.classList.remove('mastered');
        checkbox.innerHTML = '';
      }
    }
  });
}

function updateNextButtonState() {
  const subjectData = CONFIG.subjects[state.activeSubject].data;
  const topics = subjectData[state.activeSection];
  if (!topics || topics.length === 0) return;

  const index = state.activeTopicIndex;
  const totalTopics = topics.length;
  const isLastTopic = index === totalTopics - 1;
  const isMastered = state.mastered[state.activeSubject][state.activeSection].includes(index);

  if (isLastTopic) {
    if (isMastered) {
      elements.nextBtn.innerHTML = 'Section Mastered! 🎉';
      elements.nextBtn.style.backgroundColor = '#EEF6F2';
      elements.nextBtn.style.borderColor = '#CDE3D5';
      elements.nextBtn.style.color = '#4A7A60';
      elements.nextBtn.style.opacity = '0.7';
      elements.nextBtn.style.cursor = 'default';
    } else {
      elements.nextBtn.innerHTML = 'Complete & Finish Section 🏁';
      elements.nextBtn.style.backgroundColor = 'var(--active-accent)';
      elements.nextBtn.style.borderColor = 'var(--active-accent)';
      elements.nextBtn.style.color = '#FFFDFB';
      elements.nextBtn.style.opacity = '1';
      elements.nextBtn.style.cursor = 'pointer';
    }
  } else {
    elements.nextBtn.innerHTML = 'Complete & Next Topic <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
    elements.nextBtn.style.backgroundColor = '';
    elements.nextBtn.style.borderColor = '';
    elements.nextBtn.style.color = '';
    elements.nextBtn.style.opacity = '';
    elements.nextBtn.style.cursor = '';
  }
}

function updateProgressBar() {
  if (isBashSection()) {
    const problems = getActiveBashProblems();
    const solvedCount = problems.filter(problem => {
      const progress = state.bashProgress[state.activeSubject][problem.id] || {};
      return progress.solved === true;
    }).length;
    const total = problems.length;
    const percentage = total > 0 ? Math.round((solvedCount / total) * 100) : 0;
    elements.progressPercent.textContent = `${percentage}% Solved (${solvedCount}/${total})`;
    elements.progressBar.style.width = `${percentage}%`;
    return;
  }

  if (isJavaSection()) {
    const problems = getActiveJavaProblems();
    const solvedCount = problems.filter(problem => {
      const progress = state.javaProgress[state.activeSubject]?.[problem.id] || {};
      return progress.solved === true;
    }).length;
    const total = problems.length;
    const percentage = total > 0 ? Math.round((solvedCount / total) * 100) : 0;
    elements.progressPercent.textContent = `${percentage}% Solved (${solvedCount}/${total})`;
    elements.progressBar.style.width = `${percentage}%`;
    return;
  }

  if (isMcqSection()) {
    const mcqBank = getActiveMcqBank();
    const allQuestions = mcqBank.flatMap(u => u.questions || []);
    const total = allQuestions.length || 100;
    
    let answeredCount = 0;
    allQuestions.forEach(q => {
      if (state.practiceAnswers[state.activeSubject][q.id] !== undefined) {
        answeredCount++;
      }
    });
    
    const percentage = total > 0 ? Math.round((answeredCount / total) * 100) : 0;
    elements.progressPercent.textContent = `${percentage}% Answered (${answeredCount}/${total})`;
    elements.progressBar.style.width = `${percentage}%`;
    return;
  }

  const subjectData = CONFIG.subjects[state.activeSubject].data;
  const topics = subjectData[state.activeSection] || [];
  const total = topics.length;

  if (total === 0) {
    elements.progressPercent.textContent = '0% Mastered';
    elements.progressBar.style.width = '0%';
    return;
  }

  const masteredCount = (state.mastered[state.activeSubject][state.activeSection] || []).length;
  const percentage = Math.round((masteredCount / total) * 100);
  elements.progressPercent.textContent = `${percentage}% Mastered (${masteredCount}/${total})`;
  elements.progressBar.style.width = `${percentage}%`;
}

// ============================================================
//  BASH SIMULATION & CHECKING (Imported from bash-engine.js)
// ============================================================

function evaluateBashProblem(problem, script, mode) {
  const tests = mode === 'run'
    ? problem.tests.filter(test => test.visible)
    : problem.tests;

  const usesEchoShortcut = problem.kind === 'terminal' && problem.id !== 'bash-040' && tokenizeBash(script).some(line => {
    const command = line.split('|')[0].trim();
    return /^echo\b|^printf\b/.test(command);
  });

  return tests.map(test => {
    if (usesEchoShortcut) {
      return {
        name: test.name,
        visible: test.visible,
        input: test.input,
        expectedOutput: test.expectedOutput,
        actualOutput: '',
        error: 'Terminal lab tasks must execute Linux commands instead of echoing the answer.',
        passed: false
      };
    }
    let scriptToRun = '';
    if (problem.prependTestCode) {
      scriptToRun += problem.prependTestCode + '\n';
    }
    scriptToRun += script;
    if (problem.appendTestCode) {
      scriptToRun += '\n' + problem.appendTestCode;
    }
    const result = simulateBash(scriptToRun, test.input);
    const passed = !result.error && outputsMatch(result.output, test.expectedOutput);
    return {
      name: test.name,
      visible: test.visible,
      input: test.input,
      expectedOutput: test.expectedOutput,
      actualOutput: result.output,
      error: result.error,
      passed
    };
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderBashResults(results) {
  if (!results.length) {
    return '<p class="bash-idle-state">Run sample tests or submit all tests to see output comparison.</p>';
  }

  return results.map(result => `
    <div class="bash-result-card ${result.passed ? 'passed' : 'failed'}">
      <div class="bash-result-title">
        <strong>${escapeHtml(result.name)}</strong>
        <span>${result.passed ? 'Passed' : 'Failed'}</span>
      </div>
      ${result.visible || !result.passed ? `
        ${result.visible ? `
        <div class="bash-result-grid">
          <div><label>Input</label><pre>${escapeHtml(result.input)}</pre></div>
          <div><label>Expected</label><pre>${escapeHtml(result.expectedOutput)}</pre></div>
          <div><label>Your Output</label><pre>${escapeHtml(result.actualOutput || '(empty)')}</pre></div>
        </div>
        ` : '<p class="bash-hidden-case">Hidden case failed. Re-check your logic against edge cases without relying on the sample output.</p>'}
      ` : '<p class="bash-hidden-case">Hidden case passed.</p>'}
    </div>
  `).join('');
}

function runBashProblem(problem, mode) {
  const editor = document.getElementById('bash-code-editor');
  const code = editor ? editor.value : '';
  const results = evaluateBashProblem(problem, code, mode);
  const passedCount = results.filter(result => result.passed).length;
  const solved = mode === 'submit' && passedCount === results.length;

  state.bashProgress[state.activeSubject][problem.id] = {
    ...state.bashProgress[state.activeSubject][problem.id],
    code,
    codeVersion: problem.version || 2,
    lastResults: results,
    lastMode: mode,
    solved: solved || (state.bashProgress[state.activeSubject][problem.id] || {}).solved === true
  };
  saveBashProgress();

  const body = document.getElementById('bash-results-body');
  if (body) body.innerHTML = renderBashResults(results);

  const summary = document.getElementById('bash-results-summary');
  if (summary) summary.textContent = `${passedCount} passed / ${results.length} total`;

  const panel = document.querySelector('.bash-results-panel');
  if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  renderSidebar();
  updateProgressBar();
}

function renderBashProblem(index) {
  const problems = getActiveBashProblems();
  const problem = problems[index];
  if (!problem) return;

  const progress = state.bashProgress[state.activeSubject][problem.id] || {};
  const problemVersion = problem.version || 2;
  const currentCode = progress.codeVersion === problemVersion
    ? progress.code
    : (problem.starterCode || '#!/usr/bin/env bash\n\n');
  const lastResults = progress.lastResults || [];
  const passedCount = lastResults.filter(result => result.passed).length;
  const resultSummary = lastResults.length
    ? `${passedCount} passed / ${lastResults.length} total`
    : 'No run yet';

  elements.welcomeScreen.style.display = 'none';
  elements.readingPane.style.display = 'block';
  // Note: Badge and Title are hidden via CSS in bash-mode
  
  const examplesHtml = problem.examples.map(example => `
    <div class="bash-example">
      <label>Input</label>
      <pre>${escapeHtml(example.input)}</pre>
      <label>Expected Output</label>
      <pre>${escapeHtml(example.expectedOutput)}</pre>
    </div>
  `).join('');

  const constraintsHtml = problem.constraints.map(item => `<li>${escapeHtml(item)}</li>`).join('');
  const labReferenceHtml = problem.kind === 'terminal' ? `
    <div class="bash-section-block bash-lab-reference">
      <h4>Virtual Linux Lab</h4>
      <div class="bash-lab-grid">
        <div>
          <strong>Files</strong>
          <code>/etc/passwd</code>
          <code>/etc/shadow</code>
          <code>/var/log/server.log</code>
          <code>/var/log/app.log</code>
        </div>
        <div>
          <strong>Commands</strong>
          <code>cat</code>
          <code>head</code>
          <code>tail</code>
          <code>grep</code>
          <code>wc</code>
          <code>sort</code>
          <code>cut</code>
          <code>ls</code>
          <code>touch</code>
          <code>mkdir</code>
          <code>tar</code>
          <code>ufw</code>
          <code>netplan</code>
        </div>
      </div>
    </div>
  ` : '';
  const scriptSupportedHtml = problem.kind === 'terminal' ? '' : `
    <div class="bash-section-block bash-supported-syntax">
      <h4>Supported in this editor</h4>
      <p style="font-size: 0.9rem; margin: 0;">This runs in a browser bash simulator (not a real shell). You can use <code>read</code>, <code>if/elif/else</code>, <code>case</code>, <code>for</code>/<code>while</code>/<code>until</code>, <code>$((arithmetic))</code>, <code>\${var:pos:len}</code>, pipes, and <code>&gt;</code> redirection.</p>
    </div>
  `;

  elements.contentArea.innerHTML = `
    <div class="bash-workspace" id="bash-workspace">
      <section class="bash-description-pane" id="bash-desc-pane">
        <div class="bash-problem-header">
          <div class="bash-header-top-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
             <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--active-accent); letter-spacing: 0.05em;">${CONFIG.subjects[state.activeSubject].sectionNames[state.activeSection]}</span>
             <div class="bash-nav-mini" style="display: flex; gap: 0.4rem;">
                <button id="bash-mini-prev" class="nav-prev-btn" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;" ${index === 0 ? 'disabled style="opacity:0.5"' : ''}>←</button>
                <button id="bash-mini-next" class="nav-next-btn" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;" ${index === problems.length - 1 ? 'disabled style="opacity:0.5"' : ''}>→</button>
             </div>
          </div>
          <h3 style="margin-top: 0; border-left: none; padding-left: 0; font-size: 1.4rem;">${escapeHtml(problem.title)}</h3>
          <div class="bash-tags">
            <span>${escapeHtml(problem.difficulty)}</span>
            ${problem.kind === 'terminal' ? '<span>Terminal Lab</span>' : '<span>Script Logic</span>'}
            ${problem.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}
          </div>
        </div>
        <div class="bash-section-block">
          <h4>Problem</h4>
          <p style="font-size: 0.95rem;">${escapeHtml(problem.prompt)}</p>
        </div>
        <div class="bash-section-block">
          <h4>Examples</h4>
          ${examplesHtml}
        </div>
        <div class="bash-section-block">
          <h4>Constraints</h4>
          <ul style="font-size: 0.9rem;">${constraintsHtml}</ul>
        </div>
        ${scriptSupportedHtml}
        ${labReferenceHtml}
        <div class="bash-section-block bash-solution-block">
          <button class="bash-solution-toggle" id="bash-solution-toggle">Show Answer</button>
          <pre class="bash-solution-code" id="bash-solution-code" hidden>${escapeHtml(problem.solutionCode || '')}</pre>
        </div>
      </section>

      <div class="resizer-h" id="resizer-bash-h">
        <div class="resizer-notch"></div>
      </div>

      <section class="bash-editor-pane">
        <div class="bash-editor-toolbar">
          <span class="bash-editor-title">${problem.kind === 'terminal' ? 'Linux Lab Editor' : 'Bash Script Editor'}</span>
          <div class="bash-editor-actions">
            <button class="bash-reset-btn" id="bash-reset-btn">Reset</button>
            <button class="bash-run-btn" id="bash-run-btn">Run</button>
            <button class="bash-submit-btn" id="bash-submit-btn">Submit</button>
          </div>
        </div>
        <div class="bash-editor-wrapper">
          <pre id="bash-highlighter" class="bash-highlighter" aria-hidden="true"><code class="language-bash"></code></pre>
          <textarea class="bash-code-editor" id="bash-code-editor" spellcheck="false">${escapeHtml(currentCode)}</textarea>
        </div>
        
        <div class="resizer-v" id="resizer-bash-v">
          <div class="resizer-notch"></div>
        </div>

        <div class="bash-results-panel" id="bash-results-pane" style="height: 300px; min-height: 100px; display: flex; flex-direction: column;">
          <div class="bash-results-header" style="padding: 0.75rem 1.5rem; background: #FAF8F6; border-bottom: 1px solid var(--border-color); flex-shrink: 0; display: flex; justify-content: space-between;">
            <strong style="font-size: 0.85rem;">Test Results</strong>
            <span id="bash-results-summary" style="font-size: 0.8rem; font-weight: 600;">${resultSummary}</span>
          </div>
          <div id="bash-results-body" style="flex: 1; overflow-y: auto; padding: 1rem;">${renderBashResults(lastResults)}</div>
        </div>
      </section>
    </div>
  `;

  // Ensure content area doesn't have its own scroll or padding
  elements.contentArea.style.overflow = 'hidden';
  elements.contentArea.style.padding = '0';


  // Initialize resizers
  initResizer('resizer-bash-h', 'bash-desc-pane', 'horizontal');
  initResizer('resizer-bash-v', 'bash-results-pane', 'vertical', true);

  const editor = document.getElementById('bash-code-editor');
  
  // Syntax Highlighting & Syncing
  const highlighterPre = document.getElementById('bash-highlighter');
  if (editor && highlighterPre) {
    editor.addEventListener('scroll', () => {
      highlighterPre.scrollTop = editor.scrollTop;
      highlighterPre.scrollLeft = editor.scrollLeft;
    });
  }

  editor.addEventListener('input', event => {
    state.bashProgress[state.activeSubject][problem.id] = {
      ...state.bashProgress[state.activeSubject][problem.id],
      code: event.target.value,
      codeVersion: problemVersion
    };
    saveBashProgress();
    if (window.updateBashHighlighting) window.updateBashHighlighting();
  });

  // Auto-closing bracket/quote pairs
  const AUTO_CLOSE_PAIRS = {
    '(': ')',
    '[': ']',
    '{': '}',
    '"': '"',
    "'": "'",
    '`': '`'
  };
  editor.addEventListener('keydown', (e) => {
    const open = e.key;
    if (!AUTO_CLOSE_PAIRS.hasOwnProperty(open)) return;
    const close = AUTO_CLOSE_PAIRS[open];
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.slice(start, end);
    e.preventDefault();
    const before = editor.value.slice(0, start);
    const after = editor.value.slice(end);
    editor.value = before + open + selected + close + after;
    // Place cursor between the pair (or after selection)
    const newCursor = start + 1 + selected.length;
    editor.setSelectionRange(newCursor, newCursor);
    // Trigger input event so state/highlighting updates
    editor.dispatchEvent(new Event('input'));
  });
  
  // Initial highlight
  if (window.updateBashHighlighting) window.updateBashHighlighting();

  document.getElementById('bash-run-btn').addEventListener('click', () => runBashProblem(problem, 'run'));
  document.getElementById('bash-submit-btn').addEventListener('click', () => runBashProblem(problem, 'submit'));
  document.getElementById('bash-reset-btn').addEventListener('click', () => {
    const starter = problem.starterCode || '#!/usr/bin/env bash\n\n';
    editor.value = starter;
    state.bashProgress[state.activeSubject][problem.id] = {
      ...state.bashProgress[state.activeSubject][problem.id],
      code: starter,
      codeVersion: problemVersion,
      lastResults: [],
      lastMode: null
    };
    saveBashProgress();
    if (window.updateBashHighlighting) window.updateBashHighlighting();
    const body = document.getElementById('bash-results-body');
    if (body) body.innerHTML = renderBashResults([]);
    const summary = document.getElementById('bash-results-summary');
    if (summary) summary.textContent = 'No run yet';
    editor.focus();
  });

  const solutionToggle = document.getElementById('bash-solution-toggle');
  const solutionCode = document.getElementById('bash-solution-code');
  if (solutionToggle && solutionCode) {
    solutionToggle.addEventListener('click', () => {
      const isHidden = solutionCode.hasAttribute('hidden');
      if (isHidden) {
        solutionCode.removeAttribute('hidden');
        solutionToggle.textContent = 'Hide Answer';
      } else {
        solutionCode.setAttribute('hidden', '');
        solutionToggle.textContent = 'Show Answer';
      }
    });
  }
  
  // Mini nav listeners
  const miniPrev = document.getElementById('bash-mini-prev');
  const miniNext = document.getElementById('bash-mini-next');
  if (miniPrev) miniPrev.addEventListener('click', () => selectTopic(index - 1));
  if (miniNext) miniNext.addEventListener('click', () => selectTopic(index + 1));

  const sidebarButtons = elements.topicList.querySelectorAll('.topic-item');
  sidebarButtons.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-index'));
    btn.classList.toggle('active', idx === index);
  });

  elements.prevBtn.disabled = index === 0;
  elements.prevBtn.style.opacity = index === 0 ? '0.5' : '1';

  const isLastProblem = index === problems.length - 1;
  if (isLastProblem) {
    elements.nextBtn.innerHTML = 'Practice Complete';
    elements.nextBtn.style.backgroundColor = '#EEF6F2';
    elements.nextBtn.style.borderColor = '#CDE3D5';
    elements.nextBtn.style.color = '#4A7A60';
    elements.nextBtn.style.opacity = '0.7';
    elements.nextBtn.style.cursor = 'default';
  } else {
    elements.nextBtn.innerHTML = 'Next Problem <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
    elements.nextBtn.style.backgroundColor = '';
    elements.nextBtn.style.borderColor = '';
    elements.nextBtn.style.color = '';
    elements.nextBtn.style.opacity = '';
    elements.nextBtn.style.cursor = 'pointer';
  }

  elements.readingPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('main-content-pane').scrollTop = 0;
}

// ============================================================
//  JAVA DSA RENDERING & EXECUTION
// ============================================================

function renderJavaResults(results) {
  if (!results || results.length === 0) {
    return '<p class="bash-idle-state">Run sample tests or submit all tests to see output comparison.</p>';
  }

  return results.map(result => `
    <div class="bash-result-card ${result.passed ? 'passed' : 'failed'}">
      <div class="bash-result-title">
        <strong>${escapeHtml(result.name)}</strong>
        <span>${result.passed ? 'Passed' : 'Failed'}</span>
      </div>
      ${result.visible || !result.passed ? `
        ${result.visible ? `
        <div class="bash-result-grid">
          <div><label>Input</label><pre>${escapeHtml(result.input)}</pre></div>
          <div><label>Expected</label><pre>${escapeHtml(result.expectedOutput)}</pre></div>
          <div><label>Your Output</label><pre>${escapeHtml(result.actualOutput || '(empty)')}</pre></div>
        </div>
        ` : '<p class="bash-hidden-case">Hidden case failed. Re-check your logic against edge cases.</p>'}
        ${result.error ? `<div class="java-error-detail"><pre>${escapeHtml(result.error)}</pre></div>` : ''}
      ` : '<p class="bash-hidden-case">Hidden case passed.</p>'}
    </div>
  `).join('');
}

function renderJavaProblem(index) {
  const problems = getActiveJavaProblems();
  const problem = problems[index];
  if (!problem) return;

  const progress = state.javaProgress[state.activeSubject]?.[problem.id] || {};
  const currentCode = progress.code || problem.starterCode;
  const lastResults = progress.lastResults || [];
  const passedCount = lastResults.filter(r => r.passed).length;
  const resultSummary = lastResults.length
    ? `${passedCount} passed / ${lastResults.length} total`
    : 'No run yet';
  const lastExecTime = progress.executionTime ? ` (${progress.executionTime}ms)` : '';

  elements.welcomeScreen.style.display = 'none';
  elements.readingPane.style.display = 'block';

  const examplesHtml = problem.examples.map(ex => `
    <div class="bash-example">
      <label>Input</label>
      <pre>${escapeHtml(ex.input)}</pre>
      <label>Expected Output</label>
      <pre>${escapeHtml(ex.output)}</pre>
    </div>
  `).join('');

  const constraintsHtml = problem.constraints.map(c => `<li>${escapeHtml(c)}</li>`).join('');

  const difficultyClass = problem.difficulty === 'Easy' ? 'java-diff-easy' :
                           problem.difficulty === 'Medium' ? 'java-diff-medium' : 'java-diff-hard';

  elements.contentArea.innerHTML = `
    <div class="bash-workspace" id="java-workspace">
      <section class="bash-description-pane" id="java-desc-pane">
        <div class="bash-problem-header">
          <div class="bash-header-top-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
             <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--active-accent); letter-spacing: 0.05em;">${escapeHtml(problem.section)}</span>
             <div class="bash-nav-mini" style="display: flex; gap: 0.4rem;">
                <button id="java-mini-prev" class="nav-prev-btn" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;" ${index === 0 ? 'disabled style="opacity:0.5"' : ''}>←</button>
                <button id="java-mini-next" class="nav-next-btn" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;" ${index === problems.length - 1 ? 'disabled style="opacity:0.5"' : ''}>→</button>
             </div>
          </div>
          <h3 style="margin-top: 0; border-left: none; padding-left: 0; font-size: 1.4rem;">${escapeHtml(problem.title)}</h3>
          <div class="bash-tags">
            <span class="${difficultyClass}">${escapeHtml(problem.difficulty)}</span>
            ${problem.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}
          </div>
        </div>
        <div class="bash-section-block">
          <h4>Problem</h4>
          <p style="font-size: 0.95rem;">${problem.prompt}</p>
        </div>
        <div class="bash-section-block">
          <h4>Examples</h4>
          ${examplesHtml}
        </div>
        <div class="bash-section-block">
          <h4>Constraints</h4>
          <ul style="font-size: 0.9rem;">${constraintsHtml}</ul>
        </div>
        <div class="bash-section-block">
          <h4 style="margin-bottom: 0.3rem;">Method Signature</h4>
          <pre style="background: #1e1e2e; color: #cdd6f4; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.85rem; overflow-x: auto;"><code>${escapeHtml(problem.methodName)}(...)</code></pre>
        </div>
        <div class="bash-section-block bash-solution-block">
          <button class="bash-solution-toggle" id="java-solution-toggle">Show Answer</button>
          <pre class="bash-solution-code" id="java-solution-code" hidden>${escapeHtml(problem.solutionCode || '')}</pre>
        </div>
      </section>

      <div class="resizer-h" id="resizer-java-h">
        <div class="resizer-notch"></div>
      </div>

      <section class="bash-editor-pane">
        <div class="bash-editor-toolbar">
          <span class="bash-editor-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 0.3rem;"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            Java Editor
          </span>
          <div class="bash-editor-actions" style="display: flex; gap: 0.4rem; align-items: center;">
            <button class="bash-reset-btn" id="java-piston-settings-btn" title="Compiler Settings" style="padding: 0.6rem; display: none; align-items: center; justify-content: center; height: 34px; width: 34px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </button>
            <button class="bash-reset-btn" id="java-reset-btn">Reset</button>
            <button class="bash-run-btn" id="java-run-btn">▶ Run</button>
            <button class="bash-submit-btn" id="java-submit-btn">Submit</button>
          </div>
        </div>
        <div class="bash-editor-wrapper">
          <pre id="java-highlighter" class="bash-highlighter" aria-hidden="true"><code class="language-java"></code></pre>
          <textarea class="bash-code-editor java-code-editor" id="java-code-editor" spellcheck="false">${escapeHtml(currentCode)}</textarea>
        </div>
        
        <div class="resizer-v" id="resizer-java-v">
          <div class="resizer-notch"></div>
        </div>

        <div class="bash-results-panel" id="java-results-pane" style="height: 300px; min-height: 100px; display: flex; flex-direction: column;">
          <div class="bash-results-header" style="padding: 0.75rem 1.5rem; background: #FAF8F6; border-bottom: 1px solid var(--border-color); flex-shrink: 0; display: flex; justify-content: space-between;">
            <strong style="font-size: 0.85rem;">Test Results</strong>
            <span id="java-results-summary" style="font-size: 0.8rem; font-weight: 600;">${resultSummary}${lastExecTime}</span>
          </div>
          <div id="java-results-body" style="flex: 1; overflow-y: auto; padding: 1rem;">${renderJavaResults(lastResults)}</div>
        </div>
      </section>
    </div>
  `;

  // Ensure content area doesn't have its own scroll
  elements.contentArea.style.overflow = 'hidden';
  elements.contentArea.style.padding = '0';

  // Initialize resizers
  initResizer('resizer-java-h', 'java-desc-pane', 'horizontal');
  initResizer('resizer-java-v', 'java-results-pane', 'vertical', true);

  const editor = document.getElementById('java-code-editor');

  // Syntax Highlighting & Syncing
  const highlighterPre = document.getElementById('java-highlighter');
  if (editor && highlighterPre) {
    editor.addEventListener('scroll', () => {
      highlighterPre.scrollTop = editor.scrollTop;
      highlighterPre.scrollLeft = editor.scrollLeft;
    });
  }

  // Draft persistence on input
  editor.addEventListener('input', event => {
    if (!state.javaProgress[state.activeSubject]) state.javaProgress[state.activeSubject] = {};
    state.javaProgress[state.activeSubject][problem.id] = {
      ...state.javaProgress[state.activeSubject][problem.id],
      code: event.target.value
    };
    saveJavaProgress();
    if (window.updateJavaHighlighting) window.updateJavaHighlighting();
  });

  // Auto-closing bracket/quote pairs
  const AUTO_CLOSE_PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
  editor.addEventListener('keydown', (e) => {
    // Tab key → insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const before = editor.value.slice(0, start);
      const after = editor.value.slice(end);
      editor.value = before + '    ' + after;
      editor.setSelectionRange(start + 4, start + 4);
      editor.dispatchEvent(new Event('input'));
      return;
    }
    const open = e.key;
    if (!AUTO_CLOSE_PAIRS.hasOwnProperty(open)) return;
    const close = AUTO_CLOSE_PAIRS[open];
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.slice(start, end);
    e.preventDefault();
    const before = editor.value.slice(0, start);
    const after = editor.value.slice(end);
    editor.value = before + open + selected + close + after;
    const newCursor = start + 1 + selected.length;
    editor.setSelectionRange(newCursor, newCursor);
    editor.dispatchEvent(new Event('input'));
  });

  // Initial highlight
  if (window.updateJavaHighlighting) window.updateJavaHighlighting();

  // Settings Dialog Button Listener
  const settingsBtn = document.getElementById('java-piston-settings-btn');
  const settingsDialog = document.getElementById('java-settings-dialog');
  const settingsUrlInput = document.getElementById('java-settings-url');
  const settingsKeyInput = document.getElementById('java-settings-key');
  const settingsCloseBtn = document.getElementById('java-settings-close-btn');
  const settingsSaveBtn = document.getElementById('java-settings-save-btn');
  const settingsResetBtn = document.getElementById('java-settings-reset-btn');

  if (settingsBtn && settingsDialog) {
    settingsBtn.addEventListener('click', () => {
      // Load current settings
      let settings = { apiUrl: '/api/execute', apiKey: '' };
      try {
        const saved = localStorage.getItem('prep_piston_settings');
        if (saved) settings = JSON.parse(saved);
      } catch (e) {}

      if (settingsUrlInput) settingsUrlInput.value = settings.apiUrl;
      if (settingsKeyInput) settingsKeyInput.value = settings.apiKey;

      settingsDialog.showModal();
    });
  }

  if (settingsCloseBtn && settingsDialog) {
    settingsCloseBtn.addEventListener('click', () => {
      settingsDialog.close();
    });
  }

  if (settingsSaveBtn && settingsDialog) {
    settingsSaveBtn.addEventListener('click', () => {
      const settings = {
        apiUrl: settingsUrlInput ? settingsUrlInput.value.trim() : '/api/execute',
        apiKey: settingsKeyInput ? settingsKeyInput.value.trim() : ''
      };
      try {
        localStorage.setItem('prep_piston_settings', JSON.stringify(settings));
      } catch (e) {}
      settingsDialog.close();
    });
  }

  if (settingsResetBtn) {
    settingsResetBtn.addEventListener('click', () => {
      if (settingsUrlInput) settingsUrlInput.value = '/api/execute';
      if (settingsKeyInput) settingsKeyInput.value = '';
    });
  }

  // Run / Submit button handlers
  document.getElementById('java-run-btn').addEventListener('click', () => runJavaProblem(problem, 'run'));
  document.getElementById('java-submit-btn').addEventListener('click', () => runJavaProblem(problem, 'submit'));
  
  // Reset button
  document.getElementById('java-reset-btn').addEventListener('click', () => {
    editor.value = problem.starterCode;
    if (!state.javaProgress[state.activeSubject]) state.javaProgress[state.activeSubject] = {};
    state.javaProgress[state.activeSubject][problem.id] = {
      code: problem.starterCode,
      lastResults: [],
      solved: false
    };
    saveJavaProgress();
    if (window.updateJavaHighlighting) window.updateJavaHighlighting();
    const body = document.getElementById('java-results-body');
    if (body) body.innerHTML = renderJavaResults([]);
    const summary = document.getElementById('java-results-summary');
    if (summary) summary.textContent = 'No run yet';
    editor.focus();
  });

  // Solution toggle
  const solutionToggle = document.getElementById('java-solution-toggle');
  const solutionCode = document.getElementById('java-solution-code');
  if (solutionToggle && solutionCode) {
    solutionToggle.addEventListener('click', () => {
      const isHidden = solutionCode.hasAttribute('hidden');
      if (isHidden) {
        solutionCode.removeAttribute('hidden');
        solutionToggle.textContent = 'Hide Answer';
      } else {
        solutionCode.setAttribute('hidden', '');
        solutionToggle.textContent = 'Show Answer';
      }
    });
  }

  // Mini nav listeners
  const miniPrev = document.getElementById('java-mini-prev');
  const miniNext = document.getElementById('java-mini-next');
  if (miniPrev) miniPrev.addEventListener('click', () => selectTopic(index - 1));
  if (miniNext) miniNext.addEventListener('click', () => selectTopic(index + 1));

  // Update sidebar active state
  const sidebarButtons = elements.topicList.querySelectorAll('.topic-item');
  sidebarButtons.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-index'));
    btn.classList.toggle('active', idx === index);
  });

  // Nav buttons
  elements.prevBtn.disabled = index === 0;
  elements.prevBtn.style.opacity = index === 0 ? '0.5' : '1';

  const isLastProblem = index === problems.length - 1;
  if (isLastProblem) {
    elements.nextBtn.innerHTML = 'Practice Complete';
    elements.nextBtn.style.backgroundColor = '#EEF6F2';
    elements.nextBtn.style.borderColor = '#CDE3D5';
    elements.nextBtn.style.color = '#4A7A60';
    elements.nextBtn.style.opacity = '0.7';
    elements.nextBtn.style.cursor = 'default';
  } else {
    elements.nextBtn.innerHTML = 'Next Problem <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
    elements.nextBtn.style.backgroundColor = '';
    elements.nextBtn.style.borderColor = '';
    elements.nextBtn.style.color = '';
    elements.nextBtn.style.opacity = '';
    elements.nextBtn.style.cursor = 'pointer';
  }

  elements.readingPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('main-content-pane').scrollTop = 0;
}

async function runJavaProblem(problem, mode) {
  const editor = document.getElementById('java-code-editor');
  const code = editor ? editor.value : '';
  const runBtn = document.getElementById('java-run-btn');
  const submitBtn = document.getElementById('java-submit-btn');
  const body = document.getElementById('java-results-body');
  const summary = document.getElementById('java-results-summary');

  // Loading state
  const activeBtn = mode === 'run' ? runBtn : submitBtn;
  const originalText = activeBtn.textContent;
  activeBtn.textContent = 'Running...';
  activeBtn.disabled = true;
  runBtn.disabled = true;
  submitBtn.disabled = true;

  if (body) body.innerHTML = '<div class="java-loading"><div class="java-spinner"></div><p>Compiling & running on server...</p></div>';

  try {
    const result = await executeJavaProblem(problem, code, mode);

    // Network error
    if (result.networkError) {
      if (body) {
        if (result.networkError.includes('HTTP 401')) {
          // Load current settings
          let settings = { apiUrl: '/api/execute', apiKey: '' };
          try {
            const saved = localStorage.getItem('prep_piston_settings');
            if (saved) settings = JSON.parse(saved);
          } catch (e) {}

          body.innerHTML = `
            <div class="java-error-panel">
              <h4>⚠️ Execution Service Unauthorized (HTTP 401)</h4>
              <p style="margin-bottom: 0.75rem;">The compilation proxy is unauthorized. Please configure a custom URL or set the authorization key.</p>
              <p style="font-size: 0.82rem; margin-bottom: 1rem; color: var(--text-secondary);">
                Ensure your proxy key matches the backend server, or point directly to a local compiler instance.
              </p>
              
              <div class="java-settings-inline-panel">
                <div style="margin-bottom: 0.75rem; display: flex; flex-direction: column;">
                  <label style="font-size: 0.8rem; font-weight: 600; margin-bottom: 0.2rem; color: var(--text-primary);">Custom Execution API URL</label>
                  <input type="text" id="java-settings-url-inline" class="java-settings-input-inline" value="${escapeHtml(settings.apiUrl)}">
                  <span class="java-dialog-help">To run locally: <code>node judge.js</code> inside <code>judge-service</code> then set URL to <code>http://localhost:5005/execute</code></span>
                </div>
                <div style="margin-bottom: 0.75rem; display: flex; flex-direction: column;">
                  <label style="font-size: 0.8rem; font-weight: 600; margin-bottom: 0.2rem; color: var(--text-primary);">API Key (Optional)</label>
                  <input type="password" id="java-settings-key-inline" class="java-settings-input-inline" value="${escapeHtml(settings.apiKey)}" placeholder="Enter API token">
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.75rem;">
                  <button id="java-settings-reset-inline-btn" class="bash-reset-btn" style="padding: 0.45rem 0.8rem; font-size: 0.8rem; border-radius: 4px;">Reset Defaults</button>
                  <button id="java-settings-save-inline-btn" class="bash-submit-btn" style="padding: 0.45rem 0.8rem; font-size: 0.8rem; border-radius: 4px;">Save & Retry</button>
                </div>
              </div>
            </div>
          `;

          // Attach inline form event listeners
          document.getElementById('java-settings-reset-inline-btn').addEventListener('click', () => {
            const urlInput = document.getElementById('java-settings-url-inline');
            const keyInput = document.getElementById('java-settings-key-inline');
            if (urlInput) urlInput.value = '/api/execute';
            if (keyInput) keyInput.value = '';
          });

          document.getElementById('java-settings-save-inline-btn').addEventListener('click', () => {
            const urlInput = document.getElementById('java-settings-url-inline');
            const keyInput = document.getElementById('java-settings-key-inline');
            const newSettings = {
              apiUrl: urlInput ? urlInput.value.trim() : '/api/execute',
              apiKey: keyInput ? keyInput.value.trim() : ''
            };
            try {
              localStorage.setItem('prep_piston_settings', JSON.stringify(newSettings));
            } catch (e) {}
            // Retry compilation automatically
            runJavaProblem(problem, mode);
          });

        } else {
          body.innerHTML = `<div class="java-error-panel"><h4>⚠️ Connection Error</h4><p>${escapeHtml(result.networkError)}</p></div>`;
        }
      }
      if (summary) summary.textContent = 'Error';
      return;
    }

    // Compile error
    if (result.compileError) {
      if (body) body.innerHTML = `<div class="java-error-panel"><h4>❌ Compilation Error</h4><pre>${escapeHtml(result.compileError)}</pre></div>`;
      if (summary) summary.textContent = `Compile Error (${result.executionTime}ms)`;
      return;
    }

    // TLE
    if (result.timedOut) {
      if (body) body.innerHTML = `<div class="java-error-panel"><h4>⏱ Time Limit Exceeded</h4><p>Your code took too long to execute. Check for infinite loops or optimize your algorithm.</p></div>`;
      if (summary) summary.textContent = 'TLE';
      return;
    }

    // Test results
    const passedCount = result.results.filter(r => r.passed).length;
    const solved = mode === 'submit' && passedCount === result.results.length && result.results.length > 0;

    // Persist results
    if (!state.javaProgress[state.activeSubject]) state.javaProgress[state.activeSubject] = {};
    state.javaProgress[state.activeSubject][problem.id] = {
      ...state.javaProgress[state.activeSubject][problem.id],
      code,
      lastResults: result.results,
      lastMode: mode,
      executionTime: result.executionTime,
      solved: solved || (state.javaProgress[state.activeSubject][problem.id] || {}).solved === true
    };
    saveJavaProgress();

    if (body) body.innerHTML = renderJavaResults(result.results);
    if (summary) summary.textContent = `${passedCount} passed / ${result.results.length} total (${result.executionTime}ms)`;

    const panel = document.querySelector('.bash-results-panel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    renderSidebar();
    updateProgressBar();

  } finally {
    activeBtn.textContent = originalText;
    activeBtn.disabled = false;
    runBtn.disabled = false;
    submitBtn.disabled = false;
  }
}

// ============================================================
//  PRACTICE MODE RENDERING & HELPERS
// ============================================================
function shuffleMcqOptions(container) {
  const mcqGroups = container.querySelectorAll('.mcq-options');
  mcqGroups.forEach(group => {
    // Only shuffle if not already answered
    if (group.classList.contains('answered')) return;

    const options = Array.from(group.querySelectorAll('.mcq-option'));
    if (options.length <= 1) return;

    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    // Clear and re-append in new order
    // We preserve the group's structure and just re-order children
    options.forEach((opt, index) => {
      // Update display letter (A, B, C, D...)
      const letterSpan = opt.querySelector('.option-letter');
      if (letterSpan) {
        const displayLetter = String.fromCharCode(65 + index); // 65 is 'A'
        letterSpan.textContent = displayLetter + ')';
      }
      group.appendChild(opt);
    });
  });
}

function parseOption(text) {
  const isCorrect = text.includes('✓');
  let cleanText = text;
  let explanation = '';

  if (isCorrect) {
    const match = text.match(/^\*\*(.*?)\s*✓\s*\*\*\s*(.*)/s);
    if (match) {
      cleanText = match[1].trim();
      explanation = match[2].trim();
    } else {
      cleanText = text.replace(/✓/g, '').replace(/\*\*/g, '').trim();
    }
  } else {
    cleanText = text.replace(/\*\*/g, '').trim();
  }

  if (explanation) {
    explanation = explanation.replace(/^[\*\(\s]+|[\*\)\s]+$/g, '').trim();
  }

  return {
    text: cleanText,
    explanation: explanation
  };
}

function updateQuizDashboardStats() {
  const mcqBank = getActiveMcqBank();
  const allQuestions = mcqBank.flatMap(u => u.questions || []);
  const totalQuestions = allQuestions.length || 100;
  
  let answeredCount = 0;
  let correctCount = 0;
  
  allQuestions.forEach(q => {
    const savedAns = state.practiceAnswers[state.activeSubject][q.id];
    if (savedAns !== undefined) {
      answeredCount++;
      if (savedAns === q.correct) {
        correctCount++;
      }
    }
  });

  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const statValues = elements.contentArea.querySelectorAll('.quiz-stat-value');
  if (statValues.length >= 2) {
    statValues[0].innerHTML = `${correctCount}<span style="font-size: 1rem; font-weight: 500; color: var(--text-secondary);"> / ${totalQuestions}</span>`;
    statValues[1].innerHTML = `${accuracy}<span style="font-size: 1.25rem; font-weight: 600;">%</span>`;
    if (statValues.length >= 3) {
      statValues[2].innerHTML = `${answeredCount}<span style="font-size: 1rem; font-weight: 500; color: var(--text-secondary);"> / ${totalQuestions}</span>`;
    }
  }
}

function renderPracticeUnit(unitIndex) {
  if (typeof closeSolver === 'function') closeSolver();
  const mcqBank = getActiveMcqBank();
  const unitObj = mcqBank[unitIndex];
  if (!unitObj) return;

  elements.welcomeScreen.style.display = 'none';
  elements.readingPane.style.display = 'block';

  const allQuestions = mcqBank.flatMap(u => u.questions || []);
  const totalQuestions = allQuestions.length || 100;
  
  let answeredCount = 0;
  let correctCount = 0;
  
  allQuestions.forEach(q => {
    const savedAns = state.practiceAnswers[state.activeSubject][q.id];
    if (savedAns !== undefined) {
      answeredCount++;
      if (savedAns === q.correct) {
        correctCount++;
      }
    }
  });

  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  let dashboardHtml = `
    <div class="quiz-dashboard-header">
      <h3>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--active-accent);"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        Practice Dashboard
      </h3>
      <div class="quiz-stats-grid">
        <div class="quiz-stat-card">
          <span class="quiz-stat-label">Score</span>
          <span class="quiz-stat-value">${correctCount} / ${totalQuestions}</span>
        </div>
        <div class="quiz-stat-card">
          <span class="quiz-stat-label">Accuracy</span>
          <span class="quiz-stat-value">${accuracy}%</span>
        </div>
      </div>
      <div class="quiz-controls" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button class="starred-filter-btn ${state.showStarredOnly ? 'active' : ''}" id="starred-filter-btn">
          ★ Starred Only
        </button>
        <button class="quiz-reset-btn" id="quiz-reset-progress-btn" style="flex: 1; font-size: 0.8rem;">
          Reset Progress
        </button>
      </div>
    </div>
  `;

  // Filter for starred-only mode
  const unitQuestions = unitObj.questions || [];
  const displayQuestions = state.showStarredOnly
    ? unitQuestions.filter(q => (state.starredMcqs[state.activeSubject] || []).includes(q.id))
    : unitQuestions;

  const questionsHtml = displayQuestions.map((q, idx) => {
    const qNum = idx + 1;
    const savedAns = state.practiceAnswers[state.activeSubject][q.id];
    const isAnswered = savedAns !== undefined;
    const isStarred = (state.starredMcqs[state.activeSubject] || []).includes(q.id);
    let unitExplanation = '';

    const optionsListHtml = Object.keys(q.options).map(optLetter => {
      const rawText = q.options[optLetter];
      const parsed = parseOption(rawText);
      
      if (optLetter === q.correct && parsed.explanation) {
        unitExplanation = parsed.explanation;
      } else if (optLetter === q.correct && q.explanation) {
        unitExplanation = q.explanation;
      }

      let optionClasses = 'mcq-option';
      let badgeHtml = '';

      if (isAnswered) {
        if (optLetter === q.correct) {
          optionClasses += ' correct';
          badgeHtml = '<span class="correct-badge">Correct ✓</span>';
        } else if (optLetter === savedAns) {
          optionClasses += ' incorrect';
          badgeHtml = '<span class="incorrect-badge">Incorrect ✗</span>';
        }
      }

      return `
        <div class="${optionClasses}" data-option="${optLetter}">
          <span class="option-letter">${optLetter.toUpperCase()})</span>
          <span class="option-text">${parsed.text}</span>
          ${badgeHtml}
        </div>
      `;
    }).join('');

    const answeredClass = isAnswered ? ' answered' : '';
    const explanationStyle = isAnswered && unitExplanation ? 'display: block;' : 'display: none;';

    return `
      <div class="mcq-card" data-question-id="${q.id}" data-correct-answer="${q.correct}">
        <div class="mcq-card-header">
          <div class="mcq-question"><strong>Q${qNum}.</strong> ${q.question}</div>
          <div class="mcq-actions" style="display: flex; gap: 0.5rem; align-items: center; flex-shrink: 0;">
            ${typeof SOLVER_MAPPING !== 'undefined' && SOLVER_MAPPING[q.id] ? `
            <button class="mcq-solve-btn" data-qid="${q.id}" title="Open Interactive Step-by-Step Solver" style="background: none; border: 1px solid var(--border-color); border-radius: 4px; padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 700; color: var(--active-accent); cursor: pointer; display: flex; align-items: center; gap: 0.25rem; transition: background-color 0.2s;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              Solve
            </button>
            ` : ''}
            <button class="mcq-star-btn ${isStarred ? 'starred' : ''}" data-qid="${q.id}" title="Star this question">${isStarred ? '★' : '☆'}</button>
          </div>
        </div>
        <div class="mcq-options${answeredClass}" data-correct="${q.correct}">
          ${optionsListHtml}
        </div>
        ${unitExplanation ? `
        <div class="mcq-explanation" style="${explanationStyle}">
          <strong>Explanation:</strong> ${unitExplanation}
        </div>
        ` : ''}
      </div>
    `;
  }).join('');

  elements.contentArea.innerHTML = `
    <div class="practice-workspace">
      <section class="practice-info-pane" id="practice-info-pane">
        <div class="bash-problem-header">
           <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--active-accent); letter-spacing: 0.05em;">${CONFIG.subjects[state.activeSubject].sectionNames[state.activeSection]}</span>
           <h3 style="margin-top: 0.5rem; border-left: none; padding-left: 0; font-size: 1.4rem;">${unitObj.unitName}</h3>
        </div>
        ${dashboardHtml}
        <div style="margin-top: 2rem; font-size: 0.85rem; color: var(--text-secondary);">
          <p>Select the correct option for each question. Your progress is saved automatically.</p>
        </div>
      </section>

      <div class="resizer-h" id="resizer-practice-h">
        <div class="resizer-notch"></div>
      </div>

      <section class="practice-questions-pane" style="flex: 1; overflow-y: auto; padding: 2rem; background: var(--bg-color);">
        ${questionsHtml}
      </section>
    </div>
  `;

  // Ensure content area doesn't have its own scroll or padding
  elements.contentArea.style.overflow = 'hidden';
  elements.contentArea.style.padding = '0';


  // Initialize resizer
  initResizer('resizer-practice-h', 'practice-info-pane', 'horizontal');

  const resetBtn = document.getElementById('quiz-reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to reset your practice progress for this subject? This will clear all your answers.")) {
        resetPracticeProgress();
      }
    });
  }

  // Starred filter toggle
  const starredFilterBtn = document.getElementById('starred-filter-btn');
  if (starredFilterBtn) {
    starredFilterBtn.addEventListener('click', () => {
      state.showStarredOnly = !state.showStarredOnly;
      renderPracticeUnit(unitIndex);
    });
  }

  // Star button click handlers
  elements.contentArea.querySelectorAll('.mcq-star-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const qId = parseInt(btn.getAttribute('data-qid'));
      if (isNaN(qId)) return;
      const starredList = state.starredMcqs[state.activeSubject] || [];
      const idx = starredList.indexOf(qId);
      if (idx > -1) {
        starredList.splice(idx, 1);
        btn.classList.remove('starred');
        btn.textContent = '\u2606';
      } else {
        starredList.push(qId);
        btn.classList.add('starred');
        btn.textContent = '\u2605';
        btn.classList.add('star-animate');
        setTimeout(() => btn.classList.remove('star-animate'), 350);
      }
      state.starredMcqs[state.activeSubject] = starredList;
      saveStarredMcqs();
      renderStarredInNotesPanel();
    });
  });

  // Re-run KaTeX auto-render
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(elements.contentArea, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError: false
    });
  }

  shuffleMcqOptions(elements.contentArea);

  const sidebarButtons = elements.topicList.querySelectorAll('.topic-item');
  sidebarButtons.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-index'));
    btn.classList.toggle('active', idx === unitIndex);
  });

  elements.prevBtn.disabled = unitIndex === 0;
  elements.prevBtn.style.opacity = unitIndex === 0 ? '0.5' : '1';

  const totalUnits = mcqBank.length;
  const isLastUnit = unitIndex === totalUnits - 1;
  elements.nextBtn.innerHTML = isLastUnit ? 'Practice Bank Completed! 🎓' : 'Next Unit →';
  elements.nextBtn.disabled = false;
  elements.nextBtn.style.opacity = '1';

  document.getElementById('main-content-pane').scrollTop = 0;
}


// ============================================================
//  LAYOUT
// ============================================================
function closeMobileSidebar() {
  elements.sidebar.classList.remove('mobile-open');
}

// ============================================================
//  LIVE TIMER COUNTDOWN
// ============================================================
function updateTimer() {
  const now = new Date().getTime();
  const subjectConfig = CONFIG.subjects[state.activeSubject];
  const examTime = subjectConfig ? subjectConfig.examTime : new Date("2026-05-29T09:30:00+05:30").getTime();
  const diff = examTime - now;
  let timerString = "";

  if (diff <= 0) {
    timerString = "Exam Started! Good Luck! 🍀";
  } else {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      timerString = `Exam in ${days}d ${remainingHours}h`;
    } else {
      timerString = `Exam in ${hours}h ${mins}m`;
    }
  }

  elements.timerText.textContent = timerString;
  if (elements.mobileTimerText) elements.mobileTimerText.textContent = timerString;
}

// ============================================================
//  RESIZABLE PANELS LOGIC
// ============================================================
function initResizer(resizerId, targetPaneId, direction, invert = false) {
  const resizer = document.getElementById(resizerId);
  const targetPane = document.getElementById(targetPaneId);
  if (!resizer || !targetPane) return;

  let startX, startY, startWidth, startHeight;

  const mousedownHandler = function(e) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = targetPane.offsetWidth;
    startHeight = targetPane.offsetHeight;
    
    resizer.classList.add('resizing');
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
  };

  const mousemoveHandler = function(e) {
    if (direction === 'horizontal') {
      const dx = invert ? startX - e.clientX : e.clientX - startX;
      const newWidth = startWidth + dx;
      if (newWidth > 150 && newWidth < window.innerWidth * 0.85) {
        targetPane.style.width = newWidth + 'px';
        targetPane.style.flex = 'none'; // Ensure width is respected
      }
    } else {
      const dy = invert ? startY - e.clientY : e.clientY - startY;
      const newHeight = startHeight + dy;
      if (newHeight > 60 && newHeight < window.innerHeight * 0.8) {
        targetPane.style.height = newHeight + 'px';
        targetPane.style.flex = 'none'; // Ensure height is respected
      }
    }
  };

  const mouseupHandler = function() {
    resizer.classList.remove('resizing');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', mousemoveHandler);
    document.removeEventListener('mouseup', mouseupHandler);
  };

  resizer.addEventListener('mousedown', mousedownHandler);
}

// ============================================================
//  RUN APP
// ============================================================

// ============================================================
//  ZOOM AND UI CONTROLS
// ============================================================
let currentZoom = 1;
const zoomContainer = document.querySelector('.container');

document.getElementById('zoom-in')?.addEventListener('click', () => {
  currentZoom = Math.min(currentZoom + 0.1, 1.5);
  if (zoomContainer) zoomContainer.style.zoom = currentZoom;
});

document.getElementById('zoom-out')?.addEventListener('click', () => {
  currentZoom = Math.max(currentZoom - 0.1, 0.7);
  if (zoomContainer) zoomContainer.style.zoom = currentZoom;
});

document.getElementById('zoom-default')?.addEventListener('click', () => {
  currentZoom = 1;
  if (zoomContainer) zoomContainer.style.zoom = currentZoom;
});

// ============================================================
//  SYNTAX HIGHLIGHTER HELPER
// ============================================================
window.updateBashHighlighting = function() {
  const editor = document.getElementById('bash-code-editor');
  const highlighter = document.querySelector('#bash-highlighter code');
  if (!editor || !highlighter) return;
  
  if (window.Prism) {
    highlighter.innerHTML = Prism.highlight(editor.value, Prism.languages.bash, 'bash');
  } else {
    highlighter.textContent = editor.value;
  }
};

window.updateJavaHighlighting = function() {
  const editor = document.getElementById('java-code-editor');
  const highlighter = document.querySelector('#java-highlighter code');
  if (!editor || !highlighter) return;
  
  if (window.Prism && Prism.languages.java) {
    highlighter.innerHTML = Prism.highlight(editor.value, Prism.languages.java, 'java');
  } else {
    highlighter.textContent = editor.value;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  init();
});

// ============================================================
//  THEME TOGGLE
// ============================================================
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIconPath = document.querySelector('#theme-icon path');
  
  if (!toggleBtn || !themeIconPath) return;

  // Prevent duplicate event listener registration
  if (toggleBtn.dataset.themeToggleInitialized) return;
  toggleBtn.dataset.themeToggleInitialized = 'true';

  let currentTheme = 'light';
  try {
    currentTheme = localStorage.getItem('theme') || 'light';
  } catch (e) {
    console.warn("localStorage not accessible for theme toggle");
  }

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIconPath.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'); // Sun icon
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {}
    
    if (isDark) {
      themeIconPath.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'); // Sun icon
    } else {
      themeIconPath.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'); // Moon icon
    }
  });
}

// ============================================================
//  PRACTICE TEST 1 CUSTOM RENDERING
// ============================================================
function renderPracticeTest1Item(index) {
  const subjectData = CONFIG.subjects[state.activeSubject].data;
  const topics = subjectData[state.activeSection] || [];
  const topic = topics[index];
  if (!topic) return;

  const mainContentPane = document.getElementById('main-content-pane');
  const container = document.querySelector('.container');

  // Highlight sidebar item active state
  const sidebarButtons = elements.topicList.querySelectorAll('.topic-item');
  sidebarButtons.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-index'));
    btn.classList.toggle('active', idx === index);
  });

  elements.prevBtn.disabled = index === 0;
  elements.prevBtn.style.opacity = index === 0 ? '0.5' : '1';
  elements.nextBtn.disabled = index === topics.length - 1;
  elements.nextBtn.style.opacity = index === topics.length - 1 ? '0.5' : '1';

  if (topic.type === 'mcq') {
    // MCQ Practice Mode
    mainContentPane.classList.add('practice-mode');
    mainContentPane.classList.remove('bash-mode');
    container.classList.add('practice-active');
    renderPracticeUnit(topic.unitIndex);
  } else if (topic.type === 'coding') {
    // Bash Practice Mode
    mainContentPane.classList.add('bash-mode');
    mainContentPane.classList.remove('practice-mode');
    container.classList.add('practice-active');
    renderBashProblem(topic.bashIndex);
  } else if (topic.type === 'subjective') {
    // Subjective Q&A Mode
    mainContentPane.classList.remove('bash-mode', 'practice-mode');
    container.classList.remove('practice-active');
    
    elements.welcomeScreen.style.display = 'none';
    elements.readingPane.style.display = 'block';
    
    elements.sectionBadge.textContent = 'PT1';
    elements.mainTitle.textContent = topic.title;
    
    let cardsHtml = topic.questions.map((q, i) => `
      <div class="subjective-card" style="background: var(--card-bg, #FAF8F5); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; position: relative; margin-bottom: 1.5rem; text-align: left;">
        <div style="font-weight: 700; color: var(--active-accent); margin-bottom: 0.5rem; font-size: 0.85rem; text-transform: uppercase;">Question ${i + 1}</div>
        <div style="font-size: 1rem; color: var(--text-primary); margin-bottom: 1rem; font-weight: 600; line-height: 1.45;">${escapeHtml(q.question)}</div>
        <button class="reveal-btn" data-index="${i}" style="background-color: var(--active-accent); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">Reveal Answer</button>
        <div class="subjective-answer" id="subjective-ans-${i}" style="display: none; margin-top: 1rem; padding: 1rem; background-color: var(--body-bg, #F3EFE9); border-left: 4px solid var(--active-accent); border-radius: 6px;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 0.25rem;">Answer:</strong>
          <code style="font-family: monospace; font-size: 0.95rem; color: var(--active-accent); background: none; padding: 0; word-break: break-all; white-space: pre-wrap; display: block;">${escapeHtml(q.answer)}</code>
        </div>
      </div>
    `).join('');

    elements.contentArea.innerHTML = `
      <div class="subjective-practice-area" style="padding: 0.5rem 0 2rem; text-align: left;">
        <p style="color: var(--text-secondary); margin-bottom: 2rem; font-size: 0.95rem;">Review the subjective questions below. Try to solve them yourself first, then click "Reveal Answer" to check your work.</p>
        <div class="subjective-cards-container">
          ${cardsHtml}
        </div>
      </div>
    `;
    
    // Add event listeners
    elements.contentArea.querySelectorAll('.reveal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-index');
        const ans = document.getElementById(`subjective-ans-${i}`);
        if (ans) {
          const isHidden = ans.style.display === 'none';
          ans.style.display = isHidden ? 'block' : 'none';
          btn.textContent = isHidden ? 'Hide Answer' : 'Reveal Answer';
          btn.style.backgroundColor = isHidden ? 'var(--text-secondary)' : 'var(--active-accent)';
        }
      });
    });

    elements.contentArea.style.overflowY = 'auto';
    elements.contentArea.style.padding = '3rem 4.5rem'; 
    elements.contentArea.style.display = 'block';
  }
}

// ============================================================
//  SMART NOTES ENGINE
// ============================================================
function initSmartNotesUI() {
  // --- Create FAB ---
  const fab = document.createElement('button');
  fab.className = 'smart-notes-fab';
  fab.id = 'smart-notes-fab';
  fab.setAttribute('aria-label', 'Toggle Smart Notes');
  fab.title = 'Smart Notes (N)';

  // SVG icon for notepad
  const fabSvg = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
    'image/svg+xml'
  );
  fab.appendChild(fab.ownerDocument.importNode(fabSvg.documentElement, true));

  const countBadge = document.createElement('span');
  countBadge.className = 'notes-count';
  countBadge.id = 'notes-count-badge';
  fab.appendChild(countBadge);

  fab.addEventListener('click', toggleSmartNotesPanel);
  document.body.appendChild(fab);

  // --- Create Panel ---
  const panel = document.createElement('div');
  panel.className = 'smart-notes-panel';
  panel.id = 'smart-notes-panel';

  // Header
  const header = document.createElement('div');
  header.className = 'smart-notes-header';

  const headerLeft = document.createElement('div');
  headerLeft.className = 'smart-notes-header-left';
  const headerIcon = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--active-accent);"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',
    'image/svg+xml'
  );
  headerLeft.appendChild(headerLeft.ownerDocument.importNode(headerIcon.documentElement, true));
  const headerTitle = document.createElement('h3');
  headerTitle.textContent = 'Smart Notes';
  headerLeft.appendChild(headerTitle);

  const headerActions = document.createElement('div');
  headerActions.className = 'smart-notes-header-actions';

  const copyBtn = document.createElement('button');
  copyBtn.id = 'copy-notes-btn';
  const copySvg = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    'image/svg+xml'
  );
  copyBtn.appendChild(copyBtn.ownerDocument.importNode(copySvg.documentElement, true));
  const copyBtnText = document.createTextNode(' Copy All');
  copyBtn.appendChild(copyBtnText);
  copyBtn.addEventListener('click', copyNotesToClipboard);
  headerActions.appendChild(copyBtn);

  const filterBtn = document.createElement('button');
  filterBtn.id = 'toggle-filters-btn';
  const filterSvg = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    'image/svg+xml'
  );
  filterBtn.appendChild(filterBtn.ownerDocument.importNode(filterSvg.documentElement, true));
  const filterBtnText = document.createTextNode(' Filter');
  filterBtn.appendChild(filterBtnText);
  filterBtn.addEventListener('click', () => {
    const filtersContainer = document.getElementById('smart-notes-filters');
    if (filtersContainer) {
      const isShowing = filtersContainer.classList.toggle('show');
      filterBtn.classList.toggle('active', isShowing);
    }
  });
  headerActions.appendChild(filterBtn);

  // Clear All Notes button
  const clearBtn = document.createElement('button');
  clearBtn.id = 'clear-notes-btn';
  clearBtn.className = 'smart-notes-clear-btn';
  const clearSvg = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',
    'image/svg+xml'
  );
  clearBtn.appendChild(clearBtn.ownerDocument.importNode(clearSvg.documentElement, true));
  const clearBtnText = document.createTextNode(' Clear All');
  clearBtn.appendChild(clearBtnText);

  let clearConfirmTimeout = null;
  clearBtn.addEventListener('click', () => {
    if (clearBtn.classList.contains('armed')) {
      state.smartNotes = [];
      localStorage.setItem('prep_smart_notes', JSON.stringify(state.smartNotes));
      updateNotesCount();
      renderNotesList();
      clearBtn.classList.remove('armed');
      clearBtn.lastChild.textContent = ' Clear All';
      if (clearConfirmTimeout) {
        clearTimeout(clearConfirmTimeout);
        clearConfirmTimeout = null;
      }
    } else {
      clearBtn.classList.add('armed');
      clearBtn.lastChild.textContent = ' Confirm?';
      clearConfirmTimeout = setTimeout(() => {
        clearBtn.classList.remove('armed');
        clearBtn.lastChild.textContent = ' Clear All';
        clearConfirmTimeout = null;
      }, 3000);
    }
  });
  headerActions.appendChild(clearBtn);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'smart-notes-close-btn';
  const closeSvg = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    'image/svg+xml'
  );
  closeBtn.appendChild(closeBtn.ownerDocument.importNode(closeSvg.documentElement, true));
  closeBtn.addEventListener('click', toggleSmartNotesPanel);
  headerActions.appendChild(closeBtn);

  header.appendChild(headerLeft);
  header.appendChild(headerActions);
  panel.appendChild(header);

  // Filters
  const filters = document.createElement('div');
  filters.className = 'smart-notes-filters';
  filters.id = 'smart-notes-filters';
  const filterOptions = [
    { key: 'all', label: 'All' },
    { key: 'iot', label: 'ES & IoT' },
    { key: 'cn', label: 'CN' },
    { key: 'linux', label: 'Linux' }
  ];
  filterOptions.forEach(opt => {
    const pill = document.createElement('button');
    pill.className = 'smart-notes-filter-pill' + (opt.key === 'all' ? ' active' : '');
    pill.setAttribute('data-filter', opt.key);
    pill.textContent = opt.label;
    pill.addEventListener('click', () => {
      state.notesFilterSubject = opt.key;
      filters.querySelectorAll('.smart-notes-filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderNotesList();
    });
    filters.appendChild(pill);
  });
  panel.appendChild(filters);

  // Notes list body
  const body = document.createElement('div');
  body.className = 'smart-notes-body';
  body.id = 'smart-notes-body';
  panel.appendChild(body);

  // Starred MCQs section
  const starredToggle = document.createElement('button');
  starredToggle.className = 'starred-section-toggle';
  starredToggle.id = 'starred-section-toggle';
  const starredToggleText = document.createElement('span');
  starredToggleText.style.display = 'inline-flex';
  starredToggleText.style.alignItems = 'center';
  starredToggleText.style.gap = '6px';
  const starredSectionSvg = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #E3B261; vertical-align: middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'image/svg+xml'
  );
  starredToggleText.appendChild(starredToggleText.ownerDocument.importNode(starredSectionSvg.documentElement, true));
  const starredTextNode = document.createTextNode(' Starred Questions');
  starredToggleText.appendChild(starredTextNode);
  starredToggle.appendChild(starredToggleText);
  const starredCountBadge = document.createElement('span');
  starredCountBadge.className = 'starred-count';
  starredCountBadge.id = 'starred-count-badge';
  starredToggle.appendChild(starredCountBadge);
  panel.appendChild(starredToggle);

  const starredContent = document.createElement('div');
  starredContent.className = 'starred-section-content';
  starredContent.id = 'starred-section-content';

  const starredList = document.createElement('div');
  starredList.className = 'starred-section-list';
  starredList.id = 'starred-section-list';
  starredContent.appendChild(starredList);

  // Copy & Clear starred buttons row
  const copyStarredRow = document.createElement('div');
  copyStarredRow.style.cssText = 'padding: 0 1.25rem 1rem; display: flex; gap: 0.5rem;';
  
  const copyStarredBtn = document.createElement('button');
  copyStarredBtn.id = 'copy-starred-btn';
  copyStarredBtn.style.cssText = 'flex: 1; display: flex; align-items: center; justify-content: center; gap: 4px;';
  copyStarredBtn.className = 'starred-filter-btn';
  const copyStarredSvg = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    'image/svg+xml'
  );
  copyStarredBtn.appendChild(copyStarredBtn.ownerDocument.importNode(copyStarredSvg.documentElement, true));
  const copyStarredBtnText = document.createTextNode(' Copy for AI');
  copyStarredBtn.appendChild(copyStarredBtnText);
  copyStarredBtn.addEventListener('click', copyStarredToClipboard);
  copyStarredRow.appendChild(copyStarredBtn);

  // Clear Starred button
  const clearStarredBtn = document.createElement('button');
  clearStarredBtn.id = 'clear-starred-btn';
  clearStarredBtn.style.cssText = 'flex: 1; display: flex; align-items: center; justify-content: center; gap: 4px;';
  clearStarredBtn.className = 'starred-filter-btn starred-clear-btn';
  const unstarAllSvg = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>',
    'image/svg+xml'
  );
  clearStarredBtn.appendChild(clearStarredBtn.ownerDocument.importNode(unstarAllSvg.documentElement, true));
  const clearStarredBtnText = document.createTextNode(' Unstar All');
  clearStarredBtn.appendChild(clearStarredBtnText);

  let clearStarredConfirmTimeout = null;
  clearStarredBtn.addEventListener('click', () => {
    if (clearStarredBtn.classList.contains('armed')) {
      state.starredMcqs = { iot: [], cn: [], linux: [] };
      localStorage.setItem('prep_starred_mcqs', JSON.stringify(state.starredMcqs));
      renderStarredInNotesPanel();
      
      if (state.activeSection === 'practice' || state.activeSection === 'linuxMcq') {
        const activeUnitObj = CONFIG.subjects[state.activeSubject]?.mcqs?.[state.activePracticeUnitIdx];
        if (activeUnitObj) {
          renderPracticeUnit(activeUnitObj);
        }
      }
      clearStarredBtn.classList.remove('armed');
      clearStarredBtn.lastChild.textContent = ' Unstar All';
      if (clearStarredConfirmTimeout) {
        clearTimeout(clearStarredConfirmTimeout);
        clearStarredConfirmTimeout = null;
      }
    } else {
      clearStarredBtn.classList.add('armed');
      clearStarredBtn.lastChild.textContent = ' Confirm?';
      clearStarredConfirmTimeout = setTimeout(() => {
        clearStarredBtn.classList.remove('armed');
        clearStarredBtn.lastChild.textContent = ' Unstar All';
        clearStarredConfirmTimeout = null;
      }, 3000);
    }
  });
  copyStarredRow.appendChild(clearStarredBtn);
  starredContent.appendChild(copyStarredRow);
  panel.appendChild(starredContent);

  starredToggle.addEventListener('click', () => {
    starredContent.classList.toggle('expanded');
  });

  // Footer
  const footer = document.createElement('div');
  footer.className = 'smart-notes-footer';

  const inputRow = document.createElement('div');
  inputRow.className = 'smart-notes-input-row';

  const textarea = document.createElement('textarea');
  textarea.className = 'smart-notes-textarea';
  textarea.id = 'smart-notes-textarea';
  textarea.placeholder = 'Write a note...';
  textarea.rows = 1;
  inputRow.appendChild(textarea);

  const addBtn = document.createElement('button');
  addBtn.className = 'smart-notes-add-btn';
  addBtn.textContent = 'Add';
  addBtn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) return;
    addNote({
      sourceType: 'manual',
      selectedText: '',
      userAnnotation: text
    });
    textarea.value = '';
  });
  inputRow.appendChild(addBtn);
  footer.appendChild(inputRow);
  panel.appendChild(footer);

  document.body.appendChild(panel);

  // --- Create Selection Tooltip ---
  const tooltip = document.createElement('div');
  tooltip.className = 'selection-tooltip';
  tooltip.id = 'selection-tooltip';
  
  const pinSvg = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;"><line x1="18" y1="8" x2="22" y2="12"/><line x1="12" y1="2" x2="22" y2="12"/><path d="M12 2L2 12h5l5 5v5l10-10H17l-5-5z"/></svg>',
    'image/svg+xml'
  );
  tooltip.appendChild(tooltip.ownerDocument.importNode(pinSvg.documentElement, true));
  const tooltipText = document.createTextNode(' Save to Notes');
  tooltip.appendChild(tooltipText);
  document.body.appendChild(tooltip);

  // Setup selection listener
  setupSelectionTooltip();

  // Initial render
  updateNotesCount();
  renderNotesList();
  renderStarredInNotesPanel();
}

function toggleSmartNotesPanel() {
  const panel = document.getElementById('smart-notes-panel');
  const fab = document.getElementById('smart-notes-fab');
  if (!panel || !fab) return;
  
  const isOpen = panel.classList.toggle('open');
  fab.classList.toggle('panel-open', isOpen);
  document.body.classList.toggle('notes-open', isOpen);

  if (isOpen) {
    renderNotesList();
    renderStarredInNotesPanel();
  }
}

function addNote(noteData) {
  const note = {
    id: 'note_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    subject: state.activeSubject,
    section: state.activeSection,
    sectionName: CONFIG.subjects[state.activeSubject]?.sectionNames?.[state.activeSection] || state.activeSection,
    topicTitle: '',
    topicIndex: state.activeTopicIndex,
    timestamp: Date.now(),
    sourceType: noteData.sourceType || 'manual',
    selectedText: noteData.selectedText || '',
    userAnnotation: noteData.userAnnotation || ''
  };

  // Get topic title if on a study page
  if (!isMcqSection() && !isBashSection()) {
    const subjectData = CONFIG.subjects[state.activeSubject]?.data;
    const topics = subjectData?.[state.activeSection];
    if (topics && topics[state.activeTopicIndex]) {
      note.topicTitle = topics[state.activeTopicIndex].title;
    }
  }

  state.smartNotes.unshift(note);
  saveSmartNotes();
  updateNotesCount();
  renderNotesList();

  // Bump animation on badge
  const badge = document.getElementById('notes-count-badge');
  if (badge) {
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }
}

function deleteNote(noteId) {
  state.smartNotes = state.smartNotes.filter(n => n.id !== noteId);
  saveSmartNotes();
  updateNotesCount();
  renderNotesList();
}

function renderNotesList() {
  const body = document.getElementById('smart-notes-body');
  if (!body) return;

  // Clear previous content safely
  body.replaceChildren();

  const filtered = state.notesFilterSubject === 'all'
    ? state.smartNotes
    : state.smartNotes.filter(n => n.subject === state.notesFilterSubject);

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'smart-notes-empty';
    const icon = document.createElement('div');
    icon.className = 'smart-notes-empty-icon';
    icon.textContent = '\uD83D\uDCDD';
    empty.appendChild(icon);
    const msg = document.createElement('p');
    msg.textContent = state.smartNotes.length === 0
      ? 'No notes yet. Select text on a page or type a note below.'
      : 'No notes for this subject filter.';
    empty.appendChild(msg);
    body.appendChild(empty);
    return;
  }

  filtered.forEach(note => {
    const card = document.createElement('div');
    card.className = 'smart-note-card';

    // Source badge row
    const sourceRow = document.createElement('div');
    sourceRow.className = 'smart-note-source';

    const badge = document.createElement('span');
    badge.className = 'smart-note-source-badge source-' + note.subject;
    badge.textContent = CONFIG.subjects[note.subject]?.label || note.subject;
    sourceRow.appendChild(badge);

    const timestamp = document.createElement('span');
    timestamp.className = 'smart-note-timestamp';
    timestamp.textContent = formatTimeAgo(note.timestamp);
    sourceRow.appendChild(timestamp);
    card.appendChild(sourceRow);

    // Context line
    if (note.topicTitle || note.sectionName) {
      const context = document.createElement('div');
      context.className = 'smart-note-context';
      context.textContent = [note.sectionName, note.topicTitle].filter(Boolean).join(' \u2192 ');
      card.appendChild(context);
    }

    // Selected text (if selection note)
    if (note.selectedText) {
      const selDiv = document.createElement('div');
      selDiv.className = 'smart-note-content selection-text';
      selDiv.textContent = note.selectedText;
      card.appendChild(selDiv);
    }

    // Annotation / manual note
    if (note.userAnnotation) {
      const annoDiv = document.createElement('div');
      annoDiv.className = note.selectedText ? 'smart-note-annotation' : 'smart-note-content';
      annoDiv.textContent = note.userAnnotation;
      card.appendChild(annoDiv);
    }

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'smart-note-delete';
    delBtn.title = 'Delete note';
    const delSvg = new DOMParser().parseFromString(
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
      'image/svg+xml'
    );
    delBtn.appendChild(delBtn.ownerDocument.importNode(delSvg.documentElement, true));
    delBtn.addEventListener('click', () => deleteNote(note.id));
    card.appendChild(delBtn);

    body.appendChild(card);
  });
}

function updateNotesCount() {
  const badge = document.getElementById('notes-count-badge');
  if (!badge) return;
  const count = state.smartNotes.length;
  badge.textContent = count > 0 ? String(count) : '';
  badge.setAttribute('data-count', String(count));
}

function formatTimeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return mins + 'm ago';
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + 'h ago';
  const days = Math.floor(hours / 24);
  if (days < 7) return days + 'd ago';
  return new Date(timestamp).toLocaleDateString();
}

function formatNotesForExport() {
  if (state.smartNotes.length === 0) return 'No notes saved yet.';

  let output = '\uD83D\uDCDA STUDY NOTES \u2014 prep\n';
  output += '\u2550'.repeat(30) + '\n\n';

  state.smartNotes.forEach(note => {
    const subjectLabel = CONFIG.subjects[note.subject]?.label || note.subject;
    const context = [subjectLabel, note.sectionName, note.topicTitle].filter(Boolean).join(' \u2192 ');
    const timeAgo = formatTimeAgo(note.timestamp);

    output += '[' + context + '] (' + timeAgo + ')\n';

    if (note.selectedText) {
      output += '\uD83D\uDCCC "' + note.selectedText + '"\n';
    }
    if (note.userAnnotation) {
      const prefix = note.selectedText ? '\uD83D\uDCAD ' : '\u270D\uFE0F ';
      output += prefix + note.userAnnotation + '\n';
    }
    output += '\n';
  });

  return output.trim();
}

function copyNotesToClipboard() {
  const text = formatNotesForExport();
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-notes-btn');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = '\u2713 Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 2000);
    }
  }).catch(() => {
    // Fallback: select from a temporary element
  });
}

// ============================================================
//  TEXT SELECTION → SAVE TO NOTES TOOLTIP
// ============================================================
function setupSelectionTooltip() {
  const tooltip = document.getElementById('selection-tooltip');
  if (!tooltip) return;

  let selectedText = '';

  document.addEventListener('mouseup', (e) => {
    // Only on reading content area (theory pages)
    const contentArea = document.getElementById('reading-content-area');
    if (!contentArea || !contentArea.contains(e.target)) {
      hideSelectionTooltip();
      return;
    }

    // Don't show in MCQ/Bash modes
    if (isMcqSection() || isBashSection()) {
      hideSelectionTooltip();
      return;
    }

    // Don't show if clicking on the tooltip itself
    if (tooltip.contains(e.target)) return;

    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : '';

    if (text.length > 3) {
      selectedText = text;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      tooltip.style.top = (rect.bottom + scrollTop + 8) + 'px';
      tooltip.style.left = (rect.left + scrollLeft + (rect.width / 2) - 60) + 'px';
      tooltip.classList.add('visible');
    } else {
      hideSelectionTooltip();
    }
  });

  tooltip.addEventListener('click', () => {
    if (!selectedText) return;

    addNote({
      sourceType: 'selection',
      selectedText: selectedText,
      userAnnotation: ''
    });

    hideSelectionTooltip();
    window.getSelection().removeAllRanges();

    // Open panel briefly if not open
    const panel = document.getElementById('smart-notes-panel');
    if (panel && !panel.classList.contains('open')) {
      toggleSmartNotesPanel();
    }
  });

  // Hide tooltip on scroll or click elsewhere
  document.addEventListener('mousedown', (e) => {
    if (!tooltip.contains(e.target)) {
      hideSelectionTooltip();
    }
  });
}

function hideSelectionTooltip() {
  const tooltip = document.getElementById('selection-tooltip');
  if (tooltip) {
    tooltip.classList.remove('visible');
  }
}

// ============================================================
//  STARRED MCQs IN NOTES PANEL
// ============================================================
function renderStarredInNotesPanel() {
  const list = document.getElementById('starred-section-list');
  const countBadge = document.getElementById('starred-count-badge');
  if (!list) return;

  // Collect all starred questions across subjects
  const allStarred = [];
  Object.keys(state.starredMcqs).forEach(subject => {
    const qIds = state.starredMcqs[subject] || [];
    const mcqBank = CONFIG.subjects[subject]?.mcqs || [];
    const allQuestions = mcqBank.flatMap(u => u.questions || []);

    qIds.forEach(qId => {
      const q = allQuestions.find(question => question.id === qId);
      if (q) {
        allStarred.push({ ...q, subject });
      }
    });
  });

  if (countBadge) {
    countBadge.textContent = allStarred.length > 0 ? String(allStarred.length) : '';
  }

  list.replaceChildren();

  if (allStarred.length === 0) {
    const empty = document.createElement('p');
    empty.style.cssText = 'font-size: 0.85rem; color: var(--text-secondary); padding: 0.5rem 0;';
    empty.textContent = 'No starred questions yet. Star questions in MCQ practice to see them here.';
    list.appendChild(empty);
    return;
  }

  allStarred.forEach(q => {
    const item = document.createElement('div');
    item.className = 'starred-mcq-item';

    const headerRow = document.createElement('div');
    headerRow.className = 'starred-mcq-item-header';

    const badge = document.createElement('span');
    badge.className = 'starred-mcq-subject-badge';
    badge.textContent = CONFIG.subjects[q.subject]?.label || q.subject;
    headerRow.appendChild(badge);

    const unstarItemBtn = document.createElement('button');
    unstarItemBtn.className = 'unstar-item-btn';
    unstarItemBtn.title = 'Remove Star';
    const trashSvg = new DOMParser().parseFromString(
      '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      'image/svg+xml'
    );
    unstarItemBtn.appendChild(unstarItemBtn.ownerDocument.importNode(trashSvg.documentElement, true));
    unstarItemBtn.addEventListener('click', () => {
      const starredList = state.starredMcqs[q.subject] || [];
      state.starredMcqs[q.subject] = starredList.filter(id => id !== q.id);
      localStorage.setItem('prep_starred_mcqs', JSON.stringify(state.starredMcqs));
      renderStarredInNotesPanel();
      
      const activeStarBtn = document.querySelector(`.mcq-star-btn[data-qid="${q.id}"]`);
      if (activeStarBtn) {
        activeStarBtn.classList.remove('starred');
        activeStarBtn.textContent = '☆';
      }
    });
    headerRow.appendChild(unstarItemBtn);
    item.appendChild(headerRow);

    const qText = document.createElement('div');
    qText.className = 'starred-mcq-question-text';
    qText.textContent = q.question;
    item.appendChild(qText);

    if (q.correct && q.options) {
      const ansDiv = document.createElement('div');
      ansDiv.className = 'starred-mcq-answer';
      const parsed = parseOption(q.options[q.correct] || '');
      ansDiv.textContent = '\u2713 ' + q.correct.toUpperCase() + ') ' + parsed.text;
      item.appendChild(ansDiv);
    }

    list.appendChild(item);
  });
}

function formatStarredForExport() {
  const allStarred = [];
  Object.keys(state.starredMcqs).forEach(subject => {
    const qIds = state.starredMcqs[subject] || [];
    const mcqBank = CONFIG.subjects[subject]?.mcqs || [];
    const allQuestions = mcqBank.flatMap(u => u.questions || []);

    qIds.forEach(qId => {
      const q = allQuestions.find(question => question.id === qId);
      if (q) {
        allStarred.push({ ...q, subject });
      }
    });
  });

  if (allStarred.length === 0) return 'No starred questions.';

  let output = '\u2605 STARRED QUESTIONS \u2014 prep\n';
  output += '\u2550'.repeat(30) + '\n\n';

  allStarred.forEach((q, i) => {
    const subjectLabel = CONFIG.subjects[q.subject]?.label || q.subject;
    output += '\u2605 Q' + (i + 1) + '. [' + subjectLabel + '] ' + q.question + '\n';

    if (q.options) {
      Object.keys(q.options).forEach(optLetter => {
        const parsed = parseOption(q.options[optLetter]);
        const marker = optLetter === q.correct ? ' \u2190 Correct' : '';
        output += '  ' + optLetter.toUpperCase() + ') ' + parsed.text + marker + '\n';
      });
    }

    const savedAns = state.practiceAnswers[q.subject]?.[q.id];
    if (savedAns !== undefined) {
      const isCorrect = savedAns === q.correct;
      output += '  [Your answer: ' + savedAns.toUpperCase() + ' \u2014 ' + (isCorrect ? 'Correct' : 'Incorrect') + ']\n';
    }
    output += '\n';
  });

  return output.trim();
}

function copyStarredToClipboard() {
  const text = formatStarredForExport();
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-starred-btn');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = '\u2713 Copied!';
      setTimeout(() => { btn.textContent = original; }, 2000);
    }
  }).catch(() => {
    // Fallback silently
  });
}

// ============================================================
//  LINUX PLAYGROUND (LAB) WORKSPACE & SHELL INTEGRATION
// ============================================================

function initPlaygroundShell(forceReset = false) {
  if (forceReset || !state.playgroundShell.fs) {
    state.playgroundShell.fs = { ...VIRTUAL_FS };
    state.playgroundShell.directories = new Set(['/etc', '/var', '/var/log', '/home', '/home/student', '/tmp']);
    state.playgroundShell.cwd = '/home/student';
    state.playgroundShell.vars = { 
      '0': 'bash', 
      'USER': 'student', 
      'HOME': '/home/student', 
      'PATH': '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' 
    };
    state.playgroundShell.arrays = {};
    state.playgroundShell.functions = {};
    state.playgroundShell.archives = {};
    state.playgroundShell.users = ['student', 'root'];
    state.playgroundShell.groups = ['student', 'root', 'sudo'];
    state.playgroundShell.services = {
      'ssh': { active: true, subState: 'running' },
      'ufw': { active: true, subState: 'running' },
      'cron': { active: true, subState: 'running' }
    };
    state.playgroundShell.firewallRules = [];
    state.playgroundShell.lastStatus = 0;
    state.playgroundShell.terminalHistory = [];
    state.playgroundShell.historyIndex = -1;
    state.playgroundShell.lvm = {
      pvs: [],
      vgs: {},
      lvs: {}
    };
  }
}

function buildFSTree(fs, directories) {
  const root = { name: '/', type: 'dir', children: {}, path: '/' };
  
  // Add directories
  if (directories) {
    for (const dirPath of directories) {
      if (dirPath === '/' || !dirPath) continue;
      const parts = dirPath.split('/').filter(Boolean);
      let current = root;
      let currentPath = '';
      for (const part of parts) {
        currentPath += '/' + part;
        if (!current.children[part]) {
          current.children[part] = { name: part, type: 'dir', children: {}, path: currentPath };
        }
        current = current.children[part];
      }
    }
  }

  // Add files
  if (fs) {
    for (const filePath of Object.keys(fs)) {
      const parts = filePath.split('/').filter(Boolean);
      if (parts.length === 0) continue;
      let current = root;
      let currentPath = '';
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        currentPath += '/' + part;
        if (!current.children[part]) {
          current.children[part] = { name: part, type: 'dir', children: {}, path: currentPath };
        }
        current = current.children[part];
      }
      const fileName = parts[parts.length - 1];
      current.children[fileName] = { name: fileName, type: 'file', path: filePath };
    }
  }

  return root;
}

function renderPlaygroundSidebar() {
  initPlaygroundShell(); // Ensure state.playgroundShell is initialized
  
  elements.topicList.innerHTML = '';
  elements.topicList.className = 'topic-list playground-sidebar';

  // Default collapsed folders
  if (!window.collapsedPlaygroundDirs) {
    window.collapsedPlaygroundDirs = new Set(['/etc', '/var', '/var/log', '/tmp']);
  }

  // 1. Control buttons
  const ctrlDiv = document.createElement('div');
  ctrlDiv.className = 'playground-sidebar-controls';

  const clearBtn = document.createElement('button');
  clearBtn.className = 'playground-side-btn clear-term-btn';
  clearBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg> Clear Term';
  clearBtn.addEventListener('click', () => {
    const logContainer = document.getElementById('terminal-log-container');
    if (logContainer) logContainer.innerHTML = '';
    state.playgroundShell.terminalHistory = [];
    state.playgroundShell.historyIndex = -1;
  });

  const resetBtn = document.createElement('button');
  resetBtn.className = 'playground-side-btn reset-fs-btn';
  resetBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg> Reset Lab';
  resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the lab? This will wipe the in-memory files and variables.')) {
      initPlaygroundShell(true);
      window.collapsedPlaygroundDirs = new Set(['/etc', '/var', '/var/log', '/tmp']);
      renderPlaygroundSidebar();
      updateDiskMonitor();
      // Print notification in terminal if visible
      appendTerminalOutput('System initialized. In-memory virtual filesystem reset to defaults.\n', 'sys-info');
    }
  });

  ctrlDiv.appendChild(clearBtn);
  ctrlDiv.appendChild(resetBtn);
  elements.topicList.appendChild(ctrlDiv);

  // 2. Section Header
  const header = document.createElement('div');
  header.className = 'sidebar-group-label';
  header.textContent = 'Filesystem Tree';
  elements.topicList.appendChild(header);

  // 3. Tree container
  const treeContainer = document.createElement('div');
  treeContainer.className = 'fs-tree-container';
  elements.topicList.appendChild(treeContainer);

  const tree = buildFSTree(state.playgroundShell.fs, state.playgroundShell.directories);

  // If there's a search query, filter the tree node
  function matchesSearch(node, query) {
    if (!query) return true;
    if (node.name.toLowerCase().includes(query)) return true;
    if (node.children) {
      return Object.values(node.children).some(child => matchesSearch(child, query));
    }
    return false;
  }

  // Render tree node helper
  function renderNode(node, container, depth = 0) {
    if (node.path !== '/' && !matchesSearch(node, state.searchQuery.toLowerCase())) {
      return;
    }

    const childrenKeys = Object.keys(node.children || {}).sort();
    if (node.path !== '/') {
      const item = document.createElement('div');
      item.className = `fs-tree-item fs-type-${node.type}`;
      item.style.paddingLeft = `${depth * 12 + 8}px`;

      // Icon
      const icon = document.createElement('span');
      icon.className = 'fs-tree-icon';
      if (node.type === 'dir') {
        const isCollapsed = window.collapsedPlaygroundDirs.has(node.path);
        icon.innerHTML = isCollapsed
          ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
          : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
      } else {
        icon.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>';
      }
      item.appendChild(icon);

      // Label
      const label = document.createElement('span');
      label.className = 'fs-tree-label';
      label.textContent = node.name;
      item.appendChild(label);

      // Current working directory highlight
      if (state.playgroundShell.cwd === node.path) {
        item.classList.add('fs-cwd');
        const cwdBadge = document.createElement('span');
        cwdBadge.className = 'fs-cwd-badge';
        cwdBadge.textContent = 'cwd';
        item.appendChild(cwdBadge);
      }

      if (node.type === 'dir') {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          if (window.collapsedPlaygroundDirs.has(node.path)) {
            window.collapsedPlaygroundDirs.delete(node.path);
          } else {
            window.collapsedPlaygroundDirs.add(node.path);
          }
          renderPlaygroundSidebar();
        });
      } else {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          // Copy to terminal or editor input
          const cliInput = document.getElementById('cli-terminal-input');
          if (cliInput) {
            const currentVal = cliInput.value;
            cliInput.value = currentVal.endsWith(' ') || currentVal === '' ? currentVal + node.path : currentVal + ' ' + node.path;
            cliInput.focus();
          }
        });
      }
      container.appendChild(item);
    }

    // Render children recursively
    const isCollapsed = window.collapsedPlaygroundDirs.has(node.path);
    if (node.type === 'dir' && (node.path === '/' || !isCollapsed)) {
      for (const key of childrenKeys) {
        renderNode(node.children[key], container, node.path === '/' ? depth : depth + 1);
      }
    }
  }

  renderNode(tree, treeContainer, 0);
}

const PLAYGROUND_CHALLENGES = [
  {
    id: 'lvm-setup',
    title: 'Challenge 1: Storage Provisioning (LVM)',
    description: 'Create logical volumes to prepare for a storage server:<br>1. Initialize physical volume <code>/dev/sda1</code>.<br>2. Create a Volume Group named <code>vg_data</code> using <code>/dev/sda1</code>.<br>3. Create a Logical Volume named <code>lv_docs</code> of size <code>10G</code> inside <code>vg_data</code>.',
    hint: 'Commands:<br><code>pvcreate /dev/sda1</code><br><code>vgcreate vg_data /dev/sda1</code><br><code>lvcreate -L 10G -n lv_docs vg_data</code>',
    verify: (shellState) => {
      const lvm = shellState.lvm || {};
      const pvs = lvm.pvs || [];
      const vgs = lvm.vgs || {};
      const lvs = lvm.lvs || {};

      if (!pvs.includes('/dev/sda1')) {
        return { success: false, error: 'Physical volume /dev/sda1 not found.' };
      }
      if (!vgs['vg_data']) {
        return { success: false, error: 'Volume Group "vg_data" not found.' };
      }
      if (!vgs['vg_data'].pvs.includes('/dev/sda1')) {
        return { success: false, error: 'Volume Group "vg_data" does not use physical volume /dev/sda1.' };
      }
      if (!lvs['lv_docs']) {
        return { success: false, error: 'Logical Volume "lv_docs" not found.' };
      }
      if (lvs['lv_docs'].vg !== 'vg_data') {
        return { success: false, error: 'Logical Volume "lv_docs" does not belong to volume group "vg_data".' };
      }
      return { success: true };
    }
  },
  {
    id: 'user-management',
    title: 'Challenge 2: User & Group Setup',
    description: 'Configure a new user account with correct permissions:<br>1. Create a new group named <code>devs</code>.<br>2. Add a new user named <code>alice</code> to the system with primary group <code>devs</code>.',
    hint: 'Commands:<br><code>groupadd devs</code><br><code>useradd -g devs alice</code>',
    verify: (shellState) => {
      const groups = shellState.groups || [];
      const users = shellState.users || [];

      const hasGroup = groups.some(g => g === 'devs' || (g && g.name === 'devs'));
      if (!hasGroup) {
        return { success: false, error: 'Group "devs" not found.' };
      }

      const hasUser = users.some(u => {
        if (typeof u === 'string') {
          return u === 'alice';
        }
        return u && u.name === 'alice' && (u.group === 'devs' || u.groups?.includes('devs'));
      });
      if (!hasUser) {
        return { success: false, error: 'User "alice" not found, or not associated with group "devs".' };
      }
      return { success: true };
    }
  },
  {
    id: 'security-firewall',
    title: 'Challenge 3: Security & Firewalling',
    description: 'Secure the server by enabling UFW and opening port 80:<br>1. Enable the UFW firewall.<br>2. Add a firewall rule to allow incoming HTTP traffic on port <code>80</code>.',
    hint: 'Commands:<br><code>ufw enable</code><br><code>ufw allow 80</code>',
    verify: (shellState) => {
      const rules = shellState.firewallRules || [];
      const hasPort80 = rules.some(r => r === '80' || r.includes('80') || r === 'http' || r.toLowerCase().includes('http'));
      if (!hasPort80) {
        return { success: false, error: 'Firewall rule for port 80 (HTTP) not found. Run "ufw allow 80".' };
      }
      return { success: true };
    }
  },
  {
    id: 'file-structure',
    title: 'Challenge 4: Web Directory Structure',
    description: 'Set up the initial directory layout for a local web server:<br>1. Create a directory <code>/home/student/web</code>.<br>2. Inside <code>/home/student/web</code>, create a folder named <code>assets</code>.<br>3. Create a file <code>/home/student/web/index.html</code> containing the text <code>Hello Linux</code>.',
    hint: 'Commands:<br><code>mkdir -p web/assets</code><br><code>echo "Hello Linux" > web/index.html</code>',
    verify: (shellState) => {
      const dirs = shellState.directories;
      const fs = shellState.fs || {};

      const webDir = '/home/student/web';
      const assetsDir = '/home/student/web/assets';
      const indexFile = '/home/student/web/index.html';

      if (!dirs || !dirs.has(webDir)) {
        return { success: false, error: 'Directory "/home/student/web" not found.' };
      }
      if (!dirs || !dirs.has(assetsDir)) {
        return { success: false, error: 'Directory "/home/student/web/assets" not found.' };
      }
      
      const fileContent = fs['web/index.html'] !== undefined ? fs['web/index.html'] : fs[indexFile];
      if (fileContent === undefined) {
        return { success: false, error: 'File "/home/student/web/index.html" not found.' };
      }
      if (!fileContent.includes('Hello Linux')) {
        return { success: false, error: 'File "/home/student/web/index.html" does not contain the text "Hello Linux".' };
      }
      return { success: true };
    }
  }
];

function renderPlaygroundChallenges() {
  const container = document.getElementById('playground-challenges-tab');
  if (!container) return;

  // Initialize solvedChallenges if missing
  if (!state.playgroundShell.solvedChallenges) {
    state.playgroundShell.solvedChallenges = {};
  }

  container.innerHTML = `
    <div class="challenges-header">
      <h3 style="margin:0; font-size:1.1rem; color:var(--text-primary);">Lab Challenges</h3>
      <p style="margin:0.25rem 0 0 0; font-size:0.8rem; color:var(--text-secondary);">Complete the tasks in the CLI terminal and click Verify to check your work.</p>
    </div>
    <div class="challenges-list" id="challenges-list-container"></div>
  `;

  const listContainer = document.getElementById('challenges-list-container');
  PLAYGROUND_CHALLENGES.forEach(challenge => {
    const isSolved = !!state.playgroundShell.solvedChallenges[challenge.id];
    
    const card = document.createElement('div');
    card.className = `challenge-card ${isSolved ? 'solved' : ''}`;
    card.id = `challenge-card-${challenge.id}`;

    card.innerHTML = `
      <div class="challenge-card-header">
        <span class="challenge-title">${challenge.title}</span>
        <span class="challenge-status-badge ${isSolved ? 'solved' : 'pending'}">
          ${isSolved ? 'Solved' : 'Pending'}
        </span>
      </div>
      <div class="challenge-description">${challenge.description}</div>
      <div class="challenge-actions">
        <button class="challenge-verify-btn primary-btn" data-id="${challenge.id}" ${isSolved ? 'disabled' : ''}>
          ${isSolved ? 'Verified' : 'Verify Challenge'}
        </button>
        <button class="challenge-hint-btn secondary-btn" data-id="${challenge.id}">
          Show Hint
        </button>
      </div>
      <div class="challenge-hint-box" id="hint-box-${challenge.id}" style="display: none;">
        ${challenge.hint}
      </div>
      <div class="challenge-feedback-box" id="feedback-box-${challenge.id}" style="display: none;"></div>
    `;

    listContainer.appendChild(card);
  });

  // Attach event listeners to buttons
  const verifyBtns = container.querySelectorAll('.challenge-verify-btn');
  verifyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const challengeId = btn.getAttribute('data-id');
      const challenge = PLAYGROUND_CHALLENGES.find(c => c.id === challengeId);
      if (!challenge) return;

      const result = challenge.verify(state.playgroundShell);
      const feedbackBox = document.getElementById(`feedback-box-${challengeId}`);
      
      if (result.success) {
        state.playgroundShell.solvedChallenges[challengeId] = true;
        feedbackBox.style.display = 'block';
        feedbackBox.className = 'challenge-feedback-box success-feedback';
        feedbackBox.textContent = '🎉 Success! Challenge completed successfully.';
        
        btn.disabled = true;
        btn.textContent = 'Verified';
        
        const badge = container.querySelector(`#challenge-card-${challengeId} .challenge-status-badge`);
        if (badge) {
          badge.className = 'challenge-status-badge solved';
          badge.textContent = 'Solved';
        }
        
        const card = document.getElementById(`challenge-card-${challengeId}`);
        if (card) {
          card.classList.add('solved');
        }
      } else {
        feedbackBox.style.display = 'block';
        feedbackBox.className = 'challenge-feedback-box error-feedback';
        feedbackBox.textContent = `❌ Verification failed: ${result.error}`;
      }
    });
  });

  const hintBtns = container.querySelectorAll('.challenge-hint-btn');
  hintBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const challengeId = btn.getAttribute('data-id');
      const hintBox = document.getElementById(`hint-box-${challengeId}`);
      if (hintBox.style.display === 'none') {
        hintBox.style.display = 'block';
        btn.textContent = 'Hide Hint';
      } else {
        hintBox.style.display = 'none';
        btn.textContent = 'Show Hint';
      }
    });
  });
}

function renderPlayground() {
  initPlaygroundShell(); // ensure state is ready

  // Hide other panes
  elements.welcomeScreen.style.display = 'none';
  elements.readingPane.style.display = 'none';

  let container = document.getElementById('playground-workspace-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'playground-workspace-container';
    container.className = 'playground-workspace';
    
    // Build HTML content inside
    container.innerHTML = `
      <!-- Left Side: Terminal / Editor -->
      <div class="playground-left-panel">
        <div class="panel-tabs">
          <button class="panel-tab-btn active" id="btn-tab-terminal" data-tab="terminal">Terminal (CLI)</button>
          <button class="panel-tab-btn" id="btn-tab-editor" data-tab="editor">Script Editor</button>
        </div>
        
        <div class="panel-tab-content active" id="playground-terminal-tab">
          <div class="terminal-log-container" id="terminal-log-container">
            <div class="terminal-log-line sys-info">Welcome to prep Linux Terminal Playground!
Type commands in the input line below. Filesystem alterations and shell variables persist in-memory.
Type 'help' to see simulated commands, or check the reference guide on the right.</div>
          </div>
        </div>
        
        <div class="panel-tab-content" id="playground-editor-tab" style="display: none;">
          <div class="editor-instructions">
            Write a Bash script below. Standard inputs are simulated, and execution updates the persistent filesystem and variables.
          </div>
          <textarea id="script-editor-textarea" spellcheck="false" placeholder="#!/bin/bash&#10;# Write your script here&#10;for i in {1..5}; do&#10;  touch file_$i.txt&#10;done&#10;ls -l"></textarea>
          <div class="editor-controls">
            <button id="run-script-btn" class="primary-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Run Script
            </button>
            <button id="clear-editor-btn" class="secondary-btn">Clear</button>
          </div>
          <div class="editor-output-header">Script Output:</div>
          <div class="editor-output-log" id="editor-output-log"></div>
        </div>
      </div>

      <!-- Right Side: Challenges / Disk Monitor / Quick Reference -->
      <div class="playground-right-panel">
        <div class="panel-tabs">
          <button class="panel-tab-btn active" id="btn-tab-challenges" data-tab="challenges">Lab Challenges</button>
          <button class="panel-tab-btn" id="btn-tab-disk-monitor" data-tab="disk-monitor">Disk Visualizer</button>
          <button class="panel-tab-btn" id="btn-tab-quick-ref" data-tab="quick-ref">Quick Reference</button>
        </div>
        
        <div class="panel-tab-content active" id="playground-challenges-tab" style="display: flex; flex-direction: column; height: 100%; overflow: hidden;">
          <!-- Dynamic Lab Challenges -->
        </div>

        <div class="panel-tab-content" id="playground-disk-monitor-tab" style="display: none;">
          <div class="disk-monitor-summary">
            Visualizer for block devices and Logical Volume Manager (LVM) structures.
          </div>
          <div id="disk-monitor-container" class="disk-monitor-container">
            <!-- Dynamic disk columns and VG blocks -->
          </div>
        </div>
        
        <div class="panel-tab-content" id="playground-quick-ref-tab" style="display: none;">
          <div class="quick-ref-scroll">
            <h3 style="margin-top:0; border-left:none; padding-left:0; font-size:1.1rem; color:var(--text-primary);">Common Bash Commands</h3>
            <table class="quick-ref-table">
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>ls -l</code></td><td>List directory contents in long format</td></tr>
                <tr><td><code>cd &lt;dir&gt;</code></td><td>Change current working directory</td></tr>
                <tr><td><code>mkdir -p &lt;dir&gt;</code></td><td>Create nested directories</td></tr>
                <tr><td><code>touch &lt;file&gt;</code></td><td>Create an empty file</td></tr>
                <tr><td><code>cat &lt;file&gt;</code></td><td>Display file contents</td></tr>
                <tr><td><code>echo "text" &gt; &lt;file&gt;</code></td><td>Write or redirect text to a file</td></tr>
                <tr><td><code>grep "pattern" &lt;file&gt;</code></td><td>Search for a pattern in a file</td></tr>
                <tr><td><code>find . -name "*.txt"</code></td><td>Find files by name pattern</td></tr>
              </tbody>
            </table>
            
            <h3 style="margin-top:1.2rem; border-left:none; padding-left:0; font-size:1.1rem; color:var(--text-primary);">LVM Commands</h3>
            <table class="quick-ref-table">
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>pvcreate /dev/sda1</code></td><td>Initialize a physical volume</td></tr>
                <tr><td><code>vgcreate vg_data /dev/sda1</code></td><td>Create a volume group using PV</td></tr>
                <tr><td><code>lvcreate -L 10G -n lv_doc vg_data</code></td><td>Create logical volume in VG</td></tr>
                <tr><td><code>lvextend -L +5G /dev/vg_data/lv_doc</code></td><td>Extend logical volume size</td></tr>
                <tr><td><code>pvdisplay</code> / <code>vgdisplay</code> / <code>lvdisplay</code></td><td>Display LVM details</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('main-content-pane').appendChild(container);
    setupPlaygroundListeners();
  } else {
    container.style.display = 'flex';
  }

  // Ensure active row exists in terminal container
  const logContainer = document.getElementById('terminal-log-container');
  if (logContainer && !document.getElementById('terminal-active-row')) {
    appendActivePromptRow();
  } else {
    const inputEl = document.getElementById('cli-terminal-input');
    if (inputEl) inputEl.focus();
  }

  renderPlaygroundChallenges();
  updateDiskMonitor();
}

function setupPlaygroundListeners() {
  // Tab Switchers
  const leftTabs = document.querySelectorAll('.playground-left-panel .panel-tab-btn');
  leftTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      leftTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      if (target === 'terminal') {
        document.getElementById('playground-terminal-tab').style.display = 'flex';
        document.getElementById('playground-editor-tab').style.display = 'none';
        const inputEl = document.getElementById('cli-terminal-input');
        if (inputEl) inputEl.focus();
      } else {
        document.getElementById('playground-terminal-tab').style.display = 'none';
        document.getElementById('playground-editor-tab').style.display = 'flex';
        document.getElementById('script-editor-textarea').focus();
      }
    });
  });

  const rightTabs = document.querySelectorAll('.playground-right-panel .panel-tab-btn');
  rightTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      rightTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      
      const tabChallenges = document.getElementById('playground-challenges-tab');
      const tabDiskMonitor = document.getElementById('playground-disk-monitor-tab');
      const tabQuickRef = document.getElementById('playground-quick-ref-tab');
      
      if (target === 'challenges') {
        if (tabChallenges) tabChallenges.style.display = 'flex';
        if (tabDiskMonitor) tabDiskMonitor.style.display = 'none';
        if (tabQuickRef) tabQuickRef.style.display = 'none';
        renderPlaygroundChallenges();
      } else if (target === 'disk-monitor') {
        if (tabChallenges) tabChallenges.style.display = 'none';
        if (tabDiskMonitor) tabDiskMonitor.style.display = 'block';
        if (tabQuickRef) tabQuickRef.style.display = 'none';
        updateDiskMonitor();
      } else {
        if (tabChallenges) tabChallenges.style.display = 'none';
        if (tabDiskMonitor) tabDiskMonitor.style.display = 'none';
        if (tabQuickRef) tabQuickRef.style.display = 'block';
      }
    });
  });

  // Log container click handler to focus terminal input
  const logContainer = document.getElementById('terminal-log-container');
  if (logContainer) {
    logContainer.addEventListener('click', () => {
      if (window.getSelection().toString()) return;
      const inputEl = document.getElementById('cli-terminal-input');
      if (inputEl) inputEl.focus();
    });
  }

  // Script Editor Run Button
  const runScriptBtn = document.getElementById('run-script-btn');
  if (runScriptBtn) {
    runScriptBtn.addEventListener('click', executeScriptEditorCode);
  }

  // Script Editor Clear Button
  const clearEditorBtn = document.getElementById('clear-editor-btn');
  if (clearEditorBtn) {
    clearEditorBtn.addEventListener('click', () => {
      document.getElementById('script-editor-textarea').value = '';
      document.getElementById('editor-output-log').textContent = '';
    });
  }
}

function handleTerminalKeydown(e) {
  const cliInput = document.getElementById('cli-terminal-input');
  if (!cliInput) return;

  const history = state.playgroundShell.terminalHistory;
  
  if (e.key === 'Enter') {
    const cmd = cliInput.value.trim();
    
    // Replace the active row with a static line representing the prompt + what was typed
    const activeRow = document.getElementById('terminal-active-row');
    if (activeRow) {
      const lineEl = document.createElement('div');
      lineEl.className = 'terminal-log-line command-input';
      
      const promptSpan = document.createElement('span');
      promptSpan.className = 'terminal-prompt';
      promptSpan.textContent = getPromptString() + ' ';
      lineEl.appendChild(promptSpan);

      const cmdSpan = document.createElement('span');
      cmdSpan.className = 'terminal-cmd-text';
      cmdSpan.textContent = cliInput.value;
      lineEl.appendChild(cmdSpan);

      activeRow.parentNode.replaceChild(lineEl, activeRow);
    }

    if (cmd) {
      // Save to history
      history.push(cmd);
      state.playgroundShell.historyIndex = history.length;

      // Execute
      executePlaygroundCommand(cmd);
    } else {
      // Just append a fresh prompt row
      appendActivePromptRow();
    }
  } 
  else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (history.length > 0 && state.playgroundShell.historyIndex > 0) {
      state.playgroundShell.historyIndex--;
      cliInput.value = history[state.playgroundShell.historyIndex];
    }
  } 
  else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (state.playgroundShell.historyIndex < history.length - 1) {
      state.playgroundShell.historyIndex++;
      cliInput.value = history[state.playgroundShell.historyIndex];
    } else {
      state.playgroundShell.historyIndex = history.length;
      cliInput.value = '';
    }
  } 
  else if (e.key === 'Tab') {
    e.preventDefault();
    handleTabCompletion(cliInput);
  }
}

function handleTabCompletion(inputEl) {
  const value = inputEl.value;
  const parts = value.split(/\s+/);
  const lastPart = parts[parts.length - 1];

  if (!lastPart) {
    return;
  }

  const candidates = [];
  const currentDir = state.playgroundShell.cwd;
  const files = Object.keys(state.playgroundShell.fs || {});
  const dirs = Array.from(state.playgroundShell.directories || []);

  const prefix = lastPart;
  const isAbs = prefix.startsWith('/');
  
  const toSearch = [...files, ...dirs];
  for (const item of toSearch) {
    let matchCandidate = '';
    if (isAbs) {
      if (item.startsWith(prefix)) {
        matchCandidate = item;
      }
    } else {
      const relPath = item.startsWith(currentDir + '/') ? item.slice(currentDir.length + 1) : '';
      if (relPath && relPath.startsWith(prefix)) {
        matchCandidate = relPath;
      }
    }

    if (matchCandidate && !candidates.includes(matchCandidate)) {
      candidates.push(matchCandidate);
    }
  }

  if (parts.length === 1) {
    const commands = [
      'ls', 'cd', 'pwd', 'mkdir', 'rm', 'touch', 'cat', 'echo', 'grep', 'find', 'clear', 'help',
      'pvcreate', 'vgcreate', 'lvcreate', 'lvextend', 'pvdisplay', 'vgdisplay', 'lvdisplay', 'ufw', 'netplan'
    ];
    for (const cmd of commands) {
      if (cmd.startsWith(lastPart) && !candidates.includes(cmd)) {
        candidates.push(cmd);
      }
    }
  }

  if (candidates.length === 1) {
    parts[parts.length - 1] = candidates[0];
    inputEl.value = parts.join(' ');
  } else if (candidates.length > 1) {
    appendTerminalOutput('\n' + candidates.sort().join('   ') + '\n', 'tab-completion-list');
  }
}

function executePlaygroundCommand(cmd) {
  const logContainer = document.getElementById('terminal-log-container');
  if (!logContainer) return;

  if (cmd.trim().toLowerCase() === 'clear') {
    logContainer.innerHTML = '';
    appendActivePromptRow();
    return;
  }

  if (cmd.trim().toLowerCase() === 'help') {
    const helpText = `Supported commands:
  - Navigation: cd, pwd, ls
  - File operations: touch, mkdir, rm, cat, echo, cp, mv, grep, find, tar
  - Disk & LVM: pvcreate, vgcreate, lvcreate, lvextend, pvdisplay, vgdisplay, lvdisplay
  - Network & Sec: ufw, netplan
  - Other: help, clear, exit
Standard loops (for, while) and condition variables work too!`;
    appendTerminalOutput(helpText, 'command-stdout');
    appendActivePromptRow();
    return;
  }

  const result = simulateBash(cmd, "", state.playgroundShell);

  if (result.output) {
    appendTerminalOutput(result.output, 'command-stdout');
  }
  if (result.error) {
    appendTerminalOutput(result.error + '\n', 'command-stderr');
  }

  appendActivePromptRow();
  renderPlaygroundSidebar();
  updateDiskMonitor();
}

function appendActivePromptRow() {
  const logContainer = document.getElementById('terminal-log-container');
  if (!logContainer) return;

  const existing = document.getElementById('terminal-active-row');
  if (existing) {
    existing.remove();
  }

  const activeRow = document.createElement('div');
  activeRow.className = 'terminal-input-row-inline';
  activeRow.id = 'terminal-active-row';

  const promptSpan = document.createElement('span');
  promptSpan.className = 'terminal-prompt';
  promptSpan.id = 'terminal-prompt-text';
  promptSpan.textContent = getPromptString() + ' ';
  activeRow.appendChild(promptSpan);

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.id = 'cli-terminal-input';
  inputEl.autocomplete = 'off';
  inputEl.spellcheck = false;
  
  activeRow.appendChild(inputEl);
  logContainer.appendChild(activeRow);

  // Add event listener to the new input
  inputEl.addEventListener('keydown', handleTerminalKeydown);

  // Focus
  inputEl.focus();

  // Scroll container to bottom
  logContainer.scrollTop = logContainer.scrollHeight;
}

function appendTerminalLine(text, className) {
  const logContainer = document.getElementById('terminal-log-container');
  if (!logContainer) return;

  const lineEl = document.createElement('div');
  lineEl.className = 'terminal-log-line ' + className;

  if (className === 'command-input') {
    const promptSpan = document.createElement('span');
    promptSpan.className = 'terminal-prompt';
    promptSpan.textContent = getPromptString() + ' ';
    lineEl.appendChild(promptSpan);

    const cmdSpan = document.createElement('span');
    cmdSpan.className = 'terminal-cmd-text';
    cmdSpan.textContent = text;
    lineEl.appendChild(cmdSpan);
  } else {
    lineEl.textContent = text;
  }

  const activeRow = document.getElementById('terminal-active-row');
  if (activeRow) {
    logContainer.insertBefore(lineEl, activeRow);
  } else {
    logContainer.appendChild(lineEl);
  }
  logContainer.scrollTop = logContainer.scrollHeight;
}

function appendTerminalOutput(text, className) {
  const logContainer = document.getElementById('terminal-log-container');
  if (!logContainer) return;

  const preEl = document.createElement('pre');
  preEl.className = 'terminal-log-pre ' + className;
  preEl.textContent = text;

  const activeRow = document.getElementById('terminal-active-row');
  if (activeRow) {
    logContainer.insertBefore(preEl, activeRow);
  } else {
    logContainer.appendChild(preEl);
  }
  logContainer.scrollTop = logContainer.scrollHeight;
}

function getPromptString() {
  const cwd = state.playgroundShell.cwd;
  let displayCwd = cwd;
  if (cwd === '/home/student') {
    displayCwd = '~';
  } else if (cwd.startsWith('/home/student/')) {
    displayCwd = '~' + cwd.slice(13);
  }
  return `student@ubuntu:${displayCwd}$`;
}

function updatePromptText() {
  const promptEl = document.getElementById('terminal-prompt-text');
  if (promptEl) {
    promptEl.textContent = getPromptString() + ' ';
  }
}

function executeScriptEditorCode() {
  const scriptArea = document.getElementById('script-editor-textarea');
  const outputLog = document.getElementById('editor-output-log');
  if (!scriptArea || !outputLog) return;

  const code = scriptArea.value.trim();
  if (!code) {
    outputLog.textContent = 'No code to run.';
    return;
  }

  outputLog.textContent = 'Running script...';

  const result = simulateBash(code, "", state.playgroundShell);

  let outText = '';
  if (result.output) {
    outText += result.output;
  }
  if (result.error) {
    outText += (outText ? '\nError: ' : 'Error: ') + result.error;
  }

  outputLog.textContent = outText || 'Script completed with no output.';

  renderPlaygroundSidebar();
  updateDiskMonitor();
}

function updateDiskMonitor() {
  const container = document.getElementById('disk-monitor-container');
  if (!container) return;

  container.innerHTML = '';

  const lvm = state.playgroundShell.lvm;
  const pvs = lvm.pvs || [];
  const vgs = lvm.vgs || {};
  const lvs = lvm.lvs || {};

  // 1. Block Devices Section
  const blockTitle = document.createElement('h4');
  blockTitle.className = 'disk-section-title';
  blockTitle.textContent = 'Block Devices & Physical Volumes (PVs)';
  container.appendChild(blockTitle);

  const disksGrid = document.createElement('div');
  disksGrid.className = 'disks-grid';

  const defaultDisks = [
    { name: 'sda', path: '/dev/sda', size: '20.00 GiB', partitions: ['/dev/sda1', '/dev/sda2'] },
    { name: 'sdb', path: '/dev/sdb', size: '20.00 GiB', partitions: ['/dev/sdb1'] }
  ];

  defaultDisks.forEach(disk => {
    const diskCard = document.createElement('div');
    diskCard.className = 'disk-card';
    
    // Header
    const diskHeader = document.createElement('div');
    diskHeader.className = 'disk-card-header';
    diskHeader.innerHTML = `
      <strong>${disk.name}</strong>
      <span>${disk.size}</span>
    `;
    diskCard.appendChild(diskHeader);

    // Is the entire disk a PV?
    const isDiskPV = pvs.includes(disk.path);
    if (isDiskPV) {
      const pvLabel = document.createElement('div');
      pvLabel.className = 'pv-badge';
      const vgName = Object.keys(vgs).find(vgKey => vgs[vgKey].pvs.includes(disk.path)) || 'Unallocated';
      pvLabel.textContent = `PV: ${disk.path} (VG: ${vgName})`;
      diskCard.appendChild(pvLabel);
    } else {
      const partsContainer = document.createElement('div');
      partsContainer.className = 'partitions-container';

      disk.partitions.forEach(part => {
        const partEl = document.createElement('div');
        const isPartPV = pvs.includes(part);
        partEl.className = `part-item ${isPartPV ? 'is-pv' : ''}`;
        
        const vgName = isPartPV ? (Object.keys(vgs).find(vgKey => vgs[vgKey].pvs.includes(part)) || 'Unallocated') : '';
        partEl.innerHTML = `
          <strong>${part.split('/').pop()}</strong>
          ${isPartPV ? `<span class="vg-tag">${vgName}</span>` : '<span class="free-tag">Raw Partition</span>'}
        `;
        partsContainer.appendChild(partEl);
      });
      diskCard.appendChild(partsContainer);
    }

    disksGrid.appendChild(diskCard);
  });

  const handledPaths = ['/dev/sda', '/dev/sdb', '/dev/sda1', '/dev/sda2', '/dev/sdb1'];
  const extraPVs = pvs.filter(pv => !handledPaths.includes(pv));
  if (extraPVs.length > 0) {
    const extraDiskCard = document.createElement('div');
    extraDiskCard.className = 'disk-card extra-disks';
    extraDiskCard.innerHTML = `<div class="disk-card-header"><strong>Other PVs</strong></div>`;
    const partsContainer = document.createElement('div');
    partsContainer.className = 'partitions-container';
    extraPVs.forEach(pv => {
      const partEl = document.createElement('div');
      partEl.className = 'part-item is-pv';
      const vgName = Object.keys(vgs).find(vgKey => vgs[vgKey].pvs.includes(pv)) || 'Unallocated';
      partEl.innerHTML = `
        <strong>${pv}</strong>
        <span class="vg-tag">${vgName}</span>
      `;
      partsContainer.appendChild(partEl);
    });
    extraDiskCard.appendChild(partsContainer);
    disksGrid.appendChild(extraDiskCard);
  }

  container.appendChild(disksGrid);

  // 2. Volume Groups Section
  const vgTitle = document.createElement('h4');
  vgTitle.className = 'disk-section-title';
  vgTitle.textContent = 'Volume Groups (VGs) & Logical Volumes (LVs)';
  container.appendChild(vgTitle);

  const vgsContainer = document.createElement('div');
  vgsContainer.className = 'vgs-container';

  const vgKeys = Object.keys(vgs);
  if (vgKeys.length === 0) {
    const noVg = document.createElement('div');
    noVg.className = 'no-lvm-message';
    noVg.textContent = 'No Volume Groups created yet. Create one with: vgcreate <vg_name> <pv_path>';
    vgsContainer.appendChild(noVg);
  } else {
    vgKeys.forEach(vgName => {
      const vgObj = vgs[vgName];
      const vgCard = document.createElement('div');
      vgCard.className = 'vg-card';

      const vgHeader = document.createElement('div');
      vgHeader.className = 'vg-card-header';
      vgHeader.innerHTML = `
        <strong>${vgName}</strong>
        <span>Size: ${vgObj.size}</span>
      `;
      vgCard.appendChild(vgHeader);

      const vgPvs = document.createElement('div');
      vgPvs.className = 'vg-pvs-list';
      vgPvs.textContent = `Member PVs: ${vgObj.pvs.join(', ')}`;
      vgCard.appendChild(vgPvs);

      const lvsInVg = Object.keys(lvs).filter(lvName => lvs[lvName].vg === vgName);
      const lvsContainer = document.createElement('div');
      lvsContainer.className = 'lvs-container';

      if (lvsInVg.length === 0) {
        lvsContainer.innerHTML = `<span class="no-lvs-txt">No Logical Volumes. Create one with: lvcreate -L <size> -n <lv_name> ${vgName}</span>`;
      } else {
        lvsInVg.forEach(lvName => {
          const lvObj = lvs[lvName];
          const lvEl = document.createElement('div');
          lvEl.className = 'lv-item';
          lvEl.innerHTML = `
            <div class="lv-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path></svg>
            </div>
            <div class="lv-info">
              <strong>${lvName}</strong>
              <span>${lvObj.size} (${lvObj.path})</span>
            </div>
          `;
          lvsContainer.appendChild(lvEl);
        });
      }
      vgCard.appendChild(lvsContainer);
      vgsContainer.appendChild(vgCard);
    });
  }
  container.appendChild(vgsContainer);
}
