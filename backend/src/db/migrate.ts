import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

// Create a temporary connection pool strictly for running the migration
const migrationPool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
  max: 1, // Only use 1 connection to prevent database locking during structural updates
});

const db = drizzle(migrationPool);

async function runMigrations() {
  console.log(" Running database migrations from your root ./drizzle folder...");
  
  try {
    // This points to your professional root level drizzle folder where your .sql files live
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log(" All migrations applied successfully! Your database structure is up-to-date.");
  } catch (error) {
    console.error(" Migration failed error details:", error);
    process.exit(1); // Force exit with error code so deployment systems know it failed
  } finally {
    // Safely close the pool connection when done
    await migrationPool.end(); 
  }
}

runMigrations();