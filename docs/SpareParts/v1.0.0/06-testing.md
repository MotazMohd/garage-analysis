# Spare Parts Module — Testing Scenarios
**Version:** v1.0.0  
**Last Updated:** 2025-09-10  
**Owner:** QA Team  

## Unit Tests
- Reservation math: OnHand/Available/Reserved.
- Serial uniqueness & state transitions (Available→Reserved→Sold).
- Lot expiry marking and consumption rules.
- Soft delete behavior in listing.

## API Tests
- Parts CRUD happy path + validation failures.
- Inventory upsert, edit, and retrieval.
- Serial/Lot add/remove and error behavior.
- Reservation create/consume/cancel + auto-expiry job.

## E2E Scenarios
1) Create Part → Add Inventory → Reserve → Consume → Verify stock math.
2) Serial Mode: Add serials → Reserve specific serials → Consume → Serial marked Sold.
3) Lot Mode: Add lot with expiry → Reserve → Auto-expire job → Availability restored.
4) Catalog Phase 3: Lookup → Preview → Materialize as draft → Merge into existing with diff approval.
