import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { authRouter } from "./routes/auth.js";
import { productsRouter } from "./routes/products.js";
import { categoriesRouter, collectionsRouter } from "./routes/catalog.js";
import {
  projectsRouter,
  blogRouter,
  usersRouter,
  mediaRouter,
  contactRouter,
  calculatorRouter,
} from "./routes/content.js";
import { pool } from "./db/pool.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || true, credentials: true }));
app.use(express.json({ limit: "8mb" }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, service: "comfort-api", database: "connected" });
  } catch (error) {
    res.status(503).json({
      ok: false,
      service: "comfort-api",
      database: "disconnected",
      message: error.message,
    });
  }
});

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/collections", collectionsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/blog", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/media", mediaRouter);
app.use("/api/contact", contactRouter);
app.use("/api/calculator", calculatorRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Internal server error" });
});

app.listen(port, () => {
  console.log(`Comfort API running on http://localhost:${port}`);
});
