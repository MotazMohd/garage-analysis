# 🚀 Sprint 2: Coordination & Automation

## 🎯 Sprint Goal
Extend appointment handling with automated confirmations, rescheduling workflows, and tighter linkage to job card preparation.

---

## ✅ Tasks Breakdown

### 1. Customer Notification Flows
- **Templates:** Configure email/SMS templates for confirmation, reminders, and follow-ups.
- **Event Triggers:** Publish events (`appointment.created`, `appointment.updated`, `appointment.cancelled`) to notification service.
- **Preferences:** Respect customer opt-in/out flags and channel preferences.
- **Why:** Ensures proactive communication that reduces no-shows and improves satisfaction.

### 2. Rescheduling & Cancellation UX
- **Self-Service:** Allow customers to reschedule or cancel via secure link with policy enforcement (e.g., 24-hour window).
- **Capacity Checks:** Validate new slots against technician load and tool requirements.
- **Internal Tools:** Provide queue for staff to approve exceptions or override policies.
- **Why:** Provides flexibility while keeping the schedule accurate.

### 3. Job Card Pre-Work Integration
- **Pre-Assignment:** Map appointment service selections to draft job cards and required technicians.
- **Inventory Check:** Trigger spare parts availability validation; flag shortages for procurement.
- **Documentation:** Allow upload of customer notes, photos, or diagnostic reports.
- **Why:** Reduces cycle time on appointment day by preparing the job in advance.

### 4. KPI & Audit Trail Enhancements
- **Metrics:** Capture booking lead time, cancellation reasons, reschedule rate, and technician utilization impact.
- **Audit:** Record all schedule changes with user, timestamp, and reason codes.
- **Exports:** Provide CSV export for operations review.
- **Why:** Enables data-driven improvements and compliance reporting.

---

## 📌 Acceptance Criteria
- [ ] Customers receive automated confirmations and reminders via configured channels.
- [ ] Rescheduling and cancellation enforce policy windows while updating capacity in real time.
- [ ] Appointments generate pre-filled job cards and inventory checks for the assigned services.
- [ ] Operational metrics and audit logs are available for review and export.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Notification flows & templates | 1 day |
| Reschedule/cancellation workflows | 1.5 days |
| Job card pre-work integration | 1 day |
| KPI & audit enhancements | 1 day |

**Total:** ~4.5 dev days

---

## ✅ Sprint Outcome
- Automated communications keep customers informed and reduce no-show risk.
- Flexible rescheduling workflows maintain accurate calendars and customer trust.
- Operations teams arrive prepared for appointments with draft job cards and inventory insights.
