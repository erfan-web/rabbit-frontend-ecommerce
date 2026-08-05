import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";

export const socials = [
  { title: "BrandMeta", icon: TbBrandMeta },
  { title: "Instagram", icon: IoLogoInstagram },
  { title: "Twitter", icon: RiTwitterXLine },
];

export const MenuLinks = [
  { title: "Men", href: "collections/all?gender=Men" },
  { title: "Women", href: "collections/all?gender=Women" },
  { title: "Top Wear", href: "collections/all?category=Top Wear" },
  { title: "Bottom Wear", href: "collections/all?category=Bottom Wear" },
];

// Footer Links

// 01-shopLinks
export const shopLinks = [
  { title: "Men's Top Wear", href: "#" },
  { title: "Women's Top Wear", href: "#" },
  { title: "Men's Bottom Wear", href: "#" },
  { title: "Women's Bottom Wear", href: "#" },
];
// 02-supportLinks
export const supportLinks = [
  { title: "Contact Us", href: "#" },
  { title: "About Us", href: "#" },
  { title: "FAQs", href: "#" },
  { title: "Fetures", href: "#" },
];

export const FeaturesStore = [
  {
    id: 1,
    icon: HiShoppingBag,
    title: "FREE INTERNATIONAL SHIPPING",
    description: "On all over $100.00",
  },
  {
    id: 2,
    icon: HiArrowPathRoundedSquare,
    title: "45 DAYS RETURN",
    description: "Money back guarantee",
  },
  {
    id: 3,
    icon: HiOutlineCreditCard,
    title: "SECURE CHECKOUT",
    description: "100% secured checkout process",
  },
];

// Sort options
export const sortPrice = [
  { value: "all", text: "Default" },
  { value: "priceAsc", text: "Price: Low to High" },
  { value: "priceDesc", text: "Price: High to Low" },
  { value: "popularity", text: "Popularity" },
];
