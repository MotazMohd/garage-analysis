# Spare Parts Module — API Contracts
**Version:** v1.0.0  
**Last Updated:** 2025-09-10  
**Owner:** API Team  

This document enumerates REST endpoints with request/response shapes, validation notes, and references back to the Domain Model and UX flows.

## Conventions
- All endpoints are **scoped by Garage** through auth or explicit payload/route.
- Timestamps are ISO-8601.
- Error format:
```json
{ "code": "NOT_ENOUGH_STOCK", "message": "Insufficient available quantity", "details": { "requested": 3, "available": 1 } }
```

---
## 1) Parts (CRUD & Search) — relates to 01-domain-model.md §SparePart; 03-ux-flows.md
### POST /parts
**Body (example):**
```json
{
  "name": "Oil Filter 5K",
  "sku": "OF-5K-001",
  "category": "Engine",
  "subcategory": "Filters",
  "brand": "Bosch",
  "isGeneric": true,
  "trackingMode": "None",
  "tags": ["filter","oil"]
}
```
**Responses:**
- 201 Created → `{ id, ... }`
- 400 ValidationError

### PUT /parts/{partId}
- Update any mutable field (not historical audit).

### DELETE /parts/{partId}
- Soft delete → `IsActive=false`.

### GET /parts/{partId}
- Full details incl. flags `IsImported`, `IsApiFetched`.

### GET /parts
**Query params:** `query, category, partType, isGeneric, isApiFetched, isImported, sort, page, size`
- Sort: `name|createdAt|stock|price` (asc/desc).

### PUT /parts/{partId}/tools  (Phase 2)
```json
{ "add": ["uuid1","uuid2"], "remove": ["uuid3"] }
```
### PUT /parts/{partId}/models (Phase 2)
```json
{ "add": ["uuidCar1"], "remove": [] }
```

---
## 2) Inventory — relates to 01-domain-model.md §SparePartInventory; 03-ux-flows.md
### POST /parts/{partId}/inventory
**Body:**
```json
{
  "garageId": "uuid",
  "onHandQuantity": 120,
  "sellingPrice": 45.00,
  "purchasePrice": 28.25,
  "currency": "SAR",
  "minThreshold": 10
}
```
- Upserts per (part, garage).

### PUT /inventory/{inventoryId}
- Update prices, threshold, enable/disable.

### GET /inventory
- Filter by `garageId`, `partId`.

### GET /inventory/{inventoryId}
- Includes Serial/Lot entries if tracking enabled.

#### Serial/Lot Entries
##### POST /inventory/{inventoryId}/serial-lots
Serial example:
```json
{ "items": [{ "serialNumber": "SN123" }, { "serialNumber": "SN124" }] }
```
Lot example:
```json
{ "lotCode": "LOT-2025-09", "mfgDate": "2025-08-01", "expiryDate": "2026-08-01", "quantity": 50 }
```
##### DELETE /serial-lots/{entryId}
- Only if Status is not Reserved/Sold.

---
## 3) Reservations — relates to 01-domain-model.md §SparePartReservation; 04.2 lifecycle
### POST /reservations
```json
{
  "garageId": "uuid",
  "partId": "uuid",
  "customerOrderId": "uuid",
  "quantity": 2,
  "trackingNumbers": ["SN123","SN124"],
  "expireInMinutes": 120
}
```
- Validates `AvailableQuantity` and TrackingMode specifics.

### PUT /reservations/{reservationId}/consume
Optional body:
```json
{ "consumePoint": "CONFIRMATION" }
```
- Updates OnHand; marks serial/lot as Sold.

### PUT /reservations/{reservationId}/cancel
- Releases availability.

### GET /reservations
- Filter by `garageId`, `status` (Active).

---
## 4) Catalog / TecDoc (Phase 3) — see 08-catalog-tecdoc.md
### POST /catalog/lookup
**Body:** `{ "oem": "XYZ123", "sku": "OF-5K-001", "brand": "Bosch", "vehicleKey": "KTYPE-123" }`
**Response:** candidates array with confidence scores.

### GET /catalog/articles/{source}/{articleId}
- Normalized article preview.

### POST /catalog/materialize
**Body:** `{ "source": "TecDoc", "articleId": "12345", "mergeStrategy": "CreateNew" }`
- Or `"MergeIntoExisting", "existingPartId": "uuid"` → returns diff.

### POST /catalog/merge/confirm
- Apply chosen diff with overwrite rules.

### POST /parts/{partId}/catalog/sync`
- Pull latest; mark `Outdated` or present diff.

### GET /parts/{partId}/catalog/audit`
- Provenance history (fields mask, version hash, timestamps, actor).

---
## Error Codes (shared; see 05-validation.md)
- `NOT_ENOUGH_STOCK`
- `RESERVATION_EXPIRED`
- `SERIAL_NOT_FOUND_OR_TAKEN`
- `LOT_EXPIRED_OR_INSUFFICIENT`
- `INVALID_TRACKING_MODE`
- `CATALOG_LOOKUP_RATE_LIMITED`
- `CATALOG_MERGE_CONFLICT`
