
import { type FastifyReply, type FastifyRequest } from "fastify";
import type { createSystemType, systemResponseType } from "./management.Schema.js";
import { managementService } from "./management.Service.js";
import { sendSystemCreateSuccess } from "./middleware/management.responseHelper.js";

export const managementController = {
    async createSystem(
        request: FastifyRequest<{ Body: createSystemType }>,
        reply: FastifyReply) {
        try {
            console.log("data arrive managementController.")
            const creatorId = request.user.id
            const { systemName, systemType, description } = request.body;
            const orgData = { systemName, systemType, description, creatorId };
            console.log("org data: ", orgData);
            const newOrg: systemResponseType = await managementService.createSystem(orgData);

            if (newOrg) {
                return await sendSystemCreateSuccess(
                    reply,
                    newOrg,
                    "System Created successfully",
                    201
                )
            }
        } catch (error) {
            console.error("System Creation Error:", error);
            return reply.status(500).send({ success: false, message: "Failed to process request" });
        }
    },

    async getUserSystems(
        request: FastifyRequest,
        reply: FastifyReply) {
        try {
            const creatorId = request.user.id
            const systems = await managementService.getUserSystems(creatorId);

            if (systems) {
                return await sendSystemCreateSuccess(
                    reply,
                    systems,
                    "Get Systems successfully",
                    200
                )
            }
        } catch (error) {
            console.error("System Creation Error:", error);
            return reply.status(500).send({ success: false, message: "Failed to process request" });
        }
    },

    async getSingleSystem(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply) {
        try {
            const systemId = request.params.id;
            const creatorId = request.user.id;
            const system = await managementService.getSystemById(systemId, creatorId);
            if (system) {
                return await sendSystemCreateSuccess(
                    reply,
                    system,
                    "Get a System successfully",
                    200
                )
            } else {
                return reply.status(404).send({ success: false, message: "System not found" });
            }
        } catch (error) {
            console.error("GEt System Error:", error);
            return reply.status(500).send({ success: false, message: "Failed to process request" });
        }
    },

    async deleteSingleSystem(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply) {
        try {
            const systemId = request.params.id;
            const creatorId = request.user.id;
            const system = await managementService.deleteSingleSystem(systemId, creatorId);
            if (system) {
                return await sendSystemCreateSuccess(
                    reply,
                    system,
                    "Delete a System successfully",
                    200
                )
            } else {
                return reply.status(404).send({ success: false, message: "System not found" });
            }
        } catch (error) {
            console.error("System Deletion Error:", error);
            return reply.status(500).send({ success: false, message: "Failed to process request" });
        }
    }
}