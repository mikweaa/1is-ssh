import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { query } from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET?.trim() || "dev-local-secret-change-me";

export interface JwtPayload {
  userId: string;
  email: string;
  username?: string;
}

export async function authMiddleware(
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid authorization" });
    return;
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const result = await query("SELECT 1 FROM users WHERE id = $1", [payload.userId]);
    if (result.rows.length === 0) {
      res.status(401).json({ error: "User no longer exists" });
      return;
    }
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
