```mermaid
flowchart TD
    subgraph GlobalEdge[Global Edge]
        DNS[Geo DNS]
        CDN[CDN]
        WAF[Edge WAF]
        IdPFederation[Identity Federation]
        PartnerToolHub[Partner Tool Telemetry Hub]
    end

    subgraph PrimaryRegion[Primary Region]
        subgraph PrimaryIngress[Ingress & Mesh]
            PrimaryALB[Tool Ingress LB]
            PrimaryMeshGW[Tool Mesh Gateway]
            PrimaryAuthProxy[Tool Auth Proxy]
        end

        subgraph PrimaryToolServices[Tool Services]
            ToolCatalogueSvc[Tool Catalogue Pods]
            GarageToolImportSvc[Garage Tool Import Pods]
            AvailabilityPlannerSvc[Availability Planner Pods]
            CheckoutSvc[Tool Checkout Pods]
            MaintenanceSchedulerSvc[Maintenance Scheduler Pods]
            TelemetryIngestSvc[Telemetry Ingest Pods]
            ComplianceMonitorSvc[Compliance Monitor Pods]
        end

        subgraph PrimaryToolStores[Primary Stores]
            ToolCataloguePrimary[(Tool Catalogue Primary)]
            GarageToolPrimary[(Garage Tool DB Primary)]
            AvailabilityPlanPrimary[(Availability Plan Store Primary)]
            CheckoutLedgerPrimary[(Checkout Ledger Primary)]
            MaintenanceLogPrimary[(Maintenance Log Primary)]
            TelemetryLakePrimary[((Telemetry Lake Primary))]
            ComplianceLedgerPrimary[(Compliance Ledger Primary)]
            AuditTrailPrimary[((Tool Audit Stream Primary))]
        end

        subgraph PrimaryToolOps[Primary Operations]
            MetricsPrimary[Metrics Stack]
            LogsPrimary[Log Aggregator]
            TracesPrimary[Trace Collector]
            SnapshotPrimary[Snapshot Scheduler]
        end
    end

    subgraph SecondaryRegion[Secondary Region]
        subgraph SecondaryIngress[Standby Ingress]
            SecondaryALB[Standby Tool LB]
            SecondaryMeshGW[Standby Mesh Gateway]
            SecondaryAuthProxy[Standby Auth Proxy]
        end

        subgraph SecondaryToolServices[Standby Services]
            ToolCatalogueStandby[Tool Catalogue Standby]
            GarageToolImportStandby[Garage Tool Import Standby]
            AvailabilityPlannerStandby[Availability Planner Standby]
            CheckoutStandby[Tool Checkout Standby]
            MaintenanceSchedulerStandby[Maintenance Scheduler Standby]
            TelemetryIngestStandby[Telemetry Ingest Standby]
            ComplianceMonitorStandby[Compliance Monitor Standby]
        end

        subgraph SecondaryToolStores[Replica Stores]
            ToolCatalogueSecondary[(Tool Catalogue Replica)]
            GarageToolSecondary[(Garage Tool DB Replica)]
            AvailabilityPlanSecondary[(Availability Plan Store Replica)]
            CheckoutLedgerSecondary[(Checkout Ledger Replica)]
            MaintenanceLogSecondary[(Maintenance Log Replica)]
            TelemetryLakeSecondary[((Telemetry Lake Mirror))]
            ComplianceLedgerSecondary[(Compliance Ledger Replica)]
            AuditTrailSecondary[((Tool Audit Mirror))]
        end

        subgraph SecondaryToolOps[Secondary Operations]
            MetricsSecondary[Metrics Mirror]
            LogsSecondary[Log Mirror]
            TracesSecondary[Trace Mirror]
            DRRunbooks[Tool DR Runbooks]
        end
    end

    subgraph SharedServices[Shared Services]
        SecretsManager[Secrets Manager]
        ConfigRepo[Config Repository]
        CI_CD[CI/CD Pipeline]
        IncidentBridge[Incident Bridge]
        AnalyticsWarehouse[Analytics Warehouse]
    end

    CDN --> WAF --> DNS
    IdPFederation --> PrimaryAuthProxy
    IdPFederation --> SecondaryAuthProxy
    PartnerToolHub --> TelemetryIngestSvc
    PartnerToolHub --> TelemetryIngestStandby

    DNS --> PrimaryALB --> PrimaryMeshGW --> PrimaryAuthProxy
    PrimaryAuthProxy --> ToolCatalogueSvc
    PrimaryAuthProxy --> AvailabilityPlannerSvc
    PrimaryAuthProxy --> CheckoutSvc

    ToolCatalogueSvc --> ToolCataloguePrimary
    GarageToolImportSvc --> GarageToolPrimary
    AvailabilityPlannerSvc --> AvailabilityPlanPrimary
    CheckoutSvc --> CheckoutLedgerPrimary
    MaintenanceSchedulerSvc --> MaintenanceLogPrimary
    TelemetryIngestSvc --> TelemetryLakePrimary
    ComplianceMonitorSvc --> ComplianceLedgerPrimary
    AuditTrailPrimary --> LogsPrimary

    PrimaryToolStores --> MetricsPrimary
    PrimaryToolStores --> TracesPrimary
    PrimaryToolStores --> SnapshotPrimary

    ToolCataloguePrimary -. replication .-> ToolCatalogueSecondary
    GarageToolPrimary -. replication .-> GarageToolSecondary
    AvailabilityPlanPrimary -. replication .-> AvailabilityPlanSecondary
    CheckoutLedgerPrimary -. CDC .-> CheckoutLedgerSecondary
    MaintenanceLogPrimary -. replication .-> MaintenanceLogSecondary
    TelemetryLakePrimary -. streaming mirror .-> TelemetryLakeSecondary
    ComplianceLedgerPrimary -. replication .-> ComplianceLedgerSecondary
    AuditTrailPrimary -. streaming .-> AuditTrailSecondary

    SecondaryAuthProxy --> ToolCatalogueStandby
    SecondaryAuthProxy --> AvailabilityPlannerStandby
    SecondaryAuthProxy --> CheckoutStandby

    ToolCatalogueStandby --> ToolCatalogueSecondary
    GarageToolImportStandby --> GarageToolSecondary
    AvailabilityPlannerStandby --> AvailabilityPlanSecondary
    CheckoutStandby --> CheckoutLedgerSecondary
    MaintenanceSchedulerStandby --> MaintenanceLogSecondary
    TelemetryIngestStandby --> TelemetryLakeSecondary
    ComplianceMonitorStandby --> ComplianceLedgerSecondary
    AuditTrailSecondary --> LogsSecondary

    SecondaryToolStores --> MetricsSecondary
    SecondaryToolStores --> TracesSecondary
    SecondaryToolOps --> IncidentBridge

    SecretsManager --> PrimaryToolServices
    SecretsManager --> SecondaryToolServices
    ConfigRepo --> PrimaryToolServices
    ConfigRepo --> SecondaryToolServices
    CI_CD --> PrimaryToolServices
    CI_CD --> SecondaryToolServices

    AnalyticsWarehouse --> IncidentBridge
```
