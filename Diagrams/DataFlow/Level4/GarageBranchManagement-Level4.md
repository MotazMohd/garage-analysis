```mermaid
flowchart TD
    subgraph Interfaces[Interfaces]
        UI1[Garage Onboarding Portal]
        UI2[SaaS Compliance Console]
        UI3[Support Escalation Desk]
    end

    subgraph GovernanceServices[Governance Services]
        GS1[Onboarding Intake API]
        GS2[Document Classifier]
        GS3[Compliance Review Workflow]
        GS4[Branch Configuration Engine]
        GS5[Staff Provisioning Service]
        GS6[Suspension Lifecycle Controller]
        GS7[Notification Hub]
    end

    subgraph DataStores[Data Stores]
        DS1[(Tenant Registry DB)]
        DS2[(Branch Profile Store)]
        DS3[(Document Vault)]
        DS4[(Staff Directory)]
        DS5[((Audit Ledger))]
        DS6[((Notification Queue))]
    end

    UI1 -->|submit application| GS1
    GS1 -->|persist draft| DS1
    GS1 -->|upload documents| DS3

    GS2 -->|classify & score| DS3
    GS2 -->|risk flags| GS3

    UI2 -->|review case| GS3
    GS3 -->|decision| GS1
    GS3 -->|update status| DS1
    GS3 -->|append audit| DS5

    GS1 -->|notify applicant| GS7

    GS4 -->|create branches| DS2
    GS4 -->|inherit settings| DS1
    GS4 -->|log changes| DS5
    GS4 -->|trigger staff sync| GS5

    GS5 -->|update assignments| DS4
    GS5 -->|branch visibility| DS2
    GS5 -->|audit provisioning| DS5

    UI2 -->|suspend/reactivate| GS6
    GS6 -->|status change| DS1
    GS6 -->|cascade to branches| DS2
    GS6 -->|record reason| DS5
    GS6 -->|alert owners| GS7

    GS7 -->|queue notification| DS6
    DS6 --> UI1
    DS6 --> UI2
    DS6 --> UI3

    UI3 -->|support update| GS3
    UI3 -->|branch adjustments| GS4
```
