import { I as sequence, K as defineMiddleware } from "./chunks/render_FJwdtmM0.mjs";
import { n as createServerSupabase, t as createAdminSupabase } from "./chunks/supabase_Dc0ZEBVu.mjs";
import { t as db } from "./chunks/db_ugDz1A2K.mjs";
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(defineMiddleware(async (context, next) => {
	const url = new URL(context.url);
	const path = url.pathname;
	context.locals.user = null;
	const mockUserId = context.cookies.get("mock-user-id")?.value;
	if (mockUserId) {
		const user = await db.getUserById(mockUserId);
		if (user) context.locals.user = user;
	}
	if (!context.locals.user) {
		const accessToken = context.cookies.get("sb-access-token")?.value;
		const refreshToken = context.cookies.get("sb-refresh-token")?.value;
		if (accessToken) {
			const supabaseAuth = createServerSupabase();
			const supabaseAdmin = createAdminSupabase();
			try {
				const { data: { user }, error: userError } = await supabaseAuth.auth.getUser(accessToken);
				if (!userError && user) {
					const { data: profile, error: profileError } = await supabaseAdmin.from("users").select("*").eq("id", user.id).single();
					if (profile && !profileError) context.locals.user = profile;
					else {
						const metaRole = user.user_metadata?.role;
						const validRoles = [
							"admin",
							"teacher",
							"student"
						];
						context.locals.user = {
							id: user.id,
							email: user.email || "",
							fullname: user.user_metadata?.fullname || user.user_metadata?.full_name || user.email?.split("@")[0] || "Học Sinh",
							avatar_url: user.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/adventurer/svg?seed=default",
							role: validRoles.includes(metaRole) ? metaRole : "student",
							created_at: (/* @__PURE__ */ new Date()).toISOString()
						};
					}
				} else if (userError && refreshToken) {
					const { data: refreshData, error: refreshError } = await supabaseAuth.auth.refreshSession({ refresh_token: refreshToken });
					if (!refreshError && refreshData.session && refreshData.user) {
						const { data: profile } = await supabaseAdmin.from("users").select("*").eq("id", refreshData.user.id).single();
						const metaRole = refreshData.user.user_metadata?.role;
						const validRoles = [
							"admin",
							"teacher",
							"student"
						];
						context.locals.user = profile || {
							id: refreshData.user.id,
							email: refreshData.user.email || "",
							fullname: refreshData.user.user_metadata?.fullname || refreshData.user.email?.split("@")[0] || "Học Sinh",
							avatar_url: refreshData.user.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/adventurer/svg?seed=default",
							role: validRoles.includes(metaRole) ? metaRole : "student",
							created_at: (/* @__PURE__ */ new Date()).toISOString()
						};
						const cookieOpts = {
							path: "/",
							httpOnly: true,
							secure: url.protocol === "https:",
							sameSite: "lax",
							maxAge: 3600 * 24 * 7
						};
						context.cookies.set("sb-access-token", refreshData.session.access_token, cookieOpts);
						context.cookies.set("sb-refresh-token", refreshData.session.refresh_token, cookieOpts);
					}
				}
			} catch (e) {
				console.error("Middleware auth check failed:", e);
			}
		}
	}
	const user = context.locals.user;
	const isAuthPage = path === "/lms/login" || path === "/lms/register" || path === "/lms/forgot-password" || path === "/lms/reset-password";
	path.startsWith("/lms/ly-thuyet") || /^\/lms\/[a-z0-9-]+-12\/[a-z0-9-]+$/.test(path);
	const examPathSegments = path.replace(/^\/lms/, "").split("/").filter((s) => s.length > 0);
	const isExamInfoPage = examPathSegments.length === 2 && examPathSegments[0] === "exams";
	const isProtectedRoute = path.startsWith("/lms/dashboard") || path.startsWith("/lms/profile");
	const isAdminRoute = path.startsWith("/lms/admin");
	const isApiRoute = path.startsWith("/lms/api");
	if (user) {
		if (isAuthPage) return context.redirect("/lms/dashboard");
		if (isAdminRoute && user.role !== "admin" && user.role !== "teacher") return context.redirect("/lms/dashboard");
	} else if (isProtectedRoute || isAdminRoute) return context.redirect("/lms/login");
	const response = await next();
	if (context.request.method === "GET" && response.status < 400) {
		if (isApiRoute) {
			response.headers.set("Cache-Control", "private, no-store");
			return response;
		}
		if (isAdminRoute || isProtectedRoute) {
			response.headers.set("Cache-Control", "private, no-store");
			return response;
		}
		if (isAuthPage) {
			response.headers.set("Cache-Control", "private, no-store");
			return response;
		}
		if (user) {
			response.headers.set("Cache-Control", "private, no-store");
			return response;
		}
		const strippedPath = path.replace(/^\/lms/, "") || "/";
		if (strippedPath === "/" || strippedPath === "") response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400");
		else if (strippedPath.startsWith("/ly-thuyet/") || /^\/[a-z0-9-]+-12\/[a-z0-9-]+$/.test(strippedPath)) response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400");
		else if (isExamInfoPage) response.headers.set("Cache-Control", "public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400");
		else if ([
			"/about",
			"/guide",
			"/privacy",
			"/contact",
			"/sitemap"
		].includes(strippedPath)) response.headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000");
	}
	return response;
}));
//#endregion
export { onRequest };
