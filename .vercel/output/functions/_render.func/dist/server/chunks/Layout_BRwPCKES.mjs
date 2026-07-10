import { A as unescapeHTML, C as renderTemplate, D as renderHead, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, S as renderSlot, b as renderComponent } from "./render_FJwdtmM0.mjs";
import "./compiler_DjieldEX.mjs";
//#region src/components/Sidebar.astro
createAstro("https://lop12.com");
var $$Sidebar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Sidebar;
	const user = Astro.locals.user;
	const pathname = new URL(Astro.request.url).pathname;
	const menuItems = [
		{
			href: "/lms/dashboard",
			label: "Bảng điều khiển",
			icon: "dashboard"
		},
		...user && (user.role === "admin" || user.role === "teacher") ? [{
			href: "/lms/admin",
			label: "Bảng điều hành",
			icon: "admin"
		}] : [],
		{
			href: "/lms/khoa-hoc",
			label: "Khóa học",
			icon: "course"
		},
		{
			href: "/lms/ly-thuyet",
			label: "Lý thuyết",
			icon: "book"
		},
		{
			href: "/lms/profile",
			label: "Hồ sơ cá nhân",
			icon: "user"
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<!-- Mobile sidebar toggle backdrop --><div id="sidebar-backdrop" class="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden hidden transition-opacity duration-300"></div><!-- Sidebar Container --><aside id="main-sidebar" class="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 text-slate-200 flex flex-col transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out"><!-- Brand logo --><div class="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950/50"><a href="/lms/dashboard" class="flex items-center space-x-2"><div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">L</div><span class="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">LỚP 12 LMS</span></a></div><!-- User info short profile -->${user && renderTemplate`<div class="px-6 py-4 border-b border-slate-800 bg-slate-950/20"><div class="flex items-center space-x-3"><img${addAttribute(user.avatar_url || "https://api.dicebear.com/7.x/adventurer/svg?seed=default", "src")}${addAttribute(user.fullname || "User", "alt")} class="w-10 h-10 rounded-full border border-slate-700 bg-slate-800"><div class="min-w-0"><p class="text-sm font-semibold text-white truncate">${user.fullname || "Học Sinh"}</p><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize">${user.role === "admin" ? "Quản trị viên" : user.role === "teacher" ? "Giáo viên" : "Học sinh"}</span></div></div></div>`}<!-- Menu links --><nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">${menuItems.map((item) => {
		const isActive = pathname.startsWith(item.href);
		return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${isActive ? item.icon === "admin" ? "bg-amber-600 text-white shadow-md shadow-amber-600/15" : "bg-blue-600 text-white shadow-md shadow-blue-600/15" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"}`, "class")}>${item.icon === "dashboard" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path></svg>`}${item.icon === "admin" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`}${item.icon === "course" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"></path></svg>`}${item.icon === "book" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`}${item.icon === "user" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`}<span>${item.label}</span></a>`;
	})}</nav><!-- Logout Footer --><div class="p-4 border-t border-slate-800 bg-slate-950/20"><button id="sidebar-logout-btn" class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors duration-150"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg><span>Đăng xuất</span></button></div></aside><script lang="ts">
  // Mobile sidebar controls
  const backdrop = document.getElementById('sidebar-backdrop');
  const sidebar = document.getElementById('main-sidebar');
  
  if (backdrop && sidebar) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
      backdrop.classList.add('hidden');
    });
  }

  // Logout click event
  const logoutBtn = document.getElementById('sidebar-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/lms/api/auth/session', {
          method: 'DELETE'
        });
        if (response.ok) {
          // Clear client auth if supabase client is active
          // @ts-ignore
          if (window.supabase) {
            // @ts-ignore
            await window.supabase.auth.signOut();
          }
          window.location.href = '/lms/login';
        }
      } catch (err) {
        console.error('Error logging out:', err);
      }
    });
  }
