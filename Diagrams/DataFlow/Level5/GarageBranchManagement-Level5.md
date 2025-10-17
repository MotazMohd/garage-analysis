```mermaid
flowchart TD
    subgraph Entry[Ingress Controls]
        Portal[Garage Owner Portal]
        AdminConsole[SaaS Admin Console]
        APIClient[Partner API Client]
        APIGW[API Gateway]
    end

    subgraph Mesh[Service Mesh]
        Sidecar1[Policy Sidecar]
        Sidecar2[Metrics Sidecar]
    end

    subgraph Governance[Garage Governance Services]
        IntakeAPI[Garage Intake API]
        DocClassifier[Document Classification Service]
        RiskScorer[Risk Scoring Engine]
        ComplianceDesk[Compliance Decision Desk]
        LifecycleMgr[Garage Lifecycle Manager]
        BranchConfigurator[Branch Configurator]
        StaffAccessMgr[Staff Access Manager]
    end

    subgraph DataPlane[Data Plane]
        TenantDB[(Tenant Registry)]
        DocVault[(Document Vault)]
        RiskLedger[(Risk Assessment Ledger)]
        LifecycleLog[((Lifecycle Audit Log))]
        BranchStore[(Branch Configuration Store)]
        StaffDirectory[(Staff Directory)]
        AccessLedger[((Access Control Ledger))]
    end

    subgraph Observability[Observability]
        TraceCollector[Trace Collector]
        LogIngest[Log Aggregator]
        ComplianceAlerts[Compliance Alerting]
    end

    subgraph Integrations[External Services]
        EmailSvc[Email Notification Service]
        SmsSvc[SMS Provider]
        DmsAPI[Gov Document Verification API]
    end

    Portal --> APIGW
    AdminConsole --> APIGW
    APIClient --> APIGW
    APIGW --> IntakeAPI

    IntakeAPI --> DocClassifier
    IntakeAPI --> TenantDB
    IntakeAPI --> LifecycleLog

    DocClassifier --> DocVault
    DocClassifier --> RiskLedger
    DocClassifier --> DmsAPI

    DmsAPI --> DocClassifier

    RiskScorer --> RiskLedger
    RiskScorer --> ComplianceDesk

    ComplianceDesk --> LifecycleMgr
    ComplianceDesk --> LifecycleLog
    ComplianceDesk --> EmailSvc

    LifecycleMgr --> TenantDB
    LifecycleMgr --> LifecycleLog
    LifecycleMgr --> BranchConfigurator
    LifecycleMgr --> StaffAccessMgr

    BranchConfigurator --> BranchStore
    BranchConfigurator --> LifecycleLog

    StaffAccessMgr --> StaffDirectory
    StaffAccessMgr --> AccessLedger
    StaffAccessMgr --> SmsSvc

    LifecycleMgr --> EmailSvc

    Sidecar1 --> Governance
    Sidecar2 --> Observability

    Governance -. traces .-> TraceCollector
    Governance -. logs .-> LogIngest
    ComplianceDesk --> ComplianceAlerts
    ComplianceAlerts --> SmsSvc
    ComplianceAlerts --> EmailSvc
```
