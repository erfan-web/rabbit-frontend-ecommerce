import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchUserOrders } from "@/features/orders/orderSlice";
import { EmptyState, ErrorState } from "@/shared/components/ui/states";
import { ListSkeleton } from "@/shared/components/ui/Skeletons";

const MyOrderPage = () => {
  const { userOrders, userOrdersLoading, userOrdersError } = useSelector(
    (store: RootState) => store.order
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  if (userOrdersLoading) return <ListSkeleton />;
  if (userOrdersError) return <ErrorState message={userOrdersError} />;
  if (!userOrders.length) return <EmptyState message="You have no orders" />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b border-gray-200 hover:border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img loading="lazy"
                      src={order.products[0]?.image}
                      alt={order.products[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.products.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.amount.toLocaleString()}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.paymentStatus === "paid"
                          ? "bg-green-100  text-green-700"
                          : "bg-red-100  text-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyOrderPage;
