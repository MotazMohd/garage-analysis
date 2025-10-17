# Step 2: Identify Core Functional Modules

## 🔧 Module 1: Garage & Branch Management

This module handles the creation, configuration, and access control for garages and their branches within the SaaS system.

📈 **Data Flow Overview:** Review the [Garage & Branch Management Data Flow](../../Diagrams/DataFlow/GarageBranchManagement.md) for a visual walkthrough of who contributes data, which services transform it, and where it ultimately lands.

The latest revision folds in support, security, and resilience touchpoints so stakeholders can see how incidents, policy updates, and recovery drills intersect with day-to-day garage and branch operations.

**Key actors captured in the diagram**

**Data Sources**
- `Garage Admin`: submits the initial configuration and manages branch overrides.
- `SaaS Admin`: triggers the approval workflow and lifecycle changes.
- `Branch Setup Form`: captures per-branch adjustments that piggyback on garage defaults.
- `Document Uploads Portal`: secures license, insurance, and compliance attachments alongside the garage request.
- `Identity Provider`: authenticates admins and scopes their permissions before any management action is accepted.
- `Partner CRM Integration`: synchronizes franchise metadata (e.g., parent company IDs, billing contacts) that pre-populate garage records before submission.
- `Regulatory Bulletin Feed`: streams licensing rule updates that are consumed by compliance tooling to flag new documentary requirements.
- `Customer Feedback Portal`: gathers qualitative and CSAT-style feedback from garage managers and staff once provisioning is complete.
- `Operational Telemetry Feeds`: capture latency, error rates, and job throughput from the garage and branch services to power proactive monitoring.
- `Support Ticketing System`: captures break/fix reports from support agents so production issues can be routed alongside QA findings.
- `Threat Intelligence Feed`: streams vulnerability and indicator updates that shape the security response posture for the module.
- `Third-Party Audit Reports`: supplies external compliance attestations and exceptions that trigger internal remediation.

**Core Processes**
- `Garage Management Service`: stores pending garages, applies decisions, and seeds default branch values.
- `Approval Console`: surfaces review context so SaaS Admins can approve or reject with reasoning.
- `Branch Management Service`: applies inheritance rules, tracks overrides, and persists branch metadata.
- `Audit Event Bus`: normalizes events from the core services before writing to the append-only audit log.
- `Document Verification Service`: sanitizes uploads, links them to requests, and flags any compliance anomalies for review.
- `Access Control Service`: validates scopes from the Identity Provider and enforces role-aware access to garage and branch actions.
- `Compliance Reporter`: orchestrates follow-up for flagged documents and packages lifecycle signals for downstream reporting.
- `Risk Scoring Engine`: pre-scores garage submissions using historical outcomes, manual overrides, and regulatory risk factors so high-risk cases are surfaced early.
- `Lifecycle Scheduler`: automatically queues periodic reviews for dormant or aging garages and coordinates status confirmations with admins.
- `Retention Service`: enforces data retention rules by coordinating archival for inactive garages and logging the disposition of associated records.
- `Quality Assurance Engine`: correlates feedback, telemetry, and audit signals to recommend remediation actions for struggling garages or branches.
- `Billing Reconciliation Service`: reconciles provisioning data against partner fee schedules so finance teams can clear payouts or escalate disputes.
- `Data Governance Manager`: registers metadata, ownership, and policy changes whenever audit or lifecycle events modify stored records.
- `Security Operations Center`: correlates telemetry, threat intel, and key usage to harden the control surface and alert reviewers.
- `Incident Response Orchestrator`: drives coordinated remediation by syncing tickets, runbooks, and quality insights across teams.
- `Analytics & ML Hub`: refines curated datasets into predictive models and anomaly detectors that feed proactive operations.
- `Disaster Recovery Coordinator`: maintains replicated environments and orchestrates failover readiness signals.
- `Secrets Management Service`: rotates credentials and enforces privileged access guardrails for garage and branch tooling.
- `Policy Automation Engine`: distributes updated governance, retention, and access policies based on compliance findings.

