// Empty = same-origin relative URLs (/api/...). Set VITE_API_URL only when API is on another origin.
const BASE = (import.meta.env.VITE_API_URL as string) || "";

function getToken(): string | null {
  return localStorage.getItem("sis.token");
}

function clearTokenIfUnauthorized(res: Response): void {
  if (res.status === 401) {
    localStorage.removeItem("sis.token");
    window.dispatchEvent(new CustomEvent("sis:auth-logout"));
  }
}

class RateLimitError extends Error {
  constructor() {
    super("Too many requests. Please wait a moment and try again.");
    this.name = "RateLimitError";
  }
}

function isRateLimited(res: Response): boolean {
  return res.status === 429;
}

async function getErrorMessage(res: Response): Promise<string> {
  if (res.status === 429) return "Too many requests. Please wait a moment and try again.";
  const data = await res.json().catch(() => ({} as Record<string, unknown>));
  const msg =
    typeof (data as { error?: string }).error === "string"
      ? (data as { error: string }).error
      : Array.isArray((data as { errors?: { msg?: string }[] }).errors) &&
          (data as { errors: { msg?: string }[] }).errors[0]?.msg
        ? (data as { errors: { msg: string }[] }).errors[0].msg
        : null;
  if (msg) return msg;
  if (res.status === 400) return "Invalid request.";
  if (res.status === 401) return "Please sign in again.";
  if (res.status === 404) return "Not found.";
  if (res.status === 409) return "Conflict.";
  if (res.status >= 500) return "Something went wrong. Try again.";
  return "Something went wrong.";
}

export interface User {
  id: string;
  email: string;
  username?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function register(email: string, password: string, username: string): Promise<AuthResponse> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });
  } catch {
    throw new Error("Check your connection.");
  }
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return (await res.json()) as AuthResponse;
}

export async function login(identifier: string, password: string): Promise<AuthResponse> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
  } catch {
    throw new Error("Check your connection.");
  }
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return (await res.json()) as AuthResponse;
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
  } catch {
    throw new Error("Check your connection.");
  }
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return (await res.json()) as { message: string };
}

export async function resetPassword(token: string, password: string): Promise<{ message: string }> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
  } catch {
    throw new Error("Check your connection.");
  }
  if (!res.ok) throw new Error(await getErrorMessage(res));
  return (await res.json()) as { message: string };
}

export async function getMe(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (isRateLimited(res)) throw new RateLimitError();
  clearTokenIfUnauthorized(res);
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

export interface Profile {
  facultyCode: string | null;
  branch: string | null;
  branchId: string | null;
  degreeId: string | null;
  semesterId: string | null;
  phdSemesterCount: number;
}

export async function getProfile(): Promise<Profile | null> {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${BASE}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (isRateLimited(res)) throw new RateLimitError();
  clearTokenIfUnauthorized(res);
  if (!res.ok) return null;
  return res.json();
}

export async function putProfile(profile: Partial<Profile>): Promise<void> {
  const token = getToken();
  if (!token) return;
  let res: Response;
  try {
    res = await fetch(`${BASE}/api/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        facultyCode: profile.facultyCode,
        branch: profile.branch,
        branchId: profile.branchId,
        degreeId: profile.degreeId,
        semesterId: profile.semesterId,
        phdSemesterCount: profile.phdSemesterCount,
      }),
    });
  } catch {
    throw new Error("Check your connection.");
  }
  if (isRateLimited(res)) throw new RateLimitError();
  clearTokenIfUnauthorized(res);
  if (!res.ok) throw new Error(await getErrorMessage(res));
}

export interface SubjectItem {
  id: string;
  name: string;
  score: number | null;
  weight: number | null;
  type: "midterm" | "final" | "quiz" | "activity";
}

export interface SubjectData {
  name: string;
  code?: string;
  items: SubjectItem[];
}

export async function getSubjectList(
  branchId: string,
  degreeId: string,
  semesterId: string
): Promise<SubjectData[] | null> {
  const token = getToken();
  if (!token) return null;
  const params = new URLSearchParams({ branchId, degreeId, semesterId });
  const res = await fetch(`${BASE}/api/subject-lists?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (isRateLimited(res)) throw new RateLimitError();
  clearTokenIfUnauthorized(res);
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const data = await res.json();
  return data.subjects;
}

export async function putSubjectList(
  branchId: string,
  degreeId: string,
  semesterId: string,
  subjects: SubjectData[]
): Promise<void> {
  const token = getToken();
  if (!token) return;
  let res: Response;
  try {
    res = await fetch(`${BASE}/api/subject-lists`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ branchId, degreeId, semesterId, subjects }),
    });
  } catch {
    throw new Error("Check your connection.");
  }
  if (isRateLimited(res)) throw new RateLimitError();
  clearTokenIfUnauthorized(res);
  if (!res.ok) throw new Error(await getErrorMessage(res));
}

export { RateLimitError };
