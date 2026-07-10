import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
//#region src/pages/api/blog/comment.ts
var comment_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, cookies }) => {
	try {
		const { blog_id, content } = await request.json();
		if (!blog_id || !content || content.trim().length < 2) return new Response(JSON.stringify({ error: "Nội dung bình luận không hợp lệ." }), { status: 400 });
		const userId = cookies.get("mock-user-id")?.value;
		if (!userId) return new Response(JSON.stringify({ error: "Bạn cần đăng nhập để bình luận." }), { status: 401 });
		const comment = await db.createComment({
			blog_id,
			user_id: userId,
			content: content.trim()
		});
		return new Response(JSON.stringify({
			success: true,
			comment
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Lỗi gửi bình luận." }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/blog/comment@_@ts
var page = () => comment_exports;
//#endregion
export { page };
