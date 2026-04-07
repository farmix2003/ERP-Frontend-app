interface AnalyticsStatsCardProps {
    title: string;
    value: string;
    change: string;
}

const AnalyticsStatsCard = ({ title, value, change }: AnalyticsStatsCardProps) => {
    return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-2xl">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">{change}</p>
    </div>
    )
}

export default AnalyticsStatsCard;
