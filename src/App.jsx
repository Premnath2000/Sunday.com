import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import Dashboard from './components/Dashboard/Dashboard';
import KanbanBoard from './components/Kanban/KanbanBoard';
import ChatPanel from './components/Chat/ChatPanel';
import TeamView from './components/Team/TeamView';
import Analytics from './components/Analytics/Analytics';
import AIAssistant from './components/AI/AIAssistant';
import { teamMembers } from './data/mockData';

function NewTaskModal() {
  const { showModal, setShowModal, addTask } = useApp();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignee, setAssignee] = useState(1);

  if (showModal !== 'newTask') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, description: desc, status: 'todo', priority, assignee: Number(assignee), labels: ['new'], dueDate: '2026-05-15' });
    setTitle(''); setDesc(''); setPriority('medium'); setAssignee(1);
    setShowModal(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setShowModal(null)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title..." id="task-title-input" autoFocus />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the task..." rows={3} />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🔵 Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Assignee</label>
            <select value={assignee} onChange={e => setAssignee(e.target.value)}>
              {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setShowModal(null)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AppContent() {
  const { currentPage, sidebarCollapsed } = useApp();

  const pages = {
    dashboard: <Dashboard />,
    board: <KanbanBoard />,
    chat: <ChatPanel />,
    team: <TeamView />,
    analytics: <Analytics />,
    ai: <AIAssistant />,
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <TopBar />
        <div className="page-content">
          {pages[currentPage] || <Dashboard />}
        </div>
      </div>
      <NewTaskModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
