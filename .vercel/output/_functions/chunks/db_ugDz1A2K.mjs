import { a as supabase, n as createServerSupabase, r as isMockModeForEnv, t as createAdminSupabase } from "./supabase_Dc0ZEBVu.mjs";
//#region src/services/db.ts
function isInMockMode() {
	return isMockModeForEnv();
}
function adminClient() {
	return createAdminSupabase();
}
function anonClient() {
	return createServerSupabase() || supabase;
}
function slugify(text) {
	const map = {
		"ÃƒÂ\xA0": "a",
		"ÃƒÂ¡": "a",
		"Ã¡ÂºÂ¡": "a",
		"Ã¡ÂºÂ£": "a",
		"ÃƒÂ£": "a",
		"ÃƒÂ¢": "a",
		"Ã¡ÂºÂ§": "a",
		"Ã¡ÂºÂ¥": "a",
		"Ã¡ÂºÂ­": "a",
		"Ã¡ÂºÂ©": "a",
		"Ã¡ÂºÂ«": "a",
		"Ã„Æ’": "a",
		"Ã¡ÂºÂ±": "a",
		"Ã¡ÂºÂ¯": "a",
		"Ã¡ÂºÂ·": "a",
		"Ã¡ÂºÂ³": "a",
		"Ã¡ÂºÂµ": "a",
		"ÃƒÂ¨": "e",
		"ÃƒÂ©": "e",
		"Ã¡ÂºÂ¹": "e",
		"Ã¡ÂºÂ»": "e",
		"Ã¡ÂºÂ½": "e",
		"ÃƒÂª": "e",
		"Ã¡Â»Â": "e",
		"Ã¡ÂºÂ¿": "e",
		"Ã¡Â»â€¡": "e",
		"Ã¡Â»Æ’": "e",
		"Ã¡Â»â€¦": "e",
		"ÃƒÂ¬": "i",
		"ÃƒÂ­": "i",
		"Ã¡Â»â€¹": "i",
		"Ã¡Â»â€°": "i",
		"Ã„Â©": "i",
		"ÃƒÂ²": "o",
		"ÃƒÂ³": "o",
		"Ã¡Â»Â": "o",
		"Ã¡Â»Â": "o",
		"ÃƒÂµ": "o",
		"ÃƒÂ´": "o",
		"Ã¡Â»â€œ": "o",
		"Ã¡Â»â€˜": "o",
		"Ã¡Â»â„¢": "o",
		"Ã¡Â»â€¢": "o",
		"Ã¡Â»â€”": "o",
		"Ã†Â¡": "o",
		"Ã¡Â»Â": "o",
		"Ã¡Â»â€º": "o",
		"Ã¡Â»Â£": "o",
		"Ã¡Â»Å¸": "o",
		"Ã¡Â»Â¡": "o",
		"ÃƒÂ¹": "u",
		"ÃƒÂº": "u",
		"Ã¡Â»Â¥": "u",
		"Ã¡Â»Â§": "u",
		"Ã…Â©": "u",
		"Ã†Â°": "u",
		"Ã¡Â»Â«": "u",
		"Ã¡Â»Â©": "u",
		"Ã¡Â»Â±": "u",
		"Ã¡Â»Â­": "u",
		"Ã¡Â»Â¯": "u",
		"Ã¡Â»Â³": "y",
		"ÃƒÂ½": "y",
		"Ã¡Â»Âµ": "y",
		"Ã¡Â»Â·": "y",
		"Ã¡Â»Â¹": "y",
		"Ã„â€˜": "d",
		"Ãƒâ‚¬": "a",
		"ÃƒÂ": "a",
		"Ã¡ÂºÂ\xA0": "a",
		"Ã¡ÂºÂ¢": "a",
		"ÃƒÆ’": "a",
		"Ãƒâ€š": "a",
		"Ã¡ÂºÂ¦": "a",
		"Ã¡ÂºÂ¤": "a",
		"Ã¡ÂºÂ¬": "a",
		"Ã¡ÂºÂ¨": "a",
		"Ã¡ÂºÂª": "a",
		"Ã„â€š": "a",
		"Ã¡ÂºÂ°": "a",
		"Ã¡ÂºÂ®": "a",
		"Ã¡ÂºÂ¶": "a",
		"Ã¡ÂºÂ²": "a",
		"Ã¡ÂºÂ´": "a",
		"ÃƒË†": "e",
		"Ãƒâ€°": "e",
		"Ã¡ÂºÂ¸": "e",
		"Ã¡ÂºÂº": "e",
		"Ã¡ÂºÂ¼": "e",
		"ÃƒÅ\xA0": "e",
		"Ã¡Â»â‚¬": "e",
		"Ã¡ÂºÂ¾": "e",
		"Ã¡Â»â€\xA0": "e",
		"Ã¡Â»â€š": "e",
		"Ã¡Â»â€ž": "e",
		"ÃƒÅ’": "i",
		"ÃƒÂ": "i",
		"Ã¡Â»Å\xA0": "i",
		"Ã¡Â»Ë†": "i",
		"Ã„Â¨": "i",
		"Ãƒâ€™": "o",
		"Ãƒâ€œ": "o",
		"Ã¡Â»Å’": "o",
		"Ã¡Â»Å½": "o",
		"Ãƒâ€¢": "o",
		"Ãƒâ€": "o",
		"Ã¡Â»â€™": "o",
		"Ã¡Â»Â": "o",
		"Ã¡Â»Ëœ": "o",
		"Ã¡Â»â€": "o",
		"Ã¡Â»â€“": "o",
		"Ã†Â\xA0": "o",
		"Ã¡Â»Å“": "o",
		"Ã¡Â»Å¡": "o",
		"Ã¡Â»Â¢": "o",
		"Ã¡Â»Å¾": "o",
		"Ã¡Â»Â\xA0": "o",
		"Ãƒâ„¢": "u",
		"ÃƒÅ¡": "u",
		"Ã¡Â»Â¤": "u",
		"Ã¡Â»Â¦": "u",
		"Ã…Â¨": "u",
		"Ã†Â¯": "u",
		"Ã¡Â»Âª": "u",
		"Ã¡Â»Â¨": "u",
		"Ã¡Â»Â°": "u",
		"Ã¡Â»Â¬": "u",
		"Ã¡Â»Â®": "u",
		"Ã¡Â»Â²": "y",
		"ÃƒÂ": "y",
		"Ã¡Â»Â´": "y",
		"Ã¡Â»Â¶": "y",
		"Ã¡Â»Â¸": "y",
		"Ã„Â": "d"
	};
	return text.split("").map((c) => map[c] || c).join("").toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").substring(0, 80);
}
function generateExamSlug(title, suffix) {
	const base = slugify(title);
	const unique = suffix || Date.now().toString(36);
	return base ? `${base}-${unique}` : unique;
}
var mockSubjects = [];
var mockQuestions = [];
var mockAnswers = [];
var mockExams = [];
var mockAttempts = [];
var mockComments = [];
var mockCourses = [];
var mockCourseLessons = [];
var mockEnrollments = [];
var mockLessonProgress = [];
var mockBlogs = [];
var mockUsers = [];
function mapDbQuestionToAppQuestion(dbQ) {
	const metadata = dbQ.metadata || {};
	const difficulty = metadata.difficulty || "medium";
	const qType = metadata.type || "single_choice";
	const explanation = metadata.explanation || null;
	const subjectId = metadata.subject_id || "";
	const createdBy = metadata.created_by || null;
	const rawOptions = Array.isArray(dbQ.options) ? dbQ.options : [];
	const correctLetters = (dbQ.answer || "").split(",").map((l) => l.trim().toUpperCase());
	const alphabet = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H"
	];
	const answers = rawOptions.map((opt, idx) => {
		const letter = alphabet[idx] || String(idx);
		const isCorrect = correctLetters.includes(letter);
		return {
			id: `${dbQ.id}-${letter}`,
			question_id: dbQ.id,
			content: opt,
			is_correct: isCorrect
		};
	});
	return {
		id: dbQ.id,
		de_id: dbQ.de_id,
		so_cau: dbQ.so_cau,
		phan: dbQ.phan,
		content: dbQ.content,
		options: dbQ.options,
		answer: dbQ.answer,
		image_url: dbQ.image_url,
		metadata: dbQ.metadata,
		created_at: dbQ.created_at,
		updated_at: dbQ.updated_at,
		subject_id: subjectId,
		explanation,
		difficulty,
		type: qType,
		answers,
		created_by: createdBy
	};
}
var db = {
	async getSubjects() {
		if (isInMockMode()) return mockSubjects;
		const client = adminClient();
		if (!client) return [];
		const { data, error } = await client.from("subjects").select("*").order("name");
		if (error) throw error;
		return data || [];
	},
	async getSubjectBySlug(slug) {
		if (isInMockMode()) return mockSubjects.find((s) => s.slug === slug) || null;
		const client = adminClient();
		if (!client) return null;
		const { data, error } = await client.from("subjects").select("*").eq("slug", slug).single();
		if (error) return null;
		return data;
	},
	async getExams(subjectId, createdBy) {
		if (isInMockMode()) {
			let exams = mockExams;
			if (subjectId) exams = mockExams.filter((e) => e.subject_id === subjectId);
			if (createdBy) exams = exams.filter((e) => e.created_by === createdBy);
			return exams.map((e) => ({
				...e,
				subject: mockSubjects.find((s) => s.id === e.subject_id)
			}));
		}
		let query = adminClient().from("exams").select("*, subject:subjects(*)").order("created_at", { ascending: false });
		if (subjectId) query = query.eq("subject_id", subjectId);
		if (createdBy) query = query.eq("created_by", createdBy);
		const { data, error } = await query;
		if (error) {
			console.error("[db.getExams] error:", error);
			throw error;
		}
		return data || [];
	},
	async getExamBySlug(slug) {
		if (isInMockMode()) {
			const exam = mockExams.find((e) => e.slug === slug || e.id === slug);
			if (!exam) return null;
			return {
				...exam,
				subject: mockSubjects.find((s) => s.id === exam.subject_id)
			};
		}
		const client = adminClient();
		const { data: bySlug } = await client.from("exams").select("*, subject:subjects(*)").eq("slug", slug).single();
		if (bySlug) return bySlug;
		const { data: byId } = await client.from("exams").select("*, subject:subjects(*)").eq("id", slug).single();
		return byId || null;
	},
	async getExamById(id) {
		if (isInMockMode()) {
			const exam = mockExams.find((e) => e.id === id);
			if (!exam) return null;
			return {
				...exam,
				subject: mockSubjects.find((s) => s.id === exam.subject_id)
			};
		}
		const { data, error } = await adminClient().from("exams").select("*, subject:subjects(*)").eq("id", id).single();
		if (error) return null;
		return data;
	},
	async getExamQuestionCounts(examIds) {
		const counts = {};
		if (examIds.length === 0) return counts;
		if (isInMockMode()) {
			for (const q of mockQuestions) if (q.de_id && examIds.includes(q.de_id)) counts[q.de_id] = (counts[q.de_id] || 0) + 1;
			return counts;
		}
		const { data, error } = await adminClient().from("questions").select("de_id").in("de_id", examIds);
		if (data && !error) {
			for (const row of data) if (row.de_id) counts[row.de_id] = (counts[row.de_id] || 0) + 1;
		}
		return counts;
	},
	async createExam(exam, questionIds) {
		if (isInMockMode()) {
			const newExam2 = {
				...exam,
				id: `exam-${Date.now()}`,
				slug: generateExamSlug(exam.title),
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			mockExams.push(newExam2);
			return newExam2;
		}
		const slug = generateExamSlug(exam.title);
		const _adminCl = adminClient();
		if (!_adminCl) throw new Error("[db.createExam] Admin Supabase client unavailable. Set SUPABASE_SERVICE_ROLE_KEY.");
		const { data: newExam, error: examError } = await _adminCl.from("exams").insert([{
			...exam,
			slug
		}]).select().single();
		if (examError) {
			console.error("[db.createExam] error:", examError);
			throw examError;
		}
		if (questionIds.length > 0) {
			const { data: templates, error: tempError } = await _adminCl.from("questions").select("*").in("id", questionIds);
			if (tempError) {
				console.error("[db.createExam] templates fetch error:", tempError);
				throw tempError;
			}
			const templatesMap = new Map(templates.map((t) => [t.id, t]));
			const questionsToInsert = questionIds.map((qId, index) => {
				const t = templatesMap.get(qId);
				if (!t) return null;
				return {
					de_id: newExam.id,
					so_cau: index + 1,
					phan: "I",
					content: t.content,
					options: t.options,
					answer: t.answer,
					image_url: t.image_url,
					metadata: {
						...t.metadata || {},
						parent_id: t.id
					}
				};
			}).filter((x) => x != null);
			if (questionsToInsert.length > 0) {
				const { error: insError } = await _adminCl.from("questions").insert(questionsToInsert);
				if (insError) {
					console.error("[db.createExam] questions insert error:", insError);
					throw insError;
				}
			}
		}
		return newExam;
	},
	async updateExam(id, exam, questionIds) {
		if (isInMockMode()) {
			const index = mockExams.findIndex((e) => e.id === id);
			if (index === -1) throw new Error("Exam not found");
			mockExams[index] = {
				...mockExams[index],
				...exam
			};
			return mockExams[index];
		}
		const _adminCl = adminClient();
		if (!_adminCl) throw new Error("[db.updateExam] Admin Supabase client unavailable. Set SUPABASE_SERVICE_ROLE_KEY.");
		const { data: updatedExam, error: examError } = await _adminCl.from("exams").update(exam).eq("id", id).select().single();
		if (examError) throw examError;
		if (questionIds) {
			const { error: delError } = await _adminCl.from("questions").delete().eq("de_id", id);
			if (delError) throw delError;
			if (questionIds.length > 0) {
				const { data: templates, error: tempError } = await _adminCl.from("questions").select("*").in("id", questionIds);
				if (tempError) throw tempError;
				const templatesMap = new Map(templates.map((t) => [t.id, t]));
				const questionsToInsert = questionIds.map((qId, index) => {
					const t = templatesMap.get(qId);
					if (!t) return null;
					return {
						de_id: id,
						so_cau: index + 1,
						phan: "I",
						content: t.content,
						options: t.options,
						answer: t.answer,
						image_url: t.image_url,
						metadata: {
							...t.metadata || {},
							parent_id: t.id
						}
					};
				}).filter((x) => x != null);
				if (questionsToInsert.length > 0) {
					const { error: insError } = await _adminCl.from("questions").insert(questionsToInsert);
					if (insError) throw insError;
				}
			}
		}
		return updatedExam;
	},
	async updateExamWithQuestions(id, exam, questionsData) {
		if (isInMockMode()) {
			const index = mockExams.findIndex((e) => e.id === id);
			if (index === -1) throw new Error("Exam not found");
			mockExams[index] = {
				...mockExams[index],
				...exam
			};
			return mockExams[index];
		}
		const _adminCl = adminClient();
		if (!_adminCl) throw new Error("[db.updateExamWithQuestions] Admin Supabase client unavailable.");
		const { data: updatedExam, error: examError } = await _adminCl.from("exams").update(exam).eq("id", id).select().single();
		if (examError) throw examError;
		if (questionsData) {
			const { error: delError } = await _adminCl.from("questions").delete().eq("de_id", id);
			if (delError) throw delError;
			if (questionsData.length > 0) {
				const questionsToInsert = questionsData.map((q, index) => {
					return {
						de_id: id,
						so_cau: index + 1,
						phan: q.phan || "I",
						content: q.content,
						options: q.options || [],
						answer: q.answer || null,
						image_url: q.image_url || null,
						metadata: q.metadata || {}
					};
				});
				const { error: insError } = await _adminCl.from("questions").insert(questionsToInsert);
				if (insError) throw insError;
			}
		}
		return updatedExam;
	},
	async deleteExam(id) {
		if (isInMockMode()) {
			mockExams = mockExams.filter((e) => e.id !== id);
			mockQuestions = mockQuestions.filter((q) => q.de_id !== id);
			return;
		}
		const _adminCl = adminClient();
		if (!_adminCl) throw new Error("[db.deleteExam] Admin Supabase client unavailable. Set SUPABASE_SERVICE_ROLE_KEY.");
		await _adminCl.from("questions").delete().eq("de_id", id);
		const { error } = await _adminCl.from("exams").delete().eq("id", id);
		if (error) throw error;
	},
	async getQuestions(subjectId, createdBy, grade) {
		if (isInMockMode()) {
			let qList = mockQuestions;
			if (subjectId) qList = qList.filter((q) => q.subject_id === subjectId);
			if (createdBy) qList = qList.filter((q) => q.metadata?.created_by === createdBy);
			if (grade) qList = qList.filter((q) => q.metadata?.grade === grade);
			return qList.map((q) => ({
				...q,
				answers: mockAnswers.filter((a) => a.question_id === q.id),
				subject: mockSubjects.find((s) => s.id === q.subject_id)
			}));
		}
		let query = adminClient().from("questions").select("*").eq("de_id", "bank");
		if (subjectId) query = query.eq("metadata->>subject_id", subjectId);
		if (createdBy) query = query.eq("metadata->>created_by", createdBy);
		if (grade) query = query.eq("metadata->>grade", grade);
		const { data, error } = await query;
		if (error) throw error;
		const subjects = await this.getSubjects();
		return (data || []).map((q) => {
			const mapped = mapDbQuestionToAppQuestion(q);
			mapped.subject = subjects.find((s) => s.id === mapped.subject_id);
			return mapped;
		});
	},
	async getQuestionsByExamId(examId) {
		if (isInMockMode()) return mockQuestions.filter((q) => q.de_id === examId).map((q) => ({
			...q,
			answers: q.options.map((opt, idx) => {
				const letter = String.fromCharCode(65 + idx);
				const correctLetters = (q.answer || "").split(",").map((l) => l.trim().toUpperCase());
				return {
					id: `${q.id}-${letter}`,
					question_id: q.id,
					content: opt,
					is_correct: correctLetters.includes(letter)
				};
			})
		}));
		const _adminCl = adminClient();
		if (!_adminCl) console.warn("[db.getQuestionsByExamId] Admin client unavailable (missing SUPABASE_SERVICE_ROLE_KEY?), falling back to anon client — RLS may block SSR reads.");
		const client = _adminCl || supabase;
		if (!client) {
			console.error("[db.getQuestionsByExamId] No Supabase client available (both admin and anon are null).");
			return [];
		}
		const { data: questions, error: qError } = await client.from("questions").select("*").eq("de_id", examId).order("phan").order("so_cau");
		if (qError) {
			console.error("[db.getQuestionsByExamId] Supabase query error:", qError.message);
			throw qError;
		}
		return (questions || []).map((q) => mapDbQuestionToAppQuestion(q));
	},
	async createQuestion(question, answers) {
		if (isInMockMode()) {
			const newQuestion = {
				...question,
				id: `q-${Date.now()}`
			};
			mockQuestions.push(newQuestion);
			const newAnswers = answers.map((ans, idx) => {
				const a = {
					...ans,
					id: `a-${Date.now()}-${idx}`,
					question_id: newQuestion.id
				};
				mockAnswers.push(a);
				return a;
			});
			return {
				...newQuestion,
				answers: newAnswers
			};
		}
		const _adminCl = adminClient();
		const options = question.type === "sa" ? [] : answers.map((a) => a.content);
		const alphabet = [
			"A",
			"B",
			"C",
			"D",
			"E",
			"F",
			"G",
			"H"
		];
		const correctLetters = answers.map((a, idx) => a.is_correct ? alphabet[idx] : null).filter(Boolean);
		const answerStr = question.type === "sa" ? question.answer || "" : correctLetters.join(",");
		const metadata = {
			difficulty: question.difficulty,
			type: question.type,
			explanation: question.explanation,
			subject_id: question.subject_id,
			grade: "12",
			...question.created_by ? { created_by: question.created_by } : {},
			...question.metadata || {}
		};
		const de_id = "bank";
		const { data: countData, error: countError } = await _adminCl.from("questions").select("so_cau").eq("de_id", de_id).order("so_cau", { ascending: false }).limit(1);
		let nextSoCau = 1;
		if (countData && countData.length > 0) nextSoCau = countData[0].so_cau + 1;
		const dbInsert = {
			de_id,
			so_cau: nextSoCau,
			phan: "I",
			content: question.content,
			options,
			answer: answerStr,
			metadata,
			image_url: null
		};
		const { data: newQ, error: qError } = await _adminCl.from("questions").insert([dbInsert]).select().single();
		if (qError) throw qError;
		return mapDbQuestionToAppQuestion(newQ);
	},
	async updateQuestion(id, question, answers) {
		if (isInMockMode()) {
			const qIndex = mockQuestions.findIndex((q) => q.id === id);
			if (qIndex === -1) throw new Error("Question not found");
			mockQuestions[qIndex] = {
				...mockQuestions[qIndex],
				...question
			};
			if (answers) {
				mockAnswers = mockAnswers.filter((a) => a.question_id !== id);
				answers.forEach((ans, idx) => {
					mockAnswers.push({
						id: ans.id || `a-${Date.now()}-${idx}`,
						question_id: id,
						content: ans.content,
						is_correct: ans.is_correct
					});
				});
			}
			return {
				...mockQuestions[qIndex],
				answers: mockAnswers.filter((a) => a.question_id === id)
			};
		}
		const _adminCl = adminClient();
		const { data: existingQ, error: fetchErr } = await _adminCl.from("questions").select("*").eq("id", id).single();
		if (fetchErr) throw fetchErr;
		const existingMetadata = existingQ.metadata || {};
		const updatedMetadata = {
			...existingMetadata,
			...question.difficulty ? { difficulty: question.difficulty } : {},
			...question.type ? { type: question.type } : {},
			...question.explanation !== void 0 ? { explanation: question.explanation } : {},
			...question.subject_id ? { subject_id: question.subject_id } : {},
			...question.metadata || {}
		};
		const currentType = question.type || existingMetadata.type;
		const dbUpdate = {
			...question.content ? { content: question.content } : {},
			metadata: updatedMetadata
		};
		if (currentType === "sa") {
			dbUpdate.options = [];
			dbUpdate.answer = question.answer || "";
		} else if (answers) {
			const options = answers.map((a) => a.content);
			const alphabet = [
				"A",
				"B",
				"C",
				"D",
				"E",
				"F",
				"G",
				"H"
			];
			const answerStr = answers.map((a, idx) => a.is_correct ? alphabet[idx] : null).filter(Boolean).join(",");
			dbUpdate.options = options;
			dbUpdate.answer = answerStr;
		}
		const { data: updatedQ, error: qError } = await _adminCl.from("questions").update(dbUpdate).eq("id", id).select().single();
		if (qError) throw qError;
		return mapDbQuestionToAppQuestion(updatedQ);
	},
	async deleteQuestion(id) {
		if (isInMockMode()) {
			mockQuestions = mockQuestions.filter((q) => q.id !== id);
			mockAnswers = mockAnswers.filter((a) => a.question_id !== id);
			return;
		}
		const { error } = await adminClient().from("questions").delete().eq("id", id);
		if (error) throw error;
	},
	async getAttempts(userId) {
		if (isInMockMode()) return mockAttempts.filter((a) => a.user_id === userId).map((att) => {
			const exam = mockExams.find((e) => e.id === att.exam_id);
			const subject = exam ? mockSubjects.find((s) => s.id === exam.subject_id) : void 0;
			return {
				...att,
				exam: exam ? {
					...exam,
					subject
				} : void 0
			};
		}).sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());
		const { data, error } = await adminClient().from("attempts").select("*, exam:exams(*, subject:subjects(*))").eq("user_id", userId).order("started_at", { ascending: false });
		if (error) throw error;
		return data || [];
	},
	async getAttemptById(id) {
		if (isInMockMode()) {
			const att = mockAttempts.find((a) => a.id === id);
			if (!att) return null;
			const exam = mockExams.find((e) => e.id === att.exam_id);
			const subject = exam ? mockSubjects.find((s) => s.id === exam.subject_id) : void 0;
			return {
				...att,
				exam: exam ? {
					...exam,
					subject
				} : void 0
			};
		}
		const { data, error } = await adminClient().from("attempts").select("*, exam:exams(*, subject:subjects(*))").eq("id", id).single();
		if (error) return null;
		return data;
	},
	async createAttempt(userId, examId) {
		if (isInMockMode()) {
			const newAttempt = {
				id: `att-${Date.now()}`,
				user_id: userId || `guest-${Date.now()}`,
				exam_id: examId,
				score: null,
				answers_submitted: null,
				started_at: (/* @__PURE__ */ new Date()).toISOString(),
				finished_at: null
			};
			mockAttempts.push(newAttempt);
			return newAttempt;
		}
		const { data, error } = await adminClient().from("attempts").insert([{
			user_id: userId || null,
			exam_id: examId
		}]).select().single();
		if (error) throw error;
		return data;
	},
	async submitAttempt(attemptId, score, answersSubmitted) {
		if (isInMockMode()) {
			const index = mockAttempts.findIndex((a) => a.id === attemptId);
			if (index === -1) throw new Error("Attempt not found");
			mockAttempts[index] = {
				...mockAttempts[index],
				score,
				answers_submitted: answersSubmitted,
				finished_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			return mockAttempts[index];
		}
		const { data, error } = await adminClient().from("attempts").update({
			score,
			answers_submitted: answersSubmitted,
			finished_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", attemptId).select().single();
		if (error) throw error;
		return data;
	},
	async getAllAttempts() {
		if (isInMockMode()) return mockAttempts.map((att) => ({
			...att,
			exam: mockExams.find((e) => e.id === att.exam_id),
			user: mockUsers.find((u) => u.id === att.user_id)
		})).sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());
		const { data, error } = await adminClient().from("attempts").select("*, exam:exams(*), user:users(*)").order("started_at", { ascending: false });
		if (error) throw error;
		return data || [];
	},
	async getUsers() {
		if (isInMockMode()) return mockUsers;
		const { data, error } = await adminClient().from("users").select("*").order("created_at");
		if (error) throw error;
		return data || [];
	},
	async getUserById(id) {
		if (isInMockMode()) return mockUsers.find((u) => u.id === id) || null;
		const { data, error } = await adminClient().from("users").select("*").eq("id", id).single();
		if (error) {
			const mockUser = mockUsers.find((u) => u.id === id);
			if (mockUser) return mockUser;
			return null;
		}
		return data;
	},
	async updateUserProfile(id, updates) {
		if (isInMockMode()) {
			const index = mockUsers.findIndex((u) => u.id === id);
			if (index === -1) throw new Error("User not found");
			mockUsers[index] = {
				...mockUsers[index],
				...updates
			};
			return mockUsers[index];
		}
		const { data, error } = await adminClient().from("users").update(updates).eq("id", id).select().single();
		if (error) throw error;
		return data;
	},
	async updateUserRole(id, role) {
		if (isInMockMode()) {
			const index = mockUsers.findIndex((u) => u.id === id);
			if (index === -1) throw new Error("User not found");
			mockUsers[index].role = role;
			return mockUsers[index];
		}
		const _ac = adminClient();
		if (_ac) {
			const { data: data2, error: error2 } = await _ac.from("users").update({ role }).eq("id", id).select().single();
			if (error2) throw error2;
			return data2;
		}
		const _anon = anonClient();
		if (!_anon) throw new Error("No Supabase client available");
		const { data, error } = await _anon.from("users").update({ role }).eq("id", id).select().single();
		if (error) throw error;
		return data;
	},
	async getComments(blogId) {
		if (isInMockMode()) return mockComments.filter((c) => c.blog_id === blogId).map((c) => ({
			...c,
			user: mockUsers.find((u) => u.id === c.user_id)
		})).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
		return [];
	},
	async createComment(comment) {
		if (isInMockMode()) {
			const newComment = {
				...comment,
				id: `cmt-${Date.now()}`,
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			mockComments.push(newComment);
			return newComment;
		}
		throw new Error("Cannot create comment: no database configured");
	},
	async deleteComment(id) {
		if (isInMockMode()) {
			mockComments = mockComments.filter((c) => c.id !== id);
			return;
		}
		throw new Error("Cannot delete comment: no database configured");
	},
	async getBlogs(createdBy) {
		if (isInMockMode()) {
			let blogs = mockBlogs;
			if (createdBy) blogs = blogs.filter((b) => b.created_by === createdBy);
			return [...blogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
		}
		return [];
	},
	async getBlogById(id) {
		if (isInMockMode()) return mockBlogs.find((b) => b.id === id) || null;
		return null;
	},
	async getBlogBySlug(slug) {
		if (isInMockMode()) return mockBlogs.find((b) => b.slug === slug) || null;
		return null;
	},
	async getBlogCategories() {
		return [];
	},
	async createBlog(blog) {
		if (isInMockMode()) {
			const newBlog = {
				...blog,
				id: `blog-${Date.now()}`,
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			mockBlogs.push(newBlog);
			return newBlog;
		}
		throw new Error("Cannot create blog: no database configured");
	},
	async updateBlog(id, blog) {
		if (isInMockMode()) {
			const index = mockBlogs.findIndex((b) => b.id === id);
			if (index === -1) throw new Error("Blog not found");
			mockBlogs[index] = {
				...mockBlogs[index],
				...blog
			};
			return mockBlogs[index];
		}
		throw new Error("Cannot update blog: no database configured");
	},
	async deleteBlog(id) {
		if (isInMockMode()) {
			mockBlogs = mockBlogs.filter((b) => b.id !== id);
			return;
		}
		throw new Error("Cannot delete blog: no database configured");
	},
	async getCourses(options) {
		if (isInMockMode()) {
			let courses2 = [...mockCourses];
			if (options?.publishedOnly) courses2 = courses2.filter((c) => c.is_published);
			if (options?.createdBy) courses2 = courses2.filter((c) => c.created_by === options.createdBy);
			if (options?.subjectId) courses2 = courses2.filter((c) => c.subject_id === options.subjectId);
			return courses2.map((c) => ({
				...c,
				subject: mockSubjects.find((s) => s.id === c.subject_id),
				lessonCount: mockCourseLessons.filter((l) => l.course_id === c.id).length,
				enrollmentCount: mockEnrollments.filter((e) => e.course_id === c.id).length,
				teacher: mockUsers.find((u) => u.id === c.created_by) ? {
					id: c.created_by,
					fullname: mockUsers.find((u) => u.id === c.created_by).fullname,
					avatar_url: mockUsers.find((u) => u.id === c.created_by).avatar_url
				} : void 0
			}));
		}
		const client = adminClient();
		let query = client.from("courses").select("*").order("created_at", { ascending: false });
		if (options?.publishedOnly) query = query.eq("is_published", true);
		if (options?.createdBy) query = query.eq("created_by", options.createdBy);
		if (options?.subjectId) query = query.eq("subject_id", options.subjectId);
		const { data, error } = await query;
		if (error) throw error;
		const courses = data || [];
		const courseIds = courses.map((c) => c.id);
		const subjectIds = [...new Set(courses.map((c) => c.subject_id).filter(Boolean))];
		let subjectsMap = {};
		if (subjectIds.length > 0) {
			const { data: subData } = await client.from("subjects").select("*").in("id", subjectIds);
			if (subData) subjectsMap = Object.fromEntries(subData.map((s) => [s.id, s]));
		}
		const teacherIds = [...new Set(courses.map((c) => c.created_by).filter(Boolean))];
		let teachersMap = {};
		if (teacherIds.length > 0) {
			const { data: teachers } = await client.from("users").select("id, fullname, avatar_url").in("id", teacherIds);
			if (teachers) teachersMap = Object.fromEntries(teachers.map((t) => [t.id, t]));
		}
		let lessonCountMap = {};
		if (courseIds.length > 0) {
			const { data: allLessons } = await client.from("course_lessons").select("course_id").in("course_id", courseIds);
			if (allLessons) for (const l of allLessons) lessonCountMap[l.course_id] = (lessonCountMap[l.course_id] || 0) + 1;
		}
		return courses.map((c) => ({
			...c,
			subject: subjectsMap[c.subject_id] || void 0,
			lessonCount: lessonCountMap[c.id] || 0,
			teacher: teachersMap[c.created_by] || void 0
		}));
	},
	async getCourseBySlug(slug) {
		if (isInMockMode()) {
			const course = mockCourses.find((c) => c.slug === slug);
			if (!course) return null;
			return {
				...course,
				subject: mockSubjects.find((s) => s.id === course.subject_id)
			};
		}
		const client = adminClient();
		const { data, error } = await client.from("courses").select("*").eq("slug", slug).single();
		if (error) return null;
		if (data?.subject_id) {
			const { data: subData } = await client.from("subjects").select("*").eq("id", data.subject_id).single();
			return {
				...data,
				subject: subData || void 0
			};
		}
		return data;
	},
	async getCourseById(id) {
		if (isInMockMode()) {
			const course = mockCourses.find((c) => c.id === id);
			if (!course) return null;
			return {
				...course,
				subject: mockSubjects.find((s) => s.id === course.subject_id)
			};
		}
		const client = adminClient();
		const { data, error } = await client.from("courses").select("*").eq("id", id).single();
		if (error) return null;
		if (data?.subject_id) {
			const { data: subData } = await client.from("subjects").select("*").eq("id", data.subject_id).single();
			return {
				...data,
				subject: subData || void 0
			};
		}
		return data;
	},
	async createCourse(course) {
		if (isInMockMode()) {
			const newCourse = {
				...course,
				id: `course-${Date.now()}`,
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			mockCourses.push(newCourse);
			return newCourse;
		}
		const { data, error } = await adminClient().from("courses").insert([course]).select().single();
		if (error) throw error;
		return data;
	},
	async updateCourse(id, updates) {
		if (isInMockMode()) {
			const idx = mockCourses.findIndex((c) => c.id === id);
			if (idx === -1) throw new Error("Course not found");
			mockCourses[idx] = {
				...mockCourses[idx],
				...updates
			};
			return mockCourses[idx];
		}
		const { data, error } = await adminClient().from("courses").update(updates).eq("id", id).select().single();
		if (error) throw error;
		return data;
	},
	async deleteCourse(id) {
		if (isInMockMode()) {
			mockCourses = mockCourses.filter((c) => c.id !== id);
			mockCourseLessons = mockCourseLessons.filter((l) => l.course_id !== id);
			return;
		}
		const { error } = await adminClient().from("courses").delete().eq("id", id);
		if (error) throw error;
	},
	async getCourseLessons(courseId) {
		if (isInMockMode()) return mockCourseLessons.filter((l) => l.course_id === courseId).sort((a, b) => a.order_index - b.order_index);
		const { data, error } = await adminClient().from("course_lessons").select("*").eq("course_id", courseId).order("order_index");
		if (error) throw error;
		return data || [];
	},
	async getCourseLessonById(id) {
		if (isInMockMode()) return mockCourseLessons.find((l) => l.id === id) || null;
		const { data, error } = await adminClient().from("course_lessons").select("*").eq("id", id).single();
		if (error) return null;
		return data;
	},
	async createCourseLesson(lesson) {
		if (isInMockMode()) {
			const newLesson = {
				...lesson,
				id: `cl-${Date.now()}`,
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			mockCourseLessons.push(newLesson);
			return newLesson;
		}
		const { data, error } = await adminClient().from("course_lessons").insert([lesson]).select().single();
		if (error) throw error;
		return data;
	},
	async updateCourseLesson(id, updates) {
		if (isInMockMode()) {
			const idx = mockCourseLessons.findIndex((l) => l.id === id);
			if (idx === -1) throw new Error("Lesson not found");
			mockCourseLessons[idx] = {
				...mockCourseLessons[idx],
				...updates
			};
			return mockCourseLessons[idx];
		}
		const { data, error } = await adminClient().from("course_lessons").update(updates).eq("id", id).select().single();
		if (error) throw error;
		return data;
	},
	async deleteCourseLesson(id) {
		if (isInMockMode()) {
			mockCourseLessons = mockCourseLessons.filter((l) => l.id !== id);
			return;
		}
		const { error } = await adminClient().from("course_lessons").delete().eq("id", id);
		if (error) throw error;
	},
	async enrollUserInCourse(courseId, userId) {
		if (isInMockMode()) {
			const exists = mockEnrollments.find((e) => e.course_id === courseId && e.user_id === userId);
			if (exists) return exists;
			const newEnrollment = {
				id: `enr-${Date.now()}`,
				course_id: courseId,
				user_id: userId,
				enrolled_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			mockEnrollments.push(newEnrollment);
			return newEnrollment;
		}
		const { data, error } = await adminClient().from("course_enrollments").upsert({
			course_id: courseId,
			user_id: userId
		}, { onConflict: "course_id,user_id" }).select().single();
		if (error) throw error;
		return data;
	},
	async getUserEnrollments(userId) {
		if (isInMockMode()) return mockEnrollments.filter((e) => e.user_id === userId).map((e) => {
			const course = mockCourses.find((c) => c.id === e.course_id);
			return {
				...e,
				course: course ? {
					...course,
					subject: mockSubjects.find((s) => s.id === course.subject_id)
				} : void 0
			};
		});
		const client = adminClient();
		const { data: enrollments, error } = await client.from("course_enrollments").select("*, course:courses(*)").eq("user_id", userId);
		if (error) throw error;
		if (!enrollments || enrollments.length === 0) return [];
		const subjectIds = [...new Set(enrollments.map((e) => e.course?.subject_id).filter(Boolean))];
		let subjectsMap = {};
		if (subjectIds.length > 0) {
			const { data: subData } = await client.from("subjects").select("*").in("id", subjectIds);
			if (subData) subjectsMap = Object.fromEntries(subData.map((s) => [s.id, s]));
		}
		return enrollments.map((e) => ({
			...e,
			course: e.course ? {
				...e.course,
				subject: subjectsMap[e.course.subject_id] || void 0
			} : void 0
		}));
	},
	async isUserEnrolled(courseId, userId) {
		if (isInMockMode()) return mockEnrollments.some((e) => e.course_id === courseId && e.user_id === userId);
		const { data } = await adminClient().from("course_enrollments").select("id").eq("course_id", courseId).eq("user_id", userId).maybeSingle();
		return !!data;
	},
	async markLessonComplete(lessonId, userId) {
		if (isInMockMode()) {
			const existing = mockLessonProgress.find((p) => p.lesson_id === lessonId && p.user_id === userId);
			if (existing) {
				existing.completed = true;
				existing.completed_at = (/* @__PURE__ */ new Date()).toISOString();
				return existing;
			}
			const newProgress = {
				id: `lp-${Date.now()}`,
				lesson_id: lessonId,
				user_id: userId,
				completed: true,
				completed_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			mockLessonProgress.push(newProgress);
			return newProgress;
		}
		const { data, error } = await adminClient().from("lesson_progress").upsert({
			lesson_id: lessonId,
			user_id: userId,
			completed: true,
			completed_at: (/* @__PURE__ */ new Date()).toISOString()
		}, { onConflict: "lesson_id,user_id" }).select().single();
		if (error) throw error;
		return data;
	},
	async getLessonProgress(userId, courseId) {
		if (isInMockMode()) {
			let progress = mockLessonProgress.filter((p) => p.user_id === userId);
			if (courseId) {
				const lessonIds = mockCourseLessons.filter((l) => l.course_id === courseId).map((l) => l.id);
				progress = progress.filter((p) => lessonIds.includes(p.lesson_id));
			}
			return progress;
		}
		const client = adminClient();
		let query = client.from("lesson_progress").select("*").eq("user_id", userId);
		if (courseId) {
			const { data: lessons } = await client.from("course_lessons").select("id").eq("course_id", courseId);
			if (lessons) query = query.in("lesson_id", lessons.map((l) => l.id));
		}
		const { data, error } = await query;
		if (error) throw error;
		return data || [];
	}
};
//#endregion
export { db as t };
