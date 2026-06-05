import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { SystemFormDefaultValue, systemFormSchema, type SystemFormData } from "../../../schema/FormSchema";



interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    systemType: "family" | "office";
    onSubmit: (data: SystemFormData) => void;
}


const ModalForm = ({ isOpen, onClose, systemType, onSubmit }: ModalFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control, watch
    } = useForm<SystemFormData>({
        mode: "all",
        resolver: zodResolver(systemFormSchema),
        defaultValues: SystemFormDefaultValue
    })

    // Dynamic Text based on selection
    const isFamily = systemType === "family";
    const titleText = isFamily ? "Create Family System" : "Create Office System";
    const nameLabel = isFamily ? "Family Name" : "Organization Name";
    const namePlaceholder = isFamily ? "e.g., The Smith Household" : "e.g., Acme Corp";


    // If modal is not open, render nothing
    if (!isOpen) return null;

    return (
        // Backdrop Overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Modal Container */}
            <div className="w-full max-w-md bg-white dark:bg-slate-900 oled:bg-black rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 oled:border-white/20 overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/5 oled:border-white/10">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white oled:text-white">
                        {titleText}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 oled:hover:text-white oled:hover:bg-white/10 transition-colors"
                    >
                        <X />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

                    {/* 1. REQUIRED: Name Field */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 oled:text-slate-400">
                            {nameLabel}
                            <span className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded">Required</span>
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            placeholder={namePlaceholder}

                            className={twMerge(
                                "w-full px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 outline-none",
                                "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20",
                                "dark:bg-slate-900 dark:border-white/20 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/30",
                                "oled:bg-black oled:border-white/30 oled:text-white oled:focus:border-white oled:focus:ring-white/20"
                            )}
                        />
                    </div>

                    {/* 2. OPTIONAL: Logo Upload (Visual Stub) */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 oled:text-slate-400">
                            System Logo
                            <span className="text-xs font-normal opacity-60">(Optional)</span>
                        </label>

                        {/* The label itself acts as the clickable button for the hidden input */}
                        <label
                            className={twMerge(
                                "flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors group",
                                "border-slate-300 bg-slate-50 hover:bg-slate-100",
                                "dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800",
                                "oled:border-white/20 oled:bg-transparent oled:hover:bg-white/5"
                            )}
                        >
                            {/* Hidden Input File */}
                            <input
                                type="file"
                                className="hidden"
                                // onChange={handleFileChange}
                                accept="image/*"
                            />
                            <UploadIcon />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                Click to upload
                            </span>
                        </label>
                    </div>

                    {/* 3. OPTIONAL: Description Field */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 oled:text-slate-400">
                            Description
                            <span className="text-xs font-normal opacity-60">(Optional)</span>
                        </label>
                        <textarea
                            placeholder="Briefly describe the purpose of this system..."
                            rows={3}
                            {...register("description")}
                            className={twMerge(
                                "w-full px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 outline-none resize-none",
                                "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20",
                                "dark:bg-slate-900 dark:border-white/20 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/30",
                                "oled:bg-black oled:border-white/30 oled:text-white oled:focus:border-white oled:focus:ring-white/20"
                            )}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-white/5 oled:border-white/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className={twMerge(
                                "flex-1 py-2.5 text-sm font-semibold rounded-lg border transition-all outline-none",
                                "bg-white border-slate-300 text-slate-700 hover:bg-slate-50",
                                "dark:bg-transparent dark:border-white/20 dark:text-slate-300 dark:hover:bg-slate-800",
                                "oled:bg-transparent oled:border-white/30 oled:text-slate-400 oled:hover:bg-white/10 oled:hover:text-white"
                            )}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            // disabled={!isFormValid}
                            className={twMerge(
                                "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed",
                                "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/20",
                                "dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500/30",
                                "oled:bg-white oled:text-black oled:hover:bg-slate-200 oled:focus:ring-white/20"
                            )}
                        >
                            Create System
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ModalForm;