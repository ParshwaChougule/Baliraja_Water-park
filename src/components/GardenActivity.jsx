import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getGalleryImages } from '../services/storageService';

const GardenActivity = () => {
  const [gardenImages, setGardenImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGardenImages = async () => {
      try {
        // Load from both Firebase and localStorage
        const [firebaseResult, localImages] = await Promise.all([
          getGalleryImages().catch(() => ({ success: false, images: [] })),
          Promise.resolve(JSON.parse(localStorage.getItem('adminGalleryImages') || '[]'))
        ]);

        let gardenActivityImages = [];

        // Process Firebase images first
        if (firebaseResult.success && firebaseResult.images.length > 0) {
          gardenActivityImages = firebaseResult.images.filter(image => 
            image.category === 'garden' || (!image.category && image.path && image.path.includes('garden'))
          );
        }

        // Process localStorage images and merge (avoid duplicates)
        if (localImages.length > 0) {
          const localGardenImages = localImages.filter(image => 
            image.category === 'garden' || (!image.category && image.path && image.path.includes('garden'))
          );
          
          localGardenImages.forEach(image => {
            const exists = gardenActivityImages.some(existing => 
              existing.url === image.url || existing.name === image.name
            );
            if (!exists) {
              // Use localUrl for display if available, otherwise use url
              const displayImage = {
                ...image,
                url: image.localUrl || image.url
              };
              gardenActivityImages.push(displayImage);
            }
          });
        }

        setGardenImages(gardenActivityImages);
        console.log(`Garden Activity: Loaded ${gardenActivityImages.length} images`);
      } catch (error) {
        console.error('Error loading garden activity images:', error);
      }
      setLoading(false);
    };

    loadGardenImages();

    // Listen for gallery updates
    const handleGalleryUpdate = () => {
      console.log('Garden Activity: Gallery update received, reloading...');
      loadGardenImages();
    };

    window.addEventListener('adminGalleryUpdate', handleGalleryUpdate);
    return () => window.removeEventListener('adminGalleryUpdate', handleGalleryUpdate);
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-info text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb text-white mb-3">
                  <li className="breadcrumb-item"><a href="/" className="text-white text-decoration-none">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Garden Activity</li>
                </ol>
              </nav>
              <h1 className="display-4 fw-bold mb-3">
                <span className="me-3">🍃</span>
                Garden Activities
              </h1>
              <p className="lead mb-0">
                Connect with nature through our beautiful garden activities! Explore lush greenery, learn about plants, 
                and enjoy peaceful moments in our natural paradise at Baliraja Agro Tourism.
              </p>
            </div>
            <div className="col-lg-4 text-center">
              <div className="bg-white bg-opacity-10 rounded-circle p-4 d-inline-block">
                <span style={{ fontSize: '5rem' }}>🍃</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Garden Activity Gallery */}
      <div className="container-fluid gallery py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
            <h4 className="text-info">Garden Activities</h4>
            <h1 className="display-5 mb-4">Nature & Agriculture</h1>
            <p className="mb-0">
              Immerse yourself in the beauty of nature with our garden activities. From organic farming experiences 
              to peaceful nature walks, discover the wonders of agricultural life.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading garden activity images...</p>
            </div>
          ) : (
            <div className="row g-4">
              {gardenImages.length === 0 ? (
                <div className="col-12 text-center py-5">
                  <div className="alert alert-light border-info">
                    <span className="fs-1 mb-3 d-block">🍃</span>
                    <h5 className="text-info">No Garden Activity Images Yet</h5>
                    <p className="mb-0">Garden activity images will appear here when uploaded through admin dashboard.</p>
                  </div>
                </div>
              ) : (
                gardenImages.map((image, index) => (
                  <div key={image.id} className={`col-md-${index % 3 === 0 ? '6' : '3'} wow fadeInUp`} data-wow-delay={`${0.2 + (index * 0.2)}s`}>
                    <div className="gallery-item position-relative">
                      <img 
                        src={image.url || image.path || `https://via.placeholder.com/400x300?text=${encodeURIComponent(image.name || 'Garden Activity')}`} 
                        className="img-fluid rounded w-100 h-100" 
                        alt={image.name || 'Garden Activity Image'}
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
                      {/* Garden Activity Badge */}
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-info">
                          🍃 Garden Activity
                        </span>
                      </div>
                      <div className="search-icon">
                        <a href={image.url || image.path || '#'} className="btn btn-light btn-lg-square rounded-circle" data-lightbox={`GardenActivity-${index}`}>
                          <i className="fas fa-search-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Garden Activity Features */}
          <div className="row mt-5 pt-5">
            <div className="col-12">
              <h3 className="text-center text-info mb-4">Garden Experiences</h3>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-info text-white rounded-circle p-3 d-inline-block mb-3">
                <i className="fas fa-seedling fa-2x"></i>
              </div>
              <h5>Organic Farming</h5>
              <p className="text-muted">Learn about organic farming techniques and participate in planting activities.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-info text-white rounded-circle p-3 d-inline-block mb-3">
                <i className="fas fa-tree fa-2x"></i>
              </div>
              <h5>Nature Walks</h5>
              <p className="text-muted">Peaceful walks through our beautiful gardens and agricultural fields.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-info text-white rounded-circle p-3 d-inline-block mb-3">
                <i className="fas fa-apple-alt fa-2x"></i>
              </div>
              <h5>Fruit Picking</h5>
              <p className="text-muted">Seasonal fruit picking activities where you can harvest fresh produce.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GardenActivity;
