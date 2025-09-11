import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { attractions } from '../data/waterParkData';

const AttractionsSection = () => {
  return (
    <section className="py-5">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h4 className="text-primary mb-2">Explore Baliraja Agro Tourism Attractions</h4>
            <h2 className="display-5 fw-bold mb-4">Amazing Water Attractions</h2>
            <p className="lead text-muted">
              Discover thrilling rides, exciting attractions, and fun activities 
              designed for all ages and adventure levels.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {attractions.map((attraction) => (
            <Col lg={4} md={6} key={attraction.id}>
              <Card className="h-100 border-0 shadow-sm attraction-card">
                <div className="attraction-image-wrapper position-relative overflow-hidden">
                  <Card.Img 
                    variant="top" 
                    src={attraction.image} 
                    alt={attraction.name}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="attraction-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end">
                    <div className="p-3 w-100">
                      <Badge bg="primary" className="mb-2">
                        {attraction.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">{attraction.name}</h5>
                  <p className="text-muted mb-0">{attraction.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .attraction-card {
          transition: all 0.3s ease;
        }
        .attraction-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }
        .attraction-overlay {
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          opacity: 0;
          transition: all 0.3s ease;
        }
        .attraction-card:hover .attraction-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default AttractionsSection;
