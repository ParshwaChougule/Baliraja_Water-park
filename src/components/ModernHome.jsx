import React from 'react';
import Header from './Header';
import HeroBanner from './HeroBanner';

const ModernHome = () => {
  return (
    <div>
      <Header />
      <HeroBanner />
      
      {/* Features Cards Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }} className="features-grid">
            
            {/* Best Pools Card */}
            <div style={{
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              height: '300px',
              background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80") center/cover',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px',
              color: 'white',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="feature-card">
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>Best Pools</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.5', opacity: '0.9' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta 
                  voluptatum laborum mollitia blanditiis suscipit.
                </p>
              </div>
              <button style={{
                backgroundColor: '#4FC3F7',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.3s ease'
              }}>
                Read More <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            {/* Waterslides Card */}
            <div style={{
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              height: '300px',
              background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80") center/cover',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px',
              color: 'white',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="feature-card">
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>Waterslides</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.5', opacity: '0.9' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta 
                  voluptatum laborum mollitia blanditiis suscipit.
                </p>
              </div>
              <button style={{
                backgroundColor: '#4FC3F7',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.3s ease'
              }}>
                Read More <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            {/* River Rides Card */}
            <div style={{
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              height: '300px',
              background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80") center/cover',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px',
              color: 'white',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="feature-card">
              <div>
                <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>River Rides</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.5', opacity: '0.9' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta 
                  voluptatum laborum mollitia blanditiis suscipit.
                </p>
              </div>
              <button style={{
                backgroundColor: '#4FC3F7',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.3s ease'
              }}>
                Read More <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About WaterLand Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url("/images/hero/aquavera-KzUAW2htbiI-unsplash.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '600px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            
            {/* Left Content */}
            <div>
              <p style={{ 
                color: '#4FC3F7', 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                About Baliraja Agro Tourism
              </p>
              
              <h2 style={{ 
                fontSize: '42px', 
                fontWeight: 'bold', 
                lineHeight: '1.2', 
                marginBottom: '25px',
                color: '#333'
              }}>
                The Best Theme &<br />
                Amusement Park For<br />
                Your Family
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.7', 
                marginBottom: '40px',
                color: '#666'
              }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis eligendi illum 
                inventore maiores incidunt vero id. Est ipsam, distinctio veritatis earum inventore 
                ab fugit officiis ut ullam, laudantium facere sapiente?
              </p>

              {/* Features List */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                
                {/* Food & Drinks */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    backgroundColor: '#E3F2FD', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <i className="fas fa-utensils" style={{ color: '#4FC3F7', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Food & Drinks
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>

                {/* Many Attractions */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    backgroundColor: '#E3F2FD', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <i className="fas fa-map-marker-alt" style={{ color: '#4FC3F7', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Many Attractions
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>

                {/* Affordable Price */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    backgroundColor: '#E3F2FD', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <i className="fas fa-dollar-sign" style={{ color: '#4FC3F7', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Affordable Price
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>

                {/* Safety Lockers */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    backgroundColor: '#E3F2FD', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <i className="fas fa-lock" style={{ color: '#4FC3F7', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                      Safety Lockers
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image and Stats */}
            <div style={{ position: 'relative' }}>
              {/* Main Image */}
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Water Park Fun" 
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
                
                {/* Experience Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: '#4FC3F7',
                  color: 'white',
                  padding: '15px 25px',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  20 Years Experience
                </div>
              </div>

              {/* Stats Cards */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '20px', 
                marginTop: '20px' 
              }}>
                {/* Happy Visitors */}
                <div style={{
                  backgroundColor: '#4FC3F7',
                  color: 'white',
                  padding: '30px 25px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <i className="fas fa-thumbs-up" style={{ fontSize: '32px', marginBottom: '15px' }}></i>
                  <h3 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>150K +</h3>
                  <p style={{ fontSize: '16px', margin: 0 }}>Happy Visitors</p>
                </div>

                {/* Awards Winning */}
                <div style={{
                  backgroundColor: '#2C3E50',
                  color: 'white',
                  padding: '30px 25px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <i className="fas fa-award" style={{ fontSize: '32px', marginBottom: '15px' }}></i>
                  <h3 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>122+</h3>
                  <p style={{ fontSize: '16px', margin: 0 }}>Awards Winning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Service Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          
          {/* Section Header */}
          <p style={{ 
            color: '#4FC3F7', 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Our Service
          </p>
          
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            lineHeight: '1.2', 
            marginBottom: '25px',
            color: 'white'
          }}>
            Explore Waterland Park service
          </h2>
          
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.7', 
            marginBottom: '60px',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '600px',
            margin: '0 auto 60px auto'
          }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae 
            aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem 
            obcaecati, ipsam mollitia hic.
          </p>

          {/* Operating Hours Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '40px',
            marginBottom: '60px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            maxWidth: '800px',
            margin: '0 auto 60px auto'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
              
              {/* Monday - Friday */}
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  Monday - Friday
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fas fa-clock" style={{ color: '#4FC3F7', fontSize: '16px' }}></i>
                  <span style={{ fontSize: '16px', color: '#666' }}>11:00 AM - 16:00 PM</span>
                </div>
              </div>

              {/* Saturday - Sunday */}
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  Saturday - Sunday
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fas fa-clock" style={{ color: '#4FC3F7', fontSize: '16px' }}></i>
                  <span style={{ fontSize: '16px', color: '#666' }}>09:00 AM - 17:00 PM</span>
                </div>
              </div>

              {/* Holiday */}
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                  Holiday
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fas fa-clock" style={{ color: '#4FC3F7', fontSize: '16px' }}></i>
                  <span style={{ fontSize: '16px', color: '#666' }}>09:00 AM - 17:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '30px'
          }} className="service-cards-grid">
            
            {/* Private Gazebo */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '40px 30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} className="service-card">
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#E3F2FD',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px auto'
              }}>
                <i className="fas fa-home" style={{ color: '#4FC3F7', fontSize: '32px' }}></i>
              </div>
              <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                Private Gazebo
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet vel beatae numquam.
              </p>
            </div>

            {/* Delicious Food */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '40px 30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} className="service-card">
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#E3F2FD',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px auto'
              }}>
                <i className="fas fa-utensils" style={{ color: '#4FC3F7', fontSize: '32px' }}></i>
              </div>
              <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                Delicious Food
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet vel beatae numquam.
              </p>
            </div>

            {/* Safety Lockers */}
            <div style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("/images/hero/Safety%20Lockers.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '15px',
              padding: '40px 30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              minHeight: '250px'
            }} className="service-card">
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(79, 195, 247, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px auto'
              }}>
                <i className="fas fa-lock" style={{ color: '#4FC3F7', fontSize: '32px' }}></i>
              </div>
              <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                Safety Lockers
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet vel beatae numquam.
              </p>
            </div>

            {/* River Rides */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '40px 30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} className="service-card">
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#E3F2FD',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px auto'
              }}>
                <i className="fas fa-water" style={{ color: '#4FC3F7', fontSize: '32px' }}></i>
              </div>
              <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>
                River Rides
              </h4>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet vel beatae numquam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Packages Section */}
      <section style={{ padding: '100px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'flex-start' }}>
            
            {/* Left Content */}
            <div>
              <p style={{ 
                color: '#4FC3F7', 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Ticket Packages
              </p>
              
              <h2 style={{ 
                fontSize: '42px', 
                fontWeight: 'bold', 
                lineHeight: '1.2', 
                marginBottom: '25px',
                color: '#333'
              }}>
                Choose The<br />
                Best Packages<br />
                For Your Family
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.7', 
                marginBottom: '40px',
                color: '#666'
              }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae 
                aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem 
                obcaecati, ipsam mollitia hic.
              </p>

              {/* Features List */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <i className="fas fa-check" style={{ color: '#4FC3F7', fontSize: '16px' }}></i>
                  <span style={{ fontSize: '16px', color: '#333' }}>Best Waterpark in the world</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <i className="fas fa-check" style={{ color: '#4FC3F7', fontSize: '16px' }}></i>
                  <span style={{ fontSize: '16px', color: '#333' }}>Best Packages For Your Family</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <i className="fas fa-check" style={{ color: '#4FC3F7', fontSize: '16px' }}></i>
                  <span style={{ fontSize: '16px', color: '#333' }}>Enjoy Various Kinds of Water Park</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <i className="fas fa-check" style={{ color: '#4FC3F7', fontSize: '16px' }}></i>
                  <span style={{ fontSize: '16px', color: '#333' }}>Win Up To 3 Free All Day Tickets</span>
                </div>
              </div>

              <button style={{
                backgroundColor: '#4FC3F7',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}>
                Book Now
              </button>
            </div>

            {/* Right Content - Package Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              
              {/* Family Packages */}
              <div style={{
                backgroundColor: '#2C3E50',
                color: 'white',
                borderRadius: '20px',
                padding: '40px 30px',
                textAlign: 'center',
                position: 'relative'
              }}>
                <h3 style={{ 
                  color: '#4FC3F7', 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  marginBottom: '20px' 
                }}>
                  Family Packages
                </h3>
                
                <p style={{ 
                  fontSize: '14px', 
                  color: 'rgba(255,255,255,0.8)', 
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, dolorum!
                </p>

                <div style={{ marginBottom: '30px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#4FC3F7' }}>$260,90</span>
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)' }}>/family</span>
                </div>

                <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className="fas fa-check" style={{ color: '#4FC3F7', fontSize: '14px' }}></i>
                    <span style={{ fontSize: '14px' }}>All Access To Waterpark</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className="fas fa-check" style={{ color: '#4FC3F7', fontSize: '14px' }}></i>
                    <span style={{ fontSize: '14px' }}>Get Two Gazebo</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className="fas fa-check" style={{ color: '#4FC3F7', fontSize: '14px' }}></i>
                    <span style={{ fontSize: '14px' }}>Free Soft Drinks</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className="fas fa-check" style={{ color: '#4FC3F7', fontSize: '14px' }}></i>
                    <span style={{ fontSize: '14px' }}>Get Four Lockers</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className="fas fa-check" style={{ color: '#4FC3F7', fontSize: '14px' }}></i>
                    <span style={{ fontSize: '14px' }}>Free Four Towels</span>
                  </div>
                </div>

                <button style={{
                  backgroundColor: '#4FC3F7',
                  color: 'white',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.3s ease'
                }}>
                  Book Now
                </button>
              </div>

              {/* Basic Packages */}
              <div style={{
                backgroundColor: '#4FC3F7',
                color: 'white',
                borderRadius: '20px',
                padding: '40px 30px',
                textAlign: 'center',
                position: 'relative'
              }}>
                <h3 style={{ 
                  color: 'white', 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  marginBottom: '20px' 
                }}>
                  Basic Packages
                </h3>
                
                <p style={{ 
                  fontSize: '14px', 
                  color: 'rgba(255,255,255,0.9)', 
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, dolorum!
                </p>

                <div style={{ marginBottom: '30px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>$60,90</span>
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>/person</span>
                </div>

                <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className="fas fa-check" style={{ color: 'white', fontSize: '14px' }}></i>
                    <span style={{ fontSize: '14px' }}>Get Small Gazebo</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className="fas fa-check" style={{ color: 'white', fontSize: '14px' }}></i>
                    <span style={{ fontSize: '14px' }}>Free Soft Drink</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className="fas fa-check" style={{ color: 'white', fontSize: '14px' }}></i>
                    <span style={{ fontSize: '14px' }}>Get One Locker</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <i className="fas fa-check" style={{ color: 'white', fontSize: '14px' }}></i>
                    <span style={{ fontSize: '14px' }}>Free Towel</span>
                  </div>
                </div>

                <button style={{
                  backgroundColor: '#2C3E50',
                  color: 'white',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.3s ease'
                }}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          
          {/* Section Header */}
          <p style={{ 
            color: '#4FC3F7', 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Attractions
          </p>
          
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            lineHeight: '1.2', 
            marginBottom: '25px',
            color: 'white'
          }}>
            Explore WaterLand Park<br />
            Attractions
          </h2>
          
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.7', 
            marginBottom: '60px',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '600px',
            margin: '0 auto 60px auto'
          }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae 
            aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem 
            obcaecati, ipsam mollitia hic.
          </p>

          {/* Attractions Carousel */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Navigation Buttons */}
            <button style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#4FC3F7',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#4FC3F7',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Attraction Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '30px',
              padding: '0 80px'
            }} className="attractions-grid">
              
              {/* Ferris Wheel */}
              <div style={{
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                height: '350px'
              }} className="attraction-card">
                <div style={{ height: '100%', position: 'relative' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Ferris Wheel"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Arcade Games */}
              <div style={{
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                height: '350px'
              }} className="attraction-card">
                <div style={{ height: '100%', position: 'relative' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Arcade Games"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '30px',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: '700',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                  }}>
                    Arcade Game
                  </div>
                </div>
              </div>

              {/* Hanging Carousel */}
              <div style={{
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                height: '350px'
              }} className="attraction-card">
                <div style={{ height: '100%', position: 'relative' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Hanging Carousel"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          
          {/* Section Header */}
          <p style={{ 
            color: '#4FC3F7', 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Our Gallery
          </p>
          
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            lineHeight: '1.2', 
            marginBottom: '25px',
            color: '#333'
          }}>
            Captured Moments In<br />
            Waterland
          </h2>
          
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.7', 
            marginBottom: '60px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto 60px auto'
          }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae 
            aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem 
            obcaecati, ipsam mollitia hic.
          </p>

          {/* Gallery Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '20px',
            height: '400px'
          }} className="gallery-grid">
            
            {/* Left Image - Water Slides */}
            <div style={{
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Water slides"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Center Image - Pool Fun */}
            <div style={{
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Pool fun activities"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Right Image - Resort Pool with Zoom Icon */}
            <div style={{
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }} className="gallery-item">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Resort pool area"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#4FC3F7',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }}>
                <i className="fas fa-search-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          
          {/* Section Header */}
          <p style={{ 
            color: '#4FC3F7', 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Our Blog
          </p>
          
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            lineHeight: '1.2', 
            marginBottom: '25px',
            color: '#333'
          }}>
            Latest Blog & Articles
          </h2>
          
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.7', 
            marginBottom: '60px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto 60px auto'
          }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae 
            aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem 
            obcaecati, ipsam mollitia hic.
          </p>

          {/* Blog Cards Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '30px'
          }} className="blog-grid">
            
            {/* Blog Card 1 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="blog-card">
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Children enjoying water park"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '30px' }}>
                <h4 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#333', 
                  marginBottom: '15px',
                  lineHeight: '1.3'
                }}>
                  Why Children Don't Like Getting Out Of The Water
                </h4>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666', 
                  lineHeight: '1.6', 
                  marginBottom: '20px' 
                }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam aspernatur nam quidem porro sapiente, neque a quibusdam....
                </p>
                <button style={{
                  backgroundColor: '#4FC3F7',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}>
                  Read More
                </button>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="blog-card">
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Spring break water fun"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '30px' }}>
                <h4 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#333', 
                  marginBottom: '15px',
                  lineHeight: '1.3'
                }}>
                  5 Ways To Enjoy Waterland This Spring Break
                </h4>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666', 
                  lineHeight: '1.6', 
                  marginBottom: '20px' 
                }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam aspernatur nam quidem porro sapiente, neque a quibusdam....
                </p>
                <button style={{
                  backgroundColor: '#4FC3F7',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}>
                  Read More
                </button>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="blog-card">
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Family amusement park tips"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '30px' }}>
                <h4 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#333', 
                  marginBottom: '15px',
                  lineHeight: '1.3'
                }}>
                  3 Tips for Your Family Spring Break at Amusement Park
                </h4>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666', 
                  lineHeight: '1.6', 
                  marginBottom: '20px' 
                }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam aspernatur nam quidem porro sapiente, neque a quibusdam....
                </p>
                <button style={{
                  backgroundColor: '#4FC3F7',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}>
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          
          {/* Section Header */}
          <p style={{ 
            color: '#4FC3F7', 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Meet Our Team
          </p>
          
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            lineHeight: '1.2', 
            marginBottom: '25px',
            color: '#333'
          }}>
            Our Waterland Park Dedicated<br />
            Team Member
          </h2>
          
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.7', 
            marginBottom: '60px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto 60px auto'
          }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae 
            aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem 
            obcaecati, ipsam mollitia hic.
          </p>

          {/* Team Cards Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '30px'
          }} className="team-grid">
            
            {/* Team Member 1 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="team-card">
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="David James"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '30px' }}>
                <h4 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#333', 
                  marginBottom: '10px'
                }}>
                  David James
                </h4>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#4FC3F7', 
                  fontWeight: '600',
                  marginBottom: '15px' 
                }}>
                  Park Manager
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666', 
                  lineHeight: '1.6' 
                }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="team-card">
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="William John"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '30px' }}>
                <h4 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#333', 
                  marginBottom: '10px'
                }}>
                  William John
                </h4>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#4FC3F7', 
                  fontWeight: '600',
                  marginBottom: '15px' 
                }}>
                  Safety Director
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666', 
                  lineHeight: '1.6' 
                }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="team-card">
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Michael John"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '30px' }}>
                <h4 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#333', 
                  marginBottom: '10px'
                }}>
                  Michael John
                </h4>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#4FC3F7', 
                  fontWeight: '600',
                  marginBottom: '15px' 
                }}>
                  Operations Manager
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666', 
                  lineHeight: '1.6' 
                }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ 
        padding: '100px 0', 
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          
          {/* Section Header */}
          <p style={{ 
            color: '#4FC3F7', 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Testimonials
          </p>
          
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            lineHeight: '1.2', 
            marginBottom: '25px',
            color: '#333'
          }}>
            Our Clients Reviews
          </h2>
          
          <p style={{ 
            fontSize: '16px', 
            lineHeight: '1.7', 
            marginBottom: '60px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto 60px auto'
          }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae 
            aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem 
            obcaecati, ipsam mollitia hic.
          </p>

          {/* Testimonials Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '30px'
          }} className="testimonials-grid">
            
            {/* Testimonial 1 */}
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '15px',
              padding: '40px 30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="testimonial-card">
              <div style={{ marginBottom: '30px' }}>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#666', 
                  lineHeight: '1.7',
                  fontStyle: 'italic'
                }}>
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos mollitia fugiat, nihil autem reprehenderit aperiam maxime minima consequatur, nam iste eius velit perferendis voluptatem at atque neque soluta reiciendis doloremque."
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    marginRight: '15px'
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <h5 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#333', 
                    marginBottom: '5px'
                  }}>
                    Sarah Johnson
                  </h5>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#4FC3F7', 
                    fontWeight: '600'
                  }}>
                    Happy Customer
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '15px',
              padding: '40px 30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="testimonial-card">
              <div style={{ marginBottom: '30px' }}>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#666', 
                  lineHeight: '1.7',
                  fontStyle: 'italic'
                }}>
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos mollitia fugiat, nihil autem reprehenderit aperiam maxime minima consequatur, nam iste eius velit perferendis voluptatem at atque neque soluta reiciendis doloremque."
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    marginRight: '15px'
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <h5 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#333', 
                    marginBottom: '5px'
                  }}>
                    Mark Wilson
                  </h5>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#4FC3F7', 
                    fontWeight: '600'
                  }}>
                    Family Visitor
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '15px',
              padding: '40px 30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="testimonial-card">
              <div style={{ marginBottom: '30px' }}>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#666', 
                  lineHeight: '1.7',
                  fontStyle: 'italic'
                }}>
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos mollitia fugiat, nihil autem reprehenderit aperiam maxime minima consequatur, nam iste eius velit perferendis voluptatem at atque neque soluta reiciendis doloremque."
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                  alt="Client"
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    marginRight: '15px'
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <h5 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#333', 
                    marginBottom: '5px'
                  }}>
                    Emily Davis
                  </h5>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#4FC3F7', 
                    fontWeight: '600'
                  }}>
                    Regular Visitor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#2C3E50', 
        color: 'white', 
        padding: '80px 0 30px 0' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Footer Content */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr 1fr 1fr', 
            gap: '40px',
            marginBottom: '50px'
          }} className="footer-grid">
            
            {/* Company Info */}
            <div>
              <h3 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: '#4FC3F7', 
                marginBottom: '20px'
              }}>
                WaterLand
              </h3>
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.7', 
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '25px'
              }}>
                Dolor amet sit justo amet elitr clita ipsum elitr est. Lorem ipsum dolor sit amet, consectetur adipiscing...
              </p>
              <div style={{ marginBottom: '15px' }}>
                <i className="fas fa-map-marker-alt" style={{ color: '#4FC3F7', marginRight: '10px' }}></i>
                <span>123 Street New York, USA</span>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <i className="fas fa-envelope" style={{ color: '#4FC3F7', marginRight: '10px' }}></i>
                <span>info@waterland.com</span>
              </div>
              <div>
                <i className="fas fa-phone" style={{ color: '#4FC3F7', marginRight: '10px' }}></i>
                <span>(+012) 3456 7890</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                marginBottom: '25px',
                color: 'white'
              }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['About Us', 'Feature', 'Attractions', 'Tickets', 'Blog', 'Contact us'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{ 
                      color: 'rgba(255,255,255,0.8)', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                marginBottom: '25px',
                color: 'white'
              }}>
                Support
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Privacy Policy', 'Terms & Conditions', 'Disclaimer', 'Support', 'FAQ', 'Help'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{ 
                      color: 'rgba(255,255,255,0.8)', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                marginBottom: '25px',
                color: 'white'
              }}>
                Opening Hours
              </h4>
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#4FC3F7',
                  marginBottom: '8px'
                }}>
                  Monday - Friday:
                </h6>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  11:00 AM - 16:00 PM
                </p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#4FC3F7',
                  marginBottom: '8px'
                }}>
                  Saturday - Sunday:
                </h6>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  09:00 AM - 17:00 PM
                </p>
              </div>
              <div>
                <h6 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#4FC3F7',
                  marginBottom: '8px'
                }}>
                  Holiday:
                </h6>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  09:00 AM - 17:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            paddingTop: '30px',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: 'rgba(255,255,255,0.6)', 
              fontSize: '14px',
              margin: 0
            }}>
              © 2024 WaterLand. All Rights Reserved. Designed by HTML Codex
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @media (hover: hover) {
          .feature-card:hover {
            transform: translateY(-10px);
          }
        }
        
        @media (hover: hover) {
          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
        }
        
        @media (hover: hover) {
          .attraction-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
        }
        
        @media (hover: hover) {
          .gallery-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
        }
        
        @media (hover: hover) {
          .blog-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
        }
        
        @media (hover: hover) {
          .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
        }
        
        @media (hover: hover) {
          .testimonial-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
        }
        
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .service-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .attractions-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 0 20px !important;
          }
          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            height: auto !important;
          }
          .gallery-grid .gallery-item {
            height: 250px !important;
          }
          .blog-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .team-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
        
        @media (max-width: 1024px) and (min-width: 769px) {
          .service-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .attractions-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            padding: 0 40px !important;
          }
        }
        
        @media (max-width: 600px) {
          .attractions-grid {
            grid-template-columns: 1fr !important;
            padding: 0 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModernHome;
