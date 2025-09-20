# Spare Parts Module — UX Flows
**Version:** v1.0.0  
**Last Updated:** 2025-09-10  
**Owner:** UI/UX Team  

This file enumerates screens, states, and validation behaviors referenced by API and domain docs. Use this as a basis for wireframes.

## Pages / Screens
1. **Parts List**
   - Search by name/SKU/OEM/cross-ref
   - Filters: category, partType, flags (`GENERIC`, `API`, `IMPORTED`, `INACTIVE`)
   - Sort: name, createdAt, stock, price
   - Badges: `GENERIC`, `API`, `IMPORTED`, `INACTIVE`

2. **Part Detail**
   - Header: Name, Brand, SKU, Tags
   - **Tabs:**
     - **Overview:** metadata (Category, PartType, Generic, TrackingMode)
     - **Inventory:** per-garage stock & prices, threshold
     - **Serial/Lot:** table of SerialLotEntries
     - **Reservations:** active / history with countdown
     - **Fitment (Phase 3):** external → internal model mapping
     - **Audit (Phase 2):** created/updated info, soft delete
   - **Provenance Ribbon (if catalog-sourced):**
     - “From TecDoc · Confidence 0.86 · Last sync: 2025-09-10 · Fields: Name,Category,Attributes,Media”

3. **Create/Edit Part**
   - Core fields: Name, SKU, Category/Sub, Brand, PartType, `TrackingMode`, `IsGeneric`, Tags
   - (Phase 2) Assign Tools/Models

4. **Inventory Management**
   - List cards by garage: OnHand, Available, Selling/Purchase price, Threshold
   - Add/Edit inventory modal
   - Serial/Lot management modal (Serial: list; Lot: code+mfg+expiry+qty)

5. **Reservations**
   - Create from Part Detail or Order UI
   - Table: orderId, qty, serials/lots, expiry countdown, status
   - Actions: Consume, Cancel

6. **Catalog Assist (Phase 3)**
   - Lookup modal (OEM/SKU/Brand/Vehicle)
   - Preview drawer (attributes, fitment, images)
   - Diff/Merge dialog with per-field overwrite toggles

## Validation Behaviors (see 05-validation.md)
- Name required; SKU unique
- Reservation `qty <= Available`
- Serial uniqueness; serials must exist in Available state
- Lot cannot be used if expired
- Soft-deleted parts hidden from default listing

## Accessibility & Feedback
- Toasts/snackbars for low stock alerts, reservation expiry warnings
- Disabled actions with tooltips explaining why (e.g., “TrackingMode=Serial: add serials first”)
