```mermaid
flowchart TD
    subgraph GlobalEdge[Global Edge]
        DNS[Geo DNS]
        CDN[CDN]
        WAF[Edge WAF]
        IdPFederation[Identity Federation]
    end

    subgraph PrimaryRegion[Primary Region]
        subgraph PrimaryIngress[Ingress & Mesh]
            PrimaryALB[Garage Ingress LB]
            PrimaryMeshGW[Garage Mesh Gateway]
            PrimaryAuthProxy[Garage Auth Proxy]
        end

        subgraph PrimaryServices[Garage Governance Pods]
            GaragePortalPods[Garage Onboarding Pods]
            DocumentClassifierPods[Document Classifier Pods]
            CompliancePods[Compliance Decision Pods]
            BranchConfiguratorPods[Branch Configurator Pods]
            StaffProvisionPods[Staff Provisioning Pods]
            AuditWriterPods[Audit Writer Pods]
        end

        subgraph PrimaryStores[Primary Data Stores]
            TenantRegistryPrimary[(Tenant Registry Cluster)]
            DocumentVaultPrimary[(Document Vault Primary)]
            ComplianceLedgerPrimary[(Compliance Ledger Primary)]
            BranchConfigPrimary[(Branch Config DB Primary)]
            StaffDirectoryPrimary[(Staff Directory Primary)]
            AuditStreamPrimary[((Audit Stream Primary))]
        end

        subgraph PrimaryOps[Primary Ops]
            MetricsPrimary[Metrics Stack]
            LogsPrimary[Log Aggregator]
            TracesPrimary[Trace Collector]
            SnapshotPrimary[Snapshot Scheduler]
        end
    end

    subgraph SecondaryRegion[Secondary Region]
        subgraph SecondaryIngress[Standby Ingress]
            SecondaryALB[Standby Garage LB]
            SecondaryMeshGW[Standby Mesh Gateway]
            SecondaryAuthProxy[Standby Auth Proxy]
        end

        subgraph SecondaryServices[Warm Standby Pods]
            GaragePortalStandby[Garage Onboarding Standby]
            DocumentClassifierStandby[Document Classifier Standby]
            ComplianceStandby[Compliance Decision Standby]
            BranchConfiguratorStandby[Branch Configurator Standby]
            StaffProvisionStandby[Staff Provisioning Standby]
            AuditWriterStandby[Audit Writer Standby]
        end

        subgraph SecondaryStores[Replica Stores]
            TenantRegistrySecondary[(Tenant Registry Replica)]
            DocumentVaultSecondary[(Document Vault Replica)]
            ComplianceLedgerSecondary[(Compliance Ledger Replica)]
            BranchConfigSecondary[(Branch Config DB Replica)]
            StaffDirectorySecondary[(Staff Directory Replica)]
            AuditStreamSecondary[((Audit Stream Mirror))]
        end

        subgraph SecondaryOps[Secondary Ops]
            MetricsSecondary[Metrics Mirror]
            LogsSecondary[Log Mirror]
            TracesSecondary[Trace Mirror]
            FailoverPlaybooks[Failover Automation]
        end
    end

    subgraph GlobalServices[Shared Services]
        SecretsManager[Secrets Manager]
        ConfigRepo[Config Repository]
        CI_CD[CI/CD Pipeline]
        IncidentBridge[Incident Bridge]
    end

    CDN --> WAF --> DNS
    IdPFederation --> PrimaryAuthProxy
    IdPFederation --> SecondaryAuthProxy

    DNS --> PrimaryALB --> PrimaryMeshGW --> PrimaryAuthProxy
    PrimaryAuthProxy --> GaragePortalPods
    PrimaryAuthProxy --> DocumentClassifierPods

    GaragePortalPods --> TenantRegistryPrimary
    GaragePortalPods --> DocumentVaultPrimary
    DocumentClassifierPods --> DocumentVaultPrimary
    CompliancePods --> ComplianceLedgerPrimary
    BranchConfiguratorPods --> BranchConfigPrimary
    StaffProvisionPods --> StaffDirectoryPrimary
    AuditWriterPods --> AuditStreamPrimary

    AuditStreamPrimary --> LogsPrimary
    PrimaryStores --> MetricsPrimary
    PrimaryStores --> SnapshotPrimary

    SnapshotPrimary --> DocumentVaultSecondary

    TenantRegistryPrimary -. replication .-> TenantRegistrySecondary
    DocumentVaultPrimary -. replication .-> DocumentVaultSecondary
    ComplianceLedgerPrimary -. CDC .-> ComplianceLedgerSecondary
    BranchConfigPrimary -. replication .-> BranchConfigSecondary
    StaffDirectoryPrimary -. replication .-> StaffDirectorySecondary
    AuditStreamPrimary -. streaming mirror .-> AuditStreamSecondary

    SecondaryAuthProxy --> GaragePortalStandby
    SecondaryAuthProxy --> DocumentClassifierStandby

    GaragePortalStandby --> TenantRegistrySecondary
    DocumentClassifierStandby --> DocumentVaultSecondary
    ComplianceStandby --> ComplianceLedgerSecondary
    BranchConfiguratorStandby --> BranchConfigSecondary
    StaffProvisionStandby --> StaffDirectorySecondary
    AuditWriterStandby --> AuditStreamSecondary

    SecondaryStores --> MetricsSecondary
    SecondaryStores --> LogsSecondary
    SecondaryOps --> IncidentBridge

    SecretsManager --> PrimaryServices
    SecretsManager --> SecondaryServices
    ConfigRepo --> PrimaryServices
    ConfigRepo --> SecondaryServices
    CI_CD --> PrimaryServices
    CI_CD --> SecondaryServices

    IncidentBridge --> FailoverPlaybooks
```
