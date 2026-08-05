import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchOrder } from "@/features/orders/orderSlice";

const OrderDetail = () => {
  const { order } = useSelector((store: RootState) => store.order);
  const { user } = useSelector((store: RootState) => store.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    if (!user) navigate("/");
    if (id) dispatch(fetchOrder(id));
  }, [id, dispatch, user, navigate]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 ">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!order ? (
        <p>No Order details found!</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border border-gray-300">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{order._id}
              </h3>
              <p className="text-gray-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  order.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {order.paymentStatus === "paid" ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {order.status === "Delivered"
                  ? "Delivered"
                  : "Pending Delivery"}
              </span>
            </div>
          </div>
          {/* Customer, Payment, Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2 ">Payment Info</h4>
              <p>Payment Method: zibal</p>
              <p>
                Status: {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 ">Shipping Info</h4>
              <p>Shipping Method: zibal</p>
              <p>
                Address:{" "}
                {`${order.shippingAddress.city}, ${order.shippingAddress.country}`}
              </p>
            </div>
          </div>
          {/* Product List */}
          <div className="overflow-x-auto ">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((item) => (
                  <tr key={item.productId} className="border-b border-gray-300">
                    <td className="py-2 px-4 flex justify-center">
                      <img loading="lazy"
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-2 px-4 text-center">
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-500 hover:underline flex-1"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4 text-center">${item.price}</td>
                    <td className="py-2 px-4 text-center">{item.quantity}</td>
                    <td className="py-2 px-4 text-center">
                      ${item.price * Number(item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Back to Orders Link */}
          <Link to="/my-orders" className="text-blue-500 hover:underline">
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};
export default OrderDetail;
