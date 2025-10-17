# 🚀 Sprint 1: Foundation & Frameworks

## 🎯 Sprint Goal
Stand up the localization service, bidirectional design system foundations, and accessibility guardrails so every squad can begin internationalizing features without rework.

---

## ✅ Tasks Breakdown

### 1. Localization Service & Translation Memory
- **Service Layer:** Build centralized localization API with namespace/version support, language fallback chain (ar → en), and caching.
- **Data Model:** Create entities for `Locale`, `TranslationKey`, `TranslationVariant`, and `AuditLog` with soft-delete & status tracking.
- **Import Pipeline:** Support JSON/YAML import to seed existing copy and connect to translation memory.
- **Why:** Provides a single source of truth for translations across web, mobile, and notifications.

### 2. Bidirectional Design System Upgrade
- **Component Audit:** Refactor shared UI components to be direction-aware (margin/padding flips, icon mirroring, grid alignment).
- **Tokenization:** Introduce semantic spacing/typography tokens that map to RTL/LTR values, stored in design tokens repo.
- **Theming Hooks:** Update CSS/SCSS utilities (or Tailwind config) to toggle `dir` attributes at layout and component levels.
- **Why:** Ensures consistent RTL support and reduces one-off CSS overrides.

### 3. Accessibility Engineering Pipeline
- **Linting Rules:** Add ESLint/Stylelint/SwiftLint rules for ARIA labels, color contrast usage, and heading hierarchy.
- **CI Integration:** Run axe-core/Pa11y checks in CI for priority flows (login, dashboard, scheduling) with gating thresholds.
- **Storybook Checks:** Embed accessibility add-ons to highlight violations during component development.
- **Why:** Catches regressions early and enforces WCAG 2.1 AA from the start.

### 4. Locale-Aware Formatting Utilities
- **Utility Library:** Build shared helpers for currency, dates (Gregorian/Hijri), numbers, and pluralization using ICU.
- **Configuration:** Allow garages to set default locale/timezone/currency with overrides at branch level.
- **Fallbacks:** Provide safe defaults and telemetry for unsupported formatting scenarios.
- **Why:** Prevents duplicated logic and ensures consistent formatting across modules.

### 5. Governance & Observability Hooks
- **Audit Logging:** Track translation fetches, missing keys, linting violations, and overrides with actor context.
- **Dashboards:** Create Grafana/Looker dashboards showing coverage %, top failing pages, and a11y violation trends.
- **Alerting:** Wire alerts for missing translation spikes, failing accessibility builds, and formatting errors.
- **Why:** Gives product and platform teams visibility into readiness gaps before launch.

---

## 📌 Acceptance Criteria
- [ ] Localization API serves translations with language fallback and caches; initial Arabic/English catalogs seeded.
- [ ] Design system components respect RTL/LTR directionality with mirrored icons, spacing, and alignment rules.
- [ ] Accessibility linting and automated tests run in CI with thresholds enforced for core user journeys.
- [ ] Formatting utilities handle currency, date (incl. Hijri), and pluralization with tenant-level defaults.
- [ ] Observability dashboards and alerts exist for missing keys, translation coverage, and accessibility regressions.

---

## 🔗 Dependencies & Risks
- **Dependencies:** Design tokens repository access, Notification template schemas, Observability stack (metrics/logs), Identity module for tenant settings.
- **Risks:** Retrofits in legacy components, potential performance impact from runtime direction changes, limited availability of Arabic linguists for initial catalog QA.

---

## ⏱️ Estimated Effort
| Area | Time |
|------|------|
| Localization service & data model | 1.6 weeks |
| Design system RTL retrofits | 1.8 weeks |
| Accessibility tooling & CI integration | 1.2 weeks |
| Formatting utilities & tenant configs | 0.8 weeks |
| Observability & governance setup | 0.6 weeks |

**Total:** ~6 weeks (parallelized across platform + frontend squads)

---

## ✅ Sprint Outcome
- Localization foundations ready for consumption by product teams with strong guardrails.
- Bidirectional UI components and formatting utilities available via shared packages.
- Automated checks reduce risk of shipping non-compliant or untranslated experiences in subsequent sprints.
