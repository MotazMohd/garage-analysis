```mermaid
flowchart TD
    subgraph Governance[Template Governance]
        TemplatePolicies[(Template Governance Policies)]
        SafetyChecklist[(Safety & Compliance Checklist)]
        VersionApprovals[(Version Approval Board)]
    end

    subgraph QualityOps[Quality & Compliance Operations]
        StaticScanner[Static Rule Scanner]
        HazardAnalyzer[Hazard & Safety Analyzer]
        LocalizationReview[Localization Review Desk]
        ChangeAdvisory[Change Advisory Board]
        AlertInbox[((Template Alert Inbox))]
    end

    subgraph TemplateServices[Template Services]
        AuthoringStudio[Template Authoring Studio]
        VersionControl[Version Control Service]
        ResourceBinder[Resource Binding Service]
        ValidationEngine[Validation Engine]
        PublishingHub[Publishing Hub]
        AuditLogger[Audit Logger]
    end

    subgraph DataStores[Template Stores]
        TemplateRepo[(Template Repository)]
        HazardRegistry[(Hazard Registry)]
        LocalizationVault[(Localization Vault)]
        AuditStream[((Template Audit Stream))]
    end

    TemplatePolicies --> AuthoringStudio
    TemplatePolicies --> ValidationEngine
    SafetyChecklist --> ValidationEngine
    VersionApprovals --> PublishingHub

    AuthoringStudio --> VersionControl
    VersionControl --> TemplateRepo
    ResourceBinder --> TemplateRepo
    ValidationEngine --> HazardRegistry
    ValidationEngine --> LocalizationVault
    TemplateServices --> AuditLogger
    AuditLogger --> AuditStream

    TemplateRepo --> StaticScanner
    HazardRegistry --> HazardAnalyzer
    LocalizationVault --> LocalizationReview

    StaticScanner --> AlertInbox
    HazardAnalyzer --> AlertInbox
    LocalizationReview --> AlertInbox
    AlertInbox --> ChangeAdvisory

    ChangeAdvisory -->|Actions| TemplateRepo
    ChangeAdvisory --> HazardRegistry
    ChangeAdvisory --> LocalizationVault
    ChangeAdvisory --> TemplatePolicies
```
