import React, { useState } from 'react';
import {
  Container,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WaterIcon from '@mui/icons-material/Water';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'admin'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication (in production, this should be done via API)
    const validCredentials = {
      admin: { username: 'admin', password: 'admin123' },
      booking_staff: { username: 'booking', password: 'booking123' },
      gate_staff: { username: 'gate', password: 'gate123' }
    };

    const roleCredentials = validCredentials[credentials.role as keyof typeof validCredentials];
    
    if (credentials.username === roleCredentials.username && 
        credentials.password === roleCredentials.password) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        username: credentials.username,
        role: credentials.role
      }));
      
      // Navigate to appropriate dashboard
      switch (credentials.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'booking_staff':
          navigate('/booking');
          break;
        case 'gate_staff':
          navigate('/gate');
          break;
        default:
          navigate('/admin');
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ width: '100%', mt: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <WaterIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
              <Typography component="h1" variant="h4" color="primary">
                Baliraja Water Park
              </Typography>
            </Box>
            
            <Typography component="h2" variant="h6" align="center" sx={{ mb: 3 }}>
              Management System Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  value={credentials.role}
                  label="Role"
                  onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="booking_staff">Booking Staff</MenuItem>
                  <MenuItem value="gate_staff">Gate Staff</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials.username}
                onChange={handleChange}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                Sign In
              </Button>
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" align="center">
                <strong>Demo Credentials:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Admin: admin / admin123<br/>
                Booking: booking / booking123<br/>
                Gate: gate / gate123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
