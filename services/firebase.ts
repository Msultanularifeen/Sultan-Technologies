import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Product, BlogPost, Message } from '../types';

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkTGcVYT5oloZCVLTkaod4mzVnfda6zGs",
  authDomain: "studio-753252263-bd2bc.firebaseapp.com",
  projectId: "studio-753252263-bd2bc",
  storageBucket: "studio-753252263-bd2bc.firebasestorage.app",
  messagingSenderId: "158482698364",
  appId: "1:158482698364:web:999ff022225b471a2ff9f9"
};

// Initialize Firebase
// Note: This will throw errors in the console if keys are invalid. 
// For the purpose of this demo, we will wrap it to avoid crashing the UI if keys are missing.
let app, db, auth, storage;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} catch (e) {
  console.warn("Firebase not configured. Using mock mode.");
}

// Export db for direct access (Admin Seeding)
export { db };

// Data Providers (Switch between Firebase and Mock based on config availability)
export const api = {
  products: {
    getAll: async () => {
      if (!db) return []; 
      const q = query(collection(db, 'products'), where('status', '==', 'published'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    },
    add: async (product: Omit<Product, 'id'>) => {
      if (!db) throw new Error("Firebase not configured");
      return addDoc(collection(db, 'products'), {
        ...product,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    }
  },
  blog: {
    getAll: async () => {
      if (!db) return [];
      const q = query(collection(db, 'blog_posts'), where('status', '==', 'published'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
    }
  },
  messages: {
    send: async (msg: Omit<Message, 'id' | 'status' | 'date'>) => {
      if (!db) {
        console.log("Mock sending message:", msg);
        return;
      }
      return addDoc(collection(db, 'messages'), {
        ...msg,
        status: 'new',
        date: new Date().toISOString(),
        createdAt: Timestamp.now()
      });
    }
  },
  auth: {
    login: (email: string, pass: string) => {
      if (!auth) throw new Error("Firebase Auth not configured");
      return signInWithEmailAndPassword(auth, email, pass);
    },
    logout: () => {
      if (!auth) return;
      return signOut(auth);
    }
  }
};