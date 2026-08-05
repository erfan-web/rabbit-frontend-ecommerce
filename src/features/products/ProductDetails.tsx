import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";

import { toast } from "sonner";
import ProductGrid from "@/features/products/ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import {
  fetchProductDetail,
  fetchSimilarProducts,
} from "@/features/products/productsSlice";
import { createCart } from "@/features/cart/cartSlice";
import { useNavDrawer } from "@/shared/hooks/useNavDrawer";

const ProductDetails = ({ productId }: { productId?: string }) => {
  const { drawerOpen, toggleCartDrawer } = useNavDrawer();

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((store: RootState) => store.auth);
  const guestId = localStorage.getItem("guestId") as string;

  const { selectedProduct, loadingDetail, loadingSimilar, similarProducts } =
    useSelector((state: RootState) => state.products);
  const { cart, loadingCart } = useSelector((state: RootState) => state.cart);

  const productFetchId = productId || id;

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!productFetchId) return;

    dispatch(fetchProductDetail(productFetchId));
    dispatch(fetchSimilarProducts(productFetchId));

    setThumbsSwiper(null);
    setSelectedColor("");
    setSelectedSize("");
    setQuantity(1);
  }, [productFetchId, dispatch]);
  useEffect(() => {
    setThumbsSwiper(null);
  }, [isMobile]);
  const handleQuantityChange = (type: "inc" | "dec") => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

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
        productId: productFetchId as string,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
    );

    const alreadyInCart = cart?.products.some(
      (p) =>
        p.productId === productFetchId &&
        p.color === selectedColor &&
        p.size === selectedSize
    );

    if (!drawerOpen) toggleCartDrawer();
    toast.success(alreadyInCart ? "Product increased!" : "Product added!");
  };

  if (loadingDetail) return <p>Loading product...</p>;
  if (!selectedProduct) return null;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 lg:px-0 rounded-lg">
        <div className="flex flex-col lg:flex-row">
          {/* LEFT THUMBNAILS */}
          {!isMobile && (
            <div className="hidden lg:flex mr-4 h-[300px]">
              <Swiper
                key={`${productFetchId}-thumbs-desktop`}
                onSwiper={setThumbsSwiper}
                watchSlidesProgress
                slidesPerView={3}
                direction="vertical"
                spaceBetween={10}
                freeMode
                modules={[FreeMode, Thumbs]}
              >
                {selectedProduct.images?.map((img, index) => (
                  <SwiperSlide key={index} className="px-2">
                    <img loading="lazy"
                      src={img?.url}
                      alt={img?.altText || "thumbnail"}
                      className="w-20 h-20  mt-1 object-cover rounded-lg cursor-pointer"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* MAIN IMAGE */}
          <div className="lg:w-1/2">
            <Swiper
              key={`${productFetchId}-main-${isMobile ? "mobile" : "desktop"}`}
              thumbs={{ swiper: thumbsSwiper }}
              navigation
              spaceBetween={0}
              slidesPerView={1}
              modules={[Navigation, Thumbs]}
            >
              {selectedProduct.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img loading="lazy"
                    src={img?.url}
                    alt={img?.altText || "product"}
                    className="w-full h-auto object-cover rounded-lg border border-gray-300"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* MOBILE THUMBS */}
          {isMobile && (
            <div className="lg:hidden flex  mt-4 mb-4 w-[300px]">
              <Swiper
                key={`${productFetchId}-thumbs-mobile`}
                onSwiper={setThumbsSwiper}
                watchSlidesProgress
                slidesPerView={3}
                spaceBetween={10}
                modules={[FreeMode, Thumbs]}
                className="w-full"
              >
                {selectedProduct.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img loading="lazy"
                      src={img?.url}
                      alt={img?.altText || "thumb"}
                      className="w-20 h-20 my-2 ml-1 object-cover rounded-lg cursor-pointer"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* RIGHT SIDE */}
          <div className="lg:w-1/2 lg:ml-10">
            <h1 className="text-2xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.discountPrice && selectedProduct.price}
            </p>
            <p className="text-xl text-gray-800 mb-2">
              {selectedProduct.discountPrice || selectedProduct.price}
            </p>

            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* COLORS */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Color:</p>
              <div className="flex gap-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      backgroundColor: color.replace(/\s+/, "").toLowerCase(),
                    }}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Size:</p>
              <div className="flex gap-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
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

            {/* QUANTITY */}
            <div className="mb-6">
              <p className="text-gray-700 mb-2">Quantity:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange("dec")}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("inc")}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={loadingCart}
              className={`w-full py-2 rounded bg-black text-white ${
                loadingCart
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-900"
              }`}
            >
              {loadingCart ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-semibold mb-4">
            You May Also Like
          </h2>
          {loadingSimilar ? (
            <p className="text-center text-gray-500">
              Loading similar products...
            </p>
          ) : (
            <ProductGrid products={similarProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
