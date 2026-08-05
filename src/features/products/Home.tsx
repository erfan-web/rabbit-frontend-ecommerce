import { useEffect, useState } from "react";
import Hero from "@/shared/components/layout/Hero";
import FeaturedCollection from "@/features/products/FeaturedCollection";
import FeatureSection from "@/features/products/FeatureSection";
import GenderCollSection from "@/features/products/GenderCollSection";
import NewArrivals from "@/features/products/NewArrivals";
import ProductGrid from "@/features/products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchHomeProducts } from "@/features/products/productsSlice";
import { productsApi } from "@/features/products/api";
import type { Product } from "@/shared/types";
import { ErrorState, EmptyState } from "@/shared/components/ui/states";
import { ProductGridSkeleton } from "@/shared/components/ui/Skeletons";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [bestSellers, setBestSellers] = useState<Product[] | null>(null);

  const { homeProducts, loadingHome, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchHomeProducts());

    productsApi.getBestSellers().then(setBestSellers).catch(console.error);
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollSection />
      <NewArrivals />

      {/* Best Sellers section */}
      <section className="container mx-auto py-16 px-4 lg:px-2">
        <h2 className="text-3xl text-center font-bold mb-8">Best Sellers</h2>
        {bestSellers === null ? (
          <ProductGridSkeleton count={8} />
        ) : bestSellers.length === 0 ? (
          <EmptyState message="No best-selling products found" />
        ) : (
          <ProductGrid products={bestSellers} />
        )}
      </section>

      <div className="container mx-auto mt-10">
        <h2 className="text-2xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        {loadingHome ? (
          <ProductGridSkeleton count={8} />
        ) : error ? (
          <ErrorState />
        ) : (
          <ProductGrid products={homeProducts} />
        )}
      </div>

      <FeaturedCollection />
      <FeatureSection />
    </div>
  );
};

export default Home;
