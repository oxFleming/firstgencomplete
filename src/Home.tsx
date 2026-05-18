import React from react;
import { ArrowRight, CheckCircle2, Hammer, Handshake, Home as HomeIcon, Landmark } from lucide-react;
import { Highlight, Button } from ./components/ui;
import { useNavigate } from react-router-dom;
import ContactSection from ./components/ContactSection;

const routes = [
  {
    icon: HomeIcon,
    eyebrow: Homeowners,
    title: Build a Custom Home,
    text: Ground-up residential construction with architectural coordination, finish planning, site discipline, and one accountable delivery conversation.,
    action: Start a Home Consultation,
    path: /contact,
    image: /images/luxury-stock/airy-custom-home.webp
  },
  {
    icon: Hammer,
    eyebrow: Property Owners,
    title: Renovate or Modernize,
    text: Kitchen, bath, structural, and whole-property modernization for owners who want comfort, resale strength, and a sharper daily experience.,
    action: Discuss a Renovation,
    path: /contact,
    image: /images/luxury-stock/spa-bath-suite.webp
  },
  {
    icon: Landmark,
    eyebrow: Developers & Partners,
    title: Develop Real Estate,
    text: Planning, project controls, construction coordination, and procurement support for residential and mixed-use work that needs commercial discipline.,
    action: Review Services,
    path: /services,
    image: /images/luxury-stock/materials-gallery.webp
  },
  {
    icon: Handshake,
    eyebrow: Investors,
    title: Explore FGIP Legacy Estate,
    text: A dedicated route for investors, lenders, landowners, and partners evaluating FGIP Legacy Estate or other development opportunities.,
    action: View FGIP Overview,
    path: /fgip-legacy-estate,
    image: /images/fgip%20legacy/6%20bedroom/6-bed1.webp
  }
];

const estatePoints = [
  1,500 planned residential units,
  $549M total development value,
  Infrastructure-led estate planning,
  Dedicated overview for investors and partners
];

