import { t } from './translations.js';

const VIEW_IDS = ['home', 'decouvrir', 'circulation', 'binaire', 'images', 'video', 'synthese'];
const VIEW_SET = new Set(VIEW_IDS);
const DEFAULT_VIEW = 'home';
const DESKTOP_QUERY = '(min-width: 961px)';

let currentView = DEFAULT_VIEW;
let initialized = false;
let menuOpen = false;
let elements = null;

function getViewFromHash(hash = window.location.hash) {
  const id = hash.replace(/^#/, '').replace(/^\/+/, '').split(/[/?#]/)[0];
  return VIEW_SET.has(id) ? id : null;
}

function updateDocumentTitle(view) {
  const section = document.getElementById(view);
  const heading = section?.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim();
  const brand = t('brand.name');
  document.title = !heading || heading === brand || view === 'home' ? t('meta.title') : `${heading} — ${brand}`;
}

function updateNavState(view) {
  document.querySelectorAll('.primary-nav [data-nav-link]').forEach((link) => {
    if (link.dataset.navLink === view) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function activateView(view, { focus = false, scroll = true, notify = true } = {}) {
  const target = VIEW_SET.has(view) ? view : DEFAULT_VIEW;
  const previousView = currentView;
  currentView = target;
  document.body.dataset.view = target;
  document.querySelectorAll('main [data-view]').forEach((section) => {
    const isActive = section.dataset.view === target;
    section.hidden = !isActive;
    section.classList.toggle('is-active', isActive);
  });
  updateNavState(target);
  updateDocumentTitle(target);
  if (scroll) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  if (focus) document.getElementById('main-content')?.focus({ preventScroll: true });
  if (notify && target !== previousView) {
    document.dispatchEvent(new CustomEvent('app:navigate', { detail: { view: target, previousView } }));
  }
  return target;
}

export function navigateTo(view, { focus = true, replace = false, scroll = true } = {}) {
  const target = VIEW_SET.has(view) ? view : DEFAULT_VIEW;
  const nextHash = `#${target}`;
  if (window.location.hash !== nextHash) {
    window.history[replace ? 'replaceState' : 'pushState']({ view: target }, '', nextHash);
  }
  closeMenu();
  return activateView(target, { focus, scroll });
}

export function getCurrentView() { return currentView; }

function syncFromHash() {
  const view = getViewFromHash();
  if (!view || view === currentView) return;
  navigateTo(view, { focus: false, replace: true });
}

function setMenu(open, { restoreFocus = false } = {}) {
  if (!elements?.menuToggle || !elements?.nav) return;
  menuOpen = Boolean(open);
  document.body.classList.toggle('nav-open', menuOpen);
  elements.menuToggle.setAttribute('aria-expanded', String(menuOpen));
  elements.menuToggle.setAttribute('aria-label', menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu'));
  if (elements.scrim) elements.scrim.hidden = !menuOpen;
  if (menuOpen) window.requestAnimationFrame(() => { elements.nav.querySelector('a')?.focus(); });
  else if (restoreFocus) elements.menuToggle.focus();
}

function closeMenu(options) { if (menuOpen) setMenu(false, options); }

function handleNavClick(event) {
  const link = event.target.closest('a[data-nav-link]');
  if (!link) return;
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const view = link.dataset.navLink;
  if (!VIEW_SET.has(view)) return;
  event.preventDefault();
  navigateTo(view, { focus: true });
}

function handleKeydown(event) {
  if (event.key === 'Escape' && menuOpen) { event.preventDefault(); setMenu(false, { restoreFocus: true }); }
}

function initMenu() {
  elements.menuToggle?.addEventListener('click', () => { setMenu(!menuOpen, { restoreFocus: true }); });
  elements.scrim?.addEventListener('click', () => { setMenu(false, { restoreFocus: true }); });
  const desktop = window.matchMedia(DESKTOP_QUERY);
  desktop.addEventListener('change', (event) => { if (event.matches) closeMenu(); });
}

export function initNavigation() {
  if (initialized) return { getCurrentView };
  initialized = true;
  elements = {
    nav: document.getElementById('primary-nav'),
    menuToggle: document.querySelector('[data-menu-toggle]'),
    scrim: document.querySelector('[data-nav-scrim]')
  };
  document.addEventListener('click', handleNavClick);
  document.addEventListener('keydown', handleKeydown);
  window.addEventListener('popstate', syncFromHash);
  window.addEventListener('hashchange', syncFromHash);
  initMenu();
  const initialView = getViewFromHash() || DEFAULT_VIEW;
  activateView(initialView, { focus: false, scroll: false, notify: false });
  if (!getViewFromHash()) window.history.replaceState({ view: initialView }, '', `#${initialView}`);
  return { getCurrentView };
}