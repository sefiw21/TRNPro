import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/ui/Loading.tsx";
import { useAuth } from "../providers/AuthProvider.tsx";

export const ProtectedRoute = () => {

  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) { return (<Loading />); }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
