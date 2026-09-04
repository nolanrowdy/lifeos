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

const DEFAULT_AFFIRMATIONS = [
  'I am a world class leader.',
  'I am a Decamillionaire.',
  'I own 4 homes, one for each season.',
  'I have 5 firm locations in Bend, Boise, Costa Mesa, San Antonio, and Honolulu.',
  'Each firm has a team of advisors, a tax professional, a hospitality manager, an office manager, a PHA health coach, and a full service coffee and cocktail bar.',
  'My best friends work with me, not for me.',
  'We are on a mission to provide, serve, labor, and be dual-purposed in all things.',
  'We recover quickly in purposeful vacations and take care of our bodies so we can better help others take care of and upgrade their lives.',
  'We are kingdom focused, dedicated to see His people be fruitful and multiply and live in Book of Acts, organic communities.',
  'The better in shape we are, the more energy we have to give others.',
  'The more money we have, the more we have to distribute to those in need and those called to bring heaven to earth.'
];

const DEFAULT_VISION = {
  antiVision: `If nothing major changes, five years from now an average Tuesday looks like this: I wake up groggy and fifty pounds overweight. We still do not own a home; credit never recovered, so we are not even in a nice rental. The same money pressure, rejection, and quiet sense of inadequacy still sit on my shoulders — the burden of providing both money and vision never lifts. Declan is eight. He has already learned to ask, “Are you happy, Dad?” He watches movies and plays video games more than he seeks activities with me, and he spends more time with friends than with his father. My own father is still carrying too much stress; a heart attack takes him before I ever get him to Italy. Hilary and I were too stressed and strained to have another child, and a quiet resentment lives between us because of it. Presence was partial for too long. The years that mattered most slipped by while attention stayed split, and the deeper cost is a life that stayed smaller than it was meant to be — and a son who felt it.`,
  identity: '',
  purpose: `Dual-purposed in all things. Provide (money, essence, foresight, service). Live in community. Stay healthy and wealthy so I can help more people. Be fruitful and multiply. Laboring apostle — self-supporting through business while planting and equipping.`,
  coreFocus: '',
  values: [
    { name: 'No Other Ledger', law: 'I refuse every scoreboard that does not answer to the Father.', why: 'If it needs a rival, a slight, or a ranking to stay alive, the motive is already dirty. Ambition is allowed. Stained ambition is not. You will not use a brother’s name as a rung. You will not let the gold-ring client rewrite the poor man’s dignity. You work hard. You do not let the world’s court set the why.' },
    { name: 'Unrepaid Cost', law: 'I keep room for what cannot pay me back, and I pay it anyway.', why: 'Not efficient charity. Presence that costs: time, money, attention, reputation that will not return as AUM, referral, or applause. If every investment must clear a payback, you have accepted the world’s measure. If it never costs, it is leftovers.' },
    { name: '', law: '', why: '' },
    { name: '', law: '', why: '' },
    { name: '', law: '', why: '' }
  ],
  scoreboard: [
    { label: 'Locations', current: '1', target: '5', page: 'aim' },
    { label: 'Households Served', current: '0', target: '10', page: 'aim' },
    { label: 'OneAE Production', current: '', target: '$25M', page: 'fuel' },
    { label: 'Credit score', current: '', target: '750', page: 'fuel' },
    { label: 'Homes', current: '0', target: '4', page: 'fuel' }
  ],
  tenYear: '',
  threeYear: '',
  yearAim: `$25M OneAE / Advisors Excel production by next December.\n~$2M in commissions.\n$25K/month residual AUM fee.\nCredit score to 750.\nApply for a home for Hilary and me.`,
  rock: `$6M OneAE production to finish the year.\n~$400K commissions.\nDrive this through the 4 educational events already scheduled.`,
  rocks: ['$6M OneAE production to finish the year (~$400K commissions) via the 4 educational events.', '', '', '', ''],
  monthProject: '',
  weekLevers: '',
  affirmations: DEFAULT_AFFIRMATIONS.slice(),
  dailyLever: { date: '', text: '', done: false },
  toc: {},
  futureTeam: []
};

let state = {
  user: null,
  captures: [], business: [], personal: [], active: [], doneToday: [],
  sections: JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
  team: [],
  vision: JSON.parse(JSON.stringify(DEFAULT_VISION)),
  quadrants: {},
  fires: [],
  habitLogs: {},
  configureView: 'business',
  visionPill: 'aim',
  teamLane: 'current',
  futureSelectedId: null,
  tocId: 'wealth',
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

  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && state.user) {
      await loadAllData();
      renderCapture();
      renderConfigure();
      renderControl();
    }
  });
  window.addEventListener('focus', async () => {
    if (state.user) {
      await loadAllData();
      renderCapture();
      renderConfigure();
      renderControl();
    }
  });
  setInterval(async () => {
    if (document.visibilityState !== 'visible' || !state.user) return;
    await loadAllData();
    renderCapture();
    renderConfigure();
    renderControl();
  }, 20000);
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
    const created = typeof t.created_at === 'number' ? t.created_at : Date.parse(t.created_at) || 0;
    const item = { id: t.id, text: t.text, created, completedAt: t.completed_at, area: t.area };
    if (t.area === 'capture') state.captures.push(item);
    else if (t.area === 'business') state.business.push(item);
    else if (t.area === 'personal') state.personal.push(item);
    else if (t.area === 'active') state.active.push(item);
    else if (t.area === 'done') state.doneToday.push(item);
  });
  const byNew = (a, b) => (Number(b.created) || 0) - (Number(a.created) || 0);
  state.captures.sort(byNew);
  state.business.sort(byNew);
  state.personal.sort(byNew);
  state.active.sort(byNew);
  state.doneToday.sort(byNew);
  cacheTasksLocal();
  if (!(tasks || []).length) setSyncNote('Logged in, but no tasks in the cloud yet.');
  else setSyncNote('');

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
        if (parsed.vision) state.vision = normalizeVision(parsed.vision);
        if (parsed.quadrants) state.quadrants = migrateQuadrants(parsed.quadrants);
        if (parsed.habitLogs) state.habitLogs = parsed.habitLogs;
        if (parsed.fires) state.fires = parsed.fires;
        else if (parsed.vision && parsed.vision.fires) state.fires = parsed.vision.fires;
      }
      return;
    }
    if (data.vision) state.vision = normalizeVision(data.vision);
    if (data.quadrants) state.quadrants = migrateQuadrants(data.quadrants);
    if (data.habit_logs) state.habitLogs = data.habit_logs;
    state.fires = Array.isArray(data.vision && data.vision.fires) ? data.vision.fires : (state.vision.fires || []);
  } catch (e) {
    const local = localStorage.getItem('lifeos-settings');
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed.vision) state.vision = normalizeVision(parsed.vision);
      if (parsed.quadrants) state.quadrants = migrateQuadrants(parsed.quadrants);
      if (parsed.habitLogs) state.habitLogs = parsed.habitLogs;
      if (parsed.fires) state.fires = parsed.fires;
    }
  }
}

