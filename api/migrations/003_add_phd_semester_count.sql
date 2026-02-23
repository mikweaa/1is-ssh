-- Add phd_semester_count column to user_profiles for dynamic PhD semester management
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS phd_semester_count INTEGER DEFAULT 6;

-- Update existing rows to use 6 as default (for users who might have NULL or want the new default)
UPDATE user_profiles SET phd_semester_count = 6 WHERE phd_semester_count IS NULL OR phd_semester_count = 3;

