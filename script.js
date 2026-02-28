'use strict';

const STORAGE_KEY = 'quest_8mart_v1';
const SCORE_VALUES = [0, 5, 10];
const STEP_COUNT = 10;

const QUEST_STEPS = [
  {
    id: 'step1_hotspot',
    type: 'hotspot',
    title: 'STEP_TITLE_1',
    text: 'STEP_TEXT_1',
    hint: 'HINT_1',
    media: 'assets/photo1.jpg',
    correctAnswers: { x: 68, y: 42 },
    partialRules: { fullRadius: 10, partialRadius: 20 },
    pointsLogic: { full: 10, partial: 5, wrong: 0 },
    ui: {
      prompt: 'Отметьте точку на фото: можно кликнуть по изображению или выставить координаты ползунками.'
    }
  },
  {
    id: 'step2_number',
    type: 'number',
    title: 'STEP_TITLE_2',
    text: 'STEP_TEXT_2',
    hint: 'HINT_2',
    media: 'assets/photo2.jpg',
    correctAnswers: { exact: 42 },
    partialRules: { min: 39, max: 45 },
    pointsLogic: { full: 10, partial: 5, wrong: 0 },
    ui: {
      label: 'Введите число:'
    }
  },
  {
    id: 'step3_text',
    type: 'text',
    title: 'STEP_TITLE_3',
    text: 'STEP_TEXT_3',
    hint: 'HINT_3',
    media: 'assets/photo3.jpg',
    correctAnswers: ['весна', 'весна пришла'],
    partialRules: { acceptedFragments: ['март', 'цвет', 'тепло'] },
    pointsLogic: { full: 10, partial: 5, wrong: 0 },
    ui: {
      label: 'Введите слово или фразу:'
    }
  },
  {
    id: 'step4_choice3',
    type: 'choice3',
    title: 'STEP_TITLE_4',
    text: 'STEP_TEXT_4',
    hint: 'HINT_4',
    media: 'assets/photo4.jpg',
    correctAnswers: { correct: 'b', partial: 'c' },
    partialRules: { partialOption: 'c' },
    pointsLogic: { full: 10, partial: 5, wrong: 0 },
    ui: {
      question: 'Выберите один вариант:',
      options: [
        { value: 'a', label: 'Вариант A' },
        { value: 'b', label: 'Вариант B' },
        { value: 'c', label: 'Вариант C' }
      ]
    }
  },
  {
    id: 'step5_puzzle',
    type: 'puzzle',
    title: 'STEP_TITLE_5',
    text: 'STEP_TEXT_5',
    hint: 'HINT_5',
    media: 'assets/photo5.jpg',
    correctAnswers: { order: [0, 1, 2, 3] },
    partialRules: { minCorrectPositions: 2 },
    pointsLogic: { full: 10, partial: 5, wrong: 0 },
    ui: {
      tiles: [
        { id: 0, label: 'Фрагмент 1' },
        { id: 1, label: 'Фрагмент 2' },
        { id: 2, label: 'Фрагмент 3' },
        { id: 3, label: 'Фрагмент 4' }
      ]
    }
  },
  {
    id: 'step6_reorder',
    type: 'reorder',
    title: 'STEP_TITLE_6',
    text: 'STEP_TEXT_6',
    hint: 'HINT_6',
    media: 'assets/photo6.jpg',
    correctAnswers: { order: [0, 1, 2, 3] },
    partialRules: { minCorrectPositions: 2 },
    pointsLogic: { full: 10, partial: 5, wrong: 0 },
    ui: {
      events: [
        'Событие 1',
        'Событие 2',
        'Событие 3',
        'Событие 4'
      ]
    }
  },
  {
    id: 'step7_word_tiles',
    type: 'wordTiles',
    title: 'STEP_TITLE_7',
    text: 'STEP_TEXT_7',
    hint: 'HINT_7',
    media: '',
    correctAnswers: { order: [0, 1, 2, 3, 4] },
    partialRules: { maxWrongPositions: 2 },
    pointsLogic: { full: 10, partial: 5, wrong: 0 },
    ui: {
      words: ['С', 'праздником', 'весны', 'и', 'красоты']
    }
  },
  {
    id: 'step8_memory',
    type: 'memory6',
    title: 'STEP_TITLE_8',
    text: 'STEP_TEXT_8',
    hint: 'HINT_8',
    media: '',
    correctAnswers: { pairs: 3 },
    partialRules: { maxMissesForFull: 3 },
    pointsLogic: { full: 10, partial: 5, wrong: 0 },
    ui: {
      pairLabels: {
        tulip: 'Тюльпан',
        gift: 'Подарок',
        card: 'Открытка'
      },
      pairKeys: ['tulip', 'gift', 'card']
    }
  },
  {
    id: 'step9_range',
    type: 'range',
    title: 'STEP_TITLE_9',
    text: 'STEP_TEXT_9',
    hint: 'HINT_9',
    media: '',
    correctAnswers: { target: 73 },
    partialRules: { fullTolerance: 2, partialTolerance: 8 },
    pointsLogic: { full: 10, partial: 5, wrong: 0 },
    ui: {
      min: 0,
      max: 100,
      step: 1,
      start: 50,
      label: 'Выберите значение:'
    }
  },
  {
    id: 'step10_yesno',
    type: 'yesno',
    title: 'STEP_TITLE_10',
    text: 'STEP_TEXT_10',
    hint: 'HINT_10',
    media: '',
    correctAnswers: { value: 'yes' },
    partialRules: {},
    pointsLogic: { full: 10, partial: 0, wrong: 0 },
    ui: {
      question: 'Ответьте Да или Нет:'
    }
  }
];

