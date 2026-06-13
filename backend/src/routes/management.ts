import "@fastify/multipart";
import type { FastifyInstance } from "fastify";
import { managementController } from "../modules/management/management.Controllers.js";
interface CreateSystemRoute {
    Body: {
        systemName: string;
        systemType: "family" | "office";
        description: string;
        creatorId: string;
    }
}
export async function managementRoutes(fastify: FastifyInstance) {
    console.log("data arrive managementRoutes.")

    fastify.post<CreateSystemRoute>("/createSystem", { onRequest: [fastify.authenticate] },
        managementController.createSystem
    );


    fastify.get("/getSystem", { onRequest: [fastify.authenticate] },
        managementController.getUserSystems
    );

    fastify.get<{ Params: { id: string } }>("/getSingleSystem/:id", { onRequest: [fastify.authenticate] },
        managementController.getSingleSystem
    );

    fastify.delete<{ Params: { id: string } }>("/deleteSingleSystem/:id", { onRequest: [fastify.authenticate] },
        managementController.deleteSingleSystem
    );
}
