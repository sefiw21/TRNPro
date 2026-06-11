import { z } from "zod";


export const FamilyRoles = z.enum(["father", "mother", "big_brother", "big_sister", "child"]);
export const OfficeRoles = z.enum(["admin", "manager", "employee", "contractor"]);

export const addMemberSchema = z.object({
    userId: z.uuid({ message: "Invalid User ID format" }),
    organizationId: z.uuid(),
    orgType: z.enum(["family", "office"]),
    role: z.string(),
}).superRefine((data, ctx) => {
    if (data.orgType === "family" && !FamilyRoles.safeParse(data.role).success) {
        ctx.addIssue({
            code: "custom",
            message: `Invalid role. Families only accept: ${FamilyRoles.options.join(", ")}`,
            path: ["role"],
        });
    }
})