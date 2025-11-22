import { useEffect, useState } from "react";
import Hero from "../../components/Layouts/Hero";
import FeaturedCollection from "../../components/products/FeaturedCollection";
import FeatureSection from "../../components/products/FeatureSection";
import GenderCollSection from "../../components/products/GenderCollSection";
import NewArrivals from "../../components/products/NewArrivals";
import ProductGrid from "../../components/products/ProductGrid";
import ProductDetails from "../../components/products/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchProductsByFilters } from "../../redux/slices/productsSlice";
import api from "../../lib/helpers/axiosInstance";
import type { Product } from "../../types";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [bestSeller, setBestSeller] = useState<Product | null>(null);

  const { products, loadingProducts, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!products.length) {
      dispatch(
        fetchProductsByFilters({
          gender: "Women",
          category: "Bottom Wear",
          limit: 8,
        })
      );
    }

    if (!bestSeller) {
      api
        .get("products/best-seller")
        .then((res) => setBestSeller(res.data))
        .catch(console.error);
    }
  }, [dispatch]);

  if (loadingProducts) return <p>Loading...</p>;
  if (error) return <p>Server error</p>;

  return (
    <div>
      <Hero />
      <GenderCollSection />
      <NewArrivals />

      {/* ✅ Best Seller section */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSeller ? (
        <ProductDetails key={bestSeller._id} productId={bestSeller._id} />
      ) : (
        <p className="text-center text-gray-500">Loading best seller product...</p>
      )}

      <div className="container mx-auto mt-10">
        <h2 className="text-2xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} />
      </div>

      <FeaturedCollection />
      <FeatureSection />
    </div>
  );
};

export default Home;
