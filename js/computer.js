


import { t, applyTranslations, onLanguageChange } from './translations.js';
import { boardMarkup } from './computer-board.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';
const CYCLE_STEPS = ['fetch', 'decode', 'execute'];

const PARTS = [
  {
    id: 'cpu',
    num: '01',
    tone: 'cyan',
    related: ['ram', 'gpu', 'motherboard', 'power'],
    nameKey: 'computer.parts.cpu.name',
    chipKey: 'computer.parts.cpu.chip',
    taglineKey: 'computer.parts.cpu.tagline',
    roleKey: 'computer.parts.cpu.role',
    commKey: 'computer.parts.cpu.comm',
    exampleKey: 'computer.parts.cpu.example',
    cpu: true
  },
  {
    id: 'ram',
    num: '02',
    tone: 'blue',
    related: ['cpu', 'motherboard', 'storage'],
    nameKey: 'computer.parts.ram.name',
    chipKey: 'computer.parts.ram.chip',
    taglineKey: 'computer.parts.ram.tagline',
    roleKey: 'computer.parts.ram.role',
    commKey: 'computer.parts.ram.comm',
    exampleKey: 'computer.parts.ram.example',
    noteKey: 'computer.parts.ram.note'
  },
  {
    id: 'gpu',
    num: '03',
    tone: 'purple',
    related: ['cpu', 'motherboard', 'io', 'power'],
    nameKey: 'computer.parts.gpu.name',
    chipKey: 'computer.parts.gpu.chip',
    taglineKey: 'computer.parts.gpu.tagline',
    roleKey: 'computer.parts.gpu.role',
    commKey: 'computer.parts.gpu.comm',
    exampleKey: 'computer.parts.gpu.example'
  },
  {
    id: 'storage',
    num: '04',
    tone: 'green',
    related: ['motherboard', 'ram', 'cpu'],
    nameKey: 'computer.parts.storage.name',
    chipKey: 'computer.parts.storage.chip',
    taglineKey: 'computer.parts.storage.tagline',
    roleKey: 'computer.parts.storage.role',
    commKey: 'computer.parts.storage.comm',
    exampleKey: 'computer.parts.storage.example',
    noteKey: 'computer.parts.storage.note'
  },
  {
    id: 'motherboard',
    num: '05',
    tone: 'neutral',
    related: ['cpu', 'ram', 'gpu', 'storage', 'power', 'io'],
    nameKey: 'computer.parts.motherboard.name',
    chipKey: 'computer.parts.motherboard.chip',
    taglineKey: 'computer.parts.motherboard.tagline',
    roleKey: 'computer.parts.motherboard.role',
    commKey: 'computer.parts.motherboard.comm',
    exampleKey: 'computer.parts.motherboard.example',
    allLinks: true
  },
  {
    id: 'power',
    num: '06',
    tone: 'amber',
    related: ['motherboard', 'cpu', 'gpu', 'storage'],
    nameKey: 'computer.parts.power.name',
    chipKey: 'computer.parts.power.chip',
    taglineKey: 'computer.parts.power.tagline',
    roleKey: 'computer.parts.power.role',
    commKey: 'computer.parts.power.comm',
    exampleKey: 'computer.parts.power.example'
  },
  {
    id: 'io',
    num: '07',
    tone: 'cyan',
    related: ['motherboard', 'cpu', 'gpu'],
    nameKey: 'computer.parts.io.name',
    chipKey: 'computer.parts.io.chip',
    taglineKey: 'computer.parts.io.tagline',
    roleKey: 'computer.parts.io.role',
    commKey: 'computer.parts.io.comm',
    exampleKey: 'computer.parts.io.example'
  }
];

const PART_BY_ID = new Map(PARTS.map((part) => [part.id, part]));

