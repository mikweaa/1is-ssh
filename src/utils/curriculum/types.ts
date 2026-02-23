export interface Subject {
  id: string;
  name: string;
}

export interface SemesterData {
  mandatory: Subject[];
  /** Number of non-FL elective slots. When foreignLanguageElective is set, the dashboard adds the FL slot separately; do not count it here. */
  electiveCount: number;
  foreignLanguageElective?: "I" | "II"; // Foreign Language Elective I for semester 1, II for semester 2
}

export interface DegreeType {
  id: string;
  name: string;
  semesters: Record<string, SemesterData>;
}

export interface Branch {
  id: string;
  name: string;
  degrees: Record<string, DegreeType>;
}

export interface Faculty {
  code: string;
  name: string;
}

export interface BranchMapping {
  name: string;
  id: string;
  facultyCode: string;
}
