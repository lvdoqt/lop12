import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent, v as renderScript } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/admin/exams/new.astro
var new_exports = /* @__PURE__ */ __exportAll({
	default: () => $$New,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$New = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$New;
	const user = Astro.locals.user;
	if (!user || user.role !== "admin" && user.role !== "teacher") return Astro.redirect("/lms/dashboard");
	let errMsg = "";
	if (Astro.request.method === "POST") try {
		const formData = await Astro.request.formData();
		const mode = formData.get("mode");
		const title = formData.get("title");
		const duration = Number(formData.get("duration"));
		const subject_id = formData.get("subject_id");
		const exam_type = formData.get("exam_type");
		const password = formData.get("password")?.trim() || void 0;
		if (!title || !duration || !subject_id || !exam_type) throw new Error("Tiêu đề, Thời gian, Môn học và Phân loại đề thi là bắt buộc.");
		let questionIds = [];
		if (mode === "json") {
			const jsonRaw = formData.get("json_data");
			if (!jsonRaw?.trim()) throw new Error("Vui lòng nhập dữ liệu JSON.");
			let parsed;
			try {
				parsed = JSON.parse(jsonRaw);
			} catch {
				throw new Error("JSON không hợp lệ. Vui lòng kiểm tra cú pháp.");
			}
			const qs = parsed.questions || parsed.questions;
			if (!Array.isArray(qs) || qs.length === 0) throw new Error("JSON phải chứa mảng \"questions\" với ít nhất 1 câu hỏi.");
			const difficultyMap = {
				easy: "easy",
				medium: "medium",
				hard: "hard",
				dễ: "easy",
				"trung bình": "medium",
				khó: "hard"
			};
			const typeMap = {
				mcq: "single_choice",
				single_choice: "single_choice",
				msq: "msq",
				multiple_choice: "multiple_choice",
				tf_cluster: "msq",
				tf: "true_false",
				true_false: "true_false",
				sa: "sa",
				tl: "tl",
				read: "read",
				list: "list"
			};
			for (const q of qs) {
				const qType = typeMap[q.type] || "single_choice";
				const qDiff = difficultyMap[q.difficulty_level?.toLowerCase()] || "medium";
				const qContent = q.question || q.content || "";
				const qExpl = q.explanation || "";
				const correctStr = (q.correct_option || q.correct_answer || q.answer || "").trim();
				let answers = [];
				if (qType === "single_choice" || qType === "multiple_choice" || qType === "msq" || qType === "read" || qType === "list") {
					const options = [
						{
							key: "A",
							text: q.option_a
						},
						{
							key: "B",
							text: q.option_b
						},
						{
							key: "C",
							text: q.option_c
						},
						{
							key: "D",
							text: q.option_d
						}
					].filter((o) => o.text?.trim());
					const correctKeys = correctStr.split(",").map((k) => k.trim().toUpperCase());
					answers = options.map((o) => ({
						content: o.text,
						is_correct: correctKeys.includes(o.key)
					}));
				} else if (qType === "true_false") answers = [{
					content: "Đúng",
					is_correct: correctStr.toUpperCase() === "TRUE" || correctStr.toUpperCase() === "Đ" || correctStr.toUpperCase() === "A"
				}, {
					content: "Sai",
					is_correct: correctStr.toUpperCase() === "FALSE" || correctStr.toUpperCase() === "S" || correctStr.toUpperCase() === "B"
				}];
				const created = await db.createQuestion({
					subject_id,
					content: qContent,
					explanation: qExpl,
					difficulty: qDiff,
					type: qType,
					answer: qType === "sa" ? correctStr : null,
					created_by: user.id
				}, answers);
				questionIds.push(created.id);
			}
		} else {
			questionIds = formData.getAll("question_ids");
			if (questionIds.length === 0) throw new Error("Cần gán ít nhất một câu hỏi vào đề thi này.");
		}
		await db.createExam({
			title,
			duration,
			subject_id,
			exam_type,
			created_by: user.id,
			...password ? { password } : {}
		}, questionIds);
		return Astro.redirect("/lms/admin/exams");
	} catch (err) {
		errMsg = err.message || "Lỗi tạo đề thi mới.";
	}
	const subjects = await db.getSubjects();
	const questions = await db.getQuestions(void 0, user.role === "admin" ? void 0 : user.id);
	const preselectedQ = new URL(Astro.request.url).searchParams.get("q");
	const preselectedIds = preselectedQ ? preselectedQ.split(",") : [];
	let preselectedSubjectId = "";
	if (preselectedIds.length > 0) {
		const firstSelectedQ = questions.find((q) => preselectedIds.includes(q.id));
		if (firstSelectedQ) preselectedSubjectId = firstSelectedQ.subject_id;
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tạo đề thi mới" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-4xl mx-auto space-y-6"><!-- Breadcrumb --><div><nav class="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3"><a href="/lms/admin" class="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Quản trị</a><span>/</span><a href="/lms/admin/exams" class="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Đề thi</a><span>/</span><span class="text-ink dark:text-[#E8E0D0]">Tạo mới</span></nav><h1 class="text-2xl md:text-3xl font-extrabold text-ink dark:text-[#E8E0D0] tracking-tight font-serif">Tạo đề thi mới</h1><p class="text-sm text-[#8A7E72] dark:text-[#8A8A9E] mt-1">Chọn câu hỏi từ ngân hàng hoặc nhập JSON để tạo đề thi nhanh.</p></div><!-- Error Alert -->${errMsg && renderTemplate`<div class="p-4 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/35 flex items-start gap-2"><svg class="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path></svg>${errMsg}</div>`}<!-- Form Card --><div class="bg-white dark:bg-[#22223A]/80 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm overflow-hidden"><form method="POST" class="p-6 md:p-8 space-y-6"><!-- Meta grid --><div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><!-- Title --><div class="sm:col-span-2"><label for="title" class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Tiêu đề đề thi <span class="text-rose-500">*</span></label><input type="text" name="title" id="title" required placeholder="VD: Đề thi thử THPT Quốc gia môn Toán..." class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-ink dark:text-[#E8E0D0] transition-colors placeholder:text-slate-400"></div><!-- Subject --><div><label for="subject_id" class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Môn học <span class="text-rose-500">*</span></label><select name="subject_id" id="subject_id" required class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1E1E38] text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-ink dark:text-[#E8E0D0] cursor-pointer"><option value="" disabled${addAttribute(!preselectedSubjectId, "selected")}>-- Chọn môn học --</option>${subjects.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(s.id === preselectedSubjectId, "selected")}>${s.name}</option>`)}</select></div><!-- Exam type --><div><label for="exam_type" class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Phân loại đề thi <span class="text-rose-500">*</span></label><select name="exam_type" id="exam_type" required class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1E1E38] text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-ink dark:text-[#E8E0D0] cursor-pointer"><option value="15m">⏱️ Kiểm tra 15 phút</option><option value="45m">📝 Kiểm tra 1 tiết</option><option value="semester">🎓 Thi học kỳ</option><option value="mock_thpt" selected>🏆 Thi thử THPT</option></select></div><!-- Duration --><div><label for="duration" class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Thời gian (phút) <span class="text-rose-500">*</span></label><input type="number" name="duration" id="duration" required min="1" max="300" placeholder="15, 45, 90..." class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-ink dark:text-[#E8E0D0] transition-colors placeholder:text-slate-400"></div><!-- Password --><div><label for="password" class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Mật khẩu <span class="ml-1 font-normal normal-case text-slate-400">(không bắt buộc)</span></label><div class="relative"><input type="text" name="password" id="password" placeholder="Để trống nếu không cần..." class="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-ink dark:text-[#E8E0D0] transition-colors placeholder:text-slate-400"><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">🔒</span></div></div></div><!-- Tab: Chọn câu hỏi / Nhập JSON --><div class="border-t border-slate-100 dark:border-slate-800/60 pt-6"><div class="flex gap-1 mb-5 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-1 w-fit"><button type="button" id="tab-manual" class="tab-btn px-4 py-2 text-xs font-bold rounded-lg transition-all" data-target="manual-section">📋 Chọn từ ngân hàng</button><button type="button" id="tab-json" class="tab-btn px-4 py-2 text-xs font-bold rounded-lg transition-all" data-target="json-section">📄 Nhập JSON</button></div><!-- Tab: Manual select --><div id="manual-section" class="space-y-4"><div class="flex items-center justify-between mb-2"><div><h3 class="text-sm font-bold text-ink dark:text-[#E8E0D0]">Chọn câu hỏi từ ngân hàng đề</h3><p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Chọn môn học ở trên để lọc câu hỏi.</p></div><span id="selected-count" class="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 hidden">0 câu đã chọn</span></div><div id="no-subject-warning" class="text-center p-8 bg-slate-50 dark:bg-slate-900/40 rounded-xl text-sm text-slate-400 border border-dashed border-slate-200 dark:border-slate-700"><div class="text-3xl mb-2">📚</div>Hãy chọn môn học để hiển thị danh sách câu hỏi.</div><div id="no-questions-warning" class="text-center p-8 bg-amber-50 dark:bg-amber-900/10 rounded-xl text-sm text-amber-600 dark:text-amber-400 border border-dashed border-amber-200 dark:border-amber-800/30 hidden"><div class="text-3xl mb-2">📭</div>Môn học này chưa có câu hỏi nào.<div class="mt-3"><a href="/lms/admin/questions/new" class="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Tạo câu hỏi mới →</a></div></div><div id="questions-list" class="space-y-2.5 max-h-[400px] overflow-y-auto hidden pr-1">${questions.map((q) => renderTemplate`<label${addAttribute(q.subject_id, "data-subject-id")} class="question-checkbox-item flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 cursor-pointer select-none transition-all duration-150"><input type="checkbox" name="question_ids"${addAttribute(q.id, "value")}${addAttribute(preselectedIds.includes(q.id), "checked")} class="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 mt-0.5 shrink-0"><div class="flex-1 min-w-0"><p class="text-sm font-semibold text-ink dark:text-[#E8E0D0] leading-snug line-clamp-2">${q.content.replace(/\$/g, "")}</p><div class="flex items-center gap-2 mt-1.5"><span${addAttribute(`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${q.difficulty === "easy" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : q.difficulty === "medium" ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" : "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"}`, "class")}>${q.difficulty === "easy" ? "Dễ" : q.difficulty === "medium" ? "Trung bình" : "Khó"}</span><span class="text-[10px] text-slate-400 uppercase font-semibold">${q.type === "single_choice" ? "Chọn 1" : q.type === "multiple_choice" ? "Chọn nhiều" : "Đúng/Sai"}</span></div></div></label>`)}</div><!-- Hidden input for mode --><input type="hidden" name="mode" id="input-mode" value="manual"></div><!-- Tab: JSON import --><div id="json-section" class="space-y-4 hidden"><div class="flex items-center justify-between"><div><h3 class="text-sm font-bold text-ink dark:text-[#E8E0D0]">Nhập JSON đề thi</h3><p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Dán nội dung JSON theo mẫu bên dưới. Câu hỏi sẽ được tạo tự động.</p></div><a href="/lms/sample-questions.json" target="_blank" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">📄 Xem file mẫu</a></div><div class="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-xl p-4 text-xs text-amber-700 dark:text-amber-400 space-y-1"><p class="font-semibold">📌 Hỗ trợ các loại câu hỏi:</p><p><code class="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">mcq</code> Trắc nghiệm 1 đáp án · <code class="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">msq</code> Trắc nghiệm nhiều đáp án · <code class="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">tf</code> Đúng/Sai</p><p>Hỗ trợ LaTeX: dùng <code class="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">$...$</code> cho công thức toán.</p></div><textarea name="json_data" id="json-data" rows="12" placeholder="{&quot;title&quot;:&quot;...&quot;,&quot;questions&quot;:[{...}]}" class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1E1E38] text-sm font-mono focus:border-blue-500 dark:focus:border-blue-500 outline-none text-ink dark:text-[#E8E0D0] transition-colors placeholder:text-slate-400 resize-y"></textarea><div class="flex gap-3 text-xs"><button type="button" id="btn-paste-sample" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold transition">📋 Dán mẫu</button><button type="button" id="btn-validate-json" class="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 font-semibold transition">✓ Kiểm tra JSON</button></div><div id="json-feedback" class="hidden text-xs font-semibold"></div></div></div><!-- Actions --><div class="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800/60"><a href="/lms/admin/exams" class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Hủy bỏ</a><button type="submit" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/15 hover:shadow-xl transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>Tạo đề thi</button></div></form></div></div>` })}${renderScript($$result, "D:/lop12/src/pages/admin/exams/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/lop12/src/pages/admin/exams/new.astro", void 0);
var $$file = "D:/lop12/src/pages/admin/exams/new.astro";
var $$url = "/lms/admin/exams/new";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/exams/new@_@astro
var page = () => new_exports;
//#endregion
export { page };
