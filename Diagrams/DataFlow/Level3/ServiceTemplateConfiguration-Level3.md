```mermaid
flowchart TD
    subgraph Authoring
        A1[SaaS Template Studio]
        A2[Version Control Service]
        A3[Garage Customisation UI]
    end

    subgraph Execution
        B1[Template Publishing API]
        B2[Rule Validation Engine]
        B3[Resource Binding Service]
        B4[Job Step Resolver]
    end

    subgraph Data
        DS1[(Template Library)]
        DS2[(Template Versions)]
        DS3[(Garage Overrides)]
        DS4[((Resource Catalogues))]
        DS5[(Executable Steps)]
        DS6[((Audit Ledger))]
    end

    A1 -->|define workflow| DS1
    A1 -->|commit draft| A2
    A2 -->|tag release| DS2

    A3 -->|clone template| DS3
    A3 -->|override rules| DS3
    A3 -->|bind garage data| B3

    B2 -->|validate rules| A3
    B2 -->|write findings| DS6

    B3 -->|lookup parts/tools| DS4
    B3 -->|store bindings| DS5
    B3 -->|report usage| DS6

    B1 -->|publish version| DS2
    B1 -->|sync to job engine| B4
    B4 -->|produce steps| DS5
    B4 -->|emit audit| DS6

    DS5 -->|instantiate job card| JobEngine[Job Card Orchestrator]
    JobEngine -->|request updates| DS5
```
