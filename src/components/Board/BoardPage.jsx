import { useApp } from '../../context/AppContext';
import { teamMembers } from '../../data/mockData';
import ViewSwitcher from './ViewSwitcher';
import TableView from './TableView';
import KanbanBoard from '../Kanban/KanbanBoard';
import './BoardPage.css';

export default function BoardPage() {
  const { viewMode, setViewMode, filters, setFilters, filteredTasks, setShowModal } = useApp();

  return (
    <div className="board-page animate-in">
      {/* Toolbar */}
      <div className="board-toolbar">
        <div className="toolbar-left">
          <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
          <div className="toolbar-filters">
            <select
              className="filter-select"
              value={filters.status || ''}
              onChange={e => setFilters(prev => ({ ...prev, status: e.target.value || null }))}
            >
              <option value="">All Statuses</option>
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="review">In Review</option>
              <option value="done">Done</option>
            </select>

            <select
              className="filter-select"
              value={filters.priority || ''}
              onChange={e => setFilters(prev => ({ ...prev, priority: e.target.value || null }))}
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              className="filter-select"
              value={filters.assignee || ''}
              onChange={e => setFilters(prev => ({ ...prev, assignee: e.target.value || null }))}
            >
              <option value="">All Members</option>
              {teamMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>

            {(filters.status || filters.priority || filters.assignee) && (
              <button
                className="btn btn-ghost btn-sm clear-filters"
                onClick={() => setFilters({ status: null, priority: null, assignee: null })}
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        <div className="toolbar-right">
          <span className="task-count-badge">{filteredTasks.length} tasks</span>
          <button className="btn btn-primary" onClick={() => setShowModal('newTask')}>
            + New Task
          </button>
        </div>
      </div>

      {/* View */}
      <div className="board-view-container">
        {viewMode === 'table' ? <TableView /> : <KanbanBoard />}
      </div>
    </div>
  );
}
