import { IoIosClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart, mergeCart } from "../../redux/slices/cartSlice";

const CartDrawer = ({
  drawerOpen,
  toggleCartDrawer,
}: {
  drawerOpen: boolean;
  toggleCartDrawer: () => void;
}) => {
  // protect route
  const { user } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const guestId = localStorage.getItem("guestId") as string;
  const { cart, loadingItemId } = useSelector((store: RootState) => store.cart);
  useEffect(() => {
    if (user) dispatch(mergeCart(guestId));
    if (!cart) dispatch(fetchCart(user ? user._id : guestId));
  }, [user]);

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      return navigate("login?redirect=checkout");
    }
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full w-[94%]  sm:w-1/2 md:w-[30rem] bg-white shadow-lg hoverEffect flex flex-col ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        {/* closeBtn */}
        <button
          onClick={toggleCartDrawer}
          className="absolute top-1.5 right-1.5  text-gray-500  hover:text-primary hoverEffect"
        >
          <IoIosClose className="w-6 h-6" />
        </button>
      </div>
      {/* Cart contents with scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {/* Compnent for Cart Contents */}
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} loadingCartItem={loadingItemId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* checkout button fixed at the bottom */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="bg-black text-white w-full py-3 rounded-lg font-semibold hover:bg-gray-800 hoverEffect mb-2"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500  text-center">
              Shipping, taxes, and discount codes cal culated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
