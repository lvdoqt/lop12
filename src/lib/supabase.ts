import { createClient } from '@supabase/supabase-js';

// ── Env var resolution ──────────────────────────────────────────────────────
// Priority:
//  1. Cloudflare Workers runtime env (passed via runtimeEnv from middleware)
//  2. import.meta.env — Vite build-time injection (works in local dev)
//  3. process.env — Node.js / nodejs_compat fallback

/** Read an env var from all available sources */
export function resolveEnv(key: string, runtimeEnv?: Record<string, string | undefined>): string {
  // 1. Cloudflare runtime env (highest priority — correct for CF Pages)
  if (runtimeEnv && runtimeEnv[key]) return runtimeEnv[key]!;
  // 2. Vite build-time injection (works in local dev)
  const fromMeta = (import.meta.env as Record<string, string | undefined>)[key];
  if (fromMeta) return fromMeta;
  // 3. Node.js process.env (nodejs_compat fallback)
  // Use globalThis to avoid TypeScript errors in non-Node environments
  const proc = (globalThis as Record<string, unknown>)['process'] as { env?: Record<string, string | undefined> } | undefined;
  if (proc?.env?.[key]) return proc.env[key]!;
  return '';
}

// ── Static module-level clients (for local dev / build-time resolution) ─────
// On Cloudflare Pages, these will be in mock mode unless you also set vars
// in the CF Dashboard as "Build variables" (which is not recommended for secrets).
// Server-side pages should use createAdminSupabaseFromEnv(runtimeEnv) instead.
const supabaseUrl      = resolveEnv('PUBLIC_SUPABASE_URL');
const supabaseAnonKey  = resolveEnv('PUBLIC_SUPABASE_ANON_KEY');
const supabaseServiceKey = resolveEnv('SUPABASE_SERVICE_ROLE_KEY');

// Detect if we should use mock data (if keys are missing or placeholder)
export const isMockMode = !supabaseUrl || !supabaseAnonKey;

if (isMockMode) {
  console.warn('⚠️ SUPABASE RUNNING IN MOCK MODE — env keys missing from import.meta.env and process.env. Will retry with Cloudflare runtime.env per-request.');
}

// Client-side / Public Client (browser)
export const supabase = !isMockMode
  ? createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  })
  : null;

// ── Runtime-aware factory functions (use these in SSR pages on Cloudflare) ──

/** Create a Supabase client using anon key, resolving env from Cloudflare runtime */
export function createServerSupabase(runtimeEnv?: Record<string, string | undefined>) {
  const url = resolveEnv('PUBLIC_SUPABASE_URL', runtimeEnv);
  const anonKey = resolveEnv('PUBLIC_SUPABASE_ANON_KEY', runtimeEnv);
  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}

/** Create an admin Supabase client (bypasses RLS), resolving env from Cloudflare runtime */
export function createAdminSupabase(runtimeEnv?: Record<string, string | undefined>) {
  const url = resolveEnv('PUBLIC_SUPABASE_URL', runtimeEnv);
  const anonKey = resolveEnv('PUBLIC_SUPABASE_ANON_KEY', runtimeEnv);
  const svcKey = resolveEnv('SUPABASE_SERVICE_ROLE_KEY', runtimeEnv);
  if (!url || !anonKey) return null; // can't do anything without URL + anon
  if (!svcKey || svcKey.includes('placeholder')) {
    // Fall back to anon client with a warning (read-only public data will still work)
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

/** Helper: is mock mode given a specific runtime env? */
export function isMockModeForEnv(runtimeEnv?: Record<string, string | undefined>): boolean {
  const url = resolveEnv('PUBLIC_SUPABASE_URL', runtimeEnv);
  const key = resolveEnv('PUBLIC_SUPABASE_ANON_KEY', runtimeEnv);
  return !url || !key;
}
