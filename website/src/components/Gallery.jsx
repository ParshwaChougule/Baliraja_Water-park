import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getGalleryImages } from '../services/storageService';
import { offlineManager } from '../utils/offlineMode';

const Gallery = () => {
  const [categorizedImages, setCategorizedImages] = useState({
    water: [],
    fun: [],
    garden: []
  });

  const categories = {
    water: { name: 'Water Activities', icon: '🏊‍♂️', color: 'primary' },
    fun: { name: 'Fun Activities', icon: '🎮', color: 'success' },
    garden: { name: 'Garden Activities', icon: '🍃', color: 'info' }
  };

  useEffect(() => {
    // Load images from Firebase Storage and localStorage
    const loadImages = async () => {
      try {
        console.log('Loading gallery images...');
        
        // Load from both Firebase and localStorage simultaneously
        const [firebaseResult, localImages] = await Promise.all([
          getGalleryImages().catch(() => ({ success: false, images: [] })),
          Promise.resolve(JSON.parse(localStorage.getItem('adminGalleryImages') || '[]'))
        ]);

        const categorized = {
          water: [],
          fun: [],
          garden: []
        };

        // Process Firebase images first
        if (firebaseResult.success && firebaseResult.images.length > 0) {
          console.log(`Loaded ${firebaseResult.images.length} images from Firebase`);
          firebaseResult.images.forEach(image => {
            const category = image.category || 'water';
            if (categorized[category]) {
              categorized[category].push(image);
            }
          });
        }

        // Process localStorage images and merge (avoid duplicates)
        if (localImages.length > 0) {
          console.log(`Found ${localImages.length} images in localStorage`);
          localImages.forEach(image => {
            const category = image.category || 'water';
            if (categorized[category]) {
              // Check if image already exists (by URL or name)
              const exists = categorized[category].some(existing => 
                existing.url === image.url || existing.name === image.name
              );
              if (!exists) {
                // Use localUrl for display if available, otherwise use url
                const displayImage = {
                  ...image,
                  url: image.localUrl || image.url
                };
                categorized[category].push(displayImage);
              }
            }
          });
        }

        setCategorizedImages(categorized);
        
        const totalImages = Object.values(categorized).reduce((sum, arr) => sum + arr.length, 0);
        console.log(`Total images loaded: ${totalImages} (Water: ${categorized.water.length}, Fun: ${categorized.fun.length}, Garden: ${categorized.garden.length})`);

      } catch (error) {
        console.error('Error loading gallery images:', error);
      }
    };

    loadImages();

    // Listen for gallery updates from admin dashboard
    const handleGalleryUpdate = () => {
      console.log('Gallery update event received, reloading images...');
      loadImages();
    };

    
    window.addEventListener('adminGalleryUpdate', handleGalleryUpdate);
    
    return () => {
      window.removeEventListener('adminGalleryUpdate', handleGalleryUpdate);
    };
  }, []);

  return (
    <div>
      <Header />
      
      {/* Page Header */}
      <section style={{ 
        padding: '150px 0 100px 0',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
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
            Our Gallery
          </h1>
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>Home</a>
            <span style={{ color: 'white', margin: '0 15px' }}>/</span>
            <span style={{ color: '#4FC3F7', fontSize: '16px' }}>Gallery</span>
          </nav>
        </div>
      </section>

      {/* Gallery Start */}
      <div className="container-fluid gallery py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
            <h4 className="text-primary">Our Gallery</h4>
            <h1 className="display-5 mb-4">Captured Moments In Baliraja Agro Tourism</h1>
            <p className="mb-0">Explore our exciting activities organized by categories - water adventures, fun games, and beautiful garden experiences.
            </p>
          </div>

          {/* Category Sections */}
          {Object.entries(categories).map(([categoryKey, category]) => {
            const categoryImages = categorizedImages[categoryKey] || [];
            
            return (
              <div key={categoryKey} className="mb-5">
                {/* Category Header */}
                <div className="row mb-4">
                  <div className="col-12 text-center">
                    <div className={`badge bg-${category.color} fs-5 px-4 py-2 mb-3`}>
                      <span className="me-2">{category.icon}</span>
                      {category.name}
                    </div>
                    <h3 className={`text-${category.color} mb-3`}>{category.name}</h3>
                  </div>
                </div>

                {/* Category Images */}
                <div className="row g-4 mb-5">
                  {categoryImages.length === 0 ? (
                    <div className="col-12 text-center py-4">
                      <div className={`alert alert-light border-${category.color}`}>
                        <span className="fs-1 mb-3 d-block">{category.icon}</span>
                        <h5 className="text-muted">No {category.name.toLowerCase()} images yet</h5>
                        <p className="text-muted mb-0">Images will appear here when uploaded through admin dashboard.</p>
                      </div>
                    </div>
                  ) : (
                    categoryImages.map((image, index) => (
                      <div key={image.id} className={`col-md-${index % 3 === 0 ? '6' : '3'} wow fadeInUp`} data-wow-delay={`${0.2 + (index * 0.2)}s`}>
                        <div className="gallery-item position-relative">
                          <img 
                            src={image.url || image.path || `https://via.placeholder.com/400x300?text=${encodeURIComponent(image.name || 'Image')}`} 
                            className="img-fluid rounded w-100 h-100" 
                            alt={image.name || 'Gallery Image'}
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
                          {/* Category Badge on Image */}
                          <div className="position-absolute top-0 start-0 m-2">
                            <span className={`badge bg-${category.color}`}>
                              {category.icon} {category.name}
                            </span>
                          </div>
                          <div className="search-icon">
                            <a href={image.url || image.path || '#'} className="btn btn-light btn-lg-square rounded-circle" data-lightbox={`Gallery-${categoryKey}-${index}`}>
                              <i className="fas fa-search-plus"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}

          {/* Show message if no images in any category */}
          {Object.values(categorizedImages).every(categoryImages => categoryImages.length === 0) && (
            <div className="row">
              <div className="col-12 text-center py-5">
                <div className="alert alert-info">
                  <h5>No images uploaded yet</h5>
                  <p>Images uploaded through admin dashboard will appear here in their respective categories.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Gallery End */}

      <Footer />
    </div>
  );
};

export default Gallery;
