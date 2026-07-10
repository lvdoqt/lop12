import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/pages/admin/users/index.astro
var users_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://lop12.com");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const user = Astro.locals.user;
	if (!user || user.role !== "admin") return Astro.redirect("/lms/dashboard");
	let successMsg = "";
	let errMsg = "";
	if (Astro.request.method === "POST") try {
		const formData = await Astro.request.formData();
		const userId = formData.get("userId");
		const newRole = formData.get("role");
		if (userId && newRole) if (userId === user.id) errMsg = "Cậu không thể tự thay đổi vai trò của chính mình.";
		else {
			await db.updateUserRole(userId, newRole);
			successMsg = "Cập nhật vai trò người dùng thành công!";
		}
	} catch (err) {
		errMsg = err.message || "Lỗi phân quyền người dùng.";
	}
	const users = await db.getUsers();
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Quản lý người dùng" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-6"><!-- Header --><div><a href="/lms/admin" class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>Quản trị Admin</a><h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Quản lý tài khoản</h1><p class="text-sm text-gray-500 dark:text-slate-400 mt-1">Danh sách tất cả người dùng và công cụ điều khiển phân quyền truy cập.</p></div><!-- Feedback messages -->${successMsg && renderTemplate`<div class="p-4 rounded-xl bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/35">${successMsg}</div>`}${errMsg && renderTemplate`<div class="p-4 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/35">${errMsg}</div>`}<!-- Users Table Card --><div class="bg-white border border-gray-250 dark:bg-slate-900 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm"><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-250 dark:divide-slate-800"><thead><tr class="text-left text-xs font-bold text-gray-400 dark:text-slate-550 uppercase tracking-wider"><th class="pb-3">Họ và tên</th><th class="pb-3">Email</th><th class="pb-3">Vai trò</th><th class="pb-3 hidden md:table-cell">Ngày đăng ký</th><th class="pb-3 text-right">Lưu thay đổi</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-slate-800/60 text-sm font-medium">${users.map((u) => renderTemplate`<tr class="text-gray-700 dark:text-slate-350"><!-- Avatar & Name --><td class="py-4 pr-3 flex items-center space-x-3"><img${addAttribute(u.avatar_url || "", "src")}${addAttribute(u.fullname || "", "alt")} class="w-8 h-8 rounded-full bg-slate-800"><span class="font-bold text-gray-900 dark:text-white">${u.fullname || "Học Sinh ẩn danh"}</span></td><!-- Email --><td class="py-4 pr-3 text-gray-500 dark:text-slate-400">${u.email}</td><!-- Role selection form --><td class="py-4"><form method="POST"${addAttribute(`role-form-${u.id}`, "id")} class="flex items-center"><input type="hidden" name="userId"${addAttribute(u.id, "value")}><select name="role"${addAttribute(u.id === user.id, "disabled")} class="px-2 py-1.5 rounded-lg border border-gray-250 dark:border-slate-800 bg-transparent text-xs font-bold focus:border-blue-500 outline-none text-gray-700 dark:text-slate-300 disabled:opacity-50"${addAttribute(`document.getElementById('role-form-${u.id}').submit()`, "onchange")}><option value="student"${addAttribute(u.role === "student", "selected")}>Học sinh</option><option value="teacher"${addAttribute(u.role === "teacher", "selected")}>Giáo viên</option><option value="admin"${addAttribute(u.role === "admin", "selected")}>Quản trị viên</option></select></form></td><!-- Registration Date --><td class="py-4 hidden md:table-cell text-gray-500 dark:text-slate-450">${new Date(u.created_at).toLocaleDateString("vi-VN")}</td><td class="py-4 text-right text-xs text-gray-450">${u.id === user.id ? "Tài khoản của bạn" : "Tự động cập nhật"}</td></tr>`)}</tbody></table></div></div></div>` })}`;
}, "D:/lop12/src/pages/admin/users/index.astro", void 0);
var $$file = "D:/lop12/src/pages/admin/users/index.astro";
var $$url = "/lms/admin/users";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/users/index@_@astro
var page = () => users_exports;
//#endregion
export { page };
