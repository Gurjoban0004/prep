// prep — Supports ES & IoT, Computer Networks, and Linux

// ============================================================
//  CONFIGURATION
// ============================================================
const CONFIG = {
  subjects: {
    java_abstractions: {
      label: "Programming Abstractions in Java",
      shortLabel: "Java PA",
      tagline: "Collections, streams, SQL, JDBC & threads",
      code: "24CSE0314",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      examTime: new Date("2026-12-10T09:30:00+05:30").getTime(),
      semester: 5,
      course: {
        credits: 4, ltp: '2-0-4',
        grading: [['Sessional tests (both compulsory)', 40], ['End term exam (online)', 60]],
        books: ['Herbert Schildt — Java: The Complete Reference (12th ed.)', 'Cay S. Horstmann — Core Java Volume I: Fundamentals (12th ed.)', 'Joshua Bloch — Effective Java (3rd ed.)']
      },
      storageKey: "java_abstractions_mastered_topics",
      storageKeyPractice: "java_abstractions_mcq_answers",
      scripts: ["java_abstractions-data.js"],
      data: {},
      mcqs: null,
      themeColors: {
        st1: '#5F7AE0',
        st2: '#81B29A',
        endTerm: '#B58A3D',
        lab: '#3D405B',
        practice: '#8C4735'
      },
      sectionNames: {
        st1: 'ST-1 — Java Core, Collections, Streams & JVM',
        st2: 'ST-2 — SQL, JDBC & DAO',
        endTerm: 'End Term — Multithreading & Concurrency',
        lab: 'Lab Programs (Experiments 1-60)',
        practice: 'Topic-Wise MCQs'
      },
      tabs: [
        { id: 'st1', label: 'ST-1' },
        { id: 'st2', label: 'ST-2' },
        { id: 'endTerm', label: 'End Term' },
        { id: 'lab', label: 'Lab' },
        { id: 'practice', label: 'MCQs' }
      ]
    },
    algo: {
      label: "Algorithm Design & Implementation",
      shortLabel: "Algo",
      tagline: "Complexity, greedy, DP, trees & graphs",
      code: "24CSE0317",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="18" r="3"></circle><path d="M6 9v6a3 3 0 0 0 3 3h6"></path></svg>',
      examTime: null,
      semester: 5,
      course: {
        credits: 4, ltp: '2-0-4',
        grading: [['Test Pad coding series', 10], ['Formative assessments (best 4 of 5)', 10], ['Sessional tests (best 1 of 2)', 30], ['End term exam', 50]],
        books: ['Debasis Samanta — Classic Data Structures (PHI)', 'Horowitz & Sahni — Fundamentals of Data Structures', 'S. Sridhar — Design and Analysis of Algorithms (OUP)']
      },
      storageKey: "algo_mastered_topics",
      storageKeyPractice: "algo_mcq_answers",
      scripts: ["algo-data.js"],
      data: {},
      mcqs: null,
      sectionNames: {
        st1: 'ST-1 — Complexity, Arrays, Greedy, Stacks & Hashing (60%)',
        st2: 'ST-2 — Recursion, Trees, Heaps & Graphs (40%)',
        lab: 'Lab Programs (Experiments 1-60)',
        cheatSheet: 'Cheat Sheet — Complexities & Patterns',
        practice: 'Topic-Wise MCQs'
      },
      tabs: [
        { id: 'st1', label: 'ST-1' },
        { id: 'st2', label: 'ST-2' },
        { id: 'lab', label: 'Lab' },
        { id: 'cheatSheet', label: 'Cheat Sheet' },
        { id: 'practice', label: 'MCQs' }
      ]
    },
    aiml: {
      label: "Artificial Intelligence & Machine Learning",
      shortLabel: "AI & ML",
      tagline: "ML workflow, models & evaluation",
      code: "24CSE0316",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><circle cx="5" cy="6" r="2"></circle><circle cx="19" cy="6" r="2"></circle><circle cx="5" cy="18" r="2"></circle><circle cx="19" cy="18" r="2"></circle><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"></path></svg>',
      examTime: null,
      semester: 5,
      course: {
        credits: 3, ltp: '2-0-2',
        grading: [['Continuous evaluation (average of 2)', 20], ['Sessional test', 20], ['End term — project', 30], ['End term — MCQ (online)', 30]],
        books: ['Russell & Norvig — Artificial Intelligence: A Modern Approach', 'Aurélien Géron — Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow', 'Müller & Guido — Introduction to Machine Learning with Python']
      },
      storageKey: "aiml_mastered_topics",
      storageKeyPractice: "aiml_mcq_answers",
      scripts: ["aiml-data.js"],
      data: {},
      mcqs: null,
      sectionNames: {
        st1: 'ST-1 — AI Foundations, Data Prep & Supervised Learning (70%)',
        endTerm: 'End Term — Unsupervised, Association Rules & RL (30%)',
        lab: 'Lab — Python Experiments & Mini Project',
        cheatSheet: 'Formula & Decision Sheets',
        practice: 'Topic-Wise MCQs'
      },
      tabs: [
        { id: 'st1', label: 'ST-1' },
        { id: 'endTerm', label: 'End Term' },
        { id: 'lab', label: 'Lab' },
        { id: 'cheatSheet', label: 'Formulas' },
        { id: 'practice', label: 'MCQs' }
      ]
    },
    sysdesign: {
      label: "System Design",
      shortLabel: "SysDesign",
      tagline: "Scalability, databases, networking & caching",
      code: "24CSE0318",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="6" rx="1"></rect><rect x="2" y="15" width="20" height="6" rx="1"></rect><path d="M7 9v6M17 9v6"></path></svg>',
      examTime: null,
      semester: 5,
      course: {
        credits: 3, ltp: '2-0-2',
        grading: [['Formative — presentation & viva', 10], ['Sessional tests (both compulsory)', 30], ['End term exam (online)', 60]],
        books: ['Kendall & Kendall — Systems Analysis and Design', 'Silberschatz, Korth & Sudarshan — Database System Concepts', 'Silberschatz, Galvin & Gagne — Operating System Concepts Essentials']
      },
      storageKey: "sysdesign_mastered_topics",
      storageKeyPractice: "sysdesign_mcq_answers",
      scripts: ["sysdesign-data.js"],
      data: {},
      mcqs: null,
      sectionNames: {
        st1: 'ST-1 — Fundamentals, Databases & Networking',
        st2: 'ST-2 — Frameworks, Security, DevOps & Low Level Design',
        endTerm: 'End Term — Caching & Distributed Caches',
        lab: 'Lab — Case Studies, Schema, SQL, API & Security Design',
        cheatSheet: 'Cheat Sheet — Numbers & Comparisons',
        practice: 'Topic-Wise MCQs'
      },
      tabs: [
        { id: 'st1', label: 'ST-1' },
        { id: 'st2', label: 'ST-2' },
        { id: 'endTerm', label: 'End Term' },
        { id: 'lab', label: 'Lab' },
        { id: 'cheatSheet', label: 'Cheat Sheet' },
        { id: 'practice', label: 'MCQs' }
      ]
    },
    aptitude: {
      label: "Numerical Aptitude & Logical Reasoning-I",
      shortLabel: "Aptitude",
      tagline: "Arithmetic, reasoning & verbal ability",
      code: "25UNI0110",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="7" x2="16" y2="7"></line><line x1="8" y1="12" x2="8" y2="12"></line><line x1="12" y1="12" x2="12" y2="12"></line><line x1="16" y1="12" x2="16" y2="12"></line><line x1="8" y1="17" x2="16" y2="17"></line></svg>',
      examTime: null,
      semester: 5,
      course: {
        credits: 3, ltp: '3-0-0',
        grading: [['Formative assessment (best 1 of 2)', 20], ['Sessional test (best 1 of 2)', 30], ['End term — MCQs on Testpad', 50]],
        books: ['R. S. Aggarwal — Quantitative Aptitude for Competitive Examinations', 'R. S. Aggarwal — A Modern Approach to Logical Reasoning', 'S. P. Bakshi — Objective General English']
      },
      storageKey: "aptitude_mastered_topics",
      storageKeyPractice: "aptitude_mcq_answers",
      scripts: ["aptitude-data.js"],
      data: {},
      mcqs: null,
      sectionNames: {
        st1: 'ST-1 — Logic, Numbers, Ratio & Syllogism (Modules 1–2)',
        st2: 'ST-2 — Percentage, Coding, Interest & Series (Modules 3–4)',
        endTerm: 'End Term — Time & Work, Calendar, Clock & Verbal (Modules 5–6)',
        cheatSheet: 'Formula Sheet',
        practice: 'Module-Wise MCQs'
      },
      tabs: [
        { id: 'st1', label: 'ST-1' },
        { id: 'st2', label: 'ST-2' },
        { id: 'endTerm', label: 'End Term' },
        { id: 'cheatSheet', label: 'Formulas' },
        { id: 'practice', label: 'MCQs' }
      ]
    },
    iot: {
      label: "ES & IoT",
      shortLabel: "IoT",
      tagline: "Exam notes, cheat sheet, practice",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"></path></svg>',
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
      shortLabel: "CN",
      tagline: "Layered units and quiz practice",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="9" height="9"></rect><rect x="13" y="2" width="9" height="9"></rect><rect x="13" y="13" width="9" height="9"></rect><rect x="2" y="13" width="9" height="9"></rect></svg>',
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
      shortLabel: "Linux",
      tagline: "MCQs plus a virtual Bash terminal",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>',
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
        practiceTest1: 'Practice Test 1'
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
      shortLabel: "Java",
      tagline: "LeetCode-style coding practice",
      icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      examTime: null,
      storageKey: "java_mastered_topics",
      storageKeyPractice: "java_practice_answers",
      storageKeyJava: "java_dsa_progress",
      data: {},
      mcqs: null,
      javaProblems: null,
      themeColors: {
        javaFA: '#E07A5F',
        javaExam: '#81B29A',
        javaTestpad: '#3D405B'
      },
      sectionNames: {
        javaFA: 'Formative Assessment (FA)',
        javaExam: 'Recent Exam Questions',
        javaTestpad: 'Testpad Practice'
      },
      tabs: [
        { id: 'javaFA', label: 'FA' },
        { id: 'javaExam', label: 'Exam' },
        { id: 'javaTestpad', label: 'Testpad' }
      ]
    }
  }
};

// ============================================================
//  UTILITIES
// ============================================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const SUBJECT_SCRIPT_GROUPS = {
  iot: ['data.js'],
  cn: ['data.js', 'cn-data-st1.js', 'cn-data-st2.js', 'cn-data-endterm.js', 'cn-data-cheatsheet.js', 'cn-data.js', 'solver-engine.js'],
  linux: ['linux-notes-data.js', 'linux-data.js', 'bash-engine.js'],
  java: ['java-data.js', 'new-java-data.js', 'java-engine.js?v=3']
};

const loadedScriptSrcs = new Set();
const subjectLoadPromises = {};
const hydratedSubjects = {};
let subjectNavigationId = 0;

function loadScriptOnce(src) {
  if (loadedScriptSrcs.has(src)) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-lazy-src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', () => {
        loadedScriptSrcs.add(src);
        resolve();
      });
      existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.dataset.lazySrc = src;
    script.onload = () => {
      loadedScriptSrcs.add(src);
      resolve();
    };
    script.onerror = () => { script.remove(); reject(new Error(`Failed to load ${src}`)); };
    document.body.appendChild(script);
  });
}

function hydrateSubjectData(subjectId) {
  if (subjectId === 'iot') {
    CONFIG.subjects.iot.data = typeof STUDY_DATA !== 'undefined' ? STUDY_DATA : {};
    CONFIG.subjects.iot.mcqs = typeof IOT_MCQ_BANK !== 'undefined' ? IOT_MCQ_BANK : [];
  } else if (subjectId === 'cn') {
    CONFIG.subjects.cn.data = typeof CN_STUDY_DATA !== 'undefined' ? CN_STUDY_DATA : {};
    CONFIG.subjects.cn.mcqs = typeof CN_MCQ_BANK !== 'undefined' ? CN_MCQ_BANK : [];
  } else if (subjectId === 'linux') {
    CONFIG.subjects.linux.mcqs = typeof LINUX_MCQ_BANK !== 'undefined' ? LINUX_MCQ_BANK : [];
    CONFIG.subjects.linux.bashProblems = typeof LINUX_BASH_PROBLEMS !== 'undefined' ? LINUX_BASH_PROBLEMS : [];
    CONFIG.subjects.linux.data = {
      notes: typeof LINUX_NOTES !== 'undefined' ? LINUX_NOTES : [],
      cheatSheet: typeof LINUX_CHEATSHEET !== 'undefined' ? LINUX_CHEATSHEET : [],
      practiceTest1: typeof LINUX_PRACTICE_TEST_1 !== 'undefined' ? LINUX_PRACTICE_TEST_1 : []
    };
  } else if (subjectId === 'java') {
    CONFIG.subjects.java.javaProblems = typeof JAVA_DSA_PROBLEMS !== 'undefined' ? JAVA_DSA_PROBLEMS : [];
  } else if (CONFIG.subjects[subjectId].pending) {
    CONFIG.subjects[subjectId].data = buildSyllabusPreview(CONFIG.subjects[subjectId]);
    CONFIG.subjects[subjectId].mcqs = [];
  } else if (CONFIG.subjects[subjectId]) {
    const globalPrefix = subjectId.toUpperCase();
    try { const d = eval(globalPrefix + '_STUDY_DATA'); if (d) CONFIG.subjects[subjectId].data = d; } catch (e) {}
    try { const m = eval(globalPrefix + '_MCQ_BANK'); if (m) CONFIG.subjects[subjectId].mcqs = m; } catch (e) {}
  }

  hydratedSubjects[subjectId] = true;
}

// Subjects whose notes aren't written yet still get a real, browsable syllabus
// outline built straight from their course handout (CHO).
function buildSyllabusPreview(subject) {
  const data = {};
  Object.keys(subject.syllabus || {}).forEach(sectionId => {
    data[sectionId] = subject.syllabus[sectionId].map(unit => ({
      title: unit.unit,
      subtitle: `${unit.points.length} syllabus topics`,
      html: `
        <div class="callout callout-tip">
          <strong>Notes are being written.</strong> This is the official syllabus outline for
          ${escapeHtml(subject.label)}${subject.code ? ' (' + escapeHtml(subject.code) + ')' : ''},
          straight from the course handout. Detailed notes for this subject land here next —
          they are being added one subject at a time.
        </div>
        <h3>${escapeHtml(unit.unit)}</h3>
        <ul>${unit.points.map(pt => `<li>${escapeHtml(pt)}</li>`).join('')}</ul>
      `
    }));
  });
  return data;
}

async function ensureSubjectDataLoaded(subjectId) {
  if (hydratedSubjects[subjectId]) return;
  if (subjectLoadPromises[subjectId]) return subjectLoadPromises[subjectId];

  subjectLoadPromises[subjectId] = (async () => {
    const scripts = CONFIG.subjects[subjectId]?.scripts || SUBJECT_SCRIPT_GROUPS[subjectId] || [];
    for (const src of scripts) {
      await loadScriptOnce(src);
    }
    hydrateSubjectData(subjectId);
  })().catch(error => { delete subjectLoadPromises[subjectId]; throw error; });

  return subjectLoadPromises[subjectId];
}

function renderSubjectLoading(label) {
  elements.welcomeScreen.style.display = 'flex';
  elements.readingPane.style.display = 'none';
  elements.topicList.innerHTML = '';
  elements.progressPercent.textContent = 'Loading...';
  elements.progressBar.style.width = '0%';
  elements.welcomeScreen.innerHTML = `
    <div class="study-loading" role="status" aria-busy="true">
      <p>Opening ${escapeHtml(label)}…</p>
      <div class="study-loading-line"></div><div class="study-loading-line"></div><div class="study-loading-line"></div>
    </div>
  `;
}

function renderSubjectLoadError(label, error) {
  elements.welcomeScreen.style.display = 'flex';
  elements.readingPane.style.display = 'none';
  elements.welcomeScreen.innerHTML = `
    <div class="java-error-panel" style="max-width: 560px;">
      <h4>Could not load ${escapeHtml(label)}</h4>
      <p>${escapeHtml(error.message || String(error))}</p>
      <button class="desk-btn-primary fam-lavender" type="button" data-subject="${state.activeSubject}">Try again</button>
      <button class="desk-btn-ghost" type="button" data-nav="home">Back to your desk</button>
    </div>
  `;
}

// ============================================================
//  STATE
// ============================================================
let state = {
  activeSubject: 'iot',
  activeSection: 'st1',
  activeTopicIndex: 0,
  searchQuery: '',
  selectedSectionFilter: 'All',
  mastered: {},
  expandedJavaSections: {},
  practiceAnswers: {},
  bashProgress: {
    linux: {}
  },
  javaProgress: {
    java: {}
  },
  smartNotes: [],
  starredMcqs: {},
  notesFilterSubject: 'all',
  quizFilter: 'all',
  quizUnitIndex: 0,
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

Object.keys(CONFIG.subjects).forEach(sub => {
  state.mastered[sub] = {};
  CONFIG.subjects[sub].tabs.forEach(tab => { state.mastered[sub][tab.id] = []; });
  state.practiceAnswers[sub] = {};
  state.starredMcqs[sub] = [];
});

// ============================================================
//  DOM ELEMENTS
// ============================================================
const elements = {
  topNavBar: document.getElementById('top-nav-bar'),
  headerSubject: document.getElementById('header-subject'),
  sidebarSubjectName: document.getElementById('sidebar-subject-name'),
  sidebarSectionName: document.getElementById('sidebar-section-name'),
  sidebar: document.getElementById('sidebar-pane'),
  menuToggleBtn: document.getElementById('menu-toggle-btn'),
  desktopSidebarToggle: document.getElementById('desktop-sidebar-toggle'),
  outlineClose: document.getElementById('outline-close'),
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
  mobileBrandTitle: document.getElementById('mobile-brand-title'),
  mobileSectionNav: document.getElementById('mobile-section-nav')
};

// ============================================================
//  INITIALISATION
// ============================================================
function init() {
  loadAllProgress();
  loadSmartNotes();
  loadStarredMcqs();
  setupEventListeners();

  initExperience();

  renderLandingPage();
  initSmartNotesUI();

  if (typeof initThemeToggle === 'function') {
    initThemeToggle();
  }
}

/**
 * Enhances a standard textarea to behave more like a code editor.
 * Features: Tab handling, Auto-indentation on Enter, Auto-closing brackets/quotes.
 */
function setupCodeEditorBehavior(editor) {
  if (!editor) return;

  const AUTO_CLOSE_PAIRS = {
    '(': ')',
    '[': ']',
    '{': '}',
    '"': '"',
    "'": "'",
    '`': '`'
  };

  editor.addEventListener('keydown', (e) => {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const value = editor.value;

    // 1. Tab Key: Insert 4 spaces or handle indentation
    if (e.key === 'Tab') {
      e.preventDefault();

      if (start !== end) {
        const startOfFirstLine = value.slice(0, start).lastIndexOf('\n') + 1;
        const endOfLastLine = value.indexOf('\n', end);
        const actualEnd = endOfLastLine === -1 ? value.length : endOfLastLine;

        const selection = value.slice(startOfFirstLine, actualEnd);
        const lines = selection.split('\n');

        let newSelection;
        if (e.shiftKey) {
          newSelection = lines.map(line => line.startsWith('    ') ? line.slice(4) : (line.startsWith('\t') ? line.slice(1) : line)).join('\n');
        } else {
          newSelection = lines.map(line => '    ' + line).join('\n');
        }

        editor.value = value.slice(0, startOfFirstLine) + newSelection + value.slice(actualEnd);
        editor.setSelectionRange(startOfFirstLine, startOfFirstLine + newSelection.length);
      } else {
        const before = value.slice(0, start);
        const after = value.slice(end);
        editor.value = before + '    ' + after;
        editor.setSelectionRange(start + 4, start + 4);
      }
      editor.dispatchEvent(new Event('input'));
      return;
    }

    // 2. Enter Key: Maintain Indentation
    if (e.key === 'Enter') {
      e.preventDefault();

      const before = value.slice(0, start);
      const after = value.slice(end);

      const lines = before.split('\n');
      const currentLine = lines[lines.length - 1];
      const indentation = currentLine.match(/^\s*/)[0];

      let newText = '\n' + indentation;
      let cursorOffset = newText.length;

      const trimmedLine = currentLine.trim();
      if (trimmedLine.endsWith('{') || trimmedLine.endsWith('(') || trimmedLine.endsWith(':')) {
        newText += '    ';
        cursorOffset += 4;

        const charAfter = after.trim().charAt(0);
        if ((trimmedLine.endsWith('{') && charAfter === '}') || (trimmedLine.endsWith('(') && charAfter === ')')) {
          newText += '\n' + indentation;
        }
      }

      editor.value = before + newText + after;
      editor.setSelectionRange(start + cursorOffset, start + cursorOffset);
      editor.dispatchEvent(new Event('input'));
      return;
    }

    // 3. Auto-close pairs
    const open = e.key;
    if (AUTO_CLOSE_PAIRS.hasOwnProperty(open)) {
      const close = AUTO_CLOSE_PAIRS[open];

      if (start !== end) {
        e.preventDefault();
        const selected = value.slice(start, end);
        editor.value = value.slice(0, start) + open + selected + close + value.slice(end);
        editor.setSelectionRange(start + 1, end + 1);
        editor.dispatchEvent(new Event('input'));
        return;
      }

      e.preventDefault();
      editor.value = value.slice(0, start) + open + close + value.slice(end);
      editor.setSelectionRange(start + 1, start + 1);
      editor.dispatchEvent(new Event('input'));
      return;
    }

    // 4. Backspace: Remove pairs if empty
    if (e.key === 'Backspace' && start === end && start > 0) {
      const charBefore = value.slice(start - 1, start);
      const charAfter = value.slice(start, start + 1);
      if (AUTO_CLOSE_PAIRS[charBefore] === charAfter) {
        e.preventDefault();
        editor.value = value.slice(0, start - 1) + value.slice(start + 1);
        editor.setSelectionRange(start - 1, start - 1);
        editor.dispatchEvent(new Event('input'));
      }
    }
  });
}

/**
 * Synchronizes the editor textarea with its syntax highlighter and line numbers.
 */
function countEditorLines(value) {
  let count = 1;
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) === 10) count++;
  }
  return count;
}

