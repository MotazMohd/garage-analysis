# Data Flow Diagram Index

This directory hosts the mermaid source for the SaaS garage platform data-flow diagrams. Each file follows the naming convention `<ModuleName>.md` and can be rendered directly by any Markdown preview that supports Mermaid.

## Available Diagrams

| Diagram | Scope | Key Highlights |
| --- | --- | --- |
| [`SystemOverview.md`](SystemOverview.md) | Cross-module | Shows how garage onboarding, user governance, appointments, job cards, inventory, and notifications interact at a platform level. |
| [`GarageBranchManagement.md`](GarageBranchManagement.md) | Garage & branch lifecycle | Captures creation, approval, inheritance, staff visibility, and audit logging. |
| [`UserRoleManagement.md`](UserRoleManagement.md) | Identity & access | Visualises invitation, self-registration, MFA enrolment, and impersonation safeguards. |
| [`ServiceTemplateConfiguration.md`](ServiceTemplateConfiguration.md) | Service catalog | Outlines how SaaS templates are cloned, customised, and resolved into executable job steps. |
| [`SparePartsManagement.md`](SparePartsManagement.md) | Inventory & catalogues | Tracks part definition, stock updates, cross-garage sharing, and low-stock notifications. |
| [`ToolsManagement.md`](ToolsManagement.md) | Tool governance | Demonstrates tool onboarding, allocation to services, and availability synchronisation. |
| [`AppointmentCheckIn.md`](AppointmentCheckIn.md) | Intake workflow | Highlights appointment validation, evidence capture, upsell prompts, and job card creation. |
| [`JobCardExecution.md`](JobCardExecution.md) | Workshop execution | Maps technician assignments, progress capture, exception handling, and customer updates. |

### Level 1 Decompositions

| Diagram | Scope | Key Highlights |
| --- | --- | --- |
| [`Level1/SystemOverview-Level1.md`](Level1/SystemOverview-Level1.md) | Platform clusters | Groups customer journeys, operational modules, and shared data stores to emphasise state propagation end-to-end. |
| [`Level1/GarageBranchManagement-Level1.md`](Level1/GarageBranchManagement-Level1.md) | Garage lifecycle | Numbers processes for intake, approval, branch inheritance, staff access, and lifecycle enforcement. |
| [`Level1/UserRoleManagement-Level1.md`](Level1/UserRoleManagement-Level1.md) | Identity flows | Breaks invitations, self-registration, credential provisioning, MFA, role governance, impersonation, and alerts into discrete processes. |
| [`Level1/ServiceTemplateConfiguration-Level1.md`](Level1/ServiceTemplateConfiguration-Level1.md) | Service templates | Details authoring, localisation, resource binding, execution orchestration, and exception handling phases. |
| [`Level1/SparePartsManagement-Level1.md`](Level1/SparePartsManagement-Level1.md) | Inventory lifecycle | Tracks catalogue creation, supplier imports, garage localisation, stock adjustments, and replenishment automation. |
| [`Level1/ToolsManagement-Level1.md`](Level1/ToolsManagement-Level1.md) | Tool governance | Sequences catalogue authoring, garage imports, availability planning, technician checkout, and maintenance cycles. |
| [`Level1/AppointmentCheckIn-Level1.md`](Level1/AppointmentCheckIn-Level1.md) | Intake workflow | Expands arrival into booking retrieval, intake capture, service confirmation, job card creation, and scheduling updates. |
| [`Level1/JobCardExecution-Level1.md`](Level1/JobCardExecution-Level1.md) | Workshop execution | Shows step allocation, telemetry capture, exception routing, QA inspection, customer communications, and closure tasks. |

### Level 2 Decompositions

| Diagram | Scope | Key Highlights |
| --- | --- | --- |
| [`Level2/SystemOverview-Level2.md`](Level2/SystemOverview-Level2.md) | Customer-to-billing journey | Follows booking creation through garage assignment, check-in, job orchestration, and billing notifications across shared stores. |
| [`Level2/GarageBranchManagement-Level2.md`](Level2/GarageBranchManagement-Level2.md) | Onboarding & governance | Details application intake, compliance review, branch configuration, staff visibility, and lifecycle updates with audit trails. |
| [`Level2/UserRoleManagement-Level2.md`](Level2/UserRoleManagement-Level2.md) | Identity lifecycle | Tracks invitations, MFA enrolment, role assignment, session control, and impersonation alerts tied to the identity directory. |
| [`Level2/ServiceTemplateConfiguration-Level2.md`](Level2/ServiceTemplateConfiguration-Level2.md) | Template localisation | Shows authoring, versioning, garage overrides, resource binding, and publishing into the job execution engine. |
| [`Level2/SparePartsManagement-Level2.md`](Level2/SparePartsManagement-Level2.md) | Supply-to-consumption | Maps supplier feeds, garage imports, stock usage, reservations, and replenishment triggers. |
| [`Level2/ToolsManagement-Level2.md`](Level2/ToolsManagement-Level2.md) | Availability & maintenance | Illustrates tool curation, garage imports, scheduling, technician checkout, and maintenance logging. |
| [`Level2/AppointmentCheckIn-Level2.md`](Level2/AppointmentCheckIn-Level2.md) | Intake & handover | Captures appointment lookup, digital intake, evidence storage, job card creation, and notification updates. |
| [`Level2/JobCardExecution-Level2.md`](Level2/JobCardExecution-Level2.md) | Workshop progress | Depicts assignment, resource consumption, exception routing, QA approval, and billing hand-off. |

