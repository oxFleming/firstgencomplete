import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.firstgenerationhomesllc.com',
  output: 'static',
  adapter: vercel({
    imageService: true,
    webAnalytics: { enabled: false },
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Allow Astro's sharp service to emit AVIF/WebP at build time.
    domains: [],
  },
  redirects: {
    '/projects': '/portfolio',
    '/leadership': '/team',
    '/fgip': '/fgip-legacy-estate',
  },
});
