import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

let auth;
try {
  const firebase = require("../firebase");
  auth = firebase.auth;
} catch (error) {
  console.warn("Firebase not configured properly:", error.message);
}

// Register new user
export const registerUser = async (email, password, displayName) => {
  try {
    if (!auth) {
      return { success: false, error: "Firebase Authentication is not properly configured. Please enable Authentication in your Firebase Console." };
    }
    
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
    if (!auth) {
      return { success: false, error: "Firebase Authentication is not properly configured. Please enable Authentication in your Firebase Console." };
    }
    
    console.log('🔥 Attempting login with email:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ Login successful for:', userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('❌ Login error:', error.code, error.message);
    
    // Handle specific Firebase Auth errors
    let errorMessage = error.message;
    if (error.code === 'auth/user-not-found') {
      errorMessage = "No account found with this email. Please register first or check your email address.";
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = "Incorrect password. Please check your password and try again.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Please enter a valid email address.";
    } else if (error.code === 'auth/invalid-credential') {
      errorMessage = "Invalid email or password. Please check your credentials and try again.";
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = "This account has been disabled. Please contact support.";
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = "Too many failed login attempts. Please try again later.";
    } else if (error.code === 'auth/configuration-not-found') {
      errorMessage = "Firebase Authentication is not properly configured. Please enable Authentication in your Firebase Console.";
    }
    
    return { success: false, error: errorMessage };
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
