import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store";
import {
  fetchOrders,
  setOrderAfterUpdate,
  updateOrder,
} from "../../../../redux/slices/orderSlice";
import { useEffect } from "react";
import { toast } from "sonner";
import type { OrderStatusType } from "../../../../types";

const OrderManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((store: RootState) => store.order);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const handleStatusChange = async (
    orderId: string,
    value: OrderStatusType
  ) => {
    dispatch(setOrderAfterUpdate({ orderId, value }));

    try {
      const actionResult = await dispatch(updateOrder({ orderId, value }));

      if (updateOrder.rejected.match(actionResult)) {
        toast.error("Update failed. Reverting...");
        dispatch(fetchOrders());
      }
    } catch (err) {
      toast.error("Unexpected error. Reverting change.");
      dispatch(fetchOrders());
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* Order List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-x uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-300 hover:bg-gray-50 "
                >
                  {" "}
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="p-4">{order.user.name}</td>
                  <td className="p-4">{order.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value as OrderStatusType
                        )
                      }
                      className="border border-gray-300 p-2.5 rounded-lg text-sm"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-gray-600 text-center p-4 ">
                  No Orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderManagement;
