```mermaid
flowchart TD
    subgraph SignalInputs[Tool Performance Signals]
        UtilisationMetrics[((Tool Utilisation Stream))]
        CalibrationIssues[Calibration Issue Reports]
        TechnicianFeedback[Technician Tool Feedback]
        SafetyIncidents[Tool Safety Incidents]
    end

    subgraph AnalyticsStores[Tool Analytics Stores]
        ToolLake[((Tool Event Lake))]
        AvailabilityMart[(Availability KPI Mart)]
        SafetyInsightRepo[(Tool Safety Insight Repo)]
    end

    subgraph AnalyticsEngines[Analytics & Optimisation]
        UtilisationAnalytics[Utilisation Analytics]
        MaintenancePredictor[Predictive Maintenance Model]
        SafetyAnalyzer[Safety Pattern Analyzer]
    end

    subgraph ImprovementTeams[Improvement Teams]
        ToolOps[Tool Operations]
        MaintenanceCrew[Maintenance Crew]
        SafetyCouncil[Safety Council]
    end

    subgraph Backlogs[Backlogs & Programs]
        SchedulingBacklog[Scheduling Optimisation Backlog]
        MaintenancePlanBacklog[Maintenance Plan Backlog]
        SafetyProgram[Safety Awareness Program]
    end

    UtilisationMetrics --> ToolLake
    CalibrationIssues --> ToolLake
    TechnicianFeedback --> ToolLake
    SafetyIncidents --> SafetyInsightRepo

    ToolLake --> UtilisationAnalytics
    ToolLake --> MaintenancePredictor
    SafetyInsightRepo --> SafetyAnalyzer

    UtilisationAnalytics --> AvailabilityMart
    MaintenancePredictor --> AvailabilityMart
    SafetyAnalyzer --> AvailabilityMart

    AvailabilityMart --> ToolOps
    AvailabilityMart --> MaintenanceCrew
    AvailabilityMart --> SafetyCouncil

    ToolOps --> SchedulingBacklog
    MaintenanceCrew --> MaintenancePlanBacklog
    SafetyCouncil --> SafetyProgram

    SchedulingBacklog --> UtilisationMetrics
    MaintenancePlanBacklog --> CalibrationIssues
    SafetyProgram --> SafetyIncidents
```
