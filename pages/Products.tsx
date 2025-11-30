import React, { useState, useEffect } from 'react';
import { api } from '../services/firebase';
import { Product } from '../types';
import { Filter, ShoppingCart, Loader } from 'lucide-react';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.products.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleGetQuote = (product: Product) => {
    const message = `Hello Sultan Technologies, I am interested in getting a quote for:
    
Product: ${product.name}
Price: PKR ${Number(product.price).toLocaleString()}
    
Please provide more details.`;
    
    window.open(`https://wa.me/923026082703?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'iot', label: 'IoT Devices' },
    { id: 'automation', label: 'Automation' },
    { id: 'custom', label: 'Custom Solutions' }
  ];

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-bg-primary">
         <Loader className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
            Our Products
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our range of innovative electronics designed for reliability and performance.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in animation-delay-200">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.id 
                  ? 'bg-brand-primary text-white shadow-glow-blue' 
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-hover'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in animation-delay-400">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-bg-secondary rounded-xl overflow-hidden border border-border hover-card-effect flex flex-col">
              <div className="relative h-56 overflow-hidden bg-bg-tertiary">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-bg-primary/90 backdrop-blur text-brand-primary text-xs font-bold px-2 py-1 rounded border border-brand-primary">
                  {product.category.toUpperCase()}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{product.name}</h3>
                <p className="text-text-muted text-sm mb-4 line-clamp-3">{product.description}</p>
                
                <ul className="text-xs text-text-secondary space-y-1 mb-6 flex-grow">
                  {product.features?.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="text-lg font-bold text-text-primary">
                    <span className="text-xs text-text-muted font-normal mr-1">PKR</span>
                    {Number(product.price).toLocaleString()}
                  </div>
                  <button 
                    onClick={() => handleGetQuote(product)}
                    className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center"
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Quote on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-text-muted">
                No products found. Please contact us or check back later.
            </div>
        )}
      </div>
    </div>
  );
};

export default Products;