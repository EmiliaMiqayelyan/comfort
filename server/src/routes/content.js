import { Router } from "express";
import { randomUUID } from "node:crypto";
import { query } from "../db/pool.js";
import { mapProject, mapPost, mapUser, mapCertificate, mapDownloadFile } from "../lib/map.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../lib/upload.js";

export const projectsRouter = Router();
export const blogRouter = Router();
export const usersRouter = Router();
export const mediaRouter = Router();
export const contactRouter = Router();
export const calculatorRouter = Router();
export const certificatesRouter = Router();
export const downloadsRouter = Router();
export const settingsRouter = Router();

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

mediaRouter.post("/", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File is required" });
  const id = randomUUID();
  const url = `/uploads/${req.file.filename}`;
  const mime = req.file.mimetype || "";
  const type = mime.startsWith("image/")
    ? "image"
    : mime.startsWith("video/")
      ? "video"
      : mime.includes("pdf")
        ? "pdf"
        : "pdf";
  await query(
    "INSERT INTO media_assets (id, name, type, url, folder, size) VALUES (?, ?, ?, ?, 'uploads', ?)",
    [id, req.file.originalname || req.file.filename, type, url, req.file.size],
  );
  res.status(201).json({
    id,
    name: req.file.originalname || req.file.filename,
    type,
    url,
    folder: "uploads",
    size: req.file.size,
  });
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

certificatesRouter.get("/", async (_req, res) => {
  const rows = await query("SELECT * FROM certificates ORDER BY year DESC, created_at DESC");
  res.json(rows.map(mapCertificate));
});

certificatesRouter.get("/:id", async (req, res) => {
  const rows = await query("SELECT * FROM certificates WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "Certificate not found" });
  res.json(mapCertificate(rows[0]));
});

certificatesRouter.post("/", requireAuth, async (req, res) => {
  const id = req.body.id || randomUUID();
  await query(
    "INSERT INTO certificates (id, title, issuer, year, file_url, image) VALUES (?, ?, ?, ?, ?, ?)",
    [
      id,
      JSON.stringify(req.body.title),
      req.body.issuer || null,
      req.body.year || null,
      req.body.fileUrl,
      req.body.image || null,
    ],
  );
  const rows = await query("SELECT * FROM certificates WHERE id = ?", [id]);
  res.status(201).json(mapCertificate(rows[0]));
});

certificatesRouter.put("/:id", requireAuth, async (req, res) => {
  await query(
    "UPDATE certificates SET title=?, issuer=?, year=?, file_url=?, image=? WHERE id=?",
    [
      JSON.stringify(req.body.title),
      req.body.issuer || null,
      req.body.year || null,
      req.body.fileUrl,
      req.body.image || null,
      req.params.id,
    ],
  );
  const rows = await query("SELECT * FROM certificates WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "Certificate not found" });
  res.json(mapCertificate(rows[0]));
});

certificatesRouter.delete("/:id", requireAuth, async (req, res) => {
  await query("DELETE FROM certificates WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

downloadsRouter.get("/", async (req, res) => {
  const publicOnly = req.query.public === "true";
  const sql = publicOnly
    ? "SELECT * FROM download_files WHERE downloadable = 1 ORDER BY created_at DESC"
    : "SELECT * FROM download_files ORDER BY created_at DESC";
  const rows = await query(sql);
  res.json(rows.map(mapDownloadFile));
});

downloadsRouter.get("/:id", async (req, res) => {
  const rows = await query("SELECT * FROM download_files WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "File not found" });
  res.json(mapDownloadFile(rows[0]));
});

downloadsRouter.post("/", requireAuth, async (req, res) => {
  const id = req.body.id || randomUUID();
  await query(
    "INSERT INTO download_files (id, filename, title, category, url, file_size, downloadable) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      req.body.filename,
      JSON.stringify(req.body.title),
      req.body.category || "other",
      req.body.url,
      req.body.size || null,
      req.body.downloadable === false ? 0 : 1,
    ],
  );
  const rows = await query("SELECT * FROM download_files WHERE id = ?", [id]);
  res.status(201).json(mapDownloadFile(rows[0]));
});

downloadsRouter.put("/:id", requireAuth, async (req, res) => {
  await query(
    "UPDATE download_files SET filename=?, title=?, category=?, url=?, file_size=?, downloadable=? WHERE id=?",
    [
      req.body.filename,
      JSON.stringify(req.body.title),
      req.body.category || "other",
      req.body.url,
      req.body.size || null,
      req.body.downloadable === false ? 0 : 1,
      req.params.id,
    ],
  );
  const rows = await query("SELECT * FROM download_files WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "File not found" });
  res.json(mapDownloadFile(rows[0]));
});

downloadsRouter.delete("/:id", requireAuth, async (req, res) => {
  await query("DELETE FROM download_files WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

const defaultContactSettings = {
  phones: ["+374 00 000000"],
  emails: ["info@comfort.am"],
  address: { en: "Yerevan, Armenia", ru: "Ереван, Армения", am: "Երևան, Հայաստան" },
  hours: { en: "Mon–Sat 10:00–19:00", ru: "Пн–Сб 10:00–19:00", am: "Երկ–Շբ 10:00–19:00" },
  socials: [
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/37400000000" },
    { id: "telegram", label: "Telegram", href: "https://t.me/comfort" },
    { id: "facebook", label: "Facebook", href: "https://facebook.com" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  ],
  showrooms: [
    {
      id: "yerevan",
      name: "Yerevan Showroom",
      address: "15 Northern Ave, Yerevan, Armenia",
      hours: "Mon–Sat 10:00–19:00",
      phone: "+374 00 000000",
    },
  ],
};

settingsRouter.get("/contact", async (_req, res) => {
  const rows = await query("SELECT setting_value FROM site_settings WHERE setting_key = 'contact'");
  if (!rows[0]) return res.json(defaultContactSettings);
  res.json(typeof rows[0].setting_value === "string" ? JSON.parse(rows[0].setting_value) : rows[0].setting_value);
});

settingsRouter.put("/contact", requireAuth, async (req, res) => {
  const value = JSON.stringify(req.body || defaultContactSettings);
  await query(
    `INSERT INTO site_settings (setting_key, setting_value) VALUES ('contact', ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    [value],
  );
  res.json(req.body || defaultContactSettings);
});

