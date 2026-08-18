// LifeOS v0.2
const STORAGE_KEY = 'lifeos-v2';

const DEFAULT_SECTIONS = [
  {
    id: 's-morning',
    title: 'Morning – Leave House',
    items: [
      { id: 'm1', text: 'Creatine', done: false },
      { id: 'm2', text: 'Smoothie', done: false },
      { id: 'm3', text: 'Vitamins', done: false },
      { id: 'm4', text: 'Phone', done: false },
      { id: 'm5', text: 'Watch', done: false },
      { id: 'm6', text: 'Wallet', done: false },
      { id: 'm7', text: 'Keys', done: false },
      { id: 'm8', text: 'Lunch', done: false },
      { id: 'm9', text: 'Briefcases', done: false },
      { id: 'm10', text: 'Headphones', done: false },
      { id: 'm11', text: 'Water', done: false },
      { id: 'm12', text: 'Matcha', done: false }
    ]
  },
  {
    id: 's-arrive',
    title: 'Arrive at Work',
    items: [
      { id: 'a1', text: 'Put bags away', done: false },
      { id: 'a2', text: 'Put lunch in fridge', done: false },
      { id: 'a3', text: 'Organize capture into Configure', done: false },
      { id: 'a4', text: 'Check emails and organize', done: false },
      { id: 'a5', text: 'Check AE Portal', done: false },
      { id: 'a6', text: 'Check voicemail', done: false }
    ]
  },
  {
    id: 's-leave',
    title: 'Leave Work',
    items: [
      { id: 'l1', text: 'Clear desk / pack bags', done: false },
      { id: 'l2', text: 'Quick review of tomorrow', done: false }
    ]
  },
  {
    id: 's-night',
    title: 'Night / Arrive Home',
    items: [
      { id: 'n1', text: 'Prep smoothie ingredients', done: false },
      { id: 'n2', text: 'Supplements ready for morning', done: false },
      { id: 'n3', text: 'Phone charging away from bed', done: false }
    ]
  }
];

let state = {
  captures: [],          // {id, text, created}
  business: [],          // {id, text, created, order}
  personal: [],
  active: [],            // currently working on
  doneToday: [],         // completed today
  sections: JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
  lastHabitReset: null,
  theme: 'dark'
};

let processTargetId = null;
let promptCallback = null;

// ---------- Persistence ----------
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
      if (!state.sections || !state.sections.length) {
        state.sections = JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
      }
    }
  } catch (e) { console.warn(e); }
  maybeResetHabits();
  applyTheme();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function maybeResetHabits() {
  const today = new Date().toDateString();
  if (state.lastHabitReset !== today) {
    state.sections.forEach(sec => sec.items.forEach(i => i.done = false));
    // Move yesterday's doneToday into a simple archive note if needed later
    state.doneToday = [];
    state.lastHabitReset = today;
    saveState();
  }
}

// ---------- Theme ----------
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme === 'light' ? 'light' : 'dark');
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  saveState();
});

