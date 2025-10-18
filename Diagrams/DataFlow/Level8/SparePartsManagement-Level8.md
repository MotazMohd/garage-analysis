```mermaid
flowchart TD
    subgraph SignalInputs[Parts Performance Signals]
        Stockouts[Stock-out Alerts]
        SupplierFeedback[Supplier Quality Feedback]
        ConsumptionTelemetry[((Consumption Telemetry Stream))]
        ReturnReasons[Return & Warranty Reasons]
    end

    subgraph AnalyticsStores[Inventory Analytics Stores]
        InventoryLake[((Inventory Event Lake))]
        SupplierScorecard[(Supplier Scorecard Mart)]
        CostInsightRepo[(Cost & Margin Insight Repo)]
    end

    subgraph AnalyticsEngines[Analytics & Optimisation]
        DemandForecast[Demand Forecast Engine]
        SupplierAnalytics[Supplier Reliability Analytics]
        MarginAnalyzer[Margin Optimisation Model]
    end

    subgraph ImprovementTeams[Improvement Teams]
        InventoryOps[Inventory Operations]
        ProcurementTeam[Procurement & Sourcing]
        FinancePartner[Finance Partner]
    end

    subgraph Backlogs[Backlogs & Programs]
        StockPolicyBacklog[Stock Policy Backlog]
        SupplierProgram[Supplier Improvement Program]
        PricingBacklog[Pricing & Margin Backlog]
    end

    Stockouts --> InventoryLake
    ConsumptionTelemetry --> InventoryLake
    SupplierFeedback --> SupplierScorecard
    ReturnReasons --> SupplierScorecard

    InventoryLake --> DemandForecast
    InventoryLake --> MarginAnalyzer
    SupplierScorecard --> SupplierAnalytics
    SupplierScorecard --> MarginAnalyzer

    DemandForecast --> CostInsightRepo
    SupplierAnalytics --> CostInsightRepo
    MarginAnalyzer --> CostInsightRepo

    CostInsightRepo --> InventoryOps
    CostInsightRepo --> ProcurementTeam
    CostInsightRepo --> FinancePartner

    InventoryOps --> StockPolicyBacklog
    ProcurementTeam --> SupplierProgram
    FinancePartner --> PricingBacklog

    StockPolicyBacklog --> ConsumptionTelemetry
    SupplierProgram --> SupplierFeedback
    PricingBacklog --> ReturnReasons
```
