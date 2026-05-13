import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const errors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
      valid = false;
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      valid = false;
    }

    setFormErrors(errors);

    if (valid) {
      setFormStatus('Sending message...');
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setFormStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setFormStatus(''), 5000);
        } else {
          setFormStatus(result.error || 'Failed to send message.');
        }
      } catch (error) {
        console.error(error);
        setFormStatus('Failed to send message. Please try again.');
      }
    }
  };

  return (
    <section id="contact-section" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="bg-white/60 backdrop-blur-3xl rounded-[3rem] p-8 md:p-16 border border-white/50 shadow-2xl overflow-hidden relative">
        {/* Background Decorative Blob */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div>
            <h3 className="text-brand-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">Start a conversation</h3>
            <h2 className="text-4xl md:text-6xl font-heading font-light mb-8 text-brand-dark tracking-tight">Ready to build your <span className="text-brand-primary">legacy?</span></h2>
            <p className="text-lg text-gray-600 mb-12 max-w-md">Our team is ready to discuss your next construction or renovation project. We handle everything from vision to reality.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-gray-600 hover:text-brand-primary transition-colors">matthew.kalesanwo@fgipgroup.net</a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-gray-600">+1 630 326 5117</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-primary transition-colors">+234 703 741 2354</a>
              </div>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl border ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all font-light`}
                />
                {formErrors.name && <p className="text-red-500 text-[10px] mt-1 ml-2">{formErrors.name}</p>}
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl border ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all font-light`}
                />
                {formErrors.email && <p className="text-red-500 text-[10px] mt-1 ml-2">{formErrors.email}</p>}
              </div>
            </div>
            <div>
              <textarea 
                rows={4}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className={`w-full px-5 py-4 rounded-2xl border ${formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all font-light resize-none`}
              ></textarea>
              {formErrors.message && <p className="text-red-500 text-[10px] mt-1 ml-2">{formErrors.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-3 group shadow-xl active:scale-[0.98]"
            >
              Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {formStatus && (
              <p className={`text-center text-sm font-medium animate-fade-in ${formStatus.includes('successfully') ? 'text-green-600' : 'text-brand-primary'}`}>
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
