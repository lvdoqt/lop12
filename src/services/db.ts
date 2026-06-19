import { isMockMode, supabase, createAdminSupabase } from '../lib/supabase';
import type { Subject, Lesson, Question, Answer, Exam, Attempt, User, Blog, Comment, Course, CourseLesson, CourseEnrollment, LessonProgress } from '../types';

// ============================================================================
// SLUGIFY UTILITY (Vietnamese-aware)
// ============================================================================
function slugify(text: string): string {
  const map: Record<string, string> = {
    'à':'a','á':'a','ạ':'a','ả':'a','ã':'a','â':'a','ầ':'a','ấ':'a','ậ':'a','ẩ':'a','ẫ':'a',
    'ă':'a','ằ':'a','ắ':'a','ặ':'a','ẳ':'a','ẵ':'a',
    'è':'e','é':'e','ẹ':'e','ẻ':'e','ẽ':'e','ê':'e','ề':'e','ế':'e','ệ':'e','ể':'e','ễ':'e',
    'ì':'i','í':'i','ị':'i','ỉ':'i','ĩ':'i',
    'ò':'o','ó':'o','ọ':'o','ỏ':'o','õ':'o','ô':'o','ồ':'o','ố':'o','ộ':'o','ổ':'o','ỗ':'o',
    'ơ':'o','ờ':'o','ớ':'o','ợ':'o','ở':'o','ỡ':'o',
    'ù':'u','ú':'u','ụ':'u','ủ':'u','ũ':'u','ư':'u','ừ':'u','ứ':'u','ự':'u','ử':'u','ữ':'u',
    'ỳ':'y','ý':'y','ỵ':'y','ỷ':'y','ỹ':'y',
    'đ':'d',
    'À':'a','Á':'a','Ạ':'a','Ả':'a','Ã':'a','Â':'a','Ầ':'a','Ấ':'a','Ậ':'a','Ẩ':'a','Ẫ':'a',
    'Ă':'a','Ằ':'a','Ắ':'a','Ặ':'a','Ẳ':'a','Ẵ':'a',
    'È':'e','É':'e','Ẹ':'e','Ẻ':'e','Ẽ':'e','Ê':'e','Ề':'e','Ế':'e','Ệ':'e','Ể':'e','Ễ':'e',
    'Ì':'i','Í':'i','Ị':'i','Ỉ':'i','Ĩ':'i',
    'Ò':'o','Ó':'o','Ọ':'o','Ỏ':'o','Õ':'o','Ô':'o','Ồ':'o','Ố':'o','Ộ':'o','Ổ':'o','Ỗ':'o',
    'Ơ':'o','Ờ':'o','Ớ':'o','Ợ':'o','Ở':'o','Ỡ':'o',
    'Ù':'u','Ú':'u','Ụ':'u','Ủ':'u','Ũ':'u','Ư':'u','Ừ':'u','Ứ':'u','Ự':'u','Ử':'u','Ữ':'u',
    'Ỳ':'y','Ý':'y','Ỵ':'y','Ỷ':'y','Ỹ':'y',
    'Đ':'d',
  };
  return text
    .split('').map(c => map[c] || c).join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80); // max 80 chars
}

export function generateExamSlug(title: string, suffix?: string): string {
  const base = slugify(title);
  const unique = suffix || Date.now().toString(36); // e.g. 'lrqj7k'
  return base ? `${base}-${unique}` : unique;
}

// ============================================================================
// STATEFUL MOCK DATABASE (In-Memory for SSR Server / Local Testing)
// ============================================================================
let mockSubjects: Subject[] = [
  { id: 'sub-1',  name: 'Toán 12',        slug: 'toan-12' },
  { id: 'sub-2',  name: 'Vật lý 12',      slug: 'vat-ly-12' },
  { id: 'sub-3',  name: 'Hóa học 12',     slug: 'hoa-hoc-12' },
  { id: 'sub-4',  name: 'Sinh học 12',    slug: 'sinh-hoc-12' },
  { id: 'sub-6',  name: 'Ngữ Văn 12',     slug: 'ngu-van-12' },
  { id: 'sub-7',  name: 'Lịch Sử 12',     slug: 'lich-su-12' },
  { id: 'sub-8',  name: 'Địa Lý 12',      slug: 'dia-ly-12' },
  { id: 'sub-9',  name: 'KTPL 12',        slug: 'ktpl-12' },
  { id: 'sub-5',  name: 'Tiếng Anh 12',   slug: 'tieng-anh-12' },
  { id: 'sub-10', name: 'Tin Học 12',     slug: 'tin-hoc-12' },
  { id: 'sub-11', name: 'Công Nghệ 12',   slug: 'cong-nghe-12' },
];

interface MockQuestion extends Omit<Question, 'options'> {
  options: string[];
}

