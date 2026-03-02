import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import { query } from "../db.js";

function requireEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`${name} environment variable is required`);
  return v;
}
const JWT_SECRET = requireEnv("JWT_SECRET");
const BCRYPT_ROUNDS = 12;

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many login or registration attempts. Try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
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
