import { z } from "zod";

const companyDiscriptionSchema = z.discriminatedUnion("putCompanyDescription", [
    z.object({
        putCompanyDescription: z.literal(true),
        companyDescription: z.string().min(1)
    }),
    z.object({
        putCompanyDescription: z.literal(false),

    })
])

const companyLocationsSchema = z.discriminatedUnion("putCompanyLocations", [
    z.object({
        putCompanyLocations: z.literal(true),
        locations: z.array(
            z.object({
                name: z.string().min(1)
            })
        )
    }),
    z.object({
        putCompanyLocations: z.literal(false),

    })
])

const educationSchema = z.discriminatedUnion("educationLevel", [
    z.object({
        educationLevel: z.literal("noFormalEducation"),
    }),
    z.object({
        educationLevel: z.literal("highSchoolDiploma"),
        schoolName: z.string().min(2)

    }),
    z.object({
        educationLevel: z.literal("bachelorsDegree"),
        universityName: z.string().min(2)

    })
])


const formSchema = z.object({
    companyName: z.string().min(2)
})
    .and(companyDiscriptionSchema)
    .and(companyLocationsSchema)
    .and(educationSchema);

const systemFormSchema = z.object(
    {
        name: z.string().optional(),
        description: z.string().optional(),
        logo: z.file().optional().nullable()
    }
)
type SystemFormData = z.infer<typeof systemFormSchema>
type FormSchema = z.infer<typeof formSchema>

const SystemFormDefaultValue: SystemFormData = {
    name: "",
    description: "",
    logo: null
}
const formDefaultValue: FormSchema = {
    companyName: "",
    putCompanyDescription: false,
    putCompanyLocations: false,
    educationLevel: "noFormalEducation"
}

export {
    formDefaultValue, formSchema, SystemFormDefaultValue, systemFormSchema,
    type FormSchema,
    type SystemFormData
};


