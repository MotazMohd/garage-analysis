# Job Card Execution – Level 2 (Workshop Progress)

```mermaid
flowchart LR
    Dispatcher([Workshop Dispatcher])
    Technician([Technician])
    Assistant([Assistant])
    QAInspector([QA Inspector])
    Customer([Customer])
    JobOrchestrator[Job Card Orchestrator]
    StepEngine[Step Workflow Engine]
    PartsSvc[Parts Reservation Service]
    ToolsSvc[Tool Checkout Service]
    ExceptionSvc[Exception Router]
    Notification[Notification Service]
    BillingSvc[Billing Engine]
    JobDB[(Job Card Store)]
    StepLog[(Step Progress Log)]
    ExceptionLog[(Exception Ledger)]
    Audit[(Audit Ledger)]

    Dispatcher -->|Assign technician| JobOrchestrator
    JobOrchestrator -->|Update assignment| JobDB
    JobOrchestrator -->|Notify assignee| Notification
    Notification -->|Send task| Technician

    Technician -->|Start step| StepEngine
    StepEngine -->|Reserve parts| PartsSvc
    PartsSvc -->|Update stock| StepLog
    PartsSvc -->|Record usage| Audit
    StepEngine -->|Request tools| ToolsSvc
    ToolsSvc -->|Checkout record| StepLog
    ToolsSvc -->|Audit checkout| Audit

    Technician -->|Submit progress| StepEngine
    StepEngine -->|Write status| StepLog
    StepEngine -->|Update job card| JobDB
    StepEngine -->|Progress update| Notification
    Notification -->|Notify customer| Customer

    Technician -->|Raise exception| ExceptionSvc
    ExceptionSvc -->|Escalate| Dispatcher
    ExceptionSvc -->|Notify QA| QAInspector
    ExceptionSvc -->|Log issue| ExceptionLog
    ExceptionSvc -->|Audit entry| Audit

    QAInspector -->|Review & approve| StepEngine
    StepEngine -->|Closure record| StepLog
    StepEngine -->|Job completion| JobOrchestrator
    JobOrchestrator -->|Send summary| BillingSvc
    BillingSvc -->|Generate charges| JobDB
    BillingSvc -->|Notify completion| Notification
```

The Level 2 job card diagram captures technician execution, resource consumption, exception handling, and quality assurance interactions leading to billing and customer notifications.
