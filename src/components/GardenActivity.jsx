import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getGalleryImages } from '../services/storageService';

const GardenActivity = () => {
  const [gardenImages, setGardenImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGardenImages = async () => {
    try {
      console.log('🌿 GardenActivity: Loading images...');
      
      let gardenActivityImages = [];

      // Load from localStorage first (admin uploads)
      try {
        const adminImages = localStorage.getItem('adminGalleryImages');
        const adminCategorizedImages = localStorage.getItem('adminCategorizedImages');
        
        console.log('📱 localStorage data found:', {
          adminImages: adminImages ? 'YES' : 'NO',
          adminCategorizedImages: adminCategorizedImages ? 'YES' : 'NO'
        });
        
        // Load from adminCategorizedImages first (primary source)
        if (adminCategorizedImages) {
          const parsedCategorized = JSON.parse(adminCategorizedImages);
          if (parsedCategorized.garden && Array.isArray(parsedCategorized.garden)) {
            console.log('🌿 Garden category images from localStorage:', parsedCategorized.garden.length);
            gardenActivityImages = [...parsedCategorized.garden];
          }
        }
        
        // Also check adminGalleryImages for garden category
        if (adminImages) {
          const parsedAdminImages = JSON.parse(adminImages);
          console.log('📱 Total admin images:', parsedAdminImages.length);
          
          // Filter for garden category images
          const gardenFromAdmin = parsedAdminImages.filter(img => {
            const isGarden = img.category === 'garden';
            if (isGarden) {
              console.log('🌿 Found garden image from admin:', {
                name: img.name,
                category: img.category,
                source: img.source || 'admin',
                hasUrl: !!img.url
              });
            }
            return isGarden;
          });
          
          // Merge avoiding duplicates
          gardenFromAdmin.forEach(img => {
            const exists = gardenActivityImages.some(existing => 
              existing.id === img.id || existing.name === img.name || existing.url === img.url
            );
            if (!exists) {
              gardenActivityImages.push(img);
            }
          });
          
          console.log('🌿 Garden images from adminGalleryImages:', gardenFromAdmin.length);
        }
      } catch (localError) {
        console.error('❌ Error loading from localStorage:', localError);
      }

      // Load from getGalleryImages (which now prioritizes localStorage)
      try {
        console.log('🔍 Loading from getGalleryImages...');
        const result = await getGalleryImages();
        console.log('🔍 getGalleryImages result:', result);
        
        if (Array.isArray(result) && result.length > 0) {
          const gardenFromService = result.filter(img => {
            const isGarden = img.category === 'garden' || 
                           (img.name && img.name.toLowerCase().includes('garden')) ||
                           (img.path && img.path.toLowerCase().includes('garden'));
            if (isGarden) {
              console.log('🌿 Found garden image from service:', {
                name: img.name,
                category: img.category,
                source: img.source || 'unknown',
                hasUrl: !!img.url
              });
            }
            return isGarden;
          });

          // Filter out images without valid URLs and remove duplicates
          const validImages = gardenFromService.filter(img => {
            const hasValidUrl = img.url && 
                               img.url !== '' && 
                               !img.url.includes('temp_') &&
                               !img.url.includes('undefined') &&
                               (img.url.startsWith('http') || img.url.startsWith('data:'));
            
            if (!hasValidUrl) {
              console.log('🚫 Filtering out invalid image:', {
                id: img.id,
                name: img.name,
                url: img.url,
                reason: 'Invalid or missing URL'
              });
            }
            
            return hasValidUrl;
          });

          console.log(`🌿 Garden images from Firebase: ${gardenFromService.length}`);
          
          // Merge with existing images, avoiding duplicates
          gardenFromService.forEach(img => {
            const exists = gardenActivityImages.some(existing => 
              existing.id === img.id || existing.name === img.name || existing.url === img.url
            );
            if (!exists) {
              gardenActivityImages.push(img);
            }
          });
        }
      } catch (serviceError) {
        console.error('❌ Error loading from getGalleryImages:', serviceError);
      }

      // Filter out images without valid URLs and remove duplicates
      const validImages = gardenActivityImages.filter(img => {
        const hasValidUrl = img.url && 
                           img.url !== '' && 
                           !img.id?.includes('temp_') &&
                           !img.url.includes('undefined') &&
                           (img.url.startsWith('http') || img.url.startsWith('data:'));
        
        if (!hasValidUrl) {
          console.log('🚫 Filtering out invalid image:', {
            id: img.id,
            name: img.name,
            url: img.url,
            reason: 'Invalid or missing URL'
          });
        }
        
        return hasValidUrl;
      });

      // Remove duplicates based on name, url, or id
      const uniqueImages = validImages.reduce((acc, current) => {
        const isDuplicate = acc.find(img => 
          (img.id && current.id && img.id === current.id) ||
          (img.name && current.name && img.name === current.name) ||
          (img.url && current.url && img.url === current.url)
        );
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, []);

      setGardenImages(uniqueImages);
      console.log(`✅ GardenActivity: Final count = ${uniqueImages.length} images`);
      
      // Force immediate UI update if we have images
      if (uniqueImages.length > 0) {
        console.log('🚀 GardenActivity: Forcing immediate UI update with images');
        setGardenImages([...uniqueImages]); // Force re-render
      }
    } catch (error) {
      console.error('❌ Error loading garden activity images:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadGardenImages();
    
    // Listen for admin gallery updates with multiple event types
    const handleAdminUpdate = (e) => {
      console.log('📡 GardenActivity: Received adminGalleryUpdate event', e.detail);
      setTimeout(() => {
        loadGardenImages();
      }, 100); // Reduced delay for faster sync
    };
    
    const handleGardenUpdate = (e) => {
      console.log('🌿 GardenActivity: Received gardenGalleryUpdate event', e.detail);
      setTimeout(() => {
        loadGardenImages();
      }, 50);
    };
    
    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === 'adminGalleryImages' || e.key === 'adminCategorizedImages') {
        console.log('📡 GardenActivity: Storage changed, reloading images');
        setTimeout(() => {
          loadGardenImages();
        }, 100);
      }
    };
    
    // Multiple event listeners for better sync
    window.addEventListener('adminGalleryUpdate', handleAdminUpdate);
    window.addEventListener('gardenGalleryUpdate', handleGardenUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for page visibility changes to reload when tab becomes active
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ GardenActivity: Tab became visible, reloading images');
        loadGardenImages();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('adminGalleryUpdate', handleAdminUpdate);
      window.removeEventListener('gardenGalleryUpdate', handleGardenUpdate);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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
                  <div className="alert alert-info border-primary">
                    <span className="fs-1 mb-3 d-block">🌿</span>
                    <h5 className="text-primary">No Garden Activity Images Yet</h5>
                    <p className="mb-3">Garden activity images will appear here when uploaded through admin dashboard.</p>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        console.log('🔄 Manual refresh triggered');
                        setLoading(true);
                        loadGardenImages();
                      }}
                    >
                      🔄 Refresh Images
                    </button>
                    <button 
                      className="btn btn-warning btn-sm ms-2"
                      onClick={() => {
                        console.log('🔍 Debug localStorage:');
                        const adminImages = localStorage.getItem('adminGalleryImages');
                        const categorizedImages = localStorage.getItem('adminCategorizedImages');
                        console.log('Raw adminGalleryImages:', adminImages);
                        console.log('Raw adminCategorizedImages:', categorizedImages);
                        if (adminImages) {
                          const parsed = JSON.parse(adminImages);
                          console.log('Parsed adminGalleryImages:', parsed);
                          console.log('Garden images in adminGalleryImages:', parsed.filter(img => img.category === 'garden'));
                        }
                        if (categorizedImages) {
                          const parsed = JSON.parse(categorizedImages);
                          console.log('Parsed categorizedImages:', parsed);
                          console.log('Garden category images:', parsed.garden);
                        }
                      }}
                    >
                      🔍 Debug Data
                    </button>
                  </div>
                </div>
              ) : (
                gardenImages.map((image, index) => (
                  <div key={image.id} className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay={`${0.2 + (index * 0.2)}s`}>
                    <div className="gallery-item position-relative">
                      <img 
                        src={image.url || image.path || `https://via.placeholder.com/400x300?text=${encodeURIComponent(image.name || 'Garden Activity')}`} 
                        className="img-fluid rounded w-100" 
                        alt={image.name || 'Garden Activity Image'}
                        onError={(e) => {
                          console.error('Image failed to load:', image);
                          e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(image.name || 'Image Not Found')}`;
                        }}
                        style={{ 
                          height: '250px', 
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
