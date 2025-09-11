import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaPlay, FaTicketAlt } from 'react-icons/fa';

const HeroBanner = () => {
  const heroSlides = [
    {
      id: 1,
      image: "/images/hero/allgo-an-app-for-plus-size-people-FJHauGTPtPo-unsplash.jpg",
      title: "The Biggest Theme & Amusement Park",
      subtitle: "Welcome To WaterLand",
      description: "Experience the ultimate water adventure with thrilling rides, exciting attractions, and unforgettable memories for the whole family.",
      buttonText: "Book Your Ticket"
    },
    {
      id: 2,
      image: "/images/hero/aquavera-KzUAW2htbiI-unsplash.jpg",
      title: "The Greatest Water and Amusement Park",
      subtitle: "Adventure Awaits",
      description: "Dive into excitement with our world-class water slides, wave pools, and family-friendly attractions that guarantee endless fun.",
      buttonText: "Explore Now"
    },
    {
      id: 3,
      image: "/images/hero/cory-bjork-D1yT791Nf9A-unsplash.jpg",
      title: "The Best Theme & Amusement Park For Your Family",
      subtitle: "Family Fun Paradise",
      description: "Create lasting memories with attractions designed for all ages, from gentle rides for kids to thrilling adventures for adults.",
      buttonText: "Plan Your Visit"
    },
    {
      id: 4,
      image: "/images/hero/ivan-bandura-8UU42wLRtaw-unsplash.jpg",
      title: "Thrilling Water Adventures Await",
      subtitle: "Pure Excitement",
      description: "Get your adrenaline pumping with our extreme water slides, wave pools, and heart-racing attractions.",
      buttonText: "Get Tickets"
    },
    {
      id: 5,
      image: "/images/hero/wasif-mujahid-rkuaIT4D7y4-unsplash.jpg",
      title: "Splash Into Summer Fun",
      subtitle: "Cool Off & Play",
      description: "Beat the heat with refreshing water activities, lazy rivers, and splash zones perfect for all ages.",
      buttonText: "Dive In"
    }
  ];

  return (
    <section className="hero-section">
      <Carousel fade interval={5000} controls={true} indicators={true}>
        {heroSlides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div 
              className="hero-slide d-flex align-items-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                color: 'white'
              }}
            >
              <Container>
                <div className="carousel-caption d-flex align-items-center justify-content-center h-100">
                  <Row className="justify-content-center">
                    <Col lg={8} className="text-center">
                      <h5 className="text-white mb-3 fw-normal hero-subtitle-animation">{slide.subtitle}</h5>
                      <h1 className="display-3 fw-bold text-white mb-4 hero-text-animation text-shadow">{slide.title}</h1>
                      <p className="lead text-white mb-4 hero-subtitle-animation">{slide.description}</p>
                      <div className="d-flex gap-3 justify-content-center hero-button-animation">
                        <LinkContainer to="/booking">
                          <Button variant="primary" size="lg" className="px-4 btn-animated">
                            <FaTicketAlt className="me-2" />
                            {slide.buttonText}
                          </Button>
                        </LinkContainer>
                        <Button variant="outline-light" size="lg" className="px-4 btn-animated">
                          <FaPlay className="me-2" />
                          Watch Video
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroBanner;
