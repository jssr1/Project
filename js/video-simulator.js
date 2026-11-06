

import { t, applyTranslations, onLanguageChange } from './translations.js';

const FPS_OPTS = [12,24,30,60];
const RES_OPTS = { '480p':[854,480], '720p':[1280,720], '1080p':[1920,1080] };
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Number(n).toLocaleString(undefined,{maximumFractionDigits:2});

const state = {
  root:null, body:null, cleanup:null, langOff:null,
  fps:24, resKey:'720p', duration:5, playing:true,
  simTime:0, frameIndex:0, lastTs:0, raf:0,
  bitrate:8, calcDur:60,
  pipePhase:0, pipeTimer:0,
  buffer:null, bufferCtx:null
};

function dims(){ return RES_OPTS[state.resKey] || RES_OPTS['720p']; }
function totalFrames(){ return Math.max(1, Math.round(state.fps * state.duration)); }

function drawSim(){
  const c=state.body?.querySelector('[data-v-sim]'); if(!c) return;
  const [vw,vh]=dims();
  const dispW=520, dispH=Math.round(dispW*(vh/vw));
  c.style.width='100%'; c.style.maxWidth=dispW+'px'; c.style.aspectRatio=`${vw}/${vh}`;
  const dpr=window.devicePixelRatio||1;
  const w=Math.floor(c.clientWidth*dpr)||Math.floor(dispW*dpr);
  const h=Math.floor(w*(vh/vw));
  if(c.width!==w||c.height!==h){ c.width=w; c.height=h; }
  if(!state.buffer){ state.buffer=document.createElement('canvas'); state.bufferCtx=state.buffer.getContext('2d'); }
  const buf=state.buffer;
  if(buf.width!==vw||buf.height!==vh){ buf.width=vw; buf.height=vh; }
  const bx=state.bufferCtx;
  const g=bx.createLinearGradient(0,0,0,vh); g.addColorStop(0,'#071225'); g.addColorStop(1,'#0b1a33');
  bx.fillStyle=g; bx.fillRect(0,0,vw,vh);
  bx.strokeStyle='rgba(138,172,220,0.06)'; bx.lineWidth=Math.max(1,vw/480);
  for(let i=0;i<10;i++){ bx.beginPath(); bx.moveTo(i*vw/10,0); bx.lineTo(i*vw/10,vh); bx.stroke(); }
  const t = state.frameIndex / Math.max(1,state.fps); // quantized to frames
  const px = (0.08 + 0.84 * (0.5+0.5*Math.sin(t*1.6))) * vw;
  const py = (0.18 + 0.58 * (0.5+0.5*Math.sin(t*2.4 + 0.7))) * vh;
  const r = Math.max(10, vh*0.055);
  bx.globalAlpha=0.18;
  for(let k=3;k>=1;k--){ const tt=t - k*(1/60); const tx=(0.08 + 0.84 * (0.5+0.5*Math.sin(tt*1.6))) * vw; const ty=(0.18 + 0.58 * (0.5+0.5*Math.sin(tt*2.4 + 0.7))) * vh; bx.fillStyle='#4be3e0'; bx.beginPath(); bx.arc(tx,ty,r*0.85,0,Math.PI*2); bx.fill(); }
  bx.globalAlpha=1;
  const rg=bx.createRadialGradient(px-r*0.3,py-r*0.3,r*0.2,px,py,r);
  rg.addColorStop(0,'#d7ffff'); rg.addColorStop(0.35,'#4be3e0'); rg.addColorStop(1,'#167a8a');
  bx.fillStyle=rg; bx.beginPath(); bx.arc(px,py,r,0,Math.PI*2); bx.fill();
  bx.strokeStyle='rgba(255,255,255,0.35)'; bx.lineWidth=Math.max(1,vw/480); bx.stroke();
  bx.fillStyle='rgba(0,0,0,0.35)'; bx.fillRect(10,10,Math.max(120,vw*0.28),Math.max(22,vh*0.08));
  bx.fillStyle='#9fb6d1'; bx.font=`${Math.max(10,Math.floor(vh*0.045))}px monospace`;
  bx.fillText(`f:${state.frameIndex+1}/${totalFrames()}`, 16, 10+Math.max(16,vh*0.058));

  const ctx=c.getContext('2d');
  ctx.imageSmoothingEnabled = state.resKey==='1080p'; // lower res looks blockier when scaled
  ctx.clearRect(0,0,w,h);
  ctx.drawImage(buf,0,0,w,h);
}

