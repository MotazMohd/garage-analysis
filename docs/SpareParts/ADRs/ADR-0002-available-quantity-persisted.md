# ADR-0002 — Persist AvailableQuantity for Performance
**Decision:** Persist `AvailableQuantity` and update it transactionally with reservations and consumption.  
**Rationale:** High-read dashboards require fast availability lookups.  
**Risk:** Inconsistency if updates are not atomic → mitigate with transactions and reconciliation jobs.
