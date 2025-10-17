# 🚀 Sprint 1 — Service Data Foundations

## 🎯 Goal
Modernize the service catalogue data model so it supports category management, reusable lookup values, and precise part behavior without disrupting existing tenants.

## 📦 Key Deliverables
- Database lookups for pricing types, service types, and categories with migration scripts and seed data.
- Expanded service–part join table capturing requirement flags and default quantities.
- Updated admin API/DTO contracts and UI forms that rely on the new lookups and part rules.
- Documentation for engineering and operations teams covering new field usage and migration notes.

## 🛠️ Major Tasks
1. **Introduce lookup tables** for pricing types and service types with read-only endpoints (`GET /api/lookups/pricing-types`, `GET /api/lookups/service-types`).
2. **Add `ServiceCategory`** with attributes (`Name`, `Code`, `IsCustomerVisible`, `AllowsAddons`) and surface values through `/api/lookups/service-categories`.
3. **Refactor `ServicePart`** join entity to include `IsRequired`, `IsOptional`, `IsLocked`, `AllowCustomerProvided`, `IsBasedOnPreCheck`, `DefaultQuantity`, and `IsQuantityAdjustable`.
4. **Revise service DTOs and commands** so create/update/read APIs persist and return lookup keys plus enriched part metadata.
5. **Seed baseline data** (e.g., pricing types: Fixed, Per Hour; categories: Diagnostics, Maintenance, Detailing) with idempotent scripts.
6. **Migrate legacy services** assigning safe default categories and lookup values while preserving historical pricing.
7. **Refresh admin UI forms** to consume dynamic lookups and expose the new part behavior toggles with sensible defaults.

## ✅ Acceptance Criteria
- Services persist lookup identifiers and surface human-readable labels in responses.
- Admins can configure part requirement flags; persisted values render correctly when reopening a service.
- Existing services retain visibility and pricing; no orphaned references in database integrity checks.
- API documentation and release notes explain new fields and migration approach.

## 🔗 Dependencies
- Coordinate with database operations to schedule data migrations and backups.
- Ensure Spare Parts metadata already exposes `AllowCustomerProvided` to keep semantics aligned.

## ⚠️ Risks & Mitigations
- **Enum-to-lookup drift:** add regression tests comparing seed data against expected keys.
- **UI complexity:** provide inline help text and default values to reduce admin confusion.

## ⏱️ Estimated Effort
| Role | Time |
| --- | --- |
| Backend engineer | 4.5 days |
| Frontend engineer | 2 days |
| QA / Manual verification | 1 day |
| Documentation | 0.5 day |

_Total: ~8 days (fits within the 9-day allowance with contingency for migration validation)._ 
