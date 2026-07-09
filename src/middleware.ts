import { defineMiddleware } from 'astro:middleware';
import { isMockModeForEnv, createServerSupabase } from './lib/supabase';
import { db } from './services/db';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.url);
  const path = url.pathname;

  // Initialize locals
  context.locals.user = null;

  const mockUserId = context.cookies.get('mock-user-id')?.value;
  if (mockUserId) {
    const user = await db.getUserById(mockUserId);
    if (user) {
      context.locals.user = user;
    }
  }

  if (!context.locals.user) {
    // Verify session cookies with Supabase
    const accessToken = context.cookies.get('sb-access-token')?.value;
    const refreshToken = context.cookies.get('sb-refresh-token')?.value;

    console.log('[middleware] accessToken present:', !!accessToken);

    if (accessToken) {
      const supabaseServer = createServerSupabase();
      try {
        // Set session from cookies - this also handles token refresh automatically
        const { data: { session }, error: sessionError } = await supabaseServer.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        });

        console.log('[middleware] setSession error:', sessionError?.message, '| user:', session?.user?.email);
        
        if (!sessionError && session?.user) {
          const { data: profile, error: profileError } = await supabaseServer
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          console.log('[middleware] profile error:', profileError?.message, '| profile:', profile?.email);

          if (profile && !profileError) {
            context.locals.user = profile;
          } else {
            // Graceful fallback profile
            context.locals.user = {
              id: session.user.id,
              email: session.user.email || '',
              fullname: session.user.user_metadata?.fullname || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Học Sinh',
              avatar_url: session.user.user_metadata?.avatar_url || 'https://api.dicebear.com/7.x/adventurer/svg?seed=default',
              role: 'student',
              created_at: new Date().toISOString(),
            };
          }
        }
      } catch (e) {
        console.error('Middleware auth check failed:', e);
      }
    }
  }


  const user = context.locals.user;

  // ============================================================
  // ACCESS CONTROL RULES
  // ============================================================

  // Auth pages (redirect to dashboard if already logged in)
  const isAuthPage = path === '/lms/login' || path === '/lms/register' || path === '/lms/forgot-password' || path === '/lms/reset-password';

  // PUBLIC pages - no login needed
  const isPublicContent =
    path.startsWith('/lms/ly-thuyet') ||
    /^\/lms\/[a-z0-9-]+-12\/[a-z0-9-]+$/.test(path) || // e.g., /lms/toan-12/bai-1
    path === '/lms' ||
    path === '/lms/';

  // Exam info page is public (e.g. /lms/exams/exam-1 but NOT /lms/exams/exam-1/take or /lms/exams/exam-1/result/...)
  const examPathSegments = path.replace(/^\/lms/, '').split('/').filter(s => s.length > 0); // ['exams', 'exam-1'] or ['exams','exam-1','take']
  const isExamInfoPage = examPathSegments.length === 2 && examPathSegments[0] === 'exams';

  // LOGIN-REQUIRED pages
  const isProtectedRoute =
    path.startsWith('/lms/dashboard') ||
    path.startsWith('/lms/profile');

  const isAdminRoute = path.startsWith('/lms/admin');
  const isApiRoute = path.startsWith('/lms/api');

  // ============================================================
  // REDIRECTIONS
  // ============================================================
  if (user) {
    // Logged-in user trying to access login/register → send to dashboard
    if (isAuthPage) {
      return context.redirect('/lms/dashboard');
    }
    // Admin-only route check
    if (isAdminRoute && user.role !== 'admin' && user.role !== 'teacher') {
      return context.redirect('/lms/dashboard');
    }
  } else {
    // Guest user trying to access protected route → send to login
    if (isProtectedRoute || isAdminRoute) {
      return context.redirect('/lms/login');
    }
  }

  // ============================================================
  // EXECUTE REQUEST
  // ============================================================
  const response = await next();

  // ============================================================
  // CACHE HEADERS (chỉ áp dụng cho GET requests thành công)
  // ============================================================
  if (context.request.method === 'GET' && response.status < 400) {

    // API routes — không cache, private
    if (isApiRoute) {
      response.headers.set('Cache-Control', 'private, no-store');
      return response;
    }

    // Admin & protected routes — không cache
    if (isAdminRoute || isProtectedRoute) {
      response.headers.set('Cache-Control', 'private, no-store');
      return response;
    }

    // Auth pages (login, register...) — không cache
    if (isAuthPage) {
      response.headers.set('Cache-Control', 'private, no-store');
      return response;
    }

    // Nếu user đã đăng nhập → không cache (response cá nhân hoá)
    if (user) {
      response.headers.set('Cache-Control', 'private, no-store');
      return response;
    }

    // ── Public static-ish pages ─────────────────────────────────────────────
    const strippedPath = path.replace(/^\/lms/, '') || '/';

    // Trang chủ: 1h browser, 2h CDN, stale 24h
    if (strippedPath === '/' || strippedPath === '') {
      response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400');
    }
    // Môn học & Bài học: 1h browser, 24h CDN
    else if (strippedPath.startsWith('/ly-thuyet/') || /^\/[a-z0-9-]+-12\/[a-z0-9-]+$/.test(strippedPath)) {
      response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400');
    }
    // Trang đề thi info (public): 30m browser, 1h CDN
    else if (isExamInfoPage) {
      response.headers.set('Cache-Control', 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400');
    }
    // Trang tĩnh: about, guide, privacy, contact, sitemap — 24h browser, 7 ngày CDN
    else if (['/about', '/guide', '/privacy', '/contact', '/sitemap'].includes(strippedPath)) {
      response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000');
    }
  }

  return response;
});