

import { t, applyTranslations, onLanguageChange } from './translations.js';

const SVG = 'http://www.w3.org/2000/svg';
const XLINK = 'http://www.w3.org/1999/xlink';
const HOPS = ['computer','router1','internet','server','router2','computer2'];
const BASE_MS = 5200;
const SPEEDS = [0.75, 1, 1.5, 2];
const CLIENT_IP = '192.0.2.10';
const SERVER_IP = '198.51.100.20';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const state = {
  root:null, body:null, cleanup:null, langOff:null,
  step:0, playing:true, speed:1, elapsed:0, last:0, raf:0,
  selectedPacket:null
};

function stepMs(){ return BASE_MS / state.speed; }

function packetsForStep(step){
  const req = [
    {id:1, n:1, src:CLIENT_IP, dst:SERVER_IP, sport:51432, dport:443, payload:'req', phase:'request', path:'p_req1', hop:0},
    {id:2, n:2, src:CLIENT_IP, dst:SERVER_IP, sport:51432, dport:443, payload:'req', phase:'request', path:'p_req2', hop:1},
    {id:3, n:3, src:CLIENT_IP, dst:SERVER_IP, sport:51432, dport:443, payload:'req', phase:'request', path:'p_req3', hop:2},
  ];
  const res = [
    {id:4, n:1, src:SERVER_IP, dst:CLIENT_IP, sport:443, dport:51432, payload:'res', phase:'response', path:'p_res1', hop:3},
    {id:5, n:2, src:SERVER_IP, dst:CLIENT_IP, sport:443, dport:51432, payload:'res', phase:'response', path:'p_res2', hop:4},
    {id:6, n:3, src:SERVER_IP, dst:CLIENT_IP, sport:443, dport:51432, payload:'res', phase:'response', path:'p_res3', hop:5},
  ];
  return step < 3 ? req : res;
}
function allPackets(){ return [...packetsForStep(0), ...packetsForStep(3)]; }

function diagram(){
  const W=980, H=360;
  const nodes = [
    {k:'computer',  x:40,  y:150, w:120, h:80,  c:'cyan',   label:'Computer',  ip:CLIENT_IP},
    {k:'router1',   x:210, y:155, w:110, h:70,  c:'blue',   label:'Router',    ip:'192.0.2.1'},
    {k:'internet',  x:390, y:120, w:200, h:130, c:'purple', label:'Internet',  ip:'(networks)'},
    {k:'server',    x:660, y:150, w:120, h:80,  c:'green',  label:'Server',    ip:SERVER_IP},
  ];
  const paths = [
    {id:'p_req1', d:'M160,190 C185,190 185,190 210,190'},
    {id:'p_req2', d:'M320,190 C355,190 355,185 390,185'},
    {id:'p_req3', d:'M590,185 C625,185 625,190 660,190'},
    {id:'p_res1', d:'M660,210 C625,210 625,215 590,215'},
    {id:'p_res2', d:'M390,215 C355,215 355,210 320,210'},
    {id:'p_res3', d:'M210,210 C185,210 185,210 160,210'},
  ];
  const activePath = {0:'p_req1',1:'p_req2',2:'p_req3',3:'p_res1',4:'p_res2',5:'p_res3'}[state.step];
  const activeNodes = new Set(({
    0:['computer','router1'],1:['router1','internet'],2:['internet','server'],
    3:['server','internet'],4:['internet','router1'],5:['router1','computer']
  })[state.step]||[]);
  return `<svg class="net__svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-label="${t('netLab.diagramLabel')}">
    <defs>
      <filter id="net-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="net-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="rgba(138,172,220,0.5)"/></marker>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="rgba(6,12,24,0.35)" />
    ${paths.map(p=>`<path id="${p.id}" d="${p.d}" class="net__path${p.id===activePath?' is-live':''}" marker-end="url(#net-arrow)" />`).join('')}
    <g class="net__packets" data-net-packets></g>
    ${nodes.map(n=>{
      const a=activeNodes.has(n.k)?' is-active':'';
      return `<g class="net__node net__node--${n.c}${a}" data-net-node="${n.k}" tabindex="0" role="button" aria-label="${t('netLab.nodes.'+n.k)}">
        <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="12" />
        <text x="${n.x+n.w/2}" y="${n.y+34}" text-anchor="middle" class="net__node-title">${n.label}</text>
        <text x="${n.x+n.w/2}" y="${n.y+54}" text-anchor="middle" class="net__node-ip">${n.ip}</text>
      </g>`;
    }).join('')}
    <text x="${W/2}" y="332" text-anchor="middle" class="net__caption">${t('netLab.flowCaption')}</text>
  </svg>`;
}

