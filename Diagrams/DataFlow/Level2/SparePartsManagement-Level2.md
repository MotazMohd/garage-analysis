# Spare Parts Management – Level 2 (Supply to Consumption)

```mermaid
flowchart LR
    Supplier([Supplier])
    Procurement([Procurement Officer])
    GarageAdmin([Garage Inventory Manager])
    CatalogSvc[Global Parts Catalog Service]
    Importer[Import & Mapping Service]
    InventorySvc[Garage Inventory Service]
    Reservation[Reservation Engine]
    AlertSvc[Replenishment Alerts]
    Audit[(Audit Ledger)]
    Catalog[(Global Parts Catalog)]
    GarageCatalog[(Garage Parts Library)]
    Stock[(Stock Ledger)]
    PurchaseOrders[(Purchase Orders)]

    Supplier -->|Price list| Procurement
    Procurement -->|Upload feed| Importer
    Importer -->|Normalize & validate| CatalogSvc
    CatalogSvc -->|Write to global catalog| Catalog
    CatalogSvc -->|Log change| Audit

    GarageAdmin -->|Select parts to import| Importer
    Importer -->|Map to garage| GarageCatalog
    GarageCatalog -->|Seed stock records| InventorySvc
    InventorySvc -->|Initial quantities| Stock

    Reservation -->|Reserve for job card| Stock
    Reservation -->|Update commitments| Audit

    InventorySvc -->|Consume parts| Stock
    InventorySvc -->|Usage event| Audit

    Stock -->|Low threshold reached| AlertSvc
    AlertSvc -->|Notify restock| GarageAdmin
    AlertSvc -->|Raise purchase request| PurchaseOrders
    PurchaseOrders -->|Send to supplier| Supplier
    PurchaseOrders -->|Persist order| Audit
```

The Level 2 spare parts diagram emphasises how supplier feeds become catalogue entries, how garages localise those parts, and how stock consumption triggers automated replenishment workflows.
