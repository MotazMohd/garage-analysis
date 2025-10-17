# Appointment Check-in – Level 2 (Intake and Handover)

```mermaid
flowchart TD
    Customer([Customer])
    Reception([Reception Staff])
    CheckInPortal[Check-in Portal]
    ApptSvc[Appointment Service]
    IntakeSvc[Intake Form Service]
    ConditionSvc[Vehicle Condition Capture]
    JobCardSvc[Job Card Service]
    Notification[Notification Service]
    Audit[(Audit Ledger)]
    ApptDB[(Appointments Ledger)]
    IntakeDB[(Intake Forms)]
    MediaStore[(Photo Evidence Store)]
    JobDB[(Job Cards)]

    Customer -->|Provide booking code| CheckInPortal
    Reception -->|Search appointment| CheckInPortal
    CheckInPortal -->|Fetch details| ApptSvc
    ApptSvc -->|Appointment data| ApptDB
    ApptDB -->|Return record| CheckInPortal

    CheckInPortal -->|Validate customer| IntakeSvc
    IntakeSvc -->|Prefill form| IntakeDB
    CheckInPortal -->|Submit answers| IntakeSvc
    IntakeSvc -->|Store intake| IntakeDB
    IntakeSvc -->|Log completion| Audit

    CheckInPortal -->|Capture condition photos| ConditionSvc
    ConditionSvc -->|Store media| MediaStore
    ConditionSvc -->|Link evidence| IntakeDB
    ConditionSvc -->|Log capture| Audit

    CheckInPortal -->|Create job card request| JobCardSvc
    JobCardSvc -->|Persist job card| JobDB
    JobCardSvc -->|Acknowledge ID| CheckInPortal
    JobCardSvc -->|Notify workshop| Notification
    Notification -->|Push update| Reception
    Notification -->|Status message| Customer
    JobCardSvc -->|Record creation| Audit
```

This Level 2 diagram shows how the intake portal orchestrates appointment retrieval, digital forms, vehicle condition capture, and job card creation while persisting evidence and audit history.
