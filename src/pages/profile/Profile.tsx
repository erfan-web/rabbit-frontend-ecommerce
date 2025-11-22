import { useEffect, useState } from "react";
import MyOrderPage from "../MyOrderPage/MyOrderPage";
import api from "../../lib/helpers/axiosInstance";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { fetchCart } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { logoutUser, setUser } from "../../redux/slices/authSlice";

const Profile = () => {
  const { user } = useSelector((store: RootState) => store.auth);

  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const guestId = localStorage.getItem("guestId") as string;
  const { cart } = useSelector((store: RootState) => store.cart);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/profile");
        if (!user) dispatch(setUser(res.data));
        if (!cart) dispatch(fetchCart(res.data._id ? res.data._id : guestId));
      } catch (err) {
        if (isAxiosError(err))
          if (err.status === 401) {
            toast.error(err?.response?.data.error);
            navigate("/login?redirect=profile");
          }
      }
    };
    fetchUser();
  }, []);

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

        toast.success(actionResult.payload.message);

        dispatch(fetchCart(guestId));

        navigate("/");
      } else if (logoutUser.rejected.match(actionResult)) {
        toast.error("Logout failed. Try again.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong.");
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
