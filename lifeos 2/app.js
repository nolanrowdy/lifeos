// LifeOS v0.3 – Supabase backed
const SUPABASE_URL = 'https://dakwwxfhevaahrqkgxon.supabase.co';
const SUPABASE_KEY = 'sb_publishable__1IyvRvRWqxV2CpGAmwO5A_5ImUbDCB';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const DEFAULT_TEAM = [
  { id: 'tm-seth', name: 'Seth', role: '', current_focus: '', priority: 'medium', status: 'active', expected_completion: '', latest_update: '', updated_at: 0 },
  { id: 'tm-dave', name: 'Dave', role: '', current_focus: '', priority: 'medium', status: 'active', expected_completion: '', latest_update: '', updated_at: 0 },
  { id: 'tm-rowdy', name: 'Rowdy', role: '', current_focus: '', priority: 'medium', status: 'active', expected_completion: '', latest_update: '', updated_at: 0 },
  { id: 'tm-janis', name: 'Janis', role: '', current_focus: '', priority: 'medium', status: 'active', expected_completion: '', latest_update: '', updated_at: 0 },
  { id: 'tm-conor', name: 'Conor', role: '', current_focus: '', priority: 'medium', status: 'active', expected_completion: '', latest_update: '', updated_at: 0 },
  { id: 'tm-hilary', name: 'Hilary', role: '', current_focus: '', priority: 'medium', status: 'active', expected_completion: '', latest_update: '', updated_at: 0 }
];

const DEFAULT_SECTIONS = [
  { id: 's-morning', title: 'Morning – Leave House', items: [
    { id: 'm1', text: 'Creatine', done: false }, { id: 'm2', text: 'Smoothie', done: false },
    { id: 'm3', text: 'Vitamins', done: false }, { id: 'm4', text: 'Phone', done: false },
    { id: 'm5', text: 'Watch', done: false }, { id: 'm6', text: 'Wallet', done: false },
    { id: 'm7', text: 'Keys', done: false }, { id: 'm8', text: 'Lunch', done: false },
    { id: 'm9', text: 'Briefcases', done: false }, { id: 'm10', text: 'Headphones', done: false },
    { id: 'm11', text: 'Water', done: false }, { id: 'm12', text: 'Matcha', done: false }
  ]},
  { id: 's-arrive', title: 'Arrive at Work', items: [
    { id: 'a1', text: 'Put bags away', done: false }, { id: 'a2', text: 'Put lunch in fridge', done: false },
    { id: 'a3', text: 'Organize capture into Configure', done: false },
    { id: 'a4', text: 'Check emails and organize', done: false },
    { id: 'a5', text: 'Check AE Portal', done: false }, { id: 'a6', text: 'Check voicemail', done: false }
  ]},
  { id: 's-leave', title: 'Leave Work', items: [
    { id: 'l1', text: 'Clear desk / pack bags', done: false },
    { id: 'l2', text: 'Quick review of tomorrow', done: false }
  ]},
  { id: 's-night', title: 'Night / Arrive Home', items: [
    { id: 'n1', text: 'Prep smoothie ingredients', done: false },
    { id: 'n2', text: 'Supplements ready for morning', done: false },
    { id: 'n3', text: 'Phone charging away from bed', done: false }
  ]}
];

let state = {
  user: null,
  captures: [], business: [], personal: [], active: [], doneToday: [],
  sections: JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
  team: [],
  theme: 'dark'
};

let processTargetId = null;
let promptCallback = null;

// ---------- Helpers ----------
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function formatTime(ts) {
  return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}
function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function showError(msg) {
  const el = document.getElementById('auth-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}
function hideError() {
  document.getElementById('auth-error').classList.add('hidden');
}

// ---------- Auth ----------
async function initAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    state.user = session.user;
    await loadAllData();
    showApp();
  } else {
    showAuth();
  }

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      state.user = session.user;
      await loadAllData();
      showApp();
    } else if (event === 'SIGNED_OUT') {
      state.user = null;
      showAuth();
    }
  });
}

