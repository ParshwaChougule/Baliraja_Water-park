import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, onValue, off } from 'firebase/database';

// Firebase configuration (same as website)
const firebaseConfig = {
  apiKey: "AIzaSyCQbOH7NM8kvqQIsFNemEzcjO8agVyUOJY",
  authDomain: "water-park-731dd.firebaseapp.com",
  databaseURL: "https://water-park-731dd-default-rtdb.firebaseio.com",
  projectId: "water-park-731dd",
  storageBucket: "water-park-731dd.firebasestorage.app",
  messagingSenderId: "241062579317",
  appId: "1:241062579317:web:508f029f363fd52df1fc3c",
  measurementId: "G-QQ7NJRJG7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export interface FirebaseBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  adults: number;
  children: number;
  packageName: string;
  totalAmount: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt?: string;
  paymentSplit?: {
    splitProcessed: boolean;
    agroTourismAmount: number;
    funWaterparkAmount: number;
    splitRatio: string;
    splitTransactions?: any[];
  };
}

export interface WebsitePackage {
  id: number;
  name: string;
  price: number;
  unit: string;
  popular: boolean;
  image: string;
  features: string[];
}

// Static packages data (from website)
export const websitePackages: WebsitePackage[] = [
  {
    id: 1,
    name: "Basic Package",
    price: 2000,
    unit: "person",
    popular: false,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    features: [
      "Pool Access",
      "Basic Locker",
      "1 Meal Voucher",
      "Safety Equipment",
      "Basic First Aid"
    ]
  },
  {
    id: 2,
    name: "Family Package",
    price: 6500,
    unit: "family",
    popular: true,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    features: [
      "All Pool Access",
      "Premium Locker",
      "Family Meal Deal",
      "Priority Booking",
      "Free Parking",
      "Kids Play Area",
      "Family Photo Session"
    ]
  },
  {
    id: 3,
    name: "VIP Package",
    price: 3500,
    unit: "person",
    popular: false,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    features: [
      "All Premium Access",
      "VIP Locker Room",
      "Unlimited Food & Drinks",
      "Personal Attendant",
      "Express Lane Access",
      "Spa Services",
      "Private Cabana"
    ]
  }
];

export class FirebaseService {
  // Get all bookings from Firebase
  static async getBookings(): Promise<{ success: boolean; bookings?: FirebaseBooking[]; error?: string }> {
    try {
      const bookingsRef = ref(database, 'bookings');
      const snapshot = await get(bookingsRef);
      
      if (snapshot.exists()) {
        const bookingsData = snapshot.val();
        const bookingsArray: FirebaseBooking[] = Object.keys(bookingsData).map(key => ({
          id: key,
          ...bookingsData[key]
        }));
        
        // Sort by creation date (newest first)
        bookingsArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        return { success: true, bookings: bookingsArray };
      } else {
        return { success: true, bookings: [] };
      }
    } catch (error) {
      console.error('Error fetching bookings from Firebase:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  // Listen to real-time booking updates
  static listenToBookings(callback: (bookings: FirebaseBooking[]) => void): () => void {
    const bookingsRef = ref(database, 'bookings');
    
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const bookingsData = snapshot.val();
        const bookingsArray: FirebaseBooking[] = Object.keys(bookingsData).map(key => ({
          id: key,
          ...bookingsData[key]
        }));
        
        bookingsArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(bookingsArray);
      } else {
        callback([]);
      }
    });

    return () => off(bookingsRef, 'value', unsubscribe);
  }

  // Get website packages (static data)
  static getWebsitePackages(): WebsitePackage[] {
    return websitePackages;
  }

  // Get booking statistics
  static getBookingStats(bookings: FirebaseBooking[]) {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);
    
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      todayBookings: bookings.filter(b => b.createdAt.startsWith(today)).length,
      thisMonthBookings: bookings.filter(b => b.createdAt.startsWith(thisMonth)).length,
      totalRevenue: bookings
        .filter(b => b.status === 'confirmed' || b.status === 'completed')
        .reduce((sum, b) => sum + b.totalAmount, 0),
      pendingRevenue: bookings
        .filter(b => b.status === 'pending')
        .reduce((sum, b) => sum + b.totalAmount, 0)
    };
  }
}

export default FirebaseService;
