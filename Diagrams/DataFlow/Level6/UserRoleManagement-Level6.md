```mermaid
flowchart TD
    subgraph GlobalEdge[Global Identity Edge]
        DNS[Geo DNS]
        CDN[Edge CDN]
        WAF[Edge WAF]
        IdPFederation[Global Identity Provider]
        OTPGateway[Global OTP Gateway]
    end

    subgraph PrimaryRegion[Primary Region]
        subgraph PrimaryIngress[Ingress & Mesh]
            PrimaryALB[Identity Ingress LB]
            PrimaryMeshGW[Identity Mesh Gateway]
            PrimaryAuthProxy[Adaptive Auth Proxy]
        end

        subgraph PrimaryIdentityServices[Identity Services]
            InviteSvc[Invitation Service Pods]
            RegistrationSvc[Registration Pods]
            CredentialIssuer[Credential Issuance Pods]
            MFASvc[MFA Challenge Pods]
            RolePolicySvc[Role Policy Pods]
            SessionBroker[Session Broker Pods]
            ImpersonationGuard[Impersonation Guard Pods]
        end

        subgraph PrimaryIdentityStores[Primary Stores]
            IdentityDirectoryPrimary[(Identity Directory Primary)]
            CredentialVaultPrimary[(Credential Vault Primary)]
            TokenLedgerPrimary[(Token Ledger Primary)]
            RolePolicyStorePrimary[(Role Policy Store Primary)]
            SessionStorePrimary[(Session Store Primary)]
            AuditTrailPrimary[((Security Audit Stream Primary))]
        end

        subgraph PrimaryIdentityOps[Primary Observability]
            MetricsPrimary[Metrics Stack]
            LogsPrimary[Log Aggregator]
            TracesPrimary[Trace Collector]
            KeyRotationPrimary[Key Rotation Scheduler]
        end
    end

    subgraph SecondaryRegion[Secondary Region]
        subgraph SecondaryIngress[Standby Ingress]
            SecondaryALB[Standby Identity LB]
            SecondaryMeshGW[Standby Mesh Gateway]
            SecondaryAuthProxy[Standby Auth Proxy]
        end

        subgraph SecondaryIdentityServices[Standby Services]
            InviteStandby[Invitation Standby Pods]
            RegistrationStandby[Registration Standby Pods]
            CredentialIssuerStandby[Credential Issuance Standby]
            MFAStandby[MFA Challenge Standby]
            RolePolicyStandby[Role Policy Standby]
            SessionBrokerStandby[Session Broker Standby]
            ImpersonationGuardStandby[Impersonation Guard Standby]
        end

        subgraph SecondaryIdentityStores[Replica Stores]
            IdentityDirectorySecondary[(Identity Directory Replica)]
            CredentialVaultSecondary[(Credential Vault Replica)]
            TokenLedgerSecondary[(Token Ledger Replica)]
            RolePolicyStoreSecondary[(Role Policy Store Replica)]
            SessionStoreSecondary[(Session Store Replica)]
            AuditTrailSecondary[((Security Audit Mirror))]
        end

        subgraph SecondaryIdentityOps[Secondary Observability]
            MetricsSecondary[Metrics Mirror]
            LogsSecondary[Log Mirror]
            TracesSecondary[Trace Mirror]
            DRPlaybooks[Identity DR Playbooks]
        end
    end

    subgraph SharedServices[Shared Services]
        SecretsManager[Secrets Manager]
        ConfigRepo[Config Repository]
        CI_CD[CI/CD Pipeline]
        HSM[Hardware Security Module]
        SIEM[Security Analytics]
        IncidentBridge[Incident Bridge]
    end

    CDN --> WAF --> DNS
    IdPFederation --> PrimaryAuthProxy
    IdPFederation --> SecondaryAuthProxy
    OTPGateway --> MFASvc
    OTPGateway --> MFAStandby

    DNS --> PrimaryALB --> PrimaryMeshGW --> PrimaryAuthProxy
    PrimaryAuthProxy --> InviteSvc
    PrimaryAuthProxy --> RegistrationSvc
    PrimaryAuthProxy --> SessionBroker

    InviteSvc --> IdentityDirectoryPrimary
    RegistrationSvc --> IdentityDirectoryPrimary
    CredentialIssuer --> CredentialVaultPrimary
    MFASvc --> TokenLedgerPrimary
    RolePolicySvc --> RolePolicyStorePrimary
    SessionBroker --> SessionStorePrimary
    ImpersonationGuard --> AuditTrailPrimary

    AuditTrailPrimary --> LogsPrimary
    PrimaryIdentityStores --> MetricsPrimary
    PrimaryIdentityStores --> TracesPrimary
    PrimaryIdentityStores --> KeyRotationPrimary

    IdentityDirectoryPrimary -. replication .-> IdentityDirectorySecondary
    CredentialVaultPrimary -. secure replication .-> CredentialVaultSecondary
    TokenLedgerPrimary -. change data capture .-> TokenLedgerSecondary
    RolePolicyStorePrimary -. replication .-> RolePolicyStoreSecondary
    SessionStorePrimary -. replication .-> SessionStoreSecondary
    AuditTrailPrimary -. streaming mirror .-> AuditTrailSecondary

    SecondaryAuthProxy --> InviteStandby
    SecondaryAuthProxy --> RegistrationStandby
    SecondaryAuthProxy --> SessionBrokerStandby

    InviteStandby --> IdentityDirectorySecondary
    RegistrationStandby --> IdentityDirectorySecondary
    CredentialIssuerStandby --> CredentialVaultSecondary
    MFAStandby --> TokenLedgerSecondary
    RolePolicyStandby --> RolePolicyStoreSecondary
    SessionBrokerStandby --> SessionStoreSecondary
    ImpersonationGuardStandby --> AuditTrailSecondary

    SecondaryIdentityStores --> MetricsSecondary
    SecondaryIdentityStores --> LogsSecondary
    SecondaryIdentityStores --> DRPlaybooks

    SecretsManager --> PrimaryIdentityServices
    SecretsManager --> SecondaryIdentityServices
    ConfigRepo --> PrimaryIdentityServices
    ConfigRepo --> SecondaryIdentityServices
    CI_CD --> PrimaryIdentityServices
    CI_CD --> SecondaryIdentityServices
    HSM --> CredentialIssuer
    HSM --> CredentialIssuerStandby

    LogsPrimary --> SIEM
    LogsSecondary --> SIEM
    IncidentBridge --> DRPlaybooks
```
