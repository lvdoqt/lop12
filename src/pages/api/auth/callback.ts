import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { resolveEnv } from '../../../lib/supabase';

export const prerender = false;

const _SUPABASE_URL_DEFAULT = 'https://dwezesrukmwygqnmefbz.supabase.co';
const _SUPABASE_ANON_KEY_DEFAULT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw';

function getCookieOptions(maxAge: number, isSecure: boolean) {
  return {
    path: '/',
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax' as const,
    maxAge,
  };
}

/**
 * OAuth Callback Handler
 * 
 * Supabase redirects here after Google OAuth.
 * URL contains ?code=... which we exchange for a session.
 */
export const GET: APIRoute = async (context) => {
  const { url, cookies, redirect } = context;
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // Handle OAuth error from provider
  if (error) {
    const params = new URLSearchParams({ error, error_description: errorDescription || '' });
    return redirect(`/lms/login?${params.toString()}`);
  }

  if (!code) {
    return redirect('/lms/login?error=missing_code&error_description=Thiếu mã xác thực từ Google.');
  }

  // Read env from process.env / import.meta.env (Node.js SSR)
  const supabaseUrl = resolveEnv('PUBLIC_SUPABASE_URL') || _SUPABASE_URL_DEFAULT;
  const supabaseAnonKey = resolveEnv('PUBLIC_SUPABASE_ANON_KEY') || _SUPABASE_ANON_KEY_DEFAULT;

  if (!supabaseUrl || !supabaseAnonKey) {
    return redirect('/lms/login?error=config_error&error_description=Cấu hình máy chủ không hợp lệ.');
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    // Exchange authorization code for session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError || !data?.session) {
      const msg = exchangeError?.message || 'Không thể xác thực với Google.';
      return redirect(`/lms/login?error=auth_error&error_description=${encodeURIComponent(msg)}`);
    }

    // Set session cookies on the redirect response
    const isSecure = url.protocol === 'https:';
    const cookieOpts = getCookieOptions(60 * 60 * 24 * 7, isSecure);
    
    cookies.set('sb-access-token', data.session.access_token, cookieOpts);
    if (data.session.refresh_token) {
      cookies.set('sb-refresh-token', data.session.refresh_token, cookieOpts);
    }

    return redirect('/lms/dashboard');
  } catch (err: any) {
    const msg = err?.message || 'Đã xảy ra lỗi không mong muốn.';
    return redirect(`/lms/login?error=server_error&error_description=${encodeURIComponent(msg)}`);
  }
};
