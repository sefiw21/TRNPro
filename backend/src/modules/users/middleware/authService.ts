import { verify } from "argon2";
import userModel from "../user.service.js";

export const authService = {
  async validateUser(email: string, password: string) {
    const user = await userModel.findByEmail(email);
    console.log("validated User: ", user);

    if (!user) return null;
    if (!user.passwordHash || user.authProvider === "google") {
      console.log(
        "Login blocked: User registered via Google. They must use the Google button.",
      );
      return null;
    }
    const isMatch = await verify(user.passwordHash, password);
    console.log("i match password ", isMatch);
    if (!isMatch) return null;

    return user;
  },
};
