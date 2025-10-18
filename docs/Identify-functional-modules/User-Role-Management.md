# Step 2: Identify Core Functional Modules

## 🔐 Module 2: User & Role Management (Complete)

This module defines how users are created, invited, assigned roles, managed across garages and branches, and how security, permissions, and governance are enforced.

---

## 🧱 Batch 1: Core Roles, Structure, and Onboarding

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

## 🔁 Batch 2: Promotions, Expiry, Impersonation, Profile Control, MFA

### ✅ Role Transfer & Promotion

- Garage Admins can promote users (e.g., Assistant → Technician)
- New role may require branch change
- Action is logged in role history for traceability
- Future: Auto-suggestion based on technician training tracker

---

### ✅ Account Expiry & Auto-Deactivation

- Optional `access_end_date` per user
- Controlled by Garage Admin (enabled/disabled per role or globally)
- System sends notifications before expiration
- After expiration: user is auto-deactivated but kept in history

---

### ✅ User Impersonation

- SaaS Admins can impersonate any user (except Primary Owner)
- Garage Admins can impersonate users from their garage
- Configurable per garage
- Clear banner + full action logs
- Cannot impersonate SaaS Admins or Owners

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

---

### ✅ Multi-Factor Authentication (MFA)

- Supported: SMS OTP and TOTP apps (e.g., Google Authenticator)
- Enabled per **garage** and per **role** by Garage Admin
- MFA required for:
  - Login
  - Impersonation
  - Critical actions
- MFA logs include: setup status, attempts, device

---

## 🛡️ Batch 3: Permissions, Activity Logs, Session Control, SaaS Directory

### ✅ Permission Matrix

- Permissions are hardcoded per role
- Garage Admins **can view** permissions but **cannot edit**
- Roles mapped to CRUD actions per module (e.g., Invoices, Technicians)
- Future upgrade: override per SaaS Plan or tenant

---

### ✅ User Activity Logs

- All major user actions are logged
- Examples: login, role change, invoice created, job closed
- Viewable by:
  - ✅ Garage Admins (own staff)
  - ✅ SaaS Admins (all users)
- Filterable and exportable (optional)

---

### ✅ Session Control

- Configurable per garage or per role
- Settings include:
  - Session timeout (e.g., 15–60 minutes)
  - Max concurrent sessions
  - Simultaneous login blocking
- Admin can force logout of users
- All sessions are tracked

---

### ✅ Global User Directory (SaaS Admins)

- View users across all garages
- Filter by name, garage, role, status
- SaaS Admin can:
  - Impersonate
  - Deactivate
  - View full history
- Cannot impersonate or deactivate other SaaS Admins

---

## 🧩 Batch 4: Governance, Notifications, Exports, Feature Flags

### ✅ User-Linked Notifications

- Admin-configured, not user-configurable
- Supported Channels:
  - In-App 🔔
  - Email 📧
  - Push (optional future)
  - SMS (optional future)
- Sample Events:
  - Job assigned/reassigned
  - Role or branch updated
  - Access expiring
  - MFA status changed

---

### ✅ Export Permissions

- Export allowed for predefined roles only
- No justification or audit trail required
- Exportable data:
  - Job cards
  - Invoices
  - Customer list
  - Technician logs

---

### ✅ Feature Flags

- Controlled per:
  - SaaS Plan (Free, Pro, Enterprise)
  - Garage (manual override)
- Garage Admin can view but not edit
- Examples:
  - Training Tracker
  - Garage Collaboration
  - Export Module
  - Reports
  - Insurance Add-on

---

### ✅ Admin Alerts

- Alert Types:
  - Failed logins
  - MFA changes
  - Impersonation started
  - Job or invoice deletions
- Delivery:
  - In-App 🔔
  - Email 📧
- Configurable per Garage Admin

---

### ✅ User Access & Session Report

- Tracks:
  - Login/logout time
  - Device/browser/IP
  - Session duration
  - Impersonation vs. normal login
- Available to:
  - ✅ Garage Admins (own users)
  - ✅ SaaS Admins (all users)
- Includes mobile app logins
- Exportable (CSV)
- Optional: Inactive user report

### 📈 Data Flow Diagram

- [User & Role Management data flow](../../Diagrams/DataFlow/UserRoleManagement.md) — shows invitation, approval, MFA, and session governance across the identity services.
- [Level 1 data flow decomposition](../../Diagrams/DataFlow/Level1/UserRoleManagement-Level1.md) — breaks down invitations, registration validation, credential provisioning, MFA, role governance, impersonation, and alerting into discrete processes.
- [Level 2 data flow decomposition](../../Diagrams/DataFlow/Level2/UserRoleManagement-Level2.md) — traces invitation completion, MFA enrolment, role assignment, session issuance, and impersonation auditing across supporting services.
- [Level 3 service component flow](../../Diagrams/DataFlow/Level3/UserRoleManagement-Level3.md) — highlights the invitation console, identity APIs, role policy engine, session manager, and impersonation service coordinating through the directory, caches, and security telemetry bus.
- [Level 4 integration workflow](../../Diagrams/DataFlow/Level4/UserRoleManagement-Level4.md) — follows invitation token storage, credential vaulting, MFA secret registration, role policy enforcement, session management, impersonation monitoring, and analytics pipelines across the identity stores and audit ledgers.
- [Level 5 infrastructure & observability view](../../Diagrams/DataFlow/Level5/UserRoleManagement-Level5.md) — outlines ingress gateways, identity services, invitation, registration, credential issuance, MFA, role governance, session control, impersonation guardrails, dedicated security stores, and alerting pipelines tied into SIEM and threat intelligence feeds.
- [Level 6 resilience & disaster recovery view](../../Diagrams/DataFlow/Level6/UserRoleManagement-Level6.md) — presents active-passive identity services, credential vault replication, MFA gateways, session brokers, and audit mirroring that preserve access continuity during regional failover.
- [Level 7 security, compliance & assurance view](../../Diagrams/DataFlow/Level7/UserRoleManagement-Level7.md) — details policy governance, identity analytics, behaviour monitoring, privilege scanning, MFA health checks, and incident response remediating identity risks.
- [Level 8 continuous improvement & analytics view](../../Diagrams/DataFlow/Level8/UserRoleManagement-Level8.md) — explains how login feedback, telemetry, risk analytics, and UX research drive access, policy, and education backlogs.

#### Data Flow Highlights
- **Onboarding sources:** Admin invitations and self-registration requests converge on the identity directory, which orchestrates outbound email/SMS and persists pending user context.
- **Authentication controls:** Login and MFA APIs activate accounts, issue sessions backed by the session store, and update device trust data.
- **Governance actions:** Role promotions, impersonation, and forced logouts push updates to the directory and session subsystems while emitting notifications and audit events.

