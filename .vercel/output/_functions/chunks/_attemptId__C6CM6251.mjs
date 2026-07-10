import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as unescapeHTML, C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
import { n as shuffleArrayWithPRNG, r as uuidToSeed, t as mulberry32 } from "./random_B-EOXlsq.mjs";
import { marked } from "marked";
//#region src/components/QuestionCard.astro
createAstro("https://lop12.com");
var $$QuestionCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$QuestionCard;
	const { question, index, mode = "take", selectedAnswers = [], submittedAnswer } = Astro.props;
	const parseMarkdownWithMath = (text = "", isInline = false) => {
		if (!text) return "";
		const mathBlocks = [];
		let idx = 0;
		const textWithoutMath = text.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$[^$\n]*?\$)/g, (match) => {
			mathBlocks.push(match);
			return `@@MATH_BLOCK_${idx++}@@`;
		});
		let html = isInline ? marked.parseInline(textWithoutMath) : marked.parse(textWithoutMath);
		mathBlocks.forEach((block, i) => {
			html = html.replace(`@@MATH_BLOCK_${i}@@`, block);
		});
		return html;
	};
	return renderTemplate`${maybeRenderHead($$result)}<div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm mb-6 transition-colors duration-200"><!-- Header: Question Number and Difficulty --><div class="flex items-center justify-between mb-4"><span class="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300">Câu ${index}</span><div class="flex items-center space-x-2"><!-- Question Type --><span class="text-xs font-semibold text-gray-400 dark:text-slate-500">${question.type === "single_choice" ? "Trắc nghiệm đơn" : question.type === "multiple_choice" ? "Nhiều lựa chọn" : question.type === "msq" ? "Đúng / Sai" : question.type === "read" ? "Đọc hiểu" : question.type === "list" ? "Nghe hiểu" : question.type === "sa" ? "Trả lời ngắn" : question.type === "tl" ? "Tự luận" : "Đúng / Sai đơn"}</span><!-- Difficulty Badge --><span${addAttribute(`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${question.difficulty === "easy" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400" : question.difficulty === "medium" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400" : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400"}`, "class")}>${question.difficulty === "easy" ? "Dễ" : question.difficulty === "medium" ? "Trung bình" : "Khó"}</span></div></div><!-- Question Content --><div class="text-base md:text-lg font-semibold text-gray-800 dark:text-slate-100 mb-6 leading-relaxed whitespace-pre-wrap select-none question-text [&amp;_img]:max-w-full [&amp;_img]:rounded-lg [&amp;_img]:mx-auto [&amp;_img]:my-3 [&amp;_p]:inline">${unescapeHTML(parseMarkdownWithMath(question.content || "", false))}</div><!-- Standard Options Container (single_choice, multiple_choice, true_false) -->${question.type !== "msq" && question.type !== "sa" && question.type !== "tl" && question.type !== "read" && question.type !== "list" && renderTemplate`<div class="space-y-3">${question.answers.map((answer, optIdx) => {
		const optionLetter = String.fromCharCode(65 + optIdx);
		const isSelected = selectedAnswers.includes(answer.id);
		const isCorrect = answer.is_correct;
		let optionStyle = "border-gray-250 dark:border-slate-800/80 hover:bg-gray-50 dark:hover:bg-slate-800/40 text-gray-700 dark:text-slate-300 cursor-pointer";
		let iconMarkup = null;
		if (mode === "take") {
			if (isSelected) optionStyle = "border-blue-500 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 cursor-pointer";
		} else if (mode === "review") {
			if (isCorrect) {
				optionStyle = "border-emerald-500 bg-emerald-50/60 dark:border-emerald-500/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400";
				iconMarkup = renderTemplate`<span class="text-emerald-600 dark:text-emerald-400 ml-auto"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></span>`;
			} else if (isSelected && !isCorrect) {
				optionStyle = "border-rose-500 bg-rose-50/60 dark:border-rose-500/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400";
				iconMarkup = renderTemplate`<span class="text-rose-600 dark:text-rose-400 ml-auto"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></span>`;
			}
		}
		return renderTemplate`<div${addAttribute(question.id, "data-question-id")}${addAttribute(answer.id, "data-answer-id")}${addAttribute(question.type, "data-type")}${addAttribute(`flex items-center p-4 rounded-xl border-2 transition-all duration-150 select-none ${optionStyle} option-item`, "class")}><div${addAttribute(`w-6 h-6 rounded-lg mr-3 flex items-center justify-center font-bold text-xs transition-colors border ${isSelected ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-100 border-gray-300 text-gray-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"}`, "class")}>${optionLetter}</div><div class="text-sm md:text-base font-medium flex-1 [&amp;_img]:max-w-full [&amp;_img]:rounded-md [&amp;_img]:my-1">${unescapeHTML(parseMarkdownWithMath(answer.content || "", true))}</div>${iconMarkup}</div>`;
	})}</div>`}<!-- Đúng / Sai Options Container (msq) -->${question.type === "msq" && renderTemplate`<div class="space-y-4">${question.answers.map((answer, optIdx) => {
		const optionLetter = String.fromCharCode(65 + optIdx);
		const currentSelection = (selectedAnswers[0] || {})[answer.id];
		const correctChoice = answer.is_correct ? "Đúng" : "Sai";
		const isOptionCorrect = currentSelection === correctChoice;
		let statusStyle = "border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900";
		let selectionText = currentSelection || "(Bỏ trống)";
		if (mode === "review") if (isOptionCorrect) statusStyle = "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-700 dark:text-emerald-400";
		else statusStyle = "border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 text-rose-700 dark:text-rose-400";
		return renderTemplate`<div${addAttribute(`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all gap-3 ${statusStyle}`, "class")}><div class="flex items-start flex-1 min-w-0"><span class="w-6 h-6 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-450 flex items-center justify-center font-bold text-xs mr-3 shrink-0">${optionLetter}</span><div class="text-sm md:text-base font-medium text-gray-700 dark:text-slate-300 leading-relaxed [&amp;_img]:max-w-full [&amp;_img]:rounded-md [&amp;_img]:my-1">${unescapeHTML(parseMarkdownWithMath(answer.content || "", true))}</div></div><div class="flex items-center gap-3 shrink-0 self-end sm:self-center">${mode === "take" ? renderTemplate`<div class="flex items-center gap-2"><button type="button" data-msq-button="Đúng"${addAttribute(question.id, "data-question-id")}${addAttribute(answer.id, "data-answer-id")}${addAttribute(optionLetter, "data-option-letter")}${addAttribute(`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${currentSelection === "Đúng" ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-750"}`, "class")}>Đúng</button><button type="button" data-msq-button="Sai"${addAttribute(question.id, "data-question-id")}${addAttribute(answer.id, "data-answer-id")}${addAttribute(optionLetter, "data-option-letter")}${addAttribute(`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${currentSelection === "Sai" ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-750"}`, "class")}>Sai</button></div>` : renderTemplate`<div class="flex flex-wrap items-center gap-2 text-xs font-semibold"><span class="text-gray-400 dark:text-slate-500">Cậu chọn:</span><span${addAttribute(`px-2.5 py-1 rounded-lg border font-bold ${currentSelection === "Đúng" ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400" : currentSelection === "Sai" ? "bg-gray-50 border-gray-200 text-gray-700 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-400" : "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-400"}`, "class")}>${selectionText}</span><span class="text-gray-400 dark:text-slate-500 ml-1">Đáp án:</span><span class="px-2.5 py-1 rounded-lg border font-bold bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400">${correctChoice}</span>${isOptionCorrect ? renderTemplate`<span class="text-emerald-600 dark:text-emerald-400 ml-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></span>` : renderTemplate`<span class="text-rose-600 dark:text-rose-400 ml-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></span>`}</div>`}</div></div>`;
	})}</div>`}<!-- Short Answer Container (sa) -->${question.type === "sa" && renderTemplate`<div class="space-y-4">${mode === "take" ? renderTemplate`<input type="text"${addAttribute(question.id, "data-question-id")} data-type="sa" placeholder="Nhập câu trả lời của cậu..." class="sa-input w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 transition-colors"${addAttribute(selectedAnswers[0] || "", "value")}>` : renderTemplate`<div class="space-y-3"><div class="flex flex-col sm:flex-row sm:items-center gap-3"><span class="text-sm font-semibold text-gray-500 dark:text-slate-400">Cậu đã điền:</span><div${addAttribute(`px-4 py-2.5 rounded-xl border-2 font-bold text-sm flex items-center gap-2 ${(() => {
		const submitted = selectedAnswers[0] || "";
		const correct = question.answer || "";
		const normSub = submitted.trim().toLowerCase().replace(/\s+/g, " ").replace(",", ".");
		const normCorr = correct.trim().toLowerCase().replace(/\s+/g, " ").replace(",", ".");
		return normSub === normCorr || !isNaN(Number(normSub)) && !isNaN(Number(normCorr)) && Number(normSub) === Number(normCorr) ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-700 dark:text-emerald-400" : "border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 text-rose-700 dark:text-rose-400";
	})()}`, "class")}>${selectedAnswers[0] || "(Bỏ trống)"}${(() => {
		const submitted = selectedAnswers[0] || "";
		const correct = question.answer || "";
		const normSub = submitted.trim().toLowerCase().replace(/\s+/g, " ").replace(",", ".");
		const normCorr = correct.trim().toLowerCase().replace(/\s+/g, " ").replace(",", ".");
		return normSub === normCorr || !isNaN(Number(normSub)) && !isNaN(Number(normCorr)) && Number(normSub) === Number(normCorr) ? "✓ Đúng" : "✗ Sai";
	})()}</div></div><div class="flex items-center gap-3 text-sm"><span class="font-semibold text-gray-500 dark:text-slate-400">Đáp án chính xác:</span><span class="font-black text-emerald-600 dark:text-emerald-400">${question.answer}</span></div></div>`}</div>`}<!-- Essay / Tự luận Container (tl) -->${question.type === "tl" && renderTemplate`<div class="space-y-4 mt-4">${mode === "take" ? renderTemplate`<textarea${addAttribute(question.id, "data-question-id")} data-type="tl" placeholder="Nhập bài làm / lời giải của cậu vào đây..." class="tl-textarea w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 transition-colors min-h-[150px] resize-y">${selectedAnswers[0] || ""}</textarea>` : renderTemplate`<div class="space-y-3"><div class="flex flex-col gap-2"><span class="text-sm font-semibold text-gray-500 dark:text-slate-400">Bài làm của cậu:</span><div class="p-4 rounded-xl border bg-gray-50 dark:bg-slate-800/50 dark:border-slate-800 text-gray-800 dark:text-slate-200 whitespace-pre-wrap min-h-[100px]">${selectedAnswers[0] || "(Bỏ trống)"}</div></div></div>`}</div>`}<!-- English Reading / Listening Comprehension Container (read/list) -->${(question.type === "read" || question.type === "list") && renderTemplate`<div class="space-y-6">${question.type === "list" && question.metadata?.audio_url && renderTemplate`<div class="my-4 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center gap-3"><span class="text-xs font-extrabold text-gray-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5 shrink-0 select-none"><svg class="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>Phát Audio nghe:</span><audio class="w-full h-10 autoplay-none outline-none rounded-xl" controls${addAttribute(question.metadata.audio_url, "src")}></audio></div>`}<div class="space-y-6">${(question.metadata?.questions || []).map((subQ, subIdx) => {
		const subSelected = submittedAnswer ? submittedAnswer[subIdx] : void 0;
		const correctChoice = subQ.correct_option || subQ.answer || "";
		const subOptions = [
			{
				letter: "A",
				text: subQ.option_a || subQ.options?.[0]
			},
			{
				letter: "B",
				text: subQ.option_b || subQ.options?.[1]
			},
			{
				letter: "C",
				text: subQ.option_c || subQ.options?.[2]
			},
			{
				letter: "D",
				text: subQ.option_d || subQ.options?.[3]
			}
		];
		return renderTemplate`<div class="p-5 rounded-2xl border border-gray-150 dark:border-slate-800/80 bg-gray-50/30 dark:bg-slate-900/10 space-y-4"><div class="flex items-center justify-between"><span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">Câu ${index}.${subIdx + 1}</span></div><div class="text-sm md:text-base font-bold text-gray-800 dark:text-slate-100">${subQ.question || subQ.content}</div><div class="grid grid-cols-1 md:grid-cols-2 gap-3">${subOptions.map((opt) => {
			const letter = opt.letter;
			const isSelected = subSelected === letter;
			const isCorrect = correctChoice === letter;
			let optStyle = "border-gray-250 dark:border-slate-800/80 hover:bg-gray-50 dark:hover:bg-slate-800/40 text-gray-700 dark:text-slate-350 cursor-pointer";
			let letterStyle = "bg-gray-100 border-gray-300 text-gray-500 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-400";
			let iconMarkup = null;
			if (mode === "take") {
				if (isSelected) {
					optStyle = "border-blue-500 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 cursor-pointer";
					letterStyle = "bg-blue-600 border-blue-600 text-white";
				}
			} else if (mode === "review") {
				if (isCorrect) {
					optStyle = "border-emerald-500 bg-emerald-50/60 dark:border-emerald-500/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400";
					letterStyle = "bg-emerald-600 border-emerald-600 text-white";
					iconMarkup = renderTemplate`<span class="text-emerald-600 dark:text-emerald-400 ml-auto shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></span>`;
				} else if (isSelected && !isCorrect) {
					optStyle = "border-rose-500 bg-rose-50/60 dark:border-rose-500/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400";
					letterStyle = "bg-rose-600 border-rose-600 text-white";
					iconMarkup = renderTemplate`<span class="text-rose-600 dark:text-rose-400 ml-auto shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></span>`;
				}
			}
			return renderTemplate`<div${addAttribute(`flex items-center p-4 rounded-xl border-2 transition-all duration-155 select-none ${optStyle}`, "class")}><div${addAttribute(`w-6 h-6 rounded-lg mr-3 flex items-center justify-center font-bold text-xs transition-colors border shrink-0 ${letterStyle}`, "class")}>${letter}</div><div class="text-xs md:text-sm font-semibold flex-1">${opt.text}</div>${iconMarkup}</div>`;
		})}</div>${mode === "review" && subQ.explanation && renderTemplate`<div class="mt-3 p-3 rounded-xl bg-blue-50/30 dark:bg-slate-900/60 text-xs text-gray-600 dark:text-slate-350 border border-blue-100/20 leading-relaxed"><span class="font-extrabold text-blue-600 dark:text-blue-400 block mb-0.5">Lời giải câu ${index}.${subIdx + 1}:</span>${subQ.explanation}</div>`}</div>`;
	})}</div></div>`}<!-- Review Mode: Show Explanation -->${mode === "review" && question.explanation && renderTemplate`<div class="mt-6 p-4 rounded-xl bg-blue-50/40 border border-blue-100/30 dark:bg-slate-900/60 dark:border-slate-800/80"><h4 class="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>Lời giải chi tiết:</h4><div class="text-sm text-gray-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap [&amp;_img]:max-w-full [&amp;_img]:rounded-lg [&amp;_img]:mx-auto [&amp;_img]:my-3 [&amp;_p]:inline">${unescapeHTML(parseMarkdownWithMath(question.explanation || "", false))}</div></div>`}</div><script lang="ts">
  const setupInteractions = () => {
    // 1. Standard MCQ items
    const options = document.querySelectorAll('.option-item');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const qId = opt.getAttribute('data-question-id');
        const aId = opt.getAttribute('data-answer-id');
        const qType = opt.getAttribute('data-type');
        
        if (!qId || !aId) return;

        const event = new CustomEvent('answer-selected', {
          detail: { questionId: qId, answerId: aId, type: qType }
        });
        document.dispatchEvent(event);

        if (qType === 'single_choice' || qType === 'true_false') {
          document.querySelectorAll(\`.option-item[data-question-id="\${qId}"]\`).forEach(sibling => {
            sibling.classList.remove('border-blue-500', 'bg-blue-50/50', 'dark:border-blue-500', 'dark:bg-blue-950/20', 'text-blue-700', 'dark:text-blue-400');
            const letter = sibling.querySelector('.w-6');
            if (letter) {
              letter.classList.remove('bg-blue-600', 'border-blue-600', 'text-white');
              letter.classList.add('bg-gray-100', 'border-gray-300', 'text-gray-500', 'dark:bg-slate-800', 'dark:border-slate-700', 'dark:text-slate-400');
            }
          });
        }
        
        if (qType === 'multiple_choice') {
          const isSelected = opt.classList.toggle('border-blue-500');
          opt.classList.toggle('bg-blue-50/50', isSelected);
          opt.classList.toggle('dark:border-blue-500', isSelected);
          opt.classList.toggle('dark:bg-blue-950/20', isSelected);
          opt.classList.toggle('text-blue-700', isSelected);
          opt.classList.toggle('dark:text-blue-400', isSelected);

          const letter = opt.querySelector('.w-6');
          if (letter) {
            letter.classList.toggle('bg-blue-600', isSelected);
            letter.classList.toggle('border-blue-600', isSelected);
            letter.classList.toggle('text-white', isSelected);
            letter.classList.toggle('bg-gray-100', !isSelected);
            letter.classList.toggle('border-gray-300', !isSelected);
            letter.classList.toggle('text-gray-500', !isSelected);
          }
        } else {
          opt.classList.add('border-blue-500', 'bg-blue-50/50', 'dark:border-blue-500', 'dark:bg-blue-950/20', 'text-blue-700', 'dark:text-blue-400');
          const letter = opt.querySelector('.w-6');
          if (letter) {
            letter.classList.remove('bg-gray-100', 'border-gray-300', 'text-gray-500', 'dark:bg-slate-800', 'dark:border-slate-700', 'dark:text-slate-400');
            letter.classList.add('bg-blue-600', 'border-blue-600', 'text-white');
          }
        }
      });
    });

    // 2. Short Answer (sa) inputs
    const saInputs = document.querySelectorAll('.sa-input');
    saInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const qId = input.getAttribute('data-question-id');
        const qType = input.getAttribute('data-type');
        const val = (e.target as HTMLInputElement).value;
        if (!qId) return;

        const event = new CustomEvent('answer-selected', {
          detail: { questionId: qId, answerText: val, type: qType }
        });
        document.dispatchEvent(event);
      });
    });

    // 2.5 Essay (tl) textareas
    const tlTextareas = document.querySelectorAll('.tl-textarea');
    tlTextareas.forEach(textarea => {
      textarea.addEventListener('input', (e) => {
        const qId = textarea.getAttribute('data-question-id');
        const qType = textarea.getAttribute('data-type');
        const val = (e.target as HTMLTextAreaElement).value;
        if (!qId) return;

        const event = new CustomEvent('answer-selected', {
          detail: { questionId: qId, answerText: val, type: qType }
        });
        document.dispatchEvent(event);
      });
    });

    // 3. Đúng/Sai (msq) buttons
    const msqButtons = document.querySelectorAll('[data-msq-button]');
    msqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-question-id');
        const aId = btn.getAttribute('data-answer-id');
        const choice = btn.getAttribute('data-msq-button'); // "Đúng" or "Sai"
        if (!qId || !aId || !choice) return;

        // Dispatch selection
        const event = new CustomEvent('answer-selected', {
          detail: { questionId: qId, answerId: aId, choice, type: 'msq' }
        });
        document.dispatchEvent(event);

        // Update active styles on the two buttons for this answer
        const siblingChoice = choice === 'Đúng' ? 'Sai' : 'Đúng';
        const sibling = btn.parentElement?.querySelector(\`[data-msq-button="\${siblingChoice}"][data-answer-id="\${aId}"]\`);
        
        // Highlight active, reset sibling
        btn.classList.remove('bg-gray-50', 'border-gray-200', 'text-gray-600', 'dark:bg-slate-800', 'dark:border-slate-700', 'dark:text-slate-400');
        btn.classList.add('bg-blue-600', 'border-blue-600', 'text-white');

        if (sibling) {
          sibling.classList.remove('bg-blue-600', 'border-blue-600', 'text-white');
          sibling.classList.add('bg-gray-50', 'border-gray-200', 'text-gray-600', 'dark:bg-slate-800', 'dark:border-slate-700', 'dark:text-slate-400');
        }
      });
    });
  };

  setupInteractions();
<\/script>`;
}, "D:/lop12/src/components/QuestionCard.astro", void 0);
//#endregion
//#region src/pages/exams/[id]/result/[attemptId].astro
var _attemptId__exports = /* @__PURE__ */ __exportAll({
	default: () => $$AttemptId,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$AttemptId = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AttemptId;
	const { id, attemptId } = Astro.params;
	if (!id || !attemptId) return Astro.redirect("/lms/dashboard");
	const user = Astro.locals.user;
	const exam = await db.getExamBySlug(id);
	const attempt = await db.getAttemptById(attemptId);
	if (!exam || !attempt) return Astro.redirect("/lms/de-thi");
	if (attempt.user_id && attempt.user_id !== user?.id) return Astro.redirect("/lms/dashboard");
	const allQuestions = await db.getQuestionsByExamId(exam.id);
	const MCQ_TYPES = [
		"single_choice",
		"multiple_choice",
		"true_false",
		"read",
		"list"
	];
	const bySection = {
		mcq: allQuestions.filter((q) => MCQ_TYPES.includes(q.type)),
		msq: allQuestions.filter((q) => q.type === "msq"),
		sa: allQuestions.filter((q) => q.type === "sa"),
		tl: allQuestions.filter((q) => q.type === "tl")
	};
	const prng = mulberry32(uuidToSeed(attempt.id));
	const shuffled = {
		mcq: shuffleArrayWithPRNG(bySection.mcq, prng).map((q) => ({
			...q,
			answers: shuffleArrayWithPRNG(q.answers, prng)
		})),
		msq: shuffleArrayWithPRNG(bySection.msq, prng).map((q) => ({
			...q,
			answers: shuffleArrayWithPRNG(q.answers, prng)
		})),
		sa: shuffleArrayWithPRNG(bySection.sa, prng).map((q) => ({
			...q,
			answers: shuffleArrayWithPRNG(q.answers, prng)
		})),
		tl: shuffleArrayWithPRNG(bySection.tl, prng).map((q) => ({
			...q,
			answers: shuffleArrayWithPRNG(q.answers, prng)
		}))
	};
	const questions = [
		...shuffled.mcq,
		...shuffled.msq,
		...shuffled.sa,
		...shuffled.tl
	].map((q, idx) => ({
		...q,
		globalIndex: idx + 1
	}));
	const mcqQuestions = questions.filter((q) => MCQ_TYPES.includes(q.type));
	const msqQuestions = questions.filter((q) => q.type === "msq");
	const saQuestions = questions.filter((q) => q.type === "sa");
	const tlQuestions = questions.filter((q) => q.type === "tl");
	const timeSpentMs = attempt.finished_at ? new Date(attempt.finished_at).getTime() - new Date(attempt.started_at).getTime() : 0;
	const timeSpentMin = Math.floor(timeSpentMs / (60 * 1e3));
	const timeSpentSec = Math.floor(timeSpentMs % (60 * 1e3) / 1e3);
	const timeSpentStr = timeSpentMin > 0 ? `${timeSpentMin} phút ${timeSpentSec} giây` : `${timeSpentSec} giây`;
	let correctCount = 0;
	let totalQuestionsCount = 0;
	questions.forEach((q) => {
		if (q.type === "read" || q.type === "list") {
			const subQs = q.metadata?.questions || [];
			totalQuestionsCount += subQs.length;
			const submitted = attempt.answers_submitted?.[q.id];
			if (submitted && typeof submitted === "object") subQs.forEach((subQ, subIdx) => {
				const studentChoice = submitted[subIdx];
				const correctChoice = subQ.correct_option || subQ.answer || "";
				if (studentChoice && studentChoice.trim().toUpperCase() === correctChoice.trim().toUpperCase()) correctCount++;
			});
		} else {
			totalQuestionsCount += 1;
			const submitted = attempt.answers_submitted?.[q.id];
			const correctAnswers = q.answers.filter((a) => a.is_correct).map((a) => a.id);
			if (!submitted) return;
			if (q.type === "single_choice" || q.type === "true_false") {
				const selectedId = typeof submitted === "string" ? submitted : submitted[0];
				if (correctAnswers.includes(selectedId)) correctCount++;
			} else if (q.type === "multiple_choice") {
				const selectedIds = Array.isArray(submitted) ? submitted : [submitted];
				const allCorrectSelected = correctAnswers.every((id) => selectedIds.includes(id));
				const noIncorrectSelected = selectedIds.every((id) => correctAnswers.includes(id));
				if (allCorrectSelected && noIncorrectSelected && correctAnswers.length === selectedIds.length) correctCount++;
			} else if (q.type === "msq") {
				if (typeof submitted === "object" && submitted !== null) {
					let allCorrect = true;
					q.answers.forEach((a) => {
						if (submitted[a.id] !== (a.is_correct ? "Đúng" : "Sai")) allCorrect = false;
					});
					if (allCorrect && q.answers.length > 0) correctCount++;
				}
			} else if (q.type === "sa") {
				if (typeof submitted === "string" && q.answer) {
					const normSubmitted = submitted.trim().toLowerCase().replace(/\s+/g, " ").replace(",", ".");
					const normCorrect = q.answer.trim().toLowerCase().replace(/\s+/g, " ").replace(",", ".");
					if (normSubmitted === normCorrect) correctCount++;
					else {
						const numSubmitted = Number(normSubmitted);
						const numCorrect = Number(normCorrect);
						if (!isNaN(numSubmitted) && !isNaN(numCorrect) && numSubmitted === numCorrect) correctCount++;
					}
				}
			}
		}
	});
	const score = attempt.score !== null ? Number(attempt.score) : 0;
	let scoreTheme = {
		bg: "bg-emerald-50 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/35",
		text: "text-emerald-700 dark:text-emerald-400",
		title: "Xuất sắc!",
		desc: "Chúc mừng cậu nhé! Cậu đã nắm rất chắc kiến thức này."
	};
	if (score < 5) scoreTheme = {
		bg: "bg-rose-50 border-rose-200/50 dark:bg-rose-950/20 dark:border-rose-900/35",
		text: "text-rose-700 dark:text-rose-400",
		title: "Cần cố gắng thêm!",
		desc: "Đừng nản lòng nhé. Hãy xem kỹ lời giải chi tiết và ôn lại bài học lý thuyết."
	};
	else if (score < 8) scoreTheme = {
		bg: "bg-amber-50 border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/35",
		text: "text-amber-700 dark:text-amber-400",
		title: "Khá tốt!",
		desc: "Cậu làm tốt lắm. Chỉ cần ôn luyện thêm một chút để đạt điểm tối đa nha."
	};
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Kết quả thi: ${exam.title}` }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-4xl mx-auto space-y-8"><!-- Breadcrumb header --><div><a${addAttribute(user ? "/dashboard" : "/", "href")} class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>${user ? "Quay lại Bảng điều khiển" : "Quay lại trang chủ"}</a><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">Kết quả làm bài thi</h1><p class="text-sm text-gray-500 dark:text-slate-400 mt-1">${exam.title}</p></div><!-- Score Visual Card --><div${addAttribute(`border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${scoreTheme.bg}`, "class")}><div class="text-center md:text-left space-y-2"><span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-white/70 dark:bg-slate-900/80 border border-black/5 dark:border-white/5 uppercase tracking-wider">${scoreTheme.title}</span><p class="text-sm font-medium text-gray-600 dark:text-slate-300 leading-relaxed max-w-md">${scoreTheme.desc}</p></div><!-- Grade Circle --><div class="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg flex flex-col items-center justify-center flex-shrink-0"><span${addAttribute(`text-4xl font-black ${scoreTheme.text}`, "class")}>${score}</span><span class="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">trên 10</span></div></div><!-- Stats Table Grid --><div class="grid grid-cols-1 sm:grid-cols-3 gap-6"><div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-center"><p class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Số câu đúng</p><p class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-2 font-mono">${correctCount} / ${totalQuestionsCount} câu</p></div><div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-center"><p class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Thời gian làm bài</p><p class="text-xl font-bold text-gray-950 dark:text-white mt-2 font-mono">${timeSpentStr}</p></div><div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-center"><p class="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Độ chính xác</p><p class="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2 font-mono">${Math.round(correctCount / totalQuestionsCount * 100)}%</p></div></div><!-- Review Questions Header --><div class="border-t border-gray-250 dark:border-slate-850 pt-8 space-y-6"><div class="flex items-center space-x-2"><div class="w-2.5 h-5 rounded-sm bg-blue-600"></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">Xem lại chi tiết bài làm</h2></div><div class="space-y-8">${mcqQuestions.length > 0 && renderTemplate`<div class="space-y-4"><h3 class="text-lg font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-slate-700 pb-2">Phần I. Câu trắc nghiệm nhiều phương án lựa chọn</h3>${mcqQuestions.map((question) => {
		const submittedRaw = attempt.answers_submitted?.[question.id];
		const selectedAnswers = Array.isArray(submittedRaw) ? submittedRaw : submittedRaw && typeof submittedRaw === "string" ? [submittedRaw] : [];
		return renderTemplate`${renderComponent($$result, "QuestionCard", $$QuestionCard, {
			"question": question,
			"index": question.globalIndex,
			"mode": "review",
			"selectedAnswers": selectedAnswers,
			"submittedAnswer": submittedRaw
		})}`;
	})}</div>`}${msqQuestions.length > 0 && renderTemplate`<div class="space-y-4"><h3 class="text-lg font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-slate-700 pb-2">Phần II. Câu trắc nghiệm đúng sai</h3>${msqQuestions.map((question) => {
		const submittedRaw = attempt.answers_submitted?.[question.id];
		const selectedAnswers = Array.isArray(submittedRaw) ? submittedRaw : submittedRaw && typeof submittedRaw === "string" ? [submittedRaw] : [];
		return renderTemplate`${renderComponent($$result, "QuestionCard", $$QuestionCard, {
			"question": question,
			"index": question.globalIndex,
			"mode": "review",
			"selectedAnswers": selectedAnswers,
			"submittedAnswer": submittedRaw
		})}`;
	})}</div>`}${saQuestions.length > 0 && renderTemplate`<div class="space-y-4"><h3 class="text-lg font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-slate-700 pb-2">Phần III. Câu trắc nghiệm trả lời ngắn</h3>${saQuestions.map((question) => {
		const submittedRaw = attempt.answers_submitted?.[question.id];
		const selectedAnswers = Array.isArray(submittedRaw) ? submittedRaw : submittedRaw && typeof submittedRaw === "string" ? [submittedRaw] : [];
		return renderTemplate`${renderComponent($$result, "QuestionCard", $$QuestionCard, {
			"question": question,
			"index": question.globalIndex,
			"mode": "review",
			"selectedAnswers": selectedAnswers,
			"submittedAnswer": submittedRaw
		})}`;
	})}</div>`}${tlQuestions.length > 0 && renderTemplate`<div class="space-y-4"><h3 class="text-lg font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-slate-700 pb-2">Phần IV. Câu tự luận</h3>${tlQuestions.map((question) => {
		const submittedRaw = attempt.answers_submitted?.[question.id];
		const selectedAnswers = Array.isArray(submittedRaw) ? submittedRaw : submittedRaw && typeof submittedRaw === "string" ? [submittedRaw] : [];
		return renderTemplate`${renderComponent($$result, "QuestionCard", $$QuestionCard, {
			"question": question,
			"index": question.globalIndex,
			"mode": "review",
			"selectedAnswers": selectedAnswers,
			"submittedAnswer": submittedRaw
		})}`;
	})}</div>`}</div></div></div>` })}`;
}, "D:/lop12/src/pages/exams/[id]/result/[attemptId].astro", void 0);
var $$file = "D:/lop12/src/pages/exams/[id]/result/[attemptId].astro";
var $$url = "/lms/exams/[id]/result/[attemptId]";
//#endregion
//#region \0virtual:astro:page:src/pages/exams/[id]/result/[attemptId]@_@astro
var page = () => _attemptId__exports;
//#endregion
export { page };
