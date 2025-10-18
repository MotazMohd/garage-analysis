```mermaid
flowchart TD
    subgraph Interfaces[Interfaces]
        UI1[SaaS Catalogue Console]
        UI2[Garage Inventory Console]
        UI3[Supplier Integration Gateway]
        UI4[Job Execution Engine]
    end

    subgraph InventoryServices[Inventory Services]
        IS1[Catalogue Authoring Service]
        IS2[Supplier Feed Ingestor]
        IS3[Garage Localisation Service]
        IS4[Reservation Engine]
        IS5[Stock Ledger Service]
        IS6[Replenishment Planner]
        IS7[Quality Hold Service]
        IS8[Notification Hub]
    end

    subgraph DataStores[Data Stores]
        DS1[(Global Parts Catalogue)]
        DS2[(Supplier Feed Staging)]
        DS3[(Garage Catalogue Overrides)]
        DS4[(Reservation Ledger)]
        DS5[(Stock Ledger)]
        DS6[(Quality Hold Queue)]
        DS7[((Inventory Audit Ledger))]
        DS8[((Notification Queue))]
    end

    UI1 -->|create part| IS1
    IS1 -->|persist master record| DS1
    IS1 -->|log change| DS7

    UI3 -->|upload feed| IS2
    IS2 -->|stage file| DS2
    IS2 -->|map attributes| IS1

    UI2 -->|import part| IS3
    IS3 -->|apply overrides| DS3
    IS3 -->|sync pricing| DS5

    UI4 -->|reserve part| IS4
    IS4 -->|write hold| DS4
    IS4 -->|decrement stock| IS5

    IS5 -->|update quantities| DS5
    IS5 -->|emit audit| DS7

    IS6 -->|monitor thresholds| DS5
    IS6 -->|generate PO suggestion| UI2
    IS6 -->|notify supplier| UI3

    IS7 -->|quarantine stock| DS6
    IS7 -->|release/deny| DS5
    IS7 -->|alert quality team| IS8

    IS8 -->|queue notification| DS8
    DS8 --> UI1
    DS8 --> UI2
    DS8 --> UI3
```
