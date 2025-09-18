// API Configuration for Baliraja Water Park Website
// This connects the website to the GitHub-hosted software backend

const API_CONFIG = {
  // Local development (when running software locally)
  LOCAL: {
    BASE_URL: 'http://localhost:8000/api',
    BOOKING_ENDPOINT: 'http://localhost:8000/api/booking-system.php',
    PACKAGES_ENDPOINT: 'http://localhost:8000/api/packages.php',
    TICKETS_ENDPOINT: 'http://localhost:8000/api/tickets.php'
  },
  
  // Production deployment (using direct backend URL)
  PRODUCTION: {
    BASE_URL: 'https://balirajafunpark.com/backend/api',
    BOOKING_ENDPOINT: 'https://balirajafunpark.com/backend/api/booking-system.php',
    PACKAGES_ENDPOINT: 'https://balirajafunpark.com/backend/api/packages.php',
    TICKETS_ENDPOINT: 'https://balirajafunpark.com/backend/api/tickets.php',
    RAZORPAY_CONFIG: {
      key: 'rzp_test_xxxxxxxxxxxxxx', // Replace with your Razorpay test key
      name: 'Baliraja Water Park',
      description: 'Water Park Booking',
      image: 'https://balirajafunpark.com/logo.png',
      theme: {
        color: '#0d6efd'
      }
    }
  },
  
  // Custom hosting (if you deploy to your own server)
  CUSTOM: {
    BASE_URL: 'https://your-domain.com/api',
    BOOKING_ENDPOINT: 'https://your-domain.com/api/booking-system.php',
    PACKAGES_ENDPOINT: 'https://your-domain.com/api/packages.php',
    TICKETS_ENDPOINT: 'https://your-domain.com/api/tickets.php'
  }
};

// Determine which environment to use
const getEnvironment = () => {
  // Check if we're in development mode
  if (process.env.NODE_ENV === 'development') {
    return 'LOCAL';
  }
  
  // Check if custom API URL is set in environment variables
  if (process.env.REACT_APP_API_URL) {
    return 'CUSTOM';
  }
  
  // Default to production
  return 'PRODUCTION';
};

// Get current API configuration
const getCurrentConfig = () => {
  const env = getEnvironment();
  return API_CONFIG[env];
};

// API service functions
export const apiService = {
  // Get current configuration
  getConfig: getCurrentConfig,
  
  // Check if backend is available
  checkBackendHealth: async () => {
    try {
      const config = getCurrentConfig();
      const response = await fetch(`${config.BASE_URL}/health.php`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      console.log('Backend not available, using mock services');
      return false;
    }
  },
  
  // Create booking order
  createOrder: async (bookingData) => {
    const config = getCurrentConfig();
    const isBackendAvailable = await apiService.checkBackendHealth();
    
    if (!isBackendAvailable) {
      // Fallback to mock service
      const { createMockOrder } = await import('../services/mockPaymentService.js');
      return createMockOrder(bookingData);
    }
    
    const response = await fetch(config.BOOKING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create_order',
        ...bookingData
      })
    });
    
    return response.json();
  },
  
  // Verify payment
  verifyPayment: async (paymentData) => {
    const config = getCurrentConfig();
    const isBackendAvailable = await apiService.checkBackendHealth();
    
    if (!isBackendAvailable) {
      // Fallback to mock service
      const { verifyMockPayment } = await import('../services/mockPaymentService.js');
      return verifyMockPayment(paymentData);
    }
    
    const response = await fetch(config.BOOKING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'verify_payment',
        ...paymentData
      })
    });
    
    return response.json();
  },
  
  // Get packages
  getPackages: async () => {
    const config = getCurrentConfig();
    const isBackendAvailable = await apiService.checkBackendHealth();
    
    if (!isBackendAvailable) {
      // Return mock packages
      return {
        success: true,
        packages: [
          {
            id: 1,
            name: "Family Fun Package",
            description: "Perfect for families with children",
            adult_price: 500,
            child_price: 300,
            features: ["All water rides", "Lunch included", "Locker facility"]
          },
          {
            id: 2,
            name: "Adventure Package",
            description: "For thrill seekers and adventure lovers",
            adult_price: 700,
            child_price: 400,
            features: ["All water rides", "Adventure sports", "Lunch included", "Photography"]
          }
        ]
      };
    }
    
    const response = await fetch(config.PACKAGES_ENDPOINT);
    return response.json();
  }
};

export default apiService;
