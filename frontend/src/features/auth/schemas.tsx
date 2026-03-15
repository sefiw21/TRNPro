import z from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, { message: "name have to atlist two words" }),
  email: z.email("invalid email "),
  password: z
    .string()
    .min(8)
    .max(100, "Password is too long for security reasons"),
});
export const loginSchema = z.object({
  email: z.email("invalid email "),
  password: z
    .string()
    .min(8)
    .max(100, "Password is too long for security reasons"),
});
export type SignupSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
