import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent, v as renderScript } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/admin/questions/index.astro
var questions_exports = /* @__PURE__ */ __exportAll({
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
	let successMsg = "";
	let errMsg = "";
	const url = new URL(Astro.request.url);
	const importedCount = url.searchParams.get("imported");
	if (importedCount && parseInt(importedCount) > 0) successMsg = `Đã nhập thành công ${importedCount} câu hỏi vào ngân hàng!`;
	if (Astro.request.method === "POST") try {
		const formData = await Astro.request.formData();
		if (formData.get("action") === "delete") {
			const questionId = formData.get("questionId");
			if (questionId) {
				await db.deleteQuestion(questionId);
				successMsg = "Đã xóa câu hỏi thành công khỏi ngân hàng câu hỏi!";
			}
		}
	} catch (err) {
		errMsg = err.message || "Lỗi xóa câu hỏi.";
	}
	const subjects = await db.getSubjects();
	let questions = await db.getQuestions(void 0, user.role === "admin" ? void 0 : user.id);
	const filterSubject = url.searchParams.get("subject_id") || "";
	const filterType = url.searchParams.get("type") || "";
	const filterGrade = url.searchParams.get("grade") || "";
	if (filterSubject) questions = questions.filter((q) => q.subject_id === filterSubject);
	if (filterType) questions = questions.filter((q) => q.type === filterType);
	if (filterGrade) questions = questions.filter((q) => q.difficulty === filterGrade);
	const page = parseInt(url.searchParams.get("page") || "1") || 1;
	const limit = 50;
	const totalItems = questions.length;
	const totalPages = Math.ceil(totalItems / limit) || 1;
	const safePage = Math.max(1, Math.min(page, totalPages));
	const startIndex = (safePage - 1) * limit;
	const paginatedQuestions = questions.slice(startIndex, startIndex + limit);
	const getSubjectName = (subjectId) => {
		return subjects.find((s) => s.id === subjectId)?.name || "Chưa phân loại";
	};
	const qTypeNames = {
		"single_choice": "Trắc nghiệm đơn",
		"multiple_choice": "Nhiều lựa chọn",
		"true_false": "Đúng / Sai",
		"msq": "Đúng / Sai (THPT)",
		"read": "Đọc hiểu",
		"list": "Nghe hiểu",
		"sa": "Trả lời ngắn",
		"tl": "Tự luận"
	};
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Ngân hàng câu hỏi" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-6"><!-- Header --><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><a href="/lms/admin" class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>Quản trị Admin</a><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Ngân hàng câu hỏi</h1><p class="text-sm text-gray-500 dark:text-slate-400 mt-1">Quản lý kho lưu trữ câu hỏi và các phương án trả lời lớp 12.</p></div><div><a href="/lms/admin/questions/new" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>Thêm câu hỏi mới</a></div></div><!-- Notifications -->${successMsg && renderTemplate`<div class="p-4 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/35">${successMsg}</div>`}${errMsg && renderTemplate`<div class="p-4 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/35">${errMsg}</div>`}<!-- Filters & Actions Bar --><div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4"><form method="GET" class="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center"><select name="subject_id" onchange="this.form.submit()" class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 cursor-pointer"><option value="">-- Tất cả môn học --</option>${subjects.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(filterSubject === s.id, "selected")}>${s.name}</option>`)}</select><select name="type" onchange="this.form.submit()" class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 cursor-pointer"><option value="">-- Tất cả các dạng --</option>${Object.entries(qTypeNames).map(([val, label]) => renderTemplate`<option${addAttribute(val, "value")}${addAttribute(filterType === val, "selected")}>${label}</option>`)}</select><select name="grade" onchange="this.form.submit()" class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 cursor-pointer"><option value="">-- Tất cả lớp học --</option><option value="easy"${addAttribute(filterGrade === "easy", "selected")}>Lớp 12 (Dễ)</option><option value="medium"${addAttribute(filterGrade === "medium", "selected")}>Lớp 12 (Trung bình)</option><option value="hard"${addAttribute(filterGrade === "hard", "selected")}>Lớp 12 (Khó)</option></select></form><!-- Float action: Create Exam from Selected --><div id="selection-actions" class="hidden flex items-center gap-3"><span class="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg"><span id="selected-count">0</span> câu đang chọn</span><button type="button" id="btn-create-exam" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-md shadow-indigo-500/10 transition">Tạo đề thi</button></div></div><!-- Table --><div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm">${paginatedQuestions.length === 0 ? renderTemplate`<div class="text-center py-12 text-gray-500">Ngân hàng câu hỏi đang trống. Bấm nút phía trên để tạo câu hỏi trắc nghiệm đầu tiên!</div>` : renderTemplate`<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-250 dark:divide-slate-800"><thead><tr class="text-left text-xs font-bold text-gray-400 dark:text-slate-550 uppercase tracking-wider"><th class="pb-3 w-10"><input type="checkbox" id="selectAll" class="rounded text-blue-600 focus:ring-blue-500 h-4.5 w-4.5 cursor-pointer"></th><th class="pb-3">Câu hỏi</th><th class="pb-3">Môn học</th><th class="pb-3">Lớp</th><th class="pb-3">Dạng câu hỏi</th><th class="pb-3">Độ khó</th><th class="pb-3 text-right">Hành động</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm font-medium">${paginatedQuestions.map((q) => renderTemplate`<tr class="text-gray-700 dark:text-slate-350"><td class="py-4 pr-3"><input type="checkbox" name="qIds"${addAttribute(q.id, "value")} class="q-checkbox rounded text-blue-600 focus:ring-blue-500 h-4.5 w-4.5 cursor-pointer"></td><!-- Content Preview --><td class="py-4 pr-3 max-w-xs md:max-w-md"><p class="font-bold text-gray-900 dark:text-white truncate">${q.content.replace(/\$/g, "")}</p><span class="text-xs text-gray-450 dark:text-slate-500 mt-1 block">${q.type === "read" || q.type === "list" ? `${q.metadata?.questions?.length || 0} câu hỏi phụ` : `${q.answers.length} phương án trả lời • Đáp án đúng: ${q.answers.filter((a) => a.is_correct).map((_) => String.fromCharCode(65 + q.answers.findIndex((ans) => ans.id === _.id))).join(", ")}`}</span></td><!-- Subject --><td class="py-4 pr-3"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-slate-850 dark:text-slate-300">${getSubjectName(q.subject_id)}</span></td><!-- Grade --><td class="py-4 pr-3 text-xs text-gray-500 dark:text-slate-400">${q.difficulty === "easy" ? "12 (Dễ)" : q.difficulty === "medium" ? "12 (TB)" : "12 (Khó)"}</td><!-- Type --><td class="py-4 pr-3 text-gray-500 dark:text-slate-400 text-xs">${qTypeNames[q.type]}</td><!-- Difficulty --><td class="py-4 pr-3"><span${addAttribute(`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${q.difficulty === "easy" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400" : q.difficulty === "medium" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400" : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"}`, "class")}>${q.difficulty === "easy" ? "Dễ" : q.difficulty === "medium" ? "T.Bình" : "Khó"}</span></td><!-- Actions --><td class="py-4 text-right space-x-3"><a${addAttribute(`/lms/admin/questions/edit/${q.id}`, "href")} class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Sửa</a><form method="POST" class="inline" onsubmit="return confirm('Cậu có chắc chắn muốn xóa câu hỏi này? Việc này sẽ ảnh hưởng tới các đề thi chứa câu hỏi này.')"><input type="hidden" name="action" value="delete"><input type="hidden" name="questionId"${addAttribute(q.id, "value")}><button type="submit" class="text-xs font-bold text-rose-500 hover:underline bg-transparent border-none cursor-pointer">Xóa</button></form></td></tr>`)}</tbody></table></div>`}</div><!-- Pagination -->${totalPages > 1 && renderTemplate`<div class="flex items-center justify-between bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm"><span class="text-sm text-gray-500 dark:text-slate-400">Hiển thị trang <span class="font-bold text-gray-900 dark:text-white">${safePage}</span> / <span class="font-bold text-gray-900 dark:text-white">${totalPages}</span><span class="hidden sm:inline">(Tổng: ${totalItems} câu)</span></span><div class="flex gap-2">${safePage > 1 ? renderTemplate`<a${addAttribute(`?page=${safePage - 1}&subject_id=${filterSubject}&type=${filterType}&grade=${filterGrade}`, "href")} class="px-4 py-2 border border-gray-250 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 transition">Trang trước</a>` : renderTemplate`<span class="px-4 py-2 border border-gray-200 dark:border-slate-800 rounded-lg text-sm font-semibold text-gray-400 dark:text-slate-600 cursor-not-allowed">Trang trước</span>`}${safePage < totalPages ? renderTemplate`<a${addAttribute(`?page=${safePage + 1}&subject_id=${filterSubject}&type=${filterType}&grade=${filterGrade}`, "href")} class="px-4 py-2 border border-gray-250 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 transition">Trang sau</a>` : renderTemplate`<span class="px-4 py-2 border border-gray-200 dark:border-slate-800 rounded-lg text-sm font-semibold text-gray-400 dark:text-slate-600 cursor-not-allowed">Trang sau</span>`}</div></div>`}</div>` })}${renderScript($$result, "D:/lop12/src/pages/admin/questions/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/lop12/src/pages/admin/questions/index.astro", void 0);
var $$file = "D:/lop12/src/pages/admin/questions/index.astro";
var $$url = "/lms/admin/questions";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/questions/index@_@astro
var page = () => questions_exports;
//#endregion
export { page };
