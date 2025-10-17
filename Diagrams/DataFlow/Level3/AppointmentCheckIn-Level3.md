```mermaid
flowchart TD
    subgraph Arrival
        A1[Reception Tablet]
        A2[Customer Identity Scan]
        A3[Vehicle Photo Capture]
    end

    subgraph IntakeServices[Intake Services]
        B1[Appointment Lookup API]
        B2[Digital Intake Form]
        B3[Optional Upsell Engine]
        B4[Check-in Completion Handler]
    end

    subgraph DataStores
        DS1[(Appointment Ledger)]
        DS2[(Intake Records)]
        DS3[(Vehicle Condition Photos)]
        DS4[((Notification Queue))]
        DS5[((Audit Events))]
    end

    A1 -->|retrieve appointment| B1
    A2 -->|verify identity| B1
    B1 -->|status update| DS1

    A1 -->|collect details| B2
    B2 -->|store intake| DS2
    B2 -->|push optional upsells| B3

    A3 -->|capture media| DS3
    B3 -->|record offers| DS5

    B4 -->|generate job card| JobEngine[Job Card Orchestrator]
    B4 -->|notify team| DS4
    B4 -->|log completion| DS5

    DS2 -->|pre-fill job card| JobEngine
    DS3 -->|link media| JobEngine
    DS4 -->|send updates| CustomerComm[Customer Communications]
```
