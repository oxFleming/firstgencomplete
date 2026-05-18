import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import ContactSection from './components/ContactSection';

const filters = ['All', 'Completed Work', 'Renovations & Interiors', 'Custom Homes', 'FGIP Estate Concepts'];

type Project = {
  title: string;
  location: string;
  category: string;
  status: string;
  image: string;
  images?: string[];
  description: string;
};

const projects: Project[] = [
  {
    title: 'Modern Custom Home Construction',
    location: 'Chicago, IL',
    category: 'Custom Homes',
    status: 'Completed / portfolio sample',
    image: '/images/project-images/custom-home/custom1.webp',
    images: ['/images/project-images/custom-home/custom1.webp', '/images/project-images/custom-home/custom2.webp', '/images/project-images/custom-home/custom3.webp'],
    description: 'A custom home build showing modern architectural direction, open living space, exterior finish work, and coordinated residential delivery.'
  },
  {
    title: 'Modern 3-bedroom Estate',
    location: 'Chicago, IL',
    category: 'Completed Work',
    status: 'Completed / portfolio sample',
    image: '/images/project-images/3-bedroom/3-bedroom2.webp',
    images: ['/images/project-images/3-bedroom/3-bedroom2.webp', '/images/project-images/3-bedroom/3-bedroom1.webp'],
    description: 'Interior build-out for a spacious residential property with fireplace, kitchen, suite planning, and durable finish execution.'
  },
  {
    title: 'Bathroom Remodels & Designs',
    location: 'Selected remodel portfolio',
    category: 'Renovations & Interiors',
    status: 'Completed / portfolio sample',
    image: '/images/project-images/bathrooms/bathroom1.webp',
    images: ['/images/project-images/bathrooms/bathroom1.webp', '/images/project-images/bathrooms/bathroom2.webp', '/images/project-images/bathrooms/bathroom3.webp', '/images/project-images/bathrooms/bathroom4.webp'],
    description: 'Bathroom modernization work focused on layout improvement, spa-like finishes, lighting, surfaces, and everyday usability.'
  },
  {
    title: 'Modern Kitchen Remodels',
    location: 'Selected remodel portfolio',
    category: 'Renovations & Interiors',
    status: 'Completed / portfolio sample',
    image: '/images/project-images/kitchen/kitchen1.webp',
    images: ['/images/project-images/kitchen/kitchen1.webp', '/images/project-images/kitchen/kitchen2.webp'],
    description: 'Kitchen modernization examples showing open layouts, island planning, cabinetry, stone surfaces, lighting, and entertaining-focused flow.'
  },
  {
    title: 'Greenfield Estate Development',
    location: 'Texas, USA',
    category: 'Completed Work',
    status: 'Completed / portfolio sample',
    image: '/images/project-images/greenfield/greenfield1.webp',
    images: ['/images/project-images/greenfield/greenfield1.webp'],
    description: 'Site development and residential estate construction sample showing land preparation, structural work, material coordination, and delivery management.'
  },
  {
    title: 'Modern Interior',
    location: 'Selected interior portfolio',
    category: 'Renovations & Interiors',
    status: 'Completed / portfolio sample',
    image: '/images/project-images/interior/interior1.webp',
    images: ['/images/project-images/interior/interior1.webp', '/images/project-images/interior/interior2.webp', '/images/project-images/interior/interior3.webp', '/images/project-images/interior/interior4.webp'],
    description: 'Interior planning and decor examples focused on clean lines, material contrast, natural light, and livable modern spaces.'
  },
  {
    title: 'FGIP Legacy Estate: 6-Bedroom Duplex',
    location: 'Ogun State, Nigeria',
    category: 'FGIP Estate Concepts',
    status: 'Planned concept / rendering',
    image: '/images/fgip%20legacy/6%20bedroom/6-bed1.webp',
    images: ['/images/fgip%20legacy/6%20bedroom/6-bed1.webp', '/images/fgip%20legacy/6%20bedroom/6-bed2.webp', '/images/fgip%20legacy/6%20bedroom/6-bed3.webp', '/images/fgip%20legacy/6%20bedroom/6-bed4.webp'],
    description: 'Planned large-format residential product within the FGIP Legacy Estate masterplan. Shown as an estate concept, not as completed portfolio work.'
  },
  {
    title: 'FGIP Legacy Estate: 5-Bedroom Duplex',
    location: 'Ogun State, Nigeria',
    category: 'FGIP Estate Concepts',
    status: 'Planned concept / rendering',
    image: '/images/fgip%20legacy/5%20Bedroom/5-bed1.webp',
    images: ['/images/fgip%20legacy/5%20Bedroom/5-bed1.webp', '/images/fgip%20legacy/5%20Bedroom/5-bed2.webp'],
    description: 'Planned family housing product for the FGIP Legacy Estate concept package, included to show residential mix and architectural direction.'
  },
  {
    title: 'FGIP Legacy Estate: 4-Bedroom Duplex',
    location: 'Ogun State, Nigeria',
    category: 'FGIP Estate Concepts',
    status: 'Planned concept / rendering',
    image: '/images/fgip%20legacy/4%20bedroom/4-bed1.webp',
    images: ['/images/fgip%20legacy/4%20bedroom/4-bed1.webp', '/images/fgip%20legacy/4%20bedroom/4-bed2.webp', '/images/fgip%20legacy/4%20bedroom/4-bed3.webp'],
    description: 'Planned duplex concept within the FGIP Legacy Estate masterplan, showing product range, living scale, and long-term residential positioning.'
  },
  {
    title: 'FGIP Legacy Estate: 3-Bedroom Bungalow',
    location: 'Ogun State, Nigeria',
    category: 'FGIP Estate Concepts',
    status: 'Planned concept / rendering',
    image: '/images/fgip%20legacy/3%20bedroom/3-bed1.webp',
    images: ['/images/fgip%20legacy/3%20bedroom/3-bed1.webp', '/images/fgip%20legacy/3%20bedroom/3-bed2.webp'],
    description: 'Planned bungalow concept for the estate residential mix, included as a development vision asset rather than a completed build.'
  },
  {
    title: 'FGIP Legacy Estate: Primary School',
    location: 'Ogun State, Nigeria',
    category: 'FGIP Estate Concepts',
    status: 'Planned amenity concept / rendering',
    image: '/images/fgip%20legacy/primary%20school/school1.webp',
    images: ['/images/fgip%20legacy/primary%20school/school1.webp', '/images/fgip%20legacy/primary%20school/school2.webp', '/images/fgip%20legacy/primary%20school/school3.webp'],
    description: 'Planned education amenity for the FGIP Legacy Estate community vision, showing how residential development connects to daily life and services.'
  },
  {
    title: 'FGIP Legacy Estate: Daycare Centre',
    location: 'Ogun State, Nigeria',
    category: 'FGIP Estate Concepts',
    status: 'Planned amenity concept / rendering',
    image: '/images/fgip%20legacy/daycare/daycare1.webp',
    images: ['/images/fgip%20legacy/daycare/daycare1.webp', '/images/fgip%20legacy/daycare/daycare2.webp'],
    description: 'Planned daycare amenity concept for the estate, included to clarify the community infrastructure vision.'
  },
  {
    title: 'FGIP Legacy Estate: Business Centre',
    location: 'Ogun State, Nigeria',
    category: 'FGIP Estate Concepts',
    status: 'Planned amenity concept / rendering',
    image: '/images/fgip%20legacy/Business%20Center/business1.webp',
    images: ['/images/fgip%20legacy/Business%20Center/business1.webp', '/images/fgip%20legacy/Business%20Center/business2.webp', '/images/fgip%20legacy/Business%20Center/business3.webp'],
    description: 'Planned business center concept for the estate, showing the intended mix of residential, commercial, and support uses.'
  },
  {
    title: 'FGIP Legacy Estate: Luxury Hotel',
    location: 'Ogun State, Nigeria',
    category: 'FGIP Estate Concepts',
    status: 'Planned amenity concept / rendering',
    image: '/images/fgip%20legacy/hotel/hotel1.webp',
    images: ['/images/fgip%20legacy/hotel/hotel1.webp', '/images/fgip%20legacy/hotel/hotel2.webp', '/images/fgip%20legacy/hotel/hotel3.webp'],
    description: 'Planned hospitality concept for the estate, included as part of the broader development vision and partnership story.'
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-5 sm:px-6 w-full max-w-full overflow-x-clip">
      <section className="mb-12 lg:mb-16 max-w-4xl">
        <h3 className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-4">Our Work</h3>
        <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading tracking-tight">Completed work and planned estate concepts, clearly separated.</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          Use the filters to distinguish completed portfolio samples from FGIP Legacy Estate renderings and planned amenities. That clarity matters: homeowners should see proof of execution, while investors and partners can review the estate vision without confusing it for finished work.
        </p>
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide max-w-full">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm whitespace-nowrap border transition-colors ${
                activeFilter === filter
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-transparent text-gray-600 border-gray-300 hover:border-brand-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-4 bg-brand-dark text-white overflow-hidden">
        <div className="lg:col-span-4 p-8 lg:p-10 flex flex-col justify-between min-h-[340px]">
          <div>
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">How To Read This Page</p>
            <h2 className="text-4xl font-heading font-light leading-tight mb-5">Completed work builds trust. Planned concepts show direction.</h2>
            <p className="text-white/70 leading-relaxed">Each project carries a status so the page feels honest, useful, and easier to scan from a sales perspective.</p>
          </div>
          <p className="text-white/45 text-xs uppercase tracking-[0.22em] mt-8">Residences / Interiors / Estate Development</p>
        </div>
        <div className="lg:col-span-8 grid grid-cols-3 min-h-[340px]">
          <img src="/images/luxury-stock/signature-lounge.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          <img src="/images/luxury-stock/materials-gallery.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          <img src="/images/luxury-stock/marble-bath.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-24">
        {filteredProjects.map((project) => (
          <article key={project.title} className="group cursor-pointer transition-all duration-500 hover:-translate-y-1" onClick={() => setSelectedProject(project)}>
            <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-100 aspect-[4/3]">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute top-4 left-4 bg-brand-dark/90 text-white px-3 py-1 font-bold tracking-widest text-[10px] uppercase rounded-lg">
                {project.status}
              </div>
              <div className="absolute bottom-0 right-0 bg-brand-primary p-4 text-white group-hover:bg-brand-dark transition-colors rounded-tl-2xl">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-2xl font-heading mb-2 group-hover:text-brand-primary transition-colors">{project.title}</h2>
            <p className="text-xs text-brand-primary font-bold uppercase tracking-wider mb-2">{project.category}</p>
            <p className="text-sm text-gray-600 font-medium mb-3">{project.location}</p>
            <p className="text-gray-700 leading-relaxed line-clamp-3">{project.description}</p>
          </article>
        ))}
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <div className="bg-white w-full max-w-5xl max-h-[86vh] relative z-10 shadow-2xl overflow-hidden rounded-xl grid grid-cols-1 md:grid-cols-2">
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full text-brand-dark transition-colors z-[110] shadow-md border border-gray-100" aria-label="Close modal">
              <X className="w-5 h-5" />
            </button>
            <div className="bg-gray-100 min-h-[320px] md:min-h-[620px]">
              <img src={selectedProject.images?.[0] || selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-10 overflow-y-auto">
              <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-3">{selectedProject.category}</p>
              <h2 className="text-3xl md:text-5xl font-heading mb-4">{selectedProject.title}</h2>
              <p className="text-gray-500 font-medium mb-6">{selectedProject.location}</p>
              <div className="inline-flex bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">{selectedProject.status}</div>
              <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}

      <ContactSection />
    </main>
  );
}
