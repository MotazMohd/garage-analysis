# Spare Parts Module — Permissions
**Version:** v1.0.0  
**Last Updated:** 2025-09-10  
**Owner:** Security Team  

## Roles & Capabilities
| Role         | Capabilities |
|--------------|--------------|
| SaaS Admin   | Manage global parts, configure catalog providers, read all garages |
| Garage Owner | CRUD parts & inventory for their garage; approve catalog merges |
| Technician   | View parts/inventory; create/consume/cancel reservations |
| Accountant   | View pricing; export inventory |

## Scoping
- All endpoints must validate `GarageId` (derived from auth or payload).

## Catalog Access
- Gated by `Garage.HasTecDocSubscription` (see 08-catalog-tecdoc.md).

## Audit
- Capture `CreatedBy`, `UpdatedBy`, timestamps on key writes; show in Audit tab (Phase 2).