function markEditorHighlightPending(editor) {
  const wrapper = editor?.closest?.('.bash-editor-wrapper');
  if (wrapper) wrapper.classList.remove('editor-highlight-ready');
}

function markEditorHighlightReady(editor) {
  const wrapper = editor?.closest?.('.bash-editor-wrapper');
  if (wrapper) wrapper.classList.add('editor-highlight-ready');
}

function syncEditor(editor, highlighter, lineNumbers) {
  if (!editor) return;

  let lastLineCount = -1;
  let lineNumberFrame = null;
  let previousEditorValue = editor.value;

  const syncScroll = () => {
    if (highlighter) {
      highlighter.scrollTop = editor.scrollTop;
      highlighter.scrollLeft = editor.scrollLeft;
    }
    if (lineNumbers) {
      lineNumbers.scrollTop = editor.scrollTop;
    }
  };

  const updateLineNumbers = () => {
    lineNumberFrame = null;
    if (lineNumbers) {
      const lines = countEditorLines(editor.value);
      if (lines !== lastLineCount) {
        lastLineCount = lines;
        let numbers = '';
        for (let i = 1; i <= lines; i++) {
          numbers += `<div>${i}</div>`;
        }
        lineNumbers.innerHTML = numbers;
      }
    }
    syncScroll();
  };

  const scheduleLineNumberUpdate = (event) => {
    if (!lineNumbers) return;
    const inputType = event?.inputType || '';
    const data = event?.data || '';
    let mayChangeLineCount =
      !event ||
      data.includes('\n') ||
      /insertParagraph|insertLineBreak|insertFromPaste|insertFromDrop|history|insertReplacementText/.test(inputType);

    if (!mayChangeLineCount && inputType === 'deleteContentBackward') {
      const removedIndex = editor.selectionStart;
      mayChangeLineCount =
        previousEditorValue.length - editor.value.length !== 1 ||
        previousEditorValue.charAt(removedIndex) === '\n';
    } else if (!mayChangeLineCount && inputType === 'deleteContentForward') {
      const removedIndex = editor.selectionStart;
      mayChangeLineCount =
        previousEditorValue.length - editor.value.length !== 1 ||
        previousEditorValue.charAt(removedIndex) === '\n';
    } else if (!mayChangeLineCount && inputType.startsWith('delete')) {
      mayChangeLineCount = previousEditorValue.length - editor.value.length !== 1;
    }

    previousEditorValue = editor.value;

    if (!mayChangeLineCount) return;
    if (lineNumberFrame) return;
    lineNumberFrame = requestAnimationFrame(updateLineNumbers);
  };

  editor.addEventListener('scroll', syncScroll, { passive: true });
  editor.addEventListener('input', scheduleLineNumberUpdate);
  // Initial sync
  setTimeout(updateLineNumbers, 50);
}

// ============================================================
//  LOCAL STORAGE PROGRESS
// ============================================================
function loadAllProgress() {
  // Load Mastered topics progress
  Object.keys(CONFIG.subjects).forEach(sub => {
    const key = CONFIG.subjects[sub]?.storageKey;
    if (key) {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          Object.assign(state.mastered[sub], JSON.parse(saved) || {});
        } catch (e) { console.error(`Error loading ${sub} mastered progress`, e); }
      }
    }
  });

  // Load Practice/MCQ progress
  Object.keys(CONFIG.subjects).forEach(sub => {
    const key = CONFIG.subjects[sub]?.storageKeyPractice;
    if (key) {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          state.practiceAnswers[sub] = JSON.parse(saved) || {};
        } catch (e) { console.error(`Error loading ${sub} practice progress`, e); }
      }
    }
  });

  // Load Bash progress (Linux)
  const linuxBashKey = CONFIG.subjects.linux.storageKeyBash;
  if (linuxBashKey) {
    const saved = localStorage.getItem(linuxBashKey);
    if (saved) {
      try {
        state.bashProgress.linux = JSON.parse(saved) || {};
      } catch (e) { console.error("Error loading Linux Bash progress", e); }
    }
  }

  // Load Java DSA progress
  const javaDsaKey = CONFIG.subjects.java.storageKeyJava;
  if (javaDsaKey) {
    const saved = localStorage.getItem(javaDsaKey);
    if (saved) {
      try {
        state.javaProgress.java = JSON.parse(saved) || {};
      } catch (e) { console.error("Error loading Java DSA progress", e); }
    }
  }
}

function saveProgress() {
  const subjectKey = CONFIG.subjects[state.activeSubject].storageKey;
  localStorage.setItem(subjectKey, JSON.stringify(state.mastered[state.activeSubject]));
  if (typeof window.triggerCloudSync === 'function') window.triggerCloudSync();
}

function savePracticeProgress() {
  const subjectKeyPractice = CONFIG.subjects[state.activeSubject].storageKeyPractice;
  localStorage.setItem(subjectKeyPractice, JSON.stringify(state.practiceAnswers[state.activeSubject]));
  if (typeof window.triggerCloudSync === 'function') window.triggerCloudSync();
}

function saveBashProgress() {
  const subjectConfig = CONFIG.subjects[state.activeSubject];
  if (!subjectConfig.storageKeyBash) return;
  localStorage.setItem(subjectConfig.storageKeyBash, JSON.stringify(state.bashProgress[state.activeSubject] || {}));
  if (typeof window.triggerCloudSync === 'function') window.triggerCloudSync();
}

function saveJavaProgress() {
  const subjectConfig = CONFIG.subjects[state.activeSubject];
  if (!subjectConfig.storageKeyJava) return;
  localStorage.setItem(subjectConfig.storageKeyJava, JSON.stringify(state.javaProgress[state.activeSubject] || {}));
  if (typeof window.triggerCloudSync === 'function') window.triggerCloudSync();
}

const scheduleBashProgressSave = debounce(saveBashProgress, 600);
const scheduleJavaProgressSave = debounce(saveJavaProgress, 600);

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
    if (typeof window.triggerCloudSync === 'function') window.triggerCloudSync();
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
      Object.keys(CONFIG.subjects).forEach(sub => {
        if (parsed[sub]) state.starredMcqs[sub] = parsed[sub];
      });
    }
  } catch (e) {
    // TODO(security): Log only non-sensitive error context
  }
}

function saveStarredMcqs() {
  try {
    localStorage.setItem('prep_starred_mcqs', JSON.stringify(state.starredMcqs));
    if (typeof window.triggerCloudSync === 'function') window.triggerCloudSync();
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
  // Mobile menu toggle
  elements.menuToggleBtn.addEventListener('click', () => {
    elements.sidebar.classList.toggle('mobile-open');
  });

  // Desktop sidebar toggle
  if (elements.desktopSidebarToggle) {
    elements.desktopSidebarToggle.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 700px)').matches) {
        const open = elements.sidebar.classList.toggle('mobile-open');
        document.querySelector('.sidebar-scrim').hidden = !open;
        elements.desktopSidebarToggle.setAttribute('aria-expanded', String(open));
        if (open) elements.searchInput.focus();
        return;
      }
      setDesktopOutlineCollapsed(!document.querySelector('.container').classList.contains('sidebar-collapsed'));
    });
  }
  elements.outlineClose?.addEventListener('click', () => setDesktopOutlineCollapsed(true));

  document.getElementById('brand-home')?.addEventListener('click', () => renderLandingPage());
  document.getElementById('sidebar-back')?.addEventListener('click', () => {
    closeMobileSidebar();
    renderSubjectOverview(state.activeSubject);
  });

  // Search filter
  elements.searchInput.addEventListener('input', debounce((e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderSidebar();
  }, 250));

  // Sidebar section filter
  const filterSelect = document.getElementById('sidebar-section-filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      state.selectedSectionFilter = e.target.value;
      state.activeTopicIndex = 0; // reset active topic to the first matching topic
      updateTopics();
    });
  }

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

    // On the quiz page arrows scroll the page; letters/numbers drive the questions.
    if (isMcqSection() && elements.contentArea.querySelector('.quiz-page')) {
      if (handleQuizKey(e)) { e.preventDefault(); return; }
      if (e.key.startsWith('Arrow')) return;
    }

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

    const star = e.target.closest('.mcq-star-btn');
    if (star) { toggleStar(state.activeSubject, parseInt(star.dataset.qid, 10)); return; }

    const filter = e.target.closest('[data-quiz-filter]');
    if (filter) {
      state.quizFilter = filter.dataset.quizFilter;
      renderPracticeUnit(state.quizUnitIndex);
      return;
    }
    const jump = e.target.closest('[data-quiz-jump]');
    if (jump) {
      const qId = parseInt(jump.dataset.quizJump, 10);
      // A filtered-out question can't be scrolled to, so widen the filter first.
      if (!document.getElementById('mcq-' + qId)) { state.quizFilter = 'all'; renderPracticeUnit(state.quizUnitIndex); }
      setQuizCursor(qId, true);
      return;
    }
    const action = e.target.closest('[data-quiz-action]');
    if (action) { quizAction(action.dataset.quizAction); return; }

    const option = e.target.closest('.mcq-option');
    if (option) { answerMcq(option); return; }

    const card = e.target.closest('.quiz-page .mcq-card');
    if (card) setQuizCursor(parseInt(card.dataset.questionId, 10), false);
  });

  elements.welcomeScreen.addEventListener('click', (e) => {
    // Study Desk: explicit resume/open targets (subject + optional section/index)
    const openBtn = e.target.closest('[data-open]');
    if (openBtn) {
      const subject = openBtn.getAttribute('data-subject');
      const section = openBtn.getAttribute('data-section') || null;
      const idxAttr = openBtn.getAttribute('data-index');
      if (subject) resumeTo(subject, section, idxAttr != null ? parseInt(idxAttr, 10) : undefined);
      return;
    }
    // Rail navigation: home + hub pages; Saved opens the notes/starred drawer
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn) {
      const nav = navBtn.getAttribute('data-nav');
      if (nav === 'saved') { toggleSmartNotesPanel(); return; }
      renderLandingPage(HUB_PAGES[nav] ? nav : 'home');
      return;
    }
    // Learning Atlas: chapter tiles / support cards that open a section
    const sectionBtn = e.target.closest('[data-section]');
    if (sectionBtn && !sectionBtn.hasAttribute('data-subject')) {
      setActiveSection(sectionBtn.getAttribute('data-section'));
      return;
    }
    // Subject cards / tiles (Study Desk + legacy landing)
    const subjectCard = e.target.closest('.desk-subject, .landing-subject-card, [data-subject]');
    if (!subjectCard) return;
    const subject = subjectCard.getAttribute('data-subject');
    if (subject) setActiveSubject(subject);
  });
}

function setDesktopOutlineCollapsed(collapsed) {
  const container = document.querySelector('.container');
  container.classList.toggle('sidebar-collapsed', collapsed);
  const label = collapsed ? 'Show topic outline' : 'Hide topic outline';
  elements.desktopSidebarToggle?.setAttribute('aria-label', label);
  elements.desktopSidebarToggle?.setAttribute('title', label);
  elements.desktopSidebarToggle?.setAttribute('aria-expanded', String(!collapsed));
}

function renderLandingPage(page = 'home') {
  subjectNavigationId++;
  if (!HUB_PAGES[page] && page !== 'home') page = 'home';
  // Rescue the header controls before innerHTML below wipes the old desk they live in.
  restoreHeaderControls();
  clearWorkspaceModes();
  document.body.classList.add('landing-mode');
  document.body.classList.remove('overview-mode');
  document.title = page === 'home' ? 'prep' : `${HUB_PAGES[page].title} — prep`;
  elements.welcomeScreen.style.display = 'flex';
  elements.readingPane.style.display = 'none';
  const pgContainer = document.getElementById('playground-workspace-container');
  if (pgContainer) {
    pgContainer.style.display = 'none';
  }
  elements.topNavBar.innerHTML = '';
  if (elements.mobileSectionNav) elements.mobileSectionNav.innerHTML = '';
  elements.topicList.innerHTML = '';
  elements.progressPercent.textContent = '';
  elements.progressBar.style.width = '0%';
  if (elements.mobileBrandTitle) elements.mobileBrandTitle.textContent = 'prep';
  document.documentElement.style.setProperty('--active-accent', 'var(--lavender-ink)');

  elements.welcomeScreen.innerHTML = page === 'home' ? renderStudyDesk() : renderHubPage(page);
  elements.welcomeScreen.scrollTop = 0;
  syncExperience(page);
}

function clearWorkspaceModes() {
  document.getElementById('main-content-pane')?.classList.remove('bash-mode', 'practice-mode', 'playground-mode', 'java-mode');
  document.querySelector('.container')?.classList.remove('practice-active');
}

// Fold the global header's utilities (theme/font pill + auth) into the page header
// on home and hub pages. Nodes are moved (not cloned), so their listeners and
// Firebase's #auth-container lookups keep working.
function foldHeaderIntoDesk() {
  restoreHeaderControls();
}

// Put those controls back into the global header.
function restoreHeaderControls() {
  const headerRight = document.querySelector('header .header-right');
  if (!headerRight) return;
  const zoom = document.querySelector('.zoom-controls');
  const auth = document.getElementById('auth-container');
  if (zoom) headerRight.appendChild(zoom);
  if (auth) headerRight.appendChild(auth);
}

// ── Study Desk home (Phase 2) ───────────────────────────────────────────────
// Pastel families assigned to the four live subjects, matching the mockups.
const DESK_FAMILIES = {
  java_abstractions: 'lavender',
  iot: 'peach',
  cn: 'blue',
  linux: 'mint',
  algo: 'blue', aiml: 'lavender', sysdesign: 'mint', aptitude: 'peach', java: 'lavender'
};
// Four subjects shown in the "Pick up a subject" strip: this semester's core courses.
const DESK_STRIP = ['java_abstractions', 'algo', 'aiml', 'sysdesign'];

function getUserFirstName() {
  try {
    const u = window.firebase && firebase.auth && firebase.auth().currentUser;
    if (u && u.displayName) return u.displayName.trim().split(/\s+/)[0];
  } catch (e) {}
  return '';
}

function greetingFor(date) {
  const h = date.getHours();
  if (h >= 5 && h < 12)  return { part: 'morning',   night: false };
  if (h >= 12 && h < 17) return { part: 'afternoon', night: false };
  if (h >= 17 && h < 22) return { part: 'evening',   night: true };
  return { part: 'night', night: true };
}

// Subject line-art diagrams (stroke = currentColor, tinted by the card's ink).
function deskDiagram(key) {
  const d = {
    java_abstractions: `<svg viewBox="0 0 140 96" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M34 12c-8 0-8 8-8 16 0 8-6 8-6 20 0 12 6 12 6 20 0 8 0 16 8 16" opacity=".55"/><path d="M106 12c8 0 8 8 8 16 0 8 6 8 6 20 0 12-6 12-6 20 0 8 0 16-8 16" opacity=".55"/><circle cx="70" cy="20" r="6"/><circle cx="46" cy="52" r="6"/><circle cx="94" cy="52" r="6"/><circle cx="46" cy="80" r="5"/><circle cx="94" cy="80" r="5"/><path d="M70 26l-24 20M70 26l24 20M46 58v16M94 58v16"/></svg>`,
    iot: `<svg viewBox="0 0 140 96" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="48" r="7"/><path d="M40 48c14-22 32-22 46 0M40 48c14 22 32 22 46 0" opacity=".5"/><path d="M96 30q8 18 0 36" opacity=".7"/><path d="M104 22q14 26 0 52" opacity=".45"/><rect x="112" y="38" width="18" height="20" rx="3"/><path d="M118 38v-6M124 38v-6"/></svg>`,
    cn: `<svg viewBox="0 0 140 96" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="70" cy="20" r="6"/><circle cx="28" cy="52" r="6"/><circle cx="112" cy="52" r="6"/><circle cx="48" cy="80" r="6"/><circle cx="92" cy="80" r="6"/><path d="M70 26l-40 22M70 26l40 22M32 57l14 18M108 57L94 75M52 80h36" opacity=".55"/></svg>`,
    linux: `<svg viewBox="0 0 140 96" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="18" width="108" height="62" rx="6"/><path d="M16 34h108" opacity=".5"/><circle cx="26" cy="26" r="2"/><circle cx="34" cy="26" r="2"/><circle cx="42" cy="26" r="2"/><path d="M30 50l10 8-10 8M46 66h24" opacity=".8"/></svg>`,
    algo: `<svg viewBox="0 0 140 96" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="18" y="62" width="10" height="18" rx="2" opacity=".5"/><rect x="34" y="50" width="10" height="30" rx="2" opacity=".6"/><rect x="50" y="36" width="10" height="44" rx="2" opacity=".75"/><rect x="66" y="22" width="10" height="58" rx="2"/><circle cx="100" cy="22" r="6"/><circle cx="88" cy="50" r="6"/><circle cx="114" cy="50" r="6"/><circle cx="104" cy="76" r="5"/><path d="M97 27l-6 17M103 27l8 17M111 56l-5 15" opacity=".6"/></svg>`,
    aiml: `<svg viewBox="0 0 140 96" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="30" cy="26" r="6"/><circle cx="30" cy="48" r="6"/><circle cx="30" cy="70" r="6"/><circle cx="70" cy="36" r="6"/><circle cx="70" cy="60" r="6"/><circle cx="110" cy="48" r="7"/><path d="M36 26l28 10M36 26l28 34M36 48l28-12M36 48l28 12M36 70l28-34M36 70l28-10M76 36l27 12M76 60l27-12" opacity=".5"/></svg>`,
    sysdesign: `<svg viewBox="0 0 140 96" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="52" y="10" width="36" height="16" rx="4"/><rect x="16" y="44" width="30" height="16" rx="4"/><rect x="55" y="44" width="30" height="16" rx="4"/><rect x="94" y="44" width="30" height="16" rx="4"/><ellipse cx="70" cy="80" rx="18" ry="5"/><path d="M52 80v-4M88 80v-4" opacity=".6"/><path d="M70 26v18M60 26L31 44M80 26l29 18M31 60l30 16M70 60v15M109 60L79 76" opacity=".5"/></svg>`,
    aptitude: `<svg viewBox="0 0 140 96" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="20" y="14" width="44" height="68" rx="6"/><path d="M28 28h28" opacity=".6"/><circle cx="32" cy="46" r="2"/><circle cx="42" cy="46" r="2"/><circle cx="52" cy="46" r="2"/><circle cx="32" cy="58" r="2"/><circle cx="42" cy="58" r="2"/><circle cx="52" cy="58" r="2"/><path d="M30 70h24" opacity=".6"/><circle cx="100" cy="48" r="26" opacity=".5"/><path d="M100 48V30M100 48l13 8"/></svg>`
  };
  return d[key] || d.cn;
}