const leadership = [
  { name: Remy Okunbena, role: Managing Director, img: remy.webp },
  { name: Mathew Kalesanwo, role: VP, Revenue Growth & Business Development, img: matthew.webp },
  { name: Olufolake Olumogba, role: Director of Project Development & Infrastructure, img: olufolake.webp },
  { name: Arc. Sandra Airunugba, role: Senior Architect and Supervisory Project Manager, img: sandra.webp }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="w-full max-w-full overflow-x-clip">
      <section className="relative min-h-[94svh] flex items-end px-5 sm:px-8 lg:px-12 pt-32 pb-10 overflow-hidden bg-brand-dark text-white">
        <img
          src="/images/luxury-stock/airy-custom-home.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/58 to-black/24" />
        <div className="relative z-10 w-full max-w-[92rem] mx-auto">
          <p className="text-xs sm:text-sm font-bold tracking-[0.24em] uppercase mb-5 text-white/80">Custom homes. Renovations. Development support.</p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.95] mb-7 font-heading tracking-tight max-w-5xl drop-shadow-md">
            Build, renovate, or develop with a clearer plan.
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
            First Generation Homes helps owners and partners move from expensive ideas to controlled decisions: scope, budget, materials, schedule, and delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-3xl">
            <button onClick={() => navigate('/contact')} className="bg-white text-brand-dark rounded-full px-6 sm:px-8 py-4 font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-white/90 transition-colors shadow-xl">
              Start a Consultation <ArrowRight className="w-5 h-5 text-brand-primary" />
            </button>
            <button onClick={() => navigate('/fgip-legacy-estate')} className="bg-brand-primary text-white rounded-full px-6 sm:px-8 py-4 font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-brand-dark transition-colors shadow-xl">
              Explore FGIP Legacy Estate <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-16 lg:py-24 bg-[#151515] text-white relative z-10 overflow-hidden">
        <img src="/images/luxury-stock/materials-wall.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-18" loading="lazy" />
        <div className="absolute inset-0 bg-black/72" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-5">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight font-heading tracking-tight mb-6">
              One firm, <Highlight>three clear client routes</Highlight>.
            </h2>
            <p className="text-white/72 leading-relaxed mb-8">
              Homeowners, development partners, and investors need different information. The site now separates those paths instead of repeating every message on every page.
            </p>
            <Button onClick={() => navigate('/services')} className="border-white/60 text-white hover:bg-white hover:text-brand-dark">Review Services</Button>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Custom homes and major renovations',
              'Development planning and project support',
              'FGIP investor and partner inquiries'
            ].map((item) => (
              <div key={item} className="bg-white/9 border border-white/15 rounded-2xl p-6 shadow-sm backdrop-blur-md flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <p className="text-white/72 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20 lg:py-28 bg-[#111111] text-white">
        <div className="max-w-[92rem] mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Choose Your Path</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight font-heading tracking-tight mb-6">
              Start with the conversation that matches your goal.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">A clear sales path keeps homeowners from being buried in investor language and keeps investors from reading remodel copy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {routes.map((route) => (
              <article key={route.title} className="bg-white/8 border border-white/15 overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  <img src={route.image} alt="" className="w-full h-full object-cover opacity-86 hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-6">
                  <route.icon className="w-7 h-7 text-brand-primary mb-5" />
                  <p className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-3">{route.eyebrow}</p>
                  <h3 className="text-2xl font-heading mb-4">{route.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-6">{route.text}</p>
                  <button onClick={() => navigate(route.path)} className="text-white font-bold inline-flex items-center gap-2 hover:text-brand-primary transition-colors text-left">
                    {route.action} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-20 lg:py-28 bg-[#f4f0e8] relative z-10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 opacity-20 lg:opacity-100">
          <img src="/images/luxury-stock/grand-foyer.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-[#f4f0e8]" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative z-10 bg-white/86 backdrop-blur-md p-8 border border-white/70">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-5">Flagship Development</p>
            <h2 className="text-4xl md:text-6xl font-light leading-tight font-heading tracking-tight mb-6">
              FGIP Legacy Estate belongs in its own clear lane.
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              The estate is a major development story, so the home page now introduces it briefly and sends serious investors, partners, and buyers to the dedicated overview.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {estatePoints.map((item) => (
                <div key={item} className="flex gap-3 text-sm text-gray-700 bg-white/70 border border-white/60 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate('/fgip-legacy-estate')} className="bg-brand-primary text-white border-brand-primary hover:bg-brand-dark">Explore the Estate</Button>
              <Button onClick={() => navigate('/portfolio')} className="bg-white/80 border-white text-brand-dark hover:bg-white">View Projects</Button>
            </div>
          </div>
          <div className="lg:col-span-7 relative z-10 grid grid-cols-2 gap-3">
            {[
              '/images/fgip%20legacy/6%20bedroom/6-bed1.webp',
              '/images/fgip%20legacy/5%20Bedroom/5-bed1.webp',
              '/images/fgip%20legacy/4%20bedroom/4-bed1.webp',
              '/images/fgip%20legacy/primary%20school/school1.webp'
            ].map((image, index) => (
              <img key={image} src={image} alt="" className={`w-full object-cover bg-gray-100 ${index === 0 ? 'col-span-2 aspect-[16/8]' : 'aspect-[4/3]'}`} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-transparent pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden w-full relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-10">
            <p className="text-brand-primary text-xs font-bold tracking-widest uppercase mb-3">Leadership</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-brand-dark font-heading">Leadership for <Highlight>delivery and development</Highlight></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {leadership.map((exec) => (
              <div key={exec.name} className="aspect-[4/5] relative group rounded-xl overflow-hidden shadow-lg border border-brand-primary/10 bg-gray-100">
                <img src={`/images/team-images/${exec.img}`} alt={exec.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0" loading="lazy" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                  <h3 className="text-lg font-heading mb-1">{exec.name}</h3>
                  <p className="text-brand-primary tracking-widest uppercase text-[9px] font-bold leading-tight line-clamp-2">{exec.role}</p>
                </div>
              </div>
            ))}
            <div className="aspect-[4/5] flex items-center justify-center bg-brand-gray rounded-xl p-6 shadow-md">
              <div className="text-center">
                <h3 className="text-lg font-heading mb-4 text-brand-dark">The team behind delivery, development, and partnerships.</h3>
                <Button onClick={() => navigate('/team')}>View Full Team</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