const stepCounterEl = document.getElementById('stepCounter');
const scoreCounterEl = document.getElementById('scoreCounter');
const progressFillEl = document.getElementById('progressFill');
const stageEl = document.getElementById('stage');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const navPanel = document.getElementById('navPanel');
const liveRegion = document.getElementById('liveRegion');
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let memoryFlipTimeout = null;
const dragState = {
  mode: null,
  tileId: null,
  sourceSlot: null,
  reorderItemId: null
};

let appState = loadState();
if (!appState) {
  appState = createInitialState();
}

bindGlobalEvents();
renderApp(false);

function bindGlobalEvents() {
  backBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  stageEl.addEventListener('click', handleStageClick);
  stageEl.addEventListener('input', handleStageInput);
  stageEl.addEventListener('change', handleStageChange);
  stageEl.addEventListener('keydown', handleStageKeydown);

  stageEl.addEventListener('dragstart', handleStageDragStart);
  stageEl.addEventListener('dragover', handleStageDragOver);
  stageEl.addEventListener('drop', handleStageDrop);
}

function createInitialState() {
  return {
    currentStep: 0,
    stepResults: QUEST_STEPS.map((step) => ({
      attempted: false,
      bestScore: 0,
      lastScore: null,
      locked: false,
      hintOpened: false,
      answerSnapshot: getDefaultSnapshot(step)
    })),
    totalScore: 0,
    completed: false
  };
}

function getDefaultSnapshot(step) {
  switch (step.type) {
    case 'hotspot':
      return { x: null, y: null };
    case 'number':
      return { value: '' };
    case 'text':
      return { value: '' };
    case 'choice3':
      return { value: '' };
    case 'puzzle':
      return { slots: [null, null, null, null], selectedTile: null };
    case 'reorder':
      return { order: step.ui.events.map((_, index) => index) };
    case 'wordTiles':
      return { answer: [] };
    case 'memory6': {
      const keys = step.ui.pairKeys.flatMap((key) => [key, key]);
      return {
        cards: shuffle(keys),
        matched: [],
        open: [],
        misses: 0,
        busy: false
      };
    }
    case 'range':
      return { value: step.ui.start };
    case 'yesno':
      return { value: '' };
    default:
      return {};
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return sanitizeState(parsed);
  } catch (error) {
    return null;
  }
}

function sanitizeState(rawState) {
  if (!rawState || typeof rawState !== 'object') {
    return null;
  }

  const initial = createInitialState();
  const sanitized = {
    currentStep: Number.isInteger(rawState.currentStep) ? rawState.currentStep : 0,
    completed: Boolean(rawState.completed),
    stepResults: initial.stepResults,
    totalScore: 0
  };

  if (Array.isArray(rawState.stepResults) && rawState.stepResults.length === STEP_COUNT) {
    sanitized.stepResults = rawState.stepResults.map((result, index) => sanitizeResult(result, QUEST_STEPS[index]));
  }

  sanitized.totalScore = computeTotalScore(sanitized.stepResults);

  if (sanitized.completed) {
    sanitized.currentStep = STEP_COUNT;
  } else {
    sanitized.currentStep = clampInt(sanitized.currentStep, 0, STEP_COUNT - 1);
  }

  return sanitized;
}

function sanitizeResult(rawResult, step) {
  const defaults = {
    attempted: false,
    bestScore: 0,
    lastScore: null,
    locked: false,
    hintOpened: false,
    answerSnapshot: getDefaultSnapshot(step)
  };

  if (!rawResult || typeof rawResult !== 'object') {
    return defaults;
  }

  const bestScore = normalizeScore(rawResult.bestScore);
  const lastScore = rawResult.lastScore === null ? null : normalizeScore(rawResult.lastScore);

  return {
    attempted: Boolean(rawResult.attempted),
    bestScore,
    lastScore,
    locked: Boolean(rawResult.locked),
    hintOpened: Boolean(rawResult.hintOpened),
    answerSnapshot: sanitizeSnapshot(step, rawResult.answerSnapshot)
  };
}

function sanitizeSnapshot(step, rawSnapshot) {
  const defaults = getDefaultSnapshot(step);
  const snapshot = rawSnapshot && typeof rawSnapshot === 'object' ? rawSnapshot : {};

  switch (step.type) {
    case 'hotspot':
      return {
        x: isFiniteNumber(snapshot.x) ? clamp(snapshot.x, 0, 100) : null,
        y: isFiniteNumber(snapshot.y) ? clamp(snapshot.y, 0, 100) : null
      };
    case 'number':
      return { value: typeof snapshot.value === 'string' || typeof snapshot.value === 'number' ? String(snapshot.value) : '' };
    case 'text':
      return { value: typeof snapshot.value === 'string' ? snapshot.value : '' };
    case 'choice3':
      return { value: typeof snapshot.value === 'string' ? snapshot.value : '' };
    case 'puzzle': {
      const slots = Array.isArray(snapshot.slots) && snapshot.slots.length === 4 ? snapshot.slots : defaults.slots;
      const safeSlots = slots.map((value) => (Number.isInteger(value) ? value : null));
      const selectedTile = Number.isInteger(snapshot.selectedTile) ? snapshot.selectedTile : null;
      return { slots: safeSlots, selectedTile };
    }
    case 'reorder': {
      const order = Array.isArray(snapshot.order) ? snapshot.order.filter(Number.isInteger) : defaults.order;
      const expected = defaults.order;
      return { order: normalizeOrdering(order, expected) };
    }
    case 'wordTiles':
      return {
        answer: Array.isArray(snapshot.answer) ? snapshot.answer.filter(Number.isInteger) : []
      };
    case 'memory6': {
      const cards = Array.isArray(snapshot.cards) && snapshot.cards.length === 6 ? snapshot.cards : defaults.cards;
      const matched = Array.isArray(snapshot.matched) ? uniqueInts(snapshot.matched, 0, 5) : [];
      const open = Array.isArray(snapshot.open) ? uniqueInts(snapshot.open, 0, 5).slice(0, 2) : [];
      return {
        cards,
        matched,
        open,
        misses: Number.isInteger(snapshot.misses) ? Math.max(0, snapshot.misses) : 0,
        busy: Boolean(snapshot.busy)
      };
    }
    case 'range':
      return {
        value: isFiniteNumber(snapshot.value) ? clamp(snapshot.value, step.ui.min, step.ui.max) : step.ui.start
      };
    case 'yesno':
      return { value: snapshot.value === 'yes' || snapshot.value === 'no' ? snapshot.value : '' };
    default:
      return defaults;
  }
}

