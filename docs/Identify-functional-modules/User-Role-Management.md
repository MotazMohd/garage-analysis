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

## 


###  Advanced Access & Security

---

### ✅ Role Transfer & Promotion

- Garage Admins can promote users (e.g., Assistant → Technician, Technician → Leader)
- Role transfer can include branch reassignment
- Role history is logged for audits
- Promotion is manual; future: auto-suggestions from training tracker

---

### ✅ Account Expiry & Auto-Deactivation

- `access_end_date` is an optional field per user
- Feature can be enabled/disabled per garage by the Garage Admin
- System sends notifications before expiration (e.g., 7 days prior)
- After expiration: account is auto-deactivated but retained for history

---

### ✅ User Impersonation

- SaaS Admins can impersonate any user (except Primary Owner)
- Garage Admins can impersonate users from their garage
- Feature is configurable: Garage Admin can enable/disable it
- Impersonation sessions:
  - Show a clear banner (“You are impersonating X”)
  - Are logged with time and action tracking
- Cannot impersonate SaaS Admin or Primary Owner

---

### ✅ Profile Edit Permissions

| Field                    | Editable By       |
|--------------------------|-------------------|
| Full Name                | 🔒 Admin Only     |
| Phone & Email            | ✅ User           |
| Profile Photo            | ✅ User           |
| Digital Signature        | ✅ User           |
| National ID / Gov ID     | 🔒 Admin Only     |
| Emergency Contact        | ✅ User (optional)|
| Password                 | ✅ User           |
| Role & Branch            | 🔒 Admin Only     |

- All changes are audit-logged
- File uploads (e.g., ID) are secured and access-controlled

---

### ✅ Multi-Factor Authentication (MFA)

- Supported: SMS OTP and TOTP (e.g., Google Authenticator)
- Enabled/disabled per **garage** and **role** by Garage Admin
- Required setup on next login when turned on
- MFA used for:
  - Login
  - Sensitive actions (e.g., promotions)
  - Starting impersonation
- Optionally supports backup codes
- MFA logs: setup status, attempts, failures
