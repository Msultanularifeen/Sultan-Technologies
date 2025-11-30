import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Phone, Mail, MapPin, Facebook, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import AIChat from './AIChat';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-500 flex flex-col font-sans overflow-x-hidden selection:bg-brand-primary selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-[100] transition-all duration-500 ${
          scrolled 
            ? 'py-3 bg-bg-primary/80 backdrop-blur-md border-b border-white/5 shadow-2xl' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center group cursor-pointer z-50">
              <div className="relative w-10 h-10 mr-3 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-full h-full bg-[#000] rounded-xl flex items-center justify-center border border-white/10">
                   <span className="font-bold text-white text-xl">S</span>
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight group-hover:text-brand-primary transition-colors duration-300">
                Sultan<span className="font-light text-text-muted">Tech</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path 
                      ? 'text-white bg-white/10 backdrop-blur-sm' 
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-px h-6 bg-white/10 mx-2"></div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white/5 transition-all duration-300 text-text-secondary hover:text-white hover:rotate-180"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-text-primary focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <div 
          className={`md:hidden fixed inset-0 bg-bg-primary/95 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-text-primary hover:text-brand-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
                onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                className="flex items-center text-text-secondary mt-8"
              >
                {theme === 'dark' ? <Sun size={24} className="mr-2" /> : <Moon size={24} className="mr-2" />}
                Switch Theme
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-0 relative z-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <span className="font-bold text-2xl text-white">Sultan<span className="text-blue-500">Tech</span></span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                Pioneering the future of electronics since 2005. Designed in Pakistan, engineered for the world.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:bg-brand-primary hover:text-white transition-all duration-300">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Columns */}
            <div>
              <h3 className="text-white font-semibold mb-6">Products</h3>
              <ul className="space-y-4 text-sm text-text-muted">
                <li><Link to="/products" className="hover:text-brand-primary transition-colors">Smart Home</Link></li>
                <li><Link to="/products" className="hover:text-brand-primary transition-colors">Industrial IoT</Link></li>
                <li><Link to="/products" className="hover:text-brand-primary transition-colors">Custom PCBs</Link></li>
                <li><Link to="/products" className="hover:text-brand-primary transition-colors">Automation Kits</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-text-muted">
                <li><Link to="/about" className="hover:text-brand-primary transition-colors">Our Story</Link></li>
                <li><Link to="/services" className="hover:text-brand-primary transition-colors">Services</Link></li>
                <li><Link to="/blog" className="hover:text-brand-primary transition-colors">Newsroom</Link></li>
                <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Contact</h3>
              <ul className="space-y-4 text-sm text-text-muted">
                <li className="flex items-start">
                  <MapPin size={16} className="mr-3 mt-1 text-brand-primary" />
                  <span>Wah Cantt, Punjab,<br/>Pakistan</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-3 text-brand-primary" />
                  <span>+92 302 6082703</span>
                </li>
                <li className="flex items-center">
                  <Mail size={16} className="mr-3 text-brand-primary" />
                  <span>info@sultantech.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-muted">
            <p>&copy; {new Date().getFullYear()} Sultan Technologies. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Integrated AI Assistant */}
      <AIChat />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 left-8 bg-white/10 backdrop-blur text-white p-3 rounded-full shadow-lg hover:bg-brand-primary transition-all duration-300 z-40"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Layout;