function packetInspector(p){
  if(!p) return `<p class="net__inspect-empty">${t('netLab.inspect.empty')}</p>`;
  return `<div class="net__inspect-card">
    <h4>${t('netLab.inspect.title')} #${p.n} \u2014 ${t('netLab.inspect.'+p.phase)}</h4>
    <dl class="net__dl">
      <div><dt>${t('netLab.inspect.src')}</dt><dd><code>${p.src}</code></dd></div>
      <div><dt>${t('netLab.inspect.dst')}</dt><dd><code>${p.dst}</code></dd></div>
      <div><dt>${t('netLab.inspect.num')}</dt><dd>${p.n}</dd></div>
      <div><dt>${t('netLab.inspect.dport')}</dt><dd>${p.dport} <span class="net__hint">(${p.dport===443?'HTTPS':''})</span></dd></div>
      <div class="net__dl-wide"><dt>${t('netLab.inspect.payload')}</dt><dd>${t('netLab.inspect.payloadText.'+p.payload)}</dd></div>
    </dl>
  </div>`;
}

function shell(){
  const pkts = packetsForStep(state.step);
  return `
  <div class="net">
    <section class="net__intro">
      <h3>${t('netLab.concepts.title')}</h3>
      <p>${t('netLab.intro')}</p>
      <div class="vidlab__facts" style="margin-top:12px">
        ${['packets','ip','routers','nic','cs','transmission'].map(k=>`<div class="vidlab__fact"><strong>${t('netLab.concepts.'+k+'.t')}</strong><span>${t('netLab.concepts.'+k+'.b')}</span></div>`).join('')}
      </div>
    </section>
    <section class="net__sim">
      <div class="iexp__toolbar" role="group" aria-label="${t('netLab.controls.label')}">
        <button type="button" class="pxlab__btn is-active" data-net-action="toggle" aria-pressed="true">${t('netLab.controls.pause')}</button>
        <button type="button" class="pxlab__btn" data-net-action="next">${t('netLab.controls.next')}</button>
        <button type="button" class="pxlab__btn" data-net-action="restart">${t('netLab.controls.restart')}</button>
        <label class="iexp__speed"><span>${t('netLab.controls.speed')}</span><select data-net-speed>${SPEEDS.map(s=>`<option value="${s}" ${s===1?'selected':''}>${s}\u00d7</option>`).join('')}</select></label>
      </div>
      <div class="net__diagram-wrap" data-net-diagram>${diagram()}</div>
      <div class="net__packet-bar" aria-label="${t('netLab.inspect.pick')}">
        <span class="net__bar-label">${t('netLab.inspect.pick')}</span>
        <div class="net__pkt-btns" data-net-pktbtns>${pkts.map(p=>`<button type="button" class="net__pkt${state.selectedPacket&&state.selectedPacket.id===p.id?' is-selected':''}" data-net-packet="${p.id}"><span class="net__pkt-dot ${p.phase==='request'?'is-req':'is-res'}"></span>${t('netLab.inspect.packet')} ${p.n} (${p.phase==='request'?t('netLab.inspect.request'):t('netLab.inspect.response')})</button>`).join('')}</div>
      </div>
      <div class="net__inspect" data-net-inspect aria-live="polite">${packetInspector(state.selectedPacket)}</div>
      <p class="net__disclaimer" role="note">${t('netLab.disclaimer')}</p>
    </section>
  </div>`;
}

function syncPackets(){
  if(!state.body) return;
  const layer = state.body.querySelector('[data-net-packets]');
  const svg = state.body.querySelector('.net__svg');
  if(!layer||!svg) return;
  layer.replaceChildren();
  const pkts = packetsForStep(state.step);
  const activeId = {0:'p_req1',1:'p_req2',2:'p_req3',3:'p_res1',4:'p_res2',5:'p_res3'}[state.step];
  pkts.forEach((p,i)=>{
    const isActive = p.path === activeId;
    const g=document.createElementNS(SVG,'g');
    g.setAttribute('class','net__packet'+(isActive?' is-active':'')+(state.selectedPacket&&state.selectedPacket.id===p.id?' is-selected':''));
    g.setAttribute('data-net-packet', p.id);
    g.style.cursor='pointer';
    const rect=document.createElementNS(SVG,'rect'); rect.setAttribute('width','34'); rect.setAttribute('height','20'); rect.setAttribute('rx','6'); rect.setAttribute('x','-17'); rect.setAttribute('y','-10');
    const txt=document.createElementNS(SVG,'text'); txt.setAttribute('text-anchor','middle'); txt.setAttribute('dominant-baseline','middle'); txt.setAttribute('y','1'); txt.textContent='P'+p.n;
    if(isActive){
      const am=document.createElementNS(SVG,'animateMotion'); am.setAttribute('dur',(2.2/state.speed)+'s'); am.setAttribute('repeatCount','indefinite');
      const mp=document.createElementNS(SVG,'mpath'); mp.setAttributeNS(XLINK,'href','#'+p.path); am.appendChild(mp); g.appendChild(am);
    } else {
      const path=svg.querySelector('#'+p.path);
      if(path){ const len=path.getTotalLength(); const pt=path.getPointAtLength(len*0.15); g.setAttribute('transform',`translate(${pt.x},${pt.y})`); }
    }
    g.appendChild(rect); g.appendChild(txt);
    g.addEventListener('click', (e)=>{ e.stopPropagation(); state.selectedPacket=p; renderDynamic(); });
    layer.appendChild(g);
  });
}

