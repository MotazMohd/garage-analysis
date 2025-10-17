```mermaid
flowchart TD
    subgraph Entry[Check-in Interfaces]
        ReceptionTablet[Reception Tablet]
        MobileCheckIn[Mobile Self Check-in]
        StaffPortal[Staff Portal]
        APIGateway[Check-in API Gateway]
    end

    subgraph CheckInServices[Check-in Services]
        AppointmentLookup[Appointment Lookup Service]
        IdentityVerifier[Identity Verification Service]
        IntakeFormSvc[Intake Form Service]
        EvidenceCaptureSvc[Evidence Capture Service]
        UpsellEngine[Upsell Recommendation Engine]
        JobCardCreator[Job Card Creation Service]
        NotificationHub[Notification Hub]
    end

    subgraph DataStores[Check-in Data Stores]
        AppointmentLedger[(Appointment Ledger)]
        IdentityCache[(Identity Cache)]
        IntakeStore[(Intake Form Store)]
        EvidenceStore[(Evidence Object Storage)]
        UpsellLedger[(Upsell Interaction Ledger)]
        JobCardWarehouse[(Job Card Warehouse)]
        NotificationQueue[((Notification Queue))]
        AuditTrail[((Check-in Audit Trail))]
    end

    subgraph Integrations[External Integrations]
        IdentityService[Identity Service]
        PricingAPI[Pricing & Offers API]
        EmailSvc[Email Service]
        SmsSvc[SMS Service]
        WebhookTargets[Webhook Targets]
    end

    subgraph Observability[Observability]
        MetricsStack[Check-in Metrics]
        TraceCollector[Trace Collector]
        LogCollector[Log Collector]
    end

    APIGateway --> AppointmentLookup
    APIGateway --> IdentityVerifier
    APIGateway --> IntakeFormSvc
    APIGateway --> EvidenceCaptureSvc
    APIGateway --> UpsellEngine
    APIGateway --> JobCardCreator
    APIGateway --> NotificationHub

    AppointmentLookup --> AppointmentLedger
    AppointmentLookup --> AuditTrail

    IdentityVerifier --> IdentityService
    IdentityVerifier --> IdentityCache
    IdentityVerifier --> AuditTrail

    IntakeFormSvc --> IntakeStore
    IntakeFormSvc --> AuditTrail

    EvidenceCaptureSvc --> EvidenceStore
    EvidenceCaptureSvc --> AuditTrail

    UpsellEngine --> PricingAPI
    UpsellEngine --> UpsellLedger
    UpsellEngine --> NotificationQueue

    JobCardCreator --> JobCardWarehouse
    JobCardCreator --> AppointmentLedger
    JobCardCreator --> AuditTrail

    NotificationHub --> NotificationQueue
    NotificationQueue --> EmailSvc
    NotificationQueue --> SmsSvc
    NotificationQueue --> WebhookTargets

    CheckInServices -. traces .-> TraceCollector
    CheckInServices -. logs .-> LogCollector
    AppointmentLedger --> MetricsStack
    UpsellLedger --> MetricsStack
    JobCardWarehouse --> MetricsStack
```
