import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Wifi, Settings, ShoppingBag, Zap, Shield, ChevronRight, Globe, Activity } from 'lucide-react';
import { api } from '../services/firebase'; // Use api instead of mock
import { Product } from '../types';
import { TESTIMONIALS } from '../services/mockData';

const Home: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch latest products for the homepage
    const fetchLatest = async () => {
      const all = await api.products.getAll();
      setLatestProducts(all.slice(0, 3));
    };
    fetchLatest();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [latestProducts]); // Re-observe when products load

  return (
    <div className="overflow-hidden bg-bg-primary">
      {/* 3D Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-text-secondary tracking-widest uppercase">Est. 2025 | The New Era</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-white animate-fade-in animation-delay-200">
              Inventing <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-purple-500 to-pink-500">Tomorrow.</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in animation-delay-400">
              Sultan Technologies brings you the first generation of neural-integrated electronics. We are not just building devices; we are architecting the future of Pakistan.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in animation-delay-600">
              <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 flex items-center justify-center">
                See the Future <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                Meet the Founder
              </Link>
            </div>
          </div>

          {/* 3D Floating Element */}
          <div className="relative hidden lg:block perspective-1000">
             <div 
               className="relative w-full aspect-square transition-transform duration-100 ease-out preserve-3d"
               style={{ transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)` }}
             >
                {/* Main Card */}
                <div className="absolute inset-10 bg-gradient-to-br from-[#1a1a1a]/80 to-black/80 border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-8 backdrop-blur-xl group hover:border-brand-primary/30 transition-all duration-500">
                   {/* Holographic effect */}
                   <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                   
                   <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-primary to-purple-600 flex items-center justify-center mb-6 shadow-glow-blue animate-float relative">
                      <div className="absolute inset-0 bg-brand-primary blur-xl opacity-50 animate-pulse"></div>
                      <Cpu size={64} className="text-white relative z-10" />
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Neural Core X1</h3>
                   <p className="text-center text-text-secondary font-mono text-sm">System Status: Online</p>
                   
                   {/* Floating Elements */}
                   <div className="absolute top-10 right-0 bg-[#2a2a2a] p-4 rounded-2xl border border-white/10 shadow-xl transform translate-z-20 translate-x-10 animate-float delay-700">
                      <Activity size={24} className="text-green-500" />
                   </div>
                   <div className="absolute bottom-10 left-0 bg-[#2a2a2a] p-4 rounded-2xl border border-white/10 shadow-xl transform translate-z-20 -translate-x-10 animate-float delay-1000">
                      <Globe size={24} className="text-blue-500" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">Designed for 2025</h2>
            <p className="text-text-secondary max-w-2xl mx-auto reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              Technology so advanced, it feels like magic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
             {/* Large Item */}
             <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f0f0f] hover:border-brand-primary/50 transition-colors reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" alt="Tech" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                   <h3 className="text-3xl font-bold text-white mb-2">Holographic Interfaces</h3>
                   <p className="text-gray-300 max-w-md">Touchless control for a hygienic, futuristic world. Experience the next dimension of interaction.</p>
                </div>
             </div>

             {/* Small Item 1 */}
             <div className="relative group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f0f0f] p-8 hover:bg-[#151515] transition-colors reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
                   <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instant Sync</h3>
                <p className="text-gray-400 text-sm">Zero-latency communication between all your devices.</p>
             </div>

             {/* Small Item 2 */}
             <div className="relative group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f0f0f] p-8 hover:bg-[#151515] transition-colors reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 text-purple-500">
                   <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quantum Encrypted</h3>
                <p className="text-gray-400 text-sm">Security architecture built for the post-quantum era.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-bg-primary border-t border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
               <h2 className="text-3xl font-bold reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">Latest Drop</h2>
               <Link to="/products" className="flex items-center text-brand-primary font-medium hover:text-white transition-colors">View Collection <ChevronRight size={16} /></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {latestProducts.map((product, idx) => (
                  <Link to="/products" key={product.id} className={`group block relative rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10`} style={{ transitionDelay: `${idx * 100}ms` }}>
                     <div className="aspect-[4/3] overflow-hidden rounded-t-3xl bg-[#111] relative">
                        <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                     </div>
                     <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-bold text-lg text-white group-hover:text-brand-primary transition-colors">{product.name}</h3>
                           <span className="text-brand-primary text-sm font-bold font-mono bg-brand-primary/10 px-3 py-1 rounded-full">PKR {Number(product.price).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-2">{product.description}</p>
                     </div>
                  </Link>
               ))}
               {latestProducts.length === 0 && (
                 <div className="col-span-3 text-center text-text-muted py-12">
                   Initializing Product Database...
                 </div>
               )}
            </div>
         </div>
      </section>

      {/* Stats Parallax - Updated for New Company */}
      <section className="py-32 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000")' }}>
         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-white mb-4">The Launch Metrics</h2>
               <p className="text-gray-400">Our Day 1 capabilities are ready to scale.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
               {[
                  { label: "Vision", value: "2025" },
                  { label: "Products Launched", value: "06" },
                  { label: "Engineers", value: "12" },
                  { label: "Innovation Index", value: "100%" },
               ].map((stat, idx) => (
                  <div key={idx} className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 bg-white/5 p-6 rounded-2xl backdrop-blur border border-white/5">
                     <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                     <div className="text-brand-primary font-medium tracking-wide uppercase text-xs">{stat.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-center mb-16">Early Access Feedback</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                 <div key={t.id} className="bg-[#0f0f0f] p-8 rounded-3xl border border-white/5 relative reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 hover:bg-[#151515] transition-colors" style={{ transitionDelay: `${idx * 150}ms` }}>
                    <div className="text-brand-primary text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
                    <p className="text-gray-300 mb-6 relative z-10 leading-relaxed italic">{t.content}</p>
                    <div className="flex items-center mt-auto">
                       <div className="w-10 h-10 bg-gradient-to-tr from-brand-primary to-purple-600 rounded-full flex items-center justify-center font-bold text-white mr-3 shadow-lg">
                          {t.name.charAt(0)}
                       </div>
                       <div>
                          <div className="font-bold text-white text-sm">{t.name}</div>
                          <div className="text-xs text-gray-500">{t.role}</div>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-purple-900 opacity-20"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary rounded-full blur-[200px] opacity-20"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Be part of the revolution.</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">The technology of 2030 is available today. Start your transformation with Sultan Technologies.</p>
            <Link to="/contact" className="inline-block px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
               Initialize Project
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;