```mermaid
flowchart TD
    subgraph Interfaces[Interfaces]
        UI1[Admin Console]
        UI2[Self-Service Registration]
        UI3[Security Operations Desk]
    end

    subgraph IdentityServices[Identity Services]
        IS1[Invitation Service]
        IS2[Registration API]
        IS3[Credential Broker]
        IS4[MFA Enrollment Engine]
        IS5[Role Policy Service]
        IS6[Session Management Service]
        IS7[Impersonation Monitor]
        IS8[Security Analytics Processor]
        IS9[Notification Hub]
    end

    subgraph DataStores[Data Stores]
        DS1[(Identity Directory)]
        DS2[(Credential Vault)]
        DS3[(MFA Secret Store)]
        DS4[(Role Policy Store)]
        DS5[(Session Ledger)]
        DS6[((Security Audit Ledger))]
        DS7[((Notification Queue))]
    end

    UI1 -->|send invite| IS1
    IS1 -->|token| DS6
    IS1 -->|email/SMS| IS9

    UI2 -->|redeem invite| IS2
    IS2 -->|create identity| DS1
    IS2 -->|set password| IS3

    IS3 -->|hash credential| DS2
    IS3 -->|audit event| DS6

    IS4 -->|register factor| DS3
    IS4 -->|challenge user| UI2

    UI1 -->|assign roles| IS5
    IS5 -->|update policies| DS4
    IS5 -->|log decision| DS6

    UI1 -->|impersonate| IS7
    IS7 -->|validate policy| DS4
    IS7 -->|temporary session| IS6
    IS7 -->|raise alert| IS9

    IS6 -->|issue session| DS5
    IS6 -->|terminate session| DS5
    IS6 -->|append audit| DS6

    UI3 -->|review anomaly| IS8
    IS8 -->|ingest logs| DS6
    IS8 -->|push incident| IS9

    IS9 -->|queue notification| DS7
    DS7 --> UI1
    DS7 --> UI2
    DS7 --> UI3
```
