import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import ContactSection from './components/ContactSection';

export default function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services does First Generation Homes LLC provide?",
      answer: "We offer end-to-end real estate development and construction services. This includes Custom Residential Construction, Home Renovation & Property Modernization, Building Development & Real Estate Projects, and the procurement of high-quality Construction Materials & Finishing Products."
    },
    {
      question: "Where does First Generation Homes operate?",
      answer: "We are headquartered in Chicago, Illinois, with project and partnership conversations connected to Chicago, Houston, Lagos, and the FGIP Legacy Estate in Ogun State. The right first step is to share your project location so we can confirm fit and next steps."
    },
    {
      question: "What is your approach to 'Value Engineering'?",
      answer: "Value engineering means making smarter decisions before money is spent. We review scope, materials, availability, installation realities, and budget priorities so the project can protect quality without wasting money on choices that do not improve the result."
    },
    {
      question: "Do you handle international real estate and investment environments?",
      answer: "Yes. Operating as part of the broader FGIP ecosystem, we actively manage international design, construction, and investment integrations, specializing in delivering large-scale master plans such as our luxury estates in Lagos."
    },
    {
      question: "How do I start a custom residential or remodeling project?",
      answer: "Start with the consultation form or WhatsApp. Include the property location, project type, timing, budget range if known, and what decision you need help making first. We will respond with the most practical next step."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-item-anim', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  // Construct AEO JSON-LD FAQ Object
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 min-h-screen">
      {/* Search Engine Optimization JSON-LD Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="faq-item-anim mb-12 bg-brand-dark text-white p-8 lg:p-12 relative overflow-hidden">
        <img src="/images/luxury-stock/luxury-bath-dark.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-26" loading="lazy" />
        <div className="absolute inset-0 bg-black/68" />
        <div className="relative z-10 max-w-3xl">
          <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">Knowledge Base</h3>
          <h1 className="text-4xl md:text-6xl font-light mb-6 font-heading tracking-tight">Frequently Asked <span className="italic">Questions</span></h1>
          <p className="text-white/72 text-lg leading-relaxed">Direct answers for owners, investors, and partners evaluating a luxury construction, renovation, or development conversation.</p>
        </div>
      </section>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="faq-item-anim border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-lg text-brand-dark pr-4">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-brand-primary transition-transform duration-300 shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              aria-hidden={openIndex !== index}
            >
              <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-50 mx-6">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center faq-item-anim bg-brand-light p-8 rounded-2xl border border-brand-primary/10">
        <h3 className="text-2xl font-heading mb-4 text-brand-dark">Still have questions?</h3>
        <p className="text-gray-600 mb-6">Our team is ready to discuss your next construction or renovation project.</p>
        <button 
          onClick={() => { navigate('/contact'); }} 
          className="bg-brand-primary text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition-colors shadow-lg"
        >
          Contact our Team
        </button>
      </div>

      <ContactSection />
    </div>
  );
}
