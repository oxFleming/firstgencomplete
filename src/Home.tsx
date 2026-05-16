import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, CheckCircle2, Globe2, Landmark, MapPin } from 'lucide-react';
import { Highlight, Button } from './components/ui';
import { useNavigate } from 'react-router-dom';
import ContactSection from './components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const authorityMetrics = [
  { value: '$549M', label: 'Total development value for FGIP Legacy Luxury Estate' },
  { value: '1,500', label: 'Planned residential units in the masterplan' },
  { value: '$285M', label: 'Phase 1 development cost' },
  { value: '3', label: 'Operating touchpoints across Chicago, Houston, and Lagos' }
];

const servicePaths = [
  {
    title: 'Build a Custom Home',
    text: 'Residential construction, architectural coordination, structural delivery, interiors, and landscaping integration for clients who want a home built around real life.',
    action: 'Start a Home Consultation',
    path: '/contact'
  },
  {
    title: 'Modernize a Property',
    text: 'Kitchen remodels, bathroom renovations, structural upgrades, interior redesign, and exterior modernization to improve comfort and long-term asset value.',
    action: 'Discuss a Renovation',
    path: '/contact'
  },
  {
    title: 'Develop Real Estate',
    text: 'Development planning, construction coordination, project management, procurement, and consulting for residential or mixed-use opportunities.',
    action: 'Explore Services',
    path: '/services'
  },
  {
    title: 'Invest or Partner',
    text: 'Cross-border development knowledge, U.S. operating credibility, and FGIP ecosystem support for investors, lenders, landowners, and strategic partners.',
    action: 'Explore Legacy Estate',
    path: '/invest'
  }
];

const structureNodes = [
  {
    title: 'First Generation Homes LLC',
    eyebrow: 'United States',
    body: 'Chicago-headquartered real estate development and construction company with residential delivery, renovation, procurement, and advisory capability.'
  },
  {
    title: 'FGIP Group',
    eyebrow: 'Nigeria',
    body: 'Development ecosystem and operating platform supporting real estate initiatives, partnerships, and local execution capacity.'
  },
  {
    title: 'FGIP Legacy Luxury Estate',
    eyebrow: 'Ogun State, Lagos Growth Corridor',
    body: 'A 1,500-unit infrastructure-led residential development planned as a self-sustaining estate ecosystem.'
  }
];

const estateMetrics = [
  'Independent power, water, roads, drainage, and security systems',
  'Phase 1 establishes core infrastructure and premium residential clusters',
  'Located in Ogun State within the Lagos growth corridor',
  'Designed for housing, commercial activity, and community infrastructure'
];

const projectCards = [
  {
    title: 'Six Bedroom Duplex',
    loc: 'FGIP Legacy Estate - Ogun State',
    tag: 'Flagship Residential',
    imgs: [
      '/images/fgip%20legacy/6%20bedroom/6-bed1.webp',
      '/images/fgip%20legacy/6%20bedroom/6-bed2.webp',
      '/images/fgip%20legacy/6%20bedroom/6-bed3.webp',
      '/images/fgip%20legacy/6%20bedroom/6-bed4.webp'
    ]
  },
  {
    title: 'Five Bedroom Duplex',
    loc: 'FGIP Legacy Estate - Ogun State',
    tag: 'Flagship Residential',
    imgs: [
      '/images/fgip%20legacy/5%20Bedroom/5-bed1.webp',
      '/images/fgip%20legacy/5%20Bedroom/5-bed2.webp'
    ]
  },
  {
    title: 'Three Bedroom Bungalow',
    loc: 'FGIP Legacy Estate - Ogun State',
    tag: 'Residential Cluster',
    imgs: [
      '/images/fgip%20legacy/3%20bedroom/3-bed1.webp',
      '/images/fgip%20legacy/3%20bedroom/3-bed2.webp'
    ]
  },
  {
    title: 'Primary School',
    loc: 'FGIP Legacy Estate - Ogun State',
    tag: 'Community Infrastructure',
    imgs: [
      '/images/fgip%20legacy/primary%20school/school1.webp',
      '/images/fgip%20legacy/primary%20school/school2.webp',
      '/images/fgip%20legacy/primary%20school/school3.webp',
      '/images/fgip%20legacy/primary%20school/school4.webp'
    ]
  }
];

