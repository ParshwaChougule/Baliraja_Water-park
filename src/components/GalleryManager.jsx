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

  useEffect(() => {
    // Load images from Firebase Storage
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    setLoading(true);
    try {
      // Load from both Firebase and localStorage, then merge
      const [firebaseResult, localImages] = await Promise.all([
        getGalleryImages().catch(() => ({ success: false, images: [] })),
        Promise.resolve(JSON.parse(localStorage.getItem('adminGalleryImages') || '[]'))
      ]);

      const categorizedImages = {
        water: [],
        fun: [],
        garden: []
      };

      // Process Firebase images first
      if (firebaseResult.success && firebaseResult.images.length > 0) {
        firebaseResult.images.forEach(image => {
          const category = image.category || 'water';
          if (categorizedImages[category]) {
            categorizedImages[category].push(image);
          }
        });
      }

      // Process localStorage images and merge (avoid duplicates)
      if (localImages.length > 0) {
        localImages.forEach(image => {
          const category = image.category || 'water';
          if (categorizedImages[category]) {
            // Check if image already exists (by URL or name)
            const exists = categorizedImages[category].some(existing => 
              existing.url === image.url || existing.name === image.name
            );
            if (!exists) {
              categorizedImages[category].push(image);
            }
          }
        });
      }

      setImages(categorizedImages);

      const totalImages = Object.values(categorizedImages).reduce((sum, arr) => sum + arr.length, 0);
      if (totalImages > 0) {
        setSuccess(`Loaded ${totalImages} images (Water: ${categorizedImages.water.length}, Fun: ${categorizedImages.fun.length}, Garden: ${categorizedImages.garden.length})`);
      } else {
        setError('No images found. Upload some images to get started.');
      }

    } catch (err) {
      console.error('Error loading images:', err);
      setError('Failed to load images. Please try refreshing the page.');
    }
    setLoading(false);
  };

  // Enhanced image compression function for localStorage
  const compressImage = (file, maxWidth = 800, quality = 0.6) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions - more aggressive compression
        let { width, height } = img;
        const maxDimension = Math.max(width, height);
        
        if (maxDimension > maxWidth) {
          const ratio = maxWidth / maxDimension;
          width = width * ratio;
          height = height * ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress with lower quality for localStorage
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    setError('');
    setSuccess('');
    
    // Filter valid files
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit
      return isImage && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setError('Some files were rejected. Please select only image files under 50MB.');
    }

    if (validFiles.length === 0) return;

    // Skip compression for faster upload - compress only for localStorage later
    setSelectedFiles(validFiles);
    setSuccess(`${validFiles.length} images ready for upload`);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one image to upload');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    // Set timeout to prevent infinite loading
    const uploadTimeout = setTimeout(() => {
      setUploading(false);
      setError('❌ Upload timeout. Please try again with fewer images.');
      setUploadProgress(0);
    }, 60000); // 60 second timeout for large files

    try {
      setSuccess('🚀 Starting upload...');
      setUploadProgress(5);
      
      // Import upload function
      const { uploadMultipleImages } = await import('../services/storageService');
      setUploadProgress(10);
      
      const totalFiles = selectedFiles.length;
      setSuccess(`📤 Uploading ${totalFiles} image(s)...`);
      
      // Create a progress tracking promise
      const uploadWithProgress = async () => {
        setUploadProgress(20);
        
        // Upload all files at once for faster processing
        setSuccess(`📤 Uploading ${totalFiles} image(s) to Firebase Storage...`);
        console.log(`Uploading to folder: gallery/${selectedCategory}`);
        console.log(`Selected category: ${selectedCategory}`);
        console.log(`Files to upload:`, selectedFiles.map(f => f.name));
        
        const results = await uploadMultipleImages(selectedFiles, `gallery/${selectedCategory}`);
        
        console.log('Upload results:', results);
        
        // Update progress incrementally
        setUploadProgress(70);
        
        return results;
      };
      
      // Upload with timeout
      const results = await Promise.race([
        uploadWithProgress(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Upload timeout after 60 seconds')), 60000)
        )
      ]);

      clearTimeout(uploadTimeout);
      setUploadProgress(90);

      if (!results || !Array.isArray(results)) {
        throw new Error('Invalid upload response');
      }

      // Process results
      const successfulUploads = results.filter(result => result.success).map(result => ({
        ...result,
        category: selectedCategory
      }));
      
      const failedUploads = results.filter(result => !result.success);

      console.log(`Successful uploads: ${successfulUploads.length}`);
      console.log(`Failed uploads: ${failedUploads.length}`);
      console.log('Successful uploads data:', successfulUploads);

      setUploadProgress(90);

      if (successfulUploads.length > 0) {
        // Update local state
        setImages(prevImages => ({
          ...prevImages,
          [selectedCategory]: [...successfulUploads, ...prevImages[selectedCategory]]
        }));
        
        // Convert images to base64 for localStorage storage
        const compressedUploads = await Promise.all(
          successfulUploads.map(async (upload) => {
            try {
              // If we have the original file, compress it for localStorage
              const originalFile = selectedFiles.find(f => f.name === upload.name);
              if (originalFile) {
                const compressedBlob = await compressImage(originalFile, 400, 0.3);
                if (compressedBlob) {
                  const reader = new FileReader();
                  return new Promise((resolve) => {
                    reader.onload = () => {
                      resolve({
                        ...upload,
                        localUrl: reader.result, // base64 for localStorage
                        compressed: true
                      });
                    };
                    reader.readAsDataURL(compressedBlob);
                  });
                }
              }
              return upload;
            } catch (error) {
              console.warn('Failed to compress image for localStorage:', error);
              return upload;
            }
          })
        );

        // Update localStorage with compressed images
        const existingImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
        const updatedImages = [...compressedUploads, ...existingImages];
        
        try {
          localStorage.setItem('adminGalleryImages', JSON.stringify(updatedImages));
        } catch (storageError) {
          console.warn('localStorage quota exceeded, clearing old images:', storageError);
          // Keep only recent images if storage is full
          const recentImages = updatedImages.slice(0, 20);
          localStorage.setItem('adminGalleryImages', JSON.stringify(recentImages));
        }
        
        setSuccess(`✅ Uploaded ${successfulUploads.length} image(s) to Firebase Storage successfully! Check Firebase Console to verify.`);
      }

      if (failedUploads.length > 0) {
        setError(`❌ ${failedUploads.length} image(s) failed to upload`);
      }

      if (successfulUploads.length === 0) {
        setError('❌ No images were uploaded. Please try again.');
      }

      setUploadProgress(100);
      setSelectedFiles([]);

      // Force immediate reload and update
      if (successfulUploads.length > 0) {
        // Immediately reload gallery images
        await loadGalleryImages();
        
        // Force trigger update event for all gallery pages
        window.dispatchEvent(new CustomEvent('adminGalleryUpdate'));
        
        // Also trigger storage event for cross-tab updates
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'adminGalleryImages',
          newValue: JSON.stringify([...successfulUploads, ...JSON.parse(localStorage.getItem('adminGalleryImages') || '[]')])
        }));
      }

    } catch (err) {
      clearTimeout(uploadTimeout);
      console.error('Upload error:', err);
      setError(`❌ Upload failed: ${err.message || 'Unknown error'}`);
      setUploadProgress(0);
      setUploading(false);
    } finally {
      // Ensure loading stops
      clearTimeout(uploadTimeout);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const handleDeleteImage = async (imageId, imagePath, category) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      // Try to delete from Firebase Storage first
      const result = await deleteImage(imageId, imagePath);
      if (result.success) {
        // Reload gallery from Firebase
        await loadGalleryImages();
        setSuccess('Image deleted successfully from Firebase Storage');
      } else {
        // Fallback: Remove from local state for demo
        setImages(prevImages => ({
          ...prevImages,
          [category]: prevImages[category].filter(img => img.id !== imageId)
        }));
        setSuccess('Image deleted successfully (local)');
      }
      
      // Remove from localStorage for main gallery page
      const existingImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
      const updatedImages = existingImages.filter(img => img.id !== imageId);
      localStorage.setItem('adminGalleryImages', JSON.stringify(updatedImages));
      
      // Remove from categorized localStorage
      const existingCategorizedImages = JSON.parse(localStorage.getItem('adminCategorizedImages') || '{"water":[],"fun":[],"garden":[]}');
      existingCategorizedImages[category] = existingCategorizedImages[category].filter(img => img.id !== imageId);
      localStorage.setItem('adminCategorizedImages', JSON.stringify(existingCategorizedImages));
      
      // Trigger custom event for same-window updates
      window.dispatchEvent(new CustomEvent('adminGalleryUpdate'));
      
    } catch (err) {
      setError('Failed to delete image');
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
                  Select multiple images (JPG, PNG, GIF). Max 50MB per file. Images will be automatically compressed for faster upload.
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
                  onClick={async () => {
                    if (selectedFiles.length === 0) {
                      setError('Please select images first');
                      return;
                    }
                    
                    setUploading(true);
                    setUploadProgress(0);
                    
                    // Check localStorage space before storing
                    const checkStorageSpace = () => {
                      try {
                        const testKey = 'storageTest';
                        const testData = 'x'.repeat(1024 * 1024); // 1MB test
                        localStorage.setItem(testKey, testData);
                        localStorage.removeItem(testKey);
                        return true;
                      } catch (e) {
                        return false;
                      }
                    };

                    if (!checkStorageSpace()) {
                      // Clear old images if storage is full
                      localStorage.removeItem('adminGalleryImages');
                      localStorage.removeItem('adminCategorizedImages');
                      setSuccess('Cleared old images to make space...');
                    }

                    // Convert files to base64 with size limit check
                    const demoImages = await Promise.all(
                      selectedFiles.slice(0, 5).map(async (file, index) => { // Limit to 5 images at once
                        return new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const base64 = e.target.result;
                            // Check if base64 is too large (limit to 500KB per image)
                            if (base64.length > 500 * 1024) {
                              console.warn(`Image ${file.name} too large for localStorage, skipping`);
                              resolve(null);
                              return;
                            }
                            resolve({
                              id: `local_${Date.now()}_${index}`,
                              name: file.name,
                              url: base64,
                              size: file.size,
                              type: file.type,
                              category: selectedCategory,
                              uploadedAt: new Date(),
                              success: true
                            });
                          };
                          reader.readAsDataURL(file);
                        });
                      })
                    );

                    // Filter out null values (images that were too large)
                    const validImages = demoImages.filter(img => img !== null);
                    
                    // Simulate progress
                    let progress = 0;
                    const progressInterval = setInterval(() => {
                      progress += 20;
                      setUploadProgress(progress);
                      
                      if (progress >= 100) {
                        clearInterval(progressInterval);
                        
                        setImages(prevImages => ({
                          ...prevImages,
                          [selectedCategory]: [...validImages, ...prevImages[selectedCategory]]
                        }));
                        
                        // Update localStorage with error handling
                        try {
                          const existingImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
                          const updatedImages = [...validImages, ...existingImages];
                          localStorage.setItem('adminGalleryImages', JSON.stringify(updatedImages));
                          
                          // Update categorized localStorage
                          const existingCategorizedImages = JSON.parse(localStorage.getItem('adminCategorizedImages') || '{"water":[],"fun":[],"garden":[]}');
                          existingCategorizedImages[selectedCategory] = [...validImages, ...existingCategorizedImages[selectedCategory]];
                          localStorage.setItem('adminCategorizedImages', JSON.stringify(existingCategorizedImages));
                        } catch (storageError) {
                          console.error('Storage error:', storageError);
                          setError('⚠️ Storage full. Only showing current session images.');
                        }
                        
                        // Trigger gallery update event
                        window.dispatchEvent(new CustomEvent('adminGalleryUpdate'));
                        
                        setSuccess(`✅ Upload Complete: Added ${validImages.length} images to ${categories[selectedCategory].name}!`);
                        setSelectedFiles([]);
                        setUploading(false);
                        setUploadProgress(0);
                      }
                    }, 200);
                  }}
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
