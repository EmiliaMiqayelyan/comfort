import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadsDir = path.join(__dirname, "../../uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".bin";
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 },
});