function renderDynamic(){
  if(!state.body) return;
  const dw = state.body.querySelector('[data-net-diagram]'); if(dw){ dw.innerHTML=diagram(); applyTranslations(dw); }
  syncPackets();
  const insp = state.body.querySelector('[data-net-inspect]'); if(insp){ insp.innerHTML=packetInspector(state.selectedPacket); applyTranslations(insp); }
  const pkts = packetsForStep(state.step);
  const bar = state.body.querySelector('[data-net-pktbtns]');
  if(bar){ bar.innerHTML = pkts.map(p=>`<button type="button" class="net__pkt${state.selectedPacket&&state.selectedPacket.id===p.id?' is-selected':''}" data-net-packet="${p.id}"><span class="net__pkt-dot ${p.phase==='request'?'is-req':'is-res'}"></span>${t('netLab.inspect.packet')} ${p.n} (${p.phase==='request'?t('netLab.inspect.request'):t('netLab.inspect.response')})</button>`).join(''); }
  const btn=state.body.querySelector('[data-net-action="toggle"]');
  if(btn){ btn.textContent=state.playing?t('netLab.controls.pause'):t('netLab.controls.play'); btn.setAttribute('aria-pressed',state.playing?'true':'false'); btn.classList.toggle('is-active',state.playing); }
}

function goStep(i,reset=true){ state.step=((i%6)+6)%6; if(reset) state.elapsed=0; state.selectedPacket=null; renderDynamic(); }
function tick(ts){
  if(!state.playing||!state.root) return;
  if(!state.last) state.last=ts;
  const dt=Math.min(0.12,(ts-state.last)/1000); state.last=ts; state.elapsed+=dt;
  if(state.elapsed>=stepMs()/1000){ state.elapsed=0; state.step=(state.step+1)%6; state.selectedPacket=null; renderDynamic(); }
  state.raf=requestAnimationFrame(tick);
}
function setPlaying(on){
  state.playing=!!on;
  if(state.playing){ state.last=0; state.raf=requestAnimationFrame(tick); }
  else if(state.raf){ cancelAnimationFrame(state.raf); state.raf=0; }
  renderDynamic();
}
function bind(){
  if(!state.body) return;
  state.body.addEventListener('click', e=>{
    const a=e.target.closest('[data-net-action]')?.dataset.netAction;
    if(a==='toggle') setPlaying(!state.playing);
    if(a==='next'){ setPlaying(false); goStep(state.step+1); }
    if(a==='restart') goStep(0);
    const pb=e.target.closest('[data-net-packet]');
    if(pb){ const id=Number(pb.dataset.netPacket); const found=allPackets().find(x=>x.id===id); if(found){ state.selectedPacket=found; renderDynamic(); } }
  });
  state.body.addEventListener('change', e=>{ if(e.target.matches('[data-net-speed]')){ state.speed=Number(e.target.value); renderDynamic(); }});
  state.body.addEventListener('keydown', e=>{ if((e.key==='Enter'||e.key===' ')&&e.target.closest('[data-net-node],[data-net-packet]')){ e.preventDefault(); e.target.click(); }});
}
function onVis(){ if(document.hidden) setPlaying(false); }
function onNav(e){ if(e.detail.view!=='network') setPlaying(false); }

export function initNetworkLab(root){
  if(!(root instanceof HTMLElement)) return null;
  if(state.root===root) return { root, destroy: destroyNetworkLab };
  destroyNetworkLab();
  state.root=root; state.body=root.querySelector('.lab-frame__body'); if(!state.body) return null;
  root.classList.add('lab-frame--mounted','lab-frame--net');
  root.dataset.moduleState='mounted';
  state.langOff=onLanguageChange(()=>{ const p=state.playing; setPlaying(false); state.body.innerHTML=shell(); applyTranslations(state.body); bind(); renderDynamic(); setPlaying(p); });
  state.body.innerHTML=shell(); applyTranslations(state.body); bind(); renderDynamic(); setPlaying(true);
  document.addEventListener('visibilitychange', onVis);
  document.addEventListener('app:navigate', onNav);
  state.cleanup=()=>{ setPlaying(false); state.langOff?.(); document.removeEventListener('visibilitychange',onVis); document.removeEventListener('app:navigate',onNav); };
  return { root, destroy: destroyNetworkLab };
}
export function destroyNetworkLab(){
  state.cleanup?.(); state.cleanup=null;
  if(state.root){ state.root.classList.remove('lab-frame--mounted','lab-frame--net'); state.root.dataset.moduleState='pending'; state.body?.replaceChildren(); }
  Object.assign(state,{root:null,body:null,cleanup:null,langOff:null,playing:false,last:0,elapsed:0,raf:0,step:0,selectedPacket:null});
}
