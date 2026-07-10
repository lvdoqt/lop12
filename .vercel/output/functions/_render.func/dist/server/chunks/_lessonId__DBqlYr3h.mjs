import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as unescapeHTML, C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent, x as Fragment } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
import { marked } from "marked";
//#region src/pages/khoa-hoc/[slug]/[lessonId].astro
var _lessonId__exports = /* @__PURE__ */ __exportAll({
	default: () => $$LessonId,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$LessonId = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LessonId;
	const user = Astro.locals.user;
	if (!user) return Astro.redirect("/lms/login");
	const { slug, lessonId } = Astro.params;
	if (!slug || !lessonId) return Astro.redirect("/lms/khoa-hoc");
	const course = await db.getCourseBySlug(slug);
	if (!course || !course.is_published) return Astro.redirect("/lms/khoa-hoc");
	if (!await db.isUserEnrolled(course.id, user.id)) return Astro.redirect(`/lms/khoa-hoc/${slug}`);
	const publishedLessons = (await db.getCourseLessons(course.id)).filter((l) => l.is_published);
	const currentLesson = publishedLessons.find((l) => l.id === lessonId);
	if (!currentLesson) return Astro.redirect(`/lms/khoa-hoc/${slug}`);
	const currentIndex = publishedLessons.findIndex((l) => l.id === lessonId);
	const prevLesson = currentIndex > 0 ? publishedLessons[currentIndex - 1] : null;
	const nextLesson = currentIndex < publishedLessons.length - 1 ? publishedLessons[currentIndex + 1] : null;
	const htmlContent = currentLesson.content ? marked.parse(currentLesson.content) : "";
	const progress = await db.getLessonProgress(user.id, course.id);
	const completedIds = new Set(progress.filter((p) => p.completed).map((p) => p.lesson_id));
	const isCompleted = completedIds.has(lessonId);
	function getYouTubeId(url) {
		const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
		return match && match[2].length === 11 ? match[2] : null;
	}
	const ytId = currentLesson.video_url ? getYouTubeId(currentLesson.video_url) : null;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${currentLesson.title} - ${course.title}`,
		"data-astro-cid-iskcshuh": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto" data-astro-cid-iskcshuh><!-- Main Content Area --><div class="flex-1 min-w-0" data-astro-cid-iskcshuh><!-- Breadcrumb --><nav class="flex items-center text-sm font-medium text-gray-500 dark:text-slate-400 mb-4 whitespace-nowrap overflow-x-auto pb-2" data-astro-cid-iskcshuh><a href="/lms/khoa-hoc" class="hover:text-blue-600 dark:hover:text-blue-400 transition" data-astro-cid-iskcshuh>Khóa học</a><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 text-gray-300 dark:text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-iskcshuh><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-iskcshuh></path></svg><a${addAttribute(`/lms/khoa-hoc/${slug}`, "href")} class="hover:text-blue-600 dark:hover:text-blue-400 transition truncate max-w-[150px] sm:max-w-xs" data-astro-cid-iskcshuh>${course.title}</a><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 text-gray-300 dark:text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-iskcshuh><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-iskcshuh></path></svg><span class="text-gray-900 dark:text-white truncate" data-astro-cid-iskcshuh>Bài ${currentIndex + 1}</span></nav><div class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm" data-astro-cid-iskcshuh><!-- Video Player -->${ytId && renderTemplate`<div class="aspect-w-16 aspect-h-9 bg-black" data-astro-cid-iskcshuh><iframe${addAttribute(`https://www.youtube.com/embed/${ytId}?rel=0`, "src")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="w-full h-full" data-astro-cid-iskcshuh></iframe></div>`}<div class="p-6 md:p-8" data-astro-cid-iskcshuh><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4" data-astro-cid-iskcshuh>${currentLesson.title}</h1><div class="prose prose-blue dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400" data-astro-cid-iskcshuh>${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(htmlContent)}` })}</div><div class="mt-10 pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4" data-astro-cid-iskcshuh><div class="w-full sm:w-auto" data-astro-cid-iskcshuh>${prevLesson ? renderTemplate`<a${addAttribute(`/lms/khoa-hoc/${slug}/${prevLesson.id}`, "href")} class="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition" data-astro-cid-iskcshuh><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-iskcshuh><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" data-astro-cid-iskcshuh></path></svg>Bài trước</a>` : renderTemplate`<div data-astro-cid-iskcshuh></div>`}</div><div class="w-full sm:w-auto flex flex-col sm:flex-row gap-3" data-astro-cid-iskcshuh><button id="mark-complete-btn"${addAttribute(currentLesson.id, "data-lesson-id")}${addAttribute(isCompleted, "disabled")}${addAttribute(`inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold transition ${isCompleted ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 cursor-default" : "bg-blue-600 hover:bg-blue-700 text-white shadow shadow-blue-500/20"}`, "class")} data-astro-cid-iskcshuh>${isCompleted ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-iskcshuh><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-astro-cid-iskcshuh></path></svg>Đã hoàn thành` })}` : "Đánh dấu hoàn thành"}</button>${nextLesson && renderTemplate`<a${addAttribute(`/lms/khoa-hoc/${slug}/${nextLesson.id}`, "href")} class="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition" data-astro-cid-iskcshuh>Bài tiếp theo<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-iskcshuh><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" data-astro-cid-iskcshuh></path></svg></a>`}</div></div></div></div></div><!-- Sidebar Playlist --><div class="w-full lg:w-80 shrink-0" data-astro-cid-iskcshuh><div class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden sticky top-24" data-astro-cid-iskcshuh><div class="p-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/20" data-astro-cid-iskcshuh><h3 class="font-bold text-gray-900 dark:text-white" data-astro-cid-iskcshuh>Nội dung khóa học</h3><div class="mt-2 w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5" data-astro-cid-iskcshuh><div class="bg-emerald-500 h-1.5 rounded-full transition-all"${addAttribute(`width: ${Math.round(completedIds.size / publishedLessons.length * 100)}%`, "style")} data-astro-cid-iskcshuh></div></div><p class="text-xs text-gray-500 mt-1.5" data-astro-cid-iskcshuh>${completedIds.size}/${publishedLessons.length} bài hoàn thành</p></div><div class="max-h-[calc(100vh-250px)] overflow-y-auto" data-astro-cid-iskcshuh>${publishedLessons.map((lesson, idx) => {
		const isCurrent = lesson.id === lessonId;
		const done = completedIds.has(lesson.id);
		return renderTemplate`<a${addAttribute(`/lms/khoa-hoc/${slug}/${lesson.id}`, "href")}${addAttribute(`flex items-start gap-3 p-3 transition border-l-2 ${isCurrent ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-600 dark:border-blue-500" : "border-transparent hover:bg-gray-50 dark:hover:bg-slate-800/50"}`, "class")} data-astro-cid-iskcshuh><div class="mt-0.5 shrink-0" data-astro-cid-iskcshuh>${done ? renderTemplate`<div class="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center" data-astro-cid-iskcshuh><svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-astro-cid-iskcshuh><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-astro-cid-iskcshuh></path></svg></div>` : renderTemplate`<div${addAttribute(`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isCurrent ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-500"}`, "class")} data-astro-cid-iskcshuh>${idx + 1}</div>`}</div><div class="flex-1 min-w-0" data-astro-cid-iskcshuh><p${addAttribute(`text-sm leading-tight ${isCurrent ? "font-bold text-blue-700 dark:text-blue-400" : done ? "font-medium text-gray-600 dark:text-slate-400" : "font-medium text-gray-900 dark:text-slate-200"}`, "class")} data-astro-cid-iskcshuh>${lesson.title}</p><p class="text-[11px] text-gray-400 mt-1 flex items-center gap-1" data-astro-cid-iskcshuh>${lesson.video_url && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-iskcshuh><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" data-astro-cid-iskcshuh></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-iskcshuh></path></svg>`}${lesson.duration ? `${lesson.duration} phút` : "Lý thuyết"}</p></div></a>`;
	})}</div></div></div></div>` })}<script lang="ts">
  const completeBtn = document.getElementById('mark-complete-btn') as HTMLButtonElement | null;
  if (completeBtn) {
    completeBtn.addEventListener('click', async () => {
      const lessonId = completeBtn.dataset.lessonId!;
      completeBtn.disabled = true;
      completeBtn.innerHTML = 'Đang xử lý...';
      
      try {
        const res = await fetch('/lms/api/courses/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId })
        });
        
        if (res.ok) {
          window.location.reload();
        } else {
          alert('Có lỗi xảy ra, vui lòng thử lại.');
          completeBtn.disabled = false;
          completeBtn.innerHTML = 'Đánh dấu hoàn thành';
        }
      } catch {
        alert('Không thể kết nối. Vui lòng kiểm tra mạng.');
        completeBtn.disabled = false;
        completeBtn.innerHTML = 'Đánh dấu hoàn thành';
      }
    });
  }
<\/script>`;
}, "D:/lop12/src/pages/khoa-hoc/[slug]/[lessonId].astro", void 0);
var $$file = "D:/lop12/src/pages/khoa-hoc/[slug]/[lessonId].astro";
var $$url = "/lms/khoa-hoc/[slug]/[lessonId]";
//#endregion
//#region \0virtual:astro:page:src/pages/khoa-hoc/[slug]/[lessonId]@_@astro
var page = () => _lessonId__exports;
//#endregion
export { page };
