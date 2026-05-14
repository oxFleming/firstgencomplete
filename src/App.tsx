import React, { useEffect, useLayoutEffect, useState, lazy, Suspense, useCallback } from 'react';
import { Menu, ArrowRight, X, MessageCircle } from 'lucide-react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Preloader from './components/Preloader';
import ContactSection from './components/ContactSection';

// Lazy load components for performance
const Home = lazy(() => import('./Home'));
const Services = lazy(() => import('./Services'));
const Portfolio = lazy(() => import('./Portfolio'));
const Team = lazy(() => import('./Team'));
const FAQ = lazy(() => import('./FAQ'));
const Invest = lazy(() => import('./Invest'));
const Contact = lazy(() => import('./Contact'));

// Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white/30 backdrop-blur-3xl">
    <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Scroll to top on route change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const headerSolid = isScrolled || !isHome;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Refresh ScrollTrigger after the transition and initial load are complete
      // to ensure all heights and pin positions are calculated correctly
      const timer = setTimeout(() => {
        import('gsap').then(({ gsap }) => {
          import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.refresh();
          });
        });
      }, 1100); // 1s for transition + 100ms cushion
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    if (location.pathname === path) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-brand-primary selection:text-white relative">
      
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Global Colorful Mesh Background */}
      <div className="bg-mesh fixed inset-0 z-[-1]">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      <div className={`transition-all duration-700 ease-out flex flex-col min-h-screen ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerSolid ? 'bg-white/70 backdrop-blur-2xl shadow-sm border-b border-white/50' : 'bg-transparent'}`}>
          <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6 py-4 lg:py-5 lg:px-12">
            <Link to="/" onClick={() => handleNavClick('/')} className={`flex flex-col items-start leading-none font-heading select-none cursor-pointer transition-colors duration-300 ${headerSolid ? 'text-brand-dark' : 'text-white'}`}>
              <span className="text-base md:text-lg font-light tracking-[0.15em] uppercase">First</span>
              <span className={`text-lg md:text-xl font-bold tracking-tight uppercase transition-colors duration-300 ${headerSolid ? 'text-brand-primary' : 'text-white'}`}>Generation</span>
              <span className={`text-[0.5rem] md:text-[0.55rem] font-medium tracking-[0.5em] uppercase mt-1 transition-colors duration-300 ${headerSolid ? 'text-gray-500' : 'text-white/80'}`}>Homes</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-12 text-sm font-medium tracking-widest uppercase">
              <Link to="/" onClick={() => handleNavClick('/')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Home</Link>
              <Link to="/services" onClick={() => handleNavClick('/services')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Services</Link>
              <Link to="/portfolio" onClick={() => handleNavClick('/portfolio')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Portfolio</Link>
              <Link to="/team" onClick={() => handleNavClick('/team')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Team</Link>
              <Link to="/invest" onClick={() => handleNavClick('/invest')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Invest</Link>
              <Link to="/contact" onClick={() => handleNavClick('/contact')} className={`hover:text-brand-primary transition-colors ${headerSolid ? 'text-brand-dark' : 'text-white/90'}`}>Contact</Link>
            </div>

            <button onClick={() => setIsMenuOpen(true)} className={`lg:hidden p-2 transition-colors duration-300 ${headerSolid ? 'text-brand-dark hover:text-brand-primary' : 'text-white hover:text-white/80'}`}>
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
          </Routes>
        </Suspense>

        {/* Global Contact Section (Visible on scroll) */}
        {location.pathname !== '/contact' && <ContactSection />}

        {/* Footer */}
        <footer className="w-full bg-white/40 backdrop-blur-3xl border-t border-white/50 text-brand-dark font-sans flex flex-col pt-10 lg:pt-20 pb-3 md:pb-5 relative z-10 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full flex-1 flex flex-col justify-between h-full">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 flex-1 min-h-0">
               {/* Left Column: Sketch & Contact */}
               <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-8 min-h-0 pb-2 mb-4 lg:mb-0">
                 
                 {/* Sketch Image */}
                 <div className="w-[calc(100%+3rem)] -mx-6 lg:mx-0 lg:w-full relative opacity-80 mix-blend-multiply contrast-125 flex-1 min-h-[220px] max-h-[260px] lg:max-h-[320px] shrink-0 mb-6 lg:mb-8 -mt-10 lg:mt-3 lg:bg-transparent">
                   <img src="/images/mission/our-mission2.jpg" alt="Architectural Sketch" className="absolute inset-0 w-full h-full object-cover lg:object-contain lg:object-left object-center grayscale" loading="lazy" />
                 </div>

                 {/* Regional Contacts */}
                 <div className="flex flex-col gap-1 text-[13px] md:text-[14px] font-light text-gray-800 shrink-0 text-center lg:text-left mt-4 lg:mt-0">
                   <p>Direct Line: <span className="text-gray-600">+1 630 326 5117</span></p>
                   <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="text-brand-primary font-medium hover:underline mt-0.5 text-[13px] xl:text-[14px]">matthew.kalesanwo@fgipgroup.net</a>
                 </div>
               </div>

               {/* Right Column: Links & Locations */}
               <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-12 xl:pl-16 min-h-0 pb-2">
                  
                  {/* 3 Columns of Links */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 lg:mb-4 pt-4 lg:pt-0 shrink-0">
                    <div className="flex flex-col gap-2 lg:gap-1.5 text-[13px] lg:text-[14px] text-gray-600 font-light">
                      <Link to="/portfolio" state={{ category: "All" }} onClick={() => handleNavClick('/portfolio')} className="hover:text-brand-primary transition-colors text-gray-800 font-medium pb-1 md:pb-0.5 text-[15px]">Portfolio</Link>
                      <Link to="/portfolio" state={{ category: "Custom Homes" }} onClick={() => handleNavClick('/portfolio')} className="hover:text-brand-primary transition-colors truncate" title="Custom Homes">Custom Homes</Link>
                      <Link to="/portfolio" state={{ category: "Luxury Estates" }} onClick={() => handleNavClick('/portfolio')} className="hover:text-brand-primary transition-colors truncate" title="Luxury Estates">Luxury Estates</Link>
                      <Link to="/portfolio" state={{ category: "Renovations & Custom Interiors" }} onClick={() => handleNavClick('/portfolio')} className="hover:text-brand-primary transition-colors truncate" title="Renovations & Custom Interiors">Renovations &amp; Custom Interiors</Link>
                      <Link to="/portfolio" state={{ category: "International & Investment Projects" }} onClick={() => handleNavClick('/portfolio')} className="hover:text-brand-primary transition-colors pr-2" title="International & Investment Projects">International &amp; Investment Projects</Link>
                    </div>
                    <div className="flex flex-col gap-2 lg:gap-1.5 text-[13px] lg:text-[14px] text-gray-600 font-light">
                      <Link to="/team" onClick={() => handleNavClick('/team')} className="hover:text-brand-primary transition-colors text-gray-800 font-medium pb-1 md:pb-0.5 text-[15px]">About</Link>
                      <Link to="/services" onClick={() => handleNavClick('/services')} className="hover:text-brand-primary transition-colors">Services</Link>
                      <Link to="/invest" onClick={() => handleNavClick('/invest')} className="hover:text-brand-primary transition-colors">Invest in FGIP Legacy Estate</Link>
                      <Link to="/team" onClick={() => handleNavClick('/team')} className="hover:text-brand-primary transition-colors">Team</Link>
                      <Link to="/faq" onClick={() => handleNavClick('/faq')} className="hover:text-brand-primary transition-colors">FAQ</Link>
                      <Link to="/contact" onClick={() => handleNavClick('/contact')} className="hover:text-brand-primary transition-colors">Contact</Link>
                    </div>
                    <div className="flex flex-col gap-2 lg:gap-1.5 text-[13px] lg:text-[14px] text-gray-600 font-light pr-4 col-span-2 md:col-span-1 mt-2 md:mt-0">
                      <p className="text-transparent hidden md:block select-none pointer-events-none mb-0 leading-none pb-0.5 text-[15px]">Social</p>
                      <a href="#" className="hover:text-brand-primary transition-colors text-gray-800">Facebook</a>
                      <a href="https://www.linkedin.com/company/first-generation-homes-llc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
                      <a href="https://www.instagram.com/firstgenerationhomesllc/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Instagram</a>
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <div className="flex-1 w-full flex flex-col justify-center items-center lg:items-start py-8 lg:py-2">
                     <a href="https://wa.me/2347037412354" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 lg:py-2.5 rounded-full font-medium hover:bg-[#20bd5a] transition-colors shadow-sm text-[13px] lg:text-[14px]">
                        <MessageCircle className="w-4 h-4 lg:w-4 lg:h-4" />
                        Contact us on whatsapp now
                     </a>
                  </div>

                  {/* Locations Row */}
                  <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-6 mt-auto shrink-0 pt-4 pb-4 lg:pb-0 border-t lg:border-t-0 border-gray-200">
                     <div>
                        <h4 className="text-brand-primary font-medium text-[15px] leading-none mb-1.5 lg:mb-1">Chicago, IL</h4>
                        <p className="text-gray-600 text-[12px] font-light leading-relaxed">444 W Lake Street<br/>Suite 1700<br/>Chicago, IL 60606</p>
                     </div>
                     <div>
                        <h4 className="text-brand-primary font-medium text-[15px] leading-none mb-1.5 lg:mb-1">Houston, TX</h4>
                        <p className="text-gray-600 text-[12px] font-light leading-relaxed">Houston, Texas<br/>United States</p>
                     </div>
                     <div>
                        <h4 className="text-brand-primary font-medium text-[15px] leading-none mb-1.5 lg:mb-1">Lagos, NG</h4>
                        <p className="text-gray-600 text-[12px] font-light leading-relaxed">Lekki &amp; Ikeja Offices<br/>Lagos, Nigeria</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Section (Copyright Edge) */}
            <div className="flex flex-col lg:flex-row justify-between items-center text-[12px] text-gray-500 pt-5 lg:pt-3 mt-4 border-t border-gray-300 w-full shrink-0 text-center lg:text-left pb-4 lg:pb-0">
               <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-6">
                 <p>Copyright © 2026 First Generation Homes, Inc. All rights reserved.</p>
                 <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
               </div>
               <p className="mt-3 lg:mt-0 font-medium tracking-wide">Powered by FGIP</p>
            </div>
          </div>
        </footer>

        {/* Full Screen Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-[60] flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col items-start leading-none font-heading select-none text-brand-dark">
                <span className="text-lg md:text-xl font-light tracking-[0.15em] uppercase">First</span>
                <span className="text-xl md:text-2xl font-bold tracking-tight uppercase text-brand-primary">Generation</span>
                <span className="text-[0.55rem] md:text-[0.60rem] font-medium tracking-[0.5em] uppercase text-gray-500 mt-1">Homes</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-brand-dark hover:text-brand-primary transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-8 text-3xl font-heading font-light">
              <Link to="/" onClick={() => handleNavClick('/')} className="hover:text-brand-primary transition-colors">Home</Link>
              <Link to="/services" onClick={() => handleNavClick('/services')} className="hover:text-brand-primary transition-colors">Services</Link>
              <Link to="/portfolio" onClick={() => handleNavClick('/portfolio')} className="hover:text-brand-primary transition-colors">Portfolio</Link>
              <Link to="/team" onClick={() => handleNavClick('/team')} className="hover:text-brand-primary transition-colors">Team</Link>
              <Link to="/invest" onClick={() => handleNavClick('/invest')} className="hover:text-brand-primary transition-colors">Invest in FGIP Legacy Estate</Link>
              <Link to="/faq" onClick={() => handleNavClick('/faq')} className="hover:text-brand-primary transition-colors">FAQ</Link>
              <Link to="/contact" onClick={() => handleNavClick('/contact')} className="hover:text-brand-primary transition-colors">Contact</Link>
            </div>
          </div>
        )}

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/2347037412354" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[200] bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
}

export default App;
