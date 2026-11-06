import { t, onLanguageChange, applyTranslations } from './translations.js';

let state = null;

function getQuizData() { return t('modules.quiz') || {}; }
function getRecap() { const r = t('synthese.recap'); return Array.isArray(r) ? r : []; }
function getRecapTitle() { const v = t('synthese.recapTitle'); return typeof v === 'string' ? v : 'Récapitulatif'; }

function create(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) el.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of [].concat(children)) if (c != null) el.append(c);
  return el;
}

function resetQuiz(phase = 'intro') {
  Object.assign(state, { phase, index: 0, score: 0, answered: false, choice: null, feedback: '', hintOpen: false });
  render();
}

function render() {
  if (!state?.body) return;
  const q = getQuizData();
  const questions = Array.isArray(q.questions) ? q.questions : [];
  const s = state;
  s.total = questions.length;
  const body = s.body;
  body.replaceChildren();
  body.className = 'quiz-ui';

  if (!questions.length) {
    body.append(create('p', { class: 'quiz-empty', text: q.placeholderBody || 'Aucune question disponible.' }));
    return;
  }

  if (s.phase === 'intro') {
    const recap = getRecap();
    const intro = create('div', { class: 'quiz-card quiz-card--intro' }, [
      create('span', { class: 'quiz-kicker', text: q.eyebrow || 'ÉVALUATION DES CONNAISSANCES' }),
      create('h3', { class: 'quiz-card__title', text: q.placeholderTitle || q.title || 'Quiz interactif' }),
      create('p', { class: 'quiz-card__body', text: q.lead || q.intro || q.placeholderBody || '' }),
      create('div', { class: 'quiz-overview' }, [
        create('div', { class: 'quiz-overview__item' }, [create('strong', { text: String(s.total).padStart(2, '0') }), create('span', { text: q.questionCount || 'Questions' })]),
        create('div', { class: 'quiz-overview__item' }, [create('strong', { text: q.instantFeedback || '✓' }), create('span', { text: q.feedbackLabel || 'Correction immédiate' })]),
        create('div', { class: 'quiz-overview__item' }, [create('strong', { text: q.noTimer || '∞' }), create('span', { text: q.timeLabel || 'À votre rythme' })])
      ]),
      create('ul', { class: 'scope-list quiz-scope' }, (q.scope || []).map(v => create('li', { text: v }))),
      create('div', { class: 'quiz-actions' }, [
        create('button', { type: 'button', class: 'button button--primary quiz-start', text: q.start || 'Commencer le quiz', onclick: () => resetQuiz('question') })
      ])
    ]);
    body.append(intro);
    if (recap.length) {
      body.append(create('section', { class: 'recap' }, [
        create('h3', { class: 'recap__title', text: getRecapTitle() }),
        create('ol', { class: 'recap-grid' }, recap.map((txt, i) => create('li', { class: 'recap-item' }, [
          create('span', { class: 'recap-item__n', text: String(i + 1).padStart(2, '0') }),
          create('span', { text: txt })
        ])))
      ]));
    }
  } else if (s.phase === 'question') {
    const item = questions[s.index];
    if (!item) { s.phase = 'complete'; render(); return; }
    const progress = (q.progress || 'Question {current} sur {total}').replace('{current}', s.index + 1).replace('{total}', s.total);
    const percent = ((s.index + (s.answered ? 1 : 0)) / s.total) * 100;
    const live = create('p', { class: 'quiz-live sr-only', 'aria-live': 'polite', 'aria-atomic': 'true', text: s.feedback });
    const options = (item.options || []).map((opt, i) => {
      const correct = i === item.a;
      const selected = i === s.choice;
      const cls = 'quiz-option' + (s.answered && correct ? ' is-correct' : '') +
        (s.answered && selected && !correct ? ' is-incorrect' : '') + (selected ? ' is-selected' : '');
      return create('button', {
        type: 'button', class: cls, disabled: s.answered,
        'aria-pressed': selected ? 'true' : 'false',
        'aria-label': `${String.fromCharCode(65 + i)}. ${opt}`,
        onclick: () => {
          if (s.answered) return;
          s.choice = i;
          s.answered = true;
          const ok = i === item.a;
          if (ok) s.score += 1;
          s.feedback = (ok ? (q.correct || 'Bonne réponse') : (q.incorrect || 'À revoir')) +
            (item.why ? ` — ${item.why}` : '');
          render();
        }
      }, [
        create('span', { class: 'quiz-option__letter', text: String.fromCharCode(65 + i) }),
        create('span', { class: 'quiz-option__label', text: String(opt) }),
        s.answered && correct ? create('span', { class: 'quiz-option__mark', 'aria-hidden': 'true', text: '✓' }) : null,
        s.answered && selected && !correct ? create('span', { class: 'quiz-option__mark', 'aria-hidden': 'true', text: '×' }) : null
      ]);
    });

    const card = create('div', { class: 'quiz-card quiz-card--question' }, [
      create('div', { class: 'quiz-progress-head' }, [
        create('span', { class: 'quiz-progress', text: progress }),
        create('span', { class: 'quiz-score', text: `${q.score || 'Score'} : ${s.score}/${s.total}` })
      ]),
      create('div', { class: 'quiz-progress-track', role: 'progressbar', 'aria-label': q.progressLabel || 'Progression du quiz', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(Math.round(percent)) }, [
        create('span', { style: `width:${percent}%` })
      ]),
      create('p', { class: 'quiz-question-index', text: `${q.questionLabel || 'QUESTION'} ${String(s.index + 1).padStart(2, '0')}` }),
      create('h3', { class: 'quiz-question', text: item.q || '' }),
      create('div', { class: 'quiz-options', role: 'group', 'aria-label': q.choose || 'Choisissez une réponse' }, options),
      s.feedback ? create('div', { class: `quiz-feedback ${s.choice === item.a ? 'is-correct' : 'is-incorrect'}`, role: 'status' }, [
        create('strong', { class: 'quiz-feedback__title', text: s.choice === item.a ? (q.correct || 'Bonne réponse') : (q.incorrect || 'Réponse à revoir') }),
        create('p', { text: item.why || s.feedback })
      ]) : null,
      create('div', { class: 'quiz-actions' }, [
        create('button', {
          type: 'button', class: 'button button--primary quiz-next',
          text: s.index + 1 >= s.total ? (q.finish || 'Voir le résultat') : (q.next || 'Question suivante'),
          disabled: !s.answered,
          onclick: () => {
            if (!s.answered) return;
            if (s.index + 1 >= s.total) s.phase = 'complete';
            else { s.index += 1; s.answered = false; s.choice = null; s.feedback = ''; s.hintOpen = false; }
            render();
          }
        })
      ]),
      live
    ]);
    body.append(card);
  } else if (s.phase === 'complete') {
    const summary = (q.completeBody || 'Vous avez obtenu {score} bonnes réponses sur {total}.').replace('{score}', s.score).replace('{total}', s.total);
    const missions = Array.isArray(q.missions) ? q.missions : [];
    const ratio = Math.round((s.score / s.total) * 100);
    const label = ratio >= 80 ? (q.levelGreat || 'Très bonne maîtrise') : ratio >= 50 ? (q.levelMid || 'Bonne base, à consolider') : (q.levelLow || 'Continuez à vous entraîner');
    body.append(create('div', { class: 'quiz-card quiz-card--complete' }, [
      create('span', { class: 'quiz-kicker', text: q.resultEyebrow || 'BILAN DE VOTRE PARCOURS' }),
      create('h3', { class: 'quiz-card__title', text: q.completeTitle || 'Quiz terminé' }),
      create('div', { class: 'quiz-result-ring', style: `--score:${ratio}%` }, [
        create('strong', { text: `${ratio}%` }),
        create('span', { text: `${s.score}/${s.total}` })
      ]),
      create('p', { class: 'quiz-result-label', text: label }),
      create('p', { class: 'quiz-card__body', text: summary }),
      missions.length ? create('div', { class: 'quiz-missions' }, [
        create('h4', { text: q.missionTitle || 'Notions à revoir' }),
        create('ul', {}, missions.map(m => create('li', { text: String(m) })))
      ]) : null,
      create('div', { class: 'quiz-actions' }, [
        create('button', { type: 'button', class: 'button button--primary', text: q.restart || 'Recommencer', onclick: () => resetQuiz('intro') })
      ]),
      create('p', { class: 'quiz-live sr-only', 'aria-live': 'polite', text: summary })
    ]));
  }
  try { applyTranslations(body); } catch (_) { /* keep the rendered interface usable */ }
}

export function initQuizLab(root) {
  if (!(root instanceof HTMLElement)) return null;
  if (state?.root === root) return { root, destroy: destroyQuizLab };
  destroyQuizLab();
  const body = root.querySelector('#quiz-lab-body') || root.querySelector('.lab-frame__body') || root;
  state = { root, body, phase: 'intro', index: 0, score: 0, total: 0, answered: false, choice: null, feedback: '', hintOpen: false, unsub: null };
  root.classList.add('lab-frame--mounted');
  root.dataset.moduleState = 'mounted';
  render();
  state.unsub = onLanguageChange(() => { if (state?.root) render(); });
  return { root, destroy: destroyQuizLab };
}

export function destroyQuizLab() {
  if (state?.unsub) try { state.unsub(); } catch (_) {}
  if (state?.root) {
    state.root.classList.remove('lab-frame--mounted');
    state.root.dataset.moduleState = 'pending';
  }
  state = null;
}
