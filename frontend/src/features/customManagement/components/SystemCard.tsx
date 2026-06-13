import { Building2, Calendar, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSingleSystem } from '../hooks/queries/useSystemInfo';
import type { Company } from '../types/createSystemtype';

interface SystemCardProp {
    system: Company;
}

const SystemCard = ({ system }: SystemCardProp) => {
    // const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();

    const formattedDate = system.createdAt
        ? new Date(system.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
        : "Unknown Date";


    console.log("system id: ", system.id)

    // 3. Navigate to the system dashboard
    const handleClick = (id: string) => {
        navigate(`/_System/${id}`);
    };

    return (
        <div
            onClick={() => handleClick(system.id)}
            onMouseEnter={() => useSingleSystem(id)}
            className="group relative flex flex-col p-5 bg-white dark:bg-slate-900 oled:bg-black border border-slate-200 dark:border-white/10 oled:border-white/10 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 overflow-hidden"
        >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between mb-4">
                {/* Logo or Fallback Avatar */}
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

                        {/* Status & Type Badge */}
                        <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                {system.systemType == "family" ? <Users className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                                {system.systemType}
                            </span>



                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="relative z-10 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 grow">
                {system.description || "No description provided for this system."}
            </p>

            {/* Footer / Timestamps */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5 oled:border-white/10 mt-auto">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Created {formattedDate}</span>
                </div>

                {/* Subtle visual cue to click */}
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Open System →
                </span>
            </div>
        </div>
    );
};

export default SystemCard;