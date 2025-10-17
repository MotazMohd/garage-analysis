```mermaid
flowchart TD
    subgraph Interfaces[Interfaces]
        UI1[Reception Tablet]
        UI2[Service Advisor Console]
        UI3[Customer Portal]
        UI4[Technician Queue Display]
    end

    subgraph CheckInServices[Check-in Services]
        CS1[Arrival Kiosk Service]
        CS2[Booking Lookup Service]
        CS3[Identity Verification Service]
        CS4[Condition Capture Service]
        CS5[Intake Form Generator]
        CS6[Upsell Recommendation Engine]
        CS7[Job Card Bridge]
        CS8[Notification Hub]
    end

    subgraph DataStores[Data Stores]
        DS1[(Appointment Ledger)]
        DS2[(Customer Profile Store)]
        DS3[(Intake Document Store)]
        DS4[(Media Archive)]
        DS5[(Job Card Warehouse)]
        DS6[((Audit Ledger))]
        DS7[((Notification Queue))]
    end

    UI1 -->|vehicle arrival| CS1
    CS1 -->|lookup booking| CS2
    CS2 -->|retrieve details| DS1
    CS2 -->|push to console| UI2

    CS3 -->|verify identity| DS2
    CS3 -->|log verification| DS6

    CS4 -->|capture photos| DS4
    CS4 -->|condition notes| DS3

    CS5 -->|compile intake form| DS3
    CS5 -->|share summary| UI2

    CS6 -->|analyse history| DS2
    CS6 -->|suggest upsell| UI2

    UI2 -->|approve check-in| CS7
    CS7 -->|create job card| DS5
    CS7 -->|update appointment| DS1
    CS7 -->|notify technicians| UI4

    CS8 -->|queue notification| DS7
    DS7 --> UI3
    DS7 --> UI2

    CS1 -->|audit event| DS6
    CS7 -->|audit linkage| DS6
```
