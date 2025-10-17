# 🚀 Sprint 1: Training Foundations

## 🎯 Sprint Goal
Stand up the core data model, logging hooks, and managerial views that reveal how technicians contribute to services so coaching can begin immediately.

---

## ✅ Tasks Breakdown

### 1. Technician Capability Model
- **Entities:** Create `TechnicianProfile`, `SkillTag`, `TechnicianSkillSnapshot`, and `CertificationLevel` tables with effective dating and branch scope.
- **Relationships:** Link skill snapshots to job roles, service categories, and optional external certificate IDs.
- **API Surface:** CRUD endpoints for tags, certification levels, and profile enrichment with audit logging.
- **Why:** Establishes a canonical source for each technician’s qualifications and progress context.

### 2. Contribution Logging from Job Cards
- **Integration:** Extend job card completion events to emit per-step contribution payloads (duration, quality rating, parts/tools used).
- **Storage:** Persist `TrainingContribution` records keyed by service step, technician, and appointment.
- **Validation:** Guard against duplicate logs and ensure skipped steps flag incomplete evidence.
- **Why:** Captures structured proof of work that underpins training decisions.

### 3. Supervisor Dashboard Foundations
- **UI/UX:** Provide branch-level leaderboard showing recent hours, step completion rates, and active certifications.
- **Filtering:** Allow slicing by skill tag, certification level, or service category.
- **Security:** Respect manager permissions and hide personal identifiers when viewer lacks clearance.
- **Why:** Gives leaders an actionable view into who needs coaching or more responsibility.

### 4. Feedback & Coaching Notes
- **Data Model:** Add `CoachingNote` with author, visibility scope (private, supervisor-only, technician-visible), and attachments.
- **APIs:** Enable supervisors to log notes tied to contributions or technicians with history tracking.
- **Notifications:** Notify technicians when a note is shared with them.
- **Why:** Encourages timely feedback loops that accelerate learning.

### 5. Reporting & Exports
- **Analytics:** Create baseline reports for contribution counts, time-on-task, and certification coverage by branch.
- **Exports:** Allow CSV export for HR review including anonymized technician IDs when required.
- **Observability:** Instrument usage metrics on dashboards and exports to monitor adoption.
- **Why:** Ensures leadership can review training data outside the platform if needed.

---

## 📌 Acceptance Criteria
- [ ] Technicians have profiles with skill tags, certification levels, and history snapshots accessible via API and UI.
- [ ] Job card step completion logs automatically create contribution records without duplication.
- [ ] Supervisors can view and filter training dashboards scoped to their branches.
- [ ] Coaching notes can be created, shared, and audited for visibility changes.
- [ ] Baseline reports and exports deliver accurate training metrics and are instrumented for usage tracking.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Capability model & APIs | 1.5 days |
| Contribution logging integration | 1.5 days |
| Dashboard foundations | 1 day |
| Coaching notes workflow | 0.8 days |
| Reporting & exports | 0.7 days |

**Total:** ~5.5 dev days

---

## ✅ Sprint Outcome
- A unified repository of technician capabilities powers training insights.
- Supervisors gain immediate visibility into contributions and can log feedback directly in the system.
- Leadership has baseline metrics to measure adoption and effectiveness of coaching efforts.
