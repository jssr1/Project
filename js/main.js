import { initTranslations, t } from './translations.js';
import { initNavigation, getCurrentView } from './navigation.js';
import { initExperience } from './experience.js';

const labLoaders = {
  decouvrir: () => import('./computer.js').then((m) => m.initComputerLab),
  circulation: () => import('./follow-data.js').then((m) => m.initFollowDataLab),
  binaire: () => import('./binary.js').then((m) => m.initBinaryLab),
  images: () => import('./image-simulator.js').then((m) => m.initImageLab),
  video: () => import('./video-simulator.js').then((m) => m.initVideoLab),
  synthese: () => import('./quiz.js').then((m) => m.initQuizLab)
};

const PENDING = Symbol('pending');
const mountedLabs = new Map();

async function mountView(view) {
  const load = labLoaders[view];
  if (!load || mountedLabs.has(view)) return;
  mountedLabs.set(view, PENDING);
  try {
    const initializer = await load();
    const root = document.getElementById(`${view}-lab`);
    if (!root) return;
    const instance = initializer(root);
    if (instance) {
      mountedLabs.set(view, instance);
      document.dispatchEvent(new CustomEvent('app:labmounted', { detail: { view } }));
    } else {
      mountedLabs.delete(view);
    }
  } catch (error) {
    mountedLabs.delete(view);
    console.error(`Chargement impossible pour « ${view} ».`, error);
  }
}

function init() {
  document.documentElement.classList.add('js');
  initTranslations();
  document.addEventListener('app:navigate', (event) => { mountView(event.detail.view); });
  initNavigation();
  initExperience();
  mountView(getCurrentView());
  document.documentElement.classList.add('is-ready');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}