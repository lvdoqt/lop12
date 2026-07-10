import { createClient } from '@supabase/supabase-js';

// ── Public Supabase values (anon key — safe to commit, not a secret) ─────────
const _SUPABASE_URL_DEFAULT = 'https://dwezesrukmwygqnmefbz.supabase.co';
const _SUPABASE_ANON_KEY_DEFAULT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw';

// ── Env resolver (Node.js / Vite SSR / Vercel) ──────────────────────────────
// Variables are available via import.meta.env (injected by Vite at build time
// for PUBLIC_ vars).
export function resolveEnv(key: string): string {
  // 1. import.meta.env — works on Vite dev AND Edge/Serverless environments
  try {
    const val = (import.meta as any).env?.[key];
    if (val && val !== 'undefined') return val;
  } catch { /* not available */ }
  // 2. process.env — fallback for local Node.js dev server only
  try {
    const proc = (globalThis as Record<string, unknown>)['process'] as { env?: Record<string, string | undefined> } | undefined;
    if (proc?.env?.[key]) return proc.env[key]!;
  } catch { /* not available in some edge runtimes */ }
  return '';
}

// ── Module-level browser Supabase client ─────────────────────────────────────
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || _SUPABASE_URL_DEFAULT;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || _SUPABASE_ANON_KEY_DEFAULT;

// Always false — the hardcoded fallback guarantees we always have a real client.
export const isMockMode = false;

// Client used in browser scripts (login.astro, register.astro <script> blocks)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// ── Server-side factory functions ─────────────────────────────────────────────

/** Supabase client with anon key — for server-side requests */
export function createServerSupabase() {
  const url = resolveEnv('PUBLIC_SUPABASE_URL') || _SUPABASE_URL_DEFAULT;
  const anonKey = resolveEnv('PUBLIC_SUPABASE_ANON_KEY') || _SUPABASE_ANON_KEY_DEFAULT;

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}

/** Admin Supabase client (bypasses RLS) — uses service role key from env */
export function createAdminSupabase() {
  const url = resolveEnv('PUBLIC_SUPABASE_URL') || _SUPABASE_URL_DEFAULT;
  const anonKey = resolveEnv('PUBLIC_SUPABASE_ANON_KEY') || _SUPABASE_ANON_KEY_DEFAULT;
  const svcKey = resolveEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (!svcKey || svcKey.includes('placeholder')) {
    console.warn('[createAdminSupabase] No service role key — falling back to anon client. RLS applies.');
    return createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  }
  return createClient(url, svcKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}

/** Returns true only if both URL and anon key are missing (should never happen with fallbacks) */
export function isMockModeForEnv(): boolean {
  const url = resolveEnv('PUBLIC_SUPABASE_URL') || _SUPABASE_URL_DEFAULT;
  const key = resolveEnv('PUBLIC_SUPABASE_ANON_KEY') || _SUPABASE_ANON_KEY_DEFAULT;
  return !url || !key;
}
