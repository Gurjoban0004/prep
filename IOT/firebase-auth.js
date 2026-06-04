// ============================================================
//  FIREBASE AUTH + FIRESTORE SYNC — prep Study Hub
//  Handles: Google Sign-In, auth state UI, cloud ↔ localStorage sync
// ============================================================

(function () {
  'use strict';

  // ── Auth State ───────────────────────────────────────────────
  let currentUser = null;   // Firebase user object or null
  let syncInProgress = false;

  // ── All localStorage keys we sync ───────────────────────────
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

  // ──────────────────────────────────────────────────────────────
  //  AUTH STATE LISTENER — runs on every page load
  // ──────────────────────────────────────────────────────────────
  window.fbAuth.onAuthStateChanged(async user => {
    currentUser = user;
    renderAuthUI(user);

    if (user) {
      // User just signed in → pull cloud data and merge with local
      await mergeCloudToLocal(user.uid);
      showToast(`Welcome back, ${user.displayName ? user.displayName.split(' ')[0] : 'student'}! ☁️ Progress synced.`);
    }
  });

  // ──────────────────────────────────────────────────────────────
  //  SIGN-IN WITH GOOGLE
  // ──────────────────────────────────────────────────────────────
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    window.fbAuth.signInWithPopup(provider).catch(err => {
      console.error('[Auth] Sign-in error:', err.message);
      if (err.code !== 'auth/popup-closed-by-user') {
        showToast('Sign-in failed. Please try again.', true);
      }
    });
  }

  // ──────────────────────────────────────────────────────────────
  //  SIGN OUT
  // ──────────────────────────────────────────────────────────────
  function signOut() {
    // Push latest local state to cloud before signing out
    if (currentUser) {
      pushLocalToCloud(currentUser.uid).then(() => {
        window.fbAuth.signOut();
        showToast('Signed out. Your progress is safely saved in the cloud.');
        hideUserDropdown();
      });
    }
  }

  // ──────────────────────────────────────────────────────────────
  //  CLOUD SYNC — Push local state → Firestore
  // ──────────────────────────────────────────────────────────────
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
        progress: snapshot,
        lastSynced: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: window.fbAuth.currentUser?.displayName || '',
        email: window.fbAuth.currentUser?.email || ''
      }, { merge: true });

    } catch (err) {
      console.error('[Firestore] Push failed:', err.message);
    } finally {
      syncInProgress = false;
    }
  }

  // ──────────────────────────────────────────────────────────────
  //  CLOUD SYNC — Pull Firestore → merge into localStorage
  // ──────────────────────────────────────────────────────────────
  async function mergeCloudToLocal(uid) {
    try {
      const doc = await window.fbDb.collection('users').doc(uid).get();
      if (!doc.exists || !doc.data().progress) {
        // No cloud data yet — push local state up
        await pushLocalToCloud(uid);
        return;
      }

      const cloudProgress = doc.data().progress;

      LS_KEYS.forEach(key => {
        const local = localStorage.getItem(key);
        const cloud = cloudProgress[key];

        if (!local && cloud !== undefined) {
          // Nothing local — use cloud
          localStorage.setItem(key, typeof cloud === 'string' ? cloud : JSON.stringify(cloud));
        } else if (local && cloud !== undefined) {
          // Both exist → deep merge (union arrays, merge objects)
          try {
            const localParsed = JSON.parse(local);
            const cloudParsed = typeof cloud === 'string' ? JSON.parse(cloud) : cloud;
            const merged = deepMerge(localParsed, cloudParsed);
            localStorage.setItem(key, JSON.stringify(merged));
          } catch {
            // Keep local on parse error
          }
        }
      });

      // Write the merged result back to cloud
      await pushLocalToCloud(uid);

      // Reload app state from freshly merged localStorage
      if (typeof loadAllProgress === 'function') loadAllProgress();
      if (typeof loadSmartNotes === 'function') loadSmartNotes();
      if (typeof loadStarredMcqs === 'function') loadStarredMcqs();
      if (typeof renderSidebar === 'function') renderSidebar();
      if (typeof updateProgressBar === 'function') updateProgressBar();

    } catch (err) {
      console.error('[Firestore] Merge failed:', err.message);
    }
  }

  // ──────────────────────────────────────────────────────────────
  //  DEEP MERGE HELPER — union arrays, recursively merge objects
  // ──────────────────────────────────────────────────────────────
  function deepMerge(local, cloud) {
    if (Array.isArray(local) && Array.isArray(cloud)) {
      // Union: unique values from both
      return [...new Set([...local, ...cloud])];
    }
    if (local && cloud && typeof local === 'object' && typeof cloud === 'object') {
      const result = { ...local };
      Object.keys(cloud).forEach(key => {
        if (key in result) {
          result[key] = deepMerge(result[key], cloud[key]);
        } else {
          result[key] = cloud[key];
        }
      });
      return result;
    }
    // Primitive: prefer cloud (most recent)
    return cloud !== undefined ? cloud : local;
  }

  // ──────────────────────────────────────────────────────────────
  //  AUTO SYNC — push local changes to cloud every 30 seconds
  //  (only when signed in)
  // ──────────────────────────────────────────────────────────────
  setInterval(() => {
    if (currentUser) {
      pushLocalToCloud(currentUser.uid);
    }
  }, 30000);

  // Also push on page unload (best-effort)
  window.addEventListener('beforeunload', () => {
    if (currentUser) {
      // Use sendBeacon for reliable delivery — fallback to sync push
      pushLocalToCloud(currentUser.uid);
    }
  });

  // ──────────────────────────────────────────────────────────────
  //  AUTH UI — Renders sign-in button OR user avatar dropdown
  // ──────────────────────────────────────────────────────────────
  function renderAuthUI(user) {
    const container = document.getElementById('auth-container');
    if (!container) return;

    if (!user) {
      // Not signed in → show sign-in button
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
    } else {
      // Signed in → show avatar with dropdown
      const avatarUrl  = user.photoURL || '';
      const name       = user.displayName || 'Student';
      const initials   = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

      container.innerHTML = `
        <div class="auth-user-chip" id="auth-user-chip" tabindex="0" aria-label="User menu" role="button">
          ${avatarUrl
            ? `<img class="auth-avatar" src="${avatarUrl}" alt="${name}" referrerpolicy="no-referrer">`
            : `<div class="auth-avatar auth-avatar-initials">${initials}</div>`
          }
          <span class="auth-user-name">${name.split(' ')[0]}</span>
          <svg class="auth-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
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
          <button class="auth-dropdown-item" id="auth-sync-btn" role="menuitem">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
            Sync Progress Now
          </button>
          <button class="auth-dropdown-item auth-signout-item" id="auth-signout-btn" role="menuitem">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Sign Out
          </button>
        </div>
      `;

      // Chip click → toggle dropdown
      const chip     = document.getElementById('auth-user-chip');
      const dropdown = document.getElementById('auth-dropdown');

      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
          dropdown.classList.add('open');
          dropdown.setAttribute('aria-hidden', 'false');
        }
      });

      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          chip.click();
        }
      });

      document.getElementById('auth-sync-btn').addEventListener('click', async () => {
        hideUserDropdown();
        showToast('Syncing progress to cloud…');
        await pushLocalToCloud(currentUser.uid);
        showToast('✅ Progress synced successfully!');
      });

      document.getElementById('auth-signout-btn').addEventListener('click', signOut);
    }
  }

  function hideUserDropdown() {
    const dropdown = document.getElementById('auth-dropdown');
    if (dropdown) {
      dropdown.classList.remove('open');
      dropdown.setAttribute('aria-hidden', 'true');
    }
  }

  function closeAllDropdowns() {
    hideUserDropdown();
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const chip = document.getElementById('auth-user-chip');
    const dropdown = document.getElementById('auth-dropdown');
    if (chip && dropdown && !chip.contains(e.target) && !dropdown.contains(e.target)) {
      hideUserDropdown();
    }
  });

  // ──────────────────────────────────────────────────────────────
  //  TOAST NOTIFICATION
  // ──────────────────────────────────────────────────────────────
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

    toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3500);
  }

  // ──────────────────────────────────────────────────────────────
  //  EXPOSE sync function for app.js to call after saves
  // ──────────────────────────────────────────────────────────────
  window.triggerCloudSync = function () {
    if (currentUser) {
      pushLocalToCloud(currentUser.uid);
    }
  };

})();
