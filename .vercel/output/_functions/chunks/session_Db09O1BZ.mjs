import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/auth/session.ts
var session_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	POST: () => POST,
	prerender: () => false
});
function getCookieOptions(maxAge, isSecure) {
	return {
		path: "/",
		httpOnly: true,
		secure: isSecure,
		sameSite: "lax",
		maxAge
	};
}
var POST = async ({ request, cookies, url }) => {
	try {
		const isSecure = url.protocol === "https:";
		const body = await request.json();
		if (body.mockUserId) {
			cookies.set("mock-user-id", body.mockUserId, getCookieOptions(3600 * 24 * 7, isSecure));
			return new Response(JSON.stringify({ success: true }), { status: 200 });
		}
		const { access_token, refresh_token } = body;
		if (!access_token) return new Response(JSON.stringify({ error: "Access token is required" }), { status: 400 });
		const cookieOpts = getCookieOptions(3600 * 24 * 7, isSecure);
		cookies.set("sb-access-token", access_token, cookieOpts);
		if (refresh_token) cookies.set("sb-refresh-token", refresh_token, cookieOpts);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
var DELETE = async ({ cookies, url }) => {
	const deleteOpts = {
		...getCookieOptions(0, url.protocol === "https:"),
		maxAge: 0,
		expires: /* @__PURE__ */ new Date(0)
	};
	cookies.delete("sb-access-token", deleteOpts);
	cookies.delete("sb-refresh-token", deleteOpts);
	cookies.delete("mock-user-id", deleteOpts);
	return new Response(JSON.stringify({ success: true }), { status: 200 });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/session@_@ts
var page = () => session_exports;
//#endregion
export { page };
