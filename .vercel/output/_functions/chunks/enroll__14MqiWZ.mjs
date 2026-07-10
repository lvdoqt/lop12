import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
//#region src/pages/api/courses/enroll.ts
var enroll_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { courseId } = await request.json();
		if (!courseId) return new Response(JSON.stringify({ error: "Missing courseId" }), { status: 400 });
		const course = await db.getCourseById(courseId);
		if (!course || !course.is_published) return new Response(JSON.stringify({ error: "Course not found or not published" }), { status: 404 });
		const enrollment = await db.enrollUserInCourse(courseId, user.id);
		return new Response(JSON.stringify({
			success: true,
			enrollment
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/courses/enroll@_@ts
var page = () => enroll_exports;
//#endregion
export { page };
