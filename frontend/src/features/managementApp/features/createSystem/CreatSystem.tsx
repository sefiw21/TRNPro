import { ArrowRight, Building2Icon, Users } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { SystemFormData } from '../../schema/FormSchema';
import ModalForm from './components/ModalForm';
import SystemDetailModal from './components/SystemDetailModal';


interface SystemTemplate {
    type: "family" | "office";
    title: string;
    shortDescription: string;
    icon: React.ReactNode;
    colorTheme: string; // Used for subtle background glows
}

const CreatSystem = () => {
    // State to track which template the user clicked to view details
    const [selectedTemplateType, setSelectedTemplateType] = useState<"family" | "office" | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const handleFinalSubmit = (data: SystemFormData) => {
        console.log("Creating System:", { type: selectedTemplateType, ...data });
        // Add your API call here!
    };
    // 2. User clicks "Customize & Create" inside the Detail Modal
    const handleProceedToForm = (type: "family" | "office") => {
        setIsDetailModalOpen(false); // Close the details

        // Use a tiny timeout to allow the first modal to fade out smoothly 
        // before fading in the second one (prevents jarring visual jumps)
        setIsFormModalOpen(true);

    };
    // The minimal data shown on the main cards
    const templates: SystemTemplate[] = [
        {
            type: "family",
            title: "Family Structure",
            shortDescription: "A flat, collaborative environment with shared permissions and fluid roles.",
            icon: <Users className="w-8 h-8" />,
            colorTheme: "from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/20 dark:to-teal-500/5"
        },
        {
            type: "office",
            title: "Office Structure",
            shortDescription: "A formal hierarchy with strict department boundaries and approval chains.",
            icon: <Building2Icon className="w-8 h-8" />,
            colorTheme: "from-blue-500/10 to-indigo-500/5 dark:from-blue-500/20 dark:to-indigo-500/5"
        }
    ];

    const handleTemplateClick = (type: "family" | "office") => {
        setSelectedTemplateType(type);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Page Header */}
            <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white oled:text-white">
                    Choose a System Structure
                </h1>
                <p className="text-slate-500 dark:text-slate-400 oled:text-slate-500 max-w-xl mx-auto">
                    Select a foundational architecture for your new system. You can customize the details, name, and logo in the next step.
                </p>
            </div>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                    <button
                        key={template.type}
                        type="button"
                        onClick={() => handleTemplateClick(template.type)}
                        className={twMerge(
                            "group relative flex flex-col items-start text-left w-full h-full rounded-2xl border-2 transition-all duration-300 outline-none overflow-hidden hover:-translate-y-1 hover:shadow-xl",

                            /* Light Mode */
                            "bg-white border-slate-200 hover:border-slate-300 hover:shadow-slate-200/50 focus:ring-4 focus:ring-slate-200",

                            /* Dark Mode */
                            "dark:bg-slate-900 dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-black/50 dark:focus:ring-white/10",

                            /* OLED Mode */
                            "oled:bg-black oled:border-white/20 oled:hover:border-white/40 oled:hover:shadow-none oled:focus:ring-white/20"
                        )}
                    >
                        {/* Visual Banner Area (Acts like an image thumbnail) */}
                        <div className={twMerge(
                            "w-full p-8 flex items-center justify-center bg-gradient-to-br border-b transition-colors",
                            template.colorTheme,
                            "border-slate-100 dark:border-white/5 oled:border-white/10 oled:bg-none oled:bg-white/5 group-hover:oled:bg-white/10"
                        )}>
                            <div className="p-4 rounded-full bg-white dark:bg-slate-800 oled:bg-black shadow-sm text-slate-700 dark:text-slate-200 oled:text-white group-hover:scale-110 transition-transform duration-300">
                                {template.icon}
                            </div>
                        </div>

                        {/* Text Content Area */}
                        <div className="p-6 w-full flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white oled:text-white mb-2">
                                {template.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 oled:text-slate-400 leading-relaxed mb-6 flex-1">
                                {template.shortDescription}
                            </p>

                            {/* "View Details" Call to Action */}
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 oled:text-white mt-auto group-hover:gap-3 transition-all">
                                View Details
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* The Detail Modal */}
            <SystemDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                systemType={selectedTemplateType}
                onConfirmProceed={handleProceedToForm}
            />
            {setIsFormModalOpen && (
                < ModalForm
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    systemType={selectedTemplateType || "office"} // Fallback to prevent typescript errors
                    onSubmit={handleFinalSubmit}
                />
            )}



        </div>
    );
};

export default CreatSystem;