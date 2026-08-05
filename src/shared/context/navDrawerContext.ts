import { createContext } from "react";

// تعریف تایپ برای Context
export interface NavContextType {
  drawerOpen: boolean;
  toggleCartDrawer: () => void;
}

// Context رو خارج از کامپوننت تعریف می‌کنیم
export const NavDrawerContext = createContext<NavContextType | undefined>(
  undefined
);
