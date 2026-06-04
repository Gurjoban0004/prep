// ============================================================
//  FIREBASE CONFIGURATION — prep Study Hub
//  Project: prep-study-7ca60
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyASX3MhDtN9nbcwE9swb5M9XQexxD8OTiM",
  authDomain: "prep-study-7ca60.firebaseapp.com",
  projectId: "prep-study-7ca60",
  storageBucket: "prep-study-7ca60.firebasestorage.app",
  messagingSenderId: "130553851246",
  appId: "1:130553851246:web:efd880b141eb24816f657f"
};

// Initialize Firebase (using compat SDK — no bundler needed)
firebase.initializeApp(firebaseConfig);

// Expose globally so firebase-auth.js and app.js can use them
window.fbAuth = firebase.auth();
window.fbDb  = firebase.firestore();

// Enable offline persistence (Firestore caches data locally)
window.fbDb.enablePersistence({ synchronizeTabs: true }).catch(err => {
  if (err.code === 'failed-precondition') {
    console.warn('[Firestore] Persistence unavailable — multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.warn('[Firestore] Persistence not supported in this browser');
  }
});
