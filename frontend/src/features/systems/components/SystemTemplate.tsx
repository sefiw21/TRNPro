import { ArrowRight, Building2Icon, Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useCreateSystemStore } from '../store/useCreateSystemStore';
import CreateSysetemForm from './CreateSystemForm';
import SystemDetailModal from './SystemDetailModal';

interface Systemcard {
    type: "family" | "office";
    title: string;
    shortDescription: string;
    icon: React.ReactNode;
    colorTheme: string; // Used for subtle background glows
}

const card: Systemcard[] = [
    {
        type: "family",
        title: "Family Structure",
        shortDescription: "A flat, collaborative environment with shared permissions and fluid roles.",
        icon: <Users className="w-8 h-8" />,
        colorTheme: "from-emerald-500/10 to-teal-500/5 dark:from-emerald-500/20 dark:to-teal-500/10 oled:from-emerald-500/15 oled:to-teal-500/5"
    },
    {
        type: "office",
        title: "Office Structure",
        shortDescription: "A formal hierarchy with strict department boundaries and approval chains.",
        icon: <Building2Icon className="w-8 h-8" />,
        colorTheme: "from-blue-600/10 to-indigo-600/5 dark:from-blue-500/20 dark:to-indigo-500/10 oled:from-blue-500/15 oled:to-indigo-500/5"
    }
];

const SystemTemplate = () => {
    const {
        selectedType,
        isDetailModalOpen,
        isFormModalOpen,
        closeDetails,
        closeForm,
        openDetails,
        proceedToForm
    } = useCreateSystemStore();

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">

            {/* Page Header */}
            <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white oled:text-white">
                    Choose a System Structure
                </h1>
                <p className="text-slate-500 dark:text-slate-400 oled:text-slate-400">
                    Select a foundational architecture for your new system.
                </p>
            </div>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {card.map((card) => (
                    <button
                        key={card.type}
                        type="button"
                        onClick={() => openDetails(card.type)}
                        className={twMerge(
                            "group relative flex flex-col items-start text-left w-full h-full rounded-2xl border transition-all duration-300 outline-none overflow-hidden",
                            "hover:-translate-y-1 hover:shadow-2xl",
                            "focus-visible:ring-2 focus-visible:ring-blue-500/50",

                            /* Light Mode */
                            "bg-white/80 border-slate-200 hover:border-blue-500/30 hover:shadow-slate-200/50",

                            /* Dark Mode */
                            "dark:bg-slate-900/80 dark:border-white/10 dark:hover:border-blue-500/40 dark:hover:shadow-black/50",

                            /* OLED Mode */
                            "oled:bg-black/80 oled:border-white/10 oled:hover:border-blue-500/40 oled:hover:shadow-black/80",

                            /* Glassmorphism support */
                            "backdrop-blur-xl"
                        )}
                    >
                        {/* Visual Banner Area */}
                        <div className={twMerge(
                            "w-full p-8 flex items-center justify-center bg-linear-to-br border-b transition-colors duration-500",
                            card.colorTheme,
                            "border-slate-100 dark:border-white/5 oled:border-white/5",
                            "group-hover:dark:border-white/10 group-hover:oled:border-white/10"
                        )}>
                            <div className="
                                p-4 rounded-2xl shadow-sm transition-all duration-500 ease-out
                                bg-white text-slate-700 ring-1 ring-slate-200/50
                                dark:bg-slate-800/80 dark:text-slate-200 dark:ring-white/10
                                oled:bg-white/5 oled:text-white oled:ring-white/10
                                group-hover:scale-110 group-hover:shadow-lg
                            ">
                                {card.icon}
                            </div>
                        </div>

                        {/* Text Content Area */}
                        <div className="p-6 w-full flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white oled:text-white mb-2 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {card.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 oled:text-slate-400 leading-relaxed mb-6 flex-1">
                                {card.shortDescription}
                            </p>

                            {/* "View Details" Call to Action */}
                            <div className="
                                flex items-center gap-2 text-sm font-semibold mt-auto transition-all duration-300
                                text-slate-400 dark:text-slate-500 oled:text-slate-500
                                group-hover:gap-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 oled:group-hover:text-blue-400
                            ">
                                View Details
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* The Detail Modal */}
            <SystemDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => closeDetails()}
                systemType={selectedType}
                onConfirmProceed={proceedToForm}
            />

            {/* Create System Form */}
            {selectedType !== null && (
                <CreateSysetemForm
                    isOpen={isFormModalOpen}
                    onClose={() => closeForm()}
                    systemType={selectedType}
                />
            )}
        </div>
    );
};

export default SystemTemplate;