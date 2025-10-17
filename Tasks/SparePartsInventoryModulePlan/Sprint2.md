# 🔄 Sprint 2: Procurement & Usage Operations

## 🎯 Sprint Goal
Extend the spare parts platform to support replenishment workflows, service/job consumption, and governance controls so managers can balance availability with cost.

---

## 📦 Scope & Deliverables
1. **Supplier & Purchase Order Hooks**
   - Add supplier reference fields to `SparePartInventory` (supplierId, lastPurchaseOrderId, lead time).
   - Integrate with Purchase Orders module to sync received quantities and landed cost.
   - Surface purchase history tab per part with filters by supplier and branch.
2. **Service & Job Card Integration**
   - Link parts to service templates and recommended tool sets for technician guidance.
   - Provide reservation API for job cards to decrement "reserved" quantity distinct from on-hand stock.
   - Show usage timeline and assignment context within the job card UI.
3. **Controls & Approvals**
   - Configure approval rules for expensive parts, imported stock, or low-threshold overrides.
   - Create alerting engine for low stock, expiring warranty, and calibration-required tools tied to parts.
   - Add branch allocation matrix to limit which locations can consume global/shared parts.
4. **Operational Dashboards**
   - Build dashboard widgets for stock aging, fast/slow movers, and open approvals.
   - Provide exportable reports for finance (valuation) and operations (threshold breaches).

---

## ✅ Acceptance Criteria
- [ ] Purchase orders update inventory quantities, landed cost, and supplier history automatically.
- [ ] Services and job cards surface recommended parts with reservation capabilities and decrement reserved stock.
- [ ] Approval workflows block issuance until authorized and capture decision audit trails.
- [ ] Low-stock and warranty alerts trigger notifications and appear in operational dashboard widgets.
- [ ] Branch allocation rules prevent unauthorized consumption and are configurable per part.

---

## 🔗 Dependencies & Alignment
- Purchase Orders module for supplier data, order lifecycle, and receiving events.
- Job Cards module for reservation endpoints and assignment context.
- Notification service to deliver alerts to managers and procurement leads.

---

## ⚠️ Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Over-reservation causing artificial shortages. | Implement reservation expiry and reconciliation job. |
| Approval matrix complexity delays roll-out. | Start with templated rules (price > X, imported) and extend iteratively. |
| Dashboard performance issues. | Precompute aggregates nightly and cache results with invalidation on updates. |

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Backend (integrations, reservations, approvals) | 4 days |
| Frontend (dashboards, job card surfaces) | 3 days |
| Notifications & automation | 1.5 days |
| QA & UAT | 1 day |

**Total:** ~9.5 dev days.
