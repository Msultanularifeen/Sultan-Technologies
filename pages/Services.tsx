import React from 'react';
import { Cpu, Wifi, Globe, Home, PenTool, Database, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../services/mockData';

const Services: React.FC = () => {
  // Mapping icons to the data
  const getIcon = (title: string) => {
    if (title.includes('IoT')) return <Wifi size={40} />;
    if (title.includes('WiFi')) return <Zap size={40} />;
    if (title.includes('PCB')) return <Cpu size={40} />;
    if (title.includes('Embedded')) return <PenTool size={40} />;
    if (title.includes('Home')) return <Home size={40} />;
    if (title.includes('Web')) return <Globe size={40} />;
    if (title.includes('Consulting')) return <Shield size={40} />;
    return <Database size={40} />;
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/923026082703?text=Hello%20Sultan%20Technologies,%20I%20need%20a%20custom%20engineering%20solution.", "_blank");
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">Our Services</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            End-to-end electronics engineering services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in animation-delay-200">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="bg-bg-secondary p-8 rounded-xl border border-border hover-card-effect group">
              <div className="w-16 h-16 bg-bg-hover rounded-2xl flex items-center justify-center text-brand-primary mb-6 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                {getIcon(service.title)}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                {service.desc}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center text-xs text-text-muted">
                    <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full mr-2"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-card rounded-2xl p-10 text-center border border-border/50">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-text-secondary mb-8">We can build exactly what you need. Let's discuss your requirements.</p>
          <button onClick={openWhatsApp} className="btn-primary px-8 py-3 rounded-lg font-bold">
            Contact Engineering Team (WhatsApp)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;