import React, { useState, useEffect } from 'react';
import { Button, Card, Alert, Spinner, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const DebugAuth = () => {
  const { currentUser, login, logout, error, loading } = useAuth();
  const [authState, setAuthState] = useState('checking');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const log = (message) => {
      console.log(`[DebugAuth] ${message}`);
      setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    log('Component mounted');
    
    if (currentUser) {
      log(`User is authenticated: ${currentUser.email}`);
      setAuthState('authenticated');
    } else {
      log('No user is currently authenticated');
      setAuthState('unauthenticated');
    }

    // Check Firebase auth state
    const checkAuth = async () => {
      try {
        log('Checking Firebase auth state...');
        // You can add more detailed checks here if needed
      } catch (error) {
        log(`Error checking auth state: ${error.message}`);
      }
    };

    checkAuth();
  }, [currentUser]);

  const handleTestLogin = async () => {
    try {
      setLogs(prev => [...prev, 'Attempting test login...']);
      const result = await login('test@example.com', 'password123');
      
      if (result.success) {
        setLogs(prev => [...prev, '✅ Test login successful']);
      } else {
        setLogs(prev => [...prev, `❌ Login failed: ${result.error}`]);
      }
    } catch (error) {
      setLogs(prev => [...prev, `❌ Login error: ${error.message}`]);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setLogs(prev => [...prev, '✅ Logged out successfully']);
    } catch (error) {
      setLogs(prev => [...prev, `❌ Logout error: ${error.message}`]);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h5">Authentication Debugger</Card.Header>
        <Card.Body>
          <Card.Title>Current Auth State</Card.Title>
          <div className="mb-3">
            <strong>Status:</strong>{' '}
            {loading ? (
              <span className="text-warning">
                <Spinner animation="border" size="sm" className="me-2" />
                Loading...
              </span>
            ) : currentUser ? (
              <span className="text-success">✅ Authenticated as {currentUser.email}</span>
            ) : (
              <span className="text-danger">❌ Not authenticated</span>
            )}
          </div>

          {error && (
            <Alert variant="danger">
              <strong>Error:</strong> {error.message || JSON.stringify(error)}
              <div><small>Code: {error.code || 'N/A'}</small></div>
            </Alert>
          )}

          <div className="mb-3">
            <Button 
              variant="primary" 
              className="me-2"
              onClick={handleTestLogin}
              disabled={loading}
            >
              Test Login
            </Button>
            
            {currentUser && (
              <Button 
                variant="danger"
                onClick={handleLogout}
                disabled={loading}
              >
                Logout
              </Button>
            )}
          </div>

          <div>
            <h5>Debug Logs</h5>
            <div style={{ 
              height: '300px', 
              overflowY: 'auto', 
              backgroundColor: '#f8f9fa', 
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '0.9em'
            }}>
              {logs.length === 0 ? (
                <div className="text-muted">No logs yet. Perform an action to see logs.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} style={{ 
                    borderBottom: '1px solid #eee', 
                    padding: '4px 0',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DebugAuth;
