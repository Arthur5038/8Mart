'use strict';

const STORAGE_KEY = 'quest_8mart_v1';
const SCORE_SET = [0, 5, 10];

const steps = [
  {
    id: 'hotspot_secret_kiss',
    type: 'hotspot',
    title: 'Шаг 1. Карта к поцелую (ультра секрет)',
    text: 'Алина, представь: это фото нас, которое я еще не добавил. Нажми в то место, где я обычно зависаю взглядом перед тем, как украсть поцелуй.',
    hint: 'Я всегда немного правее центра и чуть выше, как будто выбираю угол атаки романтики.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      zone: { x: 58, y: 38, w: 16, h: 18 }
    },
    partialRules: {
      expandPxPercent: 8
    },
    uiOptions: {
      placeholderTitle: 'Зона нежности',
      placeholderSubtitle: 'Фото добавим позже',
      helper: 'Клик по карточке или выстави координаты X/Y ползунками.'
    }
  },
  {
    id: 'months_together',
    type: 'number',
    title: 'Шаг 2. Арифметика любви',
    text: 'Сколько месяцев мы вместе на 8 марта 2026, если август считается? Не торопись, калькулятор в голове тоже sexy.',
    hint: 'Ответ рядом с числом 32. Прям очень рядом.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      value: 32
    },
    partialRules: {
      min: 31,
      max: 33
    },
    uiOptions: {
      label: 'Введи количество месяцев:'
    }
  },
  {
    id: 'code_phrase',
    type: 'text',
    title: 'Шаг 3. Наш шифр от скуки',
    text: 'Введи наше кодовое словечко/фразу. То самое, после которого у меня лицо дурачка и желание срочно тебя обнять.',
    hint: 'Ключевой корень: булоч. Да, ты официально слишком вкусная для моего самоконтроля.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      answers: [
        'моя булочка',
        'булочка',
        'булочка с корицей',
        'моя булочка с корицей',
        'алина булочка'
      ]
    },
    partialRules: {
      roots: ['булоч', 'кориц', 'сладк']
    },
    uiOptions: {
      label: 'Введи кодовую фразу:'
    }
  },
  {
    id: 'choice_funny_love',
    type: 'choice3',
    title: 'Шаг 4. Что я в тебе люблю больше всего (шутка, но не совсем)',
    text: 'Выбери один вариант. Это тест, где любой ответ милый, но один особенно преступно правдивый.',
    hint: 'Я таю от твоего мозга и от того, как ты меня красиво ставишь на место.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      value: 'mind'
    },
    partialRules: {
      partialValue: 'eyes'
    },
    uiOptions: {
      options: [
        { value: 'eyes', label: 'Твои глаза (и как они смотрят, когда я туплю)' },
        { value: 'chaos', label: 'Твою способность быть хаосом в пижаме' },
        { value: 'mind', label: 'Твой ум + характер: умно, дерзко, смертельно для моего спокойствия' }
      ]
    }
  },
  {
    id: 'drag_phrase',
    type: 'phrase_dnd',
    title: 'Шаг 5. Собери фразу Артура',
    text: 'Перетащи слова в правильном порядке. Это мой официальный приговор твоей красоте.',
    hint: 'Начинается с «Алина», заканчивается «мурашек».',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      order: [0, 1, 2, 3, 4, 5, 6]
    },
    partialRules: {
      minCorrectPositions: 5
    },
    uiOptions: {
      words: ['Алина,', 'ты', 'моя', 'любимая', 'причина', 'улыбки', 'и мурашек']
    }
  },
  {
    id: 'select_two_cards',
    type: 'select_2_of_4',
    title: 'Шаг 6. Выбери 2 идеальных кадра свидания',
    text: 'Фото еще не готовы, поэтому карточки-заглушки. Отметь два кадра, которые я бы выбрал для нашего мини-фильма.',
    hint: 'Там, где уют и киношная романтика, а не мой позорный танец.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      ids: ['candles', 'movie']
    },
    partialRules: {
      requiredCount: 2
    },
    uiOptions: {
      cards: [
        { id: 'candles', title: 'Кадр A: свечи + плед', subtitle: 'Фото добавим позже' },
        { id: 'gym', title: 'Кадр B: я в спортзале и грущу', subtitle: 'Фото добавим позже' },
        { id: 'movie', title: 'Кадр C: кино + ты у меня на плече', subtitle: 'Фото добавим позже' },
        { id: 'tax', title: 'Кадр D: я плачу налоги', subtitle: 'Фото добавим позже' }
      ]
    }
  },
  {
    id: 'timeline_reorder',
    type: 'reorder_4',
    title: 'Шаг 7. Хронология наших мемов',
    text: 'Расположи 4 события по времени. Если ошибешься, ничего страшного: в любви важнее вайб, чем архив.',
    hint: 'Сначала знакомство, потом первый cringe-мем, дальше первое свидание, потом наш режим «мы странные и счастливые».',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      order: [0, 1, 2, 3]
    },
    partialRules: {
      minCorrectPositions: 2
    },
    uiOptions: {
      items: [
        'Мы познакомились',
        'Первый общий мем уровня «что это было»',
        'Первое свидание',
        'Режим «моя любимая женщина + мой лучший друг в одном лице»'
      ]
    }
  },
  {
    id: 'memory_pairs',
    type: 'memory_6',
    title: 'Шаг 8. Память сердца (и нервов)',
    text: 'Открой все пары из 6 карточек. Это как отношения: главное — не паниковать после второго промаха.',
    hint: 'Если увидела символ, попробуй сразу запомнить его соседей по прошлым фейлам.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      totalPairs: 3
    },
    partialRules: {
      fullMaxMisses: 4,
      partialMinPairs: 2
    },
    uiOptions: {
      pairs: [
        { id: 'hug', label: 'Объятия' },
        { id: 'kiss', label: 'Поцелуй' },
        { id: 'laugh', label: 'Смех' }
      ]
    }
  },
  {
    id: 'range_missing',
    type: 'range',
    title: 'Шаг 9. Индекс скучаю по Алине',
    text: 'От 0 до 100: насколько я скучаю по тебе, если мы не виделись ровно день?',
    hint: 'Это число настолько большое, что выглядит как признание в любви с перегревом.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      value: 97
    },
    partialRules: {
      fullTolerance: 2,
      partialTolerance: 7
    },
    uiOptions: {
      min: 0,
      max: 100,
      step: 1,
      start: 50
    }
  },
  {
    id: 'choose_two_truths',
    type: 'choose_2_of_4',
    title: 'Шаг 10. Две правды про Артура',
    text: 'Выбери 2 правдивых утверждения. Остальные — художественный бред, но почти похожий на меня.',
    hint: 'Правда там, где я мягкий к тебе и где WhatsApp у нас как отдельный язык.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      ids: ['soft', 'wa']
    },
    partialRules: {
      requiredCount: 2
    },
    uiOptions: {
      options: [
        { id: 'soft', text: 'С тобой я становлюсь мягче и добрее, даже когда ворчу' },
        { id: 'night', text: 'Я ложусь спать строго в 22:00 и никогда не залипаю в чат' },
        { id: 'wa', text: 'Я перечитываю наши WhatsApp-переписки, когда скучаю' },
        { id: 'cold', text: 'Я полностью равнодушен к твоим объятиям (очевидная ложь)' }
      ]
    }
  }
];

