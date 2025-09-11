import { realtimeDb } from '../firebase';
import { ref, push, set, get, update, remove, onValue, off } from 'firebase/database';

// Bookings Management
export const saveBookingToRealtimeDB = async (bookingData) => {
  try {
    if (!realtimeDb) {
      // Fallback: Save to localStorage with name-based ID
      const nameBasedId = `${bookingData.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
      const bookingWithTimestamp = {
        ...bookingData,
        id: nameBasedId,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(bookingWithTimestamp);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      return { success: true, id: nameBasedId, booking: bookingWithTimestamp };
    }

    // Create name-based ID for Firebase
    const nameBasedId = `${bookingData.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
    const bookingRef = ref(realtimeDb, `bookings/${nameBasedId}`);
    
    const bookingWithTimestamp = {
      ...bookingData,
      id: nameBasedId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    await set(bookingRef, bookingWithTimestamp);
    
    return { success: true, id: nameBasedId, booking: bookingWithTimestamp };
  } catch (error) {
    console.error('Error saving booking to Realtime DB:', error);
    // Fallback to localStorage on error
    const nameBasedId = `${bookingData.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
    const bookingWithTimestamp = {
      ...bookingData,
      id: nameBasedId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(bookingWithTimestamp);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    return { success: true, id: nameBasedId, booking: bookingWithTimestamp };
  }
};

export const getBookingsFromRealtimeDB = async () => {
  try {
    if (!realtimeDb) {
      return { success: false, error: "Firebase Realtime Database not configured" };
    }

    const bookingsRef = ref(realtimeDb, 'bookings');
    const snapshot = await get(bookingsRef);
    
    if (snapshot.exists()) {
      const bookingsData = snapshot.val();
      const bookingsArray = Object.keys(bookingsData).map(key => ({
        id: key,
        ...bookingsData[key]
      }));
      
      // Sort by creation date (newest first)
      bookingsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return { success: true, bookings: bookingsArray };
    } else {
      return { success: true, bookings: [] };
    }
  } catch (error) {
    console.error('Error getting bookings from Realtime DB:', error);
    return { success: false, error: error.message };
  }
};

export const updateBookingStatusInRealtimeDB = async (bookingId, status) => {
  try {
    if (!realtimeDb) {
      return { success: false, error: "Firebase Realtime Database not configured" };
    }

    const bookingRef = ref(realtimeDb, `bookings/${bookingId}`);
    await update(bookingRef, { 
      status: status,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating booking status:', error);
    return { success: false, error: error.message };
  }
};

// Contact Messages Management
export const saveContactMessageToRealtimeDB = async (messageData) => {
  try {
    if (!realtimeDb) {
      // Fallback: Save to localStorage with name-based ID
      const nameBasedId = `${messageData.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const newMessage = {
        ...messageData,
        id: nameBasedId,
        createdAt: new Date().toISOString(),
        isRead: false
      };
      messages.unshift(newMessage);
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      
      return { success: true, id: newMessage.id, message: newMessage };
    }

    // Create name-based ID for Firebase
    const nameBasedId = `${messageData.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
    const messageRef = ref(realtimeDb, `contactMessages/${nameBasedId}`);
    
    const messageWithTimestamp = {
      ...messageData,
      id: nameBasedId,
      createdAt: new Date().toISOString(),
      isRead: false
    };

    await set(messageRef, messageWithTimestamp);
    
    return { success: true, id: nameBasedId, message: messageWithTimestamp };
  } catch (error) {
    console.error('Error saving contact message:', error);
    
    // Fallback to localStorage on error with name-based ID
    const nameBasedId = `${messageData.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const newMessage = {
      ...messageData,
      id: nameBasedId,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    messages.unshift(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    return { success: true, id: newMessage.id, message: newMessage };
  }
};

export const getContactMessagesFromRealtimeDB = async () => {
  try {
    if (!realtimeDb) {
      // Fallback: Get from localStorage
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      return { success: true, messages };
    }

    const messagesRef = ref(realtimeDb, 'contactMessages');
    const snapshot = await get(messagesRef);
    
    if (snapshot.exists()) {
      const messagesData = snapshot.val();
      const messagesArray = Object.keys(messagesData).map(key => ({
        id: key,
        ...messagesData[key]
      }));
      
      // Sort by creation date (newest first)
      messagesArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return { success: true, messages: messagesArray };
    } else {
      return { success: true, messages: [] };
    }
  } catch (error) {
    console.error('Error getting contact messages from Realtime DB:', error);
    // Fallback to localStorage on error
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    return { success: true, messages };
  }
};

export const markMessageAsReadInRealtimeDB = async (messageId) => {
  try {
    if (!realtimeDb) {
      // Fallback: Update in localStorage
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true, readAt: new Date().toISOString() } : msg
      );
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      return { success: true };
    }

    const messageRef = ref(realtimeDb, `contactMessages/${messageId}`);
    await update(messageRef, { 
      isRead: true,
      readAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error marking message as read:', error);
    // Fallback to localStorage on error
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true, readAt: new Date().toISOString() } : msg
    );
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    return { success: true };
  }
};

// User Management
export const saveUserToRealtimeDB = async (userData) => {
  try {
    if (!realtimeDb) {
      return { success: false, error: "Firebase Realtime Database not configured" };
    }

    const usersRef = ref(realtimeDb, 'users');
    const newUserRef = push(usersRef);
    
    const userWithTimestamp = {
      ...userData,
      id: newUserRef.key,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    await set(newUserRef, userWithTimestamp);
    
    return { success: true, id: newUserRef.key, user: userWithTimestamp };
  } catch (error) {
    console.error('Error saving user to Realtime DB:', error);
    return { success: false, error: error.message };
  }
};

export const getUsersFromRealtimeDB = async () => {
  try {
    if (!realtimeDb) {
      return { success: false, error: "Firebase Realtime Database not configured" };
    }

    const usersRef = ref(realtimeDb, 'users');
    const snapshot = await get(usersRef);
    
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const usersArray = Object.keys(usersData).map(key => ({
        id: key,
        ...usersData[key]
      }));
      
      // Sort by creation date (newest first)
      usersArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return { success: true, users: usersArray };
    } else {
      return { success: true, users: [] };
    }
  } catch (error) {
    console.error('Error getting users from Realtime DB:', error);
    return { success: false, error: error.message };
  }
};

// Real-time listeners
export const listenToBookings = (callback) => {
  if (!realtimeDb) {
    console.warn("Firebase Realtime Database not configured, using fallback");
    // Return demo data for development
    setTimeout(() => callback([]), 100);
    return () => {};
  }

  try {
    const bookingsRef = ref(realtimeDb, 'bookings');
    
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const bookingsData = snapshot.val();
        const bookingsArray = Object.keys(bookingsData).map(key => ({
          id: key,
          ...bookingsData[key]
        }));
        
        bookingsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        callback(bookingsArray);
      } else {
        callback([]);
      }
    });

    return () => off(bookingsRef, 'value', unsubscribe);
  } catch (error) {
    console.warn("Error setting up bookings listener:", error.message);
    callback([]);
    return () => {};
  }
};

export const listenToContactMessages = (callback) => {
  if (!realtimeDb) {
    console.warn("Firebase Realtime Database not configured, using localStorage fallback");
    // Load from localStorage and set up polling
    const loadMessages = () => {
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      callback(messages);
    };
    
    loadMessages();
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }

  try {
    const messagesRef = ref(realtimeDb, 'contactMessages');
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesArray = Object.keys(messagesData).map(key => ({
          id: key,
          ...messagesData[key]
        }));
        
        messagesArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        callback(messagesArray);
      } else {
        callback([]);
      }
    });

    return () => off(messagesRef, 'value', unsubscribe);
  } catch (error) {
    console.warn("Error setting up messages listener:", error.message);
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    callback(messages);
    return () => {};
  }
};

