import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/test-login.ts
var test_login_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url, cookies, redirect }) => {
	const id = url.searchParams.get("id") || "5deefd02-f4c0-435e-af5e-8acce5540d44";
	cookies.set("mock-user-id", id, { path: "/" });
	return redirect("/lms/dashboard");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/test-login@_@ts
var page = () => test_login_exports;
//#endregion
export { page };
