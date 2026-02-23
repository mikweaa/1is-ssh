import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopbarAuth from "../components/TopbarAuth";
import { FACULTY_COLORS } from "../utils/curriculum";

const PARTNERS = [
  { id: "ITU", name: "Istanbul Technical University", short: "ITU" },
  { id: "IU", name: "Istanbul University", short: "IU" },
  { id: "MU", name: "Marmara University", short: "MU" },
  { id: "HWG", name: "Hochschule Worms / Ludwigshafen", short: "HWG LU" },
] as const;

const DDP_COLOR = FACULTY_COLORS.DDP ?? "#0d9488";

export default function DualDiplomaSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromDashboard = (location.state as { fromDashboard?: boolean } | null)?.fromDashboard ?? false;

  useEffect(() => {
    document.querySelector(".contentFade")?.classList.remove("fade-out");
  }, []);

  function choosePartner(partnerId: string) {
    document.querySelector(".contentFade")?.classList.add("fade-out");
    window.setTimeout(
      () => navigate(`/branches/dual/${partnerId}`, { state: { fromDashboard } }),
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

      <main
        className="ddpPage contentFade"
        style={{ ["--ddp-color" as string]: DDP_COLOR }}
      >
        <header className="ddpHero">
          <span className="ddpPill">Dual Diploma</span>
          <h1 className="ddpTitle">Choose your partner university</h1>
          <p className="ddpSubtitle">
            Select a university below. You will then pick your program at that institution.
          </p>
        </header>

        <div className="ddpPartnerGrid">
          {PARTNERS.map((partner, i) => (
            <button
              key={partner.id}
              type="button"
              className="ddpPartnerCard"
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => choosePartner(partner.id)}
            >
              <span className="ddpPartnerBadge">{partner.short}</span>
              <span className="ddpPartnerName">{partner.name}</span>
              <span className="ddpPartnerArrow">&#x203A;</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
