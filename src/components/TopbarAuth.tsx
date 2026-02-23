import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function TopbarAuth() {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const displayName = user?.username || user?.email;

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  const themeToggle = (
    <div className="themeToggleWrap">
      <span className="themeToggleHint" aria-hidden="true">
        {isDark ? "☀" : "🌙"}
      </span>
      <button
        type="button"
        className="themeToggle"
        onClick={toggleTheme}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-label="Toggle dark mode"
      >
        <span className={`themeToggleTrack ${isDark ? "themeToggleTrackDark" : ""}`}>
          <span className={`themeToggleThumb ${isDark ? "themeToggleThumbDark" : ""}`} />
          <span className="themeToggleIcon themeToggleIconSun">&#9788;</span>
          <span className="themeToggleIcon themeToggleIconMoon">&#9790;</span>
        </span>
      </button>
    </div>
  );

  if (isAuthenticated) {
    return (
      <div className="topbarAuthRow">
        {themeToggle}
        <div className="topbarAuthDropdown" ref={wrapperRef}>
          <button
            type="button"
            className="topbarAuthTrigger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="true"
          >
            <span className="topbarAuthName">{displayName}</span>
            <span className="topbarAuthArrow" aria-hidden />
          </button>
          {open && (
            <div className="topbarAuthPortal">
              <button
                type="button"
                className="topbarAuthOption"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="topbarAuthRow">
      {themeToggle}
      <Link to="/login" className="topbarSignIn">
        Sign in
      </Link>
    </div>
  );
}
