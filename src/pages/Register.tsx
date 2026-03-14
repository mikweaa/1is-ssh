import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TopbarAuth from "../components/TopbarAuth";
import TopbarBranding from "../components/TopbarBranding";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const tUsername = username.trim();
    const tEmail = email.trim();
    const tPassword = password.trim();
    const tConfirm = confirmPassword.trim();

    if (!tUsername) {
      setError("Username is required");
      return;
    }
    if (!tEmail) {
      setError("E-Mail is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    if (tPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (tPassword !== tConfirm) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      await register(tEmail, tPassword, tUsername);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
          <h1 className="loginTitle">Register</h1>
          <form className="loginForm registerForm" onSubmit={handleSubmit}>
            {error && <p className="loginError">{error}</p>}
            <div className="loginRow">
              <label className="loginLabel" htmlFor="register-username">
                Username
              </label>
              <input
                id="register-username"
                type="text"
                className="loginInput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="loginRow">
              <label className="loginLabel" htmlFor="register-email">
                E-Mail
              </label>
              <input
                id="register-email"
                type="email"
                className="loginInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="loginRow">
              <label className="loginLabel" htmlFor="register-password">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                className="loginInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <div className="loginRow">
              <label className="loginLabel" htmlFor="register-confirm">
                Confirm Password
              </label>
              <input
                id="register-confirm"
                type="password"
                className="loginInput"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className="loginButton" disabled={submitting}>
              {submitting ? "Creating account…" : "Register"}
            </button>
          </form>
          <div className="loginDivider" />
          <div className="loginLinks">
            <div className="loginLinkRow">
              <span>Already have an account?</span>
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
