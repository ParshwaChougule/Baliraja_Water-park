import React, { useState } from 'react';
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlay, FaTicketAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

const HeroBanner = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleBookNowClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      setShowLoginModal(true);
    }
    // If user is logged in, the Link will handle navigation
  };

  const handleLoginSuccess = () => {
    navigate('/booking');
  };
  const heroSlides = [
    {
      id: 1,
      image: "/images/hero/bali.jpeg",
      title: "Welcome To Baliraja Water Park",
      subtitle: "The Ultimate Water Adventure",
      description: "Experience thrilling rides, exciting attractions, and unforgettable memories for the whole family.",
      buttonText: "Book Your Ticket"
    },
    {
      id: 2,
      image: "/images/hero/bali2.JPG",
      title: "The Greatest Water and Amusement Park",
      subtitle: "Adventure Awaits",
      description: "Dive into excitement with our world-class water slides, wave pools, and family-friendly attractions that guarantee endless fun.",
      buttonText: "Book Your Ticket"
    },
    {
      id: 3,
      image: "/images/hero/bali3.jpeg",
      title: "The Biggest Water Park & Amusement Park For Your Family",
      subtitle: "Family Fun Paradise",
      description: "Create lasting memories with attractions designed for all ages, from gentle rides for kids to thrilling adventures for adults.",
      buttonText: "Book Your Ticket"
    },
    {
      id: 4,
      image: "/images/hero/bali4.jpeg",
      title: "Thrilling Water Adventures Await",
      subtitle: "Pure Excitement",
      description: "Get your adrenaline pumping with our extreme water slides, wave pools, and heart-racing attractions.",
      buttonText: "Book Your Ticket"
    },
    {
      id: 5,
      image: "/images/hero/wasif-mujahid-rkuaIT4D7y4-unsplash.jpg",
      title: "Splash Into Summer Fun",
      subtitle: "Cool Off & Play",
      description: "Beat the heat with refreshing water activities, lazy rivers, and splash zones perfect for all ages.",
      buttonText: "Book Your Ticket"
    }
  ];

  // Log the full image paths for debugging
  console.log('Hero banner image paths:');
  heroSlides.forEach((slide, index) => {
    console.log(`Slide ${index + 1}:`, process.env.PUBLIC_URL + slide.image);
  });

  return (
    <section className="hero-section">
      <Carousel 
        fade 
        interval={5000} 
        controls={true} 
        indicators={true}
        activeIndex={activeSlide}
        onSelect={(index) => setActiveSlide(index)}
      >
        {heroSlides.map((slide, index) => (
          <Carousel.Item key={slide.id}>
            <div 
              className="hero-slide d-flex align-items-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${process.env.PUBLIC_URL}${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                color: 'white',
                position: 'relative'
              }}
              onError={(e) => {
                console.error('Failed to load image:', slide.image);
                e.target.style.border = '2px solid red';
              }}
              onLoad={() => console.log('Loaded image:', slide.image)}
            >
              <Container>
                <div className="carousel-caption d-flex align-items-center justify-content-center h-100">
                  <Row className="justify-content-center">
                    <Col lg={8} className="text-center">
                      <div className="hero-content">
                        <h1 className="display-3 fw-bold mb-3">{slide.title}</h1>
                        <h3 className="h2 mb-4">{slide.subtitle}</h3>
                        <p className="lead mb-4">{slide.description}</p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                          <div className="d-flex justify-content-center w-100" style={{ maxWidth: '500px' }}>
                            <Link 
                              to={currentUser ? "/booking" : "#"}
                              onClick={handleBookNowClick}
                              className="btn btn-primary btn-lg d-flex align-items-center me-2 flex-grow-1 justify-content-center"
                              style={{ minWidth: '200px' }}
                            >
                              <FaTicketAlt className="me-2" />
                              {currentUser ? 'Book Your Ticket' : 'Login to Book'}
                            </Link>
                            <button 
                              className="btn btn-outline-light btn-lg d-flex align-items-center flex-grow-1 justify-content-center"
                              style={{ minWidth: '200px' }}
                            >
                              <FaPlay className="me-2" />
                              Watch Video
                            </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      
      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </section>
  );
};

export default HeroBanner;
