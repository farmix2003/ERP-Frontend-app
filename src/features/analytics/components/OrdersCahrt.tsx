import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ordersData } from "../../../data/Analytics"

const OrdersCahart = () => {

    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900">Orders Trend</h3>
                <p className="text-sm text-gray-500">Monthly order volume</p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#8884d8" radius={[8,8,0,0]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default OrdersCahart