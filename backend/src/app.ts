import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import fastify, { type FastifyError } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import jwtPlugin from "./plugins/jwt.js";
import { authRoutes } from "./routes/auth.js";
import { userRoutes } from "./routes/users.js";
dotenv.config();
export function buildApp() {
  // const app = fastify({ logger: true });
  const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  // SET THE COMPILERS (The "Translators")
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Register CORS
  app.register(cors, {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    // origin: [ "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });
  const cookieSecrate = process.env.COOKIE_SECRET;
  if (!cookieSecrate) {
    throw new Error("COOKIE_SECRET environment variable is not set");
  }
  app.register(fastifyCookie, {
    secret: cookieSecrate, // Used to sign the cookie
    hook: "onRequest",
  });
  app.register(jwtPlugin);
  app.register(userRoutes, { prefix: "/api/users" });
  app.register(authRoutes, { prefix: "/api/auth" });

  app.setErrorHandler((error: FastifyError, request, reply) => {
    //CATCH ZOD VALIDATION ERRORS SPECIFICALLY
    if (error.validation) {
      return reply.status(400).send({
        success: false,
        message: "Validation Error",
        errors: error.validation, // Tells frontend exactly what's wrong
      });
    }

    if (error.statusCode === 401) {
      return reply.status(401).send({ message: "Unauthorized: Invalid Token" });
    }

    request.log.error(error);
    reply.status(500).send({ error: "Internal Server Error" });
  });

  return app;
}
