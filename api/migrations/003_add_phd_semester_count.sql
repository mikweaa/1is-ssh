-- Add phd_semester_count column to user_profiles for dynamic PhD semester management
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS phd_semester_count INTEGER DEFAULT 6;

-- Backfill NULLs only (safe to re-run; never overwrites user-chosen values)
UPDATE user_profiles SET phd_semester_count = 6 WHERE phd_semester_count IS NULL;