function deskCardMini(key) { return deskDiagram(key); }

function renderStudyDesk() {
  const now = new Date();
  const name = getUserFirstName();
  const g = greetingFor(now);
  const greetTitle = name ? `Good ${g.part}, ${escapeHtml(name)}` : `Good ${g.part}`;
  const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const subtitle = g.night
    ? `It's ${timeStr}. Let's make this hour count.`
    : `Stay consistent. Small steps every day.`;
  const moon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><path d="M19 3v4M17 5h4" opacity=".7"/></svg>`;
  const sun = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`;

  const activity = safeParse(localStorage.getItem('prep_study_activity'), {});
  const entries = Object.values(activity).sort((a, b) => (b.ts || 0) - (a.ts || 0));
  const resume = entries[0] || null;

  // Upcoming exam = soonest future examTime
  const nowMs = Date.now();
  const exam = Object.keys(CONFIG.subjects)
    .map(k => ({ key: k, ...CONFIG.subjects[k] }))
    .filter(s => s.examTime && s.examTime > nowMs)
    .sort((a, b) => a.examTime - b.examTime)[0];

  return `
    <div class="desk" aria-label="Study Desk home">
      <div class="desk-main">
        <header class="desk-greet">
          <div>
            <h1 class="desk-title"><span class="desk-greet-icon">${g.night ? moon : sun}</span>${greetTitle}</h1>
            <p class="desk-sub">${escapeHtml(subtitle)}</p>
          </div>
          <div class="desk-greet-right"><div class="desk-utils"></div></div>
        </header>

        <div class="desk-grid">
          <div class="desk-col-main">
            ${resume ? renderResumeCard(resume) : renderFirstTimeCard()}
            ${renderSubjectStrip(activity, !!resume)}
          </div>
          <aside class="desk-col-side">
            ${renderExamCard(exam, activity)}
            ${renderQuickPractice()}
          </aside>
        </div>

        <div class="desk-banner">
          <div class="desk-banner-copy">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4-3 7-7 7-12a7 7 0 0 0-14 0c0 5 3 9 7 12z" opacity=".5"/><path d="M12 22V10M12 14c-2 0-4-2-4-4M12 12c2 0 4-2 4-4"/></svg>
            <div>
              <strong>Late nights build great engineers.</strong>
              <span>Stay consistent, take breaks, and trust the process.</span>
            </div>
          </div>
          <button class="desk-plan-btn" type="button" data-settings-open>
            Make yourself comfortable
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    </div>`;
}

const ICON = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  subjects: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  tests: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  labs: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  notes: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  progress: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  settings: '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="9" cy="18" r="2"/>',
  saved: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  chevron: '<polyline points="9 18 15 12 9 6"/>'
};

function svgIcon(paths, size = 18) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

function renderDeskNav(active) {
  const saved = (state.smartNotes || []).length +
    Object.values(state.starredMcqs || {}).reduce((n, list) => n + (Array.isArray(list) ? list.length : 0), 0);
  const items = [['home', 'Home'], ['subjects', 'Subjects'], ['notes', 'Notes'], ['tests', 'Practice'], ['labs', 'Labs'], ['saved', 'Saved'], ['progress', 'Progress']];
  const nav = items.map(([id, label]) => {
    const current = id === active;
    const badge = id === 'saved' && saved ? `<b class="desk-nav-count">${saved}</b>` : '';
    return `
    <button class="desk-nav-item${current ? ' active' : ''}" type="button" data-nav="${id}" aria-label="${label}" title="${label}"${current ? ' aria-current="page"' : ''}>
      ${svgIcon(ICON[id])}<span>${label}</span>${badge}
    </button>`;
  }).join('');
  return `
    <nav class="desk-nav" aria-label="Primary">
      <div class="desk-nav-top">${nav}</div>
      <div class="desk-nav-bottom"><button class="desk-nav-item" type="button" data-settings-open aria-label="Study settings" title="Study settings">${svgIcon(ICON.settings)}<span>Settings</span></button><div class="desk-focus-note">A little focus,<br>a little further.</div></div>
    </nav>`;
}

// ── Hub pages: Subjects / Tests / Labs ──────────────────────────────────────
const HUB_PAGES = {
  notes: { title: 'Notes library', sub: 'Find the concept you need. Take it at your own pace.' },
  progress: { title: 'Your progress', sub: 'Every topic understood is a little less to worry about.' },
  subjects: { title: 'Subjects', sub: 'Every course this semester, with your progress and exam dates.' },
  tests: { title: 'Tests', sub: 'Question banks and practice tests for each course.' },
  labs: { title: 'Labs', sub: 'Lab programs, coding problems and terminal practice.' }
};

function tabKind(tabId) {
  if (/lab|bash|playground/i.test(tabId) || /^java(FA|Exam|Testpad)$/.test(tabId)) return 'lab';
  if (/practice|mcq/i.test(tabId)) return 'test';
  return 'notes';
}

function examLabel(subj) {
  if (!subj.examTime) return 'No exam date';
  const when = new Date(subj.examTime).toLocaleDateString([], { day: 'numeric', month: 'short' });
  if (subj.examTime < Date.now()) return `Exam was ${when}`;
  const days = Math.ceil((subj.examTime - Date.now()) / 86400000);
  return days === 1 ? 'Exam tomorrow' : `Exam in ${days} days`;
}

function hubRow({ fam, icon, title, sub, meta = '', bar = null, aside = '', attrs, muted = false }) {
  return `
    <button class="hub-row fam-${fam}${muted ? ' hub-row--muted' : ''}" type="button" ${attrs}>
      <span class="hub-row-icon">${svgIcon(icon)}</span>
      <span class="hub-row-main">
        <span class="hub-row-title">${title}</span>
        <span class="hub-row-sub">${sub}</span>
      </span>
      <span class="hub-row-meta">
        ${bar != null ? `<span class="hub-bar" aria-hidden="true"><span style="width:${bar}%"></span></span>` : ''}
        <span>${meta}</span>
      </span>
      <span class="hub-row-aside">${aside}</span>
      <span class="hub-row-chev">${svgIcon(ICON.chevron, 16)}</span>
    </button>`;
}

function hubGroup(title, rows, empty) {
  return `
    <section class="hub-group">
      <h2 class="hub-h2">${title}<span class="hub-count">${rows.length}</span></h2>
      ${rows.length ? `<div class="hub-list">${rows.join('')}</div>` : `<p class="hub-empty">${empty}</p>`}
    </section>`;
}

function renderSubjectsHub() {
  const activity = safeParse(localStorage.getItem('prep_study_activity'), {});
  const row = key => {
    const s = CONFIG.subjects[key];
    const done = Object.values(state.mastered[key] || {}).reduce((n, list) => n + list.length, 0);
    const total = activity[key] && activity[key].total;
    let meta = done ? `${done} topics done` : 'Not started';
    let bar = null;
    if (s.pending) meta = 'Syllabus preview';
    else if (total) { bar = Math.round((done / total) * 100); meta = `${done} of ${total} topics`; }
    return hubRow({
      fam: DESK_FAMILIES[key] || 'blue',
      icon: s.icon.replace(/^<svg[^>]*>|<\/svg>$/g, ''),
      title: escapeHtml(s.label),
      sub: escapeHtml([s.code, s.tagline].filter(Boolean).join(' · ')),
      meta, bar,
      aside: s.pending ? '' : examLabel(s),
      attrs: `data-subject="${key}"`,
      muted: s.pending
    });
  };
  const keys = Object.keys(CONFIG.subjects);
  const current = keys.filter(k => CONFIG.subjects[k].semester && !CONFIG.subjects[k].pending);
  const other = keys.filter(k => !CONFIG.subjects[k].semester && !CONFIG.subjects[k].pending);
  const pending = keys.filter(k => CONFIG.subjects[k].pending);
  return hubGroup('This semester', current.map(row), 'No courses yet.') +
    hubGroup('More practice', other.map(row), 'Nothing else yet.') +
    (pending.length ? hubGroup('Notes coming soon', pending.map(row), '') : '');
}

function hubSectionRows(kind, describe) {
  const rows = [];
  Object.entries(CONFIG.subjects).forEach(([key, s]) => {
    if (s.pending) return;
    s.tabs.filter(t => tabKind(t.id) === kind).forEach(t => {
      rows.push(hubRow({
        fam: DESK_FAMILIES[key] || 'blue',
        title: escapeHtml((s.sectionNames && s.sectionNames[t.id]) || t.label),
        sub: escapeHtml(s.label),
        attrs: `data-open data-subject="${key}" data-section="${t.id}"`,
        ...describe(key, t.id)
      }));
    });
  });
  return rows;
}

function renderTestsHub() {
  const rows = hubSectionRows('test', (key, tabId) => {
    const starred = (state.starredMcqs[key] || []).length;
    const answered = Object.keys(state.practiceAnswers[key] || {}).length;
    return {
      icon: ICON.tests,
      meta: tabId === 'practiceTest1' ? 'MCQ, written & coding' : (answered ? `${answered} answered` : 'Not started'),
      aside: starred ? `${starred} starred` : ''
    };
  });
  return hubGroup('Question banks & tests', rows, 'No tests yet. They appear here as courses add question banks.');
}

function renderLabsHub() {
  const bashSolved = Object.values(state.bashProgress.linux || {}).filter(p => p && p.solved).length;
  const rows = hubSectionRows('lab', (key, tabId) => {
    if (tabId === 'bashPractice') return { icon: ICON.terminal, meta: 'Shell scripting', aside: bashSolved ? `${bashSolved} solved` : '' };
    if (tabId === 'linuxPlayground') return { icon: ICON.terminal, meta: 'Virtual terminal' };
    const done = (state.mastered[key] && state.mastered[key][tabId] || []).length;
    return { icon: ICON.labs, meta: key === 'java' ? 'Coding problems' : 'Lab programs', aside: done ? `${done} done` : '' };
  });
  return hubGroup('Hands-on practice', rows, 'No labs yet. They appear here as courses add programs.');
}

function renderHubPage(page) {
  const meta = HUB_PAGES[page];
  const body = page === 'subjects' ? renderSubjectGallery() : page === 'notes' ? hubGroup('Your reading rooms', hubSectionRows('notes', () => ({ icon: ICON.notes, meta: 'Read notes' })), 'Choose a subject to start reading.') : page === 'progress' ? renderProgressHub() : page === 'tests' ? renderTestsHub() : renderLabsHub();
  return `
    <div class="desk" aria-label="${meta.title}">
      <div class="desk-main">
        <header class="desk-greet">
          <div>
            <h1 class="hub-title">${meta.title}</h1>
            <p class="desk-sub">${meta.sub}</p>
          </div>
          <div class="desk-greet-right"><div class="desk-utils"></div></div>
        </header>
        ${body}
      </div>
    </div>`;
}

// ── Learning Atlas: subject overview (Phase 3, Redesign_plan.md §5 Phase B) ──
// Icon per chapter/section type (notes / cheatsheet / MCQs / lab / playground).
function chapterIcon(tabId) {
  const id = tabId.toLowerCase();
  if (id.includes('practice') || id.includes('mcq') || id === 'javaexam' || id === 'javatestpad')
    return '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>';
  if (id.includes('lab') || id.includes('bash') || id.includes('playground') || id === 'javafa')
    return '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>';
  if (id.includes('cheat'))
    return '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/>';
  return '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>';
}

const ATLAS_FAM_CYCLE = ['lavender', 'blue', 'peach', 'mint', 'blush'];

// Topic count for a section, when its data is a plain topic array.
function sectionTopicCount(subjId, tabId) {
  const data = CONFIG.subjects[subjId].data || {};
  return Array.isArray(data[tabId]) ? data[tabId].length : null;
}

function renderSubjectOverview(subjectId) {
  const subj = CONFIG.subjects[subjectId];
  if (!subj) return;
  document.body.classList.add('overview-mode');
  document.body.classList.remove('landing-mode');
  clearWorkspaceModes();
  elements.topNavBar.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  elements.readingPane.style.display = 'none';
  const pg = document.getElementById('playground-workspace-container');
  if (pg) pg.style.display = 'none';
  elements.welcomeScreen.style.display = 'block';

  const fam = DESK_FAMILIES[subjectId] || 'blue';
  const activity = safeParse(localStorage.getItem('prep_study_activity'), {})[subjectId];

  // Progress across all array-shaped note sections
  const data = subj.data || {};
  const progress = subjectProgress(subjectId);
  const { total, done: mastered, percent: pct } = progress;

  // Days until exam
  let examLine = '';
  if (subj.examTime && subj.examTime > Date.now()) {
    const days = Math.ceil((subj.examTime - Date.now()) / 86400000);
    examLine = `<span class="atlas-stat"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${days} days to exam</span>`;
  }

  // Chapter rail tiles — one per section tab
  const tiles = subj.tabs.map((tab, i) => {
    const f = ATLAS_FAM_CYCLE[i % ATLAS_FAM_CYCLE.length];
    const full = (subj.sectionNames && subj.sectionNames[tab.id]) || tab.label;
    const desc = full.includes(' — ') ? full.split(' — ').slice(1).join(' — ') : '';
    const count = sectionTopicCount(subjectId, tab.id);
    const meta = count != null ? `${count} topics` : 'Open section';
    return `
      <button class="atlas-tile fam-${f}" type="button" data-section="${tab.id}">
        <div class="atlas-tile-art" aria-hidden="true">${deskDiagram(subjectId)}</div>
        <div class="atlas-tile-label">${escapeHtml(tab.label)}</div>
        <div class="atlas-tile-desc">${escapeHtml(desc || subj.shortLabel)}</div>
        <div class="atlas-tile-foot"><span>${meta}</span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
      </button>`;
  }).join('');

  // Support modules
  const nextSection = subj.tabs[0].id;
  const continueBtn = activity
    ? `<button class="atlas-support-card fam-${fam}" type="button" data-open data-subject="${subjectId}" data-section="${escapeHtml(activity.section)}" data-index="${activity.topicIndex}">
         <span class="atlas-support-k">Continue learning</span>
         <strong>${escapeHtml(activity.topicTitle || 'Resume last topic')}</strong>
         <span class="atlas-support-meta">${escapeHtml((subj.sectionNames && subj.sectionNames[activity.section]) || activity.section || '')}</span>
       </button>`
    : `<button class="atlas-support-card fam-${fam}" type="button" data-section="${nextSection}">
         <span class="atlas-support-k">Start here</span>
         <strong>${escapeHtml(subj.tabs[0].label)}</strong>
         <span class="atlas-support-meta">Begin with the first chapter</span>
       </button>`;

  const practiceTab = subj.tabs.find(t => /practice|mcq/i.test(t.id));
  const practiceBtn = practiceTab
    ? `<button class="atlas-support-card fam-blush" type="button" data-section="${practiceTab.id}">
         <span class="atlas-support-k">Practice weak areas</span>
         <strong>${escapeHtml(practiceTab.label)}</strong>
         <span class="atlas-support-meta">Test yourself on this subject</span>
       </button>`
    : '';

  const savedCount = state.smartNotes.filter(n => n.subject === subjectId).length + (state.starredMcqs[subjectId] || []).length;
  const recentBtn = `<button class="atlas-support-card fam-mint" type="button" data-saved-open><span class="atlas-support-k">Saved for revision</span><strong>${savedCount ? `${savedCount} saved items` : 'Keep the useful bits'}</strong><span class="atlas-support-meta">Your notes, highlights and starred questions</span></button>`;

  elements.welcomeScreen.innerHTML = `
    <section class="atlas fam-${fam}" aria-label="${escapeHtml(subj.label)} overview">
      <button class="atlas-back" type="button" data-nav="home">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to your desk
      </button>
      <header class="atlas-head">
        <div class="atlas-head-copy">
          <div class="atlas-code">${escapeHtml(subj.code || subj.shortLabel)}</div>
          <h1 class="atlas-title">${escapeHtml(subj.label)}</h1>
          <p class="atlas-tagline">${escapeHtml(subj.tagline || '')}</p>
          <div class="atlas-stats">
            <span class="atlas-stat"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>${total ? `${mastered}/${total} topics` : `${subj.tabs.length} sections`}</span>
            ${examLine}
          </div>
          ${total ? `<div class="atlas-progress"><span style="width:${pct}%"></span></div>` : ''}
        </div>
        <div class="atlas-head-art" aria-hidden="true">${deskDiagram(subjectId)}</div>
      </header>

      <div class="atlas-rail-wrap">
        <div class="atlas-rail-head">
          <h2 class="atlas-h2">Chapters</h2>
          <div class="atlas-rail-nav">
            <button class="atlas-arrow" type="button" data-rail="prev" aria-label="Scroll chapters left"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
            <button class="atlas-arrow" type="button" data-rail="next" aria-label="Scroll chapters right"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>
          </div>
        </div>
        <div class="atlas-rail" id="atlas-rail" role="group" aria-label="Chapters" tabindex="0">${tiles}</div>
      </div>

      <div class="atlas-support">
        ${continueBtn}${practiceBtn}${recentBtn}
      </div>
      ${renderCoursePlan(subj)}
    </section>`;

  initChapterRail();
  elements.welcomeScreen.scrollTop = 0;
  syncExperience('subject');
}

// Grading scheme and books from the course handout (CHO).
function renderCoursePlan(subj) {
  const c = subj.course;
  if (!c) return '';
  const rows = c.grading.map(([label, pct]) => `
    <li class="course-grade">
      <span class="course-grade-label">${escapeHtml(label)}</span>
      <span class="course-grade-bar" aria-hidden="true"><span style="width:${pct}%"></span></span>
      <b>${pct}%</b>
    </li>`).join('');
  return `
    <details class="course-details"><summary>Course details & recommended reading</summary><section class="atlas-course" aria-label="Course plan">
      <div class="course-card">
        <h2 class="atlas-h2">How you're graded</h2>
        <ul class="course-grades">${rows}</ul>
        <p class="course-note">${c.credits} credits · L-T-P ${escapeHtml(c.ltp)} · 75% attendance needed to sit the end term</p>
      </div>
      <div class="course-card">
        <h2 class="atlas-h2">Recommended books</h2>
        <ul class="course-books">${c.books.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
      </div>
    </section></details>`;
}

