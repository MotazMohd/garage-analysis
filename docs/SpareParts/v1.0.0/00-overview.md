# Spare Parts Module — Overview
**Version:** v1.0.0  
**Last Updated:** 2025-09-10  
**Owner:** Analysis Team  

## Purpose
The Spare Parts Module enables garages to manage their parts catalog, inventory, pricing, reservations, and serial/lot tracking in a centralized way. It is implementation-ready and modular for later extensions (Excel import/export, TecDoc integration, promotions).

## Scope
- **In-scope (Phase 1):** Parts CRUD, Inventory, Serial/Lot, Reservations, Jobs for auto-expiry.
- **Phase 2:** Excel import/export, Tools & Car Models mapping, Audit & soft delete enforcement.
- **Phase 3:** Catalog (TecDoc) lookup, materialize/merge, sync & provenance, fitment mapping.
- **Phase 4:** Tiered pricing, contract pricing, promotions, bundles/kits, multi-warehouse/bins.

## Audience
- **Analysts:** Business rules & lifecycle, cross-module boundaries.
- **Developers (BE/FE):** Entities, APIs, jobs, validations, UI flows.
- **UI/UX:** Screens, states (badges/ribbons), diff/merge flows for catalog.
- **QA:** Validation matrix, error codes, E2E flows.
- **Ops:** Jobs, config flags, alerts.

## Non-Goals (Handled later or by other modules)
- Purchasing workflows (suppliers, GRN, invoices).
- Service-module job logic (we expose stock/consume APIs only).
- Advanced promotions/discount engines.
- Multi-warehouse logistics (future).

## Cross-Module Notes
- **Currency:** SAR (Saudi Riyal).
- **Inventory model:** Per-Garage (single location), centralized stock.
- **Tracking:** Per-part `TrackingMode = None | Serial | Lot | Both`.
- **Stock lifecycle:** Reservations with auto-expiry; consumption points configurable (confirmation / job start / completion).

## References
- See **01-domain-model.md** (entities/ERD/rules), **02-api-contracts.md** (API specs), **03-ux-flows.md** (screens), **08-catalog-tecdoc.md** (external catalog).
