


import { t, applyTranslations, onLanguageChange } from './translations.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';
const STEPS = 5;
const SPEEDS = [0.5, 1, 1.5, 2];
const BASE_STEP_MS = 5200;

const state = {
  root: null,
  body: null,
  embedded: false,
  cleanup: null,
  step: 0,
  playing: false,
  speed: 1,
  raf: 0,
  last: 0,
  elapsed: 0,
  langOff: null,
  particles: []
};

function speedMs() {
  return BASE_STEP_MS / state.speed;
}

function shellMarkup() {
  return `
    <div class="dataflow" aria-label="${t('followData.title')}">
      <div class="dataflow__top">
        <div class="dataflow__progress-wrap">
          <div class="dataflow__progress-head">
            <span class="dataflow__progress-label">${t('followData.controls.progress')}</span>
            <span class="dataflow__progress-value" data-df-progress>1 / ${STEPS}</span>
          </div>
          <div class="dataflow__progress" role="progressbar" aria-valuemin="1" aria-valuemax="${STEPS}" aria-valuenow="1" data-df-progressbar>
            <span class="dataflow__progress-fill" data-df-fill style="width:20%"></span>
          </div>
          <ol class="dataflow__stepper" aria-label="${t('followData.controls.progress')}">
            ${Array.from({ length: STEPS }, (_, i) => `<li><button type="button" class="dataflow__step-dot" data-df-step="${i}" aria-label="${t('followData.controls.step')} ${i + 1}" aria-current="${i === 0 ? 'step' : 'false'}"><span>${i + 1}</span><em>${t(`followData.steps.${i}.label`)}</em></button></li>`).join('')}
          </ol>
        </div>
        <p class="dataflow__caveat" role="note">${t('followData.caveat')}</p>
      </div>

      <div class="dataflow__board">
        <div class="dataflow__diagram">
          ${diagramMarkup()}
        </div>
        <aside class="dataflow__panel" data-df-panel aria-live="polite"></aside>
      </div>

      <div class="dataflow__controls" role="group" aria-label="${t('followData.controls.play')}">
        <button type="button" class="dataflow__btn dataflow__btn--primary" data-df-action="toggle" aria-pressed="false">
          <span class="dataflow__btn-icon" data-df-toggle-icon aria-hidden="true">▶</span>
          <span data-df-toggle-label>${t('followData.controls.play')}</span>
        </button>
        <button type="button" class="dataflow__btn" data-df-action="prev">${t('followData.controls.previous')}</button>
        <button type="button" class="dataflow__btn" data-df-action="next">${t('followData.controls.next')}</button>
        <button type="button" class="dataflow__btn" data-df-action="restart">${t('followData.controls.restart')}</button>
        <label class="dataflow__speed">
          <span>${t('followData.controls.speed')}</span>
          <select data-df-speed aria-label="${t('followData.controls.speed')}">
            ${SPEEDS.map((s) => `<option value="${s}"${s === 1 ? ' selected' : ''}>${s}×</option>`).join('')}
          </select>
        </label>
      </div>
    </div>`;
}

