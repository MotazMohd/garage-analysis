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

## Editing Guidance

1. **Use `flowchart` syntax** so that diagrams remain consistent across modules.
2. **Describe data stores** with rounded shapes (e.g., `((Store))` or `[(Store)]`) and processes with rectangles.
3. **Keep node labels concise**; expand on nuances in the surrounding Markdown text.
4. When updating a module spec, link back to the relevant diagram so documentation and visuals stay in sync.
5. If you add a new module, create a matching diagram file here and extend this table.

> Tip: you can preview Mermaid diagrams locally by using VS Code's built-in preview or any Markdown renderer that supports Mermaid 10 or later.
