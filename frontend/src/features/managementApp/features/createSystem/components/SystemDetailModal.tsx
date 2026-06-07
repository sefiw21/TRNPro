import { Building2Icon, CheckCircle2, Users, X } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface SystemDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    systemType: "family" | "office" | null;
    // We pass a function that fires when the user proceed
    onConfirmProceed: (type: "family" | "office") => void;
}

const SystemDetailModal: React.FC<SystemDetailModalProps> = ({
    isOpen,
    onClose,
    systemType,
    onConfirmProceed
}) => {

    // Early return if modal is closed or no system is selected
    if (!isOpen || !systemType) return null;

    // --- Dynamic Content Based on System Type ---
    const isFamily = systemType === "family";

    // UI Theming
    const themeGradient = isFamily
        ? "from-emerald-500/20 to-teal-500/5 dark:from-emerald-500/30 dark:to-teal-500/10 oled:from-white/10 oled:to-transparent"
        : "from-blue-500/20 to-indigo-500/5 dark:from-blue-500/30 dark:to-indigo-500/10 oled:from-white/10 oled:to-transparent";

    const iconColor = isFamily
        ? "text-emerald-600 dark:text-emerald-400 oled:text-white"
        : "text-blue-600 dark:text-blue-400 oled:text-white";

    const templateName = isFamily ? "Family Structure" : "Office Structure";

    // Feature Lists
    const features = isFamily ? [
        "Flat hierarchy with high transparency.",
        "Shared permissions across core members.",
        "Fluid roles tailored for collaborative environments.",
        "Simple, fast decision-making workflows."
    ] : [
        "Strict departmental boundaries and silos.",
        "Formal, multi-tier approval chains.",
        "Granular role-based access control (RBAC).",
        "Best for scaling corporate organizations."
    ];

    const handleProceedClick = () => {
        // Trigger the parent component to close this modal and open the form
        onConfirmProceed(systemType);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Container */}
            <div className="w-full max-w-4xl bg-white dark:bg-slate-900 oled:bg-black rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 oled:border-white/20 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/5 oled:border-white/10 shrink-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white oled:text-white">
                        Template Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 oled:hover:text-white oled:hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body Area */}
                <div className="overflow-y-auto p-6 space-y-6">
                    {/* Canva-style Hero Graphic */}
                    <div className={twMerge("w-full h-32 rounded-xl bg-linear-to-br flex items-center justify-center border border-slate-100 dark:border-white/5 oled:border-white/10", themeGradient)}>
                        {isFamily
                            ? <Users className={twMerge("w-12 h-12", iconColor)} />
                            : <Building2Icon className={twMerge("w-12 h-12", iconColor)} />
                        }
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white oled:text-white mb-2">
                            {templateName}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 oled:text-slate-400">
                            Review the core features of this architectural pattern to ensure it fits your organizational needs.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200 oled:text-slate-300 uppercase tracking-wider">
                            Key Characteristics
                        </h4>
                        <ul className="space-y-2.5">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 oled:text-slate-400">
                                    <CheckCircle2 className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-4 border-t border-slate-100 dark:border-white/5 oled:border-white/10 shrink-0 bg-slate-50 dark:bg-slate-900/50 oled:bg-transparent">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:bg-transparent dark:border-white/20 dark:text-slate-300 dark:hover:bg-slate-800 oled:border-white/30 oled:text-slate-400 oled:hover:bg-white/10 oled:hover:text-white transition-all outline-none"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleProceedClick}
                            className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 dark:bg-blue-500 dark:hover:bg-blue-600 oled:bg-white oled:text-black oled:hover:bg-slate-200 transition-all outline-none"
                        >
                            Proceed
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SystemDetailModal;