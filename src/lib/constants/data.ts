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

export const cartProducts = [
  {
    id: 1,
    name: "T-shirt",
    size: "M",
    color: "Red",
    quantity: 1,
    price: 15,
    image: "https://picsum.photos/200?random=1",
  },
  {
    id: 2,
    name: "Jeans",
    size: "L",
    color: "Bue",
    quantity: 1,
    price: 25,
    image: "https://picsum.photos/200?random=2",
  },
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

export const newArrivals = [
  {
    id: 1,
    name: "Stylish Jacket",
    price: 120,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    id: 2,
    name: "Stylish Jacket",
    price: 112,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    id: 3,
    name: "Stylish Jacket",
    price: 112,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    id: 4,
    name: "Stylish Jacket",
    price: 114,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    id: 5,
    name: "Stylish Jacket",
    price: 115,
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    id: 6,
    name: "Stylish Jacket",
    price: 216,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    id: 7,
    name: "Stylish Jacket",
    price: 117,
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    id: 8,
    name: "Stylish Jacket",
    price: 98,
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Stylish Jacket",
      },
    ],
  },
];

export const selectedProducts = [
  {
    id: 1,
    name: "Stylish Jacket",
    price: 120,
    orginalPrice: 150,
    description: "This is a stylish jacket perfect for any occasion",
    brand: "FashionBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket 2",
      },
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket 2",
      },
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Stylish Jacket 2",
      },
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Stylish Jacket 1",
      },
    ],
  },
];
export interface SProducts {
  id: number;
  name: string;
  price: number;
  images: [{ url: string }];
}
export const similarProducts: SProducts[] = [
  {
    id: 1,
    name: "product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=1" }],
  },
  {
    id: 2,
    name: "product 2",
    price: 200,
    images: [{ url: "https://picsum.photos/500/500?random=2" }],
  },
  {
    id: 3,
    name: "product 3",
    price: 300,
    images: [{ url: "https://picsum.photos/500/500?random=3" }],
  },
  {
    id: 4,
    name: "product 4",
    price: 400,
    images: [{ url: "https://picsum.photos/500/500?random=4" }],
  },
];

export const placeHolderProducts: SProducts[] = [
  {
    id: 1,
    name: "product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=1" }],
  },
  {
    id: 2,
    name: "product 2",
    price: 200,
    images: [{ url: "https://picsum.photos/500/500?random=2" }],
  },
  {
    id: 3,
    name: "product 3",
    price: 300,
    images: [{ url: "https://picsum.photos/500/500?random=3" }],
  },
  {
    id: 4,
    name: "product 4",
    price: 400,
    images: [{ url: "https://picsum.photos/500/500?random=4" }],
  },
  {
    id: 5,
    name: "product 5",
    price: 500,
    images: [{ url: "https://picsum.photos/500/500?random=5" }],
  },
  {
    id: 6,
    name: "product 6",
    price: 600,
    images: [{ url: "https://picsum.photos/500/500?random=6" }],
  },
  {
    id: 7,
    name: "product 7",
    price: 700,
    images: [{ url: "https://picsum.photos/500/500?random=7" }],
  },
  {
    id: 8,
    name: "product 8",
    price: 800,
    images: [{ url: "https://picsum.photos/500/500?random=8" }],
  },
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

// cart
export const cart = {
  products: [
    {
      id: 1,
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 110,
      image: "https://picsum.photos/200?random=1",
    },
    {
      id: 2,
      name: "Casual Sneakers",
      size: "42",
      color: "White",
      price: 45,
      image: "https://picsum.photos/200?random=2",
    },
  ],
  totalPrice: 155,
};
