export interface ProductImage {
  url: string;
  altText?: string;
}

export interface ProductDimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  countInStock: number;
  sku: string;
  category: string;
  brand?: string;
  sizes: string[];
  colors: string[];
  collections: string;
  material?: string[];
  gender?: "Men" | "Women";
  images: ProductImage[];
  isFeatured: boolean;
  isPublished: boolean;
  rating: number;
  numReviews: number;
  tags?: string[];
  user: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  dimensions?: ProductDimensions;
  weight?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// CartItem Interface
export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
}

// Cart Interface
export interface Cart {
  _id: string;
  user: string;
  guestId: string;
  products: CartItem[];
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderStatusType =
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface Order {
  _id: string;
  user: {
    userId: string;
    name: string;
  };
  createdAt: string;
  paymentStatus: "paid" | "pending" | "failed";
  status: OrderStatusType;
  amount: number;
  products: {
    productId: string;
    size: string;
    color: string;
    userId: string | null;
    image: string;
    quantity: number | string;
    price: number;
    name: string;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
}
