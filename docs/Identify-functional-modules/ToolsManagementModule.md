# Tools Management Module

## Purpose

To enable garages and SaaS administrators to manage tools inventory, types, compatibility with services, and tool availability across branches. Tools may be required in specific service steps and optionally tracked per garage.

---

## Entities

### Tool

| Field              | Type         | Description                              |
| ------------------ | ------------ | ---------------------------------------- |
| Id                 | uuid         | Unique identifier                        |
| Name               | string       | Tool name                                |
| Description        | text         | Optional description                     |
| ToolType           | enum         | e.g., Diagnostic, Mechanical, Electrical |
| Brand              | string       | Brand name                               |
| Manufacturer       | string       | Manufacturer info                        |
| Tags               | list<string> | Optional tags                            |
| CompatibleVehicles | list<string> | Vehicle models supported                 |
| LinkedServiceIds   | list<uuid>   | Services this tool supports              |
| LinkedPartIds      | list<uuid>   | Optional part links                      |
| Media              | list<string> | Images, videos, manuals                  |
| Documents          | list<string> | Warranties, certifications               |
| IsGlobal           | boolean      | Shared globally or local only            |
| Visibility         | enum         | Public, Private, Shared                  |
| EditableBy         | enum         | SaaSAdmin, GarageAdmin                   |
| CreatedBy          | UserRef      | Creator info                             |
| IsActive           | boolean      | Deactivation flag                        |
| CreatedAt          | datetime     | Timestamp                                |

---

### ToolAvailability

| Field               | Type    | Description                        |
| ------------------- | ------- | ---------------------------------- |
| Id                  | uuid    | Unique ID                          |
| ToolId              | uuid    | Tool reference                     |
| GarageId            | uuid    | Owning garage                      |
| BranchId            | uuid?   | Optional branch reference          |
| Quantity            | int     | Quantity available                 |
| Status              | enum    | Available, InUse, UnderMaintenance |
| AllowOverrideFields | boolean | Garage-level customization         |
| IsEnabled           | boolean | Flag for use                       |

---

## Key Features

* 🧰 Full metadata for tool definitions
* 🔧 Tool-to-service and tool-to-part linkage
* 🌐 Global vs local visibility
* 📍 Availability tracking by garage/branch
* 🧪 Tagging and documentation support
* 🧑‍🔧 Access control by creator or admin scope

---

## Use Cases

1. **SaaS Admin defines a global tool** (e.g., Torque Wrench)
2. **Garage imports and sets local quantity** and availability status
3. **Tool is linked to service templates** that require it
4. **Availability changes** based on job card assignment
5. **Tools under maintenance** marked unavailable temporarily
6. **Garage adds extra media/manuals** to help technicians

---

## 📈 Data Flow Diagram

- [Tools management data flow](../../Diagrams/DataFlow/ToolsManagement.md) — illustrates cataloging, local availability, job usage, and maintenance feedback.
- [Level 1 data flow decomposition](../../Diagrams/DataFlow/Level1/ToolsManagement-Level1.md) — sequences catalog authoring, garage imports, availability planning, technician checkout, and maintenance cycles.
- [Level 2 data flow decomposition](../../Diagrams/DataFlow/Level2/ToolsManagement-Level2.md) — expands tool curation, garage imports, availability planning, technician checkout, and maintenance scheduling with audit logging.
- [Level 3 service component flow](../../Diagrams/DataFlow/Level3/ToolsManagement-Level3.md) — visualises tool curation, importers, calibration schedulers, reservation services, technician checkout, maintenance logging, and availability sync writing into shared registries and alert queues.
- [Level 4 integration workflow](../../Diagrams/DataFlow/Level4/ToolsManagement-Level4.md) — covers tool registry updates, calibration scheduling, availability planning, checkout/return flows, preventive maintenance, external integrations, and notification dispatching over the tool stores.
- [Level 5 infrastructure & observability view](../../Diagrams/DataFlow/Level5/ToolsManagement-Level5.md) — illustrates tool catalog, calibration, availability planning, checkout, maintenance logging, telemetry ingestion, notification hubs, partner integrations, and monitoring pipelines safeguarding tool readiness.
- [Level 6 resilience & disaster recovery view](../../Diagrams/DataFlow/Level6/ToolsManagement-Level6.md) — depicts geo-redundant tool cataloguing, imports, availability planning, checkout, maintenance, telemetry, compliance monitoring, and audit streaming with mirrored stores and queues.
- [Level 7 security, compliance & assurance view](../../Diagrams/DataFlow/Level7/ToolsManagement-Level7.md) — covers governance policies, calibration standards, telemetry analysis, safety inspections, supplier audits, and alert desks safeguarding tool usage.
- [Level 8 continuous improvement & analytics view](../../Diagrams/DataFlow/Level8/ToolsManagement-Level8.md) — highlights utilisation analytics, predictive maintenance, and safety programmes driving scheduling, maintenance, and awareness improvements.

#### Data Flow Highlights
- **Catalogue creation:** SaaS or garage admins register tools in the shared catalogue and optionally import them into local inventories.
- **Operational allocation:** Service template linkages reserve tools, update availability, and surface conflicts when equipment is double-booked.
- **Maintenance telemetry:** Usage and condition feedback raise alerts and enrich audit history so calibration and repairs can be scheduled proactively.

---

## ERD (Entity Relationship Diagram)

```dbml
Table Tools {
  Id uuid [pk]
  Name varchar
  Description text
  ToolType varchar
  Brand varchar
  Manufacturer varchar
  Tags text
  CompatibleVehicles text
  LinkedServiceIds text
  LinkedPartIds text
  Media text
  Documents text
  IsGlobal boolean
  Visibility varchar
  EditableBy varchar
  CreatedBy uuid
  IsActive boolean
  CreatedAt datetime
}

Table ToolAvailabilities {
  Id uuid [pk]
  ToolId uuid [ref: > Tools.Id]
  GarageId uuid
  BranchId uuid
  Quantity int
  Status varchar
  AllowOverrideFields boolean
  IsEnabled boolean
}
```

---

## To Be Added Later

* Tool maintenance history
* Assignment & return logs
* QR code and scanning support
