# System Data Flow – Level 2 (Customer Journey to Billing)

```mermaid
flowchart LR
    Customer([Customer])
    Portal[Customer Booking Portal]
    ApptSvc[Appointment Service]
    GarageSvc[Garage Assignment Service]
    CheckInSvc[Check-in Service]
    JobCardSvc[Job Card Orchestrator]
    BillingSvc[Billing Engine]
    Notification[Notification Service]
    Support([Support Agent])

    CustomerDB[(Customer Profiles)]
    ApptDB[(Appointment Ledger)]
    GarageDB[(Garage & Branch Directory)]
    JobDB[(Job Card Store)]
    InvoiceDB[(Invoice Repository)]
    Audit[(Audit & Telemetry)]

    Customer -->|Create/Update booking| Portal
    Portal -->|Persist booking| ApptSvc
    ApptSvc -->|Write| ApptDB
    ApptSvc -->|Select garage & slot| GarageSvc
    GarageSvc -->|Lookup availability| GarageDB
    GarageSvc -->|Assignment details| ApptSvc
    ApptSvc -->|Send confirmation| Notification
    Notification -->|SMS/Email| Customer

    Customer -->|Arrive & authenticate| CheckInSvc
    CheckInSvc -->|Fetch booking| ApptDB
    CheckInSvc -->|Validate user| CustomerDB
    CheckInSvc -->|Create job card request| JobCardSvc
    JobCardSvc -->|New job card| JobDB
    JobCardSvc -->|Log events| Audit

    JobCardSvc -->|Progress events| Notification
    Notification -->|Live updates| Customer
    Notification -->|Escalate issue| Support

    JobCardSvc -->|Service completion summary| BillingSvc
    BillingSvc -->|Generate invoice| InvoiceDB
    BillingSvc -->|Charge notification| Notification
    BillingSvc -->|Ledger entry| Audit

    Support -->|Adjustments| BillingSvc
    BillingSvc -->|Invoice update| InvoiceDB
```

This Level 2 diagram follows a single customer journey from booking through billing, exposing the interactions among shared data stores and operational services that maintain state consistency.
