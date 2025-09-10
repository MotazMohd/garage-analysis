# Spare Parts Module — Validation
**Version:** v1.0.0  
**Last Updated:** 2025-09-10  
**Owner:** QA Team  

## General (SparePart)
- `Name` required (min length 2).
- `SKU` unique (per tenant or per garage policy).
- `Category` required.
- `TrackingMode` must be one of `None|Serial|Lot|Both`.

## Inventory
- `SellingPrice >= 0`, `PurchasePrice >= 0`.
- `MinThreshold >= 0`.
- Persisted `AvailableQuantity` must always equal `OnHand - ActiveReservations` after operations (transactionally enforced).

## Serial / Lot
- Serial numbers unique within inventory; status must be `Available` before reserving or selling.
- Lot must have `quantity >= requested` and not be expired (`ExpiryDate` optional, policy-driven).
- When `TrackingMode=Serial`, reservation must specify exact serial numbers.
- When `TrackingMode=Lot`, reservation must specify a valid lot code.

## Reservations
- `quantity <= AvailableQuantity` at create time.
- Transition rules: `Active -> Consumed|Cancelled|Expired` only.
- Auto-expiry releases availability without touching OnHand.

## Catalog (Phase 3)
- Lookup requires `oem` or `sku` (brand optional).
- Materialize requires valid article; Merge requires explicit overwrite rules.
- Confidence threshold defaults to 0.75 (configurable).

## Error Codes (shared)
- `NOT_ENOUGH_STOCK`, `RESERVATION_EXPIRED`, `SERIAL_NOT_FOUND_OR_TAKEN`, `LOT_EXPIRED_OR_INSUFFICIENT`, `INVALID_TRACKING_MODE`, `CATALOG_LOOKUP_RATE_LIMITED`, `CATALOG_MERGE_CONFLICT`.
