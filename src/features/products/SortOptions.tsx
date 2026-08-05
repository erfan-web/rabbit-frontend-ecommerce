import type { ChangeEvent } from "react";
import { sortPrice } from "@/shared/lib/constants/data";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchPramas, setSearchParams] = useSearchParams();
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;
    searchPramas.set("sortBy", sortBy);
    setSearchParams(searchPramas);
  };
  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        name="sort"
        onChange={handleSortChange}
        value={searchPramas.get("sortBy") || ""}
        className="border border-gray-300 p-2 rounded-md focus:outline-none"
      >
        {sortPrice.map((item) => (
          <option value={item.value}>{item.text}</option>
        ))}
      </select>
    </div>
  );
};
export default SortOptions;