function updateReadout(){
  if(!state.body) return;
  const set=(s,v)=>{ const el=state.body.querySelector(s); if(el) el.textContent=v; };
  set('[data-v-counter]', `${state.frameIndex+1} / ${totalFrames()}`);
  set('[data-v-fps-out]', `${state.fps}`);
  const [vw,vh]=dims(); set('[data-v-res-out]', `${state.resKey} (${vw}×${vh})`);
  set('[data-v-total]', `${totalFrames()}`);
  const btn=state.body.querySelector('[data-v-toggle]');
  if(btn){ btn.textContent = state.playing ? t('videoLab.sim.pause') : t('videoLab.sim.play'); btn.setAttribute('aria-pressed', state.playing?'true':'false'); }
}

function tick(ts){
  if(!state.playing || !state.root) return;
  if(!state.lastTs) state.lastTs=ts;
  const dt=Math.min(0.1,(ts-state.lastTs)/1000);
  state.lastTs=ts;
  state.simTime += dt;
  const frameDur=1/state.fps;
  const total=totalFrames();
  state.frameIndex = Math.floor(state.simTime / frameDur) % total;
  if(state.simTime >= state.duration){ state.simTime = state.simTime % Math.max(0.001,state.duration); }
  drawSim(); updateReadout();
  state.raf=requestAnimationFrame(tick);
}

function setPlaying(on){
  state.playing=!!on;
  if(state.playing){ state.lastTs=0; state.raf=requestAnimationFrame(tick); }
  else if(state.raf){ cancelAnimationFrame(state.raf); state.raf=0; }
  updateReadout();
}

function calcMarkup(){
  const br=Number(state.bitrate)||0, dur=Number(state.calcDur)||0;
  const bits = br * 1_000_000 * dur; // Mbps (decimal megabits) * seconds
  const bytes = bits/8;
  const mb = bytes/1_000_000;
  const mib = bytes/(1024*1024);
  return `
    <code>${t('videoLab.calc.formula',{br:fmt(br),dur:fmt(dur),bits:fmt(Math.round(bits)),mb:fmt(mb.toFixed(2)),mib:fmt(mib.toFixed(2))})}</code>
    <div class="vidlab__stats">
      <div><span>${t('videoLab.calc.bits')}</span><strong>${fmt(Math.round(bits))}</strong></div>
      <div><span>${t('videoLab.calc.mb')}</span><strong>${fmt(mb.toFixed(2))} MB</strong></div>
    </div>`;
}

function pipelineMarkup(){
  const steps=[
    ['frames','frames','📷'],['encoding','encoding','⚙️'],['compressed','compressed','🗜️'],['decoding','decoding','▶'],['screen','screen','🖥️']
  ];
  return `<div class="vidpipe" data-v-pipe>${steps.map((s,i)=>`${i?'<div class="vidpipe__arrow" aria-hidden="true">→</div>':''}<div class="vidpipe__step ${i===state.pipePhase?'is-active':''}" data-pipe-step="${i}"><span class="vidpipe__icon">${s[2]}</span><span class="vidpipe__label">${t('videoLab.pipe.'+s[1])}</span></div>`).join('')}</div>`;
}

