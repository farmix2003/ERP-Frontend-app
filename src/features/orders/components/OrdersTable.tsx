import type { OrderItem } from "../../../data/Orders";

interface OrdersTableProps {
  orders: OrderItem[];
}

const OrdersTable = ({orders}:OrdersTableProps) => {
if(orders.length === 0){
   <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">No orders found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or filter.
        </p>
      </div>
}

 const getStatusStyles = (status:OrderItem['status']) =>{
   switch(status){
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return '';
   }
 }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm text-gray-500">
                            <th className="px-6 py-4 font-medium">Order ID</th>
                            <th className="px-6 py-4 font-medium">Customer</th>
                            <th className="px-6 py-4 font-medium">Email</th>
                            <th className="px-6 py-4 font-medium">Amount</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{order.id}</td>
                                <td className="px-6 py-4">{order.customer}</td>
                                <td className="px-6 py-4">{order.email}</td>
                                <td className="px-6 py-4">${order.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersTable;