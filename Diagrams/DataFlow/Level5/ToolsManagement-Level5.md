```mermaid
flowchart TD
    subgraph Entry[Tool Interfaces]
        SaaSAdmin[SaaS Tool Admin]
        GarageToolMgr[Garage Tool Manager]
        TechnicianApp[Technician App]
        MaintenancePartner[Maintenance Partner API]
        APIGateway[Tools API Gateway]
    end

    subgraph ToolServices[Tool Services]
        ToolCatalogSvc[Tool Catalog Service]
        CalibrationScheduler[Calibration Scheduler]
        AvailabilityPlanner[Availability Planner]
        CheckoutService[Checkout Service]
        MaintenanceLogger[Maintenance Logging Service]
        TelemetryIngest[Telemetry Ingestion Service]
        ToolNotifier[Tool Notification Service]
    end

    subgraph DataStores[Tool Data Stores]
        ToolRegistry[(Tool Registry)]
        CalibrationCalendar[(Calibration Calendar)]
        AvailabilityLedger[(Availability Ledger)]
        CheckoutLedger[(Checkout Ledger)]
        MaintenanceLedger[(Maintenance Ledger)]
        TelemetryStore[((Telemetry Stream Store))]
        NotificationQueue[((Tool Notification Queue))]
        AuditTrail[((Tool Audit Trail))]
    end

    subgraph Observability[Observability]
        MetricsStack[Tool Metrics]
        TraceCollector[Trace Collector]
        LogCollector[Log Collector]
    end

    subgraph Integrations[External Integrations]
        CalibrationPartner[Calibration Partner]
        AssetTracking[Asset Tracking System]
        EmailSvc[Email Service]
        SmsSvc[SMS Service]
        WebhookTargets[Webhook Targets]
    end

    APIGateway --> ToolCatalogSvc
    APIGateway --> CalibrationScheduler
    APIGateway --> AvailabilityPlanner
    APIGateway --> CheckoutService
    APIGateway --> MaintenanceLogger
    TechnicianApp --> APIGateway

    ToolCatalogSvc --> ToolRegistry
    ToolCatalogSvc --> AuditTrail

    CalibrationScheduler --> CalibrationCalendar
    CalibrationScheduler --> CalibrationPartner
    CalibrationScheduler --> NotificationQueue

    AvailabilityPlanner --> AvailabilityLedger
    AvailabilityPlanner --> ToolRegistry

    CheckoutService --> CheckoutLedger
    CheckoutService --> AvailabilityLedger
    CheckoutService --> NotificationQueue

    MaintenanceLogger --> MaintenanceLedger
    MaintenanceLogger --> NotificationQueue

    TelemetryIngest --> TelemetryStore
    TelemetryIngest --> AssetTracking
    TelemetryIngest --> MetricsStack

    ToolNotifier --> NotificationQueue
    NotificationQueue --> EmailSvc
    NotificationQueue --> SmsSvc
    NotificationQueue --> WebhookTargets

    ToolServices -. traces .-> TraceCollector
    ToolServices -. logs .-> LogCollector
    ToolRegistry --> MetricsStack
    MaintenanceLedger --> MetricsStack
    CalibrationCalendar --> MetricsStack
```
