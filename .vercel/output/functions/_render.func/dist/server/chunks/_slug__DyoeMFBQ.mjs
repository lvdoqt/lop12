import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/khoa-hoc/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	if (!slug) return Astro.redirect("/lms/khoa-hoc");
	const user = Astro.locals.user;
	const course = await db.getCourseBySlug(slug);
	if (!course || !course.is_published) return Astro.redirect("/lms/khoa-hoc");
	const publishedLessons = (await db.getCourseLessons(course.id)).filter((l) => l.is_published);
	let isEnrolled = false;
	let completedIds = /* @__PURE__ */ new Set();
	if (user) {
		isEnrolled = await db.isUserEnrolled(course.id, user.id);
		if (isEnrolled) (await db.getLessonProgress(user.id, course.id)).filter((p) => p.completed).forEach((p) => completedIds.add(p.lesson_id));
	}
	const progressPct = publishedLessons.length > 0 ? Math.round(completedIds.size / publishedLessons.length * 100) : 0;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": course.title,
		"description": course.description || void 0
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-4xl mx-auto space-y-8"><!-- Back --><a href="/lms/khoa-hoc" class="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>Tất cả khóa học</a><!-- Course Header --><div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden"><div class="absolute inset-0 opacity-10"><svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none"><circle cx="80" cy="20" r="30" fill="currentColor"></circle><circle cx="10" cy="80" r="25" fill="currentColor"></circle></svg></div><div class="relative">${course.subject && renderTemplate`<span class="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">${course.subject.name}</span>`}<h1 class="text-2xl md:text-3xl font-extrabold leading-tight mb-3">${course.title}</h1>${course.description && renderTemplate`<p class="text-white/80 text-sm leading-relaxed max-w-2xl">${course.description}</p>`}<div class="flex items-center gap-6 mt-5 text-sm text-white/70"><span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>${publishedLessons.length} bài giảng</span>${isEnrolled && renderTemplate`<span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${completedIds.size}/${publishedLessons.length} đã học</span>`}</div></div></div><!-- Progress bar (if enrolled) -->${isEnrolled && renderTemplate`<div class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5"><div class="flex items-center justify-between mb-2"><p class="text-sm font-bold text-gray-700 dark:text-slate-200">Tiến độ học tập</p><span class="text-sm font-bold text-blue-600 dark:text-blue-400">${progressPct}%</span></div><div class="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2.5"><div class="bg-blue-600 h-2.5 rounded-full transition-all duration-500"${addAttribute(`width: ${progressPct}%`, "style")}></div></div></div>`}<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><!-- Lessons list --><div class="lg:col-span-2"><div class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden"><div class="px-5 py-4 border-b border-gray-100 dark:border-slate-800"><h2 class="font-bold text-gray-900 dark:text-white">Danh sách bài giảng</h2></div><div class="divide-y divide-gray-100 dark:divide-slate-800">${publishedLessons.map((lesson, idx) => {
		const done = completedIds.has(lesson.id);
		const canAccess = isEnrolled;
		return renderTemplate`<div${addAttribute(`flex items-center gap-4 px-5 py-4 transition ${canAccess ? "hover:bg-gray-50 dark:hover:bg-slate-800/50" : "opacity-70"}`, "class")}><!-- Status icon --><div${addAttribute(`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-gray-100 dark:bg-slate-800 text-gray-400"}`, "class")}>${done ? renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>` : renderTemplate`<span class="text-xs font-bold">${idx + 1}</span>`}</div><div class="flex-1 min-w-0"><p${addAttribute(`text-sm font-semibold truncate ${done ? "text-emerald-700 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`, "class")}>${lesson.title}</p><div class="flex items-center gap-3 mt-0.5 text-xs text-gray-400 dark:text-slate-500">${lesson.duration && renderTemplate`<span>${lesson.duration} phút</span>`}${lesson.video_url && renderTemplate`<span class="text-blue-400">▶ Video</span>`}</div></div>${canAccess ? renderTemplate`<a${addAttribute(`/lms/khoa-hoc/${slug}/${lesson.id}`, "href")}${addAttribute(`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${done ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100" : "bg-blue-600 text-white hover:bg-blue-700"}`, "class")}>${done ? "Xem lại" : "Học ngay"}</a>` : renderTemplate`<span class="shrink-0 text-xs text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></span>`}</div>`;
	})}</div></div></div><!-- Enrollment sidebar --><div class="space-y-4"><div class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 sticky top-24">${isEnrolled ? renderTemplate`<div class="text-center"><div class="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-3"><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><p class="font-bold text-gray-900 dark:text-white mb-1">Bạn đã đăng ký</p><p class="text-sm text-gray-500 dark:text-slate-400 mb-4">Tiếp tục học từ bài chưa hoàn thành.</p>${publishedLessons.length > 0 && renderTemplate`<a${addAttribute(`/lms/khoa-hoc/${slug}/${publishedLessons.find((l) => !completedIds.has(l.id))?.id || publishedLessons[0].id}`, "href")} class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm text-center transition">Tiếp tục học →</a>`}</div>` : user ? renderTemplate`<div class="text-center"><div class="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3"><svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></div><p class="font-bold text-gray-900 dark:text-white mb-1">Đăng ký miễn phí</p><p class="text-sm text-gray-500 dark:text-slate-400 mb-4">Học toàn bộ ${publishedLessons.length} bài giảng.</p><button id="enroll-btn"${addAttribute(course.id, "data-course-id")} class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm text-center transition">Đăng ký học ngay</button></div>` : renderTemplate`<div class="text-center"><p class="font-bold text-gray-900 dark:text-white mb-2">Đăng nhập để học</p><p class="text-sm text-gray-500 dark:text-slate-400 mb-4">Bạn cần đăng nhập để đăng ký và theo dõi tiến độ học.</p><a href="/lms/login" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm text-center transition">Đăng nhập ngay</a></div>`}</div></div></div></div>` })}<script lang="ts">
  const enrollBtn = document.getElementById('enroll-btn') as HTMLButtonElement | null;
  if (enrollBtn) {
    enrollBtn.addEventListener('click', async () => {
      const courseId = enrollBtn.dataset.courseId!;
      enrollBtn.disabled = true;
      enrollBtn.textContent = 'Đang đăng ký...';
      try {
        const res = await fetch('/lms/api/courses/enroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId })
        });
        if (res.ok) {
          window.location.reload();
        } else {
          const data = await res.json();
          alert(data.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
          enrollBtn.disabled = false;
          enrollBtn.textContent = 'Đăng ký học ngay';
        }
      } catch {
        alert('Không thể kết nối. Vui lòng thử lại.');
        enrollBtn.disabled = false;
        enrollBtn.textContent = 'Đăng ký học ngay';
      }
    });
  }
<\/script>`;
}, "D:/lop12/src/pages/khoa-hoc/[slug].astro", void 0);
var $$file = "D:/lop12/src/pages/khoa-hoc/[slug].astro";
var $$url = "/lms/khoa-hoc/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/khoa-hoc/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
