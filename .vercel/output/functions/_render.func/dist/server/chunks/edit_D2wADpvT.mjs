import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/admin/courses/[id]/edit.astro
var edit_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Edit,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$Edit = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Edit;
	const user = Astro.locals.user;
	if (!user || user.role !== "admin" && user.role !== "teacher") return Astro.redirect("/lms/dashboard");
	const { id } = Astro.params;
	if (!id) return Astro.redirect("/lms/admin/courses");
	const course = await db.getCourseById(id);
	if (!course) return Astro.redirect("/lms/admin/courses");
	const subjects = await db.getSubjects();
	let error = "";
	if (Astro.request.method === "POST") {
		const form = await Astro.request.formData();
		const title = (form.get("title") || "").trim();
		const description = (form.get("description") || "").trim();
		const subject_id = (form.get("subject_id") || "").trim() || null;
		const cover_url = (form.get("cover_url") || "").trim() || null;
		const is_published = form.getAll("is_published").includes("1");
		if (!title) error = "Tên khóa học không được để trống.";
		else try {
			await db.updateCourse(id, {
				title,
				description: description || null,
				subject_id,
				cover_url,
				is_published
			});
			return Astro.redirect(`/lms/admin/courses/${id}`);
		} catch (e) {
			error = e.message || "Có lỗi xảy ra, vui lòng thử lại.";
		}
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Sửa khóa học: ${course.title}` }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-2xl mx-auto space-y-6"><!-- Header --><div><a${addAttribute(`/lms/admin/courses/${id}`, "href")} class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>Quay lại khóa học</a><h1 class="text-2xl font-extrabold text-gray-900 dark:text-white">Sửa thông tin khóa học</h1></div>${error && renderTemplate`<div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-rose-700 dark:text-rose-400 text-sm font-medium">${error}</div>`}<form method="POST" class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm"><!-- Title --><div><label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-1.5">Tên khóa học <span class="text-rose-500">*</span></label><input type="text" name="title" required${addAttribute(course.title, "value")} class="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"></div><!-- Description --><div><label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-1.5">Mô tả khóa học</label><textarea name="description" rows="3" class="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none">${course.description || ""}</textarea></div><!-- Subject --><div><label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-1.5">Môn học</label><select name="subject_id" class="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"><option value="">-- Chọn môn học --</option>${subjects.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(s.id === course.subject_id, "selected")}>${s.name}</option>`)}</select></div><!-- Cover URL --><div><label class="block text-sm font-bold text-gray-700 dark:text-slate-200 mb-1.5">Ảnh bìa (URL)</label><input type="url" name="cover_url"${addAttribute(course.cover_url || "", "value")} placeholder="https://..." class="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"></div><!-- Publish --><div class="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700"><input type="hidden" name="is_published" value="0"><input type="checkbox" name="is_published" id="is_published" value="1"${addAttribute(course.is_published, "checked")} class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"><div><label for="is_published" class="text-sm font-bold text-gray-700 dark:text-slate-200 cursor-pointer">Xuất bản khóa học</label></div></div><!-- Submit --><div class="flex gap-3 pt-2"><button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow shadow-blue-500/20">Lưu thay đổi</button><a${addAttribute(`/lms/admin/courses/${id}`, "href")} class="px-5 py-2.5 rounded-xl border border-gray-250 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 text-sm font-semibold transition">Hủy</a></div></form></div>` })}`;
}, "D:/lop12/src/pages/admin/courses/[id]/edit.astro", void 0);
var $$file = "D:/lop12/src/pages/admin/courses/[id]/edit.astro";
var $$url = "/lms/admin/courses/[id]/edit";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/courses/[id]/edit@_@astro
var page = () => edit_exports;
//#endregion
export { page };
