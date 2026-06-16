import { Button } from '@/components/Ui/forms';
import { Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SystemCard from '../components/SystemCard';
import type { Company } from '../types/createSystemtype';
interface ManagementDashboardProps {
    systems?: Company[];

}
export const ManagementDashboard = ({ systems }: ManagementDashboardProps) => {
    const navigate = useNavigate();


    const systemsList = systems || [];

    return (
        // Added smooth entry animation for the entire dashboard
        <div className="w-full h-full p-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            {systemsList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {systemsList.map((system) => (
                        <SystemCard key={system.id} system={system} />
                    ))}
                </div>
            ) : (
                /* THEME-AWARE EMPTY STATE */
                <div className="w-full h-[calc(100vh-12rem)] min-h-[400px] flex items-center justify-center">
                    <div className="
                        flex flex-col items-center text-center w-full max-w-2xl p-12
                        rounded-3xl border transition-all duration-500 backdrop-blur-xl
                        
                        /* Light Mode */
                        bg-white/80 border-slate-200 shadow-sm
                        
                        /* Dark Mode */
                        dark:bg-slate-900/80 dark:border-white/10 dark:shadow-2xl dark:shadow-black/50
                        
                        /* OLED Mode */
                        oled:bg-black/80 oled:border-white/10
                    ">

                        {/* Theme-Aware Icon Box */}
                        <div className="
                            p-5 rounded-2xl shadow-sm mb-6 transition-all duration-500 ease-out
                            ring-1
                            
                            /* Light Mode */
                            bg-blue-50 text-blue-600 ring-blue-100/50
                            
                            /* Dark Mode */
                            dark:bg-slate-800/80 dark:text-blue-400 dark:ring-white/10
                            
                            /* OLED Mode */
                            oled:bg-white/5 oled:text-blue-400 oled:ring-white/10
                        ">
                            <Server className="w-8 h-8" />
                        </div>

                        {/* Theme-Aware Title Text */}
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white oled:text-white mb-3 transition-colors duration-300">
                            No systems found
                        </h3>

                        {/* Theme-Aware Subtext */}
                        <p className="text-base text-slate-500 dark:text-slate-400 oled:text-slate-400 max-w-md mb-8 leading-relaxed transition-colors duration-300">
                            You haven't created any community systems yet. Get started by setting up your first space.
                        </p>

                        {/* Primary Button */}
                        <Button
                            onClick={() => navigate("/management/createSystem")}
                            className="
                                px-6 py-3 font-semibold rounded-xl transition-all duration-200
                                bg-blue-600 text-white shadow-lg shadow-blue-600/20
                                hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-blue-600/30
                                active:scale-95
                                focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:outline-none
                            "
                        >
                            Create New System
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};