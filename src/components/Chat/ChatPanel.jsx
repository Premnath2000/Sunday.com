import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { chatChannels } from '../../data/mockData';
import './Chat.css';

export default function ChatPanel() {
  const { messages, addMessage, currentChannel, setCurrentChannel, getMember } = useApp();
  const [input, setInput] = useState('');

  const channelMessages = messages.filter(m => m.channel === currentChannel);
  const activeChannel = chatChannels.find(c => c.id === currentChannel);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage(input.trim());
    setInput('');
  };

  return (
    <div className="chat animate-in">
      <div className="chat-sidebar glass">
        <div className="chat-sidebar-header">
          <h3>Channels</h3>
        </div>
        <div className="channel-list">
          {chatChannels.map(ch => (
            <button key={ch.id}
              className={`channel-item ${currentChannel === ch.id ? 'active' : ''}`}
              onClick={() => setCurrentChannel(ch.id)}>
              <span className="channel-icon">{ch.icon}</span>
              <span className="channel-name"># {ch.name}</span>
              {ch.unread > 0 && <span className="channel-unread">{ch.unread}</span>}
            </button>
          ))}
        </div>
        <div className="dm-section">
          <h4 className="dm-title">Direct Messages</h4>
          {[2, 3, 4].map(id => {
            const m = getMember(id);
            return (
              <div key={id} className="dm-item">
                <div className="avatar" style={{ background: m?.avatar, width: 24, height: 24, fontSize: 9 }}>
                  {m?.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="dm-name">{m?.name}</span>
                <span className={`status-dot ${m?.status}`}></span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header glass">
          <span className="chat-channel-icon">{activeChannel?.icon}</span>
          <h3># {activeChannel?.name}</h3>
          <span className="chat-member-count">6 members</span>
        </div>

        <div className="message-list">
          {channelMessages.map(msg => {
            const member = getMember(msg.user);
            return (
              <div key={msg.id} className="message-item">
                <div className="avatar" style={{ background: member?.avatar, width: 36, height: 36, fontSize: 13 }}>
                  {member?.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-author">{member?.name}</span>
                    <span className="message-time">{msg.time}</span>
                  </div>
                  <p className="message-text">{msg.text}</p>
                  {msg.reactions.length > 0 && (
                    <div className="message-reactions">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="reaction">{r.emoji} {r.count}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <form className="message-input" onSubmit={handleSend}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder={`Message #${activeChannel?.name}...`} id="chat-input" />
          <button type="submit" className="btn btn-primary send-btn">Send</button>
        </form>
      </div>
    </div>
  );
}
