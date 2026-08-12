import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { query } from "../db/pool.js";
import { mapUser } from "../lib/map.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const { email, password } = parsed.data;
  const rows = await query("SELECT * FROM users WHERE email = ?", [email]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET || "change-this-comfort-jwt-secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  return res.json({ token, user: mapUser(user) });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const rows = await query("SELECT * FROM users WHERE id = ?", [req.user.id]);
  if (!rows[0]) return res.status(404).json({ message: "User not found" });
  return res.json(mapUser(rows[0]));
});
