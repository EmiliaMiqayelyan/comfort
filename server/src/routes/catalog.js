import { Router } from "express";
import { randomUUID } from "node:crypto";
import { query } from "../db/pool.js";
import { mapCategory, mapCollection } from "../lib/map.js";
import { requireAuth } from "../middleware/auth.js";
import { handleDbError } from "../lib/http.js";

export const categoriesRouter = Router();
export const collectionsRouter = Router();

categoriesRouter.get("/", async (_req, res) => {
  try {
    const rows = await query(`
      SELECT c.*, (
        SELECT COUNT(*) FROM products p
        WHERE p.category_id = c.id
           OR p.category_id IN (SELECT id FROM categories WHERE parent_id = c.id)
      ) AS product_count
      FROM categories c
      ORDER BY c.parent_id IS NOT NULL, c.slug
    `);
    return res.json(rows.map(mapCategory));
  } catch (error) {
    return handleDbError(res, error);
  }
});

categoriesRouter.get("/:slug", async (req, res) => {
  const rows = await query(
    `SELECT c.*, (
        SELECT COUNT(*) FROM products p
        WHERE p.category_id = c.id
           OR p.category_id IN (SELECT id FROM categories WHERE parent_id = c.id)
      ) AS product_count
     FROM categories c
     WHERE c.slug = ? OR c.id = ?`,
    [req.params.slug, req.params.slug],
  );
  if (!rows[0]) return res.status(404).json({ message: "Category not found" });
  res.json(mapCategory(rows[0]));
});

categoriesRouter.post("/", requireAuth, async (req, res) => {
  const id = req.body.id || randomUUID();
  await query(
    "INSERT INTO categories (id, slug, name, description, image, parent_id) VALUES (?, ?, ?, ?, ?, ?)",
    [
      id,
      req.body.slug,
      JSON.stringify(req.body.name),
      JSON.stringify(req.body.description),
      req.body.image,
      req.body.parentId || null,
    ],
  );
  const rows = await query("SELECT *, 0 AS product_count FROM categories WHERE id = ?", [id]);
  res.status(201).json(mapCategory(rows[0]));
});

categoriesRouter.put("/:id", requireAuth, async (req, res) => {
  await query(
    "UPDATE categories SET slug=?, name=?, description=?, image=?, parent_id=? WHERE id=?",
    [
      req.body.slug,
      JSON.stringify(req.body.name),
      JSON.stringify(req.body.description),
      req.body.image,
      req.body.parentId || null,
      req.params.id,
    ],
  );
  const rows = await query("SELECT *, 0 AS product_count FROM categories WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "Category not found" });
  res.json(mapCategory(rows[0]));
});

categoriesRouter.delete("/:id", requireAuth, async (req, res) => {
  await query("DELETE FROM categories WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

collectionsRouter.get("/", async (_req, res) => {
  try {
    const rows = await query(`
      SELECT c.*, COUNT(p.id) AS product_count
      FROM collections c
      LEFT JOIN products p ON p.collection_id = c.id
      GROUP BY c.id
      ORDER BY c.slug
    `);
    return res.json(rows.map(mapCollection));
  } catch (error) {
    return handleDbError(res, error);
  }
});

collectionsRouter.get("/:slug", async (req, res) => {
  const rows = await query(
    `SELECT c.*, COUNT(p.id) AS product_count
     FROM collections c
     LEFT JOIN products p ON p.collection_id = c.id
     WHERE c.slug = ? OR c.id = ?
     GROUP BY c.id`,
    [req.params.slug, req.params.slug],
  );
  if (!rows[0]) return res.status(404).json({ message: "Collection not found" });
  res.json(mapCollection(rows[0]));
});

collectionsRouter.post("/", requireAuth, async (req, res) => {
  const id = req.body.id || randomUUID();
  await query(
    "INSERT INTO collections (id, slug, name, description, image, style) VALUES (?, ?, ?, ?, ?, ?)",
    [id, req.body.slug, JSON.stringify(req.body.name), JSON.stringify(req.body.description), req.body.image, req.body.style],
  );
  const rows = await query("SELECT *, 0 AS product_count FROM collections WHERE id = ?", [id]);
  res.status(201).json(mapCollection(rows[0]));
});

collectionsRouter.put("/:id", requireAuth, async (req, res) => {
  await query(
    "UPDATE collections SET slug=?, name=?, description=?, image=?, style=? WHERE id=?",
    [req.body.slug, JSON.stringify(req.body.name), JSON.stringify(req.body.description), req.body.image, req.body.style, req.params.id],
  );
  const rows = await query("SELECT *, 0 AS product_count FROM collections WHERE id = ?", [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: "Collection not found" });
  res.json(mapCollection(rows[0]));
});

collectionsRouter.delete("/:id", requireAuth, async (req, res) => {
  await query("DELETE FROM collections WHERE id = ?", [req.params.id]);
  res.status(204).end();
});
