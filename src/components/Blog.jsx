import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Blog = () => {
  return (
    <div>
      <Header />
      
      {/* Page Header */}
      <section style={{ 
        padding: '150px 0 100px 0',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
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
            Our Blog
          </h1>
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Home</a>
            <span style={{ color: 'white', margin: '0 15px' }}>/</span>
            <span style={{ color: '#4FC3F7', fontSize: '16px' }}>Blog</span>
          </nav>
        </div>
      </section>

      {/* Blog Start */}
      <div className="container-fluid blog py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
            <h4 className="text-primary">Our Blog</h4>
            <h1 className="display-5 mb-4">Latest Blog & Articles</h1>
            <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="blog-item card border-0 shadow-lg h-100">
                <div className="blog-img position-relative">
                  <a href="#">
                    <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="Water Safety" style={{height: '250px', objectFit: 'cover'}} />
                  </a>
                  <div className="blog-category position-absolute top-0 start-0 m-3 py-2 px-3 bg-primary text-white rounded-pill fw-bold" style={{fontSize: '12px'}}>Safety</div>
                  <div className="blog-date position-absolute bottom-0 end-0 m-3 py-1 px-3 bg-dark text-white rounded-pill" style={{fontSize: '12px'}}>
                    <i className="fas fa-clock me-1"></i>August 25, 2025
                  </div>
                </div>
                <div className="card-body p-4">
                  <a href="#" className="h5 d-block mb-3 text-decoration-none text-dark fw-bold">Essential Water Safety Tips for Families</a>
                  <p className="card-text text-muted mb-4">Discover important safety guidelines and tips to ensure your family has a safe and enjoyable experience at our water park.
                  </p>
                  <a href="#" className="btn btn-primary rounded-pill py-2 px-4 fw-bold">Read More <i className="fas fa-arrow-right ms-2"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="blog-item card border-0 shadow-lg h-100">
                <div className="blog-img position-relative">
                  <a href="#">
                    <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="Water Slides" style={{height: '250px', objectFit: 'cover'}} />
                  </a>
                  <div className="blog-category position-absolute top-0 start-0 m-3 py-2 px-3 bg-success text-white rounded-pill fw-bold" style={{fontSize: '12px'}}>Adventure</div>
                  <div className="blog-date position-absolute bottom-0 end-0 m-3 py-1 px-3 bg-dark text-white rounded-pill" style={{fontSize: '12px'}}>
                    <i className="fas fa-clock me-1"></i>August 20, 2025
                  </div>
                </div>
                <div className="card-body p-4">
                  <a href="#" className="h5 d-block mb-3 text-decoration-none text-dark fw-bold">Top 10 Most Thrilling Water Slides</a>
                  <p className="card-text text-muted mb-4">Experience the ultimate adrenaline rush with our collection of the most exciting and thrilling water slides in the region.
                  </p>
                  <a href="#" className="btn btn-primary rounded-pill py-2 px-4 fw-bold">Read More <i className="fas fa-arrow-right ms-2"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="blog-item card border-0 shadow-lg h-100">
                <div className="blog-img position-relative">
                  <a href="#">
                    <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="Family Fun" style={{height: '250px', objectFit: 'cover'}} />
                  </a>
                  <div className="blog-category position-absolute top-0 start-0 m-3 py-2 px-3 bg-info text-white rounded-pill fw-bold" style={{fontSize: '12px'}}>Family</div>
                  <div className="blog-date position-absolute bottom-0 end-0 m-3 py-1 px-3 bg-dark text-white rounded-pill" style={{fontSize: '12px'}}>
                    <i className="fas fa-clock me-1"></i>August 15, 2025
                  </div>
                </div>
                <div className="card-body p-4">
                  <a href="#" className="h5 d-block mb-3 text-decoration-none text-dark fw-bold">Creating Perfect Family Memories at Baliraja Agro Tourism</a>
                  <p className="card-text text-muted mb-4">Learn how to make the most of your family visit with our guide to attractions, dining, and special experiences.
                  </p>
                  <a href="#" className="btn btn-primary rounded-pill py-2 px-4 fw-bold">Read More <i className="fas fa-arrow-right ms-2"></i></a>
                </div>
              </div>
            </div>
            
            {/* Second Row of Blog Posts */}
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.8s">
              <div className="blog-item card border-0 shadow-lg h-100">
                <div className="blog-img position-relative">
                  <a href="#">
                    <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="Pool Activities" style={{height: '250px', objectFit: 'cover'}} />
                  </a>
                  <div className="blog-category position-absolute top-0 start-0 m-3 py-2 px-3 bg-warning text-dark rounded-pill fw-bold" style={{fontSize: '12px'}}>Activities</div>
                  <div className="blog-date position-absolute bottom-0 end-0 m-3 py-1 px-3 bg-dark text-white rounded-pill" style={{fontSize: '12px'}}>
                    <i className="fas fa-clock me-1"></i>August 10, 2025
                  </div>
                </div>
                <div className="card-body p-4">
                  <a href="#" className="h5 d-block mb-3 text-decoration-none text-dark fw-bold">Best Pool Games for Kids and Adults</a>
                  <p className="card-text text-muted mb-4">Discover fun pool games and activities that will keep everyone entertained throughout your visit to Baliraja Agro Tourism.
                  </p>
                  <a href="#" className="btn btn-primary rounded-pill py-2 px-4 fw-bold">Read More <i className="fas fa-arrow-right ms-2"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="1.0s">
              <div className="blog-item card border-0 shadow-lg h-100">
                <div className="blog-img position-relative">
                  <a href="#">
                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="Summer Events" style={{height: '250px', objectFit: 'cover'}} />
                  </a>
                  <div className="blog-category position-absolute top-0 start-0 m-3 py-2 px-3 bg-danger text-white rounded-pill fw-bold" style={{fontSize: '12px'}}>Events</div>
                  <div className="blog-date position-absolute bottom-0 end-0 m-3 py-1 px-3 bg-dark text-white rounded-pill" style={{fontSize: '12px'}}>
                    <i className="fas fa-clock me-1"></i>August 5, 2025
                  </div>
                </div>
                <div className="card-body p-4">
                  <a href="#" className="h5 d-block mb-3 text-decoration-none text-dark fw-bold">Summer Events & Special Celebrations</a>
                  <p className="card-text text-muted mb-4">Join us for exciting summer events, live entertainment, and special celebrations happening throughout the season.
                  </p>
                  <a href="#" className="btn btn-primary rounded-pill py-2 px-4 fw-bold">Read More <i className="fas fa-arrow-right ms-2"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="1.2s">
              <div className="blog-item card border-0 shadow-lg h-100">
                <div className="blog-img position-relative">
                  <a href="#">
                    <img src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="Food & Dining" style={{height: '250px', objectFit: 'cover'}} />
                  </a>
                  <div className="blog-category position-absolute top-0 start-0 m-3 py-2 px-3 bg-secondary text-white rounded-pill fw-bold" style={{fontSize: '12px'}}>Dining</div>
                  <div className="blog-date position-absolute bottom-0 end-0 m-3 py-1 px-3 bg-dark text-white rounded-pill" style={{fontSize: '12px'}}>
                    <i className="fas fa-clock me-1"></i>July 30, 2025
                  </div>
                </div>
                <div className="card-body p-4">
                  <a href="#" className="h5 d-block mb-3 text-decoration-none text-dark fw-bold">Delicious Dining Options at Baliraja Agro Tourism</a>
                  <p className="card-text text-muted mb-4">Explore our variety of dining options from quick snacks to full meals, perfect for refueling during your water park adventure.
                  </p>
                  <a href="#" className="btn btn-primary rounded-pill py-2 px-4 fw-bold">Read More <i className="fas fa-arrow-right ms-2"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog End */}

      
      
     
      
      <Footer />
    </div>
  );
};

export default Blog;
