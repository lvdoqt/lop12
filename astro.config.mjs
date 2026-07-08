import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';


// Auto-select adapter: Node for local dev, Cloudflare for production build
const isDev = process.argv.includes('dev');

const adapter = isDev
  ? (await import('@astrojs/node')).default({ mode: 'standalone' })
  : (await import('@astrojs/cloudflare')).default();


// https://astro.build/config
export default defineConfig({
  site: 'https://lop12.com',
  base: '/lms',
  output: 'server',
  adapter,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    devToolbar: { enabled: false },
  }
});
