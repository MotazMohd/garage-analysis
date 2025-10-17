# Spare Parts Management Module

## Purpose

To enable garages and SaaS administrators to manage spare parts inventory, pricing, compatibility, and associations with services. The system supports local and shared parts across garages and provides extensibility for pricing, stock control, and configuration.

---

## Entities

### SparePart

| Field              | Type         | Description                         |
| ------------------ | ------------ | ----------------------------------- |
| Id                 | uuid         | Unique identifier                   |
| Name               | string       | Part name                           |
| Description        | text         | Optional detailed info              |
| Category           | string       | Part category (e.g., Engine, Oil)   |
| Subcategory        | string       | Optional subcategory                |
| Brand              | string       | Brand name                          |
| Manufacturer       | string       | Manufacturer info                   |
| SKU                | string       | Internal code or SKU                |
| Barcode            | string?      | Optional barcode                    |
| Tags               | list<string> | Label tags for grouping             |
| PartType           | enum         | OEM, Generic, Consumable, etc.      |
| IsGlobal           | boolean      | Shared across garages or local only |
| IsTrackInventory   | boolean      | Inventory tracking enabled          |
| UnitOfMeasure      | string       | e.g., pcs, liters, boxes            |
| UnitConversion     | string?      | Optional (e.g., box = 12 pcs)       |
| CompatibleVehicles | list<string> | Supported models or categories      |
| LinkedServiceIds   | list<uuid>   | Related service templates           |
| LinkedToolIds      | list<uuid>   | Related tools (optional)            |
| Media              | list<string> | Images or datasheets                |
| Documents          | list<string> | Warranty, specs, etc.               |
| Notes              | text         | Optional garage notes               |
| CreatedBy          | UserRef      | Creator info                        |
| Visibility         | enum         | Global, Private, Shared             |
| EditableBy         | enum         | SaaSAdmin, GarageAdmin              |
| IsActive           | boolean      | Soft-delete flag                    |
| CreatedAt          | datetime     | Creation timestamp                  |

---

### SparePartInventory

| Field               | Type     | Description                       |
| ------------------- | -------- | --------------------------------- |
| Id                  | uuid     | Unique identifier                 |
| SparePartId         | uuid     | Reference to SparePart            |
| GarageId            | uuid     | Owning garage                     |
| StockQuantity       | int      | Available stock                   |
| MinThreshold        | int      | Reorder alert threshold           |
| PurchasePrice       | decimal  | Buying price                      |
| SellingPrice        | decimal  | Default sale price                |
| CostPrice           | decimal? | Optional margin tracking          |
| Currency            | string   | Currency (e.g., AED)              |
| PurchaseTaxRate     | float?   | Optional tax percentage           |
| SaleTaxRate         | float?   | Optional tax percentage           |
| AllowOverrideFields | boolean  | Can garage override global fields |
| IsEnabled           | boolean  | Active status                     |

---

## Key Features

* 🔩 Rich metadata for parts including category, type, branding
* 📦 Garage-based inventory tracking with threshold alerts
* 🔗 Service and vehicle compatibility mapping
* 🌍 Shared/global parts with override support
* 💸 Tax support on purchase/sale with optional fields
* 🗂️ Attachments, notes, and flexible tagging
* 👥 Controlled visibility, creation, and editing rights

---

## Use Cases

1. **SaaS Admin defines a shared global part** for oil filters
2. **Garage Admin imports** the shared part and adjusts price/stock
3. **Part is auto-linked** to services that require it (via templates)
4. **Stock levels decrease** as part is used in jobs
5. **Low stock alerts trigger** when below minimum threshold
6. **Garage updates media** and service compatibility locally

---

## 📈 Data Flow Diagram

- [Spare parts management data flow](../../Diagrams/DataFlow/SparePartsManagement.md) — captures authoring, localization, stock adjustments, and alerting.
- [Level 1 data flow decomposition](../../Diagrams/DataFlow/Level1/SparePartsManagement-Level1.md) — maps catalog authoring, supplier imports, garage localization, stock adjustments, and replenishment automation in sequential processes.
- [Level 2 data flow decomposition](../../Diagrams/DataFlow/Level2/SparePartsManagement-Level2.md) — follows supplier feeds, garage imports, consumption events, reservations, and automated replenishment triggers.
- [Level 3 service component flow](../../Diagrams/DataFlow/Level3/SparePartsManagement-Level3.md) — highlights catalogue curation, supplier import services, garage localisation, reservations, replenishment planning, and quality holds writing to shared inventory stores and alerts.
- [Level 4 integration workflow](../../Diagrams/DataFlow/Level4/SparePartsManagement-Level4.md) — showcases catalogue authoring, supplier ingestion, garage overrides, reservation handling, stock ledger updates, replenishment planning, quality hold decisions, and notification queues across the inventory data stores.
- [Level 5 infrastructure & observability view](../../Diagrams/DataFlow/Level5/SparePartsManagement-Level5.md) — presents ingress, catalog, supplier ingestion, localisation, stock adjustments, reservations, replenishment, quality holds, notification services, and monitoring streams powering the inventory platform.
- [Level 6 resilience & disaster recovery view](../../Diagrams/DataFlow/Level6/SparePartsManagement-Level6.md) — documents geo-redundant catalogue curation, supplier ingestion, garage imports, stock adjustments, reservations, replenishment automation, quality holds, and audit streaming with replicated ledgers and queues.

#### Data Flow Highlights
- **Catalogue governance:** SaaS administrators manage the master part catalogue and publish updates that garages can selectively import into local inventory.
- **Inventory synchronisation:** Receiving, consuming, or transferring stock keeps quantities and availability aligned with the service templates referencing those parts.
- **Replenishment triggers:** Low-stock thresholds emit notifications and audit entries so restocking tasks remain visible to operations teams.

---

## ERD (Entity Relationship Diagram)

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
  IsGlobal boolean
  IsTrackInventory boolean
  UnitOfMeasure varchar
  UnitConversion varchar
  CompatibleVehicles text
  LinkedServiceIds text
  LinkedToolIds text
  Media text
  Documents text
  Notes text
  CreatedBy uuid
  Visibility varchar
  EditableBy varchar
  IsActive boolean
  CreatedAt datetime
}

Table SparePartInventories {
  Id uuid [pk]
  SparePartId uuid [ref: > SpareParts.Id]
  GarageId uuid
  StockQuantity int
  MinThreshold int
  PurchasePrice decimal
  SellingPrice decimal
  CostPrice decimal
  Currency varchar
  PurchaseTaxRate float
  SaleTaxRate float
  AllowOverrideFields boolean
  IsEnabled boolean
}
```

---

## To Be Added Later

* Versioning support
* Part ordering & supplier management
* Part bundles/kits support
* Low stock report scheduling
