# Garage Data Summary

## Garage Creation Fields

| Field | Required | Notes |
|---|---|---|
| Garage Name | Yes | Unique per tenant |
| Trade License Number | Yes | Can be validated if needed |
| Country & City | Yes | Preselected from user IP, editable at creation |
| Service Types Supported | Yes | Must choose at least one |
| Working Hours | Yes | Per-day time ranges (e.g., Sat–Thu, 8am–6pm) |
| Logo | Optional | Used for receipts/branding |
| Branding Color | Optional | UI theming per tenant |
| Phone / WhatsApp | Optional | For contact and customer access |
| Email | Optional | Defaults from user if not provided |
| Garage Description | Optional | Visible in booking/customer portal |
| Garage Type | Optional | e.g., Independent, Franchise, Chain Head |
| Google Maps Pin | Optional | For mobile maps & customer search |
| Garage Tags/Categories | Optional | e.g., Bodywork, Electrical, Tuning, Quick Service |
| Document Uploads | Optional | Trade license, permits, insurance |
| Service Radius (KM) | Optional | For towing, pickup, roadside support |

## Garage Activation Workflow
- New garages are created with status `Pending`.
- SaaS Admin must approve before activation.
- Admin reviews license, location, contact, and services before acceptance.
- Garage statuses: `Pending`, `Active`, `Suspended`, `Archived`.
- Suspension and archiving are managed by the SaaS Admin.
- Audit trail stored for all actions.

### Visual Reference
- [Garage & Branch Management data flow](../Diagrams/DataFlow/GarageBranchManagement.md) — end-to-end view of onboarding, approval, branch inheritance, and audit logging.
- [Level 1 data flow decomposition](../Diagrams/DataFlow/Level1/GarageBranchManagement-Level1.md) — shows the numbered processes for intake, review, branch configuration, staff access, and lifecycle enforcement.
- [Level 2 data flow decomposition](../Diagrams/DataFlow/Level2/GarageBranchManagement-Level2.md) — expands onboarding, compliance review, branch setup, and staff visibility actions through their supporting services and data stores.
- [Level 3 service component flow](../Diagrams/DataFlow/Level3/GarageBranchManagement-Level3.md) — highlights intake portals, compliance desks, lifecycle controllers, branch configurators, and staff provisioning services coordinating via shared repositories and audit ledgers.
- [Level 4 integration workflow](../Diagrams/DataFlow/Level4/GarageBranchManagement-Level4.md) — details intake APIs, document classifiers, compliance workflows, branch configuration engines, staff provisioning, lifecycle controllers, and notification hubs interacting with the tenant registry, branch store, staff directory, and audit/notification queues.
- [Level 5 infrastructure & observability view](../Diagrams/DataFlow/Level5/GarageBranchManagement-Level5.md) — maps intake APIs, document classification, risk scoring, compliance decisions, lifecycle orchestration, branch configuration, and staff access provisioning services tied to their ledgers, alerts, and monitoring stacks.
- [Level 6 resilience & disaster recovery view](../Diagrams/DataFlow/Level6/GarageBranchManagement-Level6.md) — illustrates multi-region onboarding, compliance, branch configuration, staff provisioning, and audit streaming with replicated stores and failover runbooks.
- [Level 7 security, compliance & assurance view](../Diagrams/DataFlow/Level7/GarageBranchManagement-Level7.md) — emphasises governance controls, onboarding monitoring, document scanning, risk scoring, and case management safeguarding garage data.
- [Level 8 continuous improvement & analytics view](../Diagrams/DataFlow/Level8/GarageBranchManagement-Level8.md) — highlights feedback loops, analytics, and enablement initiatives that evolve policies, workflows, and training for garages.

## Branch Management & Inheritance
| Field | Inherited from Garage | Editable Per Branch |
|---|---|---|
| Location (Address, City) | No | Yes |
| Google Maps Pin | No | Yes |
| Working Hours | Yes | Yes |
| Service Types | Yes | Yes |
| Contact Info | Yes | Yes |
| Logo & Branding | Yes | Optional override |
| Branch Description | N/A | Yes |
| Service Radius (KM) | Yes | Yes |
| Document Uploads | Optional | Optional override |

## Staff Visibility Configuration
- Controlled by SaaS Admin and Garage Admin.
- Users belong to a single branch or can be shared across branches.
- Each user account stores `primaryBranchId` and optional `allowedBranchIds[]`.

## Custom Fields per Garage
- Garage Admin can define custom fields for garage details, branch metadata, and staff registration.
- Field types: text, number, dropdown, checkbox, file upload.
- Fields can be required/optional, visible/internal, and validated.

## Change Log / Audit History
- Major updates are audit-logged, including working hours, service types, branch creation, and status changes.
- Viewable by SaaS Admin, Primary Owner, and Auditors (read-only role).
