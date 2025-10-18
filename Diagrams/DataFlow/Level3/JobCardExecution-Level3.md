```mermaid
flowchart TD
    subgraph WorkshopFloor
        A1[Technician Mobile App]
        A2[Assistant Mobile App]
        A3[Workshop Supervisor Console]
    end

    subgraph ExecutionServices
        B1[Step Assignment Engine]
        B2[Telemetry Collector]
        B3[Exception Router]
        B4[Quality Assurance Checklist]
        B5[Customer Update Service]
    end

    subgraph DataStores
        DS1[(Job Card Steps)]
        DS2[(Time Tracking Ledger)]
        DS3[(Resource Consumption)]
        DS4[((Exception Queue))]
        DS5[((QA Sign-off Log))]
        DS6[((Customer Communication Queue))]
    end

    A3 -->|assign technician| B1
    B1 -->|update step owner| DS1
    B1 -->|notify devices| A1
    B1 -->|notify assistant| A2

    A1 -->|start step| B2
    B2 -->|record telemetry| DS2
    B2 -->|push progress| B5

    A1 -->|request part/tool| B3
    B3 -->|reserve inventory| DS3
    B3 -->|raise exception| DS4
    A2 -->|confirm assistance| DS2

    A1 -->|complete step| B4
    B4 -->|log QA status| DS5
    B4 -->|escalate issues| DS4

    B5 -->|compile updates| DS6
    B5 -->|notify customer| CustomerComm[Customer Communications]

    DS4 -->|alert supervisor| A3
    DS3 -->|sync consumption| InventoryService[Inventory Services]
    DS6 -->|deliver updates| CustomerComm
```
