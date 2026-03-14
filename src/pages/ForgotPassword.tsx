import { useState } from "react";
import { Link } from "react-router-dom";
import TopbarAuth from "../components/TopbarAuth";
import TopbarBranding from "../components/TopbarBranding";
import * as api from "../api/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required");
      return;
    }
    setSubmitting(true);
    try {
      await api.forgotPassword(trimmed);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
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
        <div className="topbar-right">
          <TopbarAuth />
        </div>
      </header>

      <main className="loginLayout contentFade">
        <section className="loginCard">
          <h1 className="loginTitle">Reset password</h1>
          {success ? (
            <>
              <p className="notFoundText" style={{ marginBottom: 20 }}>
                If an account exists with that email, you will receive a reset link shortly. Check your inbox and spam.
              </p>
              <div className="loginLinks">
                <div className="loginLinkRow">
                  <Link to="/login" className="loginLink">
                    Back to sign in
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <form className="loginForm" onSubmit={handleSubmit}>
                {error && <p className="loginError">{error}</p>}
                <div className="loginRow">
                  <label className="loginLabel" htmlFor="forgot-email">
                    E-Mail
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    className="loginInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    disabled={submitting}
                  />
                </div>
                <button type="submit" className="loginButton" disabled={submitting}>
                  {submitting ? "Sending…" : "Send reset link"}
                </button>
              </form>
              <div className="loginDivider" />
              <div className="loginLinks">
                <div className="loginLinkRow">
                  <Link to="/login" className="loginLink">
                    Back to sign in
                  </Link>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
