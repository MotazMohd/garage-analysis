# Job Card Execution & Progress Tracking

## Purpose

To manage how jobs are executed within the garage after appointment check-in, including step-level assignments, tracking, exception handling, and approvals.

---

## 🔄 Job Card Lifecycle

* Created automatically when an appointment is marked "Arrived."
* Lifecycle statuses:

  * `Pending`
  * `In Progress`
  * `Paused`
  * `Completed`
  * `Rejected`
* Linked to:

  * Appointment
  * Vehicle
  * Customer
  * Assigned Technicians and Assistants
  * Services and required parts/tools

---

## 👨‍🔧 Technician & Assistant Assignment

* Assignment is **per step** based on:

  * Required skill (e.g., Electrical, Mechanical)
  * Availability
  * Workload
* Supported flows:

  * Technician-only
  * Assistant-only for assembly/disassembly
  * Technician + Assistant collaboration
* Lead Technician can **override** or reassign any step.

---

## 📊 Step Progress Tracking

Each step in the service template includes:

* `Status`: Not Started / In Progress / Done / Skipped / Failed
* `AssignedTo`: Technician or Assistant
* `PerformedBy`: Recorded during execution
* `Checklist`: Configurable per step or garage
* `Attachments`: Optional (photos, documents)

Parallel and sequential steps are both supported.

---

## 🚨 Exception Handling

* If a step fails or cannot be completed:

  * Technician can flag the issue
  * Requires review or override from Lead or Supervisor
* Actions:

  * Retry
  * Skip (with comment)
  * Delay
* All exceptions are logged
* Approval flow is configurable

---

## 📝 Checklists & Attachments

* Each step can require:

  * Checklist completion
  * Photo or document uploads
* Customer can view completed checklists and attachments

---

## 📣 Notifications

* Sent to:

  * Customer: When step begins/completes
  * Technician: On new assignment or reassignment
* Channels: App / SMS / Email (if registered)

---

## ✅ Final Approval

* After all steps are completed:

  * Job Card must be reviewed by Lead or Supervisor
  * Optional customer acknowledgment/feedback
  * Final summary and invoice prepared

---

## Configuration Matrix

| Feature                | Scope                | Description                     |
| ---------------------- | -------------------- | ------------------------------- |
| Technician Assignment  | Per Garage           | Manual or Auto options          |
| Assistant Roles        | Per Service          | Assembly/disassembly only       |
| Checklist Templates    | Per Step / Garage    | Optional or required            |
| Exception Handling     | Per Garage           | Approvals and allowed actions   |
| Attachments            | Per Step             | Optional, required, or disabled |
| Customer Notifications | Per Garage           | Configurable triggers           |
| Step Ordering          | Per Service Template | Sequential / Parallel           |

---

## Use Case Flow

1. Appointment is checked in → Job Card created.
2. Steps assigned to technicians and/or assistants.
3. Each step tracked individually:

   * Checklist completed
   * Attachments uploaded
   * Status updated
4. Exceptions handled and approved if needed.
5. Final step triggers job card review.
6. Lead approves and customer is notified.
7. Invoice and service summary generated.

---

## 📈 Data Flow Diagram

- [Job card execution data flow](../../Diagrams/DataFlow/JobCardExecution.md) — maps technician updates, exception handling, and customer notifications throughout the lifecycle.
- [Level 1 data flow decomposition](../../Diagrams/DataFlow/Level1/JobCardExecution-Level1.md) — details step allocation, execution telemetry, exception routing, QA inspection, customer communications, and closure activities.
- [Level 2 data flow decomposition](../../Diagrams/DataFlow/Level2/JobCardExecution-Level2.md) — illustrates technician execution, resource usage, exception routing, QA approval, and billing hand-off steps.
- [Level 3 service component flow](../../Diagrams/DataFlow/Level3/JobCardExecution-Level3.md) — details the assignment engine, telemetry collectors, resource reservation services, exception router, QA checklist, and customer update pipeline coordinating through their ledgers and queues.
- [Level 4 integration workflow](../../Diagrams/DataFlow/Level4/JobCardExecution-Level4.md) — shows task routing, step assignment, telemetry capture, resource consumption, exception desks, QA inspections, customer notifications, billing bridges, and audit services collaborating across execution data stores.
- [Level 5 infrastructure & observability view](../../Diagrams/DataFlow/Level5/JobCardExecution-Level5.md) — details ingress, assignment, step tracking, telemetry collection, exception desks, QA, resource management, customer notifications, billing bridge, and monitoring pipelines coordinating via execution ledgers and observability stacks.
- [Level 6 resilience & disaster recovery view](../../Diagrams/DataFlow/Level6/JobCardExecution-Level6.md) — demonstrates geo-redundant assignment, telemetry ingestion, resource usage, exception routing, QA inspection, customer notification, billing bridging, and audit streaming with replicated stores and failover orchestration.
- [Level 7 security, compliance & assurance view](../../Diagrams/DataFlow/Level7/JobCardExecution-Level7.md) — introduces governance policies, telemetry monitoring, exception analysis, quality audits, customer escalation handling, and incident desks safeguarding workshop execution.
- [Level 8 continuous improvement & analytics view](../../Diagrams/DataFlow/Level8/JobCardExecution-Level8.md) — showcases telemetry loops, quality analytics, and improvement squads refining processes, automation, and communication playbooks.

#### Data Flow Highlights
- **Work allocation:** Job card services distribute steps to technicians and assistants, who submit progress updates through the execution API.
- **Exception handling:** Blocked steps, missing parts, or QA failures raise escalations that notify managers and enrich the audit trail.
- **Completion signalling:** Approvals release customer notifications and synchronise final job state with downstream systems such as invoicing and analytics.

---

## Future Enhancements (Planned)

* Technician mobile app for live status updates
* Automatic technician assignment based on AI suggestions
* Version-controlled service templates
* Customer feedback and rating per step
