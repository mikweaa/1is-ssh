export type LetterGrade = "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "E" | "IP" | "I" | "U" | "N/A" | "F" | "P" | "S" | "T" | "ERS" | "MOB";

export interface GradeRange {
  minScore: number;
  letterGrade: LetterGrade;
  coefficient: number;
  status: string;
}

export const GRADE_SCALE: GradeRange[] = [
  { minScore: 95, letterGrade: "A", coefficient: 4.0, status: "Well" },
  { minScore: 85, letterGrade: "A-", coefficient: 3.7, status: "Good-Very Good" },
  { minScore: 80, letterGrade: "B+", coefficient: 3.3, status: "Good" },
  { minScore: 75, letterGrade: "B", coefficient: 3.0, status: "Good" },
  { minScore: 70, letterGrade: "B-", coefficient: 2.7, status: "Average-Good" },
  { minScore: 65, letterGrade: "C+", coefficient: 2.3, status: "Average-Good" },
  { minScore: 55, letterGrade: "C", coefficient: 2.0, status: "Mid" },
  { minScore: 0, letterGrade: "E", coefficient: 1.0, status: "Unsuccessful" },
];

export function getLetterGrade(score: number): LetterGrade {
  for (const range of GRADE_SCALE) {
    if (score >= range.minScore) {
      return range.letterGrade;
    }
  }
  return "E";
}

export function getCoefficient(letterGrade: LetterGrade): number {
  const range = GRADE_SCALE.find((g) => g.letterGrade === letterGrade);
  return range?.coefficient ?? 0;
}

export function getMinScoreForGrade(letterGrade: LetterGrade): number {
  const range = GRADE_SCALE.find((g) => g.letterGrade === letterGrade);
  return range?.minScore ?? 0;
}

export function calculatePointsNeeded(currentScore: number, targetScore: number, totalWeight: number): number {
  if (totalWeight === 0) return 0;
  const pointsNeeded = (targetScore * totalWeight - currentScore) / (100 - totalWeight);
  return Math.max(0, Math.ceil(pointsNeeded * 100) / 100);
}
