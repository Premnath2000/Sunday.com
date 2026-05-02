import { useApp } from '../../context/AppContext';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'board', label: 'Tasks', icon: '📋' },
  { id: 'chat', label: 'Chat', icon: '💬' },
  { id: 'team', label: 'Team', icon: '👥' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'ai', label: 'AI Assistant', icon: '🤖' },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarCollapsed, setSidebarCollapsed } = useApp();

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          {!sidebarCollapsed && <span className="logo-text">FlowSync</span>}
        </div>
        <button className="btn-icon collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? 'Expand' : 'Collapse'}>
          {sidebarCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
            title={item.label}>
            <span className="nav-icon">{item.icon}</span>
            {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
            {!sidebarCollapsed && item.id === 'chat' && (
              <span className="nav-badge">3</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="avatar" style={{ background: '#3b82f6' }}>SC</div>
          {!sidebarCollapsed && (
            <div className="user-info">
              <div className="user-name">Sarah Chen</div>
              <div className="user-role">Product Lead</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