function showAuth() {
  document.getElementById('loading-screen').classList.add('hidden');
  document.getElementById('auth-screen').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}
function showApp() {
  document.getElementById('loading-screen').classList.add('hidden');
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  showTab('capture');
}

document.getElementById('auth-login').addEventListener('click', async () => {
  hideError();
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  if (!email || !password) return showError('Enter email and password');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) showError(error.message);
});

document.getElementById('auth-signup').addEventListener('click', async () => {
  hideError();
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  if (!email || !password) return showError('Enter email and password');
  if (password.length < 6) return showError('Password must be at least 6 characters');
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) showError(error.message);
  else showError('Account created. You can log in now.');
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await supabase.auth.signOut();
});

// ---------- Data loading ----------
async function loadAllData() {
  if (!state.user) return;
  const uid = state.user.id;

  // Tasks
  const { data: tasks } = await supabase.from('tasks').select('*').eq('user_id', uid);
  state.captures = []; state.business = []; state.personal = []; state.active = []; state.doneToday = [];
  (tasks || []).forEach(t => {
    const item = { id: t.id, text: t.text, created: t.created_at, completedAt: t.completed_at, area: t.area };
    if (t.area === 'capture') state.captures.push(item);
    else if (t.area === 'business') state.business.push(item);
    else if (t.area === 'personal') state.personal.push(item);
    else if (t.area === 'active') state.active.push(item);
    else if (t.area === 'done') state.doneToday.push(item);
  });

  // Habit sections
  const { data: sections } = await supabase.from('habit_sections').select('*').eq('user_id', uid).order('order');
  if (!sections || sections.length === 0) {
    // Seed defaults
    for (let i = 0; i < DEFAULT_SECTIONS.length; i++) {
      const s = DEFAULT_SECTIONS[i];
      await supabase.from('habit_sections').insert({ id: s.id, user_id: uid, title: s.title, order: i });
      for (let j = 0; j < s.items.length; j++) {
        const h = s.items[j];
        await supabase.from('habits').insert({ id: h.id, section_id: s.id, user_id: uid, text: h.text, done: false, order: j });
      }
    }
    state.sections = JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
  } else {
    const { data: habits } = await supabase.from('habits').select('*').eq('user_id', uid).order('order');
    state.sections = sections.map(s => ({
      id: s.id,
      title: s.title,
      items: (habits || []).filter(h => h.section_id === s.id).map(h => ({
        id: h.id, text: h.text, done: h.done
      }))
    }));
  }

  // Team members
  const { data: teamRows } = await supabase.from('team_members').select('*').eq('user_id', uid);
  if (!teamRows || teamRows.length === 0) {
    state.team = JSON.parse(JSON.stringify(DEFAULT_TEAM));
    for (const m of state.team) {
      await supabase.from('team_members').upsert({
        id: m.id, user_id: uid, name: m.name, role: m.role,
        current_focus: m.current_focus, priority: m.priority, status: m.status,
        expected_completion: m.expected_completion, latest_update: m.latest_update, updated_at: Date.now()
      });
    }
  } else {
    state.team = teamRows.map(r => ({
      id: r.id, name: r.name, role: r.role || '', current_focus: r.current_focus || '',
      priority: r.priority || 'medium', status: r.status || 'active',
      expected_completion: r.expected_completion || '', latest_update: r.latest_update || '',
      updated_at: r.updated_at || 0
    }));
    // Ensure all default names exist
    for (const d of DEFAULT_TEAM) {
      if (!state.team.find(t => t.id === d.id)) {
        state.team.push({ ...d });
        await supabase.from('team_members').upsert({ ...d, user_id: uid, updated_at: Date.now() });
      }
    }
  }

}

