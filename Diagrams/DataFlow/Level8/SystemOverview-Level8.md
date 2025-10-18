```mermaid
flowchart TD
    subgraph ExperienceSignals[Experience & Operational Signals]
        CustomerFeedback[Customer Feedback Forms]
        TechnicianDiaries[Technician Shift Diaries]
        SupportDesk[Support Ticket System]
        UsageEvents(((Usage Telemetry Bus)))
    end

    subgraph DataPlatform[Analytics & Insight Platform]
        EventLake[((Event Lake))]
        MetricsWarehouse[(Metrics Warehouse)]
        QualitativeRepo[(Qualitative Research Repository)]
        InsightCatalog[(Insight Catalog)]
    end

    subgraph AnalyticsEngines[Analytics, ML & Experimentation]
        JourneyAnalytics[Journey Funnel Analytics]
        ReliabilityAnalytics[Reliability Scorecards]
        ExperimentService[Experiment & A/B Service]
        ForecastModels[Forecast & Capacity Models]
    end

    subgraph ImprovementLoops[Continuous Improvement Loops]
        ProductOps[Product Operations]
        ServiceOwners[Service Owners]
        GarageSuccess[Garage Success Managers]
        ReleaseCouncil[Release Council]
    end

    subgraph DomainWorkstreams[Domain Workstreams]
        GarageDomain[Garage Governance Backlog]
        IdentityDomain[Identity & Access Backlog]
        TemplateDomain[Template Evolution Backlog]
        InventoryDomain[Inventory Optimisation Backlog]
        ToolsDomain[Tools Utilisation Backlog]
        IntakeDomain[Intake Experience Backlog]
        ExecutionDomain[Workshop Execution Backlog]
    end

    ExperienceSignals --> UsageEvents
    UsageEvents --> EventLake
    EventLake --> MetricsWarehouse
    CustomerFeedback --> QualitativeRepo
    TechnicianDiaries --> QualitativeRepo
    SupportDesk --> QualitativeRepo

    MetricsWarehouse --> JourneyAnalytics
    MetricsWarehouse --> ReliabilityAnalytics
    QualitativeRepo --> JourneyAnalytics
    QualitativeRepo --> ReliabilityAnalytics
    JourneyAnalytics --> InsightCatalog
    ReliabilityAnalytics --> InsightCatalog

    InsightCatalog --> ExperimentService
    InsightCatalog --> ForecastModels
    ExperimentService --> ProductOps
    ForecastModels --> ServiceOwners

    ProductOps --> DomainWorkstreams
    ServiceOwners --> DomainWorkstreams
    GarageSuccess --> DomainWorkstreams
    ReleaseCouncil --> DomainWorkstreams

    DomainWorkstreams --> ReleaseCouncil
    ReleaseCouncil --> UsageEvents
    ExperimentService --> UsageEvents
```
