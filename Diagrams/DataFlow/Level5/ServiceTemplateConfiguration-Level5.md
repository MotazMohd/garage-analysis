```mermaid
flowchart TD
    subgraph Entry[Authoring Channels]
        SaaSAdminPortal[SaaS Admin Portal]
        GaragePortal[Garage Template Portal]
        APIClient[Automation API Client]
        APIGateway[API Gateway]
    end

    subgraph TemplateServices[Template Services]
        TemplateAuthor[Template Authoring Service]
        VersionControl[Version Control Service]
        ValidationEngine[Validation & Rules Engine]
        LocalizationSvc[Localization Override Service]
        ResourceBinder[Resource Binding Service]
        PublishingGateway[Publishing Gateway]
        TemplateNotifier[Template Notification Service]
    end

    subgraph ExecutionInterfaces[Execution Interfaces]
        JobEngine[Job Execution Engine]
        RecommendationSvc[Upsell Recommendation Service]
    end

    subgraph DataStores[Data Stores]
        TemplateRepo[(Template Repository)]
        VersionStore[(Version Metadata Store)]
        ValidationCache[(Validation Result Cache)]
        LocalizationStore[(Localization Overrides)]
        ResourceMap[(Resource Mapping Ledger)]
        TemplateLedger[((Template Audit Ledger))]
        NotificationQueue[((Notification Queue))]
    end

    subgraph Integrations[External Integrations]
        PartsCatalog[External Parts Catalog]
        ToolDirectory[External Tool Directory]
        EmailSvc[Email Service]
        SmsSvc[SMS Service]
        WebhookTargets[Webhook Targets]
    end

    subgraph Observability[Observability]
        TraceCollector[Trace Collector]
        Metrics[Template Metrics]
        LogPipeline[Log Pipeline]
    end

    APIGateway --> TemplateAuthor
    APIGateway --> VersionControl
    APIGateway --> ValidationEngine
    APIGateway --> LocalizationSvc
    APIGateway --> ResourceBinder
    APIGateway --> PublishingGateway

    TemplateAuthor --> TemplateRepo
    TemplateAuthor --> VersionControl
    TemplateAuthor --> TemplateLedger

    VersionControl --> VersionStore
    VersionControl --> TemplateLedger

    ValidationEngine --> ValidationCache
    ValidationEngine --> TemplateLedger
    ValidationEngine --> RecommendationSvc
    ValidationEngine --> PartsCatalog
    ValidationEngine --> ToolDirectory

    LocalizationSvc --> LocalizationStore
    LocalizationSvc --> TemplateLedger

    ResourceBinder --> ResourceMap
    ResourceBinder --> TemplateLedger
    ResourceBinder --> PartsCatalog
    ResourceBinder --> ToolDirectory

    PublishingGateway --> TemplateRepo
    PublishingGateway --> TemplateLedger
    PublishingGateway --> JobEngine
    PublishingGateway --> NotificationQueue

    TemplateNotifier --> NotificationQueue
    NotificationQueue --> EmailSvc
    NotificationQueue --> SmsSvc
    NotificationQueue --> WebhookTargets

    TemplateServices -. traces .-> TraceCollector
    TemplateServices -. logs .-> LogPipeline
    TemplateRepo --> Metrics
    JobEngine --> Metrics
    Metrics --> TraceCollector
```
