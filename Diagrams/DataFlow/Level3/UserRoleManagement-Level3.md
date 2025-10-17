```mermaid
flowchart TD
    subgraph EntryPoints
        A1[Admin Invitation Console]
        A2[Self-Registration Form]
        A3[MFA Enrollment Wizard]
    end

    subgraph IdentityServices[Identity Services]
        B1[Identity API Gateway]
        B2[Role Policy Engine]
        B3[Session Manager]
        B4[Delegated Impersonation Service]
    end

    subgraph Integrations
        C1[(Email/SMS Provider)]
        C2[((Security Event Bus))]
        C3[(Directory & Roles Store)]
        C4[((Session Cache))]
    end

    A1 -->|invite user| B1
    A2 -->|submit registration| B1
    B1 -->|store profile| C3
    B1 -->|send confirmation| C1
    B1 -->|log activity| C2

    A3 -->|enroll factors| B3
    B3 -->|persist secrets| C4
    B3 -->|record event| C2

    B2 -->|evaluate request| B1
    B2 -->|write role grants| C3
    B2 -->|publish audit| C2

    B4 -->|request token| B3
    B3 -->|validate MFA| C4
    B3 -->|issue session| C4
    B4 -->|record impersonation| C2

    C3 -->|sync permissions| AdminPortal[Garage Admin Portal]
    C3 -->|sync to SaaS Ops| SaaSOps[SaaS Operations Console]
    C2 -->|trigger alerts| SecurityTeam[Security Team Dashboard]
```
