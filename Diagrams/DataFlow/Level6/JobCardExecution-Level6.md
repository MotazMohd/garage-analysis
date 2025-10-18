```mermaid
flowchart TD
    subgraph GlobalEdge[Global Edge]
        DNS[Geo DNS]
        CDN[Edge CDN]
        WAF[Edge WAF]
        IdPFederation[Identity Federation]
        MessagingHub[Messaging Hub]
        TelemetryHub[Telemetry Hub]
    end

    subgraph PrimaryRegion[Primary Region]
        subgraph PrimaryIngress[Ingress & Mesh]
            PrimaryALB[Workshop Ingress LB]
            PrimaryMeshGW[Workshop Mesh Gateway]
            PrimaryAuthProxy[Workshop Auth Proxy]
        end

        subgraph PrimaryWorkshopServices[Workshop Services]
            AssignmentSvc[Step Assignment Pods]
            TechnicianAppGateway[Technician App Gateway Pods]
            TelemetryIngestSvc[Telemetry Ingest Pods]
            ResourceConsumptionSvc[Resource Consumption Pods]
            ExceptionRouterSvc[Exception Router Pods]
            QAInspectionSvc[QA Inspection Pods]
            CustomerNotificationSvc[Customer Notification Pods]
            BillingBridgeSvc[Billing Bridge Pods]
        end

        subgraph PrimaryWorkshopStores[Primary Stores]
            JobCardPrimary[(Job Card Store Primary)]
            StepProgressPrimary[(Step Progress Store Primary)]
            ResourceUsagePrimary[(Resource Usage Ledger Primary)]
            ExceptionLedgerPrimary[(Exception Ledger Primary)]
            QALogPrimary[(QA Log Primary)]
            CustomerNotificationQueuePrimary[((Customer Notification Queue Primary))]
            BillingQueuePrimary[((Billing Queue Primary))]
            AuditTrailPrimary[((Workshop Audit Stream Primary))]
        end

        subgraph PrimaryWorkshopOps[Primary Operations]
            MetricsPrimary[Metrics Stack]
            LogsPrimary[Log Aggregator]
            TracesPrimary[Trace Collector]
            SnapshotPrimary[Snapshot Scheduler]
        end
    end

    subgraph SecondaryRegion[Secondary Region]
        subgraph SecondaryIngress[Standby Ingress]
            SecondaryALB[Standby Workshop LB]
            SecondaryMeshGW[Standby Mesh Gateway]
            SecondaryAuthProxy[Standby Auth Proxy]
        end

        subgraph SecondaryWorkshopServices[Standby Services]
            AssignmentStandby[Step Assignment Standby]
            TechnicianAppGatewayStandby[Technician App Gateway Standby]
            TelemetryIngestStandby[Telemetry Ingest Standby]
            ResourceConsumptionStandby[Resource Consumption Standby]
            ExceptionRouterStandby[Exception Router Standby]
            QAInspectionStandby[QA Inspection Standby]
            CustomerNotificationStandby[Customer Notification Standby]
            BillingBridgeStandby[Billing Bridge Standby]
        end

        subgraph SecondaryWorkshopStores[Replica Stores]
            JobCardSecondary[(Job Card Store Replica)]
            StepProgressSecondary[(Step Progress Store Replica)]
            ResourceUsageSecondary[(Resource Usage Ledger Replica)]
            ExceptionLedgerSecondary[(Exception Ledger Replica)]
            QALogSecondary[(QA Log Replica)]
            CustomerNotificationQueueSecondary[((Customer Notification Queue Mirror))]
            BillingQueueSecondary[((Billing Queue Mirror))]
            AuditTrailSecondary[((Workshop Audit Mirror))]
        end

        subgraph SecondaryWorkshopOps[Secondary Operations]
            MetricsSecondary[Metrics Mirror]
            LogsSecondary[Log Mirror]
            TracesSecondary[Trace Mirror]
            DRRunbooks[Workshop DR Runbooks]
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
    MessagingHub --> CustomerNotificationSvc
    MessagingHub --> CustomerNotificationStandby
    TelemetryHub --> TelemetryIngestSvc
    TelemetryHub --> TelemetryIngestStandby

    DNS --> PrimaryALB --> PrimaryMeshGW --> PrimaryAuthProxy
    PrimaryAuthProxy --> AssignmentSvc
    PrimaryAuthProxy --> TechnicianAppGateway
    PrimaryAuthProxy --> BillingBridgeSvc

    AssignmentSvc --> JobCardPrimary
    TechnicianAppGateway --> StepProgressPrimary
    TelemetryIngestSvc --> StepProgressPrimary
    ResourceConsumptionSvc --> ResourceUsagePrimary
    ExceptionRouterSvc --> ExceptionLedgerPrimary
    QAInspectionSvc --> QALogPrimary
    CustomerNotificationSvc --> CustomerNotificationQueuePrimary
    BillingBridgeSvc --> BillingQueuePrimary
    AuditTrailPrimary --> LogsPrimary

    PrimaryWorkshopStores --> MetricsPrimary
    PrimaryWorkshopStores --> TracesPrimary
    PrimaryWorkshopStores --> SnapshotPrimary

    JobCardPrimary -. replication .-> JobCardSecondary
    StepProgressPrimary -. replication .-> StepProgressSecondary
    ResourceUsagePrimary -. replication .-> ResourceUsageSecondary
    ExceptionLedgerPrimary -. replication .-> ExceptionLedgerSecondary
    QALogPrimary -. replication .-> QALogSecondary
    CustomerNotificationQueuePrimary -. mirrored queue .-> CustomerNotificationQueueSecondary
    BillingQueuePrimary -. mirrored queue .-> BillingQueueSecondary
    AuditTrailPrimary -. streaming .-> AuditTrailSecondary

    SecondaryAuthProxy --> AssignmentStandby
    SecondaryAuthProxy --> TechnicianAppGatewayStandby
    SecondaryAuthProxy --> BillingBridgeStandby

    AssignmentStandby --> JobCardSecondary
    TechnicianAppGatewayStandby --> StepProgressSecondary
    TelemetryIngestStandby --> StepProgressSecondary
    ResourceConsumptionStandby --> ResourceUsageSecondary
    ExceptionRouterStandby --> ExceptionLedgerSecondary
    QAInspectionStandby --> QALogSecondary
    CustomerNotificationStandby --> CustomerNotificationQueueSecondary
    BillingBridgeStandby --> BillingQueueSecondary
    AuditTrailSecondary --> LogsSecondary

    SecondaryWorkshopStores --> MetricsSecondary
    SecondaryWorkshopStores --> TracesSecondary
    SecondaryWorkshopOps --> IncidentBridge

    SecretsManager --> PrimaryWorkshopServices
    SecretsManager --> SecondaryWorkshopServices
    ConfigRepo --> PrimaryWorkshopServices
    ConfigRepo --> SecondaryWorkshopServices
    CI_CD --> PrimaryWorkshopServices
    CI_CD --> SecondaryWorkshopServices

    AnalyticsWarehouse --> IncidentBridge
```
