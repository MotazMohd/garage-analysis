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

✅ This completes the extended and finalized configuration for the **Garage & Branch Management module**.
