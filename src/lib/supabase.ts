import { createClient } from '@supabase/supabase-js';

function getEnvUrl() {
  return import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || (typeof process !== 'undefined' ? (process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) : '') || '';
}

function getEnvAnonKey() {
  return import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? (process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY) : '') || '';
}

function getEnvServiceKey() {
  return import.meta.env.SUPABASE_SERVICE_ROLE_KEY || (typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY : '') || '';
}

const supabaseUrl = getEnvUrl();
const supabaseAnonKey = getEnvAnonKey();
const supabaseServiceKey = getEnvServiceKey();

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
