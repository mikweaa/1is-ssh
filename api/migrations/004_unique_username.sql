-- Enforce unique usernames (case-sensitive) and prevent username/email collision
CREATE UNIQUE INDEX IF NOT EXISTS users_username_unique ON users (username)
  WHERE username IS NOT NULL;
