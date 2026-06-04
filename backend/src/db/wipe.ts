// /home/sefiw/desktop/projects/TRNpro/backend/src/db/wipe.ts
import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function wipeDatabase() {
  console.log("💣 Initializing database wipe...");
  try {
    const client = await pool.connect();
    // Drop everything in the public schema and reconstruct a blank slate
    await client.query("DROP SCHEMA public CASCADE;");
    await client.query("CREATE SCHEMA public;");
    await client.query("GRANT ALL ON SCHEMA public TO public;");
    
    console.log("💥 Database cleaned perfectly! It is now a total blank slate.");
    client.release();
  } catch (error) {
    console.error("❌ Failed to wipe database:", error);
  } finally {
    await pool.end();
  }
}

wipeDatabase();