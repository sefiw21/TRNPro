import { GlobalUserActions } from '@/components/layouts/header/components/GlobalUserActions';
import { MenuBarAndLogo } from '@/components/layouts/header/components/MenuBarAndLogo';
import { PageTitle } from '@/components/layouts/header/components/PageTitle';
import { Header } from '@/components/layouts/header/Header';
import type { Company } from '@/features/systems/types/createSystemtype';

interface WorkspaceHeaderProps {
    system?: Company;

}
const WorkspaceHeader = ({ system }: WorkspaceHeaderProps) => {
    return (
        <Header
            leftContent={
                <MenuBarAndLogo
                    logoUrl={system?.logoUrl}
                    systemName={system?.systemName}
                    system={true}
                />
            }
            centerContent={
                <PageTitle
                    title={system?.systemName}
                    subtitle={system?.description}
                />
            }
            rightContent={<GlobalUserActions />}
        />
    );
}

export default WorkspaceHeader;