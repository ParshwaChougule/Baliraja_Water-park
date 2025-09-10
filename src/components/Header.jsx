import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUser, FaSignOutAlt, FaChartLine, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { parkInfo } from '../data/waterParkData';

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-primary text-white py-2 d-none d-md-block">
        <Container>
          <marquee behavior="scroll" direction="left" scrollamount="5">
            <div className="d-flex align-items-center" style={{ whiteSpace: 'nowrap' }}>
              <small className="me-4">
                <FaPhone className="me-1" /> {parkInfo.contact.phone}
              </small>
              <small className="me-4">
                <FaEnvelope className="me-1" /> {parkInfo.contact.email}
              </small>
              <small className="me-4">
                <FaClock className="me-1" /> Open: {parkInfo.hours.weekdays}
              </small>
              <small>
                <FaMapMarkerAlt className="me-1" /> {parkInfo.contact.address}
              </small>
            </div>
          </marquee>
        </Container>
      </div>

      {/* Main Navigation */}
      <Navbar bg="white" expand="lg" className="shadow-sm sticky-top py-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold fs-2 text-primary">
              {parkInfo.name}
              <div className="fs-6 text-muted fw-normal">{parkInfo.tagline}</div>
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-4">
              <LinkContainer to="/">
                <Nav.Link className="fw-semibold">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link className="fw-semibold">About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/service">
                <Nav.Link className="fw-semibold">Services</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Activities" id="activities-dropdown" className="fw-semibold">
                <LinkContainer to="/water-activity">
                  <NavDropdown.Item>
                    <span className="me-2">🏊‍♂️</span>
                    Water Activity
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/fun-activity">
                  <NavDropdown.Item>
                    <span className="me-2">🎮</span>
                    Fun Activity
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/garden-activity">
                  <NavDropdown.Item>
                    <span className="me-2">🍃</span>
                    Garden Activity
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/gallery">
                  <NavDropdown.Item>All Gallery</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <NavDropdown title="Pages" id="pages-dropdown" className="fw-semibold">
                <LinkContainer to="/features">
                  <NavDropdown.Item>Our Features</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/attractions">
                  <NavDropdown.Item>Attractions</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/team">
                  <NavDropdown.Item>Our Team</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/testimonial">
                  <NavDropdown.Item>Testimonials</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/blog">
                <Nav.Link className="fw-semibold">Blog</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link className="fw-semibold">Contact</Nav.Link>
              </LinkContainer>
            </Nav>
            <div className="d-flex gap-2 align-items-center">
              <LinkContainer to="/packages">
                <Button variant="outline-primary" size="sm">
                  View Packages
                </Button>
              </LinkContainer>
              <LinkContainer to="/booking">
                <Button variant="primary" size="sm">
                  Book Now
                </Button>
              </LinkContainer>
              
              {currentUser ? (
                <NavDropdown 
                  title={
                    <span>
                      <FaUser className="me-1" />
                      {currentUser.displayName || 'User'}
                    </span>
                  } 
                  id="user-nav-dropdown"
                  className="ms-2"
                >
                  <NavDropdown.Item disabled>
                    {currentUser.email}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="d-flex gap-2 ms-2">
                  <LinkContainer to="/login">
                    <Button variant="outline-secondary" size="sm">
                      Login
                    </Button>
                  </LinkContainer>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
