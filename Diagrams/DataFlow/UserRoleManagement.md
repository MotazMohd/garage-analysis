# User & Role Management – Data Flow

```mermaid
flowchart TD
    GA[Garage Admin Console] -->|Invite / approve user| URS[User Directory Service]
    SA[SaaS Admin Console] -->|Provision SaaS roles| URS
    URS -->|Generate invitation token| Comm[Email / SMS Gateway]
    Comm --> User[User]
    User -->|Accept invite & submit profile| Auth[Authentication API]
    Auth -->|Create account| Directory[(User Directory)]
    Auth -->|Enroll MFA| MFA[MFA Provider]
    URS -->|Notify approval status| Comm
    User -->|Self-register| Portal[Self-Service Portal]
    Portal -->|Queue for review| URS
    URS -->|Review & assign role/branch| GA
    URS -->|Persist role mapping| Directory
    URS -->|Log governance event| Audit[(Audit Trail)]
    User -->|Sign in| Auth
    Auth -->|Validate MFA| MFA
    Auth -->|Issue session| Sessions[(Session Store)]
    GA -->|Force logout / revoke access| Sessions
    SA -->|Impersonate user| URS
    URS -->|Create impersonation session| Sessions
    Sessions -->|Emit security alerts| Notify[Notification Service]
    Notify --> GA
    Notify --> SA
```

The flow illustrates invitation and self-registration paths, approval and role assignment activities, MFA enrolment, and how sessions and audit logs are coordinated for governance.
