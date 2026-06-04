import type { FastifyReply, FastifyRequest } from "fastify";

export const checkRole = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userRole = request.user.role;
  console.log("checkRole middleware: User role is ", userRole);
  if (userRole !== "admin") {
    return reply.status(403).send({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
};
