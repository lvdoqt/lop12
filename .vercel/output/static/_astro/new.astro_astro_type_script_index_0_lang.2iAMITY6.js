var e=0;function t(e){let t=document.getElementById(`form-panel`),n=document.getElementById(`json-panel`),r=document.getElementById(`tab-form`),i=document.getElementById(`tab-json`);if(!t||!n||!r||!i)return;let a=[`border-blue-600`,`text-blue-600`,`dark:border-blue-400`,`dark:text-blue-400`],o=[`border-transparent`,`text-gray-500`,`dark:text-slate-400`];e===`json`?(t.style.display=`none`,n.style.display=`block`,r.classList.remove(...a),r.classList.add(...o),i.classList.remove(...o),i.classList.add(...a)):(n.style.display=`none`,t.style.display=`block`,i.classList.remove(...a),i.classList.add(...o),r.classList.remove(...o),r.classList.add(...a))}var n={single_choice:`Trắc nghiệm đơn`,multiple_choice:`Nhiều lựa chọn`,msq:`Đúng/Sai THPT 2025`,true_false:`Đúng/Sai đơn`,read:`Đọc hiểu`,list:`Nghe hiểu`,sa:`Trả lời ngắn`,tl:`Tự luận`},r={single_choice:`bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400`,multiple_choice:`bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400`,msq:`bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400`,true_false:`bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400`,read:`bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400`,list:`bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400`,sa:`bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400`,tl:`bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400`};function i(t=null){let n=document.getElementById(`sub-questions-list`),r=document.getElementById(`sub_q_count`);if(!n||!r)return;let i=e++,a=document.createElement(`div`);a.className=`p-5 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/30 space-y-4 relative group`,a.id=`sub-q-block-${i}`;let o=t||{question:``,option_a:``,option_b:``,option_c:``,option_d:``,correct_option:`A`,explanation:``};a.innerHTML=`
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/80 pb-3">
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
    `,n.appendChild(a),r.value=String(e)}function a(e){let t=document.getElementById(`choices-container`),a=document.getElementById(`tf-container`),o=document.getElementById(`msq-container`),s=document.getElementById(`sa-container`),c=document.getElementById(`tl-container`),l=document.getElementById(`read-list-container`),u=document.getElementById(`audio-url-block`),d=document.getElementById(`type-badge`),f=document.getElementById(`choices-hint`),p=document.getElementById(`sa-hint`);[t,a,o,s,c,l].forEach(e=>e?.classList.add(`hidden`)),document.querySelectorAll(`#choices-container input[type="text"]`).forEach(e=>e.required=!1);let m=document.getElementById(`sa_correct`);m&&(m.required=!1);let h=document.getElementById(`audio_url`);if(h&&(h.required=!1),d&&(d.textContent=n[e]??e,d.className=`px-2 py-0.5 rounded text-xs font-bold `+(r[e]??``)),e===`single_choice`)t?.classList.remove(`hidden`),f&&(f.innerHTML=`Đánh dấu <strong>1 ô</strong> cho đáp án đúng.`),document.querySelectorAll(`#choices-container input[type="text"]`).forEach(e=>e.required=!0);else if(e===`multiple_choice`)t?.classList.remove(`hidden`),f&&(f.innerHTML=`Đánh dấu <strong>ít nhất 2 ô</strong> cho đáp án đúng.`),document.querySelectorAll(`#choices-container input[type="text"]`).forEach(e=>e.required=!0);else if(e===`true_false`)a?.classList.remove(`hidden`);else if(e===`msq`)o?.classList.remove(`hidden`);else if(e===`sa`)s?.classList.remove(`hidden`),p&&(p.textContent=`Nhập đáp án chính xác bên dưới (học sinh phải khớp chính xác).`),m&&(m.required=!0);else if(e===`tl`)c?.classList.remove(`hidden`);else if(e===`read`||e===`list`){l?.classList.remove(`hidden`);let t=document.getElementById(`sub-questions-list`);if(t&&t.children.length===0){let t=e===`read`?3:2;for(let e=0;e<t;e++)i()}e===`list`?(u?.classList.remove(`hidden`),h&&(h.required=!0)):u?.classList.add(`hidden`)}}function o(){let e=document.getElementById(`msq-stmts`),t=document.getElementById(`msq_count`);if(!e||!t)return;let n=e.children.length,r=String.fromCharCode(97+n),i=String.fromCharCode(65+n),a=document.createElement(`div`);a.className=`flex items-start gap-3`,a.innerHTML=`
      <span class="flex-none mt-2.5 text-xs font-bold text-gray-500 dark:text-slate-400 w-5 text-right">${r})</span>
      <input type="text" name="msq_stmt_${n}" id="msq_stmt_${n}"
        placeholder="Mệnh đề ${i}..."
        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-sm focus:border-blue-500 outline-none text-gray-800 dark:text-slate-100" />
      <div class="flex-none flex items-center gap-2 mt-2">
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="radio" name="msq_correct_${n}" value="true" class="h-3.5 w-3.5 text-emerald-600 focus:ring-emerald-500" />
          <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Đ</span>
        </label>
        <label class="flex items-center gap-1 cursor-pointer">
          <input type="radio" name="msq_correct_${n}" value="false" checked class="h-3.5 w-3.5 text-rose-500 focus:ring-rose-500" />
          <span class="text-xs font-bold text-rose-500 dark:text-rose-400">S</span>
        </label>
      </div>
    `,e.appendChild(a),t.value=String(n+1)}function s(){let e=document.getElementById(`json_data`),t=document.getElementById(`btn-validate-json`),n=document.getElementById(`json-feedback`),r=document.getElementById(`btn-paste-sample`);t?.addEventListener(`click`,()=>{if(!e||!n)return;let t=e.value.trim();if(!t){n.textContent=`⚠️ Vui lòng nhập JSON.`,n.className=`text-xs font-semibold text-amber-600 dark:text-amber-400`,n.classList.remove(`hidden`);return}try{let e=JSON.parse(t),r=Array.isArray(e)?e:Array.isArray(e.questions)?e.questions:[e];if(!Array.isArray(r)||r.length===0)throw Error(`Thiếu dữ liệu câu hỏi`);n.textContent=`✅ JSON hợp lệ — `+r.length+` câu hỏi`,n.className=`text-xs font-semibold text-emerald-600 dark:text-emerald-400`,n.classList.remove(`hidden`)}catch(e){n.textContent=`❌ Lỗi: `+(e?.message||String(e)),n.className=`text-xs font-semibold text-rose-600 dark:text-rose-400`,n.classList.remove(`hidden`)}}),r?.addEventListener(`click`,function(){e&&(e.value=JSON.stringify([{subject_id:``,content:`Climate change is one of the most pressing issues of our time. Rising temperatures, caused primarily by the burning of fossil fuels, are leading to more extreme weather events, sea level rise, and disruption of ecosystems.`,type:`read`,difficulty:`medium`,questions:[{question:`According to the passage, what is the primary cause of rising temperatures?`,option_a:`Deforestation and land use changes`,option_b:`The burning of fossil fuels`,option_c:`Ocean currents and natural cycles`,option_d:`Industrial waste and pollution`,correct_option:`B`,explanation:`The passage explicitly states: 'Rising temperatures, caused primarily by the burning of fossil fuels...'`},{question:`What is NOT mentioned in the passage as a consequence of climate change?`,option_a:`Extreme weather events`,option_b:`Sea level rise`,option_c:`Acid rain`,option_d:`Disruption of ecosystems`,correct_option:`C`}]}],null,2))})}function c(){document.getElementById(`tab-form`)?.addEventListener(`click`,function(){t(`form`)}),document.getElementById(`tab-json`)?.addEventListener(`click`,function(){t(`json`)});let e=document.getElementById(`type`);e?.addEventListener(`change`,function(){a(e.value)}),a(`single_choice`),document.getElementById(`btn-add-msq-stmt`)?.addEventListener(`click`,o),document.getElementById(`btn-add-sub-q`)?.addEventListener(`click`,function(){i()}),s()}c(),document.addEventListener(`astro:page-load`,c);