import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as getCollection } from "./_astro_content_CYWRd-4B.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
import { t as $$DashboardCard } from "./DashboardCard_DIGDuHWG.mjs";
//#region src/pages/admin/index.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const user = Astro.locals.user;
	if (!user || user.role !== "admin" && user.role !== "teacher") return Astro.redirect("/lms/dashboard");
	const isAdmin = user.role === "admin";
	const users = isAdmin ? await db.getUsers() : [];
	const lessons = isAdmin ? await getCollection("lessons") : [];
	const exams = await db.getExams();
	const attempts = await db.getAllAttempts();
	const myCourses = await db.getCourses({ createdBy: user.id });
	const myCoursesCount = myCourses.length;
	const myCourseLessonsCount = myCourses.reduce((sum, c) => sum + (c.lessonCount ?? 0), 0);
	(await db.getQuestions(void 0, user.id)).length;
	const studentsCount = isAdmin ? users.filter((u) => u.role === "student").length : 0;
	const teachersCount = isAdmin ? users.filter((u) => u.role === "teacher").length : 0;
	const lessonsCount = isAdmin ? lessons.length : 0;
	const examsCount = exams.length;
	const attemptsCount = attempts.length;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Quản trị hệ thống" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-8"><!-- Header --><div class="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>Hệ thống Quản Trị</h1><p class="text-sm text-gray-500 dark:text-slate-400 mt-1">Xin chào ${user.fullname}, cậu đang ở giao diện điều hành của ${user.role === "admin" ? "Quản trị viên" : "Giáo viên"}.</p></div><!-- Quick navigation buttons --><div class="flex flex-wrap gap-3">${isAdmin && renderTemplate`<a href="/lms/admin/lessons" class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold transition">Quản lý Bài học</a>`}${isAdmin && renderTemplate`<a href="/lms/admin/users" class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold transition">Quản lý Thành viên</a>`}<a href="/lms/admin/exams" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow shadow-blue-500/10">Quản lý Đề thi</a><a href="/lms/admin/courses" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow shadow-indigo-500/10">Quản lý Khóa học</a>${(user.role === "admin" || user.role === "teacher") && renderTemplate`<a href="/lms/admin/questions" class="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow shadow-violet-500/10">Ngân hàng câu hỏi</a>`}</div></div><!-- Stats Cards Grid --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Tổng số đề thi",
		"value": examsCount,
		"description": "Đề thi trắc nghiệm trên hệ thống",
		"icon": "exams",
		"color": "amber"
	})}${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Lượt làm bài",
		"value": attemptsCount,
		"description": "Học sinh hoàn thành làm bài",
		"icon": "score",
		"color": "rose"
	})}${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Khóa học của tôi",
		"value": myCoursesCount,
		"description": `${myCourseLessonsCount} bài giảng`,
		"icon": "lessons",
		"color": "purple"
	})}${isAdmin && renderTemplate`${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Tổng học sinh",
		"value": studentsCount,
		"description": "Đăng ký học trên hệ thống",
		"icon": "lessons",
		"color": "blue"
	})}`}${isAdmin && renderTemplate`${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Giáo viên",
		"value": teachersCount,
		"description": "Hỗ trợ học liệu & ra đề",
		"icon": "progress",
		"color": "purple"
	})}`}${isAdmin && renderTemplate`${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Bài học",
		"value": lessonsCount,
		"description": "Tổng số bài học đã đăng",
		"icon": "progress",
		"color": "emerald"
	})}`}</div><!-- Recent Platform Activity Attempts --><div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm"><h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Lượt làm bài gần đây của hệ thống</h2>${attempts.length === 0 ? renderTemplate`<div class="text-center py-8 text-gray-400">Chưa có dữ liệu làm bài thi nào.</div>` : renderTemplate`<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-250 dark:divide-slate-800"><thead><tr class="text-left text-xs font-bold text-gray-400 dark:text-slate-550 uppercase tracking-wider"><th class="pb-3">Học sinh</th><th class="pb-3">Đề thi</th><th class="pb-3">Điểm số</th><th class="pb-3">Thời gian nộp</th><th class="pb-3 text-right">Xem lại</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm font-medium">${attempts.slice(0, 10).map((attempt) => {
		const isFinished = attempt.finished_at !== null;
		const scoreColor = attempt.score !== null ? attempt.score >= 8 ? "text-emerald-600 dark:text-emerald-400" : attempt.score >= 5 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400" : "text-gray-400";
		return renderTemplate`<tr class="text-gray-700 dark:text-slate-350"><td class="py-4 flex items-center space-x-2"><img${addAttribute(attempt.user?.avatar_url || "", "src")} alt="avatar" class="w-6 h-6 rounded-full bg-slate-800"><span class="font-bold text-gray-950 dark:text-white">${attempt.user?.fullname || "Học Sinh ẩn danh"}</span></td><td class="py-4">${attempt.exam?.title || "Đề thi đã bị xóa"}</td><td${addAttribute(`py-4 font-extrabold ${scoreColor}`, "class")}>${attempt.score !== null ? `${attempt.score} / 10` : "Đang làm..."}</td><td class="py-4 text-gray-500 dark:text-slate-450">${isFinished ? new Date(attempt.finished_at || "").toLocaleString("vi-VN") : "--:--"}</td><td class="py-4 text-right">${isFinished && renderTemplate`<a${addAttribute(`/lms/exams/${attempt.exam_id}/result/${attempt.id}`, "href")} class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Kết quả</a>`}</td></tr>`;
	})}</tbody></table></div>`}</div>${isAdmin && renderTemplate`<div class="flex justify-end"><a href="/lms/admin/users" class="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Đi đến Quản lý tài khoản & phân quyền<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div>`}</div>` })}`;
}, "D:/lop12/src/pages/admin/index.astro", void 0);
var $$file = "D:/lop12/src/pages/admin/index.astro";
var $$url = "/lms/admin";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/index@_@astro
var page = () => admin_exports;
//#endregion
export { page };
