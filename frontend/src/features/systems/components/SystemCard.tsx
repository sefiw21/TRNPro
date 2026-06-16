import { ActionMenu, type MenuAction } from '@/components/Ui/ActionMenu';
import { Building2, Calendar, Edit2, Trash2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteSystem } from '../hooks/queries/useDeleteSystem';
import { useSingleSystem } from '../hooks/queries/useSystemInfo';
import type { Company } from '../types/createSystemtype';

interface SystemCardProp {
    system: Company;
}

const SystemCard = ({ system }: SystemCardProp) => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Destructured mutateAsync for the delete operation
    const { mutateAsync } = useDeleteSystem();

    const formattedDate = system.createdAt
        ? new Date(system.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
        : "Unknown Date";

    // Navigate to the system dashboard
    const handleClick = () => {
        navigate(`/systems/${system.id}`);
    };

    // Define the actions for THIS specific menu
    const systemActions: MenuAction[] = [
        {
            label: "Edit",
            icon: <Edit2 className="w-4 h-4" />,
            onClick: (e) => {
                // Prevent the card click when hitting edit
                e.stopPropagation();
                console.log("Edit:", system.id);
            }
        },
        {
            label: "Delete",
            icon: <Trash2 className="w-4 h-4" />,
            isDestructive: true,
            onClick: async (e) => {
                // Prevent the card click when hitting delete
                e.stopPropagation();
                try {
                    await mutateAsync(system.id);
                } catch (error) {
                    toast.error("Failed to delete system.");
                }
            }
        }
    ];

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => useSingleSystem(id)}
            className="group relative flex flex-col p-5 bg-white dark:bg-slate-900 oled:bg-black border border-slate-200 dark:border-white/10 oled:border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 hover:z-50 overflow-visible"
        >

            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none overflow-hidden rounded-2xl" />

            <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 oled:bg-white/5 border border-slate-100 dark:border-white/5 overflow-hidden shrink-0 shadow-sm">
                        {system.logoUrl ? (
                            <img
                                src={system.logoUrl}
                                alt={`${system.systemName} logo`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-xl font-bold text-slate-400 dark:text-slate-500 uppercase">
                                {system.systemName.charAt(0)}
                            </span>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white oled:text-white tracking-tight line-clamp-1">
                            {system.systemName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                {system.systemType === "family" ? <Users className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                                {system.systemType}
                            </span>
                        </div>
                    </div>
                </div>

                {/* The Dropdown Menu */}
                <ActionMenu actions={systemActions} />

            </div>

            <p className="relative z-10 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 grow">
                {system.description || "No description provided for this system."}
            </p>

            {/* Footer with Hover Hint */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5 oled:border-white/10 mt-auto">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Created {formattedDate}</span>
                </div>

                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Open System →
                </span>
            </div>
        </div>
    );
};

export default SystemCard;