import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLetterGrade, getCoefficient, getMinScoreForGrade } from "../utils/gradingScale";
import { getBranchName, getSemesterMandatoryCourses, getSemesterElectiveCount, getAvailableSemesters, getElectiveOptions, getSemesterForeignLanguageElective, getForeignLanguageOptions, getElectiveSlotLabels, getDefaultForeignLanguageName } from "../utils/curriculum";
import type { LetterGrade } from "../utils/gradingScale";
import { useAuth } from "../context/AuthContext";
import { useErrorToast } from "../context/ErrorToastContext";
import * as api from "../api/client";
import TopbarAuth from "../components/TopbarAuth";
import TopbarBranding from "../components/TopbarBranding";

interface GradeItem {
  id: string;
  name: string;
  score: number | null;
  weight: number | null;
  type: "midterm" | "final" | "quiz" | "activity";
}

interface SubjectData {
  name: string;
  code?: string;
  items: GradeItem[];
}

type DeletedAction =
  | { type: "subject"; subject: SubjectData; index: number }
  | { type: "item"; subjectName: string; item: GradeItem; index: number };

const OBJECT_NAME_MAX_LENGTH = 20;

function getGradeColor(grade: string): string {
  const gradeColors: Record<string, string> = {
    'A': '#10b981',   // bright green
    'A-': '#22c55e',  // green
    'B+': '#84cc16',  // lime
    'B': '#a3e635',   // light lime
    'B-': '#fbbf24',  // yellow
    'C+': '#fb923c',  // orange
    'C': '#f97316',   // dark orange
    'E': '#ef4444',   // red (failing)
  };
  return gradeColors[grade] || '#7bccac';
}

function getGradeStatus(grade: string): string {
  if (grade === '?') return '';
  if (grade === 'C' || grade === 'C+' || grade === 'B-' || grade === 'B' || grade === 'B+' || grade === 'A-' || grade === 'A') {
    return grade === 'C' ? ` (Pass)` : '';
  }
  if (grade === 'E') {
    return ` (Fail)`;
  }
  return '';
}

function areWeightsComplete(items: GradeItem[]): boolean {
  return items.every(item => item.weight !== null && item.weight > 0); // this is for grade prediction
}

function hasAnyScore(items: GradeItem[]): boolean {
  return items.some(item => item.score !== null);
}

function formatCourseName(courseId: string, courseName: string): string {
  // Name already contains the code (e.g. "MAK 229E – Fluid Mechanics II" or "ENS101 – Intro")
  const normalizedId = courseId.replace(/\s/g, "").toUpperCase();
  const leadingPart = courseName.match(/^[\sA-Za-z0-9]+/)?.[0] ?? "";
  const nameCodeLike = leadingPart.replace(/\s/g, "").toUpperCase();
  if (nameCodeLike === normalizedId || nameCodeLike.startsWith(normalizedId) || normalizedId.startsWith(nameCodeLike)) return courseName;
  if (/^[A-Z]{2,}\d{2,}/.test(courseName.trim())) return courseName;
  return `${courseId} - ${courseName}`;
}

/** Medicine (MD) integrated academic years 4–6 (semesters 7–9): blank slate, user picks subjects. */
function isMedBlankSlateSemester(branchId: string, degreeId: string, semesterId: string | null): boolean {
  return branchId === "MD" && degreeId === "integrated" && !!semesterId && ["7", "8", "9"].includes(semesterId);
}

/** IU-LAW (Istanbul University Law DDP) semesters 5–8: blank slate at IU, user builds their own semester. */
function isIULawBlankSlateSemester(branchId: string, degreeId: string, semesterId: string | null): boolean {
  return branchId === "IU-LAW" && degreeId === "bachelor" && !!semesterId && ["5", "6", "7", "8"].includes(semesterId);
}

function isMEMasterBlankSlateSemester(branchId: string, degreeId: string, _semesterId: string | null): boolean {
  return branchId === "ME" && ["master-1y-academic", "master-1y-professional"].includes(degreeId);
}

function isIEMasterBlankSlateSemester(branchId: string, degreeId: string, _semesterId: string | null): boolean {
  return branchId === "IE" && degreeId === "master-1y";
}

function isCSEMasterBlankSlateSemester(branchId: string, degreeId: string, _semesterId: string | null): boolean {
  return branchId === "CSE" && degreeId === "master-1y";
}

function isSEMasterBlankSlateSemester(branchId: string, degreeId: string, _semesterId: string | null): boolean {
  return branchId === "SE" && degreeId === "master-1y";
}

function isECONMasterBlankSlateSemester(branchId: string, degreeId: string, _semesterId: string | null): boolean {
  return branchId === "ECON" && degreeId === "master-1y";
}

/** HWG-MBA Dual Diploma: all semesters blank slate, user chooses subjects (Year 1 at IUS, Year 2 at HWG LU). */
function isHWGMBABlankSlateSemester(branchId: string, degreeId: string, _semesterId: string | null): boolean {
  return branchId === "HWG-MBA" && degreeId === "master-2y";
}

function getGradePredictions(items: GradeItem[]): { grade: string; required: string }[] {
  const totalWeight = items.reduce((sum, item) => sum + (item.weight ?? 0), 0);
  const currentSum = items.reduce(
    (sum, item) =>
      sum + (item.score !== null && item.weight !== null ? item.score * item.weight : 0),
    0
  );
  const remainingWeight = items.reduce(
    (sum, item) => sum + (item.score !== null ? 0 : item.weight ?? 0),
    0
  );

  const gradeOrder = ["A", "A-", "B+", "B", "B-", "C+", "C"] as const;

  return gradeOrder.map((grade) => {
    const minScore = getMinScoreForGrade(grade);

    if (remainingWeight <= 0) {
      const achieved = totalWeight > 0 && currentSum / totalWeight >= minScore;
      return { grade, required: achieved ? "Achieved" : "Not possible" };
    }

    const requiredAverage = (minScore * totalWeight - currentSum) / remainingWeight;

    if (requiredAverage <= 0) {
      return { grade, required: "Achieved" };
    }

    if (requiredAverage > 100) {
      return { grade, required: "Not possible" };
    }

    return { grade, required: `${requiredAverage.toFixed(2)}%` };
  });
}

