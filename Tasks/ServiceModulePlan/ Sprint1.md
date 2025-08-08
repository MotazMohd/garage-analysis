
# 🚀 Sprint 1: Core Refactor + Cleanup - Service Module

## 🎯 Sprint Goal
Refactor the existing Service model and APIs to align with real garage workflows by introducing lookup references, categories, and flexible part behavior. This prepares the system for future enhancements like conditional logic, technician assignment, and smart booking flows.

---

## ✅ Tasks Breakdown with Data Model, Endpoints, Frontend, and Explanations

### 1. Replace `PricingType` and `ServiceType` with Lookup Tables

**Data Model:**
- Create `PricingType` table with fields: `Id`, `Name`
- Create `ServiceType` table with fields: `Id`, `Name`
- In `Service` entity:
  - Add: `int PricingTypeId`, `PricingType PricingType`
  - Add: `int ServiceTypeId`, `ServiceType ServiceType`

**Endpoints:**
- `GET /api/lookups/pricing-types`
- `GET /api/lookups/service-types`

**Frontend:**
- Replace hardcoded dropdowns with dynamic values from new endpoints

**Why:** Enums are not flexible for SaaS or multi-garage systems. Using lookup tables allows dynamic filtering, localization, and user management in the future.

---

### 2. Add `ServiceCategory` Table and Link to Service

**Data Model:**
- Create `ServiceCategory` table:
  - `Id`, `Name`, `Code`, `IsCustomerVisible`, `AllowsAddons`
- In `Service` entity:
  - Add: `int CategoryId`, `ServiceCategory Category`

**Endpoints:**
- `GET /api/lookups/service-categories`

**Frontend:**
- Add Service Category dropdown in create/edit service forms

**Why:** Categorization improves usability for garage admins and customers by enabling filtering and grouping of services. It's also critical for analytics and booking UX.

---

### 3. Refactor `ServicePart` Join Table

**Data Model Enhancements (in `ServicePart`):**
- `bool IsRequired`
- `bool IsOptional`
- `bool IsLocked`
- `bool AllowCustomerProvided`
- `bool IsBasedOnPreCheck`
- `decimal DefaultQuantity`
- `bool IsQuantityAdjustable`

**Frontend:**
- In the part selector inside service creation/edit UI:
  - Show checkboxes/switches for each of the above flags

**Why:** This allows flexibility in how parts behave. Some parts are mandatory but removable, others are optional. Techs may override quantities after inspection. These rules mimic real garage logic and improve service customization.

---

### 4. Update Service Endpoints and DTOs

**Affected Endpoints:**
- `POST /api/services`
- `PUT /api/services/{id}`
- `GET /api/services`
- `GET /api/services/{id}`

**DTO Changes:**
- Accept and return: `PricingTypeId`, `ServiceTypeId`, `CategoryId`
- Accept and return: all new `ServicePart` fields

**Why:** All new model logic must be reflected in the API to maintain consistency. Ensures frontend and backend stay in sync.

---

### 5. Audit & Cleanup Existing Logic

**Task:**
- Review all service-related command/handler logic
- Refactor mapping and validation
- Remove unused or obsolete logic

**Why:** Prevent regressions and ensure that new model structure flows correctly from API to DB.

---

### 6. Seed Default Data

**Task:**
- Add DB seeding logic for:
  - `PricingTypes`: "Fixed", "Per Hour"
  - `ServiceTypes`: "Major", "Minor"
  - `ServiceCategories`: "Cleaning", "Diagnostics", "Fluid", etc.

**Why:** Seed data is necessary for UI to function properly and to allow admin users to test or filter services from the start.

---

### 7. Migrate Existing Service Records

**Task:**
- Assign default values (e.g. category = "Uncategorized") to existing services

**Why:** Prevents crashes or missing data during transition. Supports backward compatibility.

---


## 📌 Acceptance Criteria

- [ ] Services must use `PricingType`, `ServiceType`, and `Category` as lookups
- [ ] Admin can select these via dropdowns in the UI
- [ ] All `ServicePart` behavior flags are visible in UI and saved correctly
- [ ] All endpoints reflect updated fields and behavior
- [ ] Seed data is available on a fresh DB setup
- [ ] Old service records do not break after deployment
- [ ] Devs understand and follow documentation on how and why to use new fields

---

## ⏱️ Estimated Time

| Area | Time |
|------|------|
| Backend (Model + Logic + Mapping) | 3 days |
| Frontend (Form updates + flags UI) | 1 day |
| QA/UAT + Manual testing | 0.5 day |
| Documentation + Migration | 0.5 day |

**Total:** ~9 dev days

---

## ✅ Sprint Outcome

- A flexible and real-world-ready service model
- Extensible structure for parts and categorization
- Clean API and frontend integration
- Ready to support advanced features in Sprint 2
