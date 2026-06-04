import { relations } from "drizzle-orm";
import { jsonb, pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.js"; // <-- Import the users table!

export const organizationForms = pgTable("organization_forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  creatorId: uuid("creator_id").references(() => users.id).notNull(), 
  orgName: varchar("org_name", { length: 255 }).notNull(),
  formTitle: varchar("form_title", { length: 255 }).notNull(),
  fieldsSchema: jsonb("fields_schema").notNull().default([]), 
}, (table) => {
  return {
    // COMPOSITE CONSTRAINT: Prevents creating "Staff Form" twice inside "Debre Selam"
    uniqueFormPerOrg: unique("unique_form_per_org").on(table.orgName, table.formTitle),
  };
});

export const formsRelations = relations(organizationForms, ({ one }) => ({
  creator: one(users, {
    fields: [organizationForms.creatorId],
    references: [users.id],
  }),
}));