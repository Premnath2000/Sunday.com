// LocalStorage helpers
export function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

// Date/time formatting
export function formatRelativeTime(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Task helpers
export function filterTasks(tasks, query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return tasks.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    (t.labels && t.labels.some(l => l.toLowerCase().includes(q)))
  );
}

export function sortByPriority(tasks) {
  const order = { high: 0, medium: 1, low: 2 };
  return [...tasks].sort((a, b) => (order[a.priority] ?? 1) - (order[b.priority] ?? 1));
}

// Filtering
export function applyFilters(tasks, filters) {
  return tasks.filter(t => {
    if (filters.status && t.status !== filters.status) return false;
    if (filters.priority && t.priority !== filters.priority) return false;
    if (filters.assignee && t.assignee !== Number(filters.assignee)) return false;
    return true;
  });
}

// Group tasks by group id
export function groupTasksByGroup(tasks, groups) {
  const map = {};
  groups.forEach(g => { map[g.id] = []; });
  tasks.forEach(t => {
    const gid = t.group || 'sprint-1';
    if (!map[gid]) map[gid] = [];
    map[gid].push(t);
  });
  return map;
}

// Initials from a name
export function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}
