import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

const WEB3FORMS_ACCESS_KEY = '13d335cc-ed94-4fa8-bbe4-289925bdaaef';

const projectTypes = [
  'Custom home construction',
  'Renovation or remodeling',
  'Real estate development',
  'Investment or partnership',
  'Planning and consultation'
];

const consultationBenefits = [
  'Clarify the right service path',
  'Discuss scope, timeline, and budget range',
  'Identify the information needed before a proposal',
  'Leave with a practical next step'
];

export default function ContactSection() {
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
      gsap.fromTo('.contact-section-fade-up',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-section-trigger',
            start: 'top 80%',
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

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New consultation request from ${formData.name}`,
            from_name: 'First Generation Homes Website',
            name: formData.name,
            email: formData.email,
            message: enrichedMessage,
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setFormStatus('Request received. We will review the details and follow up with a practical next step.');
          setFormData({ name: '', email: '', phone: '', projectType: projectTypes[0], message: '' });
          setTimeout(() => setFormStatus(''), 6000);
        } else {
          setFormStatus(result.message || 'Failed to send message.');
        }
      } catch (error) {
        console.error(error);
        setFormStatus('Failed to send message. Please try again.');
      }
    }
  };

  return (
    <section className="px-5 sm:px-6 py-20 lg:py-24 bg-[#F8F9FA] relative z-10 contact-section-trigger">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_20px_100px_rgba(0,0,0,0.05)] p-6 md:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="contact-section-fade-up">
            <span className="text-brand-primary text-xs font-bold tracking-[0.2em] uppercase mb-5 inline-block">FREE PROJECT CONSULTATION</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.08] mb-6 text-gray-900 tracking-tight font-heading">
              Tell us what you want to build, renovate, develop, or invest in.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
              Share the basics and we will help you understand the right next step. The goal of the first conversation is clarity, not pressure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {consultationBenefits.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-5 mb-8">
              <h3 className="font-heading text-xl mb-3 text-gray-900">What to include</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Location, project type, stage of planning, budget range if known, desired timeline, and the best way to reach you.
              </p>
            </div>

            <div className="space-y-5">
              <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="flex items-center gap-4 text-gray-700 hover:text-brand-primary transition-colors">
                <span className="w-11 h-11 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-primary" />
                </span>
                <span className="font-medium">matthew.kalesanwo@fgipgroup.net</span>
              </a>
              <div className="flex items-center gap-4 text-gray-700">
                <span className="w-11 h-11 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-primary" />
                </span>
                <span className="font-medium">+1 630 326 5117</span>
              </div>
              <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-700 hover:text-brand-primary transition-colors">
                <span className="w-11 h-11 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-brand-primary" />
                </span>
                <span className="font-medium">WhatsApp: +234 703 741 2354</span>
              </a>
            </div>
          </div>

          <div className="contact-section-fade-up">
            <form onSubmit={handleFormSubmit} className="space-y-5 bg-[#F9FAFB] border border-gray-100 rounded-2xl p-5 md:p-6">
              <div>
                <h3 className="font-heading text-2xl text-gray-900 mb-2">Request a consultation</h3>
                <p className="text-sm text-gray-600">A short, useful brief helps us prepare a better first response.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  aria-label="Your name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full px-5 py-4 rounded-xl border ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700 placeholder:text-gray-400`}
                  placeholder="Your name"
                />
                <input
                  type="email"
                  aria-label="Email address"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                  }}
                  className={`w-full px-5 py-4 rounded-xl border ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700 placeholder:text-gray-400`}
                  placeholder="Email address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="tel"
                  aria-label="Phone or WhatsApp"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700 placeholder:text-gray-400"
                  placeholder="Phone or WhatsApp"
                />
                <select
                  aria-label="Project type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700"
                >
                  {projectTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
              </div>

              <textarea
                rows={6}
                aria-label="Project details"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                }}
                className={`w-full px-5 py-4 rounded-xl border ${formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700 placeholder:text-gray-400 resize-none`}
                placeholder="Briefly describe the project, location, budget range, timeline, or investment interest."
              />

              <button
                type="submit"
                className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-3 group text-base"
              >
                Book My Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Prefer to talk now? Use the phone, email, or WhatsApp options beside this form.
              </p>

              {formStatus && (
                <p className={`text-center font-medium mt-4 text-sm ${formStatus.includes('received') ? 'text-green-600' : 'text-brand-primary'}`}>
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
