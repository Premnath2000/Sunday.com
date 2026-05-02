import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { teamMembers } from '../../data/mockData';
import { groupTasksByGroup } from '../../utils/helpers';
import './TableView.css';

const statusConfig = {
  todo: { label: 'To Do', color: '#64748b', bg: 'rgba(100,116,139,0.18)' },
  progress: { label: 'In Progress', color: '#f59e0b', bg: 'rgba(245,158,11,0.18)' },
  review: { label: 'In Review', color: '#8b5cf6', bg: 'rgba(139,92,246,0.18)' },
  done: { label: 'Done', color: '#10b981', bg: 'rgba(16,185,129,0.18)' },
};

const priorityConfig = {
  high: { label: 'High', color: '#ef4444', bg: 'rgba(239,68,68,0.18)' },
  medium: { label: 'Medium', color: '#f59e0b', bg: 'rgba(245,158,11,0.18)' },
  low: { label: 'Low', color: '#3b82f6', bg: 'rgba(59,130,246,0.18)' },
};

const statuses = ['todo', 'progress', 'review', 'done'];
const priorities = ['high', 'medium', 'low'];

function InlineSelect({ value, options, configMap, onSelect, cellClass }) {
  const [open, setOpen] = useState(false);
  const cfg = configMap[value];

  return (
    <div className={`cell-dropdown-wrap ${cellClass || ''}`}>
      <button
        className="cell-chip"
        style={{ background: cfg?.bg, color: cfg?.color }}
        onClick={() => setOpen(!open)}
      >
        {cfg?.label}
      </button>
      {open && (
        <div className="cell-dropdown glass">
          {options.map(opt => {
            const c = configMap[opt];
            return (
              <button
                key={opt}
                className="cell-dropdown-item"
                style={{ color: c.color }}
                onClick={() => { onSelect(opt); setOpen(false); }}
              >
                <span className="cell-dropdown-dot" style={{ background: c.color }}></span>
                {c.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AssigneeSelect({ value, onSelect }) {
  const [open, setOpen] = useState(false);
  const member = teamMembers.find(m => m.id === value);

  return (
    <div className="cell-dropdown-wrap">
      <button className="cell-assignee-btn" onClick={() => setOpen(!open)}>
        <div className="mini-avatar" style={{ background: member?.avatar }}>
          {member?.name.split(' ').map(n => n[0]).join('')}
        </div>
        <span className="assignee-name">{member?.name.split(' ')[0]}</span>
      </button>
      {open && (
        <div className="cell-dropdown glass assignee-dropdown">
          {teamMembers.map(m => (
            <button
              key={m.id}
              className={`cell-dropdown-item ${m.id === value ? 'selected' : ''}`}
              onClick={() => { onSelect(m.id); setOpen(false); }}
            >
              <div className="mini-avatar" style={{ background: m.avatar }}>
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              {m.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TaskRow({ task, onUpdate, onDelete }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(task.title);
  const [hovered, setHovered] = useState(false);

  const saveTitle = () => {
    if (titleValue.trim() && titleValue !== task.title) {
      onUpdate(task.id, 'title', titleValue.trim());
    } else {
      setTitleValue(task.title);
    }
    setEditingTitle(false);
  };

  return (
    <div
      className="table-row animate-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="table-cell cell-checkbox">
        <input type="checkbox" className="row-checkbox" />
      </div>

      <div className="table-cell cell-title">
        {editingTitle ? (
          <input
            className="inline-edit-input"
            value={titleValue}
            onChange={e => setTitleValue(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={e => { if (e.key === 'Enter') saveTitle(); if (e.key === 'Escape') { setTitleValue(task.title); setEditingTitle(false); } }}
            autoFocus
          />
        ) : (
          <span className="title-text" onClick={() => setEditingTitle(true)}>
            {task.title}
          </span>
        )}
      </div>

      <div className="table-cell cell-status">
        <InlineSelect
          value={task.status}
          options={statuses}
          configMap={statusConfig}
          onSelect={v => onUpdate(task.id, 'status', v)}
        />
      </div>

      <div className="table-cell cell-priority">
        <InlineSelect
          value={task.priority}
          options={priorities}
          configMap={priorityConfig}
          onSelect={v => onUpdate(task.id, 'priority', v)}
        />
      </div>

      <div className="table-cell cell-assignee">
        <AssigneeSelect
          value={task.assignee}
          onSelect={v => onUpdate(task.id, 'assignee', v)}
        />
      </div>

      <div className="table-cell cell-date">
        <input
          type="date"
          className="date-input"
          value={task.dueDate}
          onChange={e => onUpdate(task.id, 'dueDate', e.target.value)}
        />
      </div>

      <div className="table-cell cell-labels">
        {task.labels?.map(l => (
          <span key={l} className="table-label">{l}</span>
        ))}
      </div>

      <div className="table-cell cell-actions">
        {hovered && (
          <button className="row-delete-btn" onClick={() => onDelete(task.id)} title="Delete task">
            🗑
          </button>
        )}
      </div>
    </div>
  );
}

function AddTaskRow({ groupId, onAdd }) {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: '',
        status: 'todo',
        priority: 'medium',
        assignee: 1,
        labels: [],
        dueDate: '2026-05-15',
        group: groupId,
      });
      setTitle('');
      setAdding(false);
    }
  };

  if (!adding) {
    return (
      <div className="add-task-row" onClick={() => setAdding(true)}>
        <span className="add-icon">+</span>
        <span className="add-text">Add task</span>
      </div>
    );
  }

  return (
    <div className="add-task-row adding">
      <div className="table-cell cell-checkbox"></div>
      <div className="table-cell cell-title" style={{ flex: 1 }}>
        <input
          className="inline-edit-input add-input"
          placeholder="Task name..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') { setTitle(''); setAdding(false); } }}
          onBlur={() => { if (!title.trim()) setAdding(false); }}
          autoFocus
        />
      </div>
      <button className="btn btn-primary btn-sm add-confirm" onClick={handleAdd}>Add</button>
      <button className="btn btn-ghost btn-sm" onClick={() => { setTitle(''); setAdding(false); }}>✕</button>
    </div>
  );
}

export default function TableView() {
  const { filteredTasks, taskGroups, collapsedGroups, toggleGroupCollapse, updateTask, deleteTask, addTask } = useApp();

  const grouped = groupTasksByGroup(filteredTasks, taskGroups);

  return (
    <div className="table-view animate-in">
      {/* Column headers */}
      <div className="table-header-row">
        <div className="table-header cell-checkbox">
          <input type="checkbox" className="row-checkbox" />
        </div>
        <div className="table-header cell-title">Task</div>
        <div className="table-header cell-status">Status</div>
        <div className="table-header cell-priority">Priority</div>
        <div className="table-header cell-assignee">Assignee</div>
        <div className="table-header cell-date">Due Date</div>
        <div className="table-header cell-labels">Labels</div>
        <div className="table-header cell-actions"></div>
      </div>

      {taskGroups.map(group => {
        const groupTasks = grouped[group.id] || [];
        const isCollapsed = collapsedGroups[group.id];

        return (
          <div key={group.id} className="table-group">
            <button
              className="group-header"
              onClick={() => toggleGroupCollapse(group.id)}
              style={{ '--group-color': group.color }}
            >
              <span className={`group-chevron ${isCollapsed ? 'collapsed' : ''}`}>▸</span>
              <span className="group-color-bar" style={{ background: group.color }}></span>
              <span className="group-name">{group.name}</span>
              <span className="group-count">{groupTasks.length} tasks</span>
            </button>

            <div className={`group-body ${isCollapsed ? 'collapsed' : ''}`}>
              {groupTasks.length === 0 ? (
                <div className="empty-group">
                  <span className="empty-icon">📭</span>
                  <span>No tasks yet — add one!</span>
                </div>
              ) : (
                groupTasks.map(task => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                ))
              )}
              <AddTaskRow groupId={group.id} onAdd={addTask} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
