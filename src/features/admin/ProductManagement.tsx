import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import {
  deleteProduct,
  fetchProducts,
  setProductsAfterDelete,
} from "@/features/products/productsSlice";
import { ErrorState } from "@/shared/components/ui/states";
import { ListSkeleton } from "@/shared/components/ui/Skeletons";

const ProductManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loadingProducts, error } = useSelector(
    (store: RootState) => store.products
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const handleDeleteUser = async (Id: string) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      dispatch(setProductsAfterDelete(Id));
      try {
        const actionResult = await dispatch(deleteProduct(Id));

        if (deleteProduct.rejected.match(actionResult)) {
          dispatch(fetchProducts());
        }
      } catch {
        dispatch(fetchProducts());
      }
    }
  };

  if (loadingProducts) return <ListSkeleton />;
  if (error) return <ErrorState message={error ?? undefined} />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 ">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer text-sm lg:text-lg"
                >
                  <td className="pl-4 font-medium text-gray-900 whitespace-nowrap">
                    {p.name}
                  </td>
                  <td className="px-4">${p.price}</td>
                  <td className="px-4">{p.sku}</td>
                  <td className="p-2">
                    <Link
                      to={`/admin/products/${p._id}/edit`}
                      //   onClick={() => handleEditUser(user._id)}
                      className="bg-yellow-500 text-white px-2 py-1 flex w-16 justify-center rounded mb-2  hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(p._id as string)}
                      className="bg-red-500 text-white px-2 py-1 flex w-16 justify-center rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductManagement;
