

import { t, applyTranslations, onLanguageChange } from './translations.js';

const SVG = 'http://www.w3.org/2000/svg';
const STAGES = ['storage','ram','decode','graphics','monitor','audio'];
const BASE_MS = 4200;
const SPEEDS = [0.75, 1, 1.5, 2];

const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const state = {
  root:null, body:null, cleanup:null, langOff:null,
  step:0, playing:true, speed:1, elapsed:0, last:0, raf:0,
  flowPhase:0, flowTimer:0, particles:[]
};

function stepMs(){ return BASE_MS / state.speed; }

function diagram(){
  const W=980, H=420;
  const nodes = {
    storage: {x:70,y:250,w:120,h:80, c:'green', icon:'SSD'},
    ram:     {x:250,y:140,w:130,h:70, c:'blue',  icon:'RAM'},
    cpu:     {x:430,y:90, w:120,h:76, c:'cyan',  icon:'CPU'},
    gpu:     {x:430,y:210,w:120,h:86, c:'purple',icon:'GPU / Decoder'},
    graphics:{x:620,y:150,w:130,h:76, c:'purple',icon:'Graphics'},
    monitor: {x:820,y:90, w:130,h:90, c:'cyan',  icon:'Monitor'},
    audio:   {x:820,y:250,w:130,h:76, c:'amber', icon:'Audio'}
  };
  const paths = [
    {id:'p1', d:'M190,290 C220,290 220,175 250,175', from:'storage', to:'ram', color:'#4be0a2'},
    {id:'p2', d:'M380,175 C405,175 405,128 430,128', from:'ram', to:'cpu', color:'#5b95ff'},
    {id:'p3', d:'M380,175 C405,175 405,253 430,253', from:'ram', to:'gpu', color:'#5b95ff'},
    {id:'p4', d:'M550,128 C585,128 585,188 620,188', from:'cpu', to:'graphics', color:'#4be3e0'},
    {id:'p5', d:'M550,253 C585,253 585,188 620,188', from:'gpu', to:'graphics', color:'#a479ff'},
    {id:'p6', d:'M750,188 C785,188 785,135 820,135', from:'graphics', to:'monitor', color:'#4be3e0'},
    {id:'p7', d:'M550,253 C660,253 700,288 820,288', from:'gpu', to:'audio', color:'#f2b45e'}
  ];
  const activeForStep = {
    0: ['storage'], 1:['storage','ram'], 2:['ram','cpu','gpu'],
    3:['cpu','gpu','graphics'], 4:['graphics','monitor'], 5:['gpu','audio']
  };
  const activePaths = {
    0:['p1'], 1:['p1','p2','p3'], 2:['p2','p3','p4','p5'], 3:['p4','p5','p6','p7'], 4:['p6'], 5:['p7']
  };
  const act = new Set(activeForStep[state.step]||[]);
  const actP = new Set(activePaths[state.step]||[]);
  const nodeRect=(k,n)=>{
    const a=act.has(k)?' is-active':'';
    return `<g class="iexp__node iexp__node--${n.c}${a}" data-iexp-stage="${k}" tabindex="0" role="button" aria-label="${t('expLab.stages.'+k+'.t')}" aria-pressed="${act.has(k)}">
      <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="10" />
      <text x="${n.x+n.w/2}" y="${n.y+n.h/2-2}" text-anchor="middle" dominant-baseline="middle" class="iexp__node-title">${n.icon}</text>
      <text x="${n.x+n.w/2}" y="${n.y+n.h/2+16}" text-anchor="middle" class="iexp__node-sub">${t('expLab.stages.'+k+'.s')}</text>
    </g>`;
  };
  return `<svg class="iexp__svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-label="${t('expLab.diagramLabel')}">
    <defs>
      <filter id="iexp-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <g class="iexp__paths">
      ${paths.map(p=>`<path id="${p.id}" d="${p.d}" class="iexp__path${actP.has(p.id)?' is-live':''}" stroke="${p.color}" />`).join('')}
    </g>
    <g class="iexp__particles" data-iexp-particles></g>
    ${Object.entries(nodes).map(([k,n])=>nodeRect(k,n)).join('')}
    <g class="iexp__legend" transform="translate(18,18)">
      <text class="iexp__legend-t" y="0">${t('expLab.scenario')}</text>
    </g>
  </svg>`;
}