function initChapterRail() {
  const rail = document.getElementById('atlas-rail');
  if (!rail) return;
  const step = () => Math.max(240, rail.clientWidth * 0.8);
  const wrap = rail.closest('.atlas-rail-wrap');
  wrap.querySelectorAll('[data-rail]').forEach(btn => {
    btn.addEventListener('click', () => {
      rail.scrollBy({ left: (btn.dataset.rail === 'next' ? 1 : -1) * step(), behavior: 'smooth' });
    });
  });
  // Vertical wheel → horizontal scroll
  rail.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { rail.scrollLeft += e.deltaY; e.preventDefault(); }
  }, { passive: false });
  // Keyboard on the rail container
  rail.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { rail.scrollBy({ left: step(), behavior: 'smooth' }); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { rail.scrollBy({ left: -step(), behavior: 'smooth' }); e.preventDefault(); }
  });
  // Pointer drag — engage only after real movement so plain tile clicks pass through
  let down = false, moved = false, startX = 0, startLeft = 0;
  rail.addEventListener('pointerdown', (e) => { down = true; moved = false; startX = e.clientX; startLeft = rail.scrollLeft; });
  rail.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 5) { moved = true; rail.setPointerCapture(e.pointerId); }
    if (moved) rail.scrollLeft = startLeft - dx;
  });
  rail.addEventListener('pointerup', (e) => {
    down = false;
    if (rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
  });
  rail.addEventListener('pointercancel', () => { down = false; moved = false; });
  // Suppress the click that follows a drag (capture phase, before it reaches a tile)
  rail.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
}

function renderResumeCard(r) {
  const subj = CONFIG.subjects[r.subject];
  if (!subj) return renderFirstTimeCard();
  const fam = DESK_FAMILIES[r.subject] || 'blue';
  const sectionName = (subj.sectionNames && subj.sectionNames[r.section]) || r.section || '';
  const pct = subjectProgress(r.subject).percent;
  const topicTitle = r.topicTitle || subj.label;
  return `
    <section class="desk-resume fam-${fam}">
      <div class="desk-resume-body">
        <p class="desk-eyebrow">Resume where you left off</p>
        <h2 class="desk-resume-title">${escapeHtml(subj.label)}</h2>
        <p class="desk-resume-topic">${escapeHtml(topicTitle)}</p>
        <div class="desk-resume-status">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
          <span>${escapeHtml(sectionName.split(' — ')[0] || 'In progress')}</span><em>·</em><span>In progress</span>
          <div class="desk-progress"><span style="width:${pct}%"></span></div>
          <b>${pct}% complete</b>
        </div>
        <div class="desk-resume-actions">
          <button class="desk-btn-primary" type="button" data-open data-subject="${r.subject}" data-section="${escapeHtml(r.section || '')}" data-index="${r.topicIndex || 0}">Continue Learning</button>
          <button class="desk-btn-ghost" type="button" data-subject="${r.subject}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
            Subject overview
          </button>
        </div>
      </div>
      <div class="desk-resume-art" aria-hidden="true">${deskDiagram(r.subject)}</div>
    </section>`;
}

function renderFirstTimeCard() {
  const first = DESK_STRIP[0];
  return `
    <section class="desk-resume fam-lavender desk-resume--first">
      <div class="desk-resume-body">
        <p class="desk-eyebrow">Start here</p>
        <h2 class="desk-resume-title">Choose a subject to begin</h2>
        <p class="desk-resume-topic">Your notes, MCQs, and coding labs are organized by subject. Pick one to open its study room.</p>
        <div class="desk-resume-actions">
          <button class="desk-btn-primary" type="button" data-subject="${first}">Open ${escapeHtml(CONFIG.subjects[first].shortLabel)}</button>
          <button class="desk-btn-ghost" type="button" data-nav="subjects">Browse all subjects</button>
        </div>
      </div>
      <div class="desk-resume-art" aria-hidden="true">${deskDiagram(first)}</div>
    </section>`;
}

function renderSubjectStrip(activity, returning) {
  const cards = DESK_STRIP.map(key => {
    const subj = CONFIG.subjects[key];
    if (!subj) return '';
    const fam = DESK_FAMILIES[key] || 'blue';
    const a = activity[key];
    const meta = (a && a.total)
      ? `${a.mastered}/${a.total} topics`
      : escapeHtml(subj.tagline || '');
    const pct = (a && a.total) ? Math.round((a.mastered / a.total) * 100) : 0;
    return `
      <button class="desk-subject fam-${fam}" type="button" data-subject="${key}">
        <div class="desk-subject-art" aria-hidden="true">${deskCardMini(key)}</div>
        <div class="desk-subject-name">${escapeHtml(subj.label)}</div>
        <div class="desk-subject-foot">
          <span class="desk-subject-meta">${meta}</span>
          <svg class="desk-subject-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </div>
        ${pct ? `<div class="desk-subject-bar"><span style="width:${pct}%"></span></div>` : ''}
      </button>`;
  }).join('');
  return `
    <section class="desk-subjects" id="desk-subjects">
      <h3 class="desk-h3">${returning ? 'Pick up a subject' : 'Your subjects'}</h3>
      <div class="desk-subject-strip">${cards}</div>
    </section>`;
}

function renderExamCard(exam, activity) {
  if (!exam) {
    return `
      <section class="desk-panel fam-lavender">
        <div class="desk-panel-head"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Upcoming exam</div>
        <div class="desk-panel-body"><p class="desk-empty">A little planning leaves more room to focus.</p><button type="button" class="desk-panel-link" data-settings-open>Add your exam dates ${svgIcon(ICON.chevron, 14)}</button></div>
      </section>`;
  }
  const days = Math.max(0, Math.ceil((exam.examTime - Date.now()) / 86400000));
  const dateStr = new Date(exam.examTime).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  const a = activity[exam.key];
  const coverage = (a && a.total) ? `${Math.round((a.mastered / a.total) * 100)}%` : '—';
  const mock = days <= 30 ? 'Yes' : 'Not yet';
  return `
    <section class="desk-panel fam-lavender desk-exam">
      <div class="desk-panel-head"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Upcoming exam</div>
      <div class="desk-panel-body">
        <div class="desk-exam-name">${escapeHtml(exam.label)}</div>
        <div class="desk-exam-when">${dateStr}</div>
        <ul class="desk-stat-list">
          <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg><span>Syllabus coverage</span><b>${coverage}</b></li>
          <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg><span>Days remaining</span><b>${days} days</b></li>
          <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>Mock test recommended</span><b>${mock}</b></li>
        </ul>
        <button class="desk-panel-link" type="button" data-open data-subject="${exam.key}">View details <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
      </div>
    </section>`;
}

function renderQuickPractice() {
  const rows = [
    { subject: 'algo', section: 'practice', icon: ICON.tests, title: 'Algorithms MCQs', meta: 'Complexity, greedy, trees & graphs' },
    { subject: 'aptitude', section: 'practice', icon: ICON.tests, title: 'Aptitude MCQs', meta: 'Number, reasoning & verbal' },
    { subject: 'sysdesign', section: 'cheatSheet', icon: ICON.subjects, title: 'System Design cheat sheet', meta: 'Numbers & every comparison' }
  ];
  const items = rows.map(r => `
    <button class="desk-qp-item" type="button" data-open data-subject="${r.subject}" data-section="${r.section}">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${r.icon}</svg>
      <div><strong>${escapeHtml(r.title)}</strong><span>${escapeHtml(r.meta)}</span></div>
    </button>`).join('');
  return `
    <section class="desk-panel fam-peach desk-qp">
      <div class="desk-panel-head">Quick practice
        <svg class="desk-qp-bolt" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <div class="desk-panel-body desk-qp-list">${items}
        <button class="desk-panel-link desk-qp-all" type="button" data-nav="tests">Browse all tests <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
      </div>
    </section>`;
}

function safeParse(str, fallback) {
  try { return str ? JSON.parse(str) : fallback; } catch (e) { return fallback; }
}

async function resumeTo(subject, section, index) {
  await setActiveSubject(subject);
  // setActiveSubject lands on the overview, so always enter the section explicitly.
  if (state.activeSubject !== subject || !section) return;
  setActiveSection(section);
  if (Number.isInteger(index) && index > 0 && index < currentSectionCount()) selectTopic(index);
  restoreReadingPosition();
}

// ── Focused Notebook reader chrome (Phase 4, Redesign_plan.md §5 Phase C) ────
// Breadcrumb + reading-time + completion, right memory rail, recent-topics list.
function renderReaderChrome(topic, sectionName, index, sectionTotal) {
  const subj = CONFIG.subjects[state.activeSubject];
  const shortSection = sectionName.split(' — ')[0];

  // Breadcrumb: Subject › Section › Topic
  const bc = document.getElementById('reader-breadcrumb');
  if (bc) {
    bc.innerHTML = [
      `<span>${escapeHtml(subj.shortLabel)}</span>`,
      `<span>${escapeHtml(shortSection)}</span>`,
      `<span class="crumb-current">${escapeHtml(topic.title)}</span>`
    ].join('<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>');
  }

  // Meta: section badge + reading time + completion
  const meta = document.getElementById('reader-meta');
  if (meta) {
    const words = (elements.contentArea.textContent || '').trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    const mastered = (state.mastered?.[state.activeSubject]?.[state.activeSection] || []).includes(index);
    meta.innerHTML = `
      <p class="section-badge">${escapeHtml(shortSection)}</p>
      <span class="reader-meta-dot">·</span>
      <span class="reader-meta-item">${mins} min read</span>
      <span class="reader-meta-dot">·</span>
      <span class="reader-meta-item reader-meta-pos">Topic ${index + 1} of ${sectionTotal}</span>
      ${mastered ? '<span class="reader-meta-done">✓ Completed</span>' : ''}`;
  }

  pushRecentTopic(topic.title, index);
  renderMemoryRail(topic);
  updateReadingProgress();
}

function pushRecentTopic(title, index) {
  try {
    const list = safeParse(localStorage.getItem('prep_recent_topics'), []);
    const entry = { subject: state.activeSubject, section: state.activeSection, index, title, ts: Date.now() };
    const filtered = list.filter(r => !(r.subject === entry.subject && r.section === entry.section && r.index === entry.index));
    filtered.unshift(entry);
    localStorage.setItem('prep_recent_topics', JSON.stringify(filtered.slice(0, 12)));
  } catch (e) {}
}

function renderMemoryRail(topic) {
  const rail = document.getElementById('memory-rail');
  if (!rail) return;
  const subj = CONFIG.subjects[state.activeSubject];

  // On this page: headings inside the current topic
  const heads = [...elements.contentArea.querySelectorAll('h3, h4')].slice(0, 8);
  heads.forEach((h, i) => { if (!h.id) h.id = 'sec-' + i + '-' + Math.random().toString(36).slice(2, 6); });
  const onPage = heads.length
    ? heads.map(h => `<a class="rail-link" href="#${h.id}" data-anchor="${h.id}">${escapeHtml(h.textContent.trim())}</a>`).join('')
    : '<p class="rail-empty">No sub-sections on this page.</p>';

  // Recently viewed (this subject first)
  const recent = safeParse(localStorage.getItem('prep_recent_topics'), [])
    .filter(r => r.title && r.subject === state.activeSubject)
    .slice(0, 4);
  const recentHtml = recent.length
    ? recent.map(r => `<button class="rail-item" type="button" data-open data-subject="${r.subject}" data-section="${escapeHtml(r.section)}" data-index="${r.index}"><strong>${escapeHtml(r.title)}</strong><span>${escapeHtml(timeAgo(r.ts))}</span></button>`).join('')
    : '<p class="rail-empty">Topics you open will appear here.</p>';

  // "Try 3 MCQs" — subject's practice section if it has one
  const practiceTab = subj.tabs.find(t => /practice|mcq/i.test(t.id));

  rail.innerHTML = `
    <section class="rail-card fam-lavender">
      <div class="rail-head"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>On this page</div>
      <div class="rail-body rail-toc">${onPage}</div>
    </section>
    <section class="rail-card fam-peach">
      <div class="rail-head">${svgIcon(SAVED_ICON.note, 15)}Your notes</div>
      <div class="rail-body rail-notes" id="rail-notes">${renderRailNotes()}</div>
    </section>
    <section class="rail-card fam-mint">
      <div class="rail-head"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Recently viewed</div>
      <div class="rail-body rail-recent">${recentHtml}</div>
    </section>
    ${practiceTab ? `<button class="rail-mcq-btn" type="button" data-section="${practiceTab.id}"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>Try practice questions</button>` : ''}`;

  // Smooth-scroll for the on-this-page anchors (scroll container is the content pane)
  rail.querySelectorAll('[data-anchor]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(a.dataset.anchor);
    if (target) target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    });
  });
  // Recently-viewed jumps and the practice button (rail is outside #welcome-screen)
  rail.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () =>
    resumeTo(b.dataset.subject, b.dataset.section, parseInt(b.dataset.index, 10))));
  rail.querySelectorAll('.rail-mcq-btn[data-section]').forEach(b => b.addEventListener('click', () =>
    setActiveSection(b.dataset.section)));
  rail.querySelector('#rail-notes').addEventListener('click', e => {
    const note = e.target.closest('[data-rail-note]');
    if (note) {
      const n = state.smartNotes.find(x => x.id === note.dataset.railNote);
      if (n) scrollToHighlight(n);
      toggleSmartNotesPanel(true, 'notes');
    } else if (e.target.closest('[data-rail-add-note]')) {
      toggleSmartNotesPanel(true, 'notes');
      document.getElementById('smart-notes-textarea')?.focus();
    }
  });
}

