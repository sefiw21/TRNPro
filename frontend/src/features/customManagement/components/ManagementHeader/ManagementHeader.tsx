import { GlobalUserActions } from "@/components/layouts/header/components/GlobalUserActions";
import { MenuBarAndLogo } from "@/components/layouts/header/components/MenuBarAndLogo";
import { PageTitle } from "@/components/layouts/header/components/PageTitle";
import { Header } from "@/components/layouts/header/Header";



export const ManagementHeader = () => {

    return (
        <>
            <Header
                leftContent={<MenuBarAndLogo />}
                centerContent={
                    <PageTitle
                        title="Custom Management Systems"
                        subtitle="Configure, create, and manage your organizational architectures and hierarchies."
                    />
                }
                rightContent={<GlobalUserActions />}
            />
        </>
    );
};


