import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as getCollection } from "./_astro_content_CYWRd-4B.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/components/LessonCard.astro
createAstro("https://lop12.com");
var $$LessonCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LessonCard;
	const { lesson, subject, color = "vermillion" } = Astro.props;
	const accent = {
		blue: {
			badge: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50",
			title: "text-blue-800 dark:text-blue-300",
			titleHover: "hover:text-blue-600 dark:hover:text-blue-200",
			svgBox: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 border-blue-200/60 dark:border-blue-700/40",
			link: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
			grad: "from-blue-500/0 via-blue-500/40 to-blue-500/0",
			border: "border-gray-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700",
			shadow: "hover:shadow-xl hover:shadow-blue-500/10"
		},
		amber: {
			badge: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/50",
			title: "text-blue-800 dark:text-blue-300",
			titleHover: "hover:text-blue-600 dark:hover:text-blue-200",
			svgBox: "bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/40 dark:to-amber-800/20 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-700/40",
			link: "text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300",
			grad: "from-amber-500/0 via-amber-500/40 to-amber-500/0",
			border: "border-gray-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700",
			shadow: "hover:shadow-xl hover:shadow-amber-500/10"
		},
		emerald: {
			badge: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50",
			title: "text-blue-800 dark:text-blue-300",
			titleHover: "hover:text-blue-600 dark:hover:text-blue-200",
			svgBox: "bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/40 dark:to-emerald-800/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-700/40",
			link: "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300",
			grad: "from-emerald-500/0 via-emerald-500/40 to-emerald-500/0",
			border: "border-gray-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700",
			shadow: "hover:shadow-xl hover:shadow-emerald-500/10"
		},
		purple: {
			badge: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/50",
			title: "text-blue-800 dark:text-blue-300",
			titleHover: "hover:text-blue-600 dark:hover:text-blue-200",
			svgBox: "bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/40 dark:to-purple-800/20 text-purple-600 dark:text-purple-400 border-purple-200/60 dark:border-purple-700/40",
			link: "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
			grad: "from-purple-500/0 via-purple-500/40 to-purple-500/0",
			border: "border-gray-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700",
			shadow: "hover:shadow-xl hover:shadow-purple-500/10"
		},
		vermillion: {
			badge: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200/50 dark:border-orange-800/50",
			title: "text-blue-800 dark:text-blue-300",
			titleHover: "hover:text-blue-600 dark:hover:text-blue-200",
			svgBox: "bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/40 dark:to-orange-800/20 text-orange-600 dark:text-orange-400 border-orange-200/60 dark:border-orange-700/40",
			link: "text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300",
			grad: "from-orange-500/0 via-orange-500/40 to-orange-500/0",
			border: "border-gray-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-700",
			shadow: "hover:shadow-xl hover:shadow-orange-500/10"
		}
	};
	const a = accent[color] || accent.vermillion;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`bg-white dark:bg-slate-900 rounded-2xl group flex flex-col justify-between p-6 relative transition-all duration-300 border ${a.border} ${a.shadow}`, "class")}><div${addAttribute(`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${a.grad} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-400`, "class")}></div><div><div class="flex items-start justify-between mb-4"><div${addAttribute(`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${a.svgBox}`, "class")}><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path><path d="M8 7h6"></path><path d="M8 11h8"></path></svg></div>${subject && renderTemplate`<span${addAttribute(`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${a.badge}`, "class")}>${subject.name}</span>`}</div><h3${addAttribute(`text-lg font-bold line-clamp-2 leading-snug transition-colors font-serif ${a.title} ${a.titleHover}`, "class")}><a${addAttribute(`/lms/${subject?.slug || "toan-12"}/${lesson.slug}`, "href")} class="focus:outline-none before:absolute before:inset-0">${lesson.title}</a></h3><p class="text-sm text-gray-500 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">${lesson.description || "Học lý thuyết chi tiết, xem video hướng dẫn bài giảng, giải bài tập công thức LaTeX và tài liệu PDF đính kèm."}</p></div><div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-slate-800"><span class="text-xs font-medium text-gray-400 dark:text-slate-500 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>${new Date(lesson.created_at).toLocaleDateString("vi-VN")}</span><span${addAttribute(`inline-flex items-center text-sm font-bold ${a.link} group/link relative z-10`, "class")}>Học ngay<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></span></div></div>`;
}, "D:/lop12/src/components/LessonCard.astro", void 0);
//#endregion
//#region src/components/AdUnit.astro
createAstro("https://lop12.com");
var $$AdUnit = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdUnit;
	const { type = "responsive", adSlot = "0000000000", class: className = "", label = "Quảng cáo" } = Astro.props;
	const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";
	const sizeMap = {
		responsive: {
			width: "100%",
			height: "auto",
			format: "auto"
		},
		horizontal: {
			width: "728px",
			height: "90px",
			format: "horizontal"
		},
		rectangle: {
			width: "300px",
			height: "250px",
			format: "rectangle"
		},
		vertical: {
			width: "160px",
			height: "600px",
			format: "vertical"
		}
	};
	const size = sizeMap[type] ?? sizeMap.responsive;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`ad-unit-wrapper relative overflow-hidden text-center ${className}`, "class")}${addAttribute(label, "aria-label")} role="complementary"><!-- Label mờ phía trên --><p class="text-[10px] font-bold uppercase tracking-widest text-gray-400/60 dark:text-slate-600/60 mb-1 select-none">${label}</p><!-- AdSense ins element --><ins class="adsbygoogle"${addAttribute(`display:block; width:${size.width}; height:${size.height};`, "style")}${addAttribute(ADSENSE_CLIENT, "data-ad-client")}${addAttribute(adSlot, "data-ad-slot")}${addAttribute(size.format, "data-ad-format")}${addAttribute(type === "responsive" ? "true" : void 0, "data-full-width-responsive")}></ins></div><script>
  // Đẩy ad sau khi trang tải xong để tránh ảnh hưởng đến LCP
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch(e) {}
      });
    } else {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch(e) {}
    }
  }
<\/script>`;
}, "D:/lop12/src/components/AdUnit.astro", void 0);
//#endregion
//#region src/pages/ly-thuyet/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const subject = (await db.getSubjects()).find((s) => s.slug === slug);
	if (!subject) return Astro.redirect("/lms/ly-thuyet");
	const lessons = (await getCollection("lessons")).filter((entry) => entry.id.startsWith(subject.slug + "/")).sort((a, b) => {
		return (a.data.lessons?.[0]?.lesson_id || 0) - (b.data.lessons?.[0]?.lesson_id || 0);
	}).map((entry) => {
		const lessonData = entry.data.lessons?.[0] || {};
		return {
			id: entry.id,
			subject_id: subject.id,
			title: lessonData.name || entry.id,
			slug: entry.id.split("/").pop() || entry.id,
			video_url: lessonData.video_url || null,
			description: lessonData.description || "",
			content: "",
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		};
	});
	const getSubjectColor = (slug) => {
		if (slug === "toan-12") return "blue";
		if (slug === "vat-ly-12") return "purple";
		if (slug === "hoa-hoc-12") return "emerald";
		if (slug === "sinh-hoc-12") return "emerald";
		if (slug === "tieng-anh-12") return "amber";
		return "vermillion";
	};
	const color = getSubjectColor(subject.slug);
	const siteUrl = "https://lms.lop12.com";
	const subjectDescription = {
		"toan-12": `Học và luyện thi môn Toán lớp 12: Hàm số và đồ thị, Tích phân, Số phức, Hình học không gian, Xác suất. ${lessons.length} bài giảng và nhiều đề thi thử THPT.`,
		"vat-ly-12": `Học và luyện thi môn Vật lý lớp 12: Dao động cơ, Sóng cơ, Điện xoay chiều, Sóng ánh sáng, Hạt nhân. ${lessons.length} bài giảng và đề thi trắc nghiệm bám sát cấu trúc mới.`,
		"hoa-hoc-12": `Học và luyện thi môn Hóa học lớp 12: Este, Lipit, Amin, Aminoaxit, Polime, Kim loại kiềm. ${lessons.length} bài giảng lý thuyết và bài tập ôn thi.`,
		"sinh-hoc-12": `Học và luyện thi môn Sinh học lớp 12: Di truyền học phân tử, Quy luật di truyền, Tiến hóa, Sinh thái học. ${lessons.length} bài giảng chi tiết.`,
		"ngu-van-12": `Học và luyện thi môn Ngữ Văn lớp 12: Đọc hiểu văn bản, Nghị luận xã hội, Nghị luận văn học, Tác phẩm trọng tâm. ${lessons.length} bài giảng ôn thi THPT.`,
		"lich-su-12": `Học và luyện thi môn Lịch Sử lớp 12: Lịch sử Việt Nam hiện đại, Lịch sử thế giới, Cách mạng Việt Nam. ${lessons.length} bài giảng chính sách mới.`,
		"dia-ly-12": `Học và luyện thi môn Địa Lý lớp 12: Địa lý tự nhiên Việt Nam, Địa lý kinh tế - xã hội, Dân số. ${lessons.length} bài giảng cập nhật.`,
		"ktpl-12": `Học và luyện thi môn KTPL lớp 12: Kinh tế vĩ mô, Pháp luật Việt Nam, Quyền công dân, Hôn nhân gia đình. ${lessons.length} bài giảng cập nhật.`,
		"tieng-anh-12": `Học và luyện thi môn Tiếng Anh lớp 12: Ngữ pháp nâng cao, Phát âm, Từ vựng, Đọc hiểu và Viết luận. ${lessons.length} bài giảng chuẩn cấu trúc mới.`,
		"tin-hoc-12": `Học và luyện thi môn Tin Học lớp 12: Lập trình Python, Cơ sở dữ liệu, Mạng máy tính. ${lessons.length} bài giảng thực hành.`,
		"cong-nghe-12": `Học và luyện thi môn Công Nghệ lớp 12: Điện tử, Cơ khí, Công nghệ thông tin. ${lessons.length} bài giảng thực tiễn.`
	}[subject.slug] || `Học và luyện thi môn ${subject.name} lớp 12. Cổng thông tin tự học và thi trắc nghiệm trực tuyến. ${lessons.length} bài giảng, nhiều đề thi thử THPT.`;
	const courseSchema = {
		"@context": "https://schema.org",
		"@type": "Course",
		name: `${subject.name} - Lớp 12 LMS`,
		description: subjectDescription,
		url: `${siteUrl}/subjects/${subject.slug}`,
		provider: {
			"@type": "Organization",
			name: "Lớp 12 LMS",
			url: siteUrl
		},
		educationalLevel: "Lớp 12 - THPT",
		inLanguage: "vi",
		numberOfCredits: lessons.length
	};
	const breadcrumbs = [{
		name: "Môn học",
		url: "/ly-thuyet"
	}, {
		name: subject.name,
		url: `/ly-thuyet/${subject.slug}`
	}];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": subject.name,
		"description": subjectDescription,
		"structuredData": courseSchema,
		"breadcrumbs": breadcrumbs
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-6"><!-- Back breadcrumb & Header --><div><a href="/lms/ly-thuyet" class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>Tất cả môn học</a><h1 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">${subject.name}</h1><p class="text-sm text-gray-500 dark:text-slate-455 mt-1">Cổng thông tin tự học và luyện thi trắc nghiệm môn ${subject.name} lớp 12.</p></div><!-- Section header --><div class="border-b border-gray-200 dark:border-slate-800 flex space-x-8"><div class="pb-4 px-1 text-sm font-bold border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400">Bài giảng lý thuyết (${lessons.length})</div></div><!-- Contents --><div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${lessons.length === 0 ? renderTemplate`<div class="col-span-full text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-gray-250 dark:border-slate-800"><p class="text-sm text-gray-500 dark:text-slate-400">Môn học này hiện chưa có bài giảng nào được đăng tải.</p></div>` : lessons.map((lesson) => renderTemplate`${renderComponent($$result, "LessonCard", $$LessonCard, {
		"lesson": lesson,
		"subject": subject,
		"color": color
	})}`)}</div></div><!-- Ad Unit cuối trang môn học -->${renderComponent($$result, "AdUnit", $$AdUnit, {
		"type": "responsive",
		"adSlot": "1122334455",
		"class": "mt-2"
	})}</div>` })}`;
}, "D:/lop12/src/pages/ly-thuyet/[slug].astro", void 0);
var $$file = "D:/lop12/src/pages/ly-thuyet/[slug].astro";
var $$url = "/lms/ly-thuyet/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/ly-thuyet/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
