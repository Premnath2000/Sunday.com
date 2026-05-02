import { useApp } from '../../context/AppContext';
import { activities, projects } from '../../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  const { taskStats, getMember, setCurrentPage } = useApp();
  const stats = [
    { label: 'Total Tasks', value: taskStats.total, icon: '📋', color: '#3b82f6' },
    { label: 'In Progress', value: taskStats.progress, icon: '🔄', color: '#f59e0b' },
    { label: 'In Review', value: taskStats.review, icon: '👀', color: '#8b5cf6' },
    { label: 'Completed', value: taskStats.done, icon: '✅', color: '#10b981' },
  ];

  return (
    <div className="dashboard animate-in">
      <div className="welcome-banner glass">
        <div className="welcome-text">
          <h2>Good morning, Sarah! 👋</h2>
          <p>You have <strong>{taskStats.progress + taskStats.review}</strong> active tasks and <strong>3</strong> unread messages</p>
        </div>
        <button className="btn btn-primary" onClick={() => setCurrentPage('board')}>Go to Board →</button>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={s.label} className={`stat-card glass glass-hover animate-in stagger-${i + 1}`}>
            <div className="stat-icon" style={{ background: `${s.color}20`, color: s.color }}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="activity-section glass animate-in stagger-2">
          <h3 className="section-title">Recent Activity</h3>
          <div className="activity-list">
            {activities.map(a => {
              const member = getMember(a.user);
              return (
                <div key={a.id} className="activity-item">
                  <div className="avatar" style={{ background: member?.avatar, width: 28, height: 28, fontSize: 11 }}>
                    {member?.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="activity-content">
                    <span className="activity-user">{member?.name}</span>{' '}
                    <span className="activity-action">{a.action}</span>{' '}
                    <span className="activity-target">{a.target}</span>
                    <div className="activity-time">{a.time}</div>
                  </div>
                  <span className="activity-icon">{a.icon}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="projects-section glass animate-in stagger-3">
          <h3 className="section-title">Projects</h3>
          <div className="projects-list">
            {projects.map(p => (
              <div key={p.id} className="project-item">
                <div className="project-header">
                  <div className="project-dot" style={{ background: p.color }}></div>
                  <span className="project-name">{p.name}</span>
                  <span className="project-pct">{p.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${p.progress}%`, background: p.color }}></div>
                </div>
                <div className="project-meta">{p.completed}/{p.tasks} tasks completed</div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions glass animate-in stagger-4">
          <h3 className="section-title">Quick Actions</h3>
          <div className="actions-grid">
            {[
              { icon: '📋', label: 'New Task', page: 'board' },
              { icon: '💬', label: 'Open Chat', page: 'chat' },
              { icon: '👥', label: 'View Team', page: 'team' },
              { icon: '📈', label: 'Analytics', page: 'analytics' },
            ].map(a => (
              <button key={a.label} className="action-card glass-hover" onClick={() => setCurrentPage(a.page)}>
                <span className="action-icon">{a.icon}</span>
                <span className="action-label">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
