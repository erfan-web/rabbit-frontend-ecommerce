import type { RootState } from "@/app/store";
import CartDrawer from "@/features/cart/CartDrawer";
import SearchBar from "@/shared/components/layout/SearchBar";
import { useNavDrawer } from "@/shared/hooks/useNavDrawer";
import { useOutsideClick } from "@/shared/hooks/useOutSide";
import { MenuLinks } from "@/shared/lib/constants/data";
import { useState } from "react";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { drawerOpen, toggleCartDrawer } = useNavDrawer();
  const { user } = useSelector((store: RootState) => store.auth);

  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((store: RootState) => store.cart);
  const cartItemCount =
    cart?.products?.reduce((acc, current) => acc + current.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const SideBar = useOutsideClick<HTMLDivElement>(
    navDrawerOpen,
    toggleNavDrawer
  );

  return (
    <>
      <nav className="border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 ">
          {/* Left - Logo */}
          <div>
            <NavLink to={"/"} className={`text-2xl font-medium capitalize`}>
              rabbit
            </NavLink>
          </div>
          {/* Center - Menu */}
          <div className="hidden md:flex space-x-6">
            {MenuLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.href}
                className={
                  "text-gray-700 hover:text-primary hoverEffect relative group text-sm font-medium uppercase "
                }
              >
                {link.title}
                <span className="absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 hoverEffect"></span>
                <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 hoverEffect"></span>
              </NavLink>
            ))}
          </div>
          {/* Right - Icons */}
          <div className="flex items-center space-x-4">
            {user && user.role === "admin" && (
              <NavLink
                to="/admin"
                className={`block bg-black px-2 rounded text-sm text-white`}
              >
                Admin
              </NavLink>
            )}

            <NavLink
              to={"/profile"}
              className={" text-gray-700 hover:text-black hoverEffect"}
            >
              <HiOutlineUser className="h-6 w-6" />
            </NavLink>

            <button
              onClick={toggleCartDrawer}
              className={
                " text-gray-700 hover:text-black hoverEffect relative "
              }
            >
              <HiOutlineShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <SearchBar />
            <button
              onClick={toggleNavDrawer}
              className="md:hidden  text-gray-700 hover:text-black hoverEffect"
            >
              <HiBars3BottomRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/40 z-40 md:hidden hoverEffect ${
          navDrawerOpen
            ? "opacity-100 visible pointer-events-auto"
            : " opacity-0 block delay-300 invisible pointer-events-none"
        }`}
      >
        <div
          ref={SideBar}
          className={`fixed inset-y-0 left-0 w-3/4 sm:w-1/2  h-full bg-white shadow-lg z-50 hoverEffect delay-100 ${
            navDrawerOpen ? "translate-x-0 delay-300" : " -translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            {/* closeBtn */}
            <button
              onClick={toggleNavDrawer}
              className="absolute top-1.5 right-1.5  text-gray-500  hover:text-primary hoverEffect"
            >
              <IoIosClose className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 ">Rabbit</h2>
            <nav
              className={`flex flex-col  hoverEffect space-y-4
              `}
            >
{MenuLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.href}
                  className={
                    "text-gray-700 hover:text-primary hoverEffect relative group text-sm font-medium uppercase "
                  }
                  onClick={toggleNavDrawer}
                >
                  {link.title}
                </NavLink>
              ))}
              <NavLink
                to="/profile"
                className={
                  "text-gray-700 hover:text-primary hoverEffect text-sm font-medium uppercase "
                }
                onClick={toggleNavDrawer}
              >
                Profile
              </NavLink>
              {user?.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={
                    "text-gray-700 hover:text-primary hoverEffect text-sm font-medium uppercase "
                  }
                  onClick={toggleNavDrawer}
                >
                  Admin
                </NavLink>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
