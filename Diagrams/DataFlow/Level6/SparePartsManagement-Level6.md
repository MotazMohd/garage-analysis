```mermaid
flowchart TD
    subgraph GlobalEdge[Global Edge]
        DNS[Geo DNS]
        CDN[CDN]
        WAF[Edge WAF]
        IdPFederation[Identity Federation]
        SupplierAPIHub[Supplier API Hub]
    end

    subgraph PrimaryRegion[Primary Region]
        subgraph PrimaryIngress[Ingress & Mesh]
            PrimaryALB[Inventory Ingress LB]
            PrimaryMeshGW[Inventory Mesh Gateway]
            PrimaryAuthProxy[Inventory Auth Proxy]
        end

        subgraph PrimaryInventoryServices[Inventory Services]
            CatalogueSvc[Catalogue Authoring Pods]
            SupplierIngestSvc[Supplier Ingestion Pods]
            GarageImportSvc[Garage Import Pods]
            StockAdjustmentSvc[Stock Adjustment Pods]
            ReservationSvc[Reservation Pods]
            ReplenishmentSvc[Replenishment Pods]
            QualityHoldSvc[Quality Hold Pods]
        end

        subgraph PrimaryInventoryStores[Primary Stores]
            CatalogueRepoPrimary[(Catalogue Repository Primary)]
            SupplierFeedPrimary[(Supplier Feed Store Primary)]
            GarageInventoryPrimary[(Garage Inventory DB Primary)]
            ReservationLedgerPrimary[(Reservation Ledger Primary)]
            ReplenishmentQueuePrimary[((Replenishment Queue Primary))]
            QualityHoldPrimary[(Quality Hold Store Primary)]
            AuditTrailPrimary[((Inventory Audit Stream Primary))]
        end

        subgraph PrimaryInventoryOps[Primary Operations]
            MetricsPrimary[Metrics Stack]
            LogsPrimary[Log Aggregator]
            TracesPrimary[Trace Collector]
            SnapshotPrimary[Snapshot Scheduler]
        end
    end

    subgraph SecondaryRegion[Secondary Region]
        subgraph SecondaryIngress[Standby Ingress]
            SecondaryALB[Standby Inventory LB]
            SecondaryMeshGW[Standby Mesh Gateway]
            SecondaryAuthProxy[Standby Auth Proxy]
        end

        subgraph SecondaryInventoryServices[Standby Services]
            CatalogueStandby[Catalogue Authoring Standby]
            SupplierIngestStandby[Supplier Ingestion Standby]
            GarageImportStandby[Garage Import Standby]
            StockAdjustmentStandby[Stock Adjustment Standby]
            ReservationStandby[Reservation Standby]
            ReplenishmentStandby[Replenishment Standby]
            QualityHoldStandby[Quality Hold Standby]
        end

        subgraph SecondaryInventoryStores[Replica Stores]
            CatalogueRepoSecondary[(Catalogue Repository Replica)]
            SupplierFeedSecondary[(Supplier Feed Store Replica)]
            GarageInventorySecondary[(Garage Inventory DB Replica)]
            ReservationLedgerSecondary[(Reservation Ledger Replica)]
            ReplenishmentQueueSecondary[((Replenishment Queue Mirror))]
            QualityHoldSecondary[(Quality Hold Store Replica)]
            AuditTrailSecondary[((Inventory Audit Mirror))]
        end

        subgraph SecondaryInventoryOps[Secondary Operations]
            MetricsSecondary[Metrics Mirror]
            LogsSecondary[Log Mirror]
            TracesSecondary[Trace Mirror]
            DRRunbooks[Inventory DR Runbooks]
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
    SupplierAPIHub --> SupplierIngestSvc
    SupplierAPIHub --> SupplierIngestStandby

    DNS --> PrimaryALB --> PrimaryMeshGW --> PrimaryAuthProxy
    PrimaryAuthProxy --> CatalogueSvc
    PrimaryAuthProxy --> GarageImportSvc
    PrimaryAuthProxy --> StockAdjustmentSvc

    CatalogueSvc --> CatalogueRepoPrimary
    SupplierIngestSvc --> SupplierFeedPrimary
    GarageImportSvc --> GarageInventoryPrimary
    StockAdjustmentSvc --> GarageInventoryPrimary
    ReservationSvc --> ReservationLedgerPrimary
    ReplenishmentSvc --> ReplenishmentQueuePrimary
    QualityHoldSvc --> QualityHoldPrimary
    AuditTrailPrimary --> LogsPrimary

    PrimaryInventoryStores --> MetricsPrimary
    PrimaryInventoryStores --> TracesPrimary
    PrimaryInventoryStores --> SnapshotPrimary
    ReplenishmentQueuePrimary --> AuditTrailPrimary

    CatalogueRepoPrimary -. replication .-> CatalogueRepoSecondary
    SupplierFeedPrimary -. replication .-> SupplierFeedSecondary
    GarageInventoryPrimary -. replication .-> GarageInventorySecondary
    ReservationLedgerPrimary -. CDC .-> ReservationLedgerSecondary
    ReplenishmentQueuePrimary -. mirrored queue .-> ReplenishmentQueueSecondary
    QualityHoldPrimary -. replication .-> QualityHoldSecondary
    AuditTrailPrimary -. streaming .-> AuditTrailSecondary

    SecondaryAuthProxy --> CatalogueStandby
    SecondaryAuthProxy --> GarageImportStandby
    SecondaryAuthProxy --> StockAdjustmentStandby

    CatalogueStandby --> CatalogueRepoSecondary
    SupplierIngestStandby --> SupplierFeedSecondary
    GarageImportStandby --> GarageInventorySecondary
    StockAdjustmentStandby --> GarageInventorySecondary
    ReservationStandby --> ReservationLedgerSecondary
    ReplenishmentStandby --> ReplenishmentQueueSecondary
    QualityHoldStandby --> QualityHoldSecondary
    AuditTrailSecondary --> LogsSecondary

    SecondaryInventoryStores --> MetricsSecondary
    SecondaryInventoryStores --> TracesSecondary
    SecondaryInventoryOps --> IncidentBridge

    SecretsManager --> PrimaryInventoryServices
    SecretsManager --> SecondaryInventoryServices
    ConfigRepo --> PrimaryInventoryServices
    ConfigRepo --> SecondaryInventoryServices
    CI_CD --> PrimaryInventoryServices
    CI_CD --> SecondaryInventoryServices

    AnalyticsWarehouse --> IncidentBridge
```
