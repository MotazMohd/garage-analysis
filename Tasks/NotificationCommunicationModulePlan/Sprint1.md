# 🚀 Sprint 1: Messaging Foundations

## 🎯 Sprint Goal
Establish the core notification service with channel abstractions, tenant preferences, templating, and delivery logging so downstream modules can trigger reliable, localized messages.

---

## ✅ Tasks Breakdown

### 1. Domain Modeling & Preference Store
- **Schema:** Create `NotificationEvent`, `NotificationAttempt`, `ChannelPreference`, and `Template` tables scoped by tenant and branch.
- **Preference Center:** Build APIs/UI to capture per-user and per-tenant opt-in/out per channel with default fallbacks.
- **Why:** Ensures consent, personalization, and routing rules are consistent across the platform.

### 2. Provider Abstractions & Integrations
- **Email:** Integrate with primary provider (e.g., SendGrid) using API keys stored in secrets manager.
- **SMS:** Integrate with regional provider supporting Arabic content and delivery receipts.
- **Abstraction:** Implement provider adapters with retry/backoff and health checks behind a unified interface.
- **Why:** Allows future provider swaps without rewriting upstream logic.

### 3. Template Management & Localization
- **Authoring:** Provide admin UI and API for managing templates with versioning, variables, and bilingual content (LTR/RTL support).
- **Rendering:** Implement handlebars/JSON logic to render dynamic variables and garage branding.
- **Preview:** Support sandbox preview with sample payloads before publishing.
- **Why:** Ensures consistent, localized messaging with governance controls.

### 4. Event Ingestion & Dispatch Pipeline
- **Ingestion:** Expose REST + message bus endpoints for other services to submit notification requests.
- **Queueing:** Use durable queue (e.g., RabbitMQ/Kafka topic) to decouple event producers and handle retries.
- **Dispatcher:** Build worker service processing queued events, honoring preferences and channel availability.
- **Why:** Decouples producers from channel-specific send logic and improves resilience.

### 5. Delivery Logging & Observability
- **Logging:** Persist attempts, responses, and metadata for each channel in an auditable format.
- **Monitoring:** Publish metrics (success rate, latency, bounce) and configure alerting for provider failures.
- **Support Tools:** Build search UI/filter for delivery history per tenant.
- **Why:** Enables troubleshooting and SLA monitoring for operations teams.

---

## 📌 Acceptance Criteria
- [ ] Notification schemas, APIs, and preference models exist with tenant and branch scoping.
- [ ] Email and SMS providers send localized messages with retry/backoff, health checks, and credential rotation.
- [ ] Templates support Arabic and English content, variable substitution, previews, and version history.
- [ ] Services can submit events via API or queue, and the dispatcher processes them respecting preferences.
- [ ] Delivery attempts and outcomes are logged, searchable, and surfaced in basic monitoring dashboards.

---

## 🔗 Dependencies & Risks
- **Dependencies:** Identity & Access for user metadata, Secrets manager for provider credentials, Observability stack for metrics.
- **Risks:** Regional SMS deliverability constraints, template localization complexity, and ensuring preference defaults for legacy users.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Domain modeling & preferences | 1.1 days |
| Provider integrations & abstraction | 1.3 days |
| Template management & localization | 1.2 days |
| Event ingestion & dispatcher | 1.0 days |
| Logging, monitoring, and tooling | 0.4 days |

**Total:** ~5 dev days

---

## ✅ Sprint Outcome
- Multi-channel notification service with consent-aware routing is live and integrated with foundational providers.
- Other modules can queue events with confidence that localized templates and retries will handle delivery.
- Operations gain visibility into delivery performance and failure reasons for early issue resolution.
