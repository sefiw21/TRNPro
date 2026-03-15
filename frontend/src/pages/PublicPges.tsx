import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { useAuth } from "../providers/AuthProvider";

const PublicPges = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return (
            <Loading />
        );
    }
    if (isAuthenticated) {
        return <Navigate to="/Home" replace />;
    }
    return <Outlet />;
}

export default PublicPges