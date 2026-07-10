import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent, v as renderScript } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/admin/questions/edit/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const { id } = Astro.params;
	if (!id) return Astro.redirect("/lms/admin/questions");
	const user = Astro.locals.user;
	if (!user || user.role !== "admin" && user.role !== "teacher") return Astro.redirect("/lms/dashboard");
	const question = (await db.getQuestions(void 0, user.role === "admin" ? void 0 : user.id)).find((q) => q.id === id);
	if (!question) return Astro.redirect("/lms/admin/questions");
	let errMsg = "";
	if (Astro.request.method === "POST") try {
		const formData = await Astro.request.formData();
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
		await db.updateQuestion(question.id, {
			subject_id,
			content,
			explanation: explanation || null,
			difficulty,
			type,
			answer: type === "sa" ? saCorrect : null,
			metadata: customMetadata
		}, answers);
		return Astro.redirect("/lms/admin/questions");
	} catch (err) {
		errMsg = err.message || "Lỗi cập nhật câu hỏi.";
	}
	const subjects = await db.getSubjects();
	const getAnswerContent = (index) => {
		return question.answers[index]?.content || "";
	};
	const isAnswerCorrect = (index) => {
		return question.answers[index]?.is_correct || false;
	};
	const isTFCorrectA = question.type === "true_false" && question.answers[0]?.is_correct;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sửa câu hỏi" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-3xl mx-auto space-y-6"><!-- Header --><div><a href="/lms/admin/questions" class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>Ngân hàng câu hỏi</a><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Sửa câu hỏi</h1><p class="text-sm text-gray-500 dark:text-slate-400 mt-1">Cập nhật nội dung câu hỏi và các phương án trả lời.</p></div><!-- Error Alert -->${errMsg && renderTemplate`<div class="p-4 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/35">${errMsg}</div>`}<!-- Form Card --><div class="bg-white dark:bg-slate-900 border border-gray-250 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm"><form method="POST" class="space-y-6"><!-- Subject, Type, Difficulty --><div class="grid grid-cols-1 sm:grid-cols-3 gap-6"><!-- Subject --><div><label for="subject_id" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Môn học</label><select name="subject_id" id="subject_id" required class="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100">${subjects.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(s.id === question.subject_id, "selected")}>${s.name}</option>`)}</select></div><!-- Type --><div><label for="type" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Dạng câu hỏi</label><select name="type" id="type" required class="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><option value="single_choice"${addAttribute(question.type === "single_choice", "selected")}>Trắc nghiệm đơn</option><option value="multiple_choice"${addAttribute(question.type === "multiple_choice", "selected")}>Nhiều lựa chọn</option><option value="msq"${addAttribute(question.type === "msq", "selected")}>Đúng / Sai (THPT 2025)</option><option value="true_false"${addAttribute(question.type === "true_false", "selected")}>Đúng / Sai (Đơn)</option><option value="read"${addAttribute(question.type === "read", "selected")}>Đọc hiểu (Reading)</option><option value="list"${addAttribute(question.type === "list", "selected")}>Nghe hiểu (Listening)</option><option value="sa"${addAttribute(question.type === "sa", "selected")}>Trả lời ngắn</option><option value="tl"${addAttribute(question.type === "tl", "selected")}>Tự luận</option></select></div><!-- Difficulty --><div><label for="difficulty" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Độ khó</label><select name="difficulty" id="difficulty" required class="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><option value="easy"${addAttribute(question.difficulty === "easy", "selected")}>Dễ</option><option value="medium"${addAttribute(question.difficulty === "medium", "selected")}>Trung bình</option><option value="hard"${addAttribute(question.difficulty === "hard", "selected")}>Khó</option></select></div></div><!-- Question content --><div><label for="content" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Nội dung câu hỏi (Markdown + LaTeX)</label><textarea name="content" id="content" required rows="4" class="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 transition-colors font-mono">${question.content}</textarea></div><!-- Answers details --><div class="border-t border-gray-100 dark:border-slate-800/60 pt-6"><h3 class="text-sm font-bold text-gray-900 dark:text-white mb-4">Thiết lập các phương án trả lời</h3><!-- Choices A, B, C, D --><div id="choices-container"${addAttribute(`space-y-4 ${[
		"true_false",
		"sa",
		"tl",
		"msq"
	].includes(question.type) ? "hidden" : ""}`, "class")}><!-- Option A --><div class="flex items-center space-x-3"><span class="w-8 h-8 rounded-lg bg-gray-150 dark:bg-slate-800 text-gray-700 dark:text-slate-350 flex items-center justify-center font-bold text-sm">A</span><input type="text" name="opt_A"${addAttribute(getAnswerContent(0), "value")} placeholder="Nội dung phương án A..." class="flex-1 px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><label class="flex items-center space-x-1.5 cursor-pointer select-none"><input type="checkbox" name="correct_A"${addAttribute(isAnswerCorrect(0), "checked")} class="rounded text-blue-600 focus:ring-blue-500 h-4.5 w-4.5"><span class="text-xs font-bold text-gray-500 dark:text-slate-450 uppercase">Đúng</span></label></div><!-- Option B --><div class="flex items-center space-x-3"><span class="w-8 h-8 rounded-lg bg-gray-150 dark:bg-slate-800 text-gray-700 dark:text-slate-350 flex items-center justify-center font-bold text-sm">B</span><input type="text" name="opt_B"${addAttribute(getAnswerContent(1), "value")} placeholder="Nội dung phương án B..." class="flex-1 px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><label class="flex items-center space-x-1.5 cursor-pointer select-none"><input type="checkbox" name="correct_B"${addAttribute(isAnswerCorrect(1), "checked")} class="rounded text-blue-600 focus:ring-blue-500 h-4.5 w-4.5"><span class="text-xs font-bold text-gray-500 dark:text-slate-450 uppercase">Đúng</span></label></div><!-- Option C --><div class="flex items-center space-x-3"><span class="w-8 h-8 rounded-lg bg-gray-150 dark:bg-slate-800 text-gray-700 dark:text-slate-350 flex items-center justify-center font-bold text-sm">C</span><input type="text" name="opt_C"${addAttribute(getAnswerContent(2), "value")} placeholder="Nội dung phương án C..." class="flex-1 px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><label class="flex items-center space-x-1.5 cursor-pointer select-none"><input type="checkbox" name="correct_C"${addAttribute(isAnswerCorrect(2), "checked")} class="rounded text-blue-600 focus:ring-blue-500 h-4.5 w-4.5"><span class="text-xs font-bold text-gray-500 dark:text-slate-450 uppercase">Đúng</span></label></div><!-- Option D --><div class="flex items-center space-x-3"><span class="w-8 h-8 rounded-lg bg-gray-150 dark:bg-slate-800 text-gray-700 dark:text-slate-350 flex items-center justify-center font-bold text-sm">D</span><input type="text" name="opt_D"${addAttribute(getAnswerContent(3), "value")} placeholder="Nội dung phương án D..." class="flex-1 px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"><label class="flex items-center space-x-1.5 cursor-pointer select-none"><input type="checkbox" name="correct_D"${addAttribute(isAnswerCorrect(3), "checked")} class="rounded text-blue-600 focus:ring-blue-500 h-4.5 w-4.5"><span class="text-xs font-bold text-gray-500 dark:text-slate-450 uppercase">Đúng</span></label></div></div><!-- True/False Options --><div id="tf-container"${addAttribute(`space-y-4 ${question.type === "true_false" ? "" : "hidden"}`, "class")}><p class="text-xs text-gray-400 dark:text-slate-500">Đối với dạng Đúng/Sai, hệ thống sử dụng 2 phương án cố định: <strong>A. Đúng</strong> và <strong>B. Sai</strong>.</p><div class="flex items-center space-x-4"><span class="text-sm font-bold text-gray-700 dark:text-slate-350">Đáp án chính xác là:</span><label class="flex items-center space-x-1.5 cursor-pointer"><input type="radio" name="tf_correct" value="A"${addAttribute(isTFCorrectA, "checked")} class="h-4.5 w-4.5 text-blue-600 focus:ring-blue-500"><span class="text-sm font-semibold text-gray-700 dark:text-slate-300">A. Đúng</span></label><label class="flex items-center space-x-1.5 cursor-pointer"><input type="radio" name="tf_correct" value="B"${addAttribute(!isTFCorrectA, "checked")} class="h-4.5 w-4.5 text-blue-600 focus:ring-blue-500"><span class="text-sm font-semibold text-gray-700 dark:text-slate-300">B. Sai</span></label></div></div><!-- Short Answer Options (Hidden by default, shown when type === sa) --><div id="sa-container"${addAttribute(`space-y-4 ${question.type === "sa" ? "" : "hidden"}`, "class")}><p class="text-xs text-gray-400 dark:text-slate-500">Đối với câu trả lời ngắn, hãy nhập trực tiếp đáp án chính xác bên dưới.</p><div><label for="sa_correct" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Đáp án đúng</label><input type="text" name="sa_correct" id="sa_correct"${addAttribute(question.type === "sa" ? question.answer : "", "value")} placeholder="VD: 1.5 hoặc vô số..." class="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"${addAttribute(question.type === "sa", "required")}></div></div><!-- Tự luận notice --><div id="tl-container"${addAttribute(`${question.type === "tl" ? "" : "hidden"}`, "class")}><div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-xs font-semibold flex items-start gap-2"><svg class="w-4 h-4 flex-none mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Câu hỏi tự luận — không có đáp án trắc nghiệm. Học sinh sẽ tự nhập nội dung tự luận của mình.</div></div><!-- MSQ notice --><div id="msq-container"${addAttribute(`${question.type === "msq" ? "" : "hidden"}`, "class")}><div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-xs font-semibold">Dạng Đúng/Sai THPT 2025 — chỉnh sửa các mệnh đề trong trang quản lý ngân hàng câu hỏi.</div></div><!-- ---- Reading / Listening Comprehension (read/list) ---- --><div id="read-list-container"${addAttribute(`space-y-6 ${["read", "list"].includes(question.type) ? "" : "hidden"}`, "class")}><div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-semibold">Nhập danh sách câu hỏi trắc nghiệm phụ liên quan đến bài đọc/nghe này.</div><!-- Audio URL (visible only for list type) --><div id="audio-url-block"${addAttribute(question.type === "list" ? "" : "hidden", "class")}><label for="audio_url" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Đường dẫn file Audio (.mp3)</label><input type="text" name="audio_url" id="audio_url"${addAttribute(question.metadata?.audio_url || "", "value")} placeholder="Ví dụ: /audio/english12-listening.mp3" class="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100"></div><!-- Sub Questions List --><input type="hidden" name="sub_q_count" id="sub_q_count" value="0"><div id="sub-questions-list" class="space-y-6"><!-- Dynamically populated by JS --></div><button type="button" id="btn-add-sub-q" class="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/45 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>Thêm câu hỏi phụ</button></div><!-- Hidden root to pass data from SSR to script --><div id="questions-data-root"${addAttribute(JSON.stringify(question.metadata?.questions || []), "data-sub-questions")}${addAttribute(question.metadata?.audio_url || "", "data-audio-url")}${addAttribute(question.type, "data-type")} class="hidden"></div></div><!-- Explanation solution --><div class="border-t border-gray-100 dark:border-slate-800/60 pt-6"><label for="explanation" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Lời giải chi tiết (Markdown + LaTeX)</label><textarea name="explanation" id="explanation" rows="4" placeholder="Nhập lời giải để học sinh đối chiếu sau khi làm bài thi..." class="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 transition-colors font-mono">${question.explanation || ""}</textarea></div><!-- Submit buttons --><div class="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-slate-800/60"><a href="/lms/admin/questions" class="bg-white border border-gray-250 dark:bg-slate-950 dark:border-slate-855 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 px-6 py-3 rounded-xl text-sm font-semibold transition">Hủy</a><button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-xl transition">Cập nhật</button></div></form></div></div>` })}${renderScript($$result, "D:/lop12/src/pages/admin/questions/edit/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/lop12/src/pages/admin/questions/edit/[id].astro", void 0);
var $$file = "D:/lop12/src/pages/admin/questions/edit/[id].astro";
var $$url = "/lms/admin/questions/edit/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/questions/edit/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
