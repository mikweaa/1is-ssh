import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TopbarAuth from "../components/TopbarAuth";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const aboutRef = useRef<HTMLElement>(null);
  const [aboutInView, setAboutInView] = useState(false);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAboutInView(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page landingPage">
      <header className="landingTopbar">
        <div className="landingTopbarLeft">
          <img src="/integer-logo.png" alt="Integer" className="landingLogo" />
        </div>
        <div className="landingTopbarRight">
          <TopbarAuth />
        </div>
      </header>

      <main className="landingMain">
        <section className="landingHero">
          <div className="landingHeroBg" aria-hidden />
          <div className="landingHeroContent">
            <p className="landingHeroBrand">1nteger Grade Calculator</p>
            <h1 className="landingHeroTitle">
              <span className="landingHeroTitleLine">Track the excellence you yearn for.</span>
            </h1>
            <div className="landingHeroCta">
              {isAuthenticated ? (
                <Link to="/dashboard" className="landingBtn landingBtnPrimary">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/register" className="landingBtn landingBtnPrimary">
                  Register
                </Link>
              )}
            </div>
          </div>
        </section>

        <section
          ref={aboutRef}
          className={`landingAbout${aboutInView ? " landingAboutInView" : ""}`}
          aria-labelledby="landing-about-heading"
        >
          <div className="landingAboutInner">
            <h2 id="landing-about-heading" className="landingAboutTitle">What is the Grade Calculator?</h2>

            <div className="landingAboutPhotoBlock">
              <div className="landingAboutPhotoWrap">
                <img
                  src="/landing-graduation.png"
                  alt="Graduation moment — cap, tassel, and celebration"
                  className="landingAboutPhoto"
                />
                <span className="landingAboutObj landingAboutObjClass" aria-hidden>
                  class
                </span>
                <span className="landingAboutObj landingAboutObjOf" aria-hidden>
                  of
                </span>
                <span className="landingAboutObj landingAboutObj2025" aria-hidden>
                  2025
                </span>
              </div>
              <div className="landingAboutCards">
                <div className="landingAboutCard landingAboutCard1">
                  <h3 className="landingAboutCardTitle">Your curriculum, built in</h3>
                  <p className="landingAboutCardText">
                    Choose your faculty, degree type, and program. The app loads the correct mandatory courses and elective slots for every semester, so you always see the right structure.
                  </p>
                </div>
                <div className="landingAboutCard landingAboutCard2">
                  <h3 className="landingAboutCardTitle">Grades & GPA</h3>
                  <p className="landingAboutCardText">
                    Add your subjects and grades (including letter grades). The calculator computes your semester and cumulative GPA so you can see your progress at a glance.
                  </p>
                </div>
                <div className="landingAboutCard landingAboutCard3">
                  <h3 className="landingAboutCardTitle">Electives & dual diplomas</h3>
                  <p className="landingAboutCardText">
                    Pick electives from the official pools for your program. Dual diploma students can use the same flow for ITU, IU, and Marmara University (MU) joint programs with full curricula and elective lists.
                  </p>
                </div>
                <div className="landingAboutCard landingAboutCard4">
                  <p className="landingAboutCardCta">
                    Register to save your profile and grades, then open the dashboard to select your program and start tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="landingFooter">
          <p className="landingFooterCopy">1nteger Information System · 1IS</p>
        </footer>
      </main>
    </div>
  );
}
