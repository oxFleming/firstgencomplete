import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Building2, Globe2, Landmark } from 'lucide-react';
import ContactSection from './components/ContactSection';

const insights = [
  {
    title: 'Why infrastructure-led estates matter in high-growth corridors',
    category: 'Development Strategy',
    description: 'A perspective on why roads, drainage, power, water, and security must be treated as the foundation of long-term residential value.',
    icon: Building2
  },
  {
    title: 'The role of cross-border development support in FGIP Legacy Estate',
    category: 'Platform Thinking',
    description: 'How First Generation Homes LLC contributes U.S. construction knowledge, procurement discipline, and development advisory to the FGIP ecosystem.',
    icon: Globe2
  },
  {
    title: 'Institutional credibility in residential development',
    category: 'Investor Perspective',
    description: 'A look at the proof points investors, lenders, and partners expect from sponsors behind large-scale residential communities.',
    icon: Landmark
  }
];

export default function Insights() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.insight-fade-up',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-5 sm:px-6 w-full max-w-full overflow-x-clip">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 items-end">
        <div className="lg:col-span-8 insight-fade-up">
          <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Media & Insights</p>
          <h1 className="text-5xl md:text-7xl font-heading font-light leading-tight tracking-tight mb-6">
            Development thinking, company updates, and platform perspective.
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            A dedicated place for First Generation Homes LLC to publish project updates, investment commentary, development announcements, and thought leadership around luxury residential infrastructure.
          </p>
        </div>
        <div className="lg:col-span-4 insight-fade-up bg-white/60 border border-white/60 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-heading mb-3">Editorial purpose</h2>
          <p className="text-gray-600 leading-relaxed">
            This section gives the brand a professional publishing layer for credibility, SEO, and investor education.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        {insights.map((item) => (
          <article key={item.title} className="insight-fade-up bg-white/70 border border-white/60 rounded-2xl p-7 shadow-sm flex flex-col min-h-[330px]">
            <item.icon className="w-8 h-8 text-brand-primary mb-6" />
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">{item.category}</p>
            <h2 className="text-2xl font-heading mb-4 leading-tight">{item.title}</h2>
            <p className="text-gray-600 leading-relaxed flex-1">{item.description}</p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-brand-primary font-bold mt-6 hover:text-brand-dark transition-colors">
              Discuss this topic <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
        ))}
      </section>

      <section className="bg-brand-dark text-white rounded-2xl p-8 md:p-12 lg:p-16 insight-fade-up">
        <div className="max-w-3xl">
          <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Future Content Pipeline</p>
          <h2 className="text-4xl md:text-5xl font-heading font-light leading-tight mb-6">
            Recommended topics for the next publishing cycle.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/75">
            {[
              'FGIP Legacy Estate development announcements',
              'Investor brief summaries and project milestones',
              'Leadership perspectives on infrastructure-led housing',
              'Construction, procurement, and finishing product insights'
            ].map((topic) => (
              <div key={topic} className="border border-white/15 bg-white/8 rounded-xl p-4">
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
