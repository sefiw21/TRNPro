import { type FastifyInstance } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { checkRole } from "../modules/users/middleware/checkRole.js";
import userController from "../modules/users/user.Controllers.js";
import {
  googleLoginSchema,
  loginSchema,
  signupSchema,
  type GoogleLoginInput,
  type LoginInput,
  type SignupInput,
} from "../modules/users/user.Schema.js";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.post<{ Body: SignupInput }>(
    "/register",
    {
      schema: {
        body: signupSchema,
      },
    },
    userController.createUser,
  );
  fastify.post<{ Body: GoogleLoginInput }>(
    "/google",
    {
      schema: {
        body: googleLoginSchema,
      },
    },
    userController.googleLogin,
  );
  fastify.post<{ Body: LoginInput }>(
    "/login",
    {
      schema: {
        body: loginSchema,
      },
    },
    userController.logInUser,
  );

  fastify.get(
    "/getAllUsers",
    { preValidation: [fastify.authenticate, checkRole] },
    userController.getAllUsers,
  );

  fastify.get("/refresh", userController.refreshToken);
  fastify.get("/logout", userController.logout);
  fastify.get(
    "/me",
    { preValidation: [fastify.authenticate] },
    userController.getMe,
  );
}
