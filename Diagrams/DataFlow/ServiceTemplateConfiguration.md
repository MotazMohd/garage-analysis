# Service Template & Step Configuration – Data Flow

```mermaid
flowchart TD
    SA[SaaS Admin Console] -->|Create / update master template| STS[Service Template Service]
    STS -->|Persist template metadata| Templates[(ServiceTemplate Store)]
    STS -->|Persist step definitions| Steps[(ServiceStepTemplate Store)]
    STS -->|Attach default parts| Parts[(Spare Parts Catalog)]
    STS -->|Attach default tools| Tools[(Tools Catalog)]
    GA[Garage Admin Portal] -->|Clone template| STS
    STS -->|Create garage variant| GarageTpl[(Garage Template Overrides)]
    GA -->|Customize steps & validations| STS
    STS -->|Save overrides| GarageTpl
    STS -->|Log configuration change| Audit[(Audit Log)]
    JobGen[Job Card Generator] -->|Request template on job creation| STS
    STS -->|Return resolved steps + requirements| JobGen
    JobGen -->|Spawn job steps| Execution[Job Execution Service]
    Execution -->|Reserve parts/tools| Inventory[(Inventory & Tool Availability)]
    Execution -->|Track status updates| Audit
```

The diagram shows how SaaS administrators manage global templates, how garages clone and customize them, and how the resolved configuration feeds job card generation and execution.
