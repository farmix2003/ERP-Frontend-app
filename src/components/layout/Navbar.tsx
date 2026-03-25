import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

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

  const title = pageTitles[location.pathname] || "ERP Dashboard";

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
      </div>

      <button
        onClick={logout}
        className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;