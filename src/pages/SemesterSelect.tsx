import { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { getAvailableSemesters, getBranchName, getFacultyCodeForBranch, FACULTY_COLORS } from "../utils/curriculum";
import { useAuth } from "../context/AuthContext";
import { useErrorToast } from "../context/ErrorToastContext";
import * as api from "../api/client";
import TopbarAuth from "../components/TopbarAuth";

interface LocationState {
  branchId: string;
  degreeId: string;
  fromDashboard?: boolean;
}

export default function SemesterSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { showError } = useErrorToast();
  const { branchId, degreeId, fromDashboard } = (location.state as LocationState) || {};

  useEffect(() => {
    document.querySelector(".contentFade")?.classList.remove("fade-out");
  }, []);

  if (!branchId || !degreeId) {
    return <Navigate to="/branches" replace />;
  }

  const isPhd = degreeId === "phd" || degreeId === "phd-ib" || degreeId === "phd-fin";
  const phdSemesterCount = isPhd
    ? (() => {
        const stored = localStorage.getItem("sis.phdSemesterCount");
        const n = stored ? Number.parseInt(stored, 10) : Number.NaN;
        return Number.isFinite(n) && n >= 1 ? n : 6;
      })()
    : undefined;
  const semesters = getAvailableSemesters(branchId, degreeId, phdSemesterCount);
  const branchName = getBranchName(branchId);
  const facultyCode = getFacultyCodeForBranch(branchId);
  const facultyColor = (facultyCode && FACULTY_COLORS[facultyCode]) || "#0d9488";

  const semesterGroups = branchId === "MD"
    ? (() => {
        const preclinical = semesters.slice(0, 6).reduce<string[][]>((acc, semester, index) => {
          if (index % 2 === 0) acc.push([semester]);
          else acc[acc.length - 1].push(semester);
          return acc;
        }, []);
        const clinicalYears = semesters.slice(6).map((semester) => [semester]);
        return [...preclinical, ...clinicalYears];
      })()
    : semesters.reduce<string[][]>((acc, semester, index) => {
        if (index % 2 === 0) acc.push([semester]);
        else acc[acc.length - 1].push(semester);
        return acc;
      }, []);

  const handleSelectSemester = (semesterId: string) => {
    localStorage.setItem("sis.semester", semesterId);
    if (isAuthenticated) api.putProfile({ semesterId }).catch((err) => {
      showError(err instanceof Error ? err.message : "Couldn't save selection.");
    });
    document.querySelector(".contentFade")?.classList.add("fade-out");
    window.setTimeout(() => {
      navigate("/dashboard", {
        state: { branchId, degreeId, semesterId, fromDashboard },
      });
    }, 200);
  };

  const getSemesterDisplayName = (semester: string) => {
    if (branchId === "MD" && semester === "7") return "4th Academic Year";
    if (branchId === "MD" && semester === "8") return "5th Academic Year";
    if (branchId === "MD" && semester === "9") return "6th Academic Year";
    return `Semester ${semester}`;
  };

  let cardIdx = 0;

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left">
          <button className="backBtn" onClick={() => navigate(-1)} title="Go back">‹</button>
        </div>
        <div className="topbar-right"><TopbarAuth /></div>
      </header>

      <main
        className="semesterLayout contentFade"
        style={{ ["--faculty-color" as string]: facultyColor }}
      >
        <section className="semesterLeft">
          <div className="semesterLeftInner">
            <span className="semesterTag">{branchId}</span>
            <h1 className="semesterWelcome">{branchName}</h1>
            <p className="semesterIntro">Select your current semester to load the right curriculum.</p>
          </div>
        </section>

        <section className="semesterRight">
          <div className="semesterSections">
            {semesterGroups.map((group, groupIndex) => (
              <div key={`year-${groupIndex}`} className="semesterSection">
                <h2 className="semesterSectionTitle">Year {groupIndex + 1}</h2>
                <div className="semesterGrid">
                  {group.map((semesterId) => {
                    const idx = cardIdx++;
                    return (
                      <button
                        key={semesterId}
                        className="semesterCard"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                        onClick={() => handleSelectSemester(semesterId)}
                      >
                        <span className="semesterCardName">{getSemesterDisplayName(semesterId)}</span>
                        <span className="semesterCardArrow">&#x203A;</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