async function saveSettings() {
  state.vision.fires = state.fires || [];
  const payload = {
    vision: state.vision,
    quadrants: state.quadrants,
    habitLogs: state.habitLogs,
    fires: state.fires
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
function taskCacheKey() {
  return state.user ? `lifeos-tasks-${state.user.id}` : 'lifeos-tasks-anon';
}
function cacheTasksLocal() {
  localStorage.setItem(taskCacheKey(), JSON.stringify({
    captures: state.captures,
    business: state.business,
    personal: state.personal,
    active: state.active,
    doneToday: state.doneToday
  }));
}
function setSyncNote(msg) {
  let el = document.getElementById('sync-note');
  if (!el) {
    el = document.createElement('p');
    el.id = 'sync-note';
    el.className = 'auth-note';
    const cap = document.querySelector('#tab-capture .panel-header');
    if (cap) cap.appendChild(el);
  }
  el.textContent = msg || '';
}

async function saveTask(item, area) {
  cacheTasksLocal();
  if (!state.user) {
    setSyncNote('Not logged in — this task is only on this device.');
    return;
  }
  const row = {
    id: item.id,
    user_id: state.user.id,
    text: item.text,
    area,
    created_at: item.created || Date.now(),
    completed_at: item.completedAt || null,
    order: 0
  };
  let { error } = await sb.from('tasks').upsert(row);
  if (error && /created_at|invalid input|timestamp/i.test(error.message || '')) {
    const retry = { ...row, created_at: new Date(Number(row.created_at) || Date.now()).toISOString() };
    if (retry.completed_at) retry.completed_at = new Date(Number(retry.completed_at)).toISOString();
    ({ error } = await sb.from('tasks').upsert(retry));
  }
  if (error) {
    console.error('saveTask', error);
    setSyncNote('Cloud save failed: ' + error.message);
  } else {
    setSyncNote('');
  }
}
async function deleteTask(id) {
  cacheTasksLocal();
  if (!state.user) return;
  const { error } = await sb.from('tasks').delete().eq('id', id);
  if (error) setSyncNote('Delete failed: ' + error.message);
}
async function moveTask(id, newArea, extra = {}) {
  cacheTasksLocal();
  if (!state.user) return;
  const { error } = await sb.from('tasks').update({ area: newArea, ...extra }).eq('id', id);
  if (error) setSyncNote('Move failed: ' + error.message);
}

function findTask(id) {
  const bags = [
    ['capture', state.captures],
    ['business', state.business],
    ['personal', state.personal],
    ['active', state.active],
    ['done', state.doneToday]
  ];
  for (const [area, bag] of bags) {
    const t = bag.find(x => x.id === id);
    if (t) return { task: t, area: t.area || area };
  }
  return null;
}

async function renameTask(id, text) {
  const found = findTask(id);
  if (!found || !text) return;
  found.task.text = text;
  await saveTask(found.task, found.area);
}

function bindTaskEdit(root) {
  if (!root) return;
  root.querySelectorAll('.item-text').forEach(el => {
    el.addEventListener('dblclick', e => {
      e.stopPropagation();
      e.preventDefault();
      const row = el.closest('[data-id]');
      if (!row || el.querySelector('input.inline-edit')) return;
      const found = findTask(row.dataset.id);
      if (!found) return;
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'inline-edit';
      input.value = found.task.text;
      el.innerHTML = '';
      el.appendChild(input);
      input.focus();
      input.select();
      const save = async () => {
        const next = input.value.trim();
        if (next) await renameTask(row.dataset.id, next);
        if (document.getElementById('tab-capture')?.classList.contains('active')) renderCapture();
        if (document.getElementById('tab-configure')?.classList.contains('active')) {
          renderConfigure();
          if (overlayCtx) openOverlay(overlayCtx.area, overlayCtx.q);
        }
        if (document.getElementById('tab-control')?.classList.contains('active')) renderControl();
      };
      input.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') { ev.preventDefault(); save(); }
        if (ev.key === 'Escape') {
          if (document.getElementById('tab-capture')?.classList.contains('active')) renderCapture();
          else if (document.getElementById('tab-configure')?.classList.contains('active')) {
            renderConfigure();
            if (overlayCtx) openOverlay(overlayCtx.area, overlayCtx.q);
          } else renderControl();
        }
      });
      input.addEventListener('blur', save);
    });
  });
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

function normTask(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function allTaskItems() {
  const out = [];
  (state.captures || []).forEach(t => out.push({ ...t, where: 'Capture' }));
  (state.business || []).forEach(t => out.push({ ...t, where: `Business · ${qOf(t.id) || 'unsorted'}` }));
  (state.personal || []).forEach(t => out.push({ ...t, where: `Personal · ${qOf(t.id) || 'unsorted'}` }));
  (state.active || []).forEach(t => out.push({ ...t, where: 'Control' }));
  (state.doneToday || []).forEach(t => out.push({ ...t, where: 'Done today' }));
  return out;
}
function findDuplicates(text) {
  const n = normTask(text);
  if (n.length < 3) return [];
  const words = n.split(' ').filter(w => w.length > 2);
  return allTaskItems().filter(t => {
    const m = normTask(t.text);
    if (!m) return false;
    if (m === n || m.includes(n) || n.includes(m)) return true;
    if (!words.length) return false;
    const hit = words.filter(w => m.includes(w)).length;
    return hit >= Math.min(2, words.length) && hit / words.length >= 0.6;
  }).slice(0, 5);
}

let pendingCaptureText = '';
function hideDupBanner() {
  const el = document.getElementById('dup-banner');
  if (el) { el.classList.add('hidden'); el.innerHTML = ''; }
  pendingCaptureText = '';
}
function showDupBanner(text, dups) {
  pendingCaptureText = text;
  const el = document.getElementById('dup-banner');
  if (!el) return;
  el.classList.remove('hidden');
  el.innerHTML = `<p>Looks like this already exists.</p>
    ${dups.map(d => `<div class="dup-row">${escapeHtml(d.text)} <span class="item-meta">${escapeHtml(d.where)}</span></div>`).join('')}
    <div class="capture-actions">
      <button class="btn primary" id="dup-add">Add anyway</button>
      <button class="btn ghost" id="dup-cancel">Cancel</button>
    </div>`;
  document.getElementById('dup-add').addEventListener('click', () => actuallyAddCapture(pendingCaptureText));
  document.getElementById('dup-cancel').addEventListener('click', hideDupBanner);
}

async function actuallyAddCapture(text) {
  hideDupBanner();
  const item = { id: uid(), text, created: Date.now() };
  state.captures.unshift(item);
  captureInput.value = '';
  await saveTask(item, 'capture');
  renderCapture();
  captureInput.focus();
}

async function addCapture() {
  const text = captureInput.value.trim();
  if (!text) return;
  const dups = findDuplicates(text);
  if (dups.length) { showDupBanner(text, dups); return; }
  await actuallyAddCapture(text);
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
        <button class="item-btn" data-action="done" title="Complete">✓</button>
        <button class="item-btn" data-action="to-biz" title="Business">B</button>
        <button class="item-btn" data-action="to-per" title="Personal">P</button>
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
      } else if (btn.dataset.action === 'done') {
        await completeTask('capture', id);
      } else if (btn.dataset.action === 'to-biz') {
        await fileCapture(id, 'business');
      } else if (btn.dataset.action === 'to-per') {
        await fileCapture(id, 'personal');
      }
    });
  });
  bindTaskEdit(list);
}

