import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/register.astro
var register_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Register,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Register = createComponent(($$result, $$props, $$slots) => {
	const supabaseUrl = "https://dwezesrukmwygqnmefbz.supabase.co";
	const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZXplc3J1a213eWdxbm1lZmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzA0NjIsImV4cCI6MjA5NTcwNjQ2Mn0.LCojdG6LGAQDHw9ewbXFiJOFIvrFYNPZLr4KRNmystw";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Đăng ký tài khoản",
		"showSidebar": false,
		"data-astro-cid-fvopxden": true
	}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div id="supabase-config"${addAttribute(supabaseUrl, "data-url")}${addAttribute(supabaseAnonKey, "data-key")} class="hidden" data-astro-cid-fvopxden></div><div class="auth-bg min-h-[calc(100vh-12rem)] flex items-center justify-center py-8 px-4 sm:px-6" data-astro-cid-fvopxden><div class="auth-card max-w-md w-full rounded-3xl shadow-2xl shadow-indigo-500/10 p-8 md:p-10 space-y-6" data-astro-cid-fvopxden><!-- Header --><div class="text-center space-y-3" data-astro-cid-fvopxden><a href="/lms/" class="inline-flex items-center gap-3 mb-1 group" data-astro-cid-fvopxden><div class="logo-icon w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-lg tracking-tight" data-astro-cid-fvopxden>L</div><span class="text-xl font-bold text-slate-800 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" data-astro-cid-fvopxden>LỚP 12 LMS</span></a><div data-astro-cid-fvopxden><h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight" data-astro-cid-fvopxden>Tạo tài khoản mới ✨</h1><p class="mt-1.5 text-sm text-slate-500 dark:text-slate-400" data-astro-cid-fvopxden>Đã có tài khoản?<a href="/lms/login" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 ml-1 transition-colors" data-astro-cid-fvopxden>Đăng nhập →</a></p></div></div><!-- Error Alert --><div id="error-alert" class="hidden fade-in p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-start gap-3" data-astro-cid-fvopxden><svg class="w-5 h-5 text-rose-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-fvopxden><circle cx="12" cy="12" r="10" data-astro-cid-fvopxden></circle><line x1="12" y1="8" x2="12" y2="12" data-astro-cid-fvopxden></line><line x1="12" y1="16" x2="12.01" y2="16" data-astro-cid-fvopxden></line></svg><p id="error-text" class="text-sm font-medium text-rose-700 dark:text-rose-400" data-astro-cid-fvopxden></p></div><!-- Info/Success Alert --><div id="info-alert" class="hidden fade-in p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-3" data-astro-cid-fvopxden><svg class="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-fvopxden><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-fvopxden></path></svg><p id="info-text" class="text-sm font-medium text-emerald-700 dark:text-emerald-400" data-astro-cid-fvopxden></p></div><!-- Register Form --><form id="register-form" class="space-y-4" novalidate data-astro-cid-fvopxden><!-- Full Name --><div class="space-y-1.5" data-astro-cid-fvopxden><label for="fullname" class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-astro-cid-fvopxden>Họ và tên</label><div class="relative" data-astro-cid-fvopxden><span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" data-astro-cid-fvopxden><svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" data-astro-cid-fvopxden><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-astro-cid-fvopxden></path></svg></span><input id="fullname" name="fullname" type="text" required autocomplete="name" placeholder="Nguyễn Văn A" class="input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400" data-astro-cid-fvopxden></div></div><!-- Email --><div class="space-y-1.5" data-astro-cid-fvopxden><label for="email" class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-astro-cid-fvopxden>Địa chỉ Email</label><div class="relative" data-astro-cid-fvopxden><span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" data-astro-cid-fvopxden><svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" data-astro-cid-fvopxden><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-fvopxden></path></svg></span><input id="email" name="email" type="email" required autocomplete="email" placeholder="ten@gmail.com" class="input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400" data-astro-cid-fvopxden></div></div><!-- Password --><div class="space-y-1.5" data-astro-cid-fvopxden><label for="password" class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-astro-cid-fvopxden>Mật khẩu</label><div class="relative" data-astro-cid-fvopxden><span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" data-astro-cid-fvopxden><svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" data-astro-cid-fvopxden><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-astro-cid-fvopxden></path></svg></span><input id="password" name="password" type="password" required autocomplete="new-password" placeholder="Tối thiểu 6 ký tự" class="input-field w-full pl-10 pr-12 py-3 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400" data-astro-cid-fvopxden><button type="button" id="toggle-password" class="pass-toggle absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5" data-astro-cid-fvopxden><svg id="eye-icon-1" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" data-astro-cid-fvopxden><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-fvopxden></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-fvopxden></path></svg></button></div><!-- Password strength bar --><div class="mt-2 space-y-1" data-astro-cid-fvopxden><div class="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden" data-astro-cid-fvopxden><div id="strength-bar" class="strength-bar h-full w-0 rounded-full bg-rose-400" data-astro-cid-fvopxden></div></div><p id="strength-label" class="field-hint text-slate-400 dark:text-slate-500" data-astro-cid-fvopxden></p></div></div><!-- Confirm Password --><div class="space-y-1.5" data-astro-cid-fvopxden><label for="confirm-password" class="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider" data-astro-cid-fvopxden>Xác nhận mật khẩu</label><div class="relative" data-astro-cid-fvopxden><span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" data-astro-cid-fvopxden><svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" data-astro-cid-fvopxden><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-astro-cid-fvopxden></path></svg></span><input id="confirm-password" name="confirm-password" type="password" required autocomplete="new-password" placeholder="Nhập lại mật khẩu" class="input-field w-full pl-10 pr-12 py-3 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400" data-astro-cid-fvopxden><button type="button" id="toggle-confirm-password" class="pass-toggle absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5" data-astro-cid-fvopxden><svg id="eye-icon-2" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" data-astro-cid-fvopxden><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-fvopxden></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-fvopxden></path></svg></button></div><p id="match-hint" class="field-hint hidden text-rose-500 dark:text-rose-400" data-astro-cid-fvopxden>⚠️ Mật khẩu không khớp</p></div><!-- Submit Button --><button type="submit" id="submit-btn" class="btn-primary w-full text-white font-bold py-3.5 px-5 rounded-2xl text-sm flex items-center justify-center gap-2 mt-2" data-astro-cid-fvopxden><span id="btn-text" data-astro-cid-fvopxden>Tạo tài khoản</span><svg id="btn-spinner" class="hidden w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" data-astro-cid-fvopxden><circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4" data-astro-cid-fvopxden></circle><path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" data-astro-cid-fvopxden></path></svg></button></form><!-- Terms note --><p class="text-center text-xs text-slate-400 dark:text-slate-500 pt-1" data-astro-cid-fvopxden>Bằng cách đăng ký, bạn đồng ý với<a href="/lms/privacy" class="underline underline-offset-2 hover:text-indigo-500 transition-colors" data-astro-cid-fvopxden>Chính sách bảo mật</a>của chúng tôi.</p></div></div>` })}<script lang="ts">
  import { createClient } from '@supabase/supabase-js';
  const cfg = document.getElementById('supabase-config') as HTMLElement;
  const supabase = createClient(cfg.dataset.url!, cfg.dataset.key!);

  const registerForm = document.getElementById('register-form') as HTMLFormElement | null;
  const errorAlert = document.getElementById('error-alert');
  const errorText = document.getElementById('error-text');
  const infoAlert = document.getElementById('info-alert');
  const infoText = document.getElementById('info-text');
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  const passwordInput = document.getElementById('password') as HTMLInputElement | null;
  const confirmInput = document.getElementById('confirm-password') as HTMLInputElement | null;
  const strengthBar = document.getElementById('strength-bar') as HTMLElement | null;
  const strengthLabel = document.getElementById('strength-label');
  const matchHint = document.getElementById('match-hint');

  const errorMessages: Record<string, string> = {
    'User already registered': '👤 Email này đã được đăng ký. Hãy thử đăng nhập.',
    'Email already in use': '📧 Email này đã được sử dụng.',
    'Password should be at least 6 characters': '🔒 Mật khẩu phải có ít nhất 6 ký tự.',
    'Invalid email': '📧 Địa chỉ email không hợp lệ.',
    'signup_disabled': '🚫 Đăng ký tạm thời bị tắt.',
    'over_email_send_rate_limit': '⏳ Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.',
    'Too many requests': '⏳ Quá nhiều lần thử. Vui lòng chờ vài phút rồi thử lại.',
  };

  function getViMessage(raw: string): string {
    for (const [key, msg] of Object.entries(errorMessages)) {
      if (raw.toLowerCase().includes(key.toLowerCase())) return msg;
    }
    return \`❌ \${raw}\`;
  }

  function showError(message: string) {
    if (infoAlert) infoAlert.classList.add('hidden');
    if (errorAlert && errorText) {
      errorText.textContent = getViMessage(message);
      errorAlert.classList.remove('hidden');
      errorAlert.classList.add('error-shake');
      setTimeout(() => errorAlert.classList.remove('error-shake'), 500);
    }
  }

  function showInfo(message: string) {
    if (errorAlert) errorAlert.classList.add('hidden');
    if (infoAlert && infoText) {
      infoText.textContent = message;
      infoAlert.classList.remove('hidden');
    }
  }

  function hideAlerts() {
    errorAlert?.classList.add('hidden');
    infoAlert?.classList.add('hidden');
  }

  function setLoading(loading: boolean) {
    if (submitBtn) submitBtn.disabled = loading;
    if (btnText) btnText.textContent = loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản';
    btnSpinner?.classList.toggle('hidden', !loading);
  }

  // Password strength checker
  function checkStrength(pass: string) {
    if (!strengthBar || !strengthLabel) return;
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    const levels = [
      { pct: '0%', color: 'bg-rose-400', label: '' },
      { pct: '20%', color: 'bg-rose-500', label: '😟 Rất yếu' },
      { pct: '40%', color: 'bg-orange-400', label: '😐 Yếu' },
      { pct: '60%', color: 'bg-yellow-400', label: '🙂 Trung bình' },
      { pct: '80%', color: 'bg-emerald-400', label: '😊 Mạnh' },
      { pct: '100%', color: 'bg-emerald-500', label: '💪 Rất mạnh' },
    ];
    const lvl = levels[score] || levels[0];
    strengthBar.style.width = pass.length === 0 ? '0%' : lvl.pct;
    strengthBar.className = \`strength-bar h-full rounded-full \${lvl.color}\`;
    strengthLabel.textContent = pass.length === 0 ? '' : lvl.label;
    strengthLabel.className = \`field-hint \${score >= 3 ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}\`;
  }

  passwordInput?.addEventListener('input', () => {
    checkStrength(passwordInput.value);
    if (confirmInput?.value) {
      matchHint?.classList.toggle('hidden', passwordInput.value === confirmInput.value);
    }
  });

  confirmInput?.addEventListener('input', () => {
    if (confirmInput.value) {
      matchHint?.classList.toggle('hidden', passwordInput?.value === confirmInput.value);
    } else {
      matchHint?.classList.add('hidden');
    }
  });

  // Toggle password visibility
  function setupToggle(btnId: string, iconId: string, inputId: string) {
    const btn = document.getElementById(btnId);
    const icon = document.getElementById(iconId);
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    if (!btn || !icon || !input) return;
    btn.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      icon.innerHTML = show
        ? \`<path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>\`
        : \`<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>\`;
    });
  }
  setupToggle('toggle-password', 'eye-icon-1', 'password');
  setupToggle('toggle-confirm-password', 'eye-icon-2', 'confirm-password');


  // Register Form Submit
  if (registerForm && submitBtn) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAlerts();

      const formData = new FormData(registerForm);
      const fullname = (formData.get('fullname') as string)?.trim();
      const email = (formData.get('email') as string)?.trim();
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirm-password') as string;

      // Client-side validation
      if (!fullname || fullname.length < 2) {
        showError('Vui lòng nhập họ và tên (ít nhất 2 ký tự).'); return;
      }
      if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        showError('Vui lòng nhập địa chỉ email hợp lệ.'); return;
      }
      if (!password || password.length < 6) {
        showError('Mật khẩu phải có ít nhất 6 ký tự.'); return;
      }
      if (password !== confirmPassword) {
        showError('Mật khẩu và xác nhận mật khẩu không khớp.'); return;
      }

      setLoading(true);



      try {
        const { data, error } = await supabase.auth.signUp({
          email, password,
          options: {
            data: {
              fullname,
              avatar_url: \`https://api.dicebear.com/7.x/adventurer/svg?seed=\${encodeURIComponent(fullname)}\`
            }
          }
        });

        if (error) {
          showError(error.message); setLoading(false); return;
        }

        if (data?.session) {
          const sessionRes = await fetch('/lms/api/auth/session', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token
            })
          });
          if (sessionRes.ok) {
            showInfo('✅ Đăng ký thành công! Đang chuyển hướng...');
            setTimeout(() => window.location.href = '/lms/dashboard', 800);
          } else {
            showError('Lỗi thiết lập phiên đăng nhập.'); setLoading(false);
          }
        } else if (data?.user) {
          // User created but no session (email confirmation required)
          // Try to sign in immediately - works if email confirmation is disabled in Supabase
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
          
          if (!signInError && signInData?.session) {
            const sessionRes = await fetch('/lms/api/auth/session', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                access_token: signInData.session.access_token,
                refresh_token: signInData.session.refresh_token
              })
            });
            if (sessionRes.ok) {
              showInfo('✅ Đăng ký thành công! Đang chuyển hướng...');
              setTimeout(() => window.location.href = '/lms/dashboard', 800);
            } else {
              showError('Lỗi thiết lập phiên đăng nhập.'); setLoading(false);
            }
          } else {
            // Email confirmation required - user needs to check email
            const msg = signInError?.message?.toLowerCase().includes('email not confirmed') 
              ? '📧 Tài khoản đã được tạo! Vui lòng kiểm tra hộp thư email để xác nhận tài khoản trước khi đăng nhập.'
              : '📧 Tài khoản đã được tạo! Vui lòng kiểm tra hộp thư email để xác nhận tài khoản.';
            showInfo(msg);
            registerForm.reset();
            if (strengthBar) { strengthBar.style.width = '0%'; }
            if (strengthLabel) strengthLabel.textContent = '';
            setLoading(false);
          }
        } else {
          showError('Đăng ký không thành công. Vui lòng thử lại.'); setLoading(false);
        }
      } catch (err: any) {
        showError(err.message || 'Đã xảy ra lỗi đăng ký.'); setLoading(false);
      }
    });
  }
<\/script>`;
}, "D:/lop12/src/pages/register.astro", void 0);
var $$file = "D:/lop12/src/pages/register.astro";
var $$url = "/lms/register";
//#endregion
//#region \0virtual:astro:page:src/pages/register@_@astro
var page = () => register_exports;
//#endregion
export { page };
