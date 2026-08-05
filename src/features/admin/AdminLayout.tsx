import { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "@/features/admin/AdminSidbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidbarOpen, setIsSidbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidbarOpen(!isSidbarOpen);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row relative">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium ">Admin Dashboard</h1>
      </div>
      {/* OverLay for Mobile sidebar */}
      {isSidbarOpen && (
        <div
          className="fixed inset-0 z-10  bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      {/* sidebar */}
      <div
        className={`bg-gray-900 w-64 h-screen overflow-hidden text-white absolute md:relative transform ${
          isSidbarOpen ? "translate-x-0" : "-translate-x-full"
        } hoverEffect md:translate-x-0 md:static md::block z-20`}
      >
        {/* Sidebar */}
        <AdminSidebar />
      </div>
      {/* Main Content */}
      <div
        className={`flex-grow p-6 h-screen  ${
          isSidbarOpen ? "overflow-hidden" : "overflow-y-auto"
        } `}
      >
        <Outlet />
      </div>
    </div>
  );
};
export default AdminLayout;
