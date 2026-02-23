import { PoliceRecordType } from "./enums";

export interface PoliceRecord {
  type: PoliceRecordType;
  minScore: number;
}

export const policeRecordNames: Record<PoliceRecordType, string> = {
  [PoliceRecordType.Psychopath]: "Psychopath",
  [PoliceRecordType.Villain]: "Villain",
  [PoliceRecordType.Criminal]: "Criminal",
  [PoliceRecordType.Crook]: "Crook",
  [PoliceRecordType.Dubious]: "Dubious",
  [PoliceRecordType.Clean]: "Clean",
  [PoliceRecordType.Lawful]: "Lawful",
  [PoliceRecordType.Trusted]: "Trusted",
  [PoliceRecordType.Liked]: "Liked",
  [PoliceRecordType.Hero]: "Hero",
};

export function getPoliceRecordName(record: PoliceRecord): string {
  return policeRecordNames[record.type];
}

export function getPoliceRecordFromScore(
  score: number,
  policeRecords: PoliceRecord[],
): PoliceRecord {
  let i = 0;
  while (i < policeRecords.length && score >= policeRecords[i].minScore) {
    i++;
  }
  return policeRecords[Math.max(0, i - 1)];
}
