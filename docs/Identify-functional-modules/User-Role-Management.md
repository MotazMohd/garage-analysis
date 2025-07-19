# Step 2: Identify Core Functional Modules

## 🔐 Module 2: User & Role Management (Complete)

This module defines how users are onboarded, assigned roles, managed across branches, and secured with advanced access controls and workflows.

---

### ✅ Role Strategy

- Use a fixed set of predefined roles (custom roles in future)
- Each user can have **only one role per branch**
- One user can be assigned to **multiple branches**
- Primary Owner role is protected and non-removable

#### Predefined Roles

| Role                 | Scope        |
|----------------------|--------------|
| Primary Owner        | Garage-wide  |
| Garage Admin         | Garage-wide  |
| Branch Manager       | Branch-only  |
| Receptionist         | Branch-only  |
| Technician Leader    | Branch-only  |
| Technician           | Branch-only  |
| Assistant Technician | Branch-only  |
| Purchaser            | Branch-only  |
| Invoice Manager      | Branch-only  |
| Auditor (Read-Only)  | Garage/Branch|

---

### ✅ User Lifecycle & Deactivation

- When removed from last branch, user is deactivated
- Deactivated users cannot log in
- Historical actions remain (e.g., job logs)
- Reactivation and branch-level deactivation are planned for future

---

### ✅ Garage Association

- Each user belongs to **one garage only**
- No cross-garage access (future: freelancer support)
- Unique phone/email per garage

---

### ✅ Onboarding Methods

| Method              | Description |
|---------------------|-------------|
| Admin Invitation    | Email/SMS invite with predefined role and branch |
| Self-Registration   | Public sign-up → Admin review → Role assignment |

- Role-based filtering supported (e.g., only technicians may self-register)
- Admin must approve all self-registered users

---

### ✅ Role Transfer & Promotion

- Garage Admins can promote users (e.g., Assistant → Technician)
- New role may require branch change
- Action is logged in role history for traceability
- Future: Auto-suggestion based on technician training tracker

---

### ✅ Account Expiry & Auto-Deactivation

- Optional `access_end_date` per user
- Controlled by Garage Admin (enabled/disabled per role or globally)
- System sends expiration warnings before deactivation
- After expiration: user is auto-deactivated but kept in history

---

### ✅ User Impersonation

- Impersonation supported with full security controls
- Enabled/disabled per garage by Garage Admin
- Who can impersonate:
  - ✅ SaaS Admins (all garages)
  - ✅ Garage Admins (own users only)
  - ❌ No impersonating Primary Owners or SaaS Admins
- Clear visual indicators during impersonation
- All actions logged (who, when, what)

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

- Changes are audit-logged
- Sensitive uploads (e.g., ID) are secured and restricted

---

### ✅ Multi-Factor Authentication (MFA)

- Supported: SMS OTP and TOTP apps (e.g., Google Authenticator)
- Enabled per **garage** and per **role** by Garage Admin
- Users prompted to set up MFA at next login when enabled
- MFA enforced on:
  - Login
  - Sensitive actions (e.g., role change)
  - Impersonation start
- Optional backup codes
- Setup and access attempts are fully logged

---

### 🧠 Future-Ready Features (Planned)

- Multi-role support per user per branch
- Cross-garage freelancer support
- Custom role/permission builder
- Branch-specific deactivation (vs. full deactivation)
- Reactivation workflows
- Global MFA policy per SaaS subscription plan
