var e=0;function t(t=null){let n=document.getElementById(`sub-questions-list`),r=document.getElementById(`sub_q_count`);if(!n||!r)return;let i=e++,a=document.createElement(`div`);a.className=`p-5 rounded-2xl border border-gray-250 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/30 space-y-4 relative group`,a.id=`sub-q-block-${i}`;let o=t||{question:``,option_a:``,option_b:``,option_c:``,option_d:``,correct_option:`A`,explanation:``};a.innerHTML=`
      <div class="flex items-center justify-between border-b border-gray-250 dark:border-slate-800/80 pb-3">
        <h4 class="text-sm font-black text-gray-800 dark:text-slate-200">Câu hỏi phụ #${i+1}</h4>
        <button type="button" onclick="document.getElementById('sub-q-block-${i}').remove();"
          class="text-xs font-bold text-rose-500 hover:text-rose-600 transition flex items-center gap-0.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          Xóa
        </button>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-[10px] font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">Nội dung câu hỏi phụ</label>
          <input type="text" name="sub_q_${i}_text" value="${o.question}" required
            placeholder="Ví dụ: What is the main idea of the passage?"
            class="w-full px-4 py-2.5 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${[`A`,`B`,`C`,`D`].map(e=>`
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-gray-250 dark:border-slate-800 flex items-center justify-center font-black text-xs text-gray-500 dark:text-slate-400">${e}</span>
                <input type="text" name="sub_q_${i}_opt_${e}" value="${o[`option_${e.toLowerCase()}`]||``}" required
                  placeholder="Phương án ${e}..."
                  class="flex-1 px-3 py-2 rounded-lg border border-gray-250 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-xs focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100" />
              </div>
            `).join(``)}
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-gray-500 dark:text-slate-400">Đáp án đúng:</span>
            <div class="flex items-center gap-4">
              ${[`A`,`B`,`C`,`D`].map(e=>`
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="sub_q_${i}_correct" value="${e}" ${o.correct_option===e?`checked`:``}
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                  <span class="text-xs font-bold text-gray-700 dark:text-slate-350">${e}</span>
                </label>
              `).join(``)}
            </div>
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">Giải thích (Tùy chọn)</label>
          <input type="text" name="sub_q_${i}_explanation" value="${o.explanation||``}"
            placeholder="Ví dụ: Lời giải thích tại sao chọn đáp án này..."
            class="w-full px-4 py-2 rounded-xl border border-gray-250 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-xs focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100" />
        </div>
      </div>
    `,n.appendChild(a),r.value=String(e)}function n(e){let t=document.getElementById(`choices-container`),n=document.getElementById(`tf-container`),r=document.getElementById(`msq-container`),i=document.getElementById(`sa-container`),a=document.getElementById(`tl-container`),o=document.getElementById(`read-list-container`),s=document.getElementById(`audio-url-block`),c=document.getElementById(`sa_correct`),l=document.getElementById(`audio_url`);[t,n,r,i,a,o].forEach(e=>e?.classList.add(`hidden`)),document.querySelectorAll(`#choices-container input[type="text"]`).forEach(e=>e.required=!1),c&&(c.required=!1),l&&(l.required=!1),e===`single_choice`||e===`multiple_choice`?(t?.classList.remove(`hidden`),document.querySelectorAll(`#choices-container input[type="text"]`).forEach(e=>e.required=!0)):e===`true_false`?n?.classList.remove(`hidden`):e===`msq`?r?.classList.remove(`hidden`):e===`sa`?(i?.classList.remove(`hidden`),c&&(c.required=!0)):e===`tl`?a?.classList.remove(`hidden`):(e===`read`||e===`list`)&&(o?.classList.remove(`hidden`),e===`list`?(s?.classList.remove(`hidden`),l&&(l.required=!0)):s?.classList.add(`hidden`))}function r(){let e=document.getElementById(`type`);e?.addEventListener(`change`,()=>{n(e.value)}),document.getElementById(`btn-add-sub-q`)?.addEventListener(`click`,()=>{t()});let r=document.getElementById(`questions-data-root`);if(r){let e=r.getAttribute(`data-type`)||``;try{let n=r.getAttribute(`data-sub-questions`);if(n){let r=JSON.parse(n);if(Array.isArray(r)&&r.length>0)r.forEach(e=>t(e));else if(e===`read`||e===`list`){let n=e===`read`?3:2;for(let e=0;e<n;e++)t()}}}catch(e){console.error(`Failed to parse sub questions`,e)}}e&&n(e.value)}r(),document.addEventListener(`astro:page-load`,r);