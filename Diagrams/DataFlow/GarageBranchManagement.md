# Garage & Branch Management – Data Flow

```mermaid
flowchart TD
    GA[Garage Admin Portal] -->|Submit garage details| API[Garage Management Service]
    API -->|Store pending garage| Garages[(Garages Store)]
    API -->|Log creation event| Audit[(Audit Log)]
    SaaS[SaaS Admin Console] -->|Review pending garages| API
    API -->|Approve / reject| Garages
    API -->|Notify status change| Notify[Notification Service]
    Notify --> GA
    GA -->|Upload documents| API
    API -->|Persist attachments| Storage[(Document Store)]
    GA -->|Create branch| API
    API -->|Apply inheritance rules| Inherit{Apply Garage Defaults}
    Inherit --> Branches[(Branches Store)]
    Inherit --> Audit
    GA -->|Override branch settings| API
    API --> Branches
    API --> Audit
    GA -->|Manage staff visibility| API
    API -->|Update branch access| Staff[(User Accounts)]
    Staff --> Audit
    API -->|Archive / suspend| Garages
    API -->|Record lifecycle actions| Audit
```

The diagram highlights how garage owners submit data, how SaaS administrators approve and activate garages, and how branch inheritance and audit trails are coordinated through the service layer.
