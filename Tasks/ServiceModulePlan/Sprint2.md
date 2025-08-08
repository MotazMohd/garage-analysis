
# 🔧 Sprint 2: Extend Model — Parts, Skills, Tools, Pre-check

## 🎯 Sprint Goal
Extend the Service module by adding technician skill requirements, tool dependencies, and pre-check logic. These additions prepare the system to support conditional flows, technician matching, and smart diagnostics behavior.

---

## ✅ Tasks Breakdown with Data Model, Endpoints, Frontend, and Explanations

### 1. Add TechnicianSkillTag and Link to Service

**Data Model:**
- Create `TechnicianSkillTag` table: `Id`, `Name`
- Many-to-many relationship between `Service` and `TechnicianSkillTag`

**Frontend:**
- Multi-select dropdown in the Service form to choose technician skill tags

**Why:** Real garages assign services to technicians based on skills like “Electrical”, “Engine Specialist”. This enables proper filtering, role-based service creation, and future auto-assignment logic.

---

### 2. Add GarageTool and Link to Service

**Data Model:**
- Create `GarageTool` table: `Id`, `Name`
- Many-to-many between `Service` and `GarageTool`

**Frontend:**
- Multi-select tool selector in the service creation form

**Why:** Some services require specific tools like OBD Scanner or Lift. Defining this allows tool planning, inventory control, and prevents service mismatch.

---

### 3. Implement Pre-check Requirements

**Data Model:**
- In `Service`:
  - `bool RequiresPreCheck`
  - `Guid? PreCheckServiceId` (nullable FK to another service)

**Frontend:**
- In create/edit form, allow selecting a Pre-check service if `RequiresPreCheck = true`

**Why:** Some services should only be allowed after an inspection. This logic allows defining pre-check dependencies that the booking or technician flow will later respect.

---

### 4. Recommended Parts Logic

**Data Model:**
- Create `RecommendedPart` table: `Id`, `ServiceId`, `PartId`, `Rule` (optional JSON or string logic)

**Frontend:**
- In service form, allow admin to tag parts as recommended (not linked directly)

**Why:** Suggesting parts based on mileage or service type improves upsell, customer care, and proactive maintenance recommendations.

---

### 5. Update Service Endpoints and DTOs

**Endpoints to Update:**
- `GET /api/services`
- `GET /api/services/{id}`
- `POST /api/services`
- `PUT /api/services/{id}`

**Update Fields:**
- Include TechnicianSkills, GarageTools, RequiresPreCheck, PreCheckServiceId, and RecommendedParts

**Why:** These must be persisted and exposed via APIs for both admin and customer use in later sprints.

---

### 6. Frontend Integration

- Show skill tags and tool tags as multi-selects in service creation UI
- Allow toggle for “Requires Pre-check” and selector for Pre-check service
- UI section for linking recommended parts

**Why:** These fields must be managed easily by garage admins to ensure correct service setup.

---

## 📌 Acceptance Criteria

- [ ] Technician skills are linked to services and saved via API
- [ ] Garage tools are linked similarly and editable via UI
- [ ] Pre-check logic is toggleable and conditionally linked
- [ ] Recommended parts can be created and viewed
- [ ] All changes are persisted and shown in service details (GET endpoint)
- [ ] Frontend reflects all new fields correctly

---

## ⏱️ Estimated Time

| Area | Time |
|------|------|
| Backend (Model + Logic + Mapping) | 3 days |
| Frontend (Form updates + validations) | 1.5 days |
| QA/UAT | 0.5 day |

**Total:** ~6 dev days

---

## ✅ Sprint Outcome

- Extended service model supports technician role mapping, tool requirements, and pre-check dependencies
- Enables better service planning and prepares for booking workflows and technician auto-assignment in later phases