// Gallery Images in Realtime DB
export const saveGalleryImageToRealtimeDB = async (imageData) => {
  try {
    if (!realtimeDb) {
      return { success: false, error: "Firebase Realtime Database not configured" };
    }

    const galleryRef = ref(realtimeDb, 'gallery');
    const newImageRef = push(galleryRef);
    
    const imageWithTimestamp = {
      ...imageData,
      id: newImageRef.key,
      uploadedAt: new Date().toISOString()
    };

    await set(newImageRef, imageWithTimestamp);
    
    return { success: true, id: newImageRef.key, image: imageWithTimestamp };
  } catch (error) {
    console.error('Error saving gallery image to Realtime DB:', error);
    return { success: false, error: error.message };
  }
};

export const getGalleryImagesFromRealtimeDB = async () => {
  try {
    if (!realtimeDb) {
      return { success: false, error: "Firebase Realtime Database not configured" };
    }

    const galleryRef = ref(realtimeDb, 'gallery');
    const snapshot = await get(galleryRef);
    
    if (snapshot.exists()) {
      const galleryData = snapshot.val();
      const galleryArray = Object.keys(galleryData).map(key => ({
        id: key,
        ...galleryData[key]
      }));
      
      // Sort by upload date (newest first)
      galleryArray.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
      
      return { success: true, images: galleryArray };
    } else {
      return { success: true, images: [] };
    }
  } catch (error) {
    console.error('Error getting gallery images from Realtime DB:', error);
    return { success: false, error: error.message };
  }
};

export const deleteGalleryImageFromRealtimeDB = async (imageId) => {
  try {
    if (!realtimeDb) {
      return { success: false, error: "Firebase Realtime Database not configured" };
    }

    const imageRef = ref(realtimeDb, `gallery/${imageId}`);
    await remove(imageRef);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting gallery image from Realtime DB:', error);
    return { success: false, error: error.message };
  }
};
