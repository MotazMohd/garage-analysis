```mermaid
flowchart TD
    subgraph Governance[Tool Governance]
        ToolPolicies[(Tool Compliance Policies)]
        CalibrationStandards[(Calibration Standards Registry)]
        SafetyProtocols[(Safety Protocol Catalogue)]
    end

    subgraph ToolOps[Tool Security & Compliance]
        CalibrationMonitor[Calibration Compliance Monitor]
        UsageTelemetry[Usage Telemetry Analyzer]
        SafetyInspector[Safety Incident Inspector]
        SupplierAudit[Supplier Audit Service]
        AlertDesk[((Tool Alert Desk))]
    end

    subgraph ToolServices[Tool Services]
        ToolRegistry[Tool Registry Service]
        AvailabilityPlanner[Availability Planning Service]
        CheckoutService[Technician Checkout Service]
        MaintenanceScheduler[Maintenance Scheduler]
        ComplianceReporter[Compliance Reporter]
        AuditLogger[Audit Logger]
    end

    subgraph Stores[Tool Stores]
        ToolCatalogue[(Tool Catalogue)]
        AvailabilityLedger[(Availability Ledger)]
        UsageLedger[(Usage Ledger)]
        MaintenanceLedger[(Maintenance Ledger)]
        AuditStream[((Tool Audit Stream))]
    end

    ToolPolicies --> ToolRegistry
    CalibrationStandards --> MaintenanceScheduler
    SafetyProtocols --> ComplianceReporter

    ToolRegistry --> ToolCatalogue
    AvailabilityPlanner --> AvailabilityLedger
    CheckoutService --> UsageLedger
    MaintenanceScheduler --> MaintenanceLedger
    ToolServices --> AuditLogger
    AuditLogger --> AuditStream

    UsageLedger --> UsageTelemetry
    MaintenanceLedger --> CalibrationMonitor
    ToolCatalogue --> SupplierAudit
    AuditStream --> SafetyInspector

    UsageTelemetry --> AlertDesk
    CalibrationMonitor --> AlertDesk
    SafetyInspector --> AlertDesk
    SupplierAudit --> AlertDesk

    AlertDesk -->|Mitigation| ToolCatalogue
    AlertDesk --> AvailabilityLedger
    AlertDesk --> UsageLedger
    AlertDesk --> MaintenanceLedger
    AlertDesk --> ToolPolicies
```
