import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import { useUIStore } from "../../store/UiStore";
import { Menu } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/orders": "Orders",
  "/products": "Products",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

const Navbar = () => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const openSidebar = useUIStore(state => state.openSidebar)

  const title = pageTitles[location.pathname] || "ERP Dashboard";

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
      <button 
      onClick={openSidebar}
      className="inline-flex rounded-xl border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden">
        <Menu size={20} />
      </button>
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
      </div>
      </div>

      <button
        onClick={logout}
        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:px-5"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;