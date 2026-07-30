import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ContactSection from './components/ContactSection';

const teamMembers = [
  {
    name: "Remy Okunbena",
    role: "Managing Director, First Generation Homes LLC",
    img: "/images/team-images/remy.webp",
    bio: [
      "Remy Okunbena brings over two decades of progressive leadership in civil engineering, project development, and strategic operations. As Managing Director of First Generation Homes LLC, she leads the company's mission to deliver innovative, affordable housing solutions with a focus on sustainability, precision, and long-term value.",
      "Holding a Bachelor's Degree in Civil Engineering from Stanford University and an MBA from Harvard Business School, her career spans senior roles at top firms where she led large-scale developments.",
      "Under her guidance, First Generation Homes fosters a values-driven culture, ensuring every team member aligns with the company's commitment to quality, integrity, and client-focused innovation."
    ]
  },
  {
    name: "Matthew Kalesanwo",
    role: "VP, Revenue Growth & Business Development",
    img: "/images/team-images/matthew.webp",
    bio: [
      "With more than 20 years across retail, enterprise services, and real estate development, Matthew leads global revenue growth and business development at First Generation Homes LLC and its affiliated FGIP Group.",
      "He ranked #1 nationally in sales for five consecutive years at The Tile Shop (NASDAQ: TTSH), then scaled a consulting and enterprise services portfolio from $4.6M to $19.5M in revenue with 35% profit growth, closing a $10M+ global contract along the way.",
      "As founder and principal of FGIP Legacy Luxury Estate, he rescoped the project from an initial ~$350M concept into a ~$549M master-planned development platform — a 57% expansion in project value driven by redesigned phasing, product mix, and commercial strategy.",
      "His leadership blends operational depth with a growth-first approach to sales, partnerships, and capital strategy."
    ]
  },
  {
    name: "Olufolake Olumogba",
    role: "Director of Project Development & Infrastructure",
    img: "/images/team-images/olufolake.webp",
    bio: [
      "Olufolake is a chartered architect with over 30 years of design and development leadership across the UK and Africa. She is a member of the Royal Institute of British Architects (RIBA) and the Royal Incorporation of Architects in Scotland (RIAS), as well as an associate member of the Nigerian Institute of Architects (NIA).",
      "Her expertise spans urban building design, landscape architecture, and interior design, having served as a consultant, designer, and project promoter across major international developments. At First Generation Homes LLC, she leads infrastructure delivery and project innovation, ensuring each development meets the highest standards of function, sustainability, and architectural distinction."
    ]
  },
  {
    name: "Arc. Sandra Airunugba",
    role: "Senior Architect and Supervisory Project Manager",
    img: "/images/team-images/sandra.webp",
    bio: [
      "Sandra Airunugba is a distinguished Nigerian Architect and Interior Designer with over a decade of experience in shaping functional and aesthetic environments. As the CEO and Chief Architect of Flaux Architectures, she leverages her dual expertise to lead high-end real estate developments and innovative design projects across the country.",
      "Sandra holds a Master's degree in Architecture from Caleb University and a Master's in Interior Design from Obafemi Awolowo University, a combination that allows her to seamlessly bridge the gap between structural integrity and internal spatial harmony. Her professional standing is backed by her membership in the Nigerian Institute of Architects (NIA).",
      "Currently serving as a Senior Architect and Project Manager for FGIP, Sandra's career is marked by a proven track record in large-scale project execution. Prior to her entrepreneurial success with Flaux Architectures, she honed her technical leadership as a Project Architect for Bestaf Projects, where she managed complex infrastructure requirements. Her approach combines technical precision with a visionary eye for detail, making her a formidable force in Nigeria's built environment."
    ]
  },
  {
    name: "Uju Amazu",
    role: "Chief Operating Officer",
    img: "/images/team-images/uju.webp",
    bio: [
      "Uju Amazu is an accomplished operations executive with over 20 years of leadership experience in P&L management, procurement, budgeting, and enterprise controls. As Chief Operating Officer at First Generation Homes LLC, she oversees the firm's operational strategy, streamlining project execution, optimizing financial performance, and ensuring alignment across teams and markets.",
      "Her strengths in performance improvement, staff development, and operational governance have been instrumental in scaling high-growth initiatives and delivering cost-effective results. Uju holds a BA/BS in Business, blending deep financial acumen with a hands-on leadership style that fosters excellence and accountability throughout the organization."
    ]
  },
  {
    name: "Gbemi Adebayo",
    role: "Head of Enterprise Solutions & IT",
    img: "/images/team-images/gbemi.webp",
    bio: [
      "Gbemi Adebayo brings over 12 years of deep expertise in business process automation, systems engineering, and enterprise data solutions. As Head of Enterprise Solutions & IT at First Generation Homes LLC, he leads the design and optimization of the company's digital infrastructure, ensuring seamless connectivity between operations, analytics, and client-facing systems.",
      "Certified as an Oracle and SQL Professional and a specialist in Cloudera Hadoop Data Management, Gbemi is instrumental in driving secure, scalable, and insight-driven platforms across the organization. His background spans database architecture, IT governance, and system integration, supporting innovation at the intersection of construction and technology.",
      "He holds a B.Sc. in Computer Science from Olabisi Onabanjo University (OOU), combining a strong academic foundation with hands-on technical leadership to power the company's digital transformation."
    ]
  },
  {
    name: "Shade Akanji",
    role: "Chief Financial Officer",
    img: "/images/team-images/shade.webp",
    bio: [
      "Shade is a globally credentialed finance and risk executive with over 18 years of leadership experience across Fortune 500 companies and global consulting firms. As CFO of First Generation Homes LLC, she oversees financial strategy, compliance, and enterprise risk management, ensuring the organization operates with fiscal discipline and long-term resilience.",
      "She holds designations as a Chartered Accountant (CA), Certified Internal Auditor (CIA), and Certified Information Systems Auditor (CISA). Her leadership journey includes senior roles such as Vice President, Global Audit & Operations for a global building materials company, and Director of Global Controls & Reporting at PepsiCo and Ernst & Young LLP.",
      "Shade earned her MBA in Finance and Marketing from the Kellogg School of Management and holds a B.Sc. (Hons.) in Chemical Engineering from the University of Lagos. Her multidisciplinary expertise bridges finance, technology, and operations, positioning her as a strategic force in driving sustainable growth at First Generation Homes LLC."
    ]
  },
  {
    name: "Taplong Lucy James",
    role: "Legal & Compliance Specialist",
    img: "/images/team-images/tapalong.webp",
    bio: [
      "Taplong Lucy James is a legal and compliance professional with over five years of experience in regulatory compliance, contract management, and risk mitigation.",
      "She supports FGIP Legacy Luxury Estate by ensuring legally sound operations, accurate documentation, and adherence to regulatory standards across all project activities.",
      "Taplong brings strong analytical skills, governance insight, and a detail-driven approach to land transactions, due diligence, and contract administration."
    ]
  },
  {
    name: "Omeri Titus Okechukwu",
    role: "Procurement and Logistics Officer",
    img: "/images/team-images/titus.webp",
    bio: [
      "Omeri Titus Okechukwu is a seasoned petroleum operations professional with over 17 years of experience in offshore cargo handling, STS operations, loss control, and terminal compliance.",
      "His background in supervising complex, high-risk logistics environments brings strong operational discipline, safety leadership, and technical rigor to FGIP Legacy Luxury Estate.",
      "He holds a B.Eng. in Chemical Engineering and a Ship Survey Certification from the Maritime Training Academy, UK."
    ]
  },
  {
    name: "Adeoye Oluwamayokun Jude",
    role: "Lead Project Architect",
    img: "/images/team-images/jude.webp",
    bio: [
      "Adeoye Oluwamayokun Jude is an accomplished architect with over 10 years of experience in design development, construction detailing, and large-scale real estate projects. A graduate of YABATECH and Caleb University, he has delivered more than 500 residential, commercial, and mixed-use designs across Nigeria. He currently leads design development at Interior Culture and is the Founder of MJ Design Studio. Jude brings a strong commitment to innovation, sustainability, and user-focused architecture to the FGIP Legacy Estate."
    ]
  },
  {
    name: "Tope Makinde",
    role: "Geospatial Mapping Expert",
    img: "/images/team-images/tope.webp",
    bio: [
      "As the CEO and Managing Director of Geoinfotech, Tope Makinde leads the charge in bridging the gap between advanced location technology and sustainable development. With a strategic focus on Geo-Spatial Solution Deployment, he oversees the integration of Geographic Information Systems (GIS), Remote Sensing, and professional drone operations to solve complex industrial challenges.",
      "Under his leadership, Geoinfotech delivers high-precision mapping and spatial data analysis that provide clients with critical business intelligence. Tope is dedicated to equipping organizations with the accurate data and competitive insights necessary to achieve their strategic goals through innovative engineering, topographic, and cadastral surveying."
    ]
  },
  {
    name: "Engr. Olaoye Sunday Joel",
    role: "Engineering",
    img: "/images/team-images/olaoye.webp",
    bio: [
      "Engr. Olaoye Sunday Joel is a construction engineer with a Bachelor's degree in Engineering, specializing in site supervision, quality control, and the safe, efficient delivery of roads, bridges, and building projects. He ensures seamless coordination between design and field execution, keeping every project on schedule, within budget, and compliant with engineering standards."
    ]
  },
  {
    name: "Engr. Azeez Opeyemi",
    role: "Engineering",
    img: "/images/team-images/Azeez.webp",
    bio: [
      "Engr. Azeez Opeyemi is a construction engineer specializing in site supervision, quality control, and the safe, efficient delivery of roads, bridges, and building projects. He ensures seamless coordination between design and field execution, keeping every project on schedule, within budget, and compliant with engineering standards."
    ]
  },
  {
    name: "Alade Abosede Mauyon",
    role: "FGIP Legal Counsel",
    img: "",
    bio: [
      "Alade Abosede is a partner at Silverhills Attorney and Solicitors and currently the lawyer/legal counsel to FGIP."
    ]
  }
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  // Close modal with Escape and lock background scroll while it is open
  useEffect(() => {
    if (!selectedMember) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedMember]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-fade-up',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
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
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="mb-16 lg:mb-24 team-fade-up max-w-4xl bg-white/40 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] border border-white/60 shadow-xl relative z-10">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">OUR PEOPLE</h3>
        <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading tracking-tight drop-shadow-sm">Meet the Team</h1>
        <p className="text-lg text-gray-800 leading-relaxed max-w-3xl font-medium">
          The minds behind First Generation Homes. Our leadership team brings decades of experience in real estate development, construction management, and architectural design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 relative z-10">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="team-fade-up group cursor-pointer bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            onClick={() => setSelectedMember(member)}
          >
            <div className="w-full aspect-[3/4] overflow-hidden rounded-[1.5rem] mb-6 relative shadow-inner flex items-center justify-center bg-gray-200/50">
              {member.img ? (
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width="400"
                  height="533"
                />
              ) : (
                <div className="text-7xl font-heading text-brand-primary/30 group-hover:scale-105 transition-transform duration-700">
                  {member.name.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-brand-primary text-white p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-8 h-8" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-heading mb-1 group-hover:text-brand-primary transition-colors px-2">{member.name}</h3>
            <p className="text-brand-primary font-medium text-sm border-t border-brand-primary/20 pt-2 px-2 mt-2 tracking-widest leading-relaxed line-clamp-2">{member.role}</p>
          </div>
        ))}
      </div>

      {/* Careers CTA */}
      <div className="team-fade-up mt-16 lg:mt-24 bg-brand-dark text-white rounded-[2rem] p-8 lg:p-12 relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-3">We're Hiring</p>
          <h2 className="text-3xl md:text-4xl font-heading font-light mb-2">Want to build with this team?</h2>
          <p className="text-white/70 leading-relaxed max-w-xl">We accept open applications across construction, engineering, architecture, and commercial roles — no posted vacancy required.</p>
        </div>
        <Link
          to="/careers"
          className="inline-flex items-center justify-center gap-3 bg-white text-brand-dark rounded-full px-7 py-4 font-bold hover:bg-white/90 transition-colors shrink-0"
        >
          Apply Now <ArrowRight className="w-5 h-5 text-brand-primary" />
        </Link>
      </div>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          ></div>
          <div role="dialog" aria-modal="true" aria-label={selectedMember.name} className="relative bg-white w-full max-w-3xl lg:max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] lg:max-h-[80vh]">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-brand-dark hover:text-brand-primary hover:bg-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full md:w-2/5 h-64 md:h-auto shrink-0 relative bg-gray-100 flex items-center justify-center">
              {selectedMember.img ? (
                <img
                  src={selectedMember.img}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                />
              ) : (
                <div className="text-8xl lg:text-9xl font-heading text-brand-primary/20">
                  {selectedMember.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="p-6 md:p-8 lg:p-12 overflow-y-auto w-full">
              <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-2">Team Member</h3>
              <h2 className="text-3xl lg:text-5xl font-heading mb-2">{selectedMember.name}</h2>
              <p className="text-gray-500 font-medium text-xs lg:text-sm uppercase tracking-widest mb-6 lg:mb-8 pb-6 lg:pb-8 border-b border-gray-200">
                {selectedMember.role}
              </p>
              <div className="text-base text-gray-700 leading-relaxed space-y-4">
                {selectedMember.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <ContactSection />
    </div>
  );
}
