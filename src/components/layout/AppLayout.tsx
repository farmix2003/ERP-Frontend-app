import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex">
      <Sidebar />

      <div className="flex flex-1 flex-col lg:ml-0">
        <Navbar />

        <main className="flex-1 p-6 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;