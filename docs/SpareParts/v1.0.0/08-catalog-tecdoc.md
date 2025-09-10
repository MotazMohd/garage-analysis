# Spare Parts Module — Catalog (TecDoc) Deep Design
**Version:** v1.0.0  
**Last Updated:** 2025-09-10  
**Owner:** Integration Team  

This document specifies lookup, normalization, provenance, diff/merge, sync, cross-references, and fitment mapping. It aligns with our prior discussion to avoid losing any detail.

## Goals
- Speed part creation via OEM/SKU lookup.
- Clean mapping to internal model with dedupe.
- Provenance & audit for field-level origins.
- Safe "review & merge" instead of blind overwrite.

## Data Model Additions (see 01-domain-model.md)
- On `SparePart`: `IsApiFetched`, `ExternalCatalog*` fields, `ExternalCatalogFieldsMask`.
- `ExternalCatalogMapping`: `Source`, `SourcePartId`, `VersionHash`, `SyncStatus`.
- `ExternalFitment`: external vehicle key → our model mapping (`Confidence`, `IsVerified`).
- `ExternalCrossRef`: OEM/aftermarket references to power search & dedupe.

## Normalization Pipeline
1) Pull raw TecDoc payload.
2) Normalize → `{ name, brand, category, attributes, images, crossRefs, fitment }`.
3) Dedupe: match by `(brand + OEM/SKU)` or cross-ref overlaps.
4) Confidence scoring (OEM/brand fitment ↑, missing brand ↓).

## Merge Policy (defaults)
- **Never overwrite:** `SellingPrice`, internal `SKU`, `Tags`.
- **Confirm overwrite:** `Name`, `Brand`, `Category`, `Attributes`.
- **Append:** `Media`, `Documents`.
- **Union:** `CrossRefs` (dedupe by code).
- **Fitment:** imported as `IsVerified=false` unless user approves.

## APIs (see 02-api-contracts.md)
- `POST /catalog/lookup` → candidates by OEM/SKU/brand/vehicle.
- `GET /catalog/articles/{source}/{articleId}` → normalized preview.
- `POST /catalog/materialize` → `CreateNew` or `MergeIntoExisting` (returns diff when merging).
- `POST /catalog/merge/confirm` → apply diff with overwrite rules.
- `POST /parts/{id}/catalog/sync` → fetch latest; mark `Outdated` or show diff.
- `GET /parts/{id}/catalog/audit` → provenance history incl. `VersionHash`.

## UI Flows (see 03-ux-flows.md)
- **Part Creation with Catalog Assist:** lookup → preview → create draft (prefilled).
- **Merge into Existing:** fetch → diff view (left: local, right: catalog) → per-field overwrite toggles.
- **Fitment Mapping:** suggest internal model mapping; toggle `Verified` after manual check.
- **Provenance Ribbon:** "From TecDoc · Confidence · Last sync · Fields".

## Error Handling & Limits
- Rate limits → exponential backoff.
- Subscription gate (`HasTecDocSubscription`).
- Timeouts return partial candidates (lazy-load details).
