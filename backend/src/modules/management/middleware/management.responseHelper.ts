import { type FastifyReply } from "fastify";

export const sendSystemCreateSuccess = async (
    reply: FastifyReply,
    data: any,
    message: string,
    statusCode: number = 200,
) => {

    return reply.status(statusCode).send({
        success: true,
        message: message,
        data: data
    });
};
