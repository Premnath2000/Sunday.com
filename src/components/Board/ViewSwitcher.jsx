import './ViewSwitcher.css';

const views = [
  { id: 'table', label: 'Table', icon: '☰' },
  { id: 'kanban', label: 'Kanban', icon: '▦' },
];

export default function ViewSwitcher({ viewMode, setViewMode }) {
  return (
    <div className="view-switcher">
      {views.map(v => (
        <button
          key={v.id}
          className={`view-option ${viewMode === v.id ? 'active' : ''}`}
          onClick={() => setViewMode(v.id)}
        >
          <span className="view-icon">{v.icon}</span>
          <span className="view-label">{v.label}</span>
        </button>
      ))}
    </div>
  );
}
