import { pgEnum } from "drizzle-orm/pg-core";

// 1. Lock the arrays with 'as const' so Drizzle understands they are exact strings
const FamilyRoles = ["father", "mother", "big_brother", "big_sister", "child"] as const;
const OfficeRoles = ["admin", "manager", "employee", "contractor"] as const;

// 2. Use the spread operator (...) to unpack them into one flat list
export const roleEnum = pgEnum("user_role", ["user", "member",
    ...FamilyRoles,
    ...OfficeRoles
]);



export type ManagementPayload = {
    action: "form_created" | "form_deleted";
    formId: string;
    title: string;
};

export type MentalPayload = {
    action: "holy_check_in";
    score: number;
    dominant_emotion: string;
};

export type SpiritualPayload = {
    action: "fasting_logged";
    type: string;
    hours_completed: number;
};

// 2. Combine them into a single Discriminated Union
export type ActionDataPayload =
    | { feature: "management"; meta: ManagementPayload }
    | { feature: "mental"; meta: MentalPayload }
    | { feature: "spiritual"; meta: SpiritualPayload };