// ---------- Task helpers (Supabase) ----------
async function saveTask(item, area) {
  if (!state.user) return;
  await supabase.from('tasks').upsert({
    id: item.id,
    user_id: state.user.id,
    text: item.text,
    area,
    created_at: item.created || Date.now(),
    completed_at: item.completedAt || null,
    order: 0
  });
}
async function deleteTask(id) {
  if (!state.user) return;
  await supabase.from('tasks').delete().eq('id', id);
}
async function moveTask(id, newArea, extra = {}) {
  if (!state.user) return;
  await supabase.from('tasks').update({ area: newArea, ...extra }).eq('id', id);
}

// ---------- Theme ----------
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme === 'light' ? 'light' : 'dark');
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
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
  if (tabName === 'team') renderTeam();
}
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showTab(btn.dataset.tab));
});

// ---------- CAPTURE ----------
const captureInput = document.getElementById('capture-input');
document.getElementById('capture-add').addEventListener('click', addCapture);
document.getElementById('capture-clear').addEventListener('click', () => { captureInput.value = ''; captureInput.focus(); });
captureInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addCapture(); } });

async function addCapture() {
  const text = captureInput.value.trim();
  if (!text) return;
  const item = { id: uid(), text, created: Date.now() };
  state.captures.unshift(item);
  captureInput.value = '';
  await saveTask(item, 'capture');
  renderCapture();
  captureInput.focus();
}

function renderCapture() {
  const list = document.getElementById('capture-list');
  const empty = document.getElementById('capture-empty');
  document.getElementById('capture-count').textContent = state.captures.length;
  if (!state.captures.length) { list.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  list.innerHTML = state.captures.map(item => `
    <li class="item" data-id="${item.id}">
      <div class="item-text">${escapeHtml(item.text)}<div class="item-meta">${formatTime(item.created)}</div></div>
      <div class="item-actions">
        <button class="item-btn" data-action="process" title="Process">⇄</button>
        <button class="item-btn" data-action="delete" title="Delete">×</button>
      </div>
    </li>`).join('');
  list.querySelectorAll('.item-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.closest('.item').dataset.id;
      if (btn.dataset.action === 'delete') {
        state.captures = state.captures.filter(c => c.id !== id);
        await deleteTask(id);
        renderCapture();
      } else openProcessModal(id);
    });
  });
}

function openProcessModal(id) {
  processTargetId = id;
  document.getElementById('process-modal').classList.remove('hidden');
}
document.getElementById('process-cancel').addEventListener('click', () => {
  document.getElementById('process-modal').classList.add('hidden');
  processTargetId = null;
});
document.querySelectorAll('#process-modal [data-choice]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const choice = btn.dataset.choice;
    const item = state.captures.find(c => c.id === processTargetId);
    if (!item) return;
    if (choice === 'delete') {
      state.captures = state.captures.filter(c => c.id !== processTargetId);
      await deleteTask(processTargetId);
    } else {
      const target = choice === 'business' ? state.business : state.personal;
      target.unshift(item);
      state.captures = state.captures.filter(c => c.id !== processTargetId);
      await moveTask(item.id, choice);
    }
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
  if (!items.length) { list.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  list.innerHTML = items.map(item => `
    <li class="item" data-id="${item.id}">
      <div class="item-text">${escapeHtml(item.text)}<div class="item-meta">${formatTime(item.created)}</div></div>
      <div class="item-actions">
        <button class="item-btn work" data-action="work">Work on this</button>
        <button class="item-btn delegate" data-action="delegate">Delegate</button>
        <button class="item-btn" data-action="delete">×</button>
      </div>
    </li>`).join('');
  list.querySelectorAll('.item-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.closest('.item').dataset.id;
      if (btn.dataset.action === 'delete') {
        if (area === 'business') state.business = state.business.filter(t => t.id !== id);
        else state.personal = state.personal.filter(t => t.id !== id);
        await deleteTask(id);
        renderConfigure();
      } else if (btn.dataset.action === 'work') {
        await moveToControl(area, id);
      } else if (btn.dataset.action === 'delegate') {
        openDelegateModal(area, id);
      }
    });
  });
  if (window.Sortable) {
    new Sortable(list, {
      animation: 150, ghostClass: 'dragging',
      onEnd: (evt) => {
        const arr = area === 'business' ? state.business : state.personal;
        const [moved] = arr.splice(evt.oldIndex, 1);
        arr.splice(evt.newIndex, 0, moved);
      }
    });
  }
}
async function moveToControl(area, id) {
  const arr = area === 'business' ? state.business : state.personal;
  const idx = arr.findIndex(t => t.id === id);
  if (idx === -1) return;
  const [item] = arr.splice(idx, 1);
  item.area = area;
  state.active.unshift(item);
  await moveTask(id, 'active');
  renderConfigure();
  renderControl();
  showTab('control');
}

