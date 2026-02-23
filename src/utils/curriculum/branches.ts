import type { BranchMapping } from "./types";
import { _getBranchNameFromCurriculum } from "./structure";

const BRANCH_MAPPINGS: Record<string, BranchMapping[]> = {
  FENS: [
    { name: "Mechanical Engineering", id: "ME", facultyCode: "FENS" },
    { name: "Architecture", id: "ARCH", facultyCode: "FENS" },
    { name: "Genetics and Bioengineering", id: "GBE", facultyCode: "FENS" },
    { name: "Industrial Engineering", id: "IE", facultyCode: "FENS" },
    { name: "Computer Sciences and Engineering", id: "CSE", facultyCode: "FENS" },
    { name: "Electrical and Electronics Engineering", id: "EE", facultyCode: "FENS" },
    { name: "Software Engineering", id: "SE", facultyCode: "FENS" },
    { name: "Artificial Intelligence and Data Engineering", id: "AIDE", facultyCode: "FENS" },
  ],
  FASS: [
    { name: "Visual Arts and Visual Communications Design", id: "VACD", facultyCode: "FASS" },
    { name: "Media and Communication", id: "MAC", facultyCode: "FASS" },
    { name: "Psychology", id: "PSY", facultyCode: "FASS" },
    { name: "English Language and Literature", id: "ELIT", facultyCode: "FASS" },
    { name: "Cultural Studies", id: "CULT", facultyCode: "FASS" },
    { name: "Political Sciences", id: "SPS", facultyCode: "FASS" },
  ],
  FBA: [
    { name: "Economics", id: "ECON", facultyCode: "FBA" },
    { name: "Hospitality and Tourism Management", id: "HTM", facultyCode: "FBA" },
    { name: "Management", id: "MAN", facultyCode: "FBA" },
    { name: "International Business and Finance", id: "IBF", facultyCode: "FBA" },
    { name: "International Relations", id: "IR", facultyCode: "FBA" },
    { name: "Political Science and International Relations", id: "PSIR", facultyCode: "FBA" },
  ],
  FEDU: [
    { name: "English Language and Literature, Teaching", id: "ELT", facultyCode: "FEDU" },
    { name: "Turkish Language and Literature, Teaching", id: "TLT", facultyCode: "FEDU" },
    { name: "Computer Education and Instructional Tech", id: "CEIT", facultyCode: "FEDU" },
  ],
  FMS: [
    { name: "Medicine", id: "MD", facultyCode: "FMS" },
    { name: "Dental Medicine", id: "DM", facultyCode: "FMS" },
  ],
  FLW: [
    { name: "Law", id: "LAW", facultyCode: "FLW" },
  ],
  DDP: [
    { name: "ITU - Mechanical Engineering", id: "ITU-ME", facultyCode: "DDP" },
    { name: "ITU - Architecture", id: "ITU-ARCH", facultyCode: "DDP" },
    { name: "ITU - Economics", id: "ITU-ECON", facultyCode: "DDP" },
    { name: "ITU - Electronics and Comms Engineering", id: "ITU-ECE", facultyCode: "DDP" },
    { name: "ITU - Bioengineering", id: "ITU-BIO", facultyCode: "DDP" },
    { name: "ITU - Computer Engineering", id: "ITU-CE", facultyCode: "DDP" },
    { name: "IU - Economics", id: "IU-ECON", facultyCode: "DDP" },
    { name: "IU - Management", id: "IU-MGMT", facultyCode: "DDP" },
    { name: "IU - Political Science and IR", id: "IU-PSIR", facultyCode: "DDP" },
    { name: "IU - Law", id: "IU-LAW", facultyCode: "DDP" },
    { name: "IU - Computer Engineering", id: "IU-CE", facultyCode: "DDP" },
    { name: "IU - English Language and Literature", id: "IU-ELIT", facultyCode: "DDP" },
    { name: "MU - Computer Engineering", id: "MU-CE", facultyCode: "DDP" },
    { name: "MU - Bioengineering", id: "MU-BIOE", facultyCode: "DDP" },
    { name: "MU - English Language Teaching", id: "MU-ELT", facultyCode: "DDP" },
    { name: "MU - Psychology", id: "MU-PSY", facultyCode: "DDP" },
    { name: "MU - Management", id: "MU-MGMT", facultyCode: "DDP" },
    { name: "MU - Law", id: "MU-LAW", facultyCode: "DDP" },
    { name: "Ludwigshafen (HWG LU) - Management", id: "HWG-MBA", facultyCode: "DDP" },
  ],
};

export function getBranchesByFaculty(facultyCode: string): BranchMapping[] {
  return BRANCH_MAPPINGS[facultyCode] ?? [];
}

export function getBranchId(facultyCode: string, branchName: string): string | null {
  const branches = BRANCH_MAPPINGS[facultyCode];
  if (!branches) return null;
  const branch = branches.find((b) => b.name === branchName);
  return branch?.id ?? null;
}

export function getBranchName(branchId: string): string {
  // First try to get from structure (curriculum data) - this is authoritative
  const nameFromStructure = _getBranchNameFromCurriculum(branchId);
  if (nameFromStructure !== "Unknown") {
    return nameFromStructure;
  }

  // Fallback: search through all mappings
  for (const mappings of Object.values(BRANCH_MAPPINGS)) {
    const branch = mappings.find((b) => b.id === branchId);
    if (branch) return branch.name;
  }

  return "Unknown";
}

export function getFacultyCodeForBranch(branchId: string): string | null {
  if (!branchId || branchId === "custom") return null;
  for (const [facultyCode, mappings] of Object.entries(BRANCH_MAPPINGS)) {
    if (mappings.some((b) => b.id === branchId)) return facultyCode;
  }
  return null;
}
