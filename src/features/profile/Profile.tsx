import { useEffect, useState } from "react";
import MyOrderPage from "@/features/orders/MyOrderPage";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { logoutUser } from "@/features/auth/authSlice";

const Profile = () => {
  const { user } = useSelector((store: RootState) => store.auth);

  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const guestId = localStorage.getItem("guestId") as string;
  const { cart } = useSelector((store: RootState) => store.cart);

  useEffect(() => {
    if (!user || !cart) dispatch(fetchCart(user ? user._id : guestId));
  }, [user, cart, dispatch, guestId]);

  // const logoutHandler = async () => {
  //   setLogoutLoading(true);
  //   try {
  //     const res = await api.get("auth/logout");
  //     toast.success(res.data.message);
  //     dispatch(fetchCart(res.data._id ? res.data._id : guestId));
  //     return navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setLogoutLoading(false);
  // };

  const logoutHandler = async () => {
    setLogoutLoading(true);
    try {
      const actionResult = await dispatch(logoutUser());

      if (logoutUser.fulfilled.match(actionResult)) {
        dispatch(fetchCart(guestId));
        navigate("/");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {user && (
        <div className="flex-grow container mx-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            {/* Left Section */}
            <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {user?.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{user?.email}</p>
              <button
                onClick={logoutHandler}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 hoverEffect"
              >
                Logout
              </button>
            </div>
            {/* Right Section: order table */}
            <div className="w-full md:w-2/3 lg:w-3/4 ">
              <MyOrderPage />
            </div>
          </div>
        </div>
      )}
      {logoutLoading && (
        <div className="fixed min-h-screen bg-black/10 inset-x-0 z-50 flex justify-center items-center">
          <div className="text-white text-8xl">Loading</div>
        </div>
      )}
    </div>
  );
};
export default Profile;
