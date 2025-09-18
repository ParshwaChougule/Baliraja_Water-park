import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

// Import auth directly from firebase config
import { auth } from '../firebase';

// Debug auth service initialization
console.log('🔐 Auth Service Initialized');
console.log('Auth instance:', auth);

if (!auth) {
  console.error('❌ Firebase Auth not properly initialized');
}

// Register new user
export const registerUser = async (email, password, displayName) => {
  try {
    if (!auth) {
      const error = new Error("Firebase Auth not initialized");
      console.error('Auth not available:', error);
      return { 
        success: false, 
        error: "Authentication service is currently unavailable. Please try again later." 
      };
    }
    
    console.log('Attempting to register user:', email);
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    await updateProfile(user, {
      displayName: displayName
    });
    
    return { success: true, user };
  } catch (error) {
    // Handle specific Firebase Auth errors
    let errorMessage = error.message;
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "This email is already registered. Please use a different email or try logging in.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Password is too weak. Please use at least 6 characters.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Please enter a valid email address.";
    } else if (error.code === 'auth/configuration-not-found') {
      errorMessage = "Firebase Authentication is not properly configured. Please enable Authentication in your Firebase Console.";
    }
    
    return { success: false, error: errorMessage };
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    console.log('🔐 Starting login process for:', email);
    
    if (!auth) {
      const error = new Error('Firebase Auth not initialized');
      console.error('❌ Auth service not available during login');
      console.error('Auth instance:', auth);
      console.trace('Auth initialization trace');
      return { 
        success: false, 
        error: "Authentication service is currently unavailable. Please try again later.",
        code: 'auth/not-initialized'
      };
    }
    
    console.log('🔑 Attempting Firebase sign in...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (!userCredential || !userCredential.user) {
      console.error('❌ Invalid user credential received');
      return { 
        success: false, 
        error: 'Invalid response from authentication service',
        code: 'auth/invalid-credential'
      };
    }
    
    console.log('✅ Login successful for:', userCredential.user.email);
    console.log('🔑 User UID:', userCredential.user.uid);
    
    // Force token refresh to ensure valid session
    try {
      await userCredential.user.getIdToken(true);
      console.log('🔄 Token refresh successful');
    } catch (tokenError) {
      console.warn('⚠️ Token refresh warning:', tokenError.message);
      // Continue even if token refresh fails, as the user is still authenticated
    }
    
    return { 
      success: true, 
      user: userCredential.user,
      token: await userCredential.user.getIdToken()
    };
    
  } catch (error) {
    console.error('❌ Login error:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    
    // Handle specific Firebase Auth errors
    let errorMessage = 'Authentication failed. Please try again.';
    let errorCode = error.code || 'auth/unknown-error';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = "No account found with this email. Please register first.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password. Please check your password and try again.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Please enter a valid email address.";
        break;
      case 'auth/user-disabled':
        errorMessage = "This account has been disabled. Please contact support.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many failed login attempts. Please try again later.";
        break;
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your internet connection and try again.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage = "Email/password authentication is not enabled. Please contact support.";
        break;
      default:
        // Check if this is a Firebase Auth error
        if (error.code && error.code.startsWith('auth/')) {
          errorMessage = `Authentication error: ${error.message}`;
        }
    }
    
    return { 
      success: false, 
      error: errorMessage,
      code: errorCode
    };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase authentication not configured. Please set up your Firebase project." };
    }
    
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Monitor auth state changes
export const onAuthStateChange = (callback) => {
  if (!auth) {
    console.warn("Firebase auth not configured, skipping auth state monitoring");
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
