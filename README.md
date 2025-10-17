# Recommended Module Flow (Based on Use Case)

## ✅ Completed Modules

### 🔹 1. Garage & Branch Management
- Already completed

### 🔹 2. User, Role, and Permission Management
- Already completed

### 🔹 3. Technician, Assistant, and Customer Profiles
- Already completed

### 🔹 4. SaaS Subscription & Feature Flags
- Already completed

### 🔹 5. Service Template & Step Configuration
- Already completed

### 🔹 6. Spare Parts & Inventory
- In progress (currently active)

---

## 📈 System Data Flow

- [Overall SaaS module data flow](Diagrams/DataFlow/SystemOverview.md) — summarizes how garage onboarding, user governance, templates, inventory, appointments, and job execution exchange data across the platform.
- [Level 1 system decomposition](Diagrams/DataFlow/Level1/SystemOverview-Level1.md) — clusters customer journeys, operational services, and shared data stores to surface state transitions end-to-end.
- [Level 2 customer journey decomposition](Diagrams/DataFlow/Level2/SystemOverview-Level2.md) — follows the booking-to-billing lifecycle and shows how operational services and shared stores collaborate for a single customer.
- [Level 3 orchestration services view](Diagrams/DataFlow/Level3/SystemOverview-Level3.md) — breaks the platform into onboarding, identity, scheduling, job orchestration, inventory, and billing services interacting through shared stores and notification queues.
- [Level 4 integration workflow](Diagrams/DataFlow/Level4/SystemOverview-Level4.md) — exposes the underlying service mesh, data plane, and streaming analytics that coordinate authentication, operations, and lifecycle automation.
- [Data flow diagram index](Diagrams/DataFlow/README.md) — catalogues every module-level diagram and provides editing guidelines to keep the visuals consistent.

---

## 🔜 Next Modules in Order

### 🔹 7. Tool Management
- Shared and per-garage tools
- Tool linking to service steps
- 📄 See `Tasks/ToolManagementModulePlan/` for three-sprint roadmap and deliverables

### 🔹 8. Job Cards & Task Assignment
- Job creation from services  
- Technician/assistant assignment  
- Real-time step tracking & validation

### 🔹 9. Appointments & Scheduling
- Customer booking interface  
- Slot availability, technician load

### 🔹 10. Customer Management
- Profiles, history, preferences  
- Vehicles, invoices, communication

### 🔹 11. Purchase Orders & Supplier Integration
- Restocking spare parts/tools  
- Multi-vendor, approval flow

### 🔹 12. Invoice & Billing
- Invoice generation from jobs  
- Integration with tax, parts, labor

### 🔹 13. Reports & Dashboards
- Revenue  
- Usage  
- Technician performance  
- Stock turnover

### 🔹 14. Mobile Apps Integration
- Technician app  
- Customer app  
- Push notifications  
- Job flow
