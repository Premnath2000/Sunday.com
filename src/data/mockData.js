export const teamMembers = [
  { id: 1, name: 'Sarah Chen', role: 'Product Lead', avatar: '#3b82f6', status: 'online', email: 'sarah@flowsync.io' },
  { id: 2, name: 'Alex Rivera', role: 'Frontend Dev', avatar: '#8b5cf6', status: 'online', email: 'alex@flowsync.io' },
  { id: 3, name: 'Jordan Park', role: 'Backend Dev', avatar: '#10b981', status: 'away', email: 'jordan@flowsync.io' },
  { id: 4, name: 'Maya Patel', role: 'UI Designer', avatar: '#f59e0b', status: 'online', email: 'maya@flowsync.io' },
  { id: 5, name: 'Liam Foster', role: 'DevOps', avatar: '#ef4444', status: 'offline', email: 'liam@flowsync.io' },
  { id: 6, name: 'Emma Wilson', role: 'QA Engineer', avatar: '#06b6d4', status: 'online', email: 'emma@flowsync.io' },
];

export const initialTasks = [
  { id: 1, title: 'Design system tokens', description: 'Create color palette, typography scale, and spacing system', status: 'done', priority: 'high', assignee: 4, labels: ['design'], dueDate: '2026-05-01', comments: 3 },
  { id: 2, title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions for automated testing and deployment', status: 'done', priority: 'high', assignee: 5, labels: ['devops'], dueDate: '2026-05-01', comments: 5 },
  { id: 3, title: 'User authentication flow', description: 'Implement login, signup, and password reset with Firebase Auth', status: 'review', priority: 'high', assignee: 3, labels: ['backend', 'auth'], dueDate: '2026-05-03', comments: 8 },
  { id: 4, title: 'Dashboard analytics cards', description: 'Build real-time analytics cards with animated counters', status: 'review', priority: 'medium', assignee: 2, labels: ['frontend'], dueDate: '2026-05-04', comments: 2 },
  { id: 5, title: 'Kanban drag & drop', description: 'Implement HTML5 drag and drop for task cards between columns', status: 'progress', priority: 'high', assignee: 2, labels: ['frontend', 'feature'], dueDate: '2026-05-05', comments: 4 },
  { id: 6, title: 'Real-time notifications', description: 'Push notification system using Firebase Cloud Messaging', status: 'progress', priority: 'medium', assignee: 3, labels: ['backend'], dueDate: '2026-05-06', comments: 1 },
  { id: 7, title: 'Team chat integration', description: 'Build real-time messaging with channels and direct messages', status: 'progress', priority: 'high', assignee: 2, labels: ['frontend', 'feature'], dueDate: '2026-05-07', comments: 6 },
  { id: 8, title: 'Mobile responsive layout', description: 'Ensure all pages work on mobile and tablet screens', status: 'todo', priority: 'medium', assignee: 4, labels: ['design', 'frontend'], dueDate: '2026-05-08', comments: 0 },
  { id: 9, title: 'API rate limiting', description: 'Implement rate limiting middleware for all API endpoints', status: 'todo', priority: 'low', assignee: 3, labels: ['backend', 'security'], dueDate: '2026-05-09', comments: 0 },
  { id: 10, title: 'E2E test suite', description: 'Write end-to-end tests for critical user flows', status: 'todo', priority: 'medium', assignee: 6, labels: ['testing'], dueDate: '2026-05-10', comments: 0 },
  { id: 11, title: 'Performance audit', description: 'Run Lighthouse audit and optimize bundle size', status: 'todo', priority: 'low', assignee: 5, labels: ['devops'], dueDate: '2026-05-12', comments: 0 },
  { id: 12, title: 'Onboarding tutorial', description: 'Create interactive onboarding flow for new users', status: 'todo', priority: 'medium', assignee: 4, labels: ['design', 'feature'], dueDate: '2026-05-14', comments: 0 },
];

export const chatChannels = [
  { id: 1, name: 'general', unread: 3, icon: '💬' },
  { id: 2, name: 'design', unread: 0, icon: '🎨' },
  { id: 3, name: 'engineering', unread: 7, icon: '⚙️' },
  { id: 4, name: 'random', unread: 1, icon: '🎲' },
];

export const chatMessages = [
  { id: 1, channel: 1, user: 1, text: 'Hey team! Sprint planning is at 2pm today 🗓️', time: '9:15 AM', reactions: [{ emoji: '👍', count: 4 }] },
  { id: 2, channel: 1, user: 2, text: 'Got it! I\'ll have the Kanban drag & drop PR ready for review by then', time: '9:22 AM', reactions: [{ emoji: '🔥', count: 2 }] },
  { id: 3, channel: 1, user: 4, text: 'I\'ve uploaded the new design mockups to Figma. Check them out!', time: '9:45 AM', reactions: [{ emoji: '😍', count: 3 }, { emoji: '👏', count: 2 }] },
  { id: 4, channel: 1, user: 3, text: 'Auth flow is almost done. Just need to add the password reset endpoint', time: '10:08 AM', reactions: [] },
  { id: 5, channel: 1, user: 5, text: 'CI/CD pipeline is green ✅ All tests passing', time: '10:30 AM', reactions: [{ emoji: '🎉', count: 5 }] },
  { id: 6, channel: 1, user: 6, text: 'Found a bug in the notification system — opening an issue now', time: '10:52 AM', reactions: [] },
  { id: 7, channel: 1, user: 1, text: 'Great progress everyone! Let\'s keep this momentum going 🚀', time: '11:15 AM', reactions: [{ emoji: '💪', count: 4 }, { emoji: '🚀', count: 3 }] },
];

export const activities = [
  { id: 1, user: 2, action: 'moved', target: 'Kanban drag & drop', detail: 'to In Progress', time: '2 min ago', icon: '📋' },
  { id: 2, user: 4, action: 'uploaded', target: 'Design mockups v3', detail: 'to Figma', time: '15 min ago', icon: '🎨' },
  { id: 3, user: 3, action: 'completed', target: 'User authentication flow', detail: 'PR #47 merged', time: '32 min ago', icon: '✅' },
  { id: 4, user: 5, action: 'deployed', target: 'v0.4.2', detail: 'to staging', time: '1 hr ago', icon: '🚀' },
  { id: 5, user: 6, action: 'created', target: 'Bug: Notification delay', detail: 'Issue #23', time: '1 hr ago', icon: '🐛' },
  { id: 6, user: 1, action: 'commented on', target: 'Sprint backlog', detail: '3 new comments', time: '2 hrs ago', icon: '💬' },
];

export const projects = [
  { id: 1, name: 'FlowSync Web App', progress: 68, tasks: 24, completed: 16, color: '#3b82f6' },
  { id: 2, name: 'Mobile App', progress: 35, tasks: 18, completed: 6, color: '#8b5cf6' },
  { id: 3, name: 'API v2', progress: 82, tasks: 12, completed: 10, color: '#10b981' },
];

export const analyticsData = {
  weeklyTasks: [
    { day: 'Mon', completed: 5, created: 3 },
    { day: 'Tue', completed: 8, created: 6 },
    { day: 'Wed', completed: 4, created: 7 },
    { day: 'Thu', completed: 9, created: 4 },
    { day: 'Fri', completed: 7, created: 5 },
    { day: 'Sat', completed: 3, created: 1 },
    { day: 'Sun', completed: 2, created: 2 },
  ],
  teamVelocity: [
    { week: 'W1', points: 21 },
    { week: 'W2', points: 28 },
    { week: 'W3', points: 34 },
    { week: 'W4', points: 31 },
    { week: 'W5', points: 38 },
  ],
};
