import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Team = () => {
  return (
    <div>
      <Header />
      
      {/* Page Header */}
      <section style={{ 
        padding: '150px 0 100px 0',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
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
            Our Team
          </h1>
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Home</a>
            <span style={{ color: 'white', margin: '0 15px' }}>/</span>
            <span style={{ color: '#4FC3F7', fontSize: '16px' }}>Team</span>
          </nav>
        </div>
      </section>

      {/* Team Start */}
      <div className="container-fluid team py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
            <h4 className="text-primary">Meet Our Team</h4>
            <h1 className="display-5 mb-4">Our Waterland Park Dedicated Team Member</h1>
            <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="team-item p-4">
                <div className="team-content">
                  <div className="d-flex justify-content-between border-bottom pb-4">
                    <div className="text-start">
                      <h4 className="mb-0">David James</h4>
                      <p className="mb-0">Profession</p>
                    </div>
                    <div>
                      <img src="img/team-1.jpg" className="img-fluid rounded" style={{width: '100px', height: '100px'}} alt="" />
                    </div>
                  </div>
                  <div className="team-icon rounded-pill my-4 p-3">
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-0" href=""><i className="fab fa-instagram"></i></a>
                  </div>
                  <p className="text-center mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="team-item p-4">
                <div className="team-content">
                  <div className="d-flex justify-content-between border-bottom pb-4">
                    <div className="text-start">
                      <h4 className="mb-0">William John</h4>
                      <p className="mb-0">Profession</p>
                    </div>
                    <div>
                      <img src="img/team-2.jpg" className="img-fluid rounded" style={{width: '100px', height: '100px'}} alt="" />
                    </div>
                  </div>
                  <div className="team-icon rounded-pill my-4 p-3">
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-0" href=""><i className="fab fa-instagram"></i></a>
                  </div>
                  <p className="text-center mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="team-item p-4">
                <div className="team-content">
                  <div className="d-flex justify-content-between border-bottom pb-4">
                    <div className="text-start">
                      <h4 className="mb-0">Michael John</h4>
                      <p className="mb-0">Profession</p>
                    </div>
                    <div>
                      <img src="img/team-3.jpg" className="img-fluid rounded" style={{width: '100px', height: '100px'}} alt="" />
                    </div>
                  </div>
                  <div className="team-icon rounded-pill my-4 p-3">
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-0" href=""><i className="fab fa-instagram"></i></a>
                  </div>
                  <p className="text-center mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}

      {/* Footer Start */}
      <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-md-6 col-lg-6 col-xl-4">
              <div className="footer-item">
                <a href="index.html" className="p-0">
                  <h4 className="text-white mb-4"><i className="fas fa-swimmer text-primary me-3"></i>WaterLand</h4>
                  {/* <img src="img/logo.png" alt="Logo"> */}
                </a>
                <p className="mb-2">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                <div className="d-flex align-items-center">
                  <i className="fas fa-map-marker-alt text-primary me-3"></i>
                  <p className="text-white mb-0">123 Street New York.USA</p>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-envelope text-primary me-3"></i>
                  <p className="text-white mb-0">info@example.com</p>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fa fa-phone-alt text-primary me-3"></i>
                  <p className="text-white mb-0">(+012) 3456 7890</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-2">
              <div className="footer-item">
                <h4 className="text-white mb-4">Quick Links</h4>
                <a href="#"><i className="fas fa-angle-right me-2"></i> About Us</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Feature</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Attractions</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Tickets</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Blog</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Contact us</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-2">
              <div className="footer-item">
                <h4 className="text-white mb-4">Support</h4>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Privacy Policy</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Terms & Conditions</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Disclaimer</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Support</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> FAQ</a>
                <a href="#"><i className="fas fa-angle-right me-2"></i> Help</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4">
              <div className="footer-item">
                <h4 className="text-white mb-4">Opening Hours</h4>
                <div className="opening-date mb-3 pb-3">
                  <div className="opening-clock flex-shrink-0">
                    <h6 className="text-white mb-0 me-auto">Monday - Friday:</h6>
                    <p className="mb-0"><i className="fas fa-clock text-primary me-2"></i> 11:00 AM - 16:00 PM</p>
                  </div>
                  <div className="opening-clock flex-shrink-0">
                    <h6 className="text-white mb-0 me-auto">Satur - Sunday:</h6>
                    <p className="mb-0"><i className="fas fa-clock text-primary me-2"></i> 09:00 AM - 17:00 PM</p>
                  </div>
                  <div className="opening-clock flex-shrink-0">
                    <h6 className="text-white mb-0 me-auto">Holiday:</h6>
                    <p className="mb-0"><i className="fas fa-clock text-primary me-2"></i> 09:00 AM - 17:00 PM</p>
                  </div>
                </div>
                <div>
                  <p className="text-white mb-2">Payment Accepted</p>
                  <img src="img/payment.png" className="img-fluid" alt="Image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      
      {/* Copyright Start */}
      <div className="container-fluid copyright py-4">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6 text-center text-md-start mb-md-0">
              <span className="text-body"><a href="#" className="border-bottom text-white"><i className="fas fa-copyright text-light me-2"></i>Your Site Name</a>, All right reserved.</span>
            </div>
            <div className="col-md-6 text-center text-md-end text-body">
              {/**** This template is free as long as you keep the below author's credit link/attribution link/backlink. ****/}
              {/**** If you'd like to use the template without the below author's credit link/attribution link/backlink, ****/}
              {/**** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". ****/}
              Designed By <a className="border-bottom text-white" href="https://htmlcodex.com">HTML Codex</a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright End */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
      <Footer />
    </div>
  );
};

export default Team;
