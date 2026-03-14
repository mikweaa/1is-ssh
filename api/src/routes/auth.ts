import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import { body, validationResult } from "express-validator";
import { query } from "../db.js";
import { sendMail } from "../mail.js";

function requireEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`${name} environment variable is required`);
  return v;
}
const JWT_SECRET = requireEnv("JWT_SECRET");
const BCRYPT_ROUNDS = 12;

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 7,
  message: { error: "Too many login or registration attempts. Try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip ?? "unknown",
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many reset requests. Try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip ?? "unknown",
});

const router = Router();

function normalizeEmailForStorage(email: string): string {
  return email.trim().toLowerCase();
}

export interface JwtPayload {
  userId: string;
  email: string;
  username?: string;
}

function generateToken(userId: string, email: string, username?: string): string {
  return jwt.sign(
    { userId, email, username } as JwtPayload,
    JWT_SECRET,
    { algorithm: "HS256", expiresIn: "7d" }
  );
}

router.post(
  "/register",
  authRateLimiter,
  body("email").isEmail(),
  body("username")
    .trim()
    .isLength({ min: 2, max: 64 })
    .withMessage("Username must be 2–64 characters")
    .matches(/^[^@]+$/)
    .withMessage("Username cannot contain @"),
  body("password").isLength({ min: 8, max: 128 }).withMessage("Password must be at least 8 characters"),
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { email, password, username } = req.body as { email: string; password: string; username: string };
    const normalizedEmail = normalizeEmailForStorage(email);
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    try {
      const result = await query<{ id: string }>(
        "INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3) RETURNING id",
        [normalizedEmail, passwordHash, username.trim()]
      );
      const userId = result.rows[0].id;
      const token = generateToken(userId, normalizedEmail, username.trim());
      res.status(201).json({ token, user: { id: userId, email: normalizedEmail, username: username.trim() } });
    } catch (err: unknown) {
      const e = err as { code?: string };
      if (e.code === "23505") {
        res.status(409).json({ error: "Account already exists" });
        return;
      }
      throw err;
    }
  }
);

router.post(
  "/login",
  authRateLimiter,
  body("identifier").trim().notEmpty().withMessage("Email or username is required"),
  body("password").notEmpty().isLength({ max: 128 }),
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { identifier, password } = req.body as { identifier: string; password: string };
    const trimmed = identifier.trim();
    const result = await query<{ id: string; password_hash: string; email: string; username: string | null }>(
      "SELECT id, password_hash, email, username FROM users WHERE lower(email) = lower($1) OR username = $1",
      [trimmed]
    );
    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid email/username or password" }); // generic message to not leak information
      return;
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      res.status(401).json({ error: "Invalid email/username or password" }); // same here
      return;
    }
    const token = generateToken(user.id, user.email, user.username ?? undefined);
    res.json({ token, user: { id: user.id, email: user.email, username: user.username ?? undefined } });
  }
);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  body("email").trim().isEmail().withMessage("Valid email is required"),
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const email = normalizeEmailForStorage((req.body as { email: string }).email);
    const result = await query<{ id: string }>("SELECT id FROM users WHERE email = $1", [email]);
    const frontendUrl = process.env.FRONTEND_URL?.trim() || "https://1nteger.org";
    if (result.rows.length === 0) {
      res.json({ message: "If an account exists with this email, you will receive a reset link." });
      return;
    }
    const userId = result.rows[0].id;
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await query(
      "INSERT INTO password_reset_tokens (token_hash, user_id, expires_at) VALUES ($1, $2, $3)",
      [tokenHash, userId, expiresAt]
    );
    const resetUrl = `${frontendUrl.replace(/\/$/, "")}/reset-password?token=${rawToken}`;
    const mailResult = await sendMail({
      to: email,
      subject: "Reset your 1nteger password",
      html: `<p>You requested a password reset. Click the link below (valid 15 minutes):</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you didn't request this, ignore this email.</p>`,
      text: `You requested a password reset. Open this link (valid 15 minutes): ${resetUrl}\n\nIf you didn't request this, ignore this email.`,
    });
    if (!mailResult.ok) {
      await query("DELETE FROM password_reset_tokens WHERE token_hash = $1", [tokenHash]);
      console.error("[forgot-password] Mail send failed:", mailResult.error);
      res.status(503).json({ error: "Unable to send email. Try again later." });
      return;
    }
    res.json({ message: "If an account exists with this email, you will receive a reset link." });
  }
);

router.post(
  "/reset-password",
  authRateLimiter,
  body("token").trim().notEmpty().withMessage("Reset token is required"),
  body("password").isLength({ min: 8, max: 128 }).withMessage("Password must be at least 8 characters"),
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { token, password } = req.body as { token: string; password: string };
    const tokenHash = crypto.createHash("sha256").update(token.trim()).digest("hex");
    const row = await query<{ user_id: string }>(
      "DELETE FROM password_reset_tokens WHERE token_hash = $1 AND expires_at > now() RETURNING user_id",
      [tokenHash]
    );
    if (row.rows.length === 0) {
      res.status(400).json({ error: "Invalid or expired reset link. Request a new one." });
      return;
    }
    const userId = row.rows[0].user_id;
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    await query("UPDATE users SET password_hash = $1, updated_at = now() WHERE id = $2", [passwordHash, userId]);
    res.json({ message: "Password updated. You can sign in now." });
  }
);

router.get("/me", async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing authorization" });
    return;
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as unknown as JwtPayload;
    const result = await query<{ email: string; username: string | null }>(
      "SELECT email, username FROM users WHERE id = $1",
      [payload.userId]
    );
    if (result.rows.length === 0) {
      res.status(401).json({ error: "User no longer exists" });
      return;
    }
    const row = result.rows[0];
    res.json({ user: { id: payload.userId, email: row.email, username: row.username ?? undefined } });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
