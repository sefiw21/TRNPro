import {
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("user_role", [
  "admin",
  "second_admin",
  "father",
  "mother",
  "big_brother",
  "big_sister",
  "user",
]);
// Users Table (for your Signup Page)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email_phone", { length: 255 }).unique().notNull(),
  passwordHash: text("password_hash"),
  authProvider: varchar("auth_provider", { length: 50 })
    .default("local")
    .notNull(),
  profilePicture: text("profile_picture"),
  role: roleEnum("role").default("user").notNull(),
  refreshToken: text("refresh_token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// User Actions (For Mental, Physical, Management, Spiritual features)
export const userActions = pgTable("user_actions", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  feature: varchar("feature", { length: 50 }), // e.g., 'Spiritual'
  data: jsonb("data"), // Store the "many informations" here flexibly
  createdAt: timestamp("created_at").defaultNow(),
});
