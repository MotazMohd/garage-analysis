```mermaid
flowchart TD
    subgraph Entry[Access Channels]
        AdminPortal[Admin Portal]
        GaragePortal[Garage Portal]
        MobileApp[Technician Mobile App]
        PartnerApp[Partner App]
        EdgeGateway[Edge API Gateway]
    end

    subgraph IdentityServices[Identity Services]
        InviteSvc[Invitation Service]
        RegistrationSvc[Self-Registration Service]
        CredentialIssuer[Credential Issuer]
        MFACore[MFA Core]
        RoleEngine[Role Governance Engine]
        SessionService[Session Management Service]
        ImpersonationGuard[Impersonation Guard]
    end

    subgraph SecurityData[Security Data Stores]
        InviteStore[(Invitation Ledger)]
        CredentialVault[(Credential Vault)]
        MfaStore[(MFA Secret Store)]
        IdentityDirectory[(Identity Directory)]
        RolePolicyStore[(Role Policy Store)]
        SessionCache[(Session Cache)]
        AuditTrail[((Security Audit Trail))]
        AlertQueue[((Security Alert Queue))]
    end

    subgraph Observability[Security Operations]
        SIEM[SIEM Platform]
        ThreatIntel[Threat Intelligence Feeds]
        MetricsStack[Identity Metrics]
    end

    subgraph Integrations[External Integrations]
        EmailService[Email Service]
        SmsService[SMS Service]
        PushService[Push Notification Service]
        WebhookTargets[Webhook Targets]
    end

    EdgeGateway --> InviteSvc
    EdgeGateway --> RegistrationSvc
    EdgeGateway --> CredentialIssuer
    EdgeGateway --> MFACore
    EdgeGateway --> RoleEngine
    EdgeGateway --> SessionService

    InviteSvc --> InviteStore
    InviteSvc --> EmailService
    InviteSvc --> SmsService

    RegistrationSvc --> IdentityDirectory
    RegistrationSvc --> AuditTrail

    CredentialIssuer --> CredentialVault
    CredentialIssuer --> IdentityDirectory
    CredentialIssuer --> AuditTrail

    MFACore --> MfaStore
    MFACore --> SmsService
    MFACore --> PushService

    RoleEngine --> RolePolicyStore
    RoleEngine --> AuditTrail
    RoleEngine --> ImpersonationGuard

    SessionService --> SessionCache
    SessionService --> AuditTrail

    ImpersonationGuard --> AlertQueue
    ImpersonationGuard --> AuditTrail
    AlertQueue --> EmailService
    AlertQueue --> SmsService

    AuditTrail --> SIEM
    SIEM --> ThreatIntel
    AuditTrail --> MetricsStack
    SessionCache --> MetricsStack
    RolePolicyStore --> MetricsStack

    WebhookTargets --> EdgeGateway
    IdentityDirectory --> MetricsStack
    CredentialVault -. compliance logs .-> AuditTrail
```
