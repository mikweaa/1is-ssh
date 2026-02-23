import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getTrackOptions, getAvailableSemesters, getBranchName, getFacultyCodeForBranch, FACULTY_COLORS } from "../utils/curriculum";
import { useAuth } from "../context/AuthContext";
import { useErrorToast } from "../context/ErrorToastContext";
import * as api from "../api/client";
import TopbarAuth from "../components/TopbarAuth";

interface LocationState {
  branchId: string;
  degreeId: string;
  fromDashboard?: boolean;
}

export default function TrackSelect() {
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

  const trackOptions = getTrackOptions(branchId, degreeId);

  if (trackOptions.length === 0) {
    return <Navigate to="/degree" replace />;
  }

  const branchName = getBranchName(branchId);
  const facultyCode = getFacultyCodeForBranch(branchId);
  const facultyColor = (facultyCode && FACULTY_COLORS[facultyCode]) || "#5a9fd4";

  const handleSelectTrack = (trackDegreeId: string) => {
    localStorage.setItem("sis.degree", trackDegreeId);
    const isPhd = trackDegreeId === "phd" || trackDegreeId === "phd-ib" || trackDegreeId === "phd-fin";
    const phdSemesterCount = isPhd
      ? (() => {
          const stored = localStorage.getItem("sis.phdSemesterCount");
          const n = stored ? Number.parseInt(stored, 10) : Number.NaN;
          return Number.isFinite(n) && n >= 1 ? n : 6;
        })()
      : undefined;
    const semesters = getAvailableSemesters(branchId, trackDegreeId, phdSemesterCount);
    const defaultSemester = semesters[0];
    if (defaultSemester) {
      localStorage.setItem("sis.semester", defaultSemester);
    } else {
      localStorage.removeItem("sis.semester");
    }
    if (isAuthenticated) api.putProfile({ degreeId: trackDegreeId, semesterId: defaultSemester }).catch((err) => {
      showError(err instanceof Error ? err.message : "Couldn't save selection.");
    });
    document.querySelector(".contentFade")?.classList.add("fade-out");
    window.setTimeout(() => {
      if (semesters.length > 1) {
        navigate("/semester", { state: { branchId, degreeId: trackDegreeId, fromDashboard } });
      } else {
        navigate("/dashboard", {
          state: { branchId, degreeId: trackDegreeId, semesterId: defaultSemester, fromDashboard },
        });
      }
    }, 200);
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left">
          <button className="backBtn" onClick={() => navigate(-1)} title="Go back">‹</button>
        </div>
        <div className="topbar-right"><TopbarAuth /></div>
      </header>

      <main
        className="trackLayout contentFade"
        style={{ ["--faculty-color" as string]: facultyColor }}
      >
        <section className="trackLeft">
          <h1 className="trackWelcome">{branchName}</h1>
          <p className="trackIntro">Choose your track below.</p>
        </section>

        <section className="trackRight">
          <div className="trackGrid">
            {trackOptions.map((track, i) => (
              <button
                key={track.id}
                className="trackCard"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => handleSelectTrack(track.degreeId)}
              >
                <span className="trackCardName">{track.name}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
