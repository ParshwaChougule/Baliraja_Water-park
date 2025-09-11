import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../data/waterParkData';

const TestimonialsSection = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={index < rating ? 'text-warning' : 'text-muted'} 
      />
    ));
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h4 className="text-primary mb-2">Our Clients Reviews</h4>
            <h2 className="display-5 fw-bold mb-4">What Our Visitors Say</h2>
            <p className="lead text-muted">
              Don't just take our word for it - hear from our happy visitors who have 
              experienced the magic of Baliraja Agro Tourism firsthand.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {testimonials.map((testimonial) => (
            <Col lg={4} md={6} key={testimonial.id}>
              <Card className="h-100 border-0 shadow-sm testimonial-card">
                <Card.Body className="p-4 text-center">
                  <div className="testimonial-quote mb-3">
                    <FaQuoteLeft className="text-primary fs-2 opacity-25" />
                  </div>
                  
                  <div className="mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="text-muted mb-4 fst-italic">
                    "{testimonial.review}"
                  </p>
                  
                  <div className="testimonial-author">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="rounded-circle mb-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                    <small className="text-muted">{testimonial.position}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .testimonial-card {
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
