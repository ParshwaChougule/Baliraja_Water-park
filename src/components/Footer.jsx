import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { parkInfo } from '../data/waterParkData';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="g-4">
          {/* Company Info */}
          <Col lg={3} md={6}>
            <h4 className="text-primary mb-3">{parkInfo.name}</h4>
            <p className="text-light opacity-75 mb-4">
              {parkInfo.description}
            </p>
            <div className="d-flex gap-2">
              <a href="#" className="btn btn-outline-primary btn-sm rounded-circle p-2">
                <FaFacebookF />
              </a>
              <a href="#" className="btn btn-outline-primary btn-sm rounded-circle p-2">
                <FaTwitter />
              </a>
              <a href="#" className="btn btn-outline-primary btn-sm rounded-circle p-2">
                <FaInstagram />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-light text-decoration-none opacity-75 hover-link">Home</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-light text-decoration-none opacity-75 hover-link">About</a>
              </li>
              <li className="mb-2">
                <a href="/service" className="text-light text-decoration-none opacity-75 hover-link">Services</a>
              </li>
              <li className="mb-2">
                <a href="/attractions" className="text-light text-decoration-none opacity-75 hover-link">Attractions</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-light text-decoration-none opacity-75 hover-link">Contact</a>
              </li>
              <li className="mb-2">
                <a href="/admin/login" className="text-warning text-decoration-none opacity-75 hover-link">Admin Panel</a>
              </li>
            </ul>
          </Col>

          {/* Pages */}
          <Col lg={2} md={6}>
            <h5 className="mb-3">Pages</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/features" className="text-light text-decoration-none opacity-75 hover-link">Features</a>
              </li>
              <li className="mb-2">
                <a href="/gallery" className="text-light text-decoration-none opacity-75 hover-link">Gallery</a>
              </li>
              <li className="mb-2">
                <a href="/team" className="text-light text-decoration-none opacity-75 hover-link">Our Team</a>
              </li>
              <li className="mb-2">
                <a href="/testimonial" className="text-light text-decoration-none opacity-75 hover-link">Testimonials</a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-light text-decoration-none opacity-75 hover-link">Blog</a>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6}>
            <h5 className="mb-3">Contact Info</h5>
            <div className="contact-info">
              <div className="d-flex align-items-center mb-3">
                <FaMapMarkerAlt className="text-primary me-3" />
                <span className="text-light opacity-75">{parkInfo.contact.address}</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaPhone className="text-primary me-3" />
                <span className="text-light opacity-75">{parkInfo.contact.phone}</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaEnvelope className="text-primary me-3" />
                <span className="text-light opacity-75">{parkInfo.contact.email}</span>
              </div>
            </div>
          </Col>

          {/* Opening Hours */}
          <Col lg={2} md={6}>
            <h5 className="mb-3">Opening Hours</h5>
            <div className="opening-hours">
              <div className="mb-2">
                <div className="text-primary fw-semibold">Monday - Friday</div>
                <div className="text-light opacity-75 small">{parkInfo.hours.weekdays}</div>
              </div>
              <div className="mb-2">
                <div className="text-primary fw-semibold">Weekends</div>
                <div className="text-light opacity-75 small">{parkInfo.hours.weekends}</div>
              </div>
              <div className="mb-2">
                <div className="text-primary fw-semibold">Holidays</div>
                <div className="text-light opacity-75 small">{parkInfo.hours.holidays}</div>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="my-4 opacity-25" />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p className="mb-0 text-light opacity-75">
              &copy; 2025 {parkInfo.name}. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0 text-light opacity-75">
              Designed By <a href="https://www.infoyashonand.com/" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">
                www.infoyashonand.com
              </a>
            </p>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .hover-link:hover {
          opacity: 1 !important;
          color: #0d6efd !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
