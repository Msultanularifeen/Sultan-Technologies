import React, { useState, useEffect } from 'react';
import { api, db } from '../services/firebase'; 
import { PRODUCTS, BLOG_POSTS } from '../services/mockData';
import { collection, writeBatch, doc } from 'firebase/firestore'; 
import { Database, UploadCloud, CheckCircle, AlertTriangle, Trash2, Plus, X } from 'lucide-react';
import { Product, BlogPost, Message } from '../types';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [seedStatus, setSeedStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Forms State
  const [showProductForm, setShowProductForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', category: 'iot', description: '', price: 0, features: [], imageUrl: '', status: 'published'
  });
  const [newBlog, setNewBlog] = useState<Partial<BlogPost>>({
    title: '', category: 'News', excerpt: '', content: '', imageUrl: '', status: 'published', date: new Date().toLocaleDateString()
  });

  const loadData = async () => {
    setIsLoading(true);
    const p = await api.products.getAll();
    setProducts(p);
    const b = await api.blog.getAll();
    setBlogPosts(b);
    const m = await api.messages.getAll();
    setMessages(m);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, activeTab]);

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
      PRODUCTS.forEach((product) => {
        const ref = doc(collection(db, 'products')); 
        batch.set(ref, { ...product, createdAt: new Date() });
      });
      BLOG_POSTS.forEach((post) => {
        const ref = doc(collection(db, 'blog_posts'));
        batch.set(ref, { ...post, createdAt: new Date() });
      });
      await batch.commit();
      setSeedStatus('success');
      loadData();
    } catch (error) {
      console.error("Error seeding database:", error);
      setSeedStatus('error');
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert comma separated features string to array if needed (simplified for this input)
      await api.products.add(newProduct as Omit<Product, 'id'>);
      setShowProductForm(false);
      loadData();
      alert("Product added!");
    } catch (e) {
      console.error(e);
      alert("Failed to add product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await api.products.delete(id);
      loadData();
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.blog.add(newBlog as Omit<BlogPost, 'id'>);
      setShowBlogForm(false);
      loadData();
      alert("Post published!");
    } catch (e) {
      console.error(e);
      alert("Failed to add post");
    }
  };

  const handleDeleteBlog = async (id: string) => {
     if (window.confirm("Delete this post?")) {
      await api.blog.delete(id);
      loadData();
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
                Products ({products.length})
              </button>
              <button 
                onClick={() => setActiveTab('blog')}
                className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'blog' ? 'bg-brand-primary text-white' : 'text-text-secondary hover:bg-bg-hover'}`}
              >
                Blog Posts ({blogPosts.length})
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'messages' ? 'bg-brand-primary text-white' : 'text-text-secondary hover:bg-bg-hover'}`}
              >
                Messages ({messages.length})
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
            
            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl font-bold">Manage Products</h2>
                  <button onClick={() => setShowProductForm(true)} className="btn-primary px-4 py-2 rounded text-sm flex items-center">
                    <Plus size={16} className="mr-2" /> Add New
                  </button>
                </div>

                {showProductForm && (
                  <div className="mb-8 p-6 bg-bg-tertiary rounded-lg border border-border animate-fade-in">
                     <div className="flex justify-between mb-4">
                        <h3 className="font-bold">New Product</h3>
                        <button onClick={() => setShowProductForm(false)}><X size={20}/></button>
                     </div>
                     <form onSubmit={handleAddProduct} className="space-y-4">
                        <input className="w-full p-2 bg-bg-primary rounded border border-border" placeholder="Product Name" required 
                          value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                        
                        <div className="grid grid-cols-2 gap-4">
                           <select className="p-2 bg-bg-primary rounded border border-border" 
                            value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}>
                              <option value="iot">IoT</option>
                              <option value="automation">Automation</option>
                              <option value="custom">Custom</option>
                           </select>
                           <input className="p-2 bg-bg-primary rounded border border-border" type="number" placeholder="Price (PKR)" required
                            value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                        </div>
                        
                        <textarea className="w-full p-2 bg-bg-primary rounded border border-border" placeholder="Description" rows={3} required
                          value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                        
                        <input className="w-full p-2 bg-bg-primary rounded border border-border" placeholder="Image URL (https://...)" required
                          value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />

                        <input className="w-full p-2 bg-bg-primary rounded border border-border" placeholder="Features (comma separated)" 
                          onChange={e => setNewProduct({...newProduct, features: e.target.value.split(',')})} />

                        <button type="submit" className="w-full btn-primary p-2 rounded">Save Product</button>
                     </form>
                  </div>
                )}

                <div className="space-y-4">
                   {isLoading ? <p>Loading...</p> : products.map(p => (
                      <div key={p.id} className="flex justify-between items-center p-4 bg-bg-tertiary rounded-lg border border-border">
                         <div className="flex items-center space-x-4">
                            <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded bg-white/5" />
                            <div>
                               <div className="font-bold">{p.name}</div>
                               <div className="text-xs text-text-muted">PKR {p.price} | {p.category}</div>
                            </div>
                         </div>
                         <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:text-red-400 p-2"><Trash2 size={18}/></button>
                      </div>
                   ))}
                   {products.length === 0 && !isLoading && <p className="text-text-muted text-center py-8">No products found. Use Database Tools to seed data.</p>}
                </div>
              </div>
            )}
            
            {/* BLOG TAB */}
            {activeTab === 'blog' && (
               <div>
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl font-bold">Manage Blog</h2>
                  <button onClick={() => setShowBlogForm(true)} className="btn-primary px-4 py-2 rounded text-sm flex items-center">
                    <Plus size={16} className="mr-2" /> New Post
                  </button>
                </div>

                {showBlogForm && (
                  <div className="mb-8 p-6 bg-bg-tertiary rounded-lg border border-border animate-fade-in">
                     <div className="flex justify-between mb-4">
                        <h3 className="font-bold">New Blog Post</h3>
                        <button onClick={() => setShowBlogForm(false)}><X size={20}/></button>
                     </div>
                     <form onSubmit={handleAddBlog} className="space-y-4">
                        <input className="w-full p-2 bg-bg-primary rounded border border-border" placeholder="Title" required 
                          value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} />
                        
                        <input className="w-full p-2 bg-bg-primary rounded border border-border" placeholder="Category" required 
                          value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value})} />
                        
                        <textarea className="w-full p-2 bg-bg-primary rounded border border-border" placeholder="Short Excerpt" rows={2} required
                          value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} />
                        
                        <textarea className="w-full p-2 bg-bg-primary rounded border border-border" placeholder="Full Content" rows={5} required
                          value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} />
                        
                        <input className="w-full p-2 bg-bg-primary rounded border border-border" placeholder="Image URL" required
                          value={newBlog.imageUrl} onChange={e => setNewBlog({...newBlog, imageUrl: e.target.value})} />

                        <button type="submit" className="w-full btn-primary p-2 rounded">Publish Post</button>
                     </form>
                  </div>
                )}

                <div className="space-y-4">
                   {isLoading ? <p>Loading...</p> : blogPosts.map(p => (
                      <div key={p.id} className="flex justify-between items-center p-4 bg-bg-tertiary rounded-lg border border-border">
                         <div className="flex items-center space-x-4">
                            <img src={p.imageUrl} alt={p.title} className="w-12 h-12 object-cover rounded bg-white/5" />
                            <div>
                               <div className="font-bold line-clamp-1">{p.title}</div>
                               <div className="text-xs text-text-muted">{p.date} | {p.category}</div>
                            </div>
                         </div>
                         <button onClick={() => handleDeleteBlog(p.id)} className="text-red-500 hover:text-red-400 p-2"><Trash2 size={18}/></button>
                      </div>
                   ))}
                   {blogPosts.length === 0 && !isLoading && <p className="text-text-muted text-center py-8">No posts found.</p>}
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
               <div>
                <h2 className="text-xl font-bold mb-6">Recent Inquiries</h2>
                <div className="space-y-4">
                   {isLoading ? <p>Loading...</p> : messages.map(m => (
                      <div key={m.id} className="p-4 bg-bg-tertiary rounded-lg border border-border">
                         <div className="flex justify-between mb-2">
                            <span className="font-bold text-white">{m.name}</span>
                            <span className="text-xs text-text-muted">{new Date(m.date).toLocaleDateString()}</span>
                         </div>
                         <div className="text-sm text-brand-primary mb-2">{m.email} | {m.phone}</div>
                         <div className="text-xs bg-bg-primary p-2 rounded inline-block mb-2 border border-border">{m.service}</div>
                         <p className="text-text-secondary text-sm">{m.message}</p>
                      </div>
                   ))}
                   {messages.length === 0 && !isLoading && <p className="text-text-muted text-center py-8">No messages yet.</p>}
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div>
                 <h2 className="text-xl font-bold mb-6">Database Utilities</h2>
                 <div className="bg-bg-tertiary p-6 rounded-xl border border-border">
                    <h3 className="font-bold mb-2 flex items-center"><Database size={20} className="mr-2"/> Initialize Database</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      Uploads the initial demo data to Firebase so the website isn't empty. Useful for first-time setup or reset.
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