import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Alert, 
  Modal, 
  Spinner,
  Badge,
  ProgressBar,
  Nav,
  Tab
} from 'react-bootstrap';
import { 
  FaUpload, 
  FaTrash, 
  FaEye, 
  FaImages, 
  FaPlus,
  FaTimes,
  FaDownload,
  FaSwimmer,
  FaGamepad,
  FaLeaf
} from 'react-icons/fa';
import { uploadImage, getGalleryImages, deleteImage, uploadMultipleImages, deleteAllGalleryImages } from '../services/storageService';

const GalleryManager = () => {
  const [images, setImages] = useState({
    water: [],
    fun: [],
    garden: []
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('water');
  const [activeTab, setActiveTab] = useState('water');
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = {
    water: { name: 'Water Activity', icon: FaSwimmer, color: 'primary' },
    fun: { name: 'Fun Activity', icon: FaGamepad, color: 'success' },
    garden: { name: 'Garden Activity', icon: FaLeaf, color: 'info' }
  };

  // Debug function to check localStorage
  const debugLocalStorage = () => {
    console.log('🔍=== LOCALSTORAGE DEBUG ===');
    try {
      const adminImages = localStorage.getItem('adminGalleryImages');
      const categorizedImages = localStorage.getItem('adminCategorizedImages');
      
      console.log('Raw data exists:', {
        adminGalleryImages: !!adminImages,
        adminCategorizedImages: !!categorizedImages
      });
      
      if (adminImages) {
        const parsed = JSON.parse(adminImages);
        console.log('adminGalleryImages:', {
          count: parsed.length,
          sample: parsed.slice(0, 2).map(img => ({ id: img.id, name: img.name, category: img.category }))
        });
      }
      
      if (categorizedImages) {
        const parsed = JSON.parse(categorizedImages);
        console.log('adminCategorizedImages:', {
          water: parsed.water?.length || 0,
          fun: parsed.fun?.length || 0,
          garden: parsed.garden?.length || 0
        });
      }
    } catch (e) {
      console.error('❌ localStorage debug error:', e);
    }
    console.log('🔍=== END DEBUG ===');
  };

  useEffect(() => {
    console.log('🔍 GalleryManager mounted - debugging localStorage...');
    debugLocalStorage();
    
    // Load images from Firebase Storage
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    setLoading(true);
    console.log('🔄 GalleryManager: Loading gallery images...');
    
    try {
      const categorizedImages = {
        water: [],
        fun: [],
        garden: []
      };

      // Load from localStorage FIRST (priority for persistence)
      let totalLocalImages = 0;
      try {
        console.log('📱 GalleryManager: Loading from localStorage...');
        
        // Get raw localStorage data
        const adminGalleryImagesRaw = localStorage.getItem('adminGalleryImages');
        const adminCategorizedImagesRaw = localStorage.getItem('adminCategorizedImages');
        
        console.log('🔍 Raw localStorage data:', {
          adminGalleryImages: adminGalleryImagesRaw ? 'EXISTS' : 'NULL',
          adminCategorizedImages: adminCategorizedImagesRaw ? 'EXISTS' : 'NULL'
        });
        
        const localImages = JSON.parse(adminGalleryImagesRaw || '[]');
        const categorizedLocalImages = JSON.parse(adminCategorizedImagesRaw || '{"water":[],"fun":[],"garden":[]}');
        
        console.log('📊 Parsed localStorage data:', {
          adminGalleryImages: localImages.length,
          water: categorizedLocalImages.water?.length || 0,
          fun: categorizedLocalImages.fun?.length || 0,
          garden: categorizedLocalImages.garden?.length || 0
        });
        
        // Process adminGalleryImages first
        localImages.forEach(image => {
          const category = image.category || 'water';
          if (categorizedImages[category]) {
            categorizedImages[category].push({
              ...image,
              source: image.source || 'local'
            });
            totalLocalImages++;
          }
        });
        
        // Process adminCategorizedImages
        Object.entries(categorizedLocalImages).forEach(([category, images]) => {
          if (images && Array.isArray(images)) {
            images.forEach(image => {
              // Check if not already added from adminGalleryImages
              const exists = categorizedImages[category].some(existing => 
                existing.id === image.id || existing.url === image.url
              );
              if (!exists) {
                categorizedImages[category].push({
                  ...image,
                  source: image.source || 'local'
                });
                totalLocalImages++;
              }
            });
          }
        });

        console.log(`📦 Total local images loaded: ${totalLocalImages}`);
        console.log('📋 Images per category:', {
          water: categorizedImages.water.length,
          fun: categorizedImages.fun.length,
          garden: categorizedImages.garden.length
        });
        
      } catch (localError) {
        console.error('❌ localStorage load failed:', localError);
      }

      // Load from Firebase as secondary (don't overwrite local)
      try {
        console.log('🔥 Loading from Firebase...');
        const firebaseResult = await getGalleryImages();
        if (firebaseResult.success && firebaseResult.images.length > 0) {
          console.log(`🔥 Firebase images found: ${firebaseResult.images.length}`);
          
          firebaseResult.images.forEach(image => {
            const category = image.category || 'water';
            if (categorizedImages[category]) {
              // Only add if not already exists from localStorage
              const exists = categorizedImages[category].some(existing => 
                existing.id === image.id || existing.name === image.name
              );
              if (!exists) {
                categorizedImages[category].push({
                  ...image,
                  source: 'firebase'
                });
              }
            }
          });
        } else {
          console.log('🔥 No Firebase images found');
        }
      } catch (firebaseError) {
        console.warn('⚠️ Firebase load failed:', firebaseError);
      }

      // Sort images by upload date (newest first)
      Object.keys(categorizedImages).forEach(category => {
        categorizedImages[category].sort((a, b) => {
          const dateA = a.uploadedAt ? new Date(a.uploadedAt) : new Date(0);
          const dateB = b.uploadedAt ? new Date(b.uploadedAt) : new Date(0);
          return dateB - dateA;
        });
      });

      // Always set images, even if empty
      setImages(categorizedImages);

      const totalImages = Object.values(categorizedImages).reduce((sum, arr) => sum + arr.length, 0);
      console.log('✅ GalleryManager: Final image count:', {
        water: categorizedImages.water.length,
        fun: categorizedImages.fun.length, 
        garden: categorizedImages.garden.length,
        total: totalImages
      });
      
      if (totalImages > 0) {
        setSuccess(`✅ Loaded ${totalImages} images (Water: ${categorizedImages.water.length}, Fun: ${categorizedImages.fun.length}, Garden: ${categorizedImages.garden.length})`);
        setError(''); // Clear any previous errors
      } else {
        setSuccess('📷 No images found. Upload some images to get started.');
        // Check if localStorage has data but we couldn't load it
        const hasLocalData = localStorage.getItem('adminGalleryImages') || localStorage.getItem('adminCategorizedImages');
        if (hasLocalData) {
          setError('⚠️ Found localStorage data but failed to load images. Check console for details.');
        }
      }

    } catch (err) {
      console.error('Error loading images:', err);
      setError('Failed to load images. Please try refreshing the page.');
    }
    setLoading(false);
  };

  // Enhanced image compression function for localStorage
  const compressImageForStorage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        try {
          // Calculate new dimensions - more aggressive compression
          let { width, height } = img;
          const maxDimension = Math.max(width, height);
          
          if (maxDimension > maxWidth) {
            const ratio = maxWidth / maxDimension;
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          // Draw and compress - return base64 data URL
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          
          // Clean up
          URL.revokeObjectURL(img.src);
          
          console.log('✅ Image compressed successfully:', {
            originalSize: file.size,
            compressedSize: compressedDataUrl.length,
            dimensions: `${width}x${height}`,
            quality: quality
          });
          
          resolve(compressedDataUrl);
        } catch (error) {
          console.error('❌ Image compression failed:', error);
          reject(error);
        }
      };
      
      img.onerror = (error) => {
        console.error('❌ Image load failed:', error);
        URL.revokeObjectURL(img.src);
        reject(error);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setError('');
    setSuccess('');
    
    // Quick validation without heavy processing
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 100 * 1024 * 1024; // Increased to 100MB as requested
      return isImage && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setError('Some files were rejected. Please select only image files under 100MB.');
    }

    if (validFiles.length === 0) return;

    setSelectedFiles(validFiles);
    setSuccess(`${validFiles.length} images ready for upload - Click upload to proceed!`);
  };


  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select files to upload');
      return;
    }

    if (!selectedCategory) {
      setError('Please select a category');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    try {
      setUploadProgress(20);
      setSuccess('⚡ Compressing and uploading...');
      
      // Compress and create images with proper error handling
      const compressedImages = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        try {
          console.log(`🔄 Compressing image ${i + 1}/${selectedFiles.length}: ${file.name}`);
          const compressedDataUrl = await compressImageForStorage(file, 300, 0.5);
          
          // Validate that we got a proper base64 data URL
          if (compressedDataUrl && compressedDataUrl.startsWith('data:image/')) {
            compressedImages.push({
              id: `local_${Date.now()}_${i}`,
              name: file.name,
              size: file.size,
              type: file.type,
              category: selectedCategory,
              uploadedAt: new Date().toISOString(),
              uploading: false,
              localUrl: compressedDataUrl,
              url: compressedDataUrl,
              source: 'local',
              compressed: true
            });
            console.log(`✅ Successfully compressed: ${file.name}`);
          } else {
            console.error(`❌ Invalid compressed data for: ${file.name}`);
            setError(`Failed to compress image: ${file.name}`);
          }
        } catch (compressionError) {
          console.error(`❌ Compression failed for ${file.name}:`, compressionError);
          setError(`Failed to process image: ${file.name}`);
        }
      }
      
      if (compressedImages.length === 0) {
        setError('No images were successfully processed. Please try again.');
        setUploading(false);
        return;
      }
      
      console.log(`✅ Successfully compressed ${compressedImages.length}/${selectedFiles.length} images`);
      
      setImages(prevImages => ({
        ...prevImages,
        [selectedCategory]: [...compressedImages, ...prevImages[selectedCategory]]
      }));
      
      // Save compressed images to localStorage
      try {
        console.log('💾 Starting localStorage save with compressed images...');
        
        // Aggressive localStorage cleanup to make space
        const cleanupStorage = () => {
          console.log('🧹 Cleaning localStorage to make space...');
          try {
            // Clear old images more aggressively
            const existingImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
            const recentImages = existingImages.slice(-5); // Keep only last 5 images total
            localStorage.setItem('adminGalleryImages', JSON.stringify(recentImages));
            
            // Clean categorized images - keep very few per category
            const existingCategorized = JSON.parse(localStorage.getItem('adminCategorizedImages') || '{"water":[],"fun":[],"garden":[]}');
            Object.keys(existingCategorized).forEach(category => {
              existingCategorized[category] = existingCategorized[category].slice(-3); // Keep only 3 per category
            });
            localStorage.setItem('adminCategorizedImages', JSON.stringify(existingCategorized));
            
            // Clear other potential localStorage items
            const keysToCheck = ['galleryImages', 'tempImages', 'uploadCache'];
            keysToCheck.forEach(key => {
              if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
                console.log(`🗑️ Cleared ${key}`);
              }
            });
            
            console.log('✅ Aggressive cleanup completed');
            return true;
          } catch (error) {
            console.error('❌ Cleanup failed:', error);
            return false;
          }
        };
        
        // Always clean up first to make space
        cleanupStorage();
        
        // Initialize variables for storage events
        let updatedImages = [];
        let existingCategorizedImages = {"water":[],"fun":[],"garden":[]};
        
        // Try to save with error handling for quota exceeded
        try {
          // Save to adminGalleryImages
          const existingImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
          updatedImages = [...compressedImages, ...existingImages];
          localStorage.setItem('adminGalleryImages', JSON.stringify(updatedImages));
          console.log(`💾 Saved ${compressedImages.length} compressed images. Total: ${updatedImages.length}`);
          
          // Save to adminCategorizedImages
          existingCategorizedImages = JSON.parse(localStorage.getItem('adminCategorizedImages') || '{"water":[],"fun":[],"garden":[]}');
          existingCategorizedImages[selectedCategory] = [...compressedImages, ...existingCategorizedImages[selectedCategory]];
          localStorage.setItem('adminCategorizedImages', JSON.stringify(existingCategorizedImages));
          console.log(`💾 Saved to ${selectedCategory} category. Total: ${existingCategorizedImages[selectedCategory].length}`);
        } catch (quotaError) {
          console.error('❌ Still getting quota error, trying emergency cleanup...');
          // Emergency cleanup - clear everything and save only new images
          localStorage.removeItem('adminGalleryImages');
          localStorage.removeItem('adminCategorizedImages');
          
          // Save only the new images
          updatedImages = compressedImages;
          localStorage.setItem('adminGalleryImages', JSON.stringify(updatedImages));
          const newCategorized = {"water":[],"fun":[],"garden":[]};
          newCategorized[selectedCategory] = compressedImages;
          existingCategorizedImages = newCategorized;
          localStorage.setItem('adminCategorizedImages', JSON.stringify(existingCategorizedImages));
          console.log('🚨 Emergency cleanup completed - saved only new images');
        }
        
        // Trigger update events
        console.log('📡 Triggering adminGalleryUpdate event...');
        window.dispatchEvent(new CustomEvent('adminGalleryUpdate', {
          detail: {
            category: selectedCategory,
            imageCount: compressedImages.length,
            timestamp: Date.now()
          }
        }));
        
        // Also trigger storage events manually for cross-component sync
        setTimeout(() => {
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'adminGalleryImages',
            newValue: JSON.stringify(updatedImages),
            storageArea: localStorage
          }));
          
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'adminCategorizedImages', 
            newValue: JSON.stringify(existingCategorizedImages),
            storageArea: localStorage
          }));
        }, 50);
      } catch (storageError) {
        console.error('❌ localStorage save error:', storageError);
        console.error('Error details:', storageError.stack);
      }
      
      // Finalize images as localStorage-only (no Firebase)
      setTimeout(() => {
        setImages(prevImages => ({
          ...prevImages,
          [selectedCategory]: prevImages[selectedCategory].map(img => 
            img.uploading ? { ...img, uploading: false, source: 'local' } : img
          )
        }));
        
        console.log('✅ Images saved to localStorage successfully');
      }, 500);
      
      setUploadProgress(100);
      setSuccess(`✅ ${selectedFiles.length} image(s) uploaded successfully to localStorage!`);
      setSelectedFiles([]);

    } catch (err) {
      console.error('Upload error:', err);
      setError(`❌ Upload failed: ${err.message || 'Unknown error'}`);
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 200); // Much faster
    }
  };

  const handleDeleteImage = async (imageId, imagePath, category) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      // Remove from local state immediately for better UX
      setImages(prevImages => ({
        ...prevImages,
        [category]: prevImages[category].filter(img => img.id !== imageId)
      }));

      // Try to delete from Firebase Storage if it's a Firebase image
      if (imagePath) {
        try {
          await deleteImage(imageId, imagePath);
        } catch (firebaseError) {
          console.warn('Firebase delete failed:', firebaseError);
        }
      }
      
      // Remove from localStorage
      try {
        const existingImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
        const updatedImages = existingImages.filter(img => img.id !== imageId);
        localStorage.setItem('adminGalleryImages', JSON.stringify(updatedImages));
        
        // Remove from categorized localStorage
        const existingCategorizedImages = JSON.parse(localStorage.getItem('adminCategorizedImages') || '{"water":[],"fun":[],"garden":[]}');
        existingCategorizedImages[category] = existingCategorizedImages[category].filter(img => img.id !== imageId);
        localStorage.setItem('adminCategorizedImages', JSON.stringify(existingCategorizedImages));
      } catch (storageError) {
        console.warn('localStorage delete failed:', storageError);
      }
      
      setSuccess('Image deleted successfully');
      
      // Trigger custom event for updates
      window.dispatchEvent(new CustomEvent('adminGalleryUpdate'));
      
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete image');
      // Reload images to restore state if delete failed
      loadGalleryImages();
    }
  };

  const handleDeleteAllImages = async () => {
    if (!window.confirm('Are you sure you want to delete ALL images? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await deleteAllGalleryImages();
      if (result.success) {
        setSuccess(result.message);
        loadGalleryImages();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to delete all images');
    }
  };

  const handlePreview = (image) => {
    setPreviewImage(image);
    setShowPreview(true);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN') + ' ' + date.toLocaleTimeString('en-IN');
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="fw-bold text-primary mb-1">
                <FaImages className="me-2" />
                Gallery Management
              </h4>
              <p className="text-muted mb-0">Upload and manage categorized water park images</p>
            </div>
            <div className="d-flex gap-2">
              {Object.entries(categories).map(([key, category]) => (
                <Badge key={key} bg={category.color} className="fs-6">
                  <category.icon className="me-1" />
                  {images[key].length} {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Upload Section */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">
            <FaUpload className="me-2" />
            Upload New Images
          </h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Select Category</Form.Label>
                <Form.Select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={uploading}
                >
                  {Object.entries(categories).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Select Images</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                />
                <Form.Text className="text-muted">
                  Select multiple images (JPG, PNG, GIF). Max 100MB per file.
                </Form.Text>
              </Form.Group>

              {selectedFiles.length > 0 && (
                <div className="mb-3">
                  <h6>Selected Files:</h6>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-1">
                      <span>{file.name}</span>
                      <Badge bg="secondary">{formatFileSize(file.size)}</Badge>
                    </div>
                  ))}
                </div>
              )}

              {uploading && (
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">Upload Progress</small>
                    <small className="text-muted">{uploadProgress}%</small>
                  </div>
                  <ProgressBar 
                    animated 
                    now={uploadProgress} 
                    variant={uploadProgress === 100 ? 'success' : 'primary'}
                    style={{ height: '8px' }}
                  />
                  {uploadProgress < 100 && (
                    <small className="text-muted mt-1 d-block">
                      ⚡ Compressing and uploading for faster speed...
                    </small>
                  )}
                </div>
              )}
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleUpload}
                  disabled={uploading || selectedFiles.length === 0}
                >
                  {uploading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaPlus className="me-2" />
                      Upload Images
                    </>
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Gallery Tabs */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="p-0">
          <Nav variant="tabs" className="border-0">
            {Object.entries(categories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <Nav.Item key={key}>
                  <Nav.Link
                    active={activeTab === key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 py-3 ${activeTab === key ? `text-${category.color}` : 'text-muted'}`}
                  >
                    <IconComponent className="me-2" />
                    {category.name}
                    <Badge bg={category.color} className="ms-2">
                      {images[key].length}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Tab.Content>
            {Object.entries(categories).map(([key, category]) => (
              <Tab.Pane key={key} eventKey={key} active={activeTab === key}>
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading {category.name.toLowerCase()}...</p>
                  </div>
                ) : images[key].length === 0 ? (
                  <div className="text-center py-5">
                    <category.icon className={`text-${category.color} fs-1 mb-3`} />
                    <h5 className="text-muted">No {category.name.toLowerCase()} images</h5>
                    <p className="text-muted">Upload images to this category to display them here</p>
                  </div>
                ) : (
                  <Row className="g-3">
                    {images[key].map((image) => (
                      <Col key={image.id} md={6} lg={4} xl={3}>
                        <Card className="h-100 border-0 shadow-sm">
                          <div className="position-relative">
                            <Card.Img
                              variant="top"
                              src={image.url}
                              style={{ height: '200px', objectFit: 'cover' }}
                              alt={image.name}
                            />
                            <div className="position-absolute top-0 end-0 p-2">
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteImage(image.id, image.path, key)}
                                className="rounded-circle"
                              >
                                <FaTrash />
                              </Button>
                            </div>
                            <div className="position-absolute top-0 start-0 p-2">
                              <Badge bg={category.color}>
                                <category.icon className="me-1" />
                                {category.name}
                              </Badge>
                            </div>
                          </div>
                          <Card.Body className="p-3">
                            <Card.Title className="fs-6 mb-2" style={{ fontSize: '0.9rem' }}>
                              {image.name}
                            </Card.Title>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <Badge bg="secondary" className="small">
                                {formatFileSize(image.size)}
                              </Badge>
                              <Badge bg="info" className="small">
                                {image.type?.split('/')[1]?.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-muted small mb-2">
                              {formatDate(image.uploadedAt)}
                            </p>
                            <div className="d-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handlePreview(image)}
                                className="flex-fill"
                              >
                                <FaEye className="me-1" />
                                Preview
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => window.open(image.url, '_blank')}
                              >
                                <FaDownload />
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Card.Body>
      </Card>

      {/* Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {previewImage && (
            <>
              <img
                src={previewImage.url}
                alt={previewImage.name}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: '400px' }}
              />
              <div className="text-start">
                <p><strong>Name:</strong> {previewImage.name}</p>
                <p><strong>Size:</strong> {formatFileSize(previewImage.size)}</p>
                <p><strong>Type:</strong> {previewImage.type}</p>
                <p><strong>Uploaded:</strong> {formatDate(previewImage.uploadedAt)}</p>
                <p><strong>URL:</strong> 
                  <a href={previewImage.url} target="_blank" rel="noopener noreferrer" className="ms-2">
                    View Full Size
                  </a>
                </p>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPreview(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GalleryManager;
