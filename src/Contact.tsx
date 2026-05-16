import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Phone, MapPin, MessageCircle, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

const projectTypes = [
  'Custom home construction',
  'Renovation or remodeling',
  'Real estate development',
  'Investment or partnership',
  'Planning and consultation'
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: projectTypes[0],
    message: ''
  });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-fade-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
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
      errors.message = 'Project details are required';
      valid = false;
    }

    setFormErrors(errors);

    if (valid) {
      setFormStatus('Sending your consultation request...');
      try {
        const enrichedMessage = [
          `Project type: ${formData.projectType}`,
          formData.phone ? `Phone: ${formData.phone}` : '',
          '',
          formData.message
        ].filter(Boolean).join('\n');

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: enrichedMessage,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setFormStatus('Request received. Our team will follow up shortly.');
          setFormData({ name: '', email: '', phone: '', projectType: projectTypes[0], message: '' });
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
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-5 sm:px-6 w-full max-w-full overflow-x-clip">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="contact-fade-up lg:col-span-5">
          <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">REQUEST A CONSULTATION</h3>
          <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading tracking-tight leading-tight">Let's define the right next step.</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-lg">
            Whether you are planning a custom home, renovation, development project, or investment conversation, share the basics and we will help you move from idea to a clear plan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              'Custom homes',
              'Luxury renovations',
              'Development projects',
              'Investment discussions'
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-gray-700 bg-white/50 border border-white/50 rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-7">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-heading text-xl mb-1">Email</h4>
                <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-gray-600 hover:text-brand-primary transition-colors">matthew.kalesanwo@fgipgroup.net</a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-heading text-xl mb-1">Phone</h4>
                <p className="text-gray-600">+1 630 326 5117</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-heading text-xl mb-1">WhatsApp</h4>
                <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-primary transition-colors">+234 703 741 2354</a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h4 className="font-heading text-xl mb-1">Primary Office</h4>
                <p className="text-gray-600">444 W Lake Street, Suite 1700<br />Chicago, IL 60606</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-fade-up lg:col-span-7 bg-white/70 backdrop-blur-2xl p-6 md:p-10 rounded-2xl shadow-2xl border border-white/50">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-heading mb-3">Tell us about the project</h2>
            <p className="text-gray-600">The more specific you are, the better we can prepare for the first conversation.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/70'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all`}
                  placeholder="Your name"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/70'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all`}
                  placeholder="you@example.com"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone or WhatsApp</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                  placeholder="Best number to reach you"
                />
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">Project type</label>
                <select
                  id="projectType"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                >
                  {projectTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Project details *</label>
              <textarea
                id="message"
                rows={7}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                }}
                className={`w-full px-4 py-3 rounded-xl border ${formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white/70'} focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all resize-none`}
                placeholder="Tell us the location, project goal, budget range, timeline, and any important details."
              />
              {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-3 group"
            >
              Request Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {formStatus && (
              <p className={`text-center font-medium mt-4 ${formStatus.includes('received') ? 'text-green-600' : 'text-brand-primary'}`}>
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
