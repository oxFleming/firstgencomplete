import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/portfolio' },
  { label: 'FGIP', path: '/fgip-legacy-estate' },
  { label: 'Leadership', path: '/team' },
  { label: 'Contact', path: '/contact' },
];

const secondaryLinks = [
  { label: 'Investment Opportunities', path: '/invest' },
  { label: 'Insights', path: '/insights' },
  { label: 'FAQ', path: '/faq' },
];

const Wordmark = ({ tone }: { tone: 'light' | 'dark' }) => (
  <span className="flex flex-col items-start leading-none font-heading select-none">
    <span className={`text-sm md:text-base font-light tracking-[0.18em] uppercase ${tone === 'dark' ? 'text-ink' : 'text-bone'}`}>First</span>
    <span className="text-lg md:text-xl font-medium tracking-tight uppercase text-brass-soft">Generation</span>
    <span className={`text-[0.5rem] md:text-[0.55rem] font-medium tracking-[0.5em] uppercase mt-1 ${tone === 'dark' ? 'text-ink/60' : 'text-bone/70'}`}>Homes</span>
  </span>
);

export default function Header({ pathname = '/' }: { pathname?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${solid ? 'bg-ink/85 backdrop-blur-xl border-b border-line' : 'bg-transparent'}`}>
        <div className="container-fg flex justify-between items-center py-4 lg:py-5">
          <a href="/" aria-label="First Generation Homes — home">
            <Wordmark tone="light" />
          </a>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[0.8rem] font-medium tracking-[0.16em] uppercase">
            {navLinks.map((l) => (
              <a key={l.path} href={l.path} className={`transition-colors hover:text-brass-soft ${l.path === pathname ? 'text-brass-soft' : 'text-bone/85'}`}>{l.label}</a>
            ))}
          </nav>

          <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-bone hover:text-brass-soft transition-colors" aria-label="Open menu">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-ink flex flex-col">
          <div className="container-fg flex justify-between items-center py-4 border-b border-line">
            <Wordmark tone="light" />
            <button onClick={() => setOpen(false)} className="p-2 text-bone hover:text-brass-soft transition-colors" aria-label="Close menu">
              <X className="w-8 h-8" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center items-center gap-6 text-3xl font-heading font-light">
            {[...navLinks, ...secondaryLinks].map((l) => (
              <a key={l.path} href={l.path} onClick={() => setOpen(false)} className="text-bone hover:text-brass-soft transition-colors">{l.label}</a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
