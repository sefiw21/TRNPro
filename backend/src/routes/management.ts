import "@fastify/multipart";
import type { FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

export async function managementRoutes(fastify: FastifyInstance) {
    fastify.setValidatorCompiler(validatorCompiler);
    fastify.setSerializerCompiler(serializerCompiler);

    fastify.post("/createSystem", async (request, reply) => {
        try {
            // 1. Ask Fastify for all the parts (text AND optional files)
            const parts = request.parts();

            // 2. Set up empty variables to hold our text data
            let companyName = "";
            let type = "";
            let description = "";
            let fileUploaded = false;

            // 3. Loop through every piece of data React sent
            for await (const part of parts) {

                if (part.type === 'file') {
                    // WE FOUND A FILE!
                    fileUploaded = true;
                    console.log("📁 File Name:", part.filename);
                    console.log("📁 File Type:", part.mimetype);

                    // Drain the stream into memory for this test
                    const buffer = await part.toBuffer();
                    console.log("📁 File Size:", buffer.length, "bytes");

                } else {
                    // WE FOUND A TEXT FIELD!
                    // Note: part.value is guaranteed to be here for text fields!
                    if (part.fieldname === "companyName") companyName = part.value as string;
                    if (part.fieldname === "type") type = part.value as string;
                    if (part.fieldname === "description") description = part.value as string;
                }
            }

            // 4. Log the final extracted text!
            console.log("=== 🚀 INCOMING SYSTEM DATA ===");
            console.log("Name:", companyName);
            console.log("Type:", type);
            console.log("Description:", description);
            console.log("File Included?", fileUploaded);
            console.log("===============================");

            return reply.status(200).send({
                success: true,
                message: "Test passed beautifully!",
            });

        } catch (error) {
            console.error("❌ Error caught in route:", error);
            return reply.status(500).send({ success: false, message: "Test failed" });
        }
    });
}