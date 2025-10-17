# Step 2: Identify Core Functional Modules

## 🔧 Module 1: Garage & Branch Management

This module handles the creation, configuration, and access control for garages and their branches within the SaaS system.

---

### 🏢 Garage Creation Fields

| Field                   | Required | Notes                                                              |
|------------------------|----------|--------------------------------------------------------------------|
| Garage Name            | ✅ Yes   | Unique per tenant                                                  |
| Trade License Number   | ✅ Yes   | Can be validated if needed                                         |
| Country & City         | ✅ Yes   | Preselected from user IP, editable at creation                     |
| Service Types Supported| ✅ Yes   | Must choose at least one                                           |
| Working Hours          | ✅ Yes   | Per-day time ranges (e.g., Sat–Thu, 8am–6pm)                        |
| Logo                   | ❌ Optional | Used for receipts/branding                                       |
| Branding Color         | ❌ Optional | UI theming per tenant                                            |
| Phone / WhatsApp       | ❌ Optional | For contact and customer access                                 |
| Email                  | ❌ Optional | Defaults from user if not provided                               |
| Garage Description     | ❌ Optional | Visible in booking/customer portal                               |
| Garage Type            | ❌ Optional | e.g., Independent, Franchise, Chain Head                         |
| Google Maps Pin        | ❌ Optional | For mobile maps & customer search                                |
| Garage Tags/Categories | ❌ Optional | e.g., Bodywork, Electrical, Tuning, Quick Service                |
| Document Uploads       | ❌ Optional | Trade license, permits, insurance                                |
| Service Radius (KM)    | ❌ Optional | For towing, pickup, roadside support                             |

---

### ✅ Garage Activation Workflow

- New garages are created with status `Pending`
- SaaS Admin must approve before activation
- Admin may:
  - Review license and documents
  - Review location and contact
  - Review services
  - Accept or reject with a reason
- Garage can have statuses: `Pending`, `Active`, `Suspended`, `Archived`
- Suspension and Archiving managed by SaaS Admin
- Audit trail stored for all actions

---

### 👥 Multi-Admin Support

- Multiple admins allowed per garage
- One **Primary Owner** (initial creator) with override access
- Admins can:
  - Invite users
  - Assign roles
  - Manage all settings within permission limits
- Invited roles have scoped access by role and branch

---

### 🏬 Branch Management & Inheritance

| Field                       | Inherited from Garage | Editable Per Branch |
|----------------------------|------------------------|----------------------|
| Location (Address, City)   | ❌ No                  | ✅ Yes               |
| Google Maps Pin            | ❌ No                  | ✅ Yes               |
| Working Hours              | ✅ Yes                 | ✅ Yes               |
| Service Types              | ✅ Yes                 | ✅ Yes               |
| Contact Info               | ✅ Yes                 | ✅ Yes               |
| Logo & Branding            | ✅ Yes                 | ✅ Optional override |
| Branch Description         | ❌ N/A                 | ✅ Yes               |
| Service Radius (KM)        | ✅ Yes                 | ✅ Yes               |
| Document Uploads           | ❌ Optional            | ✅ Optional override |

---

### 🔒 Staff Visibility Configuration

- **Controlled by SaaS Admin and Garage Admin**
- Options:
  - Users belong to a single branch only
  - Users can be shared across multiple branches
- Each user account stores:
  - `primaryBranchId`
  - `allowedBranchIds[]` (if cross-branch enabled)

---

### 🧩 Custom Fields per Garage

- Garage Admin can define custom fields for:
  - Garage details
  - Branch metadata
  - Staff registration
- Field types:
  - Text, number, dropdown, checkbox, file upload
- Fields can be:
  - Required or optional
  - Visible or internal
  - Validated (e.g., pattern, max length)
- SaaS platform can offer preloaded country/city templates

---

### 📝 Change Log / Audit History

- Every major update is audit-logged:
  - Working hours, service types, branch creation
  - Ownership transfer or status changes
  - Document uploads or removals
- Viewable by:
  - SaaS Admin
  - Primary Owner
  - Auditors (read-only role)

---

### 📈 Data Flow Diagram

