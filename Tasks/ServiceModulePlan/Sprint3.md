
# 🎨 Sprint 3: Customer Logic + UX Enhancements - Service Module

## 🎯 Sprint Goal
Finalize the Service module by implementing customer-facing visibility flags, booking behavior, and frontend enhancements for part selection, filtering, and smart suggestions.

---

## ✅ Tasks Breakdown with Data Model, Endpoints, Frontend, and Explanations

### 1. Add Customer Visibility & Behavior Flags

**Data Model Additions in `Service`:**
- `bool IsCustomerVisible`
- `bool CanBeBookedDirectly`
- `bool IsAddOn`
- `bool RequiresApproval`
- `int? DisplayOrder`

**Frontend:**
- Admin form: add toggles and dropdowns for the above fields

**Why:** These flags determine how services appear to the customer and in which scenarios. Some services should be hidden, others shown as add-ons, and some require manual approval.

---

### 2. Implement Customer Part Selection Logic

**Frontend Tasks:**
- Display service parts as checkboxes:
  - `Required` parts are selected and locked (unless `AllowCustomerProvided` is true)
  - `Optional` parts are shown and can be toggled
  - `Locked` parts cannot be deselected

**Why:** This improves customer experience, allows choice, and reflects real garage operations like "bring your own part" or "remove optional filters".

---

### 3. Display Recommended Parts in Booking UI

**Frontend Tasks:**
- Show recommended parts as a separate suggestion section when a service is selected
- Allow customer to add them via checkbox

**Why:** Recommended parts create upsell opportunities and improve maintenance advice during service selection.

---

### 4. Filter Services by Category (Customer App)

**Frontend Tasks:**
- Add category filter in service listing screen
- Use `ServiceCategory` data to group services visually or as a filter dropdown

**Why:** Helps customers easily find services they need and improves usability.

---

### 5. Sort Services by Display Order

**Frontend Tasks:**
- Sort service list using `DisplayOrder` value (if provided)
- Fallback to default sort by `Name`

**Why:** Garage admins may want to control how services appear in listings (e.g., prioritize high-value services).

---

### 6. API Adjustments (if needed)

**Endpoints:**
- Ensure `GET /api/services` supports filtering by:
  - `CategoryId`
  - `IsCustomerVisible = true`
- Ensure response includes:
  - All visibility flags
  - Sorted results using `DisplayOrder`

**Why:** Enables the customer frontend to consume service data in a filtered, sorted, and optimized format.

---

## 📌 Acceptance Criteria

- [ ] Visibility fields are editable from the admin UI
- [ ] Customer booking flow reflects part behavior correctly (required/optional/locked)
- [ ] Recommended parts appear and can be added to cart
- [ ] Services are filtered and sorted on customer app
- [ ] Endpoints reflect visibility logic and sorting behavior

---

## ⏱️ Estimated Time

| Area | Time |
|------|------|
| Backend (Filters + Display logic) | 1.5 days |
| Frontend (UX + checkboxes + filters) | 2 days |
| QA/UAT + Testing | 0.5 day |

**Total:** ~8 dev days

---

## ✅ Sprint Outcome

- Customer UI now fully reflects all logic of the service module
- Supports optional parts, locked parts, smart suggestions, and visibility control
- Ready for use in real-world booking scenarios and expansion into packages
