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
