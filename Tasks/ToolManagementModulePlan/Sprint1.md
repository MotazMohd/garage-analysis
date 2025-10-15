# 🧰 Sprint 1: Tool Registry Foundations

## 🎯 Sprint Goal
Establish the core Tool Management data model and APIs so garages can catalog tools, classify them, and manage basic availability across branches.

---

## ✅ Tasks Breakdown

### 1. Create Core Tool Entities
- **Data Model:**
  - `Tool`: `Id`, `Name`, `Description`, `ToolType`, `Brand`, `Manufacturer`, `SerialNumber`, `PurchaseDate`, `WarrantyExpiry`, `IsCalibrated`, `CalibrationDueDate`, `IsGlobal`, `GarageId?`, `CreatedBy`, `CreatedAt`, `UpdatedAt`, `IsActive`.
  - `ToolTag`: `Id`, `Name` (global lookup managed by SaaS admins).
  - `ToolToolTag`: join table for tool-to-tag assignment.
- **Why:** Provides structured storage for critical tool metadata, enabling filtering and governance for global vs. garage-only tools.

### 2. Branch-Level Availability Tracking
- **Data Model:**
  - `ToolAvailability`: `Id`, `ToolId`, `GarageId`, `BranchId?`, `Quantity`, `Status` (Available, InUse, UnderMaintenance), `ConditionNotes`, `LastServicedAt`.
- **API:**
  - `POST /api/tools/{id}/availability` to set initial availability.
  - `PUT /api/tools/{id}/availability/{availabilityId}` to update status or quantity.
  - `GET /api/tools/{id}/availability` to list branch allocations.
- **Why:** Allows each garage to control where tools are located and whether they are usable, preparing for job card reservations later.

### 3. CRUD Endpoints & Validation
- **Endpoints:**
  - `POST /api/tools`
  - `PUT /api/tools/{id}`
  - `GET /api/tools`
  - `GET /api/tools/{id}`
  - `DELETE /api/tools/{id}` (soft delete via `IsActive` flag)
- **Validation:**
  - Enforce unique `Name + GarageId` pairs for local tools.
  - Prevent deleting tools that still have availability records unless flagged inactive.
- **Why:** Enables admins to manage the full lifecycle of tool records securely.

### 4. Tag & Classification Management
- **Endpoints:**
  - `GET /api/tool-tags`
  - `POST /api/tool-tags`
- **Frontend:**
  - Multi-select tagging component in the tool creation form.
  - Filter tools by tag and tool type in listing screen.
- **Why:** Tags unlock quick filtering (e.g., Diagnostic, Safety) and align with future automation for service matching.

### 5. Audit Trail & Activity Log Hooks
- **Tasks:**
  - Emit domain events on tool create/update/delete.
  - Store `CreatedBy`, `UpdatedBy`, `UpdatedAt`.
  - Log availability changes (status and quantity) with actor info.
- **Why:** Maintains traceability for compliance and operational reviews.

---

## 📌 Acceptance Criteria
- [ ] Tools can be created with full metadata and tags.
- [ ] Tool availability entries exist per garage/branch with status tracking.
- [ ] CRUD operations respect soft delete rules and validation constraints.
- [ ] Tag lookup endpoints support admin management and UI filtering.
- [ ] Activity logs or domain events record tool and availability changes.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Backend (entities, handlers, logging) | 2.5 days |
| API & validation | 1.5 days |
| Frontend (forms, lists, tagging) | 1.5 days |
| QA/UAT | 0.5 day |

**Total:** ~6 dev days

---

## ✅ Sprint Outcome
- Central tool registry ready for production garages.
- Visibility into where tools are located and if they are usable.
- Foundation for future reservation and maintenance workflows.
