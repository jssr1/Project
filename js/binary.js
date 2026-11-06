

import { t, applyTranslations, onLanguageChange } from './translations.js';
import { initFollowDataLab, destroyFollowDataLab } from './follow-data.js';

const state = {
  root: null, body: null, cleanup: null, langOff: null,
  tab: 'switches',
  bits: [0,0,0,0,0,1,0,1], // 5
  decInput: '42',
  binInput: '101101',
  textInput: 'Hi 👋',
  follow: null
};

const TABS = ['switches','dec2bin','bin2dec','text','journey'];

function esc(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function byteValue(bits){ return bits.reduce((n,b,i)=>n + (b? 1<<(7-i):0), 0); }

function decToBinarySteps(n){
  n = Math.floor(Number(n));
  if (!Number.isFinite(n) || n < 0) return { error: 'nonneg' };
  if (n > 255) return { error: 'range', n };
  if (n === 0) return { n:0, steps:[{q:0,r:0}], binary:'00000000' };
  const steps=[]; let x=n;
  while(x>0){ const q=Math.floor(x/2), r=x%2; steps.push({x,q,r}); x=q; }
  const raw = steps.map(s=>s.r).reverse().join('');
  return { n, steps, raw, binary: raw.padStart(8,'0') };
}

function binToDecimalSteps(input){
  const raw = String(input||'').trim().replace(/\s+/g,'');
  if (!raw) return { error:'empty' };
  if (!/^[01]+$/.test(raw)) return { error:'invalid', raw };
  if (raw.length > 16) return { error:'length', raw };
  const bits = raw.split('').map(Number);
  const terms = [];
  let total = 0;
  for(let i=0;i<bits.length;i++){
    const power = bits.length-1-i;
    const place = 2**power;
    const val = bits[i]*place;
    if(bits[i]) terms.push({bit:1,power,place,val});
    total += val;
  }
  return { raw, bits, total, terms, powers: bits.map((b,i)=>({b,p:bits.length-1-i,v:b*(2**(bits.length-1-i))})) };
}

function utf8BytesForCodePoint(cp){
  if (cp <= 0x7F) return [cp];
  if (cp <= 0x7FF) return [0xC0|(cp>>6), 0x80|(cp&0x3F)];
  if (cp <= 0xFFFF) return [0xE0|(cp>>12), 0x80|((cp>>6)&0x3F), 0x80|(cp&0x3F)];
  return [0xF0|(cp>>18), 0x80|((cp>>12)&0x3F), 0x80|((cp>>6)&0x3F), 0x80|(cp&0x3F)];
}

function textAnalysis(text){
  const chars = Array.from(String(text||''));
  return chars.slice(0, 24).map(ch => {
    const cp = ch.codePointAt(0);
    const bytes = utf8BytesForCodePoint(cp); // same result as TextEncoder for valid scalar values
    const isAscii = cp <= 0x7F;
    return {
      ch: ch === ' ' ? '␠' : ch,
      raw: ch,
      cp,
      hex: 'U+'+cp.toString(16).toUpperCase().padStart(cp>0xFFFF?5:4,'0'),
      bytes,
      byteHex: bytes.map(b=>b.toString(16).toUpperCase().padStart(2,'0')),
      binary: bytes.map(b=>b.toString(2).padStart(8,'0')),
      isAscii,
      name: isAscii ? 'ASCII' : 'Unicode'
    };
  });
}

function shell(){
  return `
  <div class="binlab">
    <nav class="binlab__tabs" role="tablist" aria-label="${t('binaryLab.title')}">
      ${TABS.map(id=>`<button type="button" role="tab" class="binlab__tab" data-bl-tab="${id}" aria-selected="${state.tab===id}" aria-controls="bl-panel-${id}" id="bl-tab-${id}">${t('binaryLab.tabs.'+id)}</button>`).join('')}
    </nav>

    <div class="binlab__intro">
      <p>${t('binaryLab.intro.bits')}</p>
      <div class="binlab__facts">
        <div class="binlab__fact"><strong>${t('binaryLab.facts.bit.t')}</strong><span>${t('binaryLab.facts.bit.b')}</span></div>
        <div class="binlab__fact"><strong>${t('binaryLab.facts.byte.t')}</strong><span>${t('binaryLab.facts.byte.b')}</span></div>
        <div class="binlab__fact"><strong>${t('binaryLab.facts.ascii.t')}</strong><span>${t('binaryLab.facts.ascii.b')}</span></div>
        <div class="binlab__fact"><strong>${t('binaryLab.facts.unicode.t')}</strong><span>${t('binaryLab.facts.unicode.b')}</span></div>
        <div class="binlab__fact"><strong>${t('binaryLab.facts.utf8.t')}</strong><span>${t('binaryLab.facts.utf8.b')}</span></div>
      </div>
    </div>

    <section class="binlab__panel" role="tabpanel" id="bl-panel-switches" aria-labelledby="bl-tab-switches" ${state.tab!=='switches'?'hidden':''}>
      ${switchesMarkup()}
    </section>
    <section class="binlab__panel" role="tabpanel" id="bl-panel-dec2bin" aria-labelledby="bl-tab-dec2bin" ${state.tab!=='dec2bin'?'hidden':''}>
      ${dec2binMarkup()}
    </section>
    <section class="binlab__panel" role="tabpanel" id="bl-panel-bin2dec" aria-labelledby="bl-tab-bin2dec" ${state.tab!=='bin2dec'?'hidden':''}>
      ${bin2decMarkup()}
    </section>
    <section class="binlab__panel" role="tabpanel" id="bl-panel-text" aria-labelledby="bl-tab-text" ${state.tab!=='text'?'hidden':''}>
      ${textMarkup()}
    </section>
    <section class="binlab__panel binlab__panel--journey" role="tabpanel" id="bl-panel-journey" aria-labelledby="bl-tab-journey" ${state.tab!=='journey'?'hidden':''}>
      <div class="binlab__journey-head">
        <h3>${t('binaryLab.tabs.journey')}</h3>
        <p>${t('binaryLab.journeyLead')}</p>
      </div>
      <div class="binlab__journey-host" data-bl-journey></div>
    </section>
  </div>`;
}

function switchesMarkup(){
  const val = byteValue(state.bits);
  return `
  <div class="sim">
    <div class="sim__head">
      <h3>${t('binaryLab.switches.title')}</h3>
      <p>${t('binaryLab.switches.lead')}</p>
    </div>
    <div class="bits" role="group" aria-label="${t('binaryLab.switches.title')}">
      ${state.bits.map((b,i)=>{ const place=2**(7-i); return `
        <button type="button" class="bit ${b?'is-on':''}" data-bl-bit="${i}" aria-pressed="${b?'true':'false'}">
          <span class="bit__place">${place}</span>
          <span class="bit__switch"><span class="bit__knob"></span></span>
          <span class="bit__val">${b}</span>
        </button>`; }).join('')}
    </div>
    <div class="sim__result" aria-live="polite">
      <div class="sim__equation">
        <code class="sim__binary">${state.bits.join('')}</code>
        <span class="sim__eq">=</span>
        <strong class="sim__decimal">${val}</strong>
      </div>
      <p class="sim__explain">${t('binaryLab.switches.example')} <code>00000101 = 0+0+0+0+0+4+0+1 = 5</code>.</p>
      <p class="sim__explain sim__explain--calc">${state.bits.map((b,i)=>b?2**(7-i):null).filter(v=>v!==null).join(' + ') || '0'} = <strong>${val}</strong></p>
    </div>
  </div>`;
}

function dec2binMarkup(){
  const res = decToBinarySteps(state.decInput);
  let body = '';
  if(res.error==='nonneg' || res.error==='range' || !res.steps){
    body = `<p class="sim__error">${t('binaryLab.dec2bin.error')}</p>`;
  } else {
    body = `
      <div class="sim__result" aria-live="polite">
        <div class="sim__equation"><strong class="sim__decimal">${res.n}</strong><span class="sim__eq">=</span><code class="sim__binary">${res.binary}</code></div>
        <h4>${t('binaryLab.dec2bin.stepsTitle')}</h4>
        <ol class="steps">
          ${res.steps.map((s,idx)=>`<li><code>${s.x} ÷ 2 = ${s.q}</code> <span>${t('binaryLab.dec2bin.remainder')}</span> <strong>${s.r}</strong></li>`).join('')}
        </ol>
        <p class="sim__explain">${t('binaryLab.dec2bin.readUp')} <code>${res.raw}</code> → ${t('binaryLab.dec2bin.padded')} <code>${res.binary}</code>.</p>
      </div>`;
  }
  return `
  <div class="sim">
    <div class="sim__head"><h3>${t('binaryLab.dec2bin.title')}</h3><p>${t('binaryLab.dec2bin.lead')}</p></div>
    <label class="sim__field"><span>${t('binaryLab.dec2bin.label')}</span>
      <input type="number" min="0" max="255" step="1" inputmode="numeric" value="${esc(state.decInput)}" data-bl-dec placeholder="0–255" />
    </label>
    <p class="sim__hint">${t('binaryLab.dec2bin.hint')}</p>
    ${body}
  </div>`;
}

function bin2decMarkup(){
  const res = binToDecimalSteps(state.binInput);
  let body='';
  if(res.error){
    body = `<p class="sim__error">${t('binaire.bin2dec.'+res.error)}</p>`;
  } else {
    body = `
    <div class="sim__result" aria-live="polite">
      <div class="sim__equation"><code class="sim__binary">${esc(res.raw)}</code><span class="sim__eq">=</span><strong class="sim__decimal">${res.total}</strong></div>
      <div class="placegrid" aria-label="place values">
        ${res.powers.map(p=>`<div class="placegrid__cell ${p.b?'is-on':''}"><span class="placegrid__p">2<sup>${p.p}</sup></span><span class="placegrid__v">${p.b? (2**p.p):'·'}</span><span class="placegrid__b">${p.b}</span></div>`).join('')}
      </div>
      <p class="sim__explain">${res.powers.filter(p=>p.b).map(p=>`${2**p.p}`).join(' + ') || '0'} = <strong>${res.total}</strong></p>
    </div>`;
  }
  return `
  <div class="sim">
    <div class="sim__head"><h3>${t('binaryLab.bin2dec.title')}</h3><p>${t('binaryLab.bin2dec.lead')}</p></div>
    <label class="sim__field"><span>${t('binaryLab.bin2dec.label')}</span>
      <input type="text" inputmode="numeric" pattern="[01 ]+" value="${esc(state.binInput)}" data-bl-bin placeholder="01000001" autocomplete="off" spellcheck="false" />
    </label>
    <p class="sim__hint">${t('binaryLab.bin2dec.hint')}</p>
    ${body}
  </div>`;
}

function textMarkup(){
  const rows = textAnalysis(state.textInput);
  return `
  <div class="sim">
    <div class="sim__head"><h3>${t('binaryLab.text.title')}</h3><p>${t('binaryLab.text.lead')}</p></div>
    <label class="sim__field sim__field--wide"><span>${t('binaryLab.text.label')}</span>
      <input type="text" value="${esc(state.textInput)}" data-bl-text maxlength="24" placeholder="${esc(t('binaryLab.text.placeholder'))}" autocomplete="off" />
    </label>
    <p class="sim__note"><strong>${t('binaryLab.text.noteTitle')}</strong> ${t('binaryLab.text.note')}</p>
    <div class="sim__result" aria-live="polite">
      <div class="enc-table-wrap">
        <table class="enc-table">
          <thead><tr>
            <th>${t('binaryLab.text.col.char')}</th><th>${t('binaryLab.text.col.cp')}</th><th>${t('binaryLab.text.col.enc')}</th><th>${t('binaryLab.text.col.bytes')}</th><th>${t('binaryLab.text.col.bin')}</th>
          </tr></thead>
          <tbody>
            ${rows.map(r=>`<tr class="${r.isAscii?'':'is-multi'}"><td class="enc-char">${esc(r.ch)}</td><td><code>${r.hex}</code><small>(${r.cp})</small></td><td><span class="enc-tag ${r.isAscii?'is-ascii':'is-uni'}">${r.name}</span></td><td><code>${r.byteHex.join(' ')}</code> <small>${t('binaryLab.text.byteCount', {n:r.bytes.length})}</small></td><td><code class="enc-bin">${r.binary.join(' ')}</code></td></tr>`).join('') || `<tr><td colspan="5">${t('binaryLab.text.empty')}</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function render(keepTab){
  if(!state.body) return;
  const focusId = document.activeElement?.dataset?.blBit ?? document.activeElement?.dataset?.blTab;
  destroyFollowDataLab();
  state.follow = null;
  state.body.innerHTML = shell();
  applyTranslations(state.body);
  bind();
  if(state.tab==='journey'){
    const host = state.body.querySelector('[data-bl-journey]');
    const frame = state.root;
    if(host && frame) state.follow = initFollowDataLab(frame, { body: host, embedded: true });
  }
}

function bind(){
  state.body.querySelectorAll('[data-bl-tab]').forEach(btn=>btn.addEventListener('click', ()=>{
    state.tab = btn.dataset.blTab; render();
  }));
  state.body.querySelectorAll('[data-bl-bit]').forEach(btn=>btn.addEventListener('click', ()=>{
    const i=Number(btn.dataset.blBit); state.bits[i]=state.bits[i]?0:1; render();
  }));
  const dec = state.body.querySelector('[data-bl-dec]');
  if(dec) dec.addEventListener('input', e=>{ state.decInput = e.target.value; render(); decFocus(); });
  const bin = state.body.querySelector('[data-bl-bin]');
  if(bin) bin.addEventListener('input', e=>{ state.binInput = e.target.value; render(); binFocus(); });
  const tx = state.body.querySelector('[data-bl-text]');
  if(tx) tx.addEventListener('input', e=>{ state.textInput = e.target.value; render(); textFocus(); });
}
function decFocus(){ const el=state.body?.querySelector('[data-bl-dec]'); if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }
function binFocus(){ const el=state.body?.querySelector('[data-bl-bin]'); if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }
function textFocus(){ const el=state.body?.querySelector('[data-bl-text]'); if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }

export function initBinaryLab(root){
  if(!(root instanceof HTMLElement)) return null;
  if(state.root===root) return { root, destroy: destroyBinaryLab };
  destroyBinaryLab();
  state.root=root; state.body=root.querySelector('.lab-frame__body'); if(!state.body) return null;
  root.classList.add('lab-frame--mounted','lab-frame--binlab');
  root.dataset.moduleState='mounted';
  state.langOff = onLanguageChange(()=>render());
  render();
  applyTranslations(root);
  state.cleanup=()=>{ destroyFollowDataLab(); state.langOff?.(); };
  return { root, destroy: destroyBinaryLab };
}
export function destroyBinaryLab(){
  state.cleanup?.(); state.cleanup=null; destroyFollowDataLab();
  if(state.root){ state.root.classList.remove('lab-frame--mounted','lab-frame--binlab'); state.root.dataset.moduleState='pending'; state.body?.replaceChildren(); }
  Object.assign(state,{root:null,body:null,cleanup:null,langOff:null,tab:'switches',follow:null});
}
