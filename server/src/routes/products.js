import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { query } from "../db/pool.js";
import { mapProduct } from "../lib/map.js";
import { requireAuth } from "../middleware/auth.js";
import { fillLocalized, handleDbError, localizedSchema } from "../lib/http.js";

const productSchema = z.object({
  slug: z.string().trim().min(1),
  sku: z.string().trim().min(1),
  name: localizedSchema,
  description: localizedSchema.optional(),
  categoryId: z.string().min(1),
  collectionId: z.string().min(1),
  images: z.array(z.string()).optional(),
  modelUrl: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  height: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  depth: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  colors: z.array(z.any()).optional(),
  textures: z.array(z.any()).optional(),
  specs: z.array(z.any()).optional(),
  downloads: z.array(z.any()).optional(),
  price: z.coerce.number().optional(),
  featured: z.boolean().optional(),
  availability: z.enum(["in_stock", "limited", "preorder"]).optional(),
});

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { category, collection, q, featured } = req.query;
    let sql = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (category) {
      sql += " AND category_id = ?";
      params.push(category);
    }
    if (collection) {
      sql += " AND collection_id = ?";
      params.push(collection);
    }
    if (featured === "true") {
      sql += " AND featured = 1";
    }
    if (q) {
      sql += " AND (sku LIKE ? OR slug LIKE ? OR CAST(name AS CHAR) LIKE ?)";
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    sql += " ORDER BY featured DESC, created_at DESC";
    const rows = await query(sql, params);
    return res.json(rows.map(mapProduct));
  } catch (error) {
    return handleDbError(res, error);
  }
});

productsRouter.get("/:slug", async (req, res) => {
  try {
    const rows = await query("SELECT * FROM products WHERE slug = ? OR id = ?", [req.params.slug, req.params.slug]);
    if (!rows[0]) return res.status(404).json({ message: "Product not found" });
    return res.json(mapProduct(rows[0]));
  } catch (error) {
    return handleDbError(res, error);
  }
});

productsRouter.post("/", requireAuth, async (req, res) => {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Please fill all required product fields" });
  }

  const body = parsed.data;
  if (!body.name.en.trim()) {
    return res.status(400).json({ message: "English name is required" });
  }

  try {
    const id = req.body.id || randomUUID();
    await query(
      `INSERT INTO products
        (id, slug, sku, name, description, category_id, collection_id, images, model_url, video_url,
         height, width, depth, length, material, finish, colors, textures, specs, downloads, price, featured, availability)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, body.slug, body.sku, JSON.stringify(fillLocalized(body.name)),
        JSON.stringify(fillLocalized(body.description)),
        body.categoryId, body.collectionId, JSON.stringify((body.images || []).filter(Boolean)),
        body.modelUrl || null, body.videoUrl || null,
        body.height ?? 0, body.width ?? 0, body.depth ?? 0, body.length ?? 0,
        body.material || "HD polymer", body.finish || "Matte",
        JSON.stringify(body.colors || []), JSON.stringify(body.textures || []),
        JSON.stringify(body.specs || []), JSON.stringify(body.downloads || []),
        body.price ?? 0, body.featured ? 1 : 0, body.availability || "in_stock",
      ],
    );
    const rows = await query("SELECT * FROM products WHERE id = ?", [id]);
    return res.status(201).json(mapProduct(rows[0]));
  } catch (error) {
    return handleDbError(res, error);
  }
});

productsRouter.put("/:id", requireAuth, async (req, res) => {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Please fill all required product fields" });
  }

  const body = parsed.data;
  if (!body.name.en.trim()) {
    return res.status(400).json({ message: "English name is required" });
  }

  try {
    await query(
      `UPDATE products SET
        slug=?, sku=?, name=?, description=?, category_id=?, collection_id=?, images=?,
        model_url=?, video_url=?, height=?, width=?, depth=?, length=?, material=?, finish=?,
        colors=?, textures=?, specs=?, downloads=?, price=?, featured=?, availability=?
       WHERE id=?`,
      [
        body.slug, body.sku, JSON.stringify(fillLocalized(body.name)),
        JSON.stringify(fillLocalized(body.description)),
        body.categoryId, body.collectionId, JSON.stringify((body.images || []).filter(Boolean)),
        body.modelUrl || null, body.videoUrl || null,
        body.height ?? 0, body.width ?? 0, body.depth ?? 0, body.length ?? 0,
        body.material || "HD polymer", body.finish || "Matte",
        JSON.stringify(body.colors || []), JSON.stringify(body.textures || []),
        JSON.stringify(body.specs || []), JSON.stringify(body.downloads || []),
        body.price ?? 0, body.featured ? 1 : 0, body.availability || "in_stock",
        req.params.id,
      ],
    );
    const rows = await query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ message: "Product not found" });
    return res.json(mapProduct(rows[0]));
  } catch (error) {
    return handleDbError(res, error);
  }
});

productsRouter.delete("/:id", requireAuth, async (req, res) => {
  await query("DELETE FROM products WHERE id = ?", [req.params.id]);
  res.status(204).end();
});
