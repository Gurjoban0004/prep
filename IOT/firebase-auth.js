// ============================================================
//  FIREBASE AUTH + FIRESTORE SYNC — prep Study Hub  v2
//  Real-time onSnapshot | Profile Panel | Cloud-first data
// ============================================================

(function () {
  'use strict';

  // ── State ─────────────────────────────────────────────────────
  let currentUser         = null;
  let syncInProgress      = false;
  let unsubscribeSnapshot = null;
  let lastSyncedAt        = null;

  // ── All localStorage keys we sync ─────────────────────────────
  const LS_KEYS = [
    'es_iot_mastered_topics',
    'es_iot_practice_answers',
    'cn_mastered_topics',
    'cn_practice_answers',
    'linux_mastered_topics',
    'linux_mcq_answers',
    'linux_bash_progress',
    'java_mastered_topics',
    'java_practice_answers',
    'java_dsa_progress',
    'prep_smart_notes',
    'prep_starred_mcqs',
  ];

  // ─────────────────────────────────────────────────────────────
  //  AUTH STATE LISTENER
  // ─────────────────────────────────────────────────────────────
  window.fbAuth.onAuthStateChanged(async user => {
    currentUser = user;
    renderAuthUI(user);

    if (user) {
      await mergeCloudToLocal(user.uid);
      subscribeToRealtimeUpdates(user.uid);
      lastSyncedAt = new Date();
      showToast(`Welcome back, ${user.displayName ? user.displayName.split(' ')[0] : 'student'}! ☁️ Progress synced.`);
    } else {
      if (unsubscribeSnapshot) { unsubscribeSnapshot(); unsubscribeSnapshot = null; }
      lastSyncedAt = null;
      closeProfilePanel();
    }
  });

  // ─────────────────────────────────────────────────────────────
  //  SIGN-IN / SIGN-OUT
  // ─────────────────────────────────────────────────────────────
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    window.fbAuth.signInWithPopup(provider).catch(err => {
      if (err.code !== 'auth/popup-closed-by-user') {
        showToast('Sign-in failed. Please try again.', true);
      }
    });
  }

  function signOut() {
    if (!currentUser) return;
    pushLocalToCloud(currentUser.uid).then(() => {
      window.fbAuth.signOut();
      closeProfilePanel();
      showToast('Signed out. Your progress is safely saved. 👋');
    });
  }

  // ─────────────────────────────────────────────────────────────
  //  REAL-TIME FIRESTORE LISTENER  (onSnapshot)
  //  Keeps data in sync across devices automatically.
  // ─────────────────────────────────────────────────────────────
  function subscribeToRealtimeUpdates(uid) {
    if (unsubscribeSnapshot) unsubscribeSnapshot();

    unsubscribeSnapshot = window.fbDb
      .collection('users')
      .doc(uid)
      .onSnapshot(doc => {
        // Skip writes that originated from THIS tab
        if (doc.metadata.hasPendingWrites) return;
        if (!doc.exists || !doc.data()?.progress) return;

        lastSyncedAt = new Date();
        applyCloudProgress(doc.data().progress);
        refreshProfilePanel(); // re-render stats if panel is open
      }, err => {
        console.warn('[Firestore] onSnapshot error:', err.message);
      });
  }

  // Apply a cloud progress snapshot to localStorage + refresh app UI
  function applyCloudProgress(cloudProgress) {
    LS_KEYS.forEach(key => {
      const cloud = cloudProgress[key];
      if (cloud === undefined) return;

      const local = localStorage.getItem(key);
      try {
        const cloudParsed = typeof cloud === 'string' ? JSON.parse(cloud) : cloud;
        if (local) {
          const localParsed = JSON.parse(local);
          localStorage.setItem(key, JSON.stringify(deepMerge(localParsed, cloudParsed)));
        } else {
          localStorage.setItem(key, JSON.stringify(cloudParsed));
        }
      } catch {
        localStorage.setItem(key, typeof cloud === 'string' ? cloud : JSON.stringify(cloud));
      }
    });

    // Refresh app state from updated localStorage
    if (typeof loadAllProgress === 'function')  loadAllProgress();
    if (typeof loadSmartNotes  === 'function')  loadSmartNotes();
    if (typeof loadStarredMcqs === 'function')  loadStarredMcqs();
    if (typeof renderSidebar   === 'function')  renderSidebar();
    if (typeof refreshCurrentTopic === 'function') refreshCurrentTopic();
    if (typeof updateProgressBar === 'function') updateProgressBar();
  }

  // ─────────────────────────────────────────────────────────────
  //  CLOUD SYNC — Push local state → Firestore
  // ─────────────────────────────────────────────────────────────
  async function pushLocalToCloud(uid) {
    if (syncInProgress) return;
    syncInProgress = true;
    try {
      const snapshot = {};
      LS_KEYS.forEach(key => {
        const val = localStorage.getItem(key);
        if (val) {
          try { snapshot[key] = JSON.parse(val); }
          catch { snapshot[key] = val; }
        }
      });

      await window.fbDb.collection('users').doc(uid).set({
        progress:    snapshot,
        lastSynced:  firebase.firestore.FieldValue.serverTimestamp(),
        displayName: window.fbAuth.currentUser?.displayName || '',
        email:       window.fbAuth.currentUser?.email       || '',
      }, { merge: true });

      lastSyncedAt = new Date();
    } catch (err) {
      console.error('[Firestore] Push failed:', err.message);
    } finally {
      syncInProgress = false;
    }
    // Always refresh profile panel so sync badge updates immediately
    refreshProfilePanel();
  }

  // ─────────────────────────────────────────────────────────────
  //  INITIAL MERGE — Pull Firestore → merge into localStorage
  //  Also handles new-user registration counter.
  // ─────────────────────────────────────────────────────────────
  async function mergeCloudToLocal(uid) {
    try {
      const doc = await window.fbDb.collection('users').doc(uid).get();
      if (!doc.exists || !doc.data()?.progress) {
        // ── Brand new user — increment global student counter ──
        try {
          await window.fbDb.collection('stats').doc('global').set({
            studentCount: firebase.firestore.FieldValue.increment(1),
            lastJoined:   firebase.firestore.FieldValue.serverTimestamp(),
          }, { merge: true });
        } catch (e) { /* non-fatal */ }
        await pushLocalToCloud(uid); // seed Firestore from local
        return;
      }
      applyCloudProgress(doc.data().progress);
      await pushLocalToCloud(uid); // write merged state back to cloud
    } catch (err) {
      console.error('[Firestore] Merge failed:', err.message);
    }
  }

  // ─────────────────────────────────────────────────────────────
  //  DEEP MERGE — union arrays, recursively merge objects
  // ─────────────────────────────────────────────────────────────
  function deepMerge(local, cloud) {
    if (Array.isArray(local) && Array.isArray(cloud)) {
      return [...new Set([...local, ...cloud])];
    }
    if (local && cloud && typeof local === 'object' && typeof cloud === 'object') {
      const result = { ...local };
      Object.keys(cloud).forEach(k => {
        result[k] = k in result ? deepMerge(result[k], cloud[k]) : cloud[k];
      });
      return result;
    }
    return cloud !== undefined ? cloud : local;
  }

  // ─────────────────────────────────────────────────────────────
  //  AUTO SYNC — push every 45 seconds + on page unload
  // ─────────────────────────────────────────────────────────────
  setInterval(() => { if (currentUser) pushLocalToCloud(currentUser.uid); }, 45000);
  window.addEventListener('beforeunload', () => { if (currentUser) pushLocalToCloud(currentUser.uid); });

  // ─────────────────────────────────────────────────────────────
  //  STATS CALCULATION
  // ─────────────────────────────────────────────────────────────
  function safeLS(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); }
    catch { return null; }
  }

  function countMastered(data) {
    if (!data || typeof data !== 'object') return 0;
    return Object.values(data).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
  }

  function getTotalTopics(subject) {
    try {
      switch (subject) {
        case 'iot': {
          const d = window.STUDY_DATA;
          return d ? Object.values(d).reduce((s, a) => s + (Array.isArray(a) ? a.length : 0), 0) : 0;
        }
        case 'cn': {
          const d = window.CN_STUDY_DATA;
          return d ? Object.values(d).reduce((s, a) => s + (Array.isArray(a) ? a.length : 0), 0) : 0;
        }
        case 'linux': {
          return (window.LINUX_NOTES?.length || 0) +
                 (window.LINUX_CHEATSHEET?.length || 0) +
                 (window.LINUX_PRACTICE_TEST_1?.length || 0);
        }
        case 'java': {
          return window.JAVA_DSA_PROBLEMS?.length || 0;
        }
        default: return 0;
      }
    } catch { return 0; }
  }

  function getStats() {
    const iotM   = countMastered(safeLS('es_iot_mastered_topics'));
    const cnM    = countMastered(safeLS('cn_mastered_topics'));
    const linuxM = countMastered(safeLS('linux_mastered_topics'));
    const javaM  = countMastered(safeLS('java_mastered_topics'));
    const totalMastered = iotM + cnM + linuxM + javaM;

    const iotTotal   = getTotalTopics('iot');
    const cnTotal    = getTotalTopics('cn');
    const linuxTotal = getTotalTopics('linux');
    const javaTotal  = getTotalTopics('java');
    const grandTotal = iotTotal + cnTotal + linuxTotal + javaTotal;

    const notes   = (safeLS('prep_smart_notes') || []).length;
    const starredData = safeLS('prep_starred_mcqs') || {};
    const starred = Object.values(starredData).reduce((s, a) => s + (Array.isArray(a) ? a.length : 0), 0);

    const javaProgress = safeLS('java_dsa_progress') || {};
    const codeSolved = Object.values(javaProgress).filter(v =>
      v === 'solved' || v?.status === 'solved' || (typeof v === 'object' && v?.userCode)
    ).length;

    const overallPct = grandTotal > 0 ? Math.round((totalMastered / grandTotal) * 100) : 0;

    return {
      totalMastered, grandTotal, overallPct,
      subjects: [
        { label: 'ES & IoT',          color: '#E07A5F', mastered: iotM,   total: iotTotal,   pct: iotTotal   > 0 ? Math.round(iotM   / iotTotal   * 100) : 0 },
        { label: 'Computer Networks', color: '#5F7AE0', mastered: cnM,    total: cnTotal,    pct: cnTotal    > 0 ? Math.round(cnM    / cnTotal    * 100) : 0 },
        { label: 'Linux',             color: '#3A8F65', mastered: linuxM, total: linuxTotal, pct: linuxTotal > 0 ? Math.round(linuxM / linuxTotal * 100) : 0 },
        { label: 'Java DSA',          color: '#81B29A', mastered: javaM,  total: javaTotal,  pct: javaTotal  > 0 ? Math.round(javaM  / javaTotal  * 100) : 0 },
      ],
      notes, starred, codeSolved,
    };
  }

  // ─────────────────────────────────────────────────────────────
  //  PROFILE PANEL
  // ─────────────────────────────────────────────────────────────
  function ensureProfileDOM() {
    if (document.getElementById('profile-panel')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'profile-backdrop';
    backdrop.className = 'profile-backdrop';
    backdrop.addEventListener('click', closeProfilePanel);

    const panel = document.createElement('div');
    panel.id = 'profile-panel';
    panel.className = 'profile-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Profile & Progress');

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
  }

  function openProfilePanel() {
    ensureProfileDOM();
    renderProfileContent();

    // Use rAF so the element is in the DOM before the transition fires
    requestAnimationFrame(() => {
      document.getElementById('profile-backdrop')?.classList.add('open');
      document.getElementById('profile-panel')?.classList.add('open');
    });

    hideUserDropdown();
  }

  function closeProfilePanel() {
    document.getElementById('profile-backdrop')?.classList.remove('open');
    document.getElementById('profile-panel')?.classList.remove('open');
  }

  // Refresh panel in-place if it is currently open
  function refreshProfilePanel() {
    const panel = document.getElementById('profile-panel');
    if (panel && panel.classList.contains('open')) renderProfileContent();
  }

  function getTimeAgo(date) {
    const secs = Math.floor((Date.now() - date.getTime()) / 1000);
    if (secs < 10)  return 'just now';
    if (secs < 60)  return `${secs}s ago`;
    const mins = Math.floor(secs / 60);
    if (mins < 60)  return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  }

  function renderProfileContent() {
    const panel = document.getElementById('profile-panel');
    if (!panel || !currentUser) return;

    const user      = currentUser;
    const stats     = getStats();
    const avatarUrl = user.photoURL || '';
    const name      = user.displayName || 'Student';
    const initials  = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const syncAgo   = lastSyncedAt ? getTimeAgo(lastSyncedAt) : 'not synced yet';

    panel.innerHTML = `
      <div class="profile-panel-inner">

        <!-- ── Header ── -->
        <div class="profile-panel-header">
          <h2 class="profile-panel-title">My Profile</h2>
          <button class="profile-close-btn" id="profile-close-btn" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- ── Identity ── -->
        <div class="profile-identity">
          ${avatarUrl
            ? `<img class="profile-big-avatar" src="${avatarUrl}" alt="${name}" referrerpolicy="no-referrer">`
            : `<div class="profile-big-avatar profile-big-initials">${initials}</div>`
          }
          <div class="profile-identity-info">
            <h3 class="profile-name">${name}</h3>
            <p class="profile-email">${user.email || ''}</p>
            <div class="profile-sync-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>
              Synced ${syncAgo}
            </div>
          </div>
        </div>

        <!-- ── Overall Progress ── -->
        <div class="profile-section">
          <div class="profile-section-label">OVERALL PROGRESS</div>
          <div class="profile-overall">
            <div class="profile-overall-top">
              <span class="profile-overall-count">${stats.totalMastered}
                <span class="profile-overall-denom">${stats.grandTotal > 0 ? `/ ${stats.grandTotal}` : ''}</span>
              </span>
              <span class="profile-overall-pct">${stats.overallPct}%</span>
            </div>
            <div class="profile-big-bar">
              <div class="profile-big-bar-fill" style="width: ${stats.overallPct}%"></div>
            </div>
            <p class="profile-overall-label">topics mastered across all subjects</p>
          </div>
        </div>

        <!-- ── Subject Breakdown ── -->
        <div class="profile-section">
          <div class="profile-section-label">BY SUBJECT</div>
          <div class="profile-subjects">
            ${stats.subjects.map(s => `
              <div class="profile-subject-row">
                <div class="profile-subject-dot" style="background: ${s.color};"></div>
                <div class="profile-subject-body">
                  <div class="profile-subject-meta">
                    <span class="profile-subject-name">${s.label}</span>
                    <span class="profile-subject-count" style="color: ${s.color};">${s.mastered}${s.total > 0 ? ` / ${s.total}` : ''}</span>
                  </div>
                  <div class="profile-subject-bar">
                    <div class="profile-subject-bar-fill" style="width: ${s.pct}%; background: ${s.color};"></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ── Stats Grid ── -->
        <div class="profile-section">
          <div class="profile-section-label">STATISTICS</div>
          <div class="profile-stats-grid">
            <div class="profile-stat-card">
              <div class="profile-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E07A5F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <div class="profile-stat-value">${stats.totalMastered}</div>
              <div class="profile-stat-label">Topics Mastered</div>
            </div>
            <div class="profile-stat-card">
              <div class="profile-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#81B29A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </div>
              <div class="profile-stat-value">${stats.notes}</div>
              <div class="profile-stat-label">Smart Notes</div>
            </div>
            <div class="profile-stat-card">
              <div class="profile-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B58A3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <div class="profile-stat-value">${stats.starred}</div>
              <div class="profile-stat-label">Starred MCQs</div>
            </div>
            <div class="profile-stat-card">
              <div class="profile-stat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F7AE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <div class="profile-stat-value">${stats.codeSolved}</div>
              <div class="profile-stat-label">Code Solved</div>
            </div>
          </div>
        </div>

        <!-- ── Actions ── -->
        <div class="profile-actions">
          <button class="profile-sync-btn" id="profile-sync-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            Sync Now
          </button>
          <button class="profile-signout-btn" id="profile-signout-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </div>

      </div>
    `;

    // Wire up panel buttons
    document.getElementById('profile-close-btn')?.addEventListener('click', closeProfilePanel);

    document.getElementById('profile-sync-btn')?.addEventListener('click', async () => {
      const btn = document.getElementById('profile-sync-btn');
      if (btn) { btn.disabled = true; btn.innerHTML = '⏳ Syncing…'; }
      await pushLocalToCloud(currentUser.uid);
      renderProfileContent();
      showToast('✅ Progress synced!');
    });

    document.getElementById('profile-signout-btn')?.addEventListener('click', signOut);
  }

  // ─────────────────────────────────────────────────────────────
  //  AUTH UI — sign-in button  OR  user chip + dropdown
  // ─────────────────────────────────────────────────────────────
  function renderAuthUI(user) {
    const container = document.getElementById('auth-container');
    if (!container) return;

    if (!user) {
      container.innerHTML = `
        <button id="auth-signin-btn" class="auth-signin-btn" aria-label="Sign in with Google">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
      `;
      document.getElementById('auth-signin-btn').addEventListener('click', signInWithGoogle);
      return;
    }

    // ── Signed in ──
    const avatarUrl = user.photoURL || '';
    const name      = user.displayName || 'Student';
    const initials  = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    container.innerHTML = `
      <div class="auth-user-chip" id="auth-user-chip" tabindex="0" aria-label="User menu" role="button">
        ${avatarUrl
          ? `<img class="auth-avatar" src="${avatarUrl}" alt="${name}" referrerpolicy="no-referrer">`
          : `<div class="auth-avatar auth-avatar-initials">${initials}</div>`
        }
        <span class="auth-user-name">${name.split(' ')[0]}</span>
        <svg class="auth-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <div class="auth-dropdown" id="auth-dropdown" role="menu" aria-hidden="true">
        <div class="auth-dropdown-header">
          ${avatarUrl
            ? `<img class="auth-dropdown-avatar" src="${avatarUrl}" alt="${name}" referrerpolicy="no-referrer">`
            : `<div class="auth-dropdown-avatar auth-avatar-initials" style="font-size:1.1rem;">${initials}</div>`
          }
          <div class="auth-dropdown-info">
            <strong>${name}</strong>
            <span>${user.email || ''}</span>
          </div>
        </div>
        <div class="auth-dropdown-divider"></div>

        <button class="auth-dropdown-item" id="auth-profile-btn" role="menuitem">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
          </svg>
          View Profile & Progress
        </button>

        <button class="auth-dropdown-item" id="auth-sync-btn" role="menuitem">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
          </svg>
          Sync Progress Now
        </button>

        <button class="auth-dropdown-item auth-signout-item" id="auth-signout-btn" role="menuitem">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign Out
        </button>
      </div>
    `;

    const chip     = document.getElementById('auth-user-chip');
    const dropdown = document.getElementById('auth-dropdown');

    chip.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      hideUserDropdown();
      if (!isOpen) {
        dropdown.classList.add('open');
        dropdown.setAttribute('aria-hidden', 'false');
        chip.querySelector('.auth-chevron').style.transform = 'rotate(180deg)';
      }
    });
    chip.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chip.click(); }
    });

    document.getElementById('auth-profile-btn').addEventListener('click', () => {
      hideUserDropdown();
      openProfilePanel();
    });

    document.getElementById('auth-sync-btn').addEventListener('click', async () => {
      hideUserDropdown();
      showToast('Syncing progress to cloud…');
      await pushLocalToCloud(currentUser.uid);
      showToast('✅ Progress synced successfully!');
    });

    document.getElementById('auth-signout-btn').addEventListener('click', signOut);
  }

  function hideUserDropdown() {
    const dropdown = document.getElementById('auth-dropdown');
    const chevron  = document.querySelector('#auth-user-chip .auth-chevron');
    if (dropdown) { dropdown.classList.remove('open'); dropdown.setAttribute('aria-hidden', 'true'); }
    if (chevron)  chevron.style.transform = '';
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', e => {
    const chip     = document.getElementById('auth-user-chip');
    const dropdown = document.getElementById('auth-dropdown');
    if (chip && dropdown && !chip.contains(e.target) && !dropdown.contains(e.target)) {
      hideUserDropdown();
    }
  });

  // Close profile panel and dropdown on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { hideUserDropdown(); closeProfilePanel(); }
  });

  // ─────────────────────────────────────────────────────────────
  //  TOAST NOTIFICATION
  // ─────────────────────────────────────────────────────────────
  let toastTimeout;
  function showToast(message, isError = false) {
    let toast = document.getElementById('auth-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'auth-toast';
      document.body.appendChild(toast);
    }
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.className = 'auth-toast' + (isError ? ' auth-toast-error' : '');
    toast.classList.add('visible');
    toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3500);
  }

  // ─────────────────────────────────────────────────────────────
  //  GLOBAL EXPORTS
  // ─────────────────────────────────────────────────────────────
  window.triggerCloudSync = function () {
    if (currentUser) pushLocalToCloud(currentUser.uid);
  };

  window.openProfilePanel = openProfilePanel;

})();
