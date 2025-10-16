# 🚀 Sprint 1: Claims Intake Foundations

## 🎯 Sprint Goal
Establish the core claims data structures, intake workflows, and insurer touchpoints so every claim is tracked from first notice of loss through job linkage with trustworthy evidence.

---

## ✅ Tasks Breakdown

### 1. Claims Domain Model & APIs
- **Entities:** Create `ClaimCase`, `PolicyProfile`, `CoverageLine`, and `ClaimParticipant` tables with tenant and branch scope.
- **Relationships:** Link claims to customers, vehicles, job cards, invoices, and insurer organizations.
- **API Surface:** CRUD endpoints for claim creation, status updates, and policy enrollment with optimistic locking and audit trails.
- **Why:** Provides a canonical store for claims, policies, and parties to anchor all downstream workflows.

### 2. Intake Workflow & FNOL Capture
- **Submission:** Build a guided intake form for receptionists to capture loss details, policy numbers, deductible, and damage summary.
- **Validation:** Implement policy number checksum rules and insurer lookup with configurable fallbacks.
- **Job Linkage:** Allow immediate linking to an existing job card or queue for later assignment with history logs.
- **Why:** Ensures every claim is initiated consistently with structured data connected to operations.

### 3. Insurer Portal MVP
- **Access Control:** Issue insurer user accounts scoped to assigned claims with MFA and IP allowlist options.
- **Workspace:** Provide claim overview (status, documents, tasks) and ability to request additional information.
- **Audit:** Log every insurer view or comment for compliance exports.
- **Why:** Gives external partners real-time visibility while keeping garage control and traceability.

### 4. Evidence & Document Vault
- **Storage:** Integrate secure blob storage for photos, estimates, police reports, and signed forms with metadata tagging.
- **Upload Flow:** Support drag-and-drop upload, virus scanning, and preview for common file types.
- **Retention:** Apply configurable retention policies per insurer and market.
- **Why:** Centralizes documentation with the governance insurers expect before approving payouts.

### 5. Notifications & SLA Tracking
- **Events:** Trigger notifications for new claim submission, insurer portal access, document upload, and status changes.
- **Channels:** Support email + in-app, with SMS optional for urgent updates.
- **Metrics:** Capture SLA timers from FNOL to insurer acknowledgement and first decision.
- **Why:** Keeps stakeholders informed and surfaces bottlenecks early in the lifecycle.

---

## 📌 Acceptance Criteria
- [ ] Claims, policy, and participant records persist with tenant/branch scoping and appear via API and UI lists.
- [ ] Intake flow validates insurer/policy information and links (or queues) associated job cards with audit history.
- [ ] Insurer users can log into a scoped portal and review assigned claims without accessing unrelated data.
- [ ] Evidence vault stores documents securely with metadata, retention rules, and virus scanning hooks.
- [ ] Notifications fire for key events and SLA metrics surface in monitoring dashboards.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Domain model & APIs | 1.8 days |
| Intake workflow & validation | 1.2 days |
| Insurer portal foundations | 1 day |
| Evidence/document management | 0.9 days |
| Notifications & SLA tracking | 0.6 days |

**Total:** ~5.5 dev days

---

## ✅ Sprint Outcome
- Each claim is created with structured data, linked operations, and secure document evidence.
- Insurers gain a controlled portal to collaborate without manual email threads.
- Operations teams monitor claim SLAs from day one to protect cashflow and customer satisfaction.
