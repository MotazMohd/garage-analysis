```mermaid
flowchart TD
    subgraph Interfaces[Interfaces]
        UI1[SaaS Template Console]
        UI2[Garage Customisation Console]
        UI3[Execution Engine Hooks]
    end

    subgraph TemplateServices[Template Services]
        TS1[Template Authoring API]
        TS2[Version Control Service]
        TS3[Validation & Rules Engine]
        TS4[Localisation Override Service]
        TS5[Resource Binding Service]
        TS6[Publishing Gateway]
        TS7[Change Audit Service]
        TS8[Notification Hub]
    end

    subgraph DataStores[Data Stores]
        DS1[(Template Repository)]
        DS2[(Version Metadata Store)]
        DS3[(Rule Catalogue)]
        DS4[(Localisation Overrides)]
        DS5[(Resource Mapping Store)]
        DS6[(Job Blueprint Library)]
        DS7[((Audit Ledger))]
        DS8[((Notification Queue))]
    end

    UI1 -->|create/modify template| TS1
    TS1 -->|persist draft| DS1
    TS1 -->|emit change| TS7

    TS2 -->|tag version| DS2
    TS2 -->|link assets| DS1

    TS3 -->|validate steps| DS3
    TS3 -->|raise warnings| UI1

    UI2 -->|apply overrides| TS4
    TS4 -->|store localisation| DS4
    TS4 -->|trigger revalidation| TS3

    TS5 -->|bind parts/tools| DS5
    TS5 -->|verify stock| UI3

    TS6 -->|publish blueprint| DS6
    TS6 -->|notify execution engine| UI3

    TS7 -->|write log| DS7
    TS7 -->|security copy| DS3

    TS8 -->|queue notification| DS8
    TS8 --> UI1
    TS8 --> UI2

    UI3 -->|feedback usage| TS6
    UI3 -->|reserve resources| TS5
```
