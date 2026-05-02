import { useApp } from '../../context/AppContext';
import { teamMembers } from '../../data/mockData';
import './Team.css';

export default function TeamView() {
  const { tasks } = useApp();

  const getMemberTasks = (id) => tasks.filter(t => t.assignee === id);

  return (
    <div className="team animate-in">
      <div className="team-header">
        <div>
          <p className="team-subtitle">{teamMembers.length} members across the team</p>
        </div>
        <button className="btn btn-primary">+ Invite Member</button>
      </div>

      <div className="team-grid">
        {teamMembers.map((m, i) => {
          const memberTasks = getMemberTasks(m.id);
          const completed = memberTasks.filter(t => t.status === 'done').length;
          return (
            <div key={m.id} className={`member-card glass glass-hover animate-in stagger-${i + 1}`}>
              <div className="member-top">
                <div className="member-avatar-wrap">
                  <div className="avatar" style={{ background: m.avatar, width: 56, height: 56, fontSize: 20 }}>
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className={`member-status ${m.status}`}></span>
                </div>
                <h3 className="member-name">{m.name}</h3>
                <p className="member-role">{m.role}</p>
              </div>
              <div className="member-stats">
                <div className="member-stat">
                  <div className="member-stat-value">{memberTasks.length}</div>
                  <div className="member-stat-label">Tasks</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">{completed}</div>
                  <div className="member-stat-label">Done</div>
                </div>
                <div className="member-stat">
                  <div className="member-stat-value">{memberTasks.length - completed}</div>
                  <div className="member-stat-label">Active</div>
                </div>
              </div>
              <div className="member-email">{m.email}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
