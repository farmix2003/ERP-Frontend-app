import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    change?: string
}

const StatCard = ({ title, value, icon: Icon, change }: StatCardProps) =>{
    return (
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition hover:shadow-md">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{title}</span>
                <div className="rounded-xl bg-gray-100 p-2">
                    <Icon size={18} className="text-gray-700" />
                </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-2xl text-gray-900 font-bold">{title}</h3>
                {change && (
                    <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {change}
                    </span>
                )}
                </div>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}
export default StatCard;