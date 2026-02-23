export interface GameOptions {
  alwaysIgnorePirates: boolean;
  alwaysIgnorePolice: boolean;
  alwaysIgnoreTradeInOrbit: boolean;
  alwaysIgnoreTraders: boolean;
  autoFuel: boolean;
  autoRepair: boolean;
  continuousAttack: boolean;
  continuousAttackFleeing: boolean;
  disableOpponents: boolean;
  newsAutoPay: boolean;
  newsAutoShow: boolean;
  remindLoans: boolean;
  reserveMoney: boolean;
  showTrackedRange: boolean;
  trackAutoOff: boolean;
  leaveEmpty: number;
}

export function createDefaultGameOptions(): GameOptions {
  return {
    alwaysIgnorePirates: false,
    alwaysIgnorePolice: false,
    alwaysIgnoreTradeInOrbit: false,
    alwaysIgnoreTraders: true,
    autoFuel: false,
    autoRepair: false,
    continuousAttack: false,
    continuousAttackFleeing: false,
    disableOpponents: false,
    newsAutoPay: false,
    newsAutoShow: false,
    remindLoans: true,
    reserveMoney: false,
    showTrackedRange: true,
    trackAutoOff: true,
    leaveEmpty: 0,
  };
}
