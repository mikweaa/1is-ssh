import { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { getDegreeSelectionOptions, getAvailableSemesters, getBranchName, getFacultyCodeForBranch, FACULTY_COLORS } from "../utils/curriculum";
import { useAuth } from "../context/AuthContext";
import { useErrorToast } from "../context/ErrorToastContext";
import * as api from "../api/client";
import TopbarAuth from "../components/TopbarAuth";
import type { DegreeSelectionOption } from "../utils/curriculum";

interface LocationState {
  branchId: string;
  fromDashboard?: boolean;
}

type DegreeCategory = "bachelor" | "master-1y" | "master-2y" | "phd";

function getDegreeCategory(id: string): DegreeCategory {
  if (id === "bachelor") return "bachelor";
  if (id.startsWith("phd")) return "phd";
  if (id.includes("2y")) return "master-2y";
  return "master-1y";
}

const SECTION_TITLES: Record<DegreeCategory, string> = {
  bachelor: "Bachelor",
  "master-1y": "Master (1 Year)",
  "master-2y": "Master (2 Year)",
  phd: "PhD",
};

const SECTION_ORDER: DegreeCategory[] = ["bachelor", "master-1y", "master-2y", "phd"];

const LAW_DISTANCE_LEARNING_IDS = new Set([
  "master-1y-public-cyber",
  "master-1y-public-eu",
  "master-1y-private-business",
]);

interface DegreeSection {
  category: string;
  title: string;
  degrees: DegreeSelectionOption[];
}

export default function DegreeTypeSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { showError } = useErrorToast();
  const { branchId, fromDashboard } = (location.state as LocationState) || {};

  useEffect(() => {
    document.querySelector(".contentFade")?.classList.remove("fade-out");
  }, []);

  if (!branchId) {
    return <Navigate to="/branches" replace />;
  }

  const degreeTypes = getDegreeSelectionOptions(branchId);
  const branchName = getBranchName(branchId);
  const facultyCode = getFacultyCodeForBranch(branchId);
  const facultyColor = (facultyCode && FACULTY_COLORS[facultyCode]) || "#4f46e5";

  const sections = useMemo((): DegreeSection[] => {
    const groups: Record<DegreeCategory, DegreeSelectionOption[]> = {
      bachelor: [],
      "master-1y": [],
      "master-2y": [],
      phd: [],
    };
    degreeTypes.forEach((d) => {
      const cat = getDegreeCategory(d.id);
      groups[cat].push(d);
    });

    if (branchId === "LAW" && groups["master-1y"].length > 0) {
      const dlDegrees = groups["master-1y"].filter((d) => LAW_DISTANCE_LEARNING_IDS.has(d.id));
      const onCampus1y = groups["master-1y"].filter((d) => !LAW_DISTANCE_LEARNING_IDS.has(d.id));
      const lawOrder: { category: string; title: string; degrees: DegreeSelectionOption[] }[] = [];
      if (groups.bachelor.length > 0) lawOrder.push({ category: "bachelor", title: SECTION_TITLES.bachelor, degrees: groups.bachelor });
      if (onCampus1y.length > 0) lawOrder.push({ category: "master-1y", title: SECTION_TITLES["master-1y"], degrees: onCampus1y });
      if (dlDegrees.length > 0) lawOrder.push({ category: "distance-learning", title: "Distance Learning Programs", degrees: dlDegrees });
      if (groups["master-2y"].length > 0) lawOrder.push({ category: "master-2y", title: SECTION_TITLES["master-2y"], degrees: groups["master-2y"] });
      if (groups.phd.length > 0) lawOrder.push({ category: "phd", title: SECTION_TITLES.phd, degrees: groups.phd });
      return lawOrder;
    }

    return SECTION_ORDER.filter((cat) => groups[cat].length > 0).map((cat) => ({
      category: cat,
      title: SECTION_TITLES[cat],
      degrees: groups[cat],
    }));
  }, [degreeTypes, branchId]);

  const handleSelectDegree = (degreeId: string) => {
    const selected = degreeTypes.find((degree) => degree.id === degreeId);
    if (selected?.trackOptions && selected.trackOptions.length > 0) {
      document.querySelector(".contentFade")?.classList.add("fade-out");
      window.setTimeout(() => {
        navigate("/track", { state: { branchId, degreeId, fromDashboard } });
      }, 200);
      return;
    }

    localStorage.setItem("sis.degree", degreeId);
    const isPhd = degreeId === "phd" || degreeId === "phd-ib" || degreeId === "phd-fin";
    const phdSemesterCount = isPhd
      ? (() => {
          const stored = localStorage.getItem("sis.phdSemesterCount");
          const n = stored ? Number.parseInt(stored, 10) : Number.NaN;
          return Number.isFinite(n) && n >= 1 ? n : 6;
        })()
      : undefined;
    const semesters = getAvailableSemesters(branchId, degreeId, phdSemesterCount);
    const defaultSemester = semesters[0];
    if (defaultSemester) {
      localStorage.setItem("sis.semester", defaultSemester);
    } else {
      localStorage.removeItem("sis.semester");
    }
    if (isAuthenticated) api.putProfile({ degreeId, semesterId: defaultSemester ?? undefined }).catch((err) => {
      showError(err instanceof Error ? err.message : "Couldn't save selection.");
    });
    document.querySelector(".contentFade")?.classList.add("fade-out");
    window.setTimeout(() => {
      if (semesters.length > 1) {
        navigate("/semester", {
          state: { branchId, degreeId, fromDashboard },
        });
      } else {
        navigate("/dashboard", {
          state: { branchId, degreeId, semesterId: defaultSemester, fromDashboard },
        });
      }
    }, 200);
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
        className="degreeLayout contentFade"
        style={{ ["--faculty-color" as string]: facultyColor }}
      >
        <section className="degreeLeft">
          <div className="degreeLeftInner">
            <span className="degreeTag">{branchId}</span>
            <h1 className="degreeWelcome">{branchName}</h1>
            <p className="degreeIntro">Select your degree type.</p>
          </div>
        </section>

        <section className="degreeRight">
          <div className="degreeSections">
            {sections.map((section) => (
              <div
                key={section.category}
                className={`degreeSection ${section.category === "distance-learning" ? "degreeSectionDL" : ""}`}
              >
                <h2 className="degreeSectionTitle">{section.title}</h2>
                <div className="degreeGrid">
                  {section.degrees.map((degree) => {
                    const idx = cardIdx++;
                    return (
                      <button
                        key={degree.id}
                        className="degreeCard"
                        style={{ animationDelay: `${idx * 0.06}s` }}
                        onClick={() => handleSelectDegree(degree.id)}
                      >
                        <span className="degreeCardName">{degree.name}</span>
                        <span className="degreeCardArrow">&#x203A;</span>
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
