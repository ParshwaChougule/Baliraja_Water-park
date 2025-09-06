import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { parkInfo } from '../data/waterParkData';
import { saveContactMessageToRealtimeDB } from '../services/realtimeDatabaseService';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await saveContactMessageToRealtimeDB(formData);
      
      if (result.success) {
        setSuccess('Your message has been sent successfully! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h4 className="text-primary mb-2">Get In Touch</h4>
            <h2 className="display-5 fw-bold mb-4">Contact Us</h2>
            <p className="lead text-muted">
              Have questions about our attractions, packages, or planning your visit? 
              We're here to help make your Baliraja Agro Tourism experience unforgettable.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Contact Information */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Contact Information</h5>
                
                <div className="contact-item d-flex align-items-center mb-4">
                  <div className="contact-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px' }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Address</h6>
                    <p className="text-muted mb-0 small">{parkInfo.contact.address}</p>
                  </div>
                </div>

                <div className="contact-item d-flex align-items-center mb-4">
                  <div className="contact-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px' }}>
                    <FaPhone />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Phone</h6>
                    <p className="text-muted mb-0 small">{parkInfo.contact.phone}</p>
                  </div>
                </div>

                <div className="contact-item d-flex align-items-center mb-4">
                  <div className="contact-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px' }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="text-muted mb-0 small">{parkInfo.contact.email}</p>
                  </div>
                </div>

                <div className="contact-item d-flex align-items-center">
                  <div className="contact-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                       style={{ width: '50px', height: '50px' }}>
                    <FaClock />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Opening Hours</h6>
                    <p className="text-muted mb-1 small">Mon-Fri: {parkInfo.hours.weekdays}</p>
                    <p className="text-muted mb-0 small">Weekends: {parkInfo.hours.weekends}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Send us a Message</h5>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Enter subject"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Enter your message"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        className="px-4"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;
