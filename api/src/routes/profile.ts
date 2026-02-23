import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { query } from "../db.js";
import { authMiddleware, JwtPayload } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: Request & { user?: JwtPayload }, res: Response): Promise<void> => {
  const userId = req.user!.userId;
  const result = await query<{
    faculty_code: string | null;
    branch: string | null;
    branch_id: string | null;
    degree_id: string | null;
    semester_id: string | null;
    phd_semester_count: number | null;
  }>(
    "SELECT faculty_code, branch, branch_id, degree_id, semester_id, phd_semester_count FROM user_profiles WHERE user_id = $1",
    [userId]
  );
  if (result.rows.length === 0) {
    res.json({
      facultyCode: null,
      branch: null,
      branchId: null,
      degreeId: null,
      semesterId: null,
      phdSemesterCount: 6,
    });
    return;
  }
  const row = result.rows[0];
  res.json({
    facultyCode: row.faculty_code,
    branch: row.branch,
    branchId: row.branch_id,
    degreeId: row.degree_id,
    semesterId: row.semester_id,
    phdSemesterCount: row.phd_semester_count ?? 6,
  });
});

const MAX_PROFILE_STRING = 64;
router.put(
  "/",
  body("facultyCode").optional().isString().isLength({ max: MAX_PROFILE_STRING }),
  body("branch").optional().isString().isLength({ max: MAX_PROFILE_STRING }),
  body("branchId").optional().isString().isLength({ max: MAX_PROFILE_STRING }),
  body("degreeId").optional().isString().isLength({ max: MAX_PROFILE_STRING }),
  body("semesterId").optional().isString().isLength({ max: MAX_PROFILE_STRING }),
  body("phdSemesterCount").optional().isInt({ min: 1, max: 20 }),
  async (req: Request & { user?: JwtPayload }, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const userId = req.user!.userId;
    const { facultyCode, branch, branchId, degreeId, semesterId, phdSemesterCount } = req.body as {
      facultyCode?: string;
      branch?: string;
      branchId?: string;
      degreeId?: string;
      semesterId?: string;
      phdSemesterCount?: number;
    };
    try {
      await query(
        `INSERT INTO user_profiles (user_id, faculty_code, branch, branch_id, degree_id, semester_id, phd_semester_count, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, now())
         ON CONFLICT (user_id) DO UPDATE SET
           faculty_code = COALESCE(EXCLUDED.faculty_code, user_profiles.faculty_code),
           branch = COALESCE(EXCLUDED.branch, user_profiles.branch),
           branch_id = COALESCE(EXCLUDED.branch_id, user_profiles.branch_id),
           degree_id = COALESCE(EXCLUDED.degree_id, user_profiles.degree_id),
           semester_id = COALESCE(EXCLUDED.semester_id, user_profiles.semester_id),
           phd_semester_count = COALESCE(EXCLUDED.phd_semester_count, user_profiles.phd_semester_count),
           updated_at = now()`,
        [
          userId,
          facultyCode ?? null,
          branch ?? null,
          branchId ?? null,
          degreeId ?? null,
          semesterId ?? null,
          phdSemesterCount ?? null,
        ]
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
