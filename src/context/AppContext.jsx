import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { initialTasks, chatMessages as initialMessages, teamMembers, taskGroups as initialGroups } from '../data/mockData';
import { loadFromStorage, saveToStorage, applyFilters } from '../utils/helpers';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState(() => loadFromStorage('flowsync_tasks', initialTasks));
  const [messages, setMessages] = useState(() => loadFromStorage('flowsync_messages', initialMessages));
  const [currentChannel, setCurrentChannel] = useState(1);
  const [showModal, setShowModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState(() => loadFromStorage('flowsync_viewMode', 'table'));
  const [collapsedGroups, setCollapsedGroups] = useState(() => loadFromStorage('flowsync_collapsedGroups', {}));
  const [filters, setFilters] = useState({ status: null, priority: null, assignee: null });
  const [toasts, setToasts] = useState([]);
  const [nextTaskId, setNextTaskId] = useState(() => {
    const stored = loadFromStorage('flowsync_tasks', initialTasks);
    return Math.max(...stored.map(t => t.id), 0) + 1;
  });

  // Persist tasks and messages to localStorage
  useEffect(() => { saveToStorage('flowsync_tasks', tasks); }, [tasks]);
  useEffect(() => { saveToStorage('flowsync_messages', messages); }, [messages]);
  useEffect(() => { saveToStorage('flowsync_viewMode', viewMode); }, [viewMode]);
  useEffect(() => { saveToStorage('flowsync_collapsedGroups', collapsedGroups); }, [collapsedGroups]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const addTask = useCallback((task) => {
    setTasks(prev => [...prev, { ...task, id: nextTaskId, comments: 0, group: task.group || 'sprint-1' }]);
    setNextTaskId(prev => prev + 1);
    showToast('Task created');
  }, [nextTaskId, showToast]);

  const updateTaskStatus = useCallback((taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast('Task deleted');
  }, [showToast]);

  const updateTask = useCallback((taskId, field, value) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, [field]: value } : t));
  }, []);

  const toggleGroupCollapse = useCallback((groupId) => {
    setCollapsedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  }, []);

  const addMessage = useCallback((text) => {
    const newMsg = {
      id: Date.now(), channel: currentChannel, user: 1,
      text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: []
    };
    setMessages(prev => [...prev, newMsg]);
  }, [currentChannel]);

  const getMember = useCallback((id) => teamMembers.find(m => m.id === id), []);

  const filteredTasks = useMemo(() => applyFilters(tasks, filters), [tasks, filters]);

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    progress: tasks.filter(t => t.status === 'progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage, sidebarCollapsed, setSidebarCollapsed,
      tasks, addTask, updateTaskStatus, deleteTask, updateTask, messages, addMessage,
      currentChannel, setCurrentChannel, showModal, setShowModal, getMember, taskStats,
      searchQuery, setSearchQuery, viewMode, setViewMode,
      collapsedGroups, toggleGroupCollapse, filters, setFilters, filteredTasks,
      taskGroups: initialGroups, toasts, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
