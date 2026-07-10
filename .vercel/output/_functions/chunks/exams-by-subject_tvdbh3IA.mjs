import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
//#region src/pages/api/exams-by-subject.ts
var exams_by_subject_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ url }) => {
	try {
		const subjectSlug = url.searchParams.get("subject_slug");
		if (!subjectSlug) return new Response(JSON.stringify({ error: "Subject slug is required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const subject = (await db.getSubjects()).find((s) => s.slug === subjectSlug);
		if (!subject) return new Response(JSON.stringify({ error: "Subject not found" }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		const exams = await db.getExams(subject.id);
		return new Response(JSON.stringify({ exams }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/exams-by-subject@_@ts
var page = () => exams_by_subject_exports;
//#endregion
export { page };
