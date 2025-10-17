```mermaid
flowchart TD
    subgraph CatalogueOps[Catalogue Operations]
        A1[SaaS Parts Curator]
        A2[Supplier Import Service]
        A3[Garage Catalogue Manager]
    end

    subgraph InventoryOps[Inventory Operations]
        B1[Stock Adjustment API]
        B2[Reservation Engine]
        B3[Replenishment Planner]
        B4[Quality Hold Workflow]
    end

    subgraph DataStores
        DS1[(Global Part Library)]
        DS2[(Supplier Pricing Feeds)]
        DS3[(Garage Part Catalogue)]
        DS4[(Stock Batches)]
        DS5[(Reservations)]
        DS6[((Alerts & Audit Trail))]
    end

    A1 -->|author part| DS1
    A1 -->|publish update| DS6
    A2 -->|ingest pricing| DS2
    A2 -->|suggest changes| A1

    A3 -->|import selection| DS3
    A3 -->|set garage pricing| DS3
    A3 -->|sync availability| B1

    B1 -->|adjust stock| DS4
    B1 -->|log change| DS6
    B2 -->|reserve for job| DS5
    B2 -->|deduct from stock| DS4
    B2 -->|release unused| DS4

    B3 -->|monitor thresholds| DS4
    B3 -->|create replenishment| SupplierPortal[Supplier Portal]
    B3 -->|notify team| DS6

    B4 -->|flag suspect batch| DS4
    B4 -->|hold release| DS5
    B4 -->|escalate| DS6

    DS5 -->|feed job planner| JobEngine[Job Card Orchestrator]
    DS3 -->|expose to templates| TemplateStudio[Service Template Studio]
```
