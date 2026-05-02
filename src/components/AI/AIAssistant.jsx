import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { teamMembers } from '../../data/mockData';
import './AIAssistant.css';

const suggestions = [
  '📋 Create tasks from meeting notes',
  '📊 Summarize sprint progress',
  '🎯 Suggest task priorities',
  '📝 Generate daily standup update',
];

function buildContextResponses(tasks, taskStats, getMember) {
  const highPriority = tasks.filter(t => t.priority === 'high' && t.status !== 'done');
  const overdueTasks = tasks.filter(t => t.status !== 'done' && new Date(t.dueDate) < new Date());
  const inProgress = tasks.filter(t => t.status === 'progress');
  const inReview = tasks.filter(t => t.status === 'review');
  const todoTasks = tasks.filter(t => t.status === 'todo');

  // Build workload map
  const workload = {};
  tasks.filter(t => t.status !== 'done').forEach(t => {
    const m = getMember(t.assignee);
    if (m) workload[m.name] = (workload[m.name] || 0) + 1;
  });
  const busiest = Object.entries(workload).sort((a, b) => b[1] - a[1]);

  return {
    'hi': `Hello! 👋 I'm your FlowSync AI assistant. Your team currently has **${taskStats.total} tasks** — ${taskStats.done} done, ${taskStats.progress} in progress, ${taskStats.review} in review, and ${taskStats.todo} to do.${overdueTasks.length > 0 ? `\n\n⚠️ **${overdueTasks.length} task${overdueTasks.length > 1 ? 's are' : ' is'} overdue** and need${overdueTasks.length === 1 ? 's' : ''} attention!` : ''}\n\nHow can I help today?`,

    'help': 'Here\'s what I can help with:\n\n📋 **Task Management** — Create, organize, and prioritize tasks\n📊 **Sprint Summary** — Get a quick overview of sprint progress\n🎯 **Priority Suggestions** — AI-powered priority recommendations\n📝 **Standup Updates** — Auto-generate daily standup reports\n💡 **Workflow Tips** — Suggestions to improve team efficiency',

    'standup': `📝 **Daily Standup Summary — ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}**\n\n**Completed:**\n${tasks.filter(t => t.status === 'done').map(t => `✅ ${t.title} (${getMember(t.assignee)?.name || 'Unassigned'})`).join('\n') || '_(none yet)_'}\n\n**In Progress:**\n${inProgress.map(t => `🔄 ${t.title} (${getMember(t.assignee)?.name || 'Unassigned'})`).join('\n') || '_(none)_'}\n\n**In Review:**\n${inReview.map(t => `👀 ${t.title} (${getMember(t.assignee)?.name || 'Unassigned'})`).join('\n') || '_(none)_'}\n\n**Blockers:**\n${overdueTasks.length > 0 ? overdueTasks.map(t => `⚠️ ${t.title} — overdue since ${t.dueDate}`).join('\n') : '✅ No blockers!'}\n\n**Sprint Health:** ${Math.round((taskStats.done / taskStats.total) * 100)}% complete ${taskStats.done / taskStats.total >= 0.6 ? '— On track! 🎯' : '— Needs attention ⚡'}`,

    'priority': `🎯 **Priority Recommendations (based on current board):**\n\n${highPriority.length > 0 ? highPriority.map((t, i) => `${i + 1}. **HIGH** — ${t.title} (${t.status === 'progress' ? 'In Progress' : t.status === 'review' ? 'In Review' : 'To Do'})`).join('\n') : '✅ No high-priority items pending!'}\n\n${overdueTasks.length > 0 ? `⚠️ **Overdue items to escalate:**\n${overdueTasks.map(t => `• ${t.title} (due ${t.dueDate})`).join('\n')}` : ''}\n\n**Workload distribution:**\n${busiest.map(([name, count]) => `• ${name}: ${count} active task${count > 1 ? 's' : ''}`).join('\n')}\n\nShall I update these priorities in the board?`,

    'create': `📋 **Quick Task Creation**\n\nBased on your current sprint, I suggest creating tasks for:\n\n1. 🔄 **Code review** for "${inReview[0]?.title || 'pending items'}" — assign to a reviewer\n2. 📝 **Documentation** for completed features (${taskStats.done} tasks done)\n3. 🧪 **Testing** for in-progress work\n\nUse the **+ New Task** button in the top bar, or tell me what you'd like to create!`,

    'summarize': `📊 **Sprint Progress Summary**\n\n**Overall:** ${Math.round((taskStats.done / taskStats.total) * 100)}% complete (${taskStats.done}/${taskStats.total} tasks)\n\n📌 To Do: ${taskStats.todo}\n🔄 In Progress: ${taskStats.progress}\n👀 In Review: ${taskStats.review}\n✅ Done: ${taskStats.done}\n\n**Team Members:** ${teamMembers.filter(m => m.status === 'online').length}/${teamMembers.length} online\n\n**Top Performers:**\n${busiest.slice(0, 3).map(([name, count]) => `• ${name} — ${count} active tasks`).join('\n')}\n\n${taskStats.done / taskStats.total >= 0.5 ? '🎉 Great progress! The team is on track.' : '⚡ Sprint needs a push — consider a standup to unblock tasks.'}`,
  };
}

export default function AIAssistant() {
  const { tasks, taskStats, getMember } = useApp();
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! 👋 I\'m **FlowSync AI**, your intelligent team assistant. I can help you manage tasks, summarize progress, and provide smart suggestions. How can I help today?' }
  ]);
  const [input, setInput] = useState('');

  const contextResponses = buildContextResponses(tasks, taskStats, getMember);

  const handleSend = (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let response = `I'm looking at your board now... You have **${taskStats.total} tasks** total with **${taskStats.progress} in progress** and **${taskStats.review} in review**. Try asking me for a "standup update", "priority suggestions", or "sprint summary"!`;

      for (const [key, val] of Object.entries(contextResponses)) {
        if (lower.includes(key)) { response = val; break; }
      }

      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 800);
  };

  const handleSubmit = (e) => { e.preventDefault(); handleSend(); };

  return (
    <div className="ai-assistant animate-in">
      <div className="ai-main glass">
        <div className="ai-header">
          <div className="ai-avatar">🤖</div>
          <div>
            <h3>FlowSync AI</h3>
            <span className="ai-status">● Online</span>
          </div>
        </div>

        <div className="ai-messages">
          {messages.map((m, i) => (
            <div key={i} className={`ai-message ${m.role}`}>
              {m.role === 'assistant' && <div className="ai-msg-avatar">🤖</div>}
              <div className="ai-msg-bubble" dangerouslySetInnerHTML={{
                __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
              }} />
            </div>
          ))}
        </div>

        <div className="ai-suggestions">
          {suggestions.map(s => (
            <button key={s} className="suggestion-chip" onClick={() => handleSend(s)}>
              {s}
            </button>
          ))}
        </div>

        <form className="ai-input" onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Ask FlowSync AI anything..." id="ai-input" />
          <button type="submit" className="btn btn-primary send-btn">Send</button>
        </form>
      </div>
    </div>
  );
}
