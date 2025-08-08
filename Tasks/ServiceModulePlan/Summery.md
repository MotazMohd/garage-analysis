
# 🛠️ Garage SaaS - Service Module Epic Plan

## 🎯 Epic Overview
This epic refactors and extends the Service module to align with real-world garage workflows, supporting flexible part management, technician and tool requirements, customer visibility, and pre-check logic.

---

# 🚀 Sprint 1: Core Refactor + Cleanup

## 🎯 Sprint Goal
Refactor the existing Service model and APIs to introduce structured types and prepare the system for more flexible service configurations.

## ✅ Tasks Breakdown

### 1. Replace `PricingType` and `ServiceType` with Lookup Tables

- **Data Model:**
  - Table: `PricingType` → `Id`, `Name`
  - Table: `ServiceType` → `Id`, `Name`
  - Add `PricingTypeId`, `ServiceTypeId` to `Service`

- **Endpoints:**
  - `GET /api/lookups/pricing-types`
  - `GET /api/lookups/service-types`

- **Frontend:**
  - Use dropdowns in create/edit service form

- **Why:** Replaces hardcoded enums with extensible DB-driven options for flexibility and localization.

---

### 2. Add `ServiceCategory` Table and Link to Service

- **Data Model:**
  - Table: `ServiceCategory` → `Id`, `Name`, `Code`, `IsCustomerVisible`, `AllowsAddons`
  - Add `CategoryId` to `Service`

- **Endpoints:**
  - `GET /api/lookups/service-categories`

- **Frontend:**
  - Add dropdown to Service form to select category

- **Why:** Enables admin/customer filtering and proper grouping of services in the system.

---

### 3. Refactor `ServicePart` Join Table

- **Data Model Additions:**
  - `IsRequired` (bool)
  - `IsOptional` (bool)
  - `IsLocked` (bool)
  - `AllowCustomerProvided` (bool)
  - `IsBasedOnPreCheck` (bool)
  - `DefaultQuantity` (decimal)
  - `IsQuantityAdjustable` (bool)

- **Frontend:**
  - Show part flags as toggles in the part selector

- **Why:** Gives full control over how each part is handled during booking and technician execution.

---

### 4. Update Service Endpoints and DTOs

- **Affected Endpoints:**
  - `POST /api/services`
  - `PUT /api/services/{id}`
  - `GET /api/services`
  - `GET /api/services/{id}`

- **Update DTOs to support:** `PricingTypeId`, `ServiceTypeId`, `CategoryId`, and all part behavior fields.

- **Why:** Allows consistent read/write of all new logic.

---

### 5. Audit & Cleanup

- Review service command handlers, mapping logic, validations.
- Ensure old logic is removed or adapted to the new structure.

---

### 6. Seed Default Data

- Seed categories, pricing types, and service types.

- **Why:** So UI and logic can work with pre-configured options.

---

### 7. Migrate Existing Services

- Apply default values for legacy services (category/type).

- **Why:** Prevent breaking old data and ensure smooth upgrade.

---

### 8. Documentation for Devs

- Explain why each flag is needed in `ServicePart`
- When to use `IsLocked`, `IsOptional`, etc.

---

## ⏱️ Estimated Time: ~9 dev days

---

# 🔧 Sprint 2: Extend Model — Parts, Skills, Tools, Pre-check

## 🎯 Sprint Goal
Introduce technician skills, garage tools, and pre-check logic to support conditional workflows and future automation.

## ✅ Tasks Breakdown

### 1. Technician Skill Tags

- **Data Model:**
  - `TechnicianSkillTag` → `Id`, `Name`
  - Many-to-many with `Service`
  - Many-to-many with `Technician` (future)

- **Frontend:**
  - Multi-select dropdown in Service form

- **Why:** Enables filtering, technician matching, and clearer service roles.

---

### 2. Garage Tools

- **Data Model:**
  - `GarageTool` → `Id`, `Name`
  - Many-to-many with `Service`

- **Frontend:**
  - Multi-select in create/edit Service

- **Why:** Ensures proper planning for tools and technician assignment.

---

### 3. Pre-check Logic

- **Data Model Additions:**
  - `RequiresPreCheck` (bool)
  - `PreCheckServiceId` (nullable Guid FK to Service)

- **Why:** Allows control of which services require inspection before booking.

---

### 4. Recommended Parts

- **Data Model:** `RecommendedPart` → `Id`, `ServiceId`, `PartId`, `Rule`
- Display as smart suggestions in UI

- **Why:** Enables upselling and better maintenance advice to customers.

---

### 5. Update All Affected Endpoints

- Ensure `POST/PUT /api/services` supports all new fields
- Include skill/tool/pre-check info in `GET /api/services`

---

## ⏱️ Estimated Time: ~6 dev days

---

# 🎨 Sprint 3: Customer Logic + UX Enhancements

## 🎯 Sprint Goal
Finalize customer-facing fields, behavior flags, and frontend interactions for optional, locked, and smart part display.

## ✅ Tasks Breakdown

### 1. Customer Visibility Fields

- **Data Model Additions in Service:**
  - `IsCustomerVisible` (bool)
  - `CanBeBookedDirectly` (bool)
  - `IsAddOn` (bool)
  - `RequiresApproval` (bool)
  - `DisplayOrder` (int?)

- **Frontend:**
  - Add toggles in admin UI

- **Why:** Allows control over what services are visible or bookable for customers.

---

### 2. Customer Part Selection UX

- Show required/optional/locked parts as checkboxes
- Allow removing optional parts, lock critical ones

- **Why:** Improves transparency, booking flexibility, and inventory planning.

---

### 3. Recommended Part UI

- Show smart part suggestions based on rules/mileage/history

- **Why:** Adds upsell and maintenance value for garage + customer.

---

### 4. Filters & Final Polish

- Filter services by category in customer app
- Sort by popularity, category, etc.

---

## ⏱️ Estimated Time: ~8 dev days

---

# 🟢 Total Epic Estimate
- 3 Sprints (Core, Model Extensions, Customer Logic)
- ~23 dev days total (backend + frontend)