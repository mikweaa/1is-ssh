import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TopbarAuth from "../components/TopbarAuth";
import TopbarBranding from "../components/TopbarBranding";
import * as api from "../api/client";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const tPassword = password.trim();
    const tConfirm = confirmPassword.trim();
    if (tPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (tPassword !== tConfirm) {
      setError("Passwords do not match");
      return;
    }
    if (!token) {
      setError("Invalid reset link. Request a new one from the forgot password page.");
      return;
    }
    setSubmitting(true);
    try {
      await api.resetPassword(token, tPassword);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (!token && !success) {
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
            <p className="loginError">Invalid or missing reset link. Request a new one from the forgot password page.</p>
            <div className="loginLinks">
              <div className="loginLinkRow">
                <Link to="/forgot-password" className="loginLink">
                  Forgot password
                </Link>
                <span className="notFoundSeparator">·</span>
                <Link to="/login" className="loginLink">
                  Sign in
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
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
                Your password has been updated. You can sign in now.
              </p>
              <div className="loginLinks">
                <div className="loginLinkRow">
                  <Link to="/login" className="loginLink">
                    Sign in
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <form className="loginForm registerForm" onSubmit={handleSubmit}>
                {error && <p className="loginError">{error}</p>}
                <div className="loginRow">
                  <label className="loginLabel" htmlFor="reset-password">
                    New password
                  </label>
                  <input
                    id="reset-password"
                    type="password"
                    className="loginInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    disabled={submitting}
                  />
                </div>
                <div className="loginRow">
                  <label className="loginLabel" htmlFor="reset-confirm">
                    Confirm password
                  </label>
                  <input
                    id="reset-confirm"
                    type="password"
                    className="loginInput"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    disabled={submitting}
                  />
                </div>
                <button type="submit" className="loginButton" disabled={submitting}>
                  {submitting ? "Updating…" : "Update password"}
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
