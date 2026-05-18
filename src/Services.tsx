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
    audience: 'For owners ready to build a signature residence.',
    outcome: 'One coordinated path from concept, budget, finishes, and construction to handover.',
    description: 'We coordinate architectural decisions, site execution, interior finish intent, and delivery controls so the residence feels intentional before work begins and refined when the keys are handed over.',
    image: '/images/luxury-stock/airy-custom-home.webp',
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
    audience: 'For owners repositioning an existing property for daily use and resale strength.',
    outcome: 'Modern rooms, stronger utility, and finishes that signal value without shouting.',
    description: 'We focus renovation scope around the decisions that change how a property lives: kitchens, baths, structural updates, lighting, surfaces, circulation, and exterior presence.',
    image: '/images/luxury-stock/marble-bath.webp',
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
    outcome: 'A disciplined path from feasibility to procurement, construction coordination, and phased delivery.',
    description: 'Our team supports residential and mixed-use projects that need credible planning, visible cost control, supplier coordination, and execution discipline before capital is committed.',
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
    title: 'Finishes & Procurement',
    audience: 'For clients who want stronger quality control and smarter sourcing decisions.',
    outcome: 'Selections that protect the design intent while keeping cost, quality, and availability visible.',
    description: 'We support projects through finish selections, material sourcing, and installation coordination that protect both budget and design intent across tile, stone, flooring, cabinetry, fixtures, and surfaces.',
    image: '/images/luxury-stock/materials-wall.webp',
    bullets: [
      'Tile, wood, and flooring selections',
      'Kitchen and bathroom fixtures',
      'Interior finish packages',
      'Procurement guidance for cost and quality control'
    ]
  }
];

const proofPoints = [
  'Chicago-based team with Houston and Lagos reach',
  'Residential construction, renovation, and development support',
  'Design, procurement, and delivery under one conversation',
  'Consultation-first process before scope or budget decisions'
];

const luxuryStandards = [
  { value: '01', label: 'Budget clarity before decorative decisions' },
  { value: '02', label: 'Material selections tied to availability and install reality' },
  { value: '03', label: 'Project routes for homes, renovations, developments, and partners' }
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
            Build, improve, or develop with <Highlight>luxury-grade discipline</Highlight>.
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            First Generation Homes LLC helps homeowners, investors, and development partners turn expensive decisions into a controlled plan: scope, materials, schedule, procurement, and delivery.
          </p>
        </div>
        <div className="lg:col-span-4 services-fade-up bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-heading mb-4">Not sure where to start?</h2>
          <p className="text-gray-600 mb-6">Use the first consultation to clarify the project type, budget range, timing, and best route before making bigger commitments.</p>
          <Button onClick={() => navigate('/contact')}>Book a Project Consultation</Button>
        </div>
      </section>

      <section className="services-fade-up mb-20 grid grid-cols-1 lg:grid-cols-12 gap-4 bg-brand-dark text-white overflow-hidden">
        <div className="lg:col-span-7 min-h-[420px] relative">
          <img src="/images/luxury-stock/grand-foyer.webp" alt="Luxury residence interior" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-black/55" />
        </div>
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
          <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">How We Position The Work</p>
          <h2 className="text-4xl md:text-5xl font-heading font-light leading-tight mb-8">Luxury is a controlled process before it is a finish package.</h2>
          <div className="space-y-5">
            {luxuryStandards.map((item) => (
              <div key={item.value} className="flex gap-5 border-t border-white/15 pt-5">
                <span className="text-brand-primary font-heading text-3xl">{item.value}</span>
                <p className="text-white/76 leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav className="sticky top-[73px] bg-white/70 backdrop-blur-2xl z-40 py-4 border border-white/40 flex gap-6 overflow-x-auto whitespace-nowrap text-sm font-medium mb-12 services-fade-up px-4 rounded-xl shadow-sm max-w-full scrollbar-hide">
        {servicePillars.map((service) => (
          <a key={service.id} href={`#${service.id}`} className="hover:text-brand-primary transition-colors">{service.title}</a>
        ))}
      </nav>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 services-fade-up">
        {proofPoints.map((proof) => (
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
              <h2 className="text-4xl md:text-5xl font-light mb-5 font-heading tracking-tight">{service.title}</h2>
              <p className="text-lg text-brand-primary font-medium leading-relaxed mb-5">{service.outcome}</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{service.description}</p>
              <ul className="space-y-4 mb-10">
                {service.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate('/contact')}>Talk About This Project</Button>
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
