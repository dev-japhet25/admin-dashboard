// firebase.config.js
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Default Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

// Secondary Firebase config
const secondaryConfig = {
  apiKey: "AIzaSyCqVXsM0EJzaU4JwXaziIL018JAUXr46ek",
  authDomain: "asoriba-android-f7975.firebaseapp.com",
  databaseURL: "https://asoriba-android-f7975.firebaseio.com",
  projectId: "asoriba-android-f7975",
  storageBucket: "asoriba-android-f7975.appspot.com",
  messagingSenderId: "910739823840",
  appId: "1:910739823840:web:640410c7a1986f9bf6c485",
  measurementId: "G-XLDRSV3ZLS"
};

// Initialize the default Firebase app
const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Ensure the secondary Firebase app is initialized properly
const secondaryFirebaseApp =
  getApps().find((app) => app.name === "secondaryApp") || initializeApp(secondaryConfig, "secondaryApp");

// Get authentication from the default Firebase app
const auth = getAuth(firebaseApp);

// Get Firestore from the secondary Firebase app
const db = getFirestore(secondaryFirebaseApp);

console.log("Firebase Instance 1:", db);

export { auth, db };