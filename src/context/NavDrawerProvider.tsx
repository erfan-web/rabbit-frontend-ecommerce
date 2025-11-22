import { createContext, useState, type ReactNode } from "react";

// تعریف تایپ برای Context
interface NavContextType {
  drawerOpen: boolean;
  toggleCartDrawer: () => void;
}

// Context رو خارج از کامپوننت تعریف می‌کنیم
export const NavDrawerContext = createContext<NavContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const NavDrawerProvider = ({ children }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <NavDrawerContext.Provider value={{ drawerOpen, toggleCartDrawer }}>
      {children}
    </NavDrawerContext.Provider>
  );
};
