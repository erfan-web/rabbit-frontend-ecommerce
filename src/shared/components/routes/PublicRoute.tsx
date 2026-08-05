import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import PageLoader from "@/shared/components/ui/PageLoader";

const PublicRoute = () => {
  const { user, profileFetched } = useSelector((state: RootState) => state.auth);

  if (!profileFetched) return <PageLoader />;

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
