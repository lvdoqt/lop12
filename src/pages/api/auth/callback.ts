import type { APIRoute } from 'astro';

export const prerender = false;
import { createClient } from '@supabase/supabase-js';

function getCookieOptions(maxAge: number) {
  const isProd = import.meta.env.PROD;
  return {
    path: '/',
    httpOnly: true,
    secure: isProd,
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
export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // Handle OAuth error from provider
  if (error) {
    const params = new URLSearchParams({ error, error_description: errorDescription || '' });
    return redirect(`/login?${params.toString()}`);
  }

  if (!code) {
    return redirect('/login?error=missing_code&error_description=Thiếu mã xác thực từ Google.');
  }

  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return redirect('/login?error=config_error&error_description=Cấu hình máy chủ không hợp lệ.');
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    // Exchange authorization code for session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError || !data?.session) {
      const msg = exchangeError?.message || 'Không thể xác thực với Google.';
      return redirect(`/login?error=auth_error&error_description=${encodeURIComponent(msg)}`);
    }

    // Set session cookies on the redirect response
    const cookieOpts = getCookieOptions(60 * 60 * 24 * 7);
    
    cookies.set('sb-access-token', data.session.access_token, cookieOpts);
    if (data.session.refresh_token) {
      cookies.set('sb-refresh-token', data.session.refresh_token, cookieOpts);
    }

    return redirect('/dashboard');
  } catch (err: any) {
    const msg = err?.message || 'Đã xảy ra lỗi không mong muốn.';
    return redirect(`/login?error=server_error&error_description=${encodeURIComponent(msg)}`);
  }
};
