# Job Card Execution & Progress Tracking – Level 1 Data Flow

```mermaid
flowchart TD
    JobCardIntake[Job Card Intake] -->|1. Assign steps| P1((P1 Step Allocation))
    P1 --> Technicians[(Technician Assignments)]
    P1 --> Audit[(Audit Ledger)]
    Technician[Technician] -->|2. Update progress| P2((P2 Step Execution))
    P2 --> Progress[(Progress Ledger)]
    P2 --> Photos[(Step Evidence Store)]
    P2 --> Audit
    Assistant[Service Assistant] -->|3. Handle blockers| P3((P3 Exception Routing))
    P3 --> Notify[Notification Service]
    P3 --> Audit
    QA[Quality Inspector] -->|4. Review work| P4((P4 QA Inspection))
    P4 --> QAResults[(Inspection Records)]
    P4 --> Audit
    Customer[Customer Portal] -->|5. Receive updates| P5((P5 Customer Communication))
    P5 --> Notify
    P5 --> Feedback[(Customer Feedback Store)]
    P5 --> Audit
    Billing[Billing Engine] -->|6. Close job| P6((P6 Completion & Handover))
    P6 --> Progress
    P6 --> Audit
```

The Level 1 diagram shows the job card lifecycle from step allocation and technician execution through exception routing, quality checks, customer communications, and final closure.
