
# 🚗 Spare Parts Module — Functional Milestone Plan (Based on Existing Code)

## 🔍 Objective:
Extend and complete the existing scalable Spare Parts module by enabling full workflows: manual part management, Excel import/export, car model & tool assignment, and future-ready TecDoc support.

---

## ✅ M1: Core Enhancements to Existing Domain
Build on the already defined `Part` model and payload structure.

### Tasks:
- Ensure `Part` supports:
  - Main name (required) and alternate display names
  - `IsGeneric` flag (applies to all car models)
  - Optional: `GarageId` for multi-tenancy (if not already used)
- Add mapping between `Part` and:
  - `CarModel` (`PartCarModel`)
  - `Tools` (`PartTool`)
- Add API flags:
  - `IsImported` (Excel)
  - `IsApiFetched` (TecDoc)
  - `IsDeleted` (soft delete)

---

## ✅ M2: Manual Part CRUD (Already Partially Done)
Add functional workflows for admins and garage owners.

### Tasks:
- `RegisterPartCommand` → already implemented
- `UpdatePartCommand` → ensure car model/tool assignment is included
- `DeletePartCommand` → ensure soft delete flag is respected
- Extend controller to support:
  - `GET /parts/{id}` → with assigned tools/models
  - `PUT /parts/{id}/tools` → assign/unassign tools
  - `PUT /parts/{id}/models` → assign/unassign car models

---

## ✅ M3: Search & Listing (Already Exists)
Use `GetPartsQuery` with minor enhancements.

### Tasks:
- Pagination and search already supported
- Allow filtering by:
  - `CategoryId`, `PartTypeId`
  - `IsGeneric` (Generic vs. Specific)
  - `GarageId` (if applicable)
  - `IsApiFetched`, `IsImported`
- Add sorting (optional): by name, creation date, stock level

---

## ✅ M4: Excel Import & Export
Allow bulk creation and editing via Excel.

### Tasks:
- Define required columns:
  - `Name`, `OEM`, `SKU`, `Category`, `Type`, `Stock`, `Prices`, `IsGeneric`
- Build import API:
  - Validate required fields
  - Assign imported parts to garage based on authenticated user
  - Return errors per row
- Build export API:
  - Download all or filtered part list as Excel

💡 This should respect roles: Admin vs. Garage owner.

---

## ✅ M5: TecDoc API Integration (Scenario-Based)
Simulated for now, future integration ready.

### Tasks:
- Add flag in `Garage` table: `HasTecDocSubscription`
- Simulate part lookup by SKU/OEM:
  - If garage is subscribed, return filled name/type/category
  - Else, return error or empty
- Add `POST /parts/fetch-from-api` with `sku/oem` input

---

## ✅ M6: Tool/Equipment Support
Enable dynamic part-to-tool assignment.

### Tasks:
- Add many-to-many mapping: `PartTool`
- Create `GET /tools` and `POST /parts/{id}/tools` APIs
- On technician side (not now), show required tools based on part in service

---

## 📦 Additional Considerations

| Topic | Notes |
|-------|-------|
| **Roles** | Only Admin or Garage Owner can manage parts |
| **Audit** | `CreatedBy`, `UpdatedBy`, `GarageId` can be used |
| **Soft Delete** | `IsDeleted` respected in all queries |
| **Filters** | Reuse `GetPartsQuery` and extend to cover new needs |

---

## 📋 Summary of Developer Task Buckets

| Task Area | Developer | Notes |
|-----------|-----------|-------|
| Manual Part CRUD + Tool Linking | Dev A | Extend controller + handler logic |
| Excel Import/Export | Dev B | Define DTOs, validate rows |
| Car Model Assignment | Dev A | Add many-to-many table + UI support |
| TecDoc API Simulation | Dev B | Build conditional logic for simulation |

---

## 🧩 Developer Task Plan: Spare Parts Module (Grouped + Estimated)

### 🔧 Backend Tasks

| Task | Details | Estimate |
|------|---------|----------|
| Extend `Part` entity with `IsGeneric`, `IsImported`, `IsApiFetched`, `GarageId` | Required for Excel & TecDoc | 2h |
| Add `PartCarModel` table | Many-to-many | 2h |
| Add `PartTool` table | Many-to-many | 2h |
| Update `Register/UpdatePartCommandHandler` to accept model/tool IDs | Enrich logic with linked tables | 2.5h |
| Add soft delete logic to `DeletePartCommandHandler` | Use `IsDeleted` flag | 1h |
| Add filtering to `GetPartsQueryHandler` by category, type, generic flag | Extend existing logic | 2h |
| Create handlers for assigning tools and car models (`AssignToolsToPartCommand`, `AssignModelsToPartCommand`) | Separate command handlers | 3h |

**Subtotal (Backend): ~14.5 hours**

---

### 🧑‍💻 API Layer

| Task | Endpoint | Estimate |
|------|----------|----------|
| POST /parts/{id}/tools | Assign tools to part | 1.5h |
| POST /parts/{id}/models | Assign car models to part | 1.5h |
| POST /parts/import-excel | Excel upload endpoint | 2.5h |
| GET /parts/export-excel | Excel export API | 2h |
| POST /parts/fetch-from-api | Simulate TecDoc lookup | 1.5h |

**Subtotal (API): ~9 hours**

---

### 💻 Frontend (React/Dashboard or Blazor)

| Task | Details | Estimate |
|------|---------|----------|
| Extend add/edit part form to include: model list, tool list, “Generic” checkbox | Update UI + bind | 3.5h |
| Excel Import page | File upload + error display | 2.5h |
| Excel Export button | Download button with filters | 1.5h |
| TecDoc Lookup UI (OEM/SKU input, button, auto-fill name/type) | Simulated result | 2h |
| Display assigned car models + tools in part detail view | Read-only view | 2h |

**Subtotal (Frontend): ~11.5 hours**

---

### 🔗 Integration / Misc

| Task | Details | Estimate |
|------|---------|----------|
| Add Excel parser (e.g., EPPlus/NPOI) | Backend helper class | 2.5h |
| Simulated TecDoc service (local lookup mock) | Future-proofing | 2h |
| Add logging + error handling (optional) | Middleware or per handler | 1.5h |

**Subtotal (Integration): ~6 hours**

---

## ⏱️ Final Estimate: 41 hours total

| Area | Time |
|------|------|
| Backend | 14.5h |
| API | 9h |
| Frontend | 11.5h |
| Integration | 6h |