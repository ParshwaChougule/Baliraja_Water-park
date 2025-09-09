import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getGalleryImages } from '../services/storageService';

const WaterActivity = () => {
  const [waterImages, setWaterImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const loadWaterImages = async () => {
    try {
      console.log('🌊 WaterActivity: Loading images...');
      
      let waterActivityImages = [];

      // Load from localStorage first (admin uploads)
      try {
        const adminImages = localStorage.getItem('adminGalleryImages');
        const adminCategorizedImages = localStorage.getItem('adminCategorizedImages');
        
        console.log('📱 localStorage data found:', {
          adminImages: adminImages ? 'YES' : 'NO',
          adminCategorizedImages: adminCategorizedImages ? 'YES' : 'NO'
        });
        
        if (adminImages) {
          const parsedAdminImages = JSON.parse(adminImages);
          console.log('📱 Total admin images:', parsedAdminImages.length);
          
          // Filter for water category images
          const waterFromAdmin = parsedAdminImages.filter(img => {
            const isWater = img.category === 'water' || 
                           (img.name && img.name.toLowerCase().includes('water')) ||
                           (img.path && img.path.toLowerCase().includes('water'));
            if (isWater) {
              console.log('🌊 Found water image from admin:', {
                name: img.name,
                category: img.category,
                source: img.source || 'admin',
                hasUrl: !!img.url
              });
            }
            return isWater;
          });
          
          waterActivityImages = [...waterActivityImages, ...waterFromAdmin];
          console.log('🌊 Water images from localStorage:', waterFromAdmin.length);
        }
        
        if (adminCategorizedImages) {
          const parsedCategorized = JSON.parse(adminCategorizedImages);
          if (parsedCategorized.water && Array.isArray(parsedCategorized.water)) {
            console.log('🌊 Water category images from localStorage:', parsedCategorized.water.length);
            waterActivityImages = [...waterActivityImages, ...parsedCategorized.water];
          }
        }
      } catch (localStorageError) {
        console.error('❌ Error reading from localStorage:', localStorageError);
      }

      // Load from getGalleryImages (which now prioritizes localStorage)
      try {
        console.log('🔍 Loading from getGalleryImages...');
        const result = await getGalleryImages();
        console.log('🔍 getGalleryImages result:', result);
        
        if (result.success && result.images && result.images.length > 0) {
          const waterFromService = result.images.filter(img => {
            const isWater = img.category === 'water' || 
                           (img.name && img.name.toLowerCase().includes('water')) ||
                           (img.path && img.path.toLowerCase().includes('water'));
            if (isWater) {
              console.log('🌊 Found water image from service:', {
                name: img.name,
                category: img.category,
                source: img.source || 'unknown',
                hasUrl: !!img.url
              });
            }
            return isWater;
          });
          
          console.log(`🌊 Water images from service: ${waterFromService.length}`);
          
          // Merge with existing images, avoiding duplicates
          waterFromService.forEach(img => {
            const exists = waterActivityImages.some(existing => 
              existing.id === img.id || existing.name === img.name || existing.url === img.url
            );
            if (!exists) {
              waterActivityImages.push(img);
            }
          });
        }
      } catch (serviceError) {
        console.error('❌ Error loading from getGalleryImages:', serviceError);
      }

      // Remove duplicates based on name or url
      const uniqueImages = waterActivityImages.reduce((acc, current) => {
        const isDuplicate = acc.find(img => 
          (img.name && current.name && img.name === current.name) ||
          (img.url && current.url && img.url === current.url)
        );
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, []);

      console.log('🌊 Final water images count:', uniqueImages.length);
      console.log('🌊 Water images:', uniqueImages.map(img => ({
        name: img.name,
        category: img.category,
        source: img.source,
        hasUrl: !!img.url
      })));
      
      setWaterImages(uniqueImages);
      setLastRefresh(Date.now());
    } catch (error) {
      console.error('❌ Error loading water activity images:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWaterImages();

    // Listen for gallery updates from admin dashboard
    const handleGalleryUpdate = (event) => {
      console.log('🔄 WaterActivity: Admin gallery update event received!');
      console.log('🔄 Event details:', event.detail);
      console.log('🔄 Reloading water images in 200ms...');
      setTimeout(() => {
        console.log('🔄 Starting reload...');
        loadWaterImages();
      }, 200);
    };

    // Listen for storage events (cross-tab updates)
    const handleStorageChange = (e) => {
      console.log('🔄 WaterActivity: Storage change event:', {
        key: e.key,
        newValue: e.newValue ? 'HAS_VALUE' : 'NULL'
      });
      
      if (e.key === 'adminGalleryImages' || e.key === 'adminCategorizedImages') {
        console.log('🔄 WaterActivity: Relevant storage change detected, reloading...');
        setTimeout(loadWaterImages, 200);
      }
    };

    // Test event listener registration
    console.log('🔍 WaterActivity: Registering event listeners...');
    window.addEventListener('adminGalleryUpdate', handleGalleryUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    // Test if events are working
    setTimeout(() => {
      console.log('🗺 Testing adminGalleryUpdate event...');
      window.dispatchEvent(new CustomEvent('adminGalleryUpdate'));
    }, 1000);
    
    return () => {
      console.log('🔍 WaterActivity: Removing event listeners...');
      window.removeEventListener('adminGalleryUpdate', handleGalleryUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
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
            </div>
          ) : waterImages.length === 0 ? (
            <div className="row">
              <div className="col-12 text-center py-5">
                <div className="alert alert-info border-primary">
                  <span className="fs-1 mb-3 d-block">🏊‍♂️</span>
                  <h5 className="text-primary">No Water Activity Images Yet</h5>
                  <p className="mb-3">Water activity images will appear here when uploaded through admin dashboard.</p>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      console.log('🔄 Manual refresh triggered');
                      setLoading(true);
                      setLastRefresh(Date.now());
                      loadWaterImages();
                    }}
                  >
                    🔄 Refresh Images
                  </button>
                  <small className="d-block mt-2 text-muted">
                    Last checked: {new Date(lastRefresh).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {waterImages.map((image, index) => (
                <div key={image.id || index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                  <div className="gallery-item position-relative overflow-hidden rounded">
                    <img 
                      src={image.url || image.path || `https://via.placeholder.com/400x300?text=${encodeURIComponent(image.name || 'Water Activity')}`}
                      className="img-fluid rounded w-100 h-100" 
                      alt={image.name || 'Water Activity Image'}
                      onError={(e) => {
                        console.error('❌ Image failed to load:', {
                          name: image.name,
                          url: image.url,
                          path: image.path,
                          category: image.category,
                          source: image.source
                        });
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
              ))}
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
