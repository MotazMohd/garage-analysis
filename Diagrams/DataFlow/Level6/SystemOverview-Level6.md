```mermaid
flowchart TD
    subgraph GlobalEdge[Global Edge & Control Plane]
        DNS[Global DNS & Geo Routing]
        CDN[Global CDN]
        EdgeWAF[Edge WAF]
        EdgeIdP[Central Identity Federation]
        GSLB[Global Load Balancer]
    end

    subgraph PrimaryRegion[Primary Region (Middle East)]
        subgraph PrimaryIngress[Primary Ingress & Mesh]
            PrimaryALB[Regional Application Load Balancer]
            PrimaryMeshGW[Service Mesh Gateway]
            PrimaryAuthProxy[Regional Auth Proxy]
        end

        subgraph PrimaryApps[Primary Domain Workloads]
            GarageOnboardingSvc[Garage Onboarding Pods]
            IdentityCoreSvc[Identity Core Pods]
            BookingOrchestratorSvc[Booking & Job Orchestrator]
            InventoryMeshSvc[Parts & Tools Mesh Pods]
            NotificationHubSvc[Notification Hub Pods]
            BillingSvc[Billing Service Pods]
        end

        subgraph PrimaryData[Primary Data Plane]
            TenantDBPrimary[(Tenant Registry Cluster)]
            IdentityDirPrimary[(Identity Directory Cluster)]
            BookingLedgerPrimary[(Booking Ledger Cluster)]
            JobWarehousePrimary[(Job Warehouse Cluster)]
            InventoryLedgerPrimary[(Inventory Ledger Cluster)]
            BillingLedgerPrimary[(Billing Ledger Cluster)]
            AuditLedgerPrimary[((Audit Ledger Stream))]
            EventBusPrimary[((Event Streaming Bus))]
            ObjectStoragePrimary[(Document Object Storage)]
        end

        subgraph PrimaryObservability[Primary Observability & Operations]
            MetricsPrimary[Metrics Stack]
            LogsPrimary[Log Aggregator]
            TracesPrimary[Trace Collector]
            SIEMPrimary[Security Analytics]
            BackupSchedulerPrimary[Snapshot Scheduler]
        end
    end

    subgraph SecondaryRegion[Secondary Region (Active/Passive)]
        subgraph SecondaryIngress[Secondary Ingress]
            SecondaryALB[Standby Load Balancer]
            SecondaryMeshGW[Standby Mesh Gateway]
            SecondaryAuthProxy[Standby Auth Proxy]
        end

        subgraph SecondaryApps[Warm Standby Workloads]
            GarageOnboardingStandby[Garage Onboarding Standby Pods]
            IdentityCoreStandby[Identity Core Standby Pods]
            BookingOrchestratorStandby[Booking & Job Orchestrator Standby]
            InventoryMeshStandby[Parts & Tools Mesh Standby]
            NotificationHubStandby[Notification Hub Standby]
            BillingStandby[Billing Standby Pods]
        end

        subgraph SecondaryData[Secondary Data Plane]
            TenantDBSecondary[(Tenant Registry Replica Cluster)]
            IdentityDirSecondary[(Identity Directory Replica)]
            BookingLedgerSecondary[(Booking Ledger Replica)]
            JobWarehouseSecondary[(Job Warehouse Replica)]
            InventoryLedgerSecondary[(Inventory Ledger Replica)]
            BillingLedgerSecondary[(Billing Ledger Replica)]
            AuditLedgerSecondary[((Audit Ledger Mirror))]
            EventBusSecondary[((Event Bus Mirror))]
            ObjectStorageSecondary[(Document Vault Replica)]
        end

        subgraph SecondaryObservability[Secondary Observability]
            MetricsSecondary[Metrics Mirror]
            LogsSecondary[Log Mirror]
            TracesSecondary[Trace Collector Mirror]
            DRRunbooks[DR Automation Runbooks]
        end
    end

    subgraph GlobalServices[Shared Global Services]
        SecretsManager[Secrets Manager]
        ConfigRepo[Configuration Repository]
        CI_CD[CI/CD Pipeline]
        IncidentMgmt[Incident Management Platform]
        StatusPage[Status Page]
        AnalyticsWarehouse[Analytics Warehouse]
    end

    CDN --> EdgeWAF --> GSLB --> DNS
    EdgeIdP --> PrimaryAuthProxy
    EdgeIdP --> SecondaryAuthProxy

    GSLB --> PrimaryALB
    GSLB --> SecondaryALB

    PrimaryALB --> PrimaryMeshGW --> PrimaryAuthProxy
    PrimaryAuthProxy --> GarageOnboardingSvc
    PrimaryAuthProxy --> IdentityCoreSvc

    GarageOnboardingSvc --> TenantDBPrimary
    GarageOnboardingSvc --> ObjectStoragePrimary
    IdentityCoreSvc --> IdentityDirPrimary
    BookingOrchestratorSvc --> BookingLedgerPrimary
    BookingOrchestratorSvc --> EventBusPrimary
    InventoryMeshSvc --> InventoryLedgerPrimary
    NotificationHubSvc --> EventBusPrimary
    BillingSvc --> BillingLedgerPrimary

    EventBusPrimary --> NotificationHubSvc
    EventBusPrimary --> AuditLedgerPrimary
    AuditLedgerPrimary --> LogsPrimary

    PrimaryData --> MetricsPrimary
    PrimaryData --> LogsPrimary
    PrimaryData --> BackupSchedulerPrimary
    BackupSchedulerPrimary --> ObjectStorageSecondary

    MetricsPrimary --> AnalyticsWarehouse
    LogsPrimary --> SIEMPrimary
    TracesPrimary --> MetricsPrimary

    TenantDBPrimary -. async replica .-> TenantDBSecondary
    IdentityDirPrimary -. async replica .-> IdentityDirSecondary
    BookingLedgerPrimary -. change data capture .-> BookingLedgerSecondary
    JobWarehousePrimary -. replication .-> JobWarehouseSecondary
    InventoryLedgerPrimary -. replication .-> InventoryLedgerSecondary
    BillingLedgerPrimary -. replication .-> BillingLedgerSecondary
    AuditLedgerPrimary -. streaming .-> AuditLedgerSecondary
    EventBusPrimary -. mirrored topics .-> EventBusSecondary
    ObjectStoragePrimary -. cross-region replication .-> ObjectStorageSecondary

    SecondaryAuthProxy --> GarageOnboardingStandby
    SecondaryAuthProxy --> IdentityCoreStandby

    GarageOnboardingStandby --> TenantDBSecondary
    IdentityCoreStandby --> IdentityDirSecondary
    BookingOrchestratorStandby --> BookingLedgerSecondary
    InventoryMeshStandby --> InventoryLedgerSecondary
    NotificationHubStandby --> EventBusSecondary
    BillingStandby --> BillingLedgerSecondary

    EventBusSecondary --> NotificationHubStandby
    EventBusSecondary --> AuditLedgerSecondary

    SecondaryData --> MetricsSecondary
    SecondaryData --> LogsSecondary
    SecondaryData --> DRRunbooks

    CI_CD --> PrimaryApps
    CI_CD --> SecondaryApps
    ConfigRepo --> PrimaryApps
    ConfigRepo --> SecondaryApps
    SecretsManager --> PrimaryApps
    SecretsManager --> SecondaryApps

    IncidentMgmt --> DRRunbooks
    StatusPage --> IncidentMgmt
    AnalyticsWarehouse --> IncidentMgmt
``` 
