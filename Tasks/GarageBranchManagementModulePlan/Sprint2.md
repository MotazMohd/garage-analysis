# 🏬 Sprint 2: Branch Operations & Staff Controls

## 🎯 Sprint Goal
Equip multi-site garages with robust branch modelling, inheritance, and staff visibility rules while preserving data quality and consistency.

---

## ✅ Tasks Breakdown

### 1. Branch Entity Extensions & Inheritance Engine
- **Entities:** `Branch`, `BranchWorkingHour`, `BranchServiceCapability`, `BranchContact`.
- Implement inheritance defaults from garage-level settings with override flags per field.
- Provide API endpoints to create/update branches, enforcing address, maps pin, and timezone validations.
- **Why:** Ensures branches can tailor operations without duplicating garage configuration from scratch.

### 2. Cross-Branch Staff Assignment Controls
- Extend user-branch mapping to support `PrimaryBranchId` plus optional `AllowedBranchIds[]` when cross-branch work is enabled.
- Add admin toggles to restrict staff to single branch or allow shared coverage.
- Update RBAC checks to enforce branch scope on job cards, inventory, and scheduling views.
- **Why:** Provides precise staff visibility aligned with each garage's operating model.

### 3. Branch Templates & Custom Fields
- Allow SaaS admins to define branch templates (e.g., Quick Service, Bodyshop) with preconfigured working hours and capabilities.
- Enable garage admins to create custom fields for branches/staff (text, number, dropdown, checkbox, file) with validation rules.
- Store metadata for analytics (field usage, required vs optional compliance).
- **Why:** Delivers flexibility to capture local regulations and business nuances without engineering support.

### 4. Document & Media Management per Branch
- Support optional document uploads (permits, municipality approvals) linked to each branch with expiry tracking.
- Allow branch-specific branding overrides (logo, hero image, contact info) for customer-facing channels.
- Hook document expiries into notification workflows and dashboards.
- **Why:** Maintains compliance at branch level and ensures accurate branding across booking experiences.

### 5. Branch Listing & Search Experience
- Build paginated branch listings with filters by city, status, capabilities, and document expiry risk.
- Provide map view with aggregated stats (open vs suspended branches, service coverage).
- Expose branch summary API for mobile/booking channels.
- **Why:** Gives admins quick visibility into network health and ensures downstream channels show accurate data.

---

## 📌 Acceptance Criteria
- [ ] Branch creation enforces required data and inherits garage defaults with clear override indicators.
- [ ] Admins can toggle cross-branch staff access and see current assignments.
- [ ] Custom fields render in branch/staff forms with validation and are stored in structured schema.
- [ ] Branch documents and branding assets support upload, expiry alerts, and retrieval per branch.
- [ ] Branch list/search UI shows filters, map view, and document risk badges.

---

## 🔗 Dependencies
- Identity & RBAC updates from Sprint 1.
- Notification service for expiry reminders.
- Mapping/geocoding service for validating branch locations.

---

## ⚠️ Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Custom field sprawl causing schema issues | Store in schemaless JSON with governance and limit fields per branch. |
| Confusion between inherited vs overridden settings | Provide UI badges and audit logs tracking override reason and author. |
| Performance impact from branch filters | Add composite indexes on geography/status and paginate queries. |

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Backend (inheritance engine, custom fields) | 2.5 days |
| Frontend/Admin UX | 2.5 days |
| Mapping & notifications integration | 1 day |
| QA/UAT | 0.5 day |

**Total:** ~6.5 dev days

---

## ✅ Sprint Outcome
- Branches accurately represent physical operations with compliance and branding controls.
- Staff access aligns with business rules, reducing operational risk.
- Admins gain searchable insights across their branch network.
