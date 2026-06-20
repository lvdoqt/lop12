import { createClient } from '@supabase/supabase-js';

/** Get env var at build-time (import.meta.env) or runtime (process.env for Cloudflare Workers). */
function env(name: string): string {
  return import.meta.env[name] || (typeof process !== 'undefined' ? process.env[name] : '') || '';
}

const supabaseUrl = env('PUBLIC_SUPABASE_URL') || env('SUPABASE_URL') || '';
const supabaseAnonKey = env('PUBLIC_SUPABASE_ANON_KEY') || env('SUPABASE_ANON_KEY') || '';
const supabaseServiceKey = env('SUPABASE_SERVICE_ROLE_KEY') || '';

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
