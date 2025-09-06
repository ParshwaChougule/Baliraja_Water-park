import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Badge, Spinner } from 'react-bootstrap';
import { FaTicketAlt, FaCalendarAlt, FaUsers, FaCreditCard, FaCheck, FaSignInAlt } from 'react-icons/fa';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { packages, parkInfo } from '../data/waterParkData';
import { saveBookingToRealtimeDB } from '../services/realtimeDatabaseService';
import { useAuth } from '../contexts/AuthContext';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const [bookingData, setBookingData] = useState({
    package: '',
    date: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [errors, setErrors] = useState({});
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-select package from URL parameter
  useEffect(() => {
    const packageId = searchParams.get('package');
    if (packageId) {
      setBookingData(prev => ({
        ...prev,
        package: packageId
      }));
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
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
    if (!bookingData.guests || bookingData.guests < 1) newErrors.guests = 'Please enter number of guests';
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
      return selectedPackage.price * bookingData.guests;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const confirmBooking = async () => {
    setLoading(true);
    setError('');
    
    try {
      const bookingDetails = {
        ...bookingData,
        userId: currentUser?.uid || null,
        userEmail: currentUser?.email || bookingData.email,
        totalAmount: calculateTotal(),
        packageDetails: selectedPackage
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
            {/* Package Selection */}
            <Col lg={4}>
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
            </Col>

            {/* Booking Form */}
            <Col lg={8}>
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

                      {/* Number of Guests */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            <FaUsers className="me-1" />
                            Number of Guests *
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="guests"
                            value={bookingData.guests}
                            onChange={handleInputChange}
                            min="1"
                            max="20"
                            isInvalid={!!errors.guests}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.guests}
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
                              <h6 className="fw-bold mb-3">Booking Summary</h6>
                              <Row>
                                <Col sm={6}>
                                  <p className="mb-1"><strong>Package:</strong> {selectedPackage.name}</p>
                                  <p className="mb-1"><strong>Date:</strong> {bookingData.date || 'Not selected'}</p>
                                  <p className="mb-1"><strong>Guests:</strong> {bookingData.guests}</p>
                                </Col>
                                <Col sm={6} className="text-sm-end">
                                  <p className="mb-1"><strong>Price per {selectedPackage.unit}:</strong> ₹{selectedPackage.price}</p>
                                  <h5 className="text-primary mb-0">
                                    <strong>Total: ₹{calculateTotal().toFixed(0)}</strong>
                                  </h5>
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
                            {bookingConfirmed ? 'Booking Confirmed' : 'Proceed to Payment'}
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
              <p><strong>Guests:</strong> {bookingData.guests}</p>
              <p><strong>Name:</strong> {bookingData.name}</p>
              <p><strong>Email:</strong> {bookingData.email}</p>
              <p><strong>Phone:</strong> {bookingData.phone}</p>
            </Col>
            <Col md={6}>
              <h6 className="fw-bold mb-3">Payment Summary</h6>
              <div className="bg-light p-3 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <span>{selectedPackage?.name}</span>
                  <span>₹{selectedPackage?.price} × {selectedPackage?.unit === 'family' ? '1' : bookingData.guests}</span>
                </div>
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
          <Button variant="primary" onClick={confirmBooking} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Processing...
              </>
            ) : (
              <>
                <FaCheck className="me-2" />
                Confirm & Pay
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