function shell(){
  const [vw,vh]=dims();
  return `
  <div class="vidlab">
    <section class="vidlab__concepts">
      <h3>${t('videoLab.concepts.title')}</h3>
      <div class="vidlab__facts">
        ${['frames','fps','resolution','codecs','compression','audio','containers'].map(k=>`<div class="vidlab__fact"><strong>${t('videoLab.concepts.'+k+'.t')}</strong><span>${t('videoLab.concepts.'+k+'.b')}</span></div>`).join('')}
      </div>
    </section>

    <section class="vidlab__sim">
      <div class="vidlab__sim-head"><h3>${t('videoLab.sim.title')}</h3><p>${t('videoLab.sim.lead')}</p></div>
      <div class="vidlab__sim-layout">
        <div class="vidlab__controls">
          <label class="vidlab__field"><span>${t('videoLab.sim.fps')}</span><select data-v-fps>${FPS_OPTS.map(f=>`<option value="${f}" ${state.fps===f?'selected':''}>${f}</option>`).join('')}</select></label>
          <label class="vidlab__field"><span>${t('videoLab.sim.resolution')}</span><select data-v-res>${Object.keys(RES_OPTS).map(r=>{const d=RES_OPTS[r]; return `<option value="${r}" ${state.resKey===r?'selected':''}>${r} (${d[0]}×${d[1]})</option>`;}).join('')}</select></label>
          <label class="vidlab__field"><span>${t('videoLab.sim.duration')}</span><input type="range" min="1" max="15" step="1" value="${state.duration}" data-v-dur /><output data-v-dur-out>${state.duration}s</output></label>
          <div class="vidlab__btnrow">
            <button type="button" class="pxlab__btn is-active" data-v-toggle aria-pressed="true">${t('videoLab.sim.play')}</button>
            <button type="button" class="pxlab__btn" data-v-restart>${t('videoLab.sim.restart')}</button>
          </div>
          <div class="vidlab__readout" aria-live="polite">
            <div><span>${t('videoLab.sim.counter')}</span><strong data-v-counter>1 / ${totalFrames()}</strong></div>
            <div><span>${t('videoLab.sim.fps')}</span><strong data-v-fps-out>${state.fps}</strong></div>
            <div><span>${t('videoLab.sim.resolution')}</span><strong data-v-res-out>${state.resKey} (${vw}×${vh})</strong></div>
            <div><span>${t('videoLab.sim.framesTotal')}</span><strong data-v-total>${totalFrames()}</strong></div>
          </div>
          <p class="vidlab__note">${t('videoLab.sim.note')}</p>
        </div>
        <div class="vidlab__stage"><canvas data-v-sim class="vidlab__canvas" aria-label="${t('videoLab.sim.title')}"></canvas></div>
      </div>
    </section>

    <section class="vidlab__card">
      <h3>${t('videoLab.comp.title')}</h3>
      <div class="vidlab__facts" style="margin-top:12px">
        ${['intra','inter','key','motion'].map(k=>`<div class="vidlab__fact"><strong>${t('videoLab.comp.'+k+'.t')}</strong><span>${t('videoLab.comp.'+k+'.b')}</span></div>`).join('')}
      </div>
    </section>

    <div class="vidlab__bottom">
      <section class="vidlab__card">
        <h3>${t('videoLab.calc.title')}</h3>
        <p>${t('videoLab.calc.lead')}</p>
        <div class="pxlab__calc-form" style="margin-top:12px">
          <label class="vidlab__field"><span>${t('videoLab.calc.bitrate')}</span><input type="number" min="0.1" step="0.1" value="${esc(state.bitrate)}" data-v-br /></label>
          <label class="vidlab__field"><span>${t('videoLab.calc.duration')}</span><input type="number" min="1" step="1" value="${esc(state.calcDur)}" data-v-cd /></label>
        </div>
        <div class="pxlab__calc-result" data-v-calc style="margin-top:12px">${calcMarkup()}</div>
        <p class="vidlab__note">${t('videoLab.calc.note')}</p>
      </section>
      <section class="vidlab__card">
        <h3>${t('videoLab.pipe.title')}</h3>
        <div style="margin-top:14px">${pipelineMarkup()}</div>
        <p class="vidlab__note" style="margin-top:14px">${t('videoLab.pipe.cap')}</p>
      </section>
    </div>
  </div>`;
}

