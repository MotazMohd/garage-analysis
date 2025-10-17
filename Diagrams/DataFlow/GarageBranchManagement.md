# Garage & Branch Management Data Flow

```mermaid
flowchart LR
    subgraph DataSources[Data Sources]
        GA[Garage Admin]
        SA[SaaS Admin]
        BranchForm[Branch Setup Form]
    end

    subgraph CoreServices[Core Processes]
        GMS[Garage Management Service]
        Approval[Approval Console]
        BranchSvc[Branch Management Service]
    end

    subgraph Destinations[Data Destinations]
        GR[(Garage Registry DB)]
        BR[(Branch Directory DB)]
        AL[(Audit Log Store)]
        AuditView[Audit Viewer]
    end

    GA -->|Submit creation fields\n(name, license, services, hours, etc.)| GMS
    GMS -->|Persist Pending garage| GR
    GMS -->|Record submission| AL
    GMS -->|Notify pending review| SA

    SA -->|Review documents & details| Approval
    Approval -->|Approve| GMS
    Approval -->|Reject with reason| Rejection[Rejection Notice]
    Rejection -->|Send status + feedback| GA
    GMS -->|Update status Active| GR
    GMS -->|Log decision| AL

    GMS -->|Provision defaults\n(working hours, services, contact)| BranchSvc
    GA -->|Create/Update branch| BranchForm
    BranchForm -->|Inherit garage defaults| BranchSvc
    BranchSvc -->|Persist branch overrides| BR
    BranchSvc -->|Log branch changes| AL

    GMS -->|Status changes, ownership transfer, document updates| AL
    AL -->|Expose audit trail| AuditView
    SA -->|Review history| AuditView
    GA -->|Review history| AuditView
```
