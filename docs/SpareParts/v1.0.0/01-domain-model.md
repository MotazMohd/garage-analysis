# Spare Parts Module — Domain Model
**Version:** v1.0.0  
**Last Updated:** 2025-09-10  
**Owner:** Backend Team  

This document defines entities, relationships, invariants, and state rules. It synthesizes your original notes with added clarity (TrackingMode, Reservations, Serial/Lot lifecycles, Provenance for Catalog) so analysts and devs share the same mental model.

## Roles & Permissions (Summary — see 04-permissions.md)
- **SaaS Admin:** Global parts, catalog keys, view all garages.
- **Garage Owner:** CRUD parts & inventory for their garage.
- **Technician:** View, create/consume reservations.
- **Accountant:** Read pricing, export inventory.
All operations are scoped by `GarageId`.

## Core Concepts
- **SparePart:** Product definition (metadata, classification).
- **SparePartInventory:** Per-garage stock, pricing, thresholds.
- **TrackingMode:** `None | Serial | Lot | Both` per part.
- **SerialLotEntry:** Serialized item or lot record.
- **Reservation:** Temporary hold against AvailableQuantity; auto-expires.
- **AvailableQuantity:** `OnHand - ActiveReservations`.
- **Consume:** Permanently decrease OnHand (sale/job usage).

## Entities (Tables)

### SparePart
- `Id (uuid)`
- `Name (string, required)`
- `Description (text?)`
- `Category (string)` / `Subcategory (string?)`
- `Brand (string?)` / `Manufacturer (string?)`
- `SKU (string unique within tenant?)`
- `Barcode (string?)`
- `Tags (string[])`
- `PartType (enum: OEM|Generic|Consumable|Other)`
- `IsGeneric (bool)` — available across any car model
- `TrackingMode (enum: None|Serial|Lot|Both)`
- `IsGlobal (bool)` — shared across garages
- `IsActive (bool)` — soft delete
- `CreatedBy (uuid)` / `CreatedAt (datetime)` / `UpdatedAt (datetime)`

**Phase 2 flags & audit:**
- `IsImported (bool)` — Excel
- `IsApiFetched (bool)` — Catalog/TecDoc
- `GarageId (uuid?)` — owner if not global
- Audit: `CreatedBy`, `UpdatedBy`, `UpdatedAt`

**Phase 3 catalog provenance:**
- `ExternalCatalogSource (enum: None|TecDoc|Manufacturer|Other)`
- `ExternalCatalogPartId (string?)`
- `ExternalCatalogBrandId (string?)`
- `ExternalCatalogLastSyncedAt (datetime?)`
- `ExternalCatalogConfidence (float?)`
- `ExternalCatalogFieldsMask (string)` — comma list of catalog-sourced fields

### SparePartInventory
- `Id (uuid)`
- `SparePartId (uuid FK)`
- `GarageId (uuid FK)`
- `OnHandQuantity (int)` — physical
- `AvailableQuantity (int)` — performance helper
- `MinThreshold (int)`
- `PurchasePrice (decimal)`
- `SellingPrice (decimal)` — per garage
- `Currency (string)` — SAR
- `AllowOverrideFields (bool)`
- `IsEnabled (bool)`
- `UpdatedAt (datetime)`

### SerialLotEntry
- `Id (uuid)`
- `SparePartInventoryId (uuid FK)`
- `SerialNumber (string?)` — unique per unit in Serial mode
- `LotCode (string?)`
- `MfgDate (datetime?)`
- `ExpiryDate (datetime?)`
- `Quantity (int)` — lot quantity; serial items use 1
- `Status (enum: Available|Reserved|Sold|Expired)`
- `UpdatedAt (datetime)`

### SparePartReservation
- `Id (uuid)`
- `SparePartId (uuid FK)`
- `GarageId (uuid FK)`
- `CustomerOrderId (uuid)` — job/order reference
- `Quantity (int)`
- `TrackingNumbers (string[])` — serials or lot codes
- `Status (enum: Active|Consumed|Expired|Cancelled)`
- `ExpiryAt (datetime)`
- `CreatedBy (uuid)` / `CreatedAt (datetime)` / `UpdatedAt (datetime)`

### Mapping (Phase 2)
- `PartCarModel(Id, PartId, CarModelId)`
- `PartTool(Id, PartId, ToolId)`

