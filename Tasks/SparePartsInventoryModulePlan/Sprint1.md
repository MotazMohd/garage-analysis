# 🧱 Sprint 1: Catalogue & Inventory Foundations

## 🎯 Sprint Goal
Establish a governed spare part master catalogue and branch-level inventory records so garages can capture accurate stock, pricing, and compatibility information from day one.

---

## 📦 Scope & Deliverables
1. **Master Data Entities & APIs**
   - Create `SparePart` entity with taxonomy, visibility (Global, Shared, Private), media links, and compatibility metadata.
   - Expose CRUD endpoints (`POST/PUT/GET/DELETE /api/spare-parts`) with validation on unique SKU + garage visibility.
   - Implement audit fields (`CreatedBy`, `UpdatedBy`, timestamps) and emit change events for data lineage.
2. **Inventory Ledger per Garage/Branch**
   - Introduce `SparePartInventory` entity capturing stock quantity, thresholds, pricing (purchase, selling, cost), and currency.
   - Build APIs to manage inventory records and branch assignments (`/api/spare-parts/{id}/inventory`).
   - Guard against negative stock adjustments and enforce threshold minimums.
3. **Excel Import & Export Tooling**
   - Provide template download with required columns (name, SKU, category, unit, quantities, prices).
   - Validate uploads for mandatory fields, duplicates, and referential integrity; surface row-level feedback.
   - Track import/export jobs with status and actor metadata for auditability.
4. **Admin UI Surfaces**
   - Create catalogue list with search (name, category, tag) and filters (visibility, tracking enabled).
   - Build create/edit forms featuring compatibility tagging (vehicle models), service linking placeholders, and media attachments.
   - Add inventory tab with stock, threshold, and pricing editors plus import/export actions.

---

## ✅ Acceptance Criteria
- [ ] New spare part records persist with taxonomy, tags, visibility, and compatibility metadata.
- [ ] Inventory entries exist per garage/branch with quantity and pricing fields; validation prevents negative stock.
- [ ] Excel imports reject invalid rows with actionable feedback and produce audit logs.
- [ ] Catalogue UI supports search/filter and inline visibility of tracking status and thresholds.
- [ ] API and UI actions are captured in audit stream for compliance review.

---

## 🔗 Dependencies & Alignment
- Authentication & RBAC module for enforcing role-based access to pricing and visibility fields.
- Existing vehicle and service reference data to populate compatibility selectors.
- Observability/metrics stack for import job monitoring.

---

## ⚠️ Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Data migration from legacy spreadsheets introduces inconsistent SKUs. | Provide pre-import validation report and optional dry-run mode. |
| Upload size may strain API gateway. | Stream processing and size limits with chunked uploads. |
| Branch-specific pricing rules unclear. | Capture override requirements in acceptance workshop before build. |

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Backend (entities, APIs, validation) | 3.5 days |
| Frontend (catalogue, forms, inventory UI) | 3 days |
| Data import/export tooling | 1.5 days |
| QA & UAT support | 1 day |

**Total:** ~9 dev days.
