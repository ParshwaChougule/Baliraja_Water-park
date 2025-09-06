import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUmbrella, FaUtensils, FaLock, FaWater } from 'react-icons/fa';
import { services } from '../data/waterParkData';

const ServicesSection = () => {
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'gazebo': return <FaUmbrella />;
      case 'food': return <FaUtensils />;
      case 'locker': return <FaLock />;
      case 'water': return <FaWater />;
      default: return <FaWater />;
    }
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h4 className="text-primary mb-2">Explore Waterland Park Services</h4>
            <h2 className="display-5 fw-bold mb-4">Premium Services & Facilities</h2>
            <p className="lead text-muted">
              Enjoy world-class amenities and services designed to make your visit 
              comfortable, safe, and unforgettable.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {services.map((service) => (
            <Col lg={6} xl={3} key={service.id}>
              <Card className="h-100 border-0 shadow-sm service-card">
                <div className="service-image-wrapper position-relative overflow-hidden">
                  <Card.Img 
                    variant="top" 
                    src={service.image} 
                    alt={service.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="service-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <div className="service-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                         style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                      {getIcon(service.icon)}
                    </div>
                  </div>
                </div>
                <Card.Body className="p-4 text-center">
                  <h5 className="fw-bold mb-3">{service.title}</h5>
                  <p className="text-muted mb-4">{service.description}</p>
                  <Button variant="outline-primary" size="sm">
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .service-card {
          transition: all 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important;
        }
        .service-image-wrapper {
          position: relative;
        }
        .service-overlay {
          background: rgba(0,0,0,0.7);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .service-card:hover .service-overlay {
          opacity: 1;
        }
        .service-icon {
          transform: scale(0.8);
          transition: all 0.3s ease;
        }
        .service-card:hover .service-icon {
          transform: scale(1);
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
