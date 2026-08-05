import { useCallback, useMemo, useState, type ReactNode } from "react";
import { NavDrawerContext, type NavContextType } from "@/shared/context/navDrawerContext";

interface Props {
  children: ReactNode;
}

export const NavDrawerProvider = ({ children }: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleCartDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const value = useMemo<NavContextType>(
    () => ({ drawerOpen, toggleCartDrawer }),
    [drawerOpen, toggleCartDrawer]
  );

  return (
    <NavDrawerContext.Provider value={value}>
      {children}
    </NavDrawerContext.Provider>
  );
};
