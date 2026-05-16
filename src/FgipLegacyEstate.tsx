import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, CheckCircle2, Droplets, Leaf, ShieldCheck, SunMedium, UsersRound, Zap } from 'lucide-react';
import ContactSection from './components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: '1,500', label: 'planned residential units' },
  { value: '$549M', label: 'total development value' },
  { value: '$285M', label: 'phase 1 development cost' },
  { value: '160', label: 'approximate acres planned' }
];

const infrastructure = [
  { icon: Zap, title: 'Independent Power', text: 'Dedicated power planning designed to reduce service interruptions and support estate-scale reliability.' },
  { icon: Droplets, title: 'Water Systems', text: 'Integrated water supply and distribution planning for residential and community operations.' },
  { icon: Building2, title: 'Roads & Drainage', text: 'Internal road networks, drainage, and civil works structured around phased residential delivery.' },
  { icon: ShieldCheck, title: 'Security Systems', text: 'Controlled estate access and security planning to support a premium residential environment.' }
];

const residentialProducts = [
  { title: '6-Bedroom Duplex', image: '/images/fgip%20legacy/6%20bedroom/6-bed1.webp' },
  { title: '5-Bedroom Duplex', image: '/images/fgip%20legacy/5%20Bedroom/5-bed1.webp' },
  { title: '4-Bedroom Duplex', image: '/images/fgip%20legacy/4%20bedroom/4-bed1.webp' },
  { title: '3-Bedroom Bungalow', image: '/images/fgip%20legacy/3%20bedroom/3-bed1.webp' }
];

const amenities = [
  'Primary school and daycare facilities',
  'Business center and commercial support services',
  'Hospitality and social gathering spaces',
  'Residential clusters planned around daily convenience',
  'Estate systems for access, utilities, and long-term operations'
];

const investmentPoints = [
  'Large-scale residential demand in the Lagos-Ogun growth corridor',
  'Infrastructure-first planning designed to support phased absorption',
  'Cross-border development support through First Generation Homes LLC',
  'Residential, commercial, and community uses planned as one ecosystem'
];

