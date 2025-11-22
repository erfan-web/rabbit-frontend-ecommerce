import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { toast } from "sonner";
import { fetchCart } from "../../redux/slices/cartSlice";

const AdminSidbar = () => {
  // const { user } = useSelector((store: RootState) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const guestId = localStorage.getItem("guestId") as string;

  const logoutHandler = async () => {
    try {
      const actionResult = await dispatch(logoutUser());

      if (logoutUser.fulfilled.match(actionResult)) {
        toast.success(actionResult.payload.message);

        dispatch(fetchCart(guestId));

        navigate("/");
      } else if (logoutUser.rejected.match(actionResult)) {
        toast.error("Logout failed. Try again.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to={`/admin`} className="text-2xl font-medium">
          Rabbit
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <NavLink
          to={`/admin/users`}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700  hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to={`/admin/products`}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700  hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to={`/admin/orders`}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700  hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700  hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={logoutHandler}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout </span>
        </button>
      </div>
    </div>
  );
};
export default AdminSidbar;
