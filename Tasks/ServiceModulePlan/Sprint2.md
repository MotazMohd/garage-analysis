# 🔧 Sprint 2 — Operational Intelligence & Guardrails

## 🎯 Goal
Connect services to the operational context—people, tools, and inspections—so bookings automatically respect real-world prerequisites and the platform can drive better technician assignment decisions.

## 📦 Key Deliverables
- Skill tagging model shared across services and technicians.
- Tool dependency mapping surfaced through admin forms and APIs.
- Pre-check configuration enabling chained service workflows.
- Recommended part library that powers upsell and maintenance prompts.

## 🛠️ Major Tasks
1. **Create `TechnicianSkillTag`** table with many-to-many mapping to services; expose selection in the admin UI and return tags via service detail APIs.
2. **Link garage tools** by referencing existing tool catalogue records; ensure selection UI supports search and chip-style summaries.
3. **Implement pre-check logic** with `RequiresPreCheck` and `PreCheckServiceId`; booking services must validate prerequisites and provide actionable error messaging.
4. **Add recommended parts** entity storing rule metadata (free-text or JSON) and surface suggestions in service responses for downstream use.
5. **Expand API surface** (`GET/POST/PUT /api/services`) to include skills, tools, pre-check metadata, and recommended parts with optimistic concurrency guards.
6. **Update admin experience** to display contextual hints (e.g., warn if pre-check references a service hidden from customers) and to support quick-add for recommended parts.

## ✅ Acceptance Criteria
- Service detail response lists skill tags and tool requirements; UI renders badges in admin view.
- Attempting to book a service requiring pre-check prompts the correct validation message when the prerequisite job is missing.
- Recommended parts store audit metadata (creator, timestamp) and appear in booking payloads for frontends to display.
- Regression suite covers combinations of required/optional parts with pre-check-enforced scenarios.

## 🔗 Dependencies
- Technician profile service exposes API for retrieving skill tags so duplication is avoided.
- Tool Management module must have baseline catalogue endpoints available for reference.

## ⚠️ Risks & Mitigations
- **Circular pre-check definitions** could deadlock booking → enforce validation preventing a service from referencing itself or creating loops.
- **Data inflation** from recommended parts rules → store JSON with schema validation and document supported keys to reduce free-form drift.

## ⏱️ Estimated Effort
| Role | Time |
| --- | --- |
| Backend engineer | 3.5 days |
| Frontend engineer | 2 days |
| QA / Automation | 1 day |
| Product / Content support | 0.5 day |

_Total: ~7 days._