**Destinations & Stores**
- `Garage Registry DB`: authoritative store for garage state and lifecycle history.
- `Branch Directory DB`: records branch-level overrides and provisioning details.
- `Notification Service`: relays approval results and rejection reasoning back to garage administrators.
- `Audit Log Store` + `Audit Viewer`: retain immutable history and expose the full change log to auditors and admins.
- `Document Vault`: preserves the original, sanitized copies of every supporting artifact for audit retrieval.
- `Compliance Review Queue`: centralizes anomaly investigations from the compliance reporter for manual analysts.
- `Monitoring Dashboard`: visualizes real-time approval throughput, alerting on stalled reviews or repeated rejections.
- `Reporting Warehouse`: captures normalized lifecycle datasets so leadership dashboards reflect accurate garage and branch health.
- `Risk Score Store`: retains machine-calculated and analyst-adjusted risk assessments that inform escalation policy.
- `Cold Archive Storage`: houses long-term historical records after retention thresholds are met while maintaining linkage back to the audit trail.
- `Customer Feedback DB`: stores normalized satisfaction metrics and remediation notes for retrospective analysis.
- `Billing Ledger`: final destination for reconciled payouts, clawbacks, and dispute adjustments surfaced by finance teams.
- `Data Catalog & Lineage`: registers canonical schema, access policies, and data ownership for downstream discovery and compliance audits.
- `Support Ticket Queue`: central hub for orchestrated incident response tasks and regression follow-up.
- `Security Information & Event Management (SIEM)`: aggregates enriched security alerts for investigation and compliance evidence.
- `Analytics Lakehouse`: hosts advanced models and exploratory datasets derived from lifecycle and monitoring feeds.
- `Disaster Recovery Site`: resilient standby environment that mirrors critical state to minimize downtime.
- `Runbook Repository`: stores vetted procedures for support, compliance, and security teams to execute consistent responses.
- `Policy Registry`: authoritative source of the currently enforced governance rules and workflow automation scripts.
- `Key Vault`: hardened storage for rotated secrets that back garage management and access control integrations.

**Oversight & Insight Consumers**
- `Compliance Analysts`: triage queue items, update findings, and close the loop on document verification outcomes.
- `Operations Monitoring`: subscribes to alerts and dashboards to guarantee SLAs for activation and branch provisioning.
- `Business Intelligence`: builds aggregated metrics from the reporting warehouse to guide expansion and retention strategies.
- `Risk Operations`: reviews auto-scored submissions, overrides false positives, and coordinates escalations with compliance for regulator outreach.
- `Customer Experience`: monitors quality scores and remediation outcomes to confirm that branch performance issues are addressed quickly.
- `Finance Operations`: validates reconciled payouts, confirms dispute resolutions, and feeds variance findings back into partner agreements.
- `Data Governance`: ensures cataloged lineage, retention attestations, and access policies stay current with every lifecycle event.
- `Security Operations`: monitors SIEM alerts, key usage, and policy rollouts to maintain a hardened environment.
- `Site Reliability & Platform`: oversees disaster recovery drills, failover readiness, and infrastructure health across garages and branches.
- `Support Operations`: triages inbound tickets and validates that automation and runbooks resolve frontline issues quickly.
- `Data Science & Analytics`: iterates on predictive models, anomaly detectors, and exploratory studies sourced from the analytics lakehouse.

> 🧭 **How to read the diagram:** follow each row to see how a submission moves from intake, through verification and approval, into provisioning and downstream audit visibility. The refreshed flow also shows how role checks, compliance escalations, and operational dashboards plug into the lifecycle so nothing slips past reviewers.

### 🔁 Process Highlights

| Stage | Description | Notable Data Paths |
|-------|-------------|--------------------|
| Intake & Classification | Garage Admin submits structured fields while uploading licenses via the Document Portal. | Portal → Document Verification Service → Garage Management Service & Document Vault |
| Approval & Decisioning | SaaS Admin reviews consolidated context, including compliance flags, before approving or rejecting. | Approval Console ↔ Garage Management Service ↔ Audit Event Bus |
| Branch Provisioning | Default branch configuration is cloned and overrides captured via the Branch Setup Form. | Branch Setup Form → Branch Management Service → Branch Directory DB |
| Access Control & Alerts | Identity Provider and Access Control Service enforce scoped permissions while alerts surface issues. | Identity Provider → Access Control Service → Garage Management Service → Monitoring Dashboard |
| Risk Scoring & Escalation | Submissions are pre-scored, with high-risk outcomes notifying compliance for deeper review. | Garage Management Service → Risk Scoring Engine → Risk Score Store / Compliance Reporter |
| Notifications & Audit | Decisions are broadcast to admins while every event is normalized and archived. | Garage Management Service / Branch Service → Audit Event Bus → Audit Log Store & Viewer |
| Insight, Retention & Compliance Reporting | Lifecycle events and flagged documents fuel manual review, analytics, and archival. | Document Verification → Compliance Reporter & Retention Service → Compliance Queue / Reporting Warehouse / Cold Archive |
| Experience, Billing & Governance Oversight | Feedback, telemetry, and reconciliation routines drive continuous improvement and policy alignment. | Monitoring / Feedback Portal → Quality Assurance Engine → Compliance Reporter / Customer Feedback DB; Garage & Branch Services → Billing Reconciliation → Billing Ledger; Audit Event Bus → Data Governance Manager → Data Catalog |
| Resilience, Security & Support Coordination | Threat intel, incident command, and recovery drills protect uptime while enforcing refreshed policies. | Threat Intelligence Feed → Security Operations Center → SIEM / Key Vault; Support Ticketing System → Incident Response Orchestrator → Support Ticket Queue / Runbook Repository; Garage & Branch Services → Disaster Recovery Coordinator → Disaster Recovery Site |

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
