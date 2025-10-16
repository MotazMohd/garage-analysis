# 🧾 Invoice & Billing — Sprint 1 Plan (Foundations)

## 🎯 Sprint Goal
Establish trusted billing foundations so garages can generate compliant invoices from completed jobs and track payments reliably across branches.

---

## 📦 Key Deliverables
1. **Invoice Data Model & Storage**
   - Introduce core entities (`Invoice`, `InvoiceLineItem`, `InvoiceAdjustment`, `PaymentRecord`).
   - Support linkage to job cards, customers, vehicles, and applied spare parts.
   - Define tax profile references for regional compliance and auditing.
2. **Invoice Generation Service**
   - Generate invoices from completed job cards with configurable sequencing rules.
   - Calculate labor, parts, shop fees, taxes, and discounts using shared pricing engines.
   - Persist invoice snapshots with versioning to capture post-generation adjustments.
3. **Draft & Approval Workflow**
   - Allow finance or branch managers to review, edit, and approve invoices before issuing.
   - Provide change tracking, notes, and status transitions (Draft → Pending Approval → Approved → Issued).
4. **Customer Communication Templates**
   - Produce PDF and email templates with localized branding and regulatory disclosures.
   - Integrate with notification platform for delivery events and bounce/error handling.
5. **Foundational API & UI Surfaces**
   - Expose REST endpoints for listing, retrieving, and updating invoices with role-based permissions.
   - Provide initial UI screens for finance teams to search invoices and view payment status.

---

## ✅ Acceptance Criteria
- Invoice entities persisted with referential integrity checks and audit metadata.
- Invoices can be generated automatically upon job completion and manually via API/UI.
- Approval workflow enforces required roles and logs every status transition.
- Email/PDF outputs are generated with accurate totals, taxes, and disclaimers.
- API responses adhere to pagination, filtering by branch/date/status, and consistent error handling.

---

## 🔄 Dependencies & Collaboration
- **Job Cards & Task Assignment:** Access to completed job summaries, labor, and parts consumption.
- **Spare Parts & Inventory:** Price list and tax code information for part line items.
- **Notification Service:** Email dispatch and tracking webhooks for invoice delivery.
- **Finance Stakeholders:** Validation of approval steps, invoice layouts, and compliance statements.

---

## 🧮 Estimated Effort
- **Back-end:** ~7 dev days (entities, generation service, workflow state machine).
- **Front-end:** ~3 dev days (invoice list/detail screens, approval controls).
- **QA & UAT:** ~2 dev days (workflow scenarios, PDF validation, tax calculation accuracy).
- **Total:** ~12 dev days.
