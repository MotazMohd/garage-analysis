# Appointment Check-in – Data Flow

```mermaid
flowchart TD
    Customer -->|Arrives with booking| Reception[Reception Portal]
    Reception -->|Lookup appointment| CheckIn[Check-in Service]
    CheckIn -->|Validate schedule & branch| Appointments[(Appointments Store)]
    Reception -->|Capture condition details| CheckIn
    CheckIn -->|Store condition log| Condition[(Vehicle Condition Records)]
    Reception -->|Upload mandatory photos| Media[Photo Uploader]
    Media -->|Persist images| Storage[(Media Storage)]
    CheckIn -->|Suggest add-on services| Recommendation[Upsell Engine]
    Recommendation --> Reception
    CheckIn -->|Generate intake form| Intake[Job Intake Document]
    Intake --> Reception
    CheckIn -->|Create or activate job card| JobCard[Job Card Service]
    CheckIn -->|Notify customer| Notify[Notification Service]
    Notify --> Customer
    CheckIn -->|Log approval / rejection| Audit[(Audit Log)]
```

The diagram shows how staff confirm arrivals, capture vehicle evidence, trigger upsell logic, produce intake documents, and notify customers while logging every decision.
