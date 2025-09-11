import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase";

// Bookings Collection
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      createdAt: serverTimestamp(),
      status: "pending"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getBookings = async (userId = null) => {
  try {
    let q;
    if (userId) {
      q = query(
        collection(db, "bookings"), 
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    }
    
    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, bookings };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Contact Messages Collection
export const addContactMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, "contactMessages"), {
      ...messageData,
      createdAt: serverTimestamp(),
      status: "unread"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getContactMessages = async () => {
  try {
    const q = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, messages };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// User Profiles Collection
export const createUserProfile = async (userId, profileData) => {
  try {
    const docRef = await addDoc(collection(db, "userProfiles"), {
      userId: userId,
      ...profileData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const q = query(collection(db, "userProfiles"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { success: true, profile: { id: doc.id, ...doc.data() } };
    } else {
      return { success: false, error: "Profile not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
