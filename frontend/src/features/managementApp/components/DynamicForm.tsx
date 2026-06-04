import { Checkbox, FormContainer, Input } from "@/components/Ui/forms/";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, useWatch, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { formDefaultValue, formSchema, type FormSchema } from "../schema/FormSchema";

const DynamicForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<FormSchema>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: formDefaultValue
    })
    const { fields, replace, append, remove } = useFieldArray({
        control,
        name: "locations"
    })

    const putCompanyLocations = useWatch({ control, name: "putCompanyLocations" })
    const putCompanyDescription = useWatch({ control, name: "putCompanyDescription" })
    const fullErrors: FieldErrors<Extract<FormSchema, { putCompanyDescription: true }> & Extract<FormSchema, { putCompanyLocations: true }>> = errors

    const onSubmit: SubmitHandler<FormSchema> = (data) => {
        alert(JSON.stringify(data, null, 2));
    }

    useEffect(() => {
        if (putCompanyLocations) {
            replace([{ name: "" }])
        }
    }, [putCompanyLocations, replace])


    return (
        <div className="min-h-screen py-12 px-4 transition-colors duration-500 flex flex-col items-center justify-center
            bg-slate-100 dark:bg-[#00020a] oled:bg-black
        ">
            <FormContainer title="Create simple imaginary management system for yous campony">
                <form className="space-y-6">

                    {/* Compan Name Input */}
                    <div>
                        <Input
                            placeholder="Location Name"
                            error={fullErrors.companyName?.message}
                            {...register(`companyName`)}
                            containerClassName="flex-1" // Ensures it takes up the right amount of space next to the delete button
                        />

                    </div>


                    <Checkbox
                        label="Fill Company Description"
                        {...register("putCompanyDescription")}
                    />
                    {putCompanyDescription && (
                        <div className="pl-2 sm:pl-7 animate-in fade-in slide-in-from-top-2 duration-300">

                            <Input
                                placeholder="Location Name"
                                error={fullErrors.companyDescription?.message}
                                {...register(`companyDescription`)}
                                containerClassName="flex-1" // Ensures it takes up the right amount of space next to the delete button
                            />
                        </div>
                    )}


                    <Checkbox
                        label="Fill Company Locations"
                        {...register("putCompanyLocations")}
                    />
                    {putCompanyLocations && (
                        <div className="pl-2 sm:pl-7 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-start gap-2">
                                    <div className="flex-1">
                                        <Input
                                            placeholder="Location Name"
                                            error={fullErrors.locations?.[index]?.name?.message}
                                            {...register(`locations.${index}.name`)}
                                            containerClassName="flex-1" // Ensures it takes up the right amount of space next to the delete button
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        disabled={fields.length === 1}
                                        onClick={() => remove(index)}
                                        className="mt-1 p-2.5 rounded-xl transition-all duration-300 shrink-0 border border-transparent
                                            text-slate-400  hover:text-rose-600 hover:border-rose-200
                                            dark:text-slate-500 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 dark:hover:border-rose-500/20
                                            oled:text-slate-600 oled:hover:bg-rose-500/10 oled:hover:text-rose-500 oled:hover:border-rose-500/30
                                            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit disabled:hover:border-transparent
                                        "
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => append({ name: "" })}
                                className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-xl border-2 border-dashed transition-all duration-300 text-sm font-medium
                                    /* Light Mode */
                                    bg-slate-50 border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-700 
                                    /* Theme Mode */
                                    dark:bg-transparent dark:border-white/10 dark:text-slate-400 dark:hover:border-blue-400 dark:hover:text-blue-400 dark:hover:bg-blue-500/10
                                    /* OLED Mode */
                                    oled:bg-transparent oled:border-white/20 oled:text-slate-500 oled:hover:border-white/50 oled:hover:text-white oled:hover:bg-white/5
                                "
                            >
                                <Plus className="w-4 h-4" />
                                Add Location
                            </button>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        className="w-full font-semibold text-sm py-4 rounded-xl transition-all duration-300 mt-8 shadow-lg active:scale-[0.98]
                            /* Light Mode */
                            bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25
                            /* Theme Mode */
                            dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 dark:shadow-blue-900/50
                            /* OLED Mode */
                            oled:bg-white oled:text-black oled:hover:bg-slate-200 oled:shadow-none
                        "
                    >
                        Create
                    </button>
                </form>
            </FormContainer>
        </div>
    )
}

export default DynamicForm;