# Step 2: Identify Core Functional Modules

## 🔐 Module 2: User & Role Management

This module manages how users are created, invited, onboarded, assigned to roles and branches, and how they interact with the system.

---

### ✅ Role Strategy

- Fixed list of predefined roles (future custom roles possible)
- Each user can have **only one role per branch**
- One user can belong to **multiple branches**, but only **one role per branch**
- Primary Owner role is protected and persistent

#### Predefined Roles (Sample)

| Role                 | Scope        | Description |
|----------------------|--------------|-------------|
| Primary Owner        | Garage-wide  | Full control |
| Garage Admin         | Garage-wide  | Manage everything except owner-level changes |
| Branch Manager       | Branch-only  | Schedule, staff, inventory |
| Receptionist         | Branch-only  | Customer bookings, check-ins |
| Technician Leader    | Branch-only  | Assign jobs to technicians |
| Technician           | Branch-only  | Handle assigned tasks |
| Assistant Technician | Branch-only  | Perform task steps, log progress |
| Purchaser            | Branch-only  | Place and manage orders |
| Invoice Manager      | Branch-only  | Billing and receipts |
| Auditor (Read-Only)  | Garage/Branch| No editing rights, full visibility |

---

### ✅ User Role & Deactivation Rules

- Users are removed entirely if detached from their last branch
- Account is deactivated (no login)
- All historical actions are preserved
- Future: soft-removal or multi-branch access possible

---

### ✅ Onboarding Methods

| Method           | Description |
|------------------|-------------|
| Admin Invitation | Email/SMS invite with role & branch assignment |
| Self-Registration | Users can sign up, admin approves and assigns them |

- Role-based restrictions on self-registration (e.g., only technicians allowed)
- Admin approval workflow for self-registered users

---

### ✅ Garage Association

- One user = One garage only
- Email/phone must be unique per garage
- Future: support cross-garage users (e.g., freelancers)

---

### ✅ User Profile Fields

| Field / Asset            | Staff (Required?) | Customer (Required?) |
|--------------------------|------------------|----------------------|
| Profile Photo            | ✅ Yes           | ❌ Optional          |
| Digital Signature        | ✅ Yes           | ❌ Optional          |
| Government/ID Upload     | ✅ (per role)    | ❌ Optional          |
| Phone & Email            | ✅ Yes           | ✅ Yes               |
| Emergency Contact        | ❌ Optional      | ❌ Optional          |

- Signature captured via touchscreen canvas
- Uploaded files secured and access-controlled

---

### 🧠 Future-Ready Notes

- Multi-role support per user (not enabled yet)
- Branch-specific deactivation (planned)
- Freelancer technician mode (planned)
- Role customization (planned)
