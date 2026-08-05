import { NavLink } from "react-router-dom";
import { shopLinks, socials, supportLinks } from "@/shared/lib/constants/data";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] xl:grid-cols-4 gap-8 px-4 lg:px-2">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-700 mb-6">
            Sign up and get 10% off your first order.
          </p>
          <form action="" className="flex">
            <input
              type="email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md
            focus:outline-none focus:ring-2 focus:ring-gray-500 hoverEffect "
              required
              placeholder="Enter your email..."
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 hoverEffect"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop Links */}
        <div className="xl:pl-14">
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-700">
            {shopLinks?.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.href}
                  className={`hover:text-gray-500 transition-colors`}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* Support Links */}
        <div className="lg:pl-8">
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-700">
            {supportLinks?.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.href}
                  className={`hover:text-gray-500 transition-colors`}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* Follow Us - socials */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            {socials?.map((s) => (
              <a
                key={s.title}
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferror"
                className="hover:text-gray-500"
              >
                {<s.icon className="h-5 w-5" />}
              </a>
            ))}
          </div>
          <p className="text-gray-500">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            0123-271-783
          </p>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter  text-center">
          © 2025, CompileTab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