function normalizeOrdering(order, expectedOrder) {
  if (order.length !== expectedOrder.length) {
    return [...expectedOrder];
  }
  const unique = Array.from(new Set(order));
  if (unique.length !== expectedOrder.length) {
    return [...expectedOrder];
  }
  for (const value of unique) {
    if (!expectedOrder.includes(value)) {
      return [...expectedOrder];
    }
  }
  return order;
}

function saveState() {
  appState.totalScore = computeTotalScore(appState.stepResults);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function computeTotalScore(stepResults) {
  return stepResults.reduce((sum, item) => sum + normalizeScore(item.bestScore), 0);
}

function normalizeScore(value) {
  const score = Number(value);
  return SCORE_VALUES.includes(score) ? score : 0;
}

function renderApp(animated) {
  appState.totalScore = computeTotalScore(appState.stepResults);
  updateHeader();
  updateNavigation();

  if (appState.completed) {
    renderFinal(animated);
  } else {
    renderStep(animated);
  }

  saveState();
}

function updateHeader() {
  if (appState.completed) {
    stepCounterEl.textContent = 'Финал';
  } else {
    stepCounterEl.textContent = `Шаг ${appState.currentStep + 1}/${STEP_COUNT}`;
  }

  scoreCounterEl.textContent = `Очки: ${appState.totalScore}/100`;

  const completedCount = appState.stepResults.filter((item) => item.locked || item.attempted).length;
  const progress = appState.completed ? 100 : Math.round((completedCount / STEP_COUNT) * 100);
  progressFillEl.style.width = `${progress}%`;
  progressFillEl.parentElement.setAttribute('aria-valuenow', String(progress));
}

function updateNavigation() {
  if (appState.completed) {
    navPanel.hidden = true;
    return;
  }

  navPanel.hidden = false;
  backBtn.disabled = appState.currentStep === 0;

  const currentResult = appState.stepResults[appState.currentStep];
  nextBtn.disabled = !currentResult.attempted;
  nextBtn.textContent = appState.currentStep === STEP_COUNT - 1 ? 'К финалу' : 'Дальше';
}

function renderStep(animated) {
  const step = QUEST_STEPS[appState.currentStep];
  const result = appState.stepResults[appState.currentStep];
  const locked = result.locked;
  const mediaHtml = step.media
    ? `<div class="media-wrap"><img src="${step.media}" alt="Иллюстрация шага ${appState.currentStep + 1}" /></div>`
    : '';

  const feedback = result.lastScore === null
    ? 'Пока нет проверки. Нажмите «Проверить/Засчитать».'
    : `Последняя проверка: <strong>${result.lastScore}</strong>. Лучший результат: <strong>${result.bestScore}</strong>.`;

  const html = `
    <article class="step-card" data-step-type="${step.type}">
      <h1 class="step-title">${step.title}</h1>
      <p class="step-text">${step.text}</p>
      ${mediaHtml}
      <section class="task-box">
        <p class="task-caption">${step.ui.prompt || step.ui.label || step.ui.question || 'Выполните задание:'}</p>
        ${renderTask(step, result)}
      </section>

      <div class="controls-row">
        <button type="button" class="btn btn-primary" data-action="check-step" ${locked ? 'disabled' : ''}>Проверить/Засчитать</button>
        <button type="button" class="btn" data-action="hint-toggle">Подсказка</button>
        <button type="button" class="btn btn-danger" data-action="reset-quest">Сбросить квест</button>
      </div>

      ${result.hintOpened ? `<div class="hint-box"><strong>Подсказка:</strong> ${step.hint}</div>` : ''}
      <p class="feedback">${feedback}</p>
      ${locked ? '<div class="locked-box">Шаг зафиксирован после перехода вперёд. Изменение ответа отключено.</div>' : ''}
    </article>
  `;

  swapStage(html, animated);
}

function renderTask(step, result) {
  const snapshot = result.answerSnapshot;
  const locked = result.locked;

  switch (step.type) {
    case 'hotspot': {
      const xValue = snapshot.x === null ? 50 : Math.round(snapshot.x);
      const yValue = snapshot.y === null ? 50 : Math.round(snapshot.y);
      const marker = snapshot.x === null || snapshot.y === null
        ? ''
        : `<span class="hotspot-dot" id="hotspotDot" style="left:${snapshot.x}%; top:${snapshot.y}%;"></span>`;

      return `
        <div class="hotspot-frame" id="hotspotFrame" data-interactive="true" tabindex="0" aria-label="Область выбора точки">
          <img src="${step.media}" alt="Фото для выбора точки" />
          ${marker}
        </div>
        <div class="hotspot-controls">
          <label>Координата X
            <input class="range-input" type="range" id="hotspotX" min="0" max="100" value="${xValue}" ${locked ? 'disabled' : ''} />
          </label>
          <label>Координата Y
            <input class="range-input" type="range" id="hotspotY" min="0" max="100" value="${yValue}" ${locked ? 'disabled' : ''} />
          </label>
          <p class="task-caption" id="hotspotCoords">${snapshot.x === null ? 'Точка не выбрана.' : `Точка: ${Math.round(snapshot.x)}% / ${Math.round(snapshot.y)}%`}</p>
        </div>
      `;
    }

    case 'number':
      return `
        <label>${step.ui.label}
          <input class="number-input" id="numberInput" type="number" inputmode="numeric" value="${escapeHtml(snapshot.value)}" placeholder="Введите число" ${locked ? 'disabled' : ''} />
        </label>
      `;

    case 'text':
      return `
        <label>${step.ui.label}
          <input class="text-input" id="textInput" type="text" value="${escapeHtml(snapshot.value)}" placeholder="Введите ответ" ${locked ? 'disabled' : ''} />
        </label>
      `;

    case 'choice3':
      return `
        <div class="choice-grid" role="radiogroup" aria-label="Выбор из трех вариантов">
          ${step.ui.options
            .map((option) => `
              <label class="choice-item">
                <input type="radio" name="choice3" value="${option.value}" ${snapshot.value === option.value ? 'checked' : ''} ${locked ? 'disabled' : ''} />
                <span>${option.label}</span>
              </label>
            `)
            .join('')}
        </div>
      `;

    case 'puzzle': {
      const slots = snapshot.slots;
      const tilesById = new Map(step.ui.tiles.map((tile) => [tile.id, tile]));
      const placedIds = slots.filter((value) => value !== null);
      const poolIds = step.ui.tiles.map((tile) => tile.id).filter((id) => !placedIds.includes(id));
      const matched = countMatches(slots, step.correctAnswers.order);

      const slotsHtml = slots
        .map((tileId, slotIndex) => {
          if (tileId === null) {
            return `
              <div class="puzzle-slot" data-slot-index="${slotIndex}" data-action="puzzle-place-slot" tabindex="0">
                <span>Слот ${slotIndex + 1}</span>
              </div>
            `;
          }

          const tile = tilesById.get(tileId);
          const selectedClass = snapshot.selectedTile === tileId ? 'selected' : '';
          return `
            <div class="puzzle-slot" data-slot-index="${slotIndex}" data-action="puzzle-place-slot" tabindex="0">
              <div class="puzzle-tile ${selectedClass}" draggable="${locked ? 'false' : 'true'}" data-tile-id="${tile.id}" data-slot-index="${slotIndex}" data-action="puzzle-select-tile" tabindex="0">
                ${tile.label}
              </div>
              <button type="button" class="compact-btn" data-action="puzzle-remove-slot" data-slot-index="${slotIndex}" ${locked ? 'disabled' : ''}>Убрать</button>
            </div>
          `;
        })
        .join('');

      const poolHtml = poolIds
        .map((tileId) => {
          const tile = tilesById.get(tileId);
          const selectedClass = snapshot.selectedTile === tileId ? 'selected' : '';
          return `<div class="puzzle-tile ${selectedClass}" draggable="${locked ? 'false' : 'true'}" data-tile-id="${tile.id}" data-slot-index="" data-action="puzzle-select-tile" tabindex="0">${tile.label}</div>`;
        })
        .join('');

      return `
        <div class="task-caption">Перетаскивайте фрагменты в слоты. Есть автопроверка совпадений.</div>
        <div class="puzzle-grid">${slotsHtml}</div>
        <div class="puzzle-pool" id="puzzlePool" data-drop-pool="true">${poolHtml}</div>
        <div class="slot-buttons">
          ${[0, 1, 2, 3]
            .map((slotIndex) => `<button type="button" class="compact-btn" data-action="puzzle-place-slot" data-slot-index="${slotIndex}" ${locked ? 'disabled' : ''}>В слот ${slotIndex + 1}</button>`)
            .join('')}
          <button type="button" class="compact-btn" data-action="puzzle-clear" ${locked ? 'disabled' : ''}>Очистить</button>
        </div>
        <p class="task-caption">Автопроверка: совпадений ${matched}/4.</p>
      `;
    }

    case 'reorder': {
      const order = snapshot.order;
      return `
        <ul class="reorder-list" id="reorderList">
          ${order
            .map((itemId, index) => {
              const text = step.ui.events[itemId];
              return `
                <li class="reorder-item" draggable="${locked ? 'false' : 'true'}" data-item-id="${itemId}" data-order-index="${index}">
                  <span>${text}</span>
                  <div class="compact-controls">
                    <button type="button" class="compact-btn" data-action="reorder-up" data-order-index="${index}" ${locked ? 'disabled' : ''}>↑</button>
                    <button type="button" class="compact-btn" data-action="reorder-down" data-order-index="${index}" ${locked ? 'disabled' : ''}>↓</button>
                  </div>
                </li>
              `;
            })
            .join('')}
        </ul>
      `;
    }

    case 'wordTiles': {
      const answer = snapshot.answer;
      const pool = step.ui.words
        .map((_, index) => index)
        .filter((index) => !answer.includes(index));

      const answerHtml = answer.length
        ? answer
            .map((wordIndex, index) => `
              <button type="button" class="word-chip" data-action="word-remove" data-answer-index="${index}" ${locked ? 'disabled' : ''}>
                ${step.ui.words[wordIndex]} ×
              </button>
            `)
            .join('')
        : '<span class="task-caption">Пока пусто</span>';

      return `
        <div class="tile-zone">
          <div>
            <p class="task-caption">Собранная фраза:</p>
            <div class="answer-line">${answerHtml}</div>
          </div>
          <div>
            <p class="task-caption">Доступные слова:</p>
            <div class="word-bank">
              ${pool
                .map((wordIndex) => `<button type="button" class="word-option" data-action="word-add" data-word-index="${wordIndex}" ${locked ? 'disabled' : ''}>${step.ui.words[wordIndex]}</button>`)
                .join('')}
            </div>
          </div>
          <div>
            <button type="button" class="compact-btn" data-action="word-clear" ${locked ? 'disabled' : ''}>Очистить фразу</button>
          </div>
        </div>
      `;
    }

    case 'memory6': {
      const cardLabels = step.ui.pairLabels;
      const cards = snapshot.cards;
      const matched = new Set(snapshot.matched);
      const opened = new Set(snapshot.open);

      return `
        <div class="memory-grid">
          ${cards
            .map((key, index) => {
              const isMatched = matched.has(index);
              const isOpened = opened.has(index);
              const reveal = isMatched || isOpened;
              const classes = ['memory-card'];
              if (isMatched) classes.push('matched');
              if (isOpened) classes.push('revealed');

              return `
                <button
                  type="button"
                  class="${classes.join(' ')}"
                  data-action="memory-card"
                  data-card-index="${index}"
                  ${locked ? 'disabled' : ''}
                >
                  ${reveal ? cardLabels[key] : '?'}
                </button>
              `;
            })
            .join('')}
        </div>
        <p class="task-caption">Промахи: ${snapshot.misses}. Собрано пар: ${Math.floor(snapshot.matched.length / 2)}/3.</p>
      `;
    }

    case 'range':
      return `
        <label>${step.ui.label}</label>
        <div class="range-line">
          <input
            id="rangeInput"
            class="range-input"
            type="range"
            min="${step.ui.min}"
            max="${step.ui.max}"
            step="${step.ui.step}"
            value="${snapshot.value}"
            ${locked ? 'disabled' : ''}
          />
          <span class="range-value" id="rangeValue">${snapshot.value}</span>
        </div>
      `;

    case 'yesno':
      return `
        <p class="task-caption">${step.ui.question}</p>
        <div class="toggle-wrap">
          <button type="button" class="btn toggle-btn ${snapshot.value === 'yes' ? 'btn-primary' : ''}" data-action="yesno-set" data-value="yes" ${locked ? 'disabled' : ''}>Да</button>
          <button type="button" class="btn toggle-btn ${snapshot.value === 'no' ? 'btn-primary' : ''}" data-action="yesno-set" data-value="no" ${locked ? 'disabled' : ''}>Нет</button>
        </div>
        <p class="task-caption">Выбрано: ${snapshot.value === 'yes' ? 'Да' : snapshot.value === 'no' ? 'Нет' : 'ничего'}</p>
      `;

    default:
      return '<p class="task-caption">Тип задания не поддерживается.</p>';
  }
}

function renderFinal(animated) {
  const rows = QUEST_STEPS.map((step, index) => {
    const points = appState.stepResults[index].bestScore;
    return `<tr><td>${index + 1}</td><td>${step.title}</td><td>${points}</td></tr>`;
  }).join('');

  const payout = (appState.totalScore / 2) * 1000;

  const html = `
    <article class="final-card">
      <h1 class="step-title">Итоги квеста</h1>
      <p class="step-text">Все шаги завершены. Ниже итоговые очки и выигрышная сумма.</p>
      <table class="final-table">
        <thead>
          <tr>
            <th>Шаг</th>
            <th>Название</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      <p class="final-total">totalScore: ${appState.totalScore} / 100</p>
      <p class="final-total">payout: ${formatTenge(payout)}</p>
      <button type="button" class="btn btn-primary" data-action="final-restart">Пройти заново</button>
    </article>
  `;

  swapStage(html, animated);
}

function swapStage(html, animated) {
  const current = stageEl.firstElementChild;
  const runAnimation = animated && current && !reduceMotionQuery.matches;

  if (!runAnimation) {
    stageEl.innerHTML = html;
    const inserted = stageEl.firstElementChild;
    if (inserted) inserted.classList.add('step-enter');
    return;
  }

  current.classList.add('step-exit');
  window.setTimeout(() => {
    stageEl.innerHTML = html;
    const inserted = stageEl.firstElementChild;
    if (inserted) inserted.classList.add('step-enter');
  }, 200);
}

function navigate(direction) {
  if (appState.completed) {
    return;
  }

  if (direction < 0) {
    if (appState.currentStep > 0) {
      appState.currentStep -= 1;
      renderApp(true);
    }
    return;
  }

  const result = appState.stepResults[appState.currentStep];
  if (!result.attempted) {
    return;
  }

  result.locked = true;

  if (appState.currentStep === STEP_COUNT - 1) {
    appState.completed = true;
    appState.currentStep = STEP_COUNT;
    announce('Квест завершен. Открыты финальные результаты.');
  } else {
    appState.currentStep += 1;
    announce(`Переход к шагу ${appState.currentStep + 1}.`);
  }

  renderApp(true);
}

function handleStageClick(event) {
  const actionTarget = event.target.closest('[data-action]');

  if (actionTarget) {
    const action = actionTarget.dataset.action;

    switch (action) {
      case 'hint-toggle':
        toggleHint();
        return;
      case 'check-step':
        checkCurrentStep();
        return;
      case 'reset-quest':
      case 'final-restart':
        resetQuest();
        return;
      case 'puzzle-select-tile':
        selectPuzzleTile(actionTarget);
        return;
      case 'puzzle-place-slot':
        placeSelectedTile(actionTarget);
        return;
      case 'puzzle-remove-slot':
        removeTileFromSlot(actionTarget);
        return;
      case 'puzzle-clear':
        clearPuzzle();
        return;
      case 'reorder-up':
        reorderByButtons(actionTarget, -1);
        return;
      case 'reorder-down':
        reorderByButtons(actionTarget, 1);
        return;
      case 'word-add':
        addWordTile(actionTarget);
        return;
      case 'word-remove':
        removeWordTile(actionTarget);
        return;
      case 'word-clear':
        clearWordTiles();
        return;
      case 'memory-card':
        revealMemoryCard(actionTarget);
        return;
      case 'yesno-set':
        setYesNo(actionTarget);
        return;
      default:
        break;
    }
  }

  const currentStep = getCurrentStep();
  if (!currentStep || currentStep.type !== 'hotspot' || isCurrentLocked()) {
    return;
  }

  const frame = event.target.closest('#hotspotFrame');
  if (!frame) {
    return;
  }

  const rect = frame.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  const snapshot = getCurrentSnapshot();
  snapshot.x = clamp(x, 0, 100);
  snapshot.y = clamp(y, 0, 100);

  renderApp(false);
}

function handleStageInput(event) {
  const step = getCurrentStep();
  if (!step || isCurrentLocked()) {
    return;
  }

  const snapshot = getCurrentSnapshot();

  if (step.type === 'hotspot' && (event.target.id === 'hotspotX' || event.target.id === 'hotspotY')) {
    const xInput = document.getElementById('hotspotX');
    const yInput = document.getElementById('hotspotY');
    snapshot.x = clamp(Number(xInput.value), 0, 100);
    snapshot.y = clamp(Number(yInput.value), 0, 100);
    const coords = document.getElementById('hotspotCoords');
    if (coords) {
      coords.textContent = `Точка: ${Math.round(snapshot.x)}% / ${Math.round(snapshot.y)}%`;
    }
    const dot = document.getElementById('hotspotDot');
    if (dot) {
      dot.style.left = `${snapshot.x}%`;
      dot.style.top = `${snapshot.y}%`;
    } else {
      renderApp(false);
      return;
    }
    saveState();
    return;
  }

  if (step.type === 'number' && event.target.id === 'numberInput') {
    snapshot.value = event.target.value;
    saveState();
    return;
  }

  if (step.type === 'text' && event.target.id === 'textInput') {
    snapshot.value = event.target.value;
    saveState();
    return;
  }

  if (step.type === 'range' && event.target.id === 'rangeInput') {
    snapshot.value = Number(event.target.value);
    const valueEl = document.getElementById('rangeValue');
    if (valueEl) {
      valueEl.textContent = String(snapshot.value);
    }
    saveState();
  }
}

function handleStageChange(event) {
  const step = getCurrentStep();
  if (!step || isCurrentLocked()) {
    return;
  }

  if (step.type === 'choice3' && event.target.name === 'choice3') {
    const snapshot = getCurrentSnapshot();
    snapshot.value = event.target.value;
    saveState();
  }
}

function handleStageKeydown(event) {
  const actionTarget = event.target.closest('[data-action="puzzle-place-slot"], [data-action="puzzle-select-tile"]');
  if (!actionTarget) {
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    actionTarget.click();
  }
}

function handleStageDragStart(event) {
  const step = getCurrentStep();
  if (!step || isCurrentLocked()) {
    return;
  }

  if (step.type === 'puzzle') {
    const tile = event.target.closest('.puzzle-tile');
    if (!tile) {
      return;
    }
    dragState.mode = 'puzzle';
    dragState.tileId = Number(tile.dataset.tileId);
    dragState.sourceSlot = tile.dataset.slotIndex === '' ? null : Number(tile.dataset.slotIndex);
    event.dataTransfer.effectAllowed = 'move';
    return;
  }

  if (step.type === 'reorder') {
    const item = event.target.closest('.reorder-item');
    if (!item) {
      return;
    }
    dragState.mode = 'reorder';
    dragState.reorderItemId = Number(item.dataset.itemId);
    event.dataTransfer.effectAllowed = 'move';
  }
}

function handleStageDragOver(event) {
  const step = getCurrentStep();
  if (!step || isCurrentLocked()) {
    return;
  }

  if (step.type === 'puzzle') {
    if (event.target.closest('.puzzle-slot') || event.target.closest('#puzzlePool')) {
      event.preventDefault();
    }
    return;
  }

  if (step.type === 'reorder') {
    if (event.target.closest('.reorder-item') || event.target.closest('#reorderList')) {
      event.preventDefault();
    }
  }
}

function handleStageDrop(event) {
  const step = getCurrentStep();
  if (!step || isCurrentLocked()) {
    return;
  }

  if (step.type === 'puzzle' && dragState.mode === 'puzzle') {
    event.preventDefault();
    const slot = event.target.closest('.puzzle-slot');
    const pool = event.target.closest('#puzzlePool');

    if (slot) {
      placeTileById(dragState.tileId, Number(slot.dataset.slotIndex), dragState.sourceSlot);
    } else if (pool && Number.isInteger(dragState.sourceSlot)) {
      const snapshot = getCurrentSnapshot();
      snapshot.slots[dragState.sourceSlot] = null;
      snapshot.selectedTile = dragState.tileId;
      renderApp(false);
    }

    clearDragState();
    return;
  }

  if (step.type === 'reorder' && dragState.mode === 'reorder') {
    event.preventDefault();
    const target = event.target.closest('.reorder-item');
    if (target) {
      moveReorderItem(dragState.reorderItemId, Number(target.dataset.itemId));
    }
    clearDragState();
  }
}

function clearDragState() {
  dragState.mode = null;
  dragState.tileId = null;
  dragState.sourceSlot = null;
  dragState.reorderItemId = null;
}

function toggleHint() {
  if (appState.completed) {
    return;
  }
  const result = appState.stepResults[appState.currentStep];
  result.hintOpened = !result.hintOpened;
  renderApp(false);
}

function checkCurrentStep() {
  if (appState.completed) {
    return;
  }

  const step = getCurrentStep();
  const result = getCurrentResult();

  if (result.locked) {
    return;
  }

  const score = evaluateStep(step, result.answerSnapshot);
  result.lastScore = score;
  result.bestScore = Math.max(result.bestScore, score);
  result.attempted = true;

  announce(`Шаг ${appState.currentStep + 1}. Проверка завершена: ${score} очков. Лучший результат: ${result.bestScore}.`);
  renderApp(false);
}

function evaluateStep(step, snapshot) {
  switch (step.type) {
    case 'hotspot': {
      if (!isFiniteNumber(snapshot.x) || !isFiniteNumber(snapshot.y)) {
        return 0;
      }
      const dx = snapshot.x - step.correctAnswers.x;
      const dy = snapshot.y - step.correctAnswers.y;
      const distance = Math.hypot(dx, dy);

      if (distance <= step.partialRules.fullRadius) return step.pointsLogic.full;
      if (distance <= step.partialRules.partialRadius) return step.pointsLogic.partial;
      return step.pointsLogic.wrong;
    }

    case 'number': {
      const value = Number(snapshot.value);
      if (!Number.isFinite(value)) return 0;
      if (value === step.correctAnswers.exact) return step.pointsLogic.full;
      if (value >= step.partialRules.min && value <= step.partialRules.max) return step.pointsLogic.partial;
      return step.pointsLogic.wrong;
    }

    case 'text': {
      const normalized = normalizeText(snapshot.value);
      if (!normalized) return 0;

      const fullSet = new Set(step.correctAnswers.map(normalizeText));
      if (fullSet.has(normalized)) return step.pointsLogic.full;

      const partial = step.partialRules.acceptedFragments.some((fragment) => normalized.includes(normalizeText(fragment)));
      if (partial) return step.pointsLogic.partial;

      return step.pointsLogic.wrong;
    }

    case 'choice3': {
      const value = snapshot.value;
      if (!value) return 0;
      if (value === step.correctAnswers.correct) return step.pointsLogic.full;
      if (value === step.correctAnswers.partial) return step.pointsLogic.partial;
      return step.pointsLogic.wrong;
    }

    case 'puzzle': {
      const matches = countMatches(snapshot.slots, step.correctAnswers.order);
      if (matches === step.correctAnswers.order.length) return step.pointsLogic.full;
      if (matches >= step.partialRules.minCorrectPositions) return step.pointsLogic.partial;
      return step.pointsLogic.wrong;
    }

    case 'reorder': {
      const matches = countMatches(snapshot.order, step.correctAnswers.order);
      if (matches === step.correctAnswers.order.length) return step.pointsLogic.full;
      if (matches >= step.partialRules.minCorrectPositions) return step.pointsLogic.partial;
      return step.pointsLogic.wrong;
    }

    case 'wordTiles': {
      if (!Array.isArray(snapshot.answer) || snapshot.answer.length !== step.correctAnswers.order.length) {
        return 0;
      }
      if (arraysEqual(snapshot.answer, step.correctAnswers.order)) {
        return step.pointsLogic.full;
      }

      const sameElements = arraysEqual(
        [...snapshot.answer].sort((a, b) => a - b),
        [...step.correctAnswers.order].sort((a, b) => a - b)
      );
      const wrongPositions = snapshot.answer.reduce(
        (count, value, index) => count + (value === step.correctAnswers.order[index] ? 0 : 1),
        0
      );

      if (sameElements && wrongPositions > 0 && wrongPositions <= step.partialRules.maxWrongPositions) {
        return step.pointsLogic.partial;
      }
      return step.pointsLogic.wrong;
    }

    case 'memory6': {
      const allOpened = snapshot.matched.length === snapshot.cards.length;
      if (!allOpened) return 0;
      if (snapshot.misses <= step.partialRules.maxMissesForFull) return step.pointsLogic.full;
      return step.pointsLogic.partial;
    }

    case 'range': {
      const value = Number(snapshot.value);
      if (!Number.isFinite(value)) return 0;
      const diff = Math.abs(value - step.correctAnswers.target);
      if (diff <= step.partialRules.fullTolerance) return step.pointsLogic.full;
      if (diff <= step.partialRules.partialTolerance) return step.pointsLogic.partial;
      return step.pointsLogic.wrong;
    }

    case 'yesno': {
      if (!snapshot.value) return 0;
      if (snapshot.value === step.correctAnswers.value) return step.pointsLogic.full;
      return step.pointsLogic.wrong;
    }

    default:
      return 0;
  }
}

function selectPuzzleTile(tileElement) {
  if (isCurrentLocked()) {
    return;
  }

  const snapshot = getCurrentSnapshot();
  const tileId = Number(tileElement.dataset.tileId);
  snapshot.selectedTile = snapshot.selectedTile === tileId ? null : tileId;
  renderApp(false);
}

function placeSelectedTile(element) {
  if (isCurrentLocked()) {
    return;
  }

  const snapshot = getCurrentSnapshot();
  if (!Number.isInteger(snapshot.selectedTile)) {
    return;
  }

  const slotIndex = Number(element.dataset.slotIndex);
  placeTileById(snapshot.selectedTile, slotIndex, null);
}

function placeTileById(tileId, targetSlot, sourceSlot) {
  const snapshot = getCurrentSnapshot();
  const slots = snapshot.slots;
  const currentSlot = slots.indexOf(tileId);

  if (currentSlot !== -1) {
    slots[currentSlot] = null;
  }

  const occupyingTile = slots[targetSlot];

  if (occupyingTile !== null && occupyingTile !== tileId) {
    if (Number.isInteger(sourceSlot) && sourceSlot !== targetSlot) {
      slots[sourceSlot] = occupyingTile;
    }
  }

  slots[targetSlot] = tileId;
  snapshot.selectedTile = tileId;

  renderApp(false);
}

function removeTileFromSlot(element) {
  if (isCurrentLocked()) {
    return;
  }

  const slotIndex = Number(element.dataset.slotIndex);
  const snapshot = getCurrentSnapshot();
  if (slotIndex >= 0 && slotIndex < snapshot.slots.length) {
    snapshot.slots[slotIndex] = null;
    renderApp(false);
  }
}

function clearPuzzle() {
  if (isCurrentLocked()) {
    return;
  }

  const snapshot = getCurrentSnapshot();
  snapshot.slots = [null, null, null, null];
  snapshot.selectedTile = null;
  renderApp(false);
}

function reorderByButtons(element, direction) {
  if (isCurrentLocked()) {
    return;
  }

  const snapshot = getCurrentSnapshot();
  const index = Number(element.dataset.orderIndex);
  const next = index + direction;
  if (next < 0 || next >= snapshot.order.length) {
    return;
  }
  swapArrayPositions(snapshot.order, index, next);
  renderApp(false);
}

function moveReorderItem(itemId, targetId) {
  if (itemId === targetId) {
    return;
  }
  const snapshot = getCurrentSnapshot();
  const order = snapshot.order;
  const from = order.indexOf(itemId);
  let to = order.indexOf(targetId);
  if (from === -1 || to === -1) {
    return;
  }

  const [moved] = order.splice(from, 1);
  if (from < to) {
    to -= 1;
  }
  order.splice(to, 0, moved);
  renderApp(false);
}

function addWordTile(element) {
  if (isCurrentLocked()) {
    return;
  }

  const step = getCurrentStep();
  const snapshot = getCurrentSnapshot();
  const wordIndex = Number(element.dataset.wordIndex);

  if (!Number.isInteger(wordIndex)) {
    return;
  }
  if (snapshot.answer.includes(wordIndex)) {
    return;
  }
  if (snapshot.answer.length >= step.ui.words.length) {
    return;
  }

  snapshot.answer.push(wordIndex);
  renderApp(false);
}

function removeWordTile(element) {
  if (isCurrentLocked()) {
    return;
  }

  const snapshot = getCurrentSnapshot();
  const index = Number(element.dataset.answerIndex);
  if (index < 0 || index >= snapshot.answer.length) {
    return;
  }

  snapshot.answer.splice(index, 1);
  renderApp(false);
}

function clearWordTiles() {
  if (isCurrentLocked()) {
    return;
  }

  const snapshot = getCurrentSnapshot();
  snapshot.answer = [];
  renderApp(false);
}

function revealMemoryCard(element) {
  if (isCurrentLocked()) {
    return;
  }

  const snapshot = getCurrentSnapshot();
  const cardIndex = Number(element.dataset.cardIndex);

  if (snapshot.busy) return;
  if (snapshot.matched.includes(cardIndex)) return;
  if (snapshot.open.includes(cardIndex)) return;

  snapshot.open.push(cardIndex);

  if (snapshot.open.length < 2) {
    renderApp(false);
    return;
  }

  const [first, second] = snapshot.open;
  if (snapshot.cards[first] === snapshot.cards[second]) {
    snapshot.matched.push(first, second);
    snapshot.open = [];
    renderApp(false);
    return;
  }

  snapshot.misses += 1;
  snapshot.busy = true;
  renderApp(false);

  if (memoryFlipTimeout) {
    clearTimeout(memoryFlipTimeout);
  }

  const currentStepIndex = appState.currentStep;
  memoryFlipTimeout = window.setTimeout(() => {
    const result = appState.stepResults[currentStepIndex];
    if (!result) {
      return;
    }
    const liveSnapshot = result.answerSnapshot;
    liveSnapshot.open = [];
    liveSnapshot.busy = false;
    saveState();
    if (!appState.completed && appState.currentStep === currentStepIndex) {
      renderApp(false);
    }
  }, 700);
}

function setYesNo(element) {
  if (isCurrentLocked()) {
    return;
  }

  const value = element.dataset.value;
  const snapshot = getCurrentSnapshot();
  snapshot.value = value;
  renderApp(false);
}

function resetQuest() {
  const confirmed = window.confirm('Сбросить весь квест и удалить прогресс?');
  if (!confirmed) {
    return;
  }

  if (memoryFlipTimeout) {
    clearTimeout(memoryFlipTimeout);
    memoryFlipTimeout = null;
  }

  localStorage.removeItem(STORAGE_KEY);
  appState = createInitialState();
  announce('Квест сброшен. Прогресс очищен.');
  renderApp(false);
}

function isCurrentLocked() {
  if (appState.completed) {
    return true;
  }
  return appState.stepResults[appState.currentStep].locked;
}

function getCurrentStep() {
  if (appState.completed) {
    return null;
  }
  return QUEST_STEPS[appState.currentStep];
}

function getCurrentResult() {
  if (appState.completed) {
    return null;
  }
  return appState.stepResults[appState.currentStep];
}

function getCurrentSnapshot() {
  return appState.stepResults[appState.currentStep].answerSnapshot;
}

function countMatches(actual, expected) {
  let matches = 0;
  const len = Math.min(actual.length, expected.length);
  for (let index = 0; index < len; index += 1) {
    if (actual[index] === expected[index]) {
      matches += 1;
    }
  }
  return matches;
}

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ');
}

function arraysEqual(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }
  return true;
}

function formatTenge(value) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₸`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function announce(text) {
  liveRegion.textContent = text;
}

function shuffle(array) {
  const list = [...array];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function swapArrayPositions(array, first, second) {
  [array[first], array[second]] = [array[second], array[first]];
}

function uniqueInts(values, min, max) {
  const set = new Set();
  values.forEach((value) => {
    if (Number.isInteger(value) && value >= min && value <= max) {
      set.add(value);
    }
  });
  return Array.from(set);
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(max, number));
}

function clampInt(number, min, max) {
  return Math.max(min, Math.min(max, Math.trunc(number)));
}

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}
