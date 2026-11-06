


const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const refs = {
  machine: null,
  particleLayer: null,
  header: null
};

let started = false;
let headerTicking = false;
let particlesBuilt = false;




function clearParticles() {
  refs.particleLayer?.replaceChildren();
  particlesBuilt = false;
}

function createParticle(tone, duration, begin) {
  const group = document.createElementNS(SVG_NS, 'g');
  group.setAttribute('class', `particle particle--${tone}`);

  const halo = document.createElementNS(SVG_NS, 'circle');
  halo.setAttribute('r', '6');
  halo.setAttribute('class', 'particle__halo');

  const core = document.createElementNS(SVG_NS, 'circle');
  core.setAttribute('r', '2.1');
  core.setAttribute('class', 'particle__core');

  const motion = document.createElementNS(SVG_NS, 'animateMotion');
  motion.setAttribute('dur', `${duration}s`);
  motion.setAttribute('begin', `${begin}s`);
  motion.setAttribute('repeatCount', 'indefinite');
  motion.setAttribute('calcMode', 'linear');
  motion.setAttribute('rotate', 'auto');

  group.append(halo, core, motion);
  return group;
}

function buildStaticParticles() {
  const { machine, particleLayer } = refs;
  if (!machine || !particleLayer) return;

  machine.querySelectorAll('.machine__flow').forEach((flow) => {
    const length = typeof flow.getTotalLength === 'function' ? flow.getTotalLength() : 0;
    if (!length) return;

    const point = flow.getPointAtLength(length * 0.56);
    const tone = flow.dataset.flow || 'cyan';

    const group = document.createElementNS(SVG_NS, 'g');
    group.setAttribute('class', `particle particle--${tone}`);
    group.setAttribute('transform', `translate(${point.x} ${point.y})`);

    const halo = document.createElementNS(SVG_NS, 'circle');
    halo.setAttribute('r', '6');
    halo.setAttribute('class', 'particle__halo');

    const core = document.createElementNS(SVG_NS, 'circle');
    core.setAttribute('r', '2.4');
    core.setAttribute('class', 'particle__core');

    group.append(halo, core);
    particleLayer.append(group);
  });
}

function buildParticles() {
  const { machine, particleLayer } = refs;
  if (!machine || !particleLayer || particlesBuilt) return;

  if (motionQuery.matches) {
    buildStaticParticles();
    particlesBuilt = true;
    return;
  }

  machine.querySelectorAll('.machine__flow').forEach((flow) => {
    if (!flow.id) return;

    const count = Math.max(1, Number(flow.dataset.count) || 1);
    const duration = Math.max(1, Number(flow.dataset.duration) || 3);
    const tone = flow.dataset.flow || 'cyan';

    for (let index = 0; index < count; index += 1) {
      const begin = (-duration * index) / count;
      const particle = createParticle(tone, duration, begin.toFixed(2));

      const mpath = document.createElementNS(SVG_NS, 'mpath');
      mpath.setAttribute('href', `#${flow.id}`);
      mpath.setAttributeNS(XLINK_NS, 'xlink:href', `#${flow.id}`);

      particle.querySelector('animateMotion').append(mpath);
      particleLayer.append(particle);
    }
  });

  particlesBuilt = true;
}




function setMachinePlaying(playing) {
  const { machine } = refs;
  if (!machine || typeof machine.pauseAnimations !== 'function') return;

  if (playing && !motionQuery.matches && !document.hidden) {
    machine.unpauseAnimations();
  } else {
    machine.pauseAnimations();
  }
}

function syncMachine({ rebuild = false } = {}) {
  const onHome = document.body.dataset.view === 'home';
  if (!refs.machine || !refs.particleLayer) return;
  if (onHome) {
    if (rebuild) clearParticles();
    buildParticles();
    setMachinePlaying(true);
  } else {
    setMachinePlaying(false);
  }
}




function initScrollCues() {
  document.querySelectorAll('[data-scroll-to]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.scrollTo);
      if (!target) return;

      target.scrollIntoView({
        behavior: motionQuery.matches ? 'auto' : 'smooth',
        block: 'start'
      });

      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  document.querySelectorAll('[data-scroll-top]').forEach((button) => {
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: motionQuery.matches ? 'auto' : 'smooth'
      });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
  });
}




function revealAll() {
  document.querySelectorAll('[data-reveal]').forEach((element) => {
    element.classList.add('is-revealed');
  });
}

function initReveal() {
  const items = [...document.querySelectorAll('[data-reveal]')];
  if (!items.length) return;

  if (motionQuery.matches || !('IntersectionObserver' in window)) {
    revealAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}




function updateHeader() {
  headerTicking = false;
  refs.header?.classList.toggle('is-scrolled', window.scrollY > 10);
}

function initHeader() {
  refs.header = document.querySelector('.site-header');
  if (!refs.header) return;

  updateHeader();
  window.addEventListener(
    'scroll',
    () => {
      if (headerTicking) return;
      headerTicking = true;
      window.requestAnimationFrame(updateHeader);
    },
    { passive: true }
  );
}




export function initExperience() {
  if (started) return;
  started = true;

  refs.machine = document.getElementById('machine-svg');
  refs.particleLayer = document.getElementById('machine-particles');

  initHeader();
  initScrollCues();
  initReveal();
  syncMachine();

  document.addEventListener('app:navigate', (event) => {
    syncMachine({ rebuild: event.detail.view === 'home' });
  });

  document.addEventListener('visibilitychange', () => {
    setMachinePlaying(!document.hidden);
  });

  const onMotionChange = () => {
    if (motionQuery.matches) {
      clearParticles();
      revealAll();
    }
    syncMachine({ rebuild: true });
  };

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', onMotionChange);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(onMotionChange);
  }
}
