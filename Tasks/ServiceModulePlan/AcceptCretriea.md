## ✅ Epic-Level Acceptance Criteria Summary - Service Module

To consider the Service Module Epic complete, the following outcomes must be achieved across all sprints:

1. **Service Categorization & Lookup Types**
   - Services are grouped using DB-backed `ServiceCategory`, `ServiceType`, and `PricingType` tables.
   - Frontend forms use dynamic dropdowns for these lookups.

2. **Flexible Part Behavior**
   - Each part linked to a service supports:
     - `IsRequired`, `IsOptional`, `IsLocked`, `AllowCustomerProvided`
     - `IsBasedOnPreCheck`, `DefaultQuantity`, `IsQuantityAdjustable`
   - UI reflects part flags in admin and customer flows.
   - Booking UI allows customers to review and modify optional parts.

3. **Technician Skills & Tools**
   - Services can be linked to multiple `TechnicianSkillTags` and `GarageTools`.
   - Frontend allows selection during service creation.

4. **Pre-check Logic**
   - Services can require pre-checks (`RequiresPreCheck`)
   - Optionally link to a separate pre-check service (`PreCheckServiceId`)

5. **Recommended Parts**
   - Admins can define `RecommendedParts` per service.
   - Booking UI displays suggestions separately and allows toggling.

6. **Customer Visibility & Booking Behavior**
   - Services can be hidden (`IsCustomerVisible = false`)
   - Marked as add-ons, direct-bookable, or approval-required.
   - Services respect `DisplayOrder` in listing/sorting.

7. **API & Frontend Consistency**
   - All new fields are exposed via API and integrated in admin and customer UIs.
   - Filtering, sorting, and DTO mappings support new features.

8. **Dev Documentation & Maintainability**
   - Field purposes are documented clearly for all new models.
   - Developers understand when and how to use service flags properly.

