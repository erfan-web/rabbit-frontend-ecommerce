import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { brands, categories, colors, gender, materials, sizes } from "@/shared/lib/constants/filterdata";

const FilterSidebar = () => {
  const [searchPramas, setSearchParams] = useSearchParams();
  interface Filters {
    [key: string]: string | string[] | number;
    category: string;
    gender: string;
    color: string;
    size: string[];
    material: string[];
    brand: string[];
    minPrice: number | string;
    maxPrice: number | string;
  }
  const [filters, setFilters] = useState<Filters>({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  useEffect(() => {
    const params = Object.fromEntries([...searchPramas]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
    setPriceRange([0, Number(params.maxPrice) || 100]);
  }, [searchPramas]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLButtonElement;
    const { name, value } = target;
    let newFilters = { ...filters };

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      const list = newFilters[name] as string[];
      newFilters = {
        ...newFilters,
        [name]: target.checked
          ? [...list, value]
          : list.filter((item) => item !== value),
      };
    } else if (target instanceof HTMLButtonElement || target.type === "radio") {
      newFilters = { ...newFilters, [name]: value };
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };
  function updateURLParams(newFilters: Filters) {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key] as string);
      }
    });
    setSearchParams(params);
  }
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Category
        </label>
        {categories.map((cat) => (
          <div key={cat} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={cat}
              onChange={handleFilterChange}
              checked={filters.category === cat}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{cat}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Gnder
        </label>
        {gender.map((gen) => (
          <div key={gen} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gen}
              onChange={handleFilterChange}
              checked={filters.gender === gen}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border border-gray-300"
            />
            <span className="text-gray-700">{gen}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer hoverEffect hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Size
        </label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Material
        </label>
        {materials.map((mat) => (
          <div key={mat} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={mat}
              onChange={handleFilterChange}
              checked={filters.material.includes(mat)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{mat}</span>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Brand
        </label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg cursor-pointer appearance-none"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};
export default FilterSidebar;
