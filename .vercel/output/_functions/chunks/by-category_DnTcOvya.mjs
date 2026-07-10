import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/blog/by-category.ts
var by_category_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ request }) => {
	const url = new URL(request.url);
	url.searchParams.get("cat");
	parseInt(url.searchParams.get("page") || "1", 10);
	parseInt(url.searchParams.get("per_page") || "100", 10);
	return new Response(JSON.stringify({
		posts: [],
		total: 0
	}), { headers: { "Content-Type": "application/json" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/blog/by-category@_@ts
var page = () => by_category_exports;
//#endregion
export { page };