function timeAgo(ts) {
  if (!ts) return '';
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return 'Just now';
  if (s < 3600) return Math.floor(s / 60) + ' min ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}

let readingProgressBound = false;
function updateReadingProgress() {
  const pane = document.getElementById('main-content-pane');
  const bar = document.querySelector('#reading-progress span');
  if (!pane || !bar) return;
  if (!readingProgressBound) {
    pane.addEventListener('scroll', () => {
      const max = pane.scrollHeight - pane.clientHeight;
      bar.style.width = (max > 0 ? (pane.scrollTop / max) * 100 : 0) + '%';
    }, { passive: true });
    readingProgressBound = true;
  }
  bar.style.width = '0%';
}

// Records the current reading position + subject progress for the Study Desk home.
function recordActivity() {
  try {
    const subj = state.activeSubject;
    if (!subj || !CONFIG.subjects[subj]) return;
    const data = CONFIG.subjects[subj].data || {};
    const progress = subjectProgress(subj);
    const total = progress.total;
    const mastered = progress.done;
    const sectionArr = data[state.activeSection] || [];
    const topic = isMcqSection() ? getActiveMcqBank()[state.activeTopicIndex] : isBashSection() ? getActiveBashProblems()[state.activeTopicIndex] : isJavaSection() ? getActiveJavaProblems()[state.activeTopicIndex] : sectionArr[state.activeTopicIndex];
    const store = safeParse(localStorage.getItem('prep_study_activity'), {});
    store[subj] = {
      subject: subj,
      section: state.activeSection,
      topicIndex: state.activeTopicIndex,
      topicTitle: (topic && (topic.title || topic.unitName)) || CONFIG.subjects[subj].tabs.find(t => t.id === state.activeSection)?.label || '',
      sectionTotal: sectionArr.length,
      total, mastered, ts: Date.now()
    };
    localStorage.setItem('prep_study_activity', JSON.stringify(store));
  } catch (e) {}
}

// ============================================================
//  SUBJECT SWITCHING
// ============================================================
async function setActiveSubject(subjectId) {
  if (!CONFIG.subjects[subjectId]) return;
  const navigationId = ++subjectNavigationId;
  Array.from(document.body.classList).forEach(cls => {
    if (cls.startsWith('subject-')) document.body.classList.remove(cls);
  });
  document.body.classList.remove('landing-mode');   // otherwise the sidebar stays hidden
  restoreHeaderControls();                            // move auth/theme controls back to the header
  document.body.classList.add('subject-' + subjectId);
  state.activeSubject = subjectId;
  const subjectConfig = CONFIG.subjects[subjectId];

  // Update document title
  document.title = `${subjectConfig.label} — prep`;
  if (elements.mobileBrandTitle) elements.mobileBrandTitle.textContent = subjectConfig.shortLabel;
  if (elements.headerSubject) elements.headerSubject.textContent = subjectConfig.label;
  if (elements.sidebarSubjectName) elements.sidebarSubjectName.textContent = subjectConfig.label;
  document.documentElement.style.setProperty('--active-accent', `var(--${DESK_FAMILIES[subjectId] || 'blue'}-ink)`);

  if (!hydratedSubjects[subjectId]) {
    renderSubjectLoading(subjectConfig.label);
  }

  try {
    await ensureSubjectDataLoaded(subjectId);
  } catch (error) {
    if (navigationId === subjectNavigationId) renderSubjectLoadError(subjectConfig.label, error);
    return;
  }

  if (state.activeSubject !== subjectId || navigationId !== subjectNavigationId) return;

  // Re-render top nav tabs for this subject
  renderTopNav(subjectId);

  // Land on the Learning Atlas overview for this subject (Phase 3),
  // instead of jumping straight into the first section's notes.
  renderSubjectOverview(subjectId);
}

function renderTopNav(subjectId) {
  const tabs = CONFIG.subjects[subjectId].tabs;
  elements.topNavBar.innerHTML = '';
  if (elements.mobileSectionNav) elements.mobileSectionNav.innerHTML = '';

  tabs.forEach(tab => {
    // Desktop Button
    const btn = document.createElement('button');
    btn.setAttribute('data-section', tab.id);
    btn.textContent = tab.label;
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
  return sectionId === 'javaPractice' || sectionId === 'javaFA' || sectionId === 'javaExam' || sectionId === 'javaTestpad';
}

function getActiveMcqBank() {
  return CONFIG.subjects[state.activeSubject].mcqs || [];
}

function getActiveBashProblems() {
  return CONFIG.subjects[state.activeSubject].bashProblems || [];
}

function getActiveJavaProblems() {
  const allProblems = CONFIG.subjects[state.activeSubject].javaProblems || [];
  if (state.activeSubject !== 'java') return allProblems;

  let filtered = [];
  if (state.activeSection === 'javaExam') {
    filtered = allProblems.filter(p => p.category === 'exam');
  } else if (state.activeSection === 'javaTestpad') {
    filtered = allProblems.filter(p => p.category === 'testpad');
  } else {
    // javaFA or javaPractice (default)
    filtered = allProblems.filter(p => !p.category || p.category === 'fa');
  }

  const currentSearch = state.searchQuery.trim().toLowerCase();
  if (currentSearch) {
    filtered = filtered.filter(p => {
      const title = p.title.toLowerCase();
      const section = p.section.toLowerCase();
      const tags = p.tags.join(' ').toLowerCase();
      return title.includes(currentSearch) || section.includes(currentSearch) || tags.includes(currentSearch);
    });
  }

  if (state.selectedSectionFilter && state.selectedSectionFilter !== 'All') {
    filtered = filtered.filter(p => p.section === state.selectedSectionFilter);
  }
  return filtered;
}

function getUnfilteredJavaProblemsForSection() {
  const allProblems = CONFIG.subjects[state.activeSubject].javaProblems || [];
  if (state.activeSubject !== 'java') return allProblems;

  if (state.activeSection === 'javaExam') {
    return allProblems.filter(p => p.category === 'exam');
  } else if (state.activeSection === 'javaTestpad') {
    return allProblems.filter(p => p.category === 'testpad');
  } else {
    return allProblems.filter(p => !p.category || p.category === 'fa');
  }
}


function setActiveSection(sectionId) {
  if (!CONFIG.subjects[state.activeSubject]?.tabs.some(t => t.id === sectionId)) return;
  document.body.classList.remove('overview-mode');  // leaving the Learning Atlas
  document.body.classList.remove('landing-mode');
  state.activeSection = sectionId;
  state.activeTopicIndex = 0;
  state.searchQuery = '';
  state.selectedSectionFilter = 'All';
  elements.searchInput.value = '';

  const pgContainer = document.getElementById('playground-workspace-container');
  if (pgContainer) {
    pgContainer.style.display = isPlaygroundSection(sectionId) ? 'flex' : 'none';
  }

  if (isPlaygroundSection(sectionId)) {
    elements.searchInput.placeholder = "Search files";
  } else {
    elements.searchInput.placeholder = "Search topics";
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

  const subjectCfg = CONFIG.subjects[state.activeSubject];
  if (elements.sidebarSectionName) {
    elements.sidebarSectionName.textContent = (subjectCfg.sectionNames && subjectCfg.sectionNames[sectionId]) || sectionId;
  }

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

function refreshCurrentTopic() {
  if (isPlaygroundSection()) {
    // Playground handles its own state
    return;
  }

  if (isMcqSection()) {
    renderPracticeUnit(state.activeTopicIndex);
  } else if (isBashSection()) {
    renderBashProblem(state.activeTopicIndex);
  } else if (isJavaSection()) {
    renderJavaProblem(state.activeTopicIndex);
  } else {
    const subjectData = CONFIG.subjects[state.activeSubject].data;
    if (subjectData[state.activeSection]) {
      renderTopic(state.activeSection, state.activeTopicIndex);
    }
  }
}

// ============================================================
//  SIDEBAR RENDERING
// ============================================================
let lastActiveSectionForFilter = null;
let lastActiveSubjectForFilter = null;
let outlineExpanded = safeParse(localStorage.getItem('prep_outline_expanded'), false) === true;

function setOutlineExpanded(expanded) {
  outlineExpanded = expanded;
  try { localStorage.setItem('prep_outline_expanded', JSON.stringify(expanded)); } catch (_) {}
  renderSidebar();
}

function appendOutlineDensityToggle(total) {
  if (state.searchQuery || total <= 4) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'outline-density-toggle';
  button.setAttribute('aria-expanded', String(outlineExpanded));
  button.textContent = outlineExpanded ? 'Show a quieter outline' : `Show all ${total} topics`;
  button.addEventListener('click', () => setOutlineExpanded(!outlineExpanded));
  elements.topicList.appendChild(button);
}

function updateSidebarFilterDropdown() {
  const wrapper = document.getElementById('sidebar-filter-wrapper');
  if (!wrapper) return;

  if (state.activeSubject === 'java' && !isPlaygroundSection()) {
    wrapper.style.display = 'block';

    // Only rebuild if the tab actually changed
    if (state.activeSection === lastActiveSectionForFilter && state.activeSubject === lastActiveSubjectForFilter) {
      const select = document.getElementById('sidebar-section-filter');
      if (select) select.value = state.selectedSectionFilter || 'All';
      return;
    }

    lastActiveSectionForFilter = state.activeSection;
    lastActiveSubjectForFilter = state.activeSubject;

    const select = document.getElementById('sidebar-section-filter');
    if (!select) return;

    // Get current section filter
    const currentFilter = state.selectedSectionFilter || 'All';

    // Get all unique sections in the active problems
    const problems = getUnfilteredJavaProblemsForSection();
    const sections = new Set();
    problems.forEach(p => {
      if (p.section) sections.add(p.section);
    });

    // Populate dropdown
    select.innerHTML = '<option value="All">All Sections</option>';
    Array.from(sections).sort().forEach(sec => {
      const option = document.createElement('option');
      option.value = sec;
      option.textContent = sec;
      select.appendChild(option);
    });

    // Restore selected value
    if (sections.has(currentFilter)) {
      select.value = currentFilter;
    } else {
      state.selectedSectionFilter = 'All';
      select.value = 'All';
    }
  } else {
    wrapper.style.display = 'none';
    state.selectedSectionFilter = 'All';
    lastActiveSectionForFilter = null;
    lastActiveSubjectForFilter = null;
  }
}

function renderSidebar() {
  if (isPlaygroundSection()) {
    renderPlaygroundSidebar();
    return;
  }

  updateSidebarFilterDropdown();

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
      const fragment = document.createDocumentFragment();
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
        fragment.appendChild(button);
      });
      elements.topicList.appendChild(fragment);
      return;
    }

    // ── Java DSA Practice: grouped by section, difficulty badges ─────────
    if (isJavaSection()) {
      const problems = getActiveJavaProblems();
      const sections = typeof JAVA_SECTIONS !== 'undefined' ? JAVA_SECTIONS : [];
      const fragment = document.createDocumentFragment();
      let lastSection = null;

      // Add sub-heading banner for Exam tab
      if (state.activeSection === 'javaExam') {
        const banner = document.createElement('div');
        banner.className = 'sidebar-info-banner';
        banner.innerHTML = 'These questions appeared in exams!';
        fragment.appendChild(banner);
      }

      problems.forEach((problem, index) => {
        const isCollapsed = state.expandedJavaSections[problem.section] === false;
        const isActive = index === state.activeTopicIndex;

        // If the problem is active, ensure its section is expanded
        if (isActive && isCollapsed) {
          state.expandedJavaSections[problem.section] = true;
        }

        // Section group divider
        if (problem.section !== lastSection) {
          lastSection = problem.section;
          const sectionId = problem.section;
          const sectionMeta = sections.find(s => s.id === sectionId);
          const currentCollapsed = state.expandedJavaSections[sectionId] === false;

          const divider = document.createElement('div');
          divider.className = 'sidebar-group-label';
          divider.style.cursor = 'pointer';
          divider.style.display = 'flex';
          divider.style.justifyContent = 'space-between';
          divider.style.alignItems = 'center';
          divider.style.userSelect = 'none';

          const labelSpan = document.createElement('span');
          labelSpan.textContent = (sectionMeta ? sectionMeta.icon + ' ' : '') + sectionId;
          divider.appendChild(labelSpan);

          const arrowSpan = document.createElement('span');
          arrowSpan.className = 'group-arrow';
          arrowSpan.style.transition = 'transform 0.2s ease';
          arrowSpan.style.fontSize = '0.7rem';
          arrowSpan.style.opacity = '0.6';
          arrowSpan.innerHTML = currentCollapsed && !state.searchQuery ? '>' : 'v';
          divider.appendChild(arrowSpan);

          divider.addEventListener('click', () => {
            state.expandedJavaSections[sectionId] = !state.expandedJavaSections[sectionId];
            updateTopics();
          });

          fragment.appendChild(divider);
        }

        // Skip rendering this item if its group is collapsed (and not currently searching)
        if (state.expandedJavaSections[problem.section] === false && !state.searchQuery) {
          return;
        }

        const progress = state.javaProgress[state.activeSubject]?.[problem.id] || {};
        const isSolved = progress.solved === true;

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
        fragment.appendChild(button);
      });
      elements.topicList.appendChild(fragment);
      return;
    }

    // ── MCQ Sections: keep existing checkbox style but add question count subtitle ──
    if (isMcqSection()) {
      const mcqBank = getActiveMcqBank();
      const fragment = document.createDocumentFragment();
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
        fragment.appendChild(button);
      });
      elements.topicList.appendChild(fragment);
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
  const fragment = document.createDocumentFragment();

  topics.forEach((topic, index) => {
    const titleLower = topic.title.toLowerCase();
    if (!titleLower.includes(state.searchQuery)) return;

    // Keep the reader outline calm by default while leaving search exhaustive.
    if (!state.searchQuery && !outlineExpanded && topics.length > 4 && Math.abs(index - state.activeTopicIndex) > 1) return;

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
    fragment.appendChild(button);
  });
  elements.topicList.appendChild(fragment);
  appendOutlineDensityToggle(topics.length);
}


// ============================================================
//  TOPIC SELECTION
// ============================================================
function updateActiveSidebarItem(index) {
  const sidebarButtons = elements.topicList.querySelectorAll('.topic-item');
  // Optimization: If there are many buttons, we could store the active element,
  // but querySelectorAll is still faster than recreating the whole sidebar.
  // For now, let's at least make the loop efficient.
  for (let i = 0; i < sidebarButtons.length; i++) {
    const btn = sidebarButtons[i];
    const idx = parseInt(btn.getAttribute('data-index'));
    if (idx === index) {
      if (!btn.classList.contains('active')) btn.classList.add('active');
    } else {
      if (btn.classList.contains('active')) btn.classList.remove('active');
    }
  }
}

function selectTopic(index) {
  if (!Number.isInteger(index) || index < 0) return;
  state.activeTopicIndex = index;
  closeMobileSidebar();
  syncExperience('study');
  recordActivity();
  // The quiz page opts out of the notes typography (see renderPracticeUnit).
  elements.contentArea.classList.add('reading-area');

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
    // Explicitly update sidebar active state after rendering problem
    updateActiveSidebarItem(index);
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
  elements.readingPane.style.display = '';  // let the Focused Notebook grid (CSS) apply

  const sectionName = CONFIG.subjects[state.activeSubject].sectionNames[state.activeSection] || state.activeSection;
  elements.sectionBadge.textContent = sectionName;
  elements.mainTitle.textContent = topic.title;
  elements.contentArea.innerHTML = topic.html;
  enhanceReadingContent();
  if (window.Prism) Prism.highlightAllUnder(elements.contentArea);

  // Restore scroll behavior for reading (horizontal spacing comes from the Focused
  // Notebook grid + centered reading column, so we no longer hard-code side padding)
  elements.contentArea.style.overflowY = 'auto';
  elements.contentArea.style.padding = '';
  elements.contentArea.style.display = 'block';
  renderReaderChrome(topic, sectionName, index, topics.length);
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
  applyNoteHighlights();
  if (document.getElementById('smart-notes-panel')?.classList.contains('open')) renderSavedBody();

  // Update sidebar active state
  updateActiveSidebarItem(index);
  recordActivity();

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
  recordActivity();
  announceStudy(isMastered ? 'Topic completed. Nice work.' : 'Topic marked for review.');

  // Update sidebar item without full redraw
  const sidebarButtons = elements.topicList.querySelectorAll('.topic-item');
  sidebarButtons.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-index'));
    if (idx === index) {
      // Reading topics show a number badge instead of a checkbox — hence the guard.
      const checkbox = btn.querySelector('.checkbox-circle');
      if (isMastered) {
        btn.classList.add('mastered');
        if (checkbox) checkbox.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      } else {
        btn.classList.remove('mastered');
        if (checkbox) checkbox.innerHTML = '';
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
      elements.nextBtn.innerHTML = 'Section Mastered!';
      elements.nextBtn.style.backgroundColor = '#EEF6F2';
      elements.nextBtn.style.borderColor = '#CDE3D5';
      elements.nextBtn.style.color = '#4A7A60';
      elements.nextBtn.style.opacity = '0.7';
      elements.nextBtn.style.cursor = 'default';
    } else {
      elements.nextBtn.innerHTML = 'Complete & Finish Section';
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
    elements.progressPercent.textContent = `${solvedCount} of ${total} solved`;
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
    elements.progressPercent.textContent = `${solvedCount} of ${total} solved`;
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
    elements.progressPercent.textContent = `${answeredCount} of ${total} answered`;
    elements.progressBar.style.width = `${percentage}%`;
    return;
  }

  const subjectData = CONFIG.subjects[state.activeSubject].data;
  const topics = subjectData[state.activeSection] || [];
  const total = topics.length;

  if (total === 0) {
    elements.progressPercent.textContent = '';
    elements.progressBar.style.width = '0%';
    return;
  }

  const masteredCount = (state.mastered[state.activeSubject][state.activeSection] || []).length;
  const percentage = Math.round((masteredCount / total) * 100);
  elements.progressPercent.textContent = `${masteredCount} of ${total} done`;
  elements.progressBar.style.width = `${percentage}%`;
}

// ============================================================
//  BASH SIMULATION & CHECKING (Imported from bash-engine.js)
// ============================================================

function evaluateBashProblem(problem, script, mode) {
  // Always run all test cases
  const tests = problem.tests;

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

  return results.map(result => {
    const isVisible = result.visible !== false;

    return `
    <div class="bash-result-card ${result.passed ? 'passed' : 'failed'}">
      <div class="bash-result-title">
        <strong>${escapeHtml(result.name)}</strong>
        <span>${result.passed ? 'Passed' : 'Failed'}</span>
      </div>
      ${isVisible ? `
        <div class="bash-result-grid">
          <div><label>Input</label><pre>${escapeHtml(result.input)}</pre></div>
          <div><label>Expected</label><pre>${escapeHtml(result.expectedOutput)}</pre></div>
          <div><label>Your Output</label><pre>${escapeHtml(result.actualOutput || '(empty)')}</pre></div>
        </div>
      ` : `
        <div class="bash-result-grid" style="grid-template-columns: 1fr;">
          <div style="padding: 0.5rem; color: var(--text-secondary); font-size: 0.85rem; font-style: italic;">
            Details are hidden for this test case.
          </div>
        </div>
      `}
    </div>
  `}).join('');
}

function runBashProblem(problem, mode) {
  const editor = document.getElementById('bash-code-editor');
  const code = editor ? editor.value : '';

  // Auto-expand results panel
  const resultsPane = document.getElementById('bash-results-pane');
  if (resultsPane) {
    const targetHeight = state.lastBashResultsHeight || 250;
    resultsPane.style.height = targetHeight + 'px';
    resultsPane.style.flex = 'none';
  }

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
            <button class="bash-reset-btn" id="bash-toggle-panel-btn" title="Toggle Console">Console</button>
            <button class="bash-run-btn" id="bash-run-btn">Run</button>
            <button class="bash-submit-btn" id="bash-submit-btn">Submit</button>
          </div>
        </div>
        <div class="bash-editor-wrapper">
          <div class="editor-line-numbers" id="bash-line-numbers">1</div>
          <pre id="bash-highlighter" class="bash-highlighter" aria-hidden="true"><code class="language-bash"></code></pre>
          <textarea class="bash-code-editor" id="bash-code-editor" spellcheck="false" wrap="off">${escapeHtml(currentCode)}</textarea>
        </div>

        <div class="resizer-v" id="resizer-bash-v">
          <div class="resizer-notch"></div>
        </div>

        <div class="bash-results-panel" id="bash-results-pane" style="height: 0px; min-height: 0px; display: flex; flex-direction: column;">
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
  const resultsPane = document.getElementById('bash-results-pane');
  const togglePanelBtn = document.getElementById('bash-toggle-panel-btn');
  const highlighter = document.getElementById('bash-highlighter');
  const lineNumbers = document.getElementById('bash-line-numbers');

  // Setup enhanced behavior & sync
  setupCodeEditorBehavior(editor);
  syncEditor(editor, highlighter, lineNumbers);

  if (togglePanelBtn && resultsPane) {
    togglePanelBtn.addEventListener('click', () => {
      const curHeight = resultsPane.offsetHeight;
      if (curHeight < 10) {
        const targetHeight = state.lastBashResultsHeight || 250;
        resultsPane.style.height = targetHeight + 'px';
        resultsPane.style.flex = 'none';
      } else {
        resultsPane.style.height = '0px';
        resultsPane.style.flex = 'none';
      }
    });
  }

  editor.addEventListener('input', event => {
    markEditorHighlightPending(editor);
    state.bashProgress[state.activeSubject][problem.id] = {
      ...state.bashProgress[state.activeSubject][problem.id],
      code: event.target.value,
      codeVersion: problemVersion
    };
    scheduleBashProgressSave();
    if (window.updateBashHighlighting) window.updateBashHighlighting();
  });

  // Initial highlight
  lastBashHighlightSource = null;
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

  return results.map(result => {
    // If test case is hidden, we only show its pass/fail status but hide details
    const isVisible = result.visible !== false;

    return `
    <div class="bash-result-card ${result.passed ? 'passed' : 'failed'}">
      <div class="bash-result-title">
        <strong>${escapeHtml(result.name)}</strong>
        <span>${result.passed ? 'Passed' : 'Failed'}</span>
      </div>
      ${isVisible ? `
        <div class="bash-result-grid">
          <div><label>Input</label><pre>${escapeHtml(result.input)}</pre></div>
          <div><label>Expected</label><pre>${escapeHtml(result.expectedOutput)}</pre></div>
          <div><label>Your Output</label><pre>${escapeHtml(result.actualOutput || '(empty)')}</pre></div>
        </div>
        ${result.error ? `<div class="java-error-detail"><pre>${escapeHtml(result.error)}</pre></div>` : ''}
      ` : `
        <div class="bash-result-grid" style="grid-template-columns: 1fr;">
          <div style="padding: 0.5rem; color: var(--text-secondary); font-size: 0.85rem; font-style: italic;">
            Details are hidden for this test case.
          </div>
        </div>
      `}
    </div>
  `}).join('');
}

function getDefaultJavaExecutionSettings() {
  const config = window.JAVA_EXECUTION_CONFIG || {};
  return {
    apiUrl: config.apiUrl || '/api/execute',
    apiKey: config.apiKey || ''
  };
}

function loadJavaExecutionSettings() {
  const defaults = getDefaultJavaExecutionSettings();
  try {
    const saved = localStorage.getItem('prep_piston_settings');
    if (saved) return { ...defaults, ...JSON.parse(saved) };
  } catch (e) {}
  return defaults;
}

function saveJavaExecutionSettings(settings) {
  try {
    localStorage.setItem('prep_piston_settings', JSON.stringify(settings));
  } catch (e) {}
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
            <button class="bash-reset-btn" id="java-toggle-panel-btn" title="Toggle Console">Console</button>
            <button class="bash-run-btn" id="java-run-btn">Run</button>
            <button class="bash-submit-btn" id="java-submit-btn">Submit</button>
          </div>
        </div>
        <div class="bash-editor-wrapper">
          <div class="editor-line-numbers" id="java-line-numbers">1</div>
          <pre id="java-highlighter" class="bash-highlighter" aria-hidden="true"><code class="language-java"></code></pre>
          <textarea class="bash-code-editor java-code-editor" id="java-code-editor" spellcheck="false" wrap="off">${escapeHtml(currentCode)}</textarea>
        </div>

        <div class="resizer-v" id="resizer-java-v">
          <div class="resizer-notch"></div>
        </div>

        <div class="bash-results-panel" id="java-results-pane" style="height: 0px; min-height: 0px; display: flex; flex-direction: column;">
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
  const resultsPane = document.getElementById('java-results-pane');
  const togglePanelBtn = document.getElementById('java-toggle-panel-btn');
  const highlighter = document.getElementById('java-highlighter');
  const lineNumbers = document.getElementById('java-line-numbers');

  // Setup enhanced behavior & sync
  setupCodeEditorBehavior(editor);
  syncEditor(editor, highlighter, lineNumbers);

  if (togglePanelBtn && resultsPane) {
    togglePanelBtn.addEventListener('click', () => {
      const curHeight = resultsPane.offsetHeight;
      if (curHeight < 10) {
        const targetHeight = state.lastJavaResultsHeight || 250;
        resultsPane.style.height = targetHeight + 'px';
        resultsPane.style.flex = 'none';
      } else {
        resultsPane.style.height = '0px';
        resultsPane.style.flex = 'none';
      }
    });
  }

  // Draft persistence on input
  editor.addEventListener('input', event => {
    markEditorHighlightPending(editor);
    if (!state.javaProgress[state.activeSubject]) state.javaProgress[state.activeSubject] = {};
    state.javaProgress[state.activeSubject][problem.id] = {
      ...state.javaProgress[state.activeSubject][problem.id],
      code: event.target.value
    };
    scheduleJavaProgressSave();
    if (window.updateJavaHighlighting) window.updateJavaHighlighting();
  });

  // Initial highlight
  lastJavaHighlightSource = null;
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
      const settings = loadJavaExecutionSettings();

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
        apiUrl: settingsUrlInput ? settingsUrlInput.value.trim() : getDefaultJavaExecutionSettings().apiUrl,
        apiKey: settingsKeyInput ? settingsKeyInput.value.trim() : ''
      };
      saveJavaExecutionSettings(settings);
      settingsDialog.close();
    });
  }

  if (settingsResetBtn) {
    settingsResetBtn.addEventListener('click', () => {
      const defaults = getDefaultJavaExecutionSettings();
      if (settingsUrlInput) settingsUrlInput.value = defaults.apiUrl;
      if (settingsKeyInput) settingsKeyInput.value = defaults.apiKey;
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

  // Auto-expand results panel
  const resultsPane = document.getElementById('java-results-pane');
  if (resultsPane) {
    const targetHeight = state.lastJavaResultsHeight || 250;
    resultsPane.style.height = targetHeight + 'px';
    resultsPane.style.flex = 'none';
  }

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
          const settings = loadJavaExecutionSettings();

          body.innerHTML = `
            <div class="java-error-panel">
              <h4>⚠️ Execution Service Unauthorized (HTTP 401)</h4>
              <p style="margin-bottom: 0.75rem;">The judge rejected the execution key.</p>
              <p style="font-size: 0.82rem; margin-bottom: 1rem; color: var(--text-secondary);">
                For Railway, set <code>JUDGE_API_KEY</code> on the frontend host to the exact same value as <code>JUDGE_API_KEY</code> on the Railway judge service. Do not expose that key in the browser for production.
              </p>

              <div class="java-settings-inline-panel">
                <div style="margin-bottom: 0.75rem; display: flex; flex-direction: column;">
                  <label style="font-size: 0.8rem; font-weight: 600; margin-bottom: 0.2rem; color: var(--text-primary);">Custom Execution API URL</label>
                  <input type="text" id="java-settings-url-inline" class="java-settings-input-inline" value="${escapeHtml(settings.apiUrl)}">
                  <span class="java-dialog-help">Use your deployed proxy or judge <code>/execute</code> URL. Local judge: <code>http://localhost:5005/execute</code>.</span>
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
            const defaults = getDefaultJavaExecutionSettings();
            if (urlInput) urlInput.value = defaults.apiUrl;
            if (keyInput) keyInput.value = defaults.apiKey;
          });

          document.getElementById('java-settings-save-inline-btn').addEventListener('click', () => {
            const urlInput = document.getElementById('java-settings-url-inline');
            const keyInput = document.getElementById('java-settings-key-inline');
            const newSettings = {
              apiUrl: urlInput ? urlInput.value.trim() : getDefaultJavaExecutionSettings().apiUrl,
              apiKey: keyInput ? keyInput.value.trim() : ''
            };
            saveJavaExecutionSettings(newSettings);
            // Retry compilation automatically
            runJavaProblem(problem, mode);
          });

        } else {
          body.innerHTML = `
            <div class="java-error-panel">
              <h4>⚠️ Connection Error</h4>
              <p>${escapeHtml(result.networkError)}</p>
              <p style="font-size: 0.82rem; margin-top: 0.65rem; color: var(--text-secondary);">
                If you are using Railway, make sure the frontend host has <code>JUDGE_SERVICE_URL</code> set to your Railway judge URL and <code>JUDGE_API_KEY</code> matches the judge service.
              </p>
            </div>
          `;
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
        letterSpan.textContent = displayLetter;
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

// ── Practice quiz page ──────────────────────────────────────────────────────
// Question list + sticky rail (progress, question map, weak topics). The rail and
// filter counts re-render on every answer; cards are only rebuilt on navigation.
const QUIZ_FILTERS = [
  ['all', 'All'],
  ['unanswered', 'Unanswered'],
  ['wrong', 'Wrong'],
  ['starred', 'Starred']
];

const QUIZ_ICON = {
  star: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  retry: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  prev: '<polyline points="15 18 9 12 15 6"/>',
  next: '<polyline points="9 18 15 12 9 6"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  cross: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
};

let quizCursorId = null;

function mcqStatus(subject, q) {
  const ans = state.practiceAnswers[subject]?.[q.id];
  if (ans === undefined) return 'unanswered';
  return ans === q.correct ? 'correct' : 'wrong';
}

function isStarred(subject, qId) {
  return (state.starredMcqs[subject] || []).includes(qId);
}

function quizUnit() {
  return getActiveMcqBank()[state.quizUnitIndex] || null;
}

function quizCounts(subject, questions) {
  const c = { all: questions.length, unanswered: 0, correct: 0, wrong: 0, starred: 0 };
  questions.forEach(q => {
    c[mcqStatus(subject, q)]++;
    if (isStarred(subject, q.id)) c.starred++;
  });
  return c;
}

function quizMatchesFilter(subject, q, filter) {
  if (filter === 'starred') return isStarred(subject, q.id);
  if (filter === 'all') return true;
  return mcqStatus(subject, q) === filter;
}

function renderMcqCard(q, number, subject) {
  const timed = isTimedStudyQuiz();
  const status = timed ? 'unanswered' : mcqStatus(subject, q);
  const saved = timed ? timedStudyQuiz.answers[q.id] : state.practiceAnswers[subject]?.[q.id];
  const starred = isStarred(subject, q.id);
  let explanation = q.explanation || '';

  const options = Object.keys(q.options).map(letter => {
    const parsed = parseOption(q.options[letter]);
    if (letter === q.correct && parsed.explanation) explanation = parsed.explanation;
    let cls = 'mcq-option';
    if (timed && letter === saved) cls += ' timed-selected';
    let badge = '';
    if (status !== 'unanswered') {
      if (letter === q.correct) { cls += ' correct'; badge = '<span class="correct-badge">Correct</span>'; }
      else if (letter === saved) { cls += ' incorrect'; badge = '<span class="incorrect-badge">Your answer</span>'; }
    }
    return `<button type="button" class="${cls}" data-option="${letter}"><span class="option-letter">${letter.toUpperCase()}</span><span class="option-text">${parsed.text}</span>${badge}</button>`;
  }).join('');

  const solve = typeof SOLVER_MAPPING !== 'undefined' && SOLVER_MAPPING[q.id]
    ? `<button type="button" class="mcq-solve-btn" data-qid="${q.id}">Solve step by step</button>` : '';

  return `
    <article class="mcq-card" id="mcq-${q.id}" data-question-id="${q.id}" data-status="${status}" tabindex="-1">
      <div class="mcq-card-header">
        <div class="mcq-kicker">
          <span class="mcq-num">Q${number}</span>
          ${q.topic ? `<span class="mcq-topic">${escapeHtml(q.topic)}</span>` : ''}
        </div>
        <div class="mcq-actions">
          ${solve}
          <button type="button" class="mcq-star-btn${starred ? ' starred' : ''}" data-qid="${q.id}" aria-pressed="${starred}" aria-label="Star question ${number}" title="Star for revision (S)">${svgIcon(QUIZ_ICON.star, 16)}</button>
        </div>
      </div>
      <div class="mcq-question">${q.question}</div>
      <div class="mcq-options${status !== 'unanswered' ? ' answered' : ''}" data-correct="${q.correct}">${options}</div>
      ${explanation ? `<div class="mcq-explanation" style="display:${status !== 'unanswered' ? 'block' : 'none'}"><strong>Why:</strong> ${explanation}</div>` : ''}
    </article>`;
}

function renderQuizRail(unitObj) {
  const subject = state.activeSubject;
  const questions = unitObj.questions || [];
  if (isTimedStudyQuiz()) return renderTimedStudyRail(questions);
  const c = quizCounts(subject, questions);
  const answered = c.correct + c.wrong;
  const accuracy = answered ? Math.round((c.correct / answered) * 100) : 0;
  const pct = n => (c.all ? (n / c.all) * 100 : 0);

  const bank = getActiveMcqBank().flatMap(u => u.questions || []);
  const bankAnswered = bank.filter(q => mcqStatus(subject, q) !== 'unanswered').length;

  const cells = questions.map((q, i) => {
    const st = mcqStatus(subject, q);
    const star = isStarred(subject, q.id);
    const label = `Question ${i + 1}, ${st}${star ? ', starred' : ''}`;
    return `<button type="button" class="qmap-cell${star ? ' is-starred' : ''}${quizCursorId === q.id ? ' is-current' : ''}" data-status="${st}" data-quiz-jump="${q.id}" aria-label="${label}">${i + 1}</button>`;
  }).join('');

  // Weakest topics first, only once something in them has been answered.
  const byTopic = {};
  questions.forEach(q => {
    if (!q.topic) return;
    const t = byTopic[q.topic] || (byTopic[q.topic] = { correct: 0, answered: 0, total: 0 });
    t.total++;
    const st = mcqStatus(subject, q);
    if (st !== 'unanswered') { t.answered++; if (st === 'correct') t.correct++; }
  });
  const topics = Object.entries(byTopic)
    .filter(([, t]) => t.answered)
    .sort((a, b) => (a[1].correct / a[1].answered) - (b[1].correct / b[1].answered))
    .slice(0, 5);
  // Only worth a card when topics actually group several questions.
  const topicsHtml = Object.values(byTopic).some(t => t.total > 1) ? `
    <section class="quiz-card quiz-topics-card">
      <h3 class="quiz-card-title">Weakest topics</h3>
      ${topics.length ? topics.map(([name, t]) => `
        <div class="quiz-topic-row">
          <span class="quiz-topic-name">${escapeHtml(name)}</span>
          <span class="quiz-topic-score">${t.correct}/${t.answered}</span>
          <span class="quiz-topic-bar" aria-hidden="true"><span style="width:${Math.round((t.correct / t.answered) * 100)}%"></span></span>
        </div>`).join('') : '<p class="quiz-card-empty">Answer a few questions to see where you slip.</p>'}
    </section>` : '';

  return `
    <section class="quiz-card">
      <h3 class="quiz-card-title">This quiz</h3>
      <div class="quiz-stack" role="img" aria-label="${c.correct} correct, ${c.wrong} wrong, ${c.unanswered} unanswered">
        <span class="is-correct" style="width:${pct(c.correct)}%"></span><span class="is-wrong" style="width:${pct(c.wrong)}%"></span>
      </div>
      <dl class="quiz-legend">
        <div><dt><i class="dot dot-correct"></i>Correct</dt><dd>${c.correct}</dd></div>
        <div><dt><i class="dot dot-wrong"></i>Wrong</dt><dd>${c.wrong}</dd></div>
        <div><dt><i class="dot"></i>Unanswered</dt><dd>${c.unanswered}</dd></div>
      </dl>
      <p class="quiz-card-foot">${answered ? `${accuracy}% accuracy` : 'Not started'} · ${bankAnswered} of ${bank.length} answered across all quizzes</p>
      <div class="quiz-card-actions">
        <button type="button" class="quiz-ghost-btn" data-quiz-action="retry-wrong"${c.wrong ? '' : ' disabled'}>${svgIcon(QUIZ_ICON.retry, 14)}Retry wrong</button>
        <button type="button" class="quiz-ghost-btn quiz-ghost-btn--danger" data-quiz-action="reset"${answered ? '' : ' disabled'}>Reset quiz</button>
      </div>
    </section>
    <section class="quiz-card quiz-map-card">
      <h3 class="quiz-card-title">Questions</h3>
      <div class="qmap">${cells}</div>
    </section>
    ${topicsHtml}`;
}

function renderQuizFilters(unitObj) {
  if (isTimedStudyQuiz()) return '<span class="timed-quiz-hint">Choose your answers, then finish to review.</span>';
  const c = quizCounts(state.activeSubject, unitObj.questions || []);
  return QUIZ_FILTERS.map(([id, label]) => {
    const n = id === 'all' ? c.all : c[id];
    const on = state.quizFilter === id;
    return `<button type="button" class="quiz-filter-btn${on ? ' active' : ''}" data-quiz-filter="${id}" aria-pressed="${on}">${label}<span class="quiz-filter-count">${n}</span></button>`;
  }).join('');
}

function renderQuizFoot(unitObj) {
  if (isTimedStudyQuiz()) return '';
  const c = quizCounts(state.activeSubject, unitObj.questions || []);
  if (!c.all || c.unanswered) return '';
  const hasNext = state.quizUnitIndex < getActiveMcqBank().length - 1 && !isPracticeTestQuiz();
  return `
    <section class="quiz-done">
      <div>
        <strong>Quiz complete — ${c.correct} of ${c.all} correct</strong>
        <span>${c.wrong ? `Retry the ${c.wrong} you missed while they're fresh.` : 'Clean sweep. Move on to the next quiz.'}</span>
      </div>
      <div class="quiz-done-actions">
        ${c.wrong ? `<button type="button" class="quiz-ghost-btn" data-quiz-action="retry-wrong">${svgIcon(QUIZ_ICON.retry, 14)}Retry wrong</button>` : ''}
        ${hasNext ? `<button type="button" class="quiz-primary-btn" data-quiz-action="next">Next quiz${svgIcon(QUIZ_ICON.next, 16)}</button>` : ''}
      </div>
    </section>`;
}

function renderPracticeEmptyState() {
  const copy = {
    starred: ['No starred questions here', 'Star a question with the bookmark icon (or press S) to collect it for revision.'],
    wrong: ['Nothing wrong in this quiz', 'Every answered question is correct. Keep going.'],
    unanswered: ['All questions answered', 'Switch to Wrong to review your mistakes.'],
    all: ['No questions in this quiz yet', 'Pick another quiz from the sidebar.']
  }[state.quizFilter] || [];
  return `<div class="practice-empty"><h4>${copy[0]}</h4><p>${copy[1]}</p></div>`;
}

// Linux PT1 embeds one bank unit; prev/next quiz navigation only makes sense in bank sections.
function isPracticeTestQuiz() {
  return state.activeSection === 'practiceTest1';
}

function updateQuizRail() {
  const unitObj = quizUnit();
  const page = elements.contentArea.querySelector('.quiz-page');
  if (!unitObj || !page) return;
  page.querySelector('.quiz-rail').innerHTML = renderQuizRail(unitObj);
  page.querySelector('.quiz-filter').innerHTML = renderQuizFilters(unitObj);
  page.querySelector('.quiz-foot').innerHTML = renderQuizFoot(unitObj);
}

function renderPracticeUnit(unitIndex) {
  if (typeof closeSolver === 'function') closeSolver();
  const mcqBank = getActiveMcqBank();
  const unitObj = mcqBank[unitIndex];
  if (!unitObj) return;
  if (state.quizUnitIndex !== unitIndex) quizCursorId = null;
  state.quizUnitIndex = unitIndex;

  elements.welcomeScreen.style.display = 'none';
  elements.readingPane.style.display = 'block';

  const subject = state.activeSubject;
  const subj = CONFIG.subjects[subject];
  const fam = DESK_FAMILIES[subject] || 'blue';
  const questions = unitObj.questions || [];
  const topicSet = new Set(questions.map(q => q.topic).filter(Boolean));
  const topicCount = topicSet.size < questions.length ? topicSet.size : 0;
  const sectionName = (subj.sectionNames[state.activeSection] || 'Practice').split(' — ')[0];
  const inBank = !isPracticeTestQuiz();

  const cards = questions
    .map((q, i) => (isTimedStudyQuiz() || quizMatchesFilter(subject, q, state.quizFilter)) ? renderMcqCard(q, i + 1, subject) : '')
    .join('');

  elements.contentArea.classList.remove('reading-area');
  elements.contentArea.innerHTML = `
    <div class="quiz-page fam-${fam}">
      <header class="quiz-head">
        <div class="quiz-head-copy">
          <p class="quiz-crumb">${escapeHtml(subj.shortLabel)} · ${escapeHtml(sectionName)}${inBank ? ` · Quiz ${unitIndex + 1} of ${mcqBank.length}` : ''}</p>
          <h1 class="quiz-title">${escapeHtml(unitObj.unitName)}</h1>
          <p class="quiz-sub">${questions.length} questions${topicCount ? ` · ${topicCount} topics` : ''} · answers save as you go</p>
        </div>
        ${inBank ? `
        <div class="quiz-head-nav">
          <button type="button" class="icon-btn quiz-nav-btn" data-quiz-action="prev" aria-label="Previous quiz"${unitIndex === 0 ? ' disabled' : ''}>${svgIcon(QUIZ_ICON.prev)}</button>
          <button type="button" class="icon-btn quiz-nav-btn" data-quiz-action="next" aria-label="Next quiz"${unitIndex === mcqBank.length - 1 ? ' disabled' : ''}>${svgIcon(QUIZ_ICON.next)}</button>
        </div>` : ''}
      </header>
      ${renderTimedStudyControls()}
      <div class="quiz-layout">
        <div class="quiz-main">
          <div class="quiz-toolbar">
            <div class="quiz-filter" role="group" aria-label="Filter questions"></div>
            <p class="quiz-keys" aria-hidden="true"><kbd>1</kbd>–<kbd>4</kbd> answer <kbd>J</kbd><kbd>K</kbd> move <kbd>S</kbd> star</p>
          </div>
          <div class="quiz-list">${cards || renderPracticeEmptyState()}</div>
          <div class="quiz-foot"></div>
        </div>
        <aside class="quiz-rail" aria-label="Quiz progress"></aside>
      </div>
    </div>`;
  updateQuizRail();
  updateTimedStudyClock();

  // Single-column scroll: let the pane own the scroll, clear old lab-chrome inline styles
  elements.contentArea.style.overflow = '';
  elements.contentArea.style.padding = '';

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

  elements.topicList.querySelectorAll('.topic-item').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.getAttribute('data-index')) === unitIndex);
  });

  document.getElementById('main-content-pane').scrollTop = 0;
}

function setQuizCursor(qId, scroll) {
  quizCursorId = qId;
  elements.contentArea.querySelectorAll('.mcq-card.is-current, .qmap-cell.is-current').forEach(el => el.classList.remove('is-current'));
  const card = document.getElementById('mcq-' + qId);
  if (card) {
    card.classList.add('is-current');
    if (scroll) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.focus({ preventScroll: true });
    }
  }
  elements.contentArea.querySelector(`.qmap-cell[data-quiz-jump="${qId}"]`)?.classList.add('is-current');
}

// Record an answer for a rendered card (click or keyboard). Works for the quiz page
// and for the "quick check" cards embedded in notes, which don't persist.
function answerMcq(option) {
  const group = option.closest('.mcq-options');
  if (!group || group.classList.contains('answered')) return;
  const selected = option.getAttribute('data-option');
  const correct = group.getAttribute('data-correct');
  if (isTimedStudyQuiz() && option.closest('.quiz-page')) {
    const card = option.closest('[data-question-id]');
    timedStudyQuiz.answers[card.dataset.questionId] = selected;
    group.querySelectorAll('.mcq-option').forEach(b => b.classList.toggle('timed-selected', b === option));
    try { localStorage.setItem('prep_timed_quiz', JSON.stringify(timedStudyQuiz)); } catch (_) {}
    updateQuizRail();
    announceStudy('Answer saved. Results appear when you finish.');
    return;
  }

  group.querySelectorAll('.mcq-option').forEach(opt => {
    const letter = opt.getAttribute('data-option');
    if (letter === correct) {
      opt.classList.add('correct');
      if (!opt.querySelector('.correct-badge')) opt.insertAdjacentHTML('beforeend', '<span class="correct-badge">Correct</span>');
    } else if (letter === selected) {
      opt.classList.add('incorrect');
      if (!opt.querySelector('.incorrect-badge')) opt.insertAdjacentHTML('beforeend', '<span class="incorrect-badge">Your answer</span>');
    }
  });
  group.classList.add('answered');

  const card = option.closest('.mcq-card');
  const exp = card?.querySelector('.mcq-explanation');
  if (exp) exp.style.display = 'block';

  if (!isMcqSection() || !card?.dataset.questionId) return;
  const qId = parseInt(card.dataset.questionId, 10);
  card.dataset.status = selected === correct ? 'correct' : 'wrong';
  state.practiceAnswers[state.activeSubject][qId] = selected;
  savePracticeProgress();
  setQuizCursor(qId, false);
  updateQuizRail();
  renderSidebar();
  updateProgressBar();
}

function toggleStar(subject, qId) {
  const list = state.starredMcqs[subject] || (state.starredMcqs[subject] = []);
  const i = list.indexOf(qId);
  if (i > -1) list.splice(i, 1); else list.push(qId);
  saveStarredMcqs();
  const on = i === -1;
  document.querySelectorAll(`.mcq-star-btn[data-qid="${qId}"]`).forEach(btn => {
    btn.classList.toggle('starred', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  if (document.querySelector('.quiz-page')) updateQuizRail();
  renderSavedPanel();
}

function quizAction(action) {
  const unitObj = quizUnit();
  if (!unitObj) return;
  const answers = state.practiceAnswers[state.activeSubject];
  if (action === 'prev' || action === 'next') {
    const target = state.quizUnitIndex + (action === 'next' ? 1 : -1);
    if (target >= 0 && target < getActiveMcqBank().length) selectTopic(target);
    return;
  }
  if (action === 'retry-wrong') {
    unitObj.questions.forEach(q => { if (mcqStatus(state.activeSubject, q) === 'wrong') delete answers[q.id]; });
    state.quizFilter = 'unanswered';
  } else if (action === 'reset') {
    const btn = elements.contentArea.querySelector('[data-quiz-action="reset"]');
    // Two-step confirm in place instead of a blocking dialog.
    if (btn && !btn.classList.contains('armed')) {
      btn.classList.add('armed');
      btn.textContent = 'Tap again to reset';
      setTimeout(() => { if (btn.isConnected) { btn.classList.remove('armed'); btn.textContent = 'Reset quiz'; } }, 3000);
      return;
    }
    unitObj.questions.forEach(q => { delete answers[q.id]; });
    state.quizFilter = 'all';
  }
  savePracticeProgress();
  renderPracticeUnit(state.quizUnitIndex);
  renderSidebar();
  updateProgressBar();
}

// Keyboard: 1-4 / A-D answer the current question, J/K move, S stars.
function handleQuizKey(e) {
  if (e.metaKey || e.ctrlKey || e.altKey) return false;
  const cards = [...elements.contentArea.querySelectorAll('.quiz-list .mcq-card')];
  if (!cards.length) return false;
  const key = e.key.toLowerCase();
  let current = document.getElementById('mcq-' + quizCursorId);
  if (!current || !cards.includes(current)) {
    current = cards.find(c => c.dataset.status === 'unanswered' && c.getBoundingClientRect().bottom > 80) || cards[0];
  }

  const optionIndex = '1234'.indexOf(key) > -1 ? '1234'.indexOf(key) : 'abcd'.indexOf(key);
  if (optionIndex > -1) {
    const option = current.querySelectorAll('.mcq-option')[optionIndex];
    if (!option) return false;
    setQuizCursor(parseInt(current.dataset.questionId, 10), true);
    answerMcq(option);
    return true;
  }
  if (key === 'j' || key === 'k') {
    const i = cards.indexOf(current) + (key === 'j' ? 1 : -1);
    const target = cards[Math.max(0, Math.min(cards.length - 1, i))];
    setQuizCursor(parseInt(target.dataset.questionId, 10), true);
    return true;
  }
  if (key === 's') {
    toggleStar(state.activeSubject, parseInt(current.dataset.questionId, 10));
    return true;
  }
  return false;
}


// ============================================================
//  LAYOUT
// ============================================================
function closeMobileSidebar() {
  elements.sidebar.classList.remove('mobile-open');
  const scrim = document.querySelector('.sidebar-scrim');
  if (scrim) scrim.hidden = true;
  elements.menuToggleBtn?.setAttribute('aria-expanded', 'false');
  elements.desktopSidebarToggle?.setAttribute('aria-expanded', 'false');
}

// ============================================================
//  RESIZABLE PANELS LOGIC
// ============================================================
function initResizer(resizerId, targetPaneId, direction, invert = false) {
  const resizer = document.getElementById(resizerId);
  const targetPane = document.getElementById(targetPaneId);
  if (!resizer || !targetPane) return;
  resizer.tabIndex = 0;
  resizer.setAttribute('role', 'separator');
  resizer.setAttribute('aria-label', direction === 'horizontal' ? 'Resize problem panel. Arrow keys resize, Home resets.' : 'Resize results panel. Arrow keys resize, Home resets.');
  resizer.setAttribute('aria-orientation', direction === 'horizontal' ? 'vertical' : 'horizontal');
  resizer.addEventListener('keydown', e => {
    const dimension = direction === 'horizontal' ? 'width' : 'height';
    const before = targetPane.getBoundingClientRect()[dimension];
    if (e.key === 'Home') { targetPane.style[dimension] = ''; targetPane.style.flex = ''; e.preventDefault(); return; }
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) return;
    const delta = ['ArrowRight','ArrowDown'].includes(e.key) ? 24 : -24;
    const max = (direction === 'horizontal' ? window.innerWidth : window.innerHeight) * .85;
    targetPane.style[dimension] = Math.max(direction === 'horizontal' ? 150 : 0, Math.min(max, before + delta * (invert ? -1 : 1))) + 'px';
    targetPane.style.flex = 'none';
    e.preventDefault();
  });

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

  let animationFrameId = null;
  const mousemoveHandler = function(e) {
    if (animationFrameId) return;

    animationFrameId = requestAnimationFrame(() => {
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
        if (newHeight >= 0 && newHeight < window.innerHeight * 0.85) {
          if (newHeight < 40) {
            targetPane.style.height = '0px';
          } else {
            targetPane.style.height = newHeight + 'px';
            if (targetPaneId === 'java-results-pane') {
              state.lastJavaResultsHeight = newHeight;
            } else if (targetPaneId === 'bash-results-pane') {
              state.lastBashResultsHeight = newHeight;
            }
          }
          targetPane.style.flex = 'none'; // Ensure height is respected
        }
      }
      animationFrameId = null;
    });
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
document.getElementById('zoom-in')?.addEventListener('click', () => {
  setReadingScale((studyPreferences.fontScale || 1) + 0.1);
});

document.getElementById('zoom-out')?.addEventListener('click', () => {
  setReadingScale((studyPreferences.fontScale || 1) - 0.1);
});

document.getElementById('zoom-default')?.addEventListener('click', () => {
  setReadingScale(1);
});

// ============================================================
//  SYNTAX HIGHLIGHTER HELPER
// ============================================================
let lastBashHighlightSource = null;
let lastJavaHighlightSource = null;

window.updateBashHighlighting = debounce(function() {
  const editor = document.getElementById('bash-code-editor');
  const highlighter = document.querySelector('#bash-highlighter code');
  if (!editor || !highlighter) return;

  if (editor.value === lastBashHighlightSource) {
    markEditorHighlightReady(editor);
    return;
  }
  lastBashHighlightSource = editor.value;

  if (window.Prism) {
    highlighter.innerHTML = Prism.highlight(editor.value, Prism.languages.bash, 'bash');
  } else {
    highlighter.textContent = editor.value;
  }
  markEditorHighlightReady(editor);
}, 220);



window.updateJavaHighlighting = debounce(function() {
  const editor = document.getElementById('java-code-editor');
  const highlighter = document.querySelector('#java-highlighter code');
  if (!editor || !highlighter) return;

  if (editor.value === lastJavaHighlightSource) {
    markEditorHighlightReady(editor);
    return;
  }
  lastJavaHighlightSource = editor.value;

  if (window.Prism && Prism.languages.java) {
    highlighter.innerHTML = Prism.highlight(editor.value, Prism.languages.java, 'java');
  } else {
    highlighter.textContent = editor.value;
  }
  markEditorHighlightReady(editor);
}, 220);

window.addEventListener('DOMContentLoaded', () => {
  init();
});

// ============================================================
//  THEME TOGGLE
// ============================================================
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  if (toggleBtn.dataset.themeToggleInitialized) return;
  toggleBtn.dataset.themeToggleInitialized = 'true';
  toggleBtn.addEventListener('click', () => {
    studyPreferences.theme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    saveStudyPreferences();
    applyStudyPreferences();
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
        <div class="subjective-answer" id="subjective-ans-${i}" style="display: none; margin-top: 1rem; padding: 1rem; background-color: var(--blue-bg); border-radius: 6px;">
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
//  SAVED — notes, highlights, starred questions, mistakes
// ============================================================
// One drawer, three lists:
//   Notes     highlights and typed notes, grouped by topic, editable, jump back to source
//   Starred   bookmarked questions as flashcards (answer hidden until asked)
//   Mistakes  every question answered wrong; retry in place until it's right
// Question lists need each subject's MCQ bank, so opening them lazy-loads those subjects.
const SAVED_TABS = [['notes', 'Notes'], ['starred', 'Starred'], ['mistakes', 'Mistakes']];
const SAVED_ICON = {
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.65" y2="16.65"/>',
  open: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  note: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  highlight: '<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>'
};

const saved = { tab: 'notes', query: '', editingId: null, undo: null, loading: false };

function subjectShort(id) {
  return CONFIG.subjects[id]?.shortLabel || 'General';
}

function questionSectionId(subject) {
  return (CONFIG.subjects[subject]?.tabs || []).map(t => t.id).find(id => id === 'practice' || id === 'linuxMcq') || null;
}

// { subject, unitIndex, q } for every loaded question matching a predicate.
function collectQuestions(match) {
  const out = [];
  Object.keys(CONFIG.subjects).forEach(subject => {
    (CONFIG.subjects[subject].mcqs || []).forEach((unit, unitIndex) => {
      (unit.questions || []).forEach(q => { if (match(subject, q)) out.push({ subject, unitIndex, unitName: unit.unitName, q }); });
    });
  });
  return out;
}

const starredItems = () => collectQuestions((s, q) => isStarred(s, q.id));
const mistakeItems = () => collectQuestions((s, q) => mcqStatus(s, q) === 'wrong');

// Load banks for every subject that has starred or answered questions.
async function ensureSavedBanksLoaded() {
  const needed = Object.keys(CONFIG.subjects).filter(s =>
    !hydratedSubjects[s] && ((state.starredMcqs[s] || []).length || Object.keys(state.practiceAnswers[s] || {}).length));
  if (!needed.length) return;
  saved.loading = true;
  renderSavedPanel();
  await Promise.all(needed.map(s => ensureSubjectDataLoaded(s).catch(() => {})));
  saved.loading = false;
  renderSavedPanel();
}

function initSmartNotesUI() {
  const fab = document.createElement('button');
  fab.className = 'smart-notes-fab';
  fab.id = 'smart-notes-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', 'Saved notes and questions');
  fab.title = 'Saved (N)';
  fab.innerHTML = `${svgIcon(ICON.saved, 20)}<span class="notes-count" id="notes-count-badge"></span>`;
  fab.addEventListener('click', () => toggleSmartNotesPanel());
  document.body.appendChild(fab);

  const panel = document.createElement('aside');
  panel.className = 'smart-notes-panel';
  panel.id = 'smart-notes-panel';
  panel.setAttribute('aria-label', 'Saved');
  panel.innerHTML = `
    <header class="saved-head">
      <h2>Saved</h2>
      <button type="button" class="icon-btn" data-saved-close aria-label="Close saved panel">${svgIcon(SAVED_ICON.close)}</button>
    </header>
    <div class="saved-tabs" role="tablist" aria-label="Saved lists"></div>
    <div class="saved-tools">
      <label class="saved-search">${svgIcon(SAVED_ICON.search, 15)}<input type="search" id="saved-search" placeholder="Search" aria-label="Search saved items"></label>
      <select id="saved-scope" class="saved-scope" aria-label="Filter by subject"></select>
    </div>
    <div class="saved-body" id="saved-body" role="tabpanel"></div>
    <footer class="saved-foot" id="saved-foot"></footer>`;
  document.body.appendChild(panel);

  panel.addEventListener('click', onSavedClick);
  panel.addEventListener('keydown', onSavedKeydown);
  panel.querySelector('#saved-search').addEventListener('input', debounce(e => { saved.query = e.target.value.trim().toLowerCase(); renderSavedBody(); }, 120));
  panel.querySelector('#saved-scope').addEventListener('change', e => { state.notesFilterSubject = e.target.value; renderSavedBody(); });

  const tooltip = document.createElement('div');
  tooltip.className = 'selection-tooltip';
  tooltip.id = 'selection-tooltip';
  tooltip.setAttribute('role', 'toolbar');
  tooltip.innerHTML = `
    <button type="button" data-sel="highlight">${svgIcon(SAVED_ICON.highlight, 14)}Highlight</button>
    <button type="button" data-sel="note">${svgIcon(SAVED_ICON.note, 14)}Add note</button>`;
  document.body.appendChild(tooltip);
  setupSelectionTooltip();

  renderSavedPanel();
}

function toggleSmartNotesPanel(force, tab) {
  const memoryDialog = document.getElementById('study-memory');
  if (memoryDialog?.open) memoryDialog.close();
  const panel = document.getElementById('smart-notes-panel');
  const fab = document.getElementById('smart-notes-fab');
  if (!panel || !fab) return;
  const isOpen = panel.classList.toggle('open', force === undefined ? !panel.classList.contains('open') : force);
  fab.classList.toggle('panel-open', isOpen);
  document.body.classList.toggle('notes-open', isOpen);
  if (tab) saved.tab = tab;
  if (isOpen) {
    renderSavedPanel();
    if (saved.tab !== 'notes') ensureSavedBanksLoaded();
    // Don't steal focus from a note that just opened in edit mode.
    if (!panel.contains(document.activeElement)) panel.querySelector('[aria-selected="true"]')?.focus({ preventScroll: true });
  } else {
    saved.editingId = null;
    if (panel.contains(document.activeElement)) fab.focus({ preventScroll: true });
  }
}

function renderSavedPanel() {
  updateNotesCount();
  const panel = document.getElementById('smart-notes-panel');
  if (!panel) return;
  const counts = { notes: state.smartNotes.length, starred: starredItems().length, mistakes: mistakeItems().length };
  // Starred ids from not-yet-loaded subjects still count toward the tab badge.
  counts.starred = Math.max(counts.starred, Object.values(state.starredMcqs).reduce((n, l) => n + (l || []).length, 0));

  panel.querySelector('.saved-tabs').innerHTML = SAVED_TABS.map(([id, label]) => `
    <button type="button" role="tab" data-saved-tab="${id}" aria-selected="${saved.tab === id}" tabindex="${saved.tab === id ? 0 : -1}">
      ${label}<span class="saved-tab-count">${counts[id]}</span>
    </button>`).join('');

  panel.querySelector('#saved-search').placeholder = { notes: 'Search notes', starred: 'Search starred', mistakes: 'Search mistakes' }[saved.tab];
  renderSavedScope();
  renderSavedBody();
}

function renderSavedScope() {
  const select = document.getElementById('saved-scope');
  const subjects = new Set();
  if (saved.tab === 'notes') state.smartNotes.forEach(n => subjects.add(n.subject || ''));
  else (saved.tab === 'starred' ? starredItems() : mistakeItems()).forEach(i => subjects.add(i.subject));
  if (state.notesFilterSubject !== 'all' && !subjects.has(state.notesFilterSubject)) state.notesFilterSubject = 'all';
  select.innerHTML = `<option value="all">All subjects</option>` + [...subjects].map(s =>
    `<option value="${s}"${state.notesFilterSubject === s ? ' selected' : ''}>${escapeHtml(subjectShort(s))}</option>`).join('');
  select.hidden = subjects.size < 2;
}

function inScope(subject) {
  return state.notesFilterSubject === 'all' || state.notesFilterSubject === (subject || '');
}

function renderSavedBody() {
  const body = document.getElementById('saved-body');
  const foot = document.getElementById('saved-foot');
  if (!body) return;
  if (saved.tab === 'notes') {
    body.innerHTML = renderNotesTab();
    foot.innerHTML = renderNoteComposer();
  } else {
    body.innerHTML = saved.loading ? '<p class="saved-empty">Loading questions…</p>' : (saved.tab === 'starred' ? renderStarredTab() : renderMistakesTab());
    const n = (saved.tab === 'starred' ? starredItems() : mistakeItems()).length;
    foot.innerHTML = n ? `<button type="button" class="saved-btn" data-saved-copy>${svgIcon(SAVED_ICON.copy, 14)}Copy as text</button><span class="saved-foot-hint">Paste into any chat to get explanations</span>` : '';
  }
  if (saved.undo) {
    foot.insertAdjacentHTML('afterbegin', `<div class="saved-toast" role="status">Note deleted<button type="button" data-saved-undo>Undo</button></div>`);
  }
  const editing = body.querySelector('.saved-edit textarea');
  if (editing) { editing.focus(); editing.setSelectionRange(editing.value.length, editing.value.length); }
}

function savedEmpty(title, text) {
  return `<div class="saved-empty"><strong>${title}</strong><p>${text}</p></div>`;
}

function matchesQuery(...parts) {
  return !saved.query || parts.join(' ').toLowerCase().includes(saved.query);
}

// ── Notes tab ──
function renderNotesTab() {
  if (!state.smartNotes.length) {
    return savedEmpty('No notes yet', 'Select any text while reading to highlight it or attach a thought. You can also write a note below.');
  }
  const notes = state.smartNotes.filter(n => inScope(n.subject) && matchesQuery(n.selectedText, n.userAnnotation, n.topicTitle));
  if (!notes.length) return savedEmpty('Nothing matches', 'Try a different word or subject.');

  const groups = new Map();
  notes.forEach(n => {
    const key = n.topicTitle ? `${n.subject}|${n.section}|${n.topicIndex}` : `${n.subject || ''}|general`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(n);
  });

  return [...groups.values()].map(list => {
    const n = list[0];
    const sectionShort = (n.sectionName || '').split(' — ')[0];
    const canOpen = n.subject && n.topicTitle && CONFIG.subjects[n.subject];
    return `
      <section class="saved-group">
        <header class="saved-group-head">
          <div>
            <h3>${escapeHtml(n.topicTitle || 'General notes')}</h3>
            <p>${escapeHtml([n.subject ? subjectShort(n.subject) : '', n.topicTitle ? sectionShort : ''].filter(Boolean).join(' · ') || 'Not tied to a topic')}</p>
          </div>
          ${canOpen ? `<button type="button" class="saved-link" data-open-note="${n.id}">Open${svgIcon(SAVED_ICON.open, 13)}</button>` : ''}
        </header>
        ${list.map(renderNoteItem).join('')}
      </section>`;
  }).join('');
}

function renderNoteItem(n) {
  const editing = saved.editingId === n.id;
  const text = editing
    ? `<div class="saved-edit">
         <textarea rows="3" aria-label="Edit note" placeholder="What should you remember about this?">${escapeHtml(n.userAnnotation || '')}</textarea>
         <div class="saved-edit-actions"><span>⌘/Ctrl + Enter to save</span><button type="button" class="saved-btn" data-note-cancel>Cancel</button><button type="button" class="saved-btn saved-btn--primary" data-note-save="${n.id}">Save</button></div>
       </div>`
    : (n.userAnnotation ? `<p class="saved-text">${escapeHtml(n.userAnnotation)}</p>` : '');
  return `
    <article class="saved-note" data-note-id="${n.id}">
      ${n.selectedText ? `<blockquote class="saved-quote">${escapeHtml(n.selectedText)}</blockquote>` : ''}
      ${text}
      ${editing ? '' : `
      <div class="saved-note-foot">
        <time>${escapeHtml(timeAgo(n.updatedAt || n.timestamp))}</time>
        <span class="saved-note-actions">
          <button type="button" data-note-edit="${n.id}">${n.userAnnotation ? 'Edit' : 'Add thought'}</button>
          <button type="button" data-note-delete="${n.id}">Delete</button>
        </span>
      </div>`}
    </article>`;
}

function noteContext() {
  const inSubject = !document.body.classList.contains('landing-mode');
  const subj = inSubject ? CONFIG.subjects[state.activeSubject] : null;
  const reading = inSubject && !document.body.classList.contains('overview-mode') && elements.readingPane.style.display !== 'none'
    && !isMcqSection() && !isBashSection() && !isJavaSection() && !isPlaygroundSection();
  const topic = reading ? subj?.data?.[state.activeSection]?.[state.activeTopicIndex] : null;
  return {
    subject: subj ? state.activeSubject : null,
    section: topic ? state.activeSection : null,
    sectionName: topic ? (subj.sectionNames?.[state.activeSection] || state.activeSection) : '',
    topicIndex: topic ? state.activeTopicIndex : null,
    topicTitle: topic ? topic.title : '',
    label: topic ? topic.title : subj ? subj.label : 'General'
  };
}

function renderNoteComposer() {
  const ctx = noteContext();
  return `
    <form class="saved-composer" data-note-form>
      <label for="smart-notes-textarea">Note on <strong>${escapeHtml(ctx.label)}</strong></label>
      <textarea id="smart-notes-textarea" rows="2" placeholder="Write a note…"></textarea>
      <div class="saved-composer-actions">
        ${state.smartNotes.length ? `<button type="button" class="saved-btn" data-saved-copy>${svgIcon(SAVED_ICON.copy, 14)}Copy all</button>` : '<span></span>'}
        <button type="submit" class="saved-btn saved-btn--primary">Add note</button>
      </div>
    </form>`;
}

function addNote(noteData) {
  const ctx = noteContext();
  const note = {
    id: 'note_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    subject: ctx.subject,
    section: ctx.section,
    sectionName: ctx.sectionName,
    topicTitle: ctx.topicTitle,
    topicIndex: ctx.topicIndex,
    timestamp: Date.now(),
    sourceType: noteData.sourceType || 'manual',
    selectedText: noteData.selectedText || '',
    userAnnotation: noteData.userAnnotation || ''
  };
  state.smartNotes.unshift(note);
  saveSmartNotes();
  renderSavedPanel();
  applyNoteHighlights();
  refreshRailNotes();
  const badge = document.getElementById('notes-count-badge');
  if (badge) { badge.classList.add('bump'); setTimeout(() => badge.classList.remove('bump'), 300); }
  return note;
}

function deleteNote(noteId) {
  const index = state.smartNotes.findIndex(n => n.id === noteId);
  if (index === -1) return;
  const [note] = state.smartNotes.splice(index, 1);
  clearTimeout(saved.undo?.timer);
  saved.undo = { note, index, timer: setTimeout(() => { saved.undo = null; renderSavedBody(); }, 6000) };
  saveSmartNotes();
  renderSavedPanel();
  applyNoteHighlights();
  refreshRailNotes();
}

function undoDeleteNote() {
  if (!saved.undo) return;
  clearTimeout(saved.undo.timer);
  state.smartNotes.splice(saved.undo.index, 0, saved.undo.note);
  saved.undo = null;
  saveSmartNotes();
  renderSavedPanel();
  applyNoteHighlights();
  refreshRailNotes();
}

function saveNoteEdit(noteId) {
  const note = state.smartNotes.find(n => n.id === noteId);
  const field = document.querySelector('.saved-edit textarea');
  if (!note || !field) return;
  note.userAnnotation = field.value.trim();
  note.updatedAt = Date.now();
  // A note with neither a highlight nor text is just empty; drop it.
  if (!note.userAnnotation && !note.selectedText) { saved.editingId = null; deleteNote(noteId); return; }
  saved.editingId = null;
  saveSmartNotes();
  renderSavedBody();
  refreshRailNotes();
}

async function openNoteSource(noteId) {
  const n = state.smartNotes.find(x => x.id === noteId);
  if (!n || !n.subject) return;
  if (window.matchMedia('(max-width: 900px)').matches) toggleSmartNotesPanel(false);
  await resumeTo(n.subject, n.section, n.topicIndex);
  requestAnimationFrame(() => scrollToHighlight(n));
}

// ── Starred + Mistakes tabs ──
function questionMeta(item) {
  return [subjectShort(item.subject), item.q.topic || item.unitName.split(' — ')[0]].filter(Boolean).join(' · ');
}

function correctOptionText(q) {
  return parseOption(q.options[q.correct] || '').text;
}

function renderStarredTab() {
  const items = starredItems();
  if (!items.length) return savedEmpty('No starred questions', 'Tap the bookmark on any practice question (or press S) to keep it here as a flashcard.');
  const shown = items.filter(i => inScope(i.subject) && matchesQuery(i.q.question, i.q.topic || ''));
  if (!shown.length) return savedEmpty('Nothing matches', 'Try a different word or subject.');
  return shown.map(item => {
    const q = item.q;
    const exp = q.explanation || parseOption(q.options[q.correct] || '').explanation;
    return `
      <article class="saved-q">
        <p class="saved-q-meta">${escapeHtml(questionMeta(item))}</p>
        <div class="saved-q-text">${q.question}</div>
        <details class="saved-q-answer">
          <summary>Show answer</summary>
          <p><b>${q.correct.toUpperCase()}</b> ${correctOptionText(q)}</p>
          ${exp ? `<p class="saved-q-why">${exp}</p>` : ''}
        </details>
        <div class="saved-note-foot">
          <span></span>
          <span class="saved-note-actions">
            <button type="button" data-q-open="${item.subject}:${q.id}">Open in quiz</button>
            <button type="button" data-q-unstar="${item.subject}:${q.id}">Unstar</button>
          </span>
        </div>
      </article>`;
  }).join('');
}

function renderMistakesTab() {
  const items = mistakeItems();
  if (!items.length) return savedEmpty('No mistakes to review', 'Questions you answer wrong collect here. Get them right and they leave the list.');
  const shown = items.filter(i => inScope(i.subject) && matchesQuery(i.q.question, i.q.topic || ''));
  if (!shown.length) return savedEmpty('Nothing matches', 'Try a different word or subject.');
  return `<p class="saved-intro">Pick the right answer to clear a mistake.</p>` + shown.map(item => {
    const q = item.q;
    const key = `${item.subject}:${q.id}`;
    const last = state.practiceAnswers[item.subject][q.id];
    return `
      <article class="saved-q" data-retry="${key}">
        <p class="saved-q-meta">${escapeHtml(questionMeta(item))}</p>
        <div class="saved-q-text">${q.question}</div>
        <div class="saved-retry">
          ${Object.keys(q.options).map(letter => `
            <button type="button" class="saved-retry-opt${letter === last ? ' was-picked' : ''}" data-retry-pick="${letter}">
              <span class="option-letter">${letter.toUpperCase()}</span><span>${parseOption(q.options[letter]).text}</span>
            </button>`).join('')}
        </div>
        <p class="saved-retry-status" role="status">Last time you picked ${last.toUpperCase()}.</p>
        <div class="saved-note-foot">
          <span></span>
          <span class="saved-note-actions"><button type="button" data-q-open="${key}">Open in quiz</button></span>
        </div>
      </article>`;
  }).join('');
}

function retryMistake(card, letter) {
  const [subject, id] = card.dataset.retry.split(':');
  const item = collectQuestions((s, q) => s === subject && String(q.id) === id)[0];
  if (!item || card.classList.contains('is-done')) return;
  const q = item.q;
  const right = letter === q.correct;
  state.practiceAnswers[subject][q.id] = letter;
  const key = CONFIG.subjects[subject].storageKeyPractice;
  localStorage.setItem(key, JSON.stringify(state.practiceAnswers[subject]));
  if (typeof window.triggerCloudSync === 'function') window.triggerCloudSync();

  card.querySelectorAll('.saved-retry-opt').forEach(btn => {
    const l = btn.dataset.retryPick;
    btn.classList.remove('was-picked');
    btn.classList.toggle('correct', l === q.correct && right);
    btn.classList.toggle('incorrect', l === letter && !right);
  });
  const exp = q.explanation || parseOption(q.options[q.correct] || '').explanation;
  card.querySelector('.saved-retry-status').innerHTML = right
    ? 'Correct. Cleared from mistakes.'
    : `Not quite. Try again.${exp ? ` <span class="saved-q-why">Hint: ${exp}</span>` : ''}`;
  if (right) {
    card.classList.add('is-done');
    setTimeout(() => renderSavedPanel(), 1400);
  }
  if (state.activeSubject === subject && document.querySelector('.quiz-page')) renderPracticeUnit(state.quizUnitIndex);
}

async function openQuestion(key) {
  const [subject, id] = key.split(':');
  const item = collectQuestions((s, q) => s === subject && String(q.id) === id)[0];
  const section = questionSectionId(subject);
  if (!item || !section) return;
  if (window.matchMedia('(max-width: 900px)').matches) toggleSmartNotesPanel(false);
  state.quizFilter = 'all';
  await resumeTo(subject, section, item.unitIndex);
  if (state.quizUnitIndex !== item.unitIndex) selectTopic(item.unitIndex);
  requestAnimationFrame(() => setQuizCursor(item.q.id, true));
}

function formatQuestionsForExport(items, title) {
  return `${title} — prep\n\n` + items.map((item, i) => {
    const q = item.q;
    const plain = html => { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; };
    const opts = Object.keys(q.options).map(l => `  ${l.toUpperCase()}) ${plain(parseOption(q.options[l]).text)}${l === q.correct ? '  ← correct' : ''}`).join('\n');
    const mine = state.practiceAnswers[item.subject]?.[q.id];
    return `${i + 1}. [${subjectShort(item.subject)}] ${plain(q.question)}\n${opts}${mine ? `\n  My answer: ${mine.toUpperCase()}` : ''}`;
  }).join('\n\n');
}

function formatNotesForExport() {
  const groups = new Map();
  state.smartNotes.forEach(n => {
    const key = `${subjectShort(n.subject)} — ${n.topicTitle || 'General notes'}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(n);
  });
  return '# Notes — prep\n\n' + [...groups].map(([head, list]) =>
    `## ${head}\n\n` + list.map(n => [n.selectedText && `> ${n.selectedText.replace(/\n+/g, ' ')}`, n.userAnnotation].filter(Boolean).join('\n\n')).join('\n\n')
  ).join('\n\n');
}

