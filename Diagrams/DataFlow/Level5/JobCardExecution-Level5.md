```mermaid
flowchart TD
    subgraph Entry[Workshop Interfaces]
        ForemanApp[Foreman Console]
        TechnicianApp[Technician App]
        QAConsole[QA Console]
        CustomerPortal[Customer Portal]
        APIGateway[Execution API Gateway]
    end

    subgraph ExecutionServices[Execution Services]
        AssignmentSvc[Task Assignment Service]
        StepTracker[Step Tracking Service]
        TelemetryCollector[Telemetry Collector]
        ExceptionDesk[Exception Desk]
        QAInspector[QA Inspection Service]
        ResourceManager[Resource Consumption Manager]
        CustomerNotifier[Customer Notification Service]
        BillingBridge[Billing Bridge Service]
    end

    subgraph DataStores[Execution Data Stores]
        JobCardWarehouse[(Job Card Warehouse)]
        StepLedger[(Step Progress Ledger)]
        TelemetryStream[((Telemetry Stream))]
        ExceptionLedger[(Exception Ledger)]
        QAResults[(QA Results Store)]
        ResourceLedger[(Resource Consumption Ledger)]
        NotificationQueue[((Notification Queue))]
        AuditTrail[((Execution Audit Trail))]
    end

    subgraph Integrations[External Integrations]
        PartsService[Parts Reservation Service]
        ToolsService[Tools Availability Service]
        BillingService[Billing Service]
        AnalyticsPlatform[Analytics Platform]
        EmailSvc[Email Service]
        SmsSvc[SMS Service]
        PushSvc[Push Notification Service]
    end

    subgraph Observability[Observability]
        MetricsStack[Execution Metrics]
        TraceCollector[Trace Collector]
        LogCollector[Log Collector]
    end

    APIGateway --> AssignmentSvc
    APIGateway --> StepTracker
    APIGateway --> TelemetryCollector
    APIGateway --> ExceptionDesk
    APIGateway --> QAInspector
    APIGateway --> ResourceManager
    APIGateway --> CustomerNotifier
    APIGateway --> BillingBridge

    AssignmentSvc --> JobCardWarehouse
    AssignmentSvc --> StepLedger
    AssignmentSvc --> AuditTrail

    StepTracker --> StepLedger
    StepTracker --> AuditTrail

    TelemetryCollector --> TelemetryStream
    TelemetryCollector --> AnalyticsPlatform

    ExceptionDesk --> ExceptionLedger
    ExceptionDesk --> NotificationQueue
    ExceptionDesk --> AuditTrail

    QAInspector --> QAResults
    QAInspector --> NotificationQueue
    QAInspector --> AuditTrail

    ResourceManager --> ResourceLedger
    ResourceManager --> PartsService
    ResourceManager --> ToolsService

    CustomerNotifier --> NotificationQueue
    NotificationQueue --> EmailSvc
    NotificationQueue --> SmsSvc
    NotificationQueue --> PushSvc

    BillingBridge --> BillingService
    BillingBridge --> JobCardWarehouse
    BillingBridge --> AuditTrail

    ResourceLedger --> BillingService
    TelemetryStream --> MetricsStack
    StepLedger --> MetricsStack
    QAResults --> MetricsStack
    ExecutionServices -. traces .-> TraceCollector
    ExecutionServices -. logs .-> LogCollector
```
