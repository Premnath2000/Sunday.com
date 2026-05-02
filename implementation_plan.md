# FlowSync — Team Collaboration Platform

> **PromptWars Hackathon Challenge**: Design a platform that improves team coordination and communication. The system should simplify workflows and improve visibility of tasks.

## Product Name: **FlowSync**

*"Keep your team in flow, keep your work in sync."*

FlowSync is a real-time team collaboration platform that combines **Kanban task management**, **team chat**, **workspace organization**, and **analytics dashboards** — all in a stunning, modern dark-themed UI.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Vite + React | Fast dev, hot reload, hackathon-friendly |
| **Styling** | Vanilla CSS | Full control, premium glassmorphism design |
| **State** | React Context + LocalStorage | Simple, no backend needed for demo |
| **Real-time** | Firebase Firestore | Real-time sync, Google Cloud native |
| **Auth** | Firebase Auth (Google Sign-In) | One-click team onboarding |
| **Hosting** | Firebase Hosting | Google Cloud, instant deploy |
| **AI Features** | Gemini API | Smart task suggestions, auto-summaries |

---

## Core Features

### 1. 🏠 Dashboard (Home)
- **Team Activity Feed** — live stream of what's happening
- **My Tasks Summary** — cards showing assigned/overdue/completed counts
- **Project Progress Bars** — visual completion tracking
- **Quick Actions** — create task, start chat, join meeting

### 2. 📋 Kanban Board
- **Drag & Drop Columns** — To Do → In Progress → Review → Done
- **Task Cards** with priority badges, assignee avatars, due dates
- **Filters** — by assignee, priority, label
- **Swimlanes** — group by project or team member

### 3. 💬 Team Chat
- **Channel-based messaging** (like Slack channels)
- **Direct Messages** between team members
- **Message reactions** and **thread replies**
- **File sharing** with drag & drop

### 4. 👥 Team & Workspaces
- **Create workspaces** for different projects
- **Invite team members** via link
- **Role management** (Admin, Member, Viewer)
- **Member presence indicators** (online/offline)

### 5. 📊 Analytics & Insights
- **Task completion trends** (line chart)
- **Team velocity** (bar chart)
- **Workload distribution** (pie chart per member)
- **Burndown chart** for sprints

### 6. 🤖 AI Assistant (Gemini)
- **Smart task suggestions** based on chat context
- **Auto-generate task descriptions** from brief inputs
- **Meeting summary generator**
- **Priority recommendations**

---

## UI Design System

### Theme: **Dark Glassmorphism**
- **Background**: Deep navy/charcoal gradient (`#0a0e1a` → `#1a1f3a`)
- **Cards**: Frosted glass effect (`rgba(255,255,255,0.05)` + `backdrop-filter: blur(20px)`)
- **Accent Colors**: 
  - Primary: Electric blue (`#3b82f6`)
  - Success: Emerald (`#10b981`)
  - Warning: Amber (`#f59e0b`)
  - Danger: Rose (`#ef4444`)
  - Purple accent: (`#8b5cf6`)
- **Typography**: Inter (Google Fonts) — clean, modern, highly readable
- **Animations**: Smooth 300ms transitions, spring animations on drag, pulse on notifications
- **Border Radius**: 12-16px for cards, 8px for buttons

### Layout
- **Sidebar Navigation** — collapsible, with icons + labels
- **Top Bar** — search, notifications bell, user avatar
- **Main Content** — responsive grid layout

---

## Project Structure

```
promptwar/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css                  # Global styles + design tokens
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopBar.jsx
│   │   │   └── Layout.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ActivityFeed.jsx
│   │   │   ├── TaskSummary.jsx
│   │   │   └── ProgressCards.jsx
│   │   ├── Kanban/
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── KanbanColumn.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── Chat/
│   │   │   ├── ChatPanel.jsx
│   │   │   ├── MessageList.jsx
│   │   │   └── MessageInput.jsx
│   │   ├── Team/
│   │   │   ├── TeamView.jsx
│   │   │   └── MemberCard.jsx
│   │   ├── Analytics/
│   │   │   └── Analytics.jsx
│   │   └── AI/
│   │       └── AIAssistant.jsx
│   ├── data/
│   │   └── mockData.js            # Demo data for showcase
│   ├── context/
│   │   └── AppContext.jsx          # Global state management
│   └── utils/
│       └── helpers.js
└── firebase.json                   # Firebase hosting config
```

---

## Proposed Changes

### Phase 1: Project Setup & Design System
- Initialize Vite + React project
- Create `index.css` with full design system (colors, typography, animations, glass effects)
- Setup project structure

### Phase 2: Layout & Navigation
#### [NEW] `src/components/Layout/Sidebar.jsx`
- Collapsible sidebar with animated icons
- Navigation items: Dashboard, Board, Chat, Team, Analytics, AI Assistant
- Active state highlighting with gradient accent

#### [NEW] `src/components/Layout/TopBar.jsx`
- Search bar with glass effect
- Notification bell with badge count
- User avatar dropdown

#### [NEW] `src/components/Layout/Layout.jsx`
- Main layout wrapper combining Sidebar + TopBar + content area

### Phase 3: Dashboard
#### [NEW] `src/components/Dashboard/Dashboard.jsx`
- Grid layout with summary cards, activity feed, progress tracking
- Animated counters for task stats
- Quick action buttons

### Phase 4: Kanban Board
#### [NEW] `src/components/Kanban/KanbanBoard.jsx`
- Drag & drop task management with HTML5 Drag API
- Column management (add/rename/reorder)
- Task creation modal

#### [NEW] `src/components/Kanban/TaskCard.jsx`
- Priority badges, assignee avatars, due date chips
- Hover animations, context menu

### Phase 5: Chat & Team
#### [NEW] `src/components/Chat/ChatPanel.jsx`
- Channel list + message area + input
- Real-time message rendering

#### [NEW] `src/components/Team/TeamView.jsx`
- Team grid with member cards, roles, status

### Phase 6: Analytics & AI
#### [NEW] `src/components/Analytics/Analytics.jsx`
- Charts using CSS-based visualizations (no heavy libs)
- Task trends, velocity, workload distribution

#### [NEW] `src/components/AI/AIAssistant.jsx`
- Chat-style AI interface
- Smart task suggestions

### Phase 7: Deploy to Google Cloud
- Configure `firebase.json` for hosting
- Build production bundle
- Deploy via `firebase deploy`

---

## Google Cloud Deployment Plan

```
1. npm run build              → Production bundle
2. firebase init hosting      → Configure Firebase Hosting
3. firebase deploy            → Deploy to Google Cloud
```

> [!IMPORTANT]
> Firebase Hosting runs on Google Cloud infrastructure. The free Spark plan supports custom domains and SSL.

---

## Open Questions

> [!IMPORTANT]
> **Firebase Project**: Do you already have a Firebase/Google Cloud project set up? If not, I'll guide you through creating one.

> [!NOTE]
> **Scope for hackathon**: Given time constraints, I recommend building a **fully functional frontend with mock data** first, then connecting Firebase for real-time features if time permits. The UI alone will be impressive for the demo.

---

## Verification Plan

### Automated Tests
- `npm run build` — ensure clean production build
- Browser testing — verify all pages render, drag & drop works, responsive design

### Manual Verification
- Visual review of all 6 pages
- Test drag & drop on Kanban board
- Verify animations and transitions
- Test responsive layout on different screen sizes
- Confirm Firebase deployment is accessible via public URL
