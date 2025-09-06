import React from 'react';
import Header from './Header';

const About = () => {
  return (
    <div>
      <Header />
      
      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{maxWidth: '900px'}}>
          <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">About Us</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-primary">About</li>
          </ol>    
        </div>
      </div>
      {/* Header End */}

      {/* About Content Start */}
      <section style={{ padding: '100px 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          {/* Main About Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '100px' }}>
            <div>
              <h4 style={{ color: '#4FC3F7', fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>About WaterLand</h4>
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '30px', lineHeight: '1.2' }}>
                The Best Theme & Amusement Park For Your Family
              </h1>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.8', marginBottom: '40px' }}>
                Welcome to WaterLand, where unforgettable memories are made! For over 20 years, we've been creating magical experiences for families from around the world. Our state-of-the-art water park combines thrilling attractions with safe, family-friendly entertainment.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    backgroundColor: '#4FC3F7', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '20px',
                    fontSize: '24px',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    🍔
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Food & Drinks</h4>
                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Delicious dining options from quick snacks to full meals</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    backgroundColor: '#4FC3F7', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '20px',
                    fontSize: '24px',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    🎢
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Many Attractions</h4>
                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Over 25 thrilling rides and water attractions for all ages</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    backgroundColor: '#4FC3F7', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '20px',
                    fontSize: '24px',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    💰
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Affordable Price</h4>
                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Great value family packages and seasonal discounts</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    backgroundColor: '#4FC3F7', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '20px',
                    fontSize: '24px',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    🔒
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Safety First</h4>
                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Secure lockers and top-notch safety measures</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  backgroundColor: 'rgba(79, 195, 247, 0.9)',
                  padding: '20px 30px',
                  borderRadius: '15px',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>20+</h3>
                  <p style={{ fontSize: '14px', margin: 0 }}>Years of Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '60px 40px', 
            borderRadius: '20px', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            marginBottom: '100px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
              <div>
                <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#4FC3F7', marginBottom: '10px' }}>2M+</h2>
                <p style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Happy Visitors</p>
              </div>
              <div>
                <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#4FC3F7', marginBottom: '10px' }}>25+</h2>
                <p style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Water Attractions</p>
              </div>
              <div>
                <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#4FC3F7', marginBottom: '10px' }}>50+</h2>
                <p style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Expert Staff</p>
              </div>
              <div>
                <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#4FC3F7', marginBottom: '10px' }}>20+</h2>
                <p style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Years Experience</p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '50px', 
              borderRadius: '20px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#4FC3F7', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '30px',
                fontSize: '32px',
                color: 'white'
              }}>
                🎯
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Our Mission</h3>
              <p style={{ color: '#666', lineHeight: '1.8', fontSize: '16px' }}>
                To create magical moments and lasting memories for families through safe, innovative, and exciting water park experiences that bring joy to people of all ages.
              </p>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '50px', 
              borderRadius: '20px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#4FC3F7', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '30px',
                fontSize: '32px',
                color: 'white'
              }}>
                👁️
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Our Vision</h3>
              <p style={{ color: '#666', lineHeight: '1.8', fontSize: '16px' }}>
                To be the world's most beloved water park destination, setting new standards for family entertainment, safety, and environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About End */}

      {/* Feature Start */}
      <div className="container-fluid feature pb-5">
        <div className="container pb-5">
          <div className="row g-4">
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="feature-item">
                <img src="img/feature-1.jpg" className="img-fluid rounded w-100" alt="Image" />
                <div className="feature-content p-4">
                  <div className="feature-content-inner">
                    <h4 className="text-white">Best Pools</h4>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4">Read More <i className="fa fa-arrow-right ms-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="feature-item">
                <img src="img/feature-2.jpg" className="img-fluid rounded w-100" alt="Image" />
                <div className="feature-content p-4">
                  <div className="feature-content-inner">
                    <h4 className="text-white">Waterslides</h4>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4">Read More <i className="fa fa-arrow-right ms-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="feature-item">
                <img src="img/feature-3.jpg" className="img-fluid rounded w-100" alt="Image" />
                <div className="feature-content p-4">
                  <div className="feature-content-inner">
                    <h4 className="text-white">River Rides</h4>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4">Read More <i className="fa fa-arrow-right ms-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature End */}

      {/* Gallery Start */}
      <div className="container-fluid gallery pb-5">
        <div className="container pb-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
            <h4 className="text-primary">Our Gallery</h4>
            <h1 className="display-5 mb-4">Captured Moments In Waterland</h1>
            <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-6 wow fadeInUp" data-wow-delay="0.2s">
              <div className="gallery-item">
                <img src="img/gallery-1.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-1.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-1"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="gallery-item">
                <img src="img/gallery-2.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-2.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-2"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.6s">
              <div className="gallery-item">
                <img src="img/gallery-3.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-3.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-3"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.2s">
              <div className="gallery-item">
                <img src="img/gallery-4.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-4.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-4"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="gallery-item">
                <img src="img/gallery-5.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-5.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-5"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-6 wow fadeInUp" data-wow-delay="0.6s">
              <div className="gallery-item">
                <img src="img/gallery-6.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-6.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-6"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery End */}
      <div className="container-fluid feature pb-5">
        <div className="container pb-5">
          <div className="row g-4">
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="feature-item">
                <img src="img/feature-1.jpg" className="img-fluid rounded w-100" alt="Image" />
                <div className="feature-content p-4">
                  <div className="feature-content-inner">
                    <h4 className="text-white">Best Pools</h4>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4">Read More <i className="fa fa-arrow-right ms-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="feature-item">
                <img src="img/feature-2.jpg" className="img-fluid rounded w-100" alt="Image" />
                <div className="feature-content p-4">
                  <div className="feature-content-inner">
                    <h4 className="text-white">Waterslides</h4>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4">Read More <i className="fa fa-arrow-right ms-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="feature-item">
                <img src="img/feature-3.jpg" className="img-fluid rounded w-100" alt="Image" />
                <div className="feature-content p-4">
                  <div className="feature-content-inner">
                    <h4 className="text-white">River Rides</h4>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4">Read More <i className="fa fa-arrow-right ms-1"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature End */}

      {/* Gallery Start */}
      <div className="container-fluid gallery pb-5">
        <div className="container pb-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
            <h4 className="text-primary">Our Gallery</h4>
            <h1 className="display-5 mb-4">Captured Moments In Waterland</h1>
            <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-6 wow fadeInUp" data-wow-delay="0.2s">
              <div className="gallery-item">
                <img src="img/gallery-1.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-1.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-1"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="gallery-item">
                <img src="img/gallery-2.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-2.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-2"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.6s">
              <div className="gallery-item">
                <img src="img/gallery-3.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-3.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-3"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.2s">
              <div className="gallery-item">
                <img src="img/gallery-4.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-4.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-4"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="gallery-item">
                <img src="img/gallery-5.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-5.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-5"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-6 wow fadeInUp" data-wow-delay="0.6s">
              <div className="gallery-item">
                <img src="img/gallery-6.jpg" className="img-fluid rounded w-100 h-100" alt="" />
                <div className="search-icon">
                  <a href="img/gallery-6.jpg" className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-6"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery End */}

      {/* Team Start */}
      <div className="container-fluid team pb-5">
        <div className="container pb-5">
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
                    <h6 className="text-white mb-0 me-auto">Saturday - Sunday:</h6>
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
              Designed By <a className="border-bottom text-white" href="https://htmlcodex.com">HTML Codex</a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright End */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
    </div>
  );
};

export default About;
