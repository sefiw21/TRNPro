import { and, eq } from 'drizzle-orm';
import { db } from "../../db/index.js";
import { organizations } from "../../db/schema/index.js";
import type { createSystemType } from "./management.Schema.js";

export const managementService = {
    async createSystem(orgData: createSystemType) {
        console.log("data arrive managementService.")

        const { systemName, systemType, description, creatorId } = orgData;
        try {
            const [newOrg] = await db.
                insert(organizations).values({
                    systemName,
                    systemType,
                    description,
                    creatorId
                }).returning({
                    id: organizations.id,
                    creatorId: organizations.creatorId,
                    systemName: organizations.systemName,
                    systemType: organizations.systemType,
                    description: organizations.description,
                    logoUrl: organizations.logoUrl,
                    logoPublicId: organizations.logoPublicId,
                    createdAt: organizations.createdAt,
                    updatedAt: organizations.updatedAt
                })
            return newOrg;
        } catch (error) {
            throw error;

        }

    },

    async getUserSystems(creatorId: string) {
        console.log(`Fetching systems from database for user: ${creatorId}`);

        try {
            const userSystems = await db
                .select()
                .from(organizations)
                .where(eq(organizations.creatorId, creatorId));

            return userSystems; // Will return an array of objects: [{...}, {...}]

        } catch (error) {
            console.error("Database error while fetching systems:", error);
            throw new Error("Failed to fetch user systems.");
        }
    },

    async getSystemById(systemId: string, creatorId: string,) {
        console.log(`Fetching system from database for user: ${creatorId} and system id ${systemId}`);

        try {
            const [system] = await db
                .select()
                .from(organizations)
                .where(
                    and(
                        eq(organizations.id, systemId),
                        eq(organizations.creatorId, creatorId)
                    )
                );

            return system;

        } catch (error) {
            console.error("Database error while fetching a system:", error);
            throw new Error("Failed to fetch a system.");
        }
    },
    async deleteSingleSystem(systemId: string, creatorId: string,) {
        console.log(`deleting system from database for user: ${creatorId} and system id ${systemId}`);

        try {
            const system = await db
                .delete(organizations)
                .where(
                    and(
                        eq(organizations.id, systemId),
                        eq(organizations.creatorId, creatorId)
                    )
                );

            return system;

        } catch (error) {
            console.error("Database error while deleting systems:", error);
            throw new Error("Failed to delete user systems.");
        }
    }
}