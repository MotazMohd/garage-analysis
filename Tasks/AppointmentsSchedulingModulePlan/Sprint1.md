# 🚀 Sprint 1: Appointment Foundations

## 🎯 Sprint Goal
Deliver the core calendar, slot, and booking APIs so customers can self-schedule visits while the garage maintains accurate technician capacity and operating hours.

---

## ✅ Tasks Breakdown

### 1. Calendar & Availability Modeling
- **Entities:** Define `ServiceCalendar`, `WorkingHour`, `AppointmentSlot`, and `BlackoutWindow` tables with location/technician associations.
- **Rules:** Support configurable operating hours, holidays, maintenance downtime, and per-technician overrides.
- **Time Zones:** Persist canonical timezone information for each garage/branch.
- **Why:** Establishes a reliable scheduling backbone that handles multi-location complexity.

### 2. Slot Generation Service
- **Batch Process:** Nightly job to generate slots based on calendars, slot length, and capacity rules.
- **On-Demand API:** `POST /api/appointments/slots:generate` for immediate recalculation when calendars change.
- **Conflict Detection:** Prevent overlap when technicians are already booked or assigned to jobs.
- **Why:** Keeps available inventory of slots accurate for booking and reporting.

### 3. Public Booking APIs & UI
- **Endpoints:**
  - `GET /api/appointments/slots` filtered by service type, location, and preferred staff.
  - `POST /api/appointments` to create bookings with customer/vehicle details.
- **Validation:** Enforce lead time, service duration, and required tool/skill tags.
- **UI:** Basic booking form with slot picker, summary of estimated duration, and confirmation view.
- **Why:** Enables self-service scheduling with guardrails that protect operations.

### 4. Internal Dashboard Basics
- **Interface:** Calendar view showing booked slots, open capacity, and blackout periods.
- **Actions:** Allow staff to create manual appointments, block slots, and mark tentative holds.
- **Why:** Gives service advisors operational control without relying on engineering support.

---

## 📌 Acceptance Criteria
- [ ] Calendars support location/technician availability, holidays, and blackout windows.
- [ ] Slots are generated automatically and can be refreshed on-demand after calendar changes.
- [ ] Customers can book appointments through the API/UI with duration and capacity validation.
- [ ] Staff can view and manage the schedule from an internal dashboard.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Calendar modeling & migrations | 1.5 days |
| Slot generation services | 1.5 days |
| Public booking API & UI | 1 day |
| Internal dashboard basics | 1 day |

**Total:** ~5 dev days

---

## ✅ Sprint Outcome
- Core scheduling data structures and services provide accurate visibility into availability.
- Customers gain a guided booking experience aligned to service constraints.
- Garage staff maintain control over the calendar with minimal manual overhead.
