import { Router, Request, Response } from "express";
import { body, query as queryValidator, validationResult } from "express-validator";
import { query } from "../db.js";
import { authMiddleware, JwtPayload } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.get(
  "/",
  queryValidator("branchId").notEmpty(),
  queryValidator("degreeId").notEmpty(),
  queryValidator("semesterId").notEmpty(),
  async (req: Request & { user?: JwtPayload }, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const userId = req.user!.userId;
    const { branchId, degreeId, semesterId } = req.query as {
      branchId: string;
      degreeId: string;
      semesterId: string;
    };
    const result = await query<{ subjects: unknown }>(
      "SELECT subjects FROM subject_lists WHERE user_id = $1 AND branch_id = $2 AND degree_id = $3 AND semester_id = $4",
      [userId, branchId, degreeId, semesterId]
    );
    const subjects = result.rows.length > 0 ? result.rows[0].subjects : [];
    res.json({ subjects });
  }
);

const MAX_SUBJECT_NAME = 200;
const MAX_SUBJECT_CODE = 200;
const MAX_ITEMS_PER_SUBJECT = 50;
const MAX_ITEM_NAME = 200;

function validateSubjects(subjects: unknown[]): string | null {
  for (let i = 0; i < subjects.length; i++) {
    const s = subjects[i];
    if (s === null || typeof s !== "object" || Array.isArray(s)) {
      return `Subject at index ${i} must be an object`;
    }
    const obj = s as Record<string, unknown>;
    if (typeof obj.name !== "string") return `Subject at index ${i}: missing or invalid name`;
    if (obj.name.length > MAX_SUBJECT_NAME) return `Subject at index ${i}: name too long`;
    if (obj.code != null && (typeof obj.code !== "string" || obj.code.length > MAX_SUBJECT_CODE)) {
      return `Subject at index ${i}: code must be a string up to ${MAX_SUBJECT_CODE} characters`;
    }
    if (!Array.isArray(obj.items)) return `Subject at index ${i}: items must be an array`;
    if (obj.items.length > MAX_ITEMS_PER_SUBJECT) {
      return `Subject at index ${i}: too many items (max ${MAX_ITEMS_PER_SUBJECT})`;
    }
    for (let j = 0; j < obj.items.length; j++) {
      const item = obj.items[j];
      if (item !== null && typeof item === "object" && !Array.isArray(item)) {
        const name = (item as Record<string, unknown>).name;
        if (name != null && typeof name === "string" && name.length > MAX_ITEM_NAME) {
          return `Subject at index ${i}, item at index ${j}: name too long`;
        }
      }
    }
  }
  return null;
}

router.put(
  "/",
  body("branchId").notEmpty().isString().isLength({ max: 64 }),
  body("degreeId").notEmpty().isString().isLength({ max: 64 }),
  body("semesterId").notEmpty().isString().isLength({ max: 64 }),
  body("subjects").isArray(),
  async (req: Request & { user?: JwtPayload }, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const userId = req.user!.userId;
    const { branchId, degreeId, semesterId, subjects } = req.body as {
      branchId: string;
      degreeId: string;
      semesterId: string;
      subjects: unknown[];
    };
    if (subjects.length > 500) {
      res.status(400).json({ error: "Subject list too large" });
      return;
    }
    const subjectError = validateSubjects(subjects);
    if (subjectError) {
      res.status(400).json({ error: subjectError });
      return;
    }
    try {
      await query(
        `INSERT INTO subject_lists (user_id, branch_id, degree_id, semester_id, subjects, updated_at)
         VALUES ($1, $2, $3, $4, $5::jsonb, now())
         ON CONFLICT (user_id, branch_id, degree_id, semester_id) DO UPDATE SET
           subjects = EXCLUDED.subjects,
           updated_at = now()`,
        [userId, branchId, degreeId, semesterId, JSON.stringify(subjects)]
      );
    } catch (err: unknown) {
      const e = err as { code?: string };
      if (e.code === "23503") {
        res.status(401).json({ error: "User no longer exists" });
        return;
      }
      throw err;
    }
    res.json({ ok: true });
  }
);

export default router;
