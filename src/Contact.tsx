import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-fade-up', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

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
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Side: Contact Info */}
        <div className="contact-fade-up">
          <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">GET IN TOUCH</h3>
          <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading tracking-tight">Let's build your vision</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-lg">
            Whether you are looking to build a custom home, renovate an existing property, or explore investment opportunities, our team is ready to assist.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-heading text-xl mb-1">Email Us</h4>
                <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-gray-600 hover:text-brand-primary transition-colors">
                  matthew.kalesanwo@fgipgroup.net
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-heading text-xl mb-1">Call Us</h4>
                <p className="text-gray-600">+1 630 326 5117</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-heading text-xl mb-1">WhatsApp</h4>
                <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-primary transition-colors">
                  +234 703 741 2354
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-heading text-xl mb-1">Chicago Office</h4>
                <p className="text-gray-600">444 W Lake Street, Suite 1700<br/>Chicago, IL 60606</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="contact-fade-up bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/50">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading mb-3">Send us a message</h2>
            <p className="text-gray-600">Fill out the form and we'll get back to you shortly.</p>
          </div>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (formErrors.name) setFormErrors({...formErrors, name: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all`}
                  placeholder="Your Name"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (formErrors.email) setFormErrors({...formErrors, email: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all`}
                  placeholder="your@email.com"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea 
                id="message" 
                rows={5}
                value={formData.message}
                onChange={(e) => {
                  setFormData({...formData, message: e.target.value});
                  if (formErrors.message) setFormErrors({...formErrors, message: ''});
                }}
                className={`w-full px-4 py-3 rounded-xl border ${formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all`}
                placeholder="How can we help you?"
              ></textarea>
              {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-3 group"
            >
              Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {formStatus && (
              <p className={`text-center font-medium mt-4 ${formStatus.includes('successfully') ? 'text-green-600' : 'text-brand-primary'}`}>
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
