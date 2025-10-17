# Garage & Branch Management Data Flow

```mermaid
flowchart LR
    subgraph DataSources[Data Sources]
        GA[Garage Admin]
        SA[SaaS Admin]
        BranchForm[Branch Setup Form]
        DocsPortal[Document Uploads Portal]
        IdP[Identity Provider]
        CRM[Partner CRM Integration]
        RegFeed[Regulatory Bulletin Feed]
        Feedback[Customer Feedback Portal]
        Telemetry[Operational Telemetry Feeds]
        SupportDesk[Support Ticketing System]
        ThreatIntel[Threat Intelligence Feed]
        AuditFirm[Third-Party Audit Reports]
        MobileApp[Garage Mobile App]
        IoTSensors[Connected IoT Sensors]
        VendorPortal[Vendor Partner Portal]
        TrainingPlatform[Training & Certification Platform]
        HRIS[HR Information System]
        SustainabilityFeed[Sustainability Reporting Feed]
        FacilitiesPlatform[Facilities Maintenance Platform]
        CustomerComms[Customer Communications Hub]
        BankFeed[Bank Settlement Feed]
    end

    subgraph CoreServices[Core Processes]
        GMS[Garage Management Service]
        Approval[Approval Console]
        BranchSvc[Branch Management Service]
        AuditBus[Audit Event Bus]
        DocService[Document Verification Service]
        AccessCtrl[Access Control Service]
        Compliance[Compliance Reporter]
        RiskEngine[Risk Scoring Engine]
        Lifecycle[Lifecycle Scheduler]
        Retention[Retention Service]
        QAEngine[Quality Assurance Engine]
        BillingRecon[Billing Reconciliation Service]
        DataGov[Data Governance Manager]
        SecurityOps[Security Operations Center]
        IncidentResponse[Incident Response Orchestrator]
        AnalyticsHub[Analytics & ML Hub]
        DRCoordinator[Disaster Recovery Coordinator]
        SecretsMgr[Secrets Management Service]
        PolicyEngine[Policy Automation Engine]
        OrchestrationHub[Workflow Orchestration Hub]
        ChangeMgmt[Change Management Service]
        FraudDetect[Fraud Detection Service]
        VendorMgmt[Vendor Management Service]
        TrainingSvc[Training Compliance Service]
        HRCompliance[HR Compliance Checker]
        SupplyChain[Parts Supply Coordinator]
        ExperienceOrch[Experience Orchestration Hub]
        EnvCompliance[Environmental Compliance Service]
        FacilitiesCoord[Facilities Maintenance Coordinator]
        AssetManager[Asset Lifecycle Manager]
        CoachingEngine[Performance Coaching Engine]
        PrivacyService[Privacy & Consent Service]
        EngagementHub[Engagement Orchestration Hub]
        TreasuryOps[Treasury Settlement Service]
    end

    subgraph Destinations[Data Destinations]
        GR[(Garage Registry DB)]
        BR[(Branch Directory DB)]
        AL[(Audit Log Store)]
        AuditView[Audit Viewer]
        Notify[(Notification Service)]
        DocVault[(Document Vault)]
        ComplianceQueue[(Compliance Review Queue)]
        Monitoring[(Monitoring Dashboard)]
        Warehouse[(Reporting Warehouse)]
        RiskStore[(Risk Score Store)]
        Archive[(Cold Archive Storage)]
        FeedbackDB[(Customer Feedback DB)]
        BillingLedger[(Billing Ledger)]
        DataCatalog[(Data Catalog & Lineage)]
        TicketQueue[(Support Ticket Queue)]
        SIEM[(Security Information & Event Management)]
        Lakehouse[(Analytics Lakehouse)]
        DRSite[(Disaster Recovery Site)]
        RunbookRepo[(Runbook Repository)]
        PolicyRegistry[(Policy Registry)]
        KeyVault[(Key Vault)]
        MobileSync[(Mobile Sync Service)]
        VendorLedger[(Vendor Settlement Ledger)]
        TrainingArchive[(Training Records Archive)]
        FraudCaseQueue[(Fraud Case Queue)]
        LegalHold[(Legal Hold Vault)]
        DataLake[(Enterprise Data Lake)]
        JourneyAnalytics[(Journey Analytics Workspace)]
        HRRecords[(HR Compliance Records)]
        PartsInventory[(Parts Inventory System)]
        KnowledgeBase[(Operational Knowledge Base)]
        ESGWorkspace[(Sustainability & ESG Workspace)]
        MaintenanceBoard[(Maintenance Command Center)]
        AssetRegistry[(Asset Registry)]
        CoachingLog[(Coaching & Enablement Tracker)]
        ConsentVault[(Consent & Preference Vault)]
        EngagementArchive[(Engagement Campaign Archive)]
        PaymentGateway[(Payment Gateway)]
        TreasuryVault[(Treasury Settlement Vault)]
    end

    GA -->|Authenticate| IdP
    SA -->|Authenticate| IdP
    IdP -->|Issue scoped tokens| GMS
    GMS -->|Validate permissions| AccessCtrl
    AccessCtrl -->|Return role grants| GMS
    CRM -->|Push partner context| GMS
    RegFeed -->|Publish compliance updates| Compliance
    Feedback -->|Share satisfaction scores & qualitative input| QAEngine
    Telemetry -->|Stream performance metrics| Monitoring
    SupportDesk -->|Escalate operational issues| IncidentResponse
    ThreatIntel -->|Share threat indicators| SecurityOps
    AuditFirm -->|Deliver attestation findings| Compliance
    MobileApp -->|Authenticate & sync tasks| IdP
    MobileApp -->|Capture onsite updates| MobileSync
    IoTSensors -->|Transmit equipment diagnostics| Monitoring
    IoTSensors -->|Stream asset telemetry| AssetManager
    VendorPortal -->|Submit partner onboarding data| VendorMgmt
    TrainingPlatform -->|Share certification results| TrainingSvc
    HRIS -->|Supply staffing roster & compliance status| HRCompliance
    SustainabilityFeed -->|Emit emissions metrics| EnvCompliance
    FacilitiesPlatform -->|Report work orders| FacilitiesCoord
    CustomerComms -->|Provide messaging calendar| EngagementHub
    CustomerComms -->|Transmit consent updates| PrivacyService
    BankFeed -->|Send settlement results| TreasuryOps

    GA -->|Submit creation fields\n(name, license, services, hours, etc.)| GMS
    GMS -->|Persist Pending garage| GR
    GMS -->|Emit submission event| AuditBus
    AuditBus -->|Store request snapshot| AL
    GMS -->|Notify pending review| SA
    GMS -->|Pre-score risk| RiskEngine
    RiskEngine -->|Persist assessment| RiskStore
    RiskEngine -->|Raise high-risk alerts| Compliance

    GA -->|Upload licenses & permits| DocsPortal
    DocsPortal -->|Sanitize & classify| DocService
    DocService -->|Link attachments| GMS
    DocService -->|Surface compliance flags| Approval
    DocService -->|Persist originals| DocVault
    DocService -->|Escalate anomalies| Compliance
    Compliance -->|Queue manual review| ComplianceQueue
    EnvCompliance -->|Flag environmental obligations| Compliance

    SA -->|Review documents & details| Approval
    Approval -->|Approve| GMS
    Approval -->|Reject with reason| Rejection[Rejection Notice]
    Rejection -->|Send status + feedback| Notify
    Notify -->|Deliver decision| GA
    GMS -->|Update status Active| GR
    GMS -->|Emit decision event| AuditBus

    GMS -->|Provision defaults\n(working hours, services, contact)| BranchSvc
    GA -->|Create/Update branch| BranchForm
    BranchForm -->|Inherit garage defaults| BranchSvc
    BranchSvc -->|Persist branch overrides| BR
    BranchSvc -->|Emit branch change event| AuditBus
    Lifecycle -->|Schedule periodic reviews| GMS
    Lifecycle -->|Trigger dormant cleanup| Retention
    EnvCompliance -->|Register ESG policies| DataGov

    GMS -->|Status changes, ownership transfer, document updates| AuditBus
    AuditBus -->|Write append-only log| AL
    AL -->|Expose audit trail| AuditView
    SA -->|Review history| AuditView
    GA -->|Review history| AuditView
    AuditBus -->|Trigger operational alerts| Monitoring
    AuditBus -->|Publish lifecycle dataset| Warehouse
    Lifecycle -->|Emit cadence log| AuditBus
    AuditBus -->|Publish metadata events| DataGov

    Notify -->|Broadcast approvals & reminders| Monitoring
    Warehouse -->|Drive compliance dashboards| Monitoring
    Retention -->|Archive inactive records| Archive
    Retention -->|Confirm retention disposition| AuditBus
    Monitoring -->|Surface anomalies| QAEngine
    QAEngine -->|Log structured insights| FeedbackDB
    QAEngine -->|Open remediation tasks| Compliance
    QAEngine -->|Share service scores| Monitoring
    QAEngine -->|Provide coaching cues| CoachingEngine
    GMS -->|Generate invoicing data| BillingRecon
    BranchSvc -->|Sync branch billing impacts| BillingRecon
    BillingRecon -->|Settle partner fees| BillingLedger
    BillingRecon -->|Flag discrepancies| Compliance
    BillingRecon -->|Forward cleared invoices| TreasuryOps
    DataGov -->|Register lineage & ownership| DataCatalog
    DataGov -->|Publish access policies| AccessCtrl
    IncidentResponse -->|Create remediation tickets| TicketQueue
    IncidentResponse -->|Sync runbooks| RunbookRepo
    IncidentResponse -->|Coordinate with QA insights| QAEngine
    SecurityOps -->|Tune detection rules| Monitoring
    SecurityOps -->|Feed consolidated alerts| SIEM
    PolicyEngine -->|Version governance rules| PolicyRegistry
    PolicyEngine -->|Enforce guardrails| AccessCtrl
    Compliance -->|Raise findings for policy updates| PolicyEngine
    Warehouse -->|Provide curated datasets| AnalyticsHub
    AnalyticsHub -->|Train predictive models| QAEngine
    AnalyticsHub -->|Publish advanced analytics| Lakehouse
    AnalyticsHub -->|Surface anomaly insights| Monitoring
    GMS -->|Replicate critical state| DRCoordinator
    BranchSvc -->|Stream branch state| DRCoordinator
    DRCoordinator -->|Maintain hot standby| DRSite
    DRCoordinator -->|Report failover readiness| Monitoring
    SecretsMgr -->|Rotate credentials| KeyVault
    AccessCtrl -->|Retrieve scoped secrets| KeyVault
    SecurityOps -->|Review key usage| KeyVault
    SIEM -->|Dispatch incidents| IncidentResponse
    GMS -->|Sync branch actions to field staff| MobileSync
    MobileSync -->|Surface tasks to mobile app| MobileApp
    VendorMgmt -->|Validate vendor credentials| Compliance
    VendorMgmt -->|Coordinate onboarding| OrchestrationHub
    VendorMgmt -->|Record settlements| VendorLedger
    OrchestrationHub -->|Distribute workflow updates| ChangeMgmt
    ChangeMgmt -->|Notify stakeholders| Notify
    ChangeMgmt -->|Archive approvals| KnowledgeBase
    TrainingSvc -->|Flag expired certifications| Compliance
    TrainingSvc -->|Persist training proofs| TrainingArchive
    HRCompliance -->|Enforce access constraints| AccessCtrl
    HRCompliance -->|Archive attestations| HRRecords
    SupplyChain -->|Track inventory consumption| PartsInventory
    SupplyChain -->|Alert shortages| Monitoring
    SupplyChain -->|Sync vendor updates| VendorMgmt
    FraudDetect -->|Score anomalous activity| Monitoring
    FraudDetect -->|Open fraud cases| FraudCaseQueue
    FacilitiesCoord -->|Coordinate repairs| SupplyChain
    FacilitiesCoord -->|Dispatch maintenance tasks| MaintenanceBoard
    FacilitiesCoord -->|Sync facility lifecycle| AssetManager
    AssetManager -->|Update asset registry| AssetRegistry
    AssetManager -->|Notify retirements| Retention
    AssetManager -->|Publish asset posture| Monitoring
    EnvCompliance -->|Publish ESG dashboards| ESGWorkspace
    EnvCompliance -->|Enforce sustainability policies| PolicyEngine
    CoachingEngine -->|Assign coaching plans| CoachingLog
    CoachingEngine -->|Trigger enablement nudges| EngagementHub
    EngagementHub -->|Deliver targeted communications| Notify
    EngagementHub -->|Archive campaign outcomes| EngagementArchive
    EngagementHub -->|Coordinate with experience orchestration| ExperienceOrch
    PrivacyService -->|Enforce consent checks| AccessCtrl
    PrivacyService -->|Store consent receipts| ConsentVault
    EngagementHub -->|Respect consent preferences| PrivacyService
    TreasuryOps -->|Initiate payouts| PaymentGateway
    TreasuryOps -->|Persist treasury ledger| TreasuryVault
    TreasuryOps -->|Emit settlement telemetry| Monitoring
    EnvCompliance -->|Share sustainability signals| AnalyticsHub
    CoachingEngine -->|Provide enablement outcomes| AnalyticsHub
    PolicyEngine -->|Place records on hold| LegalHold
    Compliance -->|Escalate legal hold requests| LegalHold
    Lifecycle -->|Publish longitudinal dataset| DataLake
    AnalyticsHub -->|Feed multi-channel journeys| JourneyAnalytics
    ExperienceOrch -->|Curate proactive outreach| Notify
    ExperienceOrch -->|Aggregate journey signals| JourneyAnalytics
    QAEngine -->|Share insights for experience orchestration| ExperienceOrch
    Monitoring -->|Provide telemetry snapshots| ExperienceOrch
    IncidentResponse -->|Update procedural knowledge| KnowledgeBase
    QAEngine -->|Surface best practices| KnowledgeBase

    classDef source fill:#eff6ff,stroke:#1d4ed8,stroke-width:1px,color:#1f2937;
    classDef process fill:#ecfdf5,stroke:#047857,stroke-width:1px,color:#064e3b;
    classDef destination fill:#fff7ed,stroke:#c2410c,stroke-width:1px,color:#7c2d12;

    class GA,SA,BranchForm,DocsPortal,IdP,CRM,RegFeed,Feedback,Telemetry,SupportDesk,ThreatIntel,AuditFirm,MobileApp,IoTSensors,VendorPortal,TrainingPlatform,HRIS,SustainabilityFeed,FacilitiesPlatform,CustomerComms,BankFeed source;
    class GMS,Approval,BranchSvc,AuditBus,DocService,AccessCtrl,Compliance,RiskEngine,Lifecycle,Retention,QAEngine,BillingRecon,DataGov,SecurityOps,IncidentResponse,AnalyticsHub,DRCoordinator,SecretsMgr,PolicyEngine,OrchestrationHub,ChangeMgmt,FraudDetect,VendorMgmt,TrainingSvc,HRCompliance,SupplyChain,ExperienceOrch,EnvCompliance,FacilitiesCoord,AssetManager,CoachingEngine,PrivacyService,EngagementHub,TreasuryOps process;
    class GR,BR,AL,AuditView,Notify,Rejection,DocVault,ComplianceQueue,Monitoring,Warehouse,RiskStore,Archive,FeedbackDB,BillingLedger,DataCatalog,TicketQueue,SIEM,Lakehouse,DRSite,RunbookRepo,PolicyRegistry,KeyVault,MobileSync,VendorLedger,TrainingArchive,FraudCaseQueue,LegalHold,DataLake,JourneyAnalytics,HRRecords,PartsInventory,KnowledgeBase,ESGWorkspace,MaintenanceBoard,AssetRegistry,CoachingLog,ConsentVault,EngagementArchive,PaymentGateway,TreasuryVault destination;
```
