import { z } from "zod";

// ==========================================
// 1. INPUT SCHEMAS
// ==========================================

export const signupSchema = z.object({

  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),

  email: z.string().email({ message: "Invalid email format" }).optional(),
  phone: z.string().min(10, { message: "Phone number is too short" }).optional(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password is too long for security reasons" }),

  googleId: z.string().optional(),
})
  .refine((data) => data.email || data.phone || data.googleId, {
    message: "You must provide either an email, a phone number, or use Google Fast-Entry.",
    path: ["email"],
  });


export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).optional(),
  phone: z.string().min(10, { message: "Phone number is too short" }).optional(),

  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})
  .refine((data) => data.email || data.phone, {
    message: "Please enter your email or phone number to log in.",
    path: ["email"],
  });


export const googleLoginSchema = z.object({
  token: z.string().min(1, { message: "Google token is required" }),
});

// ==========================================
// 2. OUTPUT SCHEMAS
// ==========================================

export const userResponseSchema = z.object({
  id: z.string().uuid({ message: "Invalid user ID format" }),
  fullName: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  profilePicture: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).optional();

// ==========================================
// 3. TYPESCRIPT TYPES
// ==========================================

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type GoogleLoginInput = z.infer<typeof googleLoginSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;

export type UpdateUserData = {
  fullName?: string;
  email?: string;
  phone?: string;
  profilePicture?: string;
  passwordHash?: string;
  authProvider?: string;
  refreshToken?: string | null;
};