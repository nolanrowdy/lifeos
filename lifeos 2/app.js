// LifeOS v0.3 – Supabase backed
const SUPABASE_URL = 'https://dakwwxfhevaahrqkgxon.supabase.co';
const SUPABASE_KEY = 'sb_publishable__1IyvRvRWqxV2CpGAmwO5A_5ImUbDCB';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const DEFAULT_TEAM = [
  { id: 'tm-nolan', name: 'Nolan', role: '', workload: 'normal', last_checkin_date: '', last_checkin_notes: '', highest_focus: null, priorities: [], open_loops: [], completed: [], updated_at: 0 },
  { id: 'tm-seth', name: 'Seth', role: '', workload: 'normal', last_checkin_date: '', last_checkin_notes: '', highest_focus: null, priorities: [], open_loops: [], completed: [], updated_at: 0 },
  { id: 'tm-dave', name: 'Dave', role: '', workload: 'normal', last_checkin_date: '', last_checkin_notes: '', highest_focus: null, priorities: [], open_loops: [], completed: [], updated_at: 0 },
  { id: 'tm-rowdy', name: 'Rowdy', role: '', workload: 'normal', last_checkin_date: '', last_checkin_notes: '', highest_focus: null, priorities: [], open_loops: [], completed: [], updated_at: 0 },
  { id: 'tm-janis', name: 'Janis', role: '', workload: 'normal', last_checkin_date: '', last_checkin_notes: '', highest_focus: null, priorities: [], open_loops: [], completed: [], updated_at: 0 },
  { id: 'tm-conor', name: 'Conor', role: '', workload: 'normal', last_checkin_date: '', last_checkin_notes: '', highest_focus: null, priorities: [], open_loops: [], completed: [], updated_at: 0 },
  { id: 'tm-hilary', name: 'Hilary', role: '', workload: 'normal', last_checkin_date: '', last_checkin_notes: '', highest_focus: null, priorities: [], open_loops: [], completed: [], updated_at: 0 }
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

const DEFAULT_VISION = {
  antiVision: `If nothing major changes, five years from now an average Tuesday looks like this: I wake up groggy and fifty pounds overweight. We still do not own a home; credit never recovered, so we are not even in a nice rental. The same money pressure, rejection, and quiet sense of inadequacy still sit on my shoulders — the burden of providing both money and vision never lifts. Declan is eight. He has already learned to ask, “Are you happy, Dad?” He watches movies and plays video games more than he seeks activities with me, and he spends more time with friends than with his father. My own father is still carrying too much stress; a heart attack takes him before I ever get him to Italy. Hilary and I were too stressed and strained to have another child, and a quiet resentment lives between us because of it. Presence was partial for too long. The years that mattered most slipped by while attention stayed split, and the deeper cost is a life that stayed smaller than it was meant to be — and a son who felt it.`,
  identity: '',
  purpose: `Dual-purposed in all things. Provide (money, essence, foresight, service). Live in community. Stay healthy and wealthy so I can help more people. Be fruitful and multiply. Laboring apostle — self-supporting through business while planting and equipping.`,
  yearAim: `$25M OneAE / Advisors Excel production by next December.\n~$2M in commissions.\n$25K/month residual AUM fee.\nCredit score to 750.\nApply for a home for Hilary and me.`,
  rock: `$6M OneAE production to finish the year.\n~$400K commissions.\nDrive this through the 4 educational events already scheduled.`,
  monthProject: '',
  weekLevers: ''
};

let state = {
  user: null,
  captures: [], business: [], personal: [], active: [], doneToday: [],
  sections: JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
  team: [],
  vision: JSON.parse(JSON.stringify(DEFAULT_VISION)),
  quadrants: {},
  habitLogs: {},
  configureView: 'areas',
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
  const { data: { session } } = await sb.auth.getSession();
  if (session?.user) {
    state.user = session.user;
    await loadAllData();
    showApp();
  } else {
    showAuth();
  }

  sb.auth.onAuthStateChange(async (event, session) => {
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
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) showError(error.message);
});

document.getElementById('auth-signup').addEventListener('click', async () => {
  hideError();
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  if (!email || !password) return showError('Enter email and password');
  if (password.length < 6) return showError('Password must be at least 6 characters');
  const { error } = await sb.auth.signUp({ email, password });
  if (error) showError(error.message);
  else showError('Account created. You can log in now.');
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  await sb.auth.signOut();
});

// ---------- Data loading ----------
async function loadAllData() {
  if (!state.user) return;
  const uid = state.user.id;

  // Tasks
  const { data: tasks } = await sb.from('tasks').select('*').eq('user_id', uid);
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
  const { data: sections } = await sb.from('habit_sections').select('*').eq('user_id', uid).order('order');
  if (!sections || sections.length === 0) {
    // Seed defaults
    for (let i = 0; i < DEFAULT_SECTIONS.length; i++) {
      const s = DEFAULT_SECTIONS[i];
      await sb.from('habit_sections').insert({ id: s.id, user_id: uid, title: s.title, order: i });
      for (let j = 0; j < s.items.length; j++) {
        const h = s.items[j];
        await sb.from('habits').insert({ id: h.id, section_id: s.id, user_id: uid, text: h.text, done: false, order: j });
      }
    }
    state.sections = JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
  } else {
    const { data: habits } = await sb.from('habits').select('*').eq('user_id', uid).order('order');
    state.sections = sections.map(s => ({
      id: s.id,
      title: s.title,
      items: (habits || []).filter(h => h.section_id === s.id).map(h => ({
        id: h.id, text: h.text, done: h.done
      }))
    }));
  }

  // Team members
  const { data: teamRows } = await sb.from('team_members').select('*').eq('user_id', uid);
  function normalizeMember(r) {
    return {
      id: r.id,
      name: r.name,
      role: r.role || '',
      workload: r.workload || 'normal',
      last_checkin_date: r.last_checkin_date || '',
      last_checkin_notes: r.last_checkin_notes || '',
      highest_focus: r.highest_focus || null,
      priorities: Array.isArray(r.priorities) ? r.priorities : [],
      open_loops: Array.isArray(r.open_loops) ? r.open_loops : [],
      completed: Array.isArray(r.completed) ? r.completed : [],
      updated_at: r.updated_at || 0
    };
  }
  if (!teamRows || teamRows.length === 0) {
    state.team = JSON.parse(JSON.stringify(DEFAULT_TEAM));
    for (const m of state.team) {
      await sb.from('team_members').upsert({
        id: m.id, user_id: uid, name: m.name, role: m.role,
        workload: m.workload, last_checkin_date: m.last_checkin_date,
        last_checkin_notes: m.last_checkin_notes, highest_focus: m.highest_focus,
        priorities: m.priorities, open_loops: m.open_loops, completed: m.completed,
        updated_at: Date.now()
      });
    }
  } else {
    state.team = teamRows.map(normalizeMember);
    for (const d of DEFAULT_TEAM) {
      if (!state.team.find(t => t.id === d.id)) {
        const copy = JSON.parse(JSON.stringify(d));
        state.team.push(copy);
        await sb.from('team_members').upsert({
          id: copy.id, user_id: uid, name: copy.name, role: copy.role,
          workload: copy.workload, last_checkin_date: '', last_checkin_notes: '',
          highest_focus: null, priorities: [], open_loops: [], completed: [],
          updated_at: Date.now()
        });
      }
    }
    // Keep DEFAULT_TEAM order
    state.team.sort((a, b) => {
      const ai = DEFAULT_TEAM.findIndex(d => d.id === a.id);
      const bi = DEFAULT_TEAM.findIndex(d => d.id === b.id);
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
    });
  }

  await loadSettings();
}

async function loadSettings() {
  if (!state.user) return;
  try {
    const { data, error } = await sb.from('user_settings').select('*').eq('user_id', state.user.id).maybeSingle();
    if (error || !data) {
      const local = localStorage.getItem('lifeos-settings');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.vision) state.vision = { ...DEFAULT_VISION, ...parsed.vision };
        if (parsed.quadrants) state.quadrants = migrateQuadrants(parsed.quadrants);
        if (parsed.habitLogs) state.habitLogs = parsed.habitLogs;
      }
      return;
    }
    if (data.vision) state.vision = { ...DEFAULT_VISION, ...data.vision };
    if (data.quadrants) state.quadrants = migrateQuadrants(data.quadrants);
    if (data.habit_logs) state.habitLogs = data.habit_logs;
  } catch (e) {
    const local = localStorage.getItem('lifeos-settings');
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed.vision) state.vision = { ...DEFAULT_VISION, ...parsed.vision };
      if (parsed.quadrants) state.quadrants = migrateQuadrants(parsed.quadrants);
      if (parsed.habitLogs) state.habitLogs = parsed.habitLogs;
    }
  }
}

