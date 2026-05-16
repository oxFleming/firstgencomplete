import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';
import { Highlight, Button } from './components/ui';
import ContactSection from './components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const servicePillars = [
  {
    id: 'custom-homes',
    title: 'Custom Home Construction',
    audience: 'For families and property owners ready to build a home around their lifestyle.',
    description: 'From early planning to final handover, First Generation Homes coordinates design, construction, finishes, and delivery so your home is built with clarity and accountability.',
    image: '/images/project-images/custom-home/custom2.webp',
    bullets: [
      'Architectural design coordination',
      'Ground-up residential construction',
      'Interior finishes and fixture planning',
      'Budget and timeline alignment before work begins'
    ]
  },
  {
    id: 'renovation',
    title: 'Luxury Renovations & Remodeling',
    audience: 'For owners who want to modernize, expand, or reposition an existing property.',
    description: 'We help clients improve how a property looks, functions, and performs, with renovation work that can raise comfort, usability, and long-term value.',
    image: '/images/project-images/interior/interior2.webp',
    bullets: [
      'Kitchen and bathroom remodeling',
      'Whole-home modernization',
      'Structural upgrades and additions',
      'Interior and exterior refreshes'
    ]
  },
  {
    id: 'development',
    title: 'Real Estate Development',
    audience: 'For investors, landowners, and partners planning residential or mixed-use projects.',
    description: 'Our team supports development planning, procurement, construction coordination, and phased delivery for projects that need disciplined execution.',
    image: '/images/services/building1.webp',
    bullets: [
      'Development planning and project strategy',
      'Construction and delivery coordination',
      'Procurement and finishing support',
      'International project sponsorship and partnership'
    ]
  },
  {
    id: 'materials',
    title: 'Finishing Products & Procurement',
    audience: 'For clients who want stronger quality control and smarter sourcing decisions.',
    description: 'We support construction and renovation projects through finish selections, material sourcing, and installation coordination that protect both budget and design intent.',
    image: '/images/services/materials.webp',
    bullets: [
      'Tile, wood, and flooring selections',
      'Kitchen and bathroom fixtures',
      'Interior finish packages',
      'Procurement guidance for cost and quality control'
    ]
  }
];

const processSteps = [
  'Discovery call and project fit',
  'Scope, budget, and timeline review',
  'Design, planning, and procurement path',
  'Construction coordination and delivery'
];

export default function Services() {
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fadeElements = document.querySelectorAll('.services-fade-up');
      fadeElements.forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });
    });

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-5 sm:px-6 w-full max-w-full overflow-x-clip">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14">
        <div className="lg:col-span-8 services-fade-up">
          <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-6">SERVICES</h3>
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8 font-heading tracking-tight">
            Build, renovate, or develop with a team that can carry the work from <Highlight>first plan</Highlight> to final handover.
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            First Generation Homes LLC helps homeowners, investors, and development partners turn real estate ideas into finished spaces through design-build construction, renovation, development planning, and finishing support.
          </p>
        </div>
        <div className="lg:col-span-4 services-fade-up bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-heading mb-4">Start with the right conversation.</h2>
          <p className="text-gray-600 mb-6">Tell us what you want to build or improve. We will help clarify the scope, next steps, and best service path.</p>
          <Button onClick={() => navigate('/contact')}>Request Consultation</Button>
        </div>
      </section>

      <nav className="sticky top-[73px] bg-white/70 backdrop-blur-2xl z-40 py-4 border border-white/40 flex gap-6 overflow-x-auto whitespace-nowrap text-sm font-medium mb-16 services-fade-up px-4 rounded-xl shadow-sm max-w-full scrollbar-hide">
        {servicePillars.map((service) => (
          <a key={service.id} href={`#${service.id}`} className="hover:text-brand-primary transition-colors">{service.title}</a>
        ))}
      </nav>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 services-fade-up">
        {['Chicago, Houston, and Lagos reach', 'Custom homes and luxury renovations', 'Development and investment support', 'Design, procurement, and delivery focus'].map((proof) => (
          <div key={proof} className="bg-white/60 border border-white/50 rounded-xl p-5 shadow-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700 font-medium">{proof}</span>
          </div>
        ))}
      </section>

      <section className="space-y-20">
        {servicePillars.map((service, index) => (
          <div id={service.id} key={service.id} className="services-fade-up scroll-mt-40 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center border-t border-gray-200 pt-16">
            <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
              <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">{service.audience}</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6 font-heading tracking-tight">{service.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{service.description}</p>
              <ul className="space-y-4 mb-10">
                {service.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate('/contact')}>Discuss This Service</Button>
            </div>
            <img
              src={service.image}
              alt={service.title}
              className="w-full aspect-[4/3] lg:aspect-[16/11] object-cover rounded-sm shadow-md"
              loading="lazy"
            />
          </div>
        ))}
      </section>

      <section className="services-fade-up mt-24 bg-white/50 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">OUR PROCESS</h3>
            <h2 className="text-3xl md:text-4xl font-light font-heading tracking-tight mb-5">A clearer path from interest to action.</h2>
            <p className="text-gray-700 leading-relaxed">Clients should never have to guess what happens next. We use the first conversation to understand the project, identify constraints, and recommend the right route forward.</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {processSteps.map((step, index) => (
              <div key={step} className="bg-white rounded-xl p-5 border border-gray-100">
                <span className="text-brand-primary text-xs font-bold tracking-widest">0{index + 1}</span>
                <p className="mt-3 text-gray-800 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-24 pb-12 text-center services-fade-up">
        <p className="text-2xl md:text-4xl font-light text-brand-primary leading-tight mb-10 font-heading">
          "Our experience with First Generation Homes LLC was marked by high integrity, good quality, and high value work."
        </p>
        <p className="font-medium text-lg">Julius A</p>
        <p className="text-gray-600">CEO Leadway Pharmacy</p>
      </section>

      <ContactSection />
    </main>
  );
}