const ui = {
  stage: document.getElementById('stage'),
  stepLabel: document.getElementById('stepLabel'),
  scoreLabel: document.getElementById('scoreLabel'),
  progressBar: document.getElementById('progressBar'),
  progressWrap: document.querySelector('.progress'),
  backBtn: document.getElementById('backBtn'),
  nextBtn: document.getElementById('nextBtn'),
  navigation: document.getElementById('navigation'),
  live: document.getElementById('srLive')
};

let memoryTimeout = null;
let dragPayload = null;

let state = loadState() || createInitialState();

bindEvents();
render(false);

function bindEvents() {
  ui.backBtn.addEventListener('click', () => {
    if (state.currentStep > 0) {
      state.currentStep -= 1;
      saveState();
      render(true);
      announce(`Шаг ${state.currentStep + 1}`);
    }
  });

  ui.nextBtn.addEventListener('click', () => {
    if (state.completed) return;

    const current = state.stepStates[state.currentStep];
    if (!current.attempted) return;

    if (state.currentStep === steps.length - 1) {
      state.completed = true;
      saveState();
      render(true);
      announce('Все шаги завершены. Показан финальный код.');
      return;
    }

    state.currentStep += 1;
    saveState();
    render(true);
    announce(`Шаг ${state.currentStep + 1}`);
  });

  ui.stage.addEventListener('click', onStageClick);
  ui.stage.addEventListener('input', onStageInput);
  ui.stage.addEventListener('change', onStageChange);
  ui.stage.addEventListener('keydown', onStageKeydown);
  ui.stage.addEventListener('dragstart', onStageDragStart);
  ui.stage.addEventListener('dragover', onStageDragOver);
  ui.stage.addEventListener('drop', onStageDrop);
}

