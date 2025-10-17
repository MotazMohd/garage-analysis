# 🚀 Sprint 1: Tenant Onboarding Foundations

## 🎯 Sprint Goal
Launch the core garage onboarding experience, ensuring SaaS admins can vet new garages while primary owners configure essential settings and invite co-admins.

---

## ✅ Tasks Breakdown

### 1. Garage Master Data Model & APIs
- **Entities:** `Garage`, `GarageDocument`, `GarageWorkingHour`, `GarageServiceCapability`.
- **Attributes:** capture name, trade license, address, geo coordinates, contact channels, supported services, service radius, branding.
- **APIs:** CRUD endpoints with validation (unique garage name per tenant, required license upload, working hours coverage).
- **Why:** Establishes authoritative garage records consumed by every downstream module.

### 2. Approval Workflow & Status Transitions
- Implement statuses: `Pending`, `Active`, `Suspended`, `Archived` with reason codes.
- Provide SaaS admin UI to review submitted docs, request resubmission, and approve or reject with notifications.
- Auto-log status changes with actor, timestamp, and comments.
- **Why:** Keeps platform compliant while giving clarity to new garages about their onboarding stage.

### 3. Primary Owner & Admin Assignment
- Capture the creating user as `PrimaryOwner` with non-removable privileges.
- Allow additional garage admins to be invited post-approval with email/SMS tokens.
- Manage admin roles via existing identity service but scoped to the new garage.
- **Why:** Ensures each garage has accountable leadership and can delegate administration securely.

### 4. Working Hours & Service Template Selection
- Provide UI/API for defining default working hours per day with timezone awareness.
- Allow selection of service categories offered (e.g., Mechanical, Electrical, Quick Service).
- Expose data to scheduling module via event `garage.settings.updated`.
- **Why:** Prepares scheduling and booking services with accurate availability and capabilities.

### 5. Compliance Documents & Branding Assets
- Support multi-file upload for trade license, insurance, other permits with expiry tracking.
- Store optional logo/branding colour for UI theming.
- Notify garage admins before document expiry (hook to notification service).
- **Why:** Maintains regulatory readiness and provides consistent branding in customer communications.

---

## 📌 Acceptance Criteria
- [ ] SaaS admins can create, review, approve, suspend, or archive garages with audit logs.
- [ ] Primary owner automatically receives full admin rights; additional admins can be invited.
- [ ] Garage settings include validated working hours, service capabilities, and localisation defaults.
- [ ] Compliance documents support upload, preview metadata, and expiry reminders.
- [ ] Events are published when garage status or settings change.

---

## 🔗 Dependencies
- Identity & RBAC service for user roles and invitations.
- Notification service for approval outcomes and document expiries.
- File storage service for document uploads.

---

## ⚠️ Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Document uploads exceed size/format expectations | Restrict MIME types, configure chunked uploads, and validate on backend. |
| Conflicting approval status updates | Use optimistic concurrency with row versioning and restrict actions via role checks. |
| Timezone mistakes in working hours | Leverage shared timezone library and default to garage country/timezone. |

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Backend (entities, workflows, events) | 2.5 days |
| Frontend/Admin UI | 2 days |
| Integrations & notifications | 0.5 day |
| QA/UAT | 1 day |

**Total:** ~6 dev days

---

## ✅ Sprint Outcome
- Fully governed garage onboarding with compliant data capture.
- Primary owner and admin management ready for downstream modules.
- Core settings seeded to power scheduling, billing, and collaboration features.
