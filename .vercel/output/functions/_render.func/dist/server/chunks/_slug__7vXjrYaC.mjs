import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as unescapeHTML, C as renderTemplate, E as maybeRenderHead, M as createAstro, N as createComponent, O as addAttribute, b as renderComponent, k as defineScriptVars, v as renderScript } from "./render_FJwdtmM0.mjs";
import { t as db } from "./db_ugDz1A2K.mjs";
import "./compiler_DjieldEX.mjs";
import { t as getCollection } from "./_astro_content_CYWRd-4B.mjs";
import { t as $$Layout } from "./Layout_BRwPCKES.mjs";
//#region src/components/LessonQuiz.astro
createAstro("https://lop12.com");
var $$LessonQuiz = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LessonQuiz;
	const { exercises } = Astro.props;
	const interactiveExercises = exercises.filter((e) => [
		"mcq",
		"msq",
		"sa"
	].includes(e.type));
	if (interactiveExercises.length === 0) return;
	const quizData = interactiveExercises.map((ex) => ({
		id: ex.id,
		type: ex.type,
		question: ex.question,
		options: ex.options || [],
		correct: ex.correct,
		explanation: ex.explanation || ""
	}));
	return renderTemplate`${interactiveExercises.length > 0 && renderTemplate`${maybeRenderHead($$result)}<div class="mt-10 border-t border-gray-200 dark:border-slate-800 pt-8"><div class="flex items-center gap-2 mb-6"><div class="w-2.5 h-6 rounded-sm bg-blue-600"></div><h2 class="text-xl font-bold text-gray-900 dark:text-white">Luyện tập</h2><span class="ml-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/40">${interactiveExercises.length} câu</span></div><div id="lesson-quiz-root" class="relative"><div class="mb-6"><div class="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-slate-400 mb-2"><span id="lq-progress-text">Câu 1 / ${interactiveExercises.length}</span><span id="lq-score-text" class="hidden text-blue-600 dark:text-blue-400"></span></div><div class="h-1.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden"><div id="lq-progress-bar" class="h-full bg-blue-500 rounded-full transition-all duration-400" style="width:0%"></div></div></div><div id="lq-card" class="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden"><div class="flex items-center justify-between px-6 md:px-8 pt-6 pb-0 gap-2"><span id="lq-num-badge" class="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">Câu 1</span><span id="lq-type-label" class="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider"></span></div><div class="px-6 md:px-8 pt-5 pb-4"><div id="lq-question" class="text-base font-medium text-gray-900 dark:text-slate-100 leading-relaxed"></div></div><div id="lq-mcq-options" class="hidden px-6 md:px-8 pb-2 space-y-3"></div><div id="lq-msq-options" class="hidden px-6 md:px-8 pb-2 space-y-3"></div><div id="lq-sa-wrap" class="hidden px-6 md:px-8 pb-4"><input id="lq-sa-input" type="text" placeholder="Nhập đáp án số..." class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"></div><div id="lq-feedback" class="hidden border-t border-gray-100 dark:border-slate-800 px-6 md:px-8 py-5"><div class="flex items-start gap-3"><span id="lq-feedback-icon" class="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"></span><div><p id="lq-feedback-result" class="font-bold text-sm mb-1"></p><div id="lq-feedback-explanation" class="text-sm text-gray-600 dark:text-slate-400 leading-relaxed"></div></div></div></div><div class="px-6 md:px-8 pb-6 md:pb-8 pt-4 flex items-center justify-end gap-3"><button id="lq-submit-btn" type="button" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow transition-all disabled:opacity-40 disabled:cursor-not-allowed">Kiểm tra</button><button id="lq-next-btn" type="button" class="hidden px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold shadow transition-all">Câu tiếp →</button></div></div><div id="lq-result" class="hidden text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm"><div id="lq-result-emoji" class="text-5xl mb-4">🎉</div><h3 class="text-xl font-extrabold text-gray-900 dark:text-white mb-1">Hoàn thành!</h3><p id="lq-result-desc" class="text-sm text-gray-500 dark:text-slate-400 mb-6"></p><button id="lq-restart-btn" type="button" class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow transition-all">Làm lại từ đầu</button></div></div></div>`}<script>(function(){${defineScriptVars({ quizData })}
