# Deferred Items

## Game Logic Methods (depend on global game state)

- **PoliceRecord.GetPoliceRecordFromScore** — ported as a standalone function taking the records array as a parameter, but callers will need to supply `Consts.PoliceRecords` and the commander's score
- **Reputation.GetReputationFromScore** — same pattern as above
- **PoliticalSystem.ShipTypeLikely** — accesses `Game.CurrentGame.Difficulty` and `Consts.ShipSpecs`; should be ported as a standalone function alongside encounter/combat logic
- **SpecialEvent.Location** — searches `Game.CurrentGame.Universe` for a system matching the event type; belongs in game logic, not the data model
- **TradeItem.StandardPrice(StarSystem)** — pricing logic depending on `StarSystem` properties (techLevel, politicalSystem, size, specialResource); port alongside trade system
- **Equipment.Price** (computed buy price) — accesses `Game.CurrentGame.Commander` for tech level check and trader skill discount; port alongside shop/trade UI
- **Equipment.Image / BaseImageIndex** — WinForms UI image loading; replace with web asset system
- **ShipSpec.SetValues(ShipType)** — copies fields from `Consts.ShipSpecs[type]`; port alongside Consts registry
- **ShipSpec.Image / ImageDamaged / ImageWithShields / ImageDamagedWithShields / ImageIndex** — WinForms image system; replace with web assets
- **ShipSpec custom ship deserialization** — modifies global `Consts.ShipSpecs` and `Strings.ShipNames`; needs redesign for immutable state
- **ShipSpec.UpdateCustomImageOffsetConstants** — pixel scanning for custom ship images; WinForms-specific

## String Lookups from Strings.cs (not yet ported)

- Remaining string arrays in `Strings.cs` beyond what's been ported (e.g. `EncounterText`, `NewsMastheads`, `SystemNames`, etc.)

## Data Models Not Yet Ported

- HighScoreRecord.cs — ported
- GameOptions.cs — ported
- SpecialEvent.cs — ported
- PoliticalSystem.cs — ported
- TradeItem.cs — ported
- Equipment.cs / Weapon.cs / Shield.cs / Gadget.cs — ported (discriminated union)
- ShipSpec.cs — ported
- CrewMember.cs / Commander.cs
- Ship.cs
- StarSystem.cs
- Shipyard.cs
- Consts.cs (data registry — depends on most other models)
- Game.cs (central game state)
