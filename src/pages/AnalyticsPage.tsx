import { useState } from "react";
import AnalyticsStatCard from "../features/analytics/components/AnalyticsStatCard";
import RevenueChart from "../features/analytics/components/RevenueChart";
import TrafficSourcesChart from "../features/analytics/components/TrafficSourcesChart";
import { analyticsStats } from "../data/Analytics";
import OrdersCahart from "../features/analytics/components/OrdersCahrt";


const AnalyticsPage = () => {
  const [range, setRange] = useState("6 Months");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor business insights and performance metrics
          </p>
        </div>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-gray-400"
        >
          <option>7 Days</option>
          <option>30 Days</option>
          <option>3 Months</option>
          <option>6 Months</option>
          <option>12 Months</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsStats.map((stat) => (
          <AnalyticsStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart />
        <OrdersCahart />
      </div>

      <TrafficSourcesChart />
    </div>
  );
};

export default AnalyticsPage;