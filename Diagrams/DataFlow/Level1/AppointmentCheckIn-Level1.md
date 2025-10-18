# Appointment Check-in – Level 1 Data Flow

```mermaid
flowchart TD
    Customer[Customer Arrival] -->|1. Present appointment| P1((P1 Locate Booking))
    P1 --> Booking[(Appointment Registry)]
    Staff[Service Advisor] -->|Capture VIN & mileage| P2((P2 Intake Capture))
    P2 --> Intake[(Vehicle Intake Record)]
    P2 --> Photos[(Photo Evidence Store)]
    P2 --> Audit[(Audit Ledger)]
    Staff -->|2. Record condition| P3((P3 Condition Checklist))
    P3 --> Intake
    P3 --> Audit
    Advisor[Advisor Portal] -->|3. Confirm services| P4((P4 Service Confirmation))
    P4 --> Notify[Notification Service]
    P4 --> Intake
    P4 --> Audit
    P4 -->|Create job card| JobCard[(Job Card Queue)]
    System[System Automations] -->|4. Trigger updates| P5((P5 Update Availability))
    P5 --> Slots[(Bay/Technician Schedule)]
    P5 --> Audit
```

This Level 1 diagram details the check-in journey from appointment retrieval and intake capture through service confirmation, job card creation, and scheduling updates.
