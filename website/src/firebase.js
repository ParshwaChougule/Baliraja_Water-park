// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

// Environment configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const USE_EMULATOR = process.env.REACT_APP_USE_FIREBASE_EMULATOR === 'true';
const EMULATOR_HOST = process.env.REACT_APP_FIREBASE_EMULATOR_HOST || 'localhost';

// Suppress Firebase console warnings and errors in production
if (process.env.NODE_ENV === 'production') {
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  console.warn = (...args) => {
    const message = args.join(' ');
    if (message.includes('@firebase/') || 
        message.includes('WebChannelConnection') ||
        message.includes('transport errored')) {
      return; // Suppress Firebase connection warnings
    }
    originalConsoleWarn.apply(console, args);
  };

  console.error = (...args) => {
    const message = args.join(' ');
    if (message.includes('@firebase/') || 
        message.includes('WebChannelConnection') ||
        message.includes('transport errored')) {
      return; // Suppress Firebase connection errors
    }
    originalConsoleError.apply(console, args);
  };
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQbOH7NM8kvqQIsFNemEzcjO8agVyUOJY",
  authDomain: "water-park-731dd.firebaseapp.com",
  databaseURL: "https://water-park-731dd-default-rtdb.firebaseio.com",
  projectId: "water-park-731dd",
  storageBucket: "water-park-731dd.appspot.com",
  messagingSenderId: "241062579317",
  appId: "1:241062579317:web:508f029f363fd52df1fc3c",
  measurementId: "G-QQ7NJRJG7R"
};

// Initialize Firebase
let app;
let auth = null;
let db = null;
let storage = null;
let realtimeDb = null;
let isOfflineMode = false;

console.log('🔧 Initializing Firebase with config:', JSON.stringify({
  ...firebaseConfig,
  apiKey: '***' // Don't log the full API key
}, null, 2));

try {
  // Initialize Firebase
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  
  console.log('🔧 Initializing Firebase services...');
  
  // Initialize services with error handling for each
  try {
    auth = getAuth(app);
    console.log('✅ Auth service initialized');
  } catch (authError) {
    console.error('❌ Failed to initialize Auth service:', authError);
    throw authError;
  }
  
  try {
    db = getFirestore(app);
    console.log('✅ Firestore service initialized');
  } catch (firestoreError) {
    console.error('❌ Failed to initialize Firestore:', firestoreError);
  }
  
  try {
    storage = getStorage(app);
    console.log('✅ Storage service initialized');
  } catch (storageError) {
    console.error('❌ Failed to initialize Storage:', storageError);
  }
  
  try {
    realtimeDb = getDatabase(app);
    console.log('✅ Realtime Database service initialized');
  } catch (dbError) {
    console.error('❌ Failed to initialize Realtime Database:', dbError);
  }

  // Configure emulators if enabled
  if (isDevelopment && USE_EMULATOR) {
    try {
      console.log('🔌 Initializing Firebase emulators...');
      
      // Auth emulator
      if (auth) {
        connectAuthEmulator(auth, `http://${EMULATOR_HOST}:9099`, { disableWarnings: true });
        console.log('✅ Auth emulator connected');
      }
      
      // Firestore emulator
      if (db) {
        connectFirestoreEmulator(db, EMULATOR_HOST, 8080);
        console.log('✅ Firestore emulator connected');
      }
      
      // Storage emulator
      if (storage) {
        connectStorageEmulator(storage, EMULATOR_HOST, 9199);
        console.log('✅ Storage emulator connected');
      }
      
      // Realtime Database emulator
      if (realtimeDb) {
        connectDatabaseEmulator(realtimeDb, EMULATOR_HOST, 9000);
        console.log('✅ Realtime Database emulator connected');
      }
      
      console.log('🎮 All Firebase emulators connected successfully');
    } catch (emulatorError) {
      console.warn('⚠️ Failed to connect to some emulators:', emulatorError);
      console.log('📌 Make sure Firebase emulators are running with: firebase emulators:start');
    }
  } else if (isDevelopment) {
    console.log('ℹ️ Firebase emulators disabled. Set REACT_APP_USE_FIREBASE_EMULATOR=true to enable.');
  }
  
  console.log('🔥 Firebase initialized successfully');
  console.log('✅ Auth:', !!auth);
  console.log('✅ Firestore:', !!db);
  console.log('✅ Storage:', !!storage);
  console.log('✅ Realtime DB:', !!realtimeDb);
  console.log('📦 Storage Bucket:', firebaseConfig.storageBucket);
  
  isOfflineMode = false;
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  console.error('Config used:', JSON.stringify(firebaseConfig, null, 2));
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