function copySavedTab(button) {
  const text = saved.tab === 'notes' ? formatNotesForExport()
    : saved.tab === 'starred' ? formatQuestionsForExport(starredItems(), 'Starred questions')
    : formatQuestionsForExport(mistakeItems(), 'Questions I got wrong');
  navigator.clipboard.writeText(text).then(() => {
    const original = button.innerHTML;
    button.textContent = 'Copied';
    setTimeout(() => { if (button.isConnected) button.innerHTML = original; }, 1600);
  }).catch(() => {});
}

function onSavedClick(e) {
  const t = e.target;
  const hit = sel => t.closest(sel);
  let el;
  if (hit('[data-saved-close]')) return toggleSmartNotesPanel(false);
  if ((el = hit('[data-saved-tab]'))) {
    saved.tab = el.dataset.savedTab; saved.editingId = null;
    renderSavedPanel();
    if (saved.tab !== 'notes') ensureSavedBanksLoaded();
    return;
  }
  if (hit('[data-saved-copy]')) return copySavedTab(hit('[data-saved-copy]'));
  if (hit('[data-saved-undo]')) return undoDeleteNote();
  if ((el = hit('[data-note-edit]'))) { saved.editingId = el.dataset.noteEdit; return renderSavedBody(); }
  if (hit('[data-note-cancel]')) { saved.editingId = null; return renderSavedBody(); }
  if ((el = hit('[data-note-save]'))) return saveNoteEdit(el.dataset.noteSave);
  if ((el = hit('[data-note-delete]'))) return deleteNote(el.dataset.noteDelete);
  if ((el = hit('[data-open-note]'))) return openNoteSource(el.dataset.openNote);
  if ((el = hit('[data-q-open]'))) return openQuestion(el.dataset.qOpen);
  if ((el = hit('[data-q-unstar]'))) {
    const [subject, id] = el.dataset.qUnstar.split(':');
    return toggleStar(subject, parseInt(id, 10));
  }
  if ((el = hit('[data-retry-pick]'))) return retryMistake(el.closest('[data-retry]'), el.dataset.retryPick);
}