// Physical connectors and signal paths are shown separately so students can
// distinguish electrical power from data/video communication.
const CONNECTION_DETAILS = {
  cpu: [
    ['Carte mère — socket CPU', 'Le processeur est installé dans le socket de la carte mère.'],
    ['Alimentation — EPS 4/8 broches', 'Un câble dédié apporte l’énergie au processeur via la carte mère.'],
    ['RAM — canaux mémoire', 'Le CPU échange rapidement les données avec la mémoire vive.'],
    ['GPU — PCI Express', 'Le processeur transmet des tâches graphiques à la carte graphique.']
  ],
  ram: [
    ['Carte mère — slots DIMM', 'Les barrettes s’insèrent dans les emplacements mémoire.'],
    ['CPU — contrôleur mémoire', 'Le processeur lit et écrit les données en RAM.'],
    ['Alimentation — via la carte mère', 'La carte mère fournit les tensions nécessaires à la RAM.']
  ],
  gpu: [
    ['Carte mère — PCI Express x16', 'La carte graphique s’installe dans le long port PCIe. Il transporte les données et une partie de son alimentation.'],
    ['Alimentation — PCIe 6/8 broches ou 12VHPWR', 'Selon le modèle, un ou plusieurs câbles dédiés fournissent l’énergie supplémentaire au GPU.'],
    ['Écran — HDMI ou DisplayPort', 'Les prises vidéo se trouvent généralement sur l’équerre arrière de la carte graphique.'],
    ['CPU et RAM — données graphiques', 'Le CPU prépare les commandes et la RAM stocke les données utilisées par le système.']
  ],
  storage: [
    ['Carte mère — M.2 NVMe ou SATA', 'Un SSD M.2 NVMe utilise PCIe ; un SSD/HDD SATA utilise un câble de données SATA.'],
    ['Alimentation — SATA Power', 'Les SSD/HDD SATA reçoivent leur énergie par un connecteur SATA Power.'],
    ['RAM et CPU — chargement', 'Les fichiers sont chargés en mémoire vive avant leur traitement.']
  ],
  motherboard: [
    ['Alimentation — ATX 24 broches', 'Le grand connecteur ATX alimente la carte mère.'],
    ['CPU — socket et EPS', 'Le socket accueille le processeur ; le connecteur EPS apporte son alimentation.'],
    ['RAM — slots DIMM', 'Les barrettes mémoire se branchent directement sur la carte mère.'],
    ['GPU — PCI Express x16', 'Le port PCIe relie la carte graphique au système.'],
    ['Stockage — M.2 / SATA', 'Les SSD et HDD se connectent par M.2 ou par SATA.'],
    ['Panneau arrière — USB, audio, Ethernet', 'Les ports permettent de brancher les périphériques et le réseau.']
  ],
  power: [
    ['Carte mère — ATX 24 broches', 'Le câble principal alimente la carte mère.'],
    ['CPU — EPS 4/8 broches', 'Un câble séparé alimente le processeur.'],
    ['GPU — PCIe 6/8 broches ou 12VHPWR', 'Les cartes graphiques puissantes peuvent demander un câble d’alimentation dédié.'],
    ['SSD/HDD — SATA Power', 'Les unités de stockage SATA reçoivent leur alimentation directement du bloc.']
  ],
  io: [
    ['Carte mère — panneau arrière', 'Les ports USB, Ethernet et audio sont reliés aux contrôleurs de la carte mère.'],
    ['Clavier / souris — USB', 'Les périphériques d’entrée envoient leurs informations à l’ordinateur.'],
    ['Réseau — Ethernet (RJ45)', 'Le port réseau relie l’ordinateur à un routeur ou à un commutateur.'],
    ['Écran — HDMI / DisplayPort', 'Pour une carte graphique dédiée, branchez l’écran sur les ports de la carte graphique, pas sur ceux de la carte mère.']
  ]
};
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const state = {
  root: null,
  body: null,
  board: null,
  svg: null,
  panel: null,
  index: null,
  parts: [],
  chips: [],
  links: [],
  particles: [],
  selected: null,
  cycleStep: 0,
  cleanup: null
};