// ---------- Navigation ----------
function showTab(tabName) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tabName}`).classList.add('active');
  document.querySelector(`.nav-btn[data-tab="${tabName}"]`).classList.add('active');

  if (tabName === 'capture') renderCapture();
  if (tabName === 'configure') renderConfigure();
  if (tabName === 'control') renderControl();
  if (tabName === 'habits') renderHabits();
}
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showTab(btn.dataset.tab));
});

// ---------- Helpers ----------
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function formatTime(ts) {
  return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------- CAPTURE ----------
const captureInput = document.getElementById('capture-input');
document.getElementById('capture-add').addEventListener('click', addCapture);
document.getElementById('capture-clear').addEventListener('click', () => {
  captureInput.value = '';
  captureInput.focus();
});
captureInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addCapture(); }
});

function addCapture() {
  const text = captureInput.value.trim();
  if (!text) return;
  state.captures.unshift({ id: uid(), text, created: Date.now() });
  captureInput.value = '';
  saveState();
  renderCapture();
  captureInput.focus();
}

function renderCapture() {
  const list = document.getElementById('capture-list');
  const empty = document.getElementById('capture-empty');
  const count = document.getElementById('capture-count');
  count.textContent = state.captures.length;

  if (!state.captures.length) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  list.innerHTML = state.captures.map(item => `
    <li class="item" data-id="${item.id}">
      <div class="item-text">
        ${escapeHtml(item.text)}
        <div class="item-meta">${formatTime(item.created)}</div>
      </div>
      <div class="item-actions">
        <button class="item-btn" data-action="process" title="Process">⇄</button>
        <button class="item-btn" data-action="delete" title="Delete">×</button>
      </div>
    </li>
  `).join('');

  list.querySelectorAll('.item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.closest('.item').dataset.id;
      if (btn.dataset.action === 'delete') {
        state.captures = state.captures.filter(c => c.id !== id);
        saveState();
        renderCapture();
      } else {
        openProcessModal(id);
      }
    });
  });
}

// ---------- Process Modal ----------
function openProcessModal(id) {
  processTargetId = id;
  document.getElementById('process-modal').classList.remove('hidden');
}
document.getElementById('process-cancel').addEventListener('click', () => {
  document.getElementById('process-modal').classList.add('hidden');
  processTargetId = null;
});
document.querySelectorAll('#process-modal [data-choice]').forEach(btn => {
  btn.addEventListener('click', () => {
    const choice = btn.dataset.choice;
    const item = state.captures.find(c => c.id === processTargetId);
    if (!item) return;

    if (choice === 'delete') {
      state.captures = state.captures.filter(c => c.id !== processTargetId);
    } else if (choice === 'business' || choice === 'personal') {
      const target = choice === 'business' ? state.business : state.personal;
      target.unshift({ id: uid(), text: item.text, created: Date.now() });
      state.captures = state.captures.filter(c => c.id !== processTargetId);
    }
    saveState();
    document.getElementById('process-modal').classList.add('hidden');
    processTargetId = null;
    renderCapture();
    renderConfigure();
  });
});

// ---------- CONFIGURE ----------
function renderConfigure() {
  renderAreaList('business', state.business);
  renderAreaList('personal', state.personal);
  document.getElementById('business-count').textContent = state.business.length;
  document.getElementById('personal-count').textContent = state.personal.length;
}

function renderAreaList(area, items) {
  const list = document.getElementById(`${area}-list`);
  const empty = document.getElementById(`${area}-empty`);

  if (!items.length) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  list.innerHTML = items.map(item => `
    <li class="item" data-id="${item.id}">
      <div class="item-text">
        ${escapeHtml(item.text)}
        <div class="item-meta">${formatTime(item.created)}</div>
      </div>
      <div class="item-actions">
        <button class="item-btn work" data-action="work" title="Work on this">Work on this</button>
        <button class="item-btn" data-action="delete" title="Delete">×</button>
      </div>
    </li>
  `).join('');

  list.querySelectorAll('.item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.closest('.item').dataset.id;
      if (btn.dataset.action === 'delete') {
        if (area === 'business') state.business = state.business.filter(t => t.id !== id);
        else state.personal = state.personal.filter(t => t.id !== id);
        saveState();
        renderConfigure();
      } else if (btn.dataset.action === 'work') {
        moveToControl(area, id);
      }
    });
  });

  // Drag and drop
  if (window.Sortable) {
    new Sortable(list, {
      animation: 150,
      ghostClass: 'dragging',
      onEnd: (evt) => {
        const arr = area === 'business' ? state.business : state.personal;
        const [moved] = arr.splice(evt.oldIndex, 1);
        arr.splice(evt.newIndex, 0, moved);
        saveState();
      }
    });
  }
}

function moveToControl(area, id) {
  const arr = area === 'business' ? state.business : state.personal;
  const idx = arr.findIndex(t => t.id === id);
  if (idx === -1) return;
  const [item] = arr.splice(idx, 1);
  state.active.unshift({ ...item, area, movedAt: Date.now() });
  saveState();
  renderConfigure();
  renderControl();
  showTab('control');
}

// ---------- CONTROL ----------
function renderControl() {
  const activeList = document.getElementById('control-active-list');
  const doneList = document.getElementById('control-done-list');
  const activeEmpty = document.getElementById('control-active-empty');
  const doneEmpty = document.getElementById('control-done-empty');

  document.getElementById('active-count').textContent = state.active.length;
  document.getElementById('done-count').textContent = state.doneToday.length;

  // Active
  if (!state.active.length) {
    activeList.innerHTML = '';
    activeEmpty.style.display = 'block';
  } else {
    activeEmpty.style.display = 'none';
    activeList.innerHTML = state.active.map(item => `
      <li class="item" data-id="${item.id}">
        <div class="item-text">
          ${escapeHtml(item.text)}
          <div class="item-meta">${item.area} · ${formatTime(item.created)}</div>
        </div>
        <div class="item-actions">
          <button class="item-btn" data-action="done" title="Mark done">✓</button>
          <button class="item-btn" data-action="back" title="Back to Configure">←</button>
          <button class="item-btn" data-action="delete" title="Delete">×</button>
        </div>
      </li>
    `).join('');

    activeList.querySelectorAll('.item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.item').dataset.id;
        const item = state.active.find(t => t.id === id);
        if (!item) return;
        if (btn.dataset.action === 'done') {
          state.active = state.active.filter(t => t.id !== id);
          state.doneToday.unshift({ ...item, completedAt: Date.now() });
        } else if (btn.dataset.action === 'back') {
          state.active = state.active.filter(t => t.id !== id);
          const target = item.area === 'business' ? state.business : state.personal;
          target.unshift(item);
        } else if (btn.dataset.action === 'delete') {
          state.active = state.active.filter(t => t.id !== id);
        }
        saveState();
        renderControl();
        renderConfigure();
      });
    });
  }

  // Done Today
  if (!state.doneToday.length) {
    doneList.innerHTML = '';
    doneEmpty.style.display = 'block';
  } else {
    doneEmpty.style.display = 'none';
    doneList.innerHTML = state.doneToday.map(item => `
      <li class="item done" data-id="${item.id}">
        <div class="item-text">
          ${escapeHtml(item.text)}
          <div class="item-meta">${item.area} · completed ${formatTime(item.completedAt || item.created)}</div>
        </div>
        <div class="item-actions">
          <button class="item-btn" data-action="reopen" title="Reopen">↺</button>
          <button class="item-btn" data-action="delete" title="Delete">×</button>
        </div>
      </li>
    `).join('');

    doneList.querySelectorAll('.item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('.item').dataset.id;
        if (btn.dataset.action === 'reopen') {
          const item = state.doneToday.find(t => t.id === id);
          state.doneToday = state.doneToday.filter(t => t.id !== id);
          state.active.unshift(item);
        } else {
          state.doneToday = state.doneToday.filter(t => t.id !== id);
        }
        saveState();
        renderControl();
      });
    });
  }
}

// ---------- HABITS ----------
function renderHabits() {
  const container = document.getElementById('habits-container');
  container.innerHTML = state.sections.map(sec => {
    const doneCount = sec.items.filter(i => i.done).length;
    return `
      <div class="habit-section" data-section-id="${sec.id}">
        <div class="habit-section-header">
          <div class="habit-section-title">
            ${escapeHtml(sec.title)}
            <span class="habit-progress">${doneCount}/${sec.items.length}</span>
          </div>
          <div class="habit-section-actions">
            <button class="item-btn" data-action="add-item" title="Add item">+</button>
            <button class="item-btn" data-action="rename-section" title="Rename">✎</button>
            <button class="item-btn" data-action="delete-section" title="Delete section">×</button>
          </div>
        </div>
        <ul class="habit-list">
          ${sec.items.map(h => `
            <li class="habit-item ${h.done ? 'checked' : ''}" data-id="${h.id}">
              <div class="habit-checkbox">${h.done ? '✓' : ''}</div>
              <div class="habit-text">${escapeHtml(h.text)}</div>
              <div class="habit-item-actions">
                <button class="item-btn" data-action="edit-item" title="Edit">✎</button>
                <button class="item-btn" data-action="delete-item" title="Delete">×</button>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }).join('');

  // Section-level actions
  container.querySelectorAll('[data-action="add-item"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      openPrompt('Add habit', '', (text) => {
        if (!text) return;
        const sec = state.sections.find(s => s.id === secId);
        if (sec) {
          sec.items.push({ id: uid(), text, done: false });
          saveState();
          renderHabits();
        }
      });
    });
  });

  container.querySelectorAll('[data-action="rename-section"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      const sec = state.sections.find(s => s.id === secId);
      openPrompt('Rename section', sec.title, (text) => {
        if (!text) return;
        sec.title = text;
        saveState();
        renderHabits();
      });
    });
  });

  container.querySelectorAll('[data-action="delete-section"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      if (confirm('Delete this entire section?')) {
        state.sections = state.sections.filter(s => s.id !== secId);
        saveState();
        renderHabits();
      }
    });
  });

  // Item click = toggle done
  container.querySelectorAll('.habit-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.habit-item-actions')) return;
      const secId = el.closest('.habit-section').dataset.sectionId;
      const id = el.dataset.id;
      const sec = state.sections.find(s => s.id === secId);
      const item = sec.items.find(i => i.id === id);
      if (item) {
        item.done = !item.done;
        saveState();
        renderHabits();
      }
    });
  });

  // Edit / delete item
  container.querySelectorAll('[data-action="edit-item"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      const id = btn.closest('.habit-item').dataset.id;
      const sec = state.sections.find(s => s.id === secId);
      const item = sec.items.find(i => i.id === id);
      openPrompt('Edit habit', item.text, (text) => {
        if (!text) return;
        item.text = text;
        saveState();
        renderHabits();
      });
    });
  });

  container.querySelectorAll('[data-action="delete-item"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      const id = btn.closest('.habit-item').dataset.id;
      const sec = state.sections.find(s => s.id === secId);
      sec.items = sec.items.filter(i => i.id !== id);
      saveState();
      renderHabits();
    });
  });
}

document.getElementById('add-section-btn').addEventListener('click', () => {
  openPrompt('New section name', '', (text) => {
    if (!text) return;
    state.sections.push({ id: uid(), title: text, items: [] });
    saveState();
    renderHabits();
  });
});

document.getElementById('reset-habits').addEventListener('click', () => {
  if (confirm('Reset all checkboxes for today?')) {
    state.sections.forEach(sec => sec.items.forEach(i => i.done = false));
    state.lastHabitReset = new Date().toDateString();
    saveState();
    renderHabits();
  }
});

// ---------- Prompt Modal ----------
function openPrompt(title, value, callback) {
  document.getElementById('prompt-title').textContent = title;
  const input = document.getElementById('prompt-input');
  input.value = value || '';
  promptCallback = callback;
  document.getElementById('prompt-modal').classList.remove('hidden');
  setTimeout(() => input.focus(), 50);
}
document.getElementById('prompt-confirm').addEventListener('click', () => {
  const val = document.getElementById('prompt-input').value.trim();
  document.getElementById('prompt-modal').classList.add('hidden');
  if (promptCallback) promptCallback(val);
  promptCallback = null;
});
document.getElementById('prompt-cancel').addEventListener('click', () => {
  document.getElementById('prompt-modal').classList.add('hidden');
  promptCallback = null;
});
document.getElementById('prompt-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('prompt-confirm').click();
});

// ---------- Init ----------
loadState();
showTab('capture');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
