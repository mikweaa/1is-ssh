import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TopbarAuth from "../components/TopbarAuth";
import TopbarBranding from "../components/TopbarBranding";

export default function Login() {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(identifier, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-left">
          <TopbarBranding />
        </div>
        <div className="topbar-right"><TopbarAuth /></div>
      </header>

      <main className="loginLayout contentFade">
        <section className="loginCard">
          <h1 className="loginTitle">Login</h1>
          <form className="loginForm" onSubmit={handleSubmit}>
            {error && <p className="loginError">{error}</p>}
            <div className="loginRow">
              <label className="loginLabel" htmlFor="login-identifier">
                E - Mail / Username
              </label>
              <input
                id="login-identifier"
                type="text"
                className="loginInput"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="loginRow">
              <label className="loginLabel" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                className="loginInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="loginButton" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <div className="loginDivider" />
          <div className="loginLinks">
            <div className="loginLinkRow">
              <span>Don&apos;t have an account?</span>
              <Link to="/register" className="loginLink">
                Register
              </Link>
            </div>
            <div className="loginLinkRow">
              <span>Forgot your password? </span>
              <Link to="/forgot-password" className="loginLink">
                Reset it
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
