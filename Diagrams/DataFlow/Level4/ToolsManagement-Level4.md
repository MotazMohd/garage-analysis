```mermaid
flowchart TD
    subgraph Interfaces[Interfaces]
        UI1[SaaS Tool Console]
        UI2[Garage Tool Console]
        UI3[Technician Mobile App]
        UI4[Maintenance Vendor Portal]
    end

    subgraph ToolServices[Tool Services]
        TS1[Tool Registry Service]
        TS2[Calibration Scheduler]
        TS3[Availability Planning Engine]
        TS4[Checkout & Return Service]
        TS5[Preventive Maintenance Workflow]
        TS6[External Integration API]
        TS7[Notification Hub]
    end

    subgraph DataStores[Data Stores]
        DS1[(Tool Catalogue)]
        DS2[(Garage Tool Overrides)]
        DS3[(Calibration Schedule Store)]
        DS4[(Availability Ledger)]
        DS5[(Checkout Ledger)]
        DS6[(Maintenance History)]
        DS7[((Tool Audit Ledger))]
        DS8[((Notification Queue))]
    end

    UI1 -->|register tool| TS1
    TS1 -->|persist definition| DS1
    TS1 -->|audit event| DS7

    UI2 -->|import tool| TS1
    TS1 -->|store overrides| DS2

    TS2 -->|create schedule| DS3
    TS2 -->|notify vendor| TS7

    TS3 -->|calculate availability| DS4
    TS3 -->|publish to| UI3

    UI3 -->|request checkout| TS4
    TS4 -->|validate availability| DS4
    TS4 -->|record checkout| DS5
    TS4 -->|update availability| DS4

    TS5 -->|log maintenance| DS6
    TS5 -->|mark unavailable| DS4
    TS5 -->|trigger calibration| TS2

    UI4 -->|confirm service| TS5
    TS6 -->|partner updates| DS6

    TS7 -->|queue notification| DS8
    DS8 --> UI2
    DS8 --> UI3
    DS8 --> UI4

    TS4 -->|return tool| DS5
    TS4 -->|audit return| DS7
```
