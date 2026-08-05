import { useContext } from "react";
import { NavDrawerContext } from "@/shared/context/navDrawerContext";

export const useNavDrawer = () => {
  const context = useContext(NavDrawerContext);
  if (!context) {
    throw new Error("useNavDrawer must be used within a NavDrawerProvider");
  }
  return context;
};