- [Garage & Branch Management data flow](../../Diagrams/DataFlow/GarageBranchManagement.md) — visualizes onboarding, approval, branch inheritance, and audit logging across the service.
- [Level 1 data flow decomposition](../../Diagrams/DataFlow/Level1/GarageBranchManagement-Level1.md) — expands the lifecycle into numbered processes for intake, decisioning, branch configuration, access control, and ongoing governance.
- [Level 2 data flow decomposition](../../Diagrams/DataFlow/Level2/GarageBranchManagement-Level2.md) — drills into onboarding, compliance review, branch setup, and staff visibility actions writing to the shared stores and audit ledger.
- [Level 3 service component flow](../../Diagrams/DataFlow/Level3/GarageBranchManagement-Level3.md) — shows the intake portals, compliance desks, lifecycle controllers, and provisioning services interacting with applications, branches, staff directories, and audit stores.
- [Level 4 integration workflow](../../Diagrams/DataFlow/Level4/GarageBranchManagement-Level4.md) — details onboarding intake, document classification, compliance decisions, branch configuration, staff provisioning, and lifecycle enforcement against the platform stores and notification channels.
- [Level 5 infrastructure & observability view](../../Diagrams/DataFlow/Level5/GarageBranchManagement-Level5.md) — maps ingress routing, service mesh sidecars, intake services, document classifiers, risk scoring, compliance desks, lifecycle managers, branch configurators, staff access managers, and observability hooks coordinating through the governance data stores.
- [Level 6 resilience & disaster recovery view](../../Diagrams/DataFlow/Level6/GarageBranchManagement-Level6.md) — highlights geo-redundant onboarding, compliance, branch configuration, staff provisioning, and audit streaming with replicated stores and automated failover runbooks.

#### Data Flow Highlights
- **Registration intake:** Garage admins submit onboarding data and document uploads through the portal, which the service stages in the garages store and mirrors to the audit log for traceability.
- **Approval decisions:** SaaS administrators process pending garages, applying approval or rejection outcomes that update tenant records, notify stakeholders, and append lifecycle entries to the audit trail.
- **Branch lifecycle:** Branch creation executes inheritance rules, captures overrides, synchronises staff visibility, and records each change for compliance reporting.

✅ This completes the extended and finalized configuration for the **Garage & Branch Management module**.



## ✅ Final Review Checklist: Garage & Branch Management

### 1. Garage Creation & Registration
- [x] Required fields: name, license, country, city, service types, working hours
- [x] Optional fields: logo, branding, phone, email, description
- [x] Google Maps pin
- [x] Tags or categories
- [x] Document uploads (trade license, insurance, etc.)
- [x] Service radius in kilometers
- [x] Garage type (independent, franchise, etc.)

---

### 2. Approval & Lifecycle
- [x] Admin approval before activation
- [x] Status flow: `Pending` → `Active` → `Suspended` → `Archived`
- [x] Rejection reason with notification
- [x] Ability to reinstate suspended garages

---

### 3. Branches
- [x] Branch creation with inheritance from garage
- [x] Location (city/address) required per branch
- [x] Maps pin per branch
- [x] Branch-level override for:
  - Working hours
  - Service types
  - Contact info
  - Branding/logo
  - Radius and documents

---

### 4. User Access & Roles
- [x] Multi-admin support
- [x] Primary owner is persistent and cannot be deleted
- [x] Ability to invite staff with:
  - Role
  - Branch
- [x] Configurable staff visibility:
  - Single-branch only
  - Multi-branch (if enabled by SaaS or Garage Admin)

---

### 5. Customization
- [x] Custom fields for:
  - Garage
  - Branch
  - Staff registration
- [x] Support for:
  - Text, number, dropdown, checkbox, file upload
  - Required/optional logic
  - Visibility control
  - Validation (e.g., pattern, max length)
- [x] SaaS-level templates per country/region (optional)

---

### 6. Tracking & Compliance
- [x] Audit logging of all major changes:
  - Working hours
  - Service types
  - Status changes
  - Ownership and user actions
- [x] Viewable by:
  - SaaS Admin
  - Primary Garage Owner
  - Auditor (read-only role)
- [x] Timestamp and user ID stored per change

---

### 🧠 Optional Ideas for Future Phases

| Feature                 | Description                                         |
|-------------------------|-----------------------------------------------------|
| Garage Media Gallery    | Upload photos of the facility for customer view     |
| Digital Signature Field | Accept terms, insurance policies, etc.              |
| Rating & Review System  | Customer feedback system per branch                 |
| Timezone Selection      | Support cross-region scheduling                     |
