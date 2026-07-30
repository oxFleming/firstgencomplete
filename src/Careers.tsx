import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase, CheckCircle2, Globe2, HardHat, Handshake, Ruler, Search, UsersRound } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_ACCESS_KEY = '13d335cc-ed94-4fa8-bbe4-289925bdaaef';

const areasOfInterest = [
  'Construction & Site Delivery',
  'Engineering',
  'Architecture & Design',
  'Sales & Business Development',
  'Project Management',
  'Procurement & Logistics',
  'Finance & Administration',
  'Legal & Compliance',
  'Other'
];

const whyJoin = [
  {
    icon: Globe2,
    title: 'Cross-Border Platform',
    text: 'Work across Chicago, Houston, and Lagos on projects that connect U.S. operating standards with estate-scale development in Africa.'
  },
  {
    icon: HardHat,
    title: 'Estate-Scale Work',
    text: 'Contribute to FGIP Legacy Luxury Estate — a $549M, 1,500-unit masterplan — alongside custom homes and premium renovations.'
  },
  {
    icon: UsersRound,
    title: 'Builders at Every Level',
    text: 'Engineers, architects, project managers, and commercial talent working as one delivery-focused team.'
  },
  {
    icon: Handshake,
    title: 'Growth Rooted in Trust',
    text: 'A culture that values follow-through, accountability, and people who take ownership of outcomes.'
  }
];

const hiringSteps = [
  {
    icon: Search,
    title: 'We review every submission',
    text: 'Your application goes directly to our leadership team — not into a black hole.'
  },
  {
    icon: Briefcase,
    title: 'We match you to real needs',
    text: 'As projects scale, we hire across construction, commercial, and operations functions.'
  },
  {
    icon: Ruler,
    title: 'Strong candidates stay on file',
    text: 'When the right role opens, you will be among the first we contact.'
  }
];

