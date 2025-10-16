# 🚀 Sprint 1: Intake Foundations

## 🎯 Sprint Goal
Launch the end-to-end vehicle arrival workflow so reception teams can mark appointments as arrived, capture required evidence, and hand off ready-to-execute job cards with consistent data quality.

---

## ✅ Tasks Breakdown

### 1. Check-in Workflow Engine
- **State Machine:** Extend the appointment service to support `Scheduled → Arrived → Checked-In` transitions with role validation for receptionists, supervisors, and garage admins.
- **Permissions:** Enforce branch scoping, audit actor identity, and block unauthorized roles (e.g., technicians) from initiating check-in.
- **Job Card Handoff:** Automatically spawn draft job cards (or hydrate existing ones) linked to the arrival event, carrying appointment metadata.
- **Why:** Establishes the backbone for timely intake and downstream execution.

### 2. Evidence Capture & Storage
- **Photo Pipeline:** Integrate media upload widgets with mandatory capture enforcement, retry handling, and storage to the existing asset service.
- **Condition Logging:** Offer optional structured fields (scratches, dents, mileage, fuel level) with validation and localization support.
- **Document Binding:** Attach captured data to the job card intake section for technician visibility and later dispute resolution.
- **Why:** Guarantees reliable proof-of-condition and consistent intake details.

### 3. Intake Document & Notifications
- **Intake Form Generation:** Create a templated PDF/HTML intake form containing appointment, customer, vehicle, service list, and captured evidence.
- **Printing & Sharing:** Enable print queue routing and email/SMS dispatch with secure download links.
- **Notifications:** Trigger customer notifications (app, SMS, email) confirming arrival and linking to job tracking.
- **Why:** Keeps customers informed and provides physical documentation for garage workflows.

### 4. Telemetry & Configuration Baseline
- **Event Publishing:** Emit `appointment.arrived` events to the message bus for integration with analytics and dashboards.
- **Config Flags:** Introduce garage-level toggles to mark condition logging as required/optional while keeping photos mandatory.
- **Analytics Hooks:** Log key metrics (arrival latency, photo retries) and surface to observability dashboards.
- **Why:** Establishes governance and observability from day one.

---

## 📌 Acceptance Criteria
- [ ] Authorized staff can mark appointments as arrived, creating or updating linked job cards with intake metadata.
- [ ] Mandatory photo capture blocks completion until required media is successfully uploaded.
- [ ] Optional condition fields store structured data and appear on generated intake documents.
- [ ] Customers receive arrival notifications and can access intake summaries securely.
- [ ] `appointment.arrived` events fire with payloads validated in staging monitoring dashboards.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Workflow & permissions | 2.0 days |
| Evidence capture & storage | 2.5 days |
| Intake documents & notifications | 2.0 days |
| Telemetry & configuration | 1.0 day |

**Total:** ~7.5 dev days

---

## ✅ Sprint Outcome
- Staff-driven check-in workflow that reliably transitions appointments into actionable job cards.
- Mandatory photo and optional condition capture producing tamper-resistant intake documentation.
- Customers and downstream services are informed in real time through notifications and event streams.
