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
    <section className="px-6 py-24 bg-[#F8F9FA] relative z-10 contact-section-trigger">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-[0_20px_100px_rgba(0,0,0,0.05)] p-10 md:p-16 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Contact Info */}
          <div className="contact-section-fade-up">
            <span className="text-brand-primary text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block">START A CONVERSATION</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8 text-gray-900 tracking-tight font-heading">
              Ready to build <br className="hidden md:block" /> your <span className="text-brand-primary">legacy?</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-12 max-w-md font-normal">
              Our team is ready to discuss your next construction or renovation project. We handle everything from vision to reality.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-primary" />
                </div>
                <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-gray-600 hover:text-brand-primary transition-colors text-base font-medium">
                  matthew.kalesanwo@fgipgroup.net
                </a>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600 text-base font-medium">+1 630 326 5117</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-brand-primary" />
                </div>
                <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-primary transition-colors text-base font-medium">
                  +234 703 741 2354
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="contact-section-fade-up">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (formErrors.name) setFormErrors({...formErrors, name: ''});
                  }}
                  className={`w-full px-6 py-4 rounded-2xl border ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-[#F9FAFB]'} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700 placeholder:text-gray-400`}
                  placeholder="Your Name"
                />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (formErrors.email) setFormErrors({...formErrors, email: ''});
                  }}
                  className={`w-full px-6 py-4 rounded-2xl border ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-[#F9FAFB]'} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700 placeholder:text-gray-400`}
                  placeholder="Email Address"
                />
              </div>
              <textarea 
                rows={6}
                value={formData.message}
                onChange={(e) => {
                  setFormData({...formData, message: e.target.value});
                  if (formErrors.message) setFormErrors({...formErrors, message: ''});
                }}
                className={`w-full px-6 py-4 rounded-2xl border ${formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-100 bg-[#F9FAFB]'} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700 placeholder:text-gray-400 resize-none`}
                placeholder="How can we help you?"
              ></textarea>
              
              <button 
                type="submit" 
                className="w-full bg-brand-primary text-white py-5 rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-3 group text-lg"
              >
                Send Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {formStatus && (
                <p className={`text-center font-medium mt-4 text-sm ${formStatus.includes('successfully') ? 'text-green-600' : 'text-brand-primary'}`}>
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
