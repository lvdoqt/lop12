import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent, x as Fragment } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as getCollection } from "./_astro_content_CYWRd-4B.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
import { t as $$DashboardCard } from "./DashboardCard_DIGDuHWG.mjs";
//#region src/components/ChartComponent.astro
createAstro("https://lop12.com");
var $$ChartComponent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ChartComponent;
	const { type = "line", labels, data, label, id = "chart-" + Date.now(), suggestedMax = 10 } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="relative w-full h-64 md:h-72 bg-white dark:bg-slate-900 border border-gray-250 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm"><canvas${addAttribute(id, "id")}></canvas></div><!-- Send props to client side script securely --><div${addAttribute(`${id}-data`, "id")} class="hidden"${addAttribute(type, "data-type")}${addAttribute(JSON.stringify(labels), "data-labels")}${addAttribute(JSON.stringify(data), "data-values")}${addAttribute(label, "data-label")}${addAttribute(suggestedMax, "data-suggested-max")}></div><script lang="ts">
  import Chart from 'chart.js/auto';

  const initCharts = () => {
    // Find all chart data elements
    const dataContainers = document.querySelectorAll('[id$="-data"]');
    
    dataContainers.forEach(container => {
      const dataId = container.getAttribute('id');
      if (!dataId) return;
      
      const canvasId = dataId.replace('-data', '');
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
      if (!canvas) return;

      // Prevent re-initialization
      if (Chart.getChart(canvas)) {
        Chart.getChart(canvas)?.destroy();
      }

      const type = (container.getAttribute('data-type') || 'line') as 'line' | 'bar';
      const labels = JSON.parse(container.getAttribute('data-labels') || '[]');
      const values = JSON.parse(container.getAttribute('data-values') || '[]');
      const label = container.getAttribute('data-label') || '';
      const suggestedMax = Number(container.getAttribute('data-suggested-max') || '10');

      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#94a3b8' : '#64748b';
      const gridColor = isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.7)';
      const primaryColor = '#3b82f6';
      
      new Chart(canvas, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: values,
            borderColor: primaryColor,
            backgroundColor: type === 'line' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.7)',
            borderWidth: 2.5,
            fill: type === 'line',
            tension: 0.3,
            pointBackgroundColor: primaryColor,
            pointBorderColor: isDark ? '#0f172a' : '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: textColor,
                font: {
                  family: "'Inter', sans-serif",
                  size: 11,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              titleColor: isDark ? '#ffffff' : '#0f172a',
              bodyColor: isDark ? '#e2e8f0' : '#334155',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
              displayColors: false
            }
          },
          scales: {
            y: {
              grid: {
                color: gridColor
              },
              ticks: {
                color: textColor,
                font: {
                  family: "'Inter', sans-serif",
                  size: 10
                }
              },
              suggestedMin: 0,
              suggestedMax: suggestedMax
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: textColor,
                font: {
                  family: "'Inter', sans-serif",
                  size: 10
                }
              }
            }
          }
        }
      });
    });
  };

  // Run on load
  initCharts();

  // Listen for view transitions or document changes
  document.addEventListener('astro:page-load', initCharts);
