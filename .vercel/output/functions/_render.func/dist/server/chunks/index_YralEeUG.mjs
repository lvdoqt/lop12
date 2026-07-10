import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/exams/[id]/index.astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { id } = Astro.params;
	if (!id) return Astro.redirect("/lms/ly-thuyet");
	const exam = await db.getExamBySlug(id);
	if (!exam) return Astro.redirect("/lms/de-thi");
	const user = Astro.locals.user;
	const questionsCount = (await db.getQuestionsByExamId(exam.id)).length;
	const hasPassword = !!exam.password;
	if (Astro.request.method === "POST") {
		let passwordOk = true;
		let passwordError = "";
		if (hasPassword) {
			const enteredPass = (await Astro.request.formData()).get("exam_password");
			if (!enteredPass || enteredPass.trim() !== exam.password) {
				passwordOk = false;
				passwordError = "Mật khẩu không đúng. Vui lòng kiểm tra lại với giáo viên của bạn.";
			}
		}
		if (passwordOk) try {
			const attempt = await db.createAttempt(user?.id, exam.id);
			return Astro.redirect(`/lms/exams/${exam.slug}/take?attemptId=${attempt.id}`);
		} catch (err) {
			console.error("Failed to create exam attempt:", err);
			serverPasswordError = err.message?.includes("Login") ? "Bạn cần đăng nhập để lưu kết quả thi." : `Lỗi: ${err.message}`;
		}
		var serverPasswordError = passwordError;
	}
	const examTypeNames = {
		"15m": "Kiểm tra 15 phút",
		"45m": "Kiểm tra 1 tiết (45 phút)",
		"semester": "Thi Học Kỳ",
		"mock_thpt": "Thi Thử THPT Quốc Gia"
	};
	const examTypeColors = {
		"15m": "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
		"45m": "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30",
		"semester": "bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30",
		"mock_thpt": "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30"
	};
	const passwordError = serverPasswordError;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": exam.title }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-2xl mx-auto space-y-6"><!-- Back breadcrumb --><div><a${addAttribute(exam.subject ? `/ly-thuyet/${exam.subject.slug}` : "/ly-thuyet", "href")} class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>Quay lại môn học</a></div><!-- Main Exam Card --><div class="bg-white dark:bg-slate-900 border border-gray-200/70 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm"><!-- Badge Row --><div class="flex flex-wrap items-center gap-2 mb-5"><span${addAttribute(`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${examTypeColors[exam.exam_type] || examTypeColors["45m"]}`, "class")}>${exam.subject?.name} · ${examTypeNames[exam.exam_type]}</span>${hasPassword && renderTemplate`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>Đề thi có mật khẩu</span>`}</div><!-- Exam Title --><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">${exam.title}</h1><!-- Stats Grid --><div class="grid grid-cols-3 gap-4 mb-8"><div class="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-150/40 dark:border-slate-850/40 text-center"><p class="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">Thời gian</p><p class="text-xl font-black text-gray-900 dark:text-white">${exam.duration}<span class="text-sm font-semibold text-gray-400 ml-1">phút</span></p></div><div class="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-150/40 dark:border-slate-850/40 text-center"><p class="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">Số câu</p><p class="text-xl font-black text-gray-900 dark:text-white">${questionsCount}<span class="text-sm font-semibold text-gray-400 ml-1">câu</span></p></div><div class="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-150/40 dark:border-slate-850/40 text-center"><p class="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">Bảo mật</p>${hasPassword ? renderTemplate`<p class="text-xl" title="Đề thi có mật khẩu">🔒</p>` : renderTemplate`<p class="text-xl" title="Đề thi mở">🔓</p>`}</div></div><!-- Exam Rules --><div class="text-left bg-blue-50/30 border border-blue-100/50 dark:bg-slate-800/40 dark:border-slate-700/50 p-5 rounded-2xl mb-8 space-y-3"><h4 class="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Hướng dẫn làm bài:</h4><ul class="text-xs text-gray-600 dark:text-slate-350 space-y-2 list-decimal pl-5 leading-relaxed font-medium"><li>Đồng hồ đếm ngược bắt đầu ngay khi bạn nhấn <strong>Bắt đầu làm bài</strong>.</li><li>Khi hết giờ, bài thi sẽ <strong>tự động nộp</strong>.</li><li>Chọn đáp án bằng cách click vào đáp án tương ứng. Câu nhiều đáp án có thể chọn nhiều.</li><li>Sau khi nộp bài, hệ thống <strong>chấm điểm tự động</strong> và hiển thị kết quả + lời giải.</li></ul></div><!-- ============================================================ --><!-- CASE 1: Not logged in, exam has password — login required    --><!-- ============================================================ -->${!user && hasPassword ? renderTemplate`<div class="text-center space-y-4"><div class="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30"><div class="flex flex-col items-center gap-3"><div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center"><svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><div><p class="font-bold text-indigo-800 dark:text-indigo-300 text-sm">Cần đăng nhập để làm bài</p><p class="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Đề thi có mật khẩu yêu cầu đăng nhập. Đăng nhập để nhập mật khẩu và làm bài.</p></div></div></div><div class="flex gap-3"><a${addAttribute(`/lms/login?redirect=/exams/${id}`, "href")} class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm text-center">Đăng nhập để làm bài</a><a href="/lms/register" class="flex-1 border border-gray-250 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 font-semibold py-3.5 rounded-xl transition-all text-sm text-center">Đăng ký tài khoản</a></div></div><!-- ============================================================ --><!-- CASE 2: Not logged in, no password — guest start             --><!-- ============================================================ -->` : !user && !hasPassword ? renderTemplate`<div class="text-center space-y-4"><div class="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30"><div class="flex flex-col items-center gap-3"><div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center"><svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg></div><div><p class="font-bold text-emerald-800 dark:text-emerald-300 text-sm">Làm bài với tư cách khách</p><p class="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Bạn có thể làm bài ngay mà không cần đăng nhập. Kết quả sẽ không được lưu vào tài khoản.</p></div></div></div><form method="POST" id="start-exam-form"><button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all duration-150 text-base flex items-center justify-center gap-2"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Bắt đầu làm bài (Khách)</button></form><p class="text-xs text-gray-400 dark:text-slate-500">Hoặc <a${addAttribute(`/lms/login?redirect=/exams/${id}`, "href")} class="text-indigo-500 hover:text-indigo-600 font-semibold underline">đăng nhập</a> để lưu kết quả</p></div><!-- ============================================================ --><!-- CASE 3: Logged in, exam has password — show password form    --><!-- ============================================================ -->` : user && hasPassword ? renderTemplate`<form method="POST" id="start-exam-form" class="space-y-4">${passwordError && renderTemplate`<div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-center gap-3"><svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-sm font-semibold text-rose-700 dark:text-rose-400">${passwordError}</p></div>`}<div class="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/10 border border-amber-200/60 dark:border-amber-900/30 space-y-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0"><svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div><div><p class="font-bold text-amber-800 dark:text-amber-300 text-sm">Đề thi được bảo vệ bằng mật khẩu</p><p class="text-xs text-amber-700 dark:text-amber-400 mt-0.5">Nhập mật khẩu do giáo viên cung cấp để vào làm bài.</p></div></div><div class="relative"><input type="password" name="exam_password" id="exam_password" required autocomplete="off" placeholder="Nhập mật khẩu đề thi..." class="w-full px-4 py-3.5 pr-12 rounded-xl border-2 border-amber-200 dark:border-amber-900/50 bg-white dark:bg-slate-900 text-sm text-gray-800 dark:text-slate-100 placeholder-gray-400 focus:border-amber-500 dark:focus:border-amber-500 outline-none transition-colors"><button type="button" id="toggle-exam-pass" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"><svg id="pass-eye" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button></div></div><button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-150 text-base flex items-center justify-center gap-2"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>Xác nhận mật khẩu & Bắt đầu làm bài</button></form><!-- ============================================================ --><!-- CASE 4: Logged in, no password — start directly             --><!-- ============================================================ -->` : renderTemplate`<form method="POST" id="start-exam-form"><button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-150 text-base flex items-center justify-center gap-2"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Bắt đầu làm bài</button></form>`}</div><!-- Info note -->${user && renderTemplate`<p class="text-center text-xs text-gray-400 dark:text-slate-500">Đang đăng nhập với tư cách: <strong class="text-gray-600 dark:text-slate-300">${user.fullname || user.email}</strong>· <a href="/lms/dashboard" class="underline hover:text-indigo-500 transition-colors">Dashboard</a></p>`}</div>` })}<script lang="ts">
  // Toggle password visibility
  const toggleBtn = document.getElementById('toggle-exam-pass');
  const passInput = document.getElementById('exam_password') as HTMLInputElement | null;
  const passEye = document.getElementById('pass-eye');

  if (toggleBtn && passInput && passEye) {
    toggleBtn.addEventListener('click', () => {
      const show = passInput.type === 'password';
      passInput.type = show ? 'text' : 'password';
      passEye.innerHTML = show
        ? \`<path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>\`
        : \`<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>\`;
    });
  }

  // Prevent double-click submit
  const form = document.getElementById('start-exam-form') as HTMLFormElement | null;
  if (form) {
    form.addEventListener('submit', (e) => {
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = \`
          <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4"></circle>
            <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span>Đang chuẩn bị đề thi...</span>\`;
      }
    });
  }
<\/script>`;
}, "D:/lop12/src/pages/exams/[id]/index.astro", void 0);
var $$file = "D:/lop12/src/pages/exams/[id]/index.astro";
var $$url = "/lms/exams/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/exams/[id]/index@_@astro
var page = () => _id__exports;
//#endregion
export { page };
