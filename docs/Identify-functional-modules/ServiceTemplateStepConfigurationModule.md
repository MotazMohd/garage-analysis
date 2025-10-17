# Service Template & Step Configuration Module

## Purpose

To define reusable service templates that consist of customizable step templates. These templates streamline job card creation and technician task assignment across garages, while supporting both global and garage-specific configurations.

---

## Entities

### ServiceTemplate

| Field                | Type          | Description                           |
| -------------------- | ------------- | ------------------------------------- |
| Id                   | uuid          | Unique identifier                     |
| Name                 | string        | Service name                          |
| Description          | text          | Optional long description             |
| Category             | enum          | Mechanical, Electrical, Hybrid, etc.  |
| ServiceType          | enum          | Maintenance, Repair, Inspection, etc. |
| EstimatedDuration    | int           | In minutes                            |
| RequiredSkills       | list<enum>    | Mechanic, Electrician, Assistant      |
| SupportedVehicles    | list<string>  | Vehicle models or categories          |
| SupportedMarkets     | list<string>  | e.g., UAE, GCC, etc.                  |
| DefaultParts         | list<PartRef> | Optional linked parts                 |
| DefaultTools         | list<ToolRef> | Optional linked tools                 |
| Media                | list<string>  | Images or videos                      |
| Instructions         | rich text     | Human-readable documentation          |
| DocumentsRequired    | list<string>  | Optional list of required documents   |
| PricingMode          | enum          | Fixed, Hourly, PerStep                |
| ConfigurableByGarage | boolean       | Can be overridden per garage          |
| Visibility           | enum          | Public, Private, Draft                |
| IsActive             | boolean       | Service active or archived            |
| CreatedBy            | UserRef       | SaaS Admin or Garage Admin            |
| IsReusable           | boolean       | Can be applied in multiple jobs       |
| IsVersioned          | boolean       | Future feature support                |
| ParentTemplateId     | uuid?         | For cloned templates                  |

---

### ServiceStepTemplate

| Field                | Type          | Description                            |
| -------------------- | ------------- | -------------------------------------- |
| Id                   | uuid          | Unique identifier                      |
| ServiceTemplateId    | uuid          | Reference to parent template           |
| StepName             | string        | Name of the step                       |
| Description          | text          | Optional description                   |
| OrderIndex           | int?          | Step order within service              |
| GroupId              | string?       | For parallel phase grouping            |
| RequiredSkill        | enum          | Mechanic, Assistant, Electrician, etc. |
| EstimatedTime        | int           | In minutes                             |
| IsOptional           | boolean       | Whether step can be skipped            |
| RequiredParts        | list<PartRef> | Optional                               |
| RequiredTools        | list<ToolRef> | Optional                               |
| AssignedTo           | Role?         | Default technician role                |
| ConfigurableByGarage | boolean       | Override allowed by garage             |
| RequiresAssistant    | boolean       | If assistant must participate          |

#### Step Validations

| Field              | Type         | Description                   |
| ------------------ | ------------ | ----------------------------- |
| RequiresPhoto      | boolean      | Must upload image proof       |
| RequiresChecklist  | list<string> | Must complete checklist items |
| RequiresFormUpload | boolean      | File submission required      |
| RequiresApproval   | enum         | By Lead, Customer, or Admin   |
| RequiresSignature  | boolean      | e-sign or draw signature      |
| EnforcedBy         | list<enum>   | SaaSAdmin, GarageAdmin        |

---

## Step Execution Rules

### Status Lifecycle

Each step can move through the following states:

* `Pending`
* `InProgress`
* `Paused`
* `Completed`
* `Skipped`
* `Failed`

### Completion Requirements

A step cannot be marked as `Completed` unless:

* All validations are fulfilled (e.g., photo, checklist)
* It is executed by a user with `RequiredSkill`
* Assistants alone cannot complete steps
* Lead technicians can override and complete when necessary

### Partial Completion Support

* Multiple contributors can work on a step
* Each logs time spent, validation items
* Final technician (or lead) confirms completion

### Audit Per Action

Each user interaction (`start`, `pause`, `complete`, etc.) logs:

* `UserId`
* `Timestamp`
* `DeviceType`
* `GPSLocation`

No comments are required at this stage.

---

## Spare Part Reference (Integrated with Service Template)

### PartRef Fields

* `PartId` (uuid)
* `QuantityRequired`
* `TrackingMode`: `None`, `Batch`, or `Serial`
* `IsOptional`: boolean
* `AllowSharedStock`: boolean (garage can opt to use external stock)
* `UnitConversion`: { PurchaseUnit, SellUnit, ConversionRate }
* `TaxPurchase` / `TaxSell`: optional percentages

Stock and sharing logic is managed centrally in the inventory module but integrated here for default configuration.

---

## Key Features

* 🔁 Reusable service templates for job automation
* 🔧 Skill-based step requirements for technician routing
* 🛠️ Default parts and tools linking with batch/serial/unit conversion
* 🧠 Rich documentation (media, instructions)
* ⚙️ Configurable by garage (if allowed)
* ✅ Validation & control logic for each step
* ⏩ Parallel step phases with dependencies
* 🔐 Visibility modes and template ownership
* 🧩 Partial execution by assistants and technicians
* 📍 Step-level status tracking and audit trail