<\/script>`;
}, "D:/lop12/src/components/Sidebar.astro", void 0);
//#endregion
//#region src/components/Navbar.astro
createAstro("https://lop12.com");
var $$Navbar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Navbar;
	const { showNavMenu = false, hideUserMenu = false } = Astro.props;
	const user = Astro.locals.user;
	return renderTemplate`${maybeRenderHead($$result)}<header class="fixed top-0 right-0 left-0 h-16 z-30 bg-blue-600 dark:bg-blue-800 shadow-lg shadow-blue-600/20 dark:shadow-blue-900/30 flex items-center justify-between px-4 md:px-8 transition-colors duration-200"><div class="flex items-center space-x-4"><!-- Toggle Mobile Sidebar (only for pages with sidebar) -->${!showNavMenu && user && renderTemplate`<button id="mobile-sidebar-toggle" class="p-2 rounded-xl text-white/60 hover:bg-white/10 md:hidden focus:outline-none" aria-label="Toggle Sidebar"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>`}<!-- Logo --><a href="/lms/" class="flex items-center space-x-2"><div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white shadow-sm">L</div><span class="text-lg font-bold tracking-tight font-serif text-white">LỚP 12 LMS</span></a></div><!-- Desktop Navigation --><nav class="hidden md:flex items-center space-x-8"><a href="/lms/khoa-hoc" class="text-sm font-medium text-white/75 hover:text-white transition-colors relative after:absolute after:bottom-[-18px] after:left-0 after:right-0 after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200">Khóa học</a><a href="/lms/ly-thuyet" class="text-sm font-medium text-white/75 hover:text-white transition-colors relative after:absolute after:bottom-[-18px] after:left-0 after:right-0 after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200">Lý thuyết</a><a href="/lms/de-thi" class="text-sm font-medium text-white/75 hover:text-white transition-colors relative after:absolute after:bottom-[-18px] after:left-0 after:right-0 after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200">Đề thi</a></nav><div class="flex items-center space-x-4"><!-- Mobile hamburger menu button --><button id="mobile-nav-toggle" class="md:hidden p-2 rounded-xl text-white/60 hover:bg-white/10 focus:outline-none" aria-label="Toggle Menu"><svg id="hamburger-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg><svg id="close-icon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button>${!hideUserMenu && user ? renderTemplate`<div class="relative"><button id="user-menu-btn" class="flex items-center space-x-2 p-1.5 pr-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"><img${addAttribute(user.avatar_url || "https://api.dicebear.com/7.x/adventurer/svg?seed=default", "src")}${addAttribute(user.fullname || "Avatar", "alt")} class="w-7 h-7 rounded-full bg-blue-400"><span class="text-sm font-medium text-white/90 max-w-[120px] truncate hidden sm:inline">${user.fullname || "Học Sinh"}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></button><!-- Dropdown menu --><div id="user-dropdown-menu" class="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-scholar dark:border-slate-800 py-2 shadow-xl shadow-blue-500/10 hidden"><a href="/lms/profile" class="block px-4 py-2 text-sm text-ink hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800">Hồ sơ cá nhân</a>${user.role === "admin" || user.role === "teacher" ? renderTemplate`<a href="/lms/admin" class="block px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-slate-800">Trang quản trị</a>` : null}<div class="h-px bg-scholar/50 dark:bg-slate-800 my-1"></div><button id="navbar-logout-btn" class="w-full text-left block px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20">Đăng xuất</button></div></div>` : null}</div></header><!-- Mobile navigation menu --><div id="mobile-nav-menu" class="md:hidden fixed top-16 right-0 left-0 z-20 bg-blue-600 dark:bg-blue-800 border-t border-white/10 shadow-xl shadow-blue-900/30 hidden"><div class="flex flex-col px-4 py-4 space-y-3"><a href="/lms/ly-thuyet" class="text-sm font-medium text-white/75 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">Lý thuyết</a><a href="/lms/de-thi" class="text-sm font-medium text-white/75 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">Đề thi</a>${!user && renderTemplate`<div class="border-t border-white/10 pt-3 mt-1 flex flex-col space-y-3"><a href="/lms/login" class="text-sm font-semibold text-white/90 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-center">Đăng nhập</a><a href="/lms/register" class="text-sm font-semibold bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 text-center">Đăng ký</a></div>`}</div></div><script lang="ts">
  // Mobile hamburger menu toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileNavToggle && mobileNavMenu) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavMenu.classList.toggle('hidden');
      hamburgerIcon?.classList.toggle('hidden');
      closeIcon?.classList.toggle('hidden');
    });
  }

  // Mobile sidebar toggler logic
  const toggleBtn = document.getElementById('mobile-sidebar-toggle');
  const sidebar = document.getElementById('main-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  
  if (toggleBtn && sidebar && backdrop) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.remove('-translate-x-full');
      backdrop.classList.remove('hidden');
    });
  }

  // User menu dropdown toggle
  const userMenuBtn = document.getElementById('user-menu-btn');
  const userDropdown = document.getElementById('user-dropdown-menu');
  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('hidden');
    });
    
    document.addEventListener('click', () => {
      userDropdown.classList.add('hidden');
    });
  }

  // Navbar Logout trigger
  const logoutBtn = document.getElementById('navbar-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/lms/api/auth/session', {
          method: 'DELETE'
        });
        if (response.ok) {
          // @ts-ignore
          if (window.supabase) {
            // @ts-ignore
            await window.supabase.auth.signOut();
          }
          window.location.href = '/lms/login';
        }
      } catch (err) {
        console.error('Error logging out:', err);
      }
    });
  }
