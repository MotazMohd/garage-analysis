# Step 1: Business Context & Goals – SaaS Garage System (Middle East)

## 🎯 SaaS Purpose

A SaaS garage system tailored for the Middle East to help garage owners manage:
- Spare parts
- Services
- Appointments
- Technicians
- Purchases
- Job tracking

Includes role-based access, training tracking, and inter-garage collaboration. Supports multiple countries and languages.

### Visual Overview
- [System data flow](../Diagrams/DataFlow/SystemOverview.md) — illustrates how the primary modules described in this context share data across the SaaS platform.
- [Level 1 system decomposition](../Diagrams/DataFlow/Level1/SystemOverview-Level1.md) — highlights the clusters of customer interactions, operational services, and shared stores that sustain the workflows.
- [Level 2 journey view](../Diagrams/DataFlow/Level2/SystemOverview-Level2.md) — follows the booking-to-billing lifecycle to show how customer touchpoints traverse operational modules and shared ledgers.
- [Level 3 orchestration services](../Diagrams/DataFlow/Level3/SystemOverview-Level3.md) — identifies the major services responsible for onboarding, identity, scheduling, job orchestration, inventory, and billing.
- [Level 4 integration workflow](../Diagrams/DataFlow/Level4/SystemOverview-Level4.md) — exposes the service mesh, data plane, event streaming, and notification layers underpinning each stage of the platform journey.
- [Level 5 infrastructure & observability view](../Diagrams/DataFlow/Level5/SystemOverview-Level5.md) — details ingress security, service mesh governance, domain microservices, shared data stores, monitoring stacks, and external platforms keeping the journey resilient.
- [Level 6 resilience & disaster recovery view](../Diagrams/DataFlow/Level6/SystemOverview-Level6.md) — highlights geo-redundant ingress, mirrored workloads, replicated stores, and failover automation protecting each business goal.
- [Level 7 security, compliance & assurance view](../Diagrams/DataFlow/Level7/SystemOverview-Level7.md) — maps the governance controls, security operations centre, data assurance pipelines, and trust communications safeguarding the platform outcomes.

---

## 👥 Target Users & Portals

| Portal               | Users                                                | Notes                                                 |
|----------------------|------------------------------------------------------|--------------------------------------------------------|
| Garage Owner Portal  | Owner, Receptionist, Technician Leader, Purchaser, Invoice Manager | Role-based views, branch control                      |
| Technician App       | Mechanical, Electrical, Assistant, Technician Leader | Skill-based step tracking, training records            |
| Customer App         | Vehicle owners                                       | Book, cancel, track, approve jobs/parts               |
| Insurance Portal     | Insurance companies                                  | View jobs, approve/reject repair cases                |
| SaaS Admin Panel     | Platform admins                                      | Manage subscriptions, tenants, abuse, usage insights  |

---

## 🏢 Multi-Branch & Domain Strategy

- Each garage can have multiple **independent branches**
- Branches have separate:
  - Inventory
  - Staff
  - Appointments
- All users log in from a **shared domain**, branch context is selected post-login

---

## 🔐 User Onboarding & Role Assignment

- Garage owners/managers can:
  - Invite users via **email or SMS**
  - Assign **role** and **branch**
  - Control access via root/sub roles
- Invites expire and use secure token authentication

---

## 🧑‍🔧 Technician & Assistant Structure

- Roles:
  - Technician (Mechanical / Electrical)
  - Assistant Technician
  - Technician Leader
- Features:
  - **Skill-based filtering** for service assignment
  - **Step-based service execution** (e.g., Dismantle, Test, Assemble)
  - Assistants are assigned to specific steps only
  - Each technician logs:
    - Step completion %
    - Time spent
    - Tools used
    - Parts consumed
  - Leader confirms work and evaluation

---

## 🎓 Technician Training Tracker

- Tracks assistant contribution per step & service
- Evaluates progress over time:
  - "Apprentice" → "Intermediate" → "Certified"
- Auto-recommends promotions based on:
  - Step completion frequency
  - Accuracy
  - Peer/leader approval

---

## 🔩 Spare Parts, Tools, and Job Cards

- Each service may require:
  - **Parts** (provided by garage or customer)
  - **Tools** (tracked and logged)
- Cost tracking includes:
  - Internal vs. customer-supplied part handling
  - Budget estimate vs. actual usage
- All job cards store historical logs of work

---

## 🔄 Inter-Garage Collaboration

- Garages can:
  - View available **parts/tools** in nearby garages
  - **Order/request** parts or tools from others
  - **Outsource services** like calibration
- Only visible to **approved partners**
- Managed by garage owner or admin

---

## 🌍 Localization & Regional Support

- Languages:
  - Arabic (RTL)
  - English (LTR)
- Currencies:
  - AED, SAR, KWD, BHD, QAR, EGP, etc.
- Timezone & date localization per country

---

## 📱 Platform Channels

- Web dashboard (responsive)
- Native mobile apps:
  - Technicians
  - Customers

---

## 💳 SaaS Business Model

- **Subscription-based plans**:
  - Free
  - Pro
  - Enterprise
- Future support for:
  - Usage-based billing
  - Add-on modules (e.g., Insurance API, Inventory Sync)

---