function chipsMarkup() {
  return PARTS.map(
    (part) => `
      <button class="anatomy__chip" type="button" data-part="${part.id}"
        aria-controls="component-panel" aria-pressed="false">
        <span class="anatomy__chip-num">${part.num}</span>
        <span class="anatomy__chip-name" data-i18n="${part.chipKey}"></span>
      </button>`
  ).join('');
}

function shellMarkup() {
  return `
    <div class="anatomy">
      <div class="anatomy__stage">
        <div class="anatomy__stage-head">
          <p class="anatomy__hint">
            <span class="signal-dot signal-dot--small" aria-hidden="true"></span>
            <span>${t('computer.anatomy.hint')}</span>
          </p>
          <p class="anatomy__count">${t('computer.anatomy.count')}</p>
        </div>
        <div class="anatomy__board">${boardMarkup()}</div>
        <div class="anatomy__legend" aria-label="Légende des connexions">
          <span><i class="anatomy__legend-line anatomy__legend-line--data"></i>Bus de données</span>
          <span><i class="anatomy__legend-line anatomy__legend-line--power"></i>Alimentation électrique</span>
          <span><i class="anatomy__legend-line anatomy__legend-line--video"></i>Sortie vidéo</span>
        </div>
        <div class="anatomy__index" data-component-index role="group" aria-label="${t('computer.anatomy.components')}">
          ${chipsMarkup()}
        </div>
      </div>
      <aside class="anatomy__panel" id="component-panel" role="region" aria-live="polite" aria-label="${t('computer.anatomy.panelLabel')}"></aside>
    </div>`;
}

function idleMarkup() {
  return `
    <div class="anatomy__idle">
      <svg class="anatomy__idle-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="9.5" y="9.5" width="29" height="29" rx="3" stroke="currentColor"></rect>
        <rect x="20" y="20" width="8" height="8" rx="1" fill="currentColor"></rect>
        <path d="M15 3v6M24 3v6M33 3v6M15 39v6M24 39v6M33 39v6M3 15h6M3 24h6M3 33h6M39 15h6M39 24h6M39 33h6"
          stroke="currentColor" stroke-linecap="round"></path>
      </svg>
      <p class="anatomy__idle-kicker">${t('computer.anatomy.idleKicker')}</p>
      <h2>${t('computer.anatomy.idleTitle')}</h2>
      <p>${t('computer.anatomy.idleBody')}</p>
    </div>`;
}

function cpuMarkup() {
  const parts = ['control', 'alu', 'registers']
    .map((key) => {
      const base = `computer.parts.cpu.parts.${key}`;
      return `<div class="anatomy__cpu-part"><dt>${t(`${base}.name`)}</dt><dd>${t(`${base}.desc`)}</dd></div>`;
    })
    .join('');

  const steps = CYCLE_STEPS.map((step, index) => {
    const active = index === state.cycleStep;
    return `<button type="button" class="anatomy__cycle-step" data-cycle-step="${index}"
      aria-pressed="${active}">${t(`computer.parts.cpu.cycle.${step}.name`)}</button>`;
  }).join('');

  const currentStep = CYCLE_STEPS[state.cycleStep];
  const progress = ((state.cycleStep + 1) / CYCLE_STEPS.length) * 100;

  return `
    <section class="anatomy__block anatomy__block--cpu">
      <h3 class="anatomy__block-label">${t('computer.anatomy.inside')}</h3>
      <dl class="anatomy__cpu-parts">${parts}</dl>
      <div class="anatomy__cycle" data-cycle>
        <div class="anatomy__cycle-head">
          <span class="anatomy__cycle-title">${t('computer.anatomy.cycle')}</span>
          <span class="anatomy__cycle-count" data-cycle-count>${state.cycleStep + 1} / ${CYCLE_STEPS.length}</span>
        </div>
        <div class="anatomy__cycle-tabs" role="group" aria-label="${t('computer.anatomy.cycleHint')}">
          ${steps}
        </div>
        <div class="anatomy__cycle-bar" aria-hidden="true"><span data-cycle-bar style="width: ${progress}%"></span></div>
        <p class="anatomy__cycle-body" aria-live="polite" data-cycle-body>
          ${t(`computer.parts.cpu.cycle.${currentStep}.body`)}
        </p>
      </div>
    </section>`;
}

