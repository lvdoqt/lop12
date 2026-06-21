import { createClient } from '@supabase/supabase-js';

// Prefer publicly-exposed env vars for client-side code (Astro/Vite: PUBLIC_ prefix),
// fall back to non-public names for server-side usage.
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || (typeof process !== 'undefined' ? (process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) : '') || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? (process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY) : '') || '';
// Service role key should only be provided via build/server env. Avoid `process.env` in client-bundles.
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || (typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY : '') || '';

// Detect if we should use mock data (if keys are missing or placeholder)
export const isMockMode =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('placeholder-project') ||
  supabaseAnonKey.includes('placeholder-anon-key');

if (isMockMode) {
  console.warn('⚠️ SUPABASE RUNNING IN MOCK MODE: Placeholder credentials detected. The application will use local mockup databases.');
}

// Client-side / Public Client
export const supabase = !isMockMode
  ? createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  })
  : null;

// Server-side Client Creator
export function createServerSupabase() {
  if (isMockMode) return null;

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}

// Administrative Server-side Client (bypasses RLS)
export function createAdminSupabase() {
  if (isMockMode || !supabaseServiceKey || supabaseServiceKey.includes('placeholder')) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}
