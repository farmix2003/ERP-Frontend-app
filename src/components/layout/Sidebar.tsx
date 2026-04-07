import { BarChart3, LayoutDashboard, Package, Settings, ShoppingCart, Users, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUIStore } from "../../store/UiStore";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/products", label: "Products", icon: Package },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
 const isSidebarOpen = useUIStore(state => state.isSidebarOpen)
 const closeSidebar = useUIStore(state => state.closeSidebar)

  return (
    <>
    {
      isSidebarOpen && (
        <div 
        onClick={closeSidebar}
        className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
        
       
      )
    }
    <aside className={`fixed lg:relative left-0 top-0 z-50 flex h-screen flex-col w-64 border-r border-gray-200 bg-white p-4 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}> 
    <div className="mb-8 px-3 flex items-center justify-between">
      <div>
      <h2 className="text-xl font-bold text-gray-900">ERP Panel</h2>
      <p className="text-sm text-gray-500">Admin Dashboard</p>
    </div>
    <button
      onClick={closeSidebar}
      className="rounded-lg p-1 text-gray-500 transition hover:bg-gray-100 lg:hidden">
        <X size={20} />
    </button>
      </div>

    <nav className="space-y-2">
      {
        navItems.map(({to, label, icon:Icon})=>(
          <NavLink to={to} key={to} 
          onClick={closeSidebar}
          className={({isActive}) =>`flex items-center gap-3 rounded-xl px-3 
                py-2 text-sm font-medium transition
                ${isActive ?  'text-white bg-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))
      }
    </nav>
    </aside>
    </>
  )
}

export default Sidebar