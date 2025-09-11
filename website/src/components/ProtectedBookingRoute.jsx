import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner, Container, Alert } from 'react-bootstrap';

const ProtectedBookingRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Checking authentication...</p>
        </div>
      </Container>
    );
  }
  
  // If user is not logged in, redirect to login page
  if (!currentUser) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <h4>Login Required</h4>
          <p>You need to login to access the booking page.</p>
          <Navigate to="/login" replace />
        </Alert>
      </Container>
    );
  }
  
  // If user is logged in, show the booking page
  return children;
};

export default ProtectedBookingRoute;
