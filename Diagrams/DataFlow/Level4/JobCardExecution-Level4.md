```mermaid
flowchart TD
    subgraph Interfaces[Interfaces]
        UI1[Technician App]
        UI2[Assistant App]
        UI3[Workshop Lead Console]
        UI4[Customer Portal]
        UI5[Billing System]
    end

    subgraph ExecutionServices[Execution Services]
        ES1[Task Routing Service]
        ES2[Step Assignment Engine]
        ES3[Telemetry Collector]
        ES4[Resource Consumption Service]
        ES5[Exception Handling Desk]
        ES6[Quality Inspection Service]
        ES7[Customer Communication Hub]
        ES8[Billing Bridge]
        ES9[Audit Trail Service]
    end

    subgraph DataStores[Data Stores]
        DS1[(Job Card Warehouse)]
        DS2[(Step Progress Ledger)]
        DS3[(Resource Usage Ledger)]
        DS4[(Exception Queue)]
        DS5[(QA Review Store)]
        DS6[((Notification Queue))]
        DS7[((Audit Ledger))]
    end

    UI3 -->|dispatch job| ES1
    ES1 -->|update status| DS1
    ES1 -->|assign steps| ES2

    ES2 -->|push task| UI1
    ES2 -->|assist task| UI2
    ES2 -->|persist assignment| DS2

    UI1 -->|submit telemetry| ES3
    ES3 -->|time/metrics| DS2
    ES3 -->|exception events| ES5

    UI1 -->|consume parts| ES4
    ES4 -->|record usage| DS3
    ES4 -->|request replenishment| UI3

    ES5 -->|log incident| DS4
    ES5 -->|notify lead| UI3
    ES5 -->|trigger audit| ES9

    ES6 -->|request inspection| UI3
    ES6 -->|store findings| DS5
    ES6 -->|close step| DS2

    ES7 -->|queue notification| DS6
    DS6 --> UI4
    DS6 --> UI3

    ES8 -->|send completion| UI5
    ES8 -->|update billing| DS3

    ES9 -->|write audit| DS7
    ES9 -->|expose timeline| UI3
    ES9 -->|notify compliance| DS6
```
