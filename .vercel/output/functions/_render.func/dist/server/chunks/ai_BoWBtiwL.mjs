import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/ai.ts
var ai_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { message } = await request.json();
		if (!message) return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
		const promptLower = message.toLowerCase();
		let reply = "";
		if (promptLower.includes("đạo hàm") || promptLower.includes("toán") || promptLower.includes("tích phân")) reply = `**Đạo hàm và ứng dụng của Đạo hàm trong chương trình Toán 12:**

Trong Toán học lớp 12, Đạo hàm là công cụ cốt lõi để khảo sát sự biến thiên và vẽ đồ thị hàm số.

1. **Công thức đạo hàm hàm số cơ bản:**
- Hàm đa thức: $(x^n)' = n \\cdot x^{n-1}$
- Hàm logarit: $(\\ln x)' = \\frac{1}{x}$ và $(\\log_a x)' = \\frac{1}{x \\ln a}$
- Hàm mũ: $(e^x)' = e^x$ và $(a^x)' = a^x \\ln a$

2. **Ý nghĩa hình học:** Đạo hàm của hàm số $f(x)$ tại điểm $x_0$ là hệ số góc của tiếp tuyến của đồ thị hàm số tại điểm $M(x_0; f(x_0))$:
$$k = f'(x_0)$$

3. **Cực trị hàm số:** Nếu hàm số $y=f(x)$ đạt cực trị tại điểm $x_0$ và có đạo hàm tại đó thì:
$$f'(x_0) = 0$$
Bên cạnh đó, điểm cực trị là điểm mà tại đó đạo hàm $f'(x)$ đổi dấu khi đi qua nó.`;
		else if (promptLower.includes("ohm") || promptLower.includes("vật lý") || promptLower.includes("điện") || promptLower.includes("dao động")) reply = `**Dao động điều hòa và các công thức Vật Lý 12 cần nhớ:**

Chương Dao động cơ học là chương mở đầu rất quan trọng trong chương trình Vật lý 12.

1. **Phương trình dao động điều hòa:**
$$x = A \\cos(\\omega t + \\varphi)$$
- $x$: Li độ dao động (cm hoặc m).
- $A$: Biên độ dao động (luôn dương).
- $\\omega$: Tần số góc (rad/s), $\\omega = \\frac{2\\pi}{T} = 2\\pi f$.
- $\\varphi$: Pha ban đầu (rad).

2. **Mối liên hệ giữa vận tốc, gia tốc và li độ:**
- Vận tốc: $v = x' = -\\omega A \\sin(\\omega t + \\varphi)$
- Gia tốc: $a = v' = x'' = -\\omega^2 x$
- Hệ thức độc lập thời gian:
$$A^2 = x^2 + \\frac{v^2}{\\omega^2}$$

3. **Định luật Ohm cho toàn mạch (Vật lý 11 tái quát ở lớp 12):**
$$I = \\frac{\\mathcal{E}}{R_N + r}$$
Trong đó $\\mathcal{E}$ là suất điện động của nguồn, $R_N$ là điện trở mạch ngoài, và $r$ là điện trở trong của nguồn.`;
		else if (promptLower.includes("este") || promptLower.includes("hóa") || promptLower.includes("phản ứng") || promptLower.includes("axit")) reply = `**Chuyên đề Este - Lipit (Hóa học 12):**

Este là hợp chất hữu cơ quan trọng, thường có mùi thơm dễ chịu của hoa quả chín.

1. **Khái niệm:** Khi thay thế nhóm $-OH$ ở nhóm carboxyl của axit cacboxylic bằng nhóm $-OR'$ ta thu được este. Công thức chung của este no, đơn chức, mạch hở:
$$C_nH_{2n}O_2 \\quad (n \\ge 2)$$

2. **Tính chất hóa học tiêu biểu (Phản ứng thủy phân):**
- *Trong môi trường axit (thuận nghịch):*
$$R-COO-R' + H_2O \\overset{H^+, t^o}{\\rightleftharpoons} R-COOH + R'-OH$$
- *Trong môi trường kiềm (phản ứng xà phòng hóa - một chiều):*
$$R-COO-R' + NaOH \\xrightarrow{t^o} R-COONa + R'-OH$$

3. **Phản ứng điều chế este (Este hóa):** Cho axit cacboxylic tác dụng với ancol có xúc tác axit $H_2SO_4$ đặc, nóng:
$$R-COOH + R'-OH \\overset{H_2SO_4 \\text{ đặc}, t^o}{\\rightleftharpoons} R-COO-R' + H_2O$$`;
		else if (promptLower.includes("gen") || promptLower.includes("sinh") || promptLower.includes("di truyền") || promptLower.includes("dna")) reply = `**Cơ chế di truyền và Biến dị (Sinh học 12):**

Đây là phần kiến thức nền tảng trong Sinh học lớp 12.

1. **Quá trình nhân đôi DNA (Tái bản):**
- Diễn ra trong nhân tế bào, ở pha S của chu kỳ tế bào.
- Nguyên tắc: *Bán bảo toàn* (giữ lại một nửa sợi cũ) và *Bổ sung* ($A$ liên kết với $T$, $G$ liên kết với $X$).

2. **Phiên mã và Dịch mã:**
- *Phiên mã:* Tổng hợp phân tử RNA từ mạch mã gốc của gene.
- *Dịch mã:* Tổng hợp chuỗi polypeptide (protein) từ khuôn mẫu mRNA.

3. **Cơ chế liên kết bổ sung:**
Số lượng nucleotide của DNA được xác định theo nguyên tắc bổ sung:
$$A = T, \\quad G = X$$
$$N = 2A + 2G = 2T + 2X$$`;
		else if (promptLower.includes("relative") || promptLower.includes("tiếng anh") || promptLower.includes("grammar") || promptLower.includes("mệnh đề")) reply = `**Mệnh đề quan hệ (Relative Clauses) trong Tiếng Anh 12:**

Mệnh đề quan hệ được dùng để bổ nghĩa cho danh từ đứng trước nó.

1. **Đại từ quan hệ làm Chủ ngữ/Tân ngữ:**
- **Who**: Chỉ người (làm chủ ngữ/tân ngữ).
- **Whom**: Chỉ người (chỉ làm tân ngữ).
- **Which**: Chỉ vật (làm chủ ngữ/tân ngữ).
- **That**: Dùng thay thế cho *who, whom, which* trong mệnh đề xác định (Defining Clause).

2. **Đại từ quan hệ chỉ Sở hữu:**
- **Whose**: Đứng giữa hai danh từ để chỉ mối quan hệ sở hữu ($N_1 + \\text{whose} + N_2$).

3. **Trạng từ quan hệ (Relative Adverbs):**
- **When**: Chỉ thời gian (= *at/on/in which*).
- **Where**: Chỉ nơi chốn (= *at/in/to which*).
- **Why**: Chỉ lý do (= *for which*).`;
		else reply = `Chào cậu! Mình là Trợ lý Học tập AI lớp 12 đây.

Hãy đặt các câu hỏi cụ thể hơn về các môn học Toán, Lý, Hóa, Sinh, Anh để mình có thể giải thích chi tiết nhất kèm các công thức toán học dưới dạng LaTeX nhé.

Ví dụ cậu có thể gõ:
- *"Công thức tính tích phân từng phần"* 
- *"Mệnh đề quan hệ xác định"* 
- *"Tính chất hóa học của este"*`;
		return new Response(JSON.stringify({ response: reply }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/ai@_@ts
var page = () => ai_exports;
//#endregion
export { page };
