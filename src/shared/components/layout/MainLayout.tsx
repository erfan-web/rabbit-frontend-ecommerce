import { Outlet } from "react-router-dom";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
