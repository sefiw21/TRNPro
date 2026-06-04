import { type FastifyReply, type FastifyRequest } from "fastify";
import { authService } from "./middleware/authService.js";
import { sendAuthSuccess } from "./middleware/user.responseHelper.js";
import type { LoginInput, SignupInput, UserResponse } from "./user.Schema.js";
import { default as userService } from "./user.service.js";

const userController = {
  async createUser(
    request: FastifyRequest<{ Body: SignupInput }>,
    reply: FastifyReply,
  ) {
    try {
      console.log("the request reached controller.ts file ");

      const { fullName, email, password } = request.body;
      const userData = { fullName, email, password };
      console.log("userData: ", userData);
      const newUser: UserResponse = await userService.createUser(userData);
      if (newUser) {
        return await sendAuthSuccess(
          reply,
          newUser,
          "User registered successfully",
          201,
        );
      }
    } catch (error: any) {
      // THE CONTROLLER DECIDES THE HTTP STATUS
      const dbError = error.cause || error;
      if (dbError.code === "23505") {
        return reply.status(409).send({
          success: false,
          message: "A user with this email or phone already exists.",
        });
      }
      console.error("Critical Error:", error);
      return reply
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }
  },

  async googleLogin(
    request: FastifyRequest<{ Body: { token: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const { token } = request.body;

      // 1. Verify the Access Token with Google's servers
      const googleResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!googleResponse.ok) {
        return reply
          .status(401)
          .send({ success: false, message: "Invalid Google Token" });
      }

      const googleData = await googleResponse.json();
      const { email, name, picture } = googleData;

      // 2. Check if the user already exists in your database
      let user = await userService.findByEmail(email);

      // 3. Handle Database Logic (Create new OR Update existing)
      if (!user) {
        //  New User
        const userFromGoogle = {
          fullName: name,
          email: email,
          authProvider: "google",
          profilePicture: picture,
        };

        user = await userService.createUserByGoogle(userFromGoogle);
        console.log(user?.fullName, "'s account is created now");
        // Safety check in case the database insert fails
        if (!user) {
          return reply.status(500).send({
            success: false,
            message: "Failed to create user in database",
          });
        }
      } else {
        console.log(
          user?.fullName,
          "'s account is already exist the profile pictue may be seted",
        );

        //if Existing User and
        // If they don't have a picture yet, but Google provided one, update it!
        if (!user.profilePicture && picture) {
          await userService.updateUser(user.id, {
            profilePicture: picture,
          });
          user.profilePicture = picture;
        }
      }
      // SUCCESS!
      return await sendAuthSuccess(reply, user, "Google Login Successful");
    } catch (error) {
      // Log the error in your terminal so you can debug if something breaks
      console.error("Google Auth Error:", error);

      return reply
        .status(500)
        .send({ success: false, message: "Server error during login" });
    }
  },

  async logInUser(
    request: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply,
  ) {
    try {
      const { email, password } = request.body;
      const user = await authService.validateUser(email, password);
      if (!user) {
        return reply.status(401).send({ message: "Invalid email or password" });
      }
      // After you verify the
      return await sendAuthSuccess(
        reply,
        user,
        `Peace be with you, ${user.fullName}. Login successful.`,
      );
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ message: "Server error during login" });
    }
  },

  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    console.log("getAllUsers controller is called");
    try {
      const result = request.user;

      console.log("getAllUsers controller line 143 : ", result.role);
      const allUsers = await userService.getAllUsers();
      console.log("getAllUsers controller: ", allUsers);
      // 2. Send the response
      return reply.status(200).send({
        success: true,
        message: "Users fetched successfully",
        count: allUsers.length,
        users: allUsers,
      });
    } catch (error) {
      console.error("Critical Error:", error);
      reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
  async refreshToken(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = request.unsignCookie(request.cookies.refreshToken || "");
      const cookieToken = result.valid ? result.value : null;
      console.log("refreshToken controller line 164 : ", cookieToken);

      if (!cookieToken) {
        return reply
          .status(401)
          .send({ success: false, message: "Session expired." });
      }

      // 2. Verify JWT Integrity
      const decoded = request.server.jwt.verify<{ id: string }>(cookieToken);
      console.log("decoded:", decoded);

      // 3. Database Integrity & Token Rotation Check
      const user = await userService.getById(decoded.id);
      console.log("user:", user);

      if (!user || user.refreshToken !== cookieToken) {
        // SECURITY: If the DB token doesn't match, someone might be reusing a stolen token
        request.log.warn(
          { userId: decoded.id },
          "Possible Token Reuse Detected",
        );
        return reply.status(401).send({
          success: false,
          message: "Invalid session. Please sign in again.",
        });
      }

      // 4. Clean the User Object (Exclude secrets)
      // Professional Tip: Use a dedicated helper for this
      const { passwordHash, refreshToken: _, ...userWithoutSecrets } = user;

      // 5. Rotate the token
      // Modern best practice: Issuing a NEW refresh token on every use
      return await sendAuthSuccess(
        reply,
        userWithoutSecrets,
        "Session renewed successfully",
        200,
      );
    } catch (error) {
      request.log.error(error); // Log the actual error for you to see in terminal
      return reply.status(401).send({
        success: false,
        message: "Authentication failed.",
      });
    }
  },

  async logout(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Get the current token from the cookie
      const cookieToken = request.cookies.refreshToken;
      console.log(cookieToken, "from logeout controller");

      if (cookieToken) {
        // 2. Figure out who the user is
        const decoded = request.server.jwt.verify<{ id: string }>(cookieToken);

        // 3. Delete the token from the database by setting it to null!
        const logedOutUser = await userService.updateUser(decoded.id, {
          refreshToken: null,
        });
        console.log(logedOutUser?.fullName, " is loged out!");
      }

      // 4. Destroy the browser cookie
      reply.clearCookie("refreshToken", { path: "/" });

      return reply.status(200).send({
        success: true,
        message: "Peace be with you. Logged out successfully.",
      });
    } catch (error) {
      // Even if the token was already expired, we still clear the cookie so the frontend resets
      reply.clearCookie("refreshToken", { path: "/" });
      return reply.status(200).send({ success: true, message: "Logged out." });
    }
  },
  // Inside your auth.controller.ts (Backend)
  async getMe(request: FastifyRequest, reply: FastifyReply) {
    try {
      // 1. Get the user (who was already verified by your 'authenticate' hook)
      const user = await userService.getById(request.user.id);
      console.log("Get me conroller :", user);
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }

      // 3. Clean the user object (Remove secrets!)
      const { passwordHash, refreshToken, ...userWithoutSecrets } = user;
      console.log("getMe userWithoutSecrets: ", userWithoutSecrets);
      // 4. Send both back!
      return await sendAuthSuccess(
        reply,
        userWithoutSecrets,
        "Session renewed successfully",
        200,
      );
    } catch (error) {
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  },
};

export default userController;
