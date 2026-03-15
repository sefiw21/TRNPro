// schemas/studentSchema.ts
import { z } from "zod";

// Reusable schemas
export const genderSchema = z.union([z.literal("ወንድ"), z.literal("ሴት")], {
  error: () => ({ message: "እባክዎ ጾታ ይምረጡ (ወንድ ወይም ሴት)" }),
});

export const batchYearSchema = z.union(
  [
    z.literal("1ኛ ዓመት"),
    z.literal("2ኛ ዓመት"),
    z.literal("3ኛ ዓመት"),
    z.literal("4ኛ ዓመት"),
    z.literal("5ኛ ዓመት"),
    z.literal("6ኛ ዓመት"),
  ],
  {
    error: () => ({ message: "እባክዎ ባች ዓመት ይምረጡ" }),
  },
);

export const studentFormSchema = z.object({
  family: z.string().min(2, { message: "የቤተሰብ ስም ቢያንስ 2 ፊደላት ሊኖረው ይገባል" }),

  grand_family: z.string().min(2, { message: "የአባት ስም ቢያንስ 2 ፊደላት ሊኖረው ይገባል" }),

  fullName: z.string().min(2, { message: "ሙሉ ስም ቢያንስ 2 ፊደላት ሊኖረው ይገባል" }),

  bookName: z.string().min(2, { message: "የመፅሃፍ ስም ቢያንስ 2 ፊደላት ሊኖረው ይገባል" }),

  gender: genderSchema.refine((val) => val === "ወንድ" || val === "ሴት", {
    message: "እባክዎ ጾታ ይምረጡ (ወንድ ወይም ሴት)",
  }),

  isDeacon: z.boolean(),

  wereda: z.string().min(2, { message: "ወረዳ ስም ቢያንስ 2 ፊደላት ሊኖረው ይገባል" }),

  zon: z.string().min(2, { message: "ዞን ስም ቢያንስ 2 ፊደላት ሊኖረው ይገባል" }),

  age: z
    .number({
      error: "ዕድሜ ቁጥር መሆን አለበት",
    })
    .min(15, { message: "ዕድሜ ቢያንስ 15 መሆን አለበት" })
    .max(60, { message: "ዕድሜ ከ 60 በላይ መሆን አይችልም" }),

  phone: z
    .string()
    .min(1, { message: "ስልክ ቁጥር መሙያ ነው" })
    .regex(/^\+?251[79]\d{8}$|^0[79]\d{8}$/, {
      message: "ትክክለኛ ኢትዮጵያዊ ስልክ ቁጥር ያስገቡ (09XXXXXXXX ወይም +2519XXXXXXXX)",
    }),

  department: z.string().min(2, { message: "እባኮን ዲፓርትመንት ይምረጡ" }),

  batchYear: batchYearSchema.refine(
    (val) =>
      ["1ኛ ዓመት", "2ኛ ዓመት", "3ኛ ዓመት", "4ኛ ዓመት", "5ኛ ዓመት", "6ኛ ዓመት"].includes(
        val,
      ),
    { message: "እባክዎ ትክክለኛ ባች ዓመት ይምረጡ" },
  ),

  photo: z
    .custom<File | FileList | string>(
      (val) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!val || (Array.isArray(val) && val.length === 0)) return false;
        // file list from the input
        if (val instanceof FileList && val.length > 0) {
          const file = val[0];
          const maxSize = 5 * 1024 * 1024; // 5MB
          return file.size <= maxSize && allowedTypes.includes(file.type);
        }
        // singl file object
        if (val instanceof File) {
          const maxSize = 5 * 1024 * 1024; // 5MB
          return val.size <= maxSize && allowedTypes.includes(val.type);
        }
        // Allow strings (e.g., existing image URL from database)
        if (typeof val === "string") return true;
        return false;
      },
      {
        message: "ፎቶው JPEG ወይም PNG መሆን እንዲሁም መጠኑ ከ 5MB በታች መሆን አለበት",
      },
    )
    .optional()
    .or(z.literal("")),
});

// Create a partial schema for updates (all fields optional except id)
export const studentUpdateSchema = studentFormSchema.partial();

// Type inference
export type StudentFormData = z.infer<typeof studentFormSchema>;
export type StudentUpdateData = z.infer<typeof studentUpdateSchema>;

// Constants
// export const GENDERS = ["ወንድ", "ሴት"] as const;
export const BATCH_YEARS = [
  "1ኛ ዓመት",
  "2ኛ ዓመት",
  "3ኛ ዓመት",
  "4ኛ ዓመት",
  "5ኛ ዓመት",
  "6ኛ ዓመት",
] as const;
export const departments = [
  "Pediatrics and Child Health",
  "Orthopedics and Trauma Surgery",
  "Obstetrics and Gynecology",
  "Anesthesia",
  "Psychiatry",
  "Radiology and Imaging Unit",
  "Dermatology and Venereology Unit",
  "Mechanical Engineering",
  "Automotive Engineering",
  "Electromechanical Engineering",
  "Industrial Engineering",
  "Computer Science",
  "Software Engineering",
  "Information Technology",
] as const;
