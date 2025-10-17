```mermaid
flowchart TD
    subgraph Governance[Intake Governance]
        IntakePolicies[(Intake Compliance Policies)]
        EvidenceRetention[(Evidence Retention Schedule)]
        PrivacyRules[(Privacy & Consent Rules)]
    end

    subgraph IntakeOps[Intake Security & Compliance]
        IdentityMonitor[Identity Verification Monitor]
        EvidenceScanner[Evidence Classification]
        ConsentAuditor[Consent Auditor]
        QueueAnomaly[Queue Anomaly Detector]
        IntakeResponder[Intake Incident Desk]
    end

    subgraph IntakeServices[Intake Services]
        ArrivalDesk[Arrival Capture Service]
        BookingLookup[Booking Lookup]
        IntakeForm[Intake Form Service]
        EvidenceCapture[Evidence Capture Service]
        UpsellEngine[Upsell Recommendation Engine]
        JobCardBridge[Job Card Bridge]
        AuditLogger[Audit Logger]
    end

    subgraph Stores[Intake Stores]
        AppointmentLedger[(Appointment Ledger)]
        IntakeFormsVault[(Intake Forms Vault)]
        EvidenceVault[(Evidence Vault)]
        ConsentLedger[(Consent Ledger)]
        AuditStream[((Intake Audit Stream))]
    end

    IntakePolicies --> ArrivalDesk
    IntakePolicies --> IntakeForm
    PrivacyRules --> EvidenceCapture
    EvidenceRetention --> EvidenceCapture

    ArrivalDesk --> BookingLookup
    BookingLookup --> AppointmentLedger
    IntakeForm --> IntakeFormsVault
    EvidenceCapture --> EvidenceVault
    JobCardBridge --> AppointmentLedger
    IntakeServices --> AuditLogger
    AuditLogger --> AuditStream

    IntakeFormsVault --> ConsentAuditor
    EvidenceVault --> EvidenceScanner
    ConsentLedger --> ConsentAuditor
    AppointmentLedger --> QueueAnomaly
    AuditStream --> IdentityMonitor

    EvidenceScanner --> IntakeResponder
    ConsentAuditor --> IntakeResponder
    IdentityMonitor --> IntakeResponder
    QueueAnomaly --> IntakeResponder

    IntakeResponder -->|Mitigation| AppointmentLedger
    IntakeResponder --> IntakeFormsVault
    IntakeResponder --> EvidenceVault
    IntakeResponder --> ConsentLedger
    IntakeResponder --> IntakePolicies
```
