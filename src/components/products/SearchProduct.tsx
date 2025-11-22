import { useEffect, useState } from "react";
import type { Product } from "../../types";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import api from "../../lib/helpers/axiosInstance";
import { createCart } from "../../redux/slices/cartSlice";
import { setUser } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

const SearchProduct = ({
  name,
  images,
  price,
  discountPrice,
  sizes,
  colors,
  _id,
}: Product) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch<AppDispatch>();
  const guestId = localStorage.getItem("guestId") as string;
  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/profile");
        if (!user) dispatch(setUser(res.data));
      } catch (err) {}
    };
    fetchUser();
    setSelectedColor("");
    setSelectedSize("");
  }, []);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      return toast.error("Please select color and size first!", {
        duration: 1000,
      });
    }

    dispatch(
      createCart({
        guestId,
        userId: user ? user._id : "",
        productId: _id,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      })
    );

    const alreadyInCart = cart?.products.some(
      (p) =>
        p.productId === _id &&
        p.color === selectedColor &&
        p.size === selectedSize
    );

    toast.success(alreadyInCart ? "Product increased!" : "Product added!");
  };

  return (
    <li className="flex  text-gray-950 ">
      <div className="w-27 m-2 mr-1 p-2 border rounded-[3px] border-gray-300">
        <img
          src={images[0].url}
          alt={images[0].altText}
          className="w-100 rounded-[5px]"
        />
      </div>
      <div className="my-2 mr-2 border rounded-[3px] border-gray-300 px-2 py-1 flex-1 relative">
        <div className="flex items-center justify-between mb-4">
          <Link to={`/product/${_id}`}><span className="text-xs sm:text-sm font-medium ">{name}</span></Link>
          <p className="text-xs sm:text-sm font-medium text-red-600">
            ${discountPrice}{" "}
            <span className="text-sm text-gray-600 mb-1 line-through ml-1">
              ${price}
            </span>
          </p>
        </div>
        <div className="mb-2">
          <div className="flex gap-1.5 items-center">
            <p className="text-gray-700 text-sm ">Size</p>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-7 h-7 px-1 py-1 rounded-[2px]  border border-gray-300 text-center text-[10px] ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className=" ">
          <div className="flex gap-1.5 items-center">
            <p className="text-gray-700 text-sm">Color</p>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color.toLowerCase().replace(/\s+/g, ""),
                }}
                className={`w-7 h-7 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
              ></button>
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            className="absolute right-2 bottom-2 py-1 px-2 rounded bg-black text-white text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </li>
  );
};
export default SearchProduct;
