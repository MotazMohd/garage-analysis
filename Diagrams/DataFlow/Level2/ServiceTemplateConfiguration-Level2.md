# Service Template & Step Configuration – Level 2 (Template Localisation)

```mermaid
flowchart TD
    SaaSDesigner([SaaS Template Designer])
    GaragePlanner([Garage Service Planner])
    JobSystem[Job Execution Engine]
    TemplateStudio[Template Authoring Studio]
    Localiser[Localisation Workspace]
    ResourceBinder[Resource Binding Service]
    VersionSvc[Version Control]
    Catalog[(Global Template Catalog)]
    GarageCatalog[(Garage Template Library)]
    PartsCatalog[(Spare Parts Catalog)]
    ToolsCatalog[(Tools Catalog)]
    JobConfig[(Job Step Definitions)]
    Audit[(Audit Ledger)]

    SaaSDesigner -->|Author template| TemplateStudio
    TemplateStudio -->|Persist draft| Catalog
    TemplateStudio -->|Version entry| VersionSvc
    TemplateStudio -->|Audit trail| Audit

    GaragePlanner -->|Clone template| Localiser
    Localiser -->|Fetch base template| Catalog
    Localiser -->|Create garage version| GarageCatalog
    Localiser -->|Override steps| JobConfig
    Localiser -->|Log override| Audit

    ResourceBinder -->|Link parts| PartsCatalog
    ResourceBinder -->|Link tools| ToolsCatalog
    ResourceBinder -->|Write requirements| JobConfig
    ResourceBinder -->|Record binding| Audit

    GaragePlanner -->|Publish template| GarageCatalog
    GarageCatalog -->|Expose to jobs| JobSystem
    JobSystem -->|Read steps| JobConfig
    JobSystem -->|Enforce resources| PartsCatalog
    JobSystem -->|Enforce tools| ToolsCatalog
```

This Level 2 view clarifies how global templates are authored, localised for individual garages, and bound to the parts, tools, and step definitions consumed by the job execution engine.
