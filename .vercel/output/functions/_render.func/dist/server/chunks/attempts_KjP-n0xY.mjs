import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
//#region src/pages/api/attempts.ts
var attempts_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { attemptId, answers } = await request.json();
		if (!attemptId || !answers) return new Response(JSON.stringify({ error: "Attempt ID and answers are required" }), { status: 400 });
		const attempt = await db.getAttemptById(attemptId);
		if (!attempt) return new Response(JSON.stringify({ error: "Attempt not found" }), { status: 404 });
		const examQuestions = await db.getQuestionsByExamId(attempt.exam_id);
		if (examQuestions.length === 0) return new Response(JSON.stringify({ error: "No questions found for this exam" }), { status: 400 });
		let correctCount = 0;
		let totalCount = 0;
		examQuestions.forEach((q) => {
			if (q.type === "read" || q.type === "list") {
				const subQs = q.metadata?.questions || [];
				totalCount += subQs.length;
				const submitted = answers[q.id];
				if (submitted && typeof submitted === "object") subQs.forEach((subQ, subIdx) => {
					const studentChoice = submitted[subIdx];
					const correctChoice = subQ.correct_option || subQ.answer || "";
					if (studentChoice && studentChoice.trim().toUpperCase() === correctChoice.trim().toUpperCase()) correctCount++;
				});
			} else {
				totalCount += 1;
				const submitted = answers[q.id];
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
		const rawScore = correctCount / totalCount * 10;
		const score = Math.round(rawScore * 100) / 100;
		const updatedAttempt = await db.submitAttempt(attemptId, score, answers);
		return new Response(JSON.stringify({
			success: true,
			score,
			correctCount,
			totalCount,
			attempt: updatedAttempt
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/attempts@_@ts
var page = () => attempts_exports;
//#endregion
export { page };