async function saveSettings() {
  const payload = {
    vision: state.vision,
    quadrants: state.quadrants,
    habitLogs: state.habitLogs
  };
  localStorage.setItem('lifeos-settings', JSON.stringify(payload));
  if (!state.user) return;
  try {
    await sb.from('user_settings').upsert({
      user_id: state.user.id,
      vision: state.vision,
      quadrants: state.quadrants,
      habit_logs: state.habitLogs,
      updated_at: Date.now()
    });
  } catch (e) { /* local fallback already saved */ }
}

// ---------- Task helpers (Supabase) ----------
async function saveTask(item, area) {
  if (!state.user) return;
  await sb.from('tasks').upsert({
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
  await sb.from('tasks').delete().eq('id', id);
}
async function moveTask(id, newArea, extra = {}) {
  if (!state.user) return;
  await sb.from('tasks').update({ area: newArea, ...extra }).eq('id', id);
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
  if (tabName === 'habits') renderRoutine();
  if (tabName === 'team') renderTeam();
  if (tabName === 'vision') renderVision();
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
const Q_MAP_OLD = { iu: 'now', in: 'schedule', un: 'delegate', nn: 'eliminate' };
const QUADS = [
  { id: 'now', title: 'Now', sub: 'Urgent + Important' },
  { id: 'schedule', title: 'Schedule', sub: 'Important, not urgent' },
  { id: 'delegate', title: 'Delegate', sub: 'Urgent, not important' },
  { id: 'eliminate', title: 'Eliminate', sub: 'Black hole' }
];

function migrateQuadrants(obj) {
  const out = {};
  Object.entries(obj || {}).forEach(([id, q]) => {
    out[id] = Q_MAP_OLD[q] || q || '';
  });
  return out;
}

function qOf(id) {
  const q = state.quadrants[id] || '';
  return Q_MAP_OLD[q] || q;
}

async function setQuadrant(id, q) {
  if (!q) delete state.quadrants[id];
  else state.quadrants[id] = q;
  await saveSettings();
}

function itemsIn(area, q) {
  const arr = area === 'business' ? state.business : state.personal;
  return arr.filter(t => {
    const cur = qOf(t.id);
    if (q === 'unsorted') return !cur || cur === 'unsorted';
    return cur === q;
  });
}

function quadCardHtml(item, area, q) {
  const inDelegate = q === 'delegate';
  const inElim = q === 'eliminate';
  return `<li class="item compact" data-id="${item.id}" data-area="${area}">
    <div class="item-text">${escapeHtml(item.text)}</div>
    <div class="item-actions">
      <button class="item-btn" data-action="info" title="Info">ⓘ</button>
      ${inElim
        ? `<button class="item-btn" data-action="restore" title="Back to Unsorted">←</button>`
        : `<button class="item-btn" data-action="capture" title="Back to Capture">←</button>
           ${inDelegate
             ? `<button class="item-btn" data-action="delegate" title="Delegate">⇄</button>`
             : `<button class="item-btn work" data-action="work" title="Work on this">⛏</button>`}
           <button class="item-btn" data-action="delete" title="Eliminate">×</button>`}
    </div>
  </li>`;
}

function bindCardActions(root) {
  root.querySelectorAll('.item-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const row = btn.closest('.item');
      const id = row.dataset.id;
      const area = row.dataset.area;
      if (btn.dataset.action === 'info') {
        const arr = area === 'business' ? state.business : state.personal;
        const item = arr.find(t => t.id === id);
        document.getElementById('info-body').textContent =
          `${area} · added ${item ? formatTime(item.created) : ''}`;
        document.getElementById('info-modal').classList.remove('hidden');
      } else if (btn.dataset.action === 'work') {
        await moveToControl(area, id);
      } else if (btn.dataset.action === 'delegate') {
        openDelegateModal(area, id);
      } else if (btn.dataset.action === 'capture') {
        await sendToCapture(area, id);
      } else if (btn.dataset.action === 'restore') {
        await setQuadrant(id, '');
        renderConfigure();
        closeOverlay();
      } else if (btn.dataset.action === 'delete') {
        pendingEliminate = { area, id };
        document.getElementById('confirm-modal').classList.remove('hidden');
      }
    });
  });
}