async function completeTask(area, id) {
  let item = null;
  if (area === 'capture') {
    const idx = state.captures.findIndex(t => t.id === id);
    if (idx === -1) return;
    [item] = state.captures.splice(idx, 1);
    item.area = 'capture';
  } else {
    const arr = area === 'business' ? state.business : state.personal;
    const idx = arr.findIndex(t => t.id === id);
    if (idx === -1) return;
    [item] = arr.splice(idx, 1);
    item.area = area;
  }
  item.completedAt = Date.now();
  delete state.quadrants[id];
  await clearFire(id);
  state.doneToday.unshift(item);
  await moveTask(id, 'done', { completed_at: item.completedAt });
  await saveSettings();
  renderCapture();
  renderConfigure();
  renderControl();
  if (overlayCtx) openOverlay(overlayCtx.area, overlayCtx.q);
}

async function fileCapture(id, choice) {
  const item = state.captures.find(c => c.id === id);
  if (!item) return;
  const target = choice === 'business' ? state.business : state.personal;
  target.unshift(item);
  state.captures = state.captures.filter(c => c.id !== id);
  await moveTask(item.id, choice);
  renderCapture();
  renderConfigure();
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
  if (q !== 'now') await clearFire(id);
  await saveSettings();
}

function isFire(id) {
  return (state.fires || []).includes(id);
}
async function toggleFire(id) {
  state.fires = state.fires || [];
  if (isFire(id)) {
    state.fires = state.fires.filter(x => x !== id);
  } else {
    state.fires = [id, ...state.fires.filter(x => x !== id)].slice(0, 5);
  }
  await saveSettings();
}
async function clearFire(id) {
  if (!state.fires || !state.fires.length) return;
  const next = state.fires.filter(x => x !== id);
  if (next.length === state.fires.length) return;
  state.fires = next;
  await saveSettings();
}

