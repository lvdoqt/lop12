import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
//#region src/pages/api/courses/progress.ts
var progress_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, locals }) => {
	const user = locals.user;
	if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { lessonId } = await request.json();
		if (!lessonId) return new Response(JSON.stringify({ error: "Missing lessonId" }), { status: 400 });
		const lesson = await db.getCourseLessonById(lessonId);
		if (!lesson) return new Response(JSON.stringify({ error: "Lesson not found" }), { status: 404 });
		if (!await db.isUserEnrolled(lesson.course_id, user.id)) return new Response(JSON.stringify({ error: "User not enrolled in this course" }), { status: 403 });
		const progress = await db.markLessonComplete(lessonId, user.id);
		return new Response(JSON.stringify({
			success: true,
			progress
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/courses/progress@_@ts
var page = () => progress_exports;
//#endregion
export { page };
