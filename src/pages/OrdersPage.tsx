import { useMemo, useState } from "react";

import {orders as ordersData} from '../data/Orders'
import { Search } from "lucide-react";
import OrdersTable from "../features/orders/components/OrdersTable";

const ITEMS_PER_PAGE = 5;


const OrdersPage = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed' | 'Cancelled'>('All');

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
     order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.email.toLowerCase().includes(searchTerm.toLowerCase())    ||
     order.id.toString().includes(searchTerm)                        ||
     order.amount.toString().includes(searchTerm)                    ||
     order.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = useMemo(() =>{
     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
     const endIndex = startIndex + ITEMS_PER_PAGE;
      return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage])
  
 const handleSearchChange = (e: string) =>{
    setSearchTerm(e);
    setCurrentPage(1);
 }

 const handleStatusFilterChange = (e: string) =>{
    setStatusFilter(e as 'All' | 'Pending' | 'Completed' | 'Cancelled');
    setCurrentPage(1);
 }


   return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h2>
        <p className="text-gray-500 dark:text-gray-400">Track and manage customer orders</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Total Orders:{" "}
          <span className="font-semibold text-gray-900">
            {filteredOrders.length}
          </span>
        </div>
      </div>

      <OrdersTable orders={paginatedOrders} />

      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">{totalPages || 1}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;