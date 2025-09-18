import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
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
    <section className="py-5 position-relative" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${process.env.PUBLIC_URL}/images/hero/wasif-mujahid-rkuaIT4D7y4-unsplash.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      color: 'white',
      minHeight: '100vh',
      position: 'relative',
      padding: '4rem 0'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }}></div>
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h4 className="text-primary mb-2">Explore Baliraja Park Services</h4>
            <h2 className="display-5 fw-bold mb-4 text-white">Premium Services & Facilities</h2>
            <p className="lead text-white-50">
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
                  {service.carousel ? (
                    <Carousel interval={3000} controls={true} indicators={true}>
                      {service.carousel.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt={`${service.title} ${index + 1}`}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div style={{ 
                      height: '200px', 
                      backgroundImage: `url(${process.env.PUBLIC_URL}${service.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }} 
                    onError={(e) => {
                      console.error('Failed to load image:', service.image);
                      e.target.style.backgroundImage = 'linear-gradient(45deg, #f3f4f6 25%, #e5e7eb 25%, #e5e7eb 50%, #f3f4f6 50%, #f3f4f6 75%, #e5e7eb 75%, #e5e7eb 100%)';
                      e.target.style.display = 'flex';
                      e.target.style.alignItems = 'center';
                      e.target.style.justifyContent = 'center';
                      e.target.style.color = '#6b7280';
                      e.target.textContent = 'Image not found';
                    }}
                    title={service.title}
                    ></div>
                  )}
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
