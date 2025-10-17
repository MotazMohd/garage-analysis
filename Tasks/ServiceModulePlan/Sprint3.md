# 🎨 Sprint 3 — Customer Experience & Booking UX

## 🎯 Goal
Ensure services surface in customer and technician journeys with the right visibility, sequencing, and upsell context while maintaining compliance controls for approval-required work.

## 📦 Key Deliverables
- Visibility and booking flags controlling how services appear in portals and apps.
- Customer-facing part selection experience that honours admin-configured rules.
- Filtered, ordered catalogue endpoints supporting discovery by category and priority.
- Playbooks and analytics hooks capturing how customers interact with optional and recommended items.

## 🛠️ Major Tasks
1. **Add visibility fields** (`IsCustomerVisible`, `CanBeBookedDirectly`, `IsAddOn`, `RequiresApproval`, `DisplayOrder`) with admin UI controls and validation.
2. **Extend booking endpoints/UI** to render required vs optional vs locked parts, including “customer-supplied” flows, across web and mobile channels.
3. **Surface recommended parts** within booking flows and record acceptance/decline decisions for downstream analytics.
4. **Implement catalogue filtering & sorting** by category, search term, and display order in `/api/services` responses, with pagination for mobile clients.
5. **Provide approval workflow hooks** by flagging services that require manager confirmation and emitting events for the notification/approval engine.
6. **Update documentation and training** to guide garages on best practices for add-ons, hidden services, and sequencing strategies.

## ✅ Acceptance Criteria
- Customer catalogue shows only `IsCustomerVisible = true` services and honours `DisplayOrder`.
- Attempting to book an approval-required service triggers workflow integration (event or API call) and blocks scheduling until resolved.
- Optional and recommended parts render with correct defaults and persist customer selections into job cards.
- Analytics instrumentation captures add-on adoption rates and approval turnaround metrics.

## 🔗 Dependencies
- Notification/approval service must expose API to receive booking approval events.
- Reporting module consumes analytics emitted for adoption metrics.

## ⚠️ Risks & Mitigations
- **Fragmented experience between web and mobile:** align design system components and share interaction specs with mobile team early.
- **Over-surfacing add-ons:** include per-garage caps and copy review to keep experiences customer-friendly.

## ⏱️ Estimated Effort
| Role | Time |
| --- | --- |
| Frontend engineer (web) | 3 days |
| Mobile engineer | 2 days |
| Backend engineer | 1.5 days |
| QA / UAT | 1.5 days |

_Total: ~8 days._
