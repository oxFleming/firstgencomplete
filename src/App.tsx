import React, { useEffect, useLayoutEffect, useState, lazy, Suspense, useCallback } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';

const Home = lazy(() => import('./Home'));
const Services = lazy(() => import('./Services'));
const Portfolio = lazy(() => import('./Portfolio'));
const Team = lazy(() => import('./Team'));
const FAQ = lazy(() => import('./FAQ'));
const Invest = lazy(() => import('./Invest'));
const Contact = lazy(() => import('./Contact'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white/30 backdrop-blur-3xl">
    <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
  </div>
);

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Team', path: '/team' },
  { label: 'Invest', path: '/invest' },
  { label: 'Contact', path: '/contact' }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const headerSolid = isScrolled || !isHome;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const imageFallbacks = ['.jpg', '.png', '.jpeg'];
    const optimizeImage = (image: HTMLImageElement) => {
      if (image.dataset.optimizedSrc || !image.src) return;

      const url = new URL(image.src, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith('/images/')) return;
      if (!/\.(jpg|jpeg|png)$/i.test(url.pathname)) return;

      image.dataset.originalSrc = image.src;
      image.dataset.optimizedSrc = 'true';
      image.src = `${url.pathname.replace(/\.(jpg|jpeg|png)$/i, '.webp')}${url.search}`;
    };

    const optimizeVideo = (video: HTMLVideoElement) => {
      if (video.dataset.optimizedSrc) return;

      const currentSrc = video.currentSrc || video.src;
      const fallbackSrc = currentSrc.includes('/videos/Hero-video.mp4') || currentSrc.includes('/videos/hero.mp4')
        ? '/videos/hero-optimized.mp4'
        : currentSrc.includes('/videos/about-video.mp4')
          ? '/videos/about-video-optimized.mp4'
          : '';

      if (fallbackSrc) {
        video.dataset.originalSrc = currentSrc;
        video.dataset.optimizedSrc = 'true';
        video.src = fallbackSrc;
        video.load();
      }

      const poster = video.getAttribute('poster');
      if (poster && /\.(jpg|jpeg|png)$/i.test(poster)) {
        video.setAttribute('poster', poster.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      }
    };

    const optimizeMedia = (root: ParentNode = document) => {
      root.querySelectorAll('img').forEach(optimizeImage);
      root.querySelectorAll('video').forEach(optimizeVideo);
    };

    const handleMediaError = (event: Event) => {
      const target = event.target;

      if (target instanceof HTMLImageElement) {
        const currentSrc = target.currentSrc || target.src;
        if (!currentSrc.includes('.webp')) return;

        const attempt = Number(target.dataset.fallbackAttempt || '0');
        if (attempt >= imageFallbacks.length) return;

        target.dataset.fallbackAttempt = String(attempt + 1);
        const originalSrc = target.dataset.originalSrc;
        if (attempt === 0 && originalSrc) {
          target.src = originalSrc;
          return;
        }

        target.src = currentSrc.replace(/\.webp(\?.*)?$/i, `${imageFallbacks[attempt]}$1`);
      }

      if (target instanceof HTMLVideoElement) {
        const currentSrc = target.currentSrc || target.src;
        if (target.dataset.fallbackAttempt) return;

        const fallbackSrc = target.dataset.originalSrc || (currentSrc.includes('/videos/hero-optimized.mp4')
          ? '/videos/Hero-video.mp4'
          : currentSrc.includes('/videos/about-video-optimized.mp4')
            ? '/videos/about-video.mp4'
            : '');

        if (fallbackSrc) {
          target.dataset.fallbackAttempt = '1';
          target.src = fallbackSrc;
          target.load();
        }
      }
    };

    optimizeMedia();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (mutation.target instanceof HTMLImageElement) optimizeImage(mutation.target);
          if (mutation.target instanceof HTMLVideoElement) optimizeVideo(mutation.target);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLImageElement) optimizeImage(node);
          if (node instanceof HTMLVideoElement) optimizeVideo(node);
          if (node instanceof HTMLElement) optimizeMedia(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'poster'] });
    document.addEventListener('error', handleMediaError, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('error', handleMediaError, true);
    };
  }, []);

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    if (location.pathname === path) window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-transparent font-sans selection:bg-brand-primary selection:text-white relative">
      <Preloader onComplete={handlePreloaderComplete} />

      <div className="bg-mesh fixed inset-0 z-[-1]">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      <div className={`transition-all duration-700 ease-out flex flex-col min-h-screen w-full max-w-full overflow-x-clip ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerSolid ? 'bg-white/70 backdrop-blur-2xl shadow-sm border-b border-white/50' : 'bg-transparent'}`}>
          <div className="w-full max-w-[92rem] mx-auto flex justify-between items-center px-5 sm:px-8 lg:px-12 py-4 lg:py-5">
            <Link to="/" onClick={() => handleNavClick('/')} className={`flex flex-col items-start leading-none font-heading select-none cursor-pointer transition-colors duration-300 ${headerSolid ? 'text-brand-dark' : 'text-white'}`}>
              <span className="text-base md:text-lg font-light tracking-[0.15em] uppercase">First</span>
              <span className={`text-lg md:text-xl font-bold tracking-tight uppercase transition-colors duration-300 ${headerSolid ? 'text-brand-primary' : 'text-white'}`}>Generation</span>
              <span className={`text-[0.5rem] md:text-[0.55rem] font-medium tracking-[0.5em] uppercase mt-1 transition-colors duration-300 ${headerSolid ? 'text-gray-500' : 'text-white/80'}`}>Homes</span>
            </Link>

            <div className="hidden lg:flex items-center gap-10 xl:gap-12 text-sm font-medium tracking-widest uppercase">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => handleNavClick(link.path)} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>{link.label}</Link>
              ))}
            </div>

            <button onClick={() => setIsMenuOpen(true)} className={`lg:hidden p-2 transition-colors duration-300 ${headerSolid ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-white/80'}`} aria-label="Open navigation menu">
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </header>

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/team" element={<Team />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>

        <footer className="w-full bg-white/45 backdrop-blur-3xl border-t border-white/50 text-brand-dark font-sans relative z-10 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 py-12 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="flex flex-col items-start leading-none font-heading select-none text-brand-dark mb-6">
                  <span className="text-base font-light tracking-[0.15em] uppercase">First</span>
                  <span className="text-xl font-bold tracking-tight uppercase text-brand-primary">Generation</span>
                  <span className="text-[0.55rem] font-medium tracking-[0.5em] uppercase text-gray-500 mt-1">Homes</span>
                </div>
                <p className="text-gray-700 leading-relaxed max-w-sm mb-6">
                  Chicago-headquartered real estate development and construction company supporting residential delivery, renovation, procurement, and cross-border development initiatives.
                </p>
                <div className="flex flex-col gap-1 text-sm text-gray-700">
                  <p>Direct Line: +1 630 326 5117</p>
                  <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-brand-primary font-medium hover:underline">matthew.kalesanwo@fgipgroup.net</a>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <h4 className="text-gray-900 font-medium text-base mb-1">Explore</h4>
                  {navLinks.map((link) => (
                    <Link key={link.path} to={link.path} onClick={() => handleNavClick(link.path)} className="hover:text-brand-primary transition-colors">{link.label}</Link>
                  ))}
                  <Link to="/faq" onClick={() => handleNavClick('/faq')} className="hover:text-brand-primary transition-colors">FAQ</Link>
                </div>

                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <h4 className="text-gray-900 font-medium text-base mb-1">Capabilities</h4>
                  <Link to="/services" onClick={() => handleNavClick('/services')} className="hover:text-brand-primary transition-colors">Custom Homes</Link>
                  <Link to="/services" onClick={() => handleNavClick('/services')} className="hover:text-brand-primary transition-colors">Renovation & Modernization</Link>
                  <Link to="/services" onClick={() => handleNavClick('/services')} className="hover:text-brand-primary transition-colors">Development Support</Link>
                  <Link to="/services" onClick={() => handleNavClick('/services')} className="hover:text-brand-primary transition-colors">Finishing & Procurement</Link>
                </div>

                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <h4 className="text-gray-900 font-medium text-base mb-1">Locations</h4>
                  <p>Chicago, IL<br />444 W Lake Street, Suite 1700</p>
                  <p>Houston, TX<br />United States</p>
                  <p>Lagos, NG<br />Lekki & Ikeja Offices</p>
                </div>

                <div className="flex flex-col gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="text-gray-900 font-medium text-base mb-3">Social</h4>
                    <div className="flex flex-col gap-2">
                      <a href="https://www.linkedin.com/company/first-generation-homes-llc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
                      <a href="https://www.instagram.com/firstgenerationhomesllc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Instagram</a>
                    </div>
                  </div>
                  <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full font-medium hover:bg-[#20bd5a] transition-colors shadow-sm">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-3 text-xs text-gray-500 pt-6 mt-8 border-t border-gray-300 text-center lg:text-left">
              <p>Copyright &copy; 2026 First Generation Homes LLC. All rights reserved.</p>
              <p>Powered by FGIP</p>
            </div>
          </div>
        </footer>

        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-[60] flex flex-col overflow-x-hidden">
            <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col items-start leading-none font-heading select-none text-brand-dark">
                <span className="text-lg md:text-xl font-light tracking-[0.15em] uppercase">First</span>
                <span className="text-xl md:text-2xl font-bold tracking-tight uppercase text-brand-primary">Generation</span>
                <span className="text-[0.55rem] md:text-[0.60rem] font-medium tracking-[0.5em] uppercase text-gray-500 mt-1">Homes</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-brand-dark hover:text-brand-primary transition-colors" aria-label="Close navigation menu">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-7 text-3xl font-heading font-light text-center px-6">
              {[...navLinks, { label: 'FAQ', path: '/faq' }].map((link) => (
                <Link key={link.path} to={link.path} onClick={() => handleNavClick(link.path)} className="hover:text-brand-primary transition-colors max-w-full leading-tight">{link.label}</Link>
              ))}
            </div>
          </div>
        )}

        <a
          href="https://wa.me/2347037412354"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[200] bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
}

export default App;