function entryMarkup(part) {
  const related = part.related
    .map((id) => {
      const other = PART_BY_ID.get(id);
      return `<button type="button" class="anatomy__related-btn" data-related="${id}">
        <span class="anatomy__related-num">${other.num}</span>${t(other.nameKey)}
      </button>`;
    })
    .join('');

  const note = part.noteKey
    ? `<aside class="anatomy__note">
        <span class="anatomy__note-mark" aria-hidden="true">!</span>
        <p><span class="anatomy__note-label">${t('computer.anatomy.note')}</span>${t(part.noteKey)}</p>
      </aside>`
    : '';

  return `
    <article class="anatomy__entry" data-tone="${part.tone}">
      <header class="anatomy__entry-head">
        <span class="anatomy__entry-num">${part.num}</span>
        <div>
          <h2>${t(part.nameKey)}</h2>
          <p class="anatomy__entry-tagline">${t(part.taglineKey)}</p>
        </div>
      </header>
      <section class="anatomy__block">
        <h3 class="anatomy__block-label">${t('computer.anatomy.role')}</h3>
        <p>${t(part.roleKey)}</p>
      </section>
      ${note}
      <section class="anatomy__block">
        <h3 class="anatomy__block-label">${t('computer.anatomy.comm')}</h3>
        <p>${t(part.commKey)}</p>
      </section>
      <section class="anatomy__block anatomy__connectors">
        <h3 class="anatomy__block-label">Connexions et ports</h3>
        <ul class="anatomy__connector-list">
          ${(CONNECTION_DETAILS[part.id] || []).map(([title, description]) => `<li><strong>${title}</strong><span>${description}</span></li>`).join('')}
        </ul>
        <p class="anatomy__connector-note">Schéma pédagogique simplifié : les connecteurs exacts dépendent du modèle de carte mère, du processeur et de la carte graphique.</p>
      </section>
      ${part.cpu ? cpuMarkup() : ''}
      <section class="anatomy__block anatomy__block--example">
        <h3 class="anatomy__block-label">${t('computer.anatomy.example')}</h3>
        <p>${t(part.exampleKey)}</p>
      </section>
      <section class="anatomy__block anatomy__block--related">
        <h3 class="anatomy__block-label">${t('computer.anatomy.connected')}</h3>
        <div class="anatomy__related">${related}</div>
      </section>
    </article>`;
}




function isLinkLive(link, selected) {
  if (!selected) return false;
  if (selected === 'motherboard') return true;
  return link.dataset.a === selected || link.dataset.b === selected;
}

function paintSelection() {
  const selected = state.selected;
  const part = PART_BY_ID.get(selected);

  state.board.classList.toggle('is-selecting', Boolean(selected));

  state.parts.forEach((element) => {
    const id = element.dataset.part;
    element.classList.toggle('is-selected', id === selected);
    element.classList.toggle('is-related', Boolean(part && part.related.includes(id)));
    element.setAttribute('aria-pressed', String(id === selected));
  });

  state.chips.forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.part === selected));
    chip.classList.toggle('is-selected', chip.dataset.part === selected);
  });

  const liveLinks = new Map();
  state.links.forEach((link) => {
    const live = isLinkLive(link, selected);
    link.classList.toggle('is-live', live);
    liveLinks.set(link.id, live);
  });

  state.particles.forEach(({ element, linkId }) => {
    element.classList.toggle('is-dimmed', !liveLinks.get(linkId));
  });
}

function renderPanel(animate = false) {
  const part = PART_BY_ID.get(state.selected);
  state.panel.innerHTML = part ? entryMarkup(part) : idleMarkup();

  if (animate) {
    state.panel.classList.remove('is-entering');
    void state.panel.offsetWidth;
    state.panel.classList.add('is-entering');
  }
}

