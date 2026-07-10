import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, M as createAstro, N as createComponent, b as renderComponent } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
import { n as shuffleArrayWithPRNG, r as uuidToSeed, t as mulberry32 } from "./random_B-EOXlsq.mjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { marked } from "marked";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/QuestionCard.tsx
var SECTION_ACCENT = {
	mcq: {
		border: "border-blue-200/60 dark:border-blue-900/40",
		headBg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
		headText: "text-blue-700 dark:text-blue-300",
		numBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
		numText: "text-white",
		ring: "ring-blue-400/30",
		selBorder: "border-blue-500",
		selBg: "bg-blue-50/60 dark:bg-blue-950/20",
		selText: "text-blue-700 dark:text-blue-400",
		selNumBg: "bg-blue-600",
		selNumText: "text-white",
		selRing: "ring-blue-400/40"
	},
	msq: {
		border: "border-violet-200/60 dark:border-violet-900/40",
		headBg: "bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
		headText: "text-violet-700 dark:text-violet-300",
		numBg: "bg-gradient-to-br from-violet-500 to-purple-600",
		numText: "text-white",
		ring: "ring-violet-400/30",
		selBorder: "border-violet-500",
		selBg: "bg-violet-50/60 dark:bg-violet-950/20",
		selText: "text-violet-700 dark:text-violet-400",
		selNumBg: "bg-violet-600",
		selNumText: "text-white",
		selRing: "ring-violet-400/40"
	},
	sa: {
		border: "border-amber-200/60 dark:border-amber-900/40",
		headBg: "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
		headText: "text-amber-700 dark:text-amber-300",
		numBg: "bg-gradient-to-br from-amber-500 to-orange-500",
		numText: "text-white",
		ring: "ring-amber-400/30",
		selBorder: "border-amber-500",
		selBg: "bg-amber-50/60 dark:bg-amber-950/20",
		selText: "text-amber-700 dark:text-amber-400",
		selNumBg: "bg-amber-600",
		selNumText: "text-white",
		selRing: "ring-amber-400/40"
	},
	tl: {
		border: "border-emerald-200/60 dark:border-emerald-900/40",
		headBg: "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
		headText: "text-emerald-700 dark:text-emerald-300",
		numBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
		numText: "text-white",
		ring: "ring-emerald-400/30",
		selBorder: "border-emerald-500",
		selBg: "bg-emerald-50/60 dark:bg-emerald-950/20",
		selText: "text-emerald-700 dark:text-emerald-400",
		selNumBg: "bg-emerald-600",
		selNumText: "text-white",
		selRing: "ring-emerald-400/40"
	}
};
var optionLetters = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F"
];
var parseMarkdownWithMath = (text = "", isInline = false) => {
	if (!text) return "";
	const mathBlocks = [];
	let index = 0;
	const textWithoutMath = text.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$[^$\n]*?\$)/g, (match) => {
		mathBlocks.push(match);
		return `@@MATH_BLOCK_${index++}@@`;
	});
	let html = isInline ? marked.parseInline(textWithoutMath) : marked.parse(textWithoutMath);
	mathBlocks.forEach((block, i) => {
		html = html.replace(`@@MATH_BLOCK_${i}@@`, block);
	});
	return html;
};
function QuestionCard({ question, index, selectedAnswer, onAnswer, mode, sectionKey = "mcq" }) {
	const cardRef = useRef(null);
	const accent = SECTION_ACCENT[sectionKey] || SECTION_ACCENT.mcq;
	const contentHtml = useMemo(() => ({ __html: parseMarkdownWithMath(question.content || "", false) }), [question.content]);
	const explanationHtml = useMemo(() => ({ __html: parseMarkdownWithMath(question.explanation || "", false) }), [question.explanation]);
	const answerHtmlMap = useMemo(() => {
		const map = {};
		question.answers.forEach((a) => {
			map[a.id] = { __html: parseMarkdownWithMath(a.content || "", true) };
		});
		return map;
	}, [question.answers]);
	useEffect(() => {
		if (cardRef.current && typeof window !== "undefined" && window.renderMathInElement) window.renderMathInElement(cardRef.current, {
			delimiters: [
				{
					left: "$$",
					right: "$$",
					display: true
				},
				{
					left: "$",
					right: "$",
					display: false
				},
				{
					left: "\\(",
					right: "\\)",
					display: false
				},
				{
					left: "\\[",
					right: "\\]",
					display: true
				}
			],
			throwOnError: false
		});
	}, [contentHtml]);
	const getInitialSelection = () => {
		if (!selectedAnswer) return null;
		if (question.type === "msq" || question.type === "read" || question.type === "list") return selectedAnswer;
		if (question.type === "multiple_choice") return selectedAnswer;
		if (question.type === "sa" || question.type === "tl") return selectedAnswer;
		return selectedAnswer;
	};
	const [selection, setSelection] = useState(getInitialSelection());
	const handleSubAnswer = useCallback((subIdx, letter) => {
		setSelection((prev) => {
			const next = {
				...prev || {},
				[subIdx]: letter
			};
			onAnswer(question.id, next);
			return next;
		});
	}, [question.id, onAnswer]);
	const handleSingleChoice = useCallback((answerId) => {
		setSelection(answerId);
		onAnswer(question.id, answerId);
	}, [question.id, onAnswer]);
	const handleMultipleChoice = useCallback((answerId) => {
		setSelection((prev) => {
			const arr = prev ? [...prev] : [];
			const idx = arr.indexOf(answerId);
			if (idx > -1) arr.splice(idx, 1);
			else arr.push(answerId);
			onAnswer(question.id, arr);
			return arr;
		});
	}, [question.id, onAnswer]);
	const handleMSQ = useCallback((answerId, choice) => {
		setSelection((prev) => {
			const next = {
				...prev || {},
				[answerId]: choice
			};
			onAnswer(question.id, next);
			return next;
		});
	}, [question.id, onAnswer]);
	const handleTextInput = useCallback((value) => {
		setSelection(value);
		onAnswer(question.id, value);
	}, [question.id, onAnswer]);
	const isSelected = (answerId) => {
		if (question.type === "multiple_choice") return Array.isArray(selection) && selection.includes(answerId);
		if (question.type === "msq") return false;
		return selection === answerId;
	};
	const difficultyLabel = question.difficulty === "easy" ? "Dễ" : question.difficulty === "medium" ? "Trung bình" : "Khó";
	const difficultyColor = question.difficulty === "easy" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400" : question.difficulty === "medium" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400" : "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400";
	return /* @__PURE__ */ jsxs("div", {
		ref: cardRef,
		id: `question-section-${index}`,
		className: `bg-white dark:bg-slate-900 border ${accent.border} rounded-2xl shadow-sm mb-6 transition-all duration-200 overflow-hidden`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: `flex items-center justify-between px-5 py-3 ${accent.headBg}`,
			children: [/* @__PURE__ */ jsx("span", {
				className: `inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-sm font-extrabold ${accent.numBg} ${accent.numText} shadow-md`,
				children: /* @__PURE__ */ jsxs("span", {
					className: "text-base md:text-lg leading-none",
					children: ["Câu ", index]
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: `text-xs font-semibold ${accent.headText}`,
					children: {
						single_choice: "Trắc nghiệm đơn",
						multiple_choice: "Nhiều lựa chọn",
						true_false: "Đúng / Sai",
						msq: "Đúng / Sai",
						sa: "Trả lời ngắn",
						tl: "Tự luận"
					}[question.type] || "Trắc nghiệm"
				}), /* @__PURE__ */ jsx("span", {
					className: `inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${difficultyColor}`,
					children: difficultyLabel
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-6",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "text-base md:text-lg font-semibold text-gray-800 dark:text-slate-100 mb-6 leading-relaxed whitespace-pre-wrap select-none question-text [&_img]:max-w-full [&_img]:rounded-lg [&_img]:mx-auto [&_img]:my-3 [&_p]:inline",
					dangerouslySetInnerHTML: contentHtml
				}),
				(question.type === "single_choice" || question.type === "multiple_choice" || question.type === "true_false") && /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: question.answers.map((answer, optIdx) => {
						const letter = optionLetters[optIdx];
						const selected = isSelected(answer.id);
						const correct = answer.is_correct;
						let optStyle = "border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/40 text-gray-700 dark:text-slate-300";
						let letterStyle = "bg-gray-100 border-gray-300 text-gray-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400";
						if (mode === "take") {
							if (selected) {
								optStyle = `${accent.selBorder} ${accent.selBg} dark:${accent.selBorder} ${accent.selText} ring-2 ${accent.selRing}`;
								letterStyle = `${accent.selNumBg} border-transparent ${accent.selNumText}`;
							}
							if (selected && question.type === "single_choice") optStyle = `${accent.selBorder} ${accent.selBg} ${accent.selText} ring-2 ${accent.selRing}`;
						} else if (correct) {
							optStyle = "border-emerald-500 bg-emerald-50/60 dark:border-emerald-500/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400";
							letterStyle = "bg-emerald-600 border-emerald-600 text-white";
						} else if (selected && !correct) {
							optStyle = "border-rose-500 bg-rose-50/60 dark:border-rose-500/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400";
							letterStyle = "bg-rose-600 border-rose-600 text-white";
						}
						return /* @__PURE__ */ jsxs("div", {
							"data-question-id": question.id,
							"data-answer-id": answer.id,
							onClick: () => {
								if (mode !== "take") return;
								if (question.type === "multiple_choice") handleMultipleChoice(answer.id);
								else handleSingleChoice(answer.id);
							},
							className: `flex items-center p-4 rounded-xl border-2 transition-all duration-150 select-none cursor-pointer ${optStyle}`,
							children: [
								/* @__PURE__ */ jsx("div", {
									className: `w-6 h-6 rounded-lg mr-3 flex items-center justify-center font-bold text-xs transition-colors border shrink-0 ${letterStyle}`,
									children: letter
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-sm md:text-base font-medium flex-1 [&_img]:max-w-full [&_img]:rounded-md [&_img]:my-1",
									dangerouslySetInnerHTML: answerHtmlMap[answer.id]
								}),
								mode === "review" && correct && /* @__PURE__ */ jsx("svg", {
									className: "w-5 h-5 text-emerald-600 dark:text-emerald-400 ml-auto shrink-0",
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ jsx("path", {
										fillRule: "evenodd",
										d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
										clipRule: "evenodd"
									})
								}),
								mode === "review" && selected && !correct && /* @__PURE__ */ jsx("svg", {
									className: "w-5 h-5 text-rose-600 dark:text-rose-400 ml-auto shrink-0",
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ jsx("path", {
										fillRule: "evenodd",
										d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
										clipRule: "evenodd"
									})
								})
							]
						}, answer.id);
					})
				}),
				question.type === "msq" && /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: question.answers.map((answer, optIdx) => {
						const letter = optionLetters[optIdx];
						const sel = (selection || {})[answer.id];
						const correctChoice = answer.is_correct ? "Đúng" : "Sai";
						const isCorrect = sel === correctChoice;
						return /* @__PURE__ */ jsxs("div", {
							className: `flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all gap-3 ${mode === "review" ? isCorrect ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10" : "border-rose-500 bg-rose-50/20 dark:bg-rose-950/10" : "border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900"}`,
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-start flex-1 min-w-0",
								children: [/* @__PURE__ */ jsx("span", {
									className: `w-6 h-6 rounded-lg ${accent.numBg} ${accent.numText} flex items-center justify-center font-bold text-xs mr-3 shrink-0`,
									children: letter
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm md:text-base font-medium text-gray-700 dark:text-slate-300 leading-relaxed [&_img]:max-w-full [&_img]:rounded-md [&_img]:my-1",
									dangerouslySetInnerHTML: answerHtmlMap[answer.id]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-3 shrink-0 self-end sm:self-center",
								children: mode === "take" ? /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => handleMSQ(answer.id, "Đúng"),
										className: `px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${sel === "Đúng" ? `${accent.selNumBg} border-transparent text-white shadow-sm` : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700"}`,
										children: "Đúng"
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => handleMSQ(answer.id, "Sai"),
										className: `px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${sel === "Sai" ? `${accent.selNumBg} border-transparent text-white shadow-sm` : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700"}`,
										children: "Sai"
									})]
								}) : /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-2 text-xs font-semibold",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-400 dark:text-slate-500",
											children: "Chọn:"
										}),
										/* @__PURE__ */ jsx("span", {
											className: `px-2.5 py-1 rounded-lg border font-bold ${sel === "Đúng" ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400" : sel === "Sai" ? "bg-gray-50 border-gray-200 text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400" : "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-400"}`,
											children: sel || "(Trống)"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-gray-400 dark:text-slate-500",
											children: "Đ/a:"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-2.5 py-1 rounded-lg border font-bold bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400",
											children: correctChoice
										}),
										isCorrect ? /* @__PURE__ */ jsx("svg", {
											className: "w-4 h-4 text-emerald-600",
											fill: "currentColor",
											viewBox: "0 0 20 20",
											children: /* @__PURE__ */ jsx("path", {
												fillRule: "evenodd",
												d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
												clipRule: "evenodd"
											})
										}) : /* @__PURE__ */ jsx("svg", {
											className: "w-4 h-4 text-rose-600",
											fill: "currentColor",
											viewBox: "0 0 20 20",
											children: /* @__PURE__ */ jsx("path", {
												fillRule: "evenodd",
												d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
												clipRule: "evenodd"
											})
										})
									]
								})
							})]
						}, answer.id);
					})
				}),
				question.type === "sa" && /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: mode === "take" ? /* @__PURE__ */ jsx("input", {
						type: "text",
						value: selection || "",
						onChange: (e) => handleTextInput(e.target.value),
						placeholder: "Nhập câu trả lời của bạn...",
						className: `w-full px-4 py-3 rounded-xl border ${accent.border} bg-transparent text-sm focus:${accent.selBorder} outline-none text-gray-800 dark:text-slate-100 transition-colors`
					}) : /* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row sm:items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-sm font-semibold text-gray-500 dark:text-slate-400",
								children: "Bạn đã điền:"
							}), /* @__PURE__ */ jsx("div", {
								className: `px-4 py-2.5 rounded-xl border-2 font-bold text-sm flex items-center gap-2 ${(() => {
									const s = selection || "";
									const c = question.answer || "";
									const ns = s.trim().toLowerCase().replace(/\s+/g, " ").replace(",", ".");
									const nc = c.trim().toLowerCase().replace(/\s+/g, " ").replace(",", ".");
									return ns === nc || !isNaN(Number(ns)) && !isNaN(Number(nc)) && Number(ns) === Number(nc) ? "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-700 dark:text-emerald-400" : "border-rose-500 bg-rose-50/20 dark:bg-rose-950/10 text-rose-700 dark:text-rose-400";
								})()}`,
								children: selection || "(Bỏ trống)"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-semibold text-gray-500 dark:text-slate-400",
								children: "Đáp án chính xác:"
							}), /* @__PURE__ */ jsx("span", {
								className: "font-black text-emerald-600 dark:text-emerald-400",
								children: question.answer
							})]
						})]
					})
				}),
				question.type === "tl" && /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: mode === "take" ? /* @__PURE__ */ jsx("textarea", {
						value: selection || "",
						onChange: (e) => handleTextInput(e.target.value),
						placeholder: "Nhập bài làm / lời giải của bạn vào đây...",
						className: `w-full px-4 py-3 rounded-xl border ${accent.border} bg-transparent text-sm focus:${accent.selBorder} outline-none text-gray-800 dark:text-slate-100 transition-colors min-h-[150px] resize-y`
					}) : /* @__PURE__ */ jsx("div", {
						className: "space-y-3",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-sm font-semibold text-gray-500 dark:text-slate-400",
								children: "Bài làm của bạn:"
							}), /* @__PURE__ */ jsx("div", {
								className: "p-4 rounded-xl border bg-gray-50 dark:bg-slate-800/50 dark:border-slate-800 text-gray-800 dark:text-slate-200 whitespace-pre-wrap min-h-[100px]",
								children: selection || "(Bỏ trống)"
							})]
						})
					})
				}),
				(question.type === "read" || question.type === "list") && /* @__PURE__ */ jsxs("div", {
					className: "space-y-6",
					children: [question.type === "list" && question.metadata?.audio_url && /* @__PURE__ */ jsxs("div", {
						className: "my-4 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center gap-3",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5 shrink-0 select-none",
							children: [/* @__PURE__ */ jsx("svg", {
								className: "w-5 h-5 text-teal-500",
								fill: "none",
								stroke: "currentColor",
								viewBox: "0 0 24 24",
								"stroke-width": "2.5",
								children: /* @__PURE__ */ jsx("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
								})
							}), "Phát Audio nghe:"]
						}), /* @__PURE__ */ jsx("audio", {
							className: "w-full h-10 outline-none rounded-xl",
							controls: true,
							src: question.metadata.audio_url
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-6",
						children: (question.metadata?.questions || []).map((subQ, subIdx) => {
							const subSelected = (selection || {})[subIdx];
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
							const correctChoice = subQ.correct_option || subQ.answer || "";
							return /* @__PURE__ */ jsxs("div", {
								className: "p-5 rounded-2xl border border-gray-150 dark:border-slate-800/80 bg-gray-50/30 dark:bg-slate-900/10 space-y-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "flex items-center justify-between",
										children: /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
											children: [
												"Câu ",
												index,
												".",
												subIdx + 1
											]
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "text-sm md:text-base font-bold text-gray-800 dark:text-slate-100",
										children: subQ.question || subQ.content
									}),
									/* @__PURE__ */ jsx("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-3",
										children: subOptions.map((opt) => {
											const letter = opt.letter;
											const selected = subSelected === letter;
											const correct = correctChoice === letter;
											let optStyle = "border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800/40 text-gray-700 dark:text-slate-350 cursor-pointer";
											let letterStyle = "bg-gray-150 border-gray-300 text-gray-500 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-400";
											if (mode === "take") {
												if (selected) {
													optStyle = "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 cursor-pointer ring-2 ring-blue-400/30";
													letterStyle = "bg-blue-600 border-transparent text-white";
												}
											} else if (correct) {
												optStyle = "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400";
												letterStyle = "bg-emerald-600 border-transparent text-white";
											} else if (selected && !correct) {
												optStyle = "border-rose-500 bg-rose-50/60 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400";
												letterStyle = "bg-rose-600 border-transparent text-white";
											}
											return /* @__PURE__ */ jsxs("div", {
												onClick: () => {
													if (mode === "take") handleSubAnswer(subIdx, letter);
												},
												className: `flex items-center p-3.5 rounded-xl border-2 transition-all select-none ${optStyle}`,
												children: [/* @__PURE__ */ jsx("div", {
													className: `w-6 h-6 rounded-lg mr-3 flex items-center justify-center font-bold text-xs transition-colors border shrink-0 ${letterStyle}`,
													children: letter
												}), /* @__PURE__ */ jsx("div", {
													className: "text-xs md:text-sm font-semibold flex-1",
													children: opt.text
												})]
											}, letter);
										})
									}),
									mode === "review" && subQ.explanation && /* @__PURE__ */ jsxs("div", {
										className: "mt-3 p-3 rounded-xl bg-blue-50/30 dark:bg-slate-900/60 text-xs text-gray-600 dark:text-slate-350 border border-blue-100/20 leading-relaxed",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "font-extrabold text-blue-600 dark:text-blue-400 block mb-0.5",
											children: [
												"Lời giải câu ",
												index,
												".",
												subIdx + 1,
												":"
											]
										}), subQ.explanation]
									})
								]
							}, subIdx);
						})
					})]
				}),
				mode === "review" && question.explanation && /* @__PURE__ */ jsxs("div", {
					className: "mt-6 p-4 rounded-xl bg-blue-50/40 border border-blue-100/30 dark:bg-slate-900/60 dark:border-slate-800/80",
					children: [/* @__PURE__ */ jsxs("h4", {
						className: "text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center mb-2",
						children: [/* @__PURE__ */ jsx("svg", {
							className: "w-4.5 h-4.5 mr-1",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							strokeWidth: "2",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
							})
						}), "Lời giải chi tiết:"]
					}), /* @__PURE__ */ jsx("div", {
						className: "text-sm text-gray-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap [&_img]:max-w-full [&_img]:rounded-lg [&_img]:mx-auto [&_img]:my-3 [&_p]:inline",
						dangerouslySetInnerHTML: explanationHtml
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/ExamView.tsx
var MCQ_TYPES = [
	"single_choice",
	"multiple_choice",
	"true_false",
	"read",
	"list"
];
var SECTION_COLORS = {
	mcq: {
		bg: "from-blue-500 to-indigo-600",
		light: "bg-blue-50 dark:bg-blue-950/20",
		border: "border-blue-200 dark:border-blue-900/40",
		text: "text-blue-700 dark:text-blue-300",
		badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
		nav: "bg-blue-500",
		label: "Câu trắc nghiệm nhiều phương án lựa chọn",
		icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
	},
	msq: {
		bg: "from-violet-500 to-purple-600",
		light: "bg-violet-50 dark:bg-violet-950/20",
		border: "border-violet-200 dark:border-violet-900/40",
		text: "text-violet-700 dark:text-violet-300",
		badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
		nav: "bg-violet-500",
		label: "Câu trắc nghiệm đúng sai",
		icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
	},
	sa: {
		bg: "from-amber-500 to-orange-500",
		light: "bg-amber-50 dark:bg-amber-950/20",
		border: "border-amber-200 dark:border-amber-900/40",
		text: "text-amber-700 dark:text-amber-300",
		badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
		nav: "bg-amber-500",
		label: "Câu trắc nghiệm trả lời ngắn",
		icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
	},
	tl: {
		bg: "from-emerald-500 to-teal-600",
		light: "bg-emerald-50 dark:bg-emerald-950/20",
		border: "border-emerald-200 dark:border-emerald-900/40",
		text: "text-emerald-700 dark:text-emerald-300",
		badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
		nav: "bg-emerald-500",
		label: "Câu tự luận",
		icon: "M4 6h16M4 12h16M4 18h7"
	}
};
function ExamView({ exam, attempt, questions, initialSeconds }) {
	const [answers, setAnswers] = useState({});
	const [timeLeft, setTimeLeft] = useState(initialSeconds);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const classified = useMemo(() => {
		const withIndex = questions.map((q, i) => {
			let section = "mcq";
			if (q.type === "msq") section = "msq";
			else if (q.type === "sa") section = "sa";
			else if (q.type === "tl") section = "tl";
			return {
				...q,
				globalIndex: i + 1,
				section
			};
		});
		return {
			mcq: withIndex.filter((q) => MCQ_TYPES.includes(q.type)),
			msq: withIndex.filter((q) => q.type === "msq"),
			sa: withIndex.filter((q) => q.type === "sa"),
			tl: withIndex.filter((q) => q.type === "tl"),
			all: withIndex
		};
	}, [questions]);
	const handleAnswer = useCallback((questionId, value) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: value
		}));
	}, []);
	const answeredCount = Object.keys(answers).length;
	const handleSubmitRef = useRef(null);
	const handleSubmit = useCallback(async (auto = false) => {
		if (submitting) return;
		setSubmitting(true);
		setError(null);
		if (!auto) setConfirmOpen(false);
		try {
			const res = await fetch("/lms/api/attempts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					attemptId: attempt.id,
					answers
				})
			});
			if (res.ok) window.location.href = `/lms/exams/${exam.slug}/result/${attempt.id}`;
			else {
				setError((await res.json().catch(() => null))?.message || "Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.");
				setSubmitting(false);
			}
		} catch {
			setError("Lỗi kết nối mạng, vui lòng thử lại.");
			setSubmitting(false);
		}
	}, [
		submitting,
		attempt.id,
		exam.slug,
		answers
	]);
	handleSubmitRef.current = () => handleSubmit(true);
	useEffect(() => {
		if (timeLeft <= 0) return;
		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					handleSubmitRef.current();
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => clearInterval(interval);
	}, []);
	useEffect(() => {
		const handler = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !submitting) setConfirmOpen(true);
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [submitting]);
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;
	const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	const isLowTime = timeLeft < 60;
	const isCritical = timeLeft < 300;
	const progress = exam.duration > 0 ? (exam.duration * 60 - timeLeft) / (exam.duration * 60) * 100 : 0;
	if (!questions || questions.length === 0) return /* @__PURE__ */ jsx("div", {
		className: "max-w-2xl mx-auto mt-12 text-center",
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-10 shadow-sm",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 dark:bg-amber-950/20 flex items-center justify-center",
					children: /* @__PURE__ */ jsx("svg", {
						className: "w-8 h-8 text-amber-500",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						strokeWidth: "2",
						children: /* @__PURE__ */ jsx("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							d: "M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						})
					})
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "text-xl font-bold text-gray-800 dark:text-white mb-2",
					children: "Đề thi chưa có câu hỏi"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-gray-500 dark:text-slate-400 mb-6",
					children: "Đề thi này hiện chưa được thêm câu hỏi. Vui lòng quay lại sau hoặc liên hệ giáo viên."
				}),
				/* @__PURE__ */ jsx("a", {
					href: "/lms/de-thi",
					className: "inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors",
					children: "Quay lại danh sách đề thi"
				})
			]
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4 relative",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-3 space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: `px-6 py-4 rounded-2xl shadow-md flex items-center justify-between ${isCritical ? "bg-rose-600" : "bg-blue-600"} text-white`,
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold uppercase tracking-wider text-white/80",
								children: isLowTime ? "⚠️ Sắp hết giờ" : "Đang thi trực tuyến"
							}), /* @__PURE__ */ jsx("h1", {
								className: "text-lg md:text-xl font-extrabold leading-tight truncate",
								children: exam.title
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "hidden sm:flex items-center gap-3 ml-4 shrink-0",
							children: /* @__PURE__ */ jsxs("div", {
								className: "bg-white/15 rounded-xl px-4 py-2 text-center",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-xs font-semibold text-white/70",
									children: "Đã làm"
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-lg font-black",
									children: [
										answeredCount,
										"/",
										questions.length
									]
								})]
							})
						})]
					}),
					error && /* @__PURE__ */ jsxs("div", {
						className: "p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center gap-3 text-sm font-semibold text-rose-700 dark:text-rose-400",
						children: [/* @__PURE__ */ jsx("svg", {
							className: "w-5 h-5 shrink-0",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							strokeWidth: "2",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							})
						}), error]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-10",
						children: [
							["mcq", "Phần I"],
							["msq", "Phần II"],
							["sa", "Phần III"],
							["tl", "Phần IV"]
						].map(([key, label]) => {
							const items = classified[key];
							if (items.length === 0) return null;
							const color = SECTION_COLORS[key];
							const sectionNum = key === "mcq" ? "I" : key === "msq" ? "II" : key === "sa" ? "III" : "IV";
							return /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: `rounded-2xl overflow-hidden border ${color.border}`,
									children: /* @__PURE__ */ jsxs("div", {
										className: `bg-gradient-to-r ${color.bg} px-6 py-4 flex items-center gap-3`,
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center",
												children: /* @__PURE__ */ jsx("svg", {
													className: "w-4.5 h-4.5 text-white",
													fill: "none",
													viewBox: "0 0 24 24",
													stroke: "currentColor",
													strokeWidth: "2",
													children: /* @__PURE__ */ jsx("path", {
														strokeLinecap: "round",
														strokeLinejoin: "round",
														d: color.icon
													})
												})
											}),
											/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
												className: "text-white/80 text-xs font-bold uppercase tracking-wider",
												children: ["Phần ", sectionNum]
											}), /* @__PURE__ */ jsx("h2", {
												className: "text-lg font-extrabold text-white leading-tight",
												children: color.label
											})] }),
											/* @__PURE__ */ jsxs("div", {
												className: "ml-auto bg-white/20 rounded-xl px-3 py-1.5 text-white text-xs font-bold",
												children: [items.length, " câu"]
											})
										]
									})
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: items.map((q) => /* @__PURE__ */ jsx(QuestionCard, {
										question: q,
										index: q.globalIndex,
										mode: "take",
										selectedAnswer: answers[q.id],
										onAnswer: handleAnswer,
										sectionKey: q.section
									}, q.id))
								})]
							}, key);
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "lg:col-span-1",
				children: /* @__PURE__ */ jsxs("div", {
					className: "sticky top-20 space-y-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: `rounded-2xl p-6 shadow-sm text-center transition-all duration-300 border ${isLowTime ? "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40" : "bg-white dark:bg-slate-900 border-gray-250 dark:border-slate-800/80"}`,
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider",
								children: "Thời gian còn lại"
							}),
							/* @__PURE__ */ jsx("div", {
								className: `text-3xl md:text-4xl font-black mt-2 font-mono tracking-wider transition-colors ${isLowTime ? "text-rose-600 dark:text-rose-400 animate-pulse" : "text-blue-600 dark:text-blue-400"}`,
								children: timeDisplay
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-3 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden",
								children: /* @__PURE__ */ jsx("div", {
									className: `h-full rounded-full transition-all duration-1000 ${isLowTime ? "bg-rose-500" : "bg-blue-500"}`,
									style: { width: `${Math.min(progress, 100)}%` }
								})
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-[10px] text-gray-400 dark:text-slate-500 mt-2 font-medium",
								children: [
									answeredCount,
									"/",
									questions.length,
									" câu đã làm"
								]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-white dark:bg-slate-900 border border-gray-250 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-bold text-gray-900 dark:text-white mb-4",
								children: "Mục lục câu hỏi"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-5 gap-2",
								children: classified.all.map((q) => {
									const answered = answers[q.id] !== void 0;
									const isPartial = q.type === "msq" && typeof answers[q.id] === "object" && Object.keys(answers[q.id]).length > 0;
									const sectionColor = SECTION_COLORS[q.section];
									let btnClass = "bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400 border-gray-200/50 dark:border-slate-700";
									if (answered || isPartial) btnClass = `${sectionColor.nav} text-white border-transparent`;
									return /* @__PURE__ */ jsx("a", {
										href: `#question-section-${q.globalIndex}`,
										className: `w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border hover:opacity-80 transition ${btnClass}`,
										title: `Câu ${q.globalIndex}`,
										children: q.globalIndex
									}, q.id);
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mt-4 text-[10px] font-semibold text-gray-400 dark:text-slate-500 flex-wrap",
								children: [
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-blue-500" }), "Phần I"]
									}),
									classified.msq.length > 0 && /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-violet-500" }), "Phần II"]
									}),
									classified.sa.length > 0 && /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-amber-500" }), "Phần III"]
									}),
									classified.tl.length > 0 && /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-emerald-500" }), "Phần IV"]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-gray-200 dark:bg-slate-700" }), "Chưa làm"]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", { className: "h-px bg-gray-100 dark:bg-slate-800 my-6" }),
							/* @__PURE__ */ jsx("button", {
								onClick: () => setConfirmOpen(true),
								disabled: submitting,
								className: "w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-500/20 hover:shadow-rose-500/25 transition text-sm flex items-center justify-center gap-2",
								children: submitting ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("svg", {
									className: "w-4 h-4 animate-spin",
									fill: "none",
									viewBox: "0 0 24 24",
									children: [/* @__PURE__ */ jsx("circle", {
										className: "opacity-25",
										cx: "12",
										cy: "12",
										r: "10",
										stroke: "currentColor",
										strokeWidth: "4"
									}), /* @__PURE__ */ jsx("path", {
										className: "opacity-75",
										fill: "currentColor",
										d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
									})]
								}), /* @__PURE__ */ jsx("span", { children: "Đang chấm điểm..." })] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("svg", {
									className: "w-5 h-5",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									strokeWidth: "2",
									children: /* @__PURE__ */ jsx("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									})
								}), /* @__PURE__ */ jsx("span", { children: "Nộp bài thi" })] })
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-gray-400 dark:text-slate-500 text-center mt-2",
								children: "Ctrl+Enter để nộp bài nhanh"
							})
						]
					})]
				})
			}),
			confirmOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
				children: /* @__PURE__ */ jsx("div", {
					className: "bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-sm mx-4 w-full border border-gray-200 dark:border-slate-800",
					children: /* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-14 h-14 mx-auto mb-4 rounded-full bg-amber-50 dark:bg-amber-950/20 flex items-center justify-center",
								children: /* @__PURE__ */ jsx("svg", {
									className: "w-7 h-7 text-amber-600",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									strokeWidth: "2",
									children: /* @__PURE__ */ jsx("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										d: "M12 9v2m0 4h.01M12 19.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
									})
								})
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-bold text-gray-900 dark:text-white mb-2",
								children: "Xác nhận nộp bài"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-gray-500 dark:text-slate-400 mb-1",
								children: [
									"Bạn đã làm ",
									/* @__PURE__ */ jsxs("strong", {
										className: "text-gray-700 dark:text-slate-300",
										children: [
											answeredCount,
											"/",
											questions.length
										]
									}),
									" câu."
								]
							}),
							answeredCount < questions.length && /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-amber-600 dark:text-amber-400 font-semibold mb-4",
								children: [
									"Còn ",
									questions.length - answeredCount,
									" câu chưa được trả lời!"
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-500 dark:text-slate-400 mb-6",
								children: "Sau khi nộp, bạn sẽ không thể thay đổi đáp án."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ jsx("button", {
									onClick: () => setConfirmOpen(false),
									className: "flex-1 px-4 py-3 border border-gray-250 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-xl transition text-sm",
									children: "Tiếp tục làm bài"
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => handleSubmit(false),
									disabled: submitting,
									className: "flex-1 px-4 py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white font-bold rounded-xl transition text-sm",
									children: submitting ? "Đang nộp..." : "Xác nhận nộp bài"
								})]
							})
						]
					})
				})
			}),
			timeLeft === 0 && submitting && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
				children: /* @__PURE__ */ jsxs("div", {
					className: "bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-sm mx-4 w-full text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "w-14 h-14 mx-auto mb-4 rounded-full bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center",
							children: /* @__PURE__ */ jsxs("svg", {
								className: "w-7 h-7 text-rose-600 animate-spin",
								fill: "none",
								viewBox: "0 0 24 24",
								children: [/* @__PURE__ */ jsx("circle", {
									className: "opacity-25",
									cx: "12",
									cy: "12",
									r: "10",
									stroke: "currentColor",
									strokeWidth: "4"
								}), /* @__PURE__ */ jsx("path", {
									className: "opacity-75",
									fill: "currentColor",
									d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
								})]
							})
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-bold text-gray-900 dark:text-white mb-2",
							children: "⏱️ Hết giờ làm bài!"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-500 dark:text-slate-400",
							children: "Hệ thống đang tự động nộp bài thi của bạn..."
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/pages/exams/[id]/take.astro
var take_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Take,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$Take = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Take;
	const { id } = Astro.params;
	const attemptId = Astro.url.searchParams.get("attemptId");
	if (!id || !attemptId) return Astro.redirect("/lms/dashboard");
	const user = Astro.locals.user;
	const exam = await db.getExamBySlug(id);
	const attempt = await db.getAttemptById(attemptId);
	if (!exam || !attempt) return Astro.redirect("/lms/de-thi");
	if (attempt.user_id && attempt.user_id !== user?.id) return Astro.redirect("/lms/dashboard");
	if (exam.password && !user) return Astro.redirect(`/lms/login?redirect=/exams/${exam.slug}`);
	if (attempt.score !== null) return Astro.redirect(`/lms/exams/${exam.slug}/result/${attempt.id}`);
	const MCQ_TYPES = [
		"single_choice",
		"multiple_choice",
		"true_false",
		"read",
		"list"
	];
	const allQuestions = await db.getQuestionsByExamId(exam.id);
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
	];
	console.log(`[take] exam=${exam.id} slug=${exam.slug} questions=${questions.length}`);
	const startTime = new Date(attempt.started_at).getTime();
	const durationMs = exam.duration * 60 * 1e3;
	const elapsedMs = Date.now() - startTime;
	const remainingSeconds = Math.max(0, Math.floor((durationMs - elapsedMs) / 1e3));
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `Đang làm bài: ${exam.title}`,
		"showSidebar": false
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ExamView", ExamView, {
		"client:load": true,
		"exam": {
			id: exam.id,
			slug: exam.slug,
			title: exam.title,
			duration: exam.duration
		},
		"attempt": { id: attempt.id },
		"questions": questions,
		"initialSeconds": remainingSeconds,
		"client:component-hydration": "load",
		"client:component-path": "D:/lop12/src/components/ExamView",
		"client:component-export": "default"
	})}` })}`;
}, "D:/lop12/src/pages/exams/[id]/take.astro", void 0);
var $$file = "D:/lop12/src/pages/exams/[id]/take.astro";
var $$url = "/lms/exams/[id]/take";
//#endregion
//#region \0virtual:astro:page:src/pages/exams/[id]/take@_@astro
var page = () => take_exports;
//#endregion
export { page };
