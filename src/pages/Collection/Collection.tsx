import { useEffect,  useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../../components/products/FilterSidebar";
import { useOutsideClick } from "../../hooks/useOutSide";
import SortOptions from "../../components/products/SortOptions";
import ProductGrid from "../../components/products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchProductsByFilters } from "../../redux/slices/productsSlice";

const Collection = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loadingProducts, error } = useSelector(
    (state: RootState) => state.products
  );
  const queryParams = Object.fromEntries(searchParams);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const sidebarRef = useOutsideClick<HTMLDivElement>(
    isSidebarOpen,
    toggleSidebar
  );

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  if (loadingProducts) return <p>Loading...</p>;
  if (error) return <p>Server error</p>;

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
        <ProductGrid products={products} />
      </div>
    </div>
  );
};
export default Collection;
