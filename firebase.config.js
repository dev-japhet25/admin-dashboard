// firebase.config.js
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Default Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Secondary Firebase config
const secondaryConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_SECONDARY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_SECONDARY,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL_SECONDARY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_SECONDARY,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_SECONDARY,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_SECONDARY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_SECONDARY,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_SECONDARY,
};

// Initialize the default Firebase app
const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Ensure the secondary Firebase app is initialized properly
const secondaryFirebaseApp =
  getApps().find((app) => app.name === "secondaryApp") ||
  initializeApp(secondaryConfig, "secondaryApp");

// Get authentication from the default Firebase app
const auth = getAuth(firebaseApp);

// Get Firestore from the secondary Firebase app
const db = getFirestore(secondaryFirebaseApp);

console.log("Firebase Instance 1:", db);

export { auth, db };
