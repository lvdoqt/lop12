import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import { t as getCollection } from "./_astro_content_CYWRd-4B.mjs";
//#region src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var STATIC_PAGES = [
	{
		url: "/",
		changefreq: "daily",
		priority: "1.0"
	},
	{
		url: "/ly-thuyet",
		changefreq: "weekly",
		priority: "0.8"
	},
	{
		url: "/about",
		changefreq: "monthly",
		priority: "0.6"
	},
	{
		url: "/guide",
		changefreq: "monthly",
		priority: "0.6"
	},
	{
		url: "/contact",
		changefreq: "monthly",
		priority: "0.5"
	},
	{
		url: "/privacy",
		changefreq: "yearly",
		priority: "0.3"
	},
	{
		url: "/sitemap",
		changefreq: "monthly",
		priority: "0.3"
	}
];
var GET = async ({ request }) => {
	const origin = new URL(request.url).origin;
	const [subjects, exams, lessonEntries] = await Promise.all([
		db.getSubjects(),
		db.getExams(),
		getCollection("lessons")
	]);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const urls = [];
	for (const page of STATIC_PAGES) urls.push(`
  <url>
    <loc>${origin}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
	for (const subject of subjects) urls.push(`
  <url>
    <loc>${origin}/ly-thuyet/${subject.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>`);
	for (const entry of lessonEntries) {
		const slug = entry.id.split("/").pop() || entry.id;
		const lastmod = entry.data.created_at ? new Date(entry.data.created_at).toISOString() : now;
		urls.push(`
  <url>
    <loc>${origin}/${entry.data.subject}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`);
	}
	for (const exam of exams) {
		const lastmod = exam.created_at ? new Date(exam.created_at).toISOString() : now;
		urls.push(`
  <url>
    <loc>${origin}/exams/${exam.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.65</priority>
  </url>`);
	}
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>${urls.join("")}
</urlset>`;
	return new Response(xml, {
		status: 200,
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap.xml@_@ts
var page = () => sitemap_xml_exports;
//#endregion
export { page };
