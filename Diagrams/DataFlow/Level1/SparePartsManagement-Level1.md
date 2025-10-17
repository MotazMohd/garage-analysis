# Spare Parts Management – Level 1 Data Flow

```mermaid
flowchart TD
    SaaS[SaaS Catalog Team] -->|1. Define global part| P1((P1 Catalog Authoring))
    P1 --> GlobalParts[(Global Parts Library)]
    P1 --> Audit[(Audit Ledger)]
    Vendor[Supplier Integrations] -->|Upload pricing & stock| P2((P2 Import Supplier Data))
    P2 --> SupplierFeed[(Supplier Feed Store)]
    P2 --> Audit
    Garage[Garage Admin] -->|2. Import parts| P3((P3 Localize Inventory))
    P3 --> GarageParts[(Garage Inventory)]
    P3 --> Pricing[(Pricing Matrix)]
    P3 --> Audit
    Inventory[Inventory Service] -->|3. Update stock| P4((P4 Stock Adjustment))
    P4 --> GarageParts
    P4 --> Audit
    Sensors[IoT Counters] -->|Provide usage| P4
    Monitor[Reorder Monitor] -->|4. Evaluate thresholds| P5((P5 Low Stock Alerts))
    P5 --> Notify[Notification Service]
    P5 --> Procurement[(Purchase Orders Queue)]
    P5 --> Audit
```

This Level 1 diagram illustrates how parts move from global catalogs and supplier feeds into localized garage inventories, with downstream stock adjustments and automated alerting for replenishment.
