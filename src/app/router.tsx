import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/shared/components/layout/MainLayout";
import PageLoader from "@/shared/components/ui/PageLoader";
import ProtectedRoute from "@/shared/components/routes/ProtectedRoute";
import PublicRoute from "@/shared/components/routes/PublicRoute";

const Home = lazy(() => import("@/features/products/Home"));
const About = lazy(() => import("@/features/about/About"));
const Login = lazy(() => import("@/features/auth/Login"));
const Register = lazy(() => import("@/features/auth/Register"));
const Profile = lazy(() => import("@/features/profile/Profile"));
const Collection = lazy(() => import("@/features/products/Collection"));
const ProductDetails = lazy(
  () => import("@/features/products/ProductDetails")
);
const Checkout = lazy(() => import("@/features/cart/Checkout"));
const OrderConfirmation = lazy(
  () => import("@/features/orders/OrderConfirmation")
);
const OrderDetail = lazy(() => import("@/features/orders/OrderDetail"));
const MyOrderPage = lazy(() => import("@/features/orders/MyOrderPage"));
const AdminLayout = lazy(() => import("@/features/admin/AdminLayout"));
const AdminHome = lazy(() => import("@/features/admin/AdminHome"));
const UserManagement = lazy(
  () => import("@/features/admin/UserManagement")
);
const ProductManagement = lazy(
  () => import("@/features/admin/ProductManagement")
);
const EditProduct = lazy(
  () => import("@/features/admin/EditProduct")
);
const OrderManagement = lazy(
  () => import("@/features/admin/OrderManagement")
);
const NotFound = lazy(() => import("@/features/errors/NotFound"));

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: "about", element: withSuspense(<About />) },
      { path: "collections/:collection", element: withSuspense(<Collection />) },
      { path: "product/:id", element: withSuspense(<ProductDetails />) },
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: withSuspense(<Login />) },
          { path: "register", element: withSuspense(<Register />) },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: withSuspense(<Profile />) },
          { path: "checkout", element: withSuspense(<Checkout />) },
          {
            path: "order-confirmation/:id",
            element: withSuspense(<OrderConfirmation />),
          },
          { path: "order/:id", element: withSuspense(<OrderDetail />) },
          { path: "my-orders", element: withSuspense(<MyOrderPage />) },
        ],
      },
      { path: "*", element: withSuspense(<NotFound />) },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute adminOnly />,
    children: [
      {
        element: withSuspense(<AdminLayout />),
        children: [
          { index: true, element: withSuspense(<AdminHome />) },
          { path: "users", element: withSuspense(<UserManagement />) },
          { path: "products", element: withSuspense(<ProductManagement />) },
          { path: "products/:id/edit", element: withSuspense(<EditProduct />) },
          { path: "orders", element: withSuspense(<OrderManagement />) },
        ],
      },
    ],
  },
  { path: "*", element: withSuspense(<NotFound />) },
]);