<\/script>`;
}, "D:/lop12/src/components/ChartComponent.astro", void 0);
//#endregion
//#region src/pages/dashboard.astro
var dashboard_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Dashboard,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Dashboard;
	const user = Astro.locals.user;
	if (!user) return Astro.redirect("/lms/login");
	const allLessons = await getCollection("lessons");
	const allExams = await db.getExams();
	const attempts = await db.getAttempts(user.id);
	const enrollments = await db.getUserEnrollments(user.id);
	const isTeacher = user.role === "teacher" || user.role === "admin";
	const myCourses = isTeacher ? await db.getCourses({ createdBy: user.id }) : [];
	myCourses.length;
	const lessonsCount = allLessons.length;
	const examsCount = allExams.length;
	const attemptsCount = attempts.length;
	const completedAttempts = attempts.filter((a) => a.score !== null);
	const averageScore = completedAttempts.length > 0 ? Math.round(completedAttempts.reduce((sum, a) => sum + Number(a.score || 0), 0) / completedAttempts.length * 100) / 100 : 0;
	const recentAttempts = [...completedAttempts].reverse();
	const chartLabels = recentAttempts.map((a, i) => `Lần ${i + 1}`);
	const chartData = recentAttempts.map((a) => Number(a.score || 0));
	const subjects = await db.getSubjects();
	const subjectProgressLabels = subjects.map((s) => s.name);
	const subjectProgressData = subjects.map((sub, idx) => {
		const seeds = [
			75,
			50,
			40,
			20,
			60
		];
		return seeds[idx % seeds.length];
	});
	const finalChartLabels = chartLabels.length > 0 ? chartLabels : [
		"Lần 1",
		"Lần 2",
		"Lần 3"
	];
	const finalChartData = chartData.length > 0 ? chartData : [
		7.5,
		8,
		9.5
	];
	let questionsBySubjectLabels = [];
	let questionsBySubjectData = [];
	let questionsByOtherLabels = [];
	let questionsByOtherData = [];
	let otherChartTitle = "";
	if (isTeacher) {
		const questions = await db.getQuestions(void 0, user.role === "admin" ? void 0 : user.id);
		const subjectMap = /* @__PURE__ */ new Map();
		for (const q of questions) {
			const s = subjects.find((sub) => sub.id === q.subject_id);
			const sName = s ? s.name : "Khác";
			subjectMap.set(sName, (subjectMap.get(sName) || 0) + 1);
		}
		questionsBySubjectLabels = Array.from(subjectMap.keys());
		questionsBySubjectData = Array.from(subjectMap.values());
		if (user.role === "admin") {
			otherChartTitle = "Số câu hỏi theo Giáo viên";
			const users = await db.getUsers();
			const teacherMap = /* @__PURE__ */ new Map();
			for (const q of questions) {
				const teacher = users.find((u) => u.id === q.created_by);
				const tName = teacher ? teacher.fullname : "Khác";
				teacherMap.set(tName, (teacherMap.get(tName) || 0) + 1);
			}
			questionsByOtherLabels = Array.from(teacherMap.keys());
			questionsByOtherData = Array.from(teacherMap.values());
		} else {
			otherChartTitle = "Số câu hỏi theo Loại";
			const typeMap = /* @__PURE__ */ new Map();
			const typeNames = {
				"single_choice": "Trắc nghiệm đơn",
				"multiple_choice": "Nhiều lựa chọn",
				"true_false": "Đúng/Sai",
				"msq": "Đúng/Sai (THPT)",
				"sa": "Trả lời ngắn",
				"tl": "Tự luận"
			};
			for (const q of questions) {
				const tName = typeNames[q.type] || q.type;
				typeMap.set(tName, (typeMap.get(tName) || 0) + 1);
			}
			questionsByOtherLabels = Array.from(typeMap.keys());
			questionsByOtherData = Array.from(typeMap.values());
		}
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Bảng điều khiển" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-8"><!-- Welcome Header --><div class="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Chào cậu, ${user.fullname || "Học Sinh"}!</h1><p class="text-sm text-gray-500 dark:text-slate-400 mt-1">Hôm nay cậu muốn học môn gì nào? Cùng ôn luyện để chuẩn bị thật tốt cho kì thi nhé.</p></div><div class="flex items-center space-x-3">${!isTeacher && renderTemplate`<a href="/lms/ly-thuyet" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/10 transition text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>Môn học lớp 12</a>`}</div></div><!-- Cards Grid --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Tổng số bài học",
		"value": lessonsCount,
		"description": "Bài học lý thuyết chất lượng cao",
		"icon": "lessons",
		"color": "blue"
	})}${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Đề thi trực tuyến",
		"value": examsCount,
		"description": "Đề kiểm tra & thi thử THPT",
		"icon": "exams",
		"color": "purple"
	})}${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Điểm trung bình",
		"value": attemptsCount > 0 ? averageScore : "N/A",
		"description": attemptsCount > 0 ? `Tính trên ${attemptsCount} lượt làm bài` : "Chưa thực hiện bài thi nào",
		"icon": "score",
		"color": attemptsCount > 0 ? averageScore >= 8 ? "emerald" : averageScore >= 5 ? "amber" : "rose" : "blue"
	})}${renderComponent($$result, "DashboardCard", $$DashboardCard, {
		"title": "Tiến độ chung",
		"value": `${attemptsCount > 0 ? Math.min(100, attemptsCount * 15) : 0}%`,
		"description": "Hoàn thành các bài trắc nghiệm",
		"icon": "progress",
		"color": "emerald"
	})}</div><!-- Charts Grid --><div class="grid grid-cols-1 lg:grid-cols-2 gap-8">${!isTeacher ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<!-- Student Chart 1 --><div><h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><span class="w-2.5 h-2.5 rounded-full bg-blue-600 mr-2"></span>Lịch sử điểm số theo thời gian</h2>${renderComponent($$result, "ChartComponent", $$ChartComponent, {
		"type": "line",
		"labels": finalChartLabels,
		"data": finalChartData,
		"label": "Điểm thi thử (Thang điểm 10)",
		"id": "score-history-chart",
		"suggestedMax": 10
	})}</div><!-- Student Chart 2 --><div><h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><span class="w-2.5 h-2.5 rounded-full bg-emerald-600 mr-2"></span>Tiến độ học tập các môn học</h2>${renderComponent($$result, "ChartComponent", $$ChartComponent, {
		"type": "bar",
		"labels": subjectProgressLabels,
		"data": subjectProgressData,
		"label": "Tỷ lệ hoàn thành (%)",
		"id": "subject-progress-chart",
		"suggestedMax": 100
	})}</div>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<!-- Teacher/Admin Chart 1 --><div><h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><span class="w-2.5 h-2.5 rounded-full bg-blue-600 mr-2"></span>Thống kê câu hỏi theo Môn học</h2>${renderComponent($$result, "ChartComponent", $$ChartComponent, {
		"type": "bar",
		"labels": questionsBySubjectLabels,
		"data": questionsBySubjectData,
		"label": "Số câu hỏi",
		"id": "questions-subject-chart",
		"suggestedMax": Math.max(...questionsBySubjectData, 10)
	})}</div><!-- Teacher/Admin Chart 2 --><div><h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><span class="w-2.5 h-2.5 rounded-full bg-purple-600 mr-2"></span>${otherChartTitle}</h2>${renderComponent($$result, "ChartComponent", $$ChartComponent, {
		"type": "bar",
		"labels": questionsByOtherLabels,
		"data": questionsByOtherData,
		"label": "Số câu hỏi",
		"id": "questions-other-chart",
		"suggestedMax": Math.max(...questionsByOtherData, 10)
	})}</div>` })}`}</div><!-- Enrolled Courses --><div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>Khóa học đang tham gia</h2><a href="/lms/khoa-hoc" class="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Khám phá thêm →</a></div>${enrollments.length === 0 ? renderTemplate`<div class="text-center py-8"><p class="text-sm text-gray-500 dark:text-slate-450 mb-2">Cậu chưa đăng ký khóa học nào.</p><a href="/lms/khoa-hoc" class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">Xem danh sách khóa học</a></div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${enrollments.map((enr) => renderTemplate`<a${addAttribute(`/lms/khoa-hoc/${enr.course?.slug}`, "href")} class="flex items-center p-3 rounded-xl border border-gray-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition group"><div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0">${enr.course?.title.charAt(0) || "K"}</div><div class="ml-3 flex-1 min-w-0"><p class="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">${enr.course?.title}</p><p class="text-xs text-gray-500 dark:text-slate-400 truncate">${enr.course?.subject?.name || "Chung"}</p></div></a>`)}</div>`}</div><!-- Teacher: My Courses -->${isTeacher && myCourses.length > 0 && renderTemplate`<div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-bold text-gray-900 dark:text-white flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>Khóa học của tôi</h2><a href="/lms/admin/courses" class="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">Quản lý →</a></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${myCourses.slice(0, 6).map((course) => renderTemplate`<a${addAttribute(`/lms/admin/courses/${course.id}`, "href")} class="flex items-center p-3 rounded-xl border border-gray-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition group"><div class="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0">${course.title.charAt(0)}</div><div class="ml-3 flex-1 min-w-0"><p class="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">${course.title}</p><p class="text-xs text-gray-500 dark:text-slate-400">${course.lessonCount ?? 0} bài giảng · ${course.is_published ? "Đã xuất bản" : "Bản nháp"}</p></div></a>`)}</div></div>`}<!-- Recent Exam Attempts Table --><div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm"><h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>Lịch sử làm bài gần đây</h2>${attempts.length === 0 ? renderTemplate`<div class="text-center py-12"><div class="w-16 h-16 bg-gray-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-150 dark:border-slate-850"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg></div><p class="text-sm text-gray-500 dark:text-slate-450">Cậu chưa làm bài kiểm tra nào cả.</p><a href="/lms/ly-thuyet" class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">Bắt đầu học và làm bài ngay!</a></div>` : renderTemplate`<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 dark:divide-slate-800"><thead><tr class="text-left text-xs font-bold text-gray-400 dark:text-slate-550 uppercase tracking-wider"><th class="pb-3">Đề thi</th><th class="pb-3 hidden sm:table-cell">Môn học</th><th class="pb-3">Điểm số</th><th class="pb-3 hidden md:table-cell">Thời gian bắt đầu</th><th class="pb-3 text-right">Hành động</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm font-medium">${attempts.map((attempt) => {
		const isFinished = attempt.finished_at !== null;
		const scoreColor = attempt.score !== null ? attempt.score >= 8 ? "text-emerald-600 dark:text-emerald-400" : attempt.score >= 5 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400" : "text-gray-400";
		return renderTemplate`<tr class="text-gray-700 dark:text-slate-350"><td class="py-4 pr-3 font-semibold text-gray-900 dark:text-white">${attempt.exam?.title || "Đề thi đã bị xóa"}</td><td class="py-4 hidden sm:table-cell">${attempt.exam?.subject?.name || "Chưa phân loại"}</td><td${addAttribute(`py-4 font-bold ${scoreColor}`, "class")}>${attempt.score !== null ? `${attempt.score} / 10` : "Đang làm..."}</td><td class="py-4 hidden md:table-cell text-gray-500 dark:text-slate-450">${new Date(attempt.started_at).toLocaleString("vi-VN")}</td><td class="py-4 text-right">${isFinished ? renderTemplate`<a${addAttribute(`/lms/exams/${attempt.exam_id}/result/${attempt.id}`, "href")} class="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Xem lại<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a>` : renderTemplate`<a${addAttribute(`/lms/exams/${attempt.exam_id}/take`, "href")} class="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 animate-pulse">Tiếp tục<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></a>`}</td></tr>`;
	})}</tbody></table></div>`}</div></div>` })}`;
}, "D:/lop12/src/pages/dashboard.astro", void 0);
var $$file = "D:/lop12/src/pages/dashboard.astro";
var $$url = "/lms/dashboard";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard@_@astro
var page = () => dashboard_exports;
//#endregion
export { page };
