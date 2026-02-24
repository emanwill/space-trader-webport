# Deferred Items

## Game Logic Methods (depend on global game state)

- **PoliceRecord.GetPoliceRecordFromScore** — ported as a standalone function taking the records array as a parameter, but callers will need to supply `Consts.PoliceRecords` and the commander's score
- **Reputation.GetReputationFromScore** — same pattern as above
- **PoliticalSystem.ShipTypeLikely** — accesses `Game.CurrentGame.Difficulty` and `Consts.ShipSpecs`; should be ported as a standalone function alongside encounter/combat logic
- **SpecialEvent.Location** — searches `Game.CurrentGame.Universe` for a system matching the event type; belongs in game logic, not the data model
- **TradeItem.StandardPrice(StarSystem)** — pricing logic depending on `StarSystem` properties (techLevel, politicalSystem, size, specialResource); port alongside trade system
- **Equipment.Price** (computed buy price) — accesses `Game.CurrentGame.Commander` for tech level check and trader skill discount; port alongside shop/trade UI
- **Equipment.Image / BaseImageIndex** — WinForms UI image loading; replace with web asset system
- **ShipSpec.SetValues(ShipType)** — copies fields from `shipSpecs[type]`; now possible since consts.ts exists, port alongside ship creation logic
- **ShipSpec.Image / ImageDamaged / ImageWithShields / ImageDamagedWithShields / ImageIndex** — WinForms image system; replace with web assets
- **ShipSpec custom ship deserialization** — modifies global `Consts.ShipSpecs` and `Strings.ShipNames`; needs redesign for immutable state
- **ShipSpec.UpdateCustomImageOffsetConstants** — pixel scanning for custom ship images; WinForms-specific
- **CrewMember.ChangeRandomSkill / IncreaseRandomSkill / TonicTweakRandomSkill** — mutate skills and access `Game.CurrentGame` for recalculating buy prices; port as game logic functions
- **CrewMember.NthLowestSkill** — pure algorithm, but only used by game logic; port alongside skill system
- **CrewMember.CurrentSystem** (getter) — resolves `StarSystemId` to `StarSystem` via `Game.CurrentGame.Universe`; becomes a lookup function
- **Commander.PayInterest** — game logic mutating cash/debt; port alongside financial system
- **Commander.TradeShip** — complex ship purchase logic with UI alerts; port alongside shipyard UI
- **Commander.CashToSpend** — accesses `Game.CurrentGame.Options.ReserveMoney` and `Game.CurrentGame.CurrentCosts`
- **Commander.Worth** — accesses `Game.CurrentGame.QuestStatusMoon`; port as a computed function
- **Ship** — ~30 methods and computed properties (AddEquipment, RemoveEquipment, Fire, Hire, Bounty, BaseWorth, Worth, WeaponStrength, all opponent generation methods, all cargo/equipment query properties like FreeCargoBays, ArtifactOnBoard, etc.); port as standalone functions alongside game logic
- **StarSystem.InitializeTradeItems** — accesses `Game.CurrentGame.Difficulty` and `Consts.TradeItems`; port alongside universe generation
- **StarSystem.ItemTraded / ItemUsed** — depend on `Consts.PoliticalSystems` lookup; port as standalone functions
- **StarSystem.ShowSpecialButton** — large switch accessing game state; port alongside event UI
- **StarSystem.DestOk / Distance / MercenariesForHire** — access `Game.CurrentGame.Commander`; port as computed functions
- **Shipyard** — all computed properties (AdjustedPrice, PenaltyCost, UnitsUsed, TotalCost, TradeIn, etc.) operate on `Consts.ShipSpecs[Custom]` and `Game.CurrentGame.Commander`; port alongside custom ship builder UI

## String Lookups from Strings.cs (not yet ported)

- Remaining string arrays in `Strings.cs` beyond what's been ported (e.g. `EncounterText`, `NewsMastheads`, etc.)

## Data Models Not Yet Ported

- HighScoreRecord.cs — ported
- GameOptions.cs — ported
- SpecialEvent.cs — ported
- PoliticalSystem.cs — ported
- TradeItem.cs — ported
- Equipment.cs / Weapon.cs / Shield.cs / Gadget.cs — ported (discriminated union)
- ShipSpec.cs — ported
- CrewMember.cs / Commander.cs — ported
- Ship.cs — ported
- StarSystem.cs — ported
- Shipyard.cs — ported
- Consts.cs — ported
- Game.cs — state interface ported (GameState, EncounterState); ~65 game logic methods deferred
