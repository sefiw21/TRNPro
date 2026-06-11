import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Ui/feedback/Loading.tsx";
import { useAuth } from "../features/auth/providers/AuthProvider.tsx";

export const ProtectedRoute = () => {

  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) { return <Loading />; }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
