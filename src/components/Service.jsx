import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import {
  BsClock,
  BsHouseDoorFill,
  BsCupStraw,
  BsLockFill,
  BsWater,
} from "react-icons/bs";
import { services, parkInfo } from '../data/waterParkData';

const Service = () => {

  const services = [
    {
      title: "Best Pools",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit.",
      img: "/assets/pool.jpg",
    },
    {
      title: "Waterslides",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit.",
      img: "/assets/waterslide.jpg",
    },
    {
      title: "River Rides",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit.",
      img: "/assets/riverride.jpg",
    },
  ];
  return (
    <div>
      <Header />
      
      {/* Page Header */}
      <section style={{ 
        padding: '150px 0 100px 0',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '20px' 
          }}>
            Our Services
          </h1>
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Home</a>
            <span style={{ color: 'white', margin: '0 15px' }}>/</span>
            <span style={{ color: '#4FC3F7', fontSize: '16px' }}>Service</span>
          </nav>
        </div>
      </section>

      {/* Service Start */}
      <section
      id="services"
      style={{
        background: "url('/assets/waterpark-bg.jpg') center/cover no-repeat",
        padding: "80px 0",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      ></div>

      <Container style={{ position: "relative", zIndex: 1 }}>
        {/* Title Section */}
        <div className="text-center mb-5">
          <h6 className="text-info">Our Service</h6>
          <h2 className="fw-bold">Explore Waterland Park service</h2>
          <p className="text-light mx-auto" style={{ maxWidth: "700px" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            adipisci facilis cupiditate recusandae aperiam temporibus corporis
            itaque quis facere, numquam, ad culpa deserunt sint dolorem autem
            obcaecati, ipsam mollitia hic.
          </p>
        </div>

        {/* Opening Hours */}
        <Row className="justify-content-center mb-5">
          <Col md={8}>
            <Card className="shadow-lg border-0 rounded-4">
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                  <strong>Monday - Friday</strong>
                  <span className="text-info fw-semibold">
                    <BsClock className="me-2" />
                    11:00 AM - 16:00 PM
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                  <strong>Saturday - Sunday</strong>
                  <span className="text-info fw-semibold">
                    <BsClock className="me-2" />
                    09:00 AM - 17:00 PM
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                  <strong>Holiday</strong>
                  <span className="text-info fw-semibold">
                    <BsClock className="me-2" />
                    09:00 AM - 17:00 PM
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        {/* Service Cards */}
        <Row className="g-4">
          <Col md={3} sm={6}>
            <Card className="h-100 text-center p-4 shadow-sm border-0 rounded-4">
              <BsHouseDoorFill size={40} className="text-info mb-3" />
              <h5 className="fw-bold">Private Gazebo</h5>
              <p className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                vel beatae numquam.
              </p>
            </Card>
          </Col>

          <Col md={3} sm={6}>
            <Card className="h-100 text-center p-4 shadow-sm border-0 rounded-4">
              <BsCupStraw size={40} className="text-info mb-3" />
              <h5 className="fw-bold">Delicious Food</h5>
              <p className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                vel beatae numquam.
              </p>
            </Card>
          </Col>

          <Col md={3} sm={6}>
            <Card className="h-100 text-center p-4 shadow-sm border-0 rounded-4">
              <BsLockFill size={40} className="text-info mb-3" />
              <h5 className="fw-bold">Safety Lockers</h5>
              <p className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                vel beatae numquam.
              </p>
            </Card>
          </Col>

          <Col md={3} sm={6}>
            <Card className="h-100 text-center p-4 shadow-sm border-0 rounded-4">
              <BsWater size={40} className="text-info mb-3" />
              <h5 className="fw-bold">River Rides</h5>
              <p className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                vel beatae numquam.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
      {/* Service End */}

      {/* Feature Start */}
      <Container className="my-5">
      <Row className="g-4">
        {services.map((service, index) => (
          <Col md={4} key={index}>
            <Card
              className="text-white h-100"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
              }}
            >
              <Card.Img
                src={service.img}
                alt={service.title}
                style={{ height: "100%", objectFit: "cover" }}
              />
              <Card.ImgOverlay
                className="d-flex flex-column justify-content-end"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))",
                }}
              >
                <Card.Title className="fw-bold fs-4">{service.title}</Card.Title>
                <Card.Text className="mb-3">{service.text}</Card.Text>
                <Button
                  variant="info"
                  className="fw-bold d-flex align-items-center gap-2 rounded-pill px-4"
                >
                  Read More <FaArrowRight />
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
      {/* Feature End */}

      {/* Testimonial Start */}
      <div className="container-fluid testimonial py-5" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
            <h4 className="text-primary">Testimonials</h4>
            <h1 className="display-5 text-white mb-4">Our Clients Reviews</h1>
            <p className="text-white mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          
          {/* Single Testimonial Card */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="testimonial-item p-5 rounded-4" style={{backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.2)'}}>
                <p className="text-white fs-5 mb-4 text-center" style={{lineHeight: '1.6'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos mollitia fugiat, nihil autem reprehenderit aperiam maxime minima consequatur, nam iste eius velit perferendis voluptatem at atque neque soluta reiciendis doloremque.
                </p>
                <div className="testimonial-inner d-flex align-items-center justify-content-center flex-wrap">
                  <div className="testimonial-img position-relative me-4 mb-3 mb-md-0">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                         className="img-fluid rounded-circle" 
                         alt="Customer" 
                         style={{width: '70px', height: '70px', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)'}} />
                    <div className="testimonial-quote position-absolute bg-info rounded-circle d-flex align-items-center justify-content-center" 
                         style={{width: '35px', height: '35px', top: '-10px', left: '-10px'}}>
                      <i className="fa fa-quote-right text-white" style={{fontSize: '14px'}}></i>
                    </div>
                  </div>
                  <div className="text-center text-md-start">
                    <h4 className="text-white mb-1 fw-bold">Person Name</h4>
                    <p className="text-white-50 mb-2">Profession</p>
                    <div className="d-flex justify-content-center justify-content-md-start">
                      <i className="fas fa-star text-warning me-1"></i>
                      <i className="fas fa-star text-warning me-1"></i>
                      <i className="fas fa-star text-warning me-1"></i>
                      <i className="fas fa-star text-warning me-1"></i>
                      <i className="fas fa-star text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="text-center mt-5">
            <div className="testimonial-nav d-flex justify-content-center align-items-center">
              <button className="btn btn-outline-light rounded-circle me-3" style={{width: '50px', height: '50px', border: '2px solid rgba(255,255,255,0.3)'}}>
                <i className="fas fa-chevron-left text-white"></i>
              </button>
              <div className="mx-4 d-flex align-items-center">
                <span className="dot bg-info rounded-circle d-inline-block me-3" style={{width: '15px', height: '15px'}}></span>
                <span className="dot bg-light rounded-circle d-inline-block me-3" style={{width: '15px', height: '15px', opacity: '0.4'}}></span>
                <span className="dot bg-light rounded-circle d-inline-block" style={{width: '15px', height: '15px', opacity: '0.4'}}></span>
              </div>
              <button className="btn btn-outline-light rounded-circle ms-3" style={{width: '50px', height: '50px', border: '2px solid rgba(255,255,255,0.3)'}}>
                <i className="fas fa-chevron-right text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}

      
      
      
      <Footer />
    </div>
  );
};

export default Service;
