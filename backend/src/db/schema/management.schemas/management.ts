import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "../users.js";

export const orgTypeEnum = pgEnum("org_type", ["family", "office"]);

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),

  // MEDIA
  logoUrl: text("logo_url"),
  logoPublicId: text("logo_public_id"),

  // ARCHITECTURE & ROUTING
  orgType: orgTypeEnum("org_type").default("family").notNull(),

  // OWNERSHIP (Who create the system)
  creatorId: uuid("creator_id")
    .references(() => users.id)
    .notNull(),

  // FUTURE PROOFING (Active, Suspended, Archived)
  status: varchar("status", { length: 50 }).default("active").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

