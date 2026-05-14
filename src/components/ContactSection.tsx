import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { SectionHeader, Highlight } from './ui';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-section-fade-up', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.contact-section-trigger',
            start: "top 80%",
          }
        }
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
    <section className="px-6 py-24 bg-white/40 backdrop-blur-3xl border-t border-white/50 relative z-10 contact-section-trigger">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side: Contact Info */}
          <div className="contact-section-fade-up">
            <SectionHeader 
              subtitle="GET IN TOUCH" 
              title={<>Let's build your <Highlight>vision</Highlight> together</>} 
            />
            <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-lg">
              Whether you are looking to build a custom home, renovate an existing property, or explore investment opportunities, our team is ready to assist.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-primary" />
                </div>
                <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-gray-600 hover:text-brand-primary transition-colors text-sm">
                  matthew.kalesanwo@fgipgroup.net
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-primary" />
                </div>
                <p className="text-gray-600 text-sm font-medium">+1 630 326 5117</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-brand-primary" />
                </div>
                <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-primary transition-colors text-sm">
                  WhatsApp: +234 703 741 2354
                </a>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  444 W Lake Street, Suite 1700, Chicago, IL 60606
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="contact-section-fade-up bg-white/60 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] shadow-xl border border-white/50">
            <h2 className="text-2xl font-heading mb-6 text-brand-dark">Send us a message</h2>
            
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (formErrors.name) setFormErrors({...formErrors, name: ''});
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all text-sm`}
                    placeholder="Your Name"
                  />
                  {formErrors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (formErrors.email) setFormErrors({...formErrors, email: ''});
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all text-sm`}
                    placeholder="your@email.com"
                  />
                  {formErrors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{formErrors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value});
                    if (formErrors.message) setFormErrors({...formErrors, message: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all text-sm`}
                  placeholder="How can we help you?"
                ></textarea>
                {formErrors.message && <p className="text-red-500 text-[10px] mt-1 ml-1">{formErrors.message}</p>}
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-3 group text-sm"
              >
                Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {formStatus && (
                <p className={`text-center font-medium mt-4 text-xs ${formStatus.includes('successfully') ? 'text-green-600' : 'text-brand-primary'}`}>
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
