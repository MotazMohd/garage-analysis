```mermaid
flowchart TD
    subgraph GlobalEdge[Global Edge]
        DNS[Geo DNS]
        CDN[Edge CDN]
        WAF[Edge WAF]
        IdPFederation[Identity Federation]
        MessagingHub[Messaging Hub]
    end

    subgraph PrimaryRegion[Primary Region]
        subgraph PrimaryIngress[Ingress & Mesh]
            PrimaryALB[Intake Ingress LB]
            PrimaryMeshGW[Intake Mesh Gateway]
            PrimaryAuthProxy[Intake Auth Proxy]
        end

        subgraph PrimaryIntakeServices[Intake Services]
            ArrivalCaptureSvc[Arrival Capture Pods]
            BookingLookupSvc[Booking Lookup Pods]
            IdentityVerificationSvc[Identity Verification Pods]
            IntakeFormSvc[Intake Form Pods]
            EvidenceCaptureSvc[Evidence Capture Pods]
            UpsellEngineSvc[Upsell Engine Pods]
            JobCardBridgeSvc[Job Card Bridge Pods]
            NotificationDispatcherSvc[Notification Dispatcher Pods]
        end

        subgraph PrimaryIntakeStores[Primary Stores]
            BookingLedgerPrimary[(Booking Ledger Primary)]
            CheckInRecordPrimary[(Check-in Record Store Primary)]
            EvidenceVaultPrimary[(Evidence Vault Primary)]
            UpsellRulesPrimary[(Upsell Rules Store Primary)]
            JobCardQueuePrimary[((Job Card Queue Primary))]
            NotificationQueuePrimary[((Notification Queue Primary))]
            AuditTrailPrimary[((Intake Audit Stream Primary))]
        end

        subgraph PrimaryIntakeOps[Primary Operations]
            MetricsPrimary[Metrics Stack]
            LogsPrimary[Log Aggregator]
            TracesPrimary[Trace Collector]
            SnapshotPrimary[Snapshot Scheduler]
        end
    end

    subgraph SecondaryRegion[Secondary Region]
        subgraph SecondaryIngress[Standby Ingress]
            SecondaryALB[Standby Intake LB]
            SecondaryMeshGW[Standby Mesh Gateway]
            SecondaryAuthProxy[Standby Auth Proxy]
        end

        subgraph SecondaryIntakeServices[Standby Services]
            ArrivalCaptureStandby[Arrival Capture Standby]
            BookingLookupStandby[Booking Lookup Standby]
            IdentityVerificationStandby[Identity Verification Standby]
            IntakeFormStandby[Intake Form Standby]
            EvidenceCaptureStandby[Evidence Capture Standby]
            UpsellEngineStandby[Upsell Engine Standby]
            JobCardBridgeStandby[Job Card Bridge Standby]
            NotificationDispatcherStandby[Notification Dispatcher Standby]
        end

        subgraph SecondaryIntakeStores[Replica Stores]
            BookingLedgerSecondary[(Booking Ledger Replica)]
            CheckInRecordSecondary[(Check-in Record Store Replica)]
            EvidenceVaultSecondary[(Evidence Vault Replica)]
            UpsellRulesSecondary[(Upsell Rules Store Replica)]
            JobCardQueueSecondary[((Job Card Queue Mirror))]
            NotificationQueueSecondary[((Notification Queue Mirror))]
            AuditTrailSecondary[((Intake Audit Mirror))]
        end

        subgraph SecondaryIntakeOps[Secondary Operations]
            MetricsSecondary[Metrics Mirror]
            LogsSecondary[Log Mirror]
            TracesSecondary[Trace Mirror]
            DRRunbooks[Intake DR Runbooks]
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
    MessagingHub --> NotificationDispatcherSvc
    MessagingHub --> NotificationDispatcherStandby

    DNS --> PrimaryALB --> PrimaryMeshGW --> PrimaryAuthProxy
    PrimaryAuthProxy --> ArrivalCaptureSvc
    PrimaryAuthProxy --> IntakeFormSvc
    PrimaryAuthProxy --> JobCardBridgeSvc

    ArrivalCaptureSvc --> CheckInRecordPrimary
    BookingLookupSvc --> BookingLedgerPrimary
    IdentityVerificationSvc --> CheckInRecordPrimary
    IntakeFormSvc --> CheckInRecordPrimary
    EvidenceCaptureSvc --> EvidenceVaultPrimary
    UpsellEngineSvc --> UpsellRulesPrimary
    JobCardBridgeSvc --> JobCardQueuePrimary
    NotificationDispatcherSvc --> NotificationQueuePrimary
    AuditTrailPrimary --> LogsPrimary

    PrimaryIntakeStores --> MetricsPrimary
    PrimaryIntakeStores --> TracesPrimary
    PrimaryIntakeStores --> SnapshotPrimary

    BookingLedgerPrimary -. replication .-> BookingLedgerSecondary
    CheckInRecordPrimary -. replication .-> CheckInRecordSecondary
    EvidenceVaultPrimary -. replication .-> EvidenceVaultSecondary
    UpsellRulesPrimary -. replication .-> UpsellRulesSecondary
    JobCardQueuePrimary -. mirrored queue .-> JobCardQueueSecondary
    NotificationQueuePrimary -. mirrored queue .-> NotificationQueueSecondary
    AuditTrailPrimary -. streaming .-> AuditTrailSecondary

    SecondaryAuthProxy --> ArrivalCaptureStandby
    SecondaryAuthProxy --> IntakeFormStandby
    SecondaryAuthProxy --> JobCardBridgeStandby

    ArrivalCaptureStandby --> CheckInRecordSecondary
    BookingLookupStandby --> BookingLedgerSecondary
    IdentityVerificationStandby --> CheckInRecordSecondary
    IntakeFormStandby --> CheckInRecordSecondary
    EvidenceCaptureStandby --> EvidenceVaultSecondary
    UpsellEngineStandby --> UpsellRulesSecondary
    JobCardBridgeStandby --> JobCardQueueSecondary
    NotificationDispatcherStandby --> NotificationQueueSecondary
    AuditTrailSecondary --> LogsSecondary

    SecondaryIntakeStores --> MetricsSecondary
    SecondaryIntakeStores --> TracesSecondary
    SecondaryIntakeOps --> IncidentBridge

    SecretsManager --> PrimaryIntakeServices
    SecretsManager --> SecondaryIntakeServices
    ConfigRepo --> PrimaryIntakeServices
    ConfigRepo --> SecondaryIntakeServices
    CI_CD --> PrimaryIntakeServices
    CI_CD --> SecondaryIntakeServices

    AnalyticsWarehouse --> IncidentBridge
```
