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

## Editing Guidance

1. **Use `flowchart` syntax** so that diagrams remain consistent across modules.
2. **Describe data stores** with rounded shapes (e.g., `((Store))` or `[(Store)]`) and processes with rectangles.
3. **Use `Level1/` for deeper decompositions** so that high-level and detailed diagrams are easy to discover together.
4. **Keep node labels concise**; expand on nuances in the surrounding Markdown text.
5. When updating a module spec, link back to the relevant diagram so documentation and visuals stay in sync.
6. If you add a new module, create matching high-level and Level 1 diagram files and extend the tables above.

> Tip: you can preview Mermaid diagrams locally by using VS Code's built-in preview or any Markdown renderer that supports Mermaid 10 or later.
