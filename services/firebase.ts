import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Product, BlogPost, Message } from '../types';

// Exporting config so it can be used by AIChat and VoiceAgent
// This avoids "process.env" crashes on static hosts like GitHub Pages
export const firebaseConfig = {
  apiKey: "AIzaSyCkTGcVYT5oloZCVLTkaod4mzVnfda6zGs",
  authDomain: "studio-753252263-bd2bc.firebaseapp.com",
  projectId: "studio-753252263-bd2bc",
  storageBucket: "studio-753252263-bd2bc.firebasestorage.app",
  messagingSenderId: "158482698364",
  appId: "1:158482698364:web:999ff022225b471a2ff9f9"
};

// Initialize Firebase
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

// Data Providers
export const api = {
  products: {
    getAll: async () => {
      if (!db) return []; 
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      } catch (e) {
        console.error("Error fetching products:", e);
        return [];
      }
    },
    add: async (product: Omit<Product, 'id'>) => {
      if (!db) throw new Error("Firebase not configured");
      return addDoc(collection(db, 'products'), {
        ...product,
        price: Number(product.price), // Ensure price is number
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    },
    delete: async (id: string) => {
      if (!db) return;
      return deleteDoc(doc(db, 'products', id));
    }
  },
  blog: {
    getAll: async () => {
      if (!db) return [];
      try {
        const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      } catch (e) {
        console.error("Error fetching blog:", e);
        return [];
      }
    },
    add: async (post: Omit<BlogPost, 'id'>) => {
      if (!db) throw new Error("Firebase not configured");
      return addDoc(collection(db, 'blog_posts'), {
        ...post,
        createdAt: Timestamp.now()
      });
    },
    delete: async (id: string) => {
      if (!db) return;
      return deleteDoc(doc(db, 'blog_posts', id));
    }
  },
  messages: {
    getAll: async () => {
      if (!db) return [];
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
    },
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