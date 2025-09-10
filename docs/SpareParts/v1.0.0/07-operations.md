# Spare Parts Module — Operations
**Version:** v1.0.0  
**Last Updated:** 2025-09-10  
**Owner:** Ops Team  

## Background Jobs
- **Reservation Auto-Expiry:** runs every 5 minutes (configurable). Marks `Active` reservations as `Expired` when `ExpiryAt < now`, recalculates `AvailableQuantity`.
- **Lot Expiry:** optional nightly job to mark `SerialLotEntries` with `ExpiryDate < now` as `Expired` and raise alerts.

## Configuration Flags
- `Reservation.DefaultExpiryMinutes` (default 120).
- `CatalogConfidenceThreshold` (default 0.75).
- `Garage.HasTecDocSubscription` (per-garage feature flag).
- `Alerts.LowStockThresholdMultiplier` (optional global multiplier).

## Alerts & Observability
- **Low stock:** OnHand < MinThreshold → notification/Toast.
- **Reservation nearing expiry:** warn at T-15m.
- **Lot expiry within N days:** configurable.
- Emit structured logs for all stock-affecting ops; include correlation IDs per request.
