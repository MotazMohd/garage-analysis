```mermaid
flowchart TD
    subgraph Entry[Inventory Interfaces]
        SaaSAdmin[Catalog Admin]
        GarageAdmin[Garage Inventory Admin]
        SupplierFeed[Supplier Integration]
        PartnerGarage[Partner Garage API]
        APIGateway[Inventory API Gateway]
    end

    subgraph InventoryServices[Inventory Services]
        CatalogService[Parts Catalog Service]
        SupplierIngest[Supplier Feed Ingestion]
        LocalizationService[Garage Localization Service]
        StockService[Stock Adjustment Service]
        ReservationService[Reservation Service]
        ReplenishmentPlanner[Replenishment Planner]
        QualityHoldService[Quality Hold Service]
        InventoryNotifier[Inventory Notification Service]
    end

    subgraph DataStores[Inventory Data Stores]
        CatalogDB[(Global Catalog DB)]
        SupplierLedger[(Supplier Feed Ledger)]
        LocalizationDB[(Garage-Specific Catalog)]
        StockLedger[(Stock Ledger)]
        ReservationLedger[(Reservation Ledger)]
        QualityLedger[((Quality Hold Ledger))]
        ReplenishmentQueue[((Replenishment Queue))]
        NotificationQueue[((Inventory Notification Queue))]
        AuditTrail[((Inventory Audit Trail))]
    end

    subgraph Observability[Monitoring & Analytics]
        MetricsStack[Inventory Metrics]
        TraceCollector[Trace Collector]
        LogCollector[Log Collector]
    end

    subgraph Integrations[External Services]
        SupplierAPI[Supplier APIs]
        ProcurementSystem[Procurement System]
        EmailSvc[Email Service]
        SmsSvc[SMS Service]
        WebhookTargets[Webhook Targets]
    end

    APIGateway --> CatalogService
    APIGateway --> SupplierIngest
    APIGateway --> LocalizationService
    APIGateway --> StockService
    APIGateway --> ReservationService
    APIGateway --> ReplenishmentPlanner
    APIGateway --> QualityHoldService

    CatalogService --> CatalogDB
    CatalogService --> AuditTrail

    SupplierIngest --> SupplierLedger
    SupplierIngest --> CatalogDB
    SupplierIngest --> SupplierAPI

    LocalizationService --> LocalizationDB
    LocalizationService --> AuditTrail

    StockService --> StockLedger
    StockService --> AuditTrail

    ReservationService --> ReservationLedger
    ReservationService --> StockLedger
    ReservationService --> AuditTrail

    ReplenishmentPlanner --> ReplenishmentQueue
    ReplenishmentPlanner --> ProcurementSystem
    ReplenishmentPlanner --> EmailSvc

    QualityHoldService --> QualityLedger
    QualityHoldService --> AuditTrail
    QualityHoldService --> NotificationQueue

    InventoryNotifier --> NotificationQueue
    NotificationQueue --> EmailSvc
    NotificationQueue --> SmsSvc
    NotificationQueue --> WebhookTargets

    StockLedger --> MetricsStack
    ReservationLedger --> MetricsStack
    ReplenishmentQueue --> MetricsStack
    CatalogService -. traces .-> TraceCollector
    InventoryServices -. logs .-> LogCollector
```
