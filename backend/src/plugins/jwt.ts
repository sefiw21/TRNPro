import jwt from "@fastify/jwt";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

const jwtPlugin = async (fastify: FastifyInstance) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  await fastify.register(jwt, { secret });

  //Decoration for Authentication
  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        console.log("from authenticaton:", request.headers);
        await request.jwtVerify();
      } catch (err) {
        console.log("from authenticaton failed:", err);

        return reply.status(401).send({ message: "Unauthorized", error: err });
      }
    },
  );
};

export default fp(jwtPlugin);
