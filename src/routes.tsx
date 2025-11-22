import { createBrowserRouter } from "react-router-dom";
// web
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/(auth)/Login";
import Register from "./pages/(auth)/Register";
import Profile from "./pages/profile/Profile";
import Collection from "./pages/Collection/Collection";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/Order/OrderConfirmation";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import MyOrderPage from "./pages/MyOrderPage/MyOrderPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import ProductManagement from "./pages/Admin/ProductManagement/ProductManagement";
import EditProduct from "./pages/Admin/ProductManagement/EditProduct";
import OrderManagement from "./pages/Admin/AdminHome/OrderManagement/OrderManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "collections/:collection", Component: Collection },
      { path: "product/:id", Component: ProductDetails },
      { path: "profile", Component: Profile },
      { path: "checkout", Component: Checkout },
      { path: "order-confirmation/:id", Component: OrderConfirmation },
      { path: "order/:id", Component: OrderDetail },
      { path: "my-orders", Component: MyOrderPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminHome },
      { path: "users", Component: UserManagement },
      { path: "products", Component: ProductManagement },
      { path: "products/:id/edit", Component: EditProduct },
      { path: "orders", Component: OrderManagement },
    ],
  },
]);
