import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getGalleryImages } from '../services/storageService';

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Try to load from Firebase Storage first
        const firebaseResult = await getGalleryImages();
        if (firebaseResult.success && firebaseResult.images.length > 0) {
          // Limit to first 6 images for homepage display
          setGalleryImages(firebaseResult.images.slice(0, 6));
        } else {
          // Fallback to localStorage
          const adminImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
          console.log('GallerySection localStorage images:', adminImages);
          
          // Validate and fix image URLs
          const validatedImages = adminImages.map(image => {
            if (!image.url && image.name) {
              console.warn('GallerySection image missing URL:', image);
              return {
                ...image,
                url: image.path || `https://via.placeholder.com/400x250?text=${encodeURIComponent(image.name)}`
              };
            }
            return image;
          });
          
          setGalleryImages(validatedImages.slice(0, 6));
        }
      } catch (error) {
        console.error('Error loading gallery images:', error);
        // Fallback to localStorage on error
        const adminImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
        setGalleryImages(adminImages.slice(0, 6));
      }
      setLoading(false);
    };

    loadImages();

    // Listen for admin gallery updates
    const handleGalleryUpdate = () => {
      loadImages();
    };

    window.addEventListener('adminGalleryUpdate', handleGalleryUpdate);

    // Poll for updates every 10 seconds
    const interval = setInterval(loadImages, 10000);

    return () => {
      window.removeEventListener('adminGalleryUpdate', handleGalleryUpdate);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h4 className="text-primary mb-2">Captured Moments In Baliraja Agro Tourism</h4>
            <h2 className="display-5 fw-bold mb-4">Photo Gallery</h2>
            <p className="lead text-muted">
              Take a glimpse into the fun and excitement that awaits you at Baliraja Agro Tourism 
              through our collection of memorable moments.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {loading ? (
            <Col className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </Col>
          ) : galleryImages.length === 0 ? (
            <Col className="text-center">
              <div className="alert alert-info">
                <h5>No images available</h5>
                <p>Images uploaded through admin dashboard will appear here.</p>
              </div>
            </Col>
          ) : (
            galleryImages.map((image, index) => (
              <Col lg={4} md={6} key={image.id || index}>
                <Card className="h-100 border-0 shadow-sm gallery-card overflow-hidden">
                  <div className="gallery-image-wrapper position-relative">
                    <Card.Img 
                      variant="top" 
                      src={image.url || image.path || `https://via.placeholder.com/400x250?text=${encodeURIComponent(image.name || 'Image')}`} 
                      alt={image.name || `Gallery Image ${index + 1}`}
                      style={{ height: '250px', objectFit: 'cover' }}
                      className="gallery-image"
                      onError={(e) => {
                        console.error('GallerySection image failed to load:', image);
                        e.target.src = `https://via.placeholder.com/400x250?text=${encodeURIComponent(image.name || 'Image Not Found')}`;
                      }}
                    />
                    <div className="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <div className="text-center text-white">
                        <h5 className="fw-bold mb-1">{image.name || `Image ${index + 1}`}</h5>
                        <small className="opacity-75">Gallery</small>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <style jsx>{`
        .gallery-card {
          transition: all 0.3s ease;
        }
        .gallery-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }
        .gallery-image {
          transition: all 0.3s ease;
        }
        .gallery-card:hover .gallery-image {
          transform: scale(1.1);
        }
        .gallery-overlay {
          background: linear-gradient(45deg, rgba(13,110,253,0.8), rgba(25,135,84,0.8));
          opacity: 0;
          transition: all 0.3s ease;
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