---

## Use Cases

1. **Create a service template** by SaaS Admin (e.g., Full Oil Change)
2. **Garage clones the template**, customizes steps and skill requirements
3. **Technicians receive job tasks** auto-generated based on template
4. **Assistants perform support steps** (e.g., disassembly)
5. **Step validations enforced**, including photos, forms, checklists
6. **Steps executed in order or in parallel** by required skilled workers
7. **Job completion recorded and linked** to customer & invoice

---

## 📈 Data Flow Diagram

- [Service template configuration data flow](../../Diagrams/DataFlow/ServiceTemplateConfiguration.md) — outlines how master templates, garage overrides, and job generation exchange data.
- [Level 1 data flow decomposition](../../Diagrams/DataFlow/Level1/ServiceTemplateConfiguration-Level1.md) — details authoring, localization, resource binding, execution orchestration, and exception handling phases.
- [Level 2 data flow decomposition](../../Diagrams/DataFlow/Level2/ServiceTemplateConfiguration-Level2.md) — clarifies authoring, versioning, garage-level overrides, resource binding, and publishing into the job engine.
- [Level 3 service component flow](../../Diagrams/DataFlow/Level3/ServiceTemplateConfiguration-Level3.md) — maps the template studio, version control, publishing APIs, validation engine, resource binding, and job step resolver working together through shared stores and audit logs.
- [Level 4 integration workflow](../../Diagrams/DataFlow/Level4/ServiceTemplateConfiguration-Level4.md) — illustrates authoring APIs, version control, validation engines, localisation overrides, resource binding, publishing gateways, auditing, and notification hubs coordinating with the execution engine.
- [Level 5 infrastructure & observability view](../../Diagrams/DataFlow/Level5/ServiceTemplateConfiguration-Level5.md) — captures authoring portals, version control, validation pipelines, localisation services, resource binding, publishing, notification hubs, and observability instrumentation collaborating with external catalogues and execution engines.

#### Data Flow Highlights
- **Template authoring:** SaaS administrators curate the global catalogue, persisting master metadata and default step definitions for downstream tenants.
- **Local tailoring:** Garage operators clone templates, adjust step requirements, and persist overrides that govern branch-specific execution rules.
- **Execution hand-off:** Job card creation resolves overrides, reserves parts and tools, and streams progress updates into audit tracking.

---

## ERD (Entity Relationship Diagram)

```dbml
Table ServiceTemplates {
  Id uuid [pk]
  Name varchar
  Description text
  Category varchar
  ServiceType varchar
  EstimatedDuration int
  RequiredSkills text
  SupportedVehicles text
  SupportedMarkets text
  DefaultParts text
  DefaultTools text
  Media text
  Instructions text
  DocumentsRequired text
  PricingMode varchar
  ConfigurableByGarage boolean
  Visibility varchar
  IsActive boolean
  CreatedBy uuid
  IsReusable boolean
  IsVersioned boolean
  ParentTemplateId uuid
}

Table ServiceStepTemplates {
  Id uuid [pk]
  ServiceTemplateId uuid [ref: > ServiceTemplates.Id]
  StepName varchar
  Description text
  OrderIndex int
  GroupId varchar
  RequiredSkill varchar
  EstimatedTime int
  IsOptional boolean
  RequiredParts text
  RequiredTools text
  AssignedTo varchar
  ConfigurableByGarage boolean
  RequiresAssistant boolean
}

Table StepValidations {
  Id uuid [pk]
  ServiceStepTemplateId uuid [ref: > ServiceStepTemplates.Id]
  RequiresPhoto boolean
  RequiresChecklist text
  RequiresFormUpload boolean
  RequiresApproval varchar
  RequiresSignature boolean
  EnforcedBy text
}

Table StepAuditLogs {
  Id uuid [pk]
  ServiceStepTemplateId uuid [ref: > ServiceStepTemplates.Id]
  UserId uuid
  Timestamp datetime
  DeviceType varchar
  GPSLocation varchar
  StepStatus varchar
}
```


Here's the code to visualize the relationship between ServiceTemplate, Garage, and JobCard — showing how services are defined, customized, and used in jobs:

classDiagram
    class ServiceTemplate {
        +uuid Id
        +string Name
        +string Description
        +enum Category
        +enum ServiceType
        +bool ConfigurableByGarage
        +bool IsReusable
        +bool IsVersioned
    }

    class Garage {
        +uuid Id
        +string Name
        +string Country
        +string City
    }

    class GarageServiceTemplate {
        +uuid Id
        +uuid GarageId
        +uuid ParentTemplateId
        +string Name
        +bool IsCustomized
    }

    class JobCard {
        +uuid Id
        +uuid GarageId
        +uuid ServiceTemplateId
        +uuid VehicleId
        +datetime CreatedAt
        +enum Status
    }

    ServiceTemplate <|-- GarageServiceTemplate : cloned as
    Garage --> GarageServiceTemplate : owns
    Garage --> JobCard : creates
    GarageServiceTemplate --> JobCard : used for


---

## To Be Added Later

* Template versioning (with backward compatibility)
* Draft vs Published lifecycle
* Marketplace for sharing public templates
* Multi-language translation keys for all templates and steps
* SaaS-side template library export/import
