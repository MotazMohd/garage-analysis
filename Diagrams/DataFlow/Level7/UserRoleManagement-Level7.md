```mermaid
flowchart TD
    subgraph Governance[Identity Governance]
        AccessPolicies[(Access Control Policies)]
        SoDMatrix[(Segregation of Duties Matrix)]
        CertificationSchedule[(Access Certification Schedule)]
    end

    subgraph IdentityOps[Identity Security Operations]
        IdentitySIEM[Identity SIEM Analytics]
        BehaviorAnalytics[Behavior Analytics Engine]
        PrivilegeScanner[Privilege Scanner]
        MFAHealth[Credential & MFA Health Monitor]
        IdentityResponder[Identity Incident Response]
    end

    subgraph IdentityServices[Identity Services]
        InvitationSvc[Invitation Service]
        RegistrationSvc[Registration Service]
        RoleProvisioner[Role Provisioning Service]
        SessionManager[Session Management]
        ImpersonationGuard[Impersonation Guard]
        AuditLogger[Audit Logger]
    end

    subgraph Stores[Identity Stores]
        IdentityDirectory[(Identity Directory)]
        CredentialVault[(Credential Vault)]
        MFADevices[(MFA Device Ledger)]
        SessionStore[(Session Store)]
        AuditStream[((Identity Audit Stream))]
    end

    AccessPolicies --> RoleProvisioner
    SoDMatrix --> RoleProvisioner
    CertificationSchedule --> IdentityResponder

    InvitationSvc --> IdentityDirectory
    RegistrationSvc --> IdentityDirectory
    RoleProvisioner --> IdentityDirectory
    SessionManager --> SessionStore
    ImpersonationGuard --> SessionStore
    IdentityServices --> AuditLogger
    AuditLogger --> AuditStream

    CredentialVault --> MFAHealth
    MFADevices --> MFAHealth
    SessionStore --> BehaviorAnalytics
    AuditStream --> IdentitySIEM
    IdentitySIEM --> IdentityResponder
    BehaviorAnalytics --> IdentityResponder
    PrivilegeScanner --> IdentityResponder
    MFAHealth --> IdentityResponder

    IdentityResponder -->|Remediation| IdentityDirectory
    IdentityResponder --> CredentialVault
    IdentityResponder --> SessionStore
    IdentityResponder --> AccessPolicies
    IdentityResponder --> TrustPortal[Trust & Access Reports]
```
