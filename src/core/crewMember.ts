import { CrewMemberId, SkillType, StarSystemId } from "./enums";

export interface CrewMember {
  id: CrewMemberId;
  skills: number[]; // [pilot, fighter, trader, engineer]
  currentSystemId: StarSystemId;
}

export const crewMemberNames: Record<CrewMemberId, string> = {
  [CrewMemberId.NA]: "",
  [CrewMemberId.Commander]: "Commander",
  [CrewMemberId.Alyssa]: "Alyssa",
  [CrewMemberId.Armatur]: "Armatur",
  [CrewMemberId.Bentos]: "Bentos",
  [CrewMemberId.C2U2]: "C2U2",
  [CrewMemberId.ChiTi]: "Chi'Ti",
  [CrewMemberId.Crystal]: "Crystal",
  [CrewMemberId.Dane]: "Dane",
  [CrewMemberId.Deirdre]: "Deirdre",
  [CrewMemberId.Doc]: "Doc",
  [CrewMemberId.Draco]: "Draco",
  [CrewMemberId.Iranda]: "Iranda",
  [CrewMemberId.Jeremiah]: "Jeremiah",
  [CrewMemberId.Jujubal]: "Jujubal",
  [CrewMemberId.Krydon]: "Krydon",
  [CrewMemberId.Luis]: "Luis",
  [CrewMemberId.Mercedez]: "Mercedez",
  [CrewMemberId.Milete]: "Milete",
  [CrewMemberId.MuriL]: "Muri-L",
  [CrewMemberId.Mystyc]: "Mystyc",
  [CrewMemberId.Nandi]: "Nandi",
  [CrewMemberId.Orestes]: "Orestes",
  [CrewMemberId.Pancho]: "Pancho",
  [CrewMemberId.PS37]: "PS37",
  [CrewMemberId.Quarck]: "Quarck",
  [CrewMemberId.Sosumi]: "Sosumi",
  [CrewMemberId.Uma]: "Uma",
  [CrewMemberId.Wesley]: "Wesley",
  [CrewMemberId.Wonton]: "Wonton",
  [CrewMemberId.Yorvick]: "Yorvick",
  [CrewMemberId.Zeethibal]: "Zeethibal",
  [CrewMemberId.Opponent]: "Opponent",
  [CrewMemberId.Wild]: "Wild",
  [CrewMemberId.Jarek]: "Jarek",
  [CrewMemberId.FamousCaptain]: "Captain",
  [CrewMemberId.Dragonfly]: "Dragonfly",
  [CrewMemberId.Scarab]: "Scarab",
  [CrewMemberId.SpaceMonster]: "SpaceMonster",
  [CrewMemberId.Aragorn]: "Aragorn",
  [CrewMemberId.Brady]: "Brady",
  [CrewMemberId.EightOfNine]: "Eight of Nine",
  [CrewMemberId.Fangorn]: "Fangorn",
  [CrewMemberId.Gagarin]: "Gagarin",
  [CrewMemberId.Hoshi]: "Hoshi",
  [CrewMemberId.Jackson]: "Jackson",
  [CrewMemberId.Kaylee]: "Kaylee",
  [CrewMemberId.Marcus]: "Marcus",
  [CrewMemberId.ONeill]: "O'Neill",
  [CrewMemberId.Ripley]: "Ripley",
  [CrewMemberId.Stilgar]: "Stilgar",
  [CrewMemberId.Taggart]: "Taggart",
  [CrewMemberId.Vansen]: "Vansen",
  [CrewMemberId.Xizor]: "Xizor",
  [CrewMemberId.Princess]: "Ziyal",
  [CrewMemberId.Scorpion]: "Scorpion",
};

export function getCrewMemberName(member: CrewMember): string {
  return crewMemberNames[member.id];
}

export function getPilot(member: CrewMember): number {
  return member.skills[SkillType.Pilot];
}

export function getFighter(member: CrewMember): number {
  return member.skills[SkillType.Fighter];
}

export function getTrader(member: CrewMember): number {
  return member.skills[SkillType.Trader];
}

export function getEngineer(member: CrewMember): number {
  return member.skills[SkillType.Engineer];
}

export function getCrewMemberRate(
  member: CrewMember,
  specialCrewMemberIds: Set<CrewMemberId>,
): number {
  if (specialCrewMemberIds.has(member.id) || member.id === CrewMemberId.Zeethibal) {
    return 0;
  }
  return (getPilot(member) + getFighter(member) + getTrader(member) + getEngineer(member)) * 3;
}
