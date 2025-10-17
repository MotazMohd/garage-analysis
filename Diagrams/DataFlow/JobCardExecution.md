# Job Card Execution & Progress Tracking – Data Flow

```mermaid
flowchart TD
    JobCard[Job Card Service] -->|Distribute step assignments| TechApp[Technician App]
    JobCard -->|Notify assistants| AssistApp[Assistant App]
    TechApp -->|Start / update step| Execution[Step Execution API]
    AssistApp -->|Log support work| Execution
    Execution -->|Persist status & timers| Progress[(Step Progress Log)]
    Execution -->|Record checklist & signatures| Checklist[(Validation Store)]
    Execution -->|Upload evidence| Media[(Media Storage)]
    Execution -->|Request parts / tools| Inventory[(Inventory & Tool Availability)]
    Inventory -->|Confirm reservations| Execution
    Execution -->|Raise exception| Exceptions[Exception Queue]
    Lead[Lead / Supervisor Console] -->|Review override| Exceptions
    Exceptions -->|Decision outcome| Execution
    Execution -->|Trigger notifications| Notify[Notification Service]
    Notify --> Customer[Customer Portal / App]
    Notify --> Staff[Staff Alerts]
    Execution -->|Complete all steps| JobCard
    JobCard -->|Generate completion summary| Summary[(Job Summary / Invoice Prep)]
    Summary --> Customer
    Execution -->|Audit every action| Audit[(Audit Trail)]
```

This diagram emphasizes the interactions among technicians, assistants, supervisors, inventory, and notification systems as a job card progresses from step execution to completion.
