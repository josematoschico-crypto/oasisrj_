/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDcqQnmZk355fbu4mmfJ1CIjYzST3hsYoY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "oasis-rj-bd13f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "oasis-rj-bd13f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "oasis-rj-bd13f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "740021986934",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:740021986934:web:43425f92a66fa14f922157",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5V8C8048HP"
};

// Check if API key is present and looks valid (not undefined or empty string)
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined' && firebaseConfig.apiKey !== '';

let app = null;
let db: any = null;
let auth: any = null;
let googleProvider: any = null;
let analytics: any = null;

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    // Use initializeFirestore with experimentalForceLongPolling for better compatibility in sandboxed environments
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      experimentalAutoDetectLongPolling: false,
      ignoreUndefinedProperties: true,
    });
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase configuration is missing or invalid. App will run in offline/demo mode.");
}

export { db, auth, googleProvider, analytics };
