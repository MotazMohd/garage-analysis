# Tools Management – Level 1 Data Flow

```mermaid
flowchart TD
    SaaS[SaaS Catalog Team] -->|1. Register tool| P1((P1 Author Tool Profile))
    P1 --> ToolCatalog[(Tool Catalog)]
    P1 --> Audit[(Audit Ledger)]
    Garage[Garage Admin] -->|2. Import tool| P2((P2 Localize Tool Settings))
    P2 --> GarageTools[(Garage Tool Library)]
    P2 --> Audit
    Scheduler[Utilization Scheduler] -->|3. Allocate availability| P3((P3 Availability Planning))
    P3 --> Availability[(Tool Availability Store)]
    P3 --> Audit
    Technician[Technician] -->|4. Request tool| P4((P4 Tool Checkout))
    P4 --> Availability
    P4 --> Usage[(Usage Ledger)]
    P4 --> Audit
    Maintenance[Maintenance Workflow] -->|5. Trigger service| P5((P5 Maintenance Cycle))
    P5 --> Notify[Notification Service]
    P5 --> Audit
```

The Level 1 diagram surfaces the dedicated processes for tool catalog authoring, garage import, availability planning, technician checkout, and maintenance scheduling.
