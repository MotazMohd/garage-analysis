# Garage & Branch Management – Level 1 Data Flow

```mermaid
flowchart TD
    GA[Garage Admin] -->|1. Submit application form| P1((P1 Capture Garage Profile))
    P1 -->|Validate & stage data| Garages[(Garage Pending Store)]
    P1 -->|Upload documents| Storage[(Document Vault)]
    Garages -->|Queue for approval| P2((P2 Review & Decision))
    SaaS[SaaS Admin] -->|2. Review submission| P2
    P2 -->|Approve / reject| Garages
    P2 -->|Notify outcome| Notify[Notification Service]
    P2 -->|Log decision| Audit[(Audit Ledger)]
    GA -->|3. Configure branches| P3((P3 Apply Branch Inheritance))
    P3 -->|Load defaults| Garages
    P3 -->|Persist branches| Branches[(Branch Registry)]
    P3 -->|Record overrides| Audit
    GA -->|4. Manage staff visibility| P4((P4 Assign Branch Access))
    P4 --> Staff[(User Directory)]
    P4 --> Audit
    SaaS -->|Suspend / archive| P5((P5 Lifecycle Control))
    P5 --> Garages
    P5 --> Notify
    P5 --> Audit
```

This Level 1 diagram expands the garage onboarding flow into discrete processes covering profile capture, approval, branch inheritance, staff visibility, and lifecycle enforcement.