function bind(){
  if(!state.body) return;
  state.body.addEventListener('change', e=>{
    const el=e.target;
    if(el.matches('[data-v-fps]')){ state.fps=Number(el.value); state.frameIndex=0; state.simTime=0; updateReadout(); drawSim(); }
    if(el.matches('[data-v-res]')){ state.resKey=el.value; updateReadout(); drawSim(); }
  });
  state.body.addEventListener('input', e=>{
    const el=e.target;
    if(el.matches('[data-v-dur]')){ state.duration=Number(el.value); state.frameIndex=state.frameIndex%Math.max(1,totalFrames()); const o=state.body.querySelector('[data-v-dur-out]'); if(o) o.textContent=state.duration+'s'; updateReadout(); }
    if(el.matches('[data-v-br]')){ state.bitrate=el.value; const c=state.body.querySelector('[data-v-calc]'); if(c) c.innerHTML=calcMarkup(); }
    if(el.matches('[data-v-cd]')){ state.calcDur=el.value; const c=state.body.querySelector('[data-v-calc]'); if(c) c.innerHTML=calcMarkup(); }
  });
  state.body.addEventListener('click', e=>{
    if(e.target.closest('[data-v-toggle]')) setPlaying(!state.playing);
    if(e.target.closest('[data-v-restart]')){ state.simTime=0; state.frameIndex=0; state.lastTs=0; drawSim(); updateReadout(); }
  });
}

function startPipe(){
  stopPipe();
  state.pipeTimer=setInterval(()=>{ state.pipePhase=(state.pipePhase+1)%5; state.body?.querySelectorAll('[data-pipe-step]').forEach((el,i)=>el.classList.toggle('is-active',i===state.pipePhase)); }, 900);
}
function stopPipe(){ if(state.pipeTimer){ clearInterval(state.pipeTimer); state.pipeTimer=0; } }

function onVis(){ if(document.hidden) setPlaying(false); }
function onNav(e){ if(e.detail.view!=='video') setPlaying(false); }

export function initVideoLab(root){
  if(!(root instanceof HTMLElement)) return null;
  if(state.root===root) return { root, destroy: destroyVideoLab };
  destroyVideoLab();
  state.root=root; state.body=root.querySelector('.lab-frame__body'); if(!state.body) return null;
  root.classList.add('lab-frame--mounted','lab-frame--vidlab');
  root.dataset.moduleState='mounted';
  state.langOff=onLanguageChange(()=>{ const p=state.playing; setPlaying(false); render(); setPlaying(p); });
  render(); bind(); drawSim(); updateReadout(); startPipe(); setPlaying(true);
  document.addEventListener('visibilitychange', onVis);
  document.addEventListener('app:navigate', onNav);
  state.cleanup=()=>{ setPlaying(false); stopPipe(); state.langOff?.(); document.removeEventListener('visibilitychange',onVis); document.removeEventListener('app:navigate',onNav); };
  return { root, destroy: destroyVideoLab };
}
function render(){ if(!state.body) return; state.body.innerHTML=shell(); applyTranslations(state.body); }
export function destroyVideoLab(){
  state.cleanup?.(); state.cleanup=null;
  if(state.root){ state.root.classList.remove('lab-frame--mounted','lab-frame--vidlab'); state.root.dataset.moduleState='pending'; state.body?.replaceChildren(); }
  Object.assign(state,{root:null,body:null,cleanup:null,langOff:null,playing:false,lastTs:0,raf:0,pipeTimer:0,buffer:null,bufferCtx:null});
}
