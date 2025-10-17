# System Data Flow – Level 1 Decomposition

```mermaid
flowchart LR
    subgraph CustomerJourney[Customer-Facing Processes]
        Booking[Booking Portal]
        CheckIn[Appointment Check-in]
        Updates[Customer Notifications]
    end

    subgraph Operations[Operations Backbone]
        Garage[Garage & Branch Management]
        Identity[User & Role]
        Templates[Service Templates]
        Parts[Spare Parts]
        Tools[Tools]
        JobCard[Job Card Execution]
        Billing[Billing & Invoicing]
    end

    subgraph DataStores[Shared Data Stores]
        GarageDB[(Garages & Branches)]
        IdentityDB[(Identity Directory)]
        Catalogs[(Templates/Parts/Tools Libraries)]
        JobDB[(Job Cards & Progress)]
        Ledger[(Audit & Telemetry)]
    end

    Booking -->|Create appointments| CheckIn
    CheckIn -->|Initiate job card| JobCard
    Updates -->|Feedback| Identity

    Garage --> GarageDB
    Identity --> IdentityDB
    Templates --> Catalogs
    Parts --> Catalogs
    Tools --> Catalogs
    JobCard --> JobDB
    JobCard --> Ledger
    Garage --> Ledger
    Identity --> Ledger

    GarageDB --> CheckIn
    IdentityDB --> CheckIn
    Catalogs --> JobCard
    JobDB --> Billing
    Billing --> Updates
    Ledger --> Billing
```

The Level 1 system diagram clusters customer journeys, operational modules, and shared data stores to highlight how state flows through the SaaS platform end-to-end.
