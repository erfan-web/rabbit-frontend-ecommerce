import { Link } from "react-router-dom";
import MensCollImage from "@/assets/images/mens-collection.webp";
import WomensCollImage from "@/assets/images/womens-collection.webp";
const GenderCollSection = () => {
  return (
    <section className="py-16 px-4 lg:px-2">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1 rounded-lg overflow-hidden">
          <img loading="lazy"
            src={WomensCollImage}
            alt="Women's Collection"
            className="w-full h-[500px] sm:h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/80 px-4 py-4 rounded "></div>
          <div className="absolute bottom-18 left-8 bg-white/80 px-4 py-7.5 rounded "></div>
          <div className="absolute bottom-8 left-18 bg-white/80 p-4 rounded w-100 sm:w-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h2>
            <Link
              to={`/collections/all?gender=Women`}
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative flex-1 rounded-lg overflow-hidden">
          <img loading="lazy"
            src={MensCollImage}
            alt="Men's Collection"
            className="w-full h-[500px] sm:h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/80 px-4 py-4 rounded "></div>
          <div className="absolute bottom-18 left-8 bg-white/80 px-4 py-7.5 rounded "></div>
          <div className="absolute bottom-8 left-18 bg-white/80 p-4 rounded w-100 sm:w-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h2>
            <Link
              to={`/collections/all?gender=Men`}
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollSection;
