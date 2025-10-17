# Appointment Check-in Module

## Purpose

To manage the vehicle arrival and check-in process for scheduled appointments, ensuring that condition tracking, service readiness, and approval workflows are handled efficiently at the garage level.

---

## Detailed Features and Rules

### ✅ Who Can Perform Check-in

* **Receptionist**, **Supervisor**, or **Garage Admin** can mark a vehicle as "Arrived".
* Lead technicians and system admins are not directly involved in check-in.
* QR-based check-in is planned for future versions.

### ✅ Vehicle Condition Logging

* **Optional** but supported.
* Fields: Scratches, dents, fuel level, mileage, and external conditions.
* Used to document customer disputes and internal quality assurance.

### 📸 Photo Before Service

* **Mandatory**.
* Taken by the staff during check-in.
* Used for evidence in customer disputes.

### 🔄 Add-on Service Suggestions

* Enabled during check-in.
* System may recommend relevant services based on vehicle type or history.
* Garage can upsell services at this stage.

### 🧾 Printed Job Intake Form

* **Enabled**.
* Generated automatically after vehicle check-in.
* Contains:

  * Appointment ID
  * Customer details
  * Vehicle info
  * List of services/packages
  * Technician notes
  * Initial condition + photos

### 🔐 Rejection Handling

* If vehicle arrives at the wrong branch, or too late, or is incompatible with the service, **approval is required**.
* Approval roles: **Receptionist**, **Supervisor**, or **Garage Admin**.

### 🔕 Arrival Timestamp + Staff Logs

* **Not required** for now (as per user preference).
* May be enabled later if needed.

---

## Notifications

* Upon check-in, the **customer is notified**:

  * That the vehicle is marked as arrived
  * With service step tracking links if registered
* Channels: **App**, **SMS**, and **Email** (if available)

---

## Configuration

| Setting                   | Scope               | Description                        |
| ------------------------- | ------------------- | ---------------------------------- |
| Vehicle Condition Capture | Garage Configurable | Optional or required               |
| Photo Requirement         | Always Enabled      | Cannot be disabled                 |
| Add-On Suggestions        | Garage Configurable | Optional upsell support            |
| Print Intake Form         | Always Enabled      | Default on check-in                |
| Rejection Approval Roles  | Fixed               | Receptionist/Supervisor/Admin only |
| Arrival Staff Logging     | Disabled            | Not tracked currently              |

---

## Future Enhancements (Backlog)

* 🔍 QR-code-based self check-in
* 🧠 AI-based service suggestion engine
* 🛠️ Garage-specific dynamic condition forms

---

## Use Case Flow

1. Customer arrives at garage.
2. Staff (Receptionist or Supervisor) selects the appointment and marks it as "Arrived".
3. System prompts for vehicle condition fields (optional) and requires photos (mandatory).
4. Add-on service suggestions are displayed.
5. Job intake form is generated and printed.
6. If the vehicle does not meet appointment criteria, staff can reject or request admin approval.
7. Customer is notified of service progress initiation.

---

## 📈 Data Flow Diagram

- [Appointment check-in data flow](../../Diagrams/DataFlow/AppointmentCheckIn.md) — details the intake, media capture, and notification sequence triggered during arrival.
- [Level 1 data flow decomposition](../../Diagrams/DataFlow/Level1/AppointmentCheckIn-Level1.md) — expands the arrival journey into booking retrieval, intake capture, service confirmation, job card creation, and scheduling updates.
- [Level 2 data flow decomposition](../../Diagrams/DataFlow/Level2/AppointmentCheckIn-Level2.md) — emphasises appointment lookup, digital intake, evidence storage, job card creation, and notification broadcasts with audit logging.
- [Level 3 service component flow](../../Diagrams/DataFlow/Level3/AppointmentCheckIn-Level3.md) — illustrates the reception tablet, identity verification, intake services, upsell engine, and job card handler coordinating through appointment ledgers, intake records, media vaults, and notification channels.
- [Level 4 integration workflow](../../Diagrams/DataFlow/Level4/AppointmentCheckIn-Level4.md) — highlights arrival capture, booking lookups, identity verification, condition documentation, intake form generation, upsell recommendation, job card creation, and notification queuing across the supporting stores.
- [Level 5 infrastructure & observability view](../../Diagrams/DataFlow/Level5/AppointmentCheckIn-Level5.md) — illustrates ingress gateways, appointment lookup, identity verification, intake, evidence capture, upsell, job card creation, notification services, and monitoring telemetry protecting the check-in lifecycle.
- [Level 6 resilience & disaster recovery view](../../Diagrams/DataFlow/Level6/AppointmentCheckIn-Level6.md) — describes geo-distributed arrival capture, booking lookup, identity verification, evidence storage, upsell engines, job card bridging, and notification dispatching with mirrored ledgers and failover automation.
- [Level 7 security, compliance & assurance view](../../Diagrams/DataFlow/Level7/AppointmentCheckIn-Level7.md) — details intake governance policies, evidence retention rules, privacy controls, classification pipelines, anomaly detection, and incident desks securing the arrival workflow.

#### Data Flow Highlights
- **Intake capture:** Reception staff confirm booking details, log vehicle conditions, and upload mandatory photos that persist in dedicated stores.
- **Job initiation:** The check-in service produces intake documents, triggers optional upsell recommendations, and either activates an existing job card or creates a new one.
- **Communication trail:** Notifications keep customers informed of arrival status while audit logs preserve evidence and decision points for compliance.

---
