# 🔄 Sprint 2: Operational Controls & Upsell Enablement

## 🎯 Sprint Goal
Give reception and supervisory staff robust guardrails, upsell prompts, and governance tooling so every arrival follows policy, captures revenue opportunities, and stays fully auditable.

---

## ✅ Tasks Breakdown

### 1. Policy Configuration & Enforcement
- **Admin Console:** Add garage-level settings to require condition logging, toggle add-on recommendations, and define rejection reason catalogs.
- **Branch Overrides:** Allow select branches to tighten or relax policies within global constraints, honoring localization for forms and reasons.
- **Workflow Hooks:** Inject policy checks into the arrival flow with user-facing guidance (e.g., why condition capture is required).
- **Why:** Ensures intake behavior aligns with branch-specific governance without sacrificing consistency.

### 2. Rejection & Escalation Handling
- **Approval Routing:** Implement approval queues for rejected arrivals, notifying supervisors/garage admins with actionable context.
- **Audit Trail:** Record who rejected, approved, or reinstated arrivals along with timestamps and notes.
- **Customer Messaging:** Provide templated notifications for rejections or rescheduling prompts with dynamic content.
- **Why:** Protects service quality while maintaining transparent communication.

### 3. Upsell & Pricing Recommendations
- **Service Suggestions:** Surface contextual add-on recommendations (based on vehicle type, history, or active campaigns) during intake.
- **Pricing Snapshot:** Display estimated labor/parts pricing and savings bundles for customer consent capture.
- **Handoff:** Persist accepted upsells to the job card and notify technician leaders for execution prep.
- **Why:** Turns check-in into a revenue-positive touchpoint with minimal friction.

### 4. Reporting & Compliance Enhancements
- **Branch Dashboards:** Build views showing arrival counts, rejection reasons, upsell conversion rates, and SLA adherence.
- **Export & Audit:** Allow auditors to export intake logs, photos, and decisions with tamper-evident signatures.
- **Observability:** Add alerting for abnormal rejection spikes or missed photo uploads to operations channels.
- **Why:** Provides actionable insights and compliance evidence for management teams.

---

## 📌 Acceptance Criteria
- [ ] Garage admins can configure intake policies and rejection reasons with branch-level overrides where permitted.
- [ ] Rejected arrivals trigger approval workflows and persist full audit trails, including notifications to relevant staff.
- [ ] Upsell prompts appear during check-in, and accepted add-ons propagate to job cards and technician notifications.
- [ ] Branch dashboards display real-time arrival, rejection, and upsell metrics with export capability.
- [ ] Alerts fire when rejection thresholds or media capture compliance fall below configured standards.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Policy configuration | 2.0 days |
| Rejection & escalation | 2.0 days |
| Upsell workflows | 2.5 days |
| Reporting & compliance | 1.5 days |

**Total:** ~8 dev days

---

## ✅ Sprint Outcome
- Policy-driven intake flows that adapt per garage/branch while remaining auditable.
- Seamless rejection handling that keeps customers informed and supervisors accountable.
- Upsell and reporting capabilities that improve revenue capture and operational visibility.