let pendingEliminate = null;
let overlayCtx = null;

function renderConfigure() {
  const root = document.getElementById('cfg-root');
  if (!root) return;
  root.innerHTML = ['business', 'personal'].map(area => {
    const label = area === 'business' ? 'Business' : 'Personal';
    const live = (area === 'business' ? state.business : state.personal).filter(t => qOf(t.id) !== 'eliminate');
    return `<div class="cfg-area" data-area="${area}">
      <div class="cfg-area-head"><h3>${label}</h3><span class="count-badge">${live.length}</span></div>
      <div class="cfg-quads">
        ${QUADS.map(q => {
          const items = itemsIn(area, q.id);
          const emptyFace = q.id === 'eliminate';
          return `<div class="cfg-quad q-${q.id}" data-area="${area}" data-q="${q.id}">
            <button class="quad-title" data-area="${area}" data-q="${q.id}">
              <span>${q.title}</span>
              <span class="q-sub">${q.sub}</span>
              <span class="count-badge">${items.length}</span>
            </button>
            ${emptyFace
              ? `<div class="black-hole">Eliminated</div>`
              : `<ul class="quad-list" data-area="${area}" data-q="${q.id}">${
                  items.map(t => quadCardHtml(t, area, q.id)).join('') || '<li class="empty-inline">Empty</li>'
                }</ul>`}
          </div>`;
        }).join('')}
      </div>
      <div class="cfg-quad q-unsorted" data-area="${area}" data-q="unsorted">
        <button class="quad-title" data-area="${area}" data-q="unsorted">
          <span>Unsorted</span>
          <span class="q-sub">Not filed yet</span>
          <span class="count-badge">${itemsIn(area, 'unsorted').length}</span>
        </button>
        <ul class="quad-list" data-area="${area}" data-q="unsorted">${
          itemsIn(area, 'unsorted').map(t => quadCardHtml(t, area, 'unsorted')).join('') || '<li class="empty-inline">Empty</li>'
        }</ul>
      </div>
    </div>`;
  }).join('');

  bindCardActions(root);
  root.querySelectorAll('.quad-title').forEach(btn => {
    btn.addEventListener('click', () => openOverlay(btn.dataset.area, btn.dataset.q));
  });

  if (window.Sortable) {
    root.querySelectorAll('.quad-list').forEach(list => {
      const area = list.dataset.area;
      const q = list.dataset.q;
      if (q === 'eliminate') return;
      new Sortable(list, {
        group: `cfg-${area}`,
        animation: 150,
        ghostClass: 'dragging',
        draggable: '.item.compact',
        onAdd: async (evt) => {
          const id = evt.item.dataset.id;
          await setQuadrant(id, q === 'unsorted' ? '' : q);
          renderConfigure();
        },
        onUpdate: () => {
          const ids = [...list.querySelectorAll('.item.compact')].map(el => el.dataset.id);
          const arr = area === 'business' ? state.business : state.personal;
          arr.sort((a, b) => {
            const ai = ids.indexOf(a.id); const bi = ids.indexOf(b.id);
            if (ai === -1 && bi === -1) return 0;
            if (ai === -1) return 1;
            if (bi === -1) return -1;
            return ai - bi;
          });
        }
      });
    });
  }
}