<\/script>`;
}, "D:/lop12/src/components/Navbar.astro", void 0);
//#endregion
//#region src/components/Footer.astro
createAstro("https://lop12.com");
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const { user } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<footer class="border-t border-scholar/60 dark:border-[#3A3A5C]/70 bg-white/60 dark:bg-[#1A1A2E]/60 pt-12 pb-16 px-6 md:px-8 mt-16 transition-colors duration-200"><div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"><!-- Column 1: Intro + Auth / Theme Buttons --><div class="md:col-span-2 space-y-4"><a href="/lms/" class="flex items-center space-x-2"><div class="w-8 h-8 rounded-lg bg-vermillion-500 flex items-center justify-center font-bold text-white shadow-lg shadow-vermillion-500/20">L</div><span class="text-xl font-bold tracking-tight font-serif text-ink dark:text-[#E8E0D0]">LỚP 12 LMS</span></a><p class="text-sm text-[#8A7E72] dark:text-[#8A8A9E] max-w-sm leading-relaxed font-medium">Hệ thống học tập, ôn thi trắc nghiệm online bám sát chương trình Giáo dục Phổ thông lớp 12 của Bộ Giáo dục và Đào tạo Việt Nam.</p><p class="text-xs text-[#A89888] dark:text-[#6A6A8A] font-semibold">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Lớp 12 LMS. Thầy Đồ - v1.1.</p>${!user && renderTemplate`<div class="flex flex-wrap items-center gap-3 pt-2"><a href="/lms/login" class="text-sm font-semibold text-ink dark:text-[#E8E0D0] border border-scholar dark:border-[#3A3A5C] px-5 py-2 rounded-lg hover:bg-vermillion-50 dark:hover:bg-vermillion-900/20 hover:border-vermillion-200 dark:hover:border-vermillion-900/30 hover:text-vermillion-600 dark:hover:text-vermillion-400 transition-all duration-200">Đăng nhập</a><a href="/lms/register" class="text-sm font-semibold bg-vermillion-500 hover:bg-vermillion-600 text-white px-5 py-2 rounded-lg shadow-md shadow-vermillion-500/15 hover:shadow-vermillion-500/25 transition-all duration-200">Đăng ký</a></div>`}</div><!-- Column 2: Quick Links --><div><h4 class="text-xs font-bold text-[#8A7E72] dark:text-[#8A8A9E] uppercase tracking-widest mb-4">Học tập</h4><ul class="space-y-2.5 text-sm font-semibold text-ink dark:text-[#C8C0B0]"><li><a href="/lms/ly-thuyet" class="hover:text-vermillion-500 dark:hover:text-vermillion-400 transition-colors">Lý thuyết</a></li><li><a href="/lms/de-thi" class="hover:text-vermillion-500 dark:hover:text-vermillion-400 transition-colors">Đề thi</a></li><li><a href="/lms/rss.xml" target="_blank" rel="noopener" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"><svg class="w-3.5 h-3.5 shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"></path></svg>RSS Feed</a></li></ul></div></div></footer>`;
}, "D:/lop12/src/components/Footer.astro", void 0);
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://lop12.com");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title, description = "Hệ thống học tập và thi thử trắc nghiệm online dành cho học sinh lớp 12. Bài giảng lý thuyết, ngân hàng câu hỏi, đề thi thử THPT và trợ lý AI 24/7.", showSidebar = true, hideUserMenu = false, ogImage = "/images/og-default.png", ogType = "website", publishedTime, modifiedTime, canonical, noindex = false, showAds = true, structuredData, breadcrumbs } = Astro.props;
	const user = Astro.locals.user;
	const activeSidebar = showSidebar && user !== null;
	const siteUrl = "https://lms.lop12.com";
	const canonicalUrl = canonical ? canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}` : `${siteUrl}${Astro.url.pathname}`;
	const fullTitle = `${title} | Lớp 12 LMS`;
	const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;
	const schemas = [];
	if (Astro.url.pathname === "/") schemas.push({
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Lớp 12 LMS",
		url: siteUrl,
		description,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteUrl}/ly-thuyet?q={search_term_string}`
			},
			"query-input": "required name=search_term_string"
		}
	});
	if (breadcrumbs && breadcrumbs.length > 0) schemas.push({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [{
			"@type": "ListItem",
			position: 1,
			name: "Trang chủ",
			item: siteUrl
		}, ...breadcrumbs.map((bc, i) => ({
			"@type": "ListItem",
			position: i + 2,
			name: bc.name,
			item: bc.url.startsWith("http") ? bc.url : `${siteUrl}${bc.url}`
		}))]
	});
	if (structuredData) if (Array.isArray(structuredData)) schemas.push(...structuredData);
	else schemas.push(structuredData);
	return renderTemplate`<html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/lms/favicon.ico"><meta name="generator"${addAttribute(Astro.generator, "content")}><meta name="theme-color" content="#1E1E38"><!-- Title & Description --><title>${fullTitle}</title><meta name="description"${addAttribute(description, "content")}><!-- Robots --><meta name="robots"${addAttribute(noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1", "content")}><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalUrl, "href")}><!-- RSS Autodiscovery --><link rel="alternate" type="application/rss+xml" title="Lớp 12 LMS - Bản tin học tập" href="/lms/rss.xml"><!-- Canonical Sitemap --><link rel="sitemap" type="application/xml" href="/lms/sitemap.xml"><!-- Open Graph --><meta property="og:type"${addAttribute(ogType, "content")}><meta property="og:site_name" content="Lớp 12 LMS"><meta property="og:title"${addAttribute(fullTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:image"${addAttribute(absoluteOgImage, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"${addAttribute(title, "content")}><meta property="og:locale" content="vi_VN">${ogType === "article" && publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>`}${ogType === "article" && modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>`}<!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(fullTitle, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(absoluteOgImage, "content")}><meta name="twitter:image:alt"${addAttribute(title, "content")}><!-- JSON-LD Structured Data -->${schemas.length > 0 && schemas.map((schema) => renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(schema))}<\/script>`)}<!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet"><!-- KaTeX for LaTeX Math rendering --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"><script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"><\/script><script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"><\/script><!-- Google AdSense -->${showAds && renderTemplate`<script async${addAttribute(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX`, "src")} crossorigin="anonymous"><\/script>`}${renderHead($$result)}</head><body class="min-h-screen transition-colors duration-200"><div class="flex min-h-screen">${activeSidebar && renderTemplate`${renderComponent($$result, "Sidebar", $$Sidebar, {})}`}<div${addAttribute(`flex-1 flex flex-col min-w-0 ${activeSidebar ? "md:pl-64" : ""}`, "class")}>${renderComponent($$result, "Navbar", $$Navbar, {
		"showNavMenu": !activeSidebar,
		"hideUserMenu": hideUserMenu
	})}<main class="flex-grow p-4 md:p-8 mt-16 max-w-7xl w-full mx-auto">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, { "user": user })}</div></div><!-- KaTeX Math auto render execution --><script>
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof renderMathInElement === 'function') {
          renderMathInElement(document.body, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\\\(', right: '\\\\)', display: false },
              { left: '\\\\[', right: '\\\\]', display: true }
            ],
            throwOnError: false
          });
        }
      });
    <\/script></body></html>`;
}, "D:/lop12/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Layout as t };
