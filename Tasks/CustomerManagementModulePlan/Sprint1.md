# 🧑‍🤝‍🧑 Sprint 1: Customer & Vehicle Foundations

## 🎯 Sprint Goal
Launch the core Customer Management data model, CRUD experiences, and vehicle linkage so service advisors can maintain accurate customer histories from day one.

---

## ✅ Tasks Breakdown

### 1. Establish Customer Master Records
- **Data Model:**
  - `Customer`: `Id`, `FirstName`, `LastName`, `FullName`, `PrimaryPhone`, `SecondaryPhone?`, `Email`, `PreferredContactMethod`, `PreferredLanguage`, `CustomerType` (Individual, Fleet), `MarketingOptIn`, `Notes`, `CreatedAt`, `UpdatedAt`, `CreatedBy`, `UpdatedBy`, `IsActive`.
  - `CustomerAddress`: `Id`, `CustomerId`, `Type` (Billing, Home, Work, Other), `Line1`, `Line2?`, `City`, `State`, `PostalCode`, `Country`, `GeoLocation?`, `IsPrimary`.
- **UI:** Customer list with search on name/phone/email and create/edit form with validation.
- **Why:** Forms the backbone for every downstream workflow (appointments, invoicing, communications).

### 2. Capture Vehicle Profiles per Customer
- **Data Model:**
  - `Vehicle`: `Id`, `CustomerId`, `VIN`, `PlateNumber`, `Year`, `Make`, `Model`, `Trim?`, `Color`, `TransmissionType`, `FuelType`, `CurrentMileage`, `MileageUnit`, `WarrantyExpiry?`, `IsPrimary`.
  - `VehicleNote`: `Id`, `VehicleId`, `Note`, `CreatedAt`, `CreatedBy`.
- **API:** CRUD endpoints under `/api/customers/{id}/vehicles` with VIN uniqueness enforcement per customer.
- **UI:** Inline vehicle tab under customer profile with quick add/edit.
- **Why:** Associates service history and recommendations to the correct asset.

### 3. Import & Deduplicate Seed Data
- **Tasks:**
  - CSV import job for legacy customer list (name, phone, email, address, vehicle).
  - Fuzzy matching routine to detect duplicates using phone/email combos and merge suggestions queue.
  - Admin review screen for duplicate resolution with audit trail.
- **Why:** Ensures a clean migration path and prevents fragmented customer histories.

### 4. Consent & Communication Preferences
- **Tasks:**
  - Capture explicit marketing opt-in timestamp, source, and channel per customer.
  - Store service notification preferences (SMS, email, WhatsApp).
  - Expose flags in UI and restrict outbound automations when opt-in is false.
- **Why:** Keeps communications compliant with regional regulations and customer expectations.

### 5. Audit Logging & Permissions
- **Tasks:**
  - Emit domain events for customer/vehicle create, update, delete actions.
  - Integrate with existing role matrix (e.g., Advisors can edit, Technicians read-only).
  - Provide change history timeline on customer profile page.
- **Why:** Maintains traceability and enforces correct access boundaries.

---

## 📌 Acceptance Criteria
- [ ] Customer records store contact details, addresses, and preferences with validation.
- [ ] Vehicles can be attached to customers with VIN uniqueness and note history.
- [ ] Legacy import pipeline deduplicates and queues potential matches for review.
- [ ] Communication preferences gate outbound messaging when disabled.
- [ ] Audit trail captures edits with user attribution.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Backend (entities, import pipeline, permissions) | 3.0 days |
| Frontend (forms, list, duplicate review) | 2.0 days |
| QA/UAT & data validation | 1.0 day |

**Total:** ~6 dev days

---

## ✅ Sprint Outcome
- Clean, deduplicated customer master with linked vehicles.
- Teams can onboard new customers confidently and plan future visits.
- Foundation for service history, loyalty, and communications workflows.
