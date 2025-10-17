# 🔁 Sprint 2: Engagement & Service History

## 🎯 Sprint Goal
Deliver relationship-building capabilities by connecting service history, loyalty programs, and proactive communication workflows.

---

## ✅ Tasks Breakdown

### 1. Service Visit Timeline
- **Data Model:**
  - `CustomerVisit`: `Id`, `CustomerId`, `VehicleId`, `JobCardId`, `AppointmentId?`, `VisitType` (Scheduled, Walk-in), `CheckInAt`, `CheckOutAt`, `TotalSpend`, `SatisfactionScore?`.
  - `VisitRecommendation`: `Id`, `CustomerVisitId`, `ServiceTemplateId`, `Status` (Suggested, Accepted, Declined), `Notes`.
- **UI:** Timeline component showing past visits with drill-down into job cards, parts used, and recommendations.
- **Why:** Gives advisors and customers quick visibility into historical work and future needs.

### 2. Loyalty & Membership Tracking
- **Data Model:**
  - `LoyaltyProgram`: `Id`, `Name`, `Description`, `AccrualRule`, `RedemptionRule`, `IsActive`.
  - `CustomerLoyaltyBalance`: `Id`, `CustomerId`, `ProgramId`, `PointsBalance`, `Tier`, `LastUpdatedAt`.
  - `LoyaltyTransaction`: `Id`, `BalanceId`, `Type` (Earn, Redeem, Adjustment), `Points`, `ReferenceId`, `ReferenceType`, `Notes`, `CreatedAt`, `CreatedBy`.
- **Logic:** Hooks into job completion to award points, redemption UI for discounts, and tier upgrades with notifications.
- **Why:** Drives retention and enables marketing campaigns.

### 3. Communication Journeys
- **Tasks:**
  - Template builder for common journeys (post-service follow-up, reminder, birthday greeting).
  - Integrate with notification service to schedule SMS/email/WhatsApp based on triggers and preferences.
  - Add suppressions for opted-out customers and quiet hours configuration.
- **Why:** Automates personalized touchpoints without violating preferences.

### 4. Customer 360 Dashboard
- **UI:**
  - Overview tab with KPIs (total visits, spend, satisfaction average, open recommendations).
  - Activity feed aggregating notes, communications, and loyalty events.
  - Quick actions (create appointment, send message, add note).
- **Why:** Empowers advisors with a single console for customer engagement.

### 5. Analytics & Segmentation Export
- **Tasks:**
  - Saved segments based on filters (spend, last visit, loyalty tier, vehicle make).
  - Export API for marketing automation tools with opt-in filters.
  - Data warehouse sync (incremental) for BI dashboards.
- **Why:** Supports targeted campaigns and leadership reporting.

---

## 📌 Acceptance Criteria
- [ ] Service visit timeline aggregates job card and recommendation data.
- [ ] Loyalty points accrue/redeem automatically with auditability.
- [ ] Communication journeys respect channel preferences and quiet hours.
- [ ] Customer 360 dashboard surfaces KPIs, activity, and quick actions.
- [ ] Segments can be saved, exported, and synced to analytics safely.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Backend (visits, loyalty, communications integrations) | 3.5 days |
| Frontend (dashboards, timeline, template builder) | 2.5 days |
| Data/Analytics (exports, warehouse sync) | 1.0 day |
| QA/UAT | 0.5 day |

**Total:** ~7.5 dev days

---

## ✅ Sprint Outcome
- Rich customer engagement tooling with automated journeys and loyalty hooks.
- Unified dashboard for frontline teams to deliver personalized service.
- Marketing-ready segments and data feeds for growth initiatives.
