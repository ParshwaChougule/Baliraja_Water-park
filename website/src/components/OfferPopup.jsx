import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import offerButtonImage from '../assets/offer-button.png';

const OfferPopup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  const handleBookNow = () => {
    setShow(false);
    if (currentUser) {
      navigate('/booking');
    } else {
      navigate('/login');
    }
  };

  const offerContainerStyle = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: 1000,
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
    width: '80px',
    height: '80px'
  };

  const offerImageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    objectFit: 'cover',
    transition: 'all 0.3s ease'
  };

  return (
    <>
      <div 
        style={offerContainerStyle}
        onClick={handleShow}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <img 
          src={offerButtonImage}
          alt="Special Offers"
          style={offerImageStyle}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 0 20px rgba(255, 193, 7, 0.8)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
          }}
        />
      </div>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Limited Time Offer!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="mb-3">
            <img 
              src="/images/offer-banner.jpg" 
              alt="Special Offer Details" 
              className="img-fluid rounded"
              style={{ maxHeight: '300px' }}
            />
          </div>
          <h4 className="text-primary mb-3">Visit our Water Park and get 20% discount!</h4>
          <p className="lead">For limited time only</p>
          <p className="text-muted">Book today to avail this offer!</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" size="lg" onClick={handleBookNow}>
            Book Now!
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OfferPopup;
