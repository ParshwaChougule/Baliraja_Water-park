import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Badge, Spinner, ListGroup, ProgressBar } from 'react-bootstrap';
import { FaTicketAlt, FaCalendarAlt, FaUsers, FaCreditCard, FaCheck, FaSignInAlt, FaUser, FaLock, FaEye, FaEyeSlash, FaSwimmer, FaWater, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChild, FaUserFriends, FaDownload, FaPrint, FaQrcode, FaStar, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import TicketAvailabilityPopup from './TicketAvailabilityPopup';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { packages, parkInfo } from '../data/waterParkData';
import { saveBookingToRealtimeDB, updateBookingStatusInRealtimeDB } from '../services/realtimeDatabaseService';
import { useAuth } from '../contexts/AuthContext';
import { createMockOrder, verifyMockPayment, initializeMockRazorpay } from '../services/mockPaymentService';
import apiService from '../config/api';
import { calculatePaymentSplit, processSplitPayment, getPaymentSplitSummary } from '../services/paymentSplitService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BookingPage = () => {
  // State definitions
  const [searchParams] = useSearchParams();
  const { currentUser, loading: authLoading, login } = useAuth();
  
  console.log('🔥 BookingPage - Auth loading:', authLoading);
  console.log('🔥 BookingPage - Current user:', currentUser);
  
  const [bookingData, setBookingData] = useState({
    package: '',
    date: '',
    adults: 1,
    children: 0,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [errors, setErrors] = useState({});
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [availableTickets, setAvailableTickets] = useState(500);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [paymentSplitData, setPaymentSplitData] = useState(null);
  const ticketRef = useRef();

  // Check ticket availability for selected date
  const checkTicketAvailability = async (date) => {
    try {
      if (!date) return;
      
      // In a real app, you would fetch this from your backend
      // For now, we'll simulate it with localStorage
      const today = new Date().toISOString().split('T')[0];
      const storedDate = localStorage.getItem('lastBookingDate');
      
      if (storedDate === today) {
        const bookedCount = parseInt(localStorage.getItem('ticketsBookedToday') || '0');
        const available = Math.max(0, 500 - bookedCount);
        setAvailableTickets(available);
        setIsSoldOut(available <= 0);
      } else {
        // New day, reset counter
        localStorage.setItem('lastBookingDate', today);
        localStorage.setItem('ticketsBookedToday', '0');
        setAvailableTickets(500);
        setIsSoldOut(false);
      }
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error checking ticket availability:', error);
      // Fallback to default values
      setAvailableTickets(500);
      setIsSoldOut(false);
    }
  };

  // Update ticket count when date changes
  useEffect(() => {
    if (bookingData.date) {
      checkTicketAvailability(bookingData.date);
    }
  }, [bookingData.date]);

  // Pre-select package from URL parameter and auto-fill user data
  useEffect(() => {
    const packageId = searchParams.get('package');
    if (packageId) {
      setBookingData(prev => ({
        ...prev,
        package: packageId
      }));
    }
    
    // Auto-fill user data if logged in
    if (currentUser) {
      console.log('🔥 Current user found:', currentUser);
      console.log('🔥 User display name:', currentUser.displayName);
      console.log('🔥 User email:', currentUser.email);
      
      setBookingData(prev => ({
        ...prev,
        name: currentUser.displayName || '',
        email: currentUser.email || ''
      }));
    } else {
      console.log('❌ No current user found');
    }
  }, [searchParams, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If package is being changed, update guest count based on package type
    if (name === 'package') {
      const selectedPkg = packages.find(pkg => pkg.id === parseInt(value));
      const newBookingData = {
        ...bookingData,
        [name]: value
      };
      
      // Set default guests based on package type
      if (selectedPkg) {
        if (selectedPkg.unit === 'family') {
          newBookingData.adults = 2; // Family package default: 2 adults
          newBookingData.children = 1; // Family package default: 1 child
        } else {
          newBookingData.adults = 1; // Basic & VIP package default: 1 adult
          newBookingData.children = 0; // No children by default
        }
      }
      
      setBookingData(newBookingData);
    } else {
      setBookingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingData.package) newErrors.package = 'Please select a package';
    if (!bookingData.date) newErrors.date = 'Please select a date';
    if (!bookingData.adults || bookingData.adults < 1) newErrors.adults = 'At least 1 adult is required';
    if (bookingData.children < 0) newErrors.children = 'Children count cannot be negative';
    if (!bookingData.name.trim()) newErrors.name = 'Name is required';
    if (!bookingData.email.trim()) newErrors.email = 'Email is required';
    if (!bookingData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (bookingData.email && !emailRegex.test(bookingData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Date validation (must be future date)
    const selectedDate = new Date(bookingData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      newErrors.date = 'Please select a future date';
    }
    
    // Check ticket availability
    if (bookingData.date && availableTickets > 0) {
      const totalGuests = bookingData.adults + bookingData.children;
      if (totalGuests > availableTickets) {
        newErrors.adults = `Only ${availableTickets} tickets available for the selected date`;
      }
    } else if (isSoldOut) {
      newErrors.date = 'Sorry, all tickets are sold out for the selected date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const selectedPackage = packages.find(pkg => pkg.id === parseInt(bookingData.package));
    if (!selectedPackage) return 0;
    
    if (selectedPackage.unit === 'family') {
      return selectedPackage.price;
    } else {
      // Adult price is full price, children get 50% discount
      const adultTotal = selectedPackage.price * bookingData.adults;
      const childrenTotal = (selectedPackage.price * 0.5) * bookingData.children;
      return adultTotal + childrenTotal;
    }
  };

  const loadRazorpayScript = async () => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      console.log('✅ Razorpay already loaded');
      return true;
    }

    return new Promise((resolve) => {
      // Set a timeout to handle cases where the script takes too long to load
      const timeout = setTimeout(() => {
        console.warn('Razorpay script loading timed out, falling back to mock');
        resolve(initializeMockRazorpay());
      }, 10000); // 10 second timeout

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        clearTimeout(timeout);
        if (window.Razorpay) {
          console.log('✅ Razorpay loaded successfully');
          resolve(true);
        } else {
          console.error('Razorpay loaded but window.Razorpay is not available');
          resolve(initializeMockRazorpay());
        }
      };
      
      script.onerror = (error) => {
        clearTimeout(timeout);
        console.error('❌ Failed to load Razorpay script:', error);
        resolve(initializeMockRazorpay());
      };
      
      // Add to document
      document.head.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');
      
      const totalAmount = calculateTotal();
      
      // Calculate payment split before creating order
      const splitDetails = calculatePaymentSplit(totalAmount);
      console.log('💰 Payment Split Details:', splitDetails);
      
      // Get Razorpay config from API service
      const config = apiService.getConfig();
      const razorpayConfig = config.RAZORPAY_CONFIG || {};
      
      // Create order through backend with split information
      const orderResponse = await apiService.createOrder({
        package_name: selectedPackage.name,
        customer_name: bookingData.name,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        visit_date: bookingData.date,
        adults: bookingData.adults,
        children: bookingData.children,
        total_amount: totalAmount,
        special_requests: bookingData.specialRequests,
        payment_split: splitDetails
      });
      
      const orderData = orderResponse;
      console.log('Order response:', orderData);
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }
      
      // Load Razorpay script
      const razorpayLoaded = await loadRazorpayScript();
      
      if (!razorpayLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // Prepare Razorpay options
      const options = {
        ...razorpayConfig, // Apply config from API service
        key: razorpayConfig.key || orderData.razorpay_order?.key_id,
        amount: orderData.razorpay_order?.amount || (totalAmount * 100), // Convert to paise
        currency: orderData.razorpay_order?.currency || 'INR',
        order_id: orderData.razorpay_order?.order_id,
        name: razorpayConfig.name || 'Baliraja Water Park',
        description: `${selectedPackage?.name} - Water Park Booking`,
        image: razorpayConfig.image || '/logo192.png',
        handler: async function (response) {
          try {
            console.log('Razorpay payment response:', response);
            
            if (!response.razorpay_payment_id) {
              throw new Error('Payment ID not received from Razorpay');
            }
            
            // Verify payment through backend
            const verifyResponse = await apiService.verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: orderData.booking_id,
              customer_name: bookingData.name,
              customer_email: bookingData.email,
              package_name: selectedPackage.name,
              visit_date: bookingData.date,
              adults: bookingData.adults,
              children: bookingData.children,
              amount: totalAmount,
              payment_split: splitDetails
            });
            
            console.log('Payment verification response:', verifyResponse);
            
            if (verifyResponse.payment_status === 'success') {
              // Process payment split after successful verification
              const splitResult = await processSplitPayment(response, totalAmount);
              console.log('💰 Payment Split Result:', splitResult);
              
              if (splitResult.success) {
                setPaymentSplitData(splitResult);
                console.log(`✅ Payment Split Successful:
                  - Baliraja Agro Tourism: ₹${splitResult.splitSummary.agroTourismAmount} (60%)
                  - Baliraja Fun & Waterpark: ₹${splitResult.splitSummary.funWaterparkAmount} (40%)`);
              } else {
                console.warn('⚠️ Payment split failed, but payment was successful:', splitResult.error);
              }
              
              // Payment verified, save to Firebase and confirm booking
              confirmBooking(
                response.razorpay_payment_id, 
                verifyResponse.ticket_number || `TKT-${Date.now()}`,
                verifyResponse.qr_code || '',
                splitResult
              );
            } else {
              throw new Error(verifyResponse.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setError(`Payment verification failed: ${error.message}. Please contact support with payment ID: ${response?.razorpay_payment_id || 'N/A'}`);
            setLoading(false);
          }
        },
        prefill: {
          name: bookingData.name || '',
          email: bookingData.email || '',
          contact: bookingData.phone || '',
        },
        theme: razorpayConfig.theme || {
          color: '#0d6efd',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError('Payment was cancelled by user');
          },
          timeout: 300000 // 5 minutes timeout
        },
        notes: {
          booking_reference: orderData.booking_id,
          package: selectedPackage.name,
          visit_date: bookingData.date
        },
        timeout: 300, // 5 minutes in seconds
        retry: {
          enabled: true,
          max_count: 2
        }
      };

      // Validate required Razorpay options
      if (!options.key) {
        throw new Error('Razorpay key is missing. Please check your configuration.');
      }
      
      if (!options.order_id && !options.amount) {
        throw new Error('Insufficient payment details. Please try again.');
      }

      console.log('Opening Razorpay with options:', {
        ...options,
        key: options.key ? '***' + options.key.slice(-4) : 'undefined'
      });
      
      const paymentObject = new window.Razorpay(options);
      
      // Add event listeners for better error handling
      paymentObject.on('payment.failed', function(response) {
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description || 'Unknown error'}`);
        setLoading(false);
      });
      
      paymentObject.open();
      
    } catch (error) {
      console.error('Payment error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      setError(`Payment failed: ${error.message || 'Please try again or contact support'}`);
      setLoading(false);
    }
  };

  const updateTicketCount = (count) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const storedDate = localStorage.getItem('lastBookingDate');
      let bookedCount = 0;
      
      if (storedDate === today) {
        bookedCount = parseInt(localStorage.getItem('ticketsBookedToday') || '0');
      } else {
        localStorage.setItem('lastBookingDate', today);
      }
      
      const newCount = Math.min(bookedCount + count, 500);
      localStorage.setItem('ticketsBookedToday', newCount.toString());
      
      // Update available tickets
      const available = 500 - newCount;
      setAvailableTickets(available);
      setIsSoldOut(available <= 0);
      setLastUpdated(new Date().toLocaleTimeString());
      
      return newCount;
    } catch (error) {
      console.error('Error updating ticket count:', error);
      return 0;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Check ticket availability again right before submission
    const totalGuests = bookingData.adults + bookingData.children;
    if (totalGuests > availableTickets) {
      setError(`Sorry, only ${availableTickets} tickets are available for the selected date.`);
      return;
    }
    
    // Update ticket count
    const newCount = updateTicketCount(totalGuests);
    if (newCount > 500) {
      setError('Sorry, tickets are sold out for the selected date.');
      return;
    }
    
    // Check if user is logged in
    if (!currentUser) {
      // Show login modal if user is not logged in
      setShowLoginModal(true);
    } else {
      // Proceed to confirmation if user is logged in
      setShowConfirmation(true);
    }
  };

  // Handle login form input changes
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const result = await login(loginData.email, loginData.password);
      
      if (result.success) {
        setShowLoginModal(false);
        setShowConfirmation(true);
        // Auto-fill user data after login
        setBookingData(prev => ({
          ...prev,
          name: result.user.displayName || '',
          email: result.user.email || ''
        }));
      } else {
        setLoginError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const confirmBooking = async (paymentId = null, ticketNumber = null, qrCode = null, splitResult = null) => {
    setLoading(true);
    setError('');
    
    try {
      const bookingDetails = {
        ...bookingData,
        userId: currentUser?.uid || null,
        userEmail: currentUser?.email || bookingData.email,
        totalAmount: calculateTotal(),
        packageDetails: selectedPackage,
        paymentId: paymentId,
        paymentStatus: paymentId ? 'completed' : 'pending',
        ticketNumber: ticketNumber,
        qrCode: qrCode,
        status: paymentId ? 'confirmed' : 'pending',
        source: 'website',
        // Add payment split information to booking details
        paymentSplit: splitResult ? {
          splitProcessed: splitResult.splitProcessed,
          agroTourismAmount: splitResult.splitSummary?.agroTourismAmount || 0,
          funWaterparkAmount: splitResult.splitSummary?.funWaterparkAmount || 0,
          splitRatio: splitResult.splitSummary?.splitRatio || '60:40',
          splitTransactions: splitResult.splitTransactions || []
        } : null
      };

      const result = await saveBookingToRealtimeDB(bookingDetails);
      
      if (result.success) {
        // Set ticket data for display
        setTicketData({
          ticketNumber: ticketNumber,
          customerName: bookingData.name,
          customerEmail: bookingData.email,
          customerPhone: bookingData.phone,
          packageName: selectedPackage.name,
          visitDate: bookingData.date,
          adults: bookingData.adults,
          children: bookingData.children,
          totalAmount: calculateTotal(),
          paymentId: paymentId,
          qrCode: qrCode,
          bookingDate: new Date().toLocaleDateString('en-IN')
        });
        
        setBookingId(ticketNumber || result.id);
        setBookingConfirmed(true);
        setShowConfirmation(false);
        setShowTicketModal(true);
      } else {
        setError(result.error || 'Failed to confirm booking. Please try again.');
      }
    } catch (err) {
      console.error('Booking confirmation error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  // Download ticket as PDF
  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`Baliraja-Ticket-${ticketData.ticketNumber}.pdf`);
    } catch (error) {
      console.error('Error downloading ticket:', error);
      alert('Error downloading ticket. Please try again.');
    }
  };

  // Print ticket
  const printTicket = () => {
    if (!ticketRef.current) return;
    
    const printWindow = window.open('', '_blank');
    const ticketHTML = ticketRef.current.outerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Baliraja Water Park Ticket</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .ticket { max-width: 600px; margin: 0 auto; }
            @media print {
              body { margin: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${ticketHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  };

  const selectedPackage = packages.find(pkg => pkg.id === parseInt(bookingData.package));

  // Main component return
  return (
    <>
      <Header />
      
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h1 className="display-4 fw-bold mb-4">
                <FaTicketAlt className="me-3 text-primary" />
                Book Your Tickets
              </h1>
              <p className="lead text-muted">
                Reserve your spot at Baliraja Agro Tourism and get ready for an unforgettable water adventure!
              </p>
            </Col>
          </Row>

          {bookingConfirmed && (
            <Row className="mb-4">
              <Col lg={8} className="mx-auto">
                <Alert variant="success" className="text-center">
                  <FaCheck className="me-2" />
                  <strong>Booking Confirmed!</strong> Your booking ID is: <Badge bg="primary">{bookingId}</Badge>
                  <br />
                  <small>A confirmation email has been sent to {bookingData.email}</small>
                </Alert>
              </Col>
            </Row>
          )}

          <Row className="g-4">
            {/* Package Details Section */}
            <Col lg={5}>
              {selectedPackage ? (
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">
                      <FaTicketAlt className="me-2" />
                      {selectedPackage.name}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-4">
                      <img 
                        src={selectedPackage.image} 
                        alt={selectedPackage.name}
                        className="img-fluid rounded mb-3"
                        style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                      />
                      <p className="text-muted mb-3">
                        Enjoy a fantastic day at our waterpark with this package. 
                        Access to all water attractions, slides, and pools is included.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">
                        <FaSwimmer className="me-2 text-primary" />
                        Included Services
                      </h6>
                      <ListGroup variant="flush">
                        {selectedPackage.features.map((feature, index) => (
                          <ListGroup.Item key={index} className="px-0 py-2 border-0">
                            <FaCheck className="text-success me-2" />
                            {feature}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">
                        <FaClock className="me-2 text-primary" />
                        Important Information
                      </h6>
                      <ul className="list-unstyled small text-muted">
                        <li className="mb-2">• Outside food and beverages are not allowed</li>
                        <li className="mb-2">• Proper swimming attire is required</li>
                        <li className="mb-2">• Lockers are available for rent</li>
                        <li className="mb-2">• Please arrive 15 minutes before your session time</li>
                      </ul>
                    </div>

                    <div className="bg-light p-3 rounded">
                      <h6 className="fw-bold mb-2">About Baliraja Agro Tourism</h6>
                      <p className="small text-muted mb-0">
                        Baliraja Agro Tourism is the premier waterpark destination offering 
                        thrilling water slides, relaxing pools, and fun activities for the whole family.
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Header className="bg-primary text-white">
                    <h5 className="mb-0">
                      <FaTicketAlt className="me-2" />
                      Select Package
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    {packages.map((pkg) => (
                      <div key={pkg.id} className="mb-3">
                        <Form.Check
                          type="radio"
                          id={`package-${pkg.id}`}
                          name="package"
                          value={pkg.id}
                          checked={bookingData.package === pkg.id.toString()}
                          onChange={handleInputChange}
                          label={
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <strong>{pkg.name}</strong>
                                <Badge bg={pkg.popular ? 'warning' : 'secondary'}>
                                  ₹{pkg.price}/{pkg.unit}
                                </Badge>
                              </div>
                              <small className="text-muted d-block mt-1">
                                {pkg.features.slice(0, 2).join(', ')}
                              </small>
                            </div>
                          }
                        />
                      </div>
                    ))}
                    {errors.package && <div className="text-danger small">{errors.package}</div>}
                  </Card.Body>
                </Card>
              )}
            </Col>

            {/* Professional Booking Form */}
            <Col lg={7}>
              <Card className="border-0 shadow-lg">
                <Card.Header className="bg-gradient text-white" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="mb-0">
                      <FaCalendarAlt className="me-2" />
                      Booking Details
                    </h5>
                    <Badge bg="light" text="dark" className="px-3 py-2">
                      <FaShieldAlt className="me-1" />
                      Secure Booking
                    </Badge>
                  </div>
                </Card.Header>
                <Card.Body className="p-4">
                  {/* Progress Indicator */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">Step 1 of 2</small>
                      <small className="text-muted">Fill Details</small>
                    </div>
                    <ProgressBar now={50} className="mb-3" style={{ height: '4px' }} />
                  </div>

                  <Form onSubmit={handleSubmit}>
                    {/* Package Selection Summary */}
                    {selectedPackage && (
                      <div className="mb-4 p-3 bg-light rounded-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h6 className="mb-1 text-primary">
                              <FaStar className="me-2" />
                              {selectedPackage.name}
                            </h6>
                            <small className="text-muted">Selected Package</small>
                          </div>
                          <Badge bg="primary" className="fs-6 px-3 py-2">
                            ₹{selectedPackage.price}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <Row className="g-4">
                      {/* Date Selection */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold mb-2">
                            <FaCalendarAlt className="me-2 text-primary" />
                            Visit Date *
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={bookingData.date}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            isInvalid={!!errors.date}
                            className="py-3"
                            style={{ fontSize: '16px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.date}
                          </Form.Control.Feedback>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <Form.Text className="text-muted">
                              Select your preferred visit date
                            </Form.Text>
                            {bookingData.date && (
                              <div className="text-end">
                                <span className={`badge ${isSoldOut ? 'bg-danger' : 'bg-success'} p-2`}>
                                  {isSoldOut ? 'SOLD OUT' : `${availableTickets} Tickets Available`}
                                </span>
                                <div className="small text-muted">Updated: {lastUpdated}</div>
                              </div>
                            )}
                          </div>
                        </Form.Group>
                      </Col>

                      {/* Guest Count Section */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold mb-2">
                            <FaUserFriends className="me-2 text-primary" />
                            Adults *
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="adults"
                            value={bookingData.adults}
                            onChange={handleInputChange}
                            min="1"
                            max="20"
                            isInvalid={!!errors.adults}
                            className="py-3"
                            style={{ fontSize: '16px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.adults}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            Minimum 1 adult required
                          </Form.Text>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold mb-2">
                            <FaChild className="me-2 text-primary" />
                            Children
                            <Badge bg="success" className="ms-2 small">50% OFF</Badge>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="children"
                            value={bookingData.children}
                            onChange={handleInputChange}
                            min="0"
                            max="20"
                            isInvalid={!!errors.children}
                            className="py-3"
                            style={{ fontSize: '16px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.children}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            Children get 50% discount
                          </Form.Text>
                        </Form.Group>
                      </Col>

                      {/* Personal Information Section */}
                      <Col xs={12}>
                        <hr className="my-4" />
                        <h6 className="mb-3 text-primary">
                          <FaUser className="me-2" />
                          Personal Information
                        </h6>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold mb-2">
                            <FaUser className="me-2 text-primary" />
                            Full Name *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={bookingData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            isInvalid={!!errors.name}
                            className="py-3"
                            style={{ fontSize: '16px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            Name as per ID proof
                          </Form.Text>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold mb-2">
                            <FaEnvelope className="me-2 text-primary" />
                            Email Address *
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={bookingData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            isInvalid={!!errors.email}
                            className="py-3"
                            style={{ fontSize: '16px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            Ticket will be sent to this email
                          </Form.Text>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold mb-2">
                            <FaPhone className="me-2 text-primary" />
                            Phone Number *
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={bookingData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your mobile number"
                            isInvalid={!!errors.phone}
                            className="py-3"
                            style={{ fontSize: '16px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            For booking confirmations
                          </Form.Text>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold mb-2">
                            <FaEnvelope className="me-2 text-primary" />
                            Special Requests
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="specialRequests"
                            value={bookingData.specialRequests}
                            onChange={handleInputChange}
                            placeholder="Any special requirements or requests..."
                            className="py-2"
                            style={{ fontSize: '16px' }}
                          />
                          <Form.Text className="text-muted">
                            Optional: Dietary restrictions, accessibility needs, etc.
                          </Form.Text>
                        </Form.Group>
                      </Col>

                      {/* Professional Booking Summary */}
                      {selectedPackage && (
                        <Col xs={12}>
                          <div className="mt-4">
                            <hr />
                            <Card className="border-0 shadow-sm" style={{
                              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                            }}>
                              <Card.Body className="p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <h5 className="mb-0 text-primary">
                                    <FaTicketAlt className="me-2" />
                                    Booking Summary
                                  </h5>
                                  <Badge bg="success" className="px-3 py-2">
                                    <FaShieldAlt className="me-1" />
                                    Secure Payment
                                  </Badge>
                                </div>
                                
                                <Row className="g-3">
                                  <Col md={8}>
                                    <div className="bg-white p-3 rounded-3">
                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="fw-semibold">
                                          <FaUserFriends className="me-2 text-primary" />
                                          Adults ({bookingData.adults})
                                        </span>
                                        <span className="fw-bold">₹{selectedPackage.price} × {bookingData.adults}</span>
                                        <span className="fw-bold text-success">₹{(selectedPackage.price * bookingData.adults).toFixed(0)}</span>
                                      </div>
                                      
                                      {bookingData.children > 0 && (
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                          <span className="fw-semibold">
                                            <FaChild className="me-2 text-primary" />
                                            Children ({bookingData.children})
                                            <Badge bg="success" className="ms-2 small">50% OFF</Badge>
                                          </span>
                                          <span className="fw-bold">₹{(selectedPackage.price * 0.5).toFixed(0)} × {bookingData.children}</span>
                                          <span className="fw-bold text-success">₹{(selectedPackage.price * 0.5 * bookingData.children).toFixed(0)}</span>
                                        </div>
                                      )}
                                      
                                      <hr className="my-3" />
                                      
                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="fw-semibold">
                                          <FaCalendarAlt className="me-2 text-primary" />
                                          Visit Date:
                                        </span>
                                        <span className="fw-bold">
                                          {bookingData.date ? new Date(bookingData.date).toLocaleDateString('en-IN', { 
                                            weekday: 'short', 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric' 
                                          }) : 'Not selected'}
                                        </span>
                                      </div>
                                      
                                      <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-semibold">
                                          <FaTicketAlt className="me-2 text-primary" />
                                          Package:
                                        </span>
                                        <span className="fw-bold">{selectedPackage.name}</span>
                                      </div>
                                    </div>
                                  </Col>
                                  
                                  <Col md={4}>
                                    <div className="bg-primary text-white p-4 rounded-3 text-center h-100 d-flex flex-column justify-content-center">
                                      <div className="mb-2">
                                        <small className="opacity-75">Total Amount</small>
                                      </div>
                                      <h2 className="mb-0 fw-bold">
                                        ₹{calculateTotal().toFixed(0)}
                                      </h2>
                                      <div className="mt-2">
                                        <small className="opacity-75">All inclusive</small>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </div>
                        </Col>
                      )}

                      {/* Professional Submit Button */}
                      <Col xs={12}>
                        <div className="mt-4 d-grid">
                          <Button 
                            type="submit" 
                            size="lg" 
                            disabled={bookingConfirmed || loading}
                            className="py-3 fw-bold"
                            style={{
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              border: 'none',
                              fontSize: '18px',
                              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                            }}
                          >
                            {loading ? (
                              <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Processing...
                              </>
                            ) : bookingConfirmed ? (
                              <>
                                <FaCheckCircle className="me-2" />
                                Booking Confirmed
                              </>
                            ) : (
                              <>
                                <FaCreditCard className="me-2" />
                                Proceed to Secure Payment
                              </>
                            )}
                          </Button>
                          
                          <div className="text-center mt-3">
                            <small className="text-muted d-flex align-items-center justify-content-center">
                              <FaShieldAlt className="me-2 text-success" />
                              Secured by Razorpay • 256-bit SSL Encryption
                            </small>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </section>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaSignInAlt className="me-2 text-primary" />
            Login Required
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info" className="mb-4">
            <FaUser className="me-2" />
            Please login to proceed with your booking
          </Alert>

          {loginError && <Alert variant="danger">{loginError}</Alert>}

          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                <FaUser className="me-2" />
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginInputChange}
                placeholder="Enter your email"
                required
                className="py-2"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                <FaLock className="me-2" />
                Password
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your password"
                  required
                  className="py-2 pe-5"
                />
                <Button
                  variant="link"
                  className="position-absolute end-0 top-50 translate-middle-y border-0 text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ zIndex: 10 }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Logging In...
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="me-2" />
                    Login & Continue Booking
                  </>
                )}
              </Button>
              
              <Button
                variant="outline-secondary"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 text-primary fw-semibold"
                onClick={() => {
                  setShowLoginModal(false);
                  window.location.href = '/register';
                }}
              >
                Register here
              </Button>
            </small>
          </div>
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaTicketAlt className="me-2 text-primary" />
            Confirm Your Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6 className="fw-bold mb-3">Booking Details</h6>
              <p><strong>Package:</strong> {selectedPackage?.name}</p>
              <p><strong>Date:</strong> {bookingData.date}</p>
              <p><strong>Adults:</strong> {bookingData.adults}</p>
              <p><strong>Children:</strong> {bookingData.children}</p>
              <p><strong>Name:</strong> {bookingData.name}</p>
              <p><strong>Email:</strong> {bookingData.email}</p>
              <p><strong>Phone:</strong> {bookingData.phone}</p>
            </Col>
            <Col md={6}>
              <h6 className="fw-bold mb-3">Payment Summary</h6>
              <div className="bg-light p-3 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <span>Adults ({bookingData.adults})</span>
                  <span>₹{selectedPackage?.price} × {bookingData.adults} = ₹{(selectedPackage?.price * bookingData.adults).toFixed(0)}</span>
                </div>
                {bookingData.children > 0 && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Children ({bookingData.children})</span>
                    <span>₹{(selectedPackage?.price * 0.5).toFixed(0)} × {bookingData.children} = ₹{(selectedPackage?.price * 0.5 * bookingData.children).toFixed(0)}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total Amount:</strong>
                  <strong className="text-primary">₹{calculateTotal().toFixed(0)}</strong>
                </div>
                
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {error && <Alert variant="danger" className="w-100 mb-3">{error}</Alert>}
          <Button variant="secondary" onClick={() => setShowConfirmation(false)} disabled={loading}>
            Back to Edit
          </Button>
          <Button variant="primary" onClick={handlePayment} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Processing...
              </>
            ) : (
              <>
                <FaCreditCard className="me-2" />
                Pay ₹{calculateTotal().toFixed(0)}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Professional Ticket Modal */}
      <Modal show={showTicketModal} onHide={() => setShowTicketModal(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaTicketAlt className="me-2" />
            Your Ticket is Ready!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {ticketData && (
            <div ref={ticketRef} className="ticket-container">
              {/* Professional Ticket Design */}
              <div className="ticket bg-gradient" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'black',
                padding: '30px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  opacity: 0.1
                }} />
                
                {/* Header */}
                <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="bg-white bg-opacity-20 p-3 rounded-circle me-3">
                      <FaSwimmer className="fs-2" />
                    </div>
                    <div>
                      <h2 className="fw-bold mb-1" style={{color: 'black'}}>BALIRAJA WATER PARK</h2>
                      <p className="mb-0 opacity-75 fs-6" style={{color: 'black'}}>Your Gateway to Aquatic Adventure</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-3">
                    <Badge bg="success" className="px-4 py-2 fs-6 rounded-pill">
                      <FaCheckCircle className="me-2" />
                      CONFIRMED TICKET
                    </Badge>
                    <Badge bg="warning" text="dark" className="px-4 py-2 fs-6 rounded-pill">
                      <FaClock className="me-2" />
                      VALID FOR 1 DAY
                    </Badge>
                  </div>
                </div>

                {/* Ticket Details */}
                <Row className="g-4" style={{ position: 'relative', zIndex: 1 }}>
                  <Col md={8}>
                    <div className="bg-white bg-opacity-15 p-4 rounded-4 border border-white border-opacity-25">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-white bg-opacity-20 p-2 rounded-circle me-3">
                          <FaTicketAlt className="fs-5" />
                        </div>
                        <h5 className="fw-bold mb-0" style={{color: 'black'}}>Ticket Information</h5>
                      </div>
                      
                      <Row className="g-4">
                        <Col sm={6}>
                          <div className="ticket-info-item mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaQrcode className="me-2 text-warning" />
                              <small className="opacity-75 text-uppercase fw-semibold" style={{color: 'black'}}>Ticket Number</small>
                            </div>
                            <div className="fw-bold fs-4 font-monospace bg-white bg-opacity-20 px-3 py-2 rounded">{ticketData.ticketNumber}</div>
                          </div>
                          
                          <div className="ticket-info-item mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaUser className="me-2 text-warning" />
                              <small className="opacity-75 text-uppercase fw-semibold" style={{color: 'black'}}>Guest Name</small>
                            </div>
                            <div className="fw-bold fs-5" style={{color: 'black'}}>{ticketData.customerName}</div>
                          </div>
                          
                          <div className="ticket-info-item mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaStar className="me-2 text-warning" />
                              <small className="opacity-75 text-uppercase fw-semibold" style={{color: 'black'}}>Package</small>
                            </div>
                            <div className="fw-bold fs-5" style={{color: 'black'}}>{ticketData.packageName}</div>
                          </div>
                        </Col>
                        
                        <Col sm={6}>
                          <div className="ticket-info-item mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaCalendarAlt className="me-2 text-warning" />
                              <small className="opacity-75 text-uppercase fw-semibold" style={{color: 'black'}}>Visit Date</small>
                            </div>
                            <div className="fw-bold fs-5" style={{color: 'black'}}>{new Date(ticketData.visitDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                          </div>
                          
                          <div className="ticket-info-item mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaUsers className="me-2 text-warning" />
                              <small className="opacity-75 text-uppercase fw-semibold" style={{color: 'black'}}>Guests</small>
                            </div>
                            <div className="fw-bold fs-5">
                              <Badge bg="info" className="me-2">{ticketData.adults} Adult{ticketData.adults > 1 ? 's' : ''}</Badge>
                              {ticketData.children > 0 && <Badge bg="success">{ticketData.children} Child{ticketData.children > 1 ? 'ren' : ''}</Badge>}
                            </div>
                          </div>
                          
                          <div className="ticket-info-item mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaCreditCard className="me-2 text-warning" />
                              <small className="opacity-75 text-uppercase fw-semibold" style={{color: 'black'}}>Total Amount</small>
                            </div>
                            <div className="fw-bold fs-3 bg-white bg-opacity-20 px-3 py-2 rounded d-inline-block" style={{color: 'black'}}>₹{ticketData.totalAmount}</div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  
                  <Col md={4} className="text-center">
                    <div className="bg-white bg-opacity-95 p-4 rounded-4 border border-white border-opacity-50 h-100 d-flex flex-column justify-content-center">
                      <div className="mb-4">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                          <FaQrcode className="text-primary fs-2" />
                        </div>
                        <h6 className="fw-bold mb-2" style={{color: 'black'}}>Entry Pass</h6>
                        <small style={{color: 'black'}}>Present this at the gate</small>
                      </div>
                      
                      <div className="qr-code-container mb-4" style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '16px',
                        display: 'inline-block',
                        border: '3px solid #007bff',
                        boxShadow: '0 4px 12px rgba(0,123,255,0.15)'
                      }}>
                        {/* Enhanced QR Code Pattern */}
                        <div style={{
                          width: '140px',
                          height: '140px',
                          background: `
                            radial-gradient(circle at 20% 20%, #000 2px, transparent 2px),
                            radial-gradient(circle at 80% 20%, #000 2px, transparent 2px),
                            radial-gradient(circle at 20% 80%, #000 2px, transparent 2px),
                            radial-gradient(circle at 80% 80%, #000 2px, transparent 2px),
                            linear-gradient(45deg, #000 25%, transparent 25%),
                            linear-gradient(-45deg, #000 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, #000 75%),
                            linear-gradient(-45deg, transparent 75%, #000 75%)
                          `,
                          backgroundSize: '20px 20px, 20px 20px, 20px 20px, 20px 20px, 6px 6px, 6px 6px, 6px 6px, 6px 6px',
                          backgroundPosition: '0 0, 120px 0, 0 120px, 120px 120px, 0 0, 0 3px, 3px -3px, -3px 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          border: '4px solid #000',
                          borderRadius: '8px'
                        }}>
                          <div style={{
                            background: 'white',
                            padding: '12px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#000',
                            border: '2px solid #007bff',
                            fontFamily: 'monospace'
                          }}>
                            {ticketData.ticketNumber}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Badge bg="success" className="px-3 py-2 rounded-pill">
                          <FaCheckCircle className="me-1" />
                          Valid Entry Pass
                        </Badge>
                        <div className="small mt-2" style={{color: 'black'}}>
                          Scan at main entrance
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* Important Information */}
                <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-3" style={{ position: 'relative', zIndex: 1 }}>
                  <h6 className="fw-bold mb-2" style={{color: 'black'}}>
                    <FaShieldAlt className="me-2" />
                    Important Information
                  </h6>
                  <Row className="small" style={{color: 'black'}}>
                    <Col md={6}>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-1">• Arrive 15 minutes before entry time</li>
                        <li className="mb-1">• Carry a valid ID proof</li>
                        <li className="mb-1">• Outside food not allowed</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-1">• Proper swimming attire required</li>
                        <li className="mb-1">• Children must be supervised</li>
                        <li className="mb-1">• Ticket is non-transferable</li>
                      </ul>
                    </Col>
                  </Row>
                </div>

                {/* Footer */}
                <div className="text-center mt-4 pt-3 border-top border-white border-opacity-25" style={{ position: 'relative', zIndex: 1 }}>
                  <small className="opacity-75" style={{color: 'black'}}>
                    Booking Date: {ticketData.bookingDate} | Payment ID: {ticketData.paymentId}
                  </small>
                  <div className="mt-2">
                    <small className="opacity-75" style={{color: 'black'}}>
                      📞 Contact: +91 98765 43210 | 📧 info@balirajawaterpark.com
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <div className="d-flex gap-2 w-100 justify-content-center">
            <Button variant="outline-primary" onClick={downloadTicket} className="px-4">
              <FaDownload className="me-2" />
              Download PDF
            </Button>
            <Button variant="outline-secondary" onClick={printTicket} className="px-4">
              <FaPrint className="me-2" />
              Print Ticket
            </Button>
            <Button variant="primary" onClick={() => setShowTicketModal(false)} className="px-4">
              <FaCheck className="me-2" />
              Done
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Footer />
      
      {/* Ticket Availability Popup */}
      <TicketAvailabilityPopup 
        availableTickets={availableTickets}
        isSoldOut={isSoldOut}
        lastUpdated={lastUpdated}
      />
    </>
  );
};

export default BookingPage;
