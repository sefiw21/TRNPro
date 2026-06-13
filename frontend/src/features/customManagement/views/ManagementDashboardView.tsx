import Loading from '@/components/Ui/feedback/Loading';
import SystemCard from '../components/SystemCard';
import { useUserSystems } from '../hooks/queries/useSystemInfo';

export const ManagementDashboardView = () => {
    const { data: systemsList, isLoading } = useUserSystems()
    console.log("system list : ", systemsList)

    if (isLoading) return <Loading />;

    return (
        <div className="flex gap-6 p-2 w-screen flex-wrap">
            {systemsList?.data?.map((system) => (
                <SystemCard key={system.id} system={system} />
            ))}

            {systemsList?.data?.length === 0 && (
                <div className="col-span-full text-center py-10 text-slate-500">
                    You haven't created any systems yet.
                </div>
            )}
        </div>
    );
};