function revealPanelOnSmallScreens() {
  if (window.innerWidth >= 900) return;
  const rect = state.panel.getBoundingClientRect();
  const barelyVisible = rect.top > window.innerHeight * 0.74 || rect.bottom < 120;
  if (!barelyVisible) return;

  state.panel.scrollIntoView({
    behavior: motionQuery.matches ? 'auto' : 'smooth',
    block: 'start'
  });
}

function selectPart(id, { source = 'board', animate = true } = {}) {
  const part = PART_BY_ID.get(id);
  if (!part) return;

  state.selected = id;
  state.cycleStep = 0;
  paintSelection();
  renderPanel(animate);

  if (source !== 'init') revealPanelOnSmallScreens();
}

function setCycleStep(index) {
  if (state.selected !== 'cpu' || !Number.isInteger(index)) return;
  if (index < 0 || index >= CYCLE_STEPS.length) return;

  state.cycleStep = index;
  const cycle = state.panel.querySelector('[data-cycle]');
  if (!cycle) return;

  cycle.querySelectorAll('[data-cycle-step]').forEach((button) => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.cycleStep) === index));
  });

  const count = cycle.querySelector('[data-cycle-count]');
  if (count) count.textContent = `${index + 1} / ${CYCLE_STEPS.length}`;

  const bar = cycle.querySelector('[data-cycle-bar]');
  if (bar) bar.style.width = `${((index + 1) / CYCLE_STEPS.length) * 100}%`;

  const body = cycle.querySelector('[data-cycle-body]');
  if (body) body.textContent = t(`computer.parts.cpu.cycle.${CYCLE_STEPS[index]}.body`);
}




function clearParticles() {
  const layer = state.svg?.querySelector('[data-particle-layer]');
  layer?.replaceChildren();
  state.particles = [];
}

function buildParticles() {
  if (!state.svg) return;
  clearParticles();

  const layer = state.svg.querySelector('[data-particle-layer]');
  if (!layer) return;

  state.links.forEach((link) => {
    const live = link.classList.contains('is-live');
    const tone = link.dataset.tone || 'cyan';
    const count = ['anatomy-link-cpu-ram', 'anatomy-link-cpu-gpu', 'anatomy-link-io-mobo'].includes(link.id)
      ? 2
      : 1;
    const duration = 3.2 + Number(link.id.length % 5) * 0.35;

    for (let index = 0; index < count; index += 1) {
      const dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('r', '3');
      dot.setAttribute('class', `anatomy__particle anatomy__particle--${tone}`);
      dot.dataset.linkId = link.id;

      if (motionQuery.matches) {
        dot.classList.add('anatomy__particle--static');
        const point = link.getPointAtLength(link.getTotalLength() * (0.42 + index * 0.24));
        dot.setAttribute('cx', point.x);
        dot.setAttribute('cy', point.y);
      } else {
        const motion = document.createElementNS(SVG_NS, 'animateMotion');
        motion.setAttribute('dur', `${duration + index * 0.4}s`);
        motion.setAttribute('begin', `${-index * duration * 0.5}s`);
        motion.setAttribute('repeatCount', 'indefinite');
        motion.setAttribute('rotate', 'auto');

        const path = document.createElementNS(SVG_NS, 'mpath');
        path.setAttribute('href', `#${link.id}`);
        path.setAttributeNS(XLINK_NS, 'xlink:href', `#${link.id}`);
        motion.append(path);
        dot.append(motion);
      }

      dot.classList.toggle('is-dimmed', !live);
      layer.append(dot);
      state.particles.push({ element: dot, linkId: link.id });
    }
  });
}




