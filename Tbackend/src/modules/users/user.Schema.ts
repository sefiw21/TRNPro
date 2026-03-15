import { z } from "zod";

// ==========================================
// 1. INPUT SCHEMAS (What the user sends us)
// ==========================================

export const signupSchema = z.object({
  fullName: z.string().min(3, "Name too short"),
  email: z.email("Invalid email "),
  password: z
    .string()
    .min(8)
    .max(100, "Password is too long for security reasons"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email "),
  password: z
    .string()
    .min(8)
    .max(100, "Password is too long for security reasons"),
});

export const googleLoginSchema = z.object({
  token: z.string().min(1, "Google token is required"),
});

// ==========================================
// 2. OUTPUT SCHEMAS (What we send the user)
// ==========================================

export const userResponseSchema = z
  .object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    profilePicture: z.string().nullable(), // Nullish is perfect here (allows null or undefined)
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .optional();

// ==========================================
// 3. TYPESCRIPT TYPES
// ==========================================

// Input Types
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type GoogleLoginInput = z.infer<typeof googleLoginSchema>;

// Output Types
export type UserResponse = z.infer<typeof userResponseSchema>;

// Custom Types
export type UpdateUserData = {
  fullName?: string;
  email?: string;
  profilePicture?: string;
  passwordHash?: string;
  authProvider?: string;
  refreshToken?: string | null; // NEW! (Allow null so we can delete it on logout)
};
