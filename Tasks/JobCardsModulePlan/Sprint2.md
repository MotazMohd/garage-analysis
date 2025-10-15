# 🔧 Sprint 2: Execution Visibility & Collaboration

## 🎯 Sprint Goal
Enable real-time task tracking, technician collaboration, and proactive notifications so supervisors and customers stay informed during service execution.

---

## ✅ Tasks Breakdown

### 1. Technician Task Board
- **UI:** Build Kanban-style board (By Technician / By Status) for technicians to start, pause, or complete assigned tasks.
- **Controls:** Allow technicians to log time spent, attach photos/videos, and flag blockers.
- **Sync:** Implement WebSocket or SignalR channel for live updates across supervisor dashboards.
- **Why:** Provides technicians with a focused workspace and ensures supervisors see progress instantly.

### 2. Time & Labor Tracking
- **Timers:** Support start/stop timers per `JobTask` with manual adjustment and supervisor approval.
- **Labor Costs:** Calculate labor costs per job by combining technician rate cards with logged hours.
- **Exports:** Generate CSV export for payroll or external reporting.
- **Why:** Delivers accurate operational and financial data tied to job execution.

### 3. Communication & Notifications
- **Activity Feed:** Aggregate notes, photos, status updates, and timer events into chronological feed per job card.
- **Alerts:**
  - Notify supervisors when tasks are blocked or exceed estimated duration.
  - Send customer updates (SMS/email) at key milestones (`In Progress`, `Ready for Pickup`).
- **Preferences:** Allow customers to opt into preferred notification channels.
- **Why:** Keeps stakeholders informed and reduces manual follow-up.

### 4. Quality & Checklist Integration
- **Checklists:** Attach required inspection checklists to `JobTask` entries and enforce completion before closure.
- **Sign-off:** Capture digital signatures from technicians or supervisors for quality assurance.
- **Audit:** Store completed checklist records linked to job history.
- **Why:** Ensures consistent quality and compliance across all service jobs.

---

## 📌 Acceptance Criteria
- [ ] Technicians can update task status, log time, and share media from the execution board.
- [ ] Supervisors receive live updates and can review activity feeds for each job card.
- [ ] Customers receive milestone notifications through their chosen channel.
- [ ] Required checklists must be completed before tasks can be marked as done.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Technician board & realtime sync | 2 days |
| Time tracking & labor cost calculations | 1.5 days |
| Notifications & communication | 1 day |
| Checklist integration | 1 day |

**Total:** ~5.5 dev days

---

## ✅ Sprint Outcome
- Technicians collaborate seamlessly on job tasks with clear visibility into progress.
- Supervisors monitor execution, intervene early on delays, and review time logs effortlessly.
- Customers stay informed, improving satisfaction and reducing inbound status inquiries.