function createInitialState() {
  return {
    currentStep: 0,
    completed: false,
    stepStates: steps.map((step) => ({
      attempted: false,
      bestScore: 0,
      lastScore: null,
      hintOpen: false,
      userData: defaultUserData(step)
    }))
  };
}

function defaultUserData(step) {
  switch (step.type) {
    case 'hotspot':
      return { x: null, y: null };
    case 'number':
      return { value: '' };
    case 'text':
      return { value: '' };
    case 'choice3':
      return { value: '' };
    case 'phrase_dnd':
      return { order: shuffledIndices(step.uiOptions.words.length) };
    case 'select_2_of_4':
      return { selected: [] };
    case 'reorder_4':
      return { order: shuffledIndices(step.uiOptions.items.length) };
    case 'memory_6': {
      const deck = step.uiOptions.pairs.flatMap((pair) => [pair.id, pair.id]);
      return {
        deck: shuffle(deck),
        revealed: [],
        matched: [],
        misses: 0,
        busy: false
      };
    }
    case 'range':
      return { value: step.uiOptions.start };
    case 'choose_2_of_4':
      return { selected: [] };
    default:
      return {};
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!Array.isArray(parsed.stepStates) || parsed.stepStates.length !== steps.length) return null;

    const initial = createInitialState();
    const safe = {
      currentStep: clampInt(parsed.currentStep ?? 0, 0, steps.length - 1),
      completed: Boolean(parsed.completed),
      stepStates: initial.stepStates
    };

    safe.stepStates = parsed.stepStates.map((item, index) => sanitizeStepState(item, steps[index]));

    if (safe.completed) {
      safe.currentStep = steps.length - 1;
    }

    return safe;
  } catch (error) {
    return null;
  }
}

function sanitizeStepState(rawState, step) {
  const defaults = {
    attempted: false,
    bestScore: 0,
    lastScore: null,
    hintOpen: false,
    userData: defaultUserData(step)
  };

  if (!rawState || typeof rawState !== 'object') {
    return defaults;
  }

  return {
    attempted: Boolean(rawState.attempted),
    bestScore: normalizeScore(rawState.bestScore),
    lastScore: rawState.lastScore === null ? null : normalizeScore(rawState.lastScore),
    hintOpen: Boolean(rawState.hintOpen),
    userData: sanitizeUserData(step, rawState.userData)
  };
}