const SUBJECT_LIST_SAVE_DEBOUNCE_MS = 800;

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showError } = useErrorToast();
  const subjectListSaveTimeoutRef = useRef<number | null>(null);
  const { branchId, degreeId, semesterId } = (location.state as { branchId?: string; degreeId?: string; semesterId?: string }) || {};

  const facultyCode = localStorage.getItem("sis.faculty");
  const branch = localStorage.getItem("sis.branch");
  const storedBranchId = localStorage.getItem("sis.branchId");
  const storedDegree = localStorage.getItem("sis.degree");
  const storedSemester = localStorage.getItem("sis.semester");

  // Determine active values (from location state or localStorage)
  const activeBranchId = branchId || storedBranchId || branch;
  const activeDegreeId = degreeId || storedDegree;
  const activeSemesterId = storedSemester || semesterId;
  const displayBranchName = activeBranchId ? getBranchName(activeBranchId) : branch;
  const isCustomSetup = activeBranchId === "custom" && activeDegreeId === "custom";
  
  // Entrance animation when landing from semester select
  const [isEntering, setIsEntering] = useState(true);

  const PHD_SEMESTER_COUNT_KEY = "sis.phdSemesterCount";
  const getStoredPhdSemesterCount = (): number => {
    const stored = localStorage.getItem(PHD_SEMESTER_COUNT_KEY);
    const n = stored ? Number.parseInt(stored, 10) : Number.NaN;
    return Number.isFinite(n) && n >= 1 ? n : 6;
  };

  // PhD semester count state: init from localStorage so back-navigation shows correct count
  const [phdSemesterCount, setPhdSemesterCount] = useState<number>(getStoredPhdSemesterCount);
  const [customSemesterCount, setCustomSemesterCount] = useState<number>(() => {
    const storedCount = localStorage.getItem("sis.customSemesterCount");
    const parsedCount = storedCount ? Number.parseInt(storedCount, 10) : Number.NaN;
    return Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : 1;
  });

  useEffect(() => {
    if (!isAuthenticated) return;
    api.getProfile().then((profile) => {
      if (profile?.phdSemesterCount != null) {
        const count = profile.phdSemesterCount;
        setPhdSemesterCount(count);
        localStorage.setItem(PHD_SEMESTER_COUNT_KEY, String(count));
      }
    }).catch(() => { /* rate-limited or network error — keep cached values */ });
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isCustomSetup) return;
    localStorage.setItem("sis.customSemesterCount", String(customSemesterCount));
  }, [customSemesterCount, isCustomSetup]);

  // Helper function to get display name for semester
  const getSemesterDisplayName = (semester: string | null | undefined) => {
    if (!semester) return "";
    // For Medicine (MD), display 4th/5th/6th Academic Year for semesters 7, 8, 9
    if (activeBranchId === "MD" && semester === "7") return "4th Academic Year";
    if (activeBranchId === "MD" && semester === "8") return "5th Academic Year";
    if (activeBranchId === "MD" && semester === "9") return "6th Academic Year";
    return `Semester ${semester}`;
  };

  // Initialize subjects from mandatory courses if FENS
  const initialSubjectsFromFENS = activeBranchId && activeDegreeId && activeSemesterId
    ? (() => {
        const mandatoryCourses = getSemesterMandatoryCourses(activeBranchId, activeDegreeId, activeSemesterId).map((course) => ({
          name: formatCourseName(course.id, course.name),
          code: course.id,
          items: [
            { id: `${course.id}-1`, name: "Midterm", score: null, weight: null, type: "midterm" as const },
            { id: `${course.id}-2`, name: "Quiz 1", score: null, weight: null, type: "quiz" as const },
            { id: `${course.id}-3`, name: "Quiz 2", score: null, weight: null, type: "quiz" as const },
            { id: `${course.id}-4`, name: "Final", score: null, weight: null, type: "final" as const },
          ],
        }));

        const electiveCount = getSemesterElectiveCount(activeBranchId, activeDegreeId, activeSemesterId);
        const slotLabels = getElectiveSlotLabels(activeBranchId, activeDegreeId, activeSemesterId);
        const electives = Array.from({ length: electiveCount }).map((_, i) => ({
          name: slotLabels[i] ?? `Elective ${i + 1}`,
          code: `ELEC-${i + 1}`,
          items: [
            { id: `ELEC-${i + 1}-1`, name: "Midterm", score: null, weight: null, type: "midterm" as const },
            { id: `ELEC-${i + 1}-2`, name: "Quiz 1", score: null, weight: null, type: "quiz" as const },
            { id: `ELEC-${i + 1}-3`, name: "Quiz 2", score: null, weight: null, type: "quiz" as const },
            { id: `ELEC-${i + 1}-4`, name: "Final", score: null, weight: null, type: "final" as const },
          ],
        }));

        return [...mandatoryCourses, ...electives];
      })()
    : [];

  const [overviewMode, setOverviewMode] = useState(false);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [addingSubjectName, setAddingSubjectName] = useState("");
  const [addingObjectFor, setAddingObjectFor] = useState<string | null>(null);
  const [addingObjectName, setAddingObjectName] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [draggedItemSubject, setDraggedItemSubject] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemName, setEditingItemName] = useState("");
  const [editingSubjectName, setEditingSubjectName] = useState<string | null>(null);
  const [editingSubjectNewName, setEditingSubjectNewName] = useState("");
  /** While user types a decimal (e.g. "25."), keep the raw string so the input allows decimals. */
  const [editingNumeric, setEditingNumeric] = useState<{ subjectName: string; itemId: string; field: "score" | "weight"; value: string } | null>(null);
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [showHwgLocationDropdown, setShowHwgLocationDropdown] = useState(false);
  const HWG_LOCATION_KEY = "sis.hwgLocation";
  const [hwgLocation, setHwgLocation] = useState<"IUS" | "HWG">(() =>
    (localStorage.getItem("sis.hwgLocation") === "HWG" ? "HWG" : "IUS")
  );
  const [currentSemesterId, setCurrentSemesterId] = useState(activeSemesterId);
  const [deletedActions, setDeletedActions] = useState<DeletedAction[]>([]);
  const [showUndoPopup, setShowUndoPopup] = useState(false);
  const [undoTimeoutId, setUndoTimeoutId] = useState<number | null>(null);
  const [namedElectives, setNamedElectives] = useState<Set<string>>(new Set());
  const editInputRef = useRef<HTMLSpanElement>(null);
  const [pendingScrollSubject, setPendingScrollSubject] = useState<string | null>(null);
  const subjectRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [resetSubjectName, setResetSubjectName] = useState<string | null>(null);
  const [showResetSemesterConfirm, setShowResetSemesterConfirm] = useState(false);

  const [preferSingleTapEdit, setPreferSingleTapEdit] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const mqPointer = window.matchMedia("(pointer: coarse)");
    const check = () => setPreferSingleTapEdit(mq.matches || mqPointer.matches);
    check();
    mq.addEventListener("change", check);
    mqPointer.addEventListener("change", check);
    return () => {
      mq.removeEventListener("change", check);
      mqPointer.removeEventListener("change", check);
    };
  }, []);

  useEffect(() => {
    if (!storedSemester && semesterId) {
      localStorage.setItem("sis.semester", semesterId);
    }
  }, [storedSemester, semesterId]);

  const isUnnamedElective = useCallback(
    (subjectName: string): boolean => {
      // Generic placeholders that should prompt "Click to name"
      if (subjectName.match(/^Elective \d+$/) && !namedElectives.has(subjectName)) return true;
      if (subjectName === "Foreign Language Elective I" || subjectName === "Foreign Language Elective II") return true;
      // Distinct slot names (Elective Course N, Spoken Language I–IV, SECU/ISEC, etc.) are considered named
      return false;
    },
    [namedElectives]
  );

  const loadSubjectsForSemester = (semId: string) => {
    if (!activeBranchId || !activeDegreeId || !semId) return initialSubjectsFromFENS;

    const isPhdProgram = activeDegreeId === "phd" || activeDegreeId === "phd-ib" || activeDegreeId === "phd-fin";
    if (isPhdProgram) {
      return [];
    }

    const isMedBlankSlate = isMedBlankSlateSemester(activeBranchId, activeDegreeId, semId);
    const isIULawBlankSlate = isIULawBlankSlateSemester(activeBranchId, activeDegreeId, semId);
    const isMEMasterBlankSlate = isMEMasterBlankSlateSemester(activeBranchId, activeDegreeId, semId);
    const isIEMasterBlankSlate = isIEMasterBlankSlateSemester(activeBranchId, activeDegreeId, semId);
    const isCSEMasterBlankSlate = isCSEMasterBlankSlateSemester(activeBranchId, activeDegreeId, semId);
    const isSEMasterBlankSlate = isSEMasterBlankSlateSemester(activeBranchId, activeDegreeId, semId);
    const isECONMasterBlankSlate = isECONMasterBlankSlateSemester(activeBranchId, activeDegreeId, semId);
    const isHWGMBABlankSlate = isHWGMBABlankSlateSemester(activeBranchId, activeDegreeId, semId);
    const storageKey = `subjects_${activeBranchId}_${activeDegreeId}_${semId}`;
    const savedSubjects = localStorage.getItem(storageKey);
    
    if (savedSubjects) {
      try {
        const parsedSubjects: SubjectData[] = JSON.parse(savedSubjects);
        if (parsedSubjects.length > 0) {
          return parsedSubjects;
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    // Medicine integrated years 4–6 (semesters 7–9): blank slate, user chooses which subjects to add
    if (isMedBlankSlate) {
      return [];
    }

    // IU-LAW semesters 5–8 (at IU): blank slate, user chooses which subjects to take
    if (isIULawBlankSlate) {
      return [];
    }

    // ME Master (all semesters): blank slate, user adds subjects from the offered list
    if (isMEMasterBlankSlate) {
      return [];
    }

    // IE Master 1y: blank slate, user adds subjects from the offered list
    if (isIEMasterBlankSlate) {
      return [];
    }

    // CSE Master 1y: blank slate, user adds subjects from the offered list
    if (isCSEMasterBlankSlate) {
      return [];
    }

    // SE Master 1y: blank slate, user adds subjects from the offered list
    if (isSEMasterBlankSlate) {
      return [];
    }

    // ECON Master 1y: blank slate, user adds subjects from the offered list
    if (isECONMasterBlankSlate) {
      return [];
    }

    // HWG-MBA Dual Diploma: blank slate, user adds subjects (Year 1 IUS / Year 2 HWG LU)
    if (isHWGMBABlankSlate) {
      return [];
    }

    // Load fresh subjects from curriculum
    const mandatoryCourses = getSemesterMandatoryCourses(activeBranchId, activeDegreeId, semId).map((course) => ({
      name: formatCourseName(course.id, course.name),
      code: course.id,
      items: [
        { id: `${course.id}-1`, name: "Midterm", score: null, weight: null, type: "midterm" as const },
        { id: `${course.id}-2`, name: "Quiz 1", score: null, weight: null, type: "quiz" as const },
        { id: `${course.id}-3`, name: "Quiz 2", score: null, weight: null, type: "quiz" as const },
        { id: `${course.id}-4`, name: "Final", score: null, weight: null, type: "final" as const },
      ],
    }));

    const electiveCount = getSemesterElectiveCount(activeBranchId, activeDegreeId, semId);
    const foreignLanguageLevel = getSemesterForeignLanguageElective(activeBranchId, activeDegreeId, semId);
    const slotLabels = getElectiveSlotLabels(activeBranchId, activeDegreeId, semId);
    
    const electives = Array.from({ length: electiveCount }, (_, i) => ({
      name: slotLabels[i] ?? `Elective ${i + 1}`,
      code: `ELEC-${i + 1}`,
      items: [
        { id: `ELEC-${i + 1}-1`, name: "Midterm", score: null, weight: null, type: "midterm" as const },
        { id: `ELEC-${i + 1}-2`, name: "Quiz 1", score: null, weight: null, type: "quiz" as const },
        { id: `ELEC-${i + 1}-3`, name: "Quiz 2", score: null, weight: null, type: "quiz" as const },
        { id: `ELEC-${i + 1}-4`, name: "Final", score: null, weight: null, type: "final" as const },
      ],
    }));

    // Add foreign language elective if required
    if (foreignLanguageLevel) {
      const foreignLangElective: SubjectData = {
        name: getDefaultForeignLanguageName(foreignLanguageLevel),
        code: `FLANG-${foreignLanguageLevel}`,
        items: [
          { id: `FLANG-${foreignLanguageLevel}-1`, name: "Midterm", score: null, weight: null, type: "midterm" as const },
          { id: `FLANG-${foreignLanguageLevel}-2`, name: "Quiz 1", score: null, weight: null, type: "quiz" as const },
          { id: `FLANG-${foreignLanguageLevel}-3`, name: "Quiz 2", score: null, weight: null, type: "quiz" as const },
          { id: `FLANG-${foreignLanguageLevel}-4`, name: "Final", score: null, weight: null, type: "final" as const },
        ],
      };
      return [...mandatoryCourses, ...electives, foreignLangElective];
    }

    return [...mandatoryCourses, ...electives];
  };

  const [subjects, setSubjects] = useState<SubjectData[]>(() =>
    loadSubjectsForSemester(currentSemesterId || "")
  );
  const [nextId, setNextId] = useState(initialSubjectsFromFENS.length * 4 + 1);

  useEffect(() => {
    if (!isAuthenticated || !activeBranchId || !activeDegreeId || !currentSemesterId) return;
    api.getSubjectList(activeBranchId, activeDegreeId, currentSemesterId).then((list) => {
      if (list === null) return;
      if (list.length === 0) return;
      setSubjects(list);
    }).catch((err) => {
      const storageKey = `subjects_${activeBranchId}_${activeDegreeId}_${currentSemesterId}`;
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        try {
          const parsed: SubjectData[] = JSON.parse(cached);
          if (parsed.length > 0) setSubjects(parsed);
        } catch { /* corrupt cache, ignore */ }
      }
      showError(err instanceof Error ? err.message : "Couldn't load grades.");
    });
  }, [isAuthenticated, activeBranchId, activeDegreeId, currentSemesterId, showError]);

  useEffect(() => {
    if (!activeBranchId || !activeDegreeId) return;
    const semesters = isCustomSetup
      ? Array.from({ length: customSemesterCount }, (_, i) => String(i + 1))
      : getAvailableSemesters(activeBranchId, activeDegreeId, phdSemesterCount);
    if (semesters.length === 0) return;

    if (!currentSemesterId || !semesters.includes(currentSemesterId)) {
      const fallbackSemester = semesters[0];
      setCurrentSemesterId(fallbackSemester);
      localStorage.setItem("sis.semester", fallbackSemester);
      setSubjects(loadSubjectsForSemester(fallbackSemester));
    }
  }, [activeBranchId, activeDegreeId, currentSemesterId, isAuthenticated, phdSemesterCount, customSemesterCount, isCustomSetup]);

  // Focus editable title and place cursor at end (no jump)
  useEffect(() => {
    if (!editingSubjectName || !editInputRef.current) return;

    const editableEl = editInputRef.current;
    const desiredText = editingSubjectNewName === "" ? "\u200B" : editingSubjectNewName;

    if (editableEl.textContent !== desiredText) {
      editableEl.textContent = desiredText;
    }

    try {
      editableEl.focus({ preventScroll: true });
    } catch {
      editableEl.focus();
    }

    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(editableEl);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [editingSubjectName, editingSubjectNewName, subjects, isUnnamedElective]);

  useEffect(() => {
    if (!activeBranchId || !activeDegreeId || !currentSemesterId) return;
    const storageKey = `subjects_${activeBranchId}_${activeDegreeId}_${currentSemesterId}`;
    if (subjects.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(subjects));
    }
    if (isAuthenticated) {
      if (subjectListSaveTimeoutRef.current != null) window.clearTimeout(subjectListSaveTimeoutRef.current);
      subjectListSaveTimeoutRef.current = window.setTimeout(() => {
        subjectListSaveTimeoutRef.current = null;
        api.putSubjectList(activeBranchId, activeDegreeId, currentSemesterId, subjects).catch((err) => {
          showError(err instanceof Error ? err.message : "Couldn't save grades.");
        });
      }, SUBJECT_LIST_SAVE_DEBOUNCE_MS);
    }
    return () => {
      if (subjectListSaveTimeoutRef.current != null) window.clearTimeout(subjectListSaveTimeoutRef.current);
    };
  }, [subjects, activeBranchId, activeDegreeId, currentSemesterId, isAuthenticated, showError]);

  useEffect(() => {
    document.querySelector(".contentFade")?.classList.remove("fade-out");
    const enterTimeout = window.setTimeout(() => setIsEntering(false), 520);
    return () => {
      clearTimeout(enterTimeout);
      if (undoTimeoutId) {
        clearTimeout(undoTimeoutId);
      }
    };
  }, [undoTimeoutId]);

  useEffect(() => {
    if (!overviewMode && pendingScrollSubject) {
      const el = subjectRefs.current[pendingScrollSubject];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setPendingScrollSubject(null);
    }
  }, [overviewMode, pendingScrollSubject]);

  function scheduleUndoCleanup() {
    setShowUndoPopup(true);
    if (undoTimeoutId) {
      clearTimeout(undoTimeoutId);
    }

    const timeoutId = window.setTimeout(() => {
      setShowUndoPopup(false);
      setDeletedActions([]);
    }, 4000);

    setUndoTimeoutId(timeoutId);
  }

  function handleSemesterChange(newSemesterId: string) {
    const newSubjects = loadSubjectsForSemester(newSemesterId);
    setSubjects(newSubjects);
    setCurrentSemesterId(newSemesterId);
    localStorage.setItem("sis.semester", newSemesterId);
    if (isAuthenticated) api.putProfile({ semesterId: newSemesterId }).catch((err) => {
      showError(err instanceof Error ? err.message : "Couldn't save semester.");
    });
    setShowSemesterDropdown(false);
  }

  const baseAvailableSemesters = activeBranchId && activeDegreeId
    ? isCustomSetup
      ? Array.from({ length: customSemesterCount }, (_, i) => String(i + 1))
      : getAvailableSemesters(activeBranchId, activeDegreeId, phdSemesterCount)
    : [];

  const isHWGMBADegree = activeBranchId === "HWG-MBA" && activeDegreeId === "master-2y";
  const availableSemesters = isHWGMBADegree
    ? hwgLocation === "IUS"
      ? baseAvailableSemesters.filter((s) => s === "1" || s === "2")
      : baseAvailableSemesters.filter((s) => s === "3" || s === "4")
    : baseAvailableSemesters;

  // When HWG-MBA and location changes, or current semester not in list, switch to first available
  useEffect(() => {
    if (!isHWGMBADegree) return;
    if (!availableSemesters.includes(currentSemesterId ?? "")) {
      const first = availableSemesters[0];
      if (first) {
        setCurrentSemesterId(first);
        const newSubjects = loadSubjectsForSemester(first);
        setSubjects(newSubjects);
        localStorage.setItem("sis.semester", first);
        if (isAuthenticated) api.putProfile({ semesterId: first }).catch((err) => {
          showError(err instanceof Error ? err.message : "Couldn't save semester.");
        });
      }
    }
  }, [isHWGMBADegree, hwgLocation, availableSemesters, currentSemesterId, isAuthenticated, showError]);

  // Close dropdowns when clicking anywhere
  useEffect(() => {
    const handleClickOutside = () => {
      if (showSemesterDropdown) setShowSemesterDropdown(false);
      if (showBranchDropdown) setShowBranchDropdown(false);
      if (showHwgLocationDropdown) setShowHwgLocationDropdown(false);
    };

    if (showSemesterDropdown || showBranchDropdown || showHwgLocationDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSemesterDropdown, showBranchDropdown, showHwgLocationDropdown]);

  function calculateTotalGrade(items: GradeItem[]): number {
    const totalWeight = items.reduce(
      (sum, item) => sum + (item.score !== null && item.weight !== null ? item.weight : 0),
      0
    );
    if (totalWeight === 0) return 0;
    const weightedSum = items.reduce(
      (sum, item) => sum + (item.score !== null && item.weight !== null ? item.score * item.weight : 0),
      0
    );
    return weightedSum / totalWeight;
  }

  function calculateOverallGPA(): number {
    if (subjects.length === 0) return 0;
    
    let totalCoefficient = 0;
    let validCount = 0;
    
    subjects.forEach(subject => {
      const totalGrade = calculateTotalGrade(subject.items);
      const hasScore = hasAnyScore(subject.items);
      if (hasScore) {
        const letterGrade = getLetterGrade(totalGrade);
        const coefficient = getCoefficient(letterGrade);
        totalCoefficient += coefficient;
        validCount += 1;
      }
    });
    
    return validCount > 0 ? totalCoefficient / validCount : 0;
  }

  function clampScoreOrWeight(v: number): number {
    if (Number.isNaN(v) || !Number.isFinite(v)) return 0;
    return Math.max(0, Math.min(100, v));
  }

  /** Keep only digits and at most one decimal point. Allow comma as decimal separator (e.g. mobile locales). */
  function sanitizeNumericInput(s: string): string {
    const withDot = s.replace(/,/g, ".");
    const digitsAndDot = withDot.replace(/[^0-9.]/g, "");
    const idx = digitsAndDot.indexOf(".");
    if (idx === -1) return digitsAndDot;
    return digitsAndDot.slice(0, idx + 1) + digitsAndDot.slice(idx + 1).replace(/\./g, "");
  }

  function clearEditingNumericFor(subjectName: string, itemId: string, field: "score" | "weight") {
    setEditingNumeric((prev) =>
      prev && prev.subjectName === subjectName && prev.itemId === itemId && prev.field === field ? null : prev
    );
  }

  function handleScoreOrWeightChange(
    subjectName: string,
    itemId: string,
    field: "score" | "weight",
    raw: string
  ) {
    const sanitized = sanitizeNumericInput(raw);
    if (sanitized === "") {
      clearEditingNumericFor(subjectName, itemId, field);
      updateItem(subjectName, itemId, field, null);
      return;
    }
    if (sanitized.endsWith(".")) {
      setEditingNumeric({ subjectName, itemId, field, value: sanitized });
      return;
    }
    const n = Number(sanitized);
    clearEditingNumericFor(subjectName, itemId, field);
    updateItem(subjectName, itemId, field, Number.isNaN(n) ? null : clampScoreOrWeight(n));
  }

  function handleScoreOrWeightBlur(subjectName: string, itemId: string, field: "score" | "weight") {
    const key = editingNumeric && editingNumeric.subjectName === subjectName && editingNumeric.itemId === itemId && editingNumeric.field === field ? editingNumeric : null;
    if (key) {
      const s = key.value;
      const n = s === "" || s === "." ? null : Number(s);
      clearEditingNumericFor(subjectName, itemId, field);
      updateItem(subjectName, itemId, field, n === null || Number.isNaN(n) ? null : clampScoreOrWeight(n));
    }
  }

  function updateItem(subjectName: string, itemId: string, field: "score" | "weight" | "name", value: number | string | null) {
    let finalValue: number | string | null = value;
    if (field === "score" || field === "weight") {
      if (value === null || value === "") {
        finalValue = null;
      } else if (typeof value === "number") {
        finalValue = clampScoreOrWeight(value);
      } else if (typeof value === "string" && value.trim() === "") {
        finalValue = null;
      } else {
        const n = Number(value);
        finalValue = Number.isNaN(n) ? null : clampScoreOrWeight(n);
      }
    }
    setSubjects(
      subjects.map((subject) =>
        subject.name === subjectName
          ? {
              ...subject,
              items: subject.items.map((item) =>
                item.id === itemId ? { ...item, [field]: finalValue } : item
              ),
            }
          : subject
      )
    );
  }

  function removeItem(subjectName: string, itemId: string) {
    const subject = subjects.find((s) => s.name === subjectName);
    if (!subject) return;
    const itemIndex = subject.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;
    const item = subject.items[itemIndex];

    setDeletedActions((prev) => [...prev, { type: "item", subjectName, item, index: itemIndex }]);

    setSubjects(
      subjects.map((s) =>
        s.name === subjectName
          ? { ...s, items: s.items.filter((existing) => existing.id !== itemId) }
          : s
      )
    );

    scheduleUndoCleanup();
  }

  function removeSubject(subjectName: string) {
    const index = subjects.findIndex(s => s.name === subjectName);
    if (index === -1) return;
    
    const subject = subjects[index];
    setDeletedActions((prev) => [...prev, { type: "subject", subject, index }]);
    setSubjects(subjects.filter((s) => s.name !== subjectName));
    scheduleUndoCleanup();
  }

  function resetSubject(subjectName: string) {
    setSubjects(
      subjects.map((subject) =>
        subject.name === subjectName
          ? {
              ...subject,
              items: subject.items.map((item) => ({ ...item, score: null, weight: null })),
            }
          : subject
      )
    );
    setResetSubjectName(null);
  }

  function resetSemester() {
    if (!currentSemesterId || !activeBranchId || !activeDegreeId) return;
    const storageKey = `subjects_${activeBranchId}_${activeDegreeId}_${currentSemesterId}`;
    localStorage.removeItem(storageKey);
    const freshSubjects = loadSubjectsForSemester(currentSemesterId);
    setSubjects(freshSubjects);
    setShowResetSemesterConfirm(false);
  }

  function undoLastDelete() {
    setDeletedActions((prev) => {
      if (prev.length === 0) return prev;
      const lastAction = prev[prev.length - 1];
      const remaining = prev.slice(0, -1);

      if (lastAction.type === "subject") {
        const newSubjects = [...subjects];
        newSubjects.splice(lastAction.index, 0, lastAction.subject);
        setSubjects(newSubjects);
      } else {
        setSubjects(
          subjects.map((subject) => {
            if (subject.name !== lastAction.subjectName) return subject;
            const newItems = [...subject.items];
            newItems.splice(lastAction.index, 0, lastAction.item);
            return { ...subject, items: newItems };
          })
        );
      }

      if (remaining.length === 0) {
        setShowUndoPopup(false);
        if (undoTimeoutId) {
          clearTimeout(undoTimeoutId);
          setUndoTimeoutId(null);
        }
      }

      return remaining;
    });
  }

  function addItem(subjectName: string) {
    if (addingObjectName.trim()) {
      const newItem: GradeItem = {
        id: `item-${nextId}`,
        name: addingObjectName.trim().slice(0, OBJECT_NAME_MAX_LENGTH),
        score: null,
        weight: null,
        type: "activity",
      };

      setSubjects(
        subjects.map((subject) =>
          subject.name === subjectName ? { ...subject, items: [...subject.items, newItem] } : subject
        )
      );
      setNextId(nextId + 1);
      setAddingObjectFor(null);
      setAddingObjectName("");
    }
  }

  function saveEditingItemName(subjectName: string, itemId: string) {
    if (editingItemName.trim()) {
      setSubjects(
        subjects.map((subject) =>
          subject.name === subjectName
            ? {
                ...subject,
                items: subject.items.map((item) =>
                  item.id === itemId ? { ...item, name: editingItemName.trim().slice(0, OBJECT_NAME_MAX_LENGTH) } : item
                ),
              }
            : subject
        )
      );
    }
    setEditingItemId(null);
    setEditingItemName("");
  }

  function saveEditingSubjectName(oldName: string, overrideName?: string) {
    const newName = (overrideName ?? editingSubjectNewName).trim();
    if (newName && newName !== oldName) {
      // Check if name already exists
      const nameExists = subjects.some(s => s.name === newName && s.name !== oldName);
      if (!nameExists) {
        setSubjects(
          subjects.map((subject) =>
            subject.name === oldName ? { ...subject, name: newName } : subject
          )
        );
        // Mark this elective as named
        if (oldName.startsWith("Elective")) {
          setNamedElectives(prev => new Set(prev).add(newName));
        }
      }
    }
    setEditingSubjectName(null);
    setEditingSubjectNewName("");
  }

  function handleAddSubject() {
    if (addingSubjectName.trim()) {
      const name = addingSubjectName.trim();
      setSubjects([
        ...subjects,
        {
          name,
          items: [
            { id: `${name}-1`, name: "Midterm", score: null, weight: null, type: "midterm" as const },
            { id: `${name}-2`, name: "Quiz 1", score: null, weight: null, type: "quiz" as const },
            { id: `${name}-3`, name: "Quiz 2", score: null, weight: null, type: "quiz" as const },
            { id: `${name}-4`, name: "Final", score: null, weight: null, type: "final" as const },
          ],
        },
      ]);
      setAddingSubjectName("");
      setIsAddingSubject(false);
    }
  }

  function handleDragStart(e: React.DragEvent, index: number) {
    setDraggedIndex(index);
    const target = e.currentTarget as HTMLElement;
    const clone = target.cloneNode(true) as HTMLElement;
    clone.classList.remove('dragging');
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '0';
    clone.style.opacity = '1';
    clone.style.backgroundColor = '#ffffff';
    clone.style.border = '2px solid #7bccac';
    clone.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
    clone.style.width = target.offsetWidth + 'px';
    // Force all child elements to be fully opaque
    clone.querySelectorAll('*').forEach((el: Element) => {
      (el as HTMLElement).style.opacity = '1';
    });
    document.body.appendChild(clone);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(clone, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    requestAnimationFrame(() => {
      if (clone.parentNode) document.body.removeChild(clone);
    });
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSubjects = [...subjects];
    const draggedSubject = newSubjects[draggedIndex];
    newSubjects.splice(draggedIndex, 1);
    newSubjects.splice(index, 0, draggedSubject);

    setSubjects(newSubjects);
    setDraggedIndex(index);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
  }

  function handleItemDragStart(e: React.DragEvent, subjectName: string, itemId: string) {
    setDraggedItemId(itemId);
    setDraggedItemSubject(subjectName);
    
    const target = e.currentTarget as HTMLElement;
    const clone = target.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '0';
    clone.style.opacity = '1';
    clone.style.backgroundColor = '#f0f9f5';
    clone.style.borderRadius = '6px';
    clone.style.boxShadow = '0 4px 12px rgba(123, 204, 172, 0.3)';
    clone.style.width = target.offsetWidth + 'px';
    clone.querySelectorAll('*').forEach((el: Element) => {
      (el as HTMLElement).style.opacity = '1';
    });
    document.body.appendChild(clone);
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(clone, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    
    requestAnimationFrame(() => {
      if (clone.parentNode) document.body.removeChild(clone);
    });
  }

  function handleItemDragOver(e: React.DragEvent, subjectName: string, targetItemId: string) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedItemId || !draggedItemSubject || draggedItemSubject !== subjectName || draggedItemId === targetItemId) return;

    setSubjects(subjects.map(subject => {
      if (subject.name !== subjectName) return subject;
      
      const items = [...subject.items];
      const draggedIdx = items.findIndex(item => item.id === draggedItemId);
      const targetIdx = items.findIndex(item => item.id === targetItemId);
      
      if (draggedIdx === -1 || targetIdx === -1) return subject;
      
      const [draggedItem] = items.splice(draggedIdx, 1);
      items.splice(targetIdx, 0, draggedItem);
      
      return { ...subject, items };
    }));
  }

  function handleItemDragEnd() {
    setDraggedItemId(null);
    setDraggedItemSubject(null);
  }

  const legendGrades: LetterGrade[] = ["A", "A-", "B+", "B", "B-", "C+", "C", "E"];
  const passCutoff = getMinScoreForGrade("C");
  
  // PhD programs: enable elective autocomplete for ALL subjects (no ELEC- filter)
  const isPhdProgram = activeDegreeId === "phd" || activeDegreeId === "phd-ib" || activeDegreeId === "phd-fin";
  const isMedBlankSlate = isMedBlankSlateSemester(activeBranchId ?? "", activeDegreeId ?? "", currentSemesterId ?? null);
  const isIULawBlankSlate = isIULawBlankSlateSemester(activeBranchId ?? "", activeDegreeId ?? "", currentSemesterId ?? null);
  const isMEMasterBlankSlate = isMEMasterBlankSlateSemester(activeBranchId ?? "", activeDegreeId ?? "", currentSemesterId ?? null);
  const isIEMasterBlankSlate = isIEMasterBlankSlateSemester(activeBranchId ?? "", activeDegreeId ?? "", currentSemesterId ?? null);
  const isCSEMasterBlankSlate = isCSEMasterBlankSlateSemester(activeBranchId ?? "", activeDegreeId ?? "", currentSemesterId ?? null);
  const isSEMasterBlankSlate = isSEMasterBlankSlateSemester(activeBranchId ?? "", activeDegreeId ?? "", currentSemesterId ?? null);
  const isECONMasterBlankSlate = isECONMasterBlankSlateSemester(activeBranchId ?? "", activeDegreeId ?? "", currentSemesterId ?? null);
  const isHWGMBABlankSlate = isHWGMBABlankSlateSemester(activeBranchId ?? "", activeDegreeId ?? "", currentSemesterId ?? null);
  const showSemesterManagement = isPhdProgram || isCustomSetup;
  const managedSemesterCount = isPhdProgram ? phdSemesterCount : customSemesterCount;

  async function handleAddManagedSemester() {
    const newCount = managedSemesterCount + 1;
    if (isPhdProgram) {
      setPhdSemesterCount(newCount);
      localStorage.setItem(PHD_SEMESTER_COUNT_KEY, String(newCount));
      if (isAuthenticated) {
        try {
          await api.putProfile({ phdSemesterCount: newCount });
        } catch (err) {
          showError(err instanceof Error ? err.message : "Couldn't save settings.");
        }
      }
      return;
    }
    if (isCustomSetup) {
      setCustomSemesterCount(newCount);
    }
  }

  async function handleRemoveManagedSemester() {
    const newCount = Math.max(1, managedSemesterCount - 1);
    if (isPhdProgram) {
      setPhdSemesterCount(newCount);
      localStorage.setItem(PHD_SEMESTER_COUNT_KEY, String(newCount));
      if (isAuthenticated) {
        try {
          await api.putProfile({ phdSemesterCount: newCount });
        } catch (err) {
          showError(err instanceof Error ? err.message : "Couldn't save settings.");
        }
      }
    }
    if (isCustomSetup) {
      setCustomSemesterCount(newCount);
    }
    if (currentSemesterId && parseInt(currentSemesterId) > newCount) {
      handleSemesterChange(String(newCount));
    }
  }
  
  const electiveOptions = getElectiveOptions(activeBranchId, activeDegreeId, currentSemesterId);
  const foreignLanguageLevel =
    activeBranchId && activeDegreeId && currentSemesterId
      ? getSemesterForeignLanguageElective(activeBranchId, activeDegreeId, currentSemesterId)
      : undefined;
  
  // Determine which elective options to show based on what's being edited
  const editingSubject = subjects.find((s) => s.name === editingSubjectName);
  const isEditingForeignLang = editingSubject?.code?.startsWith("FLANG-");
  const availableOptions = isEditingForeignLang && foreignLanguageLevel
    ? getForeignLanguageOptions(foreignLanguageLevel)
    : (currentSemesterId ? electiveOptions : []);
  
  const electiveQuery = editingSubjectNewName.trim().toLowerCase();
  const filteredElectives = availableOptions.filter((name: string) =>
    name.toLowerCase().includes(electiveQuery)
  );
  // Show more options for clinical/internship years (4th/5th/6th) so the full elective list appears in the dropdown
  const electiveLimit = currentSemesterId && ["7", "8", "9"].includes(currentSemesterId) ? 32 : 8;
  const limitedElectives = filteredElectives.slice(0, electiveLimit);

  // Slot-specific labels for elective/FL cards so faded placeholder shows "Elective Course 4", "Spoken Language IV", etc.
  const electiveSlotLabels = (activeBranchId && activeDegreeId && currentSemesterId)
    ? getElectiveSlotLabels(activeBranchId, activeDegreeId, currentSemesterId)
    : [];
  const getElectiveDisplayLabel = (subject: SubjectData): string | null => {
    if (!subject.code) return null;
    if (subject.code.startsWith("ELEC-")) {
      const n = parseInt(subject.code.replace("ELEC-", ""), 10);
      return electiveSlotLabels[n - 1] ?? null;
    }
    if (subject.code.startsWith("FLANG-")) {
      const level = subject.code.replace("FLANG-", "") as "I" | "II";
      return getDefaultForeignLanguageName(level);
    }
    return null;
  };
  const isElectiveStyleCard = (subject: SubjectData) =>
    subject.code?.startsWith("ELEC-") || subject.code?.startsWith("FLANG-");
  const showElectiveAsPlaceholder = (subject: SubjectData) => {
    if (!isElectiveStyleCard(subject)) return false;
    const slotLabel = getElectiveDisplayLabel(subject);
    return slotLabel != null && (subject.name === slotLabel || isUnnamedElective(subject.name));
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left"><TopbarBranding /></div>

        {currentSemesterId && (availableSemesters.length > 1 || showSemesterManagement) && (
          <div className="semester-dropdown-wrapper-desktop">
            <button 
              className="topbar-center semester-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowBranchDropdown(false);
                setShowHwgLocationDropdown(false);
                setShowSemesterDropdown(!showSemesterDropdown);
              }}
              aria-expanded={showSemesterDropdown}
              aria-haspopup="listbox"
            >
              {getSemesterDisplayName(currentSemesterId)} <span className="sem-arrow" aria-hidden />
            </button>
            {showSemesterDropdown && (
              <div className="semester-dropdown-portal">
                {availableSemesters.map((sem) => (
                  <button
                    key={sem}
                    className={`semester-option ${sem === currentSemesterId ? 'active' : ''}`}
                    onClick={() => handleSemesterChange(sem)}
                  >
                    {getSemesterDisplayName(sem)}
                  </button>
                ))}
                {showSemesterManagement && (
                  <>
                    <div className="semester-divider" aria-hidden />
                    <button
                      className="semester-option semester-action-add"
                      onClick={(e) => {
                        e.stopPropagation();
                        void handleAddManagedSemester();
                      }}
                    >
                      + Add Semester
                    </button>
                    {managedSemesterCount > 1 && (
                      <button
                        className="semester-option semester-action-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          void handleRemoveManagedSemester();
                        }}
                      >
                        − Remove Last Semester
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
        {currentSemesterId && availableSemesters.length <= 1 && !showSemesterManagement && (
          <div className="topbar-center">{getSemesterDisplayName(currentSemesterId)}</div>
        )}

        <div className="topbar-right"><TopbarAuth /></div>
      </header>

      <main className={`contentFade dashboardLayout${isEntering ? " dashboard-enter" : ""}${overviewMode ? " dashboardOverview" : ""}`}>
        <div className="dashboardGPAFloat" aria-live="polite">
          Current GPA: <span className="dashboardGPAFloatValue">{calculateOverallGPA().toFixed(2)}</span>
        </div>
        <button
          className={`overviewToggleBtn${overviewMode ? " active" : ""}`}
          onClick={() => setOverviewMode((v) => !v)}
          aria-label={overviewMode ? "Exit overview" : "Show overview"}
          title={overviewMode ? "Exit overview" : "Show overview"}
        >
          {overviewMode ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          )}
        </button>
        <div className="dashboardHeader">
          <div className="dashboardHeaderContent">
            <span className="dashboardFaculty">
              <div className="branch-dropdown-wrapper">
                <button 
                  className="branchInfo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSemesterDropdown(false);
                    setShowHwgLocationDropdown(false);
                    setShowBranchDropdown(!showBranchDropdown);
                  }}
                  aria-expanded={showBranchDropdown}
                  aria-haspopup="menu"
                >
                  {branch === "Custom Setup" ? (
                    <>Custom Setup <span className="branch-arrow" aria-hidden /></>
                  ) : (
                    <><span className="branch-trigger-label">{displayBranchName}: </span><span className="branch-trigger-suffix">{facultyCode} <span className="branch-arrow" aria-hidden /></span></>
                  )}
                </button>
                {showBranchDropdown && (
                  <div className="branch-dropdown-portal">
                    <button
                      className="branch-option"
                      onClick={() => {
                        document.querySelector(".contentFade")?.classList.add("fade-out");
                        setTimeout(() => {
                          navigate("/faculty", { state: { fromDashboard: true } });
                          setShowBranchDropdown(false);
                        }, 250);
                      }}
                    >
                      Change Faculty
                    </button>
                    {!isCustomSetup && facultyCode === "DDP" && (
                      <button
                        className="branch-option"
                        onClick={() => {
                          document.querySelector(".contentFade")?.classList.add("fade-out");
                          setTimeout(() => {
                            navigate("/branches", { state: { fromDashboard: true } });
                            setShowBranchDropdown(false);
                          }, 250);
                        }}
                      >
                        Change University
                      </button>
                    )}
                    {!isCustomSetup && (
                      <button
                        className="branch-option"
                        onClick={() => {
                          document.querySelector(".contentFade")?.classList.add("fade-out");
                          setTimeout(() => {
                            const isDDP = facultyCode === "DDP";
                            const partnerId =
                              activeBranchId?.startsWith("ITU-")
                                ? "ITU"
                                : activeBranchId?.startsWith("IU-")
                                  ? "IU"
                                  : activeBranchId?.startsWith("MU-")
                                    ? "MU"
                                    : activeBranchId?.startsWith("HWG-")
                                      ? "HWG"
                                      : null;
                            navigate(
                              isDDP && partnerId
                                ? `/branches/dual/${partnerId}`
                                : "/branches",
                              { state: { fromDashboard: true } }
                            );
                            setShowBranchDropdown(false);
                          }, 250);
                        }}
                      >
                        Change Branch
                      </button>
                    )}
                    {!isCustomSetup && (
                      <button
                        className="branch-option"
                        onClick={() => {
                          document.querySelector(".contentFade")?.classList.add("fade-out");
                          setTimeout(() => {
                            navigate("/degree", {
                              state: { branchId: activeBranchId, fromDashboard: true },
                            });
                            setShowBranchDropdown(false);
                          }, 250);
                        }}
                      >
                        Change Program
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="semester-dropdown-wrapper">
                {currentSemesterId && (availableSemesters.length > 1 || showSemesterManagement) && (
                  <button 
                    className="mobile-sem-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBranchDropdown(false);
                      setShowHwgLocationDropdown(false);
                      setShowSemesterDropdown(!showSemesterDropdown);
                    }}
                    aria-expanded={showSemesterDropdown}
                    aria-haspopup="listbox"
                  >
                    {getSemesterDisplayName(currentSemesterId)} <span className="sem-arrow-mobile" aria-hidden />
                  </button>
                )}
                {currentSemesterId && availableSemesters.length <= 1 && !showSemesterManagement && (
                  <span className="semesterInfoMobile">{getSemesterDisplayName(currentSemesterId)}</span>
                )}
                {showSemesterDropdown && (
                  <div className="semester-dropdown-portal">
                    {availableSemesters.map((sem) => (
                      <button
                        key={sem}
                        className={`semester-option ${sem === currentSemesterId ? 'active' : ''}`}
                        onClick={() => handleSemesterChange(sem)}
                      >
                        {getSemesterDisplayName(sem)}
                      </button>
                    ))}
                    {showSemesterManagement && (
                      <>
                        <div className="semester-divider" aria-hidden />
                        <button
                          className="semester-option semester-action-add"
                          onClick={(e) => {
                            e.stopPropagation();
                            void handleAddManagedSemester();
                          }}
                        >
                          + Add Semester
                        </button>
                        {managedSemesterCount > 1 && (
                          <button
                            className="semester-option semester-action-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleRemoveManagedSemester();
                            }}
                          >
                            − Remove Last Semester
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
              {isHWGMBADegree && (
                <div className="hwg-location-dropdown-wrapper">
                  <button
                    type="button"
                    className="hwg-location-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSemesterDropdown(false);
                      setShowBranchDropdown(false);
                      setShowHwgLocationDropdown(!showHwgLocationDropdown);
                    }}
                    aria-expanded={showHwgLocationDropdown}
                    aria-haspopup="menu"
                  >
                    {hwgLocation === "IUS" ? "At IUS" : "At HWG LU"} <span className="branch-arrow" aria-hidden />
                  </button>
                  {showHwgLocationDropdown && (
                    <div className="branch-dropdown-portal hwg-location-portal">
                      <button
                        type="button"
                        className={`branch-option ${hwgLocation === "IUS" ? "active" : ""}`}
                        onClick={() => {
                          setHwgLocation("IUS");
                          localStorage.setItem(HWG_LOCATION_KEY, "IUS");
                          setShowHwgLocationDropdown(false);
                        }}
                      >
                        At IUS
                      </button>
                      <button
                        type="button"
                        className={`branch-option ${hwgLocation === "HWG" ? "active" : ""}`}
                        onClick={() => {
                          setHwgLocation("HWG");
                          localStorage.setItem(HWG_LOCATION_KEY, "HWG");
                          setShowHwgLocationDropdown(false);
                        }}
                      >
                        At HWG LU
                      </button>
                    </div>
                  )}
                </div>
              )}
            </span>
            <span className="dashboardGPA">
              Current GPA: <span style={{ color: '#7bccac', fontWeight: '700' }}>{calculateOverallGPA().toFixed(2)}</span>
            </span>
            <div className="dashboardLegendWrap">
              <span className="dashboardLegend">
                <span className="legendTitle">Grade Scale:</span>
                <span className="legendItems">
                  {legendGrades.map((grade) => (
                    <span key={grade} className="legendItem">
                      <span className="legendGrade" style={{ color: getGradeColor(grade) }}>
                        {grade === "C" ? "C (Pass)" : grade === "E" ? "E (Fail)" : grade}
                      </span>
                      <span className="legendScore">
                        {grade === "E" ? ` <${passCutoff}` : ` ${getMinScoreForGrade(grade)}+`}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
              <button
                type="button"
                className="resetSemesterBtn"
                onClick={() => setShowResetSemesterConfirm(true)}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Reset Semester
              </button>
            </div>
          </div>
        </div>

        <div className={`subjectsContainer${overviewMode ? " overviewActive" : ""}`}>
          {overviewMode ? (
            subjects.map((subject) => {
              const totalGrade = calculateTotalGrade(subject.items);
              const hasScore = hasAnyScore(subject.items);
              const letterGrade = hasScore ? getLetterGrade(totalGrade) : '?';
              return (
                <div
                  key={subject.name}
                  className="subjectCard overviewCard"
                  onClick={() => {
                    setOverviewMode(false);
                    setPendingScrollSubject(subject.name);
                  }}
                >
                  <div className="overviewCardTop">
                    <span className="overviewName">{subject.name}</span>
                    <span className="overviewGrade" style={{ color: getGradeColor(letterGrade) }}>{letterGrade}</span>
                    <span className="overviewTotal">{totalGrade.toFixed(1)}</span>
                  </div>
                  <div className="overviewItems">
                    {subject.items.map((item) => (
                      <span key={item.id} className="overviewChip">
                        <span className="overviewChipLabel">{item.name}</span>
                        <span className="overviewChipValue">{item.score !== null ? item.score : '–'}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
          subjects.map((subject, index) => {
            const totalGrade = calculateTotalGrade(subject.items);
            const hasScore = hasAnyScore(subject.items);
            const letterGrade = hasScore ? getLetterGrade(totalGrade) : '?';
            const weightsComplete = areWeightsComplete(subject.items);
            const canPredict = weightsComplete && hasScore;
            const gradePredictions = canPredict ? getGradePredictions(subject.items) : [];
            const predictionGroups = [
              { title: 'A', grades: ['A', 'A-'] },
              { title: 'B', grades: ['B+', 'B', 'B-'] },
              { title: 'C', grades: ['C+', 'C'] },
            ];

            return (
              <div
                key={subject.name}
                ref={(el) => {
                  if (el) {
                    subjectRefs.current[subject.name] = el;
                  }
                }}
                className={`subjectCard expandedCard ${draggedIndex === index ? "dragging" : ""} ${isElectiveStyleCard(subject) ? "electiveCard" : ""}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <div className="cardHeader">
                  <div className="subjectTitleWrapper">
                    {editingSubjectName === subject.name ? (
                      <span
                        ref={editInputRef}
                        className="editSubjectNameEditable"
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck={false}
                        data-placeholder={isElectiveStyleCard(subject) ? (getElectiveDisplayLabel(subject) ?? subject.name) : subject.name}
                        data-empty={editingSubjectNewName === "" ? "true" : "false"}
                        onInput={(e) => {
                          const rawValue = e.currentTarget.textContent ?? "";
                          const cleaned = rawValue.replace(/\u200B/g, "").replace(/\n/g, "");
                          if (cleaned === "") {
                            e.currentTarget.textContent = "\u200B";
                          }
                          setEditingSubjectNewName(cleaned);
                        }}
                        onBlur={() => saveEditingSubjectName(subject.name)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            saveEditingSubjectName(subject.name);
                          }
                          if (e.key === "Escape") {
                            e.preventDefault();
                            setEditingSubjectName(null);
                            setEditingSubjectNewName("");
                          }
                        }}
                        role="textbox"
                        aria-label="Edit subject name"
                      />
                    ) : (
                      <h3
                        onClick={() => {
                          if (showElectiveAsPlaceholder(subject) || isUnnamedElective(subject.name)) {
                            setEditingSubjectName(subject.name);
                            setEditingSubjectNewName("");
                          } else if (preferSingleTapEdit) {
                            setEditingSubjectName(subject.name);
                            setEditingSubjectNewName(subject.name);
                          }
                        }}
                        onDoubleClick={() => {
                          if (!preferSingleTapEdit && !showElectiveAsPlaceholder(subject) && !isUnnamedElective(subject.name)) {
                            setEditingSubjectName(subject.name);
                            setEditingSubjectNewName(subject.name);
                          }
                        }}
                        title={showElectiveAsPlaceholder(subject) || isUnnamedElective(subject.name) ? "Click to choose course" : preferSingleTapEdit ? "Tap to rename" : "Double-click to rename"}
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                        {showElectiveAsPlaceholder(subject) ? (
                          <span style={{ opacity: 0.4, fontStyle: 'italic' }}>
                            {getElectiveDisplayLabel(subject) ?? subject.name}
                          </span>
                        ) : isUnnamedElective(subject.name) ? (
                          <span style={{ opacity: 0.4, fontStyle: 'italic' }}>
                            {subject.name}
                          </span>
                        ) : (
                          subject.name
                        )}
                      </h3>
                    )}

                    {(availableOptions.length > 0 || (isEditingForeignLang && foreignLanguageLevel)) &&
                      editingSubjectName === subject.name &&
                      (isPhdProgram || isMedBlankSlate || isIULawBlankSlate || isMEMasterBlankSlate || isIEMasterBlankSlate || isCSEMasterBlankSlate || isSEMasterBlankSlate || isECONMasterBlankSlate || isHWGMBABlankSlate || isElectiveStyleCard(subject)) &&
                      limitedElectives.length > 0 && (
                        <div className="electiveAutocomplete">
                          {limitedElectives.map((option: string) => (
                            <button
                              key={option}
                              type="button"
                              className="electiveAutocompleteItem"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                setEditingSubjectNewName(option);
                                saveEditingSubjectName(subject.name, option);
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                  <div className="cardHeaderActions">
                    <button
                      type="button"
                      className="resetSubjectBtn"
                      onClick={() => setResetSubjectName(subject.name)}
                      title="Reset subject"
                      aria-label="Reset subject"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                    </button>
                    <button
                      className="deleteSubjectBtn"
                      onClick={() => removeSubject(subject.name)}
                      title="Delete subject"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="gradeItems">
                  {subject.items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`gradeItem ${draggedItemId === item.id ? "dragging" : ""}`}
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation();
                        handleItemDragStart(e, subject.name, item.id);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleItemDragOver(e, subject.name, item.id);
                      }}
                      onDragEnd={handleItemDragEnd}
                      onMouseDown={(e) => {
                        // Prevent drag from starting if clicking on inputs
                        if ((e.target as HTMLElement).tagName === 'INPUT') {
                          e.stopPropagation();
                        }
                      }}
                    >
                      <div className="gradeInputRow">
                        <div className="scoreInput">
                          {editingItemId === item.id ? (
                            <input
                              autoFocus
                              type="text"
                              value={editingItemName}
                              maxLength={OBJECT_NAME_MAX_LENGTH}
                              onChange={(e) => setEditingItemName(e.target.value)}
                              onBlur={() => saveEditingItemName(subject.name, item.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEditingItemName(subject.name, item.id);
                                if (e.key === "Escape") {
                                  setEditingItemId(null);
                                  setEditingItemName("");
                                }
                              }}
                              className="editItemNameInput"
                              title={`Max ${OBJECT_NAME_MAX_LENGTH} characters`}
                            />
                          ) : (
                            <span
                              className="inputLabel"
                              onClick={() => {
                                if (preferSingleTapEdit) {
                                  setEditingItemId(item.id);
                                  setEditingItemName(item.name);
                                }
                              }}
                              onDoubleClick={() => {
                                if (!preferSingleTapEdit) {
                                  setEditingItemId(item.id);
                                  setEditingItemName(item.name);
                                }
                              }}
                              title={preferSingleTapEdit ? "Tap to rename" : "Double-click to rename"}
                            >
                              {item.name}
                            </span>
                          )}
                          <input
                            type="text"
                            inputMode="decimal"
                            placeholder="0"
                            autoComplete="off"
                            value={
                              editingNumeric?.subjectName === subject.name && editingNumeric?.itemId === item.id && editingNumeric?.field === "score"
                                ? editingNumeric.value
                                : (item.score ?? "")
                            }
                            onChange={(e) => handleScoreOrWeightChange(subject.name, item.id, "score", e.target.value)}
                            onBlur={() => handleScoreOrWeightBlur(subject.name, item.id, "score")}
                          />
                        </div>
                        <div className="weightInput">
                          <span className="inputLabel">Weight</span>
                          <div className="weightInputWrapper">
                            <input
                              type="text"
                              inputMode="decimal"
                              placeholder="0"
                              autoComplete="off"
                              value={
                                editingNumeric?.subjectName === subject.name && editingNumeric?.itemId === item.id && editingNumeric?.field === "weight"
                                  ? editingNumeric.value
                                  : (item.weight ?? "")
                              }
                              onChange={(e) => handleScoreOrWeightChange(subject.name, item.id, "weight", e.target.value)}
                              onBlur={() => handleScoreOrWeightBlur(subject.name, item.id, "weight")}
                            />
                            <span className="percentSymbol">%</span>
                          </div>
                        </div>
                        <button
                          className="deleteItemBtn"
                          onClick={() => removeItem(subject.name, item.id)}
                          title="Delete item"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {addingObjectFor === subject.name ? (
                  <div className="objectInputContainer">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Item name (Midterm, Final, Quiz etc.)..."
                      value={addingObjectName}
                      maxLength={OBJECT_NAME_MAX_LENGTH}
                      onChange={(e) => setAddingObjectName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addItem(subject.name);
                        if (e.key === "Escape") {
                          setAddingObjectFor(null);
                          setAddingObjectName("");
                        }
                      }}
                      className="objectNameInput"
                      title={`Max ${OBJECT_NAME_MAX_LENGTH} characters`}
                    />
                    <button onClick={() => addItem(subject.name)} className="addConfirmBtn">✓</button>
                    <button
                      onClick={() => {
                        setAddingObjectFor(null);
                        setAddingObjectName("");
                      }}
                      className="addCancelBtn"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    className="addObjectBtn"
                    onClick={() => setAddingObjectFor(subject.name)}
                  >
                    + Add Object
                  </button>
                )}

                <div className="subjectGradeResult">
                  <div className="gradeResultRow">
                    <span>Total:</span>
                    <span className="gradeValue">{totalGrade.toFixed(2)}</span>
                  </div>
                  <div className="gradeResultRow">
                    <span>Letter Grade:</span>
                    <span className="letterGradeValue" style={{ color: getGradeColor(letterGrade) }}>{letterGrade}{getGradeStatus(letterGrade)}</span>
                  </div>
                </div>
                <div className="gradePrediction">
                  <div className="gradePredictionTitle">
                    Grade prediction (Input all grade weights for prediction to work)
                  </div>
                  <div className="gradePredictionList">
                    {predictionGroups.map((group) => (
                      <div key={group.title} className="gradePredictionColumn">
                        {group.grades.map((g) => {
                          const pred = gradePredictions.find(({ grade }) => grade === g);
                          return (
                            <div key={g} className="gradePredictionRow">
                              <span className="gradePredictionGrade">{g === "C" ? "Pass" : g}</span>
                              <span className="gradePredictionValue">{canPredict && pred ? pred.required : "—"}</span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                {resetSubjectName === subject.name && (
                  <div
                    className="resetSubjectOverlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="resetSubjectOverlayTitle"
                    onClick={() => setResetSubjectName(null)}
                  >
                    <div
                      className="resetSubjectOverlayBackdrop"
                      aria-hidden="true"
                    />
                    <div
                      className="resetSubjectOverlayContent"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p id="resetSubjectOverlayTitle" className="resetSubjectOverlayTitle">
                        Are you sure you want to reset the subject?
                      </p>
                      <p className="resetSubjectOverlaySubtitle">
                        All grades and weights for this subject will be cleared.
                      </p>
                      <div className="resetSubjectOverlayActions">
                        <button
                          type="button"
                          className="resetSubjectOverlayCancel"
                          onClick={() => setResetSubjectName(null)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="resetSubjectOverlayConfirm"
                          onClick={() => resetSubject(subject.name)}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }) )}

          {!overviewMode && isAddingSubject ? (
            <div className="subjectCard expandedCard newSubjectCard">
              <div className="cardHeader" style={{ position: 'relative' }}>
                <input
                  autoFocus
                  type="text"
                  placeholder="Subject name..."
                  value={addingSubjectName}
                  onChange={(e) => setAddingSubjectName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddSubject();
                    if (e.key === "Escape") {
                      setIsAddingSubject(false);
                      setAddingSubjectName("");
                    }
                  }}
                  className="subjectNameInput"
                />
                <button
                  className="deleteSubjectBtn"
                  onClick={() => {
                    setIsAddingSubject(false);
                    setAddingSubjectName("");
                  }}
                  title="Cancel"
                >
                  ✕
                </button>
                
                {(isPhdProgram || isMedBlankSlate || isIULawBlankSlate || isMEMasterBlankSlate || isIEMasterBlankSlate || isCSEMasterBlankSlate || isSEMasterBlankSlate || isECONMasterBlankSlate || isHWGMBABlankSlate) && electiveOptions.length > 0 && addingSubjectName.trim() && (
                  <div className="electiveAutocomplete" style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10 }}>
                    {electiveOptions
                      .filter((option) =>
                        option.toLowerCase().includes(addingSubjectName.toLowerCase())
                      )
                      .slice(0, electiveLimit)
                      .map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="electiveAutocompleteItem"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            const name = option.trim();
                            setSubjects([
                              ...subjects,
                              {
                                name,
                                items: [
                                  { id: `${name}-1`, name: "Midterm", score: null, weight: null, type: "midterm" as const },
                                  { id: `${name}-2`, name: "Quiz 1", score: null, weight: null, type: "quiz" as const },
                                  { id: `${name}-3`, name: "Quiz 2", score: null, weight: null, type: "quiz" as const },
                                  { id: `${name}-4`, name: "Final", score: null, weight: null, type: "final" as const },
                                ],
                              },
                            ]);
                            setAddingSubjectName("");
                            setIsAddingSubject(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              <div className="gradeItems">
                <div className="gradeItem">
                  <div className="gradeInputRow">
                    <div className="scoreInput">
                      <span className="inputLabel">Midterm</span>
                      <input type="number" placeholder="0" disabled />
                    </div>
                    <div className="weightInput">
                      <span className="inputLabel">Weight</span>
                      <div className="weightInputWrapper">
                        <input type="number" placeholder="0" disabled />
                        <span className="percentSymbol">%</span>
                      </div>
                    </div>
                    <button className="deleteItemBtn" disabled>✕</button>
                  </div>
                </div>

                <div className="gradeItem">
                  <div className="gradeInputRow">
                    <div className="scoreInput">
                      <span className="inputLabel">Quiz 1</span>
                      <input type="number" placeholder="0" disabled />
                    </div>
                    <div className="weightInput">
                      <span className="inputLabel">Weight</span>
                      <div className="weightInputWrapper">
                        <input type="number" placeholder="0" disabled />
                        <span className="percentSymbol">%</span>
                      </div>
                    </div>
                    <button className="deleteItemBtn" disabled>✕</button>
                  </div>
                </div>

                <div className="gradeItem">
                  <div className="gradeInputRow">
                    <div className="scoreInput">
                      <span className="inputLabel">Quiz 2</span>
                      <input type="number" placeholder="0" disabled />
                    </div>
                    <div className="weightInput">
                      <span className="inputLabel">Weight</span>
                      <div className="weightInputWrapper">
                        <input type="number" placeholder="0" disabled />
                        <span className="percentSymbol">%</span>
                      </div>
                    </div>
                    <button className="deleteItemBtn" disabled>✕</button>
                  </div>
                </div>

                <div className="gradeItem">
                  <div className="gradeInputRow">
                    <div className="scoreInput">
                      <span className="inputLabel">Final</span>
                      <input type="number" placeholder="0" disabled />
                    </div>
                    <div className="weightInput">
                      <span className="inputLabel">Weight</span>
                      <div className="weightInputWrapper">
                        <input type="number" placeholder="0" disabled />
                        <span className="percentSymbol">%</span>
                      </div>
                    </div>
                    <button className="deleteItemBtn" disabled>✕</button>
                  </div>
                </div>
              </div>

              <button className="addObjectBtn" disabled>+ Add Object</button>

              <div className="subjectGradeResult">
                <div className="gradeResultRow">
                  <span>Total:</span>
                  <span className="gradeValue">0.00</span>
                </div>
                <div className="gradeResultRow">
                  <span>Letter Grade:</span>
                  <span className="letterGradeValue" style={{ color: getGradeColor('?') }}>?</span>
                </div>
              </div>

              <div className="addSubjectActions">
                <button onClick={handleAddSubject} className="addConfirmBtn">✓ Add Subject</button>
                <button onClick={() => {
                  setIsAddingSubject(false);
                  setAddingSubjectName("");
                }} className="addCancelBtn">✕ Cancel</button>
              </div>
            </div>
          ) : null}

          {!overviewMode && !isAddingSubject && (
            <button className="addSubjectBtn" onClick={() => setIsAddingSubject(true)}>
              + Add Subject
            </button>
          )}
        </div>
      </main>
      
      {showResetSemesterConfirm && (
        <div
          className="resetSemesterOverlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowResetSemesterConfirm(false)}
        >
          <div className="resetSemesterOverlayBackdrop" aria-hidden="true" />
          <div className="resetSemesterOverlayContent" onClick={(e) => e.stopPropagation()}>
            <p className="resetSemesterOverlayTitle">Reset entire semester?</p>
            <p className="resetSemesterOverlaySubtitle">
              This will clear all grades, weights, and custom subjects for this semester and restore the default subject list.
            </p>
            <div className="resetSemesterOverlayActions">
              <button
                type="button"
                className="resetSubjectOverlayCancel"
                onClick={() => setShowResetSemesterConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="resetSemesterOverlayConfirmBtn"
                onClick={resetSemester}
              >
                Reset Semester
              </button>
            </div>
          </div>
        </div>
      )}

      {!overviewMode && showUndoPopup && deletedActions.length > 0 && (
        <div className="undoPopup">
          {(() => {
            const lastAction = deletedActions[deletedActions.length - 1];
            const message = lastAction.type === "subject"
              ? `Deleted "${lastAction.subject.name}"`
              : `Deleted "${lastAction.item.name}"`;
            return <span className="undoMessage">{message}</span>;
          })()}
          <button
            className="undoBtn"
            onClick={undoLastDelete}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}



