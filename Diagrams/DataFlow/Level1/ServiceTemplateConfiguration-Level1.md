# Service Template & Step Configuration – Level 1 Data Flow

```mermaid
flowchart TD
    SaaS[SaaS Product Team] -->|1. Define base template| P1((P1 Author Template))
    P1 --> Templates[(Global Template Library)]
    P1 --> Audit[(Audit Ledger)]
    Garage[Garage Admin] -->|2. Clone & customize| P2((P2 Localize Template))
    P2 --> GarageTemplates[(Garage Template Store)]
    P2 --> Audit
    P2 -->|Link parts/tools| P3((P3 Resource Binding))
    P3 --> Parts[(Spare Parts Catalog)]
    P3 --> Tools[(Tools Catalog)]
    Technician[Technician] -->|3. Execute job card| P4((P4 Step Orchestration))
    P4 --> JobCard[(Job Card Steps)]
    P4 --> Telemetry[(Progress Telemetry)]
    P4 --> Audit
    Exceptions[Exception Rules] -->|Escalate| P5((P5 Exception Handling))
    P5 --> Notify[Notification Service]
    P5 --> Audit
```

The Level 1 diagram breaks the template lifecycle into authoring, localization, resource binding, job card execution, and exception escalation processes, each interacting with dedicated data stores.
