import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import "./supabase_Dc0ZEBVu.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as getCollection } from "./_astro_content_CYWRd-4B.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/components/ExamCard.astro
createAstro("https://lop12.com");
var $$ExamCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ExamCard;
	const { exam, color = "vermillion", examIndex = 0 } = Astro.props;
	const examTypeNames = {
		"15m": "Kiểm tra 15p",
		"45m": "Kiểm tra 1 tiết",
		"semester": "Thi học kỳ",
		"mock_thpt": "Thi thử THPT"
	};
	const examTypeColors = {
		blue: {
			"15m": "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border-blue-100/50",
			"45m": "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100/50",
			"semester": "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100/50",
			"mock_thpt": "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-100/50"
		},
		amber: {
			"15m": "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100/50",
			"45m": "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100/50",
			"semester": "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100/50",
			"mock_thpt": "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-100/50"
		},
		emerald: {
			"15m": "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100/50",
			"45m": "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100/50",
			"semester": "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100/50",
			"mock_thpt": "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-100/50"
		},
		purple: {
			"15m": "bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400 border-purple-100/50",
			"45m": "bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400 border-purple-100/50",
			"semester": "bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400 border-purple-100/50",
			"mock_thpt": "bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 border-rose-100/50"
		},
		vermillion: {
			"15m": "bg-vermillion-50 text-vermillion-600 dark:bg-vermillion-900/20 dark:text-vermillion-400 border-vermillion-100/50 dark:border-vermillion-900/35",
			"45m": "bg-[#F5F0E8] text-gold-600 dark:bg-gold-900/20 dark:text-gold-400 border-[#E8DDD0]/50 dark:border-gold-900/35",
			"semester": "bg-[#F0F5F0] text-jade dark:bg-jade/10 dark:text-jade border-[#D0E0D0]/50 dark:border-jade/20",
			"mock_thpt": "bg-vermillion-50 text-vermillion-600 dark:bg-vermillion-900/20 dark:text-vermillion-400 border-vermillion-100/50 dark:border-vermillion-900/35"
		}
	};
	const accent = {
		blue: {
			titleHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
			btn: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
			btnHover: "hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white",
			grad: "from-blue-500/0 via-blue-500/40 to-blue-500/0",
			border: "hover:border-blue-300 dark:hover:border-blue-700",
			shadow: "hover:shadow-blue-500/10"
		},
		amber: {
			titleHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
			btn: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
			btnHover: "hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white",
			grad: "from-amber-500/0 via-amber-500/40 to-amber-500/0",
			border: "hover:border-amber-300 dark:hover:border-amber-700",
			shadow: "hover:shadow-amber-500/10"
		},
		emerald: {
			titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
			btn: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30",
			btnHover: "hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white",
			grad: "from-emerald-500/0 via-emerald-500/40 to-emerald-500/0",
			border: "hover:border-emerald-300 dark:hover:border-emerald-700",
			shadow: "hover:shadow-emerald-500/10"
		},
		purple: {
			titleHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
			btn: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-100 dark:border-purple-900/30",
			btnHover: "hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white",
			grad: "from-purple-500/0 via-purple-500/40 to-purple-500/0",
			border: "hover:border-purple-300 dark:hover:border-purple-700",
			shadow: "hover:shadow-purple-500/10"
		},
		vermillion: {
			titleHover: "group-hover:text-vermillion-500 dark:group-hover:text-vermillion-400",
			btn: "bg-vermillion-50 text-vermillion-600 dark:bg-vermillion-900/40 dark:text-vermillion-400 border-vermillion-100 dark:border-vermillion-900/30",
			btnHover: "hover:bg-vermillion-500 hover:text-white dark:hover:bg-vermillion-500 dark:hover:text-white",
			grad: "from-vermillion-500/0 via-vermillion-500/40 to-vermillion-500/0",
			border: "hover:border-vermillion-300 dark:hover:border-vermillion-700",
			shadow: "hover:shadow-vermillion-500/10"
		}
	};
	const cardGradients = [
		"from-blue-50 via-white to-cyan-50 dark:from-[#0A1628] dark:via-[#111827] dark:to-[#0A1628]",
		"from-purple-50 via-fuchsia-50 to-pink-50 dark:from-[#1A0A2E] dark:via-[#1E1235] dark:to-[#251535]",
		"from-amber-50 via-orange-50 to-yellow-50 dark:from-[#1A1408] dark:via-[#1F1808] dark:to-[#251C08]"
	];
	const a = accent[color] || accent.vermillion;
	const etc = examTypeColors[color] || examTypeColors.vermillion;
	const cardGradient = cardGradients[examIndex % cardGradients.length];
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`bg-gradient-to-br ${cardGradient} group flex flex-col justify-between p-6 rounded-2xl relative border border-slate-200/60 dark:border-slate-700/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${a.border} ${a.shadow}`, "class")}><div class="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div><div><div class="flex items-center justify-between mb-4 flex-wrap gap-2">${exam.subject && renderTemplate`<span class="text-xs font-bold text-[#8A7E72] dark:text-[#8A8A9E]">Môn ${exam.subject.name}</span>`}<span${addAttribute(`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${etc[exam.exam_type] || etc["mock_thpt"]}`, "class")}>${examTypeNames[exam.exam_type]}</span></div><h3 class="text-xl font-bold text-blue-600 dark:text-blue-400 line-clamp-2 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors font-serif">${exam.title}</h3>${exam.teacherName && renderTemplate`<div class="mt-3 flex items-center gap-2"><div class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><span class="text-xs font-medium text-[#8A7E72] dark:text-[#8A8A9E]">GV: ${exam.teacherName}</span></div>`}</div><div class="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/40 flex items-center justify-between"><div class="flex items-center space-x-3 text-xs text-[#A89888] dark:text-[#6A6A8A]"><span class="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${exam.duration} phút</span></div><a${addAttribute(`/lms/exams/${exam.id}`, "href")} class="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 shadow-sm hover:shadow-blue-500/20">Vào thi</a></div></div>`;
}, "D:/lop12/src/components/ExamCard.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const subjects = await db.getSubjects();
	const rawLessons = await getCollection("lessons");
	const exams = await db.getExams();
	const courses = await db.getCourses({ publishedOnly: true });
	const users = await db.getUsers();
	const teacherMap = {};
	users.forEach((u) => {
		if (u.fullname) teacherMap[u.id] = u.fullname;
	});
	const lessons = rawLessons.map((entry) => {
		const matchingSubject = subjects.find((s) => s.slug === entry.data.subject);
		return {
			id: entry.id,
			subject_id: matchingSubject ? matchingSubject.id : "",
			title: entry.data.title,
			slug: entry.id.split("/").pop() || entry.id,
			video_url: entry.data.video_url || null,
			content: "",
			created_at: entry.data.created_at || (/* @__PURE__ */ new Date()).toISOString()
		};
	});
	const featuredExams = exams.slice(0, 3).map((exam) => ({
		...exam,
		teacherName: exam.created_by ? teacherMap[exam.created_by] || "Giảng viên" : "Giảng viên"
	}));
	const siteUrl = "https://lms.lop12.com";
	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "EducationalOrganization",
		name: "Lớp 12 LMS",
		url: siteUrl,
		logo: `${siteUrl}/favicon.svg`,
		description: "Cổng luyện thi THPT Quốc gia trực tuyến cho học sinh lớp 12. Bài giảng lý thuyết, đề thi trắc nghiệm và trợ lý AI 24/7.",
		sameAs: [`${siteUrl}`],
		knowsAbout: subjects.map((s) => s.name)
	};
	const subjectListSchema = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Danh sách môn học Lớp 12",
		description: "Đầy đủ 11 môn học lớp 12 với bài giảng lý thuyết và đề thi trắc nghiệm",
		numberOfItems: subjects.length,
		itemListElement: subjects.map((s, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: s.name,
			url: `${siteUrl}/ly-thuyet/${s.slug}`
		}))
	};
	const subjectMetas = {
		"toan-12": {
			icon: "📐",
			desc: "Hàm số, Tích phân, Hình học Oxyz...",
			image: "/lms/images/subjects/math.png",
			borderHover: "hover:border-blue-400   dark:hover:border-blue-600   hover:shadow-blue-500/10",
			textAccent: "text-blue-600   dark:text-blue-400",
			pillColor: "bg-blue-50   text-blue-600"
		},
		"vat-ly-12": {
			icon: "⚡",
			desc: "Dao động cơ, Sóng cơ, Điện xoay chiều...",
			image: "/lms/images/subjects/physics.png",
			borderHover: "hover:border-purple-400  dark:hover:border-purple-600  hover:shadow-purple-500/10",
			textAccent: "text-purple-600 dark:text-purple-400",
			pillColor: "bg-purple-50 text-purple-600"
		},
		"hoa-hoc-12": {
			icon: "🧪",
			desc: "Este, Lipit, Amin, Polime, Hóa hữu cơ...",
			image: "/lms/images/subjects/chemistry.png",
			borderHover: "hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/10",
			textAccent: "text-emerald-600 dark:text-emerald-400",
			pillColor: "bg-emerald-50 text-emerald-600"
		},
		"sinh-hoc-12": {
			icon: "🧬",
			desc: "Di truyền học, Tiến hóa, Sinh thái học...",
			image: "/lms/images/subjects/biology.png",
			borderHover: "hover:border-teal-400   dark:hover:border-teal-600   hover:shadow-teal-500/10",
			textAccent: "text-teal-600   dark:text-teal-400",
			pillColor: "bg-teal-50   text-teal-600"
		},
		"ngu-van-12": {
			icon: "📖",
			desc: "Đọc hiểu văn bản, Nghị luận, Tác phẩm...",
			image: "/lms/images/subjects/literature.png",
			borderHover: "hover:border-rose-400    dark:hover:border-rose-600    hover:shadow-rose-500/10",
			textAccent: "text-rose-600   dark:text-rose-400",
			pillColor: "bg-rose-50   text-rose-600"
		},
		"lich-su-12": {
			icon: "🏛️",
			desc: "Lịch sử Việt Nam, Thế giới, Cách mạng...",
			image: "/lms/images/subjects/history.png",
			borderHover: "hover:border-orange-400  dark:hover:border-orange-600  hover:shadow-orange-500/10",
			textAccent: "text-orange-600 dark:text-orange-400",
			pillColor: "bg-orange-50 text-orange-600"
		},
		"dia-ly-12": {
			icon: "🌏",
			desc: "Địa lý tự nhiên, Kinh tế, Dân số...",
			image: "/lms/images/subjects/geography.png",
			borderHover: "hover:border-cyan-400    dark:hover:border-cyan-600    hover:shadow-cyan-500/10",
			textAccent: "text-cyan-600   dark:text-cyan-400",
			pillColor: "bg-cyan-50   text-cyan-600"
		},
		"ktpl-12": {
			icon: "⚖️",
			desc: "Kinh tế, Pháp luật, Quyền công dân...",
			image: "/lms/images/subjects/ktpl.png",
			borderHover: "hover:border-yellow-400  dark:hover:border-yellow-600  hover:shadow-yellow-500/10",
			textAccent: "text-yellow-600 dark:text-yellow-400",
			pillColor: "bg-yellow-50 text-yellow-600"
		},
		"tieng-anh-12": {
			icon: "🇬🇧",
			desc: "Ngữ pháp, Phát âm, Từ vựng & Đọc hiểu...",
			image: "/lms/images/subjects/english.png",
			borderHover: "hover:border-amber-400   dark:hover:border-amber-600   hover:shadow-amber-500/10",
			textAccent: "text-amber-600  dark:text-amber-400",
			pillColor: "bg-amber-50  text-amber-600"
		},
		"tin-hoc-12": {
			icon: "💻",
			desc: "Lập trình Python, Cơ sở dữ liệu, Mạng...",
			image: "/lms/images/subjects/informatics.png",
			borderHover: "hover:border-violet-400  dark:hover:border-violet-600  hover:shadow-violet-500/10",
			textAccent: "text-violet-600 dark:text-violet-400",
			pillColor: "bg-violet-50 text-violet-600"
		},
		"cong-nghe-12": {
			icon: "⚙️",
			desc: "Điện tử, Cơ khí, Công nghệ thông tin...",
			image: "/lms/images/subjects/technology.png",
			borderHover: "hover:border-slate-400   dark:hover:border-slate-500   hover:shadow-slate-500/10",
			textAccent: "text-slate-600  dark:text-slate-400",
			pillColor: "bg-slate-50  text-slate-600"
		}
	};
	const subjectRows = [
		{
			label: "🔬 Khoa học Tự nhiên",
			slugs: [
				"toan-12",
				"vat-ly-12",
				"hoa-hoc-12",
				"sinh-hoc-12"
			]
		},
		{
			label: "📚 Khoa học Xã hội",
			slugs: [
				"ngu-van-12",
				"lich-su-12",
				"dia-ly-12",
				"ktpl-12"
			]
		},
		{
			label: "🌐 Ngoại ngữ & Kỹ thuật",
			slugs: [
				"tieng-anh-12",
				"tin-hoc-12",
				"cong-nghe-12"
			]
		}
	];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Cổng Học Tập Lớp 12",
		"showSidebar": false,
		"description": "Cổng luyện thi THPT Quốc gia trực tuyến Lớp 12 LMS. Tích hợp bài giảng lý thuyết, ngân hàng câu hỏi trắc nghiệm, đề thi thử và trợ lý học tập AI thông minh.",
		"ogImage": "/images/og-default.png",
		"structuredData": [organizationSchema, subjectListSchema]
	}, { "default": ($$result) => renderTemplate`<script>
    if (document.cookie.indexOf('mock-user-id') !== -1 || document.cookie.indexOf('sb-access-token') !== -1) {
      window.location.href = '/lms/dashboard';
    }
  <\/script>${maybeRenderHead($$result)}<div class="relative py-12 md:py-20 overflow-hidden mb-12 rounded-3xl px-6 md:px-12 border border-slate-200/50 dark:border-slate-800/30"><div class="absolute inset-0 bg-gradient-to-br from-[#F5F0E8] via-[#FAF6EF] to-[#EDE6D8] dark:from-[#1E1E38] dark:via-[#22223A] dark:to-[#1A1A2E]"></div><div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] text-ink dark:text-white pointer-events-none select-none" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22currentColor%22 opacity=%22.03%22/%3E%3Ccircle cx=%22350%22 cy=%2230%22 r=%2225%22 fill=%22currentColor%22 opacity=%22.02%22/%3E%3Ccircle cx=%22380%22 cy=%22150%22 r=%2250%22 fill=%22currentColor%22 opacity=%22.015%22/%3E%3Ccircle cx=%2230%22 cy=%22180%22 r=%2230%22 fill=%22currentColor%22 opacity=%22.025%22/%3E%3Ccircle cx=%22200%22 cy=%22200%22 r=%2220%22 fill=%22currentColor%22 opacity=%22.04%22/%3E%3Ccircle cx=%22100%22 cy=%22350%22 r=%2235%22 fill=%22currentColor%22 opacity=%22.02%22/%3E%3Ccircle cx=%22300%22 cy=%22350%22 r=%2215%22 fill=%22currentColor%22 opacity=%22.03%22/%3E%3C/svg%3E')"></div><!-- Decorative blur backgrounds --><div class="absolute top-1/4 -left-10 w-80 h-80 bg-blue-600/10 dark:bg-blue-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-1/4 -right-10 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl"></div><!-- Outer accent borders --><div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div><div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div><div class="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"><!-- Left side: Text & Call to action --><div class="lg:col-span-7 space-y-6 text-left"><span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-sm shadow-sm"><span class="flex h-2 w-2 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>Luyện thi THPT Quốc Gia môn Toán, Lý, Hóa, Sinh, Anh</span><h1 class="ink-text text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-ink dark:text-[#E8E0D0]">Bứt Phá Điểm Số Lớp 12<span class="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-blue-400">Cùng Trợ Lý Học Tập AI</span></h1><p class="text-sm md:text-base text-[#8A7E72] dark:text-[#A8A0B0] max-w-2xl leading-relaxed">Hệ thống học liệu chuẩn cấu trúc mới, đề thi trắc nghiệm online bấm giờ tự động cùng trợ lý AI giải toán học và lý thuyết chi tiết 24/7.</p><!-- Quick checklist features --><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs md:text-sm text-ink dark:text-[#D8D0C0]"><div class="flex items-center gap-2"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">✓</span><span>Học liệu lý thuyết chuẩn cấu trúc mới</span></div><div class="flex items-center gap-2"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">✓</span><span>Đề thi trắc nghiệm chấm điểm tự động</span></div><div class="flex items-center gap-2"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">✓</span><span>Trợ lý AI hướng dẫn bài giải chi tiết</span></div><div class="flex items-center gap-2"><span class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">✓</span><span>Lộ trình ôn thi 9+ THPT Quốc gia</span></div></div><div class="flex flex-col sm:flex-row items-center gap-4 pt-4"><a href="/lms/register" class="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/15 hover:shadow-blue-600/30 transform hover:-translate-y-0.5 transition-all duration-200 text-sm tracking-wide">Đăng ký học miễn phí<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg></a><a href="/lms/login" class="w-full sm:w-auto inline-flex items-center justify-center border border-blue-500/20 dark:border-blue-400/30 text-ink dark:text-[#E8E0D0] hover:bg-blue-500/5 dark:hover:bg-blue-500/10 font-semibold px-8 py-3.5 rounded-xl backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-200 text-sm tracking-wide">Đăng nhập hệ thống</a></div></div><!-- Right side: Premium 3D Hero Illustration --><div class="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center"><!-- Main Image Card --><div class="relative w-full max-w-[360px] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-[#3A3A5C]/40 group"><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div><img src="/lms/images/hero.png" alt="Học tập cùng AI" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"></div><!-- Floating Badge 1: AI Assistant Status --><div class="absolute -top-4 -left-4 bg-white/95 dark:bg-[#1E1E38]/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-800/40 flex items-center gap-2.5 animate-bounce" style="animation-duration: 4s;"><div class="relative flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></div><div class="text-left"><p class="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Trợ Lý AI</p><p class="text-xs font-bold text-slate-850 dark:text-[#E8E0D0]">Online sẵn sàng</p></div></div><!-- Floating Badge 2: Practice Statistics --><div class="absolute -bottom-4 -right-4 bg-white/95 dark:bg-[#1E1E38]/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-800/40 flex items-center gap-2.5 animate-bounce" style="animation-duration: 5s; animation-delay: 0.5s;"><div class="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">🚀</div><div class="text-left"><p class="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Luyện đề</p><p class="text-xs font-bold text-slate-850 dark:text-[#E8E0D0]">Nhận điểm tức thì</p></div></div></div></div></div><div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 dark:from-[#0A1628] dark:via-[#111827] dark:to-[#0F172A] mb-12 rounded-3xl p-6 md:p-10 border border-blue-200/40 dark:border-blue-900/30"><div class="space-y-8"><div class="flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h2 class="section-title text-blue-700 dark:text-blue-300">Lựa chọn môn học</h2><p class="section-subtitle">Đầy đủ 11 môn học Lớp 12 — bài giảng lý thuyết và đề thi trắc nghiệm chuẩn cấu trúc mới.</p></div><a href="/lms/ly-thuyet" class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors shrink-0">Xem toàn bộ môn học <span class="text-lg leading-none">→</span></a></div>${subjectRows.map((row) => {
		const rowSubjects = subjects.filter((s) => row.slugs.includes(s.slug)).sort((a, b) => row.slugs.indexOf(a.slug) - row.slugs.indexOf(b.slug));
		return renderTemplate`<div class="space-y-3"><!-- Row label --><div class="flex items-center gap-2"><span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">${row.label}</span><div class="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent"></div></div><!-- Row grid: always 4 cols on lg, auto on smaller --><div class="grid grid-cols-2 md:grid-cols-4 gap-5">${rowSubjects.map((subject) => {
			const meta = subjectMetas[subject.slug] || {
				icon: "📚",
				desc: "Bài học và tài liệu ôn tập...",
				image: "/lms/images/subjects/math.png",
				borderHover: "hover:border-blue-400 hover:shadow-blue-500/10",
				textAccent: "text-blue-600 dark:text-blue-400",
				pillColor: "bg-blue-50 text-blue-600"
			};
			const subLessons = lessons.filter((l) => l.subject_id === subject.id).length;
			const subExams = exams.filter((e) => e.subject_id === subject.id).length;
			return renderTemplate`<a${addAttribute(`/lms/ly-thuyet/${subject.slug}`, "href")}${addAttribute(`bg-white dark:bg-[#22223A]/90 border border-slate-200/60 dark:border-slate-800/40 rounded-2xl flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative ${meta.borderHover}`, "class")}><!-- Shimmer accent line --><div class="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div><!-- Cover image --><div class="relative w-full h-28 overflow-hidden bg-slate-100 dark:bg-[#1E1E38]"><img${addAttribute(meta.image, "src")}${addAttribute(subject.name, "alt")} class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" loading="lazy"><div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"></div><div class="absolute bottom-2 left-3 flex items-center justify-center w-8 h-8 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/25"><span class="text-lg filter drop-shadow">${meta.icon}</span></div></div><!-- Body --><div class="p-4 flex-1 flex flex-col justify-between"><div class="space-y-1"><h3${addAttribute(`text-sm font-bold text-ink dark:text-[#E8E0D0] font-serif leading-tight group-hover:${meta.textAccent} transition-colors`, "class")}>${subject.name}</h3><p class="text-[11px] text-[#8A7E72] dark:text-[#8A8A9E] line-clamp-2 leading-relaxed">${meta.desc}</p></div><div class="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 text-[10px] font-bold text-[#A89888] dark:text-[#6A6A8A] uppercase tracking-wider flex justify-between"><span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>${subLessons} bài</span><span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>${subExams} đề</span></div></div></a>`;
		})}</div></div>`;
	})}</div></div><div class="bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 dark:from-[#1A0A2E] dark:via-[#1E1235] dark:to-[#251535] mb-12 rounded-3xl p-6 md:p-10 border border-purple-200/40 dark:border-purple-900/30"><div class="space-y-6"><div class="flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h2 class="section-title text-purple-700 dark:text-purple-300">Khóa học nổi bật</h2><p class="section-subtitle">Hệ thống khóa học bài bản, bám sát cấu trúc đề thi THPT Quốc gia 2025.</p></div><a href="/lms/khoa-hoc" class="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 transition-colors shrink-0">Xem toàn bộ khóa học <span class="text-lg leading-none">→</span></a></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6">${courses.slice(0, 2).map((course) => {
		const subject = subjects.find((s) => s.id === course.subject_id);
		const meta = subjectMetas[subject?.slug || ""] || {
			icon: "📚",
			desc: "Khóa học chất lượng cao",
			image: "/lms/images/subjects/math.png",
			borderHover: "hover:border-purple-400 hover:shadow-purple-500/10",
			textAccent: "text-purple-600 dark:text-purple-400",
			pillColor: "bg-purple-50 text-purple-600"
		};
		return renderTemplate`<a${addAttribute(`/lms/courses/${course.slug}`, "href")}${addAttribute(`bg-white/90 dark:bg-[#1E1E38]/90 border border-purple-200/50 dark:border-purple-800/40 rounded-2xl flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${meta.borderHover}`, "class")}><div class="relative w-full h-36 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 overflow-hidden">${course.cover_url ? renderTemplate`<img${addAttribute(course.cover_url, "src")}${addAttribute(course.title, "alt")} class="w-full h-full object-cover" loading="lazy">` : renderTemplate`<div class="w-full h-full flex items-center justify-center"><span class="text-5xl filter drop-shadow-lg">${meta.icon}</span></div>`}<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>${subject && renderTemplate`<span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 dark:bg-[#1E1E38]/90 backdrop-blur-sm text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/30">${subject.name}</span>`}</div><div class="p-5 flex-1 flex flex-col"><h3 class="text-base font-bold text-ink dark:text-[#E8E0D0] font-serif leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">${course.title}</h3><p class="text-sm text-[#8A7E72] dark:text-[#8A8A9E] line-clamp-2 flex-1">${course.description}</p>${course.teacher && renderTemplate`<div class="mt-3 flex items-center gap-2"><div class="w-6 h-6 rounded-full overflow-hidden bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">${course.teacher.avatar_url ? renderTemplate`<img${addAttribute(course.teacher.avatar_url, "src")}${addAttribute(course.teacher.fullname || "GV", "alt")} class="w-full h-full object-cover">` : renderTemplate`<svg class="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`}</div><span class="text-xs font-medium text-[#8A7E72] dark:text-[#8A8A9E] truncate">GV: ${course.teacher.fullname || "Giảng viên"}</span></div>`}<div class="mt-4 pt-3 border-t border-purple-100 dark:border-purple-800/40 flex items-center justify-between"><div class="flex items-center gap-2 text-xs text-[#A89888] dark:text-[#6A6A8A]"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>${course.lessonCount || 0} bài</div><span${addAttribute(`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${meta.pillColor}`, "class")}>${course.enrollmentCount || 0} học viên</span></div></div></a>`;
	})}</div></div></div><div class="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-[#051510] dark:via-[#0A1E1C] dark:to-[#051820] mb-12 rounded-3xl p-6 md:p-10 border border-emerald-200/40 dark:border-emerald-900/30"><div class="space-y-6"><div class="flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h2 class="section-title text-emerald-700 dark:text-emerald-300">Đề thi thử online bám sát ma trận</h2><p class="section-subtitle">Đề thi có thời gian làm bài, tự động chấm điểm và xem lời giải chi tiết.</p></div><a href="/lms/de-thi" class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors shrink-0">Xem thêm đề thi<span class="text-lg leading-none">→</span></a></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6">${featuredExams.map((exam, idx) => renderTemplate`${renderComponent($$result, "ExamCard", $$ExamCard, {
		"exam": exam,
		"color": "emerald",
		"examIndex": idx
	})}`)}</div></div></div>` })}`;
}, "D:/lop12/src/pages/index.astro", void 0);
var $$file = "D:/lop12/src/pages/index.astro";
var $$url = "/lms";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
