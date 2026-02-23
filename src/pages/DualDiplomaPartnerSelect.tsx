import { useEffect } from "react";
import { useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useErrorToast } from "../context/ErrorToastContext";
import * as api from "../api/client";
import TopbarAuth from "../components/TopbarAuth";
import { getBranchesByFaculty, FACULTY_COLORS } from "../utils/curriculum";

const DDP_PARTNERS = [
  { id: "ITU", name: "Istanbul Technical University (ITU)", prefix: "ITU-" },
  { id: "IU", name: "Istanbul University (IU)", prefix: "IU-" },
  { id: "MU", name: "Marmara University (MU)", prefix: "MU-" },
  { id: "HWG", name: "Hochschule Worms / Ludwigshafen (HWG LU)", prefix: "HWG-" },
] as const;

const ALL_DDP = getBranchesByFaculty("DDP");
const DDP_COLOR = FACULTY_COLORS.DDP ?? "#0d9488";

function extractBadge(id: string) {
  return id.replace(/^.*?-/, "").slice(0, 4).toUpperCase();
}

export default function DualDiplomaPartnerSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { partnerId } = useParams<{ partnerId: string }>();
  const { isAuthenticated } = useAuth();
  const { showError } = useErrorToast();
  const fromDashboard = (location.state as { fromDashboard?: boolean } | null)?.fromDashboard ?? false;

  useEffect(() => {
    document.querySelector(".contentFade")?.classList.remove("fade-out");
  }, []);

  const partner = DDP_PARTNERS.find((p) => p.id === partnerId);
  const programs = partner ? ALL_DDP.filter((b) => b.id.startsWith(partner.prefix)) : [];

  if (!partnerId || !partner || programs.length === 0) {
    return <Navigate to="/branches" replace />;
  }

  function chooseProgram(branchName: string, branchId: string) {
    localStorage.setItem("sis.faculty", "DDP");
    localStorage.setItem("sis.branch", branchName);
    localStorage.setItem("sis.branchId", branchId);
    if (isAuthenticated) {
      api.putProfile({ facultyCode: "DDP", branch: branchName, branchId }).catch((err) => {
        showError(err instanceof Error ? err.message : "Couldn't save selection.");
      });
    }
    document.querySelector(".contentFade")?.classList.add("fade-out");
    window.setTimeout(
      () => navigate("/degree", { state: { branchId, fromDashboard } }),
      200
    );
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left">
          <button
            className="backBtn"
            onClick={() => {
              document.querySelector(".contentFade")?.classList.add("fade-out");
              setTimeout(() => navigate("/dual-diploma", { state: location.state }), 250);
            }}
            title="Back to partner universities"
          >
            ‹
          </button>
        </div>
        <div className="topbar-right">
          <TopbarAuth />
        </div>
      </header>

      <main
        className="branchLayout contentFade"
        style={{ ["--faculty-color" as string]: DDP_COLOR }}
      >
        <section className="branchLeft">
          <div className="branchLeftInner">
            <span className="branchTag">{partnerId}</span>
            <h1 className="branchWelcome">{partner.name}</h1>
            <p className="branchIntro">
              Choose your program below. Your curriculum and mandatory courses will be loaded in the next steps.
            </p>
          </div>
        </section>

        <section className="branchRight">
          <div className="branchGrid">
            {programs.map((b, i) => (
              <button
                key={b.id}
                type="button"
                className="branchCard"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => chooseProgram(b.name, b.id)}
              >
                <span className="branchCardBadge">{extractBadge(b.id)}</span>
                <div className="branchCardText">
                  <span className="branchCardName">{b.name}</span>
                </div>
                <span className="branchCardArrow">&#x203A;</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
