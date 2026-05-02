import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Kanban.css';

const columns = [
  { id: 'todo', label: 'To Do', color: '#64748b', icon: '📝' },
  { id: 'progress', label: 'In Progress', color: '#f59e0b', icon: '🔄' },
  { id: 'review', label: 'In Review', color: '#8b5cf6', icon: '👀' },
  { id: 'done', label: 'Done', color: '#10b981', icon: '✅' },
];

const priorityColors = { high: 'rose', medium: 'amber', low: 'blue' };
const priorityBorder = { high: '#ef4444', medium: '#f59e0b', low: '#3b82f6' };

function TaskCard({ task, member, onDragStart, onDragEnd, onUpdate, onDelete }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleVal, setTitleVal] = useState(task.title);
  const [hovered, setHovered] = useState(false);

  const saveTitle = () => {
    if (titleVal.trim() && titleVal !== task.title) {
      onUpdate(task.id, 'title', titleVal.trim());
    } else {
      setTitleVal(task.title);
    }
    setEditingTitle(false);
  };

  return (
    <div
      className="task-card glass glass-hover"
      style={{ borderLeft: `3px solid ${priorityBorder[task.priority]}` }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="task-card-top">
        <div className="task-labels">
          {task.labels.map(l => (
            <span key={l} className="task-label">{l}</span>
          ))}
        </div>
        {hovered && (
          <button className="task-delete-btn" onClick={() => onDelete(task.id)} title="Delete">🗑</button>
        )}
      </div>
      {editingTitle ? (
        <input
          className="kanban-inline-edit"
          value={titleVal}
          onChange={e => setTitleVal(e.target.value)}
          onBlur={saveTitle}
          onKeyDown={e => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') { setTitleVal(task.title); setEditingTitle(false); } }}
          autoFocus
        />
      ) : (
        <h4 className="task-title" onClick={() => setEditingTitle(true)}>{task.title}</h4>
      )}
      <p className="task-desc">{task.description}</p>
      <div className="task-footer">
        <div className="task-meta">
          <span className={`badge badge-${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {task.comments > 0 && (
            <span className="task-comments">💬 {task.comments}</span>
          )}
        </div>
        {member && (
          <div className="avatar" style={{ background: member.avatar, width: 26, height: 26, fontSize: 10 }}
            title={member.name}>
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const { filteredTasks, updateTaskStatus, updateTask, deleteTask, getMember } = useApp();
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedTask(null);
    setDragOverCol(null);
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(colId);
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== colId) {
      updateTaskStatus(draggedTask.id, colId);
    }
    setDragOverCol(null);
    setDraggedTask(null);
  };

  return (
    <div className="kanban animate-in">
      <div className="kanban-columns">
        {columns.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);
          return (
            <div key={col.id}
              className={`kanban-column ${dragOverCol === col.id ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => handleDrop(e, col.id)}>

              <div className="column-header">
                <span className="column-icon">{col.icon}</span>
                <span className="column-title">{col.label}</span>
                <span className="column-count" style={{ background: `${col.color}25`, color: col.color }}>
                  {colTasks.length}
                </span>
              </div>

              <div className="column-tasks">
                {colTasks.map(task => {
                  const member = getMember(task.assignee);
                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      member={member}
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  );
                })}
                {colTasks.length === 0 && (
                  <div className="kanban-empty-col">
                    <span>Drop tasks here</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
