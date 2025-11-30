import React from 'react';
import { Award, Target, Heart, Zap, Rocket, Star } from 'lucide-react';
import { FOUNDER_INFO } from '../services/mockData';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-brand-primary mb-4">EST. 2025</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">The Beginning of <br/>Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-500">Extraordinary</span></h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Sultan Technologies isn't just a company; it's a manifesto for the future of Pakistan's technological sovereignty.
          </p>
        </div>

        {/* Founder Section - Hero Style */}
        <div className="relative mb-32 animate-fade-in animation-delay-200">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 to-transparent rounded-3xl transform -rotate-1"></div>
          <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-16 border border-white/5 relative shadow-2xl overflow-hidden">
             {/* Background glow */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px] opacity-50"></div>
             
             <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                <div className="md:col-span-5 relative">
                   <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                      <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>
                      <img 
                        src={FOUNDER_INFO.image} 
                        alt={FOUNDER_INFO.name} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        // Removed aggressive onError fallback to allow user's provided link to attempt loading
                      />
                   </div>
                   {/* Decorative elements */}
                   <div className="absolute -bottom-6 -right-6 bg-white text-black p-4 rounded-xl shadow-xl hidden md:block">
                      <div className="font-bold text-lg">Founder</div>
                      <div className="text-xs opacity-75">Sultan Technologies</div>
                   </div>
                </div>
                
                <div className="md:col-span-7 space-y-8">
                   <h2 className="text-4xl md:text-5xl font-bold text-white">{FOUNDER_INFO.name}</h2>
                   <div className="h-1 w-20 bg-brand-primary"></div>
                   <blockquote className="text-2xl text-gray-300 leading-relaxed font-light border-l-4 border-brand-primary pl-6">
                      "{FOUNDER_INFO.quote}"
                   </blockquote>
                   <p className="text-text-secondary text-lg leading-relaxed">
                      {FOUNDER_INFO.bio}
                   </p>
                   <div className="flex space-x-4 pt-4">
                      <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 flex items-center space-x-2">
                         <Rocket size={18} className="text-brand-primary" />
                         <span className="text-sm">Visionary</span>
                      </div>
                      <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 flex items-center space-x-2">
                         <Star size={18} className="text-yellow-500" />
                         <span className="text-sm">Innovator</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Timeline / Vision Grid */}
        <div className="mb-20">
           <h2 className="text-3xl font-bold text-center mb-12">The Roadmap to 2030</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#0f0f0f] p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
                 <div className="absolute top-0 right-0 p-8 text-8xl font-bold text-white/5 group-hover:text-brand-primary/10 transition-colors">01</div>
                 <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">2025: Genesis</h3>
                 <p className="text-gray-400 relative z-10">Launch of core IoT product line and establishment of the Wah Cantt research facility.</p>
              </div>
              <div className="bg-[#0f0f0f] p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
                 <div className="absolute top-0 right-0 p-8 text-8xl font-bold text-white/5 group-hover:text-brand-primary/10 transition-colors">02</div>
                 <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">2027: Expansion</h3>
                 <p className="text-gray-400 relative z-10">Nationwide integration of smart grid controllers and partnership with major industrial sectors.</p>
              </div>
              <div className="bg-[#0f0f0f] p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
                 <div className="absolute top-0 right-0 p-8 text-8xl font-bold text-white/5 group-hover:text-brand-primary/10 transition-colors">03</div>
                 <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">2030: Singularity</h3>
                 <p className="text-gray-400 relative z-10">Full autonomy for home and industrial systems. Sultan Technologies becomes a global exporter of AI hardware.</p>
              </div>
           </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 hover-card-effect rounded-3xl border border-white/5 bg-[#0a0a0a]">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-primary ring-1 ring-white/10">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Precision</h3>
            <p className="text-text-secondary text-sm">We don't deal in approximations. Every micron counts.</p>
          </div>
          <div className="text-center p-8 hover-card-effect rounded-3xl border border-white/5 bg-[#0a0a0a]">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-secondary ring-1 ring-white/10">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Speed</h3>
            <p className="text-text-secondary text-sm">Rapid prototyping to mass production in record time.</p>
          </div>
          <div className="text-center p-8 hover-card-effect rounded-3xl border border-white/5 bg-[#0a0a0a]">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-accent ring-1 ring-white/10">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Passion</h3>
            <p className="text-text-secondary text-sm">Driven by a love for engineering and national progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;