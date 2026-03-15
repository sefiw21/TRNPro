import type { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
  // Public: list all users (no auth)
  app.get("/", async (request, reply) => {
    return { users: ["sefiw amare"] };
  });

  // Protected: get current user (requires auth)
  app.get("/me", { onRequest: [app.authenticate] }, async (request, reply) => {
    return { user: request.user }; // From JWT payload
  });

  // Protected: get user by ID
  app.get<{ Params: { id: string } }>(
    "/:id",
    { onRequest: [app.authenticate] },
    async (request, reply) => {
      const { id } = request.params;
      return { user: { id, email: "user@example.com" } };
    },
  );
}
