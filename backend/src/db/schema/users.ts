import { index, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", ["admin", "user", "father", "mother", "big_brother", "big_sister", "second_admin"]);

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
}, table=>{
  return{
// PERFORMANCE INDEX: Speeds up queries searching for actions by a specific user id
    userIdIdx: index("user_id_idx").on(table.id),  }
});