function openOverlay(area, q) {
  overlayCtx = { area, q };
  const meta = QUADS.find(x => x.id === q) || { title: 'Unsorted' };
  const title = `${area === 'business' ? 'Business' : 'Personal'} · ${meta.title || 'Unsorted'}`;
  document.getElementById('overlay-title').textContent = title;
  const items = itemsIn(area, q);
  if (q === 'eliminate') {
    items.sort((a, b) => (b.eliminatedAt || b.created || 0) - (a.eliminatedAt || a.created || 0));
  }
  const list = document.getElementById('overlay-list');
  list.innerHTML = items.map(t => quadCardHtml(t, area, q)).join('') || '<li class="empty-inline">Empty</li>';
  bindCardActions(list);
  document.getElementById('quad-overlay').classList.remove('hidden');
  if (window.Sortable && q !== 'eliminate') {
    new Sortable(list, {
      animation: 150,
      ghostClass: 'dragging',
      draggable: '.item.compact',
      onUpdate: () => {
        const ids = [...list.querySelectorAll('.item.compact')].map(el => el.dataset.id);
        const arr = area === 'business' ? state.business : state.personal;
        arr.sort((a, b) => {
          const ai = ids.indexOf(a.id); const bi = ids.indexOf(b.id);
          if (ai === -1 || bi === -1) return 0;
          return ai - bi;
        });
      }
    });
  }
}
function closeOverlay() {
  document.getElementById('quad-overlay').classList.add('hidden');
  overlayCtx = null;
  renderConfigure();
}

document.getElementById('overlay-close').addEventListener('click', closeOverlay);
document.getElementById('info-close').addEventListener('click', () => {
  document.getElementById('info-modal').classList.add('hidden');
});
document.getElementById('confirm-no').addEventListener('click', () => {
  document.getElementById('confirm-modal').classList.add('hidden');
  pendingEliminate = null;
});
document.getElementById('confirm-yes').addEventListener('click', async () => {
  document.getElementById('confirm-modal').classList.add('hidden');
  if (!pendingEliminate) return;
  const { id } = pendingEliminate;
  const arr = pendingEliminate.area === 'business' ? state.business : state.personal;
  const item = arr.find(t => t.id === id);
  if (item) item.eliminatedAt = Date.now();
  await setQuadrant(id, 'eliminate');
  pendingEliminate = null;
  renderConfigure();
  if (overlayCtx) openOverlay(overlayCtx.area, overlayCtx.q);
});

