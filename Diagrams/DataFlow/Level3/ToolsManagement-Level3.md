```mermaid
flowchart TD
    subgraph ToolCatalogue
        A1[SaaS Tool Curator]
        A2[Garage Tool Importer]
        A3[Calibration Scheduler]
    end

    subgraph WorkshopOps
        B1[Tool Reservation Service]
        B2[Technician Checkout App]
        B3[Maintenance Logger]
        B4[Availability Sync Service]
    end

    subgraph DataStores
        DS1[(Tool Library)]
        DS2[(Garage Tool Registry)]
        DS3[(Availability Calendar)]
        DS4[(Checkout Ledger)]
        DS5[((Maintenance Records))]
        DS6[((Alerts Queue))]
    end

    A1 -->|define tool| DS1
    A1 -->|publish| DS6
    A2 -->|import selection| DS2
    A2 -->|configure quantities| DS2
    A3 -->|schedule calibration| B3
    A3 -->|block slots| DS3

    B1 -->|reserve tool| DS3
    B1 -->|hold inventory| DS4
    B1 -->|notify| DS6

    B2 -->|scan checkout| DS4
    B2 -->|update status| DS3
    B2 -->|start timer| DS6

    B3 -->|log calibration| DS5
    B3 -->|block tool| DS3
    B3 -->|raise alert| DS6

    B4 -->|sync to templates| TemplateStudio[Service Template Studio]
    B4 -->|publish to job cards| JobEngine[Job Card Orchestrator]

    DS3 -->|expose availability| SchedulingService[Scheduling Engine]
    DS4 -->|audit usage| DS5
```
