
# 🚀 Sprint 2: Spare Parts Module – Excel Import/Export & TecDoc Lookup

📅 **Sprint Goal**:  
Implement bulk part management via Excel and prepare simulation flow for TecDoc part lookup based on SKU/OEM.  
This sprint focuses on integration workflows and extensibility for API-based enrichment.

📌 **Reference Sections**:
- `Excel Import/Export` – https://github.com/rastaJane/garage-analysis/blob/main/docs/Identify-functional-modules/SparePartsModule.md#excel-import--export
- `TecDoc Integration (Simulation)` – https://github.com/rastaJane/garage-analysis/blob/main/docs/Identify-functional-modules/SparePartsModule.md#tecdoc-api-lookup

---

## 📦 Deliverables for Sprint 2

### ✅ Backend Logic

| Task | Endpoint | Ref |
|------|----------|-----|
| Add POST `/parts/import-excel` | Upload Excel file and validate | 🔗 Excel Import |
| Add GET `/parts/export-excel` | Export filtered part list | 🔗 Excel Export |
| Add POST `/parts/fetch-from-api` | Simulate TecDoc part enrichment | 🔗 TecDoc |
| Add `HasTecDocSubscription` flag to Garage table | Required for conditional lookup | 🔗 TecDoc |

---

### ✅ Data Model Changes (Additions Only) , don't implemented just we consider it in our plan

#### `Garage` table
- Add: `HasTecDocSubscription` (bool)  => it can be hardcoded for now untill we finish our subsribe plan flow

---

### 📃 File Format & Payload

#### 🔸 Excel Import – Expected Columns
| Column | Required | Notes |
|--------|----------|-------|
| Name | ✅ | Part name |
| OEM | ❌ | Optional OEM number |
| SKU | ❌ | Optional SKU code |
| Category | ✅ | Must match existing category |
| Type | ✅ | Must match existing part type |
| PurchasePrice | ✅ | Numeric |
| SalesPrice | ✅ | Numeric |
| StockQuantity | ✅ | Integer |
| IsGeneric | ✅ | Boolean, true for "all models" |

📎 Expected format: `.xlsx` (template will be provided in app UI)

---

### 💻 Frontend Tasks

| Task | Description |
|------|-------------|
| Excel Import Page | Upload with drag-drop + validation error preview |
| Excel Export Button | Trigger filtered download |
| TecDoc Lookup Form | Input for OEM/SKU → simulate part data lookup |
| Autofill Name/Category/Type | Pre-fill UI after TecDoc match (if subscribed) |

---

### 📋 Future Functionality Tracked

📌 Will be built in later sprints:
- Live TecDoc API key support
- Re-import Excel with update mode
- File version tracking

---

### 📅 Time Estimate

| Area | Time |
|------|------|
| Backend | 9h |
| Frontend | 7h |
| Excel Parsing Logic | 2h |
| QA + Integration Testing | 2h |
| **Total** | **~20h** |


## ✅ Acceptance Criteria

- [ ] Import supports valid `.xlsx` format with validation
- [ ] Parts are created and linked to garage
- [ ] Export returns correct filtered data
- [ ] If garage has TecDoc subscription, part can be auto-filled