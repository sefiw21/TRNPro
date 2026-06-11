
import { MediaUploader } from "@/components/media/MediaUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { SystemFormDefaultValue, systemFormSchema, type SystemFormDataType } from "../../../schema/FormSchema";

interface ModalFormProps {
    isOpen: boolean;
    isSubmitting: boolean;
    onClose: () => void;
    systemType: "family" | "office" | null;
    onSubmit: (data: SystemFormDataType) => void;
}

const ModalForm = ({ isOpen, isSubmitting, onClose, systemType, onSubmit }: ModalFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid }
    } = useForm<SystemFormDataType>({
        mode: "onChange",
        resolver: zodResolver(systemFormSchema),
        defaultValues: SystemFormDefaultValue
    });

    const isFamily = systemType === "family";
    const titleText = isFamily ? "Create Family System" : "Create Office System";
    const nameLabel = isFamily ? "Family Name" : "Organization Name";
    const namePlaceholder = isFamily ? "e.g., The Smith Household" : "e.g., Acme Corp";

    const handleFormSubmit = (formData: SystemFormDataType) => {
        onSubmit({ ...formData, type: systemType || "office" });
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

                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {nameLabel}
                            <span className="text-[10px] uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">Required</span>
                        </label>
                        <input
                            type="text"
                            {...register("orgName")}
                            placeholder={namePlaceholder}
                            className={twMerge(
                                "w-full px-4 py-3 text-sm rounded-xl border outline-none transition-all duration-200",
                                "focus:ring-4 focus:ring-blue-500/10",
                                errors.orgName
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-slate-200 focus:border-blue-500 dark:border-white/10",
                                "bg-slate-50 dark:bg-slate-950 dark:text-white oled:bg-black"
                            )}
                        />
                        {errors.orgName && <p className="text-xs font-medium text-red-500">{errors.orgName.message}</p>}
                    </div>

                    {/* Logo Uploader */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">System Logo</label>
                        <Controller
                            name="logo"
                            control={control}
                            render={({ field }) => (
                                <MediaUploader
                                    mediaType="image"
                                    maxSizeMB={10}
                                    acceptedFormats={{ 'image/*': ['.jpeg', '.jpg', '.png', '.svg', '.gif'] }}
                                    value={typeof field.value === 'string' ? null : field.value}
                                    onFileChange={(file) => { field.onChange(file); field.onBlur(); }}
                                    error={errors.logo?.message}
                                    previewShape="circle"
                                    previewFit="contain"
                                />
                            )}
                        />
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
                            disabled={!isValid || isSubmitting}
                            className="flex-1 py-3 text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                        >
                            {isSubmitting ? "Processing..." : "Create System"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;