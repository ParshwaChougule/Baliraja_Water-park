import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll,
  getMetadata 
} from 'firebase/storage';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";

let storage, db;
try {
  const firebase = require("../firebase");
  storage = firebase.storage;
  db = firebase.db;
} catch (error) {
  // Silently handle Firebase import errors
  storage = null;
  db = null;
}

// Upload image to Firebase Storage
export const uploadImage = async (file, category = 'water') => {
  try {
    if (!storage) {
      return { success: false, error: "Firebase Storage not configured. Please set up your Firebase project." };
    }

    // Create unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 6);
    const ext = file.name.split('.').pop();
    const filename = `${timestamp}_${randomId}.${ext}`;
    const storageRef = ref(storage, `gallery/${category}/${filename}`);

    console.log(`🔥 Uploading ${file.name} to Firebase Storage...`);

    // Upload file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log(`✅ Upload successful: ${downloadURL}`);

    // Return image data without Firestore dependency
    const imageData = {
      id: `firebase_${timestamp}_${randomId}`,
      name: file.name,
      url: downloadURL,
      path: snapshot.ref.fullPath,
      size: file.size,
      type: file.type,
      category: category,
      uploadedAt: new Date().toISOString(),
      source: 'firebase'
    };

    return { 
      success: true, 
      id: imageData.id,
      url: downloadURL,
      path: snapshot.ref.fullPath,
      data: imageData
    };
  } catch (error) {
    console.error('❌ Firebase upload error:', error);
    return { success: false, error: error.message };
  }
};

// Get all gallery images from Firebase Storage with offline fallback
export const getGalleryImages = async () => {
  try {
    if (!storage) {
      console.log('⚠️ Firebase Storage not available, falling back to localStorage');
      return getLocalStorageImages();
    }

    console.log('🔍 getGalleryImages: Loading from Firebase Storage...');
    
    const allImages = [];
    const categories = ['water', 'fun', 'garden'];
    
    // Add timeout for Firebase requests
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firebase request timeout')), 10000)
    );
    
    try {
      // Fetch images from each category folder with timeout
      for (const category of categories) {
        try {
          const categoryRef = ref(storage, `gallery/${category}`);
          const result = await Promise.race([listAll(categoryRef), timeoutPromise]);
          
          console.log(`📁 Found ${result.items.length} items in ${category} category`);
          
          // Get download URLs for each image
          for (const itemRef of result.items) {
            try {
              const downloadURL = await Promise.race([getDownloadURL(itemRef), timeoutPromise]);
              const metadata = await Promise.race([getMetadata(itemRef), timeoutPromise]);
              
              const imageData = {
                id: `firebase_${itemRef.name}`,
                name: itemRef.name,
                url: downloadURL,
                path: itemRef.fullPath,
                category: category,
                size: metadata.size,
                type: metadata.contentType,
                uploadedAt: metadata.timeCreated,
                source: 'firebase'
              };
              
              allImages.push(imageData);
            } catch (itemError) {
              console.error(`❌ Error processing item ${itemRef.name}:`, itemError);
            }
          }
        } catch (categoryError) {
          console.error(`❌ Error loading ${category} category:`, categoryError);
          // Continue with other categories even if one fails
        }
      }
      
      console.log(`📸 Loaded ${allImages.length} images from Firebase Storage`);
      return allImages;
    } catch (firebaseError) {
      console.error('❌ Firebase Storage connection failed, falling back to localStorage:', firebaseError);
      return getLocalStorageImages();
    }
  } catch (error) {
    console.error('❌ Error loading gallery images, falling back to localStorage:', error);
    return getLocalStorageImages();
  }
};

// Fallback function to get images from localStorage
const getLocalStorageImages = () => {
  try {
    console.log('📱 Loading images from localStorage fallback...');
    
    const localImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
    const categorizedImages = JSON.parse(localStorage.getItem('adminCategorizedImages') || '{}');
    
    let allImages = [...localImages];
    
    // Add categorized images
    Object.entries(categorizedImages).forEach(([category, categoryImages]) => {
      if (Array.isArray(categoryImages)) {
        categoryImages.forEach(img => {
          allImages.push({
            ...img,
            category: category,
            source: 'localStorage'
          });
        });
      }
    });
    
    // Remove duplicates
    const uniqueImages = allImages.filter((image, index, self) => 
      index === self.findIndex(img => img.url === image.url || img.name === image.name)
    );
    
    console.log(`📱 Loaded ${uniqueImages.length} images from localStorage`);
    return uniqueImages;
  } catch (error) {
    console.error('❌ Error loading from localStorage:', error);
    return [];
  }
};

