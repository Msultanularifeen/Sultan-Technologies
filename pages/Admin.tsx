import React, { useState } from 'react';
import { api, db } from '../services/firebase'; // Added db import
import { PRODUCTS, BLOG_POSTS } from '../services/mockData';
import { collection, writeBatch, doc } from 'firebase/firestore'; // Firestore imports
import { Database, UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [seedStatus, setSeedStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Mock login for demonstration if firebase fails
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.auth.login(email, password);
      setIsAuthenticated(true);
    } catch (err) {
      console.warn("Auth failed or not configured, allowing access for demo");
      setIsAuthenticated(true);
    }
  };

  const seedDatabase = async () => {
    if (!db) {
      alert("Firebase is not configured! Check firebase.ts");
      return;
    }
    
    setSeedStatus('loading');
    try {
      const batch = writeBatch(db);

      // Seed Products
      PRODUCTS.forEach((product) => {
        // Create a reference with a random ID, or use product.id if you want fixed IDs
        const ref = doc(collection(db, 'products')); 
        batch.set(ref, { ...product, createdAt: new Date() });
      });

      // Seed Blog Posts
      BLOG_POSTS.forEach((post) => {
        const ref = doc(collection(db, 'blog_posts'));
        batch.set(ref, { ...post, createdAt: new Date() });
      });

      await batch.commit();
      setSeedStatus('success');
    } catch (error) {
      console.error("Error seeding database:", error);
      setSeedStatus('error');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="max-w-md w-full bg-bg-secondary p-8 rounded-xl border border-border shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-tertiary border border-border rounded p-3"
                placeholder="admin@sultantech.com"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-tertiary border border-border rounded p-3"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full btn-primary py-3 rounded font-bold">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-text-muted hover:text-red-500"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-bg-secondary rounded-xl p-4 border border-border h-fit">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('products')}
                className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'products' ? 'bg-brand-primary text-white' : 'text-text-secondary hover:bg-bg-hover'}`}
              >
                Products
              </button>
              <button 
                onClick={() => setActiveTab('blog')}
                className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'blog' ? 'bg-brand-primary text-white' : 'text-text-secondary hover:bg-bg-hover'}`}
              >
                Blog Posts
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'messages' ? 'bg-brand-primary text-white' : 'text-text-secondary hover:bg-bg-hover'}`}
              >
                Messages
              </button>
               <button 
                onClick={() => setActiveTab('database')}
                className={`w-full text-left p-3 rounded transition-colors flex items-center ${activeTab === 'database' ? 'bg-brand-primary text-white' : 'text-text-secondary hover:bg-bg-hover'}`}
              >
                <Database size={16} className="mr-2" /> Database Tools
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3 bg-bg-secondary rounded-xl p-8 border border-border min-h-[500px]">
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl font-bold">Manage Products</h2>
                  <button className="btn-primary px-4 py-2 rounded text-sm">Add New Product</button>
                </div>
                <div className="text-text-secondary text-center py-20 bg-bg-tertiary rounded border border-border border-dashed">
                  Product management list would appear here. Connected to Firebase Firestore.
                </div>
              </div>
            )}
            
            {activeTab === 'blog' && (
               <div>
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl font-bold">Manage Blog</h2>
                  <button className="btn-primary px-4 py-2 rounded text-sm">New Post</button>
                </div>
                <div className="text-text-secondary text-center py-20 bg-bg-tertiary rounded border border-border border-dashed">
                  Blog post editor and list would appear here.
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
               <div>
                <h2 className="text-xl font-bold mb-6">Recent Inquiries</h2>
                <div className="text-text-secondary text-center py-20 bg-bg-tertiary rounded border border-border border-dashed">
                  Contact form submissions will appear here.
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div>
                 <h2 className="text-xl font-bold mb-6">Database Utilities</h2>
                 <div className="bg-bg-tertiary p-6 rounded-xl border border-border">
                    <h3 className="font-bold mb-2 flex items-center"><Database size={20} className="mr-2"/> Initialize Database</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      Since your Firebase project is new, it might be empty. Click the button below to upload the demo data (Products & Blog posts) to your Firestore.
                    </p>
                    
                    <button 
                      onClick={seedDatabase}
                      disabled={seedStatus === 'loading' || seedStatus === 'success'}
                      className={`px-6 py-3 rounded-lg font-bold flex items-center transition-all ${
                        seedStatus === 'success' ? 'bg-green-600 text-white' : 
                        seedStatus === 'error' ? 'bg-red-600 text-white' : 
                        'btn-primary'
                      }`}
                    >
                      {seedStatus === 'idle' && <><UploadCloud size={18} className="mr-2" /> Seed Database with Demo Data</>}
                      {seedStatus === 'loading' && 'Uploading...'}
                      {seedStatus === 'success' && <><CheckCircle size={18} className="mr-2" /> Data Uploaded Successfully!</>}
                      {seedStatus === 'error' && <><AlertTriangle size={18} className="mr-2" /> Error Uploading</>}
                    </button>
                    
                    {seedStatus === 'success' && (
                      <p className="mt-4 text-xs text-green-400">
                        Refresh the Products/Blog page to see your data live from Firebase!
                      </p>
                    )}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;