function diagramMarkup() {
  return `
  <svg class="dataflow__svg" viewBox="0 0 980 360" preserveAspectRatio="xMidYMid meet" focusable="false" role="img" aria-label="${t('followData.title')}">
    <defs>
      <linearGradient id="df-path" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="var(--cyan)" stop-opacity="0.1"></stop>
        <stop offset="0.5" stop-color="var(--blue)" stop-opacity="0.22"></stop>
        <stop offset="1" stop-color="var(--green)" stop-opacity="0.16"></stop>
      </linearGradient>
      <filter id="df-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="b"></feGaussianBlur>
        <feMerge><feMergeNode in="b"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
      </filter>
    </defs>

    <path id="df-link-0" class="dataflow__link" data-df-link="0" d="M148 180 C190 180, 215 180, 255 180"></path>
    <path id="df-link-1" class="dataflow__link" data-df-link="1" d="M425 180 C468 180, 500 180, 545 180"></path>
    <path id="df-link-2" class="dataflow__link" data-df-link="2" d="M715 180 C758 180, 792 180, 835 180"></path>
    <g class="dataflow__particles" data-df-particles></g>

    <!-- Keyboard -->
    <g class="dataflow__node" data-df-node="0" transform="translate(18,84)">
      <rect class="dataflow__node-bg" x="0" y="0" width="130" height="192" rx="10"></rect>
      <rect class="dataflow__key" x="18" y="26" width="94" height="72" rx="8"></rect>
      <text class="dataflow__key-char" x="65" y="74" text-anchor="middle">A</text>
      <g class="dataflow__keys-mini" opacity="0.55">
        <rect x="18" y="110" width="26" height="18" rx="3"></rect><rect x="50" y="110" width="26" height="18" rx="3"></rect><rect x="82" y="110" width="30" height="18" rx="3"></rect>
        <rect x="18" y="134" width="38" height="18" rx="3"></rect><rect x="62" y="134" width="50" height="18" rx="3"></rect>
      </g>
      <text class="dataflow__node-label" x="65" y="176" text-anchor="middle">${t('followData.diagram.keyboard')}</text>
    </g>

    <!-- Processing / Memory -->
    <g class="dataflow__node" data-df-node="1" transform="translate(255,64)">
      <rect class="dataflow__node-bg dataflow__node-bg--wide" x="0" y="0" width="170" height="232" rx="10"></rect>
      <rect class="dataflow__sub" x="16" y="18" width="138" height="78" rx="6"></rect>
      <text class="dataflow__sub-k" x="85" y="42" text-anchor="middle">01000001</text>
      <text class="dataflow__sub-s" x="85" y="60" text-anchor="middle">ASCII 65</text>
      <text class="dataflow__sub-s dataflow__sub-s--dim" x="85" y="78" text-anchor="middle">A</text>
      <rect class="dataflow__sub dataflow__sub--ram" x="16" y="106" width="138" height="44" rx="6"></rect>
      <text class="dataflow__sub-k" x="85" y="132" text-anchor="middle">RAM</text>
      <rect class="dataflow__sub dataflow__sub--cpu" x="16" y="158" width="138" height="44" rx="6"></rect>
      <text class="dataflow__sub-s dataflow__cpu-cycle" x="85" y="184" text-anchor="middle" data-df-cycle>${t('followData.steps.3.detail')}</text>
      <text class="dataflow__node-label" x="85" y="220" text-anchor="middle">${t('followData.diagram.processing')}</text>
    </g>

    <!-- Graphics -->
    <g class="dataflow__node" data-df-node="2" transform="translate(545,84)">
      <rect class="dataflow__node-bg" x="0" y="0" width="170" height="192" rx="10"></rect>
      <rect class="dataflow__sub dataflow__sub--gpu" x="16" y="22" width="138" height="58" rx="6"></rect>
      <text class="dataflow__sub-k" x="85" y="56" text-anchor="middle">GPU / Display</text>
      <g class="dataflow__pixels" data-df-pixels transform="translate(43,96)">
        ${pixelGrid()}
      </g>
      <text class="dataflow__node-label" x="85" y="176" text-anchor="middle">${t('followData.diagram.graphics')}</text>
    </g>

    <!-- Monitor -->
    <g class="dataflow__node" data-df-node="3" transform="translate(835,78)">
      <rect class="dataflow__node-bg" x="0" y="0" width="127" height="204" rx="10"></rect>
      <rect class="dataflow__monitor" x="14" y="18" width="99" height="108" rx="6"></rect>
      <text class="dataflow__monitor-char" x="63" y="88" text-anchor="middle" data-df-monitor>A</text>
      <rect class="dataflow__stand" x="50" y="126" width="26" height="18" rx="2"></rect>
      <rect class="dataflow__stand" x="34" y="142" width="58" height="6" rx="2"></rect>
      <text class="dataflow__node-label" x="63" y="186" text-anchor="middle">${t('followData.diagram.monitor')}</text>
    </g>

    <text class="dataflow__signal-label" x="490" y="348" text-anchor="middle">${t('followData.diagram.signal')}</text>
  </svg>`;
}

function pixelGrid() {
  const rows = [
    '00100',
    '01010',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001'
  ];
  let out = '';
  rows.forEach((r, y) => {
    [...r].forEach((c, x) => {
      out += `<rect class="dataflow__px${c === '1' ? ' is-on' : ''}" data-df-px="${y}-${x}" x="${x * 17}" y="${y * 9}" width="14" height="7" rx="1.5"></rect>`;
    });
  });
  return out;
}

function panelMarkup(step) {
  return `
    <div class="dataflow__panel-inner" data-tone="${step}">
      <span class="dataflow__panel-step">${t('followData.controls.step')} ${step + 1} / ${STEPS}</span>
      <h2 class="dataflow__panel-title">${t(`followData.steps.${step}.title`)}</h2>
      <p class="dataflow__panel-body">${t(`followData.steps.${step}.body`)}</p>
      <div class="dataflow__panel-detail"><code>${t(`followData.steps.${step}.detail`)}</code></div>
    </div>`;
}

