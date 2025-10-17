```mermaid
flowchart TD
    subgraph ExternalChannels[External Channels]
        EC1[Customer Web Portal]
        EC2[Mobile Apps]
        EC3[Partner API Gateway]
    end

    subgraph IdentityFabric[Identity & Access Fabric]
        IF1[Identity Gateway]
        IF2[Credential Service]
        IF3[MFA Orchestrator]
        IF4[Role Policy Engine]
    end

    subgraph OperationsCore[Operations Core Services]
        OC1[Garage Onboarding API]
        OC2[Document Verification Service]
        OC3[Branch Configuration Engine]
        OC4[Scheduling Orchestrator]
        OC5[Check-in Intake Service]
        OC6[Job Execution Engine]
        OC7[Parts & Tools Service Mesh]
        OC8[Billing Processor]
        OC9[Notification Dispatcher]
        OC10[Analytics Stream Processor]
    end

    subgraph DataPlane[Data Plane]
        DP1[(Tenant Registry DB)]
        DP2[(Document Vault)]
        DP3[(Branch Config Store)]
        DP4[(Identity Directory)]
        DP5[(Role Policy Store)]
        DP6[(Availability Cache)]
        DP7[(Appointment Ledger)]
        DP8[(Job Card Warehouse)]
        DP9[(Inventory Ledger)]
        DP10[(Billing Ledger)]
        DP11[((Event Stream Bus))]
        DP12[((Notification Queue))]
        DP13[((Audit Ledger))]
    end

    EC1 -->|login| IF1
    EC2 -->|authenticate| IF1
    EC3 -->|token exchange| IF1

    IF1 -->|issue session| IF2
    IF2 -->|validate creds| DP4
    IF3 -->|challenge| EC1
    IF1 -->|enforce policies| IF4
    IF4 -->|read roles| DP5
    IF4 -->|grant scopes| OperationsCore

    OC1 -->|create tenant| DP1
    OC1 -->|upload docs| DP2
    OC2 -->|review| DP2
    OC2 -->|decision| OC1
    OC1 -->|lifecycle events| DP13

    OC3 -->|write| DP3
    OC3 -->|notify staff| OC9

    OC4 -->|publish slots| DP6
    OC4 -->|bookings| DP7
    EC1 -->|book service| OC4
    EC3 -->|partner bookings| OC4

    OC5 -->|intake data| DP7
    OC5 -->|photos & forms| DP2
    OC5 -->|create job card| OC6

    OC6 -->|persist job card| DP8
    OC6 -->|emit progress| DP11
    OC6 -->|reserve resources| OC7

    OC7 -->|parts reservation| DP9
    OC7 -->|tool availability| DP9
    OC7 -->|low stock events| DP11

    OC8 -->|invoice| DP10
    OC8 -->|charge confirmation| EC1
    OC8 -->|ledger audit| DP13

    OC9 -->|send notifications| DP12
    DP12 --> EC2

    OC10 -->|consume events| DP11
    OC10 -->|store metrics| DP13

    DP7 -->|trigger check-in| OC5
    DP8 -->|drive billing| OC8
    DP9 -->|share availability| OC4
    DP13 -->|security analytics| IF4
```
