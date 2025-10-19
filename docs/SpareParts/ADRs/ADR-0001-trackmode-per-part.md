# ADR-0001 — TrackingMode Per Part
**Decision:** Each part carries `TrackingMode = None|Serial|Lot|Both`.  
**Consequences:** Inventory and reservation flows validate serial/lot accordingly.  
**Alternatives:** Global-by-category default with overrides (still supported as presets).
