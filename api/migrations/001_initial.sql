-- users: registered users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- user_profiles: current faculty/branch/degree/semester selection (one row per user)
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  faculty_code TEXT,
  branch TEXT,
  branch_id TEXT,
  degree_id TEXT,
  semester_id TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- subject_lists: one row per user per (branch_id, degree_id, semester_id)
CREATE TABLE IF NOT EXISTS subject_lists (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  branch_id TEXT NOT NULL,
  degree_id TEXT NOT NULL,
  semester_id TEXT NOT NULL,
  subjects JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, branch_id, degree_id, semester_id)
);

CREATE INDEX IF NOT EXISTS idx_subject_lists_user_id ON subject_lists(user_id);
