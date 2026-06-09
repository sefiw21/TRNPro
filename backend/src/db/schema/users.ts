import { sql } from "drizzle-orm";
import { check, index, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { roleEnum } from "./schemaEnums.js";


export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).unique(),
  phone: varchar("phone", { length: 255 }).unique(),

  // AUTHENTICATION
  passwordHash: text("password_hash"),
  authProvider: varchar("auth_provider", { length: 50 }).default("local").notNull(),
  googleId: varchar("google_id", { length: 255 }).unique(), // For Google Fast-Entry

  // PLATFORM DATA
  profilePicture: jsonb("profile_picture").$type<{
    url: string;
    publicId: string;
    width?: number;
    height?: number;
  }>(),
  role: roleEnum("role").default("user").notNull(),
  refreshToken: text("refresh_token"),


  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
}, (table) => {
  return [
    index("email_idx").on(table.email),
    index("phone_idx").on(table.phone),
    check(
      "email_or_phone_required",
      sql`"email" IS NOT NULL OR "phone" IS NOT NULL`
    ),
  ];
});