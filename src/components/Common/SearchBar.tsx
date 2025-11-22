import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { useOutsideClick } from "../../hooks/useOutSide";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  clearSearchProducts,
  fetchProductsBySearch,
} from "../../redux/slices/productsSlice";
import SearchProduct from "../products/SearchProduct";
import { RiDeleteBin3Line } from "react-icons/ri";
// import type { Product } from "../../types";

const SearchBar = () => {
  const [show, setShow] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [histories, setHistories] = useState<string[]>(["iron", "shirt"]);
  const modal = useOutsideClick<HTMLDivElement>(show, handleSearchToggle);
  const dispatch = useDispatch<AppDispatch>();
  const { searchProducts, loadingSearch } = useSelector(
    (store: RootState) => store.products
  );
  function handleSearchToggle() {
    setShow(!show);
    setSearchKey("");
  }

  const handleRemoveHistory = (history: string) => {
    const filtred = histories.filter((h) => h !== history);
    setHistories(filtred);
  };
  const handleSearchWithHistory = (history: string) => {
    setSearchKey(history);
    dispatch(fetchProductsBySearch(searchKey));
  };

  // WITH BOTTON CLICK AND HANDLE IN BACKEND
  const handleProductsWithSearch = () => {
    if (!searchKey.trim()) return;

    dispatch(fetchProductsBySearch(searchKey));
    if (histories.includes(searchKey.toLowerCase())) return;
    setHistories([...histories, searchKey.toLowerCase()]);
  };

  useEffect(() => {
    if (!searchKey.trim()) dispatch(clearSearchProducts());
  }, [searchKey, dispatch]);

  // WITH CHANGE AND HANDLE IN FRONTEND

  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   dispatch(fetchProductsBySearch(""));
  //   return ()=>{
  //     dispatch(clearSearchProducts())
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!searchKey.trim()) return setProducts([]);
  //   else {
  //     const filterd = searchProducts.filter((p) =>
  //       p.description.includes(searchKey.toLowerCase())
  //     );
  //     setProducts(filterd);
  //   }
  // }, [searchKey]);

  

  return (
    <>
      <button
        onClick={handleSearchToggle}
        className={"text-gray-700 hover:text-black hoverEffect "}
      >
        <HiMagnifyingGlass className="h-6 w-6" />
      </button>
      <div
        className={`flex justify-center items-center fixed top-0
           left-0 w-full h-screen z-50 bg-black/40 
           hoverEffect ${
             show
               ? "opacity-100 visible pointer-events-auto"
               : "opacity-0 invisible  delay-300"
           }`}
      >
        {/* Modal */}
        <div
          ref={modal}
          className={`bg-white  w-full hoverEffect
            max-w-3xl mx-auto p-2.5 sm:px-5 sm:py-4 rounded-[5px] h-[90%] flex flex-col
            ${
              show
                ? "translate-y-0 opacity-100 delay-300"
                : "-translate-y-10 opacity-0 "
            }`}
        >
          {/* close button */}
          <button
            onClick={handleSearchToggle}
            className="absolute top-1.5 right-1.5  text-gray-500  hover:text-primary hoverEffect"
          >
            <IoIosClose className="w-6 h-6" />
          </button>

          {/* header + searchbar */}
          <div className="shrink-0">
            <label className="block text-sm font-semibold mb-0.5">
              Product Searchbar
            </label>
            <div className="flex border border-gray-200 rounded-[5px] relative  mb-2.5">
              <input
                className="text-xs p-2 focus:outline-0 flex-grow"
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleProductsWithSearch()}
                placeholder="Search your product here..."
              />
              <button
                className={
                  "text-gray-700  absolute right-0 p-2 bg-gray-100 hover:text-black hover:bg-gray-200 hoverEffect"
                }
                onClick={handleProductsWithSearch}
              >
                <HiMagnifyingGlass className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* result */}
          <div className="border border-gray-200 rounded-[5px] overflow-y-scroll  ">
            {/* result search */}
            {loadingSearch ? (
              <div>Loading...</div>
            ) : searchProducts.length > 0 ? (
              <ul>
                {searchProducts.map((p) => (
                  <SearchProduct key={p._id} {...p} />
                ))}
              </ul>
            ) : (
              <>
                {/* empty - history search */}
                <div>
                  <div className="bg-gray-100 text-gray-500 p-2.5 py-4 sm:p-4 flex items-center gap-0.5">
                    <HiMagnifyingGlass className="h-4 w-4" />
                    <span className="text-xs sm:text-sm font-medium flex-grow">
                      Search and explore your products from{" "}
                      <span className="text-red-600 font-semibold">Rabbit</span>
                    </span>
                  </div>
                  <ul className="px-2.5 py-4 space-y-4">
                    {histories.map((history) => (
                      <li
                        key={history}
                        className="flex items-center justify-between border border-gray-300 p-1.5 rounded  text-gray-950"
                      >
                        <div
                          onClick={() => handleSearchWithHistory(history)}
                          className="flex items-center gap-1 cursor-pointer group"
                        >
                          <HiMagnifyingGlass className="h-4 w-4" />
                          <span className="text-xs sm:text-sm font-medium flex-grow group-hover:underline">
                            {history}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveHistory(history)}
                          className=" text-gray-500  hover:text-primary hoverEffect"
                        >
                          <RiDeleteBin3Line className="w-5 h-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
