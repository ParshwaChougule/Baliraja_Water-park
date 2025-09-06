import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaTrophy, FaUsers, FaWater, FaGift } from 'react-icons/fa';
import { features } from '../data/waterParkData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FeaturesSection = () => {
  const [sectionRef, isVisible] = useScrollAnimation();

  const getFeatureIcon = (featureId) => {
    const iconMap = {
      1: <FaTrophy />,
      2: <FaUsers />,
      3: <FaWater />,
      4: <FaGift />
    };
    return iconMap[featureId] || <FaTrophy />;
  };

  return (
    <section className="py-5 bg-light section-divider" ref={sectionRef}>
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h4 className={`text-primary mb-2 ${isVisible ? 'animate-fadeInUp' : 'animate-on-scroll'}`}>Why Choose Baliraja Agro Tourism</h4>
            <h2 className={`display-5 fw-bold mb-4 ${isVisible ? 'animate-fadeInUp' : 'animate-on-scroll'}`} style={{animationDelay: '0.2s'}}>Amazing Features</h2>
            <p className={`lead text-muted ${isVisible ? 'animate-fadeInUp' : 'animate-on-scroll'}`} style={{animationDelay: '0.4s'}}>
              Discover what makes Baliraja Agro Tourism the ultimate destination for family fun and adventure
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {features.map((feature, index) => (
            <Col lg={3} md={6} key={feature.id}>
              <Card className={`h-100 border-0 shadow-sm text-center card-hover-lift ${isVisible ? 'stagger-animation' : 'animate-on-scroll-zoom'}`} style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                <Card.Body className="p-4">
                  <div className="feature-icon mb-3">
                    <div className="icon-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center rounded-circle float-animation" style={{width: '80px', height: '80px', animationDelay: `${index * 0.5}s`}}>
                      <div className="text-primary" style={{fontSize: '2rem'}}>
                        {getFeatureIcon(feature.id)}
                      </div>
                    </div>
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Stats Section */}
        <Row className="mt-5 pt-5">
          <Col lg={3} md={6} className="text-center mb-4">
            <div className="stat-counter">
              <h2 className="display-4 fw-bold text-primary mb-0">20+</h2>
              <p className="text-muted">Years Experience</p>
            </div>
          </Col>
          <Col lg={3} md={6} className="text-center mb-4">
            <div className="stat-counter">
              <h2 className="display-4 fw-bold text-primary mb-0">50+</h2>
              <p className="text-muted">Water Attractions</p>
            </div>
          </Col>
          <Col lg={3} md={6} className="text-center mb-4">
            <div className="stat-counter">
              <h2 className="display-4 fw-bold text-primary mb-0">1M+</h2>
              <p className="text-muted">Happy Visitors</p>
            </div>
          </Col>
          <Col lg={3} md={6} className="text-center mb-4">
            <div className="stat-counter">
              <h2 className="display-4 fw-bold text-primary mb-0">100%</h2>
              <p className="text-muted">Safety Guaranteed</p>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .hover-card {
          transition: all 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        .feature-icon {
          transition: all 0.3s ease;
        }
        .hover-card:hover .feature-icon {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
