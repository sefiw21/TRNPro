
import { index, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { roleEnum } from "../schemaEnums.js";
import { users } from "../users.js";
import { organizations } from "./management.js";

export const organizationMemberships = pgTable("organization_memberships", {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    organizationId: uuid("organization_id").references(() => organizations.id, { onDelete: "cascade" }).notNull(),

    role: roleEnum("role").default("member").notNull(),

    joinedAt: timestamp("joined_at").defaultNow().notNull(),
}, (table) => {
    return [
        index("membership_user_id_idx").on(table.userId),
        index("membership_org_id_idx").on(table.organizationId),
    ];
});