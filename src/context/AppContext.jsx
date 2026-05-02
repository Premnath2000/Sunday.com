import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { initialTasks, chatMessages as initialMessages, teamMembers } from '../data/mockData';
import { loadFromStorage, saveToStorage } from '../utils/helpers';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState(() => loadFromStorage('flowsync_tasks', initialTasks));
  const [messages, setMessages] = useState(() => loadFromStorage('flowsync_messages', initialMessages));
  const [currentChannel, setCurrentChannel] = useState(1);
  const [showModal, setShowModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [nextTaskId, setNextTaskId] = useState(() => {
    const stored = loadFromStorage('flowsync_tasks', initialTasks);
    return Math.max(...stored.map(t => t.id), 0) + 1;
  });

  // Persist tasks and messages to localStorage
  useEffect(() => { saveToStorage('flowsync_tasks', tasks); }, [tasks]);
  useEffect(() => { saveToStorage('flowsync_messages', messages); }, [messages]);

  const addTask = useCallback((task) => {
    setTasks(prev => [...prev, { ...task, id: nextTaskId, comments: 0 }]);
    setNextTaskId(prev => prev + 1);
  }, [nextTaskId]);

  const updateTaskStatus = useCallback((taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
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
      tasks, addTask, updateTaskStatus, deleteTask, messages, addMessage,
      currentChannel, setCurrentChannel, showModal, setShowModal, getMember, taskStats,
      searchQuery, setSearchQuery,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
