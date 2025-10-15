# 🔧 Sprint 2: Maintenance & Reservation Workflows

## 🎯 Sprint Goal
Layer operational workflows on top of the tool registry so garages can reserve tools for jobs, track maintenance/calibration, and enforce availability rules during scheduling.

---

## ✅ Tasks Breakdown

### 1. Tool Reservation Engine
- **Data Model:**
  - `ToolReservation`: `Id`, `ToolId`, `JobCardId`, `ServiceStepId?`, `ReservedFrom`, `ReservedTo`, `ReservedQuantity`, `Status` (Pending, Confirmed, Released, Cancelled), `ReservedBy`, `CreatedAt`.
- **Logic:**
  - Prevent overlapping reservations beyond available quantity.
  - Auto-release reservations when job step completes or is cancelled.
- **API:**
  - `POST /api/tools/{id}/reservations`
  - `PUT /api/tool-reservations/{id}/release`
  - `GET /api/tools/{id}/reservations?range=...`
- **Why:** Ensures tools are not double-booked and supports the upcoming job card flow.

### 2. Maintenance & Calibration Tracking
- **Data Model:**
  - `ToolMaintenanceLog`: `Id`, `ToolId`, `PerformedAt`, `PerformedBy`, `Type` (Calibration, Repair, Inspection), `Notes`, `NextDueDate`, `AttachmentUrls`.
- **API:**
  - `POST /api/tools/{id}/maintenance`
  - `GET /api/tools/{id}/maintenance`
- **Automation:**
  - Scheduled job to flag tools with overdue calibration.
  - Notification hooks for Garage Admin and Supervisor roles.
- **Why:** Keeps tools compliant and safe, aligning with real-world regulatory needs.

### 3. Scheduling Integration Hooks
- **Tasks:**
  - Extend service scheduling logic to check tool availability.
  - Provide conflict response (e.g., `ToolUnavailable` error code with alternatives).
  - Offer override option for Garage Admin (forces reservation with warning).
- **Frontend:**
  - During booking, show availability summary for required tools.
- **Why:** Connects the tool module to service/job planning workflows.

### 4. Alerts & Notifications
- **Tasks:**
  - Create notification templates for reservation confirmations, releases, and maintenance due alerts.
  - Integrate with existing notification service (email/app push).
- **Why:** Keeps technicians and supervisors informed about tool readiness.

### 5. Reporting Snapshot
- **Endpoints:**
  - `GET /api/tools/dashboard` returning counts: Available, In Use, Under Maintenance, Overdue Calibration.
  - `GET /api/tools/{id}/usage-summary` for utilization metrics.
- **Why:** Provides quick insights for operations teams without needing the full reporting module yet.

---

## 📌 Acceptance Criteria
- [ ] Tool reservations enforce quantity and time window rules.
- [ ] Job scheduling checks tool availability and handles conflicts.
- [ ] Maintenance logs capture history with next due dates.
- [ ] Notifications are triggered for reservations and maintenance reminders.
- [ ] Dashboard endpoints expose utilization metrics.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Backend (reservations, maintenance, sched integration) | 3 days |
| Frontend (booking conflict UI, maintenance log views) | 2 days |
| Notifications & scheduled jobs | 1 day |
| QA/UAT | 0.5 day |

**Total:** ~6.5 dev days

---

## ✅ Sprint Outcome
- Tools can be reserved confidently for upcoming jobs.
- Maintenance cadence is tracked and visible.
- Schedulers and supervisors receive timely alerts, reducing downtime.