function onSavedKeydown(e) {
  if (e.key === 'Escape') {
    if (saved.editingId) { saved.editingId = null; renderSavedBody(); }
    else toggleSmartNotesPanel(false);
    e.stopPropagation();
    return;
  }
  const composer = e.target.closest('[data-note-form]');
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    if (saved.editingId) { saveNoteEdit(saved.editingId); e.preventDefault(); }
    else if (composer) { composer.requestSubmit(); e.preventDefault(); }
    return;
  }
  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const tab = e.target.closest('[data-saved-tab]');
  if (tab && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
    const ids = SAVED_TABS.map(([id]) => id);
    const next = ids[(ids.indexOf(saved.tab) + (e.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length];
    saved.tab = next;
    renderSavedPanel();
    if (next !== 'notes') ensureSavedBanksLoaded();
    document.querySelector(`[data-saved-tab="${next}"]`)?.focus();
    e.preventDefault();
  }
}

document.addEventListener('submit', e => {
  if (!e.target.matches('[data-note-form]')) return;
  e.preventDefault();
  const field = e.target.querySelector('textarea');
  const text = field.value.trim();
  if (!text) { field.focus(); return; }
  addNote({ sourceType: 'manual', userAnnotation: text });
  document.getElementById('smart-notes-textarea')?.focus();
});

function updateNotesCount() {
  const badge = document.getElementById('notes-count-badge');
  if (!badge) return;
  const count = state.smartNotes.length + Object.values(state.starredMcqs).reduce((n, l) => n + (l || []).length, 0);
  badge.textContent = count > 0 ? String(count) : '';
  badge.setAttribute('data-count', String(count));
}

// ============================================================
//  TEXT SELECTION → HIGHLIGHT / NOTE
// ============================================================
function setupSelectionTooltip() {
  const tooltip = document.getElementById('selection-tooltip');
  if (!tooltip) return;
  let selectedText = '';

  document.addEventListener('mouseup', (e) => {
    if (tooltip.contains(e.target)) return;
    const contentArea = document.getElementById('reading-content-area');
    if (!contentArea || !contentArea.contains(e.target) || isMcqSection() || isBashSection() || isJavaSection()) {
      hideSelectionTooltip();
      return;
    }
    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : '';
    if (text.length < 4) { hideSelectionTooltip(); return; }
    selectedText = text.slice(0, 1200);
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    tooltip.classList.add('visible');
    const w = tooltip.offsetWidth;
    tooltip.style.top = (rect.bottom + window.scrollY + 8) + 'px';
    tooltip.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, rect.left + rect.width / 2 - w / 2)) + 'px';
  });

  tooltip.addEventListener('mousedown', e => e.preventDefault()); // keep the selection alive
  tooltip.addEventListener('click', (e) => {
    const action = e.target.closest('[data-sel]')?.dataset.sel;
    if (!action || !selectedText) return;
    const note = addNote({ sourceType: 'selection', selectedText });
    hideSelectionTooltip();
    window.getSelection().removeAllRanges();
    if (action === 'note') {
      saved.editingId = note.id;
      toggleSmartNotesPanel(true, 'notes');
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (!tooltip.contains(e.target)) hideSelectionTooltip();
  });
}

