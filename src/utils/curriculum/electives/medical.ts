export type MedElectiveStage = "preclinical" | "clinical" | "internship";

// Elective course options only (no Spoken Turkish/Bosnian – those are in the Foreign Language Elective slot).
// Semesters 1–6: elective dropdown empty; language options stay in FLANG slot. Years 4–6 (7–9) unchanged.
const PRECLINICAL_ELECTIVES_BY_SEMESTER: Record<string, string[]> = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
};

/** Year 4 (4th Academic Year, semester 7) – list of elective clinical courses only. */
const CLINICAL_ELECTIVES_YEAR_4 = [
  "COCR XX 001 - Pediatric Surgery",
  "ALGO XX 001 - Algology",
  "TGEN XX 001 - Medical Genetics",
  "NEON XX 000 - Neonatology",
  "SAHB XX 000 - Underwater and Hyperbaric Medicine",
  "PBAK XX 000 - Palliative Care",
  "TONK XX 000 - Medical Oncology",
  "ALIM XX 000 - Allergy and Immunology",
  "KBNK XX 000 - Blood Banking",
  "SAFY XX 001 - Disaster Management in Health",
  "RONK XX 000 - Radiation Oncology",
  "HDYZ XX 000 - Hemodialysis",
];

/** Year 5 (5th Academic Year, semester 8) – list of elective clinical courses only. */
const CLINICAL_ELECTIVES_YEAR_5 = [
  "GRAD XX 001 - Interventional Radiology",
  "GOCR XX 001 - Thoracic Surgery",
  "NUKT XX 001 - Nuclear Medicine",
  "KDCR XX 001 - Cardiovascular Surgery",
  "GKRD XX 001 - Interventional Cardiology",
];

/** Year 6 (6th Academic Year, semester 9) – list of elective internship practices only. */
const INTERNSHIP_ELECTIVES = [
  "ANES XX 001 06 - Anesthesiology and Reanimation",
  "UROL XX 001 06 - Urology",
  "COCR XX 001 06 - Pediatric Surgery",
  "ENKM XX 001 06 - Infectious Diseases and Clinical Microbiology",
  "NORO XX 001 06 - Neurology",
  "BSCR XX 001 06 - Neurosurgery",
  "KBBC XX 001 06 - Otorhinolaryngology",
  "GZHS XX 001 06 - Ophthalmology",
  "DERM XX 001 06 - Dermatology and Venereal Diseases",
  "PREC XX 001 06 - Plastic, Reconstructive and Aesthetic Surgery",
  "OTRM XX 001 06 - Orthopedics and Traumatology",
  "FTRE XX 001 06 - Physical Medicine and Rehabilitation",
  "GOHS XX 001 06 - Pulmonology",
  "GOCR XX 001 06 - Thoracic Surgery",
  "KARD XX 001 06 - Cardiology",
  "KDCR XX 001 06 - Cardiovascular Surgery",
];

export function getMedElectiveStage(semesterId: string | null | undefined): MedElectiveStage {
  if (!semesterId) return "preclinical";
  if (["7", "8"].includes(semesterId)) return "clinical";
  if (["9"].includes(semesterId)) return "internship";
  return "preclinical";
}

export function getMedElectiveOptions(semesterId: string | null | undefined): string[] {
  if (!semesterId) return [];
  if (semesterId === "7") return CLINICAL_ELECTIVES_YEAR_4;
  if (semesterId === "8") return CLINICAL_ELECTIVES_YEAR_5;
  if (semesterId === "9") return INTERNSHIP_ELECTIVES;
  return PRECLINICAL_ELECTIVES_BY_SEMESTER[semesterId] ?? [];
}