let mockQuestions: MockQuestion[] = [
  {
    id: 'q-1',
    de_id: 'exam-1',
    so_cau: 1,
    phan: 'I',
    content: 'Tìm tập xác định của hàm số $y = \\log_2(x - 3)$.',
    options: ['$D = (3; +\\infty)$', '$D = [3; +\\infty)$', '$D = \\mathbb{R} \\setminus \\{3\\}$', '$D = (-\\infty; 3)$'],
    answer: 'A',
    image_url: null,
    metadata: { grade: '12', chapter: 'Hàm số', difficulty: 'easy', type: 'single_choice', explanation: 'Hàm số $y = \\log_a(u(x))$ xác định khi và chỉ khi $u(x) > 0$. \nDo đó: $x - 3 > 0 \\Leftrightarrow x > 3$. Vậy tập xác định là $D = (3; +\\infty)$.', subject_id: 'sub-1' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subject_id: 'sub-1',
    explanation: 'Hàm số $y = \\log_a(u(x))$ xác định khi và chỉ khi $u(x) > 0$. \nDo đó: $x - 3 > 0 \\Leftrightarrow x > 3$. Vậy tập xác định là $D = (3; +\\infty)$.',
    difficulty: 'easy',
    type: 'single_choice'
  },
  {
    id: 'q-2',
    de_id: 'exam-2',
    so_cau: 1,
    phan: 'I',
    content: 'Tính nguyên hàm $I = \\int e^{2x} dx$.',
    options: ['$2 e^{2x} + C$', '$\\frac{1}{2} e^{2x} + C$', '$e^{2x} + C$', '$\\frac{1}{2} e^x + C$'],
    answer: 'B',
    image_url: null,
    metadata: { grade: '12', chapter: 'Nguyên hàm', difficulty: 'easy', type: 'single_choice', explanation: 'Áp dụng công thức nguyên hàm cơ bản: $\\int e^{ax+b} dx = \\frac{1}{a} e^{ax+b} + C$.\nỞ đây $a = 2$, suy ra $I = \\frac{1}{2} e^{2x} + C$.', subject_id: 'sub-1' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subject_id: 'sub-1',
    explanation: 'Áp dụng công thức nguyên hàm cơ bản: $\\int e^{ax+b} dx = \\frac{1}{a} e^{ax+b} + C$.\nỞ đây $a = 2$, suy ra $I = \\frac{1}{2} e^{2x} + C$.',
    difficulty: 'easy',
    type: 'single_choice'
  },
  {
    id: 'q-3',
    de_id: 'exam-1',
    so_cau: 2,
    phan: 'I',
    content: 'Cho hàm số $y = x^3 - 3x^2 + 2$. Khẳng định nào sau đây là ĐÚNG?',
    options: ['Đồng biến trên khoảng $(0; 2)$', 'Nghịch biến trên khoảng $(-\\infty; 0)$', 'Nghịch biến trên khoảng $(0; 2)$', 'Đồng biến trên khoảng $(-\\infty; 2)$'],
    answer: 'C',
    image_url: null,
    metadata: { grade: '12', chapter: 'Hàm số', difficulty: 'medium', type: 'single_choice', explanation: 'Ta có $y\' = 3x^2 - 6x = 3x(x - 2)$. \n$y\' > 0 \\Leftrightarrow x < 0$ hoặc $x > 2$ -> Đồng biến trên $(-\\infty; 0)$ và $(2; +\\infty)$. \n$y\' < 0 \\Leftrightarrow 0 < x < 2$ -> Nghịch biến trên $(0; 2)$.', subject_id: 'sub-1' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subject_id: 'sub-1',
    explanation: 'Ta có $y\' = 3x^2 - 6x = 3x(x - 2)$. \n$y\' > 0 \\Leftrightarrow x < 0$ hoặc $x > 2$ -> Đồng biến trên $(-\\infty; 0)$ và $(2; +\\infty)$. \n$y\' < 0 \\Leftrightarrow 0 < x < 2$ -> Nghịch biến trên $(0; 2)$.',
    difficulty: 'medium',
    type: 'single_choice'
  },
  {
    id: 'q-4',
    de_id: 'exam-3',
    so_cau: 1,
    phan: 'I',
    content: 'Một vật dao động điều hòa theo phương trình $x = 5 \\cos(4\\pi t + \\frac{\\pi}{3})$ (cm). Biên độ và pha ban đầu của dao động là bao nhiêu?',
    options: ['$A = 5$ cm, $\\varphi = \\frac{\\pi}{3}$ rad', '$A = 5$ cm, $\\varphi = 4\\pi$ rad', '$A = -5$ cm, $\\varphi = \\frac{\\pi}{3}$ rad', '$A = 5$ cm, $\\varphi = -\\frac{\\pi}{3}$ rad'],
    answer: 'A',
    image_url: null,
    metadata: { grade: '12', chapter: 'Dao động cơ', difficulty: 'easy', type: 'single_choice', explanation: 'Đối chiếu với phương trình tổng quát $x = A\\cos(\\omega t + \\varphi)$, ta có biên độ $A = 5$ cm và pha ban đầu $\\varphi = \\frac{\\pi}{3}$ rad.', subject_id: 'sub-2' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subject_id: 'sub-2',
    explanation: 'Đối chiếu với phương trình tổng quát $x = A\\cos(\\omega t + \\varphi)$, ta có biên độ $A = 5$ cm và pha ban đầu $\\varphi = \\frac{\\pi}{3}$ rad.',
    difficulty: 'easy',
    type: 'single_choice'
  },
  {
    id: 'q-5',
    de_id: 'exam-3',
    so_cau: 2,
    phan: 'I',
    content: 'Tính chu kỳ dao động điều hòa của con lắc lò xo gồm lò xo có độ cứng $k = 100$ N/m và vật nặng khối lượng $m = 250$ g (lấy $\\pi^2 = 10$).',
    options: ['$T = 0.314$ s', '$T = 0.628$ s', '$T = 3.14$ s', '$T = 1.0$ s'],
    answer: 'A',
    image_url: null,
    metadata: { grade: '12', chapter: 'Dao động cơ', difficulty: 'medium', type: 'single_choice', explanation: 'Công thức tính chu kỳ con lắc lò xo: $T = 2\\pi\\sqrt{\\frac{m}{k}}$. \nĐổi $m = 250\\text{ g} = 0.25\\text{ kg}$. \n$T = 2\\pi\\sqrt{\\frac{0.25}{100}} = 2\\pi\\sqrt{\\frac{1}{400}} = 2\\pi \\cdot \\frac{1}{20} = \\frac{\\pi}{10}$ (s). \nVì $\\pi = \\sqrt{10}$ nên $T = \\frac{\\sqrt{10}}{10} \\approx 0.316$ s. Nếu lấy $\\pi = 3.14$ thì $T = 0.314$ s.', subject_id: 'sub-2' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subject_id: 'sub-2',
    explanation: 'Công thức tính chu kỳ con lắc lò xo: $T = 2\\pi\\sqrt{\\frac{m}{k}}$. \nĐổi $m = 250\\text{ g} = 0.25\\text{ kg}$. \n$T = 2\\pi\\sqrt{\\frac{0.25}{100}} = 2\\pi\\sqrt{\\frac{1}{400}} = 2\\pi \\cdot \\frac{1}{20} = \\frac{\\pi}{10}$ (s). \nVì $\\pi = \\sqrt{10}$ nên $T = \\frac{\\sqrt{10}}{10} \\approx 0.316$ s. Nếu lấy $\\pi = 3.14$ thì $T = 0.314$ s.',
    difficulty: 'medium',
    type: 'single_choice'
  },
  {
    id: 'q-6',
    de_id: 'exam-2',
    so_cau: 2,
    phan: 'I',
    content: 'Chất nào sau đây tác dụng với dung dịch $NaOH$ đun nóng tạo thành muối natri axetat và rượu etylic?',
    options: ['Metyl axetat ($CH_3COOCH_3$)', 'Etyl axetat ($CH_3COOC_2H_5$)', 'Metyl fomat ($HCOOCH_3$)', 'Etyl fomat ($HCOOC_2H_5$)'],
    answer: 'B',
    image_url: null,
    metadata: { grade: '12', chapter: 'Este', difficulty: 'medium', type: 'single_choice', explanation: 'Natri axetat có công thức là $CH_3COONa$, rượu etylic có công thức là $C_2H_5OH$. \nDo đó este cần tìm là etyl axetat ($CH_3COOC_2H_5$). \nPhương trình: $CH_3COOC_2H_5 + NaOH \\xrightarrow{t^o} CH_3COONa + C_2H_5OH$.', subject_id: 'sub-3' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subject_id: 'sub-3',
    explanation: 'Natri axetat có công thức là $CH_3COONa$, rượu etylic có công thức là $C_2H_5OH$. \nDo đó este cần tìm là etyl axetat ($CH_3COOC_2H_5$). \nPhương trình: $CH_3COOC_2H_5 + NaOH \\xrightarrow{t^o} CH_3COONa + C_2H_5OH$.',
    difficulty: 'medium',
    type: 'single_choice'
  },
  {
    id: 'q-7',
    de_id: 'exam-1',
    so_cau: 3,
    phan: 'I',
    content: 'Complete the sentence: "The woman _______ live next door is a famous musician."',
    options: ['who', 'whom', 'which', 'whose'],
    answer: 'A',
    image_url: null,
    metadata: { grade: '12', chapter: 'Relative Clauses', difficulty: 'easy', type: 'single_choice', explanation: 'Đại từ quan hệ thay thế cho danh từ chỉ người "The woman" làm chủ ngữ của động từ "live" trong mệnh đề quan hệ phải là "who" (hoặc "that").', subject_id: 'sub-5' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subject_id: 'sub-5',
    explanation: 'Đại từ quan hệ thay thế cho danh từ chỉ người "The woman" làm chủ ngữ của động từ "live" trong mệnh đề quan hệ phải là "who" (hoặc "that").',
    difficulty: 'easy',
    type: 'single_choice'
  },
  {
    id: 'q-8',
    de_id: 'exam-2',
    so_cau: 3,
    phan: 'II',
    content: 'Đâu là các tính chất của tích phân xác định? (Chọn nhiều đáp án đúng)',
    options: ['$\\int_a^b [f(x) + g(x)] dx = \\int_a^b f(x) dx + \\int_a^b g(x) dx$', '$\\int_a^a f(x) dx = 0$', '$\\int_a^b f(x) dx = -\\int_b^a f(x) dx$', '$\\int_a^b f(x)g(x)dx = \\int_a^bf(x)dx \\cdot \\int_a^bg(x)dx$'],
    answer: 'A,B,C',
    image_url: null,
    metadata: { grade: '12', chapter: 'Tích phân', difficulty: 'hard', type: 'multiple_choice', explanation: 'Tính chất tích phân: \n1. $\\int_a^b [f(x) + g(x)] dx = \\int_a^b f(x) dx + \int_a^b g(x) dx$ (Đúng)\n2. $\\int_a^a f(x) dx = 0$ (Đúng)\n3. $\\int_a^b f(x) dx = -\\int_b^a f(x) dx$ (Đúng)\n4. $\\int_a^b f(x) g(x) dx = \\int_a^b f(x) dx \\cdot \\int_a^b g(x) dx$ (Sai)', subject_id: 'sub-1' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subject_id: 'sub-1',
    explanation: 'Tính chất tích phân: \n1. $\\int_a^b [f(x) + g(x)] dx = \\int_a^b f(x) dx + \int_a^b g(x) dx$ (Đúng)\n2. $\\int_a^a f(x) dx = 0$ (Đúng)\n3. $\\int_a^b f(x) dx = -\\int_b^a f(x) dx$ (Đúng)\n4. $\\int_a^b f(x) g(x) dx = \\int_a^b f(x) dx \\cdot \\int_a^b g(x) dx$ (Sai)',
    difficulty: 'hard',
    type: 'multiple_choice'
  },
  {
    id: 'q-9',
    de_id: 'exam-1',
    so_cau: 4,
    phan: 'II',
    content: 'Phát biểu sau đây đúng hay sai: "Hàm số $y = f(x)$ đồng biến trên $K$ thì đạo hàm của nó phải luôn dương trên $K$."',
    options: ['Đúng', 'Sai'],
    answer: 'B',
    image_url: null,
    metadata: { grade: '12', chapter: 'Hàm số', difficulty: 'medium', type: 'true_false', explanation: 'Sai. Hàm số đồng biến trên $K$ chỉ cần có $f\'(x) \\ge 0$ với mọi $x \\in K$ (đạo hàm có thể bằng 0 tại một số hữu hạn điểm). Ví dụ hàm số $y = x^3$ đồng biến trên $\\mathbb{R}$ nhưng tại $x=0$ thì $y\' = 3x^2 = 0$.', subject_id: 'sub-1' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    subject_id: 'sub-1',
    explanation: 'Sai. Hàm số đồng biến trên $K$ chỉ cần có $f\'(x) \\ge 0$ với mọi $x \\in K$ (đạo hàm có thể bằng 0 tại một số hữu hạn điểm). Ví dụ hàm số $y = x^3$ đồng biến trên $\\mathbb{R}$ nhưng tại $x=0$ thì $y\' = 3x^2 = 0$.',
    difficulty: 'medium',
    type: 'true_false'
  }
];

let mockAnswers: Answer[] = [
  // q-1: log_2(x-3)
  { id: 'a-1-1', question_id: 'q-1', content: '$D = (3; +\\infty)$', is_correct: true },
  { id: 'a-1-2', question_id: 'q-1', content: '$D = [3; +\\infty)$', is_correct: false },
  { id: 'a-1-3', question_id: 'q-1', content: '$D = \\mathbb{R} \\setminus \\{3\\}$', is_correct: false },
  { id: 'a-1-4', question_id: 'q-1', content: '$D = (-\\infty; 3)$', is_correct: false },
  // q-2: \int e^{2x}
  { id: 'a-2-1', question_id: 'q-2', content: '$2 e^{2x} + C$', is_correct: false },
  { id: 'a-2-2', question_id: 'q-2', content: '$\\frac{1}{2} e^{2x} + C$', is_correct: true },
  { id: 'a-2-3', question_id: 'q-2', content: '$e^{2x} + C$', is_correct: false },
  { id: 'a-2-4', question_id: 'q-2', content: '$\\frac{1}{2} e^x + C$', is_correct: false },
  // q-3: y = x^3 - 3x^2 + 2
  { id: 'a-3-1', question_id: 'q-3', content: 'Đồng biến trên khoảng $(0; 2)$', is_correct: false },
  { id: 'a-3-2', question_id: 'q-3', content: 'Nghịch biến trên khoảng $(-\\infty; 0)$', is_correct: false },
  { id: 'a-3-3', question_id: 'q-3', content: 'Nghịch biến trên khoảng $(0; 2)$', is_correct: true },
  { id: 'a-3-4', question_id: 'q-3', content: 'Đồng biến trên khoảng $(-\\infty; 2)$', is_correct: false },
  // q-4: x = 5 \cos(4\pi t + \pi/3)
  { id: 'a-4-1', question_id: 'q-4', content: '$A = 5$ cm, $\\varphi = \\frac{\\pi}{3}$ rad', is_correct: true },
  { id: 'a-4-2', question_id: 'q-4', content: '$A = 5$ cm, $\\varphi = 4\\pi$ rad', is_correct: false },
  { id: 'a-4-3', question_id: 'q-4', content: '$A = -5$ cm, $\\varphi = \\frac{\\pi}{3}$ rad', is_correct: false },
  { id: 'a-4-4', question_id: 'q-4', content: '$A = 5$ cm, $\\varphi = -\\frac{\\pi}{3}$ rad', is_correct: false },
  // q-5: T = 2\pi\sqrt{m/k}
  { id: 'a-5-1', question_id: 'q-5', content: '$T = 0.314$ s', is_correct: true },
  { id: 'a-5-2', question_id: 'q-5', content: '$T = 0.628$ s', is_correct: false },
  { id: 'a-5-3', question_id: 'q-5', content: '$T = 3.14$ s', is_correct: false },
  { id: 'a-5-4', question_id: 'q-5', content: '$T = 1.0$ s', is_correct: false },
  // q-6: ethyl acetate
  { id: 'a-6-1', question_id: 'q-6', content: 'Metyl axetat ($CH_3COOCH_3$)', is_correct: false },
  { id: 'a-6-2', question_id: 'q-6', content: 'Etyl axetat ($CH_3COOC_2H_5$)', is_correct: true },
  { id: 'a-6-3', question_id: 'q-6', content: 'Metyl fomat ($HCOOCH_3$)', is_correct: false },
  { id: 'a-6-4', question_id: 'q-6', content: 'Etyl fomat ($HCOOC_2H_5$)', is_correct: false },
  // q-7: English Grammar
  { id: 'a-7-1', question_id: 'q-7', content: 'who', is_correct: true },
  { id: 'a-7-2', question_id: 'q-7', content: 'whom', is_correct: false },
  { id: 'a-7-3', question_id: 'q-7', content: 'which', is_correct: false },
  { id: 'a-7-4', question_id: 'q-7', content: 'whose', is_correct: false },
  // q-8: Multiple choices properties of Integrals
  { id: 'a-8-1', question_id: 'q-8', content: '$\\int_a^b [f(x) + g(x)] dx = \\int_a^b f(x) dx + \\int_a^b g(x) dx$', is_correct: true },
  { id: 'a-8-2', question_id: 'q-8', content: '$\\int_a^a f(x) dx = 0$', is_correct: true },
  { id: 'a-8-3', question_id: 'q-8', content: '$\\int_a^b f(x) dx = -\\int_b^a f(x) dx$', is_correct: true },
  { id: 'a-8-4', question_id: 'q-8', content: '$\\int_a^b f(x)g(x)dx = \\int_a^bf(x)dx \\cdot \\int_a^bg(x)dx$', is_correct: false },
  // q-9: True/False
  { id: 'a-9-1', question_id: 'q-9', content: 'Đúng', is_correct: false },
  { id: 'a-9-2', question_id: 'q-9', content: 'Sai', is_correct: true },
];

let mockExams: Exam[] = [
  {
    id: 'exam-1',
    slug: 'de-kiem-tra-15-phut-tinh-don-dieu-cuc-tri',
    title: 'Đề kiểm tra 15 phút: Tính đơn điệu & Cực trị hàm số',
    duration: 15,
    subject_id: 'sub-1',
    exam_type: '15m',
    created_by: 'mock-user-teacher',
    created_at: new Date().toISOString()
  },
  {
    id: 'exam-2',
    slug: 'de-kiem-tra-1-tiet-nguyen-ham-tich-phan',
    title: 'Đề kiểm tra 1 tiết: Nguyên hàm và Tích phân',
    duration: 45,
    subject_id: 'sub-1',
    exam_type: '45m',
    password: 'lop12@abc',
    created_by: 'mock-user-teacher',
    created_at: new Date().toISOString()
  },
  {
    id: 'exam-3',
    slug: 'de-thi-thu-thpt-quoc-gia-vat-ly-12',
    title: 'Đề thi thử THPT Quốc gia: Môn Vật Lý 12',
    duration: 50,
    subject_id: 'sub-2',
    exam_type: 'mock_thpt',
    created_by: 'mock-user-admin',
    created_at: new Date().toISOString()
  }
];

let mockAttempts: Attempt[] = [];

let mockComments: Comment[] = [];

// ── Course mock data ──────────────────────────────────────────────────────
let mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Luyện thi THPT Toán 12 - Hàm số & Đạo hàm',
    description: 'Khóa học toàn diện bao gồm lý thuyết, bài tập và đề luyện cho chương Hàm số và Đạo hàm. Thích hợp cho học sinh lớp 12 ôn thi THPT Quốc gia.',
    slug: 'luyen-thi-thpt-toan-12-ham-so',
    subject_id: 'sub-1',
    cover_url: null,
    is_published: true,
    created_by: 'mock-user-teacher',
    created_at: new Date().toISOString()
  },
  {
    id: 'course-2',
    title: 'Vật Lý 12 - Dao động & Sóng cơ',
    description: 'Nắm vững các dạng bài dao động điều hòa, con lắc lò xo, con lắc đơn và sóng cơ học với hơn 20 bài giảng chi tiết.',
    slug: 'vat-ly-12-dao-dong-song-co',
    subject_id: 'sub-2',
    cover_url: null,
    is_published: true,
    created_by: 'mock-user-teacher',
    created_at: new Date().toISOString()
  }
];

let mockCourseLessons: CourseLesson[] = [
  {
    id: 'cl-1',
    course_id: 'course-1',
    title: 'Khái niệm hàm số và tính đơn điệu',
    content: '## Định nghĩa\n\nHàm số $y = f(x)$ đồng biến trên $K$ nếu với mọi $x_1 < x_2 \\in K$ thì $f(x_1) < f(x_2)$.\n\n## Điều kiện\n\nNếu $f\'(x) > 0$ với mọi $x \\in K$ thì hàm số đồng biến trên $K$.',
    video_url: null,
    order_index: 1,
    duration: 15,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cl-2',
    course_id: 'course-1',
    title: 'Cực trị hàm số - Lý thuyết và bài tập',
    content: '## Định nghĩa cực trị\n\nHàm số $y = f(x)$ đạt cực đại tại $x_0$ nếu tồn tại $\\delta > 0$ sao cho $f(x) < f(x_0)$ với mọi $x \\in (x_0 - \\delta, x_0 + \\delta), x \\neq x_0$.',
    video_url: null,
    order_index: 2,
    duration: 20,
    is_published: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cl-3',
    course_id: 'course-2',
    title: 'Dao động điều hòa - Đại cương',
    content: '## Phương trình dao động\n\n$x = A\\cos(\\omega t + \\varphi)$\n\nTrong đó:\n- $A$ là biên độ (cm)\n- $\\omega$ là tần số góc (rad/s)\n- $\\varphi$ là pha ban đầu (rad)',
    video_url: null,
    order_index: 1,
    duration: 18,
    is_published: true,
    created_at: new Date().toISOString()
  }
];

let mockEnrollments: CourseEnrollment[] = [];
let mockLessonProgress: LessonProgress[] = [];

let mockBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'Bí kíp đạt điểm 9+ môn Toán THPT Quốc Gia',
    slug: 'bi-kip-dat-diem-9-mon-toan-thpt-quoc-gia',
    summary: 'Chia sẻ lộ trình ôn thi và các mẹo giải nhanh tích phân, hàm số giúp cậu bứt phá điểm số môn Toán.',
    created_by: 'mock-user-admin',
    content: `# Lộ trình ôn thi môn Toán đạt điểm 9+

Làm sao để giải quyết trọn vẹn đề thi Toán THPT Quốc gia trong 90 phút? Dưới đây là các bước chuẩn bị hiệu quả:

## 1. Nắm chắc phần nhận biết và thông hiểu
Đề thi gồm 50 câu trắc nghiệm. 30-35 câu đầu tiên luôn ở mức độ nhận biết và thông hiểu. Cậu phải luyện tập để giải quyết các câu này trong tối đa 30 phút mà không sai sót.

## 2. Các chuyên đề trọng tâm cần tập trung
- **Hàm số và đồ thị:** Chú ý các bài toán biện luận cực trị, tiệm cận.
- **Nguyên hàm, tích phân:** Nắm vững các công thức cơ bản và phương pháp đổi biến, nguyên hàm từng phần:
  $$\\int u dv = uv - \\int v du$$
- **Số phức & Hình học Oxyz:** Ôn tập các công thức khoảng cách, góc, và phương trình mặt phẳng.`,
    cover_url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: 'blog-2',
    title: 'Cấu trúc đề minh họa môn Vật Lý 12 mới nhất',
    slug: 'cau-truc-de-minh-hoa-mon-vat-ly-12-moi-nhat',
    summary: 'Phân tích ma trận đề minh họa THPT môn Vật Lý và các phân phối điểm số các chương dao động, sóng cơ.',
    created_by: 'mock-user-teacher',
    content: `# Phân tích đề minh họa môn Vật Lý

Chương trình Vật lý 12 tập trung nhiều vào Dao động cơ, Sóng cơ và Dòng điện xoay chiều.

## Ma trận đề thi tham khảo
- **Dao động cơ:** 6-8 câu.
- **Sóng cơ học:** 5-6 câu.
- **Điện xoay chiều:** 8-10 câu. Đây là chương khó nhất, thường chứa các câu hỏi vận dụng cao về đồ thị và giản đồ vectơ.
  $$i = I_0 \\cos(\\omega t + \\varphi_i)$$
- **Sóng ánh sáng & Hạt nhân:** Chiếm khoảng 20% đề thi nhưng câu hỏi tương đối dễ ăn điểm. Hãy tập trung học kỹ lý thuyết chương này.`,
    cover_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=600&auto=format&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: 'blog-3',
    title: 'Phương pháp ghi nhớ 12 thì tiếng Anh trong 30 phút',
    slug: 'phuong-phap-ghi-nho-12-thi-tieng-anh-trong-30-phut',
    summary: 'Mẹo học thuộc nhanh cấu trúc ngữ pháp và cách sử dụng các thì trong đề thi tiếng Anh THPT Quốc gia.',
    created_by: 'mock-user-admin',
    content: `# Trọn bộ mẹo nhớ nhanh các thì Tiếng Anh

Việc học thuộc lòng 12 thì có thể trở nên dễ dàng nếu cậu áp dụng sơ đồ trục thời gian (Timeline).

## 1. Các thì hiện tại (Present)
- **Hiện tại đơn (Simple Present):** Diễn tả sự thật hiển nhiên.
  - *S + V(s/es)*
- **Hiện tại tiếp diễn (Present Continuous):** Diễn tả hành động đang diễn ra.
  - *S + am/is/are + V-ing*

## 2. Các thì quá khứ (Past)
- **Quá khứ đơn (Simple Past):** Diễn tả hành động đã kết thúc trong quá khứ.
- **Quá khứ hoàn thành (Past Perfect):** Diễn tả hành động xảy ra trước một hành động quá khứ khác.
  - *S + had + V3/ed*`,
    cover_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop',
    created_at: new Date().toISOString()
  }
];

let mockUsers: User[] = [
  {
    id: 'mock-user-student',
    email: 'student@lop12.vn',
    fullname: 'Nguyễn Văn Học Sinh',
    avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=student',
    role: 'student',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-user-teacher',
    email: 'teacher@lop12.vn',
    fullname: 'Trần Thị Giáo Viên',
    avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=teacher',
    role: 'teacher',
    created_at: new Date().toISOString()
  },
  {
    id: 'mock-user-admin',
    email: 'admin@lop12.vn',
    fullname: 'Lê Hoàng Admin',
    avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=admin',
    role: 'admin',
    created_at: new Date().toISOString()
  }
];

function mapWPPostToBlog(post: any): Blog {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const cover_url = featuredMedia?.source_url || featuredMedia?.media_details?.sizes?.medium?.source_url || null;
  const authorName = post._embedded?.author?.[0]?.name || null;

  // Clean excerpt.rendered from HTML tags for the summary
  let summary = post.excerpt?.rendered || '';
  summary = summary.replace(/<\/?[^>]+(>|$)/g, '').trim();

  return {
    id: String(post.id),
    title: post.title?.rendered || '',
    slug: post.slug || '',
    summary: summary || null,
    content: post.content?.rendered || null,
    cover_url,
    created_by: authorName,
    created_at: post.date || new Date().toISOString(),
    categories: post.categories || []
  };
}

// Helper to map DB Question to App Question format
function mapDbQuestionToAppQuestion(dbQ: any): Question & { answers: Answer[], subject?: Subject } {
  const metadata = dbQ.metadata || {};
  const difficulty = metadata.difficulty || 'medium';
  const qType = metadata.type || 'single_choice';
  const explanation = metadata.explanation || null;
  const subjectId = metadata.subject_id || '';
  const createdBy = metadata.created_by || null;

  const rawOptions = Array.isArray(dbQ.options) ? dbQ.options : [];
  const correctLetters = (dbQ.answer || '').split(',').map((l: string) => l.trim().toUpperCase());

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const answers: Answer[] = rawOptions.map((opt: string, idx: number) => {
    const letter = alphabet[idx] || String(idx);
    const isCorrect = correctLetters.includes(letter);
    return {
      id: `${dbQ.id}-${letter}`,
      question_id: dbQ.id,
      content: opt,
      is_correct: isCorrect
    };
  });

  return {
    id: dbQ.id,
    de_id: dbQ.de_id,
    so_cau: dbQ.so_cau,
    phan: dbQ.phan,
    content: dbQ.content,
    options: dbQ.options,
    answer: dbQ.answer,
    image_url: dbQ.image_url,
    metadata: dbQ.metadata,
    created_at: dbQ.created_at,
    updated_at: dbQ.updated_at,
    
    // Compatibility fields
    subject_id: subjectId,
    explanation: explanation,
    difficulty: difficulty,
    type: qType,
    answers: answers,
    created_by: createdBy
  };
}

export const db = {
  // --------------------------------------------------------------------------
  // SUBJECTS
  // --------------------------------------------------------------------------
  async getSubjects(): Promise<Subject[]> {
    if (isMockMode) {
      return mockSubjects;
    }
    const { data, error } = await supabase.from('subjects').select('*').order('name');
    if (error) throw error;
    return data || [];
  },

  async getSubjectBySlug(slug: string): Promise<Subject | null> {
    if (isMockMode) {
      return mockSubjects.find(s => s.slug === slug) || null;
    }
    const { data, error } = await supabase.from('subjects').select('*').eq('slug', slug).single();
    if (error) return null;
    return data;
  },



  // --------------------------------------------------------------------------
  // EXAMS & EXAM QUESTIONS
  // --------------------------------------------------------------------------
  async getExams(subjectId?: string, createdBy?: string): Promise<(Exam & { subject?: Subject })[]> {
    if (isMockMode) {
      let exams = mockExams;
      if (subjectId) exams = mockExams.filter(e => e.subject_id === subjectId);
      if (createdBy) exams = exams.filter(e => e.created_by === createdBy);
      return exams.map(e => ({ ...e, subject: mockSubjects.find(s => s.id === e.subject_id) }));
    }
    // Use admin client to bypass RLS for server-side reads (auth.uid() is null in SSR)
    const client = createAdminSupabase() || supabase!;
    let query = client.from('exams').select('*, subject:subjects(*)').order('created_at', { ascending: false });
    if (subjectId) query = query.eq('subject_id', subjectId);
    if (createdBy) query = query.eq('created_by', createdBy);
    const { data, error } = await query;
    if (error) { console.error('[db.getExams] error:', error); throw error; }
    return data || [];
  },

  async getExamBySlug(slug: string): Promise<(Exam & { subject?: Subject }) | null> {
    if (isMockMode) {
      const exam = mockExams.find(e => e.slug === slug || e.id === slug);
      if (!exam) return null;
      return { ...exam, subject: mockSubjects.find(s => s.id === exam.subject_id) };
    }
    const client = createAdminSupabase() || supabase!;
    // Try by slug first, then fall back to id for backward compat with UUID URLs
    const { data: bySlug } = await client.from('exams').select('*, subject:subjects(*)').eq('slug', slug).single();
    if (bySlug) return bySlug;
    // Fallback: try as UUID id (for old links)
    const { data: byId } = await client.from('exams').select('*, subject:subjects(*)').eq('id', slug).single();
    return byId || null;
  },

  async getExamById(id: string): Promise<(Exam & { subject?: Subject }) | null> {
    if (isMockMode) {
      const exam = mockExams.find(e => e.id === id);
      if (!exam) return null;
      return { ...exam, subject: mockSubjects.find(s => s.id === exam.subject_id) };
    }
    // Use admin client to bypass RLS for server-side reads
    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client.from('exams').select('*, subject:subjects(*)').eq('id', id).single();
    if (error) return null;
    return data;
  },

  async getExamQuestionCounts(examIds: string[]): Promise<Record<string, number>> {
    const counts: Record<string, number> = {};
    if (examIds.length === 0) return counts;

    if (isMockMode) {
      for (const q of mockQuestions) {
        if (q.de_id && examIds.includes(q.de_id)) {
          counts[q.de_id] = (counts[q.de_id] || 0) + 1;
        }
      }
      return counts;
    }

    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client.from('questions').select('de_id').in('de_id', examIds);
    if (data && !error) {
      for (const row of data) {
        if (row.de_id) {
          counts[row.de_id] = (counts[row.de_id] || 0) + 1;
        }
      }
    }
    return counts;
  },

  async createExam(exam: Omit<Exam, 'id' | 'created_at' | 'slug'>, questionIds: string[]): Promise<Exam> {
    if (isMockMode) {
      const newExam: Exam = {
        ...exam,
        id: `exam-${Date.now()}`,
        slug: generateExamSlug(exam.title),
        created_at: new Date().toISOString()
      };
      mockExams.push(newExam);
      return newExam;
    }

    // Auto-generate slug from title
    const slug = generateExamSlug(exam.title);
    const adminClient = createAdminSupabase();
    if (!adminClient) {
      throw new Error('[db.createExam] Admin Supabase client unavailable. Set SUPABASE_SERVICE_ROLE_KEY.');
    }
    const { data: newExam, error: examError } = await adminClient
      .from('exams')
      .insert([{ ...exam, slug }])
      .select()
      .single();
    if (examError) { console.error('[db.createExam] error:', examError); throw examError; }

    if (questionIds.length > 0) {
      // Fetch the template questions from the bank
      const { data: templates, error: tempError } = await adminClient
        .from('questions')
        .select('*')
        .in('id', questionIds);
      if (tempError) { console.error('[db.createExam] templates fetch error:', tempError); throw tempError; }

      // Map templates by ID to preserve order of questionIds list
      const templatesMap = new Map(templates.map(t => [t.id, t]));

      const questionsToInsert = questionIds.map((qId, index) => {
        const t = templatesMap.get(qId);
        if (!t) return null;
        return {
          de_id: newExam.id,
          so_cau: index + 1,
          phan: 'I',
          content: t.content,
          options: t.options,
          answer: t.answer,
          image_url: t.image_url,
          metadata: {
            ...(t.metadata || {}),
            parent_id: t.id
          }
        };
      }).filter((x): x is NonNullable<typeof x> => x != null);

      if (questionsToInsert.length > 0) {
        const { error: insError } = await adminClient.from('questions').insert(questionsToInsert);
        if (insError) { console.error('[db.createExam] questions insert error:', insError); throw insError; }
      }
    }
    return newExam;
  },

  async updateExam(id: string, exam: Partial<Omit<Exam, 'id' | 'created_at'>>, questionIds?: string[]): Promise<Exam> {
    if (isMockMode) {
      const index = mockExams.findIndex(e => e.id === id);
      if (index === -1) throw new Error('Exam not found');
      mockExams[index] = { ...mockExams[index], ...exam };

      // Note: mock mode doesn't update question-exam links since questions carry de_id inline
      return mockExams[index];
    }

    const adminClient = createAdminSupabase();
    if (!adminClient) {
      throw new Error('[db.updateExam] Admin Supabase client unavailable. Set SUPABASE_SERVICE_ROLE_KEY.');
    }
    const { data: updatedExam, error: examError } = await adminClient.from('exams').update(exam).eq('id', id).select().single();
    if (examError) throw examError;

    if (questionIds) {
      // Delete old questions associated with this exam (de_id = id)
      const { error: delError } = await adminClient.from('questions').delete().eq('de_id', id);
      if (delError) throw delError;

      // Copy new questions from bank
      if (questionIds.length > 0) {
        const { data: templates, error: tempError } = await adminClient
          .from('questions')
          .select('*')
          .in('id', questionIds);
        if (tempError) throw tempError;

        const templatesMap = new Map(templates.map(t => [t.id, t]));

        const questionsToInsert = questionIds.map((qId, index) => {
          const t = templatesMap.get(qId);
          if (!t) return null;
          return {
            de_id: id,
            so_cau: index + 1,
            phan: 'I',
            content: t.content,
            options: t.options,
            answer: t.answer,
            image_url: t.image_url,
            metadata: {
              ...(t.metadata || {}),
              parent_id: t.id
            }
          };
        }).filter((x): x is NonNullable<typeof x> => x != null);

        if (questionsToInsert.length > 0) {
          const { error: insError } = await adminClient.from('questions').insert(questionsToInsert);
          if (insError) throw insError;
        }
      }
    }

    return updatedExam;
  },

  async updateExamWithQuestions(id: string, exam: Partial<Omit<Exam, 'id' | 'created_at'>>, questionsData?: any[]): Promise<Exam> {
    if (isMockMode) {
      const index = mockExams.findIndex(e => e.id === id);
      if (index === -1) throw new Error('Exam not found');
      mockExams[index] = { ...mockExams[index], ...exam };
      return mockExams[index];
    }

    const adminClient = createAdminSupabase();
    if (!adminClient) {
      throw new Error('[db.updateExamWithQuestions] Admin Supabase client unavailable.');
    }
    const { data: updatedExam, error: examError } = await adminClient.from('exams').update(exam).eq('id', id).select().single();
    if (examError) throw examError;

    if (questionsData) {
      // Delete old questions associated with this exam
      const { error: delError } = await adminClient.from('questions').delete().eq('de_id', id);
      if (delError) throw delError;

      if (questionsData.length > 0) {
        const questionsToInsert = questionsData.map((q, index) => {
          return {
            de_id: id,
            so_cau: index + 1,
            phan: q.phan || 'I',
            content: q.content,
            options: q.options || [],
            answer: q.answer || null,
            image_url: q.image_url || null,
            metadata: q.metadata || {}
          };
        });

        const { error: insError } = await adminClient.from('questions').insert(questionsToInsert);
        if (insError) throw insError;
      }
    }

    return updatedExam;
  },

  async deleteExam(id: string): Promise<void> {
    if (isMockMode) {
      mockExams = mockExams.filter(e => e.id !== id);
      mockQuestions = mockQuestions.filter(q => q.de_id !== id);
      return;
    }
    const adminClient = createAdminSupabase();
    if (!adminClient) {
      throw new Error('[db.deleteExam] Admin Supabase client unavailable. Set SUPABASE_SERVICE_ROLE_KEY.');
    }
    // Delete associated questions first
    await adminClient.from('questions').delete().eq('de_id', id);
    // Delete exam
    const { error } = await adminClient.from('exams').delete().eq('id', id);
    if (error) throw error;
  },

  // --------------------------------------------------------------------------
  // QUESTIONS & ANSWERS
  // --------------------------------------------------------------------------
  async getQuestions(subjectId?: string, createdBy?: string, grade?: string): Promise<(Question & { answers: Answer[], subject?: Subject })[]> {
    if (isMockMode) {
      let qList = mockQuestions;
      if (subjectId) {
        qList = qList.filter(q => q.subject_id === subjectId);
      }
      if (createdBy) {
        qList = qList.filter(q => q.metadata?.created_by === createdBy);
      }
      if (grade) {
        qList = qList.filter(q => q.metadata?.grade === grade);
      }
      return qList.map(q => ({
        ...q,
        answers: mockAnswers.filter(a => a.question_id === q.id),
        subject: mockSubjects.find(s => s.id === q.subject_id)
      }));
    }
    
    const client = createAdminSupabase() || supabase;
    let query = client.from('questions').select('*').eq('de_id', 'bank');
    if (subjectId) {
      query = query.eq('metadata->>subject_id', subjectId);
    }
    if (createdBy) {
      query = query.eq('metadata->>created_by', createdBy);
    }
    if (grade) {
      query = query.eq('metadata->>grade', grade);
    }
    const { data, error } = await query;
    if (error) throw error;

    // Fetch subjects to associate
    const subjects = await this.getSubjects();

    return (data || []).map(q => {
      const mapped = mapDbQuestionToAppQuestion(q);
      mapped.subject = subjects.find(s => s.id === mapped.subject_id);
      return mapped;
    });
  },

  async getQuestionsByExamId(examId: string): Promise<(Question & { answers: Answer[] })[]> {
    if (isMockMode) {
      const qList = mockQuestions.filter(q => q.de_id === examId);
      return qList.map(q => ({
        ...q,
        answers: q.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const correctLetters = (q.answer || '').split(',').map(l => l.trim().toUpperCase());
          return {
            id: `${q.id}-${letter}`,
            question_id: q.id,
            content: opt,
            is_correct: correctLetters.includes(letter)
          };
        })
      }));
    }

    const adminClient = createAdminSupabase();
    if (!adminClient) {
      console.warn('[db.getQuestionsByExamId] Admin client unavailable (missing SUPABASE_SERVICE_ROLE_KEY?), falling back to anon client — RLS may block SSR reads.');
    }
    const client = adminClient || supabase;
    if (!client) {
      console.error('[db.getQuestionsByExamId] No Supabase client available (both admin and anon are null).');
      return [];
    }
    
    // In the new schema, questions are linked directly via de_id
    const { data: questions, error: qError } = await client
      .from('questions')
      .select('*')
      .eq('de_id', examId)
      .order('phan')
      .order('so_cau');
      
    if (qError) {
      console.error('[db.getQuestionsByExamId] Supabase query error:', qError.message);
      throw qError;
    }

    return (questions || []).map(q => mapDbQuestionToAppQuestion(q));
  },

  async createQuestion(question: Omit<Question, 'id'>, answers: Omit<Answer, 'id' | 'question_id'>[]): Promise<Question & { answers: Answer[] }> {
    if (isMockMode) {
      const newQuestion: Question = {
        ...question,
        id: `q-${Date.now()}`
      };
      mockQuestions.push(newQuestion);

      const newAnswers = answers.map((ans, idx) => {
        const a: Answer = {
          ...ans,
          id: `a-${Date.now()}-${idx}`,
          question_id: newQuestion.id
        };
        mockAnswers.push(a);
        return a;
      });

      return { ...newQuestion, answers: newAnswers };
    }

    const adminClient = createAdminSupabase() || supabase;

    // Map answers array to options array and answer string
    const options = question.type === 'sa' ? [] : answers.map(a => a.content);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const correctLetters = answers
      .map((a, idx) => a.is_correct ? alphabet[idx] : null)
      .filter(Boolean) as string[];
    const answerStr = question.type === 'sa' ? (question.answer || '') : correctLetters.join(',');

    const metadata = {
      difficulty: question.difficulty,
      type: question.type,
      explanation: question.explanation,
      subject_id: question.subject_id,
      grade: '12',
      ...(question.created_by ? { created_by: question.created_by } : {})
    };

    // Default de_id to 'bank' for templates
    const de_id = 'bank';
    
    // Find next so_cau for 'bank'
    const { data: countData, error: countError } = await adminClient
      .from('questions')
      .select('so_cau')
      .eq('de_id', de_id)
      .order('so_cau', { ascending: false })
      .limit(1);
      
    let nextSoCau = 1;
    if (countData && countData.length > 0) {
      nextSoCau = countData[0].so_cau + 1;
    }

    const dbInsert = {
      de_id,
      so_cau: nextSoCau,
      phan: 'I',
      content: question.content,
      options,
      answer: answerStr,
      metadata,
      image_url: null
    };

    const { data: newQ, error: qError } = await adminClient
      .from('questions')
      .insert([dbInsert])
      .select()
      .single();
      
    if (qError) throw qError;

    return mapDbQuestionToAppQuestion(newQ);
  },

  async updateQuestion(id: string, question: Partial<Omit<Question, 'id'>>, answers?: (Omit<Answer, 'id' | 'question_id'> & { id?: string })[]): Promise<Question & { answers: Answer[] }> {
    if (isMockMode) {
      const qIndex = mockQuestions.findIndex(q => q.id === id);
      if (qIndex === -1) throw new Error('Question not found');
      mockQuestions[qIndex] = { ...mockQuestions[qIndex], ...question };

      if (answers) {
        mockAnswers = mockAnswers.filter(a => a.question_id !== id);
        answers.forEach((ans, idx) => {
          mockAnswers.push({
            id: ans.id || `a-${Date.now()}-${idx}`,
            question_id: id,
            content: ans.content,
            is_correct: ans.is_correct
          });
        });
      }

      return {
        ...mockQuestions[qIndex],
        answers: mockAnswers.filter(a => a.question_id === id)
      };
    }

    const adminClient = createAdminSupabase() || supabase;

    // Get existing question to preserve/merge metadata
    const { data: existingQ, error: fetchErr } = await adminClient
      .from('questions')
      .select('*')
      .eq('id', id)
      .single();
    if (fetchErr) throw fetchErr;

    const existingMetadata = existingQ.metadata || {};
    
    const updatedMetadata = {
      ...existingMetadata,
      ...(question.difficulty ? { difficulty: question.difficulty } : {}),
      ...(question.type ? { type: question.type } : {}),
      ...(question.explanation !== undefined ? { explanation: question.explanation } : {}),
      ...(question.subject_id ? { subject_id: question.subject_id } : {})
    };

    const currentType = question.type || existingMetadata.type;
    const dbUpdate: any = {
      ...(question.content ? { content: question.content } : {}),
      metadata: updatedMetadata
    };

    if (currentType === 'sa') {
      dbUpdate.options = [];
      dbUpdate.answer = question.answer || '';
    } else if (answers) {
      const options = answers.map(a => a.content);
      const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const correctLetters = answers
        .map((a, idx) => a.is_correct ? alphabet[idx] : null)
        .filter(Boolean) as string[];
      const answerStr = correctLetters.join(',');

      dbUpdate.options = options;
      dbUpdate.answer = answerStr;
    }

    const { data: updatedQ, error: qError } = await adminClient
      .from('questions')
      .update(dbUpdate)
      .eq('id', id)
      .select()
      .single();
    if (qError) throw qError;

    return mapDbQuestionToAppQuestion(updatedQ);
  },

  async deleteQuestion(id: string): Promise<void> {
    if (isMockMode) {
      mockQuestions = mockQuestions.filter((q: MockQuestion) => q.id !== id);
      mockAnswers = mockAnswers.filter(a => a.question_id !== id);
      return;
    }
    const adminClient = createAdminSupabase() || supabase;
    const { error } = await adminClient.from('questions').delete().eq('id', id);
    if (error) throw error;
  },

  // --------------------------------------------------------------------------
  // ATTEMPTS & GRADING
  // --------------------------------------------------------------------------
  async getAttempts(userId: string): Promise<(Attempt & { exam?: Exam & { subject?: Subject } })[]> {
    if (isMockMode) {
      const userAttempts = mockAttempts.filter(a => a.user_id === userId);
      return userAttempts.map(att => {
        const exam = mockExams.find(e => e.id === att.exam_id);
        const subject = exam ? mockSubjects.find(s => s.id === exam.subject_id) : undefined;
        return {
          ...att,
          exam: exam ? { ...exam, subject } : undefined
        };
      }).sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());
    }

    // Use admin client to bypass RLS for server-side reads
    const client = createAdminSupabase() || supabase;
    const { data, error } = await client
      .from('attempts')
      .select('*, exam:exams(*, subject:subjects(*))')
      .eq('user_id', userId)
      .order('started_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getAttemptById(id: string): Promise<(Attempt & { exam?: Exam & { subject?: Subject } }) | null> {
    if (isMockMode) {
      const att = mockAttempts.find(a => a.id === id);
      if (!att) return null;
      const exam = mockExams.find(e => e.id === att.exam_id);
      const subject = exam ? mockSubjects.find(s => s.id === exam.subject_id) : undefined;
      return {
        ...att,
        exam: exam ? { ...exam, subject } : undefined
      };
    }

    // Use admin client to bypass RLS for server-side reads
    const client = createAdminSupabase() || supabase;
    const { data, error } = await client
      .from('attempts')
      .select('*, exam:exams(*, subject:subjects(*))')
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  },

  async createAttempt(userId: string | null | undefined, examId: string): Promise<Attempt> {
    if (isMockMode) {
      const newAttempt: Attempt = {
        id: `att-${Date.now()}`,
        user_id: userId || `guest-${Date.now()}`,
        exam_id: examId,
        score: null,
        answers_submitted: null,
        started_at: new Date().toISOString(),
        finished_at: null
      };
      mockAttempts.push(newAttempt);
      return newAttempt;
    }

    // Use admin client to bypass RLS — user_id is explicitly set so data is still scoped correctly
    const adminClient = createAdminSupabase() || supabase;
    const { data, error } = await adminClient
      .from('attempts')
      .insert([{ user_id: userId || null, exam_id: examId }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async submitAttempt(attemptId: string, score: number, answersSubmitted: Record<string, any>): Promise<Attempt> {
    if (isMockMode) {
      const index = mockAttempts.findIndex(a => a.id === attemptId);
      if (index === -1) throw new Error('Attempt not found');
      mockAttempts[index] = {
        ...mockAttempts[index],
        score,
        answers_submitted: answersSubmitted,
        finished_at: new Date().toISOString()
      };
      return mockAttempts[index];
    }

    // Use admin client to bypass RLS for server-side updates
    const adminClient = createAdminSupabase() || supabase;
    const { data, error } = await adminClient
      .from('attempts')
      .update({
        score,
        answers_submitted: answersSubmitted,
        finished_at: new Date().toISOString()
      })
      .eq('id', attemptId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getAllAttempts(): Promise<(Attempt & { exam?: Exam, user?: User })[]> {
    if (isMockMode) {
      return mockAttempts.map(att => ({
        ...att,
        exam: mockExams.find(e => e.id === att.exam_id),
        user: mockUsers.find(u => u.id === att.user_id)
      })).sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());
    }

    // Use admin client to bypass RLS for server-side reads
    const client = createAdminSupabase() || supabase;
    const { data, error } = await client
      .from('attempts')
      .select('*, exam:exams(*), user:users(*)')
      .order('started_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // --------------------------------------------------------------------------
  // USER PROFILES
  // --------------------------------------------------------------------------
  async getUsers(): Promise<User[]> {
    if (isMockMode) {
      return mockUsers;
    }
    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client.from('users').select('*').order('created_at');
    if (error) throw error;
    return data || [];
  },

  async getUserById(id: string): Promise<User | null> {
    if (isMockMode) {
      return mockUsers.find(u => u.id === id) || null;
    }
    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client.from('users').select('*').eq('id', id).single();
    if (error) {
      // Fallback to mock users for mock-user-* IDs in Supabase mode
      const mockUser = mockUsers.find(u => u.id === id);
      if (mockUser) return mockUser;
      return null;
    }
    return data;
  },

  async updateUserProfile(id: string, updates: Partial<Omit<User, 'id' | 'email' | 'role' | 'created_at'>>): Promise<User> {
    if (isMockMode) {
      const index = mockUsers.findIndex(u => u.id === id);
      if (index === -1) throw new Error('User not found');
      mockUsers[index] = { ...mockUsers[index], ...updates };
      return mockUsers[index];
    }
    const adminClient = createAdminSupabase() || supabase!;
    const { data, error } = await adminClient.from('users').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async updateUserRole(id: string, role: 'student' | 'teacher' | 'admin'): Promise<User> {
    if (isMockMode) {
      const index = mockUsers.findIndex(u => u.id === id);
      if (index === -1) throw new Error('User not found');
      mockUsers[index].role = role;
      return mockUsers[index];
    }
    // Using Admin Client to bypass RLS policies
    const adminClient = createAdminSupabase();
    if (!adminClient) {
      // Fallback if service key is not available
      const { data, error } = await supabase.from('users').update({ role }).eq('id', id).select().single();
      if (error) throw error;
      return data;
    }
    const { data, error } = await adminClient.from('users').update({ role }).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  // --------------------------------------------------------------------------
  // COMMENTS
  // --------------------------------------------------------------------------
  async getComments(blogId: string): Promise<(Comment & { user?: User })[]> {
    if (isMockMode) {
      const blogComments = mockComments.filter(c => c.blog_id === blogId);
      return blogComments.map(c => ({
        ...c,
        user: mockUsers.find(u => u.id === c.user_id)
      })).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
    return [];
  },

  async createComment(comment: Omit<Comment, 'id' | 'created_at'>): Promise<Comment> {
    if (isMockMode) {
      const newComment: Comment = {
        ...comment,
        id: `cmt-${Date.now()}`,
        created_at: new Date().toISOString()
      };
      mockComments.push(newComment);
      return newComment;
    }
    throw new Error('Cannot create comment: no database configured');
  },

  async deleteComment(id: string): Promise<void> {
    if (isMockMode) {
      mockComments = mockComments.filter(c => c.id !== id);
      return;
    }
    throw new Error('Cannot delete comment: no database configured');
  },

  // --------------------------------------------------------------------------
  // BLOGS (WordPress API Integration)
  // --------------------------------------------------------------------------
  async getBlogs(createdBy?: string): Promise<Blog[]> {
    const wpApiUrl = import.meta.env.WORDPRESS_API_URL || '';
    if (wpApiUrl) {
      try {
        const response = await fetch(`${wpApiUrl}/posts?_embed=1&per_page=10`);
        if (response.ok) {
          const posts = await response.json();
          if (Array.isArray(posts)) {
            return posts.map(mapWPPostToBlog);
          }
        }
      } catch (err) {
        console.error('WP API getBlogs fetch error:', err);
      }
    }

    if (isMockMode) {
      let blogs = mockBlogs;
      if (createdBy) {
        blogs = blogs.filter(b => b.created_by === createdBy);
      }
      return [...blogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return [];
  },

  async getBlogById(id: string): Promise<Blog | null> {
    const wpApiUrl = import.meta.env.WORDPRESS_API_URL || '';
    if (wpApiUrl) {
      try {
        const response = await fetch(`${wpApiUrl}/posts/${id}?_embed=1`);
        if (response.ok) {
          const post = await response.json();
          return mapWPPostToBlog(post);
        }
      } catch (err) {
        console.error(`WP API getBlogById (${id}) fetch error:`, err);
      }
    }

    if (isMockMode) {
      return mockBlogs.find(b => b.id === id) || null;
    }
    return null;
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const wpApiUrl = import.meta.env.WORDPRESS_API_URL || '';
    if (wpApiUrl) {
      try {
        const response = await fetch(`${wpApiUrl}/posts?slug=${slug}&_embed=1`);
        if (response.ok) {
          const posts = await response.json();
          if (Array.isArray(posts) && posts.length > 0) {
            return mapWPPostToBlog(posts[0]);
          }
        }
      } catch (err) {
        console.error(`WP API getBlogBySlug (${slug}) fetch error:`, err);
      }
    }

    if (isMockMode) {
      return mockBlogs.find(b => b.slug === slug) || null;
    }
    return null;
  },

  async getBlogCategories(): Promise<{ id: number, name: string, slug: string, count: number }[]> {
    const wpApiUrl = import.meta.env.WORDPRESS_API_URL || '';
    if (wpApiUrl) {
      try {
        const response = await fetch(`${wpApiUrl}/categories?per_page=100`);
        if (response.ok) {
          const categories = await response.json();
          if (Array.isArray(categories)) {
            return categories.map(cat => ({
              id: cat.id,
              name: cat.name,
              slug: cat.slug,
              count: cat.count
            }));
          }
        }
      } catch (err) {
        console.error('WP API getBlogCategories fetch error:', err);
      }
    }
    return [];
  },

  async createBlog(blog: Omit<Blog, 'id' | 'created_at'>): Promise<Blog> {
    if (isMockMode) {
      const newBlog: Blog = {
        ...blog,
        id: `blog-${Date.now()}`,
        created_at: new Date().toISOString()
      };
      mockBlogs.push(newBlog);
      return newBlog;
    }
    throw new Error('Cannot create blog: no database configured');
  },

  async updateBlog(id: string, blog: Partial<Omit<Blog, 'id' | 'created_at'>>): Promise<Blog> {
    if (isMockMode) {
      const index = mockBlogs.findIndex(b => b.id === id);
      if (index === -1) throw new Error('Blog not found');
      mockBlogs[index] = { ...mockBlogs[index], ...blog };
      return mockBlogs[index];
    }
    throw new Error('Cannot update blog: no database configured');
  },

  async deleteBlog(id: string): Promise<void> {
    if (isMockMode) {
      mockBlogs = mockBlogs.filter(b => b.id !== id);
      return;
    }
    throw new Error('Cannot delete blog: no database configured');
  },

  // --------------------------------------------------------------------------
  // COURSES (Khóa học)
  // --------------------------------------------------------------------------
  async getCourses(options?: { publishedOnly?: boolean; createdBy?: string; subjectId?: string }): Promise<(Course & { subject?: Subject; lessonCount?: number; enrollmentCount?: number; teacher?: { id: string; fullname: string | null; avatar_url: string | null } })[]> {
    if (isMockMode) {
      let courses = [...mockCourses];
      if (options?.publishedOnly) courses = courses.filter(c => c.is_published);
      if (options?.createdBy) courses = courses.filter(c => c.created_by === options.createdBy);
      if (options?.subjectId) courses = courses.filter(c => c.subject_id === options.subjectId);
      return courses.map(c => ({
        ...c,
        subject: mockSubjects.find(s => s.id === c.subject_id),
        lessonCount: mockCourseLessons.filter(l => l.course_id === c.id).length,
        enrollmentCount: mockEnrollments.filter(e => e.course_id === c.id).length,
        teacher: mockUsers.find(u => u.id === c.created_by) ? { id: c.created_by!, fullname: mockUsers.find(u => u.id === c.created_by)!.fullname, avatar_url: mockUsers.find(u => u.id === c.created_by)!.avatar_url } : undefined,
      }));
    }
    const client = createAdminSupabase() || supabase!;
    let query = client
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    if (options?.publishedOnly) query = query.eq('is_published', true);
    if (options?.createdBy) query = query.eq('created_by', options.createdBy);
    if (options?.subjectId) query = query.eq('subject_id', options.subjectId);
    const { data, error } = await query;
    if (error) throw error;
    const courses = data || [];

    const courseIds = courses.map((c: any) => c.id);

    // Fetch subjects
    const subjectIds = [...new Set(courses.map((c: any) => c.subject_id).filter(Boolean))];
    let subjectsMap: Record<string, any> = {};
    if (subjectIds.length > 0) {
      const { data: subData } = await supabase!.from('subjects').select('*').in('id', subjectIds);
      if (subData) subjectsMap = Object.fromEntries(subData.map((s: any) => [s.id, s]));
    }

    // Fetch teacher info
    const teacherIds = [...new Set(courses.map((c: any) => c.created_by).filter(Boolean))];
    let teachersMap: Record<string, any> = {};
    if (teacherIds.length > 0) {
      const { data: teachers } = await client.from('users').select('id, fullname, avatar_url').in('id', teacherIds);
      if (teachers) teachersMap = Object.fromEntries(teachers.map((t: any) => [t.id, t]));
    }

    // Fetch lesson counts
    let lessonCountMap: Record<string, number> = {};
    if (courseIds.length > 0) {
      const { data: allLessons } = await client.from('course_lessons').select('course_id').in('course_id', courseIds);
      if (allLessons) {
        for (const l of allLessons) {
          lessonCountMap[l.course_id] = (lessonCountMap[l.course_id] || 0) + 1;
        }
      }
    }

    return courses.map((c: any) => ({
      ...c,
      subject: subjectsMap[c.subject_id] || undefined,
      lessonCount: lessonCountMap[c.id] || 0,
      teacher: teachersMap[c.created_by] || undefined,
    }));
  },

  async getCourseBySlug(slug: string): Promise<(Course & { subject?: Subject }) | null> {
    if (isMockMode) {
      const course = mockCourses.find(c => c.slug === slug);
      if (!course) return null;
      return { ...course, subject: mockSubjects.find(s => s.id === course.subject_id) };
    }
    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client.from('courses').select('*').eq('slug', slug).single();
    if (error) return null;
    if (data?.subject_id) {
      const { data: subData } = await supabase!.from('subjects').select('*').eq('id', data.subject_id).single();
      return { ...data, subject: subData || undefined };
    }
    return data;
  },

  async getCourseById(id: string): Promise<(Course & { subject?: Subject }) | null> {
    if (isMockMode) {
      const course = mockCourses.find(c => c.id === id);
      if (!course) return null;
      return { ...course, subject: mockSubjects.find(s => s.id === course.subject_id) };
    }
    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client.from('courses').select('*').eq('id', id).single();
    if (error) return null;
    if (data?.subject_id) {
      const { data: subData } = await supabase!.from('subjects').select('*').eq('id', data.subject_id).single();
      return { ...data, subject: subData || undefined };
    }
    return data;
  },

  async createCourse(course: Omit<Course, 'id' | 'created_at'>): Promise<Course> {
    if (isMockMode) {
      const newCourse: Course = { ...course, id: `course-${Date.now()}`, created_at: new Date().toISOString() };
      mockCourses.push(newCourse);
      return newCourse;
    }
    const adminClient = createAdminSupabase() || supabase;
    const { data, error } = await adminClient.from('courses').insert([course]).select().single();
    if (error) throw error;
    return data;
  },

  async updateCourse(id: string, updates: Partial<Omit<Course, 'id' | 'created_at'>>): Promise<Course> {
    if (isMockMode) {
      const idx = mockCourses.findIndex(c => c.id === id);
      if (idx === -1) throw new Error('Course not found');
      mockCourses[idx] = { ...mockCourses[idx], ...updates };
      return mockCourses[idx];
    }
    const adminClient = createAdminSupabase() || supabase;
    const { data, error } = await adminClient.from('courses').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteCourse(id: string): Promise<void> {
    if (isMockMode) {
      mockCourses = mockCourses.filter(c => c.id !== id);
      mockCourseLessons = mockCourseLessons.filter(l => l.course_id !== id);
      return;
    }
    const adminClient = createAdminSupabase() || supabase;
    const { error } = await adminClient.from('courses').delete().eq('id', id);
    if (error) throw error;
  },

  // --------------------------------------------------------------------------
  // COURSE LESSONS (Bài giảng trong khóa học)
  // --------------------------------------------------------------------------
  async getCourseLessons(courseId: string): Promise<CourseLesson[]> {
    if (isMockMode) {
      return mockCourseLessons
        .filter(l => l.course_id === courseId)
        .sort((a, b) => a.order_index - b.order_index);
    }
    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client
      .from('course_lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index');
    if (error) throw error;
    return data || [];
  },

  async getCourseLessonById(id: string): Promise<CourseLesson | null> {
    if (isMockMode) return mockCourseLessons.find(l => l.id === id) || null;
    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client.from('course_lessons').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  },

  async createCourseLesson(lesson: Omit<CourseLesson, 'id' | 'created_at'>): Promise<CourseLesson> {
    if (isMockMode) {
      const newLesson: CourseLesson = { ...lesson, id: `cl-${Date.now()}`, created_at: new Date().toISOString() };
      mockCourseLessons.push(newLesson);
      return newLesson;
    }
    const adminClient = createAdminSupabase() || supabase;
    const { data, error } = await adminClient.from('course_lessons').insert([lesson]).select().single();
    if (error) throw error;
    return data;
  },

  async updateCourseLesson(id: string, updates: Partial<Omit<CourseLesson, 'id' | 'created_at'>>): Promise<CourseLesson> {
    if (isMockMode) {
      const idx = mockCourseLessons.findIndex(l => l.id === id);
      if (idx === -1) throw new Error('Lesson not found');
      mockCourseLessons[idx] = { ...mockCourseLessons[idx], ...updates };
      return mockCourseLessons[idx];
    }
    const adminClient = createAdminSupabase() || supabase;
    const { data, error } = await adminClient.from('course_lessons').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async deleteCourseLesson(id: string): Promise<void> {
    if (isMockMode) {
      mockCourseLessons = mockCourseLessons.filter(l => l.id !== id);
      return;
    }
    const adminClient = createAdminSupabase() || supabase;
    const { error } = await adminClient.from('course_lessons').delete().eq('id', id);
    if (error) throw error;
  },

  // --------------------------------------------------------------------------
  // ENROLLMENTS & PROGRESS
  // --------------------------------------------------------------------------
  async enrollUserInCourse(courseId: string, userId: string): Promise<CourseEnrollment> {
    if (isMockMode) {
      const exists = mockEnrollments.find(e => e.course_id === courseId && e.user_id === userId);
      if (exists) return exists;
      const newEnrollment: CourseEnrollment = {
        id: `enr-${Date.now()}`,
        course_id: courseId,
        user_id: userId,
        enrolled_at: new Date().toISOString()
      };
      mockEnrollments.push(newEnrollment);
      return newEnrollment;
    }
    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client
      .from('course_enrollments')
      .upsert({ course_id: courseId, user_id: userId }, { onConflict: 'course_id,user_id' })
      .select().single();
    if (error) throw error;
    return data;
  },

  async getUserEnrollments(userId: string): Promise<(CourseEnrollment & { course?: Course & { subject?: Subject } })[]> {
    if (isMockMode) {
      return mockEnrollments
        .filter(e => e.user_id === userId)
        .map(e => {
          const course = mockCourses.find(c => c.id === e.course_id);
          return {
            ...e,
            course: course ? { ...course, subject: mockSubjects.find(s => s.id === course.subject_id) } : undefined
          };
        });
    }
    const client = createAdminSupabase() || supabase!;
    const { data: enrollments, error } = await client
      .from('course_enrollments')
      .select('*, course:courses(*)')
      .eq('user_id', userId);
    if (error) throw error;
    if (!enrollments || enrollments.length === 0) return [];
    const subjectIds = [...new Set(
      enrollments.map((e: any) => e.course?.subject_id).filter(Boolean)
    )];
    let subjectsMap: Record<string, any> = {};
    if (subjectIds.length > 0) {
      const { data: subData } = await supabase!.from('subjects').select('*').in('id', subjectIds);
      if (subData) subjectsMap = Object.fromEntries(subData.map((s: any) => [s.id, s]));
    }
    return enrollments.map((e: any) => ({
      ...e,
      course: e.course ? { ...e.course, subject: subjectsMap[e.course.subject_id] || undefined } : undefined
    }));
  },

  async isUserEnrolled(courseId: string, userId: string): Promise<boolean> {
    if (isMockMode) return mockEnrollments.some(e => e.course_id === courseId && e.user_id === userId);
    const client = createAdminSupabase() || supabase!;
    const { data } = await client
      .from('course_enrollments')
      .select('id')
      .eq('course_id', courseId)
      .eq('user_id', userId)
      .maybeSingle();
    return !!data;
  },

  async markLessonComplete(lessonId: string, userId: string): Promise<LessonProgress> {
    if (isMockMode) {
      const existing = mockLessonProgress.find(p => p.lesson_id === lessonId && p.user_id === userId);
      if (existing) {
        existing.completed = true;
        existing.completed_at = new Date().toISOString();
        return existing;
      }
      const newProgress: LessonProgress = {
        id: `lp-${Date.now()}`,
        lesson_id: lessonId,
        user_id: userId,
        completed: true,
        completed_at: new Date().toISOString()
      };
      mockLessonProgress.push(newProgress);
      return newProgress;
    }
    const client = createAdminSupabase() || supabase!;
    const { data, error } = await client
      .from('lesson_progress')
      .upsert({ lesson_id: lessonId, user_id: userId, completed: true, completed_at: new Date().toISOString() }, { onConflict: 'lesson_id,user_id' })
      .select().single();
    if (error) throw error;
    return data;
  },

  async getLessonProgress(userId: string, courseId?: string): Promise<LessonProgress[]> {
    if (isMockMode) {
      let progress = mockLessonProgress.filter(p => p.user_id === userId);
      if (courseId) {
        const lessonIds = mockCourseLessons.filter(l => l.course_id === courseId).map(l => l.id);
        progress = progress.filter(p => lessonIds.includes(p.lesson_id));
      }
      return progress;
    }
    const client = createAdminSupabase() || supabase!;
    let query = client.from('lesson_progress').select('*').eq('user_id', userId);
    if (courseId) {
      const { data: lessons } = await client.from('course_lessons').select('id').eq('course_id', courseId);
      if (lessons) query = query.in('lesson_id', lessons.map((l: any) => l.id));
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }
};

