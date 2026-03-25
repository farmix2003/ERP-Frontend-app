import { BarChart3, LayoutDashboard, Package, Settings, ShoppingCart, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/products", label: "Products", icon: Package },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {



  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-4"> 
    <div className="mb-8 px-3">
      <h2 className="text-xl font-bold text-gray-900">ERP Panel</h2>
      <p className="text-sm text-gray-500">Admin Dashboard</p>
    </div>
    <nav className="space-y-2">
      {
        navItems.map(({to, label, icon:Icon})=>(
          <NavLink to={to} key={to} 
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
  )
}

export default Sidebar