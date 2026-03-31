import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { revenueData } from "../../../data/Analytics"


const RevenueChart = () => {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className='mb-5'>
                <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                <p className="text-sm text-gray-500">Monthly revenue performance</p>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray={"3 3"} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default RevenueChart