import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { trafficSourcesData } from "../../../data/Analytics";

const COLORS = ["#111827", "#6B7280", "#9CA3AF", "#D1D5DB"];


const TrafficSourcesChart = () =>{
    return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
        <p className="text-sm text-gray-500">Visitor acquisition channels</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={trafficSourcesData} dataKey={"value"} cx={"50%"} cy={"50%"} outerRadius={100} label>
              {trafficSourcesData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
    )
}
export default TrafficSourcesChart