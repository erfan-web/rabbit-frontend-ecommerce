import { RiDeleteBin3Line } from "react-icons/ri";
import type { Cart } from "@/shared/types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/features/cart/cartSlice";

function CartContents({
  cart,
  loadingCartItem,
}: {
  cart: Cart;
  loadingCartItem: string | null;
}) {
  const dispatch = useDispatch<AppDispatch>();
  interface Payload {
    delta: number;
    productId: string;
    quantity: number | string;
    size: string;
    color: string;
  }
  const handleAddToCart = (payload: Payload) => {
    const { productId, delta, quantity, size, color } = payload;
    const newQuantity = +quantity + delta;
    if (newQuantity >= 0) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId: cart.guestId,
          userId: cart?.user,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = ({
    productId,
    size,
    color,
  }: {
    productId: string;
    size: string;
    color: string;
  }) => {
    dispatch(
      removeFromCart({
        productId,
        size,
        color,
        guestId: cart.guestId,
        userId: cart?.user,
      })
    );
  };
  return (
    <div>
      {cart?.products?.map((p, i) => {
        const isLoading =
          loadingCartItem === `${p.productId}-${p.size}-${p.color}`;

        return (
          <div className="flex justify-between py-4 border-b" key={i}>
            <div className="flex">
              <img loading="lazy"
                src={p.image}
                alt={p.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />
              <div>
                <h3>{p.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  size: {p.size} | color: {p.color}
                </p>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleAddToCart({
                        productId: p.productId,
                        delta: -1,
                        quantity: p.quantity,
                        size: p.size,
                        color: p.color,
                      })
                    }
                    className="border border-gray-200 rounded w-9 flex justify-center items-center px-2 py-1 text-xl font-medium"
                    disabled={isLoading}
                  >
                    {p.quantity > 1 ? (
                      "-"
                    ) : (
                      <RiDeleteBin3Line className="h-6 w-6 text-red-600" />
                    )}
                  </button>
                  {isLoading ? (
                    <div className="grid mx-2 place-items-center overflow-x-scroll rounded-lg  lg:overflow-visible">
                      <svg
                        className="text-gray-300 animate-spin"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                          stroke="currentColor"
                          stroke-width="5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                          stroke="currentColor"
                          stroke-width="5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="text-gray-900"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <span className="mx-4">{p.quantity}</span>
                  )}
                  <button
                    onClick={() =>
                      handleAddToCart({
                        productId: p.productId,
                        delta: 1,
                        quantity: p.quantity,
                        size: p.size,
                        color: p.color,
                      })
                    }
                    className="border border-gray-200 rounded w-9 px-2 py-1 text-xl font-medium"
                    disabled={isLoading}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-2 font-medium">
                $ {(p.quantity * Number(p.price)).toLocaleString()}
              </p>
              <button
                onClick={() =>
                  handleRemoveFromCart({
                    productId: p.productId,
                    size: p.size,
                    color: p.color,
                  })
                }
                disabled={isLoading}
              >
                <RiDeleteBin3Line className="h-6 w-6 text-red-600" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default CartContents;
