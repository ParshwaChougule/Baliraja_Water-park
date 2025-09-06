import React from 'react';
import Header from './Header';

const Puri = () => {
  return (
    <div>
      <Header />
      
      {/* Page Header */}
      <section style={{ 
        padding: '150px 0 100px 0',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
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
            Puri Beach Resort
          </h1>
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Home</a>
            <span style={{ color: 'white', margin: '0 15px' }}>/</span>
            <span style={{ color: '#4FC3F7', fontSize: '16px' }}>Puri</span>
          </nav>
        </div>
      </section>

      {/* Puri Content Start */}
      <section style={{ padding: '100px 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h4 style={{ color: '#4FC3F7', fontSize: '18px', marginBottom: '10px' }}>Puri Beach Resort</h4>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Experience the Golden Beach of Odisha</h1>
            <p style={{ fontSize: '16px', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
              Discover the pristine beauty of Puri Beach with our exclusive water park experience. Enjoy the perfect blend of traditional coastal charm and modern aquatic adventures.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            {/* Beach Activities */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '15px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#4FC3F7', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px',
                fontSize: '32px',
                color: 'white'
              }}>
                🏖️
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Beach Activities</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Enjoy beach volleyball, surfing lessons, and traditional fishing experiences along the golden shores of Puri Beach.
              </p>
            </div>

            {/* Water Sports */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '15px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#4FC3F7', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px',
                fontSize: '32px',
                color: 'white'
              }}>
                🏄‍♂️
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Water Sports</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Experience thrilling jet skiing, parasailing, and banana boat rides in the crystal-clear waters of the Bay of Bengal.
              </p>
            </div>

            {/* Cultural Heritage */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '15px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#4FC3F7', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 20px',
                fontSize: '32px',
                color: 'white'
              }}>
              🏛️
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Cultural Heritage</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Visit the famous Jagannath Temple and experience the rich cultural heritage of this sacred coastal city.
              </p>
            </div>
          </div>

          {/* Gallery Section */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Puri Beach Gallery</h2>
            <p style={{ color: '#666', marginBottom: '40px' }}>Capture the beauty of Puri's golden coastline</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '250px',
              borderRadius: '15px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
              }}>
                Golden Sunrise
              </div>
            </div>

            <div style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '250px',
              borderRadius: '15px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
              }}>
                Beach Activities
              </div>
            </div>

            <div style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '250px',
              borderRadius: '15px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
              }}>
                Cultural Heritage
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#1a1a1a', 
        color: 'white', 
        padding: '60px 0 20px 0' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#4FC3F7' }}>
                <i className="fas fa-swimmer" style={{ marginRight: '10px' }}></i>
                WaterLand Puri
              </h3>
              <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                Experience the perfect blend of beach paradise and water park excitement at Puri's premier destination.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a>
                <a href="/attractions" style={{ color: '#ccc', textDecoration: 'none' }}>Attractions</a>
                <a href="/gallery" style={{ color: '#ccc', textDecoration: 'none' }}>Gallery</a>
                <a href="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</a>
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Contact Info</h4>
              <div style={{ color: '#ccc', lineHeight: '1.8' }}>
                <p><i className="fas fa-map-marker-alt" style={{ marginRight: '10px', color: '#4FC3F7' }}></i>Puri Beach, Odisha, India</p>
                <p><i className="fas fa-phone" style={{ marginRight: '10px', color: '#4FC3F7' }}></i>+91 9876543210</p>
                <p><i className="fas fa-envelope" style={{ marginRight: '10px', color: '#4FC3F7' }}></i>info@waterlandpuri.com</p>
              </div>
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid #333', 
            paddingTop: '20px', 
            textAlign: 'center', 
            color: '#999' 
          }}>
            <p>&copy; 2024 WaterLand Puri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Puri;
