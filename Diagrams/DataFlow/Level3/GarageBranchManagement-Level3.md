```mermaid
flowchart TD
    subgraph Intake
        A1[Garage Owner Portal]
        A2[Document Upload Service]
        A3[Branch Configurator]
    end

    subgraph AdminOps[SaaS Administration]
        B1[Compliance Review Desk]
        B2[Risk & Fraud Checks]
        B3[Lifecycle Controller]
        B4[Audit Event Writer]
    end

    subgraph DataStores
        DS1[(Garage Applications)]
        DS2[((Document Vault))]
        DS3[(Approved Garages)]
        DS4[(Branches)]
        DS5[(Staff Directory)]
        DS6[((Audit Ledger))]
        DS7[((Notification Queue))]
    end

    A1 -->|submit application| DS1
    A2 -->|store artifacts| DS2
    DS1 -->|notify review| B1
    B1 -->|request extra docs| A1
    B2 -->|risk scoring| B1
    B1 -->|decision| B3
    B3 -->|write status| DS3
    B3 -->|emit events| B4
    B4 -->|update audit| DS6
    B3 -->|trigger messaging| DS7

    A3 -->|define branches| DS4
    DS4 -->|inherit defaults| DS3
    A3 -->|override settings| DS4
    A3 -->|assign staff| DS5

    StaffProvisioning[Staff Provisioning API] -->|branch access| DS5
    StaffProvisioning -->|log change| DS6

    DS3 -->|expose to portal| A1
    DS4 -->|sync to scheduling| SchedulingService[Scheduling Service]
    SchedulingService -->|branch capacity| DS4
    DS7 -->|owner notification| A1
```
