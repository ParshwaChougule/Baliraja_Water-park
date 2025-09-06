import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { teamMembers } from '../data/waterParkData';

const TeamSection = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h4 className="text-primary mb-2">Our Baliraja Agro Tourism Dedicated Team Member</h4>
            <h2 className="display-5 fw-bold mb-4">Meet Our Team</h2>
            <p className="lead text-muted">
              Our experienced and passionate team is dedicated to ensuring you have 
              the best possible experience at Baliraja Agro Tourism.
            </p>
          </Col>
        </Row>

        <Row className="g-4 justify-content-center">
          {teamMembers.map((member) => (
            <Col lg={4} md={6} key={member.id}>
              <Card className="h-100 border-0 shadow-sm team-card text-center">
                <div className="team-image-wrapper position-relative overflow-hidden">
                  <Card.Img 
                    variant="top" 
                    src={member.image} 
                    alt={member.name}
                    style={{ height: '300px', objectFit: 'cover' }}
                    className="team-image"
                  />
                  <div className="team-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <div className="social-links d-flex gap-2">
                      <a href={member.social.facebook} className="btn btn-primary btn-sm rounded-circle">
                        <FaFacebookF />
                      </a>
                      <a href={member.social.twitter} className="btn btn-primary btn-sm rounded-circle">
                        <FaTwitter />
                      </a>
                      <a href={member.social.linkedin} className="btn btn-primary btn-sm rounded-circle">
                        <FaLinkedinIn />
                      </a>
                    </div>
                  </div>
                </div>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-2">{member.name}</h5>
                  <h6 className="text-primary mb-3">{member.position}</h6>
                  <p className="text-muted small">{member.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .team-card {
          transition: all 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .team-image {
          transition: all 0.3s ease;
        }
        .team-card:hover .team-image {
          transform: scale(1.1);
        }
        .team-overlay {
          background: rgba(13,110,253,0.8);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .team-card:hover .team-overlay {
          opacity: 1;
        }
        .social-links a {
          transform: translateY(20px);
          transition: all 0.3s ease;
        }
        .team-card:hover .social-links a {
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