### Level 3 Service Component Views

| Diagram | Scope | Key Highlights |
| --- | --- | --- |
| [`Level3/SystemOverview-Level3.md`](Level3/SystemOverview-Level3.md) | Platform orchestration services | Breaks the journey into concrete services (onboarding, identity, scheduling, job orchestration, inventory, billing) writing to shared stores and notification channels. |
| [`Level3/GarageBranchManagement-Level3.md`](Level3/GarageBranchManagement-Level3.md) | Garage governance services | Shows intake portals, compliance desks, lifecycle controllers, branch configurators, and staff provisioning touches across their data stores. |
| [`Level3/UserRoleManagement-Level3.md`](Level3/UserRoleManagement-Level3.md) | Identity microservices | Details invitation, self-registration, MFA, role policy, impersonation, and security telemetry integrations. |
| [`Level3/ServiceTemplateConfiguration-Level3.md`](Level3/ServiceTemplateConfiguration-Level3.md) | Template execution pipeline | Maps authoring, version control, validation, resource binding, and job step resolution services. |
| [`Level3/SparePartsManagement-Level3.md`](Level3/SparePartsManagement-Level3.md) | Inventory command & control | Highlights catalogue curation, supplier feeds, garage localisation, reservations, replenishment, and quality hold workflows. |
| [`Level3/ToolsManagement-Level3.md`](Level3/ToolsManagement-Level3.md) | Tool availability lifecycle | Visualises curation, import, calibration scheduling, reservations, checkout, maintenance, and availability synchronisation. |
| [`Level3/AppointmentCheckIn-Level3.md`](Level3/AppointmentCheckIn-Level3.md) | Intake service components | Breaks down reception capture, identity verification, intake forms, upsell logic, and job card handoff. |
| [`Level3/JobCardExecution-Level3.md`](Level3/JobCardExecution-Level3.md) | Workshop execution services | Details assignment, telemetry, resource consumption, exception routing, QA checks, and customer communication pipelines. |

### Level 4 Integration Workflows

| Diagram | Scope | Key Highlights |
| --- | --- | --- |
| [`Level4/SystemOverview-Level4.md`](Level4/SystemOverview-Level4.md) | Platform service mesh | Details channel authentication, operations services, shared data plane, and streaming analytics that orchestrate every lifecycle transition. |
| [`Level4/GarageBranchManagement-Level4.md`](Level4/GarageBranchManagement-Level4.md) | Garage governance integrations | Shows onboarding intake, document classification, compliance workflow, branch configuration, staff provisioning, and lifecycle enforcement over core stores. |
| [`Level4/UserRoleManagement-Level4.md`](Level4/UserRoleManagement-Level4.md) | Identity & security controls | Follows invitations, credential issuance, MFA enrolment, role governance, impersonation monitoring, and analytics with their underlying vaults and ledgers. |
| [`Level4/ServiceTemplateConfiguration-Level4.md`](Level4/ServiceTemplateConfiguration-Level4.md) | Template service mesh | Illustrates authoring, versioning, validation, localisation, resource binding, publishing, and notifications across the template repositories. |
| [`Level4/SparePartsManagement-Level4.md`](Level4/SparePartsManagement-Level4.md) | Inventory integrations | Maps catalogue authoring, supplier feeds, garage localisation, reservations, stock ledgers, replenishment planning, and quality holds. |
| [`Level4/ToolsManagement-Level4.md`](Level4/ToolsManagement-Level4.md) | Tool lifecycle orchestration | Captures registry updates, calibration scheduling, availability planning, technician checkout, maintenance workflows, and partner integrations. |
| [`Level4/AppointmentCheckIn-Level4.md`](Level4/AppointmentCheckIn-Level4.md) | Intake microservices | Breaks down arrival capture, booking lookup, identity verification, evidence logging, upsell recommendations, and job card creation. |
| [`Level4/JobCardExecution-Level4.md`](Level4/JobCardExecution-Level4.md) | Workshop execution engines | Details task routing, telemetry capture, resource consumption, exception handling, QA inspection, billing bridge, and audit trail services. |

## Editing Guidance

1. **Use `flowchart` syntax** so that diagrams remain consistent across modules.
2. **Describe data stores** with rounded shapes (e.g., `((Store))` or `[(Store)]`) and processes with rectangles.
3. **Use `Level1/` for deeper decompositions** so that high-level and detailed diagrams are easy to discover together.
4. **Keep node labels concise**; expand on nuances in the surrounding Markdown text.
5. When updating a module spec, link back to the relevant diagram so documentation and visuals stay in sync.
6. If you add a new module, create matching high-level and Level 1 diagram files and extend the tables above.

> Tip: you can preview Mermaid diagrams locally by using VS Code's built-in preview or any Markdown renderer that supports Mermaid 10 or later.
