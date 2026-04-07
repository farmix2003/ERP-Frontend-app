import { Menu, Moon, Sun } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useUIStore } from "../../store/UiStore";
import { useThemeStore } from "../../store/ThemeStore";
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
  const openSidebar = useUIStore((state) => state.openSidebar);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const title = pageTitles[location.pathname] || "ERP Dashboard";

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={openSidebar}
          className="inline-flex rounded-xl border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            {title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back, {user?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-xl border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          onClick={logout}
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 sm:px-4"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;