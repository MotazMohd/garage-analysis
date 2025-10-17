```mermaid
flowchart TD
    subgraph Governance[Inventory Governance]
        PartsPolicies[(Parts Compliance Policies)]
        SupplierAssessment[(Supplier Assessment Register)]
        RecallBulletins[(Recall Bulletin Feed)]
    end

    subgraph InventoryOps[Inventory Security & Compliance]
        SupplierScanner[Supplier Data Scanner]
        QualityMonitor[Quality & Recall Monitor]
        StockAnomaly[Stock Anomaly Detector]
        FraudAnalytics[Fraud Analytics]
        IncidentDesk[Inventory Incident Desk]
    end

    subgraph InventoryServices[Inventory Services]
        CatalogueManager[Catalogue Manager]
        GarageImporter[Garage Import Service]
        StockUpdater[Stock Update Service]
        ReservationEngine[Reservation Engine]
        ReplenishmentPlanner[Replenishment Planner]
        AuditLogger[Audit Logger]
    end

    subgraph Stores[Inventory Stores]
        GlobalCatalogue[(Global Catalogue)]
        GarageCatalogue[(Garage Catalogue)]
        StockLedger[(Stock Ledger)]
        ReservationLedger[(Reservation Ledger)]
        AuditStream[((Inventory Audit Stream))]
    end

    PartsPolicies --> CatalogueManager
    SupplierAssessment --> SupplierScanner
    RecallBulletins --> QualityMonitor

    CatalogueManager --> GlobalCatalogue
    GarageImporter --> GarageCatalogue
    StockUpdater --> StockLedger
    ReservationEngine --> ReservationLedger
    InventoryServices --> AuditLogger
    AuditLogger --> AuditStream

    SupplierScanner --> IncidentDesk
    QualityMonitor --> IncidentDesk
    StockAnomaly --> IncidentDesk
    FraudAnalytics --> IncidentDesk

    GlobalCatalogue --> StockAnomaly
    GarageCatalogue --> StockAnomaly
    StockLedger --> FraudAnalytics
    ReservationLedger --> FraudAnalytics
    AuditStream --> FraudAnalytics

    IncidentDesk -->|Mitigation| GlobalCatalogue
    IncidentDesk --> GarageCatalogue
    IncidentDesk --> StockLedger
    IncidentDesk --> ReservationLedger
    IncidentDesk --> PartsPolicies
```
