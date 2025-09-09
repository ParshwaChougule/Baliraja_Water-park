import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll 
} from "firebase/storage";
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
export const uploadImage = async (file, folder = 'gallery') => {
  try {
    if (!storage || !db) {
      return { success: false, error: "Firebase Storage not configured. Please set up your Firebase project." };
    }

    // Create unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${filename}`);

    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Save image metadata to Firestore
    const imageData = {
      name: file.name,
      url: downloadURL,
      path: snapshot.ref.fullPath,
      size: file.size,
      type: file.type,
      folder: folder,
      uploadedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "gallery"), imageData);

    return { 
      success: true, 
      imageId: docRef.id,
      url: downloadURL,
      data: imageData
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get all gallery images - localStorage ONLY (no Firebase dependency)
export const getGalleryImages = async () => {
  try {
    console.log('🔍 getGalleryImages: Loading from localStorage only...');
    
    const localImages = JSON.parse(localStorage.getItem('adminGalleryImages') || '[]');
    const categorizedImages = JSON.parse(localStorage.getItem('adminCategorizedImages') || '{"water":[],"fun":[],"garden":[]}');
    
    console.log('📱 localStorage data:', {
      adminGalleryImages: localImages.length,
      water: categorizedImages.water?.length || 0,
      fun: categorizedImages.fun?.length || 0,
      garden: categorizedImages.garden?.length || 0
    });
    
    // Combine all local images
    const allLocalImages = [
      ...localImages,
      ...(categorizedImages.water || []),
      ...(categorizedImages.fun || []),
      ...(categorizedImages.garden || [])
    ];
    
    // Remove duplicates based on name or id
    const uniqueLocalImages = allLocalImages.reduce((acc, current) => {
      const exists = acc.find(img => 
        img.id === current.id || 
        img.name === current.name ||
        img.url === current.url
      );
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);
    
    console.log(`📦 Found ${uniqueLocalImages.length} unique images in localStorage`);
    
    // Sort by upload date (newest first)
    uniqueLocalImages.sort((a, b) => {
      const dateA = new Date(a.uploadedAt || a.timestamp || 0);
      const dateB = new Date(b.uploadedAt || b.timestamp || 0);
      return dateB - dateA;
    });
    
    console.log('✅ Returning localStorage images immediately');
    return { success: true, images: uniqueLocalImages };
    
  } catch (error) {
    console.error('❌ Error reading localStorage:', error);
    return { success: false, error: error.message, images: [] };
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
