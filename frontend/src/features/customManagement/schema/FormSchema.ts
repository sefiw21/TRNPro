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
    systemName: z.string().min(2)
})
    .and(companyDiscriptionSchema)
    .and(companyLocationsSchema)
    .and(educationSchema);

const systemFormSchema = z.object({
    systemName: z.string().min(1, "System name is required"),
    description: z.string().optional(),

});
type SystemFormDataType = z.infer<typeof systemFormSchema>
type FormSchemaType = z.infer<typeof formSchema>

const SystemFormDefaultValue: SystemFormDataType = {
    systemName: "",
    description: "",
}
const formDefaultValue: FormSchemaType = {
    systemName: "",
    putCompanyDescription: false,
    putCompanyLocations: false,
    educationLevel: "noFormalEducation"
}

export {
    formDefaultValue, formSchema, SystemFormDefaultValue, systemFormSchema,
    type FormSchemaType,
    type SystemFormDataType
};


