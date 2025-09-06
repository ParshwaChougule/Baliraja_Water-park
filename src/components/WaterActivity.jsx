import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getGalleryImages } from '../services/storageService';

const WaterActivity = () => {
  const [waterImages, setWaterImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWaterImages = async () => {
      try {
        // Load from both Firebase and localStorage
        const [firebaseResult, localImages] = await Promise.all([
          getGalleryImages().catch(() => ({ success: false, images: [] })),
          Promise.resolve(JSON.parse(localStorage.getItem('adminGalleryImages') || '[]'))
        ]);

        let waterActivityImages = [];

        // Process Firebase images first
        if (firebaseResult.success && firebaseResult.images.length > 0) {
          waterActivityImages = firebaseResult.images.filter(image => 
            image.category === 'water' || (!image.category && image.path && image.path.includes('water'))
          );
        }

        // Process localStorage images and merge (avoid duplicates)
        if (localImages.length > 0) {
          const localWaterImages = localImages.filter(image => 
            image.category === 'water' || (!image.category && image.path && image.path.includes('water'))
          );
          
          localWaterImages.forEach(image => {
            const exists = waterActivityImages.some(existing => 
              existing.url === image.url || existing.name === image.name
            );
            if (!exists) {
              // Use localUrl for display if available, otherwise use url
              const displayImage = {
                ...image,
                url: image.localUrl || image.url
              };
              waterActivityImages.push(displayImage);
            }
          });
        }

        setWaterImages(waterActivityImages);
        console.log(`Water Activity: Loaded ${waterActivityImages.length} images`);
      } catch (error) {
        console.error('Error loading water activity images:', error);
      }
      setLoading(false);
    };

    loadWaterImages();

    // Listen for gallery updates
    const handleGalleryUpdate = () => {
      console.log('Water Activity: Gallery update received, reloading...');
      loadWaterImages();
    };

    window.addEventListener('adminGalleryUpdate', handleGalleryUpdate);
    return () => window.removeEventListener('adminGalleryUpdate', handleGalleryUpdate);
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb text-white mb-3">
                  <li className="breadcrumb-item"><a href="/" className="text-white text-decoration-none">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Water Activity</li>
                </ol>
              </nav>
              <h1 className="display-4 fw-bold mb-3">
                <span className="me-3">🏊‍♂️</span>
                Water Activities
              </h1>
              <p className="lead mb-0">
                Dive into excitement with our amazing water activities! From swimming pools to water sports, 
                experience the thrill of aquatic adventures at Baliraja Agro Tourism.
              </p>
            </div>
            <div className="col-lg-4 text-center">
              <div className="bg-white bg-opacity-10 rounded-circle p-4 d-inline-block">
                <span style={{ fontSize: '5rem' }}>🏊‍♂️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Water Activity Gallery */}
      <div className="container-fluid gallery py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
            <h4 className="text-primary">Water Activities</h4>
            <h1 className="display-5 mb-4">Splash Into Adventure</h1>
            <p className="mb-0">
              Experience the refreshing world of water activities. From relaxing pool sessions to exciting water sports, 
              we have something for everyone who loves the water.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading water activity images...</p>
            </div>
          ) : (
            <div className="row g-4">
              {waterImages.length === 0 ? (
                <div className="col-12 text-center py-5">
                  <div className="alert alert-info border-primary">
                    <span className="fs-1 mb-3 d-block">🏊‍♂️</span>
                    <h5 className="text-primary">No Water Activity Images Yet</h5>
                    <p className="mb-0">Water activity images will appear here when uploaded through admin dashboard.</p>
                  </div>
                </div>
              ) : (
                waterImages.map((image, index) => (
                  <div key={image.id} className={`col-md-${index % 3 === 0 ? '6' : '3'} wow fadeInUp`} data-wow-delay={`${0.2 + (index * 0.2)}s`}>
                    <div className="gallery-item position-relative">
                      <img 
                        src={image.url || image.path || `https://via.placeholder.com/400x300?text=${encodeURIComponent(image.name || 'Water Activity')}`} 
                        className="img-fluid rounded w-100 h-100" 
                        alt={image.name || 'Water Activity Image'}
                        onError={(e) => {
                          console.error('Image failed to load:', image);
                          e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(image.name || 'Image Not Found')}`;
                        }}
                        style={{ 
                          minHeight: '200px', 
                          objectFit: 'cover',
                          backgroundColor: '#f8f9fa'
                        }}
                      />
                      {/* Water Activity Badge */}
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-primary">
                          🏊‍♂️ Water Activity
                        </span>
                      </div>
                      <div className="search-icon">
                        <a href={image.url || image.path || '#'} className="btn btn-light btn-lg-square rounded-circle" data-lightbox={`WaterActivity-${index}`}>
                          <i className="fas fa-search-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Water Activity Features */}
          <div className="row mt-5 pt-5">
            <div className="col-12">
              <h3 className="text-center text-primary mb-4">What We Offer</h3>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-primary text-white rounded-circle p-3 d-inline-block mb-3">
                <i className="fas fa-swimming-pool fa-2x"></i>
              </div>
              <h5>Swimming Pools</h5>
              <p className="text-muted">Clean and safe swimming pools for all age groups with lifeguard supervision.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-primary text-white rounded-circle p-3 d-inline-block mb-3">
                <i className="fas fa-water fa-2x"></i>
              </div>
              <h5>Water Sports</h5>
              <p className="text-muted">Exciting water sports activities including water volleyball and aqua aerobics.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-primary text-white rounded-circle p-3 d-inline-block mb-3">
                <i className="fas fa-child fa-2x"></i>
              </div>
              <h5>Kids Pool</h5>
              <p className="text-muted">Special shallow pools designed for children with fun water features.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default WaterActivity;
