import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaUsers, FaRupeeSign, FaSave } from 'react-icons/fa';
import { packages } from '../data/waterParkData';
import { saveBookingToRealtimeDB } from '../services/realtimeDatabaseService';

const AdminBookingForm = ({ onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packageId: '',
    date: new Date().toISOString().split('T')[0],
    guests: 1,
    specialRequests: '',
    paymentMethod: 'cash',
    status: 'confirmed'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Update selected package when packageId changes
  useEffect(() => {
    if (formData.packageId) {
      const pkg = packages.find(p => p.id === formData.packageId);
      setSelectedPackage(pkg);
    } else {
      setSelectedPackage(null);
    }
  }, [formData.packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    return selectedPackage.price * formData.guests;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const bookingData = {
        ...formData,
        packageDetails: selectedPackage,
        totalAmount: calculateTotal(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        paymentDetails: {
          status: formData.paymentMethod === 'cash' ? 'pending' : 'completed',
          method: formData.paymentMethod,
          timestamp: new Date().toISOString()
        }
      };

      const result = await saveBookingToRealtimeDB(bookingData);
      
      if (result.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          packageId: '',
          date: new Date().toISOString().split('T')[0],
          guests: 1,
          specialRequests: '',
          paymentMethod: 'cash',
          status: 'confirmed'
        });
        
        // Notify parent component
        if (onBookingSuccess) {
          onBookingSuccess(result.booking);
        }
        
        // Show success message
        alert('Booking created successfully!');
      } else {
        throw new Error(result.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">Create New Booking</h5>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label><FaUser className="me-2" /> Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter customer name"
                />
              </Form.Group>
            </Col>
            
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label><FaEnvelope className="me-2" /> Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                />
              </Form.Group>
            </Col>
            
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label><FaPhone className="me-2" /> Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                />
              </Form.Group>
            </Col>
            
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label><FaCalendarAlt className="me-2" /> Visit Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Package</Form.Label>
                <Form.Select
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a package</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} (₹{pkg.price} per person)
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label><FaUsers className="me-2" /> Number of Guests</Form.Label>
                <Form.Control
                  type="number"
                  name="guests"
                  min="1"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Payment Method</Form.Label>
                <Form.Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="online">Online Payment</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Booking Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col xs={12} className="mb-3">
              <Form.Group>
                <Form.Label>Special Requests</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests or notes..."
                />
              </Form.Group>
            </Col>
            
            {selectedPackage && (
              <Col xs={12} className="mb-3">
                <Card className="bg-light">
                  <Card.Body>
                    <h6>Booking Summary</h6>
                    <p className="mb-1">Package: {selectedPackage.name}</p>
                    <p className="mb-1">Price per person: ₹{selectedPackage.price}</p>
                    <p className="mb-1">Number of guests: {formData.guests}</p>
                    <hr />
                    <h5>
                      <FaRupeeSign className="me-1" />
                      <strong>Total: ₹{calculateTotal()}</strong>
                    </h5>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
          
          <div className="d-flex justify-content-end">
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
              className="px-4"
            >
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="me-2" />
                  Create Booking
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AdminBookingForm;