function clearParticles() {
  state.particles.forEach((p) => p.remove());
  state.particles = [];
  const layer = state.body?.querySelector('[data-df-particles]');
  layer?.replaceChildren();
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function spawnParticles() {
  if (prefersReducedMotion() || !state.body) return;
  clearParticles();
  const layer = state.body.querySelector('[data-df-particles]');
  if (!layer) return;
  const active = Math.max(0, state.step - 1);
  for (let link = 0; link <= active && link < 3; link += 1) {
    for (let i = 0; i < 3; i += 1) {
      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', `dataflow__particle dataflow__particle--${link}`);
      const halo = document.createElementNS(SVG_NS, 'circle');
      halo.setAttribute('r', '7');
      halo.setAttribute('class', 'dataflow__particle-halo');
      const core = document.createElementNS(SVG_NS, 'circle');
      core.setAttribute('r', '2.6');
      core.setAttribute('class', 'dataflow__particle-core');
      const motion = document.createElementNS(SVG_NS, 'animateMotion');
      motion.setAttribute('dur', `${(2.4 - link * 0.15) / state.speed}s`);
      motion.setAttribute('repeatCount', 'indefinite');
      motion.setAttribute('begin', `${(-i * 0.8) / state.speed}s`);
      const mpath = document.createElementNS(SVG_NS, 'mpath');
      mpath.setAttribute('href', `#df-link-${link}`);
      mpath.setAttributeNS(XLINK_NS, 'xlink:href', `#df-link-${link}`);
      motion.append(mpath);
      g.append(halo, core, motion);
      layer.append(g);
      state.particles.push(g);
    }
  }
}

function render() {
  if (!state.body) return;
  const panel = state.body.querySelector('[data-df-panel]');
  if (panel) panel.innerHTML = panelMarkup(state.step);

  state.body.querySelectorAll('[data-df-node]').forEach((n) => {
    const idx = Number(n.dataset.dfNode);
    n.classList.toggle('is-active', idx === state.step || (state.step >= 2 && idx === 1) || (state.step >= 3 && idx === 2));
    n.classList.toggle('is-current', idx === Math.min(state.step, 3));
    n.classList.toggle('is-done', idx < state.step && idx !== 1 && idx !== 2);
  });
  state.body.querySelectorAll('[data-df-link]').forEach((l) => {
    const idx = Number(l.dataset.dfLink);
    l.classList.toggle('is-live', idx < state.step);
    l.classList.toggle('is-current', idx === state.step - 1);
  });
  state.body.querySelectorAll('[data-df-step]').forEach((b) => {
    const idx = Number(b.dataset.dfStep);
    b.setAttribute('aria-current', idx === state.step ? 'step' : 'false');
    b.classList.toggle('is-done', idx < state.step);
  });

  const progress = `${state.step + 1} / ${STEPS}`;
  const pv = state.body.querySelector('[data-df-progress]');
  if (pv) pv.textContent = progress;
  const bar = state.body.querySelector('[data-df-progressbar]');
  if (bar) bar.setAttribute('aria-valuenow', String(state.step + 1));
  const fill = state.body.querySelector('[data-df-fill]');
  if (fill) fill.style.width = `${((state.step + 1) / STEPS) * 100}%`;

  const prev = state.body.querySelector('[data-df-action="prev"]');
  const next = state.body.querySelector('[data-df-action="next"]');
  if (prev) prev.disabled = state.step === 0;
  if (next) next.disabled = state.step === STEPS - 1;

  const monitor = state.body.querySelector('[data-df-monitor]');
  if (monitor) monitor.classList.toggle('is-visible', state.step >= 4);
  state.body.querySelectorAll('[data-df-px]').forEach((px) => {
    px.classList.toggle('is-visible', state.step >= 4 && px.classList.contains('is-on'));
  });
  const cycle = state.body.querySelector('[data-df-cycle]');
  if (cycle) cycle.textContent = t('followData.steps.3.detail');

  spawnParticles();
}

function setPlaying(on) {
  state.playing = Boolean(on) && state.step < STEPS - 1;
  if (state.playing) {
    state.last = 0;
    state.raf = requestAnimationFrame(tick);
  } else if (state.raf) {
    cancelAnimationFrame(state.raf);
    state.raf = 0;
  }
  const btn = state.body?.querySelector('[data-df-action="toggle"]');
  const icon = state.body?.querySelector('[data-df-toggle-icon]');
  const label = state.body?.querySelector('[data-df-toggle-label]');
  if (btn) btn.setAttribute('aria-pressed', String(state.playing));
  if (icon) icon.textContent = state.playing ? '❚❚' : '▶';
  if (label) label.textContent = state.playing ? t('followData.controls.pause') : t('followData.controls.play');
}

function goTo(step, opts = {}) {
  const next = Math.max(0, Math.min(STEPS - 1, step));
  if (next === state.step && !opts.force) return;
  state.step = next;
  state.elapsed = 0;
  render();
  if (state.step >= STEPS - 1) setPlaying(false);
}

function tick(ts) {
  if (!state.playing) return;
  if (!state.last) state.last = ts;
  state.elapsed += ts - state.last;
  state.last = ts;
  if (state.elapsed >= speedMs()) {
    state.elapsed = 0;
    if (state.step < STEPS - 1) {
      state.step += 1;
      render();
    }
    if (state.step >= STEPS - 1) { setPlaying(false); return; }
  }
  state.raf = requestAnimationFrame(tick);
}

function onAction(e) {
  const action = e.target.closest('[data-df-action]')?.dataset.dfAction;
  if (!action) {
    const dot = e.target.closest('[data-df-step]');
    if (dot) { setPlaying(false); goTo(Number(dot.dataset.dfStep)); }
    return;
  }
  if (action === 'toggle') setPlaying(!state.playing);
  else if (action === 'next') { setPlaying(false); goTo(state.step + 1); }
  else if (action === 'prev') { setPlaying(false); goTo(state.step - 1); }
  else if (action === 'restart') { setPlaying(false); goTo(0, { force: true }); }
}

function onSpeed(e) {
  const sel = e.target.closest('[data-df-speed]');
  if (!sel) return;
  state.speed = Number(sel.value) || 1;
  state.elapsed = 0;
  if (state.playing) spawnParticles();
}

function onVisibility() {
  if (document.hidden) setPlaying(false);
}

function onNavigate(e) {
  if (e.detail.view !== 'circulation' && e.detail.view !== 'binaire') setPlaying(false);
}

export function initFollowDataLab(root, opts = {}) {
  if (!(root instanceof HTMLElement)) return null;
  const embedded = Boolean(opts.embedded);

  if (state.root) destroyFollowDataLab();

  state.root = root;
  state.embedded = embedded;
  state.body = (opts.body instanceof HTMLElement) ? opts.body : root.querySelector('.lab-frame__body');
  if (!state.body) return null;

  root.classList.add('follow-data-host');
  if (!embedded) {
    root.classList.add('lab-frame--mounted', 'lab-frame--dataflow');
    root.dataset.moduleState = 'mounted';
  }

  state.body.innerHTML = shellMarkup();
  applyTranslations(state.body);

  state.body.addEventListener('click', onAction);
  state.body.addEventListener('change', onSpeed);
  document.addEventListener('visibilitychange', onVisibility);
  document.addEventListener('app:navigate', onNavigate);
  state.langOff = onLanguageChange(() => {
    if (!state.body) return;
    const playing = state.playing;
    setPlaying(false);
    state.body.innerHTML = shellMarkup();
    applyTranslations(state.body);
    render();
    if (playing) setPlaying(true);
  });

  goTo(0, { force: true });
  state.cleanup = () => {
    setPlaying(false);
    clearParticles();
    state.body?.removeEventListener('click', onAction);
    state.body?.removeEventListener('change', onSpeed);
    document.removeEventListener('visibilitychange', onVisibility);
    document.removeEventListener('app:navigate', onNavigate);
    state.langOff?.();
    state.langOff = null;
  };
  return { root, destroy: destroyFollowDataLab };
}

export function destroyFollowDataLab() {
  const { root, embedded, body } = state;
  state.cleanup?.();
  state.cleanup = null;

  if (root) {
    root.classList.remove('follow-data-host');
    if (!embedded) {
      root.classList.remove('lab-frame--mounted', 'lab-frame--dataflow');
      if (root.dataset && root.dataset.moduleState === 'mounted') root.dataset.moduleState = 'pending';
      body?.replaceChildren();
    }
  }
  Object.assign(state, { root: null, body: null, embedded: false, step: 0, playing: false, speed: 1, raf: 0, last: 0, elapsed: 0, langOff: null, particles: [] });
}
