# Spare Parts Management – Data Flow

```mermaid
flowchart TD
    SA[SaaS Admin Console] -->|Create global part| SPS[Spare Parts Service]
    SPS -->|Persist master data| Global[(Global Parts Catalog)]
    SPS -->|Log creation| Audit[(Audit Log)]
    GA[Garage Admin Portal] -->|Import / clone part| SPS
    SPS -->|Create garage record| GarageParts[(Garage Part Settings)]
    GA -->|Set pricing & thresholds| SPS
    SPS -->|Update inventory| Inventory[(Inventory Ledger)]
    SPS -->|Attach media / documents| Storage[(File Store)]
    JobExec[Job Execution Service] -->|Consume part usage| SPS
    SPS -->|Deduct stock| Inventory
    Inventory -->|Trigger low-stock event| Alerts[Alert Engine]
    Alerts -->|Notify garage| Notify[Notification Service]
    SPS -->|Sync compatibility| Templates[(Service Template Links)]
```

This diagram captures how global parts are authored, localized per garage, synchronized with service templates, and how ongoing job execution updates inventory and alerts.
