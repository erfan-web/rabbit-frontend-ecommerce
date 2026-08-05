import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import PageLoader from "@/shared/components/ui/PageLoader";

type ProtectedRouteProps = {
  adminOnly?: boolean;
};

const ProtectedRoute = ({ adminOnly = false }: ProtectedRouteProps) => {
  const { user, profileFetched } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!profileFetched) return <PageLoader />;

  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