function sanitizeUserData(step, rawData) {
  const base = defaultUserData(step);
  const data = rawData && typeof rawData === 'object' ? rawData : {};

  switch (step.type) {
    case 'hotspot':
      return {
        x: Number.isFinite(data.x) ? clamp(data.x, 0, 100) : null,
        y: Number.isFinite(data.y) ? clamp(data.y, 0, 100) : null
      };

    case 'number':
      return { value: typeof data.value === 'string' || typeof data.value === 'number' ? String(data.value) : '' };

    case 'text':
      return { value: typeof data.value === 'string' ? data.value : '' };

    case 'choice3':
      return { value: typeof data.value === 'string' ? data.value : '' };

    case 'phrase_dnd':
    case 'reorder_4': {
      const expected = step.type === 'phrase_dnd' ? base.order : base.order;
      if (!Array.isArray(data.order)) return base;
      const order = data.order.filter(Number.isInteger);
      if (order.length !== expected.length) return base;
      if (new Set(order).size !== expected.length) return base;
      const max = expected.length - 1;
      for (const value of order) {
        if (value < 0 || value > max) return base;
      }
      return { order };
    }

    case 'select_2_of_4':
    case 'choose_2_of_4': {
      if (!Array.isArray(data.selected)) return base;
      const allowed = step.type === 'select_2_of_4'
        ? step.uiOptions.cards.map((card) => card.id)
        : step.uiOptions.options.map((option) => option.id);

      const selected = [];
      data.selected.forEach((id) => {
        if (typeof id === 'string' && allowed.includes(id) && !selected.includes(id)) {
          selected.push(id);
        }
      });
      return { selected };
    }

    case 'memory_6': {
      if (!Array.isArray(data.deck) || data.deck.length !== 6) return base;
      const revealed = Array.isArray(data.revealed) ? uniqueInts(data.revealed, 0, 5).slice(0, 2) : [];
      const matched = Array.isArray(data.matched) ? uniqueInts(data.matched, 0, 5) : [];
      return {
        deck: data.deck,
        revealed,
        matched,
        misses: Number.isInteger(data.misses) ? Math.max(0, data.misses) : 0,
        busy: Boolean(data.busy)
      };
    }

    case 'range':
      return { value: Number.isFinite(data.value) ? clamp(data.value, step.uiOptions.min, step.uiOptions.max) : step.uiOptions.start };

    default:
      return base;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render(animated) {
  const total = totalScore();
  const attemptedCount = state.stepStates.filter((stepState) => stepState.attempted).length;
  const progress = state.completed ? 100 : Math.round((attemptedCount / steps.length) * 100);

  ui.stepLabel.textContent = state.completed ? 'Финал' : `Шаг ${state.currentStep + 1}/${steps.length}`;
  ui.scoreLabel.textContent = `Очки: ${total}/100`;
  ui.progressBar.style.width = `${progress}%`;
  ui.progressWrap.setAttribute('aria-valuenow', String(progress));

  if (state.completed) {
    ui.navigation.hidden = true;
    swapStage(renderFinal(), animated);
    return;
  }

  ui.navigation.hidden = false;
  ui.backBtn.disabled = state.currentStep === 0;
  ui.nextBtn.disabled = !state.stepStates[state.currentStep].attempted;
  ui.nextBtn.textContent = state.currentStep === steps.length - 1 ? 'К финалу' : 'Дальше';

  const step = steps[state.currentStep];
  const stepState = state.stepStates[state.currentStep];
  swapStage(renderStep(step, stepState), animated);
}

function renderStep(step, stepState) {
  const feedback = stepState.lastScore === null
    ? 'Пока проверки не было. Нажми «Проверить/Засчитать».'
    : `Последняя проверка: <strong>${stepState.lastScore}</strong>, лучший результат: <strong>${stepState.bestScore}</strong>.`;

  return `
    <article class="glass step-card">
      <h2 class="step-title">${escapeHtml(step.title)}</h2>
      <p class="step-text">${escapeHtml(step.text)}</p>

      ${renderMediaPlaceholder(step)}

      <section class="task-card">
        <p class="caption">${escapeHtml(step.uiOptions.helper || 'Выполни задание и нажми проверку.')}</p>
        ${renderTaskByType(step, stepState)}
      </section>

      <div class="controls">
        <button class="btn btn-primary" type="button" data-action="check">Проверить/Засчитать</button>
        <button class="btn" type="button" data-action="hint">Подсказка</button>
        <button class="btn btn-danger" type="button" data-action="reset">Сбросить квест</button>
      </div>

      ${stepState.hintOpen ? `<div class="hint-box"><strong>Подсказка:</strong> ${escapeHtml(step.hint)}</div>` : ''}
      <div class="feedback">${feedback}</div>
    </article>
  `;
}

function renderMediaPlaceholder(step) {
  const title = step.uiOptions.placeholderTitle || 'Карточка-заглушка';
  const subtitle = step.uiOptions.placeholderSubtitle || 'Фото добавим позже';

  return `
    <div class="media-placeholder">
      <div class="media-title">${escapeHtml(title)}</div>
      <p class="caption">${escapeHtml(subtitle)}</p>
      <span class="media-tag">Фото добавим позже</span>
    </div>
  `;
}

function renderTaskByType(step, stepState) {
  const data = stepState.userData;

  switch (step.type) {
    case 'hotspot': {
      const marker = data.x === null || data.y === null
        ? ''
        : `<span class="hotspot-marker" style="left:${data.x}%; top:${data.y}%"></span>`;

      return `
        <div class="hotspot-grid">
          <div class="hotspot-box" id="hotspotBox" data-action="hotspot-click" tabindex="0" aria-label="Область выбора скрытой зоны">
            <div class="caption">Найди невидимую зону кликом.</div>
            ${marker}
          </div>

          <label class="caption" for="hotspotX">Координата X</label>
          <input id="hotspotX" class="hotspot-range" type="range" min="0" max="100" value="${data.x === null ? 50 : Math.round(data.x)}" />

          <label class="caption" for="hotspotY">Координата Y</label>
          <input id="hotspotY" class="hotspot-range" type="range" min="0" max="100" value="${data.y === null ? 50 : Math.round(data.y)}" />

          <p class="caption">${data.x === null ? 'Точка пока не выбрана.' : `Текущая точка: ${Math.round(data.x)} / ${Math.round(data.y)}`}</p>
        </div>
      `;
    }

    case 'number':
      return `
        <label for="numberAnswer" class="caption">${escapeHtml(step.uiOptions.label)}</label>
        <input id="numberAnswer" class="input" type="number" inputmode="numeric" value="${escapeHtml(data.value)}" placeholder="Например, 32" />
      `;

    case 'text':
      return `
        <label for="textAnswer" class="caption">${escapeHtml(step.uiOptions.label)}</label>
        <input id="textAnswer" class="input" type="text" value="${escapeHtml(data.value)}" placeholder="Введи нашу фразу" />
      `;

    case 'choice3':
      return `
        <div class="choice-group" role="radiogroup" aria-label="Выбор из трех вариантов">
          ${step.uiOptions.options
            .map((option) => `
              <label class="choice-option">
                <input type="radio" name="choice3" value="${escapeHtml(option.value)}" ${data.value === option.value ? 'checked' : ''} />
                <span>${escapeHtml(option.label)}</span>
              </label>
            `)
            .join('')}
        </div>
      `;

    case 'phrase_dnd':
      return renderSortableList({
        type: 'phrase_dnd',
        order: data.order,
        labels: step.uiOptions.words
      });

    case 'select_2_of_4':
      return `
        <div class="pick-grid">
          ${step.uiOptions.cards
            .map((card) => {
              const active = data.selected.includes(card.id);
              return `
                <button
                  type="button"
                  class="pick-card ${active ? 'active' : ''}"
                  data-action="toggle-pick"
                  data-id="${escapeHtml(card.id)}"
                >
                  <strong>${escapeHtml(card.title)}</strong>
                  <p>${escapeHtml(card.subtitle)}</p>
                </button>
              `;
            })
            .join('')}
        </div>
      `;

    case 'reorder_4':
      return renderSortableList({
        type: 'reorder_4',
        order: data.order,
        labels: step.uiOptions.items
      });

    case 'memory_6': {
      const pairMap = new Map(step.uiOptions.pairs.map((pair) => [pair.id, pair.label]));
      const opened = new Set(data.revealed);
      const matched = new Set(data.matched);

      return `
        <div class="memory-grid">
          ${data.deck
            .map((pairId, index) => {
              const show = opened.has(index) || matched.has(index);
              const doneClass = matched.has(index) ? 'done' : show ? 'show' : '';
              const text = show ? pairMap.get(pairId) : '?';
              return `
                <button
                  type="button"
                  class="memory-card ${doneClass}"
                  data-action="memory-open"
                  data-index="${index}"
                >${escapeHtml(text)}</button>
              `;
            })
            .join('')}
        </div>
        <p class="caption">Промахи: ${data.misses}. Открыто пар: ${Math.floor(data.matched.length / 2)}/3.</p>
      `;
    }

    case 'range':
      return `
        <div class="range-row">
          <input
            id="rangeAnswer"
            class="range"
            type="range"
            min="${step.uiOptions.min}"
            max="${step.uiOptions.max}"
            step="${step.uiOptions.step}"
            value="${data.value}"
          />
          <span id="rangeValue" class="range-value">${data.value}</span>
        </div>
      `;

    case 'choose_2_of_4':
      return `
        <div class="pick-grid">
          ${step.uiOptions.options
            .map((option) => {
              const active = data.selected.includes(option.id);
              return `
                <button
                  type="button"
                  class="pick-card ${active ? 'active' : ''}"
                  data-action="toggle-pick"
                  data-id="${escapeHtml(option.id)}"
                >
                  ${escapeHtml(option.text)}
                </button>
              `;
            })
            .join('')}
        </div>
      `;

    default:
      return '<p class="caption">Тип задания не поддерживается.</p>';
  }
}

function renderSortableList({ type, order, labels }) {
  return `
    <ul class="sort-list" data-sort-type="${type}">
      ${order
        .map((itemIndex, position) => {
          return `
            <li class="sort-item" draggable="true" data-action="sort-item" data-sort-type="${type}" data-position="${position}">
              <span>${escapeHtml(labels[itemIndex])}</span>
              <span class="sort-controls">
                <button type="button" class="icon-btn" data-action="sort-up" data-sort-type="${type}" data-position="${position}" aria-label="Поднять">↑</button>
                <button type="button" class="icon-btn" data-action="sort-down" data-sort-type="${type}" data-position="${position}" aria-label="Опустить">↓</button>
              </span>
            </li>
          `;
        })
        .join('')}
    </ul>
  `;
}

function renderFinal() {
  const rows = steps
    .map((step, index) => {
      const score = state.stepStates[index].bestScore;
      return `<tr><td>${index + 1}</td><td>${escapeHtml(step.title)}</td><td>${score}</td></tr>`;
    })
    .join('');

  const total = totalScore();
  const code = (total / 2) * 1000;

  return `
    <article class="glass final-card">
      <h2 class="step-title">Финал, Алина</h2>
      <p class="step-text">Ты прошла весь маршрут. Ниже твой результат и секретный код.</p>

      <table class="final-table">
        <thead>
          <tr>
            <th>Шаг</th>
            <th>Задание</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <p><strong>totalScore:</strong> ${total}</p>
      <p><strong>Секретное число:</strong></p>
      <div class="secret-code">${formatCode(code)}</div>
      <p class="step-text">Отправь мне этот код в WhatsApp.</p>

      <div class="controls">
        <button class="btn btn-primary" type="button" data-action="restart">Пройти заново</button>
      </div>
    </article>
  `;
}

function onStageClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;

  if (action === 'restart') {
    resetQuest();
    return;
  }

  if (state.completed) return;

  const step = currentStep();
  const stepState = currentStepState();

  switch (action) {
    case 'check': {
      const score = evaluateStep(step, stepState.userData);
      stepState.lastScore = score;
      stepState.bestScore = Math.max(stepState.bestScore, score);
      stepState.attempted = true;
      saveState();
      render(false);
      announce(`Проверка завершена. ${score} очков.`);
      break;
    }

    case 'hint': {
      stepState.hintOpen = !stepState.hintOpen;
      saveState();
      render(false);
      break;
    }

    case 'reset': {
      resetQuest();
      break;
    }

    case 'hotspot-click': {
      if (step.type !== 'hotspot') return;
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      stepState.userData.x = clamp(x, 0, 100);
      stepState.userData.y = clamp(y, 0, 100);
      saveState();
      render(false);
      break;
    }

    case 'toggle-pick': {
      togglePick(step, stepState, target.dataset.id);
      break;
    }

    case 'sort-up': {
      moveSort(stepState, target.dataset.sortType, Number(target.dataset.position), -1);
      break;
    }

    case 'sort-down': {
      moveSort(stepState, target.dataset.sortType, Number(target.dataset.position), 1);
      break;
    }

    case 'memory-open': {
      if (step.type !== 'memory_6') return;
      openMemoryCard(stepState, Number(target.dataset.index));
      break;
    }

    default:
      break;
  }
}

function onStageInput(event) {
  if (state.completed) return;

  const step = currentStep();
  const stepState = currentStepState();

  if (step.type === 'hotspot') {
    if (event.target.id === 'hotspotX') {
      stepState.userData.x = clamp(Number(event.target.value), 0, 100);
      if (!Number.isFinite(stepState.userData.y)) {
        stepState.userData.y = 50;
      }
      saveState();
      render(false);
      return;
    }

    if (event.target.id === 'hotspotY') {
      stepState.userData.y = clamp(Number(event.target.value), 0, 100);
      if (!Number.isFinite(stepState.userData.x)) {
        stepState.userData.x = 50;
      }
      saveState();
      render(false);
      return;
    }
  }

  if (step.type === 'number' && event.target.id === 'numberAnswer') {
    stepState.userData.value = event.target.value;
    saveState();
    return;
  }

  if (step.type === 'text' && event.target.id === 'textAnswer') {
    stepState.userData.value = event.target.value;
    saveState();
    return;
  }

  if (step.type === 'range' && event.target.id === 'rangeAnswer') {
    stepState.userData.value = Number(event.target.value);
    const valueEl = document.getElementById('rangeValue');
    if (valueEl) {
      valueEl.textContent = String(stepState.userData.value);
    }
    saveState();
  }
}

function onStageChange(event) {
  if (state.completed) return;

  const step = currentStep();
  const stepState = currentStepState();

  if (step.type === 'choice3' && event.target.name === 'choice3') {
    stepState.userData.value = event.target.value;
    saveState();
  }
}

function onStageKeydown(event) {
  const hotspotBox = event.target.closest('#hotspotBox');
  if (hotspotBox && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    const rect = hotspotBox.getBoundingClientRect();
    const x = rect.width * 0.5;
    const y = rect.height * 0.5;

    const stepState = currentStepState();
    stepState.userData.x = (x / rect.width) * 100;
    stepState.userData.y = (y / rect.height) * 100;
    saveState();
    render(false);
  }
}

function onStageDragStart(event) {
  if (state.completed) return;

  const item = event.target.closest('[data-action="sort-item"]');
  if (!item) return;

  dragPayload = {
    sortType: item.dataset.sortType,
    from: Number(item.dataset.position)
  };

  event.dataTransfer.effectAllowed = 'move';
}

function onStageDragOver(event) {
  if (!dragPayload) return;

  const item = event.target.closest('[data-action="sort-item"]');
  if (!item) return;

  if (item.dataset.sortType === dragPayload.sortType) {
    event.preventDefault();
  }
}

function onStageDrop(event) {
  if (!dragPayload || state.completed) return;

  const item = event.target.closest('[data-action="sort-item"]');
  if (!item) {
    dragPayload = null;
    return;
  }

  const sortType = item.dataset.sortType;
  if (sortType !== dragPayload.sortType) {
    dragPayload = null;
    return;
  }

  event.preventDefault();

  const to = Number(item.dataset.position);
  const stepState = currentStepState();
  const key = sortType === 'phrase_dnd' ? 'order' : 'order';
  moveInArray(stepState.userData[key], dragPayload.from, to);
  dragPayload = null;
  saveState();
  render(false);
}

function moveSort(stepState, sortType, from, delta) {
  const to = from + delta;
  const order = stepState.userData.order;
  if (to < 0 || to >= order.length) return;
  moveInArray(order, from, to);
  saveState();
  render(false);
}

function togglePick(step, stepState, id) {
  if (!id) return;

  const selected = stepState.userData.selected;
  const exists = selected.includes(id);

  if (exists) {
    stepState.userData.selected = selected.filter((value) => value !== id);
    saveState();
    render(false);
    return;
  }

  if (selected.length >= 2) {
    announce('Можно выбрать ровно 2 варианта. Сначала сними один.');
    return;
  }

  stepState.userData.selected = [...selected, id];
  saveState();
  render(false);
}

function openMemoryCard(stepState, index) {
  const data = stepState.userData;

  if (data.busy) return;
  if (data.matched.includes(index)) return;
  if (data.revealed.includes(index)) return;

  data.revealed.push(index);

  if (data.revealed.length < 2) {
    saveState();
    render(false);
    return;
  }

  const [a, b] = data.revealed;
  const same = data.deck[a] === data.deck[b];

  if (same) {
    data.matched.push(a, b);
    data.revealed = [];
    saveState();
    render(false);
    return;
  }

  data.misses += 1;
  data.busy = true;
  saveState();
  render(false);

  if (memoryTimeout) {
    clearTimeout(memoryTimeout);
  }

  const stepIndex = state.currentStep;
  memoryTimeout = window.setTimeout(() => {
    const safeState = state.stepStates[stepIndex];
    if (!safeState) return;

    safeState.userData.revealed = [];
    safeState.userData.busy = false;
    saveState();
    if (!state.completed && state.currentStep === stepIndex) {
      render(false);
    }
  }, 700);
}

function evaluateStep(step, userData) {
  switch (step.type) {
    case 'hotspot': {
      if (!Number.isFinite(userData.x) || !Number.isFinite(userData.y)) return 0;

      const zone = step.correct.zone;
      if (insideRect(userData.x, userData.y, zone, 0)) {
        return step.scoring.full;
      }

      if (insideRect(userData.x, userData.y, zone, step.partialRules.expandPxPercent)) {
        return step.scoring.partial;
      }

      return step.scoring.wrong;
    }

    case 'number': {
      const value = Number(userData.value);
      if (!Number.isFinite(value)) return 0;
      if (value === step.correct.value) return step.scoring.full;
      if (value >= step.partialRules.min && value <= step.partialRules.max) return step.scoring.partial;
      return step.scoring.wrong;
    }

    case 'text': {
      const normalized = normalizeText(userData.value);
      if (!normalized) return 0;

      const answers = step.correct.answers.map(normalizeText);
      if (answers.includes(normalized)) return step.scoring.full;

      const hasRoot = step.partialRules.roots.some((root) => normalized.includes(normalizeText(root)));
      if (hasRoot) return step.scoring.partial;

      return step.scoring.wrong;
    }

    case 'choice3': {
      if (!userData.value) return 0;
      if (userData.value === step.correct.value) return step.scoring.full;
      if (userData.value === step.partialRules.partialValue) return step.scoring.partial;
      return step.scoring.wrong;
    }

    case 'phrase_dnd': {
      const matches = countPositionMatches(userData.order, step.correct.order);
      if (matches === step.correct.order.length) return step.scoring.full;
      if (matches >= step.partialRules.minCorrectPositions) return step.scoring.partial;
      return step.scoring.wrong;
    }

    case 'select_2_of_4': {
      if (userData.selected.length !== step.partialRules.requiredCount) return 0;
      const correctIds = step.correct.ids;
      const matched = userData.selected.filter((id) => correctIds.includes(id)).length;
      if (matched === 2) return step.scoring.full;
      if (matched === 1) return step.scoring.partial;
      return step.scoring.wrong;
    }

    case 'reorder_4': {
      const matches = countPositionMatches(userData.order, step.correct.order);
      if (matches === step.correct.order.length) return step.scoring.full;
      if (matches >= step.partialRules.minCorrectPositions) return step.scoring.partial;
      return step.scoring.wrong;
    }

    case 'memory_6': {
      const pairs = Math.floor(userData.matched.length / 2);
      if (pairs === step.correct.totalPairs) {
        if (userData.misses <= step.partialRules.fullMaxMisses) return step.scoring.full;
        return step.scoring.partial;
      }

      if (pairs >= step.partialRules.partialMinPairs) return step.scoring.partial;
      return step.scoring.wrong;
    }

    case 'range': {
      const diff = Math.abs(Number(userData.value) - step.correct.value);
      if (diff <= step.partialRules.fullTolerance) return step.scoring.full;
      if (diff <= step.partialRules.partialTolerance) return step.scoring.partial;
      return step.scoring.wrong;
    }

    case 'choose_2_of_4': {
      if (userData.selected.length !== step.partialRules.requiredCount) return 0;
      const matched = userData.selected.filter((id) => step.correct.ids.includes(id)).length;
      if (matched === 2) return step.scoring.full;
      if (matched === 1) return step.scoring.partial;
      return step.scoring.wrong;
    }

    default:
      return 0;
  }
}

function resetQuest() {
  const approved = window.confirm('Сбросить квест и удалить прогресс?');
  if (!approved) return;

  if (memoryTimeout) {
    clearTimeout(memoryTimeout);
    memoryTimeout = null;
  }

  localStorage.removeItem(STORAGE_KEY);
  state = createInitialState();
  saveState();
  render(false);
  announce('Прогресс очищен. Квест начат заново.');
}

function swapStage(newHtml, animated) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const current = ui.stage.firstElementChild;

  if (!animated || prefersReduced || !current) {
    ui.stage.innerHTML = newHtml;
    const card = ui.stage.firstElementChild;
    if (card) card.classList.add('enter');
    return;
  }

  current.classList.add('leave');
  current.addEventListener(
    'animationend',
    () => {
      ui.stage.innerHTML = newHtml;
      const card = ui.stage.firstElementChild;
      if (card) card.classList.add('enter');
    },
    { once: true }
  );
}