function itemsIn(area, q) {
  const arr = area === 'business' ? state.business : state.personal;
  const list = arr.filter(t => {
    const cur = qOf(t.id);
    if (q === 'unsorted') return !cur || cur === 'unsorted';
    return cur === q;
  });
  if (q !== 'now') return list;
  const fires = state.fires || [];
  return list.sort((a, b) => {
    const ai = fires.indexOf(a.id);
    const bi = fires.indexOf(b.id);
    if (ai === -1 && bi === -1) return (Number(b.created) || 0) - (Number(a.created) || 0);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

function quadCardHtml(item, area, q) {
  const inDelegate = q === 'delegate';
  const inElim = q === 'eliminate';
  const colorBtns = q === 'unsorted'
    ? `<button class="item-btn qbox q-now" data-action="file-now" title="Now"></button>
       <button class="item-btn qbox q-schedule" data-action="file-schedule" title="Schedule"></button>
       <button class="item-btn qbox q-delegate" data-action="file-delegate" title="Delegate"></button>
       <button class="item-btn qbox q-eliminate" data-action="file-eliminate" title="Eliminate"></button>`
    : '';
  const stack = inElim
    ? `<button class="item-btn" data-action="restore" title="Back to Unsorted">←</button>`
    : `${colorBtns}
       ${q === 'now' ? `<button class="item-btn flame ${isFire(item.id)?'on':''}" data-action="fire" title="Fire">🔥</button>` : ''}
       ${q !== 'eliminate' ? `<button class="item-btn" data-action="done" title="Complete">✓</button>` : ''}
       ${inDelegate
        ? `<button class="item-btn" data-action="delegate" title="Delegate">⇄</button>`
        : `<button class="item-btn work pickaxe" data-action="work" title="Work on this">⛏</button>`}
       <button class="item-btn" data-action="capture" title="Back to Capture">←</button>
       <button class="item-btn" data-action="delete" title="Eliminate">×</button>`;
  return `<li class="item compact" data-id="${item.id}" data-area="${area}">
    <button class="info-pin" data-action="info" title="Info">i</button>
    <div class="item-text">${escapeHtml(item.text)}</div>
    <div class="item-stack ${q === 'unsorted' ? 'wide' : ''}">${stack}</div>
  </li>`;
}

function bindCardActions(root) {
  root.querySelectorAll('.item-btn, .info-pin').forEach(btn => {
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
      } else if (btn.dataset.action === 'file-now') {
        await setQuadrant(id, 'now');
        renderConfigure();
        if (overlayCtx) openOverlay(overlayCtx.area, overlayCtx.q);
      } else if (btn.dataset.action === 'file-schedule') {
        await setQuadrant(id, 'schedule');
        renderConfigure();
        if (overlayCtx) openOverlay(overlayCtx.area, overlayCtx.q);
      } else if (btn.dataset.action === 'file-delegate') {
        await setQuadrant(id, 'delegate');
        renderConfigure();
        if (overlayCtx) openOverlay(overlayCtx.area, overlayCtx.q);
      } else if (btn.dataset.action === 'file-eliminate') {
        pendingEliminate = { area, id };
        document.getElementById('confirm-modal').classList.remove('hidden');
      } else if (btn.dataset.action === 'fire') {
        await toggleFire(id);
        renderConfigure();
        if (overlayCtx) openOverlay(overlayCtx.area, overlayCtx.q);
      } else if (btn.dataset.action === 'done') {
        await completeTask(area, id);
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
  const area = state.configureView === 'personal' ? 'personal' : 'business';
  const live = (area === 'business' ? state.business : state.personal).filter(t => qOf(t.id) !== 'eliminate');
  root.innerHTML = `
    <div class="view-toggle" id="cfg-area-toggle">
      <button class="view-btn ${area==='business'?'active':''}" data-area="business">Business</button>
      <button class="view-btn ${area==='personal'?'active':''}" data-area="personal">Personal</button>
      <span class="count-badge">${live.length}</span>
    </div>
    <div class="cfg-area" data-area="${area}">
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
              ? `<div class="black-hole"></div>`
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

  document.getElementById('cfg-area-toggle').addEventListener('click', e => {
    const btn = e.target.closest('.view-btn');
    if (!btn) return;
    state.configureView = btn.dataset.area;
    renderConfigure();
  });

  bindCardActions(root);
  bindTaskEdit(root);
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
  bindTaskEdit(list);
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
  await clearFire(id);
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
  await clearFire(id);
  state.active.unshift(item);
  await moveTask(id, 'active');
  renderConfigure();
  renderControl();
  showTab('control');
}

const TOC_DEFS = [
  { id: 'wealth', name: 'Wealth', purpose: 'Our current wealth management business — Aerodyne. The living company that funds the rest.', ecosystem: 'The engine of TOC. Cash flow, trust, and client relationships that make every other lane possible.', serves: 'Families and professionals who want a first-class, tax-efficient retirement and estate plan.', helps: 'Households we serve, the team we employ, and the giving/kingdom work Wealth makes possible.', constraint: 'This already gets rocks. Protect it.' },
  { id: 'stealth', name: 'Stealth', purpose: 'Not hiding assets — doing tax planning and eventually filing taxes in-house, the right way, so clients stay off the radar by staying compliant.', ecosystem: 'Sits next to Wealth. Requires an OBA listed when we file. “Stay off their radar by doing things right.”', serves: 'Wealth clients who need planning and then clean filing.', helps: 'Clients who want integrity without gimmicks; the firm’s reputation.', constraint: 'No rock until a CPA / EA is on staff and the OBA is listed.' },
  { id: 'health', name: 'Health', purpose: 'PHA and health coaching for clients, eventually a full health business.', ecosystem: 'Makes Wealth clients more durable. Feeds Gym and Campus.', serves: 'Clients who want body and money optimized together.', helps: 'Families who keep their provider healthy enough to lead.', constraint: 'No rock until PHA is running inside Aerodyne for a set number of clients.' },
  { id: 'realty', name: 'Realty', purpose: 'Bring real estate and property management in-house instead of referring it out.', ecosystem: 'Client homes, second homes, future Campus properties. Leah Hodges / Sisters Country PM is the hospitality-grade model.', serves: 'Clients who buy, sell, or own property we currently refer away.', helps: 'Owners who need a home cared for like a retreat.', constraint: 'No rock until a written path with Leah (or equivalent) and referral volume that justifies in-house.' },
  { id: 'contracting', name: 'Contracting', purpose: 'In-house build/remodel capability for client properties and TOC buildings.', ecosystem: 'Realty, Campus, Gym. We stop being only the referrer.', serves: 'Owners who need work done on homes and commercial space.', helps: 'The campus and the families living in what we touch.', constraint: 'Does not get a rock until Wealth + Realty can feed it without a hero story.' },
  { id: 'estate', name: 'Estate', purpose: 'Estate planning as a TOC lane, not a referral afterthought.', ecosystem: 'Wealth, Legal, Stealth. Jack’s law-school path lives here.', serves: 'Families who need documents, legacy, and transfer done well.', helps: 'Spouses and kids who inherit clarity instead of chaos.', constraint: 'No rock until licensed capacity exists (in-house or locked partner).' },
  { id: 'legal', name: 'Legal', purpose: 'Legal support for the firm, clients, and TOC entities.', ecosystem: 'Estate, Realty, Contracting, Stealth entities.', serves: 'The firm and clients who need counsel next to the financial plan.', helps: 'Families who should not face legal work as a scavenger hunt.', constraint: 'No rock until bar/capacity is real — not a brochure.' },
  { id: 'aviation', name: 'Aviation', purpose: 'Planes and eventually charter — the aeronautical theme made physical and dual-purpose.', ecosystem: 'Wealth travel, disaster/help use, hospitality between locations.', serves: 'The firm, clients who need efficient travel, and future charter customers.', helps: 'People we can reach faster in work and in crisis.', constraint: 'No rock until Wealth cash-flow and a real license/path exist.' },
  { id: 'hospitality', name: 'Hospitality', purpose: 'Events, catering, and hosted experiences — Hilary’s lane, with Leah’s yacht/home hospitality standard.', ecosystem: 'Campus, Realty, Gym, Events for the network.', serves: 'Clients and community who gather for dinners, classes, and celebrations.', helps: 'A network that actually meets in person.', constraint: 'No rock until Wealth classes/events have a repeating host rhythm.' },
  { id: 'gym', name: 'Gym', purpose: 'Wellness center / private-club physical optimization for the network.', ecosystem: 'Health, Campus, Hospitality. Elite recovery so we can serve longer.', serves: 'The network who wants a body that matches the wealth plan.', helps: 'Leaders who stop burning out in the name of provision.', constraint: 'No rock until network size and a location thesis exist.' },
  { id: 'bored', name: 'Bored Outdoors', purpose: 'Amateur-adventure product that gets people outside when they’re bored: simple trips, local nature, low-skill “just go.”', ecosystem: 'Health, Gym, Campus, community. Body and belonging, not just portfolios.', serves: 'People in the network (and beyond) who stare at a screen instead of a trail.', helps: 'Families who want a dad/mom who actually goes outside.', constraint: 'No rock until one paragraph of the product and one operator name exist — and Wealth rocks are green.' },
  { id: 'prek', name: 'Pre-K', purpose: 'Early-childhood on campus so families in the network can work, raise kids, and live “fruitful and multiply” in-house.', ecosystem: 'Campus, Health, Hospitality. Family teaching/preschool history.', serves: 'Young families in the network and community.', helps: 'Parents who should not have to choose between vocation and presence.', constraint: 'No rock until Campus is more than a sentence and one operator is named.' },
  { id: 'campus', name: 'Campus', purpose: 'The place, not a company: commercial building(s) where TOC businesses sit together.', ecosystem: 'The physical home of Wealth, Health, Hospitality, Gym, Pre-K, and the rest.', serves: 'The collective — team, clients, kids, gatherings.', helps: 'A community that has a where, not only a website.', constraint: 'Do not shop buildings until Wealth + one other lane can pay rent without a hero story.' }
];

function emptyTocEntry(def) {
  return {
    purpose: def.purpose,
    ecosystem: def.ecosystem,
    involved: '',
    serves: def.serves,
    helps: def.helps,
    constraint: def.constraint
  };
}

function emptyFuturePerson() {
  return {
    id: uid(),
    name: '',
    phone: '',
    email: '',
    status: 'hangar',
    relType: 'partner',
    birthday: '',
    job: '',
    position: '',
    spouse: '',
    kids: '',
    futureRole: '',
    notes: '',
    contacts: [],
    lastMeetingDate: '',
    lastMeetingNotes: '',
    nextMeetingDate: '',
    nextMeetingNotes: ''
  };
}

function pad5(arr, fill) {
  const a = Array.isArray(arr) ? arr.slice(0, 5) : [];
  while (a.length < 5) a.push(typeof fill === 'string' ? fill : (fill ? { ...fill } : ''));
  return a;
}

function normalizeVision(raw) {
  const v = { ...DEFAULT_VISION, ...(raw || {}) };
  v.values = pad5((v.values || []).map(val => {
    if (val && typeof val === 'object') return { name: val.name || '', law: val.law || '', why: val.why || '' };
    const s = String(val || '');
    return { name: s, law: '', why: '' };
  }), { name: '', law: '', why: '' });
  const hasAnyValue = v.values.some(x => x.name || x.law);
  if (!hasAnyValue) v.values = DEFAULT_VISION.values.map(x => ({ ...x }));
  v.rocks = pad5(v.rocks && v.rocks.length ? v.rocks : (v.rock ? [v.rock] : []), '');
  if (!v.coreFocus) v.coreFocus = v.purpose || '';
  if (!Array.isArray(v.affirmations) || !v.affirmations.length) v.affirmations = DEFAULT_AFFIRMATIONS.slice();
  const defaults = DEFAULT_VISION.scoreboard.map(s => ({ ...s }));
  if (!Array.isArray(v.scoreboard) || !v.scoreboard.length || !v.scoreboard.some(s => s.page) || !v.scoreboard.some(s => /Households/i.test(s.label || ''))) {
    v.scoreboard = defaults.map(d => {
      const old = (Array.isArray(v.scoreboard) ? v.scoreboard : []).find(s => (s.label || '').toLowerCase().includes(d.label.split(' ')[0].toLowerCase()));
      return old ? { ...d, current: old.current || d.current, target: old.target || d.target } : d;
    });
  } else {
    v.scoreboard = v.scoreboard.map(s => ({ page: s.page || 'aim', label: s.label || '', current: s.current || '', target: s.target || '' }));
  }
  if (!v.dailyLever) v.dailyLever = { date: '', text: '', done: false };
  const today = ymd(new Date());
  if (v.dailyLever.date !== today) v.dailyLever = { date: today, text: v.dailyLever.text || '', done: false };
  if (!v.toc || typeof v.toc !== 'object') v.toc = {};
  TOC_DEFS.forEach(def => {
    v.toc[def.id] = { ...emptyTocEntry(def), ...(v.toc[def.id] || {}) };
  });
  if (!Array.isArray(v.futureTeam)) v.futureTeam = [];
  return v;
}

function ukVoice() {
  const voices = speechSynthesis.getVoices();
  return voices.find(v => /en-GB/i.test(v.lang) && /male/i.test(v.name))
    || voices.find(v => /en-GB/i.test(v.lang))
    || voices.find(v => /Daniel|UK English/i.test(v.name))
    || voices[0];
}

let speakQueue = [];
function stopSpeak() {
  speechSynthesis.cancel();
  speakQueue = [];
}
function speakCards(texts) {
  stopSpeak();
  speakQueue = texts.filter(Boolean);
  const run = () => {
    if (!speakQueue.length) return;
    const u = new SpeechSynthesisUtterance(speakQueue.shift());
    const voice = ukVoice();
    if (voice) u.voice = voice;
    u.rate = 0.95;
    u.onend = run;
    speechSynthesis.speak(u);
  };
  if (!speechSynthesis.getVoices().length) {
    speechSynthesis.onvoiceschanged = () => run();
  }
  run();
}

let valueEditIndex = 0;
function openValueCard(i) {
  valueEditIndex = i;
  const val = state.vision.values[i] || { name: '', law: '', why: '' };
  document.getElementById('value-modal-title').textContent = val.name || `Value ${i + 1}`;
  document.getElementById('value-name').value = val.name || '';
  document.getElementById('value-law').value = val.law || '';
  document.getElementById('value-why').value = val.why || '';
  document.getElementById('value-modal').classList.remove('hidden');
}
function closeValueCard() {
  document.getElementById('value-modal').classList.add('hidden');
}
document.getElementById('value-close').addEventListener('click', closeValueCard);
document.getElementById('value-save').addEventListener('click', async () => {
  state.vision.values[valueEditIndex] = {
    name: document.getElementById('value-name').value.trim(),
    law: document.getElementById('value-law').value.trim(),
    why: document.getElementById('value-why').value.trim()
  };
  await saveSettings();
  closeValueCard();
  renderVision();
});

function scoreboardBlock(v, page) {
  const rows = (v.scoreboard || []).map((s, i) => ({ ...s, i })).filter(s => (s.page || 'aim') === page);
  if (!rows.length) return '';
  return `<div class="vision-block">
      <label>Scoreboard</label>
      <p class="vision-hint">Current / target. Type the number when it moves.</p>
      <div class="score-grid">${rows.map(s => `
        <div class="score-card">
          <input class="score-label" data-score="label" data-i="${s.i}" value="${escapeHtml(s.label || '')}">
          <div class="score-row">
            <input data-score="current" data-i="${s.i}" placeholder="Now" value="${escapeHtml(s.current || '')}">
            <span>/</span>
            <input data-score="target" data-i="${s.i}" placeholder="Target" value="${escapeHtml(s.target || '')}">
          </div>
        </div>`).join('')}</div>
    </div>`;
}

function renderVision() {
  state.vision = normalizeVision(state.vision);
  const v = state.vision;
  const pill = ['aim', 'fuel', 'toc'].includes(state.visionPill) ? state.visionPill : 'aim';
  const box = document.getElementById('vision-container');

  const aimHtml = `
    <div class="vision-block">
      <label>Identity</label>
      <p class="vision-hint">Present tense. Show this first.</p>
      <textarea data-vf="identity" rows="3" placeholder="I am the kind of man who…">${escapeHtml(v.identity || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>Core Values</label>
      <p class="vision-hint">Five slots. Click a row for the longer why. Empty slots stay empty.</p>
      <div class="slot-list value-list">${v.values.map((val,i) => {
        const title = val.name || val.law || `Value ${i+1}`;
        const filled = val.name || val.law;
        return `<button type="button" class="value-row ${filled?'':'empty'}" data-open-val="${i}">
          <strong>${escapeHtml(val.name || `Value ${i+1}`)}</strong>
          <span>${escapeHtml(val.law || 'Add a one-line law')}</span>
        </button>`;
      }).join('')}</div>
    </div>
    <div class="vision-block">
      <label>Core Focus</label>
      <p class="vision-hint">One sentence. What you do and don’t do.</p>
      <textarea data-vf="coreFocus" rows="3" placeholder="We help X do Y.">${escapeHtml(v.coreFocus || '')}</textarea>
    </div>
    ${scoreboardBlock(v, 'aim')}
    <div class="vision-block">
      <label>10-Year Picture</label>
      <textarea data-vf="tenYear" rows="5" placeholder="What a normal Tuesday looks like when this works.">${escapeHtml(v.tenYear || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>3-Year Picture</label>
      <textarea data-vf="threeYear" rows="4" placeholder="36 months from now.">${escapeHtml(v.threeYear || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>1-Year Aim</label>
      <textarea data-vf="yearAim" rows="5">${escapeHtml(v.yearAim || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>90-Day Rocks</label>
      <p class="vision-hint">Outcomes this quarter. Run 3–5. Empty is better than fake.</p>
      <div class="slot-list">${v.rocks.map((r,i) =>
        `<textarea class="slot-area" data-arr="rocks" data-i="${i}" rows="2" placeholder="Rock ${i+1}">${escapeHtml(r || '')}</textarea>`
      ).join('')}</div>
    </div>
    <div class="vision-block">
      <label>This Month</label>
      <textarea data-vf="monthProject" rows="3" placeholder="One concrete result this month">${escapeHtml(v.monthProject || '')}</textarea>
    </div>`;

  const tocDef = TOC_DEFS.find(d => d.id === state.tocId) || TOC_DEFS[0];
  const toc = v.toc[tocDef.id] || emptyTocEntry(tocDef);
  const tocHtml = `
    <div class="toc-pills">
      ${TOC_DEFS.map(d => `<button class="view-btn ${d.id===tocDef.id?'active':''}" data-toc="${d.id}">${escapeHtml(d.name)}</button>`).join('')}
    </div>
    <div class="vision-block">
      <label>${escapeHtml(tocDef.name)} — Business Purpose</label>
      <textarea data-tocf="purpose" rows="4">${escapeHtml(toc.purpose || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>Connection to TOC and the ecosystem</label>
      <textarea data-tocf="ecosystem" rows="3">${escapeHtml(toc.ecosystem || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>Who could be involved</label>
      <p class="vision-hint">Names from Current or Future Team, plus anyone else.</p>
      <textarea data-tocf="involved" rows="3" placeholder="Leah Hodges, Hilary, Jack…">${escapeHtml(toc.involved || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>Who it serves / ideal client</label>
      <textarea data-tocf="serves" rows="3">${escapeHtml(toc.serves || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>Who it helps</label>
      <p class="vision-hint">Downstream blessing — family, church, team, people you give to.</p>
      <textarea data-tocf="helps" rows="3">${escapeHtml(toc.helps || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>Constraint</label>
      <p class="vision-hint">This does not get a rock or calendar time until…</p>
      <textarea data-tocf="constraint" rows="2">${escapeHtml(toc.constraint || '')}</textarea>
    </div>`;

  const fuelHtml = `
    ${scoreboardBlock(v, 'fuel')}
    <div class="vision-block">
      <div class="fuel-head">
        <label>Affirmations</label>
        <div class="fuel-actions">
          <button class="btn ghost" id="aff-play">Play all</button>
          <button class="btn ghost" id="aff-stop">Stop</button>
          <button class="btn ghost" id="aff-add">Add card</button>
        </div>
      </div>
      <p class="vision-hint">Tap a card to hear it. Play all uses a UK English voice in Chrome.</p>
      <div class="aff-cards">${v.affirmations.map((t,i) => `
        <div class="aff-card" data-i="${i}">
          <textarea data-aff="${i}" rows="3">${escapeHtml(t)}</textarea>
          <div class="aff-row">
            <button class="item-btn" data-speak="${i}">▶</button>
            <button class="item-btn" data-del-aff="${i}">×</button>
          </div>
        </div>`).join('')}</div>
    </div>
    <div class="vision-block">
      <label>Anti-Vision</label>
      <p class="vision-hint">The Tuesday you refuse. Private.</p>
      <textarea data-vf="antiVision" rows="8">${escapeHtml(v.antiVision || '')}</textarea>
    </div>
    <div class="vision-block">
      <label>Daily lever</label>
      <p class="vision-hint">One move that makes a rock more true. Resets at midnight.</p>
      <input id="lever-text" placeholder="Today I advanced [rock] by…" value="${escapeHtml(v.dailyLever.text || '')}">
      <label class="lever-check"><input type="checkbox" id="lever-done" ${v.dailyLever.done ? 'checked' : ''}> Done today</label>
    </div>`;

  box.innerHTML = `
    <div class="view-toggle" id="vision-toggle">
      <button class="view-btn ${pill==='aim'?'active':''}" data-pill="aim">Aim</button>
      <button class="view-btn ${pill==='fuel'?'active':''}" data-pill="fuel">Fuel</button>
      <button class="view-btn ${pill==='toc'?'active':''}" data-pill="toc">TOC</button>
    </div>
    ${pill === 'aim' ? aimHtml : pill === 'fuel' ? fuelHtml : tocHtml}
    <button class="btn primary" id="vision-save">Save Vision</button>
    <p class="auth-note" id="vision-saved" style="display:none">Saved.</p>`;

  document.getElementById('vision-toggle').addEventListener('click', e => {
    const btn = e.target.closest('[data-pill]');
    if (!btn) return;
    harvestVision();
    state.visionPill = btn.dataset.pill;
    renderVision();
  });
  box.querySelectorAll('[data-toc]').forEach(btn => {
    btn.addEventListener('click', () => {
      harvestVision();
      state.tocId = btn.dataset.toc;
      renderVision();
    });
  });
  box.querySelectorAll('[data-tocf]').forEach(el => {
    el.addEventListener('blur', async () => {
      if (!state.vision.toc[state.tocId]) state.vision.toc[state.tocId] = emptyTocEntry(TOC_DEFS.find(d => d.id === state.tocId));
      state.vision.toc[state.tocId][el.dataset.tocf] = el.value;
      await saveSettings();
    });
  });

  box.querySelectorAll('[data-open-val]').forEach(btn => {
    btn.addEventListener('click', () => openValueCard(Number(btn.dataset.openVal)));
  });
  box.querySelectorAll('[data-vf]').forEach(el => {
    el.addEventListener('blur', async () => {
      state.vision[el.dataset.vf] = el.value;
      await saveSettings();
    });
  });
  box.querySelectorAll('[data-arr]').forEach(el => {
    el.addEventListener('blur', async () => {
      state.vision[el.dataset.arr][Number(el.dataset.i)] = el.value;
      await saveSettings();
    });
  });
  box.querySelectorAll('[data-score]').forEach(el => {
    el.addEventListener('blur', async () => {
      state.vision.scoreboard[Number(el.dataset.i)][el.dataset.score] = el.value;
      await saveSettings();
    });
  });

  if (pill === 'fuel') {
    box.querySelectorAll('[data-aff]').forEach(el => {
      el.addEventListener('blur', async () => {
        state.vision.affirmations[Number(el.dataset.aff)] = el.value;
        await saveSettings();
      });
    });
    box.querySelectorAll('[data-speak]').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = state.vision.affirmations[Number(btn.dataset.speak)];
        if (t) speakCards([t]);
      });
    });
    box.querySelectorAll('[data-del-aff]').forEach(btn => {
      btn.addEventListener('click', async () => {
        state.vision.affirmations.splice(Number(btn.dataset.delAff), 1);
        await saveSettings();
        renderVision();
      });
    });
    document.getElementById('aff-play').addEventListener('click', () => speakCards(state.vision.affirmations));
    document.getElementById('aff-stop').addEventListener('click', stopSpeak);
    document.getElementById('aff-add').addEventListener('click', async () => {
      state.vision.affirmations.push('');
      await saveSettings();
      renderVision();
    });
    document.getElementById('lever-text').addEventListener('blur', async () => {
      state.vision.dailyLever.text = document.getElementById('lever-text').value;
      state.vision.dailyLever.date = ymd(new Date());
      await saveSettings();
    });
    document.getElementById('lever-done').addEventListener('change', async e => {
      state.vision.dailyLever.done = e.target.checked;
      state.vision.dailyLever.date = ymd(new Date());
      await saveSettings();
    });
  }

  document.getElementById('vision-save').addEventListener('click', async () => {
    harvestVision();
    await saveSettings();
    const note = document.getElementById('vision-saved');
    note.style.display = 'block';
    setTimeout(() => note.style.display = 'none', 1500);
  });
}

function harvestVision() {
  const box = document.getElementById('vision-container');
  box.querySelectorAll('[data-vf]').forEach(el => { state.vision[el.dataset.vf] = el.value; });
  box.querySelectorAll('[data-arr]').forEach(el => {
    state.vision[el.dataset.arr][Number(el.dataset.i)] = el.value;
  });
  box.querySelectorAll('[data-score]').forEach(el => {
    state.vision.scoreboard[Number(el.dataset.i)][el.dataset.score] = el.value;
  });
  box.querySelectorAll('[data-aff]').forEach(el => {
    state.vision.affirmations[Number(el.dataset.aff)] = el.value;
  });
  const lt = document.getElementById('lever-text');
  if (lt) {
    state.vision.dailyLever.text = lt.value;
    state.vision.dailyLever.done = document.getElementById('lever-done').checked;
    state.vision.dailyLever.date = ymd(new Date());
  }
  box.querySelectorAll('[data-tocf]').forEach(el => {
    if (!state.vision.toc[state.tocId]) state.vision.toc[state.tocId] = {};
    state.vision.toc[state.tocId][el.dataset.tocf] = el.value;
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
    bindTaskEdit(activeList);
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

function bindTeamLane(container) {
  const bar = container.querySelector('#team-lane');
  if (!bar) return;
  bar.addEventListener('click', e => {
    const btn = e.target.closest('[data-lane]');
    if (!btn) return;
    state.teamLane = btn.dataset.lane;
    renderTeam();
  });
}

const FUTURE_STATUSES = [
  { id: 'hangar', label: 'Hangar' },
  { id: 'warming', label: 'Warming up' },
  { id: 'taxiing', label: 'Taxiing' }
];
const REL_TYPES = ['hire', 'partner', 'referral', 'vendor', 'family', 'other'];
const CONTACT_CHANNELS = ['phone', 'text', 'in-person', 'VM', 'email'];

function futureList() {
  if (!state.vision.futureTeam) state.vision.futureTeam = [];
  return state.vision.futureTeam;
}

function getFuturePerson() {
  const list = futureList();
  if (!list.length) return null;
  if (!state.futureSelectedId || !list.find(p => p.id === state.futureSelectedId)) {
    state.futureSelectedId = list[0].id;
  }
  return list.find(p => p.id === state.futureSelectedId) || list[0];
}

function renderFutureTeamHtml() {
  const list = futureList();
  const person = getFuturePerson();
  const tabs = list.map(p =>
    `<button class="team-tab ${person && p.id === person.id ? 'active' : ''}" data-fid="${p.id}">${escapeHtml(p.name || 'Untitled')}</button>`
  ).join('');

  if (!person) {
    return `<div class="team-tabs-row">
      <div class="team-tabs"></div>
      <button class="btn primary small" id="add-future">+ Add person</button>
    </div>
    <p class="empty-state">No future teammates yet. Add someone you’re circling.</p>`;
  }

  const contacts = Array.isArray(person.contacts) ? person.contacts : [];
  const latest = contacts[0];

  return `
    <div class="team-tabs-row">
      <div class="team-tabs">${tabs}</div>
      <button class="btn primary small" id="add-future">+ Add person</button>
    </div>
    <div class="future-status-row">
      ${FUTURE_STATUSES.map(s => `<button class="wl-btn ${person.status===s.id?'active':''}" data-fstatus="${s.id}">${s.label}</button>`).join('')}
      <select data-ff="relType">${REL_TYPES.map(t => `<option value="${t}" ${person.relType===t?'selected':''}>${t}</option>`).join('')}</select>
      <button class="btn ghost small" id="promote-future">Make current</button>
      <button class="btn ghost small" id="del-future">Remove</button>
    </div>

    <div class="future-grid">
      <div class="vision-block">
        <label>Name</label>
        <input data-ff="name" value="${escapeHtml(person.name || '')}" placeholder="Name">
      </div>
      <div class="vision-block">
        <label>Phone</label>
        <input data-ff="phone" value="${escapeHtml(person.phone || '')}" placeholder="Phone">
      </div>
      <div class="vision-block">
        <label>Email</label>
        <input data-ff="email" value="${escapeHtml(person.email || '')}" placeholder="Email">
      </div>
    </div>

    <div class="vision-block">
      <label>Last contact</label>
      <p class="vision-hint">${latest ? `${latest.channel || ''} · ${latest.date || ''} — ${latest.note || ''}` : 'No contacts yet.'}</p>
      <div class="future-contact-add">
        <select id="new-contact-channel">${CONTACT_CHANNELS.map(c => `<option>${c}</option>`).join('')}</select>
        <input id="new-contact-date" type="date">
        <input id="new-contact-note" placeholder="Quick note on the interaction">
        <button class="btn primary small" id="add-contact">Log contact</button>
      </div>
      ${contacts.length > 1 ? `<details class="prev-month"><summary>Earlier contacts (${contacts.length - 1})</summary>
        <ul class="team-list">${contacts.slice(1).map(c => `<li class="team-list-item"><span class="item-main">${escapeHtml(c.channel || '')} — ${escapeHtml(c.note || '')}</span><span class="item-side">${escapeHtml(c.date || '')}</span></li>`).join('')}</ul>
      </details>` : ''}
    </div>

    <div class="future-grid">
      <div class="vision-block"><label>Birthday</label><input data-ff="birthday" type="date" value="${escapeHtml(person.birthday || '')}"></div>
      <div class="vision-block"><label>Current job</label><input data-ff="job" value="${escapeHtml(person.job || '')}"></div>
      <div class="vision-block"><label>Position</label><input data-ff="position" value="${escapeHtml(person.position || '')}"></div>
      <div class="vision-block"><label>Spouse</label><input data-ff="spouse" value="${escapeHtml(person.spouse || '')}"></div>
    </div>
    <div class="vision-block">
      <label>Kids</label>
      <input data-ff="kids" value="${escapeHtml(person.kids || '')}" placeholder="Names, comma separated">
    </div>

    <div class="vision-block">
      <label>Future role</label>
      <input data-ff="futureRole" value="${escapeHtml(person.futureRole || '')}" placeholder="What seat might they sit in?">
    </div>
    <div class="vision-block">
      <label>Notes / ideas about this person</label>
      <textarea data-ff="notes" rows="4" placeholder="Thoughts, fit, caution, dual-purpose…">${escapeHtml(person.notes || '')}</textarea>
    </div>

    <div class="cfg-quads">
      <div class="cfg-quad q-schedule">
        <div class="quad-title"><span>Previous meeting</span></div>
        <div class="future-box">
          <input data-ff="lastMeetingDate" type="date" value="${escapeHtml(person.lastMeetingDate || '')}">
          <textarea data-ff="lastMeetingNotes" rows="6" placeholder="What we discussed">${escapeHtml(person.lastMeetingNotes || '')}</textarea>
        </div>
      </div>
      <div class="cfg-quad q-now">
        <div class="quad-title"><span>Next meeting</span></div>
        <div class="future-box">
          <input data-ff="nextMeetingDate" type="date" value="${escapeHtml(person.nextMeetingDate || '')}">
          <textarea data-ff="nextMeetingNotes" rows="6" placeholder="Strategy for that meeting. Also put the date on your calendar.">${escapeHtml(person.nextMeetingNotes || '')}</textarea>
        </div>
      </div>
    </div>`;
}

function bindFutureTeam(container) {
  const person = getFuturePerson();
  container.querySelectorAll('[data-fid]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.futureSelectedId = btn.dataset.fid;
      renderTeam();
    });
  });
  const addBtn = container.querySelector('#add-future');
  if (addBtn) addBtn.addEventListener('click', async () => {
    const p = emptyFuturePerson();
    p.name = 'New person';
    futureList().push(p);
    state.futureSelectedId = p.id;
    await saveSettings();
    renderTeam();
  });
  if (!person) return;

  container.querySelectorAll('[data-fstatus]').forEach(btn => {
    btn.addEventListener('click', async () => {
      person.status = btn.dataset.fstatus;
      await saveSettings();
      renderTeam();
    });
  });
  container.querySelectorAll('[data-ff]').forEach(el => {
    const ev = el.tagName === 'SELECT' ? 'change' : 'blur';
    el.addEventListener(ev, async () => {
      person[el.dataset.ff] = el.value;
      await saveSettings();
      if (el.dataset.ff === 'name') renderTeam();
    });
  });
  const addContact = container.querySelector('#add-contact');
  if (addContact) addContact.addEventListener('click', async () => {
    const channel = container.querySelector('#new-contact-channel').value;
    const date = container.querySelector('#new-contact-date').value || ymd(new Date());
    const note = container.querySelector('#new-contact-note').value.trim();
    if (!person.contacts) person.contacts = [];
    person.contacts.unshift({ id: uid(), channel, date, note });
    await saveSettings();
    renderTeam();
  });
  const promote = container.querySelector('#promote-future');
  if (promote) promote.addEventListener('click', async () => {
    const m = {
      id: 'tm-' + uid(),
      name: person.name || 'New member',
      role: person.futureRole || '',
      workload: 'normal',
      last_checkin_date: '',
      last_checkin_notes: '',
      highest_focus: null,
      priorities: [],
      open_loops: [],
      completed: [],
      updated_at: Date.now()
    };
    state.team.push(m);
    await saveTeamMember(m);
    selectedMemberId = m.id;
    state.teamLane = 'current';
    await saveSettings();
    renderTeam();
  });
  const del = container.querySelector('#del-future');
  if (del) del.addEventListener('click', async () => {
    if (!confirm('Remove this future teammate from LifeOS?')) return;
    state.vision.futureTeam = futureList().filter(p => p.id !== person.id);
    state.futureSelectedId = state.vision.futureTeam[0] ? state.vision.futureTeam[0].id : null;
    await saveSettings();
    renderTeam();
  });
}

function renderTeam() {
  const container = document.getElementById('team-container');
  if (!container) return;
  const lane = state.teamLane === 'future' ? 'future' : 'current';
  const laneBar = `<div class="view-toggle" id="team-lane">
    <button class="view-btn ${lane==='current'?'active':''}" data-lane="current">Current Team</button>
    <button class="view-btn ${lane==='future'?'active':''}" data-lane="future">Future Team</button>
  </div>`;

  if (lane === 'future') {
    container.innerHTML = laneBar + renderFutureTeamHtml();
    bindTeamLane(container);
    bindFutureTeam(container);
    return;
  }

  if (!state.team.length) {
    container.innerHTML = laneBar + '<p class="empty-state">No team members yet.</p>';
    bindTeamLane(container);
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

  container.innerHTML = laneBar + `
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

  bindTeamLane(container);

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