export default function Careers() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    areaOfInterest: areasOfInterest[0],
    linkedin: '',
    resumeLink: '',
    message: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.careers-fade-up').forEach((el) => {
        gsap.fromTo(el,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 86%' } }
        );
      });
    });

    const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  const setField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.resumeLink.trim()) {
      errors.resumeLink = 'A shareable resume link is required';
    }
    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
      errors.resumeFile = 'File is larger than 5MB — please use a smaller file or rely on the link.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    setFormStatus('Submitting your application...');

    try {
      const payload = new FormData();
      payload.append('access_key', WEB3FORMS_ACCESS_KEY);
      payload.append('subject', `New career application — ${formData.firstName} ${formData.lastName}`);
      payload.append('from_name', 'Careers — First Generation Homes LLC');
      payload.append('first_name', formData.firstName);
      payload.append('last_name', formData.lastName);
      payload.append('email', formData.email);
      if (formData.phone) payload.append('phone', formData.phone);
      if (formData.location) payload.append('location', formData.location);
      payload.append('area_of_interest', formData.areaOfInterest);
      if (formData.linkedin) payload.append('linkedin_or_portfolio', formData.linkedin);
      payload.append('resume_link', formData.resumeLink);
      if (formData.message) payload.append('message', formData.message);
      if (resumeFile) payload.append('attachment', resumeFile);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus('Application received. We review every submission and will reach out when there is a fit.');
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', location: '',
          areaOfInterest: areasOfInterest[0], linkedin: '', resumeLink: '', message: ''
        });
        setResumeFile(null);
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus(result.message || 'Something went wrong. Please try again or email your resume to matthew.kalesanwo@fgipgroup.net.');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('Something went wrong. Please try again or email your resume to matthew.kalesanwo@fgipgroup.net.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-5 py-4 rounded-xl border ${formErrors[field] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700 placeholder:text-gray-400`;

  return (
    <main className="w-full max-w-full overflow-x-clip">
      {/* Hero */}
      <section className="relative min-h-[70svh] flex items-end px-5 sm:px-8 lg:px-12 pt-32 pb-12 overflow-hidden bg-brand-dark text-white">
        <img
          src="/images/luxury-stock/materials-gallery.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 z-0" />
        <div className="relative z-10 w-full max-w-[92rem] mx-auto careers-fade-up">
          <p className="text-brand-primary text-xs font-bold tracking-[0.28em] uppercase mb-5">We're Hiring</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium leading-[0.95] tracking-tight mb-7 max-w-4xl">
            Build the platform with us.
          </h1>
          <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-3xl mb-8">
            We don't hire for titles — we hire for capability. If you can contribute to custom homes, premium renovations, or a $549M estate masterplan, we want to hear from you. No open role required.
          </p>
          <a
            href="#apply"
            className="inline-flex items-center justify-center gap-3 bg-white text-brand-dark rounded-full px-7 py-4 font-bold hover:bg-white/90 transition-colors"
          >
            Submit an Open Application <ArrowRight className="w-5 h-5 text-brand-primary" />
          </a>
        </div>
      </section>

      {/* Why join */}
      <section className="px-5 sm:px-6 py-20 lg:py-28 bg-[#111111] text-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(157,132,183,0.16),transparent_32%)]" aria-hidden="true" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl mb-12 careers-fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Why First Generation Homes</p>
            <h2 className="text-4xl md:text-6xl font-light leading-tight font-heading tracking-tight mb-6">
              Serious projects need serious people.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              From Chicago to Lagos, our work spans custom residences, luxury renovations, and one of the region's most ambitious estate developments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 careers-fade-up">
            {whyJoin.map((item) => (
              <div key={item.title} className="bg-white/9 border border-white/15 rounded-2xl p-6 shadow-sm backdrop-blur-md">
                <item.icon className="w-7 h-7 text-brand-primary mb-5" />
                <h3 className="text-xl font-heading mb-3">{item.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="px-5 sm:px-6 py-20 lg:py-28 bg-[#F8F9FA] relative z-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-[0_20px_100px_rgba(0,0,0,0.05)] p-6 md:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="careers-fade-up">
              <span className="text-brand-primary text-xs font-bold tracking-[0.2em] uppercase mb-5 inline-block">Open Application</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.08] mb-6 text-gray-900 tracking-tight font-heading">
                Tell us who you are and what you build.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
                Share your details and resume below. We review every submission and keep strong candidates on file for current and future opportunities across our U.S. and Nigeria operations.
              </p>

              <div className="space-y-6">
                {hiringSteps.map((step) => (
                  <div key={step.title} className="flex items-start gap-4">
                    <span className="w-11 h-11 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <step.icon className="w-5 h-5 text-brand-primary" />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="careers-fade-up">
              <form onSubmit={handleSubmit} className="space-y-5 bg-[#F9FAFB] border border-gray-100 rounded-2xl p-5 md:p-6">
                <div>
                  <h3 className="font-heading text-2xl text-gray-900 mb-2">Submit your application</h3>
                  <p className="text-sm text-gray-600">Fields marked * are required. Everything else helps us know you better.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="careers-first-name" className="block text-sm font-medium text-gray-700 mb-1.5">First name *</label>
                    <input
                      id="careers-first-name"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setField('firstName', e.target.value)}
                      className={inputClass('firstName')}
                      placeholder="First name"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="careers-last-name" className="block text-sm font-medium text-gray-700 mb-1.5">Last name *</label>
                    <input
                      id="careers-last-name"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setField('lastName', e.target.value)}
                      className={inputClass('lastName')}
                      placeholder="Last name"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="careers-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email address *</label>
                    <input
                      id="careers-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className={inputClass('email')}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="careers-phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone or WhatsApp</label>
                    <input
                      id="careers-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      className={inputClass('phone')}
                      placeholder="+1 or +234"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="careers-location" className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                    <input
                      id="careers-location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => setField('location', e.target.value)}
                      className={inputClass('location')}
                      placeholder="City, Country"
                      autoComplete="address-level2"
                    />
                  </div>
                  <div>
                    <label htmlFor="careers-area" className="block text-sm font-medium text-gray-700 mb-1.5">Area of interest *</label>
                    <select
                      id="careers-area"
                      value={formData.areaOfInterest}
                      onChange={(e) => setField('areaOfInterest', e.target.value)}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-gray-700"
                    >
                      {areasOfInterest.map((area) => <option key={area}>{area}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="careers-linkedin" className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn or portfolio</label>
                  <input
                    id="careers-linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setField('linkedin', e.target.value)}
                    className={inputClass('linkedin')}
                    placeholder="https://linkedin.com/in/you"
                  />
                </div>

                <div>
                  <label htmlFor="careers-resume-link" className="block text-sm font-medium text-gray-700 mb-1.5">Resume / CV link *</label>
                  <input
                    id="careers-resume-link"
                    type="url"
                    value={formData.resumeLink}
                    onChange={(e) => setField('resumeLink', e.target.value)}
                    className={inputClass('resumeLink')}
                    placeholder="Google Drive, Dropbox, or LinkedIn URL"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">Paste a shareable link to your resume — this ensures we always receive it.</p>
                  {formErrors.resumeLink && <p className="text-xs text-red-500 mt-1">{formErrors.resumeLink}</p>}
                </div>

                <div>
                  <label htmlFor="careers-resume-file" className="block text-sm font-medium text-gray-700 mb-1.5">Upload resume / CV <span className="text-gray-400 font-normal">(optional, max 5MB)</span></label>
                  <input
                    id="careers-resume-file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      setResumeFile(e.target.files?.[0] ?? null);
                      if (formErrors.resumeFile) setFormErrors((prev) => ({ ...prev, resumeFile: '' }));
                    }}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:bg-brand-primary/10 file:text-brand-primary file:font-medium hover:file:bg-brand-primary/20 file:transition-colors file:cursor-pointer"
                  />
                  {formErrors.resumeFile && <p className="text-xs text-red-500 mt-1">{formErrors.resumeFile}</p>}
                </div>

                <div>
                  <label htmlFor="careers-message" className="block text-sm font-medium text-gray-700 mb-1.5">Anything else we should know?</label>
                  <textarea
                    id="careers-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setField('message', e.target.value)}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Experience highlights, availability, salary expectations, or why you want to build with us."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-3 group text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  Prefer email? Send your resume to{' '}
                  <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-brand-primary hover:underline">matthew.kalesanwo@fgipgroup.net</a>
                </p>

                {formStatus && (
                  <p className={`text-center font-medium mt-4 text-sm ${formStatus.includes('received') ? 'text-green-600' : 'text-brand-primary'}`} role="status">
                    {formStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Equal opportunity note */}
      <section className="px-5 sm:px-6 pb-20 lg:pb-28 bg-[#F8F9FA] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-dark text-white rounded-2xl p-8 md:p-12 careers-fade-up">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <CheckCircle2 className="w-10 h-10 text-brand-primary shrink-0" />
              <div>
                <h3 className="text-2xl font-heading mb-2">An equal opportunity team</h3>
                <p className="text-white/70 leading-relaxed max-w-3xl">
                  First Generation Homes LLC and FGIP Group consider every application on capability and character. We welcome candidates across all backgrounds, in the U.S. and Nigeria, on-site and hybrid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
