import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FaTicketAlt, FaSearch, FaCalendarAlt, FaUsers, FaRupeeSign, FaPhone, FaEnvelope, FaUser, FaSignInAlt } from 'react-icons/fa';
import { getBookingsFromRealtimeDB, listenToBookings } from '../services/realtimeDatabaseService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const BookingsDisplay = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name'); // name, phone, email
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load
    
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Set up real-time listener for bookings
    const unsubscribe = listenToBookings((bookingsData) => {
      // Filter bookings for current user only
      const userBookings = bookingsData.filter(booking => {
        // Match by user ID (if available) or email
        return booking.userId === currentUser.uid || 
               booking.userEmail === currentUser.email ||
               booking.email === currentUser.email;
      });
      
      setBookings(userBookings);
      setFilteredBookings(userBookings);
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser, authLoading]);

  useEffect(() => {
    // Filter bookings based on search term and type
    if (!searchTerm.trim()) {
      setFilteredBookings(bookings);
      return;
    }

    const filtered = bookings.filter(booking => {
      const searchValue = searchTerm.toLowerCase().trim();
      
      switch (searchType) {
        case 'name':
          return booking.name?.toLowerCase().includes(searchValue);
        case 'phone':
          return booking.phone?.includes(searchValue);
        case 'email':
          return booking.email?.toLowerCase().includes(searchValue);
        default:
          return false;
      }
    });

    setFilteredBookings(filtered);
  }, [searchTerm, searchType, bookings]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'warning', text: 'Pending' },
      confirmed: { variant: 'success', text: 'Confirmed' },
      cancelled: { variant: 'danger', text: 'Cancelled' },
      completed: { variant: 'info', text: 'Completed' }
    };

    const config = statusConfig[status] || { variant: 'secondary', text: status };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const handleViewTicket = (booking) => {
    // Navigate to booking page with ticket display
    navigate(`/booking?ticket=${booking.id}`, { 
      state: { 
        ticketData: {
          ticketNumber: booking.ticketNumber || booking.id,
          customerName: booking.name,
          customerEmail: booking.email,
          customerPhone: booking.phone,
          packageName: booking.packageName,
          visitDate: booking.visitDate,
          adults: booking.adults,
          children: booking.children,
          totalAmount: booking.totalAmount,
          paymentId: booking.paymentId,
          bookingDate: formatDate(booking.createdAt),
          status: booking.status
        }
      }
    });
  };

  const handleDownloadTicket = (booking) => {
    // For now, just show an alert - can be enhanced later
    alert(`QR Code for booking ${booking.ticketNumber || booking.id}\n\nShow this at the gate for entry.`);
  };

  if (authLoading || loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading bookings...</p>
        </div>
      </Container>
    );
  }

  // Show login prompt if user is not authenticated
  if (!currentUser) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Body className="text-center p-5">
                <div className="mb-4">
                  <FaUser className="display-4 text-primary mb-3" />
                  <h3 className="fw-bold text-primary">Login Required</h3>
                  <p className="text-muted mb-4">
                    Please log in to view your booking history and ticket details.
                  </p>
                </div>
                
                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={() => navigate('/booking')}
                    className="fw-semibold"
                  >
                    <FaSignInAlt className="me-2" />
                    Go to Login / Book Now
                  </Button>
                  
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/')}
                  >
                    Back to Home
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-light rounded">
                  <small className="text-muted">
                    <FaTicketAlt className="me-2" />
                    After logging in, you'll be able to:
                  </small>
                  <ul className="list-unstyled mt-2 mb-0 small text-muted">
                    <li>• View all your bookings</li>
                    <li>• Download ticket PDFs</li>
                    <li>• Check booking status</li>
                    <li>• Access QR codes for entry</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <div className="text-center mb-4">
            <h2 className="display-4 fw-bold text-primary">
              <FaTicketAlt className="me-3" />
              My Bookings
            </h2>
            <p className="lead text-muted">
              Welcome back, {currentUser.displayName || currentUser.email}! Here are your bookings.
            </p>
            <Badge bg="success" className="px-3 py-2">
              <FaUser className="me-1" />
              Logged in as {currentUser.email}
            </Badge>
          </div>
        </Col>
      </Row>

      {/* Search Section */}
      <Row className="mb-4">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="card-title mb-3">
                <FaSearch className="me-2" />
                Search Your Bookings ({bookings.length} total)
              </h5>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="name">Search by Name</option>
                    <option value="phone">Search by Phone</option>
                    <option value="email">Search by Email</option>
                  </Form.Select>
                </Col>
                <Col md={8} className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder={`Enter your ${searchType}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
              </Row>
              {searchTerm && (
                <small className="text-muted">
                  Found {filteredBookings.length} booking(s) matching your search
                </small>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Results Section */}
      {filteredBookings.length > 0 ? (
        <Row>
          {filteredBookings.map((booking) => (
            <Col lg={6} className="mb-4" key={booking.id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Header className="bg-primary text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                      <FaTicketAlt className="me-2" />
                      Booking #{booking.id?.slice(-8)?.toUpperCase() || 'N/A'}
                    </h6>
                    {getStatusBadge(booking.status)}
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col sm={6}>
                      <h6 className="text-primary">{booking.name}</h6>
                      <p className="mb-1">
                        <FaPhone className="me-2 text-muted" />
                        {booking.phone}
                      </p>
                      <p className="mb-1">
                        <FaEnvelope className="me-2 text-muted" />
                        {booking.email}
                      </p>
                    </Col>
                    <Col sm={6}>
                      <p className="mb-1">
                        <FaCalendarAlt className="me-2 text-muted" />
                        <strong>Visit Date:</strong> {booking.visitDate}
                      </p>
                      <p className="mb-1">
                        <FaUsers className="me-2 text-muted" />
                        <strong>Guests:</strong> {booking.adults} Adults, {booking.children} Children
                      </p>
                      <p className="mb-1">
                        <FaRupeeSign className="me-2 text-muted" />
                        <strong>Amount:</strong> {formatCurrency(booking.totalAmount)}
                      </p>
                    </Col>
                  </Row>
                  
                  {booking.packageName && (
                    <div className="mt-3 p-2 bg-light rounded">
                      <strong>Package:</strong> {booking.packageName}
                    </div>
                  )}
                  
                  {booking.specialRequests && (
                    <div className="mt-2 p-2 bg-light rounded">
                      <strong>Special Requests:</strong> {booking.specialRequests}
                    </div>
                  )}
                  
                  <div className="mt-3 text-muted small">
                    <strong>Booked on:</strong> {formatDate(booking.createdAt)}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-4 d-flex gap-2">
                    {booking.status === 'confirmed' && (
                      <>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => handleViewTicket(booking)}
                          className="flex-fill"
                        >
                          <FaTicketAlt className="me-1" />
                          View Ticket
                        </Button>
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          onClick={() => handleDownloadTicket(booking)}
                        >
                          <FaSearch className="me-1" />
                          QR Code
                        </Button>
                      </>
                    )}
                    
                    {booking.status === 'pending' && (
                      <Button 
                        variant="outline-warning" 
                        size="sm" 
                        disabled
                        className="flex-fill"
                      >
                        <FaCalendarAlt className="me-1" />
                        Processing...
                      </Button>
                    )}
                    
                    {(booking.status === 'cancelled' || booking.status === 'completed') && (
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => handleViewTicket(booking)}
                        className="flex-fill"
                      >
                        <FaTicketAlt className="me-1" />
                        View Details
                      </Button>
                    )}
                  </div>
                </Card.Body>
                
                {booking.status === 'confirmed' && (
                  <Card.Footer className="bg-success text-white text-center">
                    <small>
                      ✓ Your booking is confirmed! Please arrive on time with a valid ID.
                    </small>
                  </Card.Footer>
                )}
                
                {booking.status === 'pending' && (
                  <Card.Footer className="bg-warning text-dark text-center">
                    <small>
                      ⏳ Your booking is being processed. You'll receive confirmation soon.
                    </small>
                  </Card.Footer>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col lg={8} className="mx-auto">
            <Alert variant="info" className="text-center">
              <FaTicketAlt className="display-4 text-muted mb-3" />
              <h5>No bookings found</h5>
              <p className="mb-3">
                {searchTerm 
                  ? `No bookings found matching "${searchTerm}". Please check your ${searchType} and try again.`
                  : 'You haven\'t made any bookings yet. Ready to plan your visit?'
                }
              </p>
              
              <div className="d-flex gap-2 justify-content-center">
                {searchTerm && (
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>
                )}
                
                {!searchTerm && (
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/booking')}
                  >
                    <FaTicketAlt className="me-2" />
                    Book Now
                  </Button>
                )}
              </div>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Help Section */}
      <Row className="mt-5">
        <Col lg={8} className="mx-auto">
          <Card className="bg-light border-0">
            <Card.Body className="text-center">
              <h6 className="text-primary">Need Help?</h6>
              <p className="mb-0">
                If you can't find your booking or have any questions, please contact us at{' '}
                <a href="tel:+919876543210" className="text-decoration-none">+91 98765 43210</a> or{' '}
                <a href="mailto:info@balirajawaterpark.com" className="text-decoration-none">
                  info@balirajawaterpark.com
                </a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingsDisplay;