const leadership = [
  { name: 'Remy Okunbena', role: 'Managing Director', img: 'remy.webp' },
  { name: 'Mathew Kalesanwo', role: 'VP, Revenue Growth & Business Development', img: 'matthew.webp' },
  { name: 'Olufolake Olumogba', role: 'Director of Project Development & Infrastructure', img: 'olufolake.webp' },
  { name: 'Arc. Sandra Airunugba', role: 'Senior Architect and Supervisory Project Manager', img: 'sandra.webp' }
];

export default function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const aboutVideoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);
  const [shouldLoadAboutVideo, setShouldLoadAboutVideo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      if (!isDesktop) return;

      document.querySelectorAll('.fade-up').forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const timeoutId = setTimeout(refresh, 1500);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const canUseVideo =
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !connection?.saveData;

    if (!canUseVideo) return;

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const loadHeroVideo = () => setShouldLoadHeroVideo(true);

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(loadHeroVideo, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(loadHeroVideo, 1400);
    }

    return () => {
      if (idleId !== undefined && idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadHeroVideo || !heroVideoRef.current) return;
    heroVideoRef.current.load();
  }, [shouldLoadHeroVideo]);

  useEffect(() => {
    const video = aboutVideoRef.current;
    if (!video) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const canUseVideo =
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !connection?.saveData;

    if (!canUseVideo) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadAboutVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadAboutVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <section className="relative min-h-[100svh] md:min-h-[760px] flex flex-col justify-center px-5 sm:px-6 pt-28 pb-24 overflow-hidden">
        <img
          src="/images/services/header.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          loading="eager"
          decoding="async"
        />
        <video
          ref={heroVideoRef}
          src={shouldLoadHeroVideo ? '/videos/hero-optimized.mp4' : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/services/header.webp"
          className={`absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-700 ${shouldLoadHeroVideo ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-black/55 z-0" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent z-0" />

        <div className="relative z-10 fade-up max-w-7xl mx-auto w-full text-white">
          <p className="text-xs sm:text-sm font-bold tracking-[0.24em] uppercase mb-5 text-white/80">Chicago-headquartered real estate development and construction</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.98] mb-7 font-heading tracking-tight max-w-5xl drop-shadow-md">
            A U.S. platform for residential construction and cross-border development.
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed drop-shadow-md">
            First Generation Homes LLC connects custom home delivery, renovation, procurement, and development advisory with the FGIP ecosystem supporting large-scale projects across the United States and Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => handleNavigate('/contact')} className="bg-white text-brand-dark rounded-full px-6 sm:px-8 py-4 font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-white/90 transition-colors cursor-pointer shadow-xl">
              Book a Project Consultation <ArrowRight className="w-5 h-5 text-brand-primary" />
            </button>
            <button onClick={() => handleNavigate('/invest')} className="bg-brand-primary text-white rounded-full px-6 sm:px-8 py-4 font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-brand-dark transition-colors cursor-pointer shadow-xl">
              Explore FGIP Legacy Estate <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-5 right-5 lg:left-12 lg:right-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-white z-10">
          {authorityMetrics.map((metric) => (
            <div key={metric.value} className="bg-white/12 border border-white/20 backdrop-blur-md px-4 py-3 rounded-xl">
              <p className="text-2xl md:text-3xl font-heading font-medium leading-none">{metric.value}</p>
              <p className="text-[10px] md:text-xs text-white/80 leading-snug mt-2">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-6 py-16 lg:py-24 bg-white/50 backdrop-blur-3xl border-b border-white/30 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">CORPORATE POSITIONING</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight font-heading tracking-tight mb-6">
              More than a builder. A <Highlight>development platform</Highlight> with U.S. credibility and international reach.
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              The strongest idea behind First Generation Homes is not just construction. It is the ability to connect U.S. residential delivery standards, supplier networks, and development knowledge with cross-border real estate opportunities.
            </p>
            <Button onClick={() => handleNavigate('/team')}>Meet the Leadership</Button>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4 fade-up">
            {[
              { icon: Landmark, title: 'U.S. Headquarters', body: '444 W Lake Street, Suite 1700, Chicago, Illinois 60606.' },
              { icon: MapPin, title: 'Operating Presence', body: 'Chicago, Houston, and Lagos touchpoints for real estate activity and partnerships.' },
              { icon: Globe2, title: 'Cross-Border Support', body: 'Development planning, procurement, finishing support, and strategic advisory across markets.' }
            ].map((item) => (
              <div key={item.title} className="bg-white/80 border border-white/60 rounded-2xl p-6 shadow-sm">
                <item.icon className="w-7 h-7 text-brand-primary mb-5" />
                <h3 className="text-xl font-heading mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20 lg:py-28 bg-white/30 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12 fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">CHOOSE YOUR PATH</p>
            <h2 className="text-4xl md:text-6xl font-light leading-tight font-heading tracking-tight mb-6">
              Clear entry points for homeowners, developers, investors, and partners.
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">Every visitor should know where they fit. The site now routes people by intent instead of asking everyone to decode the company from a generic services list.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 fade-up">
            {servicePaths.map((path) => (
              <div key={path.title} className="bg-white/80 border border-white/60 rounded-2xl p-6 shadow-sm flex flex-col min-h-[310px]">
                <h3 className="text-2xl font-heading mb-4">{path.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">{path.text}</p>
                <button onClick={() => handleNavigate(path.path)} className="text-brand-primary font-bold flex items-center gap-2 hover:text-brand-dark transition-colors text-left">
                  {path.action} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20 lg:py-28 bg-brand-dark text-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">FGIP GLOBAL CORPORATE STRUCTURE</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight font-heading tracking-tight mb-6">
              A cross-border real estate development platform.
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              First Generation Homes LLC strengthens the FGIP story by adding U.S. operating credibility, construction knowledge, supplier relationships, and development support to the Nigerian estate platform.
            </p>
            <Button onClick={() => handleNavigate('/invest')} className="border-white/60 text-white hover:bg-white hover:text-brand-dark">Investor Overview</Button>
          </div>
          <div className="lg:col-span-8 space-y-5 fade-up">
            {structureNodes.map((node, index) => (
              <div key={node.title} className="relative bg-white/8 border border-white/15 rounded-2xl p-6 md:p-7">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">0{index + 1}</div>
                  <div>
                    <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-2">{node.eyebrow}</p>
                    <h3 className="text-2xl md:text-3xl font-heading mb-3">{node.title}</h3>
                    <p className="text-white/70 leading-relaxed">{node.body}</p>
                  </div>
                </div>
                {index < structureNodes.length - 1 && <div className="hidden md:block absolute left-12 -bottom-5 w-px h-5 bg-white/25" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20 lg:py-28 bg-white/40 backdrop-blur-3xl border-y border-white/40 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">FLAGSHIP DEVELOPMENT</p>
            <h2 className="text-4xl md:text-6xl font-light leading-tight font-heading tracking-tight mb-6">
              FGIP Legacy Luxury Estate is the proof of scale.
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              A 1,500-unit, infrastructure-led residential development in Ogun State within the Lagos growth corridor, planned as a self-sustaining estate ecosystem with housing, power, water, roads, drainage, and security.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {estateMetrics.map((item) => (
                <div key={item} className="flex gap-3 text-sm text-gray-700 bg-white/70 border border-white/60 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => handleNavigate('/invest')} className="bg-brand-primary text-white border-brand-primary hover:bg-brand-dark">Explore the Investment</Button>
              <Button onClick={() => handleNavigate('/portfolio')} className="bg-white/80 border-white text-brand-dark hover:bg-white">View Portfolio</Button>
            </div>
          </div>

          <div className="lg:col-span-7 fade-up">
            <div className="grid grid-cols-2 gap-3">
              {projectCards.map((project, index) => (
                <div key={project.title} className={`${index === 0 ? 'col-span-2' : ''} bg-white rounded-2xl overflow-hidden shadow-md border border-white/60`}>
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                    <img src={project.imgs[0]} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <p className="text-brand-primary text-[10px] font-bold tracking-widest uppercase mb-2">{project.tag}</p>
                    <h3 className="font-heading text-xl mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.loc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20 lg:py-28 bg-white/30 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 fade-up">
            <div className="relative aspect-[4/3] w-full shadow-lg overflow-hidden rounded-sm bg-black">
              <img
                src="/images/mission/our-mission1.webp"
                alt="First Generation Homes project team"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <video
                ref={aboutVideoRef}
                src={shouldLoadAboutVideo ? '/videos/about-video-optimized.mp4' : undefined}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/images/mission/our-mission1.webp"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${shouldLoadAboutVideo ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">STRATEGIC IMPORTANCE</p>
            <h2 className="text-4xl md:text-6xl font-light leading-tight font-heading tracking-tight mb-6">
              The U.S. company gives the FGIP platform institutional credibility.
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              For investors and lenders, First Generation Homes LLC demonstrates that the sponsor is connected to established real estate markets, practical construction knowledge, supplier networks, and cross-border development experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Construction expertise', 'Supplier networks', 'Development knowledge transfer', 'Residential delivery capability'].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white/70 border border-white/60 rounded-xl p-4 text-gray-700 font-medium">
                  <Building2 className="w-5 h-5 text-brand-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-16 lg:py-24 bg-white/40 backdrop-blur-3xl text-center flex items-center justify-center relative z-10 border-y border-white/50">
        <div className="max-w-4xl mx-auto px-4 lg:px-0 fade-up">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-brand-primary leading-snug mb-8 font-heading tracking-tight mx-auto drop-shadow-sm">
            "We truly appreciate your commitment on this project. I wanted to acknowledge the satisfaction on our remodel. I must give a 100% satisfied mark as you not only finished the job early and under budget, but with great sub-contractors and excellent workmanship."
          </p>
          <p className="font-medium text-lg lg:text-xl text-gray-900 tracking-wide drop-shadow-sm">Raja Bilal</p>
          <p className="text-brand-primary text-sm lg:text-base font-semibold tracking-wider font-heading mt-1 drop-shadow-sm">CEO Focus with Raja</p>
        </div>
      </section>

      <section className="bg-transparent pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden w-full relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-10 fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-3">LEADERSHIP</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-brand-dark font-heading">Leadership behind the <Highlight>platform</Highlight></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 fade-up">
            {leadership.map((exec) => (
              <div key={exec.name} className="aspect-[4/5] relative group rounded-xl overflow-hidden shadow-lg border border-brand-primary/10 bg-gray-100">
                <img
                  src={`/images/team-images/${exec.img}`}
                  alt={exec.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                  loading="lazy"
                  width="300"
                  height="375"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                  <h3 className="text-lg font-heading mb-1">{exec.name}</h3>
                  <p className="text-brand-primary tracking-widest uppercase text-[9px] font-bold leading-tight line-clamp-2">{exec.role}</p>
                </div>
              </div>
            ))}
            <div className="aspect-[4/5] flex items-center justify-center bg-brand-gray rounded-xl p-6 shadow-md">
              <div className="text-center">
                <h3 className="text-lg font-heading mb-4 text-brand-dark">The team behind delivery, development, and partnerships.</h3>
                <Button onClick={() => handleNavigate('/team')}>View Full Team</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
