# User & Role Management – Level 2 (Identity Lifecycle)

```mermaid
flowchart LR
    SaaSAdmin([SaaS Admin])
    GarageAdmin([Garage Admin])
    User([User / Technician])
    IdP[Identity Service]
    Invitation[Invitation Service]
    MFA[MFA Provider]
    SessionSvc[Session Control]
    Audit[(Audit Ledger)]
    Directory[(Identity Directory)]
    Notification[Notification Service]

    SaaSAdmin -->|Seed tenant roles| Directory
    SaaSAdmin -->|Assign feature flags| IdP

    GarageAdmin -->|Invite user| Invitation
    Invitation -->|Email/SMS token| Notification
    Notification -->|Send invite| User
    User -->|Accept invite| Invitation
    Invitation -->|Create account| IdP
    IdP -->|Persist profile| Directory
    Invitation -->|Log event| Audit

    User -->|Enroll second factor| MFA
    MFA -->|Store secret| Directory
    MFA -->|Status update| Audit

    GarageAdmin -->|Assign role| IdP
    IdP -->|Update permissions| Directory
    IdP -->|Emit audit trail| Audit

    User -->|Authenticate| IdP
    IdP -->|Validate MFA| MFA
    IdP -->|Issue session| SessionSvc
    SessionSvc -->|Session metadata| Audit

    SaaSAdmin -->|Impersonation request| SessionSvc
    SessionSvc -->|Temporary token| SaaSAdmin
    SessionSvc -->|Notify action| Notification
    Notification -->|Alert targeted user| User
    SessionSvc -->|Record impersonation| Audit
```

The Level 2 diagram highlights how invitations, MFA enrollment, role assignments, and impersonation events rely on the identity directory, MFA provider, and shared audit store.