async function sendToCapture(area, id) {
  const arr = area === 'business' ? state.business : state.personal;
  const idx = arr.findIndex(t => t.id === id);
  if (idx === -1) return;
  const [item] = arr.splice(idx, 1);
  delete state.quadrants[id];
  state.captures.unshift(item);
  await moveTask(id, 'capture');
  await saveSettings();
  renderConfigure();
  renderCapture();
  showTab('capture');
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

function renderVision() {
  const v = state.vision;
  document.getElementById('vision-container').innerHTML = `
    <div class="vision-block">
      <label>Anti-Vision</label>
      <p class="vision-hint">The Tuesday you refuse. The life that stays the same.</p>
      <textarea data-vf="antiVision" rows="8">${escapeHtml(v.antiVision || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>Identity</label>
      <p class="vision-hint">Present tense. “I am the kind of man who…”</p>
      <textarea data-vf="identity" rows="3" placeholder="I am the kind of man who…">${escapeHtml(v.identity || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>Purpose</label>
      <p class="vision-hint">Dual-purpose, provide, community, health, fruit, laboring apostle.</p>
      <textarea data-vf="purpose" rows="6">${escapeHtml(v.purpose || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>1-Year Aim</label>
      <textarea data-vf="yearAim" rows="5">${escapeHtml(v.yearAim || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>90-Day Rock</label>
      <textarea data-vf="rock" rows="4">${escapeHtml(v.rock || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>This Month’s Project</label>
      <textarea data-vf="monthProject" rows="3" placeholder="One concrete result this month">${escapeHtml(v.monthProject || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>This Week’s Levers</label>
      <p class="vision-hint">3–5 actions. These should show up in Configure / Control.</p>
      <textarea data-vf="weekLevers" rows="4" placeholder="One lever per line">${escapeHtml(v.weekLevers || '')}</textarea>
    </div>
    <button class="btn primary" id="vision-save">Save Vision</button>
    <p class="auth-note" id="vision-saved" style="display:none">Saved.</p>
  `;
  document.querySelectorAll('#vision-container [data-vf]').forEach(el => {
    el.addEventListener('blur', async () => {
      state.vision[el.dataset.vf] = el.value;
      await saveSettings();
    });
  });
  document.getElementById('vision-save').addEventListener('click', async () => {
    document.querySelectorAll('#vision-container [data-vf]').forEach(el => {
      state.vision[el.dataset.vf] = el.value;
    });
    await saveSettings();
    const note = document.getElementById('vision-saved');
    note.style.display = 'block';
    setTimeout(() => note.style.display = 'none', 1500);
  });
}

function startOfWeek(d) {
  const x = new Date(d);
  const day = x.getDay();
  const diff = (day === 0 ? -6 : 1 - day); // Monday start
  x.setDate(x.getDate() + diff);
  x.setHours(0,0,0,0);
  return x;
}
function ymd(d) {
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function weekDates() {
  const start = startOfWeek(new Date());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function renderRoutine() {
  const days = weekDates();
  const today = ymd(new Date());
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  document.getElementById('week-header').innerHTML = `
    <div class="week-sticky">
      <div class="week-label">This week</div>
      <div class="week-days">
        ${days.map((d,i) => `<div class="week-day ${ymd(d)===today?'today':''} ${i>=5?'weekend':''}"><span>${labels[i]}</span><strong>${d.getDate()}</strong></div>`).join('')}
      </div>
    </div>`;
  renderHabits(days);
}

function habitDoneOn(id, dateStr) {
  return (state.habitLogs[id] || []).includes(dateStr);
}
async function toggleHabitDay(id, dateStr) {
  const arr = state.habitLogs[id] ? [...state.habitLogs[id]] : [];
  const i = arr.indexOf(dateStr);
  if (i >= 0) arr.splice(i, 1);
  else arr.push(dateStr);
  state.habitLogs[id] = arr;
  const today = ymd(new Date());
  // keep legacy done flag in sync for today
  const sec = state.sections.find(s => s.items.some(it => it.id === id));
  const item = sec && sec.items.find(it => it.id === id);
  if (item) {
    item.done = habitDoneOn(id, today);
    await sb.from('habits').update({ done: item.done }).eq('id', id);
  }
  await saveSettings();
  renderRoutine();
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
          delete state.quadrants[item.id];
          await moveTask(id, item.area || 'business');
          await saveSettings();
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
function renderHabits(days) {
  days = days || weekDates();
  const container = document.getElementById('habits-container');
  container.innerHTML = state.sections.map(sec => {
    const doneCount = sec.items.filter(i => habitDoneOn(i.id, ymd(new Date()))).length;
    return `
      <div class="habit-section" data-section-id="${sec.id}">
        <div class="habit-section-header">
          <div class="habit-section-title">${escapeHtml(sec.title)} <span class="habit-progress">${doneCount}/${sec.items.length} today</span></div>
          <div class="habit-section-actions">
            <button class="item-btn" data-action="add-item">+</button>
            <button class="item-btn" data-action="rename-section">✎</button>
            <button class="item-btn" data-action="delete-section">×</button>
          </div>
        </div>
        <ul class="habit-list">
          ${sec.items.map(h => `
            <li class="habit-item" data-id="${h.id}">
              <div class="habit-text">${escapeHtml(h.text)}</div>
              <div class="habit-bubbles">
                ${days.map((d,i) => {
                  const ds = ymd(d);
                  const on = habitDoneOn(h.id, ds);
                  return `<button class="bubble ${on?'on':''} ${i>=5?'weekend':''}" data-date="${ds}" title="${ds}"></button>`;
                }).join('')}
              </div>
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
        await sb.from('habits').insert({ id, section_id: secId, user_id: state.user.id, text, done: false, order: sec.items.length });
        renderRoutine();
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
        await sb.from('habit_sections').update({ title: text }).eq('id', secId);
        renderRoutine();
      });
    });
  });
  container.querySelectorAll('[data-action="delete-section"]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const secId = btn.closest('.habit-section').dataset.sectionId;
      if (!confirm('Delete this entire section?')) return;
      state.sections = state.sections.filter(s => s.id !== secId);
      await sb.from('habit_sections').delete().eq('id', secId);
      renderRoutine();
    });
  });

  container.querySelectorAll('.bubble').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.closest('.habit-item').dataset.id;
      toggleHabitDay(id, btn.dataset.date);
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
        await sb.from('habits').update({ text }).eq('id', id);
        renderRoutine();
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
      await sb.from('habits').delete().eq('id', id);
      renderRoutine();
    });
  });
}

