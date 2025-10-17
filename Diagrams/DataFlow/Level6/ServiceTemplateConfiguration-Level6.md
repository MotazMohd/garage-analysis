```mermaid
flowchart TD
    subgraph GlobalEdge[Global Edge]
        DNS[Geo DNS]
        CDN[Edge CDN]
        WAF[Edge WAF]
        IdPFederation[Identity Federation]
    end

    subgraph PrimaryRegion[Primary Region]
        subgraph PrimaryIngress[Ingress & Mesh]
            PrimaryALB[Template Ingress LB]
            PrimaryMeshGW[Template Mesh Gateway]
            PrimaryAuthProxy[Template Auth Proxy]
        end

        subgraph PrimaryTemplateServices[Template Services]
            AuthoringSvc[Template Authoring Pods]
            VersionControlSvc[Template Version Control Pods]
            ValidationSvc[Validation Pods]
            LocalisationSvc[Localisation Pods]
            ResourceBindingSvc[Resource Binding Pods]
            PublishingSvc[Publishing Pods]
            RuleEngineSvc[Rule Engine Pods]
        end

        subgraph PrimaryTemplateStores[Primary Stores]
            TemplateRepoPrimary[(Template Repository Primary)]
            VersionLedgerPrimary[(Version Ledger Primary)]
            LocalisationStorePrimary[(Localisation Store Primary)]
            ResourceBindingPrimary[(Resource Binding DB Primary)]
            PublicationQueuePrimary[((Publication Queue Primary))]
            AuditTrailPrimary[((Template Audit Stream Primary))]
        end

        subgraph PrimaryTemplateOps[Primary Operations]
            MetricsPrimary[Metrics Stack]
            LogsPrimary[Log Aggregator]
            TracesPrimary[Trace Collector]
            SnapshotPrimary[Snapshot Scheduler]
        end
    end

    subgraph SecondaryRegion[Secondary Region]
        subgraph SecondaryIngress[Standby Ingress]
            SecondaryALB[Standby Template LB]
            SecondaryMeshGW[Standby Mesh Gateway]
            SecondaryAuthProxy[Standby Auth Proxy]
        end

        subgraph SecondaryTemplateServices[Standby Services]
            AuthoringStandby[Template Authoring Standby]
            VersionControlStandby[Version Control Standby]
            ValidationStandby[Validation Standby]
            LocalisationStandby[Localisation Standby]
            ResourceBindingStandby[Resource Binding Standby]
            PublishingStandby[Publishing Standby]
            RuleEngineStandby[Rule Engine Standby]
        end

        subgraph SecondaryTemplateStores[Replica Stores]
            TemplateRepoSecondary[(Template Repository Replica)]
            VersionLedgerSecondary[(Version Ledger Replica)]
            LocalisationStoreSecondary[(Localisation Store Replica)]
            ResourceBindingSecondary[(Resource Binding DB Replica)]
            PublicationQueueSecondary[((Publication Queue Mirror))]
            AuditTrailSecondary[((Template Audit Mirror))]
        end

        subgraph SecondaryTemplateOps[Secondary Operations]
            MetricsSecondary[Metrics Mirror]
            LogsSecondary[Log Mirror]
            TracesSecondary[Trace Mirror]
            DRRunbooks[Template DR Runbooks]
        end
    end

    subgraph SharedServices[Shared Services]
        SecretsManager[Secrets Manager]
        ConfigRepo[Config Repository]
        CI_CD[CI/CD Pipeline]
        ArtifactRegistry[Artifact Registry]
        IncidentBridge[Incident Bridge]
    end

    CDN --> WAF --> DNS
    IdPFederation --> PrimaryAuthProxy
    IdPFederation --> SecondaryAuthProxy

    DNS --> PrimaryALB --> PrimaryMeshGW --> PrimaryAuthProxy
    PrimaryAuthProxy --> AuthoringSvc
    PrimaryAuthProxy --> VersionControlSvc
    PrimaryAuthProxy --> ResourceBindingSvc

    AuthoringSvc --> TemplateRepoPrimary
    VersionControlSvc --> VersionLedgerPrimary
    ValidationSvc --> AuditTrailPrimary
    LocalisationSvc --> LocalisationStorePrimary
    ResourceBindingSvc --> ResourceBindingPrimary
    PublishingSvc --> PublicationQueuePrimary
    RuleEngineSvc --> PublicationQueuePrimary

    PublicationQueuePrimary --> AuditTrailPrimary
    PrimaryTemplateStores --> MetricsPrimary
    PrimaryTemplateStores --> LogsPrimary
    PrimaryTemplateStores --> SnapshotPrimary

    TemplateRepoPrimary -. replication .-> TemplateRepoSecondary
    VersionLedgerPrimary -. CDC .-> VersionLedgerSecondary
    LocalisationStorePrimary -. replication .-> LocalisationStoreSecondary
    ResourceBindingPrimary -. replication .-> ResourceBindingSecondary
    PublicationQueuePrimary -. streaming mirror .-> PublicationQueueSecondary
    AuditTrailPrimary -. streaming .-> AuditTrailSecondary

    SecondaryAuthProxy --> AuthoringStandby
    SecondaryAuthProxy --> VersionControlStandby
    SecondaryAuthProxy --> ResourceBindingStandby

    AuthoringStandby --> TemplateRepoSecondary
    VersionControlStandby --> VersionLedgerSecondary
    ValidationStandby --> AuditTrailSecondary
    LocalisationStandby --> LocalisationStoreSecondary
    ResourceBindingStandby --> ResourceBindingSecondary
    PublishingStandby --> PublicationQueueSecondary
    RuleEngineStandby --> PublicationQueueSecondary

    SecondaryTemplateStores --> MetricsSecondary
    SecondaryTemplateStores --> LogsSecondary
    SecondaryTemplateOps --> IncidentBridge

    SecretsManager --> PrimaryTemplateServices
    SecretsManager --> SecondaryTemplateServices
    ConfigRepo --> PrimaryTemplateServices
    ConfigRepo --> SecondaryTemplateServices
    CI_CD --> PrimaryTemplateServices
    CI_CD --> SecondaryTemplateServices
    ArtifactRegistry --> PrimaryTemplateServices
    ArtifactRegistry --> SecondaryTemplateServices

    IncidentBridge --> DRRunbooks
```
