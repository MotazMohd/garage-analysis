```mermaid
flowchart TD
    subgraph SignalInputs[Garage Governance Signals]
        OnboardingCSAT[Onboarding CSAT Surveys]
        ComplianceFindings[Compliance Review Findings]
        BranchAuditNotes[Branch Audit Notes]
        UsageMetrics[((Configuration Usage Events))]
    end

    subgraph DataStores[Governance Analytics Stores]
        GovernanceLake[((Governance Event Lake))]
        PolicyKPI[(Policy Adherence KPI Mart)]
        AuditInsights[(Audit Insight Repository)]
    end

    subgraph AnalyticsLoops[Analytics & Improvement]
        IntakeAnalytics[Onboarding Funnel Analytics]
        PolicyDrift[Policy Drift Detector]
        TrainingNeeds[Training Needs Classifier]
    end

    subgraph ActionSquads[Action Squads]
        GovernanceOps[Governance Operations Team]
        ComplianceCoach[Compliance Coaching Desk]
        EnablementHub[Garage Enablement Hub]
    end

    subgraph Backlog[Backlog & Automation]
        WorkflowUpdates[Workflow Automation Backlog]
        PolicyUpdates[Policy Update Backlog]
        TrainingCatalogue[Training Catalogue Updates]
    end

    OnboardingCSAT --> GovernanceLake
    ComplianceFindings --> AuditInsights
    BranchAuditNotes --> AuditInsights
    UsageMetrics --> GovernanceLake

    GovernanceLake --> IntakeAnalytics
    GovernanceLake --> PolicyDrift
    AuditInsights --> PolicyDrift
    AuditInsights --> TrainingNeeds

    IntakeAnalytics --> PolicyKPI
    PolicyDrift --> PolicyKPI
    TrainingNeeds --> PolicyKPI

    PolicyKPI --> GovernanceOps
    PolicyKPI --> ComplianceCoach
    PolicyKPI --> EnablementHub

    GovernanceOps --> WorkflowUpdates
    ComplianceCoach --> TrainingCatalogue
    EnablementHub --> TrainingCatalogue

    WorkflowUpdates --> UsageMetrics
    PolicyUpdates --> UsageMetrics
    TrainingCatalogue --> OnboardingCSAT

    GovernanceOps --> PolicyUpdates
    PolicyUpdates --> PolicyKPI
```
