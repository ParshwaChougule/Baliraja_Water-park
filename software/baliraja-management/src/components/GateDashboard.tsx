import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import {
  QrCodeScanner as ScannerIcon,
  CheckCircle as CheckInIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  LocalOffer as PackageIcon,
  Camera as CameraIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

interface TicketInfo {
  id: number;
  ticket_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  package_name: string;
  facilities: string;
  adults: number;
  children: number;
  total_amount: number;
  payment_status: string;
  visit_date: string;
  qr_code: string;
  is_used: boolean;
  check_in_time: string | null;
}

interface CheckInRecord {
  ticket_number: string;
  customer_name: string;
  package_name: string;
  check_in_time: string;
  guests: number;
}

const GateDashboard: React.FC = () => {
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedTicket, setScannedTicket] = useState<TicketInfo | null>(null);
  const [manualQR, setManualQR] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning', message: string } | null>(null);
  const [checkInRecords, setCheckInRecords] = useState<CheckInRecord[]>([]);
  const [todayStats, setTodayStats] = useState({
    totalCheckIns: 0,
    totalGuests: 0,
    pendingTickets: 0
  });
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const navigate = useNavigate();

  const API_BASE = 'http://localhost/baliraja/software/backend/api';

  useEffect(() => {
    loadTodayStats();
    loadCheckInRecords();
  }, []);

  const loadTodayStats = () => {
    // In a real application, this would come from the API
    const today = new Date().toDateString();
    const todayRecords = checkInRecords.filter(record => 
      new Date(record.check_in_time).toDateString() === today
    );
    
    setTodayStats({
      totalCheckIns: todayRecords.length,
      totalGuests: todayRecords.reduce((sum, record) => sum + record.guests, 0),
      pendingTickets: 5 // This would come from API
    });
  };

  const loadCheckInRecords = () => {
    // Load from localStorage for demo purposes
    const stored = localStorage.getItem('checkInRecords');
    if (stored) {
      setCheckInRecords(JSON.parse(stored));
    }
  };

  const saveCheckInRecord = (record: CheckInRecord) => {
    const updated = [record, ...checkInRecords].slice(0, 20); // Keep last 20 records
    setCheckInRecords(updated);
    localStorage.setItem('checkInRecords', JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const startScanner = () => {
    setScannerActive(true);
    
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );
      
      scanner.render(
        (decodedText) => {
          handleQRScan(decodedText);
          scanner.clear();
          setScannerActive(false);
        },
        (error) => {
          console.log('QR scan error:', error);
        }
      );
      
      scannerRef.current = scanner;
    }, 100);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setScannerActive(false);
  };

  const handleQRScan = async (qrCode: string) => {
    try {
      const response = await axios.get(`${API_BASE}/tickets.php?qr_code=${qrCode}`);
      
      if (response.data) {
        const ticketData = response.data;
        
        // Check if ticket is valid for today
        const visitDate = new Date(ticketData.visit_date);
        const today = new Date();
        
        if (visitDate.toDateString() !== today.toDateString()) {
          setAlert({ 
            type: 'error', 
            message: `This ticket is valid for ${visitDate.toDateString()}, not today.` 
          });
          return;
        }
        
        if (ticketData.is_used) {
          setAlert({ 
            type: 'warning', 
            message: `This ticket was already used at ${ticketData.check_in_time}` 
          });
          return;
        }
        
        if (ticketData.payment_status !== 'completed') {
          setAlert({ 
            type: 'error', 
            message: 'This ticket payment is not completed. Cannot check in.' 
          });
          return;
        }
        
        setScannedTicket(ticketData);
        setAlert(null);
      } else {
        setAlert({ type: 'error', message: 'Invalid QR code or ticket not found.' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error validating ticket. Please try again.' });
    }
  };

  const handleManualQRSubmit = () => {
    if (manualQR.trim()) {
      handleQRScan(manualQR.trim());
      setManualQR('');
    }
  };

  const confirmCheckIn = async () => {
    if (!scannedTicket) return;
    
    try {
      await axios.put(`${API_BASE}/tickets.php?action=checkin`, {
        qr_code: scannedTicket.qr_code || manualQR
      });
      
      // Create check-in record
      const checkInRecord: CheckInRecord = {
        ticket_number: scannedTicket.ticket_number,
        customer_name: scannedTicket.customer_name,
        package_name: scannedTicket.package_name,
        check_in_time: new Date().toISOString(),
        guests: scannedTicket.adults + scannedTicket.children
      };
      
      saveCheckInRecord(checkInRecord);
      
      setAlert({ 
        type: 'success', 
        message: `Welcome ${scannedTicket.customer_name}! Check-in successful.` 
      });
      
      setScannedTicket(null);
      loadTodayStats();
      
    } catch (error) {
      setAlert({ type: 'error', message: 'Error during check-in. Please try again.' });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ScannerIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gate Check-in - Baliraja Water Park
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {alert && (
          <Alert 
            severity={alert.type} 
            sx={{ mb: 2 }} 
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
        )}

        {/* Stats Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckInIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Today's Check-ins
                  </Typography>
                  <Typography variant="h4">
                    {todayStats.totalCheckIns}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Guests
                  </Typography>
                  <Typography variant="h4">
                    {todayStats.totalGuests}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimeIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Pending Tickets
                  </Typography>
                  <Typography variant="h4">
                    {todayStats.pendingTickets}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Scanner Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                QR Code Scanner
              </Typography>
              
              {!scannerActive ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CameraIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Scan ticket QR code for quick check-in
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ScannerIcon />}
                    onClick={startScanner}
                    sx={{ mb: 2 }}
                  >
                    Start Scanner
                  </Button>
                </Box>
              ) : (
                <Box>
                  <div id="qr-reader" style={{ width: '100%' }}></div>
                  <Button
                    variant="outlined"
                    onClick={stopScanner}
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Stop Scanner
                  </Button>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" gutterBottom>
                Manual QR Code Entry
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Enter QR code manually"
                  value={manualQR}
                  onChange={(e) => setManualQR(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleManualQRSubmit()}
                />
                <Button
                  variant="contained"
                  onClick={handleManualQRSubmit}
                  disabled={!manualQR.trim()}
                >
                  Check
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Ticket Information */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ticket Information
              </Typography>
              
              {scannedTicket ? (
                <Box>
                  <Paper sx={{ p: 3, mb: 3, bgcolor: 'success.50' }}>
                    <Typography variant="h6" color="success.main" gutterBottom>
                      ✓ Valid Ticket Found
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="subtitle1">
                        <strong>Ticket #:</strong> {scannedTicket.ticket_number}
                      </Typography>
                      <Typography variant="subtitle1">
                        <strong>Customer:</strong> {scannedTicket.customer_name}
                      </Typography>
                      <Typography variant="subtitle1">
                        <strong>Package:</strong> {scannedTicket.package_name}
                      </Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                        <Typography variant="subtitle1">
                          <strong>Adults:</strong> {scannedTicket.adults}
                        </Typography>
                        <Typography variant="subtitle1">
                          <strong>Children:</strong> {scannedTicket.children}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1">
                        <strong>Visit Date:</strong> {scannedTicket.visit_date}
                      </Typography>
                      <Chip 
                        label={`Payment: ${scannedTicket.payment_status}`}
                        color="success"
                        size="small"
                      />
                    </Box>
                    
                    <Box sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="large"
                        fullWidth
                        startIcon={<CheckInIcon />}
                        onClick={confirmCheckIn}
                      >
                        Confirm Check-in
                      </Button>
                    </Box>
                  </Paper>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Package Facilities:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {scannedTicket.facilities}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <PackageIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Scan a QR code to view ticket information
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Recent Check-ins */}
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Check-ins
              </Typography>
              
              {checkInRecords.length > 0 ? (
                <List>
                  {checkInRecords.slice(0, 10).map((record, index) => (
                    <ListItem key={index} divider>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <CheckInIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${record.customer_name} - ${record.package_name}`}
                        secondary={
                          <Box>
                            <Typography variant="body2" component="span">
                              Ticket: {record.ticket_number} • 
                              Guests: {record.guests} • 
                              Time: {new Date(record.check_in_time).toLocaleTimeString()}
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip 
                        label="Checked In" 
                        color="success" 
                        size="small" 
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No check-ins recorded today
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default GateDashboard;
