import { useEffect,  useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "@/features/products/FilterSidebar";
import { useOutsideClick } from "@/shared/hooks/useOutSide";
import SortOptions from "@/features/products/SortOptions";
import ProductGrid from "@/features/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchProductsByFilters } from "@/features/products/productsSlice";
import { ErrorState } from "@/shared/components/ui/states";
import { ProductGridSkeleton } from "@/shared/components/ui/Skeletons";

const Collection = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loadingProducts, error } = useSelector(
    (state: RootState) => state.products
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const sidebarRef = useOutsideClick<HTMLDivElement>(
    isSidebarOpen,
    toggleSidebar
  );

  useEffect(() => {
    const queryParams = Object.fromEntries(searchParams);
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border border-gray-200 p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto hoverEffect lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid  */}
        {loadingProducts ? (
          <div>
            <p className="text-center text-gray-500 py-6">
              چند لحظه صبر کنید...
            </p>
            <ProductGridSkeleton count={8} />
          </div>
        ) : error ? (
          <ErrorState />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
};
export default Collection;
