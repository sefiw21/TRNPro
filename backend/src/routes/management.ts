import "@fastify/multipart";
import type { FastifyInstance } from "fastify";
import { uploadSystemLogo } from "../services/cloudinary.service.js";

export async function managementRoutes(fastify: FastifyInstance) {
    fastify.post("/createSystem", async (request, reply) => {
        try {
            console.log("you arriv backend !!!!!!!!!!!")

            const parts = request.parts();
            let orgName = "";
            let description = "";
            let logoUrl = "";
            let logoPublicId = ""

            for await (const part of parts) {
                if (part.type === 'file') {
                    if (part.fieldname === 'logo') {
                        const uploadResult = await uploadSystemLogo(part.file);
                        logoUrl = uploadResult.url;
                        logoPublicId = uploadResult.publicId;
                    }
                }
                else if (part.type === 'field') {
                    if (part.fieldname === "orgName") orgName = part.value as string;
                    if (part.fieldname === "description") description = part.value as string;
                }
            }

            if (!orgName) {
                return reply.status(400).send({ success: false, message: "orgName is required" });
            }

            // Next step: Insert { orgName, description, logoUrl } into Drizzle ORM
            console.log("url and fild name ", orgName, logoUrl)
            console.log("logoPublicId ", logoPublicId)

            return reply.status(201).send({
                success: true,
                message: "System initialized beautifully!",
                data: { orgName, logoUrl }
            });

        } catch (error) {
            console.error("❌ System Creation Error:", error);
            return reply.status(500).send({ success: false, message: "Failed to process request" });
        }
    });
}