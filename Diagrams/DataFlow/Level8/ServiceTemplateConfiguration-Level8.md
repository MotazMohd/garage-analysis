```mermaid
flowchart TD
    subgraph SignalInputs[Template Performance Signals]
        JobOutcomes[Job Outcome Feedback]
        TechnicianComments[Technician Step Comments]
        TemplateUsage[((Template Usage Events))]
        SafetyReports[Safety & Hazard Reports]
    end

    subgraph AnalyticsStores[Template Analytics Stores]
        TemplateLake[((Template Event Lake))]
        OutcomeMart[(Outcome Effectiveness Mart)]
        SafetyInsightRepo[(Safety Insight Repository)]
    end

    subgraph AnalyticsEngines[Analytics & Optimisation]
        StepTimingAnalytics[Step Timing Analytics]
        ResourceOptimizer[Resource Optimisation Model]
        SafetyClassifier[Safety Incident Classifier]
    end

    subgraph ImprovementTeams[Improvement Teams]
        TemplateOps[Template Operations]
        ProcessEngineers[Process Engineers]
        SafetyBoard[Safety Review Board]
    end

    subgraph Backlogs[Backlogs & Releases]
        TemplateBacklog[Template Enhancement Backlog]
        ResourcePlaybook[Resource Allocation Playbook]
        SafetyActions[Safety Action Register]
    end

    JobOutcomes --> TemplateLake
    TechnicianComments --> TemplateLake
    TemplateUsage --> TemplateLake
    SafetyReports --> SafetyInsightRepo

    TemplateLake --> StepTimingAnalytics
    TemplateLake --> ResourceOptimizer
    SafetyInsightRepo --> SafetyClassifier

    StepTimingAnalytics --> OutcomeMart
    ResourceOptimizer --> OutcomeMart
    SafetyClassifier --> OutcomeMart

    OutcomeMart --> TemplateOps
    OutcomeMart --> ProcessEngineers
    OutcomeMart --> SafetyBoard

    TemplateOps --> TemplateBacklog
    ProcessEngineers --> ResourcePlaybook
    SafetyBoard --> SafetyActions

    TemplateBacklog --> TemplateUsage
    ResourcePlaybook --> TemplateUsage
    SafetyActions --> SafetyReports
```
