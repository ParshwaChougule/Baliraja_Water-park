import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Nav, Tab, Alert, Modal, Form } from 'react-bootstrap';
import { 
  FaUsers, 
  FaTicketAlt, 
  FaEnvelope, 
  FaChartLine, 
  FaCalendarAlt, 
  FaRupeeSign,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaImages,
  FaSignOutAlt
} from 'react-icons/fa';
import { 
  getBookingsFromRealtimeDB, 
  getContactMessagesFromRealtimeDB, 
  updateBookingStatusInRealtimeDB,
  listenToBookings,
  listenToContactMessages,
  markMessageAsReadInRealtimeDB
} from '../services/realtimeDatabaseService';
import GalleryManager from './GalleryManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    totalMessages: 0
  });

  useEffect(() => {
    // Set up real-time listeners for Firebase Realtime Database
    const unsubscribeBookings = listenToBookings((bookingsData) => {
      setBookings(bookingsData);
      calculateStats(bookingsData);
    });

    const unsubscribeMessages = listenToContactMessages((messagesData) => {
      setMessages(messagesData);
    });

    setLoading(false);

    // Cleanup listeners on unmount
    return () => {
      unsubscribeBookings();
      unsubscribeMessages();
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load bookings from Realtime DB
      const bookingResult = await getBookingsFromRealtimeDB();
      if (bookingResult.success) {
        setBookings(bookingResult.bookings);
        calculateStats(bookingResult.bookings);
      }

      // Load messages from Realtime DB
      const messageResult = await getContactMessagesFromRealtimeDB();
      if (messageResult.success) {
        setMessages(messageResult.messages);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
    setLoading(false);
  };

  const calculateStats = (bookingData) => {
    const totalBookings = bookingData.length;
    const totalRevenue = bookingData.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
    const pendingBookings = bookingData.filter(booking => booking.status === 'pending').length;
    
    setStats({
      totalBookings,
      totalRevenue,
      pendingBookings,
      totalMessages: messages.length
    });
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const result = await updateBookingStatusInRealtimeDB(bookingId, newStatus);
      if (result.success) {
        // Real-time listener will automatically update the state
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const handleMarkMessageAsRead = async (messageId) => {
    await markMessageAsReadInRealtimeDB(messageId);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/';
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'success',
      cancelled: 'danger',
      completed: 'info'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
        `,
        animation: 'float 6s ease-in-out infinite',
        zIndex: 0
      }}></div>
      <Container fluid className="py-4" style={{ position: 'relative', zIndex: 1 }}>
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-lg" style={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h1 className="fw-bold mb-2" style={{ 
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: '2.5rem'
                    }}>
                      <FaChartLine className="me-3" style={{ color: '#667eea' }} />
                      Baliraja Agro Tourism
                    </h1>
                    <h3 className="text-primary mb-3">Admin Dashboard</h3>
                    <p className="text-muted fs-5">
                      <i className="fas fa-seedling me-2"></i>
                      Manage bookings, users, and monitor agro tourism operations
                    </p>
                  </div>
                  <Button 
                    variant="outline-danger" 
                    onClick={handleLogout} 
                    className="d-flex align-items-center px-4 py-2"
                    style={{ 
                      borderRadius: '25px',
                      transition: 'all 0.3s ease',
                      fontSize: '1.1rem'
                    }}
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Row>
          <Col md={3}>
            <Card className="border-0 shadow-lg" style={{ 
              background: 'linear-gradient(145deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <Card.Body className="p-3">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item className="mb-2">
                    <Nav.Link 
                      eventKey="overview"
                      className="rounded-pill px-3 py-2"
                      style={{ 
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem'
                      }}
                    >
                      <FaChartLine className="me-2" />
                      Overview
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mb-2">
                    <Nav.Link 
                      eventKey="bookings"
                      className="rounded-pill px-3 py-2"
                      style={{ 
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem'
                      }}
                    >
                      <FaTicketAlt className="me-2" />
                      Bookings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mb-2">
                    <Nav.Link 
                      eventKey="messages"
                      className="rounded-pill px-3 py-2"
                      style={{ 
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem'
                      }}
                    >
                      <FaEnvelope className="me-2" />
                      Messages
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mb-2">
                    <Nav.Link 
                      eventKey="gallery"
                      className="rounded-pill px-3 py-2"
                      style={{ 
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem'
                      }}
                    >
                      <FaImages className="me-2" />
                      Gallery
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mb-2">
                    <Nav.Link 
                      eventKey="users"
                      className="rounded-pill px-3 py-2"
                      style={{ 
                        transition: 'all 0.3s ease',
                        fontSize: '1.1rem'
                      }}
                    >
                      <FaUsers className="me-2" />
                      Users
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Tab.Content>
              {/* Overview Tab */}
              <Tab.Pane eventKey="overview">
                <Row className="g-4 mb-4">
                  <Col md={3}>
                    <Card className="text-center border-0 shadow-lg h-100" style={{ 
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      color: 'white',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <Card.Body className="p-4">
                        <FaTicketAlt className="fs-1 mb-3" style={{ opacity: 0.9 }} />
                        <h2 className="fw-bold mb-2">{stats.totalBookings}</h2>
                        <p className="mb-0 fs-6" style={{ opacity: 0.9 }}>Total Bookings</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="text-center border-0 shadow-lg h-100" style={{ 
                      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                      color: '#2c3e50',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <Card.Body className="p-4">
                        <FaRupeeSign className="fs-1 mb-3" style={{ opacity: 0.9 }} />
                        <h2 className="fw-bold mb-2">{formatCurrency(stats.totalRevenue)}</h2>
                        <p className="mb-0 fs-6" style={{ opacity: 0.9 }}>Total Revenue</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="text-center border-0 shadow-lg h-100" style={{ 
                      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                      color: '#2c3e50',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <Card.Body className="p-4">
                        <FaCalendarAlt className="fs-1 mb-3" style={{ opacity: 0.9 }} />
                        <h2 className="fw-bold mb-2">{stats.pendingBookings}</h2>
                        <p className="mb-0 fs-6" style={{ opacity: 0.9 }}>Pending Bookings</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={3}>
                    <Card className="text-center border-0 shadow-lg h-100" style={{ 
                      background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
                      color: '#2c3e50',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <Card.Body className="p-4">
                        <FaEnvelope className="fs-1 mb-3" style={{ opacity: 0.9 }} />
                        <h2 className="fw-bold mb-2">{stats.totalMessages}</h2>
                        <p className="mb-0 fs-6" style={{ opacity: 0.9 }}>Messages</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Card className="border-0 shadow-sm">
                      <Card.Header>
                        <h5 className="mb-0">Recent Bookings</h5>
                      </Card.Header>
                      <Card.Body>
                        {bookings.slice(0, 5).map((booking) => (
                          <div key={booking.id} className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                              <strong>{booking.name}</strong>
                              <br />
                              <small className="text-muted">{booking.packageDetails?.name}</small>
                            </div>
                            <div className="text-end">
                              {getStatusBadge(booking.status)}
                              <br />
                              <small>{formatCurrency(booking.totalAmount)}</small>
                            </div>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="border-0 shadow-sm">
                      <Card.Header>
                        <h5 className="mb-0">Recent Messages</h5>
                      </Card.Header>
                      <Card.Body>
                        {messages.slice(0, 5).map((message) => (
                          <div key={message.id} className="mb-3">
                            <div className="d-flex justify-content-between">
                              <strong>{message.name}</strong>
                              <small className="text-muted">{formatDate(message.createdAt)}</small>
                            </div>
                            <p className="mb-1 text-muted">{message.subject}</p>
                            <small className="text-muted">{message.email}</small>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab.Pane>

              {/* Bookings Tab */}
              <Tab.Pane eventKey="bookings">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">All Bookings</h5>
                    <Button variant="primary" size="sm" onClick={loadData}>
                      Refresh
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Package</th>
                          <th>Date</th>
                          <th>Guests</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id}>
                            <td><code>{booking.id}</code></td>
                            <td>
                              <div>
                                <strong>{booking.name}</strong>
                                <br />
                                <small className="text-muted">{booking.email}</small>
                              </div>
                            </td>
                            <td>{booking.packageDetails?.name || booking.package}</td>
                            <td>{booking.date}</td>
                            <td>{booking.guests}</td>
                            <td>{formatCurrency(booking.totalAmount)}</td>
                            <td>{getStatusBadge(booking.status)}</td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-1"
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setShowModal(true);
                                }}
                              >
                                <FaEye />
                              </Button>
                              {booking.status === 'pending' && (
                                <>
                                  <Button
                                    variant="outline-success"
                                    size="sm"
                                    className="me-1"
                                    onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                  >
                                    <FaCheck />
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                  >
                                    <FaTimes />
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Messages Tab */}
              <Tab.Pane eventKey="messages">
                <Card className="border-0 shadow-sm">
                  <Card.Header>
                    <h5 className="mb-0">Contact Messages</h5>
                  </Card.Header>
                  <Card.Body>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-4">
                              <div className="text-muted">
                                <FaEnvelope className="fs-1 mb-3" />
                                <p>No contact messages yet</p>
                                <small>Messages from contact form will appear here</small>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          messages.map((message) => (
                            <tr key={message.id} onClick={() => handleMarkMessageAsRead(message.id)} style={{ cursor: 'pointer' }}>
                              <td>{formatDate(message.createdAt)}</td>
                              <td>{message.name}</td>
                              <td>{message.email}</td>
                              <td>{message.subject}</td>
                              <td>
                                <div style={{ maxWidth: '200px' }}>
                                  {message.message?.substring(0, 100)}
                                  {message.message?.length > 100 && '...'}
                                </div>
                              </td>
                              <td>
                                <Badge bg={message.isRead ? 'success' : 'warning'}>
                                  {message.isRead ? 'read' : 'unread'}
                                </Badge>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Gallery Tab */}
              <Tab.Pane eventKey="gallery">
                <GalleryManager />
              </Tab.Pane>

              {/* Users Tab */}
              <Tab.Pane eventKey="users">
                <Card className="border-0 shadow-sm">
                  <Card.Header>
                    <h5 className="mb-0">User Management</h5>
                  </Card.Header>
                  <Card.Body>
                    <Alert variant="info">
                      <FaUsers className="me-2" />
                      User management features will be available once Firebase is properly configured.
                    </Alert>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Booking Detail Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <Row>
              <Col md={6}>
                <h6>Customer Information</h6>
                <p><strong>Name:</strong> {selectedBooking.name}</p>
                <p><strong>Email:</strong> {selectedBooking.email}</p>
                <p><strong>Phone:</strong> {selectedBooking.phone}</p>
                <p><strong>Guests:</strong> {selectedBooking.guests}</p>
              </Col>
              <Col md={6}>
                <h6>Booking Information</h6>
                <p><strong>Package:</strong> {selectedBooking.packageDetails?.name}</p>
                <p><strong>Date:</strong> {selectedBooking.date}</p>
                <p><strong>Amount:</strong> {formatCurrency(selectedBooking.totalAmount)}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedBooking.status)}</p>
              </Col>
              {selectedBooking.specialRequests && (
                <Col xs={12}>
                  <h6>Special Requests</h6>
                  <p>{selectedBooking.specialRequests}</p>
                </Col>
              )}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default AdminDashboard;
