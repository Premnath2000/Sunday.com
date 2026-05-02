import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { filterTasks } from '../../utils/helpers';
import './TopBar.css';

export default function TopBar() {
  const { currentPage, sidebarCollapsed, setShowModal, tasks, setCurrentPage, searchQuery, setSearchQuery } = useApp();
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const titles = { dashboard: 'Dashboard', board: 'Task Board', chat: 'Team Chat', team: 'Team', analytics: 'Analytics', ai: 'AI Assistant' };

  const results = filterTasks(tasks, searchQuery);

  useEffect(() => {
    const handleClick = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleResultClick = (task) => {
    setSearchQuery('');
    setShowResults(false);
    setCurrentPage('board');
  };

  return (
    <header className={`topbar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="topbar-left">
        <h1 className="page-title">{titles[currentPage] || 'Dashboard'}</h1>
      </div>
      <div className="topbar-right">
        <div className="search-box" ref={searchRef}>
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="Search tasks, messages..."
            id="global-search"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setShowResults(true); }}
            onFocus={() => searchQuery && setShowResults(true)}
          />
          {showResults && searchQuery && (
            <div className="search-results glass">
              {results.length === 0 ? (
                <div className="search-empty">No results for &ldquo;{searchQuery}&rdquo;</div>
              ) : (
                results.slice(0, 6).map(t => (
                  <button key={t.id} className="search-result-item" onClick={() => handleResultClick(t)}>
                    <span className={`search-priority priority-${t.priority}`}></span>
                    <div className="search-result-text">
                      <span className="search-result-title">{t.title}</span>
                      <span className="search-result-status">{t.status}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal('newTask')} id="new-task-btn">
          + New Task
        </button>
        <button className="btn-icon notif-btn" id="notifications-btn" title="Notifications">
          🔔<span className="notif-dot"></span>
        </button>
      </div>
    </header>
  );
}
