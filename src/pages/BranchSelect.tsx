import { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useErrorToast } from "../context/ErrorToastContext";
import * as api from "../api/client";
import TopbarAuth from "../components/TopbarAuth";
import { getFacultyName, getBranchesByFaculty, getBranchId, FACULTY_COLORS } from "../utils/curriculum";

/** Display abbreviation for the branch card badge (id → badge text). */
const BRANCH_BADGE_ABBR: Record<string, string> = {
  ARCH: "ARCH",
  AIDE: "AIDE",
  ELIT: "ELIT",
  VACD: "VACD",
  CULT: "CULT",
  SPS: "PS",
  ECON: "ECON",
  PSIR: "PSIR",
  CEIT: "CEIT",
  MD: "MED",
  DM: "DMED",
};

const DDP_PARTNERS = [
  { id: "ITU", name: "Istanbul Technical University (ITU)" },
  { id: "IU", name: "Istanbul University (IU)" },
  { id: "MU", name: "Marmara University (MU)" },
  { id: "HWG", name: "Hochschule Worms / Ludwigshafen (HWG LU)" },
] as const;

export default function BranchSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { showError } = useErrorToast();
  const facultyCode = localStorage.getItem("sis.faculty");
  const fromDashboard =
    (location.state as { fromDashboard?: boolean } | null)?.fromDashboard || false;

  useEffect(() => {
    document.querySelector(".contentFade")?.classList.remove("fade-out");
  }, []);

  const facultyName = getFacultyName(facultyCode || "");
  if (!facultyCode || facultyName === facultyCode) {
    return <Navigate to="/faculty" replace />;
  }

  const branchMappings = getBranchesByFaculty(facultyCode);
  const isDDP = facultyCode === "DDP";
  const color = FACULTY_COLORS[facultyCode] ?? "#5a9fd4";

  function chooseBranch(branch: string) {
    localStorage.setItem("sis.branch", branch);
    document.querySelector(".contentFade")?.classList.add("fade-out");
    window.setTimeout(() => {
      const branchId = getBranchId(facultyCode || "", branch);
      if (branchId) {
        localStorage.setItem("sis.branchId", branchId);
        if (isAuthenticated) api.putProfile({ branch, branchId }).catch((err) => {
          showError(err instanceof Error ? err.message : "Couldn't save selection.");
        });
        navigate("/degree", { state: { branchId, fromDashboard } });
      } else {
        if (isAuthenticated) api.putProfile({ branch }).catch((err) => {
          showError(err instanceof Error ? err.message : "Couldn't save selection.");
        });
        navigate("/dashboard");
      }
    }, 200);
  }

  function chooseDDPPartner(partnerId: string) {
    document.querySelector(".contentFade")?.classList.add("fade-out");
    window.setTimeout(() => {
      navigate(`/branches/dual/${partnerId}`, { state: { fromDashboard } });
    }, 200);
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left">
          <button
            className="backBtn"
            onClick={() => {
              document.querySelector(".contentFade")?.classList.add("fade-out");
              setTimeout(() => navigate(-1), 200);
            }}
            title="Go back"
          >
            ‹
          </button>
        </div>
        <div className="topbar-right"><TopbarAuth /></div>
      </header>

      <main
        className="branchLayout contentFade"
        style={{ ["--faculty-color" as string]: color }}
      >
        <section className="branchLeft">
          <div className="branchLeftInner">
            <span className="branchTag">{facultyCode}</span>
            <h1 className="branchWelcome">{facultyName}</h1>
            <p className="branchIntro">
              {facultyCode === "FLW"
                ? "Your designated faculty is Law. Choose your option below to proceed."
                : isDDP
                  ? "Choose your partner university, then select your program on the next screen."
                  : "Select your program from the list to load its curriculum."}
            </p>
          </div>
        </section>

        <section className="branchRight">
          {isDDP ? (
            <div className="branchGrid">
              {DDP_PARTNERS.map((p, i) => (
                <button
                  key={p.id}
                  className="branchCard"
                  style={{ animationDelay: `${i * 0.06}s` }}
                  onClick={() => chooseDDPPartner(p.id)}
                >
                  <span className="branchCardBadge">{p.id}</span>
                  <div className="branchCardText">
                    <span className="branchCardName">{p.name}</span>
                  </div>
                  <span className="branchCardArrow">&#x203A;</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="branchGrid">
              {branchMappings.map((b, i) => (
                <button
                  key={b.id}
                  className="branchCard"
                  style={{ animationDelay: `${i * 0.06}s` }}
                  onClick={() => chooseBranch(b.name)}
                >
                  <span className="branchCardBadge">{BRANCH_BADGE_ABBR[b.id] ?? b.id}</span>
                  <div className="branchCardText">
                    <span className="branchCardName">{b.name}</span>
                  </div>
                  <span className="branchCardArrow">&#x203A;</span>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
