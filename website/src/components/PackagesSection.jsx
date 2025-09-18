import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaCheck, FaStar } from 'react-icons/fa';
import { packages } from '../data/waterParkData';
import { motion } from 'framer-motion';

const PackagesSection = () => {
  const { currentUser } = useAuth();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-5" style={{
      background: 'linear-gradient(160deg, #005b96, #0093e9, #80d0c7, #e0f7fa)',
      backgroundSize: '300% 300%',
      animation: 'gradientBG 12s ease infinite',
      color: 'white',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 150px rgba(0, 100, 150, 0.3)',
      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
    }}>
{/* Right Vine Animation - Positioned next to cards */}
      {/* Left Side Waterslide Animation */}
      <div style={{
        position: 'absolute',
        left: '-100px',
        top: '0',
        height: '100%',
        width: '300px',
        zIndex: 1,
        overflow: 'visible',
        pointerEvents: 'none',
        opacity: 0.9,
        transform: 'scale(0.8) translateY(-50px)'
      }}>
        <img 
          src="/images/animations/waterslide-animation.svg" 
          alt="Waterslide Animation" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'left center',
            filter: 'drop-shadow(0 0 20px rgba(0, 180, 255, 0.6))',
            animation: 'pulse 3s ease-in-out infinite'
          }}
          onError={(e) => {
            console.error('Error loading waterslide animation:', e);
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Right Vine */}
      <div className="vine-animation right-vine" style={{
        position: 'absolute',
        right: '0',
        top: '0',
        height: '100%',
        width: '150px',
        zIndex: 1,
        opacity: 1,
        filter: 'drop-shadow(0 0 10px rgba(0,100,0,0.6))',
        transform: 'translateX(50%) scaleX(-1)',
        transformOrigin: 'top center',
        overflow: 'hidden',
        marginTop: '0'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%'
        }}>
          <svg width="100%" height="100%" viewBox="0 0 100 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0C50 30 40 50 30 70C20 90 40 120 30 150C20 180 60 200 50 250C40 290 30 300 30 300" 
                  stroke="#2E8B57" 
                  strokeWidth="10" 
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="500"
                  strokeDashoffset="500">
              <animate 
                attributeName="stroke-dashoffset" 
                from="500" 
                to="0" 
                dur="8s" 
                begin="0s"
                fill="freeze"
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </path>
            <g className="leaf-group">
              <path d="M30 70L10 50L15 90Z" fill="#32CD32" opacity="0">
                <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.5s" fill="freeze" />
              </path>
              <path d="M40 120L60 100L55 140Z" fill="#228B22" opacity="0">
                <animate attributeName="opacity" values="0;1" dur="0.5s" begin="3s" fill="freeze" />
              </path>
              <path d="M30 200L10 180L15 220Z" fill="#006400" opacity="0">
                <animate attributeName="opacity" values="0;1" dur="0.5s" begin="4.5s" fill="freeze" />
              </path>
              <path d="M50 250L70 230L65 270Z" fill="#228B22" opacity="0">
                <animate attributeName="opacity" values="0;1" dur="0.5s" begin="6s" fill="freeze" />
              </path>
            </g>
          </svg>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .vine-animation {
          pointer-events: none;
        }
        
        .right-vine {
          animation: 
            swayRight 15s ease-in-out infinite,
            floatUpDown 10s ease-in-out infinite 1s;
          mask-image: none;
          -webkit-mask-image: none;
          pointer-events: none;
        }
        
        @keyframes swayLeft {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-10px); }
        }
        
        @keyframes swayRight {
          0%, 100% { transform: scaleX(-1) rotate(-5deg) translateY(0); }
          50% { transform: scaleX(-1) rotate(5deg) translateY(-10px); }
        }
        
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .leaf-group path {
          transform-origin: center;
          animation: leafWiggle 3s ease-in-out infinite;
        }
        
        @keyframes leafWiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        
        .package-card {
          transition: all 0.3s ease;
          border-radius: 12px;
          overflow: hidden;
          height: 100%;
        }
        
        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important;
        }
        
        .popular-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 1;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="mb-5 text-center"
        >
          <motion.h4 
            className="text-primary mb-3"
            variants={item}
          >
            Choose The Best Packages For Your Family
          </motion.h4>
          <motion.h2 
            className="display-5 fw-bold mb-4"
            variants={item}
          >
            Ticket Packages
          </motion.h2>
          <motion.p 
            className="lead text-white-50 mb-5"
            variants={item}
          >
            Select from our carefully crafted packages designed to give you the best 
            value and experience at Baliraja Agro Tourism.
          </motion.p>
        </motion.div>

        <motion.div 
          className="row g-4 justify-content-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          {packages.map((pkg, index) => (
            <Col lg={4} md={6} key={pkg.id}>
              <motion.div variants={item}>
                <Card className="h-100 border-0 shadow package-card" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: pkg.popular ? '2px solid #4f46e5' : 'none'
                }}>
                  {pkg.popular && (
                    <Badge bg="warning" className="popular-badge">
                      <FaStar className="me-1" /> Popular
                    </Badge>
                  )}
                  
                  <div style={{
                    height: '200px',
                    backgroundImage: `url(${pkg.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <Badge bg="primary" className="position-absolute bottom-0 end-0 m-3 fs-6">
                      ₹{pkg.price} <span className="opacity-75">/ {pkg.unit}</span>
                    </Badge>
                  </div>

                  <Card.Body className="p-4">
                    <h3 className="h3 fw-bold text-center mb-4" style={{
                      color: pkg.popular ? '#4f46e5' : '#333'
                    }}>
                      {pkg.name}
                    </h3>

                    <ul className="list-unstyled mb-4">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="mb-2 d-flex align-items-center">
                          <FaCheck className="text-success me-2" />
                          <span style={{ color: '#4b5563' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="d-grid mt-4">
                      <LinkContainer to={currentUser ? '/book-now' : '/login'}>
                        <Button 
                          variant={pkg.popular ? 'primary' : 'outline-primary'}
                          size="lg"
                          className="fw-bold"
                        >
                          Book Now
                        </Button>
                      </LinkContainer>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </motion.div>
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