document.getElementById('add-section-btn').addEventListener('click', () => {
  openPrompt('New section name', '', async (text) => {
    if (!text) return;
    const id = uid();
    state.sections.push({ id, title: text, items: [] });
    await sb.from('habit_sections').insert({ id, user_id: state.user.id, title: text, order: state.sections.length });
    renderRoutine();
  });
});
document.getElementById('reset-habits').addEventListener('click', async () => {
  if (!confirm("Clear this week’s bubbles?")) return;
  const days = weekDates().map(ymd);
  Object.keys(state.habitLogs).forEach(id => {
    state.habitLogs[id] = (state.habitLogs[id] || []).filter(d => !days.includes(d));
  });
  state.sections.forEach(sec => sec.items.forEach(i => i.done = false));
  if (state.user) {
    await sb.from('habits').update({ done: false }).eq('user_id', state.user.id);
  }
  await saveSettings();
  renderRoutine();
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
let selectedMemberId = null;

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
        const loopItem = {
          id: uid(),
          text: task.text,
          timing: 'This week',
          created: Date.now()
        };
        member.open_loops = member.open_loops || [];
        member.open_loops.unshift(loopItem);
        member.updated_at = Date.now();
        await saveTeamMember(member);
        // Remove from configure after delegate
        if (delegateContext.area === 'business') {
          state.business = state.business.filter(t => t.id !== task.id);
        } else {
          state.personal = state.personal.filter(t => t.id !== task.id);
        }
        await deleteTask(task.id);
        renderConfigure();
        selectedMemberId = member.id;
        renderTeam();
        showTab('team');
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
  await sb.from('team_members').upsert({
    id: m.id,
    user_id: state.user.id,
    name: m.name,
    role: m.role || '',
    workload: m.workload || 'normal',
    last_checkin_date: m.last_checkin_date || '',
    last_checkin_notes: m.last_checkin_notes || '',
    highest_focus: m.highest_focus || null,
    priorities: m.priorities || [],
    open_loops: m.open_loops || [],
    completed: m.completed || [],
    updated_at: m.updated_at || Date.now()
  });
}

function getSelectedMember() {
  if (!selectedMemberId && state.team.length) selectedMemberId = state.team[0].id;
  return state.team.find(m => m.id === selectedMemberId) || state.team[0];
}

function renderTeam() {
  const container = document.getElementById('team-container');
  if (!state.team.length) {
    container.innerHTML = '<p class="empty-state">No team members yet.</p>';
    return;
  }
  const member = getSelectedMember();
  if (!member) return;

  const tabs = state.team.map(m =>
    `<button class="team-tab ${m.id === member.id ? 'active' : ''}" data-id="${m.id}">${escapeHtml(m.name)}</button>`
  ).join('');

  const hf = member.highest_focus;
  const priorities = member.priorities || [];
  const loops = member.open_loops || [];
  const completed = member.completed || [];
  const monthKey = new Date().toISOString().slice(0, 7); // YYYY-MM
  const completedThisMonth = completed.filter(c => (c.completed_at || '').startsWith(monthKey) || (c.date || '').startsWith(monthKey));
  // Group previous months
  const prevMonths = {};
  completed.forEach(c => {
    const d = (c.completed_at || c.date || '').slice(0, 7);
    if (d && d !== monthKey) {
      if (!prevMonths[d]) prevMonths[d] = [];
      prevMonths[d].push(c);
    }
  });
  const prevMonthKeys = Object.keys(prevMonths).sort().reverse();

  container.innerHTML = `
    <div class="team-tabs-row">
      <div class="team-tabs">${tabs}</div>
      <div class="team-workload-top" data-member="${member.id}">
        <button class="wl-btn ${member.workload==='light'?'active':''}" data-wl="light">Light</button>
        <button class="wl-btn ${member.workload==='normal'?'active':''}" data-wl="normal">Normal</button>
        <button class="wl-btn ${member.workload==='heavy'?'active':''}" data-wl="heavy">Heavy</button>
      </div>
    </div>

    <div class="team-section">
      <div class="team-section-label">Role</div>
      <textarea class="team-role-input" data-field="role" rows="2" placeholder="What do they own?">${escapeHtml(member.role || '')}</textarea>
    </div>

    <div class="team-section highest-focus-section">
      <div class="team-section-label">Highest Focus</div>
      ${hf ? `
        <div class="hf-card" data-id="${hf.id}">
          <input class="hf-text" value="${escapeHtml(hf.text || '')}" placeholder="The #1 thing">
          <div class="hf-meta">
            <select class="hf-priority">
              <option value="high" ${hf.priority==='high'?'selected':''}>High</option>
              <option value="medium" ${hf.priority==='medium'?'selected':''}>Medium</option>
              <option value="low" ${hf.priority==='low'?'selected':''}>Low</option>
            </select>
            <select class="hf-status">
              <option value="active" ${hf.status==='active'?'selected':''}>Active</option>
              <option value="waiting" ${hf.status==='waiting'?'selected':''}>Waiting</option>
              <option value="blocked" ${hf.status==='blocked'?'selected':''}>Blocked</option>
            </select>
            <input class="hf-target" value="${escapeHtml(hf.target || '')}" placeholder="Target date">
          </div>
          <input class="hf-why" value="${escapeHtml(hf.why || '')}" placeholder="Why this matters (optional)">
          <div class="hf-actions">
            <button class="btn ghost small" data-action="complete-hf">Complete</button>
            <button class="btn ghost small" data-action="clear-hf">Clear</button>
          </div>
        </div>
      ` : `
        <p class="empty-inline">No highest focus set. Promote something from Open Loops or Priorities.</p>
      `}
    </div>

    <div class="team-section">
      <div class="team-section-label">Priorities</div>
      <ul class="team-list" id="priorities-list">
        ${priorities.map(p => `
          <li class="team-list-item" data-id="${p.id}">
            <span class="item-main">${escapeHtml(p.text)}</span>
            <span class="item-side">${escapeHtml(p.timing || p.target || '')}</span>
            <button class="item-btn" data-action="to-hf" title="Make Highest Focus">↑</button>
            <button class="item-btn" data-action="complete-pri">✓</button>
            <button class="item-btn" data-action="del-pri">×</button>
          </li>
        `).join('') || '<li class="empty-inline">No priorities yet</li>'}
      </ul>
    </div>

    <div class="team-section">
      <div class="team-section-label-row">
        <div class="team-section-label">Open Loops</div>
        <button class="btn ghost small" id="add-open-loop">+ Add</button>
      </div>
      <ul class="team-list" id="open-loops-list">
        ${loops.map(l => `
          <li class="team-list-item" data-id="${l.id}">
            <span class="item-main">${escapeHtml(l.text)}</span>
            <select class="timing-select" data-action="timing">
              <option value="This week" ${l.timing==='This week'?'selected':''}>This week</option>
              <option value="Next week" ${l.timing==='Next week'?'selected':''}>Next week</option>
              <option value="Ongoing" ${l.timing==='Ongoing'?'selected':''}>Ongoing</option>
              <option value="Waiting" ${l.timing==='Waiting'?'selected':''}>Waiting</option>
            </select>
            <button class="btn ghost small" data-action="promote">Promote</button>
            <button class="item-btn" data-action="complete-loop">✓</button>
            <button class="item-btn" data-action="del-loop">×</button>
          </li>
        `).join('') || '<li class="empty-inline">Nothing in open loops. Delegate from Configure or add manually.</li>'}
      </ul>
    </div>

    <div class="team-section">
      <div class="team-section-label">Last Check-in</div>
      <input class="team-checkin-date" data-field="last_checkin_date" value="${escapeHtml(member.last_checkin_date || '')}" placeholder="Date (e.g. Aug 18)">
      <textarea class="team-checkin-notes" data-field="last_checkin_notes" rows="3" placeholder="2–4 bullets from the last real conversation">${escapeHtml(member.last_checkin_notes || '')}</textarea>
    </div>

    <div class="team-section">
      <div class="team-section-label">Completed this month</div>
      <ul class="team-list completed-list">
        ${completedThisMonth.map(c => `
          <li class="team-list-item done">
            <span class="item-main">✓ ${escapeHtml(c.text)}</span>
            <span class="item-side">${escapeHtml((c.completed_at || c.date || '').slice(0, 10))}</span>
          </li>
        `).join('') || '<li class="empty-inline">Nothing completed this month yet</li>'}
      </ul>
    </div>

    <div class="team-section">
      <div class="team-section-label">Previous months</div>
      ${prevMonthKeys.length ? prevMonthKeys.map(mk => `
        <details class="prev-month">
          <summary>${mk}</summary>
          <ul class="team-list completed-list">
            ${prevMonths[mk].map(c => `
              <li class="team-list-item done">
                <span class="item-main">✓ ${escapeHtml(c.text)}</span>
                <span class="item-side">${escapeHtml((c.completed_at || c.date || '').slice(0, 10))}</span>
              </li>
            `).join('')}
          </ul>
        </details>
      `).join('') : '<p class="empty-inline">No previous months yet</p>'}
    </div>
  `;

  // Tab switching
  container.querySelectorAll('.team-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedMemberId = btn.dataset.id;
      renderTeam();
    });
  });

  // Workload
  container.querySelectorAll('.wl-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      member.workload = btn.dataset.wl;
      member.updated_at = Date.now();
      await saveTeamMember(member);
      renderTeam();
    });
  });

  // Role + check-in save on blur
  container.querySelectorAll('[data-field]').forEach(el => {
    el.addEventListener('blur', async () => {
      member[el.dataset.field] = el.value;
      member.updated_at = Date.now();
      await saveTeamMember(member);
    });
  });

  // Highest focus editors
  if (hf) {
    const card = container.querySelector('.hf-card');
    const saveHf = async () => {
      member.highest_focus = {
        ...hf,
        text: card.querySelector('.hf-text').value,
        priority: card.querySelector('.hf-priority').value,
        status: card.querySelector('.hf-status').value,
        target: card.querySelector('.hf-target').value,
        why: card.querySelector('.hf-why').value
      };
      member.updated_at = Date.now();
      await saveTeamMember(member);
    };
    card.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('change', saveHf);
      el.addEventListener('blur', saveHf);
    });
    card.querySelector('[data-action="complete-hf"]').addEventListener('click', async () => {
      const done = { ...member.highest_focus, completed_at: new Date().toISOString() };
      member.completed = member.completed || [];
      member.completed.unshift(done);
      member.highest_focus = null;
      member.updated_at = Date.now();
      await saveTeamMember(member);
      renderTeam();
    });
    card.querySelector('[data-action="clear-hf"]').addEventListener('click', async () => {
      member.highest_focus = null;
      member.updated_at = Date.now();
      await saveTeamMember(member);
      renderTeam();
    });
  }

  // Priorities actions
  container.querySelectorAll('#priorities-list [data-action]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.closest('[data-id]').dataset.id;
      const idx = member.priorities.findIndex(p => p.id === id);
      if (idx < 0) return;
      const item = member.priorities[idx];
      if (btn.dataset.action === 'to-hf') {
        if (member.highest_focus) {
          member.priorities.push(member.highest_focus);
        }
        member.highest_focus = { ...item, priority: item.priority || 'high', status: 'active' };
        member.priorities.splice(idx, 1);
      } else if (btn.dataset.action === 'complete-pri') {
        member.completed.unshift({ ...item, completed_at: new Date().toISOString() });
        member.priorities.splice(idx, 1);
      } else if (btn.dataset.action === 'del-pri') {
        member.priorities.splice(idx, 1);
      }
      member.updated_at = Date.now();
      await saveTeamMember(member);
      renderTeam();
    });
  });

  // Open loops
  const addBtn = container.querySelector('#add-open-loop');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      openPrompt('Add open loop', '', async (text) => {
        if (!text) return;
        member.open_loops.unshift({ id: uid(), text, timing: 'This week', created: Date.now() });
        member.updated_at = Date.now();
        await saveTeamMember(member);
        renderTeam();
      });
    });
  }
  container.querySelectorAll('#open-loops-list [data-action]').forEach(el => {
    const row = el.closest('[data-id]');
    if (!row) return;
    const id = row.dataset.id;
    const idx = member.open_loops.findIndex(l => l.id === id);
    if (idx < 0) return;
    const item = member.open_loops[idx];

    if (el.dataset.action === 'timing') {
      el.addEventListener('change', async () => {
        item.timing = el.value;
        member.updated_at = Date.now();
        await saveTeamMember(member);
      });
    } else {
      el.addEventListener('click', async () => {
        if (el.dataset.action === 'promote') {
          // simple choice via confirm for now: OK = Highest Focus, Cancel path uses priorities... use prompt-like
          const toFocus = confirm('OK = Make Highest Focus\\nCancel = Move to Priorities');
          if (toFocus) {
            if (member.highest_focus) member.priorities.unshift(member.highest_focus);
            member.highest_focus = { ...item, priority: 'high', status: 'active', target: '', why: '' };
          } else {
            member.priorities.unshift({ ...item });
          }
          member.open_loops.splice(idx, 1);
        } else if (el.dataset.action === 'complete-loop') {
          member.completed.unshift({ ...item, completed_at: new Date().toISOString() });
          member.open_loops.splice(idx, 1);
        } else if (el.dataset.action === 'del-loop') {
          member.open_loops.splice(idx, 1);
        }
        member.updated_at = Date.now();
        await saveTeamMember(member);
        renderTeam();
      });
    }
  });
}

// ---------- Init ----------
applyTheme();
initAuth();
