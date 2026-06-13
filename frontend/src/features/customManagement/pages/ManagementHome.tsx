import { ManagementDashboardView } from '../views/ManagementDashboardView';

const ManagementHome = () => {
    return (
        <main className="flex-1 min-h-screen">
            {/* Any top-level page padding or wrappers go here */}
            <ManagementDashboardView />
        </main>
    );
};

export default ManagementHome;