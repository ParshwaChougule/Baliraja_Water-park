import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [error, setError] = useState(null);

  // Handle auth state changes
  const handleAuthStateChanged = useCallback((user) => {
    console.log('🔥 Auth state changed:', user ? user.email : 'No user');
    setCurrentUser(user);
    setLoading(false);
    setError(null);
  }, []);

  // Initialize auth state listener
  useEffect(() => {
    console.log('🔐 Initializing auth state listener...');
    let unsubscribe;
    
    try {
      unsubscribe = onAuthStateChange((user) => {
        handleAuthStateChanged(user);
      });
    } catch (error) {
      console.error('❌ Auth state listener error:', error);
      setError({
        code: 'auth/initialization-error',
        message: 'Failed to initialize authentication. Please refresh the page.'
      });
      setLoading(false);
    }
    
    return () => {
      if (unsubscribe) {
        console.log('🔒 Cleaning up auth listener');
        unsubscribe();
      }
    };
  }, [handleAuthStateChanged]);

  // Register function without automatic login
  const register = async (email, password, displayName) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await registerUser(email, password, displayName);
      
      if (result.success) {
        console.log('✅ Registration successful');
        // Logout the user after registration so they need to login manually
        await logoutUser();
      } else {
        setError({
          code: result.code || 'auth/registration-failed',
          message: result.error || 'Registration failed. Please try again.'
        });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Registration error:', error);
      setError({
        code: error.code || 'auth/registration-error',
        message: error.message || 'An error occurred during registration.'
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await loginUser(email, password);
      
      if (!result.success) {
        setError({
          code: result.code || 'auth/login-failed',
          message: result.error || 'Login failed. Please check your credentials.'
        });
      } else {
        console.log('✅ Login successful');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Login error:', error);
      setError({
        code: error.code || 'auth/login-error',
        message: error.message || 'An error occurred during login.'
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await logoutUser();
      
      if (result.success) {
        console.log('✅ Logout successful');
        setCurrentUser(null);
      } else {
        setError({
          code: 'auth/logout-failed',
          message: result.error || 'Failed to log out. Please try again.'
        });
      }
      
      return result;
    } catch (error) {
      console.error('❌ Logout error:', error);
      setError({
        code: 'auth/logout-error',
        message: 'An error occurred while logging out.'
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Initializing authentication...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
