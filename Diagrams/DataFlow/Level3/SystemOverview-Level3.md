```mermaid
flowchart TD
    subgraph CustomerLifecycle[Customer Lifecycle]
        A1[Online Booking Form]
        A2[Customer Portal]
        A3[Customer Notifications]
    end

    subgraph OperationsHub[Operations Hub]
        B1[Garage Onboarding Service]
        B2[Identity Directory]
        B3[Scheduling Engine]
        B4[Job Card Orchestrator]
        B5[Inventory Services]
        B6[Billing & Invoicing Service]
    end

    subgraph DataStores[Shared Data Stores]
        DS1[(Tenants & Branches)]
        DS2[(User Accounts & Roles)]
        DS3[(Appointment Ledger)]
        DS4[(Job Cards)]
        DS5[(Inventory & Reservations)]
        DS6[(Invoices & Payments)]
        DS7[((Audit Ledger))]
        DS8[((Notification Queue))]
    end

    A1 -->|creates| B3
    B3 -->|books slot| DS3
    A2 -->|views availability| B3
    B3 -->|confirms| A3

    B1 -->|approve garage| DS1
    B1 -->|lifecycle events| DS7
    B1 -->|notify owners| A3

    B2 -->|provisions| DS2
    B2 -->|alerts| DS8

    B3 -->|dispatch check-in task| B4
    B4 -->|generate| DS4
    B4 -->|reserve parts/tools| B5
    B5 -->|write reservations| DS5
    B5 -->|low stock alert| DS8

    B4 -->|progress updates| A3
    B4 -->|exceptions| DS7

    B5 -->|replenishment request| B6
    B6 -->|issue invoice| DS6
    B6 -->|payment receipt| A3
    B6 -->|close booking| DS3

    DS2 -->|authorize access| B4
    DS2 -->|enable impersonation| B1

    DS5 -->|feed availability| B3

    A3 -->|feedback| A2
```
