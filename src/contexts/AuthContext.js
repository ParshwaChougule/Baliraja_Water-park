import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange, loginUser, registerUser, logoutUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Firebase is properly configured
    try {
      const unsubscribe = onAuthStateChange((user) => {
        console.log('🔥 Auth state changed:', user ? user.email : 'No user');
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      console.warn('Firebase not configured properly:', error.message);
      setLoading(false);
      return () => {};
    }
  }, []);

  // Register function without automatic login
  const register = async (email, password, displayName) => {
    const result = await registerUser(email, password, displayName);
    if (result.success) {
      console.log('✅ Registration successful');
      // Logout the user after registration so they need to login manually
      await logoutUser();
    }
    return result;
  };

  // Login function
  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      console.log('✅ Login successful');
    }
    return result;
  };

  // Logout function
  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      console.log('✅ Logout successful');
    }
    return result;
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
