# Garage & Branch Management Data Flow

```mermaid
flowchart LR
    subgraph DataSources[Data Sources]
        GA[Garage Admin]
        SA[SaaS Admin]
        BranchForm[Branch Setup Form]
        DocsPortal[Document Uploads Portal]
        IdP[Identity Provider]
    end

    subgraph CoreServices[Core Processes]
        GMS[Garage Management Service]
        Approval[Approval Console]
        BranchSvc[Branch Management Service]
        AuditBus[Audit Event Bus]
        DocService[Document Verification Service]
        AccessCtrl[Access Control Service]
        Compliance[Compliance Reporter]
    end

    subgraph Destinations[Data Destinations]
        GR[(Garage Registry DB)]
        BR[(Branch Directory DB)]
        AL[(Audit Log Store)]
        AuditView[Audit Viewer]
        Notify[(Notification Service)]
        DocVault[(Document Vault)]
        ComplianceQueue[(Compliance Review Queue)]
        Monitoring[(Monitoring Dashboard)]
        Warehouse[(Reporting Warehouse)]
    end

    GA -->|Authenticate| IdP
    SA -->|Authenticate| IdP
    IdP -->|Issue scoped tokens| GMS
    GMS -->|Validate permissions| AccessCtrl
    AccessCtrl -->|Return role grants| GMS

    GA -->|Submit creation fields\n(name, license, services, hours, etc.)| GMS
    GMS -->|Persist Pending garage| GR
    GMS -->|Emit submission event| AuditBus
    AuditBus -->|Store request snapshot| AL
    GMS -->|Notify pending review| SA

    GA -->|Upload licenses & permits| DocsPortal
    DocsPortal -->|Sanitize & classify| DocService
    DocService -->|Link attachments| GMS
    DocService -->|Surface compliance flags| Approval
    DocService -->|Persist originals| DocVault
    DocService -->|Escalate anomalies| Compliance
    Compliance -->|Queue manual review| ComplianceQueue

    SA -->|Review documents & details| Approval
    Approval -->|Approve| GMS
    Approval -->|Reject with reason| Rejection[Rejection Notice]
    Rejection -->|Send status + feedback| Notify
    Notify -->|Deliver decision| GA
    GMS -->|Update status Active| GR
    GMS -->|Emit decision event| AuditBus

    GMS -->|Provision defaults\n(working hours, services, contact)| BranchSvc
    GA -->|Create/Update branch| BranchForm
    BranchForm -->|Inherit garage defaults| BranchSvc
    BranchSvc -->|Persist branch overrides| BR
    BranchSvc -->|Emit branch change event| AuditBus

    GMS -->|Status changes, ownership transfer, document updates| AuditBus
    AuditBus -->|Write append-only log| AL
    AL -->|Expose audit trail| AuditView
    SA -->|Review history| AuditView
    GA -->|Review history| AuditView
    AuditBus -->|Trigger operational alerts| Monitoring
    AuditBus -->|Publish lifecycle dataset| Warehouse

    Notify -->|Broadcast approvals & reminders| Monitoring
    Warehouse -->|Drive compliance dashboards| Monitoring

    classDef source fill:#eff6ff,stroke:#1d4ed8,stroke-width:1px,color:#1f2937;
    classDef process fill:#ecfdf5,stroke:#047857,stroke-width:1px,color:#064e3b;
    classDef destination fill:#fff7ed,stroke:#c2410c,stroke-width:1px,color:#7c2d12;

    class GA,SA,BranchForm,DocsPortal,IdP source;
    class GMS,Approval,BranchSvc,AuditBus,DocService,AccessCtrl,Compliance process;
    class GR,BR,AL,AuditView,Notify,Rejection,DocVault,ComplianceQueue,Monitoring,Warehouse destination;
```
