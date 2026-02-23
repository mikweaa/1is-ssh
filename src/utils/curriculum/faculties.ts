import type { Faculty } from "./types";

export const FACULTY_COLORS: Record<string, string> = {
  FENS: "#2563eb",
  FASS: "#7c3aed",
  FBA: "#0d9662",
  FLW: "#b45309",
  FEDU: "#0891b2",
  FMS: "#dc2626",
  DDP: "#0d9488",
};

/** Standard faculties only. Dual Diploma is reached via the "Dual diploma" button on the faculty page. */
export const FACULTIES: Faculty[] = [
  { code: "FENS", name: "Faculty of Engineering and Natural Sciences" },
  { code: "FASS", name: "Faculty of Arts & Social Sciences" },
  { code: "FBA", name: "Faculty of Business and Administration" },
  { code: "FLW", name: "Faculty of Law" },
  { code: "FEDU", name: "Faculty of Education" },
  { code: "FMS", name: "Faculty of Medical Sciences" },
];

const FACULTY_NAMES: Record<string, string> = {
  FENS: "Engineering & Natural Sciences",
  FASS: "Arts & Social Sciences",
  FBA: "Business & Administration",
  FEDU: "Education",
  FMS: "Medical Sciences",
  FLW: "Law",
  DDP: "Dual Diploma Programs",
};

export function getFacultyName(facultyCode: string): string {
  return FACULTY_NAMES[facultyCode] || facultyCode;
}

export function getAllFaculties(): Faculty[] {
  return FACULTIES;
}
