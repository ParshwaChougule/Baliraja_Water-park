import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  LinearProgress,
  Snackbar,
} from '@mui/material';
import {
  ConfirmationNumber as TicketIcon,
  Payment as PaymentIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  QrCode as QrCodeIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  facilities: string;
  image_url: string;
}

interface Ticket {
  id: number;
  ticket_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  package_name: string;
  adults: number;
  children: number;
  total_amount: number;
  payment_status: string;
  visit_date: string;
  qr_code: string;
  created_at: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BookingDashboard: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [bookingForm, setBookingForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    package_id: '',
    package_name: '',
    adults: 1,
    children: 0,
    visit_date: '',
    total_amount: 0
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [activeStep, setActiveStep] = useState(0);
  const [bookingStats, setBookingStats] = useState({ total: 0, completed: 0, pending: 0, revenue: 0 });
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const navigate = useNavigate();

  const API_BASE = 'http://localhost:8080/api';
  const steps = ['Select Package', 'Customer Details', 'Payment', 'Confirmation'];

  useEffect(() => {
    fetchPackages();
    fetchTickets();
    loadRazorpayScript();
  }, []);

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API_BASE}/packages-simple.php`);
      if (response.data.records) {
        setPackages(response.data.records);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${API_BASE}/tickets-simple.php`);
      if (response.data.records) {
        setTickets(response.data.records);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setActiveStep(1);
  };

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    return selectedPackage.price * (bookingForm.adults + bookingForm.children);
  };

  const handleBookingSubmit = async () => {
    if (!selectedPackage) return;

    try {
      const totalAmount = calculateTotal();
      
      console.log('Starting booking submission...', {
        selectedPackage,
        bookingForm,
        totalAmount
      });
      
      // Create Razorpay order
      const orderResponse = await axios.post(`${API_BASE}/booking-system.php`, {
        action: 'create_booking',
        total_amount: totalAmount,
        package_id: selectedPackage.id,
        package_name: selectedPackage.name,
        customer_name: bookingForm.customer_name,
        customer_email: bookingForm.customer_email,
        customer_phone: bookingForm.customer_phone,
        visit_date: bookingForm.visit_date,
        adults: bookingForm.adults,
        children: bookingForm.children
      });

      console.log('Order response:', orderResponse.data);
      
      const { order_id, key_id } = orderResponse.data.razorpay_order;

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        console.error('Razorpay not loaded!');
        setAlert({ type: 'error', message: 'Payment gateway not loaded. Please refresh the page.' });
        return;
      }
      
      console.log('Initializing Razorpay with:', { order_id, key_id });
      
      // Initialize Razorpay
      const options = {
        key: key_id,
        amount: totalAmount * 100,
        currency: 'INR',
        name: 'Baliraja Water Park',
        description: `${selectedPackage.name} - ${bookingForm.adults} Adults, ${bookingForm.children} Children`,
        order_id: order_id,
        handler: async (response: any) => {
          try {
            console.log('Payment successful! Response:', response);
            
            // Verify payment
            const verifyResponse = await axios.post(`${API_BASE}/booking-system.php`, {
              action: 'verify_payment',
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              package_id: selectedPackage.id,
              customer_name: bookingForm.customer_name,
              customer_email: bookingForm.customer_email,
              customer_phone: bookingForm.customer_phone,
              adults: bookingForm.adults,
              children: bookingForm.children,
              amount: totalAmount,
              visit_date: bookingForm.visit_date
            });

            console.log('Payment verification response:', verifyResponse.data);

            if (verifyResponse.data.payment_status === 'success') {
              console.log('Payment verified successfully!');
              setAlert({ type: 'success', message: 'Booking successful!' });
              setActiveStep(3);
              
              // Create ticket object for display
              const newTicket: Ticket = {
                id: 0,
                ticket_number: verifyResponse.data.ticket_number,
                customer_name: bookingForm.customer_name,
                customer_email: bookingForm.customer_email,
                customer_phone: bookingForm.customer_phone,
                package_name: selectedPackage.name,
                adults: bookingForm.adults,
                children: bookingForm.children,
                total_amount: totalAmount,
                payment_status: 'completed',
                visit_date: bookingForm.visit_date,
                qr_code: verifyResponse.data.qr_code,
                created_at: new Date().toISOString()
              };
              
              console.log('Setting current ticket:', newTicket);
              setCurrentTicket(newTicket);
              fetchTickets();
            } else {
              console.error('Payment verification failed:', verifyResponse.data);
              setAlert({ type: 'error', message: verifyResponse.data.error || 'Payment verification failed' });
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setAlert({ type: 'error', message: 'Payment verification failed' });
          }
        },
        prefill: {
          name: bookingForm.customer_name,
          email: bookingForm.customer_email,
          contact: bookingForm.customer_phone
        },
        theme: {
          color: '#1976d2'
        },
        modal: {
          ondismiss: () => {
            console.log('Payment cancelled by user');
            setAlert({ type: 'error', message: 'Payment cancelled' });
            setActiveStep(1);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setActiveStep(2);

    } catch (error) {
      console.error('Error creating booking:', error);
      const axiosError = error as any;
      const errorMessage = axiosError.response?.data?.message || axiosError.message || 'Error processing booking';
      setAlert({ type: 'error', message: errorMessage });
    }
  };

  const resetBooking = () => {
    setOpenBookingDialog(false);
    setSelectedPackage(null);
    setCurrentTicket(null);
    setActiveStep(0);
    setBookingForm({
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      package_id: '',
      package_name: '',
      adults: 1,
      children: 0,
      visit_date: '',
      total_amount: 0
    });
    setAlert(null);
  };

  const showTicketDetails = (ticket: Ticket) => {
    setCurrentTicket(ticket);
    setOpenTicketDialog(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <TicketIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Booking Dashboard - Baliraja Water Park
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {alert && (
          <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>
            {alert.message}
          </Alert>
        )}

        {/* Action Buttons */}
        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setOpenBookingDialog(true)}
          >
            New Booking
          </Button>
        </Box>

        {/* Available Packages */}
        <Typography variant="h5" sx={{ mb: 3 }}>Available Packages</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          {packages.map((pkg) => (
            <Card key={pkg.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {pkg.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {pkg.description}
                </Typography>
                <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
                  ₹{pkg.price}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Duration: {pkg.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pkg.facilities}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setOpenBookingDialog(true);
                    handlePackageSelect(pkg);
                  }}
                >
                  Book Now
                </Button>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Recent Bookings */}
        <Typography variant="h5" sx={{ mb: 3 }}>Recent Bookings</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticket #</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Guests</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Visit Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.slice(0, 10).map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.ticket_number}</TableCell>
                  <TableCell>{ticket.customer_name}</TableCell>
                  <TableCell>{ticket.package_name}</TableCell>
                  <TableCell>{ticket.adults + ticket.children}</TableCell>
                  <TableCell>₹{ticket.total_amount}</TableCell>
                  <TableCell>
                    <Chip 
                      label={ticket.payment_status} 
                      color={ticket.payment_status === 'completed' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>{ticket.visit_date}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<QrCodeIcon />}
                      onClick={() => showTicketDetails(ticket)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Booking Dialog */}
      <Dialog open={openBookingDialog} onClose={resetBooking} maxWidth="md" fullWidth>
        <DialogTitle>
          New Booking
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {packages.map((pkg) => (
                <Card 
                  key={pkg.id}
                  sx={{ 
                    cursor: 'pointer',
                    border: selectedPackage?.id === pkg.id ? '2px solid #1976d2' : '1px solid #e0e0e0'
                  }}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  <CardContent>
                    <Typography variant="h6">{pkg.name}</Typography>
                    <Typography variant="h5" color="primary">₹{pkg.price}</Typography>
                    <Typography variant="body2">{pkg.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <TextField
                fullWidth
                label="Customer Name"
                value={bookingForm.customer_name}
                onChange={(e) => setBookingForm({ ...bookingForm, customer_name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={bookingForm.customer_email}
                onChange={(e) => setBookingForm({ ...bookingForm, customer_email: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={bookingForm.customer_phone}
                onChange={(e) => setBookingForm({ ...bookingForm, customer_phone: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Adults</InputLabel>
                  <Select
                    value={bookingForm.adults}
                    label="Adults"
                    onChange={(e) => setBookingForm({ ...bookingForm, adults: Number(e.target.value) })}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Children</InputLabel>
                  <Select
                    value={bookingForm.children}
                    label="Children"
                    onChange={(e) => setBookingForm({ ...bookingForm, children: Number(e.target.value) })}
                  >
                    {[0,1,2,3,4,5,6,7,8,9,10].map(num => (
                      <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                fullWidth
                label="Visit Date"
                type="date"
                value={bookingForm.visit_date}
                onChange={(e) => setBookingForm({ ...bookingForm, visit_date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              {selectedPackage && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="h6">Booking Summary</Typography>
                  <Typography>Package: {selectedPackage.name}</Typography>
                  <Typography>Adults: {bookingForm.adults} × ₹{selectedPackage.price}</Typography>
                  <Typography>Children: {bookingForm.children} × ₹{selectedPackage.price}</Typography>
                  <Typography variant="h6" color="primary">
                    Total: ₹{calculateTotal()}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <PaymentIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6">Processing Payment...</Typography>
              <Typography color="text.secondary">
                Please complete the payment in the Razorpay window
              </Typography>
            </Box>
          )}

          {activeStep === 3 && currentTicket && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>
                Booking Confirmed!
              </Typography>
              <Typography variant="h6">Ticket: {currentTicket.ticket_number}</Typography>
              <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                <QRCode value={currentTicket.qr_code} size={200} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Show this QR code at the gate for entry
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={resetBooking}>
            {activeStep === 3 ? 'Close' : 'Cancel'}
          </Button>
          {activeStep === 1 && (
            <Button onClick={handleBookingSubmit} variant="contained">
              Proceed to Payment
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Ticket Details Dialog */}
      <Dialog open={openTicketDialog} onClose={() => setOpenTicketDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ticket Details</DialogTitle>
        <DialogContent>
          {currentTicket && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">{currentTicket.ticket_number}</Typography>
              <Typography>Customer: {currentTicket.customer_name}</Typography>
              <Typography>Package: {currentTicket.package_name}</Typography>
              <Typography>Visit Date: {currentTicket.visit_date}</Typography>
              <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                <QRCode value={currentTicket.qr_code} size={200} />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTicketDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      {alert && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setAlert(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setAlert(null)}
            severity={alert.type}
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default BookingDashboard;
