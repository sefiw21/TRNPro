
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useCreateSystem } from "../hooks/queries/useCreateSystem";
import { SystemFormDefaultValue, systemFormSchema, type SystemFormDataType } from "../schema/FormSchema";
import { useCreateSystemStore } from "../store/useCreateSystemStore";
import { useSystemActions } from '../store/useSystemStore';
interface CreateSysetemProps {
    isOpen: boolean;
    onClose: () => void;
    systemType: "family" | "office" | null;
}

const CreateSysetemForm = ({ isOpen, onClose, systemType }: CreateSysetemProps) => {
    const isFamily = systemType === "family";
    const titleText = isFamily ? "Create Family System" : "Create Office System";
    const nameLabel = isFamily ? "Family Name" : "Organization Name";
    const namePlaceholder = isFamily ? "e.g., The Smith Household" : "e.g., Acme Corp";
    const { closeForm } = useCreateSystemStore();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<SystemFormDataType>({
        resolver: zodResolver(systemFormSchema),
        defaultValues: SystemFormDefaultValue,
        mode: "onChange",
    });
    console.log("selected system type : ", systemType)
    const { setSystemValues } = useSystemActions();


    const { mutateAsync, isPending } = useCreateSystem();

    const onSubmit = async (data: SystemFormDataType) => {
        try {
            const orgData = {
                ...data,
                orgType: systemType,
            };

            // 2. Await the mutateAsync function. It WILL return your company data!
            const response = await mutateAsync(orgData);

            // 3. Now 'response' holds your actual API data
            console.log("Backend Data:", response);
            setSystemValues(response);

            reset();
            toast.success("System created successfully!");
            closeForm();

            // 4. Navigate using the ID from the response (assuming it has an .id property)
            navigate(`/_System/${response.id}`);

        } catch (error) {
            // If the API throws an error, it gets caught here automatically
            console.error("Submission failed:", error);
            toast.error("System Creation failed. Please try again.");
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 oled:bg-black rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 oled:border-white/10 overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/5 oled:border-white/10">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white oled:text-white">
                        {titleText}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 oled:hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {nameLabel}
                            <span className="text-[10px] uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">Required</span>
                        </label>
                        <input
                            type="text"
                            {...register("systemName")}
                            placeholder={namePlaceholder}
                            className={twMerge(
                                "w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all duration-200",
                                "focus:ring-4 focus:ring-blue-500/10",
                                errors.systemName
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-slate-200 focus:border-blue-500 dark:border-white/10",
                                "bg-slate-50 dark:bg-slate-950 dark:text-white oled:bg-black"
                            )}
                        />
                        {errors.systemName && <p className="text-xs font-medium text-red-500">{errors.systemName.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Description <span className="font-normal text-slate-400">(Optional)</span>
                        </label>
                        <textarea
                            {...register("description")}
                            placeholder="Briefly describe the purpose..."
                            rows={3}
                            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 resize-none"
                        />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-3 text-sm font-semibold rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid || isPending}
                            className="flex-1 py-3 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                        >
                            {isPending ? "Processing..." : "Create System"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSysetemForm;



{/* Logo Uploader */ }
// <div className="space-y-2">
//     <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">System Logo</label>
//     <Controller
//         name="logo"
//         control={control}
//         render={({ field }) => (
//             <MediaUploader
//                 mediaType="image"
//                 maxSizeMB={10}
//                 acceptedFormats={{ 'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.gif'] }}
//                 value={typeof field.value === 'string' ? null : field.value}
//                 onFileChange={(file) => { field.onChange(file); field.onBlur(); }}
//                 error={errors.logo?.message}
//                 previewShape="circle"
//                 previewFit="contain"
//             />
//         )}
//     />
// </div>