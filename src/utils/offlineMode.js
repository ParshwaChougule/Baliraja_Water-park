// Offline mode utilities for the water park app
export class OfflineManager {
  constructor() {
    this.isOffline = true; // Start in offline mode by default
    this.localStorageKeys = {
      gallery: 'adminGalleryImages',
      bookings: 'waterParkBookings',
      messages: 'contactMessages',
      users: 'registeredUsers'
    };
  }

  // Check if app should run in offline mode
  isOfflineMode() {
    return this.isOffline;
  }

  // Set offline mode status
  setOfflineMode(offline = true) {
    this.isOffline = offline;
  }

  // Save data to localStorage
  saveToLocal(key, data) {
    try {
      localStorage.setItem(this.localStorageKeys[key] || key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
      return false;
    }
  }

  // Get data from localStorage
  getFromLocal(key) {
    try {
      const data = localStorage.getItem(this.localStorageKeys[key] || key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.warn('Failed to get from localStorage:', error);
      return [];
    }
  }

  // Generate mock data for demo purposes
  generateMockGalleryImages() {
    return [
      {
        id: 'demo_1',
        name: 'Water Slide Fun.jpg',
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        size: 245760,
        type: 'image/jpeg',
        uploadedAt: new Date(),
        path: 'gallery/demo_1.jpg'
      },
      {
        id: 'demo_2',
        name: 'Pool Party.jpg',
        url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        size: 198432,
        type: 'image/jpeg',
        uploadedAt: new Date(),
        path: 'gallery/demo_2.jpg'
      },
      {
        id: 'demo_3',
        name: 'Family Fun.jpg',
        url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        size: 312576,
        type: 'image/jpeg',
        uploadedAt: new Date(),
        path: 'gallery/demo_3.jpg'
      }
    ];
  }

  // Initialize demo data if none exists
  initializeDemoData() {
    const existingGallery = this.getFromLocal('gallery');
    if (existingGallery.length === 0) {
      const mockImages = this.generateMockGalleryImages();
      this.saveToLocal('gallery', mockImages);
    }
  }

  // Suppress Firebase errors in console
  suppressFirebaseErrors() {
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('Firebase') || 
          message.includes('firestore') || 
          message.includes('WebChannel') ||
          message.includes('transport errored')) {
        return; // Suppress Firebase errors
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      if (message.includes('Firebase') || 
          message.includes('firestore') || 
          message.includes('WebChannel') ||
          message.includes('transport errored')) {
        return; // Suppress Firebase warnings
      }
      originalWarn.apply(console, args);
    };
  }
}

// Create singleton instance
export const offlineManager = new OfflineManager();

// Initialize on import
offlineManager.suppressFirebaseErrors();
offlineManager.initializeDemoData();
