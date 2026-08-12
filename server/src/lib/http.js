import { z } from "zod";

export const localizedSchema = z.object({
  en: z.string().default(""),
  ru: z.string().default(""),
  am: z.string().default(""),
});

export function fillLocalized(value = {}) {
  const en = String(value.en || "").trim();
  return {
    en,
    ru: String(value.ru || "").trim() || en,
    am: String(value.am || "").trim() || en,
  };
}

export function handleDbError(res, error) {
  if (
    error?.code === "ECONNREFUSED" ||
    error?.code === "PROTOCOL_CONNECTION_LOST" ||
    error?.code === "ENOTFOUND" ||
    error?.code === "ETIMEDOUT"
  ) {
    return res.status(503).json({
      message: "Database connection failed. Start MySQL (XAMPP) and run npm run db:init.",
    });
  }
  if (error?.code === "ER_ACCESS_DENIED_ERROR") {
    return res.status(503).json({
      message: "Database access denied. Check MYSQL_PASSWORD in server/.env.",
    });
  }
  if (error?.code === "ER_BAD_DB_ERROR") {
    return res.status(503).json({
      message: "Database 'comfort' not found. Run npm run db:init.",
    });
  }
  if (error?.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ message: "Slug or SKU already exists" });
  }
  if (error?.code === "ER_NO_REFERENCED_ROW_2" || error?.code === "ER_NO_REFERENCED_ROW") {
    return res.status(400).json({ message: "Invalid category or collection" });
  }
  if (error?.code === "ER_ROW_IS_REFERENCED_2" || error?.code === "ER_ROW_IS_REFERENCED") {
    return res.status(409).json({ message: "Cannot delete: related products still exist" });
  }
  console.error(error);
  return res.status(500).json({ message: error.message || "Internal server error" });
}
