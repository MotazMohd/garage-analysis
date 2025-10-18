```mermaid
flowchart TD
    subgraph SignalInputs[Identity Experience Signals]
        LoginFeedback[Login UX Feedback]
        MFAFrictions[Reported MFA Friction]
        SecurityTickets[Security Support Tickets]
        AuthEvents(((Authentication Telemetry Stream)))
    end

    subgraph IdentityAnalytics[Identity Analytics Stores]
        IdentityLake[((Identity Event Lake))]
        AccessKPI[(Access Health KPIs)]
        SecurityInsightRepo[(Security Insight Repository)]
    end

    subgraph AnalyticsEngines[Analytics & Modelling]
        FlowAnalytics[Authentication Flow Analytics]
        RiskScoring[Adaptive Risk Scoring Model]
        SupportMining[Support Text Mining]
    end

    subgraph ImprovementTeams[Improvement Teams]
        IdentityOps[Identity Operations]
        SecurityEngineering[Security Engineering]
        UXResearch[Identity UX Research]
    end

    subgraph Backlogs[Backlogs & Playbooks]
        AccessBacklog[Access Experience Backlog]
        PolicyBacklog[Policy & Control Backlog]
        EducationBacklog[User Education Backlog]
    end

    LoginFeedback --> IdentityLake
    MFAFrictions --> IdentityLake
    SecurityTickets --> SecurityInsightRepo
    AuthEvents --> IdentityLake

    IdentityLake --> FlowAnalytics
    IdentityLake --> RiskScoring
    SecurityInsightRepo --> RiskScoring
    SecurityInsightRepo --> SupportMining

    FlowAnalytics --> AccessKPI
    RiskScoring --> AccessKPI
    SupportMining --> AccessKPI

    AccessKPI --> IdentityOps
    AccessKPI --> SecurityEngineering
    AccessKPI --> UXResearch

    IdentityOps --> AccessBacklog
    SecurityEngineering --> PolicyBacklog
    UXResearch --> EducationBacklog

    AccessBacklog --> AuthEvents
    PolicyBacklog --> AuthEvents
    EducationBacklog --> LoginFeedback
```
