interface AnalyticsStatsCardProps {
    title: string;
    value: string;
    change: string;
}

const AnalyticsStatsCard = ({ title, value, change }: AnalyticsStatsCardProps) => {
    return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="mt-3 text-2xl font-bold text-gray-900">{value}</h3>
      <p className="mt-2 text-sm font-medium text-green-600">{change}</p>
    </div>
    )
}

export default AnalyticsStatsCard;