import { ArrowRight, Building2Icon, Users } from 'lucide-react';
import toast from 'react-hot-toast';
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
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Page Header */}
            <div className="text-center space-y-2">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white oled:text-white">
                    Choose a System Structure
                </h1>
            </div>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {card.map((card) => (
                    <button
                        key={card.type}
                        type="button"
                        onClick={() => openDetails(card.type)}
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
                            "w-full p-8 flex items-center justify-center bg-linear-to-br border-b transition-colors",
                            card.colorTheme,
                            "border-slate-100 dark:border-white/5 oled:border-white/10 oled:bg-none oled:bg-white/5 group-hover:oled:bg-white/10"
                        )}>
                            <div className="p-4 rounded-full bg-white dark:bg-slate-800 oled:bg-black shadow-sm text-slate-700 dark:text-slate-200 oled:text-white group-hover:scale-110 transition-transform duration-300">
                                {card.icon}
                            </div>
                        </div>

                        {/* Text Content Area */}
                        <div className="p-6 w-full flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white oled:text-white mb-2">
                                {card.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 oled:text-slate-400 leading-relaxed mb-6 flex-1">
                                {card.shortDescription}
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
                onClose={() => closeDetails()}
                systemType={selectedType}
                onConfirmProceed={proceedToForm}
            />

            {/* show form if the user wanted to create system */}
            {selectedType !== null && (
                < CreateSysetemForm
                    isOpen={isFormModalOpen}
                    onClose={() => closeForm()}
                    systemType={selectedType}
                />
            )
            }

        </div>
    );
};

const triggerCustomToast = () => {
    toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-black hite shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <p className="text-sm font-medium text-gray-100">Custom Tailwind Toast</p>
                <p className="mt-1 text-sm text-gray-300">This uses full Tailwind classes!</p>
            </div>
            <button onClick={() => toast.dismiss(t.id)} className="p-4 text-blue-500 font-bold">
                Close
            </button>
        </div>
    ));
};
export default SystemTemplate;