function hideSelectionTooltip() {
  document.getElementById('selection-tooltip')?.classList.remove('visible');
}

// Paint saved highlights on the open topic with the CSS Custom Highlight API: no DOM
// mutation, so ranges may span elements. Browsers without it simply show no marks.
function findTextRange(root, needle) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const map = [];
  let flat = '';
  let lastSpace = true;
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const s = node.nodeValue;
    for (let i = 0; i < s.length; i++) {
      const space = /\s/.test(s[i]);
      if (space && lastSpace) continue;
      flat += space ? ' ' : s[i];
      map.push([node, i]);
      lastSpace = space;
    }
  }
  const target = needle.replace(/\s+/g, ' ').trim();
  const at = flat.indexOf(target);
  if (at === -1 || !target) return null;
  const range = document.createRange();
  const [sNode, sOff] = map[at];
  const [eNode, eOff] = map[at + target.length - 1];
  range.setStart(sNode, sOff);
  range.setEnd(eNode, eOff + 1);
  return range;
}

function topicNotes() {
  return state.smartNotes.filter(n => n.subject === state.activeSubject && n.section === state.activeSection && n.topicIndex === state.activeTopicIndex);
}

function applyNoteHighlights() {
  if (typeof CSS === 'undefined' || !CSS.highlights || typeof Highlight === 'undefined') return;
  const reading = elements.readingPane.style.display !== 'none' && !isMcqSection() && !isBashSection() && !isJavaSection();
  const ranges = reading
    ? topicNotes().filter(n => n.selectedText).map(n => findTextRange(elements.contentArea, n.selectedText)).filter(Boolean)
    : [];
  CSS.highlights.set('prep-notes', new Highlight(...ranges));
}

function scrollToHighlight(note) {
  if (!note.selectedText) return;
  const range = findTextRange(elements.contentArea, note.selectedText);
  const el = range?.startContainer.parentElement;
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Keep the reader's "Your notes" rail card in sync without re-rendering the whole rail.
function refreshRailNotes() {
  const slot = document.getElementById('rail-notes');
  if (slot) slot.innerHTML = renderRailNotes();
}

function renderRailNotes() {
  const notes = topicNotes();
  const list = notes.slice(0, 3).map(n => `
    <button type="button" class="rail-note" data-rail-note="${n.id}">
      ${n.selectedText ? `<span class="rail-note-quote">${escapeHtml(n.selectedText)}</span>` : ''}
      ${n.userAnnotation ? `<span class="rail-note-text">${escapeHtml(n.userAnnotation)}</span>` : ''}
    </button>`).join('');
  return `
    ${notes.length ? list : '<p class="rail-empty">Select text to highlight it, or add a note for this topic.</p>'}
    ${notes.length > 3 ? `<p class="rail-empty">+${notes.length - 3} more in Saved</p>` : ''}
    <button type="button" class="rail-add-note" data-rail-add-note>${svgIcon(SAVED_ICON.note, 14)}${notes.length ? 'Open notes' : 'Add a note'}</button>`;
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
