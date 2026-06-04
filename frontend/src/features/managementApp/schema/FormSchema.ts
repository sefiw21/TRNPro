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

const formSchema = z.object({
    companyName: z.string().min(2)
})
    .and(companyDiscriptionSchema)
    .and(companyLocationsSchema);

type FormSchema = z.infer<typeof formSchema>

const formDefaultValue: FormSchema = {
    companyName: "",
    putCompanyDescription: false,
    putCompanyLocations: false,
}

export {
    formDefaultValue,
    formSchema,
    type FormSchema
};