(function () {
  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  function renderKatex(el) {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      });
    }
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // ── State ─────────────────────────────────────────────────────────────────
  let currentIdx = 0;
  let score = 0;
  let answered = false;
  let mcqShuffled = [];       // [{text, origIdx}] for current MCQ
  let selectedMcqSi = null;   // shuffled index selected by user
  let msqSel = {};            // optionIndex -> true | false

  // ── DOM ───────────────────────────────────────────────────────────────────
  const progressText   = document.getElementById('lq-progress-text');
  const scoreText      = document.getElementById('lq-score-text');
  const progressBar    = document.getElementById('lq-progress-bar');
  const card           = document.getElementById('lq-card');
  const numBadge       = document.getElementById('lq-num-badge');
  const typeLabel      = document.getElementById('lq-type-label');
  const questionEl     = document.getElementById('lq-question');
  const mcqOptionsEl   = document.getElementById('lq-mcq-options');
  const msqOptionsEl   = document.getElementById('lq-msq-options');
  const saWrap         = document.getElementById('lq-sa-wrap');
  const saInput        = document.getElementById('lq-sa-input');
  const feedbackEl     = document.getElementById('lq-feedback');
  const feedbackIcon   = document.getElementById('lq-feedback-icon');
  const feedbackResult = document.getElementById('lq-feedback-result');
  const feedbackExpl   = document.getElementById('lq-feedback-explanation');
  const submitBtn      = document.getElementById('lq-submit-btn');
  const nextBtn        = document.getElementById('lq-next-btn');
  const resultScreen   = document.getElementById('lq-result');
  const resultEmoji    = document.getElementById('lq-result-emoji');
  const resultDesc     = document.getElementById('lq-result-desc');
  const restartBtn     = document.getElementById('lq-restart-btn');

  // ── Render question ───────────────────────────────────────────────────────
  function renderQuestion(idx) {
    const q = quizData[idx];
    answered = false;
    selectedMcqSi = null;
    msqSel = {};
    mcqShuffled = [];

    progressText.textContent = 'Câu ' + (idx + 1) + ' / ' + quizData.length;
    progressBar.style.width = ((idx / quizData.length) * 100) + '%';
    numBadge.textContent = 'Câu ' + (idx + 1);

    var typeLabels = { mcq: 'Trắc nghiệm', msq: 'Đúng / Sai', sa: 'Điền số' };
    typeLabel.textContent = typeLabels[q.type] || q.type.toUpperCase();

    questionEl.innerHTML = q.question;
    renderKatex(questionEl);

    // Reset feedback
    feedbackEl.className = 'hidden border-t border-gray-100 dark:border-slate-800 px-6 md:px-8 py-5';
    feedbackExpl.innerHTML = '';

    submitBtn.classList.remove('hidden');
    submitBtn.disabled = true;
    nextBtn.classList.add('hidden');
    mcqOptionsEl.classList.add('hidden');
    msqOptionsEl.classList.add('hidden');
    saWrap.classList.add('hidden');

    if (q.type === 'mcq') {
      mcqOptionsEl.classList.remove('hidden');
      mcqOptionsEl.innerHTML = '';

      // Shuffle option indices
      var indices = [];
      for (var k = 0; k < q.options.length; k++) indices.push(k);
      var shuffled = shuffleArray(indices);
      mcqShuffled = shuffled.map(function(oi) { return { text: q.options[oi], origIdx: oi }; });

      mcqShuffled.forEach(function(item, si) {
        var row = document.createElement('button');
        row.type = 'button';
        row.className = 'lq-mcq-row w-full flex items-start gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/60 text-left text-sm font-medium text-gray-800 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all cursor-pointer select-none';
        row.dataset.si = si;

        var letter = document.createElement('span');
        letter.className = 'lq-letter shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 dark:border-slate-600 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors';
        letter.textContent = LETTERS[si];

        var text = document.createElement('span');
        text.className = 'flex-1 leading-relaxed pt-0.5';
        text.innerHTML = item.text;
        renderKatex(text);

        row.appendChild(letter);
        row.appendChild(text);

        row.addEventListener('click', (function(siCapture, rowCapture, letterCapture) {
          return function() {
            if (answered) return;
            mcqOptionsEl.querySelectorAll('.lq-mcq-row').forEach(function(b) {
              b.classList.remove('border-blue-500', 'bg-blue-50/60', 'dark:bg-blue-900/25', 'dark:border-blue-600');
              b.classList.add('border-gray-200', 'dark:border-slate-700', 'bg-gray-50', 'dark:bg-slate-800/60');
              var l = b.querySelector('.lq-letter');
              if (l) l.classList.remove('bg-blue-600', 'border-blue-600', 'text-white');
            });
            selectedMcqSi = siCapture;
            rowCapture.classList.remove('border-gray-200', 'dark:border-slate-700', 'bg-gray-50', 'dark:bg-slate-800/60');
            rowCapture.classList.add('border-blue-500', 'bg-blue-50/60', 'dark:bg-blue-900/25', 'dark:border-blue-600');
            letterCapture.classList.add('bg-blue-600', 'border-blue-600', 'text-white');
            submitBtn.disabled = false;
          };
        })(si, row, letter));

        mcqOptionsEl.appendChild(row);
      });

    } else if (q.type === 'msq') {
      msqOptionsEl.classList.remove('hidden');
      msqOptionsEl.innerHTML = '';

      q.options.forEach(function(opt, i) {
        var row = document.createElement('div');
        row.className = 'lq-msq-row flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/40';

        var letter = document.createElement('span');
        letter.className = 'shrink-0 w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold';
        letter.textContent = LETTERS[i];

        var text = document.createElement('span');
        text.className = 'flex-1 text-sm text-gray-800 dark:text-slate-200 leading-relaxed';
        text.innerHTML = opt;
        renderKatex(text);

        var dungBtn = document.createElement('button');
        dungBtn.type = 'button';
        dungBtn.className = 'lq-dung-btn shrink-0 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-xs font-semibold text-gray-600 dark:text-slate-400 bg-white dark:bg-slate-800 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all';
        dungBtn.textContent = 'Đúng';

        var saiBtn = document.createElement('button');
        saiBtn.type = 'button';
        saiBtn.className = 'lq-sai-btn shrink-0 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-xs font-semibold text-gray-600 dark:text-slate-400 bg-white dark:bg-slate-800 hover:border-rose-400 hover:text-rose-700 hover:bg-rose-50 transition-all';
        saiBtn.textContent = 'Sai';

        (function(iCapture, dungCapture, saiCapture) {
          function selectChoice(choice) {
            if (answered) return;
            msqSel[iCapture] = choice;
            if (choice === true) {
              dungCapture.className = 'lq-dung-btn shrink-0 px-3 py-1.5 rounded-lg border border-emerald-500 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 transition-all';
              saiCapture.className  = 'lq-sai-btn shrink-0 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-xs font-semibold text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-800 hover:border-rose-400 hover:text-rose-700 hover:bg-rose-50 transition-all';
            } else {
              saiCapture.className  = 'lq-sai-btn shrink-0 px-3 py-1.5 rounded-lg border border-rose-500 text-xs font-semibold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 transition-all';
              dungCapture.className = 'lq-dung-btn shrink-0 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-xs font-semibold text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-800 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all';
            }
            // Check if all options answered
            var allAnswered = quizData[currentIdx].options.every(function(_, j) {
              return msqSel[j] !== undefined;
            });
            submitBtn.disabled = !allAnswered;
          }
          dungCapture.addEventListener('click', function() { selectChoice(true); });
          saiCapture.addEventListener('click',  function() { selectChoice(false); });
        })(i, dungBtn, saiBtn);

        row.appendChild(letter);
        row.appendChild(text);
        row.appendChild(dungBtn);
        row.appendChild(saiBtn);
        msqOptionsEl.appendChild(row);
      });

    } else if (q.type === 'sa') {
      saWrap.classList.remove('hidden');
      saInput.value = '';
      saInput.disabled = false;
      saInput.className = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';
      submitBtn.disabled = true;
      saInput.oninput = function() { submitBtn.disabled = saInput.value.trim() === ''; };
      saInput.onkeydown = function(e) { if (e.key === 'Enter' && !submitBtn.disabled && !answered) submitBtn.click(); };
      saInput.focus();
    }
  }

  // ── Check answer ──────────────────────────────────────────────────────────
  function checkAnswer() {
    if (answered) return;
    answered = true;
    submitBtn.classList.add('hidden');

    var q = quizData[currentIdx];
    var isCorrect = false;

    try {
      if (q.type === 'mcq') {
        var selOrigIdx = (selectedMcqSi !== null) ? mcqShuffled[selectedMcqSi].origIdx : -1;
        isCorrect = (selOrigIdx === q.correct);

        mcqOptionsEl.querySelectorAll('.lq-mcq-row').forEach(function(row, si) {
          row.style.cursor = 'default';
          var letter = row.querySelector('.lq-letter');
          var origIdx = mcqShuffled[si].origIdx;
          if (origIdx === q.correct) {
            row.classList.remove('border-gray-200', 'dark:border-slate-700', 'bg-gray-50', 'dark:bg-slate-800/60', 'border-blue-500', 'bg-blue-50/60', 'dark:bg-blue-900/25', 'dark:border-blue-600');
            row.classList.add('border-emerald-500', 'bg-emerald-50/50', 'dark:bg-emerald-900/20', 'dark:border-emerald-600');
            if (letter) {
              letter.classList.remove('border-gray-300', 'dark:border-slate-600', 'text-gray-500', 'dark:text-slate-400', 'bg-blue-600', 'border-blue-600');
              letter.classList.add('bg-emerald-600', 'border-emerald-600', 'text-white');
            }
          } else if (si === selectedMcqSi && !isCorrect) {
            row.classList.remove('border-blue-500', 'bg-blue-50/60', 'dark:bg-blue-900/25', 'dark:border-blue-600');
            row.classList.add('border-rose-500', 'bg-rose-50/50', 'dark:bg-rose-900/20', 'dark:border-rose-600');
            if (letter) {
              letter.classList.remove('bg-blue-600', 'border-blue-600');
              letter.classList.add('bg-rose-600', 'border-rose-600', 'text-white');
            }
          }
        });

      } else if (q.type === 'msq') {
        var correctSet = new Set(q.correct);
        var allRight = true;

        msqOptionsEl.querySelectorAll('.lq-msq-row').forEach(function(row, i) {
          var dungBtn = row.querySelector('.lq-dung-btn');
          var saiBtn  = row.querySelector('.lq-sai-btn');
          if (dungBtn) dungBtn.disabled = true;
          if (saiBtn)  saiBtn.disabled  = true;

          var userSaidTrue = (msqSel[i] === true);
          var actuallyTrue = correctSet.has(i);
          var rowCorrect   = (userSaidTrue === actuallyTrue);
          if (!rowCorrect) allRight = false;

          // Show correct state
          if (actuallyTrue) {
            if (dungBtn) dungBtn.className = 'lq-dung-btn shrink-0 px-3 py-1.5 rounded-lg border border-emerald-500 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';
            if (!userSaidTrue && saiBtn) {
              saiBtn.className = 'lq-sai-btn shrink-0 px-3 py-1.5 rounded-lg border border-rose-500 text-xs font-semibold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 ring-2 ring-rose-300 dark:ring-rose-700';
            }
          } else {
            if (saiBtn) saiBtn.className = 'lq-sai-btn shrink-0 px-3 py-1.5 rounded-lg border border-emerald-500 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';
            if (userSaidTrue && dungBtn) {
              dungBtn.className = 'lq-dung-btn shrink-0 px-3 py-1.5 rounded-lg border border-rose-500 text-xs font-semibold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 ring-2 ring-rose-300 dark:ring-rose-700';
            }
          }

          // Row border — two separate class strings (no spaces!)
          row.classList.remove('border-gray-200', 'dark:border-slate-700');
          if (rowCorrect) {
            row.classList.add('border-emerald-300');
            row.classList.add('dark:border-emerald-700');
          } else {
            row.classList.add('border-rose-300');
            row.classList.add('dark:border-rose-700');
          }
        });

        isCorrect = allRight;

      } else if (q.type === 'sa') {
        var userAns    = saInput.value.trim().replace(/\\s/g, '');
        var correctAns = String(q.correct).trim().replace(/\\s/g, '');
        isCorrect = (userAns === correctAns);
        saInput.disabled = true;
        if (isCorrect) {
          saInput.classList.add('border-emerald-500', 'bg-emerald-50/50', 'dark:bg-emerald-900/20', 'text-emerald-700', 'dark:text-emerald-400');
        } else {
          saInput.classList.add('border-rose-500', 'bg-rose-50/50', 'dark:bg-rose-900/20', 'text-rose-700', 'dark:text-rose-400');
        }
      }
    } catch (err) {
      console.error('[LessonQuiz] checkAnswer error:', err);
    }

    if (isCorrect) score++;

    // Feedback
    feedbackEl.classList.remove('hidden');
    if (isCorrect) {
      feedbackEl.classList.add('bg-emerald-50/40', 'dark:bg-emerald-900/10');
      feedbackIcon.className = 'shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 bg-emerald-500';
      feedbackIcon.textContent = '✓';
      feedbackResult.className = 'font-bold text-sm mb-1 text-emerald-700 dark:text-emerald-400';
      feedbackResult.textContent = 'Chính xác!';
    } else {
      feedbackEl.classList.add('bg-rose-50/40', 'dark:bg-rose-900/10');
      feedbackIcon.className = 'shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 bg-rose-500';
      feedbackIcon.textContent = '✗';
      feedbackResult.className = 'font-bold text-sm mb-1 text-rose-700 dark:text-rose-400';
      feedbackResult.textContent = q.type === 'sa' ? ('Chưa đúng. Đáp án: ' + q.correct) : 'Chưa chính xác.';
    }
    feedbackExpl.innerHTML = q.explanation || '';
    renderKatex(feedbackExpl);

    var isLast = (currentIdx === quizData.length - 1);
    nextBtn.classList.remove('hidden');
    nextBtn.textContent = isLast ? 'Xem kết quả →' : 'Câu tiếp →';
  }

  // ── Result screen ─────────────────────────────────────────────────────────
  function showResult() {
    card.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    progressBar.style.width = '100%';
    progressText.textContent = 'Hoàn thành';
    scoreText.textContent = score + ' / ' + quizData.length + ' đúng';
    scoreText.classList.remove('hidden');

    var pct = score / quizData.length;
    if (pct === 1)        { resultEmoji.textContent = '🏆'; resultDesc.textContent = 'Xuất sắc! Đúng tất cả ' + quizData.length + ' câu.'; }
    else if (pct >= 0.7)  { resultEmoji.textContent = '🎉'; resultDesc.textContent = 'Tốt lắm! Đúng ' + score + ' / ' + quizData.length + ' câu.'; }
    else if (pct >= 0.5)  { resultEmoji.textContent = '💪'; resultDesc.textContent = 'Cần ôn thêm! Đúng ' + score + ' / ' + quizData.length + ' câu.'; }
    else                  { resultEmoji.textContent = '📚'; resultDesc.textContent = 'Đúng ' + score + ' / ' + quizData.length + ' câu. Hãy ôn lại lý thuyết nhé!'; }
  }

  // ── Restart ───────────────────────────────────────────────────────────────
  function restart() {
    currentIdx = 0; score = 0; answered = false;
    scoreText.classList.add('hidden');
    resultScreen.classList.add('hidden');
    card.classList.remove('hidden');
    renderQuestion(0);
  }

  submitBtn.addEventListener('click', function() { if (!answered) checkAnswer(); });
  nextBtn.addEventListener('click', function() {
    if (currentIdx === quizData.length - 1) { showResult(); }
    else { currentIdx++; nextBtn.classList.add('hidden'); renderQuestion(currentIdx); }
  });
  restartBtn.addEventListener('click', restart);

  if (quizData.length > 0) renderQuestion(0);
})();
})();<\/script>`;
}, "D:/lop12/src/components/LessonQuiz.astro", void 0);
//#endregion
//#region src/pages/[subject]/[slug].astro
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
	const { subject: subjectParam, slug } = Astro.params;
	const entry = (await getCollection("lessons")).find((e) => {
		const entrySlug = e.id.split("/").pop() || e.id;
		return (e.id.split("/")[0] || "") === subjectParam && entrySlug === slug;
	});
	if (!entry) return Astro.redirect("/lms/ly-thuyet");
	const lessonData = entry.data.lessons?.[0] || {};
	const title = lessonData.name || entry.id;
	const subjectName = entry.data.subject || subjectParam;
	lessonData.video_url;
	const theorySections = lessonData.content?.theory?.sections || [];
	const problemTypes = lessonData.content?.problemTypes || [];
	const exercises = lessonData.content?.exercises || [];
	const subject = (await db.getSubjects()).find((s) => s.slug === subjectParam);
	const subjectLessons = (await getCollection("lessons")).filter((l) => l.id.startsWith(subjectParam + "/")).sort((a, b) => {
		return (a.data.lessons?.[0]?.lesson_id || 0) - (b.data.lessons?.[0]?.lesson_id || 0);
	});
	const currentIndex = subjectLessons.findIndex((l) => l.id === entry.id);
	const prevLesson = currentIndex > 0 ? subjectLessons[currentIndex - 1] : null;
	const nextLesson = currentIndex < subjectLessons.length - 1 ? subjectLessons[currentIndex + 1] : null;
	const getSlug = (id) => id.split("/").pop() || id;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="lg:hidden mb-4"><button id="lesson-sidebar-toggle" class="flex items-center space-x-2 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl w-full justify-between"><span>Danh sách bài học</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg></button></div><div class="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto"><!-- Sidebar --><aside id="lesson-sidebar" class="hidden lg:block w-full lg:w-80 shrink-0"><div class="sticky top-24 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm"><h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path></svg>Môn ${subject?.name || subjectName}</h3><div class="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar pr-2">${subjectLessons.map((l, index) => renderTemplate`<a${addAttribute(`/lms/${subjectParam}/${getSlug(l.id)}`, "href")}${addAttribute(["block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors", l.id === entry.id ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50" : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-slate-200 border border-transparent"], "class:list")}><div class="flex gap-3"><span${addAttribute(["shrink-0 font-bold", l.id === entry.id ? "text-blue-500" : "text-gray-400"], "class:list")}>${index + 1}.</span><span class="line-clamp-2 leading-snug">${l.data.lessons?.[0]?.name || l.id}</span></div></a>`)}</div></div></aside><!-- Main Content --><div class="flex-1 space-y-8 min-w-0"><!-- Breadcrumb --><div>${subject && renderTemplate`<a${addAttribute("/ly-thuyet/" + subject.slug, "href")} class="inline-flex items-center text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-slate-350 transition-colors uppercase tracking-wider mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>Môn ${subject.name}</a>`}<h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">${title}</h1></div><!-- Lesson Content --><div class="bg-white dark:bg-slate-900 border border-gray-250 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-sm"><div class="prose dark:prose-invert max-w-none text-base select-text prose-headings:text-blue-700 dark:prose-headings:text-blue-400 prose-h2:text-2xl prose-h2:font-extrabold prose-h3:text-xl prose-h3:font-bold prose-p:text-gray-800 dark:prose-p:text-slate-200 prose-strong:text-blue-800 dark:prose-strong:text-blue-300">${theorySections.length > 0 ? renderTemplate`<div>${theorySections.map((section) => renderTemplate`<div class="mb-8"><h2 class="text-2xl font-extrabold text-blue-700 dark:text-blue-400 mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">${section.heading}</h2><div>${unescapeHTML(section.content)}</div></div>`)}</div>` : renderTemplate`<p class="text-gray-500">Đang cập nhật nội dung bài học...</p>`}${problemTypes.length > 0 && renderTemplate`<div class="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800"><h2 class="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mb-6 border-b border-gray-200 dark:border-slate-700 pb-2">Các dạng bài tập</h2>${problemTypes.map((pt) => renderTemplate`<div class="mb-10 bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800"><h3 class="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">${pt.name}</h3><div class="mb-6">${unescapeHTML(pt.method)}</div>${pt.examples && pt.examples.length > 0 && renderTemplate`<div class="space-y-4"><h4 class="font-bold text-rose-600 dark:text-rose-400 text-lg">Ví dụ minh họa:</h4>${pt.examples.map((ex) => renderTemplate`<div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-gray-200 dark:border-slate-700"><div class="mb-3 font-medium">${unescapeHTML(ex.question)}</div><div class="pt-3 border-t border-gray-100 dark:border-slate-800 text-sm text-gray-600 dark:text-slate-400">${unescapeHTML(ex.solution)}</div></div>`)}</div>`}</div>`)}</div>`}</div></div><!-- Lesson Quiz -->${exercises.length > 0 && renderTemplate`${renderComponent($$result, "LessonQuiz", $$LessonQuiz, { "exercises": exercises })}`}<!-- Next / Prev Buttons --><div class="flex items-center justify-between pt-8 border-t border-gray-250 dark:border-slate-850 mt-12 gap-4">${prevLesson ? renderTemplate`<a${addAttribute("/" + subjectParam + "/" + getSlug(prevLesson.id), "href")} class="flex-1 group flex flex-col p-4 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-slate-900 hover:shadow-md transition-all"><span class="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>Bài trước</span><span class="font-bold text-sm text-gray-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">${prevLesson.data.lessons?.[0]?.name || prevLesson.id}</span></a>` : renderTemplate`<div class="flex-1"></div>`}${nextLesson ? renderTemplate`<a${addAttribute("/" + subjectParam + "/" + getSlug(nextLesson.id), "href")} class="flex-1 group flex flex-col p-4 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-slate-900 hover:shadow-md transition-all text-right items-end"><span class="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center">Bài tiếp theo<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></span><span class="font-bold text-sm text-gray-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">${nextLesson.data.lessons?.[0]?.name || nextLesson.id}</span></a>` : renderTemplate`<div class="flex-1"></div>`}</div></div></div>` })}${renderScript($$result, "D:/lop12/src/pages/[subject]/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/lop12/src/pages/[subject]/[slug].astro", void 0);
var $$file = "D:/lop12/src/pages/[subject]/[slug].astro";
var $$url = "/lms/[subject]/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/[subject]/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
