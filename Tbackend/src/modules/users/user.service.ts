import { eq } from "drizzle-orm";
import { db } from "../../db/index.js"; // Import the Drizzle instance
import { users } from "../../db/schema.js"; // Import the table definition
import { secureHash } from "./middleware/secureHash.js";
import type { SignupInput, UpdateUserData } from "./user.Schema.js";

const userService = {
  // Create a new user using Drizzle
  async createUser(userData: SignupInput) {
    const { fullName, email, password } = userData;
    try {
      const hashedPassword = await secureHash(password);
      const [newUser] = await db
        .insert(users)
        .values({
          fullName, // Same as fullName: fullName
          email, // Same as email: email
          passwordHash: hashedPassword,
        })
        .returning({
          id: users.id,
          fullName: users.fullName,
          email: users.email,
          profilePicture: users.profilePicture,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        });
      console.log("newUser: ", newUser);
      return newUser;
    } catch (error) {
      // console.error("Error in creating user:", error);
      throw error;
    }
  },

  // handling the user cridentals coming from google sign up
  async createUserByGoogle(data: {
    fullName: string;
    email: string;
    authProvider: string;
    profilePicture?: string;
  }) {
    //  completely skip the Argon2 hashing step here!
    const [newUser] = await db
      .insert(users)
      .values({
        fullName: data.fullName,
        email: data.email,
        authProvider: data.authProvider,
        profilePicture: data.profilePicture,
      })
      .returning();

    return newUser;
  },

  // get user by id for the purpose of login
  async findByEmail(email: string) {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      // console.log("getByEmail result: ", result);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Database error in findByEmail:", error);
      throw error;
    }
  },

  // get a singlg user using id
  async getById(id: string) {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw error;
    }
  },

  // get all users
  async getAllUsers() {
    try {
      const allUsers = await db
        .select({
          id: users.id,
          fullName: users.fullName,
          email: users.email,
          role: users.role,
          profilePicture: users.profilePicture,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .from(users);
      return allUsers;
    } catch (error) {
      console.error("Error in creating user:", error);
      throw error;
    }
  },
  //  universal updater
  async updateUser(id: string, updateData: UpdateUserData) {
    try {
      const [updatedUser] = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, id))
        .returning();

      return updatedUser;
    } catch (error) {
      console.error("Database Error - updateUser:", error);
      throw new Error("Failed to update user in the database");
    }
  },
};

export default userService;
