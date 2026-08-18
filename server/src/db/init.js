import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function init() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    multipleStatements: true,
  });

  const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  await connection.query(schema);

  async function tryAlter(sql) {
    try {
      await connection.query(sql);
    } catch {
      /* already applied or not needed */
    }
  }

  await tryAlter("ALTER TABLE comfort.categories ADD COLUMN parent_id CHAR(36) NULL");
  await tryAlter("ALTER TABLE comfort.products DROP FOREIGN KEY fk_products_collection");
  await tryAlter("ALTER TABLE comfort.products MODIFY collection_id CHAR(36) NULL");
  await tryAlter(
    `ALTER TABLE comfort.products
     ADD CONSTRAINT fk_products_collection
     FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL`,
  );
  await connection.end();
  console.log("MySQL schema ready.");
}

init().catch((error) => {
  console.error(error);
  process.exit(1);
});
