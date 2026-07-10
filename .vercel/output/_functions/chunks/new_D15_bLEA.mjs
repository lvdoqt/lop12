import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent, v as renderScript } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/admin/questions/new.astro
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
	let importCount = 0;
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		if (formData.get("action") === "import_json") try {
			const jsonData = formData.get("json_data");
			const subjectIdJson = formData.get("subject_id_json");
			if (!jsonData?.trim()) throw new Error("Dữ liệu JSON trống.");
			const parsed = JSON.parse(jsonData);
			const questions = Array.isArray(parsed) ? parsed : Array.isArray(parsed.questions) ? parsed.questions : [parsed];
			for (const q of questions) {
				const content = q.content || q.question;
				const subject_id = q.subject_id || subjectIdJson;
				if (!subject_id || !content) throw new Error(`Câu hỏi thiếu trường bắt buộc: Môn học hoặc Nội dung.`);
				let type = q.type || "single_choice";
				if (type === "mcq") type = "single_choice";
				if (type === "tf_cluster") type = "msq";
				if (type === "tf") type = "true_false";
				let answers = [];
				if (q.answers && Array.isArray(q.answers)) answers = q.answers.map((a) => ({
					content: a.content || String(a),
					is_correct: Boolean(a.is_correct || a.isCorrect || false)
				}));
				else {
					const correctStr = (q.correct_option || "").toUpperCase();
					if (q.option_a) answers.push({
						content: q.option_a,
						is_correct: correctStr.includes("A")
					});
					if (q.option_b) answers.push({
						content: q.option_b,
						is_correct: correctStr.includes("B")
					});
					if (q.option_c) answers.push({
						content: q.option_c,
						is_correct: correctStr.includes("C")
					});
					if (q.option_d) answers.push({
						content: q.option_d,
						is_correct: correctStr.includes("D")
					});
				}
				if (answers.length === 0 && type !== "sa" && type !== "tl" && type !== "read" && type !== "list") throw new Error("Câu hỏi thiếu các phương án trả lời.");
				let answer = q.answer;
				if ((type === "sa" || type === "tl") && !answer) answer = q.correct_option;
				const customMetadata = {};
				if (type === "read" || type === "list") {
					const qMetadata = q.metadata || {};
					const subQs = qMetadata.questions || q.questions || [];
					const audioUrl = qMetadata.audio_url || q.audio_url || q.audio || "";
					customMetadata.questions = subQs.map((sub) => ({
						question: sub.question || sub.content || "",
						option_a: sub.option_a || sub.options && sub.options[0] || "",
						option_b: sub.option_b || sub.options && sub.options[1] || "",
						option_c: sub.option_c || sub.options && sub.options[2] || "",
						option_d: sub.option_d || sub.options && sub.options[3] || "",
						correct_option: (sub.correct_option || sub.answer || "").trim().toUpperCase(),
						explanation: sub.explanation || null
					}));
					if (audioUrl) customMetadata.audio_url = audioUrl;
				}
				await db.createQuestion({
					subject_id,
					content,
					explanation: q.explanation || null,
					difficulty: q.difficulty_level || q.difficulty || "medium",
					type,
					answer: answer || null,
					created_by: user.id,
					metadata: customMetadata
				}, answers);
				importCount++;
			}
			return Astro.redirect("/lms/admin/questions?imported=" + importCount);
		} catch (err) {
			errMsg = err.message || "Lỗi nhập JSON.";
		}
		else try {
			const subject_id = formData.get("subject_id");
			const content = formData.get("content");
			const explanation = formData.get("explanation");
			const difficulty = formData.get("difficulty");
			const type = formData.get("type");
			const answers = [];
			const saCorrect = formData.get("sa_correct");
			const customMetadata = {};
			if (type === "true_false") {
				const correctVal = formData.get("tf_correct");
				answers.push({
					content: "Đúng",
					is_correct: correctVal === "A"
				});
				answers.push({
					content: "Sai",
					is_correct: correctVal === "B"
				});
			} else if (type === "sa" || type === "tl") {} else if (type === "read" || type === "list") {
				const subCount = parseInt(formData.get("sub_q_count") || "0");
				const subQs = [];
				for (let i = 0; i < subCount; i++) {
					const qText = formData.get(`sub_q_${i}_text`);
					if (qText && qText.trim()) {
						const optA = formData.get(`sub_q_${i}_opt_A`);
						const optB = formData.get(`sub_q_${i}_opt_B`);
						const optC = formData.get(`sub_q_${i}_opt_C`);
						const optD = formData.get(`sub_q_${i}_opt_D`);
						const correctVal = formData.get(`sub_q_${i}_correct`);
						const explanationVal = formData.get(`sub_q_${i}_explanation`);
						if (!optA || !optB || !optC || !optD || !correctVal) throw new Error(`Câu hỏi phụ số ${i + 1} cần nhập đầy đủ 4 phương án và đáp án đúng.`);
						subQs.push({
							question: qText,
							option_a: optA,
							option_b: optB,
							option_c: optC,
							option_d: optD,
							correct_option: correctVal,
							explanation: explanationVal || null
						});
					}
				}
				if (subQs.length < 2 && type === "list") throw new Error("Cần nhập ít nhất 2 câu hỏi phụ cho câu hỏi nghe hiểu.");
				if (subQs.length < 3 && type === "read") throw new Error("Cần nhập ít nhất 3 câu hỏi phụ cho câu hỏi đọc hiểu.");
				const audioUrl = type === "list" ? formData.get("audio_url") : void 0;
				if (type === "list" && !audioUrl?.trim()) throw new Error("Vui lòng điền link file audio cho câu hỏi nghe hiểu.");
				customMetadata.questions = subQs;
				if (audioUrl) customMetadata.audio_url = audioUrl;
			} else if (type === "msq") {
				const stmtCount = parseInt(formData.get("msq_count") || "4");
				for (let i = 0; i < stmtCount; i++) {
					const stmtContent = formData.get(`msq_stmt_${i}`);
					const stmtCorrect = formData.get(`msq_correct_${i}`);
					if (stmtContent?.trim()) answers.push({
						content: stmtContent,
						is_correct: stmtCorrect === "true"
					});
				}
				if (answers.length === 0) throw new Error("Cần nhập ít nhất 1 mệnh đề cho câu hỏi Đúng/Sai THPT.");
			} else {
				const optA = formData.get("opt_A");
				const isCorrectA = formData.has("correct_A");
				const optB = formData.get("opt_B");
				const isCorrectB = formData.has("correct_B");
				const optC = formData.get("opt_C");
				const isCorrectC = formData.has("correct_C");
				const optD = formData.get("opt_D");
				const isCorrectD = formData.has("correct_D");
				if (!optA || !optB || !optC || !optD) throw new Error("Cậu cần nhập đầy đủ cả 4 phương án A, B, C, D.");
				answers.push({
					content: optA,
					is_correct: isCorrectA
				});
				answers.push({
					content: optB,
					is_correct: isCorrectB
				});
				answers.push({
					content: optC,
					is_correct: isCorrectC
				});
				answers.push({
					content: optD,
					is_correct: isCorrectD
				});
			}
			const correctCount = answers.filter((a) => a.is_correct).length;
			if (type !== "sa" && type !== "tl" && type !== "msq" && type !== "read" && type !== "list") {
				if (correctCount === 0) throw new Error("Cậu hãy đánh dấu ít nhất 1 phương án là đáp án đúng.");
				if (type === "single_choice" && correctCount > 1) throw new Error("Câu hỏi này chỉ được phép có duy nhất 1 đáp án đúng.");
			} else if (type === "sa") {
				if (!saCorrect?.trim()) throw new Error("Cậu hãy điền đáp án chính xác cho câu hỏi trả lời ngắn.");
			}
			if (!subject_id || !content) throw new Error("Môn học và Nội dung câu hỏi là bắt buộc.");
			await db.createQuestion({
				subject_id,
				content,
				explanation: explanation || null,
				difficulty,
				type,
				answer: type === "sa" ? saCorrect : null,
				created_by: user.id,
				metadata: customMetadata
			}, answers);
			return Astro.redirect("/lms/admin/questions");
		} catch (err) {
			errMsg = err.message || "Lỗi thêm câu hỏi mới.";
		}
	}
	const subjects = await db.getSubjects();
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Thêm câu hỏi mới" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-3xl mx-auto space-y-6"><!-- Header --><div><a href="/lms/admin/questions" class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>Ngân hàng câu hỏi</a><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Thêm câu hỏi mới</h1><p class="text-sm text-gray-500 dark:text-slate-400 mt-1">Tạo câu hỏi trắc nghiệm mới và gán đáp án chính xác.</p></div><!-- Error Banner -->${errMsg && renderTemplate`<div class="p-4 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/35">${errMsg}</div>`}<!-- Tab Navigation --><div class="flex gap-2 border-b border-gray-200 dark:border-slate-800 pb-0"><button type="button" id="tab-form" class="px-5 py-2.5 text-sm font-bold border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 transition-colors -mb-px">📝 Thêm 1 câu hỏi</button><button type="button" id="tab-json" class="px-5 py-2.5 text-sm font-bold border-b-2 border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors -mb-px">📋 Nhập từ JSON</button></div><!-- ==================== JSON IMPORT PANEL ==================== --><div id="json-panel" style="display:none;"><div class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm"><div class="mb-5"><h2 class="text-base font-bold text-gray-900 dark:text-white mb-1">Nhập câu hỏi từ JSON</h2><p class="text-xs text-gray-500 dark:text-slate-400">Dán mảng JSON chứa danh sách câu hỏi. Mỗi object cần có:<code class="bg-gray-100 dark:bg-slate-800 px-1 rounded">subject_id</code>,<code class="bg-gray-100 dark:bg-slate-800 px-1 rounded">content</code>,<code class="bg-gray-100 dark:bg-slate-800 px-1 rounded">type</code>,<code class="bg-gray-100 dark:bg-slate-800 px-1 rounded">answers</code>.</p></div><form method="POST" class="space-y-4"><input type="hidden" name="action" value="import_json"><div><label for="subject_id_json" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Môn học mặc định</label><select name="subject_id_json" id="subject_id_json" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><option value="" disabled selected>-- Chọn môn học --</option>${subjects.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}>${s.name}</option>`)}</select></div><div><label for="json_data" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Dữ liệu JSON</label><textarea name="json_data" id="json_data" required rows="14"${addAttribute(`[\n  {\n    "subject_id": "sub-1",\n    "content": "Câu hỏi 1",\n    "type": "single_choice",\n    "difficulty": "medium",\n    "explanation": "Lời giải...",\n    "answers": [\n      { "content": "A. Đáp án A", "is_correct": true },\n      { "content": "B. Đáp án B", "is_correct": false },\n      { "content": "C. Đáp án C", "is_correct": false },\n      { "content": "D. Đáp án D", "is_correct": false }\n    ]\n  }\n]`, "placeholder")} class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 transition-colors font-mono"></textarea></div><div class="flex items-center gap-3 text-xs pt-1"><button type="button" id="btn-paste-sample" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold transition">📋 Dán mẫu</button><button type="button" id="btn-validate-json" class="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 font-semibold transition">✓ Kiểm tra JSON</button><span id="json-feedback" class="hidden text-xs font-semibold"></span></div><div class="flex justify-end pt-2"><button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-xl transition">Nhập câu hỏi từ JSON</button></div></form></div></div><!-- ==================== FORM PANEL ==================== --><div id="form-panel"><div class="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm"><form method="POST" class="space-y-6"><!-- Subject, Type, Difficulty Grid --><div class="grid grid-cols-1 sm:grid-cols-3 gap-5"><!-- Subject --><div><label for="subject_id" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Môn học</label><select name="subject_id" id="subject_id" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><option value="" disabled selected>-- Chọn môn học --</option>${subjects.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}>${s.name}</option>`)}</select></div><!-- Type --><div><label for="type" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Dạng câu hỏi</label><select name="type" id="type" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><option value="single_choice" selected>Trắc nghiệm đơn (1 đáp án)</option><option value="multiple_choice">Nhiều lựa chọn (≥2 đáp án)</option><option value="msq">Đúng / Sai (THPT 2025)</option><option value="true_false">Đúng / Sai (Đơn)</option><option value="read">Đọc hiểu (Reading)</option><option value="list">Nghe hiểu (Listening)</option><option value="sa">Trả lời ngắn</option><option value="tl">Tự luận</option></select></div><!-- Difficulty --><div><label for="difficulty" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Độ khó</label><select name="difficulty" id="difficulty" required class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><option value="easy">Dễ</option><option value="medium" selected>Trung bình</option><option value="hard">Khó</option></select></div></div><!-- Question content --><div><label for="content" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Nội dung câu hỏi (Markdown + LaTeX)</label><textarea name="content" id="content" required rows="4" placeholder="Ví dụ: Tính tích phân $I = \int_0^1 x\,dx$." class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 transition-colors font-mono"></textarea></div><!-- ===== ANSWERS SECTION ===== --><div class="border-t border-gray-100 dark:border-slate-800/60 pt-6 space-y-4"><!-- TYPE LABEL --><div id="answers-header" class="flex items-center gap-2"><h3 class="text-sm font-bold text-gray-900 dark:text-white">Phương án trả lời</h3><span id="type-badge" class="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">Trắc nghiệm đơn</span></div><!-- ---- Single / Multiple Choice (A B C D) ---- --><div id="choices-container" class="space-y-3"><p id="choices-hint" class="text-xs text-gray-400 dark:text-slate-500">Đánh dấu <strong>1 ô</strong> cho đáp án đúng.</p>${[
		"A",
		"B",
		"C",
		"D"
	].map((letter) => renderTemplate`<div class="flex items-center gap-3"><span class="flex-none w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm">${letter}</span><input type="text"${addAttribute(`opt_${letter}`, "name")}${addAttribute(`opt_${letter}`, "id")}${addAttribute(`Nội dung phương án ${letter}...`, "placeholder")} class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><label class="flex items-center gap-1.5 cursor-pointer select-none flex-none"><input type="checkbox"${addAttribute(`correct_${letter}`, "name")}${addAttribute(`correct_${letter}`, "id")} class="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"><span class="text-xs font-bold text-gray-500 dark:text-slate-450 uppercase">Đúng</span></label></div>`)}</div><!-- ---- True / False (single, simple Đúng/Sai) ---- --><div id="tf-container" class="hidden space-y-3"><p class="text-xs text-gray-400 dark:text-slate-500">Hệ thống tự gán 2 phương án <strong>A. Đúng</strong> và <strong>B. Sai</strong>. Chọn đáp án chính xác:</p><div class="flex items-center gap-6"><label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="tf_correct" value="A" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500"><span class="text-sm font-semibold text-gray-700 dark:text-slate-300 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">✓ Đúng</span></label><label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="tf_correct" value="B" class="h-4 w-4 text-blue-600 focus:ring-blue-500"><span class="text-sm font-semibold px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">✗ Sai</span></label></div></div><!-- ---- MSQ: Đúng/Sai THPT 2025 (multiple sub-statements) ---- --><div id="msq-container" class="hidden space-y-4"><p class="text-xs text-gray-400 dark:text-slate-500">Dạng <strong>câu hỏi Đúng/Sai THPT 2025</strong>: Mỗi mệnh đề có thể là Đúng hoặc Sai độc lập.</p><input type="hidden" name="msq_count" id="msq_count" value="4"><div id="msq-stmts" class="space-y-3">${[
		0,
		1,
		2,
		3
	].map((i) => renderTemplate`<div class="flex items-start gap-3"><span class="flex-none mt-2.5 text-xs font-bold text-gray-500 dark:text-slate-400 w-5 text-right">${String.fromCharCode(97 + i)})</span><input type="text"${addAttribute(`msq_stmt_${i}`, "name")}${addAttribute(`msq_stmt_${i}`, "id")}${addAttribute(`Mệnh đề ${String.fromCharCode(65 + i)}...`, "placeholder")} class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><div class="flex-none flex items-center gap-2 mt-2"><label class="flex items-center gap-1 cursor-pointer"><input type="radio"${addAttribute(`msq_correct_${i}`, "name")} value="true" class="h-3.5 w-3.5 text-emerald-600 focus:ring-emerald-500"><span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Đ</span></label><label class="flex items-center gap-1 cursor-pointer"><input type="radio"${addAttribute(`msq_correct_${i}`, "name")} value="false" checked class="h-3.5 w-3.5 text-rose-500 focus:ring-rose-500"><span class="text-xs font-bold text-rose-500 dark:text-rose-400">S</span></label></div></div>`)}</div><button type="button" id="btn-add-msq-stmt" class="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>Thêm mệnh đề</button></div><!-- ---- Short Answer / Essay ---- --><div id="sa-container" class="hidden space-y-3"><p class="text-xs text-gray-400 dark:text-slate-500" id="sa-hint">Nhập đáp án chính xác bên dưới (học sinh phải khớp chính xác).</p><div><label for="sa_correct" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Đáp án đúng</label><input type="text" name="sa_correct" id="sa_correct" placeholder="VD: 1.5 hoặc vô số..." class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"></div></div><!-- ---- Reading / Listening Comprehension (read/list) ---- --><div id="read-list-container" class="hidden space-y-6"><div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-semibold">Nhập danh sách câu hỏi trắc nghiệm phụ liên quan đến bài đọc/nghe này.</div><!-- Audio URL (visible only for list type) --><div id="audio-url-block" class="hidden"><label for="audio_url" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Đường dẫn file Audio (.mp3)</label><input type="text" name="audio_url" id="audio_url" placeholder="Ví dụ: /audio/english12-listening.mp3" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"></div><!-- Sub Questions List --><input type="hidden" name="sub_q_count" id="sub_q_count" value="0"><div id="sub-questions-list" class="space-y-6"><!-- Dynamically populated by JS --></div><button type="button" id="btn-add-sub-q" class="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/45 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>Thêm câu hỏi phụ</button></div></div><!-- /answers section --><!-- Explanation --><div class="border-t border-gray-100 dark:border-slate-800/60 pt-6"><label for="explanation" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Lời giải chi tiết (Markdown + LaTeX) — tùy chọn</label><textarea name="explanation" id="explanation" rows="4" placeholder="Nhập lời giải để học sinh đối chiếu sau khi làm bài thi..." class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 transition-colors font-mono"></textarea></div><!-- Submit --><div class="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800/60"><a href="/lms/admin/questions" class="bg-white border border-gray-200 dark:bg-slate-950 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 px-6 py-3 rounded-xl text-sm font-semibold transition">Hủy</a><button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-xl transition">Lưu câu hỏi</button></div></form></div></div></div>${renderScript($$result, "D:/lop12/src/pages/admin/questions/new.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "D:/lop12/src/pages/admin/questions/new.astro", void 0);
var $$file = "D:/lop12/src/pages/admin/questions/new.astro";
var $$url = "/lms/admin/questions/new";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/questions/new@_@astro
var page = () => new_exports;
//#endregion
export { page };
