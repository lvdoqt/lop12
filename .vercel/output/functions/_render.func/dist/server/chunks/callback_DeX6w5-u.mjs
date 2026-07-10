import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as resolveEnv } from "./supabase_Dc0ZEBVu.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/auth/callback.ts
var callback_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var _SUPABASE_URL_DEFAULT = "https://dwezesrukmwygqnmefbz.supabase.co";
var _SUPABASE_ANON_KEY_DEFAULT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw";
function getCookieOptions(maxAge, isSecure) {
	return {
		path: "/",
		httpOnly: true,
		secure: isSecure,
		sameSite: "lax",
		maxAge
	};
}
/**
* OAuth Callback Handler
* 
* Supabase redirects here after Google OAuth.
* URL contains ?code=... which we exchange for a session.
*/
var GET = async (context) => {
	const { url, cookies, redirect } = context;
	const code = url.searchParams.get("code");
	const error = url.searchParams.get("error");
	const errorDescription = url.searchParams.get("error_description");
	if (error) return redirect(`/lms/login?${new URLSearchParams({
		error,
		error_description: errorDescription || ""
	}).toString()}`);
	if (!code) return redirect("/lms/login?error=missing_code&error_description=Thiếu mã xác thực từ Google.");
	const supabaseUrl = resolveEnv("PUBLIC_SUPABASE_URL") || _SUPABASE_URL_DEFAULT;
	const supabaseAnonKey = resolveEnv("PUBLIC_SUPABASE_ANON_KEY") || _SUPABASE_ANON_KEY_DEFAULT;
	if (!supabaseUrl || !supabaseAnonKey) return redirect("/lms/login?error=config_error&error_description=Cấu hình máy chủ không hợp lệ.");
	try {
		const { data, error: exchangeError } = await createClient(supabaseUrl, supabaseAnonKey, { auth: {
			persistSession: false,
			autoRefreshToken: false
		} }).auth.exchangeCodeForSession(code);
		if (exchangeError || !data?.session) {
			const msg = exchangeError?.message || "Không thể xác thực với Google.";
			return redirect(`/lms/login?error=auth_error&error_description=${encodeURIComponent(msg)}`);
		}
		const cookieOpts = getCookieOptions(3600 * 24 * 7, url.protocol === "https:");
		cookies.set("sb-access-token", data.session.access_token, cookieOpts);
		if (data.session.refresh_token) cookies.set("sb-refresh-token", data.session.refresh_token, cookieOpts);
		return redirect("/lms/dashboard");
	} catch (err) {
		const msg = err?.message || "Đã xảy ra lỗi không mong muốn.";
		return redirect(`/lms/login?error=server_error&error_description=${encodeURIComponent(msg)}`);
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/callback@_@ts
var page = () => callback_exports;
//#endregion
export { page };
