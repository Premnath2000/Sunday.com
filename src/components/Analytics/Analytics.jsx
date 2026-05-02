import { useApp } from '../../context/AppContext';
import { analyticsData, teamMembers } from '../../data/mockData';
import './Analytics.css';

export default function Analytics() {
  const { tasks } = useApp();
  const maxCompleted = Math.max(...analyticsData.weeklyTasks.map(d => d.completed));
  const maxVelocity = Math.max(...analyticsData.teamVelocity.map(d => d.points));

  const workload = teamMembers.map(m => ({
    ...m,
    tasks: tasks.filter(t => t.assignee === m.id).length,
  }));
  const maxWorkload = Math.max(...workload.map(w => w.tasks));

  return (
    <div className="analytics animate-in">
      <div className="analytics-grid">
        <div className="chart-card glass animate-in stagger-1">
          <h3 className="chart-title">Tasks This Week</h3>
          <div className="bar-chart">
            {analyticsData.weeklyTasks.map(d => (
              <div key={d.day} className="bar-group">
                <div className="bar-container">
                  <div className="bar completed" style={{ height: `${(d.completed / maxCompleted) * 100}%` }}
                    title={`${d.completed} completed`}></div>
                  <div className="bar created" style={{ height: `${(d.created / maxCompleted) * 100}%` }}
                    title={`${d.created} created`}></div>
                </div>
                <span className="bar-label">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-dot completed"></span> Completed</span>
            <span className="legend-item"><span className="legend-dot created"></span> Created</span>
          </div>
        </div>

        <div className="chart-card glass animate-in stagger-2">
          <h3 className="chart-title">Team Velocity</h3>
          <div className="velocity-chart">
            {analyticsData.teamVelocity.map((d, i) => (
              <div key={d.week} className="velocity-bar-wrap">
                <div className="velocity-value">{d.points}</div>
                <div className="velocity-bar" style={{
                  height: `${(d.points / maxVelocity) * 100}%`,
                  animationDelay: `${i * 0.1}s`
                }}></div>
                <span className="bar-label">{d.week}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card glass animate-in stagger-3">
          <h3 className="chart-title">Workload Distribution</h3>
          <div className="workload-list">
            {workload.map(w => (
              <div key={w.id} className="workload-item">
                <div className="workload-info">
                  <div className="avatar" style={{ background: w.avatar, width: 28, height: 28, fontSize: 11 }}>
                    {w.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="workload-name">{w.name}</span>
                  <span className="workload-count">{w.tasks}</span>
                </div>
                <div className="workload-bar-bg">
                  <div className="workload-bar-fill" style={{
                    width: `${maxWorkload > 0 ? (w.tasks / maxWorkload) * 100 : 0}%`,
                    background: w.avatar
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card glass animate-in stagger-4">
          <h3 className="chart-title">Task Status Breakdown</h3>
          <div className="status-breakdown">
            {[
              { label: 'To Do', count: tasks.filter(t => t.status === 'todo').length, color: '#64748b' },
              { label: 'In Progress', count: tasks.filter(t => t.status === 'progress').length, color: '#f59e0b' },
              { label: 'In Review', count: tasks.filter(t => t.status === 'review').length, color: '#8b5cf6' },
              { label: 'Done', count: tasks.filter(t => t.status === 'done').length, color: '#10b981' },
            ].map(s => (
              <div key={s.label} className="status-row">
                <div className="status-dot" style={{ background: s.color }}></div>
                <span className="status-label">{s.label}</span>
                <div className="status-bar-bg">
                  <div className="status-bar-fill" style={{
                    width: `${tasks.length > 0 ? (s.count / tasks.length) * 100 : 0}%`,
                    background: s.color
                  }}></div>
                </div>
                <span className="status-count">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
