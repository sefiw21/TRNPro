import { GlobalUserActions } from '@/components/layouts/header/components/GlobalUserActions';
import { MenuBarAndLogo } from '@/components/layouts/header/components/MenuBarAndLogo';
import { PageTitle } from '@/components/layouts/header/components/PageTitle';
import { Header } from '@/components/layouts/header/Header';
import { useParams } from 'react-router-dom';
import { useSingleSystem } from '../../hooks/queries/useSystemInfo';

const SystemHeader = () => {
    const { id } = useParams();
    console.log(" systemId : ", id)

    const { data: userSystems, isLoading, isError } = useSingleSystem(id);
    console.log("Status:", { isLoading, isError, hasData: !!userSystems });

    const systemName = userSystems?.data?.systemName || (isLoading ? "Loading..." : "Unknown System");
    const description = userSystems?.data?.description || "";
    const logoUrl = userSystems?.data?.logoUrl || "";
    if (isLoading) return <div>Loading systems...</div>;
    if (isError) return <div>Failed to load systems.</div>;
    return (
        <Header
            leftContent={
                <MenuBarAndLogo
                    logoUrl={logoUrl}
                    systemName={systemName}
                    system={true}
                />
            }
            centerContent={
                <PageTitle
                    title={systemName}
                    subtitle={description}
                />
            }
            rightContent={<GlobalUserActions />}
        />
    );
}

export default SystemHeader;