# User & Role Management – Level 1 Data Flow

```mermaid
flowchart TD
    Admin[Garage/SaaS Admin] -->|1. Invite user| P1((P1 Issue Invitation))
    P1 --> Email[(Email/SMS Gateway)]
    SelfReg[Self-Registration Portal] -->|Submit request| P2((P2 Validate Registration))
    P2 --> Pending[(Pending Users Store)]
    Pending -->|Notify admins| Email
    User[User] -->|2. Activate account| P3((P3 Credential Provisioning))
    P3 --> Directory[(Identity Directory)]
    P3 --> Audit[(Audit Ledger)]
    User -->|3. Authenticate| P4((P4 MFA & Session Control))
    P4 --> Sessions[(Session Store)]
    P4 --> Devices[(Device Trust Records)]
    P4 --> Audit
    Admin -->|4. Adjust roles| P5((P5 Role Governance))
    P5 --> Directory
    P5 --> Audit
    Admin -->|5. Impersonate| P6((P6 Delegated Session))
    P6 --> Sessions
    P6 --> Notify[Notification Service]
    Monitor[Monitoring Jobs] -->|6. Generate alerts| P7((P7 Security Alerts))
    P7 --> Notify
    P7 --> Audit
```

The Level 1 view enumerates core identity processes: invitation, self-registration validation, credential issuance, MFA enforcement, role governance, impersonation, and alerting.
