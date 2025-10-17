# Garage & Branch Management – Level 2 (Onboarding and Governance)

```mermaid
flowchart TD
    SaaSAdmin([SaaS Admin])
    GarageOwner([Garage Owner])
    Compliance([Compliance Officer])
    Portal[Garage Admin Portal]
    Review[Application Review Engine]
    BranchMgr[Branch Configuration Service]
    StaffSvc[Staff Visibility Service]
    AuditLog[(Audit Ledger)]
    GarageStore[(Garage Registry)]
    BranchStore[(Branch Directory)]
    DocsStore[(Document Vault)]

    GarageOwner -->|Submit application & docs| Portal
    Portal -->|Store metadata| GarageStore
    Portal -->|Upload documents| DocsStore
    GarageStore -->|Pending application| Review
    DocsStore -->|Compliance packet| Review

    Review -->|Approve/Reject| GarageStore
    Review -->|Decision trail| AuditLog
    Review -->|Notify outcome| Portal
    Portal -->|Decision email| GarageOwner

    SaaSAdmin -->|Override or suspend| Review
    Compliance -->|Flag issues| Review

    GarageOwner -->|Create branch| BranchMgr
    BranchMgr -->|Inherit base profile| GarageStore
    BranchMgr -->|Persist branch| BranchStore
    BranchMgr -->|Record overrides| AuditLog

    GarageOwner -->|Configure staff access| StaffSvc
    StaffSvc -->|Update branch scope| BranchStore
    StaffSvc -->|Write change log| AuditLog
    StaffSvc -->|Update visibility| GarageStore

    SaaSAdmin -->|Transfer ownership| GarageStore
    GarageStore -->|Lifecycle updates| AuditLog
```

The Level 2 view surfaces how onboarding, compliance, branch configuration, and staff visibility actions converge on shared data stores and audit records.
