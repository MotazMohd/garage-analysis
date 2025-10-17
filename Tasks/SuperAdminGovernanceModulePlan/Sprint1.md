# 🚀 Sprint 1: Tenant Lifecycle Foundations

## 🎯 Sprint Goal
Stand up the Super Admin workspace, onboarding workflows, and subscription plumbing required to vet, approve, and manage garages from application through activation.

---

## ✅ Tasks Breakdown

### 1. Super Admin Console Shell & Access Controls
- **Navigation:** Build the initial Super Admin area with tenant search, detail view shell, and activity feed placeholder.
- **Auth:** Enforce Super Admin-only access with MFA requirement, scoped feature flags for finance/support personas, and impersonation guardrails.
- **Why:** Provides a secured workspace for SaaS operators before onboarding flows go live.

### 2. Tenant Application Intake & Review Pipeline
- **Forms:** Create application form capturing license docs, service categories, operating countries, and billing contacts.
- **Verification:** Integrate document storage, status transitions (Applied → Under Review → Approved/Rejected), and reviewer notes.
- **Why:** Ensures regulatory and quality checks happen before garages are granted access.

### 3. Subscription & Plan Assignment Workflow
- **Plan Catalog:** Seed Free/Pro/Enterprise plan metadata with included modules, usage limits, and pricing per currency.
- **Assignment:** Build APIs/UI for selecting plan, billing cycle, discounts, and payment method capture (integrate with billing gateway skeleton).
- **Why:** Aligns garages with the right entitlements and revenue model at activation time.

### 4. Tenant Activation & Branch Bootstrapping
- **Activation:** Implement activation command that provisions default branch, seeds required feature flags, and sends welcome notifications.
- **Checklist:** Generate onboarding checklist (invite staff, import inventory, configure services) surfaced to customer success team.
- **Why:** Guarantees new tenants start with a usable baseline and consistent follow-up tasks.

### 5. Audit Logging & Activity Timeline
- **Logging:** Persist all lifecycle actions (status changes, plan assignments, activation) with actor, timestamp, and reason.
- **Timeline UI:** Render chronological activity feed in tenant detail page with filters and export.
- **Why:** Provides traceability for compliance reviews and customer escalations.

---

## 📌 Acceptance Criteria
- [ ] Super Admin workspace is accessible only to authorized roles with enforced MFA and audit logging of logins.
- [ ] Garages can submit applications, upload required documents, and move through review statuses with reviewer notes stored.
- [ ] Plan catalog exists with localized pricing; Super Admins can assign plans, billing cycles, and capture payment preferences.
- [ ] Activation process provisions base branch, toggles entitlements, triggers onboarding checklist items, and issues welcome communications.
- [ ] All lifecycle actions are recorded in an immutable activity log visible within the tenant detail view and exportable.

---

## 🔗 Dependencies & Risks
- **Dependencies:** Identity & Access module for role enforcement, Document storage service, Notification platform for welcome messages, Billing gateway foundation.
- **Risks:** Regional license verification differences, sensitive document handling, and ensuring activation idempotency if triggered multiple times.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Console shell & access control | 1.2 days |
| Application intake & review | 1.4 days |
| Plan catalog & assignment | 1.3 days |
| Activation workflow & checklist | 1.2 days |
| Audit logging & timeline | 0.9 days |

**Total:** ~6 dev days

---

## ✅ Sprint Outcome
- Super Admins can securely evaluate, approve, and activate garages with full visibility and audit trails.
- Each new tenant starts with correct plans, entitlements, and onboarding tasks without manual engineering intervention.
- Downstream teams (finance, customer success) gain a reliable source of truth for tenant status and activation history.
