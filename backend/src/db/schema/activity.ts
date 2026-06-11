import { jsonb, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import type { ActionDataPayload } from "./schemaEnums.js";
import { users } from "./users.js";

// 1. Define strict payload shapes for individual features

export const userActions = pgTable("user_actions", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  feature: varchar("feature", { length: 50 }).notNull(),
  data: jsonb("data").$type<ActionDataPayload>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});