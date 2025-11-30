import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { api } from '../services/firebase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await api.messages.send(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in animation-delay-200">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-bg-secondary p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-bg-tertiary rounded-lg flex items-center justify-center text-brand-primary flex-shrink-0 mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Phone</div>
                    <a href="tel:+923026082703" className="text-text-secondary hover:text-brand-primary transition-colors">+92 302 6082703</a>
                    <div className="text-xs text-text-muted mt-1">Available 9 AM - 6 PM (Mon-Sat)</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-bg-tertiary rounded-lg flex items-center justify-center text-brand-primary flex-shrink-0 mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Email</div>
                    <a href="mailto:info@sultantech.com" className="text-text-secondary hover:text-brand-primary transition-colors">info@sultantech.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-bg-tertiary rounded-lg flex items-center justify-center text-brand-primary flex-shrink-0 mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Location</div>
                    <p className="text-text-secondary">Wah Cantt, Punjab, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-hero p-8 rounded-xl text-white shadow-glow-blue">
               <h3 className="text-2xl font-bold mb-2">18+ Years of Excellence</h3>
               <p className="opacity-90">Trust the experts with your next electronics project. We guarantee quality and reliability.</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-bg-secondary p-8 rounded-xl border border-border shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                    placeholder="+92..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                  placeholder="you@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Service Interest</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all text-text-primary"
                >
                  <option value="">Select a Service</option>
                  <option value="iot">IoT Solutions</option>
                  <option value="automation">Home Automation</option>
                  <option value="custom">Custom PCB</option>
                  <option value="consulting">Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full btn-primary py-4 rounded-lg font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : (
                  <>Send Message <Send size={18} className="ml-2" /></>
                )}
              </button>

              {status === 'success' && (
                <div className="p-4 bg-green-900/20 border border-green-500/50 text-green-400 rounded-lg text-sm text-center">
                  Message sent successfully! We will contact you soon.
                </div>
              )}
               {status === 'error' && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-sm text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
