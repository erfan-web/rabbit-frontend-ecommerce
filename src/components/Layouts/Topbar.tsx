import { socials } from "../../lib/constants/data";

const Topbar = () => {
  return (
    <div className="bg-primary text-white">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        <div className="hidden md:flex items-center space-x-4">
          {socials?.map((s) => (
            <a key={s.title} href="#" className="hover:text-gray-300" target="_blank">
              {<s.icon className="h-5 w-5" />}
            </a>
          ))}
        </div>
        <div className="text-sm text-center grow">
          <span>We shild worldwide - Fast and reliable shipping!</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+989192716228" className="hover:text-gray-300">
            +(541) 45612384
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
