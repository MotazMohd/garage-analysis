# 🛠️ Purchase Orders & Supplier Integration – Sprint 1 Plan

## 🎯 Sprint Goal
Establish the core purchase order lifecycle and supplier master data so that garages can request and track replenishment of
critical parts and tooling from approved vendors.

## 📦 Scope & Deliverables
- **Supplier Master Setup**
  - Create supplier entities with contact details, payment terms, and categories (parts, tooling, consumables).
  - Implement supplier onboarding workflow with status transitions (prospect → active → suspended).
  - Upload/import templates for existing supplier catalogs and price lists.
- **Purchase Order Foundations**
  - Design PO data model covering line items, tax, shipping, approvals, and fulfillment tracking.
  - Build CRUD interfaces/APIs for drafting, submitting, and amending POs from spare parts reorder points.
  - Enable PO number sequencing with branch prefixes and audit trail capture.
- **Approval & Compliance Controls**
  - Configure role-based approval matrix driven by total order value and category.
  - Capture digital signatures/time stamps for approvals with immutable logs.
  - Integrate budget guardrails to prevent overspending vs. per-branch allocations.
- **Integrations & Notifications**
  - Emit events to inventory service when POs are approved or cancelled.
  - Trigger notifications to approvers and suppliers (email/export) with standardized templates.

## ✅ Acceptance Criteria
- Suppliers can be created, edited, activated/suspended, and searched by category or compliance status.
- A service manager can raise a PO against a supplier catalog, submit for approval, and see state changes in real time.
- Approval rules automatically route POs to the correct approver and block orders exceeding budget caps.
- Downstream systems receive PO approval/cancellation events with full payloads for inventory syncing.

## 📊 Effort & Resourcing
- **Estimated Effort:** ~8 dev days.
- **Team:** 1 product manager, 2 full-stack engineers, 1 QA.
- **Dependencies:** Existing spare parts catalog, role/permission service, notification service.
