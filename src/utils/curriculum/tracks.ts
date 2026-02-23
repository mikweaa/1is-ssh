import { getAvailableDegreeTypes } from "./structure";

export interface TrackOption {
  id: string;
  name: string;
  degreeId: string;
}

export interface DegreeSelectionOption {
  id: string;
  name: string;
  trackOptions?: TrackOption[];
}

const TRACKED_DEGREES: Record<string, DegreeSelectionOption[]> = {
  PSY: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-1y-professional", name: "Master (Professional MA, 60 ECTS)" },
    { id: "master-1y-academic", name: "Master (Academic MA, 60 ECTS)" },
    { id: "master-2y", name: "Master (2-Year, 120 ECTS)" },
    { id: "phd", name: "PhD (180 ECTS)" },
  ],
  ELIT: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-1y-professional", name: "Master (Professional MA, 60 ECTS)" },
    { id: "master-1y-academic", name: "Master (Academic MA, 60 ECTS)" },
    { id: "master-2y", name: "Master (2-Year, 120 ECTS)" },
    { id: "phd", name: "PhD (180 ECTS)" },
  ],
  VACD: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-1y-professional", name: "Master (Professional MA, 60 ECTS)" },
    { id: "master-1y-academic", name: "Master (Academic MA, 60 ECTS)" },
    { id: "master-2y", name: "Master (2-Year, 120 ECTS)" },
  ],
  MAC: [{ id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" }],
  CULT: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-1y-professional", name: "Master (Professional MA, 60 ECTS)" },
    { id: "master-1y-academic", name: "Master (Academic MA, 60 ECTS)" },
    { id: "phd", name: "PhD (180 ECTS)" },
  ],
  SPS: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-balkan-academic", name: "Balkan Studies (Academic MA, 60 ECTS)" },
    { id: "master-balkan-professional", name: "Balkan Studies (Professional MA, 60 ECTS)" },
    { id: "master-european", name: "European Studies (MA, 60 ECTS)" },
    { id: "phd", name: "PhD (180 ECTS)" },
  ],
  PSIR: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-1y", name: "Master (Second Cycle, 60 ECTS)" },
    { id: "master-2y", name: "Master (2-Year, 120 ECTS)" },
    { id: "phd", name: "PhD (180 ECTS)" },
  ],
  ECON: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-1y", name: "Master (Second Cycle, 60 ECTS)" },
    { id: "phd", name: "PhD (180 ECTS)" },
  ],
  IR: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-1y", name: "Master (Second Cycle, 60 ECTS)" },
    { id: "phd", name: "PhD (180 ECTS)" },
  ],
  HTM: [{ id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" }],
  MAN: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-1y-professional", name: "MBA (Professional, 60 ECTS)" },
    { id: "master-1y-academic", name: "MBA (Academic, 60 ECTS)" },
    { id: "master-2y", name: "MBA (2-Year, 120 ECTS)" },
    { id: "phd", name: "PhD (180 ECTS)" },
  ],
  IBF: [
    { id: "bachelor", name: "Bachelor (I Cycle, 240 ECTS)" },
    { id: "master-1y-ib-professional", name: "Master (International Business, Professional, 60 ECTS)" },
    { id: "master-1y-ib-academic", name: "Master (International Business, Academic, 60 ECTS)" },
    { id: "master-2y-ib", name: "Master (International Business, 120 ECTS)" },
    { id: "master-1y-fin-professional", name: "Master (International Finance, Professional, 60 ECTS)" },
    { id: "master-1y-fin-academic", name: "Master (International Finance, Academic, 60 ECTS)" },
    { id: "master-2y-fin", name: "Master (International Finance, 120 ECTS)" },
    { id: "phd-ib", name: "PhD (International Business, 180 ECTS)" },
    { id: "phd-fin", name: "PhD (Finance, 180 ECTS)" },
  ],
  CEIT: [{ id: "integrated", name: "Integrated Program (10 Semesters, 300 ECTS)" }],
  TLT: [
    { id: "integrated", name: "Integrated Program (10 Semesters, 300 ECTS)" },
    { id: "master-1y", name: "Master (Second Cycle, 60 ECTS)" },
    { id: "master-2y", name: "Master (Second Cycle, 120 ECTS)" },
  ],
  ELT: [
    { id: "integrated", name: "Integrated Program (10 Semesters, 300 ECTS)" },
    { id: "master-1y", name: "Master (Second Cycle, 60 ECTS)" },
    { id: "master-2y", name: "Master (Second Cycle, 120 ECTS)" },
    { id: "phd", name: "PhD (Third Cycle, 180 ECTS)" },
  ],
  LAW: [
    { id: "bachelor", name: "Bachelor (LLB, 240 ECTS)" },
    { id: "master-1y-public", name: "Comparative Public Law (On-campus, 60 ECTS)" },
    { id: "master-1y-public-cyber", name: "Comparative Public Law (DL: Cyber Law, 60 ECTS)" },
    { id: "master-1y-public-eu", name: "Comparative Public Law (DL: EU Law, 60 ECTS)" },
    { id: "master-2y-public", name: "Comparative Public Law (MA, 120 ECTS)" },
    { id: "master-1y-private", name: "Comparative Private Law (On-campus, 60 ECTS)" },
    { id: "master-1y-private-business", name: "Comparative Private Law (DL: Law and Business, 60 ECTS)" },
    { id: "master-2y-private", name: "Comparative Private Law (MA, 120 ECTS)" },
  ],
};

export function getDegreeSelectionOptions(branchId: string): DegreeSelectionOption[] {
  if (TRACKED_DEGREES[branchId]) {
    return TRACKED_DEGREES[branchId];
  }
  return getAvailableDegreeTypes(branchId).map((degree) => ({
    id: degree.id,
    name: degree.name,
  }));
}

export function getTrackOptions(branchId: string, degreeId: string): TrackOption[] {
  const options = TRACKED_DEGREES[branchId] || [];
  return options.find((degree) => degree.id === degreeId)?.trackOptions ?? [];
}
