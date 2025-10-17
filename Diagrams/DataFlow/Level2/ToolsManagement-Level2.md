# Tools Management – Level 2 (Availability & Maintenance)

```mermaid
flowchart TD
    Vendor([Tool Vendor])
    SaaSTools([SaaS Tool Curator])
    GarageToolMgr([Garage Tool Manager])
    Technician([Technician])
    CatalogSvc[Tool Catalog Service]
    ImportSvc[Garage Import Service]
    AvailabilitySvc[Tool Availability Planner]
    CheckoutSvc[Technician Checkout Service]
    MaintenanceSvc[Maintenance Scheduler]
    Catalog[(Global Tool Catalog)]
    GarageCatalog[(Garage Tool Library)]
    Availability[(Availability Calendar)]
    Maintenance[(Maintenance Log)]
    Audit[(Audit Ledger)]

    Vendor -->|Specs & manuals| SaaSTools
    SaaSTools -->|Curate tools| CatalogSvc
    CatalogSvc -->|Persist global tool| Catalog
    CatalogSvc -->|Audit entry| Audit

    GarageToolMgr -->|Import tool| ImportSvc
    ImportSvc -->|Fetch specs| Catalog
    ImportSvc -->|Local configuration| GarageCatalog
    ImportSvc -->|Log import| Audit

    GarageToolMgr -->|Plan availability| AvailabilitySvc
    AvailabilitySvc -->|Write schedule| Availability
    AvailabilitySvc -->|Notify conflicts| GarageToolMgr
    AvailabilitySvc -->|Record plan| Audit

    Technician -->|Request checkout| CheckoutSvc
    CheckoutSvc -->|Validate availability| Availability
    CheckoutSvc -->|Approve/deny| Technician
    CheckoutSvc -->|Update usage| Availability
    CheckoutSvc -->|Log checkout| Audit

    CheckoutSvc -->|Usage metrics| MaintenanceSvc
    MaintenanceSvc -->|Schedule service| Maintenance
    MaintenanceSvc -->|Notify manager| GarageToolMgr
    MaintenanceSvc -->|Record maintenance| Audit
```

The Level 2 tools diagram exposes how curated tool data flows into garage-specific catalogues, how availability is coordinated, and how technician usage feeds maintenance scheduling and audit trails.
