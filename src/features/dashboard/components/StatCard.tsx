import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    change?: string
}

const StatCard = ({ title, value, icon: Icon, change }: StatCardProps) =>{
    return (
        <div className="rounded-2xl bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md dark:hover:shadow-2xl">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
                <div className="rounded-xl bg-gray-100 dark:bg-gray-700 p-2">
                    <Icon size={18} className="text-gray-700 dark:text-gray-300" />
                </div>
            </div>
            <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                {change && (
                    <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {change}
                    </span>
                )}
            </div>
        </div>
    );
}
export default StatCard;
