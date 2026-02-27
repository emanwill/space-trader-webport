import { CrewMemberId, Difficulty, SkillType, StarSystemId } from "./enums";
import type { StarSystem } from "./starSystem";
import { MAX_SKILL } from "./consts";
import { getRandom } from "./functions";

export interface CrewMember {
  id: CrewMemberId;
  skills: number[]; // [pilot, fighter, trader, engineer]
  currentSystemId: StarSystemId;
}

export const crewMemberNames: Record<CrewMemberId, string> = {
  [CrewMemberId.NA]: "??CREW_MEMBER??",
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
  if (
    specialCrewMemberIds.has(member.id) ||
    member.id === CrewMemberId.Zeethibal
  ) {
    return 0;
  }
  return (
    (getPilot(member) +
      getFighter(member) +
      getTrader(member) +
      getEngineer(member)) *
    3
  );
}

export function getCrewMemberCurrentSystem(
  member: CrewMember,
  universe: StarSystem[],
): StarSystem | null {
  if (member.currentSystemId === StarSystemId.NA) return null;
  return universe[member.currentSystemId] ?? null;
}

export function nthLowestSkill(member: CrewMember, n: number): number {
  const skillIds = [0, 1, 2, 3];

  // Bubble sort by skill value (ascending)
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3 - j; i++) {
      if (member.skills[skillIds[i]] > member.skills[skillIds[i + 1]]) {
        const temp = skillIds[i];
        skillIds[i] = skillIds[i + 1];
        skillIds[i + 1] = temp;
      }
    }
  }

  return skillIds[n - 1];
}

export function changeRandomSkill(
  member: CrewMember,
  amount: number,
): CrewMember {
  const eligible: number[] = [];
  for (let i = 0; i < member.skills.length; i++) {
    if (member.skills[i] + amount > 0 && member.skills[i] + amount < MAX_SKILL)
      eligible.push(i);
  }

  if (eligible.length === 0) return member;

  const skill = eligible[getRandom(eligible.length)];
  const newSkills = [...member.skills];
  newSkills[skill] += amount;
  return { ...member, skills: newSkills };
}

export function increaseRandomSkill(member: CrewMember): CrewMember {
  return changeRandomSkill(member, 1);
}

export function tonicTweakRandomSkill(
  member: CrewMember,
  difficulty: Difficulty,
): CrewMember {
  if (difficulty < Difficulty.Hard) {
    // Add one, subtract one — loop until at least one skill changed
    const original = member.skills;
    let result = member;
    do {
      result = changeRandomSkill(changeRandomSkill(result, 1), -1);
    } while (
      result.skills[0] === original[0] &&
      result.skills[1] === original[1] &&
      result.skills[2] === original[2] &&
      result.skills[3] === original[3]
    );
    return result;
  } else {
    // Add one twice, subtract three once
    let result = changeRandomSkill(member, 1);
    result = changeRandomSkill(result, 1);
    result = changeRandomSkill(result, -3);
    return result;
  }
}
