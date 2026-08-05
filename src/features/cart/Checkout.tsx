import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { createCheckout } from "@/features/cart/cartSlice";

const Checkout = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart } = useSelector((store: RootState) => store.cart);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const handleCreateChckout = async (e: FormEvent) => {
    e.preventDefault();

    setCheckoutLoading(true);
    try {
      const actionResult = await dispatch(createCheckout(shippingAddress));

      if (createCheckout.fulfilled.match(actionResult)) {
        window.location.href = actionResult.payload.payLink;
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  // redirect if cart is empty
  useEffect(() => {
    if (cart && cart.products.length === 0) {
      navigate("/collections/all");
      toast.error("your cart is empty");
    }
  }, [cart, navigate]);

  if (user && cart)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
        {/* Left Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl uppercase mb-6">Checkout</h2>
          <form action="" onSubmit={handleCreateChckout}>
            <h3 className="text-lg mb-4">Contact Details</h3>
            <div className="mb-4">
              <label htmlFor="" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                className="w-full p-2 border border-gray-300 rounded"
                disabled
              />
            </div>
            <h3 className="text-lg mb-4">Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="" className="block text-gray-700">
                  Fisrt Name
                </label>
                <input
                  type="text"
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="" className="block text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="" className="block text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={checkoutLoading}
                className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
              >
                {checkoutLoading ? "Processing..." : "Continue to Payment"}
              </button>
            </div>
          </form>
        </div>
        {/* Right Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg mb-4 ">Order Summary</h3>
          <div className="border-t border-gray-300 py-4 mb-4">
            {cart.products.map((p, i) => (
              <div
                className="flex items-start justify-between py-2 border-b border-gray-300"
                key={i}
              >
                <div className="flex items-start">
                  <img loading="lazy"
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-24 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-md">{p.name}</h3>
                    <p className="text-md  text-gray-500 mb-2">
                      size: {p.size} | color: {p.color}
                    </p>
                    <p className="text-md  mb-2 text-green-600">
                      ${(p.quantity * Number(p.price)).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-xl ">
                  {p.quantity > 1 && (
                    <span className="text-red-600">{p.quantity} * </span>
                  )}
                  ${Number(p.price).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-lg mb-4 ">
            <p>Subtotal</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-lg ">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between items-center text-lg mt-4 border-t border-gray-300 pt-4">
            <p>Total</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    );
};
export default Checkout;