export default function FgipLegacyEstate() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.fgip-fade-up').forEach((el) => {
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

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <section className="relative min-h-[92svh] flex items-end px-5 sm:px-8 lg:px-12 pt-32 pb-10 overflow-hidden bg-brand-dark text-white">
        <img
          src="/images/fgip%20legacy/hotel/hotel1.webp"
          alt="FGIP Legacy Luxury Estate hospitality rendering"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-55"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20 z-0" />
        <div className="relative z-10 w-full max-w-[92rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 fgip-fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-[0.28em] uppercase mb-5">FGIP Legacy Luxury Estate</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium leading-[0.95] tracking-tight mb-7 max-w-5xl">
              A 1,500-unit infrastructure-led residential ecosystem.
            </h1>
            <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-3xl mb-8">
              Planned in Ogun State within the Lagos growth corridor, FGIP Legacy Luxury Estate brings premium housing, independent infrastructure, community amenities, and long-term development value into one integrated masterplan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-white text-brand-dark rounded-full px-7 py-4 font-bold hover:bg-white/90 transition-colors">
                Schedule a Consultation <ArrowRight className="w-5 h-5 text-brand-primary" />
              </Link>
              <Link to="/invest" className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white rounded-full px-7 py-4 font-bold hover:bg-white hover:text-brand-dark transition-colors">
                Investment Opportunities <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 fgip-fade-up">
            {metrics.map((metric) => (
              <div key={metric.value} className="bg-white/12 border border-white/20 backdrop-blur-md rounded-xl p-4 min-h-[110px] flex flex-col justify-between">
                <p className="text-3xl md:text-4xl font-heading font-medium">{metric.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/70 leading-snug">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white/50 backdrop-blur-3xl border-b border-white/40">
        <div className="max-w-[92rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 fgip-fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Project Vision</p>
            <h2 className="text-4xl md:text-6xl font-heading font-light leading-tight tracking-tight mb-6">
              Luxury living anchored by infrastructure and community impact.
            </h2>
          </div>
          <div className="lg:col-span-7 fgip-fade-up">
            <p className="text-xl text-gray-800 leading-relaxed mb-6">
              FGIP Legacy Luxury Estate is designed as a self-sustaining residential ecosystem, not a conventional housing subdivision. Phase 1 establishes the infrastructure backbone and premium residential clusters that support the long-term 1,500-unit masterplan.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              The development connects modern housing demand with estate-scale planning: power, water, roads, drainage, security, education, commercial support, and residential product diversity. The goal is to create a premium community that can serve homeowners, families, investors, and regional economic growth.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 bg-brand-dark text-white">
        <div className="max-w-[92rem] mx-auto">
          <div className="max-w-3xl mb-12 fgip-fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Infrastructure First</p>
            <h2 className="text-4xl md:text-6xl font-heading font-light leading-tight tracking-tight mb-6">
              The systems behind a scalable estate.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              The estate strategy starts with the backbone that makes long-term residential value possible: utilities, civil works, access, security, and operational planning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {infrastructure.map((item) => (
              <div key={item.title} className="fgip-fade-up bg-white/8 border border-white/15 rounded-2xl p-6 min-h-[280px]">
                <item.icon className="w-8 h-8 text-brand-primary mb-6" />
                <h3 className="text-2xl font-heading mb-4">{item.title}</h3>
                <p className="text-white/68 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white/40 backdrop-blur-3xl">
        <div className="max-w-[92rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 fgip-fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Residential Masterplan</p>
            <h2 className="text-4xl md:text-5xl font-heading font-light leading-tight tracking-tight mb-6">
              Premium homes for a complete estate environment.
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              The residential mix supports multiple household needs while keeping the estate positioned as a premium, long-term community.
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-3 text-brand-primary font-bold hover:text-brand-dark transition-colors">
              View project gallery <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {residentialProducts.map((product) => (
              <div key={product.title} className="fgip-fade-up bg-white border border-white/60 rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="text-brand-primary text-[10px] font-bold tracking-widest uppercase mb-2">Residential Product</p>
                  <h3 className="text-2xl font-heading">{product.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white/60 backdrop-blur-3xl border-y border-white/40">
        <div className="max-w-[92rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fgip-fade-up grid grid-cols-2 gap-3">
            <img src="/images/fgip%20legacy/primary%20school/school1.webp" alt="FGIP Legacy Estate school rendering" className="aspect-square object-cover rounded-xl shadow-sm" loading="lazy" />
            <img src="/images/fgip%20legacy/daycare/daycare1.webp" alt="FGIP Legacy Estate daycare rendering" className="aspect-square object-cover rounded-xl shadow-sm mt-10" loading="lazy" />
            <img src="/images/fgip%20legacy/Business%20Center/business1.webp" alt="FGIP Legacy Estate business center rendering" className="aspect-square object-cover rounded-xl shadow-sm -mt-10" loading="lazy" />
            <img src="/images/fgip%20legacy/hotel/hotel2.webp" alt="FGIP Legacy Estate hospitality rendering" className="aspect-square object-cover rounded-xl shadow-sm" loading="lazy" />
          </div>
          <div className="fgip-fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Amenities & Community</p>
            <h2 className="text-4xl md:text-6xl font-heading font-light leading-tight tracking-tight mb-6">
              A residential estate planned around everyday life.
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              FGIP Legacy Estate is positioned as a complete living environment, with community infrastructure that supports education, work, hospitality, and social connection.
            </p>
            <div className="space-y-4">
              {amenities.map((item) => (
                <div key={item} className="flex gap-3 text-gray-700 bg-white/70 border border-white/60 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white/30 backdrop-blur-xl">
        <div className="max-w-[92rem] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="fgip-fade-up bg-white/70 border border-white/60 rounded-2xl p-8 lg:p-10">
            <Leaf className="w-8 h-8 text-brand-primary mb-6" />
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">Sustainability</p>
            <h3 className="text-3xl font-heading mb-5">Resilient systems for long-term living.</h3>
            <p className="text-gray-700 leading-relaxed">Planning around utilities, drainage, density, and community infrastructure creates a more resilient residential environment than plot-by-plot development.</p>
          </div>
          <div className="fgip-fade-up bg-white/70 border border-white/60 rounded-2xl p-8 lg:p-10">
            <UsersRound className="w-8 h-8 text-brand-primary mb-6" />
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">Community Impact</p>
            <h3 className="text-3xl font-heading mb-5">Housing, jobs, services, and economic activity.</h3>
            <p className="text-gray-700 leading-relaxed">The estate is designed to support residential growth while creating demand for services, construction labor, operations, education, hospitality, and commercial activity.</p>
          </div>
          <div className="fgip-fade-up bg-white/70 border border-white/60 rounded-2xl p-8 lg:p-10">
            <SunMedium className="w-8 h-8 text-brand-primary mb-6" />
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">Luxury Positioning</p>
            <h3 className="text-3xl font-heading mb-5">Premium homes with estate-scale discipline.</h3>
            <p className="text-gray-700 leading-relaxed">The luxury story is not only finishes. It is controlled planning, reliable infrastructure, security, amenities, and an environment built for enduring value.</p>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 bg-brand-dark text-white">
        <div className="max-w-[92rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 fgip-fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Investment Narrative</p>
            <h2 className="text-4xl md:text-6xl font-heading font-light leading-tight tracking-tight mb-6">
              A platform opportunity in a high-growth corridor.
            </h2>
            <p className="text-white/72 text-lg leading-relaxed">
              First Generation Homes LLC supports the FGIP ecosystem with U.S. operating credibility, construction knowledge, procurement experience, and cross-border development insight.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 fgip-fade-up">
            {investmentPoints.map((point, index) => (
              <div key={point} className="bg-white/8 border border-white/15 rounded-xl p-6 min-h-[150px]">
                <p className="text-brand-primary font-heading text-3xl mb-5">0{index + 1}</p>
                <p className="text-white/78 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-24 bg-white/50 backdrop-blur-3xl">
        <div className="max-w-5xl mx-auto text-center fgip-fade-up">
          <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Next Step</p>
          <h2 className="text-4xl md:text-6xl font-heading font-light leading-tight tracking-tight mb-6">
            Explore the estate, the partnership model, or the investment opportunity.
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            Whether you are evaluating the development as an investor, partner, lender, buyer, or strategic collaborator, the right next step is a direct conversation with the team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white rounded-full px-8 py-4 font-bold hover:bg-brand-dark transition-colors">
              Contact Our Team <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/invest" className="inline-flex items-center justify-center gap-3 bg-white text-brand-dark border border-white rounded-full px-8 py-4 font-bold hover:bg-brand-dark hover:text-white transition-colors">
              Partner With Us <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