function shell(){
  return `
  <div class="iexp">
    <section class="iexp__intro">
      <h3>${t('expLab.intro.title')}</h3>
      <p>${t('expLab.intro.body')}</p>
      <ol class="iexp__steps">
        ${STAGES.map((k,i)=>`<li><strong>${i+1}.</strong> ${t('expLab.stages.'+k+'.t')}</li>`).join('')}
      </ol>
    </section>

    <section class="iexp__sim">
      <div class="iexp__toolbar" role="group" aria-label="${t('expLab.controls.label')}">
        <button type="button" class="pxlab__btn is-active" data-iexp-action="toggle" aria-pressed="true">${t('expLab.controls.pause')}</button>
        <button type="button" class="pxlab__btn" data-iexp-action="next">${t('expLab.controls.next')}</button>
        <button type="button" class="pxlab__btn" data-iexp-action="restart">${t('expLab.controls.restart')}</button>
        <label class="iexp__speed"><span>${t('expLab.controls.speed')}</span><select data-iexp-speed>${SPEEDS.map(s=>`<option value="${s}" ${s===1?'selected':''}>${s}×</option>`).join('')}</select></label>
      </div>

      <div class="iexp__diagram-wrap" data-iexp-diagram>${diagram()}</div>

      <div class="iexp__status" aria-live="polite">
        <div class="iexp__progress"><span>${t('expLab.controls.stage')}</span><strong data-iexp-step>${state.step+1} / ${STAGES.length}</strong></div>
        <div class="iexp__progress-bar" role="progressbar" aria-valuemin="1" aria-valuemax="${STAGES.length}" aria-valuenow="${state.step+1}"><span data-iexp-bar style="width:${((state.step+1)/STAGES.length)*100}%"></span></div>
      </div>

      <div class="iexp__detail" data-iexp-detail>
        ${detailMarkup(state.step)}
      </div>
    </section>

    <section class="iexp__hw">
      <h3>${t('expLab.hw.title')}</h3>
      <div class="vidlab__facts">
        ${['decode','gpu','fixed','benefit'].map(k=>`<div class="vidlab__fact"><strong>${t('expLab.hw.'+k+'.t')}</strong><span>${t('expLab.hw.'+k+'.b')}</span></div>`).join('')}
      </div>
    </section>
  </div>`;
}

function detailMarkup(i){
  const k = STAGES[clamp(i,0,STAGES.length-1)];
  return `<div class="iexp__detail-inner"><span class="iexp__detail-step">${t('expLab.controls.stage')} ${i+1}</span><h4>${t('expLab.stages.'+k+'.t')}</h4><p>${t('expLab.stages.'+k+'.b')}</p></div>`;
}

function syncParticles(){
  if(!state.body) return;
  const layer = state.body.querySelector('[data-iexp-particles]');
  if(!layer) return;
  layer.replaceChildren();
  const svg = state.body.querySelector('.iexp__svg');
  if(!svg) return;
  const activePaths = {0:['p1'],1:['p1','p2','p3'],2:['p2','p3','p4','p5'],3:['p4','p5','p6','p7'],4:['p6'],5:['p7']};
  (activePaths[state.step]||[]).forEach((pid,idx)=>{
    const path = svg.querySelector('#'+pid); if(!path) return;
    const g=document.createElementNS(SVG,'g'); g.setAttribute('class','iexp__particle'); g.setAttribute('filter','url(#iexp-glow)');
    const c=document.createElementNS(SVG,'circle'); c.setAttribute('r','4.5'); c.setAttribute('fill','rgba(255,255,255,0.95)');
    const am=document.createElementNS(SVG,'animateMotion'); am.setAttribute('dur',(1.6/state.speed)+'s'); am.setAttribute('repeatCount','indefinite'); am.setAttribute('begin',(idx*-0.5)+'s');
    const mp=document.createElementNS(SVG,'mpath'); mp.setAttributeNS('http://www.w3.org/1999/xlink','href','#'+pid);
    am.appendChild(mp); g.appendChild(am); g.appendChild(c); layer.appendChild(g);
  });
}

