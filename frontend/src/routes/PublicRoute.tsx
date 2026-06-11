import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Ui/feedback/Loading";
import { useAuth } from "../features/auth/providers/AuthProvider";

const PublicPages = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return <Loading />;
    }

    if (isAuthenticated) {
        return <Navigate to="/Home" replace />;
    }
    return <Outlet />;
}

export default PublicPages