// ---------- CONTROL ----------
function renderControl() {
  const activeList = document.getElementById('control-active-list');
  const doneList = document.getElementById('control-done-list');
  document.getElementById('active-count').textContent = state.active.length;
  document.getElementById('done-count').textContent = state.doneToday.length;

  if (!state.active.length) {
    activeList.innerHTML = ''; document.getElementById('control-active-empty').style.display = 'block';
  } else {
    document.getElementById('control-active-empty').style.display = 'none';
    activeList.innerHTML = state.active.map(item => `
      <li class="item" data-id="${item.id}">
        <div class="item-text">${escapeHtml(item.text)}<div class="item-meta">${item.area || ''} · ${formatTime(item.created)}</div></div>
        <div class="item-actions">
          <button class="item-btn" data-action="done">✓</button>
          <button class="item-btn" data-action="back">←</button>
          <button class="item-btn" data-action="delete">×</button>
        </div>
      </li>`).join('');
    activeList.querySelectorAll('.item-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.closest('.item').dataset.id;
        const item = state.active.find(t => t.id === id);
        if (!item) return;
        if (btn.dataset.action === 'done') {
          state.active = state.active.filter(t => t.id !== id);
          item.completedAt = Date.now();
          state.doneToday.unshift(item);
          await moveTask(id, 'done', { completed_at: item.completedAt });
        } else if (btn.dataset.action === 'back') {
          state.active = state.active.filter(t => t.id !== id);
          const target = (item.area === 'business') ? state.business : state.personal;
          target.unshift(item);
          await moveTask(id, item.area || 'business');
        } else {
          state.active = state.active.filter(t => t.id !== id);
          await deleteTask(id);
        }
        renderControl(); renderConfigure();
      });
    });
  }

  if (!state.doneToday.length) {
    doneList.innerHTML = ''; document.getElementById('control-done-empty').style.display = 'block';
  } else {
    document.getElementById('control-done-empty').style.display = 'none';
    doneList.innerHTML = state.doneToday.map(item => `
      <li class="item done" data-id="${item.id}">
        <div class="item-text">${escapeHtml(item.text)}<div class="item-meta">completed ${formatTime(item.completedAt || item.created)}</div></div>
        <div class="item-actions">
          <button class="item-btn" data-action="reopen">↺</button>
          <button class="item-btn" data-action="delete">×</button>
        </div>
      </li>`).join('');
    doneList.querySelectorAll('.item-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.closest('.item').dataset.id;
        if (btn.dataset.action === 'reopen') {
          const item = state.doneToday.find(t => t.id === id);
          state.doneToday = state.doneToday.filter(t => t.id !== id);
          state.active.unshift(item);
          await moveTask(id, 'active');
        } else {
          state.doneToday = state.doneToday.filter(t => t.id !== id);
          await deleteTask(id);
        }
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
          <div class="habit-section-title">${escapeHtml(sec.title)} <span class="habit-progress">${doneCount}/${sec.items.length}</span></div>
          <div class="habit-section-actions">
            <button class="item-btn" data-action="add-item">+</button>
            <button class="item-btn" data-action="rename-section">✎</button>
            <button class="item-btn" data-action="delete-section">×</button>
          </div>
        </div>
        <ul class="habit-list">
          ${sec.items.map(h => `
            <li class="habit-item ${h.done ? 'checked' : ''}" data-id="${h.id}">
              <div class="habit-checkbox">${h.done ? '✓' : ''}</div>
              <div class="habit-text">${escapeHtml(h.text)}</div>
              <div class="habit-item-actions">
                <button class="item-btn" data-action="edit-item">✎</button>
                <button class="item-btn" data-action="delete-item">×</button>
              </div>
            </li>`).join('')}
        </ul>
      </div>`;
  }).join('');

  // Section actions
  container.querySelectorAll('[data-action="add-item"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      openPrompt('Add habit', '', async (text) => {
        if (!text) return;
        const sec = state.sections.find(s => s.id === secId);
        const id = uid();
        sec.items.push({ id, text, done: false });
        await supabase.from('habits').insert({ id, section_id: secId, user_id: state.user.id, text, done: false, order: sec.items.length });
        renderHabits();
      });
    });
  });
  container.querySelectorAll('[data-action="rename-section"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      const sec = state.sections.find(s => s.id === secId);
      openPrompt('Rename section', sec.title, async (text) => {
        if (!text) return;
        sec.title = text;
        await supabase.from('habit_sections').update({ title: text }).eq('id', secId);
        renderHabits();
      });
    });
  });
  container.querySelectorAll('[data-action="delete-section"]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      if (!confirm('Delete this entire section?')) return;
      state.sections = state.sections.filter(s => s.id !== secId);
      await supabase.from('habit_sections').delete().eq('id', secId);
      renderHabits();
    });
  });

  // Toggle done
  container.querySelectorAll('.habit-item').forEach(el => {
    el.addEventListener('click', async e => {
      if (e.target.closest('.habit-item-actions')) return;
      const secId = el.closest('.habit-section').dataset.sectionId;
      const id = el.dataset.id;
      const sec = state.sections.find(s => s.id === secId);
      const item = sec.items.find(i => i.id === id);
      if (item) {
        item.done = !item.done;
        await supabase.from('habits').update({ done: item.done }).eq('id', id);
        renderHabits();
      }
    });
  });

  container.querySelectorAll('[data-action="edit-item"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      const id = btn.closest('.habit-item').dataset.id;
      const sec = state.sections.find(s => s.id === secId);
      const item = sec.items.find(i => i.id === id);
      openPrompt('Edit habit', item.text, async (text) => {
        if (!text) return;
        item.text = text;
        await supabase.from('habits').update({ text }).eq('id', id);
        renderHabits();
      });
    });
  });
  container.querySelectorAll('[data-action="delete-item"]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      const id = btn.closest('.habit-item').dataset.id;
      const sec = state.sections.find(s => s.id === secId);
      sec.items = sec.items.filter(i => i.id !== id);
      await supabase.from('habits').delete().eq('id', id);
      renderHabits();
    });
  });
}

document.getElementById('add-section-btn').addEventListener('click', () => {
  openPrompt('New section name', '', async (text) => {
    if (!text) return;
    const id = uid();
    state.sections.push({ id, title: text, items: [] });
    await supabase.from('habit_sections').insert({ id, user_id: state.user.id, title: text, order: state.sections.length });
    renderHabits();
  });
});
document.getElementById('reset-habits').addEventListener('click', async () => {
  if (!confirm('Reset all checkboxes for today?')) return;
  state.sections.forEach(sec => sec.items.forEach(i => i.done = false));
  if (state.user) {
    await supabase.from('habits').update({ done: false }).eq('user_id', state.user.id);
  }
  renderHabits();
});

// ---------- Prompt ----------
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
document.getElementById('prompt-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('prompt-confirm').click();
});


// ---------- TEAM ----------
let delegateContext = null;

function openDelegateModal(area, taskId) {
  delegateContext = { area, taskId };
  const box = document.getElementById('delegate-options');
  box.innerHTML = state.team.map(m =>
    `<button class="btn primary" data-member-id="${m.id}">${escapeHtml(m.name)}</button>`
  ).join('');
  box.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', async () => {
      const memberId = b.dataset.memberId;
      const member = state.team.find(m => m.id === memberId);
      const arr = delegateContext.area === 'business' ? state.business : state.personal;
      const task = arr.find(t => t.id === delegateContext.taskId);
      if (member && task) {
        member.current_focus = task.text;
        member.updated_at = Date.now();
        member.latest_update = `Assigned: ${task.text}`;
        await saveTeamMember(member);
        // Remove from configure or leave? Leave for now, just set focus
        renderTeam();
      }
      document.getElementById('delegate-modal').classList.add('hidden');
      delegateContext = null;
    });
  });
  document.getElementById('delegate-modal').classList.remove('hidden');
}
document.getElementById('delegate-cancel').addEventListener('click', () => {
  document.getElementById('delegate-modal').classList.add('hidden');
  delegateContext = null;
});

async function saveTeamMember(m) {
  if (!state.user) return;
  await supabase.from('team_members').upsert({
    id: m.id, user_id: state.user.id, name: m.name, role: m.role,
    current_focus: m.current_focus, priority: m.priority, status: m.status,
    expected_completion: m.expected_completion, latest_update: m.latest_update,
    updated_at: m.updated_at || Date.now()
  });
}

function renderTeam() {
  const container = document.getElementById('team-container');
  if (!state.team.length) {
    container.innerHTML = '<p class="empty-state">No team members yet.</p>';
    return;
  }
  container.innerHTML = state.team.map(m => `
    <div class="team-card" data-id="${m.id}">
      <div class="team-card-header">
        <div class="team-name">${escapeHtml(m.name)}</div>
        <span class="team-status ${m.status}">${m.status}</span>
      </div>
      <div class="team-field">
        <label>Role / Responsibilities</label>
        <textarea data-field="role" rows="2">${escapeHtml(m.role)}</textarea>
      </div>
      <div class="team-field">
        <label>Current Focus</label>
        <input type="text" data-field="current_focus" value="${escapeHtml(m.current_focus)}">
      </div>
      <div class="team-field">
        <label>Priority</label>
        <select data-field="priority">
          <option value="high" ${m.priority==='high'?'selected':''}>High</option>
          <option value="medium" ${m.priority==='medium'?'selected':''}>Medium</option>
          <option value="low" ${m.priority==='low'?'selected':''}>Low</option>
        </select>
      </div>
      <div class="team-field">
        <label>Status</label>
        <select data-field="status">
          <option value="active" ${m.status==='active'?'selected':''}>Active</option>
          <option value="waiting" ${m.status==='waiting'?'selected':''}>Waiting</option>
          <option value="blocked" ${m.status==='blocked'?'selected':''}>Blocked</option>
        </select>
      </div>
      <div class="team-field">
        <label>Expected Completion</label>
        <input type="text" data-field="expected_completion" value="${escapeHtml(m.expected_completion)}" placeholder="e.g. Friday, or 8/25">
      </div>
      <div class="team-field">
        <label>Latest Update</label>
        <textarea data-field="latest_update" rows="2">${escapeHtml(m.latest_update)}</textarea>
      </div>
      <div class="team-meta">${m.updated_at ? 'Updated ' + formatTime(m.updated_at) : ''}</div>
    </div>
  `).join('');

  container.querySelectorAll('.team-card').forEach(card => {
    const id = card.dataset.id;
    const member = state.team.find(m => m.id === id);
    card.querySelectorAll('[data-field]').forEach(el => {
      const field = el.dataset.field;
      const handler = async () => {
        member[field] = el.value;
        member.updated_at = Date.now();
        await saveTeamMember(member);
        // Update status badge live
        if (field === 'status') {
          const badge = card.querySelector('.team-status');
          badge.className = 'team-status ' + el.value;
          badge.textContent = el.value;
        }
      };
      el.addEventListener('change', handler);
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.addEventListener('blur', handler);
      }
    });
  });
}


// ---------- Init ----------
applyTheme();
initAuth();
