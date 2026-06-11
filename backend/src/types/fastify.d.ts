import dotenv from "dotenv";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import "fastify";
import * as schema from "../db/schema"; // Adjust this path to your schema
dotenv.config();

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: import("fastify").FastifyRequest,
      reply: import("fastify").FastifyReply,
    ) => Promise<void>;
    db: PostgresJsDatabase<typeof schema>;
  }
}
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: string; email: string; role: string };
    user: { id: string; email: string; role: string };
  }
}
