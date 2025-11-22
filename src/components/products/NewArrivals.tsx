import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Keyboard } from "swiper/modules";
import { useEffect, useState } from "react";
import api from "../../lib/helpers/axiosInstance";
const NewArrivals = () => {
  const options: SwiperOptions = {
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
      420: {
        slidesPerView: 1.3,
      },
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2.3,
      },
      1024: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3.3,
      },
    },
    navigation: {
      nextEl: "#arrivalsBtnSliderRight",
      prevEl: "#arrivalsBtnSliderLeft",
      disabledClass: "bg-gray-200 text-gray-400",
    },
    grabCursor: true,
    keyboard: true,
    scrollbar: { draggable: true },
    modules: [Navigation, Keyboard],
  };

  interface Arrivals {
    _id: string;
    name: string;
    price: number;
    images: {
      url: string;
      altText: string;
    }[];
  }

  const [newArrivals, setNewArrivals] = useState([] as Arrivals[]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await api.get("/products/new-arrivals");
        setNewArrivals(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNewArrivals();
  }, []);
  return (
    <section className="py-16 px-4 lg:px-2">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Expleore New Arrivals</h2>
        <p className="text-lg  text-gray-700 mb-15">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-50px] flex space-x-2 ">
          <button
            id="arrivalsBtnSliderLeft"
            className={`p-2 rounded border border-gray-300 "bg-white text-black"`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            id="arrivalsBtnSliderRight"
            className={`p-2 rounded border border-gray-300 "bg-white text-black"`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="container mx-auto  flex space-x-6 relative">
        <Swiper {...options}>
          {newArrivals.length > 0 &&
            newArrivals.map((p) => (
              <SwiperSlide key={p._id} className="relative">
                <img
                  src={p.images[0]?.url}
                  alt={p.images[0]?.altText}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 text-white bg-transparent/50 backdrop-blur-md p-4 rounded-b-lg will-change-transform translate-z-0">
                  <Link to={`/product/${p._id}`} className="block">
                    <h4 className="font-medium mb-1">{p.name}</h4>
                    <p>{p.price}</p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};
export default NewArrivals;
