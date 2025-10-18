```mermaid
flowchart TD
    subgraph EntryTier[Entry & Security Tier]
        APIGW[API Gateway]
        WAF[Web Application Firewall]
        AuthEdge[Edge Identity Adapter]
        CDN[Static CDN]
    end

    subgraph MeshControl[Service Mesh Control Plane]
        IstioCP[Service Mesh Control Plane]
        PolicyEnvoy[Policy Sidecars]
        RateLimiter[Rate Limiter]
    end

    subgraph CoreDomains[Domain Microservice Groups]
        subgraph GarageDomain[Garage Governance Domain]
            GarageAPI[Garage Onboarding API]
            ComplianceWF[Compliance Workflow Engine]
            BranchSvc[Branch Configuration Service]
            StaffProvision[Staff Provisioning Service]
        end

        subgraph IdentityDomain[Identity & Security Domain]
            IdentityAPI[Identity Core API]
            CredentialVault[Credential Vault Service]
            MFASvc[MFA Challenge Service]
            RolePolicySvc[Role Policy Evaluator]
            SessionBroker[Session Broker]
        end

        subgraph OperationsDomain[Operations Domain]
            BookingSvc[Booking & Scheduling Service]
            IntakeSvc[Check-in Intake Service]
            JobOrchestrator[Job Orchestration Engine]
            PartsToolsSvc[Parts & Tools Mesh]
            BillingSvc[Billing Processor]
            NotificationSvc[Notification Hub]
        end
    end

    subgraph DataTier[Data & Event Tier]
        TenantDB[(Tenant Registry DB)]
        DocVault[(Document Object Storage)]
        BranchDB[(Branch Config DB)]
        StaffDirectory[(Staff Directory DB)]
        IdentityDir[(Identity Directory)]
        RoleStore[(Role Policy Store)]
        BookingLedger[(Booking Ledger)]
        JobWarehouse[(Job Card Warehouse)]
        InventoryLedger[(Inventory Ledger)]
        BillingLedger[(Billing Ledger)]
        EventBus[((Event Streaming Bus))]
        NotificationQueue[((Notification Queue))]
        AuditLedger[((Audit Ledger))]
        DataLake[((Analytics Data Lake))]
    end

    subgraph Observability[Observability & Governance]
        TraceCollector[Distributed Trace Collector]
        MetricsStack[Metrics & Dashboards]
        LogIngest[Log Aggregator]
        SIEM[Security Analytics SIEM]
        DataCatalog[Data Catalog]
    end

    subgraph ExternalIntegrations[External Integrations]
        PaymentGateway[Payment Gateway]
        SMSProvider[SMS Provider]
        EmailProvider[Email Provider]
        PartnerAPIs[Partner Platform APIs]
        AnalyticsBI[BI Warehouse]
    end

    CDN --> APIGW
    APIGW --> WAF
    WAF --> AuthEdge
    AuthEdge --> IstioCP
    PolicyEnvoy --> IstioCP
    RateLimiter --> APIGW

    AuthEdge --> IdentityAPI
    IdentityAPI --> CredentialVault
    IdentityAPI --> IdentityDir
    MFASvc --> IdentityDir
    RolePolicySvc --> RoleStore
    SessionBroker --> EventBus

    GarageAPI --> TenantDB
    GarageAPI --> DocVault
    ComplianceWF --> DocVault
    ComplianceWF --> AuditLedger
    BranchSvc --> BranchDB
    StaffProvision --> StaffDirectory
    StaffProvision --> AuditLedger

    BookingSvc --> BookingLedger
    IntakeSvc --> BookingLedger
    IntakeSvc --> JobOrchestrator
    JobOrchestrator --> JobWarehouse
    JobOrchestrator --> EventBus
    PartsToolsSvc --> InventoryLedger
    PartsToolsSvc --> EventBus
    BillingSvc --> BillingLedger
    BillingSvc --> PaymentGateway
    NotificationSvc --> NotificationQueue

    EventBus --> NotificationSvc
    EventBus --> TraceCollector
    EventBus --> DataLake
    NotificationQueue --> SMSProvider
    NotificationQueue --> EmailProvider

    TraceCollector --> MetricsStack
    LogIngest --> MetricsStack
    MetricsStack --> AnalyticsBI
    AuditLedger --> SIEM
    DataLake --> AnalyticsBI
    DataCatalog --> AnalyticsBI

    PartnerAPIs --> APIGW
    BillingLedger --> DataLake
    InventoryLedger --> DataLake
    JobWarehouse --> DataLake
    BookingLedger --> DataLake
    TenantDB --> DataLake

    APIGW -. logs .-> LogIngest
    CoreDomains -. traces .-> TraceCollector
    Observability -. governance .-> MeshControl
```
