// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Suppress Firebase console warnings and errors
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = (...args) => {
  const message = args.join(' ');
  if (message.includes('@firebase/firestore') || 
      message.includes('WebChannelConnection') ||
      message.includes('transport errored')) {
    return; // Suppress Firebase connection warnings
  }
  originalConsoleWarn.apply(console, args);
};

console.error = (...args) => {
  const message = args.join(' ');
  if (message.includes('@firebase/firestore') || 
      message.includes('WebChannelConnection') ||
      message.includes('transport errored')) {
    return; // Suppress Firebase connection errors
  }
  originalConsoleError.apply(console, args);
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQbOH7NM8kvqQIsFNemEzcjO8agVyUOJY",
  authDomain: "water-park-731dd.firebaseapp.com",
  databaseURL: "https://water-park-731dd-default-rtdb.firebaseio.com",
  projectId: "water-park-731dd",
  storageBucket: "water-park-731dd.firebasestorage.app",
  messagingSenderId: "241062579317",
  appId: "1:241062579317:web:508f029f363fd52df1fc3c",
  measurementId: "G-QQ7NJRJG7R"
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;
let realtimeDb;
let isOfflineMode = false;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  realtimeDb = getDatabase(app);

  console.log('Firebase initialized successfully');
  isOfflineMode = false;
} catch (error) {
  console.error('Firebase initialization error:', error);
  isOfflineMode = true;
  auth = null;
  db = null;
  storage = null;
  realtimeDb = null;
}

// Export offline mode status
export const getOfflineMode = () => isOfflineMode;

export { auth, db, storage, realtimeDb };
export default app;
