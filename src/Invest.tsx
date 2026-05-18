import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, FileText, Handshake, Landmark, ShieldCheck } from 'lucide-react';
import { Highlight } from './components/ui';

gsap.registerPlugin(ScrollTrigger);

const investorFit = [
  'Investor or lender evaluating the FGIP Legacy Estate opportunity',
  'Landowner or strategic partner exploring a development relationship',
  'Buyer or diaspora stakeholder requesting a serious estate overview',
  'Institutional contact looking for sponsor, delivery, or project context'
];

const reviewItems = [
  { icon: Landmark, title: 'Project Context', text: 'Location, residential mix, amenities, infrastructure scope, and the role of the FGIP platform.' },
  { icon: ShieldCheck, title: 'Risk Questions', text: 'A direct place to ask about phasing, documentation, delivery assumptions, and next diligence steps.' },
  { icon: Handshake, title: 'Partner Route', text: 'A cleaner path for lenders, landowners, investors, and strategic collaborators.' }
];

export default function Invest() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('.fade-up').forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-20 lg:pt-24">
      <section className="relative min-h-[72svh] flex items-end px-5 sm:px-8 lg:px-12 pt-32 pb-10 overflow-hidden bg-brand-dark text-white">
        <img
          src="/images/fgip%20legacy/6%20bedroom/6-bed1.webp"
          alt="FGIP Legacy Estate residential concept"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-62"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/58 to-black/25" />
        <div className="relative z-10 max-w-[92rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-end fade-up">
          <div className="lg:col-span-8">
            <p className="text-brand-primary text-xs font-bold tracking-[0.28em] uppercase mb-5">Investment Inquiries</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium leading-[0.95] tracking-tight mb-7 max-w-5xl">
              Request the serious version of the FGIP opportunity.
            </h1>
            <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-3xl mb-8">
              This page is a gateway for qualified conversations, not a second copy of the estate overview. Review the project, then request the details needed for diligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-white text-brand-dark rounded-full px-7 py-4 font-bold hover:bg-white/90 transition-colors">
                Request Investor Information <ArrowRight className="w-5 h-5 text-brand-primary" />
              </Link>
              <Link to="/fgip-legacy-estate" className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white rounded-full px-7 py-4 font-bold hover:bg-white hover:text-brand-dark transition-colors">
                View Estate Overview <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 bg-white/12 border border-white/20 rounded-2xl p-6 backdrop-blur-md">
            <FileText className="w-8 h-8 text-brand-primary mb-5" />
            <h2 className="text-2xl font-heading mb-3">What this page is for</h2>
            <p className="text-white/72 leading-relaxed">
              A concise routing page for people who need investor, lender, buyer, or partner information without rereading the full development story.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 bg-[#f4f0e8] relative overflow-hidden">
        <img src="/images/luxury-stock/materials-gallery.webp" alt="" className="absolute inset-y-0 right-0 w-full lg:w-1/3 object-cover opacity-16 lg:opacity-85" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f0e8] via-[#f4f0e8]/96 to-[#f4f0e8]/78" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-5 fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Qualified Fit</p>
            <h2 className="text-4xl md:text-6xl font-heading font-light leading-tight tracking-tight mb-6">
              A better next step than another long <Highlight>overview page</Highlight>.
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              The full project narrative lives on the FGIP Legacy Estate page. This page helps the right people move into a focused conversation.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 fade-up">
            {investorFit.map((item) => (
              <div key={item} className="bg-white/78 border border-white/70 rounded-xl p-5 flex gap-3 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-28 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12 fade-up">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">What To Discuss</p>
            <h2 className="text-4xl md:text-6xl font-heading font-light leading-tight tracking-tight mb-6">
              Keep the investment conversation specific.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Serious prospects need enough structure to know what to ask next. The inquiry should lead toward documents, meetings, and diligence, not more repeated marketing language.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviewItems.map((item) => (
              <div key={item.title} className="fade-up bg-white/8 border border-white/15 rounded-2xl p-7 min-h-[260px]">
                <item.icon className="w-8 h-8 text-brand-primary mb-6" />
                <h3 className="text-2xl font-heading mb-4">{item.title}</h3>
                <p className="text-white/68 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 py-20 lg:py-24 bg-white/60">
        <div className="max-w-5xl mx-auto text-center fade-up">
          <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Next Step</p>
          <h2 className="text-4xl md:text-6xl font-heading font-light leading-tight tracking-tight mb-6">
            Ask for the investor information that matches your role.
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            Tell us whether you are evaluating as an investor, lender, buyer, landowner, or strategic partner so the follow-up can be practical.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white rounded-full px-8 py-4 font-bold hover:bg-brand-dark transition-colors">
              Request Information <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="mailto:matthew.kalesanwo@fgipgroup.net" className="inline-flex items-center justify-center gap-3 bg-white border border-gray-200 text-brand-dark rounded-full px-8 py-4 font-bold hover:border-brand-primary transition-colors">
              Email the Investment Team <ArrowRight className="w-5 h-5 text-brand-primary" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
