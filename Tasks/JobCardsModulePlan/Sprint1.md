# 🚀 Sprint 1: Job Card Foundations

## 🎯 Sprint Goal
Deliver the core data structures, APIs, and UI necessary to generate job cards from approved service plans, assign work to technicians, and track basic status changes across the garage.

---

## ✅ Tasks Breakdown

### 1. Domain Modeling & Persistence
- **Entities:** Define `JobCard`, `JobTask`, `JobAssignment`, and `JobCardNote` tables with versioning metadata.
- **Relationships:** Link job cards to `ServiceOrder`, selected service steps, and related vehicles/customers.
- **Migrations:** Seed standard job statuses (`Scheduled`, `In Progress`, `On Hold`, `Completed`, `Cancelled`).
- **Why:** Establishes the structured dataset needed for operational execution and reporting.

### 2. Job Card Generation APIs
- **Trigger:** `POST /api/service-orders/{id}/job-cards` to instantiate a job card from an approved service order template.
- **Validation:** Ensure required service steps are mapped to `JobTask` entries with estimated durations.
- **Versioning:** Persist the originating service template revision for audit purposes.
- **Why:** Enables planners to transition approved work into actionable job cards.

### 3. Assignment Workflow
- **Endpoints:**
  - `POST /api/job-cards/{id}/assignments` for initial technician/assistant assignment.
  - `PUT /api/job-assignments/{id}` to reassign or update shift details.
- **Rules:** Validate technician certifications against required tool/skill tags.
- **UI:** Provide drag-and-drop assignment board with technician availability summary.
- **Why:** Ensures the right team members are assigned while honoring skills and capacity.

### 4. Status & Activity Logging
- **Transitions:** Implement status update endpoint with optimistic locking and event history.
- **Notes:** Allow supervisors to add notes, attachments, and internal instructions.
- **Audit:** Store change history for compliance and customer transparency.
- **Why:** Creates a single source of truth for job progress and communication.

---

## 📌 Acceptance Criteria
- [ ] Job cards can be generated from approved service orders with associated tasks and estimates.
- [ ] Technicians can be assigned to jobs with skill validation and scheduling conflicts surfaced.
- [ ] Status transitions are recorded with timestamps, users, and optional notes.
- [ ] UI surfaces job cards list with key metadata (vehicle, customer, status, assigned staff).

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Data modeling & migrations | 1.5 days |
| API implementation | 1.5 days |
| Assignment workflows & validation | 1 day |
| UI for creation and overview | 1 day |

**Total:** ~5 dev days

---

## ✅ Sprint Outcome
- Core job card entities and APIs support generating actionable work packets from services.
- Assignment workflows ensure technicians with the right skills receive the appropriate tasks.
- Supervisors gain clear visibility into job status, notes, and upcoming work.
