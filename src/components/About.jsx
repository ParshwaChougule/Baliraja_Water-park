import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
    <div>
      <Header />
      
      {/* Header Start */}
      <div style={{
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
            About Us
          </h1>
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Home</a>
            <span style={{ color: 'white', margin: '0 15px' }}>/</span>
            <span style={{ color: 'white', margin: '0 15px' }}>Pages</span>
            <span style={{ color: 'white', margin: '0 15px' }}>/</span>
            <span style={{ color: '#4FC3F7', fontSize: '16px' }}>About</span>
          </nav>
        </div>
      </div>
      {/* Header End */}

      {/* About Start */}
      <div style={{ padding: '100px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <h4 style={{ color: '#4FC3F7', fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>About Baliraja Agro Tourism</h4>
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '30px', lineHeight: '1.2', color: '#333' }}>
                The Best Theme & Amusement Park For Your Family
              </h1>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', marginBottom: '40px' }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis eligendi illum inventore maiores incidunt vero id. Est ipsam, distinctio veritatis earum inventore ab fugit officiis ut ullam, laudantium facere sapiente?
              </p>
              
              {/* Features Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ color: '#4FC3F7', fontSize: '40px' }}>🍹</div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Food & Drinks</h4>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ color: '#4FC3F7', fontSize: '40px' }}>🎯</div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Many Attractions</h4>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ color: '#4FC3F7', fontSize: '40px' }}>💰</div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Affordable Price</h4>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ color: '#4FC3F7', fontSize: '40px' }}>🔒</div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Safety Lockers</h4>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div style={{ position: 'relative' }}>
              {/* 20 Years Experience Banner */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#4FC3F7',
                color: 'white',
                padding: '20px 40px',
                borderRadius: '10px',
                fontSize: '24px',
                fontWeight: 'bold',
                zIndex: '2',
                boxShadow: '0 4px 15px rgba(79, 195, 247, 0.3)'
              }}>
                20 Years Experience
              </div>
              
              {/* Main Image */}
              <div style={{ marginTop: '40px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Water Park" 
                  style={{ 
                    width: '100%', 
                    height: '300px', 
                    objectFit: 'cover', 
                    borderRadius: '15px',
                    marginBottom: '20px'
                  }} 
                />
                
                {/* Statistics Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{
                    backgroundColor: '#4FC3F7',
                    color: 'white',
                    padding: '30px 20px',
                    borderRadius: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>👍</div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>150K +</div>
                    <div style={{ fontSize: '16px' }}>Happy Visitors</div>
                  </div>
                  <div style={{
                    backgroundColor: '#333',
                    color: 'white',
                    padding: '30px 20px',
                    borderRadius: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🏆</div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>122+</div>
                    <div style={{ fontSize: '16px' }}>Awards Winning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Feature Start */}
      <div style={{ padding: '100px 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {/* Best Pools */}
            <div style={{ 
              position: 'relative', 
              borderRadius: '20px', 
              overflow: 'hidden',
              height: '350px',
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div style={{ 
                position: 'absolute', 
                bottom: '0', 
                left: '0', 
                right: '0', 
                padding: '30px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Best Pools</h4>
                <p style={{ fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                </p>
                <button style={{
                  backgroundColor: '#4FC3F7',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  Read More →
                </button>
              </div>
            </div>

            {/* Waterslides */}
            <div style={{ 
              position: 'relative', 
              borderRadius: '20px', 
              overflow: 'hidden',
              height: '350px',
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div style={{ 
                position: 'absolute', 
                bottom: '0', 
                left: '0', 
                right: '0', 
                padding: '30px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Waterslides</h4>
                <p style={{ fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                </p>
                <button style={{
                  backgroundColor: '#4FC3F7',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  Read More →
                </button>
              </div>
            </div>

            {/* River Rides */}
            <div style={{ 
              position: 'relative', 
              borderRadius: '20px', 
              overflow: 'hidden',
              height: '350px',
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div style={{ 
                position: 'absolute', 
                bottom: '0', 
                left: '0', 
                right: '0', 
                padding: '30px',
                color: 'white'
              }}>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>River Rides</h4>
                <p style={{ fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                </p>
                <button style={{
                  backgroundColor: '#4FC3F7',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  Read More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature End */}

      {/* Gallery Start */}
      <div style={{ padding: '100px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          {/* Gallery Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h4 style={{ color: '#4FC3F7', fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>Our Gallery</h4>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
              Captured Moments In Waterland
            </h1>
            <p style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>

          {/* Gallery Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(2, 250px)', gap: '15px' }}>
            {/* Large image - spans 3 columns */}
            <div style={{ 
              gridColumn: 'span 3', 
              gridRow: 'span 1',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gallery 1" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: '0',
                transition: 'opacity 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0'}>
                🔍
              </div>
            </div>

            {/* Medium image 1 */}
            <div style={{ 
              gridColumn: 'span 2', 
              gridRow: 'span 1',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Gallery 2" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Small image 1 */}
            <div style={{ 
              gridColumn: 'span 1', 
              gridRow: 'span 1',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Gallery 3" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Small image 2 */}
            <div style={{ 
              gridColumn: 'span 1', 
              gridRow: 'span 1',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Gallery 4" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Small image 3 */}
            <div style={{ 
              gridColumn: 'span 1', 
              gridRow: 'span 1',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Gallery 5" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Large image 2 - spans 3 columns */}
            <div style={{ 
              gridColumn: 'span 3', 
              gridRow: 'span 1',
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Gallery 6" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'rgba(79, 195, 247, 0.9)',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                🔍
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery End */}

      {/* Team Start */}
      <div style={{ padding: '100px 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          {/* Team Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h4 style={{ color: '#4FC3F7', fontSize: '18px', marginBottom: '10px', fontWeight: '600' }}>Meet Our Team</h4>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
              Our Waterland Park Dedicated Team Member
            </h1>
            <p style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>

          {/* Team Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {/* David James */}
            <div style={{
              backgroundColor: '#4FC3F7',
              borderRadius: '20px',
              padding: '30px',
              color: 'white',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>David James</h4>
                  <p style={{ fontSize: '16px', opacity: '0.8', margin: '0' }}>Profession</p>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="David James" 
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>📘</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>🐦</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>💼</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>📷</div>
              </div>
              
              <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '0', textAlign: 'center' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
              </p>
            </div>

            {/* William John */}
            <div style={{
              backgroundColor: '#333',
              borderRadius: '20px',
              padding: '30px',
              color: 'white',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>William John</h4>
                  <p style={{ fontSize: '16px', opacity: '0.8', margin: '0' }}>Profession</p>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="William John" 
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>📘</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>🐦</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>💼</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>📷</div>
              </div>
              
              <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '0', textAlign: 'center' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
              </p>
            </div>

            {/* Michael John */}
            <div style={{
              backgroundColor: '#4FC3F7',
              borderRadius: '20px',
              padding: '30px',
              color: 'white',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>Michael John</h4>
                  <p style={{ fontSize: '16px', opacity: '0.8', margin: '0' }}>Profession</p>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    alt="Michael John" 
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>📘</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>🐦</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>💼</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>📷</div>
              </div>
              
              <p style={{ fontSize: '14px', lineHeight: '1.5', margin: '0', textAlign: 'center' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}

      <Footer />
    </div>
  );
};

export default About;