### Catalog Integration (Phase 3)
**ExternalCatalogMapping**
- `Id (uuid)`
- `PartId (uuid)`
- `Source (enum)` — TecDoc etc.
- `SourcePartId (string)`
- `SourceBrandId (string?)`
- `VersionHash (string)`
- `SyncStatus (enum: Mapped|Outdated|Conflict|Unmapped)`
- `CreatedAt/UpdatedAt`

**ExternalFitment**
- `Id (uuid)`
- `PartId (uuid)`
- `ExternalVehicleKey (string)` — e.g., TecDoc KType
- `OurCarModelId (uuid?)`
- `Attributes (json)` — year range, engine, body
- `Confidence (float)` / `IsVerified (bool)`

**ExternalCrossRef**
- `Id (uuid)`
- `PartId (uuid)`
- `ReferenceType (enum: OEM|Aftermarket)`
- `ReferenceCode (string)`
- `Brand (string?)`
- `IsPrimary (bool)`

## ERD (DBML)
```dbml
Table SpareParts {
  Id uuid [pk]
  Name varchar
  Description text
  Category varchar
  Subcategory varchar
  Brand varchar
  Manufacturer varchar
  SKU varchar
  Barcode varchar
  Tags text
  PartType varchar
  IsGeneric bool
  TrackingMode varchar
  IsGlobal bool
  IsActive bool
  IsImported bool
  IsApiFetched bool
  GarageId uuid
  ExternalCatalogSource varchar
  ExternalCatalogPartId varchar
  ExternalCatalogBrandId varchar
  ExternalCatalogLastSyncedAt datetime
  ExternalCatalogConfidence float
  ExternalCatalogFieldsMask varchar
  CreatedBy uuid
  CreatedAt datetime
  UpdatedAt datetime
}

Table SparePartInventories {
  Id uuid [pk]
  SparePartId uuid [ref: > SpareParts.Id]
  GarageId uuid
  OnHandQuantity int
  AvailableQuantity int
  MinThreshold int
  PurchasePrice decimal
  SellingPrice decimal
  Currency varchar
  AllowOverrideFields bool
  IsEnabled bool
  UpdatedAt datetime
}

Table SerialLotEntries {
  Id uuid [pk]
  SparePartInventoryId uuid [ref: > SparePartInventories.Id]
  SerialNumber varchar
  LotCode varchar
  MfgDate datetime
  ExpiryDate datetime
  Quantity int
  Status varchar
  UpdatedAt datetime
}

Table SparePartReservations {
  Id uuid [pk]
  SparePartId uuid [ref: > SpareParts.Id]
  GarageId uuid
  CustomerOrderId uuid
  Quantity int
  TrackingNumbers text
  Status varchar
  ExpiryAt datetime
  CreatedBy uuid
  CreatedAt datetime
  UpdatedAt datetime
}

Table PartCarModels {
  Id uuid [pk]
  PartId uuid [ref: > SpareParts.Id]
  CarModelId uuid
}

Table PartTools {
  Id uuid [pk]
  PartId uuid [ref: > SpareParts.Id]
  ToolId uuid
}

Table ExternalCatalogMappings {
  Id uuid [pk]
  PartId uuid [ref: > SpareParts.Id]
  Source varchar
  SourcePartId varchar
  SourceBrandId varchar
  VersionHash varchar
  SyncStatus varchar
  CreatedAt datetime
  UpdatedAt datetime
}

Table ExternalFitments {
  Id uuid [pk]
  PartId uuid [ref: > SpareParts.Id]
  ExternalVehicleKey varchar
  OurCarModelId uuid
  Attributes text
  Confidence float
  IsVerified bool
}

Table ExternalCrossRefs {
  Id uuid [pk]
  PartId uuid [ref: > SpareParts.Id]
  ReferenceType varchar
  ReferenceCode varchar
  Brand varchar
  IsPrimary bool
}
```

## Invariants & Rules (link to 05-validation.md)
- `AvailableQuantity = OnHand - sum(Active reservations)`.
- Serial must be unique within its inventory.
- Lot cannot be consumed if expired (warning/blocked per policy).
- Soft-deleted parts (`IsActive=false`) are excluded from searches.