function renderDiagram(){
  if(!state.body) return;
  const wrap=state.body.querySelector('[data-iexp-diagram]');
  if(wrap){ wrap.innerHTML=diagram(); syncParticles(); applyTranslations(wrap); }
  const det=state.body.querySelector('[data-iexp-detail]');
  if(det){ det.innerHTML=detailMarkup(state.step); applyTranslations(det); }
  const st=state.body.querySelector('[data-iexp-step]'); if(st) st.textContent=`${state.step+1} / ${STAGES.length}`;
  const bar=state.body.querySelector('[data-iexp-bar]'); if(bar) bar.style.width=`${((state.step+1)/STAGES.length)*100}%`;
  const pb=state.body.querySelector('[role="progressbar"]'); if(pb) pb.setAttribute('aria-valuenow', String(state.step+1));
  const btn=state.body.querySelector('[data-iexp-action="toggle"]');
  if(btn){ btn.textContent=state.playing?t('expLab.controls.pause'):t('expLab.controls.play'); btn.setAttribute('aria-pressed',state.playing?'true':'false'); btn.classList.toggle('is-active',state.playing); }
}

function goStep(i, restartTime=true){
  state.step = ((i % STAGES.length) + STAGES.length) % STAGES.length;
  if(restartTime) state.elapsed=0;
  renderDiagram();
}

function tick(ts){
  if(!state.playing || !state.root) return;
  if(!state.last) state.last=ts;
  const dt=Math.min(0.12,(ts-state.last)/1000);
  state.last=ts;
  state.elapsed += dt;
  if(state.elapsed >= stepMs()/1000){ state.elapsed=0; state.step=(state.step+1)%STAGES.length; renderDiagram(); }
  state.raf=requestAnimationFrame(tick);
}

function setPlaying(on){
  state.playing=!!on;
  if(state.playing){ state.last=0; state.raf=requestAnimationFrame(tick); }
  else if(state.raf){ cancelAnimationFrame(state.raf); state.raf=0; }
  renderDiagram();
}

function bind(){
  if(!state.body) return;
  state.body.addEventListener('click', e=>{
    const btn=e.target.closest('[data-iexp-action]');
    if(btn){
      const a=btn.dataset.iexpAction;
      if(a==='toggle') setPlaying(!state.playing);
      if(a==='next'){ setPlaying(false); goStep(state.step+1); }
      if(a==='restart') goStep(0);
    }
    const stage=e.target.closest('[data-iexp-stage]');
    if(stage){
      const idx=STAGES.indexOf(stage.dataset.iexpStage);
      if(idx>=0){ setPlaying(false); goStep(idx); }
    }
  });
  state.body.addEventListener('keydown', e=>{
    const stage=e.target.closest('[data-iexp-stage]');
    if(stage && (e.key==='Enter'||e.key===' ')){
      e.preventDefault();
      const idx=STAGES.indexOf(stage.dataset.iexpStage);
      if(idx>=0){ setPlaying(false); goStep(idx); }
    }
  });
  state.body.addEventListener('change', e=>{
    if(e.target.matches('[data-iexp-speed]')){ state.speed=Number(e.target.value); syncParticles(); }
  });
}

function onVis(){ if(document.hidden) setPlaying(false); }
function onNav(e){ if(e.detail.view!=='experience') setPlaying(false); }

export function initExperienceLab(root){
  if(!(root instanceof HTMLElement)) return null;
  if(state.root===root) return { root, destroy: destroyExperienceLab };
  destroyExperienceLab();
  state.root=root; state.body=root.querySelector('.lab-frame__body'); if(!state.body) return null;
  root.classList.add('lab-frame--mounted','lab-frame--iexp');
  root.dataset.moduleState='mounted';
  state.langOff=onLanguageChange(()=>{ const p=state.playing; setPlaying(false); render(); setPlaying(p); });
  render(); bind(); renderDiagram(); setPlaying(true);
  document.addEventListener('visibilitychange', onVis);
  document.addEventListener('app:navigate', onNav);
  state.cleanup=()=>{ setPlaying(false); state.langOff?.(); document.removeEventListener('visibilitychange',onVis); document.removeEventListener('app:navigate',onNav); };
  return { root, destroy: destroyExperienceLab };
}
function render(){ if(!state.body) return; state.body.innerHTML=shell(); applyTranslations(state.body); }
export function destroyExperienceLab(){
  state.cleanup?.(); state.cleanup=null;
  if(state.root){ state.root.classList.remove('lab-frame--mounted','lab-frame--iexp'); state.root.dataset.moduleState='pending'; state.body?.replaceChildren(); }
  Object.assign(state,{root:null,body:null,cleanup:null,langOff:null,playing:false,last:0,elapsed:0,raf:0,step:0});
}