export function initComputerLab(root) {
  if (!(root instanceof HTMLElement)) return null;
  if (state.root === root) return { root, destroy: destroyComputerLab };

  destroyComputerLab();

  state.root = root;
  state.body = root.querySelector('.lab-frame__body');
  if (!state.body) return null;

  root.classList.add('lab-frame--mounted', 'lab-frame--anatomy');
  root.dataset.moduleState = 'mounted';
  state.body.innerHTML = shellMarkup();
  applyTranslations(root);

  state.board = state.body.querySelector('.anatomy__board');
  state.svg = state.body.querySelector('.anatomy__svg');
  state.panel = state.body.querySelector('#component-panel');
  state.index = state.body.querySelector('[data-component-index]');
  state.parts = [...state.body.querySelectorAll('.anatomy__part')];
  state.chips = [...state.body.querySelectorAll('.anatomy__chip')];
  state.links = [...state.body.querySelectorAll('[data-link]')];

  const onIndexClick = (event) => {
    const chip = event.target.closest('[data-part]');
    if (!chip) return;
    selectPart(chip.dataset.part, { source: 'chip' });
  };

  const onBoardClick = (event) => {
    const part = event.target.closest('.anatomy__part');
    if (!part) return;
    selectPart(part.dataset.part, { source: 'board' });
  };

  const onBoardKeydown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const part = event.target.closest('.anatomy__part');
    if (!part) return;
    event.preventDefault();
    selectPart(part.dataset.part, { source: 'board' });
  };

  const onPanelClick = (event) => {
    const cycleButton = event.target.closest('[data-cycle-step]');
    if (cycleButton) {
      setCycleStep(Number(cycleButton.dataset.cycleStep));
      return;
    }

    const related = event.target.closest('[data-related]');
    if (!related) return;

    const nextId = related.dataset.related;
    selectPart(nextId, { source: 'panel' });
    state.chips.find((chip) => chip.dataset.part === nextId)?.focus({ preventScroll: true });
  };

  const onNavigate = (event) => {
    if (event.detail.view === 'computer') {
      if (!motionQuery.matches && !document.hidden) state.svg?.unpauseAnimations();
    } else {
      state.svg?.pauseAnimations();
    }
  };

  const onVisibility = () => {
    if (document.hidden || document.body.dataset.view !== 'computer') {
      state.svg?.pauseAnimations();
    } else if (!motionQuery.matches) {
      state.svg?.unpauseAnimations();
    }
  };

  const onMotionChange = () => {
    buildParticles();
    if (!motionQuery.matches && !document.hidden) state.svg?.unpauseAnimations();
    else state.svg?.pauseAnimations();
  };

  const offLanguage = onLanguageChange(() => {
    applyTranslations(root);
    renderPanel(false);
  });

  state.index.addEventListener('click', onIndexClick);
  state.board.addEventListener('click', onBoardClick);
  state.board.addEventListener('keydown', onBoardKeydown);
  state.panel.addEventListener('click', onPanelClick);
  document.addEventListener('app:navigate', onNavigate);
  document.addEventListener('visibilitychange', onVisibility);

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', onMotionChange);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(onMotionChange);
  }

  buildParticles();
  selectPart('cpu', { source: 'init', animate: false });

  if (document.hidden || document.body.dataset.view !== 'computer') {
    state.svg?.pauseAnimations();
  }

  state.cleanup = () => {
    state.index?.removeEventListener('click', onIndexClick);
    state.board?.removeEventListener('click', onBoardClick);
    state.board?.removeEventListener('keydown', onBoardKeydown);
    state.panel?.removeEventListener('click', onPanelClick);
    document.removeEventListener('app:navigate', onNavigate);
    document.removeEventListener('visibilitychange', onVisibility);
    offLanguage();

    if (typeof motionQuery.removeEventListener === 'function') {
      motionQuery.removeEventListener('change', onMotionChange);
    } else if (typeof motionQuery.removeListener === 'function') {
      motionQuery.removeListener(onMotionChange);
    }

    clearParticles();
  };

  return { root, destroy: destroyComputerLab };
}

export function destroyComputerLab() {
  state.cleanup?.();
  state.cleanup = null;

  if (state.root) {
    state.root.classList.remove('lab-frame--mounted', 'lab-frame--anatomy');
    state.root.dataset.moduleState = 'pending';
    state.body?.replaceChildren();
  }

  Object.assign(state, {
    root: null,
    body: null,
    board: null,
    svg: null,
    panel: null,
    index: null,
    parts: [],
    chips: [],
    links: [],
    particles: [],
    selected: null,
    cycleStep: 0
  });
}
