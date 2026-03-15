import { type FastifyReply } from "fastify";
import userService from "../user.service.js";

export const sendAuthSuccess = async (
  reply: FastifyReply,
  user: any,
  message: string,
  statusCode: number = 200,
) => {
  const accessToken = await reply.jwtSign(
    { id: user.id, email: user.email, role: user.role },
    { expiresIn: "15m" },
  );

  const refreshToken = await reply.jwtSign(
    { id: user.id, email: user.email, role: user.role },
    { expiresIn: "30d" },
  );

  await userService.updateUser(user.id, { refreshToken: refreshToken });

  //  Attach as HTTP-Only SIGNED Cookie
  reply.setCookie("refreshToken", refreshToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    signed: true, // <--- ADD THIS! This tells Fastify to use our secret!
  });

  return reply.status(statusCode).send({
    success: true,
    message: message,
    token: accessToken,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
    },
  });
};
