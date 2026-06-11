import fastify from "fastify";
const server = fastify({ logger: true });
server.get("/", async (request, reply) => {
  server.log.error("Error occurred while serving root endpoint");
  request.log.info("Serving root endpoint");
  return " welcome to the world of backend with fastify server";
});
server.get("/ping", async (request, reply) => {
  request.log.info("Serving ping endpoint");
  return "pong\n  to backend with fastify";
});
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=index.js.map
