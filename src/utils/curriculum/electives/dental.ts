const SEMESTER_ELECTIVES: Record<string, string[]> = {
  "1": [], // Dental Terminology is mandatory; Spoken Language I is in FLANG slot
  "2": [], // History of Dentistry and Deontology is mandatory; Spoken Language II is in FLANG slot
  "3": [], // Spoken Language III – empty list
  "4": [], // Spoken Language IV – empty list
  "7": [], // Internal Medicine is mandatory
  "8": [], // Immunology is mandatory
};

export function getDentalElectiveOptions(semesterId: string | null | undefined): string[] {
  if (!semesterId) return [];
  return SEMESTER_ELECTIVES[semesterId] ?? [];
}
