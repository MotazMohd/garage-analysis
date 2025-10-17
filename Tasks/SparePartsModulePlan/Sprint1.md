
# 🚀 Sprint 1: Spare Parts Module – Core & Manual CRUD

📅 **Sprint Goal**:  
Implement the foundational CRUD logic for spare parts aligned with the [GitHub analysis](https://github.com/rastaJane/garage-analysis/blob/main/docs/Identify-functional-modules/SparePartsModule.md), the current UI, and backend structure.  
Includes DB adjustments, core endpoints, request/response structures, and car model/tool assignment logic.

📌 **Reference Sections**:
- `Add/Edit Spare Part` UI
- `Car Model Selection`
- `Tools & Equipment Linking`
- `Generic Part Support`

---

## 📦 Deliverables for Sprint 1

### ✅ Domain Model Changes (Additions Only)

#### `Part` table
- Add: `IsGeneric` (bool) – supports "All Car Models" option
- Add: `IsImported` (bool) – marks Excel-created records
- Add: `IsApiFetched` (bool) – indicates TecDoc source
- Add: `GarageId` (Guid) – for multi-garage support
- Add: `IsDeleted` (bool) – soft delete flag

#### 🔧 New Tables
- `PartTool` – links parts to recommended tools (PartId, ToolId)
- `PartCarModel` – links parts to supported car models (PartId, CarModelId) if not exist

---

## 🔧 Backend Tasks

| Task | Endpoint | Ref |
|------|----------|-----|
| Update Register/Update handlers to include model/tool assignment | - | ✅ |
| Add PUT `/parts/{id}/tools` | Assign/unassign tools | 🔗 Tools & Equipment |
| Add PUT `/parts/{id}/models` | Assign/unassign car models | 🔗 Car Model Selection |
| Add GET `/parts/{id}` | View full part details | 🔗 Edit Part Form |
| Add `IsDeleted` logic in delete handler | Soft delete only | 🔗 General |

---

## 📃 Request & Response Format

### 🔸 Add/Update Part (POST/PUT /parts)
```json
{
  "name": "Air Filter",
  "categoryId": 3,
  "partTypeId": 2,
  "unitId": 1,
  "manufacturer": "BOSCH",
  "description": "Standard filter",
  "oemNumber": "OEM-123",
  "isGeneric": false,
  "toolIds": [1, 2],
  "carModelIds": [5, 6]
}
```

### 🔸 Assign Tools (PUT /parts/{id}/tools)
```json
{
  "toolIds": [1, 3, 4]
}
```

---

## 💻 Frontend Tasks

| Task | Description | Ref |
|------|-------------|-----|
| Extend Add/Edit Part Form | Add multi-selects for tools and car models | ✅ |
| Add checkbox for “Applies to all car models” | Sets `IsGeneric` | 🔗 Generic Part |
| Display part details with linked tools/models | Read-only view | 🔗 View/Preview Part |

---

## 📅 Time Estimate

| Area | Time |
|------|------|
| Backend | 12.5h |
| Frontend | 5.5h |
| DB + DTO Design | 2h |
| Testing + QA Prep | 2h |
| **Total** | **~22h** |

---

## 📋 Future Functionality Noted

📌 *To be handled in future sprints but related to this logic:*

- Support for Excel import/export (Sprint 2)
- TecDoc API fetch simulation (Sprint 2)
- Dynamic suggestions based on vehicle/service context (Sprint 3+)

---

## 🧩 Team Assignment

| Dev | Responsibility |
|-----|----------------|
| Dev A | DB + Backend API |
| Dev B | Frontend Form Enhancements |
| QA | Validate CRUD + tool/model linking |

---

## ✅ Acceptance Criteria

- [ ] Can create/update/delete a spare part
- [ ] Can assign/unassign car models and tools
- [ ] “Applies to all car models” works
- [ ] Data filtered by soft delete and garage