function currentStep() {
  return steps[state.currentStep];
}

function currentStepState() {
  return state.stepStates[state.currentStep];
}

function totalScore() {
  return state.stepStates.reduce((sum, stepState) => sum + normalizeScore(stepState.bestScore), 0);
}

function normalizeScore(value) {
  const score = Number(value);
  return SCORE_SET.includes(score) ? score : 0;
}

function shuffledIndices(length) {
  const base = Array.from({ length }, (_, i) => i);
  const result = shuffle(base);
  if (arraysEqual(result, base)) {
    result.reverse();
  }
  return result;
}

function countPositionMatches(left, right) {
  let count = 0;
  const len = Math.min(left.length, right.length);
  for (let i = 0; i < len; i += 1) {
    if (left[i] === right[i]) count += 1;
  }
  return count;
}

function insideRect(x, y, rect, expand) {
  const left = rect.x - expand;
  const top = rect.y - expand;
  const right = rect.x + rect.w + expand;
  const bottom = rect.y + rect.h + expand;
  return x >= left && x <= right && y >= top && y <= bottom;
}

function moveInArray(array, from, to) {
  if (from === to) return;
  const copy = array;
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
}

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ');
}

function formatCode(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

function shuffle(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function uniqueInts(values, min, max) {
  const unique = new Set();
  values.forEach((value) => {
    if (Number.isInteger(value) && value >= min && value <= max) {
      unique.add(value);
    }
  });
  return [...unique];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampInt(value, min, max) {
  return Math.min(max, Math.max(min, Math.trunc(Number(value) || 0)));
}

function announce(text) {
  ui.live.textContent = text;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
