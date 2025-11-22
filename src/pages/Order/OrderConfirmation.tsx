import { useEffect } from "react";
import api from "../../lib/helpers/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { setUser } from "../../redux/slices/authSlice";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { fetchOrder } from "../../redux/slices/orderSlice";

const OrderConfirmation = () => {
  const { order } = useSelector((store: RootState) => store.order);
  const { id } = useParams();
  const { user } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/profile");
        if (!user) dispatch(setUser(res.data));
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
  useEffect(() => {
    if (id) dispatch(fetchOrder(id));
  }, [id]);
  const calculateEstimatedDelivery = (createdAt: string) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // Add 10 days to the order date
    return orderDate.toLocaleDateString();
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>

      {order && (
        <div className="p-6 rounded-lg border border-gray-300">
          <div className="flex justify-between mb-20 ">
            {/* Order Id and Date */}
            <div>
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <p className="text-gray-500">
                Order Date:{" "}
                {`${new Date(order.createdAt).toLocaleDateString()}`}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(order.createdAt)}
              </p>
            </div>
          </div>
          {/* Ordered Items */}
          <div className="mb-20">
            {order.products.map((item) => (
              <div className="flex items-center mb-4" key={item.productId}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500 ">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right ">
                  <p className="text-md ">${item.price?.toLocaleString()}</p>
                  <p className="text-sm  text-gray-500">Qty:{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment Delivery Info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment and Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">Zibal</p>
            </div>
            {/* Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2 ">Delivery</h4>
              <p className="text-gray-600">{order.shippingAddress.address}</p>
              <p className="text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderConfirmation;
