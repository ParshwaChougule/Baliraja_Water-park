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

// Get all gallery images
export const getGalleryImages = async () => {
  try {
    if (!db) {
      return { success: false, error: "Firebase not configured properly" };
    }

    // Add timeout to prevent hanging connections
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    );

    const galleryPromise = (async () => {
      const galleryRef = collection(db, 'gallery');
      const querySnapshot = await getDocs(galleryRef);
      
      const images = [];
      querySnapshot.forEach((doc) => {
        images.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Sort by upload date (newest first)
      images.sort((a, b) => {
        const dateA = a.uploadedAt?.toDate ? a.uploadedAt.toDate() : new Date(a.uploadedAt);
        const dateB = b.uploadedAt?.toDate ? b.uploadedAt.toDate() : new Date(b.uploadedAt);
        return dateB - dateA;
      });

      return { success: true, images };
    })();

    return await Promise.race([galleryPromise, timeoutPromise]);
  } catch (error) {
    console.error('Error getting gallery images:', error);
    // Return fallback data instead of error for better UX
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
    if (!storage || !db) {
      console.error('Firebase Storage or Firestore not available');
      return files.map(file => ({
        success: false,
        error: 'Firebase not configured properly',
        fileName: file.name
      }));
    }

    console.log(`Starting upload of ${files.length} files to Firebase Storage`);

    // Upload all files in parallel for maximum speed
    const uploadPromises = files.map(async (file, i) => {
      try {
        // Create unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}_${i}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const storageRef = ref(storage, `${folder}/${filename}`);

        console.log(`Uploading file: ${file.name} as ${filename}`);

        // Upload file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log(`File uploaded successfully: ${file.name}, URL: ${downloadURL}`);

        // Extract category from folder path (e.g., "gallery/water" -> "water")
        const category = folder.includes('/') ? folder.split('/')[1] : 'water';
        
        // Save image metadata to Firestore
        const imageData = {
          name: file.name,
          url: downloadURL,
          path: snapshot.ref.fullPath,
          size: file.size,
          type: file.type,
          folder: folder,
          category: category, // Add category field
          uploadedAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, "gallery"), imageData);

        console.log(`Metadata saved to Firestore with ID: ${docRef.id}`);

        return {
          success: true,
          imageId: docRef.id,
          url: downloadURL,
          id: docRef.id,
          name: file.name,
          size: file.size,
          type: file.type,
          category: category, // Include category in return data
          path: snapshot.ref.fullPath,
          uploadedAt: new Date()
        };

      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        return {
          success: false,
          error: error.message,
          fileName: file.name
        };
      }
    });
    
    const results = await Promise.all(uploadPromises);
    
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;
    
    console.log(`Upload completed: ${successCount} successful, ${failCount} failed`);
    console.log('All results:', results);
    
    return results;
  } catch (error) {
    console.error('Error in uploadMultipleImages:', error);
    return files.map(file => ({
      success: false,
      error: error.message,
      fileName: file.name
    }));
  }
};
