import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useErrorToast } from "../context/ErrorToastContext";
import * as api from "../api/client";
import TopbarAuth from "../components/TopbarAuth";
import { getAllFaculties, FACULTY_COLORS } from "../utils/curriculum";

const FACULTIES = getAllFaculties();

const FACULTY_ABBR: Record<string, string> = {
  FENS: "FENS",
  FASS: "FASS",
  FBA: "FBA",
  FLW: "FLW",
  FEDU: "FEDU",
  FMS: "FMS",
};

export default function FacultySelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { showError } = useErrorToast();
  const fromDashboard =
    (location.state as { fromDashboard?: boolean } | null)?.fromDashboard || false;

  useEffect(() => {
    document.querySelector(".contentFade")?.classList.remove("fade-out");
  }, []);

  function chooseFaculty(code: string) {
    localStorage.setItem("sis.faculty", code);
    if (isAuthenticated) {
      api.putProfile({ facultyCode: code }).catch((err) => {
        showError(err instanceof Error ? err.message : "Couldn't save selection.");
      });
    }
    document.querySelector(".contentFade")?.classList.add("fade-out");
    window.setTimeout(
      () => navigate("/branches", { state: { fromDashboard } }),
      200
    );
  }

  const greeting = user?.username
    ? user.username
    : user?.email
      ? user.email.split("@")[0].replace(/^\w/, (c: string) => c.toUpperCase())
      : null;

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left">
          <button
            className="backBtn"
            onClick={() => {
              document.querySelector(".contentFade")?.classList.add("fade-out");
              setTimeout(() => navigate(-1), 250);
            }}
            title="Go back"
          >
            ‹
          </button>
        </div>
        <div className="topbar-right">
          <TopbarAuth />
        </div>
      </header>

      <main className="facultyLayout contentFade">
        <section className="facultyLeft">
          <div className="facultyLeftInner">
            {greeting && <p className="facultyGreetingSub">Hello, {greeting}</p>}
            <h1 className="facultyWelcome">Choose your<br />faculty</h1>
            <p className="facultyIntro">
              Select a faculty and we'll load the right curriculum for you.
            </p>
            <div className="facultyDots">
              <span className="facultyDot" style={{ background: FACULTY_COLORS.FENS }} />
              <span className="facultyDot" style={{ background: FACULTY_COLORS.FASS }} />
              <span className="facultyDot" style={{ background: FACULTY_COLORS.FBA }} />
              <span className="facultyDot" style={{ background: FACULTY_COLORS.FLW }} />
              <span className="facultyDot" style={{ background: FACULTY_COLORS.FEDU }} />
              <span className="facultyDot" style={{ background: FACULTY_COLORS.FMS }} />
            </div>
          </div>
        </section>

        <section className="facultyRight">
          <div className="facultyGrid">
            {FACULTIES.map((f, i) => {
              const color = FACULTY_COLORS[f.code] ?? "#5a9fd4";
              return (
                <button
                  key={f.code}
                  className="facultyCard"
                  style={{
                    ["--fc-color" as string]: color,
                    animationDelay: `${i * 0.07}s`,
                  }}
                  onClick={() => chooseFaculty(f.code)}
                >
                  <span className="facultyCardBadge">{FACULTY_ABBR[f.code] ?? f.code}</span>
                  <span className="facultyCardName">{f.name}</span>
                </button>
              );
            })}
          </div>

          <div className="facultyExtras">
            <button
              className="facultyExtraCard"
              style={{ animationDelay: `${(FACULTIES.length) * 0.07}s` }}
              onClick={() => {
                localStorage.setItem("sis.faculty", "DDP");
                document.querySelector(".contentFade")?.classList.add("fade-out");
                window.setTimeout(() => navigate("/dual-diploma", { state: { fromDashboard } }), 200);
              }}
            >
              <span className="facultyExtraIcon">&#x1F91D;</span>
              <span className="facultyExtraLabel">Dual Diploma</span>
              <span className="facultyExtraArrow">&#x203A;</span>
            </button>

            <button
              className="facultyExtraCard"
              style={{ animationDelay: `${(FACULTIES.length + 1) * 0.07}s` }}
              onClick={() => {
                localStorage.setItem("sis.branch", "Custom Setup");
                localStorage.setItem("sis.branchId", "custom");
                localStorage.setItem("sis.degree", "custom");
                localStorage.setItem("sis.semester", "1");
                if (isAuthenticated) {
                  api.putProfile({
                    branch: "Custom Setup",
                    branchId: "custom",
                    degreeId: "custom",
                    semesterId: "1",
                  }).catch((err) => {
                    showError(err instanceof Error ? err.message : "Couldn't save selection.");
                  });
                }
                document.querySelector(".contentFade")?.classList.add("fade-out");
                window.setTimeout(() => navigate("/dashboard"), 200);
              }}
            >
              <span className="facultyExtraIcon">&#x2699;</span>
              <span className="facultyExtraLabel">Custom Setup</span>
              <span className="facultyExtraArrow">&#x203A;</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
