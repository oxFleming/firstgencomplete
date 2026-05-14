import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Phone, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

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
    <section className="px-6 py-12 md:py-24 relative z-10 contact-section-trigger">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 lg:p-24 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Brand & Contact Info */}
          <div className="w-full lg:w-[45%] contact-section-fade-up">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-6 block">
              START A CONVERSATION
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-brand-dark leading-[1.1] mb-8">
              Ready to build your <span className="text-brand-primary/60">legacy?</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-12 max-w-md">
              Our team is ready to discuss your next construction or renovation project. We handle everything from vision to reality.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-gray-500 hover:text-brand-primary transition-colors text-sm sm:text-base font-light">
                  matthew.kalesanwo@fgipgroup.net
                </a>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <p className="text-gray-500 text-sm sm:text-base font-light">+1 630 326 5117</p>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-primary transition-colors text-sm sm:text-base font-light">
                  +234 703 741 2354
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Modern Form */}
          <div className="w-full lg:w-[55%] contact-section-fade-up">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (formErrors.name) setFormErrors({...formErrors, name: ''});
                    }}
                    className={`w-full px-6 py-4 rounded-2xl border ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all text-sm placeholder:text-gray-400`}
                    placeholder="Your Name"
                  />
                  {formErrors.name && <p className="text-red-500 text-[10px] mt-1 ml-2">{formErrors.name}</p>}
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (formErrors.email) setFormErrors({...formErrors, email: ''});
                    }}
                    className={`w-full px-6 py-4 rounded-2xl border ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all text-sm placeholder:text-gray-400`}
                    placeholder="Email Address"
                  />
                  {formErrors.email && <p className="text-red-500 text-[10px] mt-1 ml-2">{formErrors.email}</p>}
                </div>
              </div>
              
              <div className="relative">
                <textarea 
                  id="message" 
                  rows={6}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value});
                    if (formErrors.message) setFormErrors({...formErrors, message: ''});
                  }}
                  className={`w-full px-6 py-5 rounded-2xl border ${formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50/50'} focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all text-sm placeholder:text-gray-400 resize-none`}
                  placeholder="How can we help you?"
                ></textarea>
                {formErrors.message && <p className="text-red-500 text-[10px] mt-1 ml-2">{formErrors.message}</p>}
              </div>
              
              <button 
                type="submit" 
                className="w-full sm:w-auto min-w-[200px] bg-brand-primary/60 text-white py-4.5 px-10 rounded-2xl font-semibold hover:bg-brand-primary transition-all shadow-lg hover:shadow-brand-primary/20 flex items-center justify-center gap-3 group text-sm sm:text-base border border-white/20"
              >
                Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {formStatus && (
                <p className={`text-center lg:text-left font-medium mt-4 text-xs ${formStatus.includes('successfully') ? 'text-green-600' : 'text-brand-primary'}`}>
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
