import { api } from "@/shared/lib/api/axiosInstance";

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
};

export const checkoutApi = {
  create: (shippingAddress: ShippingAddress) =>
    api
      .post<{ payLink: string }>("/checkout/create", { shippingAddress })
      .then((r) => r.data),
};