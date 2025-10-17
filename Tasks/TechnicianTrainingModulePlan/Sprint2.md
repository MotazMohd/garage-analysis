# 🔄 Sprint 2: Programs & Automation

## 🎯 Sprint Goal
Transform foundational tracking into structured development programs with automated evaluations, escalation workflows, and staffing tie-ins.

---

## ✅ Tasks Breakdown

### 1. Certification Path Designer
- **Capabilities:** Allow admins to create multi-level certification paths with prerequisites, required contributions, and expiry rules.
- **UI:** Drag-and-drop builder to arrange milestones, attach learning materials, and define evaluation rubrics.
- **Versioning:** Support draft/published states with effective dates per garage or franchise group.
- **Why:** Gives training leads a flexible way to codify growth journeys for each discipline.

### 2. Automated Evaluation Engine
- **Rules:** Configure thresholds for hours, quality scores, checklist adherence, and supervisor endorsements.
- **Processing:** Nightly job evaluates contributions against path requirements and emits promotion/demotion recommendations.
- **Overrides:** Provide manual review queue for supervisors to approve, reject, or defer outcomes with justification.
- **Why:** Reduces manual spreadsheet work and ensures consistent, auditable decisions.

### 3. Staffing & Scheduling Hooks
- **Integration:** Expose APIs and events that scheduling, job card assignment, and HR tools can consume when a technician earns or loses certifications.
- **Constraints:** Allow service templates to require minimum certification levels for critical steps.
- **Notifications:** Alert planners when staffing gaps are detected due to expiring certifications.
- **Why:** Ties training outcomes directly to operational readiness.

### 4. Learning & Assessment Library
- **Content Management:** Store documents, videos, and quizzes linked to milestones.
- **Progress Tracking:** Capture completion status, quiz scores, and attempt history for each technician.
- **Access Control:** Respect licensing rights and track content usage metrics for provider reporting.
- **Why:** Centralizes learning assets and evidence to support evaluations.

### 5. Feedback & Dispute Workflow
- **Process:** Allow technicians to request review of evaluation decisions with comment threads and attachment support.
- **SLAs:** Track response deadlines for supervisors and escalate overdue cases to branch managers.
- **Audit:** Maintain immutable timeline of requests, responses, and outcomes.
- **Why:** Builds trust in the system by making training decisions transparent and fair.

---

## 📌 Acceptance Criteria
- [ ] Certification paths can be created, versioned, and assigned to technicians or teams.
- [ ] Automated evaluations generate actionable recommendations and feed a supervisor approval queue.
- [ ] Scheduling and job card systems receive certification updates and enforce minimum requirements.
- [ ] Learning materials and assessments are tracked with completion evidence per technician.
- [ ] Dispute workflows support technician feedback and maintain auditable timelines.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Certification path designer | 1.5 days |
| Automated evaluation engine | 1.7 days |
| Staffing & scheduling hooks | 1 day |
| Learning library & tracking | 1.1 days |
| Feedback/dispute workflow | 0.7 days |

**Total:** ~6 dev days

---

## ✅ Sprint Outcome
- Training journeys become structured programs that guide technicians from onboarding to advanced certifications.
- Evaluations move from manual spreadsheets to auditable automation with supervisor oversight.
- Operational systems stay in sync with the latest technician capabilities to maintain service quality.
