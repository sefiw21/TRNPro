import Loading from '@/components/Ui/feedback/Loading';
import { Button } from '@/components/Ui/forms';
import { PlusIcon, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SystemCard from '../components/SystemCard';
import { useUserSystems } from '../hooks/queries/useSystemInfo';

export const SystemsDashboard = () => {
    const navigate = useNavigate();
    const { data: response, isLoading } = useUserSystems();

    // 1. Loading State: Professional apps often use Skeleton screens here 
    // instead of a full-screen spinner for a smoother feel.
    if (isLoading) return <Loading />;

    const systemsList = response?.data ?? [];
    const hasSystems = systemsList.length > 0;

    // 2. Early Return Pattern: This flattens your code, 
    // making it easier to read by avoiding deep nesting.
    if (!hasSystems) {
        return <EmptySystemState onCreate={() => navigate("/systems/create-system")} />;
    }

    return (
        <div className="w-full h-full p-6 overflow-y-auto animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {systemsList.map((system) => (
                    <SystemCard key={system.id} system={system} />
                ))}
            </div>
        </div>
    );
};

// 3. Extracting the Empty State: Keeping your main component clean
// and moving UI-heavy chunks to their own small, local components.
const EmptySystemState = ({ onCreate }: { onCreate: () => void }) => (
    <div className="w-full h-[calc(100vh-12rem)] min-h-[400px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center text-center w-full max-w-2xl p-12 rounded-3xl border transition-all backdrop-blur-xl bg-white/80 border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-white/10 dark:shadow-2xl oled:bg-black/80 oled:border-white/10">

            <div className="p-5 rounded-2xl mb-6 ring-1 bg-blue-50 text-blue-600 ring-blue-100/50 dark:bg-slate-800/80 dark:text-blue-400 dark:ring-white/10 oled:bg-white/5">
                <Server className="w-8 h-8" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                No systems found
            </h3>

            <p className="text-base text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
                You haven't created any community systems yet. Get started by setting up your first space.
            </p>

            <Button
                onClick={onCreate}
                className="
        /* Layout & Spacing */
        inline-flex items-center justify-center px-6 py-3 
        font-semibold rounded-xl transition-all duration-200
        
        /* Theme-Aware Background & Text */
        bg-blue-600 text-white 
        hover:bg-blue-700 active:scale-95
        
        /* Shadows & Effects */
        shadow-lg shadow-blue-600/20
        hover:shadow-blue-600/30
        
        /* Accessibility (a11y) */
        focus-visible:ring-2 focus-visible:ring-blue-500/50 
        focus-visible:outline-none focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-slate-900
    "
                // Always add an aria-label if the button is used in complex UI
                aria-label="Create a new community system"
            >
                <PlusIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Create New System</span>
            </Button>
        </div>
    </div>
);

export default SystemsDashboard;