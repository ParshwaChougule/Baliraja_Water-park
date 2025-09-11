import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaCheck, FaStar, FaTicketAlt } from 'react-icons/fa';
import { packages } from '../data/waterParkData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PackagesSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section className="py-5 bg-light section-divider" ref={sectionRef}>
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h4 className={`text-primary mb-2 ${isVisible ? 'animate-fadeInUp' : 'animate-on-scroll'}`}>Choose The Best Packages For Your Family</h4>
            <h2 className={`display-5 fw-bold mb-4 ${isVisible ? 'animate-fadeInUp' : 'animate-on-scroll'}`} style={{animationDelay: '0.2s'}}>Ticket Packages</h2>
            <p className="lead text-muted">
              Select from our carefully crafted packages designed to give you the best 
              value and experience at Baliraja Agro Tourism.
            </p>
          </Col>
        </Row>

        <Row className="g-4 justify-content-center">
          {packages.map((pkg) => (
            <Col lg={4} md={6} key={pkg.id}>
              <Card className={`h-100 border-0 shadow-sm package-card card-hover-glow ${pkg.popular ? 'border-primary' : ''} ${isVisible ? 'stagger-animation' : 'animate-on-scroll-zoom'}`} style={{animationDelay: `${0.4 + pkg.id * 0.2}s`}}>
                {pkg.popular && (
                  <div className="position-absolute top-0 start-50 translate-middle animate-bounce">
                    <Badge bg="warning" className="px-3 py-2">
                      <FaStar className="me-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={pkg.image} 
                    style={{ height: '200px', objectFit: 'cover' }}
                    className="hero-image-animation"
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <Badge bg="dark" className="fs-6 px-3 py-2 animate-pulse">
                      ₹{pkg.price}
                      <small className="d-block">{pkg.unit}</small>
                    </Badge>
                  </div>
                </div>

                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h4 className="fw-bold mb-2">{pkg.name}</h4>
                    <div className="price-display">
                      <span className="h2 fw-bold text-primary booking-total">₹{pkg.price}</span>
                      <span className="text-muted">/{pkg.unit}</span>
                    </div>
                  </div>

                  <ul className="list-unstyled mb-4">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="d-flex align-items-center mb-2">
                        <FaCheck className="text-success me-2 flex-shrink-0" />
                        <span className="text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                      <LinkContainer to={{ pathname: "/booking", search: `?package=${pkg.id}` }}>
                        <Button 
                          variant={pkg.popular ? "primary" : "outline-primary"} 
                          className="w-100 btn-animated d-flex align-items-center justify-content-center"
                          size="lg"
                        >
                          <FaTicketAlt className="me-2" />
                          <span>Book Now - ₹{pkg.price}</span>
                        </Button>
                      </LinkContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .package-card {
          transition: all 0.3s ease;
          position: relative;
        }
        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .popular-package {
          border: 2px solid #ffc107 !important;
          margin-top: 20px;
        }
        .package-overlay {
          background: linear-gradient(45deg, rgba(13,110,253,0.8), rgba(25,135,84,0.8));
          opacity: 0;
          transition: all 0.3s ease;
        }
        .package-card:hover .package-overlay {
          opacity: 1;
        }
        .price-display {
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
  );
};

export default PackagesSection;
