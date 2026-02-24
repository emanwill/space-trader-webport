# Deferred Items

## Phase 1: Utility Layer — COMPLETE

Ported in `src/core/functions.ts` and `src/core/shipFunctions.ts`, plus additions to existing model files.

### Ported

- **Functions.cs** — all utility functions ported to `src/core/functions.ts` (distance, getRandom, randomSkill, formatting helpers, stringVars, formatList, adjustSkillForDifficulty, wormholeExists, wormholeTarget)
- **PoliticalSystem.ShipTypeLikely** — ported to `src/core/politicalSystem.ts`
- **TradeItem.StandardPrice** — ported to `src/core/tradeItem.ts`
- **Equipment.Price** (buy price) — ported as `getEquipmentBuyPrice` in `src/core/equipment.ts`
- **CrewMember.NthLowestSkill** — ported to `src/core/crewMember.ts`
- **Commander.PayInterest** — ported to `src/core/commander.ts`
- **StarSystem.ItemTraded / ItemUsed** — ported to `src/core/starSystem.ts`
- **Ship ~30 methods** — ported as standalone functions in `src/core/shipFunctions.ts`:
  - Cargo: getExtraCargoBays, getHiddenCargoBays, getTotalCargoBays, getFilledNormalCargoBays, getFilledCargoBays, getFreeCargoBays
  - Slots: getCrewCount, getFreeCrewQuarters, getFreeSlotsWeapon/Shield/Gadget, getFreeSlots
  - Equipment: hasWeapon, hasShield, hasGadget, hasEquipment, hasCrew
  - Combat: getWeaponStrength, getShieldStrength, getShieldCharge, getShipSkills, getFuelTanks
  - Booleans: isDisableable, anyIllegalCargo, detectableIllegalCargo, wildOnBoard, jarekOnBoard, princessOnBoard, artifactOnBoard, reactorOnBoard, sculptureOnBoard
  - Valuation: getBaseWorth, getBounty
  - Mutations: addEquipment, removeEquipmentBySlot, removeEquipmentByType

## Phase 2: Game State Queries — COMPLETE

Ported in `src/core/gameQueries.ts` plus additions to existing model files.

### Ported

- **PoliceRecord.GetPoliceRecordFromScore** — already ported in `src/core/policeRecord.ts`
- **Reputation.GetReputationFromScore** — already ported in `src/core/reputation.ts`
- **Game.CountDownStart / InsuranceCosts / InterestCosts / MercenaryCosts / WormholeCosts / CurrentCosts** — ported to `src/core/gameQueries.ts`
- **Game.Score** — ported as `getScore` in `src/core/gameQueries.ts`
- **Game.Destinations** — ported as `getDestinations` in `src/core/gameQueries.ts`
- **Game.SelectedSystemName** (search) — ported as `findSystemByName` in `src/core/gameQueries.ts`
- **Commander.Worth** — ported as `getCommanderWorth` in `src/core/commander.ts`
- **Commander.CashToSpend** — ported as `getCashToSpend` in `src/core/commander.ts`
- **Ship.Worth** — ported as `getShipWorth` in `src/core/shipFunctions.ts`
- **StarSystem.DestOk / Distance / MercenariesForHire** — ported to `src/core/starSystem.ts`
- **CrewMember.CurrentSystem** — ported as `getCrewMemberCurrentSystem` in `src/core/crewMember.ts`
- **SpecialEvent.Location** — ported as `getSpecialEventLocation` in `src/core/specialEvent.ts`

## Phase 3+: Remaining Game Logic

- **Equipment.Image / BaseImageIndex** — WinForms UI image loading; replace with web asset system
- **ShipSpec.SetValues(ShipType)** — copies fields from `shipSpecs[type]`; now possible since consts.ts exists, port alongside ship creation logic
- **ShipSpec.Image / ImageDamaged / ImageWithShields / ImageDamagedWithShields / ImageIndex** — WinForms image system; replace with web assets
- **ShipSpec custom ship deserialization** — modifies global `Consts.ShipSpecs` and `Strings.ShipNames`; needs redesign for immutable state
- **ShipSpec.UpdateCustomImageOffsetConstants** — pixel scanning for custom ship images; WinForms-specific
- **CrewMember.ChangeRandomSkill / IncreaseRandomSkill / TonicTweakRandomSkill** — mutate skills and access `Game.CurrentGame` for recalculating buy prices; port as game logic functions
- **Commander.TradeShip** — complex ship purchase logic with UI alerts; port alongside shipyard UI
- **Ship opponent generation methods** — CreateFlea, CreateOpponent, etc.; port alongside encounter system
- **StarSystem.InitializeTradeItems** — accesses `Game.CurrentGame.Difficulty` and `Consts.TradeItems`; port alongside universe generation
- **StarSystem.ShowSpecialButton** — large switch accessing game state; port alongside event UI
- **Shipyard** — all computed properties (AdjustedPrice, PenaltyCost, UnitsUsed, TotalCost, TradeIn, etc.) operate on `Consts.ShipSpecs[Custom]` and `Game.CurrentGame.Commander`; port alongside custom ship builder UI
- **Game.cs ~65 methods** — encounter system, travel, trading, events, initialization

## String Lookups from Strings.cs (not yet ported)

- Remaining string arrays in `Strings.cs` beyond what's been ported (e.g. `EncounterText`, `NewsMastheads`, etc.)

## Data Models — ALL COMPLETE

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
