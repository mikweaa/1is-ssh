import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as api from "../api/client";

function clearAppStorage(): void {
  localStorage.removeItem("sis.token");
  localStorage.removeItem("sis.faculty");
  localStorage.removeItem("sis.branch");
  localStorage.removeItem("sis.branchId");
  localStorage.removeItem("sis.degree");
  localStorage.removeItem("sis.semester");
  localStorage.removeItem("sis.currentSubject");
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("subjects_")) keysToRemove.push(key);
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

interface AuthContextValue {
  user: api.User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<api.User | null>(null);
  const [loading, setLoading] = useState(true);
  const didAutoNavigateRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    api
      .getMe()
      .then((u) => {
        if (!cancelled) {
          setUser(u);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          const token = localStorage.getItem("sis.token");
          if (token) {
            setUser({ id: "", email: "" });
          }
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []); 

  useEffect(() => {
    const handleAuthLogout = () => {
      clearAppStorage();
      setUser(null);
      navigate("/login");
    };
    window.addEventListener("sis:auth-logout", handleAuthLogout);
    return () => window.removeEventListener("sis:auth-logout", handleAuthLogout); // forced logout bascially
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    let isActive = true;
    const run = async () => {
      const profile = await api.getProfile();
      if (!isActive || !profile) return;
      if (profile.facultyCode != null) localStorage.setItem("sis.faculty", profile.facultyCode);
      if (profile.branch != null) localStorage.setItem("sis.branch", profile.branch);
      if (profile.branchId != null) localStorage.setItem("sis.branchId", profile.branchId);
      if (profile.degreeId != null) localStorage.setItem("sis.degree", profile.degreeId);
      if (profile.semesterId != null) localStorage.setItem("sis.semester", profile.semesterId);

      const autoRedirectPaths = new Set([
        "/",
        "/login",
        "/register",
        "/faculty",
        "/branches",
        "/degree",
        "/track",
        "/semester",
      ]);

      const hasAnySubjectInput = (subjects: api.SubjectData[] | null): boolean => {
        if (!subjects) return false;
        return subjects.some((subject) =>
          subject.items.some((item) => item.score !== null || item.weight !== null)
        );
      };

      const hasAnyLocalSubjectInput = (branchId: string, degreeId: string, semesterId: string): boolean => {
        const storageKey = `subjects_${branchId}_${degreeId}_${semesterId}`;
        const raw = localStorage.getItem(storageKey);
        if (!raw) return false;
        try {
          const subjects = JSON.parse(raw) as api.SubjectData[];
          return hasAnySubjectInput(subjects);
        } catch {
          return false;
        }
      };

      const fromDashboardFlow =
        (location.state as { fromDashboard?: boolean } | null)?.fromDashboard === true;

      const canAutoRedirect = autoRedirectPaths.has(location.pathname) && !fromDashboardFlow;
      if (profile.branchId && profile.degreeId && profile.semesterId) {
        const subjects = await api.getSubjectList(
          profile.branchId,
          profile.degreeId,
          profile.semesterId
        );
        if (!isActive) return;
        const hasInput =
          hasAnySubjectInput(subjects) ||
          hasAnyLocalSubjectInput(profile.branchId, profile.degreeId, profile.semesterId);

        if (canAutoRedirect && !didAutoNavigateRef.current) {
          didAutoNavigateRef.current = true;
          navigate("/dashboard", {
            replace: true,
            state: {
              branchId: profile.branchId,
              degreeId: profile.degreeId,
              semesterId: profile.semesterId,
            },
          });
          return;
        }

        if (hasInput) return;
      }

      const isAuthLanding = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";
      if (canAutoRedirect && isAuthLanding && !profile.branchId && !profile.degreeId && !profile.semesterId) {
        if (!didAutoNavigateRef.current) {
          didAutoNavigateRef.current = true;
          navigate("/faculty", { replace: true });
        }
      }
    };

    run().catch(() => {
      /* rate-limited or network error — keep existing state, don't crash */
    });
    return () => {
      isActive = false;
    };
  }, [user, location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!user) didAutoNavigateRef.current = false;
  }, [user]);

  const login = useCallback(
    async (identifier: string, password: string) => {
      const { token, user: u } = await api.login(identifier, password);
      localStorage.setItem("sis.token", token);
      setUser(u);
    },
    []
  );

  const register = useCallback(
    async (email: string, password: string, username: string) => {
      localStorage.removeItem("sis.token");
      setUser(null);
      await api.register(email, password, username);
    },
    []
  );

  const logout = useCallback(() => {
    clearAppStorage();
    setUser(null);
    navigate("/login");
    // Clear again after React re-renders; Dashboard's save effect may write to localStorage
    // when isAuthenticated flips to false, so we remove that data after the fact.
    setTimeout(clearAppStorage, 50);
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components -- useAuth is the standard hook for this context */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
