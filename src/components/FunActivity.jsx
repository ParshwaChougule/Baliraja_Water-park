import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getGalleryImages } from '../services/storageService';

const FunActivity = () => {
  const [funImages, setFunImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFunImages = async () => {
      try {
        console.log('🎮 FunActivity: Loading images...');
        
        let funActivityImages = [];

        // Load from localStorage first (admin uploads)
        try {
          const localImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
          const categorizedImages = JSON.parse(localStorage.getItem('adminCategorizedImages') || '{"water":[],"fun":[],"garden":[]}');
          
          console.log('📱 LocalStorage check:', {
            adminGalleryImages: localImages.length,
            funCategoryImages: categorizedImages.fun ? categorizedImages.fun.length : 0
          });
          
          // Get fun images from both sources
          const allLocalImages = [...localImages, ...categorizedImages.fun];
          
          const localFunImages = allLocalImages.filter(image => {
            return image.category === 'fun' || 
                   (!image.category && image.path && image.path.includes('fun'));
          });
          
          console.log(`🎮 Found ${localFunImages.length} fun images in localStorage`);
          
          localFunImages.forEach(image => {
            const exists = funActivityImages.some(existing => 
              existing.id === image.id || existing.url === image.url || existing.name === image.name
            );
            if (!exists) {
              funActivityImages.push({
                ...image,
                url: image.url || image.localUrl
              });
            }
          });
        } catch (localError) {
          console.error('❌ Error loading from localStorage:', localError);
        }

        // Load from getGalleryImages (which now prioritizes localStorage)
        try {
          console.log('🔍 Loading from getGalleryImages...');
          const result = await getGalleryImages();
          console.log('🔍 getGalleryImages result:', result);
          
          if (result.success && result.images && result.images.length > 0) {
            const funFromService = result.images.filter(img => {
              const isFun = img.category === 'fun' || 
                           (img.name && img.name.toLowerCase().includes('fun')) ||
                           (img.path && img.path.toLowerCase().includes('fun'));
              if (isFun) {
                console.log('🎮 Found fun image from service:', {
                  name: img.name,
                  category: img.category,
                  source: img.source || 'unknown',
                  hasUrl: !!img.url
                });
              }
              return isFun;
            });
            
            console.log(`🎮 Fun images from service: ${funFromService.length}`);
            
            // Merge with existing images, avoiding duplicates
            funFromService.forEach(img => {
              const exists = funActivityImages.some(existing => 
                existing.id === img.id || existing.name === img.name || existing.url === img.url
              );
              if (!exists) {
                funActivityImages.push(img);
              }
            });
          }
        } catch (serviceError) {
          console.error('❌ Error loading from getGalleryImages:', serviceError);
        }

        setFunImages(funActivityImages);
        console.log(`✅ FunActivity: Final count = ${funActivityImages.length} images`);
      } catch (error) {
        console.error('❌ Error loading fun activity images:', error);
      }
      setLoading(false);
    };

    loadFunImages();

    // Listen for gallery updates from admin dashboard
    const handleGalleryUpdate = () => {
      console.log('🔄 FunActivity: Admin gallery update received, reloading...');
      setTimeout(loadFunImages, 100);
    };

    const handleStorageChange = (e) => {
      if (e.key === 'adminGalleryImages' || e.key === 'adminCategorizedImages') {
        console.log('🔄 FunActivity: Storage change detected, reloading...');
        setTimeout(loadFunImages, 100);
      }
    };

    window.addEventListener('adminGalleryUpdate', handleGalleryUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('adminGalleryUpdate', handleGalleryUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-success text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb text-white mb-3">
                  <li className="breadcrumb-item"><a href="/" className="text-white text-decoration-none">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Fun Activity</li>
                </ol>
              </nav>
              <h1 className="display-4 fw-bold mb-3">
                <span className="me-3">🎮</span>
                Fun Activities
              </h1>
              <p className="lead mb-0">
                Get ready for endless entertainment! Our fun activities are designed to bring joy and excitement 
                to visitors of all ages at Baliraja Agro Tourism.
              </p>
            </div>
            <div className="col-lg-4 text-center">
              <div className="bg-white bg-opacity-10 rounded-circle p-4 d-inline-block">
                <span style={{ fontSize: '5rem' }}>🎮</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Activity Gallery */}
      <div className="container-fluid gallery py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
            <h4 className="text-success">Fun Activities</h4>
            <h1 className="display-5 mb-4">Entertainment & Games</h1>
            <p className="mb-0">
              Discover a world of fun and entertainment with our exciting activities. From indoor games to outdoor adventures, 
              we guarantee smiles and laughter for the whole family.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading fun activity images...</p>
            </div>
          ) : (
            <div className="row g-4">
              {funImages.length === 0 ? (
                <div className="col-12 text-center py-5">
                  <div className="alert alert-light border-success">
                    <span className="fs-1 mb-3 d-block">🎮</span>
                    <h5 className="text-success">No Fun Activity Images Yet</h5>
                    <p className="mb-0">Fun activity images will appear here when uploaded through admin dashboard.</p>
                  </div>
                </div>
              ) : (
                funImages.map((image, index) => (
                  <div key={image.id} className={`col-md-${index % 3 === 0 ? '6' : '3'} wow fadeInUp`} data-wow-delay={`${0.2 + (index * 0.2)}s`}>
                    <div className="gallery-item position-relative">
                      <img 
                        src={image.url || image.path || `https://via.placeholder.com/400x300?text=${encodeURIComponent(image.name || 'Fun Activity')}`} 
                        className="img-fluid rounded w-100 h-100" 
                        alt={image.name || 'Fun Activity Image'}
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
                      {/* Fun Activity Badge */}
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-success">
                          🎮 Fun Activity
                        </span>
                      </div>
                      <div className="search-icon">
                        <a href={image.url || image.path || '#'} className="btn btn-light btn-lg-square rounded-circle" data-lightbox={`FunActivity-${index}`}>
                          <i className="fas fa-search-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Fun Activity Features */}
          <div className="row mt-5 pt-5">
            <div className="col-12">
              <h3 className="text-center text-success mb-4">Entertainment Options</h3>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-success text-white rounded-circle p-3 d-inline-block mb-3">
                <i className="fas fa-gamepad fa-2x"></i>
              </div>
              <h5>Indoor Games</h5>
              <p className="text-muted">Table tennis, carrom, chess, and other indoor games for rainy day entertainment.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-success text-white rounded-circle p-3 d-inline-block mb-3">
                <i className="fas fa-running fa-2x"></i>
              </div>
              <h5>Outdoor Sports</h5>
              <p className="text-muted">Cricket, volleyball, badminton and other outdoor sports activities.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-success text-white rounded-circle p-3 d-inline-block mb-3">
                <i className="fas fa-music fa-2x"></i>
              </div>
              <h5>Cultural Events</h5>
              <p className="text-muted">Live music, dance performances, and cultural programs during special occasions.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FunActivity;
