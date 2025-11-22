import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductDetail,
  updateProduct,
} from "../../../redux/slices/productsSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import { colors, sizes } from "../../../lib/constants/filterdata";
import type { Product } from "../../../types";

const EditProduct = () => {
  const { selectedProduct } = useSelector((state: RootState) => state.products);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) dispatch(fetchProductDetail(id));
  }, [id]);

  const [productData, setProductData] = useState<Product>({} as Product);

  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || 0,
        countInStock: selectedProduct.countInStock || 0,
        sku: selectedProduct.sku || "",
        category: selectedProduct.category || "",
        brand: selectedProduct.brand || "",
        sizes: selectedProduct.sizes || [],
        colors: selectedProduct.colors || [],
        collections: selectedProduct.collections || "",
        material: selectedProduct.material || [],
        gender: selectedProduct.gender || undefined,
        images: selectedProduct.images || [],
        isFeatured: selectedProduct.isFeatured || false,
        isPublished: selectedProduct.isPublished || false,
        rating: selectedProduct.rating || 0,
        numReviews: selectedProduct.numReviews || 0,
        user: selectedProduct.user || "",
      });
    }
  }, [selectedProduct]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rabbit");

    try {

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/erfan/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.secure_url }],
      }));
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
    }
  };

  const toggleArrayValue = (
    name: "sizes" | "colors" | "material",
    value: string
  ) => {
    setProductData((prev) => {
      const arr = prev[name] as string[];
      const exists = arr.includes(value);

      return {
        ...prev,
        [name]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };
  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleArrayValue("sizes", e.target.value);
  };
  const handleColorSelect = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    toggleArrayValue("colors", value);
  };

  if (productData)
    return (
      <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-6 ">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-semibold">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
              rows={4}
            />
          </div>
          {/* Price */}
          <div className="mb-6">
            <label htmlFor="price" className="block mb-2 font-semibold">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {/* Count In Stock */}
          <div className="mb-6">
            <label htmlFor="countInStock" className="block mb-2 font-semibold">
              Count In Stock
            </label>
            <input
              type="text"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {/* SKU */}
          <div className="mb-6">
            <label htmlFor="sku" className="block mb-2 font-semibold">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
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
                  name="sizes"
                  value={size}
                  onChange={handleSizeChange}
                  checked={productData?.sizes?.includes(size)}
                  className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                />
                <span className="text-gray-700">{size}</span>
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
                  name="colors"
                  value={color}
                  onClick={handleColorSelect}
                  type="button"
                  className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer hoverEffect hover:scale-105 ${
                    productData?.colors?.includes(color)
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                ></button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Upload Image</label>
            <input
              className="
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
          file:bg-red-600 file:text-white
          hover:file:bg-red-700
            cursor-pointer
            "
              type="file"
              onChange={handleImageUpload}
            />
            <div className="flex gap-4 mt-4">
              {productData?.images?.map((img, i) => (
                <div key={i}>
                  <img
                    src={img.url}
                    alt={"Product Image"}
                    className="w-20 h-20 object-cover rounded-md shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Update Product
          </button>
        </form>
      </div>
    );
};
export default EditProduct;
