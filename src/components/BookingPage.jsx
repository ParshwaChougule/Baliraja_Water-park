import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Badge, Spinner, ListGroup } from 'react-bootstrap';
import { FaTicketAlt, FaCalendarAlt, FaUsers, FaCreditCard, FaCheck, FaSignInAlt, FaUser, FaLock, FaEye, FaEyeSlash, FaSwimmer, FaWater, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChild, FaUserFriends } from 'react-icons/fa';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { packages, parkInfo } from '../data/waterParkData';
import { saveBookingToRealtimeDB } from '../services/realtimeDatabaseService';
import { useAuth } from '../contexts/AuthContext';

const BookingPage = () => {
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    
    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    const options = {
      key: 'rzp_test_9WaeLLXtGwlkMq', // Replace with your Razorpay key
      amount: calculateTotal() * 100, // Amount in paise
      currency: 'INR',
      name: 'Baliraja Agro Tourism',
      description: `${selectedPackage?.name} - Water Park Booking`,
      image: '/logo192.png',
      handler: function (response) {
        // Payment successful
        confirmBooking(response.razorpay_payment_id);
      },
      prefill: {
        name: bookingData.name,
        email: bookingData.email,
        contact: bookingData.phone,
      },
      notes: {
        package: selectedPackage?.name,
        date: bookingData.date,
        adults: bookingData.adults,
        children: bookingData.children,
      },
      theme: {
        color: '#0d6efd',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Check if user is logged in
      if (!currentUser) {
        // Show login modal if user is not logged in
        setShowLoginModal(true);
      } else {
        // Proceed to confirmation if user is logged in
        setShowConfirmation(true);
      }
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
      setLoginError(result.error);
    }
    
    setLoginLoading(false);
  };

  const confirmBooking = async (paymentId = null) => {
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
        paymentStatus: paymentId ? 'completed' : 'pending'
      };

      const result = await saveBookingToRealtimeDB(bookingDetails);
      
      if (result.success) {
        setBookingId(result.id);
        setBookingConfirmed(true);
        setShowConfirmation(false);
      } else {
        setError(result.error || 'Failed to confirm booking. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  const selectedPackage = packages.find(pkg => pkg.id === parseInt(bookingData.package));

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

            {/* Booking Form */}
            <Col lg={7}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">
                    <FaCalendarAlt className="me-2" />
                    Booking Details
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      {/* Date Selection */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Visit Date *</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={bookingData.date}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            isInvalid={!!errors.date}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.date}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      {/* Number of Adults */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            <FaUserFriends className="me-1" />
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
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.adults}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      {/* Number of Children */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            <FaChild className="me-1" />
                            Children (50% discount)
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="children"
                            value={bookingData.children}
                            onChange={handleInputChange}
                            min="0"
                            max="20"
                            isInvalid={!!errors.children}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.children}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      {/* Personal Information */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={bookingData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            isInvalid={!!errors.name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={bookingData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Phone Number *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={bookingData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            isInvalid={!!errors.phone}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Special Requests</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="specialRequests"
                            value={bookingData.specialRequests}
                            onChange={handleInputChange}
                            placeholder="Any special requirements or requests..."
                          />
                        </Form.Group>
                      </Col>

                      {/* Booking Summary */}
                      {selectedPackage && (
                        <Col xs={12}>
                          <Card className="bg-light border-0">
                            <Card.Body>
                              <h6 className="fw-bold mb-3">Book Now</h6>
                              <Row>
                                <Col sm={8}>
                                  <div className="mb-2">
                                    <strong>Adults ({bookingData.adults} x ₹{selectedPackage.price}):</strong>
                                    <span className="float-end">₹{(selectedPackage.price * bookingData.adults).toFixed(0)}</span>
                                  </div>
                                  {bookingData.children > 0 && (
                                    <div className="mb-2">
                                      <strong>Children ({bookingData.children} x ₹{(selectedPackage.price * 0.5).toFixed(0)}):</strong>
                                      <span className="float-end">₹{(selectedPackage.price * 0.5 * bookingData.children).toFixed(0)}</span>
                                    </div>
                                  )}
                                  <hr />
                                  <div className="mb-2">
                                    <strong>Date:</strong> {bookingData.date || 'Not selected'}
                                  </div>
                                </Col>
                                <Col sm={4} className="text-end">
                                  <h4 className="text-primary mb-0">
                                    <strong>Total: ₹{calculateTotal().toFixed(0)}</strong>
                                  </h4>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </Col>
                      )}

                      <Col xs={12}>
                        <div className="d-grid">
                          <Button type="submit" variant="primary" size="lg" disabled={bookingConfirmed}>
                            <FaCreditCard className="me-2" />
                            {bookingConfirmed ? 'Booking Confirmed' : 'Book Now & Pay'}
                          </Button>
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
                <div className="d-flex justify-content-between">
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

      <Footer />
    </>
  );
};

export default BookingPage;
