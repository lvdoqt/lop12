import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Public Supabase values (not secrets — safe to commit as fallback).
// CF Pages Dashboard must also have these set as "Environment variables" (Build vars)
// so they are injected at build-time into the Vite client bundle.
// Fallback values here match wrangler.toml [vars] so local dev & CF builds both work.
const SUPABASE_URL_FALLBACK = 'https://dwezesrukmwygqnmefbz.supabase.co';
const SUPABASE_ANON_KEY_FALLBACK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw';

// https://astro.build/config
export default defineConfig({
  site: 'https://lms.lop12.com',
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    devToolbar: { enabled: false },
    // Ensure PUBLIC_ vars are embedded in the client bundle at build time.
    // process.env values come from CF Pages Dashboard "Environment variables" (Build vars).
    // The fallback guarantees the client-side Supabase client is never in mock mode on CF Pages.
    define: {
      'import.meta.env.PUBLIC_SUPABASE_URL': JSON.stringify(
        process.env.PUBLIC_SUPABASE_URL || SUPABASE_URL_FALLBACK
      ),
      'import.meta.env.PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(
        process.env.PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY_FALLBACK
      ),
    },
  }
});