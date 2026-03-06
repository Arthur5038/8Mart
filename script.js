'use strict';

const STORAGE_KEY = 'quest_8mart_v1';
const SCORE_SET = [0, 5, 10];
const TASK_COUNT = 10;

const steps = [
  {
    id: 'hotspot_secret_kiss',
    type: 'hotspot',
    title: 'Шаг 1. Куда я залипаю первым делом',
    text: 'Нажми на ту часть тебя, на которую я обычно смотрю первой. Я стараюсь быть приличным, но лицо все равно побеждает.',
    hint: 'Правильный ответ здесь несложный: лицо целиком.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      correctRect: { x: 31, y: 8, w: 38, h: 31 }
    },
    partialRules: {
      nearDistance: 6,
      specialRects: [
        {
          x: 34,
          y: 43,
          w: 31,
          h: 18,
          message: 'Ну это ж что, ну нет'
        }
      ]
    },
    uiOptions: {
      image: 'img/img2.jpeg',
      helper: 'Просто нажми на фото. Маркер зафиксирует выбор.'
    }
  },
  {
    id: 'months_together',
    type: 'number',
    title: 'Шаг 2. Отдел особой романтики',
    text: 'На этом фото мы как будто два копа, которые приехали арестовывать всех за чрезмерную некрасивость. А теперь к делу: сколько месяцев мы вместе на 8 марта 2026, если август считается?',
    hint: 'Ответ 32. Никакой коррупции, только точный учет наших отношений.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      value: 32
    },
    partialRules: {
      min: 31,
      max: 33
    },
    uiOptions: {
      label: 'Сколько месяцев в нашем деле?',
      image: 'img/img3.jpg',
      mediaTitle: 'Управление любви и беспорядочных мурашек',
      mediaSubtitle: 'Лейтенант Артур и лейтенант Алина на службе у романтики'
    }
  },
  {
    id: 'code_phrase',
    type: 'text',
    title: 'Шаг 3. Всё, что скажет Алина, уже правильно',
    text: 'Тут у тебя режим полного иммунитета от ошибок. На этом фото ты слишком прекрасна, чтобы я спорил с любым твоим ответом.',
    hint: 'Напиши всё, что хочется. Я здесь заранее согласен с каждым словом.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      anyNonEmpty: true,
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
      label: 'Напиши всё, что хочешь:',
      image: 'img/img4.jpeg',
      successImage: 'img/img4:5.jpg',
      mediaTitle: 'Здесь у Артура нет права спорить с такой красотой',
      mediaSubtitle: ''
    }
  },
  {
    id: 'choice_funny_love',
    type: 'choice3',
    title: 'Шаг 4. Что я в тебе люблю больше всего (шутка, но нет)',
    text: 'Выбери один вариант. Тут сложно ошибиться, но можно.',
    hint: 'Твой ум и характер меня регулярно обезоруживают.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      value: 'mind'
    },
    partialRules: {
      partialValue: 'eyes'
    },
    uiOptions: {
      gallery: [
        'img/img5:1.jpeg',
        'img/img5:2.jpeg',
        'img/img5:3.jpeg',
        'img/img5:4.jpeg'
      ],
      mediaTitle: 'Досье на самую любимую подозреваемую',
      mediaSubtitle: 'Четыре улики, подтверждающие, что у Артура нет шансов не влюбляться еще сильнее',
      options: [
        { value: 'eyes', label: 'Твои глаза (и как они смотрят, когда я туплю)' },
        { value: 'chaos', label: 'Твою способность быть хаосом в пижаме' },
        { value: 'mind', label: 'Твой ум + характер: умно, дерзко, смертельно для моего спокойствия' }
      ]
    }
  },
  {
    id: 'drag_phrase',
    type: 'phrase_drag',
    title: 'Шаг 5. Собери фразу Артура',
    text: 'Перетащи слова мышкой или пальцем в правильном порядке.',
    hint: 'Начало: «Алина, ты». Конец: «и мурашек».',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      order: [0, 1, 2, 3, 4, 5, 6]
    },
    partialRules: {
      minCorrectPositions: 5
    },
    uiOptions: {
      image: 'img/img6.jpeg',
      mediaTitle: 'Кадр, который слишком хорош, чтобы оставить его без отдельной страницы',
      mediaSubtitle: 'Сначала полюбоваться, потом собрать фразу',
      words: ['Алина,', 'ты', 'моя', 'любимая', 'причина', 'улыбки', 'и мурашек'],
      helper: 'Перетаскивай слова прямо в строке. Без слотов, только хаос и романтика.'
    }
  },
  {
    id: 'select_two_cards',
    type: 'select_2_of_4',
    title: 'Шаг 6. Выбери 2 идеальных кадра свидания',
    text: 'Отметь два кадра, которые я бы выбрал для нашего идеального свидания.',
    hint: 'Здесь можно смело выбирать сердцем. В этом шаге любой твой выбор для меня уже правильный.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      ids: ['candles', 'movie'],
      anyPairAccepted: true
    },
    partialRules: {
      requiredCount: 2
    },
    uiOptions: {
      hideMedia: true,
      cards: [
        {
          id: 'candles',
          title: 'Кадр A: совместная поездка на море',
          subtitle: 'Наведи курсор или коснись карточки, и заиграет наш морской момент',
          media: {
            type: 'gallery',
            sources: ['img/img7:1.jpg', 'img/img7:2.jpg']
          },
          preview: {
            type: 'audio',
            src: 'img/mus7:1.mp3'
          }
        },
        {
          id: 'gym',
          title: 'Кадр B: поделиться и покушать бутерброды',
          subtitle: 'Наведи курсор или коснись карточки, и включится этот уютный момент',
          media: {
            type: 'image',
            src: 'img/img7:4.jpeg'
          },
          preview: {
            type: 'audio',
            src: 'img/mus7:4.mp3'
          }
        },
        {
          id: 'movie',
          title: 'Кадр C: кино + ты у меня на плече',
          subtitle: 'Наведи курсор или коснись карточки, и момент оживёт',
          media: {
            type: 'video',
            src: 'img/vid7.mp4'
          }
        },
        {
          id: 'tax',
          title: 'Кадр D: совместная прогулка по городу',
          subtitle: 'Наведи курсор или коснись карточки, и зазвучит прогулка по городу',
          media: {
            type: 'image',
            src: 'img/img7.jpg'
          },
          preview: {
            type: 'audio',
            src: 'img/mus7:3.mp3'
          }
        }
      ]
    }
  },
  {
    id: 'timeline_reorder',
    type: 'reorder_4',
    title: 'Шаг 7. Наша маленькая хронология',
    text: 'Разложи эти четыре момента в том порядке, в котором наша история становилась всё теплее, ближе и любимее.',
    hint: 'Сначала знакомство, потом первая общая дурацкая штука, дальше свидание, а потом уже полноценный режим «мы».',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      order: [0, 1, 2, 3]
    },
    partialRules: {
      minCorrectPositions: 2
    },
    uiOptions: {
      image: 'img/img8.jpeg',
      mediaTitle: '',
      mediaSubtitle: 'Один из тех кадров, на которые хочется смотреть чуть дольше обычного.',
      items: [
        'Мы познакомились',
        'Появилась первая общая внутренняя шутка',
        'Случилось первое свидание',
        'Наступил режим «ты мой любимый человек, и это уже без вариантов»'
      ]
    }
  },
  {
    id: 'memory_pairs',
    type: 'memory_6',
    title: 'Шаг 8. Найди наши пары',
    text: 'Открой одинаковые кадры и собери все три пары. Пусть память сейчас работает так же хорошо, как моё желание тебя обнимать.',
    hint: 'Запоминай не только сам кадр, но и его место. Тогда этот шаг закончится быстро и красиво.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      totalPairs: 3
    },
    partialRules: {
      fullMaxMisses: 4,
      partialMinPairs: 2
    },
    uiOptions: {
      hideMedia: true,
      pairs: [
        { id: 'pair1', label: 'Кадр 1', image: 'img/img9:1.jpg' },
        { id: 'pair2', label: 'Кадр 2', image: 'img/img9:2.jpeg' },
        { id: 'pair3', label: 'Кадр 3', image: 'img/img9:3.jpeg' }
      ]
    }
  },
  {
    id: 'infinity_years',
    type: 'infinity_range',
    title: 'Шаг 9. Вопрос с подвохом',
    text: 'Сколько лет мы с тобой будем вместе?',
    hint: 'Иногда правильный ответ не помещается в обычный диапазон.',
    scoring: { full: 10, partial: 0, wrong: 0 },
    correct: {
      threshold: 110
    },
    partialRules: {},
    uiOptions: {
      image: 'img/img10.jpg',
      mediaTitle: 'Наш кадр',
      mediaSubtitle: 'Тот самый кадр, после которого вопрос про бесконечность звучит особенно честно.',
      min: 0,
      max: 100,
      start: 50,
      helper: 'Потяни бегунок вправо. Очень вправо.'
    }
  },
  {
    id: 'choose_two_truths',
    type: 'choose_2_of_4',
    title: 'Шаг 10. Две правды про Артура',
    text: 'Выбери 2 правдивых утверждения.',
    hint: 'Правда там, где WhatsApp и где я таю рядом с тобой.',
    scoring: { full: 10, partial: 5, wrong: 0 },
    correct: {
      ids: ['soft', 'wa']
    },
    partialRules: {
      requiredCount: 2
    },
    uiOptions: {
      image: 'img/img7:1.jpg',
      mediaTitle: 'Наш кадр',
      mediaSubtitle: 'Пусть этот кадр встречает последний вопрос так же нежно, как мне хотелось.',
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
let infinityAdvanceTimeout = null;
let dragPayload = null;
let phrasePointerDrag = null;
let infinityPointerDrag = null;
let lowOverlayReturnFocusEl = null;
let interactiveMediaCleanup = [];
let hotspotFlashTimeout = null;

let state = loadState() || createInitialState();

bindEvents();
render(false);

function bindEvents() {
  ui.backBtn.addEventListener('click', () => {
    if (state.completed) return;
    if (state.currentScreen > 0) {
      state.currentScreen -= 1;
      saveState();
      render(true);
      announce(state.currentScreen === 0 ? 'Приветствие' : `Шаг ${state.currentScreen}/10`);
    }
  });

  ui.nextBtn.addEventListener('click', () => {
    if (state.completed || state.currentScreen === 0) return;

    const taskIndex = screenToTaskIndex(state.currentScreen);
    if (taskIndex < 0) return;

    const taskState = state.stepStates[taskIndex];
    if (!taskState.attempted) return;

    if (taskIndex === TASK_COUNT - 1) {
      state.completed = true;
      saveState();
      render(true);
      announce('Квест завершен.');
      return;
    }

    state.currentScreen += 1;
    saveState();
    render(true);
    announce(`Шаг ${state.currentScreen}/10`);
  });

  ui.stage.addEventListener('click', onStageClick);
  ui.stage.addEventListener('input', onStageInput);
  ui.stage.addEventListener('change', onStageChange);
  ui.stage.addEventListener('keydown', onStageKeydown);
  ui.stage.addEventListener('dragstart', onStageDragStart);
  ui.stage.addEventListener('dragover', onStageDragOver);
  ui.stage.addEventListener('drop', onStageDrop);
  ui.stage.addEventListener('pointerdown', onStagePointerDown);
}

function createInitialState() {
  return {
    currentScreen: 0,
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
      return { clickX: null, clickY: null, flashMessage: '' };
    case 'number':
      return { value: '' };
    case 'text':
      return { value: '' };
    case 'choice3':
      return { value: '' };
    case 'phrase_drag':
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
    case 'infinity_range':
      return {
        rawPos: step.uiOptions.start,
        isInfinity: false,
        autoDone: false
      };
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

    const initial = createInitialState();
    const sourceStepStates = Array.isArray(parsed.stepStates) ? parsed.stepStates : null;

    if (!sourceStepStates || sourceStepStates.length !== TASK_COUNT) {
      return null;
    }

    const safe = {
      currentScreen: 0,
      completed: Boolean(parsed.completed),
      stepStates: initial.stepStates
    };

    safe.stepStates = sourceStepStates.map((item, index) => sanitizeStepState(item, steps[index]));

    if (Number.isInteger(parsed.currentScreen)) {
      safe.currentScreen = clampInt(parsed.currentScreen, 0, TASK_COUNT);
    } else if (Number.isInteger(parsed.currentStep)) {
      safe.currentScreen = clampInt(parsed.currentStep + 1, 0, TASK_COUNT);
    }

    if (safe.completed) {
      safe.currentScreen = TASK_COUNT;
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

  if (!rawState || typeof rawState !== 'object') return defaults;

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
        clickX: Number.isFinite(data.clickX) ? clamp(data.clickX, 0, 100) : null,
        clickY: Number.isFinite(data.clickY) ? clamp(data.clickY, 0, 100) : null,
        flashMessage: typeof data.flashMessage === 'string' ? data.flashMessage : ''
      };

    case 'number':
      return { value: typeof data.value === 'string' || typeof data.value === 'number' ? String(data.value) : '' };

    case 'text':
      return { value: typeof data.value === 'string' ? data.value : '' };

    case 'choice3':
      return { value: typeof data.value === 'string' ? data.value : '' };

    case 'phrase_drag':
    case 'reorder_4': {
      if (!Array.isArray(data.order)) return base;
      const order = data.order.filter(Number.isInteger);
      const expected = base.order;

      if (order.length !== expected.length) return base;
      if (new Set(order).size !== expected.length) return base;

      const max = expected.length - 1;
      for (const value of order) {
        if (value < 0 || value > max) return base;
      }

      return { order };
    }

    case 'select_2_of_4': {
      const allowed = step.uiOptions.cards.map((card) => card.id);
      return { selected: sanitizeSelected(data.selected, allowed) };
    }

    case 'choose_2_of_4': {
      const allowed = step.uiOptions.options.map((option) => option.id);
      return { selected: sanitizeSelected(data.selected, allowed) };
    }

    case 'memory_6': {
      if (!Array.isArray(data.deck) || data.deck.length !== 6) return base;
      const allowedIds = new Set(step.uiOptions.pairs.map((pair) => pair.id));
      const hasInvalidDeck = data.deck.some((id) => typeof id !== 'string' || !allowedIds.has(id));
      if (hasInvalidDeck) return base;

      return {
        deck: data.deck,
        revealed: Array.isArray(data.revealed) ? uniqueInts(data.revealed, 0, 5).slice(0, 2) : [],
        matched: Array.isArray(data.matched) ? uniqueInts(data.matched, 0, 5) : [],
        misses: Number.isInteger(data.misses) ? Math.max(0, data.misses) : 0,
        busy: Boolean(data.busy)
      };
    }

    case 'infinity_range': {
      const rawPos = Number.isFinite(data.rawPos) ? clamp(data.rawPos, 0, 130) : step.uiOptions.start;
      const isInfinity = Boolean(data.isInfinity) || rawPos > step.correct.threshold;
      return {
        rawPos,
        isInfinity,
        autoDone: Boolean(data.autoDone)
      };
    }

    default:
      return base;
  }
}

function sanitizeSelected(value, allowed) {
  if (!Array.isArray(value)) return [];
  const selected = [];

  value.forEach((id) => {
    if (typeof id === 'string' && allowed.includes(id) && !selected.includes(id)) {
      selected.push(id);
    }
  });

  return selected;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render(animated) {
  const total = totalScore();
  const attemptedCount = state.stepStates.filter((item) => item.attempted).length;
  const progress = state.completed ? 100 : Math.round((attemptedCount / TASK_COUNT) * 100);

  if (state.completed) {
    ui.stepLabel.textContent = 'Финал';
  } else if (state.currentScreen === 0) {
    ui.stepLabel.textContent = '';
  } else {
    ui.stepLabel.textContent = `Шаг ${state.currentScreen}/10`;
  }

  ui.scoreLabel.textContent = `Очки: ${total}/100`;
  ui.progressBar.style.width = `${progress}%`;
  ui.progressWrap.setAttribute('aria-valuenow', String(progress));

  if (state.completed) {
    ui.navigation.hidden = true;
    swapStage(renderFinal(), animated);
    return;
  }

  if (state.currentScreen === 0) {
    ui.navigation.hidden = true;
    swapStage(renderIntro(), animated);
    return;
  }

  const taskIndex = screenToTaskIndex(state.currentScreen);
  const taskState = state.stepStates[taskIndex];

  ui.navigation.hidden = false;
  ui.backBtn.disabled = state.currentScreen === 0;
  ui.nextBtn.disabled = !taskState.attempted;
  ui.nextBtn.textContent = taskIndex === TASK_COUNT - 1 ? 'К финалу' : 'Дальше';

  swapStage(renderTask(steps[taskIndex], taskState, taskIndex), animated);
}

function renderIntro() {
  return `
    <article class="glass step-card intro-card">
      <h2 class="step-title">Алина, с 8 марта!</h2>
      <p class="step-text">Я подготовил для тебя маленький квест-тест. Тут будет мило, странно, местами дерзко, но всё по любви.</p>
      <p class="step-text">Я знаю, возможно, это не совсем то, чего ты хотела, но я уверен, игра стоит свеч. И возможно, сейчас у тебя точно такое же лицо, как на этой картинке.</p>
      <img class="intro-raw-image" src="img/img1.jpeg" alt="Шутливая картинка для вступления" />
      <div class="controls">
        <button class="btn btn-primary" type="button" data-action="start-quest">Поехали</button>
        <button class="btn btn-danger" type="button" data-action="reset">Сбросить квест</button>
      </div>
    </article>
  `;
}

function renderTask(step, stepState, taskIndex) {
  const feedback = stepState.lastScore === null
    ? 'Пока проверки не было. Нажми «Проверить/Засчитать».'
    : `Последняя проверка: <strong>${stepState.lastScore}</strong>, лучший результат: <strong>${stepState.bestScore}</strong>.`;

  const media = step.type === 'hotspot' || step.uiOptions.hideMedia ? '' : renderMediaPlaceholder(step, stepState);

  return `
    <article class="glass step-card" data-step-id="${escapeHtml(step.id)}">
      <h2 class="step-title">${escapeHtml(step.title)}</h2>
      <p class="step-text">${escapeHtml(step.text)}</p>

      ${media}

      <section class="task-card">
        <p class="caption">${escapeHtml(step.uiOptions.helper || 'Выполни задание и нажми проверку.')}</p>
        ${renderTaskByType(step, stepState, taskIndex)}
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

function renderMediaPlaceholder(step, stepState) {
  const imageSrc = step.uiOptions.successImage && stepState.bestScore > 0
    ? step.uiOptions.successImage
    : step.uiOptions.image;
  const gallery = Array.isArray(step.uiOptions.gallery) ? step.uiOptions.gallery : null;

  if (imageSrc) {
    const mediaTitle = step.uiOptions.mediaTitle || '';
    const mediaSubtitle = step.uiOptions.mediaSubtitle || '';

    return `
      <figure class="media-figure">
        <img class="media-photo-full" src="${escapeHtml(imageSrc)}" alt="${escapeHtml(step.title)}" />
        ${mediaTitle || mediaSubtitle ? `
          <figcaption class="media-caption">
            ${mediaTitle ? `<span class="media-tag">${escapeHtml(mediaTitle)}</span>` : ''}
            ${mediaSubtitle ? `<p class="caption">${escapeHtml(mediaSubtitle)}</p>` : ''}
          </figcaption>
        ` : ''}
      </figure>
    `;
  }

  if (gallery && gallery.length > 0) {
    const mediaTitle = step.uiOptions.mediaTitle || '';
    const mediaSubtitle = step.uiOptions.mediaSubtitle || '';

    return `
      <figure class="media-figure">
        <div class="media-grid">
          ${gallery
            .map((src, index) => `<img class="media-grid-photo" src="${escapeHtml(src)}" alt="${escapeHtml(`${step.title} ${index + 1}`)}" />`)
            .join('')}
        </div>
        ${mediaTitle || mediaSubtitle ? `
          <figcaption class="media-caption">
            ${mediaTitle ? `<span class="media-tag">${escapeHtml(mediaTitle)}</span>` : ''}
            ${mediaSubtitle ? `<p class="caption">${escapeHtml(mediaSubtitle)}</p>` : ''}
          </figcaption>
        ` : ''}
      </figure>
    `;
  }

  const title = step.uiOptions.placeholderTitle || 'Наш следующий кадр';
  const subtitle = step.uiOptions.placeholderSubtitle || 'Здесь будет ещё один момент, который захочется пересматривать.';

  return `
    <div class="media-placeholder">
      <div class="media-title">${escapeHtml(title)}</div>
      <p class="caption">${escapeHtml(subtitle)}</p>
      <span class="media-tag">Скоро здесь будет ещё один наш момент</span>
    </div>
  `;
}

function renderTaskByType(step, stepState, taskIndex) {
  const data = stepState.userData;

  switch (step.type) {
    case 'hotspot': {
      const marker = data.clickX === null || data.clickY === null
        ? ''
        : `<span class="hotspot-marker" style="left:${data.clickX}%; top:${data.clickY}%"></span>`;

      return `
        <div class="hotspot-grid">
          <div class="hotspot-box" data-action="hotspot-click" tabindex="0" aria-label="Область выбора точки">
            <img class="hotspot-photo" src="${escapeHtml(step.uiOptions.image)}" alt="Фото для выбора области" />
            ${marker}
          </div>
          ${data.flashMessage ? `<div class="hotspot-flash" role="status" aria-live="polite">${escapeHtml(data.flashMessage)}</div>` : ''}
          <p class="caption">${data.clickX === null ? 'Точка пока не выбрана.' : `Выбрано: ${Math.round(data.clickX)} / ${Math.round(data.clickY)}`}</p>
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

    case 'phrase_drag': {
      return `
        <div class="phrase-wrap" data-phrase-wrap>
          <div class="phrase-line" data-phrase-line>
            ${data.order
          .map((wordIndex, position) => `
                <button
                  type="button"
                  class="phrase-chip"
                  draggable="true"
                  data-action="phrase-chip"
                  data-position="${position}"
                  data-word-index="${wordIndex}"
                >${escapeHtml(step.uiOptions.words[wordIndex])}</button>
              `)
          .join('')}
          </div>
          <p class="caption">${escapeHtml(step.uiOptions.helper)}</p>
        </div>
      `;
    }

    case 'select_2_of_4':
      return `
        <div class="pick-grid">
          ${step.uiOptions.cards
          .map((card) => {
            const active = data.selected.includes(card.id);
            const hasMedia = Boolean(card.media);
            const mediaHtml = hasMedia ? renderCardPreview(card) : '';
            return `
                <button
                  type="button"
                  class="pick-card ${active ? 'active' : ''} ${hasMedia ? 'pick-card-with-media' : ''}"
                  data-action="toggle-pick"
                  data-id="${escapeHtml(card.id)}"
                  ${hasMedia ? `data-preview-card="true" data-preview-id="${escapeHtml(card.id)}"` : ''}
                >
                  ${mediaHtml}
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
      const pairMap = new Map(step.uiOptions.pairs.map((pair) => [pair.id, pair]));
      const opened = new Set(data.revealed);
      const matched = new Set(data.matched);

      return `
        <div class="memory-grid">
          ${data.deck
          .map((pairId, index) => {
            const show = opened.has(index) || matched.has(index);
            const doneClass = matched.has(index) ? 'done' : show ? 'show' : '';
            const pair = pairMap.get(pairId);
            const content = show
              ? pair
                ? `
                <img
                  class="memory-card-image"
                  src="${escapeHtml(pair.image)}"
                  alt="${escapeHtml(pair.label)}"
                  loading="lazy"
                />
              `
                : '<span class="memory-card-back">?</span>'
              : '<span class="memory-card-back">?</span>';

            return `
                <button
                  type="button"
                  class="memory-card ${doneClass}"
                  data-action="memory-open"
                  data-index="${index}"
                >${content}</button>
              `;
          })
          .join('')}
        </div>
        <p class="caption">Промахи: ${data.misses}. Открыто пар: ${Math.floor(data.matched.length / 2)}/3.</p>
      `;
    }

    case 'infinity_range': {
      const display = data.isInfinity ? 'Бесконечность' : String(Math.round(clamp(data.rawPos, 0, 100)));
      const knobLeft = clamp(data.rawPos, 0, 130);
      const fillWidth = clamp(data.rawPos, 0, 100);

      return `
        <div class="infinity-wrap" data-infinity-wrap>
          <div class="infinity-track" data-action="infinity-start" tabindex="0" aria-label="Слайдер бесконечности">
            <div class="infinity-fill" id="infinityFill" style="width:${fillWidth}%"></div>
            <div class="infinity-knob" id="infinityKnob" data-action="infinity-start" style="left:${knobLeft}%"></div>
          </div>
          <p class="caption">Ответ: <strong id="infinityValue">${display}</strong></p>
        </div>
      `;
    }

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
      .map((itemIndex, position) => `
          <li class="sort-item" draggable="true" data-action="sort-item" data-sort-type="${type}" data-position="${position}">
            <span>${escapeHtml(labels[itemIndex])}</span>
            <span class="sort-controls">
              <button type="button" class="icon-btn" data-action="sort-up" data-sort-type="${type}" data-position="${position}" aria-label="Поднять">↑</button>
              <button type="button" class="icon-btn" data-action="sort-down" data-sort-type="${type}" data-position="${position}" aria-label="Опустить">↓</button>
            </span>
          </li>
        `)
      .join('')}
    </ul>
  `;
}

function renderCardPreview(card) {
  if (!card.media) return '';
  const previewAudio = card.preview && card.preview.type === 'audio'
    ? `
      <audio
        class="pick-preview-playable pick-preview-audio"
        data-preview-id="${escapeHtml(card.id)}"
        preload="auto"
      >
        <source src="${escapeHtml(card.preview.src)}" type="audio/mpeg" />
      </audio>
    `
    : '';

  if (card.media.type === 'video') {
    return `
      <div class="pick-preview" aria-hidden="true">
        <video
          class="pick-preview-media pick-preview-playable"
          data-preview-id="${escapeHtml(card.id)}"
          loop
          playsinline
          preload="auto"
        >
          <source src="${escapeHtml(card.media.src)}" type="video/mp4" />
        </video>
        <span class="pick-preview-badge">Наведи курсор или коснись карточки</span>
        ${previewAudio}
      </div>
    `;
  }

  if (card.media.type === 'image') {
    return `
      <div class="pick-preview" aria-hidden="true">
        <img
          class="pick-preview-media pick-preview-image"
          src="${escapeHtml(card.media.src)}"
          alt=""
          loading="lazy"
        />
        ${previewAudio}
      </div>
    `;
  }

  if (card.media.type === 'gallery') {
    return `
      <div class="pick-preview pick-preview-gallery" aria-hidden="true">
        ${card.media.sources
          .map((src, index) => `
            <img
              class="pick-preview-media pick-preview-image pick-preview-gallery-item"
              src="${escapeHtml(src)}"
              alt=""
              loading="${index === 0 ? 'eager' : 'lazy'}"
            />
          `)
          .join('')}
        ${previewAudio}
      </div>
    `;
  }

  return '';
}

function renderFinal() {
  const total = totalScore();
  const code = String((total / 2) * 1000);

  return `
    <article class="glass final-card">
      <h2 class="step-title">Финал, Алина</h2>
      <p class="step-text">Ты прошла весь маршрут.</p>

      <p><strong>Total score:</strong> ${total}/100</p>
      <p><strong>Твой код:</strong></p>
      <div class="secret-code">${code}</div>
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

  if (action === 'close-low-overlay') {
    hideLowValueOverlay();
    return;
  }

  if (action === 'restart') {
    resetQuest();
    return;
  }

  if (action === 'start-quest') {
    if (!state.completed) {
      state.currentScreen = 1;
      saveState();
      render(true);
      announce('Шаг 1 из 10');
    }
    return;
  }

  if (action === 'reset') {
    resetQuest();
    return;
  }

  if (state.completed || state.currentScreen === 0) return;

  const taskIndex = screenToTaskIndex(state.currentScreen);
  const step = steps[taskIndex];
  const stepState = state.stepStates[taskIndex];

  if (step.type === 'select_2_of_4') {
    const previewCard = target.closest('[data-preview-card="true"]');
    if (previewCard) {
      startPreviewPlayback(previewCard.dataset.previewId);
    } else {
      stopAllCardPreviews();
    }
  }

  switch (action) {
    case 'check': {
      if (step.type === 'infinity_range' && !stepState.userData.isInfinity) {
        showLowValueOverlay();
        return;
      }

      const score = evaluateStep(step, stepState.userData);
      applyCheckResult(taskIndex, score);
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

    case 'hotspot-click': {
      if (step.type !== 'hotspot') return;
      const rect = target.getBoundingClientRect();
      const clickX = ((event.clientX - rect.left) / rect.width) * 100;
      const clickY = ((event.clientY - rect.top) / rect.height) * 100;
      stepState.userData.clickX = clamp(clickX, 0, 100);
      stepState.userData.clickY = clamp(clickY, 0, 100);
      maybeFlashHotspotMessage(step, stepState);
      saveState();
      render(false);
      break;
    }

    case 'toggle-pick': {
      togglePick(step, stepState, target.dataset.id);
      break;
    }

    case 'sort-up': {
      moveSort(stepState, Number(target.dataset.position), -1);
      break;
    }

    case 'sort-down': {
      moveSort(stepState, Number(target.dataset.position), 1);
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
  if (state.completed || state.currentScreen === 0) return;

  const taskIndex = screenToTaskIndex(state.currentScreen);
  const step = steps[taskIndex];
  const stepState = state.stepStates[taskIndex];

  if (step.type === 'number' && event.target.id === 'numberAnswer') {
    stepState.userData.value = event.target.value;
    saveState();
    return;
  }

  if (step.type === 'text' && event.target.id === 'textAnswer') {
    stepState.userData.value = event.target.value;
    saveState();
  }
}

function onStageChange(event) {
  if (state.completed || state.currentScreen === 0) return;

  const taskIndex = screenToTaskIndex(state.currentScreen);
  const step = steps[taskIndex];
  const stepState = state.stepStates[taskIndex];

  if (step.type === 'choice3' && event.target.name === 'choice3') {
    stepState.userData.value = event.target.value;
    saveState();
  }
}

function onStageKeydown(event) {
  if (state.completed || state.currentScreen === 0) return;

  const taskIndex = screenToTaskIndex(state.currentScreen);
  const step = steps[taskIndex];
  const stepState = state.stepStates[taskIndex];

  const hotspotBox = event.target.closest('.hotspot-box');
  if (hotspotBox && step.type === 'hotspot' && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    stepState.userData.clickX = 50;
    stepState.userData.clickY = 50;
    saveState();
    render(false);
    return;
  }

  const phraseChip = event.target.closest('[data-action="phrase-chip"]');
  if (phraseChip && step.type === 'phrase_drag') {
    const pos = Number(phraseChip.dataset.position);
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveSort(stepState, pos, -1);
      maybeAutoCompletePhrase(taskIndex);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveSort(stepState, pos, 1);
      maybeAutoCompletePhrase(taskIndex);
      return;
    }
  }

  const infinityTrack = event.target.closest('.infinity-track');
  if (infinityTrack && step.type === 'infinity_range' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 2 : -2;
    const data = stepState.userData;
    data.rawPos = clamp(data.rawPos + delta, 0, 130);
    data.isInfinity = data.rawPos > step.correct.threshold;
    saveState();
    render(false);

    if (data.isInfinity && !data.autoDone) {
      activateInfinityMode(taskIndex);
    }
  }
}

function onStagePointerDown(event) {
  if (state.completed || state.currentScreen === 0) return;

  const taskIndex = screenToTaskIndex(state.currentScreen);
  const step = steps[taskIndex];

  if (step.type === 'select_2_of_4') {
    const previewCard = event.target.closest('[data-preview-card="true"]');
    if (previewCard) {
      startPreviewPlayback(previewCard.dataset.previewId, { fromUserGesture: true });
    } else {
      stopAllCardPreviews();
    }
  }

  const phraseChip = event.target.closest('[data-action="phrase-chip"]');
  if (phraseChip && step.type === 'phrase_drag') {
    startPhrasePointerDrag(event, phraseChip);
    return;
  }

  const infinityTarget = event.target.closest('[data-action="infinity-start"]');
  if (infinityTarget && step.type === 'infinity_range') {
    const track = infinityTarget.closest('.infinity-track');
    if (!track) return;
    startInfinityPointerDrag(event, track, taskIndex);
  }
}

function onStageDragStart(event) {
  if (state.completed || state.currentScreen === 0) return;

  const taskIndex = screenToTaskIndex(state.currentScreen);
  const step = steps[taskIndex];

  if (step.type === 'phrase_drag') {
    const chip = event.target.closest('[data-action="phrase-chip"]');
    if (!chip) return;

    dragPayload = {
      type: 'phrase_drag',
      from: Number(chip.dataset.position)
    };

    event.dataTransfer.effectAllowed = 'move';
    return;
  }

  if (step.type === 'reorder_4') {
    const item = event.target.closest('[data-action="sort-item"]');
    if (!item) return;

    dragPayload = {
      type: 'reorder_4',
      from: Number(item.dataset.position)
    };

    event.dataTransfer.effectAllowed = 'move';
  }
}

function onStageDragOver(event) {
  if (!dragPayload || state.completed || state.currentScreen === 0) return;

  const taskIndex = screenToTaskIndex(state.currentScreen);
  const step = steps[taskIndex];

  if (dragPayload.type === 'phrase_drag' && step.type === 'phrase_drag') {
    const target = event.target.closest('[data-action="phrase-chip"]');
    if (target) event.preventDefault();
    return;
  }

  if (dragPayload.type === 'reorder_4' && step.type === 'reorder_4') {
    const target = event.target.closest('[data-action="sort-item"]');
    if (target) event.preventDefault();
  }
}

function onStageDrop(event) {
  if (!dragPayload || state.completed || state.currentScreen === 0) return;

  const taskIndex = screenToTaskIndex(state.currentScreen);
  const step = steps[taskIndex];
  const stepState = state.stepStates[taskIndex];

  if (dragPayload.type === 'phrase_drag' && step.type === 'phrase_drag') {
    const target = event.target.closest('[data-action="phrase-chip"]');
    if (!target) {
      dragPayload = null;
      return;
    }

    event.preventDefault();
    const to = Number(target.dataset.position);
    moveInArray(stepState.userData.order, dragPayload.from, to);
    dragPayload = null;
    maybeAutoCompletePhrase(taskIndex);
    saveState();
    render(false);
    return;
  }

  if (dragPayload.type === 'reorder_4' && step.type === 'reorder_4') {
    const target = event.target.closest('[data-action="sort-item"]');
    if (!target) {
      dragPayload = null;
      return;
    }

    event.preventDefault();
    const to = Number(target.dataset.position);
    moveInArray(stepState.userData.order, dragPayload.from, to);
    dragPayload = null;
    saveState();
    render(false);
    return;
  }

  dragPayload = null;
}

function startPhrasePointerDrag(event, chip) {
  if (event.button !== 0 && event.pointerType !== 'touch') return;

  phrasePointerDrag = {
    pointerId: event.pointerId,
    chip,
    from: Number(chip.dataset.position),
    currentTarget: Number(chip.dataset.position),
    startX: event.clientX,
    startY: event.clientY,
    active: false
  };

  chip.setPointerCapture(event.pointerId);
  window.addEventListener('pointermove', onPhrasePointerMove);
  window.addEventListener('pointerup', onPhrasePointerUp);
  window.addEventListener('pointercancel', onPhrasePointerUp);
}

function onPhrasePointerMove(event) {
  if (!phrasePointerDrag || event.pointerId !== phrasePointerDrag.pointerId) return;

  const drag = phrasePointerDrag;
  const dx = event.clientX - drag.startX;
  const dy = event.clientY - drag.startY;

  if (!drag.active && Math.hypot(dx, dy) > 6) {
    drag.active = true;
    drag.chip.classList.add('chip-dragging');
  }

  if (!drag.active) return;

  drag.chip.style.transform = `translate(${dx}px, ${dy}px)`;

  const line = drag.chip.closest('[data-phrase-line]');
  if (!line) return;

  const chips = Array.from(line.querySelectorAll('[data-action="phrase-chip"]'));
  let nearestIndex = drag.from;
  let nearestDistance = Infinity;

  chips.forEach((chipEl) => {
    const rect = chipEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(event.clientX - cx, event.clientY - cy);
    if (dist < nearestDistance) {
      nearestDistance = dist;
      nearestIndex = Number(chipEl.dataset.position);
    }
    chipEl.classList.remove('chip-target');
  });

  drag.currentTarget = nearestIndex;

  const targetChip = chips.find((chipEl) => Number(chipEl.dataset.position) === nearestIndex);
  if (targetChip && targetChip !== drag.chip) {
    targetChip.classList.add('chip-target');
  }
}

function onPhrasePointerUp(event) {
  if (!phrasePointerDrag || event.pointerId !== phrasePointerDrag.pointerId) return;

  const drag = phrasePointerDrag;
  window.removeEventListener('pointermove', onPhrasePointerMove);
  window.removeEventListener('pointerup', onPhrasePointerUp);
  window.removeEventListener('pointercancel', onPhrasePointerUp);

  const line = drag.chip.closest('[data-phrase-line]');
  if (line) {
    line.querySelectorAll('[data-action="phrase-chip"]').forEach((chipEl) => chipEl.classList.remove('chip-target'));
  }

  drag.chip.classList.remove('chip-dragging');
  drag.chip.style.transform = '';

  if (drag.active && drag.currentTarget !== drag.from && state.currentScreen > 0 && !state.completed) {
    const taskIndex = screenToTaskIndex(state.currentScreen);
    const step = steps[taskIndex];
    if (step.type === 'phrase_drag') {
      const stepState = state.stepStates[taskIndex];
      moveInArray(stepState.userData.order, drag.from, drag.currentTarget);
      maybeAutoCompletePhrase(taskIndex);
      saveState();
      render(false);
    }
  }

  phrasePointerDrag = null;
}

function startInfinityPointerDrag(event, track, taskIndex) {
  if (event.button !== 0 && event.pointerType !== 'touch') return;

  infinityPointerDrag = {
    pointerId: event.pointerId,
    track,
    taskIndex
  };

  track.setPointerCapture(event.pointerId);
  window.addEventListener('pointermove', onInfinityPointerMove);
  window.addEventListener('pointerup', onInfinityPointerUp);
  window.addEventListener('pointercancel', onInfinityPointerUp);

  updateInfinityByPointer(taskIndex, track, event.clientX);
}

function onInfinityPointerMove(event) {
  if (!infinityPointerDrag || event.pointerId !== infinityPointerDrag.pointerId) return;
  updateInfinityByPointer(infinityPointerDrag.taskIndex, infinityPointerDrag.track, event.clientX);
}

function onInfinityPointerUp(event) {
  if (!infinityPointerDrag || event.pointerId !== infinityPointerDrag.pointerId) return;

  window.removeEventListener('pointermove', onInfinityPointerMove);
  window.removeEventListener('pointerup', onInfinityPointerUp);
  window.removeEventListener('pointercancel', onInfinityPointerUp);

  saveState();
  infinityPointerDrag = null;
}

function updateInfinityByPointer(taskIndex, track, clientX) {
  if (state.completed || state.currentScreen === 0) return;
  if (screenToTaskIndex(state.currentScreen) !== taskIndex) return;

  const step = steps[taskIndex];
  const stepState = state.stepStates[taskIndex];
  const rect = track.getBoundingClientRect();

  const rawPercent = ((clientX - rect.left) / rect.width) * 100;
  stepState.userData.rawPos = clamp(rawPercent, 0, 130);
  stepState.userData.isInfinity = stepState.userData.rawPos > step.correct.threshold;

  updateInfinityVisual(stepState.userData);

  if (stepState.userData.isInfinity && !stepState.userData.autoDone) {
    activateInfinityMode(taskIndex);
  }
}

function updateInfinityVisual(data) {
  const fill = document.getElementById('infinityFill');
  const knob = document.getElementById('infinityKnob');
  const value = document.getElementById('infinityValue');

  if (fill) fill.style.width = `${clamp(data.rawPos, 0, 100)}%`;
  if (knob) knob.style.left = `${clamp(data.rawPos, 0, 130)}%`;
  if (value) value.textContent = data.isInfinity ? 'Бесконечность' : String(Math.round(clamp(data.rawPos, 0, 100)));
}

function activateInfinityMode(taskIndex) {
  const stepState = state.stepStates[taskIndex];

  stepState.userData.isInfinity = true;
  stepState.userData.autoDone = true;
  stepState.userData.rawPos = Math.max(stepState.userData.rawPos, 112);

  applyCheckResult(taskIndex, 10);
  launchConfetti();
  render(false);
  announce('Бесконечность принята. Переходим дальше.');

  if (infinityAdvanceTimeout) {
    clearTimeout(infinityAdvanceTimeout);
  }

  const delay = randomInt(800, 1200);
  infinityAdvanceTimeout = window.setTimeout(() => {
    if (state.completed) return;
    if (state.currentScreen !== taskIndex + 1) return;

    state.currentScreen += 1;
    saveState();
    render(true);
  }, delay);
}

function applyCheckResult(taskIndex, score) {
  const taskState = state.stepStates[taskIndex];
  taskState.lastScore = score;
  taskState.bestScore = Math.max(taskState.bestScore, score);
  taskState.attempted = true;
  saveState();
}

function maybeAutoCompletePhrase(taskIndex) {
  const step = steps[taskIndex];
  if (step.type !== 'phrase_drag') return;

  const stepState = state.stepStates[taskIndex];
  const matches = countPositionMatches(stepState.userData.order, step.correct.order);

  if (matches === step.correct.order.length && stepState.bestScore < step.scoring.full) {
    stepState.lastScore = step.scoring.full;
    stepState.bestScore = step.scoring.full;
    stepState.attempted = true;
    saveState();
    render(false);
    announce('Пазл собран идеально. 10 очков.');
  }
}

function moveSort(stepState, from, delta) {
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
    announce('Можно выбрать ровно 2 варианта.');
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

  const [first, second] = data.revealed;
  if (data.deck[first] === data.deck[second]) {
    data.matched.push(first, second);
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

  const stepIndexSnapshot = state.currentScreen;
  memoryTimeout = window.setTimeout(() => {
    if (state.currentScreen !== stepIndexSnapshot || state.completed) return;

    const currentTask = screenToTaskIndex(state.currentScreen);
    if (currentTask < 0) return;

    const currentData = state.stepStates[currentTask].userData;
    currentData.revealed = [];
    currentData.busy = false;
    saveState();
    render(false);
  }, 700);
}

function startPreviewPlayback(previewId, options = {}) {
  if (!previewId) return;

  stopAllCardPreviews(previewId);
  const media = ui.stage.querySelector(`.pick-preview-playable[data-preview-id="${CSS.escape(previewId)}"]`);
  if (!(media instanceof HTMLMediaElement)) return;

  if (!media.paused && !media.ended && media.currentTime > 0) return;

  if (media instanceof HTMLVideoElement) {
    media.muted = false;
    media.volume = 1;
    media.defaultMuted = false;
  } else {
    media.volume = 1;
  }
  media.currentTime = 0;
  const playPromise = media.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      if (options.fromUserGesture || !(media instanceof HTMLVideoElement)) return;

      media.muted = true;
      media.defaultMuted = true;
      const mutedPlayPromise = media.play();
      if (mutedPlayPromise && typeof mutedPlayPromise.catch === 'function') {
        mutedPlayPromise.catch(() => {});
      }
    });
  }
}

function stopAllCardPreviews(exceptId = '') {
  const mediaList = ui.stage.querySelectorAll('.pick-preview-playable');
  mediaList.forEach((media) => {
    if (!(media instanceof HTMLMediaElement)) return;
    if (exceptId && media.dataset.previewId === exceptId) return;

    media.pause();
    media.currentTime = 0;
  });
}

function wireInteractiveMedia() {
  interactiveMediaCleanup.forEach((cleanup) => cleanup());
  interactiveMediaCleanup = [];

  const taskIndex = screenToTaskIndex(state.currentScreen);
  if (state.completed || taskIndex < 0 || !steps[taskIndex] || steps[taskIndex].type !== 'select_2_of_4') {
    stopAllCardPreviews();
    return;
  }

  const previewCards = ui.stage.querySelectorAll('[data-preview-card="true"]');
  previewCards.forEach((card) => {
    if (!(card instanceof HTMLElement)) return;

    const previewId = card.dataset.previewId;
    if (!previewId) return;

    const media = card.querySelector('.pick-preview-playable');
    if (media instanceof HTMLMediaElement) {
      media.preload = 'auto';
      media.load();
    }

    const onMouseEnter = () => {
      startPreviewPlayback(previewId);
    };

    const onMouseMove = () => {
      startPreviewPlayback(previewId);
    };

    const onMouseLeave = () => {
      stopAllCardPreviews();
    };

    const onFocusIn = () => {
      startPreviewPlayback(previewId, { fromUserGesture: true });
    };

    const onFocusOut = () => {
      stopAllCardPreviews();
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
    card.addEventListener('focusin', onFocusIn);
    card.addEventListener('focusout', onFocusOut);

    interactiveMediaCleanup.push(() => {
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
      card.removeEventListener('focusin', onFocusIn);
      card.removeEventListener('focusout', onFocusOut);
    });
  });
}

function evaluateStep(step, userData) {
  switch (step.type) {
    case 'hotspot': {
      if (!Number.isFinite(userData.clickX) || !Number.isFinite(userData.clickY)) return 0;

      const rect = step.correct.correctRect;
      if (pointInRect(userData.clickX, userData.clickY, rect)) return step.scoring.full;

      const nearDistance = Number(step.partialRules.nearDistance || 0);
      if (nearDistance > 0) {
        const dist = pointRectDistance(userData.clickX, userData.clickY, rect);
        if (dist <= nearDistance) return step.scoring.partial;
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

      if (step.correct.anyNonEmpty) return step.scoring.full;

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

    case 'phrase_drag': {
      const matches = countPositionMatches(userData.order, step.correct.order);
      if (matches === step.correct.order.length) return step.scoring.full;
      if (matches >= step.partialRules.minCorrectPositions) return step.scoring.partial;
      return step.scoring.wrong;
    }

    case 'select_2_of_4': {
      if (userData.selected.length !== step.partialRules.requiredCount) return 0;
      if (step.correct.anyPairAccepted) return step.scoring.full;
      const matched = userData.selected.filter((id) => step.correct.ids.includes(id)).length;
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

    case 'infinity_range': {
      if (userData.isInfinity) return step.scoring.full;
      return 0;
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

function maybeFlashHotspotMessage(step, stepState) {
  if (!Array.isArray(step.partialRules.specialRects)) return;

  const x = stepState.userData.clickX;
  const y = stepState.userData.clickY;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return;

  const hit = step.partialRules.specialRects.find((rect) => pointInRect(x, y, rect));
  if (!hit || !hit.message) {
    stepState.userData.flashMessage = '';
    return;
  }

  stepState.userData.flashMessage = hit.message;

  if (hotspotFlashTimeout) {
    clearTimeout(hotspotFlashTimeout);
  }

  const screenSnapshot = state.currentScreen;
  hotspotFlashTimeout = window.setTimeout(() => {
    if (state.completed || state.currentScreen !== screenSnapshot) return;

    const taskIndex = screenToTaskIndex(screenSnapshot);
    if (taskIndex < 0) return;
    if (steps[taskIndex].type !== 'hotspot') return;

    state.stepStates[taskIndex].userData.flashMessage = '';
    saveState();
    render(false);
  }, 1000);
}

function showLowValueOverlay() {
  if (document.getElementById('lowValueOverlay')) return;

  lowOverlayReturnFocusEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  const overlay = ensureLowValueOverlay();
  document.body.appendChild(overlay);
  document.body.classList.add('overlay-open');
  document.addEventListener('keydown', onLowOverlayKeydown);

  const okBtn = overlay.querySelector('[data-action="close-low-overlay"]');
  if (okBtn instanceof HTMLElement) okBtn.focus();
}

function hideLowValueOverlay() {
  const overlay = document.getElementById('lowValueOverlay');
  if (!overlay) return;

  overlay.remove();
  document.body.classList.remove('overlay-open');
  document.removeEventListener('keydown', onLowOverlayKeydown);
  restoreFocusAfterOverlay();
}

function ensureLowValueOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'lowValueOverlay';
  overlay.className = 'low-overlay';
  overlay.innerHTML = `
    <div class="low-overlay-card" role="dialog" aria-modal="true" aria-labelledby="lowOverlayTitle">
      <h3 id="lowOverlayTitle">А почему так мало? Нет, подумай ещё раз</h3>
      <button type="button" class="btn btn-primary" data-action="close-low-overlay">Окей</button>
    </div>
  `;

  const closeBtn = overlay.querySelector('[data-action="close-low-overlay"]');
  if (closeBtn instanceof HTMLElement) {
    closeBtn.addEventListener('click', hideLowValueOverlay, { passive: true });
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      hideLowValueOverlay();
    }
  });

  return overlay;
}

function onLowOverlayKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    hideLowValueOverlay();
  }
}

function restoreFocusAfterOverlay() {
  if (lowOverlayReturnFocusEl && document.contains(lowOverlayReturnFocusEl) && !lowOverlayReturnFocusEl.hasAttribute('disabled')) {
    lowOverlayReturnFocusEl.focus();
    lowOverlayReturnFocusEl = null;
    return;
  }

  const fallback = ui.stage.querySelector('.infinity-track, [data-action="check"]');
  if (fallback instanceof HTMLElement) {
    fallback.focus();
  }

  lowOverlayReturnFocusEl = null;
}

function launchConfetti() {
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';

  const colors = ['#ffd37b', '#ff9f7e', '#7ce3ff', '#9cf3bf', '#ffffff'];
  const count = 42;

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';

    const sideLeft = i % 2 === 0;
    const edgeOffset = randomInt(0, 20);
    const spread = randomInt(0, 35);
    const delay = Math.random() * 0.5;
    const duration = 1.1 + Math.random() * 1;
    const size = 6 + Math.random() * 7;
    const rotate = randomInt(0, 360);

    piece.style.background = colors[randomInt(0, colors.length - 1)];
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.7}px`;
    piece.style.left = sideLeft ? `${edgeOffset + spread}%` : `${100 - edgeOffset - spread}%`;
    piece.style.animationDelay = `${delay}s`;
    piece.style.animationDuration = `${duration}s`;
    piece.style.transform = `rotate(${rotate}deg)`;

    layer.appendChild(piece);
  }

  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 2200);
}

function resetQuest() {
  const approved = window.confirm('Сбросить квест и удалить прогресс?');
  if (!approved) return;

  if (memoryTimeout) {
    clearTimeout(memoryTimeout);
    memoryTimeout = null;
  }

  if (hotspotFlashTimeout) {
    clearTimeout(hotspotFlashTimeout);
    hotspotFlashTimeout = null;
  }

  if (infinityAdvanceTimeout) {
    clearTimeout(infinityAdvanceTimeout);
    infinityAdvanceTimeout = null;
  }

  hideLowValueOverlay();
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
    wireInteractiveMedia();
    return;
  }

  current.classList.add('leave');
  current.addEventListener(
    'animationend',
    () => {
      ui.stage.innerHTML = newHtml;
      const card = ui.stage.firstElementChild;
      if (card) card.classList.add('enter');
      wireInteractiveMedia();
    },
    { once: true }
  );
}

function screenToTaskIndex(screen) {
  return screen - 1;
}

function totalScore() {
  return state.stepStates.reduce((sum, stepState) => sum + normalizeScore(stepState.bestScore), 0);
}

function normalizeScore(value) {
  const score = Number(value);
  return SCORE_SET.includes(score) ? score : 0;
}

function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function pointRectDistance(x, y, rect) {
  const dx = Math.max(rect.x - x, 0, x - (rect.x + rect.w));
  const dy = Math.max(rect.y - y, 0, y - (rect.y + rect.h));
  return Math.hypot(dx, dy);
}

function moveInArray(array, from, to) {
  if (from === to) return;
  const [item] = array.splice(from, 1);
  array.splice(to, 0, item);
}

function countPositionMatches(left, right) {
  let count = 0;
  const len = Math.min(left.length, right.length);
  for (let i = 0; i < len; i += 1) {
    if (left[i] === right[i]) count += 1;
  }
  return count;
}

function shuffledIndices(length) {
  const base = Array.from({ length }, (_, i) => i);
  const result = shuffle(base);
  if (arraysEqual(base, result)) result.reverse();
  return result;
}

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ');
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
    if (Number.isInteger(value) && value >= min && value <= max) unique.add(value);
  });
  return [...unique];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampInt(value, min, max) {
  return Math.min(max, Math.max(min, Math.trunc(Number(value) || 0)));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
