import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Globe2, Landmark, MapPin } from 'lucide-react';
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
    text: 'Ground-up residential construction with architectural coordination, finish planning, site discipline, and one accountable delivery conversation.',
    action: 'Start a Home Consultation',
    path: '/contact',
    image: '/images/luxury-stock/airy-custom-home.webp',
    stat: 'Custom estates'
  },
  {
    title: 'Modernize a Property',
    text: 'Kitchen, bath, structural, and whole-property modernization for owners who want comfort, resale strength, and a sharper daily experience.',
    action: 'Discuss a Renovation',
    path: '/contact',
    image: '/images/luxury-stock/spa-bath-suite.webp',
    stat: 'Premium remodels'
  },
  {
    title: 'Develop Real Estate',
    text: 'Planning, project controls, construction coordination, and procurement support for residential and mixed-use work that needs commercial discipline.',
    action: 'Explore Services',
    path: '/services',
    image: '/images/luxury-stock/materials-gallery.webp',
    stat: 'Delivery systems'
  },
  {
    title: 'Invest or Partner',
    text: 'A cross-border platform with U.S. credibility and FGIP estate-scale proof for investors, lenders, landowners, and strategic partners.',
    action: 'Explore Legacy Estate',
    path: '/fgip-legacy-estate',
    image: '/images/fgip%20legacy/6%20bedroom/6-bed1.webp',
    stat: '$549M masterplan'
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
    title: 'Four Bedroom Duplex',
    loc: 'FGIP Legacy Estate - Ogun State',
    tag: 'Flagship Residential',
    imgs: [
      '/images/fgip%20legacy/4%20bedroom/4-bed1.webp',
      '/images/fgip%20legacy/4%20bedroom/4-bed2.webp',
      '/images/fgip%20legacy/4%20bedroom/4-bed3.webp'
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
  const heroSectionRef = useRef<HTMLElement>(null);
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);
  const [shouldLoadAboutVideo, setShouldLoadAboutVideo] = useState(false);
  const [heroRevealStyle, setHeroRevealStyle] = useState<React.CSSProperties>({
    '--reveal-x': '72%',
    '--reveal-y': '38%',
    '--reveal-opacity': '0.72'
  } as React.CSSProperties);
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

  const handleHeroPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!heroSectionRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = heroSectionRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setHeroRevealStyle({
      '--reveal-x': `${x}%`,
      '--reveal-y': `${y}%`,
      '--reveal-opacity': '0.92'
    } as React.CSSProperties);
  };

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <section
        ref={heroSectionRef}
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={() => setHeroRevealStyle((style) => ({ ...style, '--reveal-opacity': '0.62' } as React.CSSProperties))}
        className="relative min-h-[100svh] flex flex-col justify-between px-5 sm:px-8 lg:px-12 pt-28 md:pt-32 pb-6 sm:pb-8 lg:pb-10 overflow-hidden"
        style={heroRevealStyle}
      >
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
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-0" />
        <div className="hero-liquid-reveal absolute inset-0 z-[1] pointer-events-none" aria-hidden="true" />
        <div className="hero-glitter-field absolute inset-0 z-[2] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 fade-up w-full max-w-[92rem] mx-auto text-white mt-auto pb-8 md:pb-10 lg:pb-12">
          <p className="text-xs sm:text-sm font-bold tracking-[0.24em] uppercase mb-5 text-white/80">Luxury homes. Estate-scale development.</p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.95] mb-7 font-heading tracking-tight max-w-4xl drop-shadow-md">
            We build for people who expect more.
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
            Custom residences, high-value renovations, and a $549M estate platform delivered with design discipline, procurement control, and development strength.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-3xl">
            <button onClick={() => handleNavigate('/contact')} className="bg-white text-brand-dark rounded-full px-6 sm:px-8 py-4 font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-white/90 transition-colors cursor-pointer shadow-xl">
              Book a Project Consultation <ArrowRight className="w-5 h-5 text-brand-primary" />
            </button>
            <button onClick={() => handleNavigate('/invest')} className="bg-brand-primary text-white rounded-full px-6 sm:px-8 py-4 font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-brand-dark transition-colors cursor-pointer shadow-xl">
              Explore FGIP Legacy Estate <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[92rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 text-white shrink-0">
          {authorityMetrics.map((metric) => (
            <div key={metric.value} className="bg-white/12 border border-white/20 backdrop-blur-md px-4 py-3 rounded-xl min-h-[72px]">
              <p className="text-2xl md:text-3xl font-heading font-medium leading-none">{metric.value}</p>
              <p className="text-[10px] md:text-xs text-white/80 leading-snug mt-2">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-6 py-16 lg:py-24 bg-[#151515] text-white border-b border-white/10 relative z-10 overflow-hidden">
        <img src="/images/luxury-stock/materials-wall.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-18" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/92 to-[#151515]/70" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 fade-up relative z-10">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">CORPORATE POSITIONING</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight font-heading tracking-tight mb-6">
              More than a contractor. A <Highlight>luxury development partner</Highlight> with U.S. credibility.
            </h2>
            <p className="text-white/72 leading-relaxed mb-8">
              First Generation Homes combines construction delivery, high-end renovation experience, finish procurement, and development advisory under one operating platform.
            </p>
            <Button onClick={() => handleNavigate('/team')} className="border-white/60 text-white hover:bg-white hover:text-brand-dark">Meet the Leadership</Button>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4 fade-up relative z-10">
            {[
              { icon: Landmark, title: 'U.S. Headquarters', body: '444 W Lake Street, Suite 1700, Chicago, Illinois 60606.' },
              { icon: MapPin, title: 'Operating Presence', body: 'Chicago, Houston, and Lagos touchpoints for real estate activity and partnerships.' },
              { icon: Globe2, title: 'Cross-Border Support', body: 'Development planning, procurement, finishing support, and strategic advisory across markets.' }
            ].map((item) => (
              <div key={item.title} className="bg-white/9 border border-white/15 rounded-2xl p-6 shadow-sm backdrop-blur-md">
                <item.icon className="w-7 h-7 text-brand-primary mb-5" />
                <h3 className="text-xl font-heading mb-3">{item.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20 lg:py-32 bg-[#111111] text-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(157,132,183,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_36%)]" aria-hidden="true" />
        <div className="max-w-[92rem] mx-auto relative">
          <div className="max-w-3xl mb-12 fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">CHOOSE YOUR PATH</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight font-heading tracking-tight mb-6">
              Find your path into a higher-value property.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">Four entry points, one standard: premium decisions, stronger execution, and assets designed to hold attention.</p>
          </div>

          <div className="luxury-path-grid fade-up">
            {servicePaths.map((path, index) => (
              <div key={path.title} className={`luxury-path-card luxury-path-card-${index + 1}`}>
                <img src={path.image} alt="" className="luxury-path-image" loading="lazy" />
                <div className="luxury-path-overlay" />
                <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70 mb-4">{path.stat}</p>
                    <h3 className="text-2xl md:text-3xl font-heading mb-4">{path.title}</h3>
                    <p className="text-white/76 leading-relaxed max-w-sm">{path.text}</p>
                  </div>
                  <button onClick={() => handleNavigate(path.path)} className="mt-8 text-white font-bold flex items-center gap-2 hover:text-brand-primary transition-colors text-left">
                    {path.action} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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

      <section className="px-5 sm:px-6 py-20 lg:py-28 bg-[#f4f0e8] border-y border-white/40 relative z-10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 opacity-20 lg:opacity-100">
          <img src="/images/luxury-stock/grand-foyer.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-[#f4f0e8]" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 fade-up relative z-10 lg:bg-white/86 lg:backdrop-blur-md lg:p-8 lg:border lg:border-white/70">
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

          <div className="lg:col-span-7 fade-up relative z-10">
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

      <section className="px-5 sm:px-6 py-20 lg:py-28 bg-brand-dark text-center flex items-center justify-center relative z-10 border-y border-white/10 overflow-hidden">
        <img src="/images/luxury-stock/signature-lounge.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" loading="lazy" />
        <div className="absolute inset-0 bg-black/62" />
        <div className="max-w-4xl mx-auto px-4 lg:px-0 fade-up relative z-10">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-snug mb-8 font-heading tracking-tight mx-auto drop-shadow-sm">
            "We truly appreciate your commitment on this project. I wanted to acknowledge the satisfaction on our remodel. I must give a 100% satisfied mark as you not only finished the job early and under budget, but with great sub-contractors and excellent workmanship."
          </p>
          <p className="font-medium text-lg lg:text-xl text-white tracking-wide drop-shadow-sm">Raja Bilal</p>
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
