import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { waitForDb, runMigrations } from "./db.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import subjectListsRoutes from "./routes/subjectLists.js";

const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
  const secret = process.env.JWT_SECRET?.trim();
  const devPlaceholder = "dev-local-secret-change-me";
  if (!secret || secret === devPlaceholder) {
    console.error("Fatal: in production JWT_SECRET must be set and must not be the dev placeholder.");
    process.exit(1);
  }
}

const corsOrigin = process.env.CORS_ORIGIN?.trim() || process.env.FRONTEND_ORIGIN?.trim();
if (isProduction && !corsOrigin) {
  console.error("Fatal: in production CORS_ORIGIN or FRONTEND_ORIGIN must be set.");
  process.exit(1);
}
const corsOptions: { origin: string | string[] } = corsOrigin
  ? { origin: corsOrigin.split(",").map((s) => s.trim()).filter(Boolean) }
  : { origin: ["http://192.168.10.17:8086", "http://192.168.10.17:5173"] };

const app = express();
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

app.set("trust proxy", 1);

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: "Too many requests. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,

  validate: { xForwardedForHeader: false },

  keyGenerator: (req) => req.ip ?? "unknown",
});
app.use(generalLimiter);

app.get("/", (_req, res) => res.json({ service: "sis-grade-api", ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/subject-lists", subjectListsRoutes);

const PORT = Number(process.env.PORT) || 3000;

async function start(): Promise<void> {
  await waitForDb();
  await runMigrations();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
