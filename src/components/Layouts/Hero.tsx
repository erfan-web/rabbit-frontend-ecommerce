import { NavLink } from "react-router-dom";
import HeroImg from "../../assets/images/rabbit-hero.webp";
const Hero = () => {
  return (
    <section className="relative">
      <img
        src={HeroImg}
        alt="Rabbit"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vaction-ready outfits with fast worldwide shipping.
          </p>
          <NavLink
            to={`#`}
            className={"bg-white text-black px-6 py-2 rounded-sm text-lg"}
          >
            Shop Now
          </NavLink>
        </div>
      </div>
    </section>
  );
};
export default Hero;
