import { DollarSign, Package, PersonStanding, Users } from "lucide-react";
import StatCard from "../features/dashboard/components/StatCard";

const statObj = [
  {
    title: "Total Users",
    value: "1,234",
    icon: Users,
    change: "+5.4% from last month"
  },
  {
    title: "Revenue",
    value: "$42,345",
    icon: DollarSign,
    change: "+2.1% from last month"
  },
  {
    title: "New Signups",
    value: "567",
    icon: PersonStanding,
    change: "-3.2% from last month"
  },
  {
    title: "Products",
    value: "89",
    icon: Package,
  }
]

const DashboardPage = () => {
  return (
    <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
      <p className="text-gray-500 dark:text-gray-400">Monitor your business perfomance</p>
    </div>
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {
        statObj.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))
      }
    </div>

    <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm dark:shadow-2xl border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Activity feed will be displayed here.
        </p>
      </div>

    </div>
  );
};

export default DashboardPage;