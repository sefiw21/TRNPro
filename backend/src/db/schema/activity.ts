// /home/sefiw/desktop/projects/TRNpro/backend/src/db/schema/activity.ts
import { jsonb, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.js";

// 1. Define strict payload shapes for individual features
export type ManagementPayload = { 
  action: "form_created" | "form_deleted"; 
  formId: string; 
  title: string; 
};

export type MentalPayload = { 
  action: "holy_check_in"; 
  score: number; 
  dominant_emotion: string; 
};

export type SpiritualPayload = { 
  action: "fasting_logged"; 
  type: string; 
  hours_completed: number; 
};

// 2. Combine them into a single Discriminated Union
export type ActionDataPayload = 
  | { feature: "management"; meta: ManagementPayload }
  | { feature: "mental"; meta: MentalPayload }
  | { feature: "spiritual"; meta: SpiritualPayload };

export const userActions = pgTable("user_actions", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  feature: varchar("feature", { length: 50 }).notNull(), 
  data: jsonb("data").$type<ActionDataPayload>().notNull(), 
  createdAt: timestamp("created_at").defaultNow(),
});