// Delete all gallery images
export const deleteAllGalleryImages = async () => {
  try {
    if (!db || !storage) {
      return { success: false, error: "Firebase not configured properly" };
    }

    // Get all gallery documents
    const galleryRef = collection(db, 'gallery');
    const querySnapshot = await getDocs(galleryRef);
    
    const deletePromises = [];
    
    querySnapshot.forEach((doc) => {
      const imageData = doc.data();
      
      // Delete from storage
      if (imageData.path) {
        const imageRef = ref(storage, imageData.path);
        deletePromises.push(deleteObject(imageRef));
      }
      
      // Delete from Firestore
      deletePromises.push(deleteDoc(doc.ref));
    });

    await Promise.all(deletePromises);
    
    return { success: true, message: `Deleted ${querySnapshot.size} images` };
  } catch (error) {
    console.error('Error deleting all gallery images:', error);
    return { success: false, error: error.message };
  }
};

// Delete image from Storage and Firestore
export const deleteImage = async (imageId, imagePath) => {
  try {
    if (!storage || !db) {
      return { success: false, error: "Firebase not configured properly." };
    }

    // Delete from Storage
    const storageRef = ref(storage, imagePath);
    await deleteObject(storageRef);

    // Delete from Firestore
    await deleteDoc(doc(db, "gallery", imageId));

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Upload multiple images to Firebase Storage
export const uploadMultipleImages = async (files, folder = 'gallery') => {
  try {
    console.log('🔥 Firebase Storage check:', !!storage);
    console.log('🔥 Firebase Firestore check:', !!db);
    console.log('📁 Upload folder:', folder);
    console.log('📸 Files to upload:', files.length);
    
    if (!storage || !db) {
      console.error('❌ Firebase Storage or Firestore not available');
      console.error('Storage available:', !!storage);
      console.error('DB available:', !!db);
      
      // Try to reinitialize Firebase
      try {
        const firebase = await import('../firebase');
        if (firebase.storage && firebase.db) {
          console.log('🔄 Firebase reinitialized successfully');
          // Update local references
          const storageService = await import('../services/storageService');
          return storageService.uploadMultipleImages(files, folder);
        }
      } catch (reinitError) {
        console.error('❌ Firebase reinit failed:', reinitError);
      }
      
      return files.map(file => ({
        success: false,
        error: 'Firebase not configured properly - Storage or Firestore unavailable',
        fileName: file.name
      }));
    }

    console.log(`Starting upload of ${files.length} files to Firebase Storage folder: ${folder}`);

    // Upload all files in parallel for maximum speed
    const uploadPromises = files.map(async (file, i) => {
      try {
        // Create unique filename - simplified for speed
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substr(2, 6);
        const ext = file.name.split('.').pop();
        const filename = `${timestamp}_${randomId}.${ext}`;
        const storageRef = ref(storage, `${folder}/${filename}`);

        console.log(`[${i+1}/${files.length}] Fast upload: ${file.name}`);

        // Direct upload without timeout for speed
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Extract category from folder path (e.g., "gallery/water" -> "water")
        const category = folder.includes('/') ? folder.split('/')[1] : 'water';
        
        // Minimal metadata for speed
        const imageData = {
          name: file.name,
          url: downloadURL,
          path: snapshot.ref.fullPath,
          size: file.size,
          type: file.type,
          category: category,
          uploadedAt: serverTimestamp()
        };

        // Save to Firestore
        const docRef = await addDoc(collection(db, "gallery"), imageData);
        console.log(`✅ ${file.name} → Firebase`);

        return {
          success: true,
          imageId: docRef.id,
          url: downloadURL,
          id: docRef.id,
          name: file.name,
          size: file.size,
          type: file.type,
          category: category,
          path: snapshot.ref.fullPath,
          uploadedAt: new Date(),
          source: 'firebase'
        };

      } catch (error) {
        console.error(`❌ ${file.name} failed:`, error.message);
        return {
          success: false,
          error: error.message || 'Upload failed',
          fileName: file.name
        };
      }
    });
    
    const results = await Promise.all(uploadPromises);
    const successCount = results.filter(r => r.success).length;
    console.log(`🚀 Batch complete: ${successCount}/${files.length} uploaded`);
    
    return results;
  } catch (error) {
    console.error('❌ Upload batch failed:', error.message);
    return files.map(file => ({
      success: false,
      error: 'Batch upload failed',
      fileName: file.name
    }));
  }
};
