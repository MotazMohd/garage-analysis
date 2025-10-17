```mermaid
flowchart TD
    subgraph Governance[Garage Governance Controls]
        PolicyCatalog[(Garage Policy Catalog)]
        ComplianceRules[Compliance Rule Engine]
        DelegationMatrix[(Delegation Matrix)]
    end

    subgraph SecurityOps[Security & Compliance Operations]
        IntakeMonitor[Onboarding Monitoring]
        DocumentScanner[Document Classification]
        RiskScorer[Risk Scoring Service]
        AlertQueue[((Compliance Alert Queue))]
        CaseDesk[Compliance Case Desk]
    end

    subgraph Workflows[Operational Workflows]
        OnboardingPortal[Garage Onboarding Portal]
        BranchConfigurator[Branch Configuration Service]
        StaffProvisioner[Staff Provisioning Service]
        AuditWriter[Audit Trail Writer]
    end

    subgraph DataStores[Data Stores]
        GarageRegistry[(Garage Registry)]
        BranchLedger[(Branch Ledger)]
        StaffDirectory[(Staff Directory)]
        DocumentVault[(Document Vault)]
    end

    PolicyCatalog --> ComplianceRules
    DelegationMatrix --> ComplianceRules
    ComplianceRules --> OnboardingPortal
    ComplianceRules --> BranchConfigurator
    ComplianceRules --> StaffProvisioner

    OnboardingPortal --> DocumentVault
    DocumentVault --> DocumentScanner
    DocumentScanner --> RiskScorer
    RiskScorer --> IntakeMonitor
    IntakeMonitor --> AlertQueue

    OnboardingPortal --> GarageRegistry
    BranchConfigurator --> BranchLedger
    StaffProvisioner --> StaffDirectory
    Workflows --> AuditWriter
    AuditWriter --> AlertQueue

    AlertQueue --> CaseDesk
    CaseDesk -->|Resolution| GarageRegistry
    CaseDesk --> BranchLedger
    CaseDesk --> StaffDirectory
    CaseDesk --> ComplianceRules
```
