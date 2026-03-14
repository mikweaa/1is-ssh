import { Link } from "react-router-dom";
import TopbarAuth from "../components/TopbarAuth";
import TopbarBranding from "../components/TopbarBranding";

export default function NotFound() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left">
          <TopbarBranding />
        </div>
        <div className="topbar-right">
          <TopbarAuth />
        </div>
      </header>

      <main className="loginLayout contentFade">
        <section className="loginCard">
          <h1 className="loginTitle">404</h1>
          <p className="notFoundText">Page not found.</p>
          <div className="loginLinks">
            <div className="loginLinkRow">
              <Link to="/" className="loginLink">
                Go home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
