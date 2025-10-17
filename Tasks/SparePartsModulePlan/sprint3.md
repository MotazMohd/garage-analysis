
# 🚀 Sprint 3: Spare Parts Module – Final Touches, Tool Linking & Filters

📅 **Sprint Goal**:  
Complete Spare Parts module by adding car model + tool assignments, UI enhancements (badges/filters), and prepare data for technician-side tool visibility.

📌 **Reference Sections**:
- [Tool Assignment & Usage](https://github.com/rastaJane/garage-analysis/blob/main/docs/Identify-functional-modules/SparePartsModule.md#tool--equipment)
- [Part Listing Filters](https://github.com/rastaJane/garage-analysis/blob/main/docs/Identify-functional-modules/SparePartsModule.md#search--listing)
- Internal sprint planning discussions

---

## 🧩 Key Deliverables

### ✅ Backend Tasks

| Task | Endpoint |
|------|----------|
| Add many-to-many relation: PartTool |  |
| Add GET `/tools` | To support UI tool selection |
| Add PUT `/parts/{id}/tools` | Assign/unassign tools |
| Add PUT `/parts/{id}/models` | Assign/unassign car models |
| Update `GetPartsQuery` | Include filters: Category, Type, Generic, Imported, GarageId, etc. |
| Update `Part` DTO | Include `IsImported`, `IsApiFetched`, `IsDeleted`, `ToolIds[]`, `CarModelIds[]` |

---

### ✅ UI Enhancements

| UI View | Description |
|---------|-------------|
| 🆕 `Part Details` | Read-only view of part with tools & car models |
| 🆕 `Assign Tools Modal` | Multiselect or checkboxes to assign tools |
| 🆕 `Assign Car Models Modal` | Similar to tools, linked to vehicle models |
| ✅ `Parts Listing Filters` | Category, Generic, Imported, etc. |
| ✅ `Badges/Tags in Table` | Show visual indicators for: Imported / From API / Deleted |
| ✅ `Part Delete Soft Mark` | Instead of remove, use soft delete visually |
| 🔜 Technician View (Future) | Tool visibility during service (next sprint) |

---

### ✅ Functional Notes

- Tools and models are optional but can be added anytime
- Technicians will **see tools later**, not in this sprint
- All new filters should persist via query params
- Tag color scheme: 
  - Imported → Blue
  - From API → Green
  - Deleted → Red (strike-through optional)

---

## 📅 Time Estimate

| Area | Time |
|------|------|
| Backend | 10h |
| Frontend (UI Tasks) | 12h |
| QA + Testing | 3h |
| **Total** | **~25h** |

---

## ✅ Acceptance Criteria

- [ ] Tools and car models can be assigned/unassigned to parts
- [ ] Tags for "Imported", "From API", "Deleted" show correctly
- [ ] Filters work across UI and are reflected in query logic
- [ ] Part Detail view works and is accessible