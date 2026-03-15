import fp from "fastify-plugin";
import { db, pool } from "../db/index.js";

export default fp(async (fastify) => {
  // We decorate Fastify so we can use fastify.db in routes
  fastify.decorate("db", db);

  // We tell Fastify to shut down the pool when the server stops
  fastify.addHook("onClose", async () => {
    await pool.end();
    fastify.log.info("Database connection closed gracefully.");
  });
});
