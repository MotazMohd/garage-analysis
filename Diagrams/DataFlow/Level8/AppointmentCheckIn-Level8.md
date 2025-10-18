```mermaid
flowchart TD
    subgraph SignalInputs[Intake Experience Signals]
        ArrivalFeedback[Arrival Experience Feedback]
        EvidenceQuality[Photo & Evidence Quality Scores]
        UpsellConversion[((Upsell Conversion Stream))]
        QueueMetrics[Queue & Wait Time Metrics]
    end

    subgraph AnalyticsStores[Intake Analytics Stores]
        IntakeLake[((Intake Event Lake))]
        ExperienceMart[(Experience KPI Mart)]
        CoachingRepo[(Coaching Insight Repository)]
    end

    subgraph AnalyticsEngines[Analytics & Optimisation]
        WaitTimeAnalytics[Queue & Wait Time Analytics]
        EvidenceAnalytics[Evidence Completeness Analytics]
        OfferOptimizer[Upsell Offer Optimiser]
    end

    subgraph ImprovementTeams[Improvement Teams]
        IntakeOps[Intake Operations]
        TrainingLead[Training Lead]
        RevenuePrograms[Revenue Programs]
    end

    subgraph Backlogs[Backlogs & Playbooks]
        FlowBacklog[Intake Flow Backlog]
        CoachingPlaybook[Coaching Playbook]
        OfferPlaybook[Offer Experiment Backlog]
    end

    ArrivalFeedback --> IntakeLake
    EvidenceQuality --> IntakeLake
    UpsellConversion --> IntakeLake
    QueueMetrics --> IntakeLake

    IntakeLake --> WaitTimeAnalytics
    IntakeLake --> EvidenceAnalytics
    IntakeLake --> OfferOptimizer

    WaitTimeAnalytics --> ExperienceMart
    EvidenceAnalytics --> ExperienceMart
    OfferOptimizer --> ExperienceMart

    ExperienceMart --> IntakeOps
    ExperienceMart --> TrainingLead
    ExperienceMart --> RevenuePrograms

    IntakeOps --> FlowBacklog
    TrainingLead --> CoachingPlaybook
    RevenuePrograms --> OfferPlaybook

    FlowBacklog --> QueueMetrics
    CoachingPlaybook --> EvidenceQuality
    OfferPlaybook --> UpsellConversion
```
