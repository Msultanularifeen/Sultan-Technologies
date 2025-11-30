import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Product, BlogPost, Message, FounderInfo } from '../types';

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
let app;
let db: firebase.firestore.Firestore | undefined;
let auth: firebase.auth.Auth | undefined;
let storage: firebase.storage.Storage | undefined;

try {
  // Check if apps are already initialized (hot reload safe)
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  db = firebase.firestore();
  auth = firebase.auth();
  storage = firebase.storage();
} catch (e) {
  console.warn("Firebase not configured. Using mock mode.", e);
}

// Export db for direct access (Admin Seeding)
export { db };

// Data Providers
export const api = {
  products: {
    getAll: async () => {
      if (!db) return []; 
      try {
        const snapshot = await db.collection('products').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      } catch (e) {
        console.error("Error fetching products:", e);
        return [];
      }
    },
    add: async (product: Omit<Product, 'id'>) => {
      if (!db) throw new Error("Firebase not configured");
      return db.collection('products').add({
        ...product,
        price: Number(product.price), // Ensure price is number
        createdAt: firebase.firestore.Timestamp.now(),
        updatedAt: firebase.firestore.Timestamp.now()
      });
    },
    delete: async (id: string) => {
      if (!db) return;
      return db.collection('products').doc(id).delete();
    }
  },
  blog: {
    getAll: async () => {
      if (!db) return [];
      try {
        const snapshot = await db.collection('blog_posts').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      } catch (e) {
        console.error("Error fetching blog:", e);
        return [];
      }
    },
    add: async (post: Omit<BlogPost, 'id'>) => {
      if (!db) throw new Error("Firebase not configured");
      return db.collection('blog_posts').add({
        ...post,
        createdAt: firebase.firestore.Timestamp.now()
      });
    },
    delete: async (id: string) => {
      if (!db) return;
      return db.collection('blog_posts').doc(id).delete();
    }
  },
  messages: {
    getAll: async () => {
      if (!db) return [];
      const snapshot = await db.collection('messages').orderBy('createdAt', 'desc').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
    },
    send: async (msg: Omit<Message, 'id' | 'status' | 'date'>) => {
      if (!db) {
        console.log("Mock sending message:", msg);
        return;
      }
      return db.collection('messages').add({
        ...msg,
        status: 'new',
        date: new Date().toISOString(),
        createdAt: firebase.firestore.Timestamp.now()
      });
    }
  },
  settings: {
    getFounderInfo: async (): Promise<FounderInfo | null> => {
      if (!db) return null;
      try {
        const docSnap = await db.collection('settings').doc('founder').get();
        if (docSnap.exists) {
          return docSnap.data() as FounderInfo;
        }
        return null;
      } catch (e) {
        console.error("Error fetching settings:", e);
        return null;
      }
    },
    updateFounderInfo: async (info: FounderInfo) => {
      if (!db) return;
      return db.collection('settings').doc('founder').set(info, { merge: true });
    }
  },
  auth: {
    login: (email: string, pass: string) => {
      if (!auth) throw new Error("Firebase Auth not configured");
      return auth.signInWithEmailAndPassword(email, pass);
    },
    logout: () => {
      if (!auth) return;
      return auth.signOut();
    }
  }
};