import { Router } from "express";
import { randomUUID } from "node:crypto";
import { query } from "../db/pool.js";
import { mapProject, mapPost, mapUser } from "../lib/map.js";
import { requireAuth } from "../middleware/auth.js";

export const projectsRouter = Router();
export const blogRouter = Router();
export const usersRouter = Router();
export const mediaRouter = Router();
export const contactRouter = Router();
export const calculatorRouter = Router();

projectsRouter.get("/", async (_req, res) => {
  const rows = await query("SELECT * FROM projects ORDER BY year DESC");
  res.json(rows.map(mapProject));
});

projectsRouter.get("/:slug", async (req, res) => {
  const rows = await query("SELECT * FROM projects WHERE slug = ? OR id = ?", [req.params.slug, req.params.slug]);
  if (!rows[0]) return res.status(404).json({ message: "Project not found" });
  res.json(mapProject(rows[0]));
});

projectsRouter.post("/", requireAuth, async (req, res) => {
  const id = req.body.id || randomUUID();
  await query(
    `INSERT INTO projects (id, slug, title, description, location, year, images, before_image, after_image, video_url, product_ids, category)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id, req.body.slug, JSON.stringify(req.body.title), JSON.stringify(req.body.description),
      JSON.stringify(req.body.location), req.body.year, JSON.stringify(req.body.images || []),
      req.body.beforeImage || null, req.body.afterImage || null, req.body.videoUrl || null,
      JSON.stringify(req.body.products || []), req.body.category,
    ],
  );
  const rows = await query("SELECT * FROM projects WHERE id = ?", [id]);
  res.status(201).json(mapProject(rows[0]));
});

projectsRouter.put("/:id", requireAuth, async (req, res) => {
  await query(
    `UPDATE projects SET slug=?, title=?, description=?, location=?, year=?, images=?, before_image=?, after_image=?, video_url=?, product_ids=?, category=? WHERE id=?`,
    [
      req.body.slug, JSON.stringify(req.body.title), JSON.stringify(req.body.description),
      JSON.stringify(req.body.location), req.body.year, JSON.stringify(req.body.images || []),
      req.body.beforeImage || null, req.body.afterImage || null, req.body.videoUrl || null,
      JSON.stringify(req.body.products || []), req.body.category, req.params.id,
    ],
  );
  const rows = await query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "Project not found" });
  res.json(mapProject(rows[0]));
});

projectsRouter.delete("/:id", requireAuth, async (req, res) => {
  await query("DELETE FROM projects WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

blogRouter.get("/", async (_req, res) => {
  const rows = await query("SELECT * FROM blog_posts ORDER BY published_at DESC");
  res.json(rows.map(mapPost));
});

blogRouter.get("/:slug", async (req, res) => {
  const rows = await query("SELECT * FROM blog_posts WHERE slug = ? OR id = ?", [req.params.slug, req.params.slug]);
  if (!rows[0]) return res.status(404).json({ message: "Post not found" });
  res.json(mapPost(rows[0]));
});

blogRouter.post("/", requireAuth, async (req, res) => {
  const id = req.body.id || randomUUID();
  await query(
    `INSERT INTO blog_posts (id, slug, title, excerpt, content, cover_image, category, tags, author, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id, req.body.slug, JSON.stringify(req.body.title), JSON.stringify(req.body.excerpt),
      JSON.stringify(req.body.content), req.body.coverImage, req.body.category,
      JSON.stringify(req.body.tags || []), JSON.stringify(req.body.author), req.body.publishedAt,
    ],
  );
  const rows = await query("SELECT * FROM blog_posts WHERE id = ?", [id]);
  res.status(201).json(mapPost(rows[0]));
});

blogRouter.put("/:id", requireAuth, async (req, res) => {
  await query(
    `UPDATE blog_posts SET slug=?, title=?, excerpt=?, content=?, cover_image=?, category=?, tags=?, author=?, published_at=? WHERE id=?`,
    [
      req.body.slug, JSON.stringify(req.body.title), JSON.stringify(req.body.excerpt),
      JSON.stringify(req.body.content), req.body.coverImage, req.body.category,
      JSON.stringify(req.body.tags || []), JSON.stringify(req.body.author), req.body.publishedAt, req.params.id,
    ],
  );
  const rows = await query("SELECT * FROM blog_posts WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "Post not found" });
  res.json(mapPost(rows[0]));
});

blogRouter.delete("/:id", requireAuth, async (req, res) => {
  await query("DELETE FROM blog_posts WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

usersRouter.get("/", requireAuth, async (_req, res) => {
  const rows = await query("SELECT id, name, email, role, avatar FROM users ORDER BY created_at DESC");
  res.json(rows.map(mapUser));
});

mediaRouter.get("/", requireAuth, async (_req, res) => {
  const rows = await query("SELECT * FROM media_assets ORDER BY created_at DESC");
  res.json(rows.map((row) => ({
    id: row.id,
    name: row.name,
    type: row.type,
    url: row.url,
    folder: row.folder,
    size: Number(row.size),
    createdAt: row.created_at,
  })));
});

contactRouter.post("/", async (req, res) => {
  const { name, email, phone, company, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email and message are required" });
  }
  const id = randomUUID();
  await query(
    "INSERT INTO contact_messages (id, name, email, phone, company, message) VALUES (?, ?, ?, ?, ?, ?)",
    [id, name, email, phone || null, company || null, message],
  );
  res.status(201).json({ ok: true, id });
});

contactRouter.get("/", requireAuth, async (_req, res) => {
  const rows = await query("SELECT * FROM contact_messages ORDER BY created_at DESC");
  res.json(rows);
});

calculatorRouter.post("/", async (req, res) => {
  const id = randomUUID();
  await query(
    "INSERT INTO calculator_projects (id, user_email, input_json, result_json) VALUES (?, ?, ?, ?)",
    [id, req.body.email || null, JSON.stringify(req.body.input || {}), JSON.stringify(req.body.result || {})],
  );
  res.status(201).json({ ok: true, id });
});
