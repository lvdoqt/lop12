import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/reset-password.astro
var reset_password_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ResetPassword,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
	const supabaseUrl = "https://dwezesrukmwygqnmefbz.supabase.co";
	const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Đặt lại mật khẩu",
		"showSidebar": false
	}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div id="supabase-config"${addAttribute(supabaseUrl, "data-url")}${addAttribute(supabaseAnonKey, "data-key")} class="hidden"></div><div class="min-h-[calc(100vh-12rem)] flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8"><div class="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-250 dark:border-slate-800/80 shadow-sm transition-colors duration-200"><!-- Header --><div class="text-center"><a href="/lms/" class="inline-flex items-center space-x-2 mb-4"><div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg">L</div><span class="text-xl font-bold dark:text-white">LỚP 12 LMS</span></a><h2 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Đặt mật khẩu mới</h2><p class="mt-2 text-sm text-gray-500 dark:text-slate-400">Vui lòng nhập mật khẩu mới của bạn bên dưới.</p></div><!-- Alerts --><div id="error-alert" class="hidden p-4 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/35"></div><div id="success-alert" class="hidden p-4 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/35"></div><!-- Form --><form id="reset-form" class="space-y-4"><div><label for="password" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Mật khẩu mới</label><input id="password" name="password" type="password" required placeholder="Tối thiểu 6 ký tự" class="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 transition-colors"></div><div><label for="confirm-password" class="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Xác nhận mật khẩu</label><input id="confirm-password" name="confirm-password" type="password" required placeholder="Nhập lại mật khẩu mới" class="w-full px-4 py-3 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-transparent text-sm focus:border-blue-500 dark:focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100 transition-colors"></div><button type="submit" id="submit-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/25 transition-all flex items-center justify-center text-sm disabled:opacity-55">Lưu mật khẩu mới</button></form></div></div>` })}<script lang="ts">
  import { createClient } from '@supabase/supabase-js';
  const cfg = document.getElementById('supabase-config') as HTMLElement;
  const supabase = createClient(cfg.dataset.url!, cfg.dataset.key!);

  const form = document.getElementById('reset-form') as HTMLFormElement | null;
  const errorAlert = document.getElementById('error-alert');
  const successAlert = document.getElementById('success-alert');
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;

  const setError = (message: string) => {
    if (errorAlert) {
      errorAlert.textContent = message;
      errorAlert.classList.remove('hidden');
    }
  };

  const setSuccess = (message: string) => {
    if (successAlert) {
      successAlert.textContent = message;
      successAlert.classList.remove('hidden');
    }
  };

  if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirm-password') as string;

      if (errorAlert) errorAlert.classList.add('hidden');
      if (successAlert) successAlert.classList.add('hidden');

      if (password.length < 6) {
        setError('Mật khẩu phải dài tối thiểu 6 ký tự.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Mật khẩu xác nhận không trùng khớp.');
        return;
      }

      submitBtn.disabled = true;



      try {
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
          setError(error.message);
          submitBtn.disabled = false;
          return;
        }

        setSuccess('Cập nhật mật khẩu mới thành công! Đang chuyển hướng vào hệ thống...');
        setTimeout(() => {
          window.location.href = '/lms/dashboard';
        }, 1500);
      } catch (err: any) {
        setError(err.message || 'Lỗi cập nhật mật khẩu.');
        submitBtn.disabled = false;
      }
    });
  }
<\/script>`;
}, "D:/lop12/src/pages/reset-password.astro", void 0);
var $$file = "D:/lop12/src/pages/reset-password.astro";
var $$url = "/lms/reset-password";
//#endregion
//#region \0virtual:astro:page:src/pages/reset-password@_@astro
var page = () => reset_password_exports;
//#endregion
export { page };
