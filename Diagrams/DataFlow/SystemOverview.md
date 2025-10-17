# System Data Flow Overview

```mermaid
flowchart LR
    Garage[Garage & Branch Management]
    Users[User & Role Management]
    Templates[Service Template Configuration]
    Parts[Spare Parts Management]
    Tools[Tools Management]
    CheckIn[Appointment Check-in]
    JobCard[Job Card Execution]
    Notify[Notification & Alerts]
    Audit[(Audit & Reporting)]

    Garage --> Users
    Users --> Garage
    Garage --> Templates
    Templates --> JobCard
    Templates --> Parts
    Templates --> Tools
    Parts --> JobCard
    Tools --> JobCard
    Parts --> Notify
    Tools --> Notify
    CheckIn -->|Create job card| JobCard
    CheckIn --> Notify
    JobCard --> Notify
    JobCard --> Audit
    Garage --> Audit
    Users --> Audit
```

The overview diagram summarizes how onboarding garages and staff enables template configuration, how service templates draw on parts and tools catalogs, and how appointment check-ins initiate job cards whose execution feeds notifications and audit reporting.
