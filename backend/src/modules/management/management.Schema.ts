import { z } from "zod";

const systemTypeEnum = z.enum(["family", "office"]);
export const createSystemSchema = z.object({
    systemName: z.string(),
    systemType: systemTypeEnum,
    description: z.string(),
    creatorId: z.string()
});
export const systemResponseSchema = z.object({
    id: z.string(),
    creatorId: z.string(),
    systemName: z.string(),
    systemType: systemTypeEnum,
    description: z.string().nullable(),
    logoUrl: z.string().optional().nullable(),
    logoPublicId: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
}).optional();
export type createSystemType = z.infer<typeof createSystemSchema>;
export type systemResponseType = z.infer<typeof systemResponseSchema>;
