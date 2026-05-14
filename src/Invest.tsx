import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Landmark } from 'lucide-react';
import { Button, SectionHeader, Highlight } from './components/ui';
import { LazyLoadImage } from 'react-lazy-load-image-component';

gsap.registerPlugin(ScrollTrigger);

export default function Invest() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up elements
      const fadeElements = document.querySelectorAll('.fade-up');
      fadeElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <img 
          src="/images/fgip%20legacy/hotel/hotel1.png" 
          alt="FGIP Legacy Estate" 
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-50"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-black/40 z-0"></div>
        <div className="relative z-10 text-center px-6 max-w-5xl fade-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6 font-heading tracking-tight drop-shadow-lg">
            Invest in <span className="italic font-light">FGIP Legacy Estate</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md">
            Be part of a large-scale, infrastructure-led residential development in one of Nigeria's fastest-growing corridors.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-6 py-20 lg:py-32 bg-white/40 backdrop-blur-3xl relative z-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-up">
            <SectionHeader 
              subtitle="THE VISION" 
              title={<>Strategic Sponsorship & <Highlight>Development Partnership</Highlight></>} 
            />
            <p className="text-gray-800 text-lg leading-relaxed mb-6 font-medium">
              First Generation Homes LLC is proud to serve as a strategic sponsor and development partner of FGIP Legacy Luxury Estate — a large-scale, infrastructure-led residential development located within the Lagos–Ogun growth corridor in Ogun State, Nigeria.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Designed as a fully integrated residential community, the project spans approximately 160 acres and is planned to deliver 1,500 residential units through a structured, phased development model.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-medium text-gray-700">160 Acres</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-medium text-gray-700">1,500 Units</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-medium text-gray-700">Phased Delivery</span>
              </div>
            </div>
          </div>
          <div className="relative fade-up">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-700">
              <img src="/images/fgip%20legacy/6%20bedroom/6-bed1.png" alt="Estate Architecture" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Strategic Value Section */}
      <section className="px-6 py-24 bg-brand-dark/5 backdrop-blur-xl border-y border-white/40">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 fade-up">
            <h2 className="text-4xl lg:text-5xl font-heading mb-6 tracking-tight">Addressing Modern Demand</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              The project combines modern residential living with engineered infrastructure and long-term value creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/60 p-8 rounded-2xl border border-white/50 shadow-xl hover:-translate-y-2 transition-transform duration-300 group fade-up">
              <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
                <TrendingUp className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-heading font-medium mb-4">Value Creation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                FGIP Legacy Luxury Estate is being developed to address the growing demand for secure, well-planned, and lifestyle-driven communities through long-term value creation.
              </p>
            </div>

            <div className="bg-white/60 p-8 rounded-2xl border border-white/50 shadow-xl hover:-translate-y-2 transition-transform duration-300 group fade-up" style={{ transitionDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
                <Landmark className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-heading font-medium mb-4">Institutional Standards</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The project is structured around an infrastructure-first and cluster-based execution strategy to align with institutional development standards.
              </p>
            </div>

            <div className="bg-white/60 p-8 rounded-2xl border border-white/50 shadow-xl hover:-translate-y-2 transition-transform duration-300 group fade-up" style={{ transitionDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
                <ShieldCheck className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-heading font-medium mb-4">Investor Confidence</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                As a strategic sponsor, we prioritize structured execution and sustainable growth, fostering investor confidence and long-term community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle & Amenities */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 fade-up">
              <img src="/images/fgip%20legacy/5%20Bedroom/5-bed1.png" alt="5 Bedroom" className="rounded-xl shadow-lg aspect-square object-cover" loading="lazy" />
              <img src="/images/fgip%20legacy/primary%20school/school1.png" alt="Primary School" className="rounded-xl shadow-lg aspect-square object-cover mt-12" loading="lazy" />
              <img src="/images/fgip%20legacy/Business%20Center/business1.png" alt="Business Center" className="rounded-xl shadow-lg aspect-square object-cover -mt-12" loading="lazy" />
              <img src="/images/fgip%20legacy/3%20bedroom/3-bed1.png" alt="3 Bedroom" className="rounded-xl shadow-lg aspect-square object-cover" loading="lazy" />
            </div>
            <div className="order-1 lg:order-2 fade-up">
              <SectionHeader 
                subtitle="DIVERSIFIED OFFERING" 
                title={<>Modern Living <Highlight>Integrated</Highlight></>} 
              />
              <p className="text-gray-800 text-lg leading-relaxed mb-6">
                The development features a diversified residential offering, including luxury villas, executive residences, family-focused housing, and community-centered amenities.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Designed to contribute meaningfully to the future of organized urban development, FGIP Legacy is more than a housing project — it is a scalable residential platform.
              </p>
              <ul className="space-y-4">
                {[
                  "Luxury Villas & Executive Residences",
                  "Family-focused housing clusters",
                  "Community-centered amenities",
                  "Modern engineered infrastructure",
                  "Organized estate systems"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                    </div>
                    <span className="text-brand-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 mb-12">
        <div className="max-w-5xl mx-auto bg-brand-primary/90 backdrop-blur-2xl rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl fade-up">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <h2 className="text-4xl lg:text-6xl font-heading mb-8 tracking-tight">Join the Future of Urban Development</h2>
          <p className="text-xl text-white/90 font-light mb-12 max-w-2xl mx-auto">
            Contact our investment team to learn more about participation in the Lagos–Ogun growth corridor.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/contact" 
              className="px-10 py-5 bg-white text-brand-primary rounded-full font-bold hover:bg-white/90 transition-colors flex items-center gap-3 shadow-xl"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="mailto:matthew.kalesanwo@fgipgroup.net" 
              className="px-10 py-5 border-2 border-white/50 text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-3"
            >
              Email Us <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
